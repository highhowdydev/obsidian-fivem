import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import streamZip from "node-stream-zip";
import ora from "ora";
import { sanitizePath } from "../utils.js";
import minimist from "minimist";

const ARTIFACTS_URL = "https://changelogs-live.fivem.net/api/changelog/versions/win32/server";
const ARTIFICATS_DIR = sanitizePath(path.join(process.cwd(), "cfx"));

async function downloadServerArtifacts(version) {
	const spinner = ora(`Downloading artifacts for ${version}`).start();

	try {
		if (!fs.existsSync(ARTIFICATS_DIR)) {
			spinner.text = "Creating artifacts directory";
			fs.mkdirSync(ARTIFICATS_DIR);
		}

		const { data } = await axios.get(ARTIFACTS_URL);
		const downloadUrl = data[version + "_download"];
		const buildVersion = data[version];

		const currentVersion = fs
			.readdirSync(ARTIFICATS_DIR)
			.find(file => file.endsWith(".zip"))
			?.split(".")[0];

		if (!downloadUrl || !buildVersion) {
			spinner.fail("Failed to download artifacts");
			process.exit(1);
		}

		if (currentVersion === buildVersion) {
			spinner.succeed(`Server artifacts for ${version} are up to date`);
			process.exit(0);
		}

		await deleteArtifacts();

		spinner.text = `Downloading server artifacts for build ${version}`;
		const zipFileName = await downloadFile(downloadUrl, ARTIFICATS_DIR, buildVersion);

		spinner.text = `Extracting server artifacts for build ${version}`;
		await extractZippedFiles(path.join(ARTIFICATS_DIR, zipFileName), ARTIFICATS_DIR);

		spinner.succeed(`Server artifacts for ${version} downloaded and extracted`);
	} catch (error) {
		spinner.fail(error.message);
		console.error(error);
	}
}

async function deleteArtifacts() {
	if (!fs.existsSync(ARTIFICATS_DIR)) return;

	fs.rmSync(ARTIFICATS_DIR, { recursive: true }, err => {
		if (err && err.errno != -4058) {
			console.log(`Failed to delete artifact directory.`);
			process.exit(1);
		}
		console.log("Artifacts directory deleted.");
	});
}

async function downloadFile(url, dest, ver) {
	if (!fs.existsSync(dest)) fs.mkdirSync(dest);
	const fileName = `${ver}.zip`;
	const writer = fs.createWriteStream(`${dest}/${fileName}`);
	const { data } = await axios.get(url, { responseType: "stream" });
	data.pipe(writer);
	return new Promise(resolve => writer.on("finish", () => resolve(fileName)));
}

async function extractZippedFiles(file, dest) {
	if (!fs.existsSync(dest)) fs.mkdirSync(dest);
	const zip = new streamZip.async({ file: file });
	await zip.extract(null, dest);
	await zip.close();
	fs.unlinkSync(file);
}

async function main() {
	try {
		let { version } = minimist(process.argv.slice(2));

		if (!version) {
			console.log("No version specified. Defaulting to latest...");
            version = "latest";
		}

		await downloadServerArtifacts(version);
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
