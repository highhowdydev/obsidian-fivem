export type ChatResult = {
    message: string;
    channel: string;
}

export type ChatCommandSuggestion = {
    name: string;
    help: string;
    params: ChatCommandSuggestionParam[];
}

export type ChatCommandSuggestionParam = {
    help: string;
    name: string;
}