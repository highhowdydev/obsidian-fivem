import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";
import fileLoc from "esbuild-plugin-fileloc";
import YAML from "yaml";
import { createServer, build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import chalk from "chalk";

const rootOutputPath = sanitizePath(path.resolve(process.cwd(), "resources/[build]"));
const rootSourcePath = sanitizePath(path.resolve(process.cwd(), "src"));
export const assetsPath = sanitizePath(path.resolve(process.cwd(), "assets"));
export const resourcePath = sanitizePath(path.resolve(process.cwd(), "resources"));

const categoryExp = /^\[[\s\S]+\]$/;

const initialResourceMap = {
	output: rootOutputPath,
	source: rootSourcePath,
	resourceInfo: {},
	resources: [],
};

export function getServerConfig() {
	const server_config_path = path.resolve(process.cwd(), "server.yaml");
	const server_config = YAML.parse(fs.readFileSync(server_config_path, "utf-8"));
	return server_config;
}

/**
 * Replaces all backslashes in a path with forward slashes.
 *
 * @param {string} path The path to sanitize.
 * @returns {string} The sanitized path.
 */
export function sanitizePath(path) {
	return path.replace(/\\/g, "/");
}

export function emptyBuildDir() {
	fs.rmSync(rootOutputPath, { recursive: true, force: true });
}

/**
 * Recursively walks through the given directory, looking for directories containing
 * a fxmanifest.lua or manifest.yaml file. If found, the resource is added to the
 * given resourceMap and the manifest is parsed. If the manifest is invalid, an
 * error is added to the resource info.
 *
 * @param {string} [dirPath=rootSourcePath] - The directory to start searching from.
 * @param {object} [resourceMap=initialResourceMap] - The resource map to add resources to.
 * @returns {object} The resource map with the newly found resources.
 */
export function findResourcesToBuild(targets, skipweb, dirPath = rootSourcePath, resourceMap = initialResourceMap) {
	const contained = fs.readdirSync(dirPath);
	const config = getServerConfig();

	for (const item of contained) {
		const itemPath = path.resolve(dirPath, item);
		const files = fs.readdirSync(itemPath);

		if (files.some(file => config.resource_disablers.includes(file))) continue;

		const isCategory = categoryExp.test(item);

		if (isCategory) {
			findResourcesToBuild(targets, skipweb, itemPath, resourceMap);
			continue;
		}

		const stats = fs.statSync(itemPath);

		if (stats.isDirectory()) {
			const relativeItemPath = path.relative(resourceMap.source, itemPath);

			const info = {
				relativePath: relativeItemPath,
			};

			const fxManifestPath = path.resolve(itemPath, "fxmanifest.lua");
			const manifestPath = path.resolve(itemPath, "manifest.yaml");

			try {
				if (!fs.existsSync(fxManifestPath) && !fs.existsSync(manifestPath))
					throw new Error("Missing fxmanifest.lua or manifest.yaml");

				const manifest = YAML.parse(fs.readFileSync(manifestPath, "utf-8"));
				let skip = false;

				if (skipweb) {
					for (const build of manifest.build) {
						if (build.build === "vite") skip = true;
					}
				}

				info.build = manifest.build ? manifest.build : [];
				info.copy = manifest.copy ? [...manifest.copy, "fxmanifest.lua"] : ["fxmanifest.lua"];

				if (!skip) {
					resourceMap.resources.push(item);
					resourceMap.resourceInfo[item] = info;
				}
			} catch (error) {
				info.error = error;
			}
		}
	}

	if (targets) {
		const resources = resourceMap.resources.filter(resource => !targets.includes(resource));

		for (const res of resources) {
			delete resourceMap.resourceInfo[res];
			resourceMap.resources.splice(resourceMap.resources.indexOf(res), 1);
		}
	}

	return resourceMap;
}

/**
 * Builds a resource with ESBuild.
 * @param {string} resource - The resource to build.
 * @param {object} resourceMap - The resource map.
 * @param {boolean} watch - Whether to watch the resource for changes.
 * @param {function} onBuildComplete - A callback to call when the build is complete.
 * @returns {Promise<void>} A promise that resolves when the build is complete.
 */
export async function buildResource(resource, resourceMap, watch, onBuildComplete) {
	try {
		const resourceInfo = resourceMap.resourceInfo[resource];
		const entryPoints = resourceInfo.build;

		const resourceExists = fs.existsSync(path.resolve(resourceMap.output, resourceInfo.relativePath));
		if (resourceExists && !watch)
			fs.rmSync(path.resolve(resourceMap.output, resourceInfo.relativePath), { recursive: true, force: true });

		let t = Date.now();
		for (const item of entryPoints) {
			item.resourceName = resource;
			
			switch (item.build) {
				case "vite":
					await buildEntryWithVite(
						item,
						resourceMap.source,
						resourceMap.output,
						resourceInfo.relativePath,
						false,
					);
					break;
				default:
					await withEntryWithESBuild(
						item,
						resourceMap.source,
						resourceMap.output,
						resourceInfo.relativePath,
						watch,
					);
					break;
			}
		}
		console.log(chalk.green(`[${resource}] done in ${Date.now() - t}ms`));

		if (resourceInfo.copy) {
			for (const file of resourceInfo.copy) {
				const from = path.resolve(resourceMap.source, resourceInfo.relativePath, file);
				const to = path.resolve(resourceMap.output, resourceInfo.relativePath, file);
				if (isDir(from)) copyDirRecursiveSync(from, to);
				else copyFile(from, to);
			}
		}

		onBuildComplete();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

/**
 * Builds a resource entry with ESBuild.
 * @param {object} item A resource to build.
 * @param {string} source The source directory.
 * @param {string} output The output directory.
 * @param {string} relativePath The relative path of the resource.
 * @param {boolean} watch Whether to watch the resource for changes.
 */
async function withEntryWithESBuild(item, source, output, relativePath, watch) {
	const esbuildOptions = {
		platform: item.platform,
		entryPoints: [path.resolve(source, relativePath, item.entry)],
		outfile: item.outputDir
			? path.resolve(output, relativePath, item.outputDir, item.outputName)
			: path.resolve(output, relativePath, item.outputName),
		target: [item.target ? item.target : "esnext"],
		format: item.format ? item.format : item.platform === "node" ? "cjs" : "iife",
		bundle: true,
		logLevel: "warning",
		sourcemap: true,
		minify: item.minify ? item.minify : false,
		plugins: [fileLoc.filelocPlugin()],
	};

	if (watch) {
		const ctx = await esbuild.context(esbuildOptions);
		ctx.watch();
		return;
	}

	await esbuild.build(esbuildOptions);
}

export async function buildEntryWithVite(item, source, output, relativePath, watch) {
	const config = {
		base: "",
		root: path.resolve(source, relativePath, "ui"),
		build: {
			outDir: item.outputDir
				? path.resolve(output, relativePath, item.outputDir)
				: path.resolve(output, relativePath, "ui"),
			sourcemap: true,
			rollupOptions: {
				input: {
					main: path.resolve(source, relativePath, item.entry),
				},
			},
		},
		...(item.tailwindcss && {
			css: {
				postcss: {
					plugins: [
						tailwindcss({
							config: path.resolve(source, relativePath, item.tailwindcss),
						}),
						autoprefixer(),
					],
				},
			},
		}),
		...(item.alias && {
			resolve: {
				alias: item.alias,
			},
		}),
		...(item.publicDir && {
			publicDir: path.resolve(source, relativePath, item.publicDir),
		}),
		plugins: [react()],
	};

	const viteServer = await createServer(config);

	// Print what port the server is running on
	if (watch) {
		await viteServer.listen();
		viteServer.printUrls();
		viteServer.bindCLIShortcuts({ print: true });
	} else await viteBuild(config);
}

/**
 * Copies the contents of a directory recursively to another directory.
 * @param {string} source - The path to the source directory.
 * @param {string} target - The path to the target directory.
 * @returns {void}
 */
function copyDirRecursiveSync(source, target) {
	const files = fs.readdirSync(source);
	for (const file of files) {
		const curFrom = path.resolve(source, file);
		const curTo = path.resolve(target, file);
		if (fs.statSync(curFrom).isDirectory()) {
			copyDirRecursiveSync(curFrom, curTo);
		} else {
			copyFile(curFrom, curTo);
		}
	}
}

/**
 * Copies a file from the source location to the target location.
 * @param {string} source - The path to the source file.
 * @param {string} target - The path to the target file.
 * @throws {Error} If the copy fails.
 */
function copyFile(source, target) {
	try {
		fs.mkdirSync(path.dirname(target), { recursive: true });
		fs.copyFileSync(source, target);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Checks if the given path is a directory.
 *
 * @param {string} itemPath The path to the item to check.
 * @returns {boolean} true if the item is a directory, false otherwise.
 */
function isDir(itemPath) {
	const exists = fs.existsSync(itemPath);

	if (exists) {
		const stats = fs.statSync(itemPath);
		return stats.isDirectory();
	}

	const ext = path.extname(itemPath);
	return ext === "";
}

/**
 * Ensures that a directory and its parent directories exist.
 * If the directory doesn't exist, it will be created recursively.
 *
 * @param {string} path - The path to ensure exists
 */
function ensureDirectoryExists(path) {
	const directory = sanitizePath(path.split("/").slice(0, -1).join("/"));
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}
}

/**
 * Writes a file to disk.
 *
 * @param {string} path - The path to the file to write.
 * @param {string|Buffer} data - The data to write to the file.
 * @returns {void}
 */
export function writeFile(path, data) {
	path = sanitizePath(path);
	ensureDirectoryExists(path);
	fs.rmSync(path, { force: true, maxRetries: 999 });
	fs.writeFileSync(path, data);
}
