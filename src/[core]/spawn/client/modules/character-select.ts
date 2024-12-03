import type { Character } from "@prisma/client";
import { triggerServerCallback } from "@overextended/ox_lib/client";
import { Delay } from "@/utils/shared";
import { CharacterWithData, UserWithCharacters, UserWithOptionalCharacters } from "@/types/base";
import { WaitForResourceStart } from "@/[core]/base/client/modules/character";
import { CreateCharacter } from "@/types/spawn";
import { ScreenFadeIn, ScreenFadeOut } from "@/utils/client/ui";

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

	constructor() {
		this.handleNuiCallbacks();
	}

	async handleNuiCallbacks() {
		const started = await WaitForResourceStart("ui");
		if (!started) return;

		const UI = exports.ui;

		UI.NuiCallback("characters/createCharacter", async (data: CreateCharacter, cb: Function) => {
			const characters = (await triggerServerCallback(
				"spawn:createCharacter",
				null,
				data,
			)) as CharacterWithData[];
			this.characters = characters;
			return characters;
		});

		UI.NuiCallback("characters:selectCharacter", async (data: CharacterWithData, cb: Function) => {
			const character = this.characters.find(character => character.id === data.id);

			if (!character) {
				console.log("no char?");
				return cb({
					success: false,
					message: "Character not found",
				});
			}

			const result = await triggerServerCallback<any>("spawn:selectCharacter", null, character);
			cb(result);

			if (result.success) this.selectedCharacter(result.data);
		});
	}

	async selectedCharacter(data: CharacterWithData) {
		await ScreenFadeOut(1000);

		emitNet("onCharacterLogin", data);
		emit("onCharacterLogin", data);

		LocalPlayer.state.set("loggedIn", true, false);
		LocalPlayer.state.set("data", data, false);

		await Delay(1000);
		await ScreenFadeIn(1000);
	}

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

		await this.onSessionStart();
	}

	async onSessionStart() {
		DoScreenFadeIn(500.0);
		await Delay(500);
		const started = await WaitForResourceStart("ui");
		if (!started) return;

		const UI = exports.ui;
		UI.DispatchNuiEvent("characters/setLoading", { loading: true });
		UI.SetApplication("characters", true);

		const characters = await this.fetchCharacters();
		this.characters = characters;
		UI.DispatchNuiEvent("characters/setCharacters", {
			characters: characters?.length
				? characters.map(character => ({
						id: character.id,
						data: {
							firstName: character.firstName,
							lastName: character.lastName,
							gender: character.gender,
							nationality: character.nationality,
							dob: character.dob,
						},
				  }))
				: [],
		});

		UI.DispatchNuiEvent("characters/setLoading", { loading: false });
		await Delay(100);
		DoScreenFadeIn(500.0);
	}

	async fetchCharacters() {
		const user = (await triggerServerCallback("spawn:fetchUserWithCharacters", null)) as UserWithCharacters;
		return user.characters;
	}
}
