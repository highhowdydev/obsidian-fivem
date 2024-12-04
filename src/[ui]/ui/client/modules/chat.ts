import { SetNUIFocus } from "@/utils/client/ui";
import { DispatchNuiEvent, NuiCallback, SetFocus } from "..";
import { ChatResult } from "@/types/chat";

onNet("chatMessage", function (author: string, type: string, message: any) {
	const args = { message };
});

onNet("chat:addMessage", function (message: any) {});
onNet("chat:addSuggestion", function (name: string, help: string, params: any) {
	console.log(name, help, params);
	emitNet("printToServer", JSON.stringify({ name, help, params }));
});
onNet("chat:addSuggestions", function (suggestions: any) {});
onNet("chat:removeSuggestion", function (name: string) {});
onNet("chat:clear", function () {});

let chatOpen = false;

global.exports.binds.createBind({
	key: "openchat",
	label: "Open Chat",
	defaultKey: "T",
	allowNui: false,
	async keydown() {
		if (chatOpen || !LocalPlayer.state.loggedIn) return;
		chatOpen = false;
		DispatchNuiEvent("chat/setOpen", { open: true });
		SetFocus(true, false, false);
	},
});

setTimeout(() => {
	NuiCallback("onCloseChatUI", (_, cb: Function) => {
		chatOpen = false;
		SetFocus(false, false, false);
		cb(1);
	});

	NuiCallback("chatResult", (data: ChatResult, cb: Function) => {
		if (data.message.startsWith("/")) data.message = data.message.slice(1);
		console.log("Executing command", data.message);
		ExecuteCommand(data.message);
		cb(1);
	});
}, 2000);
