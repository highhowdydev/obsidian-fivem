import { isEnvBrowser } from "../../utils";

const initialState = {
	application: isEnvBrowser() ? "characters" : "characters",
	debug: false,
	init: false,
	blobs: [],
};

const rootReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case "root/setApplication":
			return {
				...state,
				application: action.payload.application,
			};
		case "root/setDebug":
			return {
				...state,
				debug: action.payload.debug,
			};
		case "root/initialize":
			return {
				...state,
				init: true,
			};
		default:
			return state;
	}
};

export default rootReducer;
