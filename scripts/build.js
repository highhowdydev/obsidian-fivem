import minimist from "minimist";
import ora from "ora";
import { buildResource, emptyBuildDir, findResourcesToBuild } from "./utils.js";
import chalk from "chalk";

const spinner = ora();

async function main() {
	try {
		console.log(chalk.blue("Fetching resources..."));
		const jobs = [];
		const { target, w, watch, skipweb } = minimist(process.argv.slice(2));
		const watching = watch || w;

		if (!target && !watch) emptyBuildDir();
		const targets = target ? target.split("/") : false;
		const resources = findResourcesToBuild(targets, skipweb);

		let resourcesCount = resources.resources.length;
		console.log(chalk.blue(`Found ${resourcesCount} resources to build`));

		function onBuildComplete() {
			resourcesCount--;
			spinner.text = resourcesCount > 0 ? `Building ${resourcesCount} resources...` : "Building resources...";
		}

		for (const resource of resources.resources)
			jobs.push(buildResource(resource, resources, watching, onBuildComplete));
		await Promise.all(jobs);

		if (!watching) process.exit(0);
    else console.log(chalk.blue("\nWatching for changes..."));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
