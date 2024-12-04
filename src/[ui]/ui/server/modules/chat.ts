import { Delay } from "@/utils/shared";

RegisterCommand(
	"ooc",
	async function (source: number, args: string[]) {
		const message = args.join(" ");

		const character = global.exports.base.GetCharacter(source);
		if (!character) return;

		emitNet("chatMessage", -1, `${character.data.firstName} ${character.data.lastName}`, "ooc", message);
	},
	false,
);
setTimeout(() => {
	emitNet("chat:addSuggestion", -1, "/ooc", "Out of character chat", [
		{ name: "message", help: "The message to send (string)" },
	]);
	emitNet("chat:addSuggestion", -1, "/oooc", "Out of character chat", [
		{ name: "message", help: "The message to send (string)" },
	]);
}, 1000);

on("_chat:messageEntered", (author: string, channel: string, message: string) => {
	if (!message || !author) return;
	emitNet("chatMessage", source, author, channel, message);
});

function refreshCommands(player: any) {
	if (GetRegisteredCommands) {
		const registeredCommands = GetRegisteredCommands();

		const suggestions: {
			name: string;
			help: string;
		}[] = [];

		for (let i = 0; i < registeredCommands.length; i++) {
			if (IsPlayerAceAllowed(player, `command.${registeredCommands[i].name}`)) {
				suggestions.push({
					name: `/${registeredCommands[i].name}`,
					help: "",
				});
			}
		}

		emit("chat:addSuggestions", player, suggestions);
	}
}

on("chat:init", () => refreshCommands(source));

on("onServerResourceStart", async (resName: string) => {
	await Delay(500);
	for (const player in GetActivePlayers()) refreshCommands(player);
});

function GetActivePlayers() {
	const playerNum = GetNumPlayerIndices();
	const players: number[] = [];

	for (let i = 0; i < playerNum; i++) {
		const player = GetPlayerFromIndex(i);
		if (!player) continue;
		players.push(+player);
	}

	return players;
}
