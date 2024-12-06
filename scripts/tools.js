import inquirer from "inquirer";
import "colors";

async function main() {
	console.log(
		`\n░█░█░█▀█░█░█░█▀▄░█░█░░░▀█▀░█▀█░█▀█░█░░░█▀▀\n░█▀█░█░█░█▄█░█░█░░█░░░░░█░░█░█░█░█░█░░░▀▀█\n░▀░▀░▀▀▀░▀░▀░▀▀░░░▀░░░░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀`
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
					{ name: "1. Build All Resources", value: "build" },
					{ name: "2. Start Web Server", value: "web" },
					{ name: "3. Download CFX Artifacts", value: "artifacts" },
					{ name: "4. Generate server config", value: "config" },
					{ name: "5. Generate start.bat file", value: "start" },
					{ name: "6. Configure asset links", value: "assets" },
					{ name: "7. Exit", value: "exit" },
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
				case "assets":
					await import("./tasks/assetLink.js");
					break;
				case "exit":
					process.exit(0);
					break;
			}
		});
}

main();
