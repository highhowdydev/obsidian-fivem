import { ChatState } from "./types";

export const defaultState: ChatState = {
	visible: true,
	channel: "all",
};

export const chatReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case "chat/setVisible":
			return {
				...state,
				visible: action.payload.visible,
			}
		case "chat/setChannel":
			return {
				...state,
				channel: action.payload.channel,
			}
		default:
			return state;
	}
};

export default chatReducer;
