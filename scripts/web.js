import { buildEntryWithVite, findResourcesToBuild } from "./utils.js";
import inquirer from "inquirer";

let source = "";
let output = "";

function findWebResources() {
	const resources = findResourcesToBuild();

    source = resources.source;
    output = resources.output;

    const webResources = [];
    
    for (const resource of resources.resources) {
        const info = resources.resourceInfo[resource];
        const builds = info.build;

        for (const build of builds) {
            if (build.build === "vite") {
                webResources.push({
                    name: resource,
                    path: info.relativePath,
                    build: build
                })
            }
        }
    }

    return webResources;
}

async function main() {
    const resources = findWebResources();
    
    inquirer.prompt([
		{
			type: "list",
			name: "selectedResource",
			message: "Select a web resource to start",
			choices: resources.map(resource => ({
				name: `${resource.name}`,
                value: resource
			})),
		},
	]).then((async answers => {
       const selectedResource = answers.selectedResource;
       await buildEntryWithVite(selectedResource.build, source, output, selectedResource.path, true);
    }));
}

main();
