import type { CharacterWithData, UserWithOptionalCharacters } from "@/types/base";
import { type CharacterStats, db, type Character as CharacterType, type CharacterPosition, type User } from "../db";
import { Character } from "./character";
import { CHARACTER_STATS_DEFAULTS, CHARACTER_POSITION_DEFAULTS } from "../data/defaults";
import { GetIdentifiers } from "../utils";

class Characters {
	public characters: Record<string, Character> = {};

	public getCharacter(source: string) {
		return this.characters[source];
	}

	public async getUser(source: string, includeCharacters?: boolean): Promise<UserWithOptionalCharacters> {
		const identifiers = GetIdentifiers(source);

		const exists = await db.user.findFirst({
			where: {
				steam: identifiers.steam,
			},
			...(includeCharacters && {
				include: {
					characters: true,
				},
			}),
		});

		if (exists) return exists;

		return await db.user.create({
			data: identifiers,
			include: {
				characters: includeCharacters,
			},
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
		return this.characters[source];
	}
}

export const characters = new Characters();

export const GetUser = (source: string, includeCharacters?: boolean) => characters.getUser(source, includeCharacters);
export const GetCharacter = (source: string) => characters.getCharacter(source);
export const DropActivePlayer = (source: string) => characters.dropActivePlayer(source);
export const GetCharacterData = (source: string) => characters.getCharacterData(source);
export const CreateCharacter = async (source: string, data: Partial<CharacterType>) =>
	await characters.createCharacter(source, data);
export const SetCharacter = (source: string, character: CharacterWithData) =>
	characters.setCharacter(source, character);

export const updateCharacterName = async (source: string, firstName: string, lastName: string) =>
	await GetCharacter(source).updateName(firstName, lastName);
export const updateCharacterPosition = async (source: string, x: number, y: number, z: number, heading: number) =>
	await GetCharacter(source).updatePosition(x, y, z, heading);
export const updateCharacterStats = async (source: string, stats: Partial<CharacterStats>) =>
	await GetCharacter(source).updateStats(stats);
