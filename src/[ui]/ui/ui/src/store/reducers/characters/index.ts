import { CharacterState } from "./types";
import { buildCharacterList } from "./utils";

const currentDate = new Date();

export const defaultState: CharacterState = {
	isBusy: false,
	isLoading: false,
	isDeleting: false,
	displayCharacter: null,
	creatingCharacter: false,
	characters: buildCharacterList([
		{
			id: "1",
			ped: null,
			display: true,
			data: {
				id: "",
				firstName: "",
				lastName: "",
			},
		},
	]),
	newCharacter: {
		firstName: "",
		lastName: "",
		gender: "male",
		dob: currentDate,
		nationality: "American",
	},
};

export const charactersReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case "characters/reset":
			return defaultState;
		case "characters/resetNewCharacter":
			return {
				...state,
				newCharacter: defaultState.newCharacter,
			};
		case "characters/setBusy":
			return {
				...state,
				isBusy: action.payload,
			};
		case "characters/setDisplayCharacter":
			return {
				...state,
				displayCharacter: action.payload,
			};
		case "characters/setCharacters":
			return {
				...state,
				characters: action.payload,
			};
		case "characters/setCreatingCharacter":
			return {
				...state,
				creatingCharacter: action.payload.creating,
			};
		case "characters/charactersCreated":
			return {
				...state,
				characters: action.payload.characters,
				newCharacter: defaultState.newCharacter,
				creatingCharacter: false,
				isBusy: false,
			};
		case "characters/setDeleting":
			return {
				...state,
				isDeleting: action.payload.deleting,
			};
		case "characters/charactersDeleted":
			return {
				...state,
				characters: action.payload,
				isDeleting: false,
				isBusy: false,
			};
		case "characters/setNewCharacter":
			return {
				...state,
				newCharacter: action.payload,
			};
		case "characters/setLoading":
			return {
				...state,
				isLoading: action.payload.loading,
			};
		default:
			return state;
	}
};

export default charactersReducer;
