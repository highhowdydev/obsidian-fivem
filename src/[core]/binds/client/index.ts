import { Keybind } from "../types";
import { loadDefaultBinds } from "./defaults";

/**
 * Binds class manages key bindings and their associated actions. It allows adding, removing,
 * and triggering key bindings through in-game commands.
 */
class Binds {
	binds: { [key: string]: Keybind } = {};

	/**
	 * Adds a new key binding.
	 *
	 * @param {Keybind} settings - The settings for the key binding, including key, label, defaultKey,
	 * keyDown, and optionally keyUp, and allowNui.
	 */
	add(settings: Keybind) {
		this.binds[settings.key] = settings;
		if (!settings) return;

		if (settings?.keyup)
			RegisterCommand(`-cmd_bind__${settings.key}`, () => settings.keyup && settings.keyup(), false);

		RegisterCommand(
			`+cmd_bind__${settings.key}`,
			() => {
				if (!settings.allowNui) if (IsNuiFocused() || IsNuiFocusKeepingInput() || IsPauseMenuActive()) return;

				this.binds[settings.key].keydown();
			},
			false,
		);

		RegisterKeyMapping(`+cmd_bind__${settings.key}`, settings.label, "keyboard", settings.defaultKey);
		TriggerEvent("chat:removeSuggestion", `/cmd_bind__${settings.key}`);
	}

	/**
	 * Removes an existing key binding.
	 *
	 * @param {string} key - The key to be removed.
	 */
	remove(key: string) {
		delete this.binds[key];
		TriggerEvent("chat:removeSuggestion", `/cmd_bind__${key}`);
	}

	/**
	 * Forces the execution of the keyDown action for a given key if it exists.
	 *
	 * @param {string} key - The key to force the action for.
	 */
	forceBind(key: string) {
		if (this.binds[key]) {
			this.binds[key].keydown();
		}
	}
}

const binds = new Binds();

export const createBind = (settings: Keybind) => binds.add(settings);
export const removeBind = (key: string) => binds.remove(key);
export const forceBind = (key: string) => binds.forceBind(key);

global.exports("createBind", createBind);
global.exports("removeBind", removeBind);
global.exports("forceBind", forceBind);

setTimeout(() => {
	loadDefaultBinds();
}, 5000);
