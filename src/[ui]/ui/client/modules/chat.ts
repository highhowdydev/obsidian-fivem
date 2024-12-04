import { SetNUIFocus } from "@/utils/client/ui";
import { DispatchNuiEvent, NuiCallback, SetFocus } from "..";
import { ChatResult } from "@/types/chat";
import { Delay } from "@/utils/shared";

const CHAT_CHANNELS = ["all", "ooc", "looc", "me", "info"];

onNet("chatMessage", function (author: string, channel: string, message: any) {
	if (!CHAT_CHANNELS.includes(channel)) return;
	DispatchNuiEvent("chat/addMessage", { message: { author, channel, message } });
});

onNet("chat:addSuggestion", function (name: string, help: string, params: any) {
	DispatchNuiEvent("chat/addSuggestion", { suggestion: { name, help, params } });
});
onNet("chat:addSuggestions", function (suggestions: any) {
	for (const suggestion of suggestions) DispatchNuiEvent("chat/addSuggestion", { suggestion });
});
onNet("chat:removeSuggestion", function (name: string) {
	DispatchNuiEvent("chat/removeSuggestion", { name });
});
onNet("chat:clear", function () {
	DispatchNuiEvent("chat/clear");
});

let chatOpen = false;

global.exports.binds.createBind({
	key: "openchat",
	label: "Open Chat",
	defaultKey: "T",
	allowNui: false,
	async keydown() {
		if (chatOpen || !LocalPlayer.state.loggedIn) return;
		chatOpen = true;
		DispatchNuiEvent("chat/setOpen", { open: true });
		SetFocus(true, false, false);

		while (chatOpen) {
			DisableAllControlActions(0);
			await Delay(0);
		}
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
}, 100);
