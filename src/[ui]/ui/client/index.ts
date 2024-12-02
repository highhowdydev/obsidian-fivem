import { SetNUIFocus } from "@/utils/client/ui";
import { Delay } from "@/utils/shared";

let currentApp = "";
let init = false;

const callbacks = new Map<string, () => void>();

export function NuiCallback(event: string, cb: (...args: any) => void) {
	RegisterNuiCallbackType(event);
	on(`__cfx_nui:${event}`, cb);
	callbacks.set(event, cb);
}

NuiCallback("nui:onCloseApplication", (_, cb: (...args: any) => void) => {
	SetNUIFocus(false, false);
	currentApp = "";
	cb(1);
});

NuiCallback("nui:onClose", (_, cb: Function) => {
	SetNUIFocus(false, false);
	exports["ob-inventory"].SetInventoryOpen(false);
	cb(1);
});

NuiCallback("nui:init", (_, cb: (...args: any) => void) => {
	init = true;
});

export async function SetApplication(application: string, focus: boolean, forceSwitch?: boolean) {
	let previousApp = currentApp;
	// if ((focus && (IsNuiFocused() || IsNuiFocusKeepingInput())) && !forceSwitch) return previousApp;

	await EnsureInit();

	DispatchNuiEvent("setApplication", { application });

	currentApp = application;
	if (focus) SetNUIFocus(true, true);

	return previousApp;
}

export function CloseCurrentApplication() {
	SetNUIFocus(false, false);
	DispatchNuiEvent("setApplication", { application: "" });
	currentApp = "";
}

export async function SetFocus(hasKeyboard: boolean, hasMouse: boolean, keepInput = false) {
	// if ((hasKeyboard || hasMouse) && (!IsNuiFocused() || IsNuiFocusKeepingInput() || IsPauseMenuActive())) return;
	await EnsureInit();
	SetNUIFocus(hasKeyboard, hasMouse, keepInput);
}

async function EnsureInit() {
	if (init) return;

	do {
		console.log("Waiting for UI to initialize");
		await Delay(1000);
	} while (!init);
}

export async function SendMessageToNui(event: string, data: any) {
	await EnsureInit();

	SendNUIMessage({
		event,
		data,
	});
}

export async function DispatchNuiEvent(action: string, payload = {}) {
	await EnsureInit();

	// console.log(action, payload);

	SendNUIMessage({
		event: "payload",
		action,
		data: {
			action,
			...payload,
		},
	});
}

export const GetCurrentApplication = () => currentApp;

// Main UI global exports
global.exports("DispatchNuiEvent", DispatchNuiEvent);
global.exports("NuiCallback", NuiCallback);
global.exports("GetCurrentApplication", GetCurrentApplication);
global.exports("SetApplication", SetApplication);
global.exports("SendMessageToNui", SendMessageToNui);
global.exports("SetFocus", SetFocus);
global.exports("CloseCurrentApplication", CloseCurrentApplication);
