import inquirer from "inquirer";
import "colors";

async function main() {
	console.log(
		"\n░█░█░█▀█░█░█░█▀▄░█░█░░░▀█▀░█▀█░█▀█░█░░░█▀▀\n░█▀█░█░█░█▄█░█░█░░█░░░░░█░░█░█░█░█░█░░░▀▀█\n░▀░▀░▀▀▀░▀░▀░▀▀░░░▀░░░░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀"
			.blue,
	);
	console.log("Below are a list of helpful tools to get set up.\n".blue);

	inquirer
		.prompt([
			{
				type: "list",
				name: "selectedTool",
				message: "Select a tool to start",
				choices: [
					{ name: "Build All Resources", value: "build" },
					{ name: "Start Web Server", value: "web" },
					{ name: "Download CFX Artifacts", value: "artifacts" },
					{ name: "Generate server config", value: "config" },
					{ name: "Generated start.bat file", value: "start" },
				],
			},
		])
		.then(async answers => {
			const selectedTool = answers.selectedTool;
			switch (selectedTool) {
				case "build":
					await import("./build.js");
					break;
				case "web":
					await import("./web.js");
					break;
				case "artifacts":
					await import("./tasks/artifacts.js");
					break;
				case "config":
					await import("./tasks/genConfig.js");
					break;
				case "start":
					await import("./tasks/start.js");
					break;
			}
		});
}

main();
