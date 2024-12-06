import { isEnvBrowser } from "@utils/index";
import { ChatState } from "./types";

export const defaultState: ChatState = {
	visible: false,
	interval: -1,
	open: isEnvBrowser() ? false : false,
	channel: "all",
	messages: [
		{
			message: "Welcome to the chat!",
			author: "Author",
			channel: "ooc",
		}
	],
	suggestions: [
		{
			name: "/me",
			help: "Say something",
			params: [
				{
					name: "message",
					help: "The message you want to say",
				},
				{
					name: "networked",
					help: "Whether the message should be networked (true/false)",
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
		case "chat/addSuggestion":
			return {
				...state,
				suggestions: [...state.suggestions, action.payload.suggestion],
			};
		case "chat/removeSuggestion":
			return {
				...state,
				suggestions: state.suggestions.filter(suggestion => suggestion.name !== action.payload.name),
			};
		case "chat/clear":
			return {
				...state,
				messages: [],
			};
		default:
			return state;
	}
};

export default chatReducer;
