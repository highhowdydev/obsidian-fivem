export type ChatState = {
	visible: boolean;
	interval: number;
	open: boolean;
	channel: string;
	messages: ChatMessage[];
};

export type ChatMessage = {
	message: string;
	channel: string;
	author: string;
};
