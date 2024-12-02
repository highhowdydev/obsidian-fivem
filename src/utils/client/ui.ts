import { Delay } from "../shared";

export function SetNUIFocus(hasKeyboard: boolean, hasMouse: boolean, keepInput = false) {
	const hasNuiFocus = hasKeyboard || hasMouse;

	SetNuiFocus(hasNuiFocus, hasMouse);
	SetNuiFocusKeepInput(keepInput);

	emit("onNuiFocusChange", hasNuiFocus, hasKeyboard, hasMouse);
}

export async function ScreenFadeIn(duration = 0) {
	DoScreenFadeIn(duration + 0.0);
	while (IsScreenFadedIn()) await Delay(50);
}

export async function ScreenFadeOut(duration = 0) {
	DoScreenFadeOut(duration + 0.0);
	while (IsScreenFadedOut()) await Delay(50);
}

export async function ScreenBlurOut(duration = 0) {
	TriggerScreenblurFadeOut(duration);
	while (IsScreenblurFadeRunning()) await Delay(50);
}

export async function ScreenBlurIn(duration = 0) {
	TriggerScreenblurFadeIn(duration);
	while (IsScreenblurFadeRunning()) await Delay(50);
}
