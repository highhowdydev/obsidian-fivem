export type ChatState = {
	visible: boolean;
	interval: number;
	open: boolean;
	channel: string;
	messages: ChatMessage[];
	suggestions: ChatCommandSuggestion[];
};

export type ChatMessage = {
	message: string;
	channel: string;
	author: string;
};

export type ChatCommandSuggestion = {
	name: string;
	help: string;
	params: ChatCommandSuggestionParam[];
};

export type ChatCommandSuggestionParam = {
	help: string;
	name: string;
};
