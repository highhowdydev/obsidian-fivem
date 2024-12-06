import { isEnvBrowser } from "@utils/index";
import { HandlingEditorState } from "./types";

export const defaultState: HandlingEditorState = {
	search: "",
	vehicle: isEnvBrowser() ? "Karin Sultan RS" : "",
	fields: [
		{
			name: "fInitialDriveForce",
			description: "Modifies the game's calculation of drive force (from the output of the transmission).",
			value: { type: "float", value: 0.5 },
		}
	],
};

export const chatReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case "handling/setSearch":
			return { ...state, search: action.payload };
		case "handling/setVehicleName":
			return { ...state, vehicle: action.payload };
		case "handling/init":
			return {
				...state,
				fields: action.payload.fields,
				vehicle: action.payload.vehicle ?? "",
			}
		case "handling/reset":
			return defaultState;
		default:
			return state;
	}
};

export default chatReducer;
