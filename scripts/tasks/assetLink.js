import path from "node:path";
import { getServerConfig, sanitizePath, assetsPath, resourcePath } from "../utils.js";
import ora from "ora";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";

const execAsync = promisify(exec);
const outputDir = sanitizePath(path.join(resourcePath, "[assets]"));

async function main() {
	const spinner = ora("Linking Assets").start();

	try {
		const { assets } = getServerConfig();

		if (!assets || !assets.length) {
			spinner.fail("No assets have been found to link. You can configure this in server.yaml");
			process.exit(1);
		}

		if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true, force: true });
		if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

		for (const asset of assets) {
			const dir = sanitizePath(path.join(assetsPath, asset.directory));
			if (!fs.existsSync(dir)) continue;

			const targetDir = sanitizePath(path.join(outputDir, asset.directory));

			spinner.info(`${dir} -> ${targetDir}`);
			await execAsync(`mklink /J "${outputDir}/${asset.targetDirectory}" "${dir}"`);
		}
	} catch (error) {
		spinner.fail("Failed to set up asset link");
		throw error;
	}
}

main();
