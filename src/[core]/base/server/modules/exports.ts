import type { CharacterWithData } from "@/types";
import { type CharacterStats } from "../db";
import * as characters from "./characters";
import { CharacterType } from "@/[ui]/ui/ui/src/store/reducers/characters/types";

global.exports("GetUser", (source: string, includeCharacters?: boolean) =>
	characters.GetUser(source, includeCharacters),
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
global.exports("updateCharacterName", (source: string, firstName: string, lastName: string) =>
	characters.updateCharacterName(source, firstName, lastName),
);
global.exports("updateCharacterStats", (source: string, stats: Partial<CharacterStats>) =>
	characters.updateCharacterStats(source, stats),
);
global.exports("updateCharacterPosition", (source: string, x: number, y: number, z: number, heading: number) =>
	characters.updateCharacterPosition(source, x, y, z, heading),
);

export * from "./characters";
