import minimist from "minimist";
import ora from "ora";
import { buildResource, emptyBuildDir, findResourcesToBuild } from "./utils.js";

const spinner = ora();

async function main() {
  try {
    spinner.start("Building resources...");
    const currentTime = Date.now();
    const jobs = [];
    const { target, w, watch, skipweb } = minimist(process.argv.slice(2));
    const watching = watch || w;

    if (!target && !watch) emptyBuildDir();
    const targets = target ? target.split("/") : false;
    const resources = findResourcesToBuild(targets, skipweb);

    let resourcesCount = resources.resources.length;
    spinner.text = `Building ${resourcesCount} resources...\n`;

    function onBuildComplete() {
      resourcesCount--;
      spinner.text =
        resourcesCount > 0
          ? `Building ${resourcesCount} resources...`
          : "Building resources...";
    }

    for (const resource of resources.resources)
      jobs.push(buildResource(resource, resources, watching, onBuildComplete));
    await Promise.all(jobs);

    spinner.succeed(
      `Resources have been built in ${Date.now() - currentTime}ms`
    );
    
    if (!watching) process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
