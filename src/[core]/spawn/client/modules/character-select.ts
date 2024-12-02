import type { Character } from "@prisma/client";
import { triggerServerCallback } from "@overextended/ox_lib/client";
import { Delay } from "@/utils/shared";
import { UserWithOptionalCharacters } from "@/types/base";

type PlayerCharacter = {
	ped: number | null;
	data: { [key: string]: any };
};

export const CharacterCameraData = {
	position: { x: 422.266, y: -645.9, z: 30.517, h: 268.223 },
	rotation: { x: 0.0, y: 0.0, z: 0.0 },
	point: { x: 432.475, y: -645.828, z: 28.726 },
	fov: 30,
} as const;

export class CharacterSelect {
	camera: number = -1;
	ped: number = -1;
	character: PlayerCharacter | null = null;
	characters: Character[] = [];

	async awaitSession() {
		while (!NetworkIsSessionStarted()) await Delay(100);

		if (IsPlayerSwitchInProgress()) StopPlayerSwitch();

		if (GetIsLoadingScreenActive()) {
			SendLoadingScreenMessage('{"fullyLoaded": true}');
			ShutdownLoadingScreenNui();
		}

		NetworkStartSoloTutorialSession();
		ShutdownLoadingScreen();

		NetworkSetFriendlyFireOption(true);

		LocalPlayer.state.set("loggedIn", false, true);
		LocalPlayer.state.set("stateId", false, true);
		LocalPlayer.state.set("characterId", false, true);

		const ped = PlayerPedId();
		SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
		SetEntityCoordsNoOffset(ped, 449.194, -651.431, 28.486, true, false, false);
		FreezeEntityPosition(ped, false);

		await this.fetchCharacters();
	}

	async fetchCharacters() {
		const characters = (await triggerServerCallback(
			"spawn:fetchUserWithCharacters",
			null,
		)) as UserWithOptionalCharacters;
	}
}
