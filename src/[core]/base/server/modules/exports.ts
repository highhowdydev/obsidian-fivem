import type { CharacterWithData } from "@/types";
import { type CharacterStats } from "../db";
import * as characters from "./characters";
import { CharacterType } from "@/[ui]/ui/ui/src/store/reducers/characters/types";

global.exports("GetUser", (source: string, includeCharacters?: boolean) =>
	characters.GetUser(String(source), includeCharacters),
);
global.exports("GetCharacter", (source: string) => characters.GetCharacter(source));
global.exports("GetCharacterData", (source: string) => characters.GetCharacterData(source));
global.exports("CreateCharacter", (source: string, data: Partial<CharacterType>) =>
	characters.CreateCharacter(source, data),
);
global.exports("DropActivePlayer", (source: string) => characters.DropActivePlayer(source));
global.exports("SetCharacter", (source: string, character: CharacterWithData) =>
	characters.SetCharacter(source, character),
);
global.exports("UpdateCharacterName", async (source: string, firstName: string, lastName: string) =>
	await characters.updateCharacterName(source, firstName, lastName),
);
global.exports("UpdateCharacterStats", async (source: string, stats: Partial<CharacterStats>) =>
	await characters.updateCharacterStats(source, stats),
);
global.exports("UpdateCharacterPosition", async (source: string, x: number, y: number, z: number, heading: number) =>
	await characters.updateCharacterPosition(source, x, y, z, heading),
);

export * from "./characters";
