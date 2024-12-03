import lib from "@overextended/ox_lib/server";

lib.addCommand("sv", async function (source, params) {
	emitNet("command:sv", source, params.vehicle);
}, {
	help: "Fetch characters",
	restricted: "group.admin",
	params: [
		{
			name: "vehicle",
			paramType: "string",
			help: "Vehicle model name",
		},
	],
});
