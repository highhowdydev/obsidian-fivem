import { cn } from "@utils/styles";
import { getChannelColor } from "../utils";

type ChatMessageProps = {
	message: string;
	channel: string;
	author: string;
};

export default function ChatMessage({ message, channel, author }: ChatMessageProps) {
	return (
		<div
			tabIndex={-1}
			className={cn(
				"px-3 py-2 rounded-sm shadow-sm bg-gray-base/70 w-fit text-sm grid grid-cols-[auto_1fr] gap-2 items-start justify-start border-b-2",
				getChannelColor(channel),
			)}
		>
			<div className='flex flex-col mr-auto'>
				<div className='text-md shadow-sm font-medium leading-tight'>{author}</div>
				<p className='leading-snug text-xs text-white/90'>{message}</p>
			</div>
		</div>
	);
}
