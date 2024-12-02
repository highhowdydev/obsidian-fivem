import { CharacterType } from "./types";

export const MAX_CHARACTERS = 10;

export const buildCharacterList = (characters: CharacterType[]) => {
	const characterList: CharacterType[] = [];

	characters.map(character => characterList.push(character));

	const count = characterList.length;
	if (count < MAX_CHARACTERS) {
		for (let i = 0; i < MAX_CHARACTERS - count; i++) {
			// @ts-ignore
			characterList.push(null);
		}
	}

	return characterList;
};
