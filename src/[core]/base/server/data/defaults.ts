import type { CharacterPosition, CharacterStats } from "../db";

export const CITIZEN_ID_INCREMENT = 1000;

export const CHARACTER_STATS_DEFAULTS: Partial<CharacterStats> = {
	job: "unemployed",
} as const;

export const CHARACTER_POSITION_DEFAULTS: Partial<CharacterPosition> = {
	x: 449.194,
	y: -651.431,
	z: 28.486,
    heading: 0.0,
};
