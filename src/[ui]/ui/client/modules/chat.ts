import { SetNUIFocus } from "@/utils/client/ui";
import { DispatchNuiEvent, NuiCallback, SetFocus } from "..";

onNet("chatMessage", function (author: string, type: string, message: any) {
	const args = { message };
});

onNet("chat:addMessage", function (message: any) {});
onNet("chat:addSuggestion", function (name: string, help: string, params: any) {});
onNet("chat:addSuggestions", function (suggestions: any) {});
onNet("chat:removeSuggestion", function (name: string) {});
onNet("chat:clear", function () {});

let chatOpen = false;

global.exports.binds.createBind({
	key: "openchat",
	label: "Open Chat",
	defaultKey: "U",
	allowNui: false,
	async keydown() {
		if (chatOpen) return;
		chatOpen = false;
		DispatchNuiEvent("chat/setVisible", { visible: true });
		SetFocus(true, false, false);
	},
});

setTimeout(() => {
	NuiCallback("onCloseChatUI", (_, cb: Function) => {
		chatOpen = false;
		SetFocus(false, false, false);
		cb(1);
	});
}, 2000);
