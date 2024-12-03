import { ChatMessage } from "@store/reducers/chat/types";

export function getChannelColor(channel: string) {
    switch (channel.toLowerCase()) {
        case "all":
            return "border-white";
        case "ooc":
            return "border-green-500";
        case "me":
            return "border-yellow-500";
        case "dispatch":
            return "border-blue-500";
        case "staff":
            return "border-red-500";
        default:
            return "border-gray-base";
    }
}

export function getFilteredChannelMessages(messages: ChatMessage[], channel: string) {
    if (channel === "all") return messages;
    return messages.filter((message) => message.channel === channel);
}
