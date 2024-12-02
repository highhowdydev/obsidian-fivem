import { Prisma } from "@prisma/client";

const baseUser = Prisma.validator<Prisma.UserDefaultArgs>()({});

const userWithCharacters = Prisma.validator<Prisma.UserFindManyArgs>()({
	include: {
		characters: true,
	},
});

export type UserWithOptionalCharacters =
	| Prisma.UserGetPayload<typeof baseUser>
	| Prisma.UserGetPayload<typeof userWithCharacters>;

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
};
