import type { Keybind } from "../../../types";
import { Delay, loadAnimSet } from "@/utils/shared";

let cooldown = 0;

export default {
	key: "crouch",
	label: "Actions: Crouch",
	defaultKey: "LCONTROL",
	allowNui: false,
	keydown: async () => {
		const time = Date.now();
		if (cooldown > time) return;
		cooldown = time + 2000;

		const ped = PlayerPedId();
		if (IsPedReloading(ped) || IsPedInAnyVehicle(ped, false)) return;

		ClearPedTasks(ped);
		await loadAnimSet("move_ped_crouched");
		LocalPlayer.state.set("crouched", true, false);

		while (LocalPlayer.state.crouched) {
			SetPedMovementClipset(ped, "move_ped_crouched", 1.0);
			SetPedWeaponMovementClipset(ped, "move_ped_crouched");
			SetPedStrafeClipset(ped, "move_ped_crouched");
			await Delay(500);
		}
	},
	keyup: () => {
		const ped = PlayerPedId();
		LocalPlayer.state.set("crouched", false, false);

		ClearPedTasks(ped);
		ResetPedMovementClipset(ped, 1.0);
		ResetPedWeaponMovementClipset(ped);
		ResetPedStrafeClipset(ped);
		SetPedStealthMovement(ped, false, "DEFAULT_ACTION");
	},
} satisfies Keybind;
