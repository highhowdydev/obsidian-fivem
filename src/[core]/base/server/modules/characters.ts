import type { CharacterWithData } from "@/types/base";
import { type CharacterStats, db, type Character as CharacterType, type CharacterPosition, type User } from "../db";
import { Character } from "./character";
import { CHARACTER_STATS_DEFAULTS, CHARACTER_POSITION_DEFAULTS } from "../data/defaults";
import { GetIdentifiers } from "../utils";

class Characters {
	public characters: Record<string, Character> = {};

	public getCharacter(source: string) {
		return this.characters[source];
	}

	public async getUser(source: string) {
		const identifiers = GetIdentifiers(source);

		const exists = await db.user.findFirst({
			where: {
				steam: identifiers.steam,
			},
		});

		if (exists) return exists;

		return await db.user.create({
			data: identifiers,
		});
	}

	public async createCharacter(source: string, data: Partial<CharacterType>) {
		const user = await this.getUser(source);

		const result = await db.character.create({
			data: {
				...(data as CharacterType),
				stats: {
					create: CHARACTER_STATS_DEFAULTS as CharacterStats,
				},
				position: {
					create: CHARACTER_POSITION_DEFAULTS as CharacterPosition,
				},
				userId: user.id,
			},
			include: {
				stats: true,
				position: true,
			},
		});

		return result;
	}

	public dropActivePlayer(source: string) {
		delete this.characters[source];
	}

	public getCharacterData(source: string) {
		return this.characters[source];
	}

	public setCharacter(source: string, character: CharacterWithData) {
		this.characters[source] = new Character(character);
	}
}

export const characters = new Characters();

export const GetCharacter = (source: string) => characters.getCharacter(source);
export const DropActivePlayer = (source: string) => characters.dropActivePlayer(source);
export const GetCharacterData = (source: string) => characters.getCharacterData(source);
export const SetCharacter = (source: string, character: CharacterWithData) =>
	characters.setCharacter(source, character);

export const updateCharacterName = async (source: string, firstName: string, lastName: string) =>
	await GetCharacter(source).updateName(firstName, lastName);
export const updateCharacterPosition = async (source: string, x: number, y: number, z: number, heading: number) =>
	await GetCharacter(source).updatePosition(x, y, z, heading);
export const updateCharacterStats = async (source: string, stats: Partial<CharacterStats>) =>
	await GetCharacter(source).updateStats(stats);