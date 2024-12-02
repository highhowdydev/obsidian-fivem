import { Prisma } from "@prisma/client";

const userWithCharacters = Prisma.validator<Prisma.UserArgs>()({
	include: {
		characters: true,
	},
});

export type UserWithCharacters = Prisma.UserGetPayload<typeof userWithCharacters>;

const characterWithData = Prisma.validator<Prisma.CharacterArgs>()({
	include: {
		position: true,
		stats: true,
	},
});

export type CharacterWithData = Prisma.CharacterGetPayload<typeof characterWithData>;

export type Player = {
    source: string;
    character: CharacterWithData;
}
