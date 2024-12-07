import { isEnvBrowser } from "@utils/index";
import { HandlingEditorState } from "./types";

export const defaultState: HandlingEditorState = {
	search: "",
	vehicle: isEnvBrowser() ? "sultan" : "",
	fields: [
		{
			name: "fInitialDriveForce",
			description: "Modifies the game's calculation of drive force (from the output of the transmission).",
			value: { type: "float", value: 0.5 },
		},
		{
			name: "vecCentreOfMassOffset",
			description: "The offset of the vehicle's center of mass from the origin of the vehicle model.",
			value: {
				type: "vector",
				value: [0.0, 0.0, 0.0],
			},
		},
		{
			name: "nInitialDriveGears",
			description:
				"Determines how many forward speeds/gearss a vehicle's transmission contains. Must be between 1 and 6.",
			value: { type: "integer", value: 6 },
		},
	],
};

export const chatReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case "handling/setSearch":
			return { ...state, search: action.payload };
		case "handling/setVehicleName":
			return { ...state, vehicle: action.payload.values };
		case "handling/init":
			return {
				...state,
				fields: action.payload.fields,
				vehicle: action.payload.vehicle ?? "",
			};
		case "handling/setFieldValid":
			return {
				...state,
				fields: state.fields.map(field =>
					field.name === action.payload.name
						? {
								...field,
								value: {
									...field.value,
									value: action.payload.value,
								},
						  }
						: field,
				),
			};
		case "handling/cleanup":
			return defaultState;
		default:
			return state;
	}
};

export default chatReducer;
