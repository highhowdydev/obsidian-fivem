export type CharacterState = {
	isBusy: boolean;
	isLoading: boolean;
	isDeleting: boolean;
	displayCharacter: { [key: string]: any } | null;
	creatingCharacter: boolean;
	characters: CharacterType[];
	newCharacter: NewCharacterType;
};

export type NewCharacterType = {
	firstName: string;
	lastName: string;
	gender: "male" | "female";
	dob: Date;
	nationality: string;
};

export type CharacterType = {
	id: string;
	ped: number | null;
	display: boolean;
	data: { [key: string]: any };
};
