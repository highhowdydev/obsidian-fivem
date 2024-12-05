import { RootState, store } from "@store/index";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import anims from "@styles/anims";
import { cn } from "@utils/styles";
import { getChannelColor } from "../utils";
import { Input } from "@mantine/core";
import { fetchNui } from "@utils/index";
import Suggestions from "./suggestions";
import { useKeyListener } from "@hooks/useKeyListener";

const CHANNELS = ["all", "ooc", "me", "dispatch", "staff"] as const;

export function ChatInput() {
	const state = useSelector((state: RootState) => state.chat);
	const [message, setMessage] = useState("");
	const messageHistory = useRef<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	useKeyListener("Escape", () => {
		if (!state.open) return;
		closeChatHandler();
	});

	const closeChatHandler = async () => {
		fetchNui("onCloseChatUI");
		setMessage("");

		store.dispatch({ type: "chat/setVisible", payload: { visible: true } });
		store.dispatch({ type: "chat/setOpen", payload: { open: false } });
	};

	const handleTabPress = (e: KeyboardEvent) => {
		e.preventDefault();

		const currentChannel = state.channel;
		const channel = CHANNELS[CHANNELS.indexOf(currentChannel) + 1];

		if (channel)
			store.dispatch({
				type: "chat/setChannel",
				payload: { channel },
			});
		else
			store.dispatch({
				type: "chat/setChannel",
				payload: { channel: CHANNELS[0] },
			});
	};

	const handleSubmitChat = () => {
		if (!message || !message.trim().length) return;

		messageHistory.current.unshift(message);
		messageHistory.current = messageHistory.current.slice(0, 10);
		setHistoryIndex(-1);

        closeChatHandler();

		fetchNui("chatResult", {
			message,
			channel: state.channel,
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case "Tab":
				handleTabPress(e as unknown as KeyboardEvent);
				break;
			case "Enter":
				handleSubmitChat();
				break;
			case "ArrowUp":
				if (historyIndex + 1 < messageHistory.current.length) setHistoryIndex(historyIndex + 1);
				break;
			case "ArrowDown":
				if (historyIndex - 1 >= 0) setHistoryIndex(historyIndex - 1);
				break;
		}
	};

	const command = message.split(" ")[0];

	return (
		<motion.div {...anims.fade} className='flex gap-1 items-center justify-center transition-all duration-300'>
			<div
				className={cn(
					"transition-transform duration-300 w-fit flex items-center justify-center text-xs uppercase font-medium bg-gray-base p-2 rounded-sm",
					"border-b",
					getChannelColor(state.channel),
				)}
			>
				{state.channel}
			</div>
			<Input
				onBlur={() => state.open && inputRef.current?.focus()}
				value={message}
				onChange={e => setMessage(e.target.value)}
				maxLength={150}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				className='w-full transition-all duration-300'
				placeholder='Press TAB to cycle channels'
			/>
			{command && command.trim().length && <Suggestions command={command} fullText={message} />}
		</motion.div>
	);
}
