import { isEnvBrowser } from "@utils/index";
import { ChatState } from "./types";

export const defaultState: ChatState = {
	visible: false,
	interval: -1,
	open: isEnvBrowser() ? true : false,
	channel: "all",
	messages: [],
	suggestions: [
		{
			name: "/me",
			help: "Say something",
			params: [
				{
					name: "message",
					help: "The message you want to say",
				},
			],
		},
	],
};

export const chatReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case "chat/setVisible":
			return {
				...state,
				visible: action.payload.visible,
			};
		case "chat/setOpen":
			return {
				...state,
				open: action.payload.open,
			};
		case "chat/setInterval":
			return {
				...state,
				interval: action.payload.interval,
			};
		case "chat/setChannel":
			return {
				...state,
				channel: action.payload.channel,
			};
		case "chat/addMessage":
			return {
				...state,
				messages: [...state.messages, action.payload.message],
			};
		default:
			return state;
	}
};

export default chatReducer;
