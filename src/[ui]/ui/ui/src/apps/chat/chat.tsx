import { Input } from "@mantine/core";
import { RootState, store } from "@store/index";
import anims from "@styles/anims";
import { fetchNui, isEnvBrowser } from "@utils/index";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./components/chat-message";
import { cn } from "@utils/styles";
import { getChannelColor, getFilteredChannelMessages } from "./utils";
import { useKeyListener } from "@hooks/useKeyListener";
import Suggestions from "./components/suggestions";
import { MessageList } from "./components/message-list";

const CHANNELS = ["all", "ooc", "me", "dispatch", "staff"] as const;

export default function Chat() {
	// const messageHistory = useRef<string[]>([]);
	// const [historyIndex, setHistoryIndex] = useState(-1);
	const state = useSelector((state: RootState) => state.chat);
	// const inputRef = useRef<HTMLInputElement>(null);
	const messageBoxRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (!focus) return;
	// 	setMessage("");
	// 	inputRef.current?.focus();
	// }, [state.open]);

	// useEffect(() => {
	// 	if (historyIndex === -1) return;
	// 	setMessage(messageHistory.current[historyIndex]);
	// }, [historyIndex]);

	useEffect(() => {
		if (!state.visible) return;

		messageBoxRef.current?.scrollTo({
			top: messageBoxRef.current.scrollHeight,
		});
	}, [state.messages, state.channel]);

	const showMessages = state.visible || state.open;

	return (
		<div className='absolute top-0 left-0 w-full' tabIndex={-1}>
			<AnimatePresence>
				{showMessages && <MessageList />}
			</AnimatePresence>
		</div>
	);
}
