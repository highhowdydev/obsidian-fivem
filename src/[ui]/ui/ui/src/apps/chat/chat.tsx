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

const CHANNELS = ["all", "ooc", "me", "dispatch", "staff"] as const;

export default function Chat() {
	const [message, setMessage] = useState("");
	const messageHistory = useRef<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const state = useSelector((state: RootState) => state.chat);
	const inputRef = useRef<HTMLInputElement>(null);
	const messageBoxRef = useRef<HTMLDivElement>(null);

	const closeChatHandler = async (keepVisible?: boolean) => {
		await fetchNui("onCloseChatUI");
		setMessage("");

		store.dispatch({
			type: "chat/setOpen",
			payload: { open: false },
		});
	};

	const handleSubmitChat = () => {
		if (!message || !message.trim().length) return;

		messageHistory.current.unshift(message);
		messageHistory.current = messageHistory.current.slice(0, 10);
		setHistoryIndex(-1);

		setMessage("");
		fetchNui("chatResult", {
			message,
			channel: state.channel,
		});
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

	const handleKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
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

	useEffect(() => {
		clearInterval(state.interval);

		if (state.visible && !isEnvBrowser()) {
			const interval = setTimeout(() => {
				store.dispatch({
					type: "chat/setVisible",
					payload: { visible: false },
				});
				clearInterval(interval);
			}, 5000);

			store.dispatch({
				type: "chat/setInterval",
				payload: { interval },
			});
		}
	}, [state.visible]);

	useEffect(() => {
		if (!focus) return;
		setMessage("");
		inputRef.current?.focus();
	}, [state.open]);

	useEffect(() => {
		if (historyIndex === -1) return;
		setMessage(messageHistory.current[historyIndex]);
	}, [historyIndex]);

	useEffect(() => {
		if (!state.visible) return;

		messageBoxRef.current?.scrollTo({
			top: messageBoxRef.current.scrollHeight,
		});
	}, [state.messages, state.channel]);

	useKeyListener("Escape", () => {
		if (!state.open) return;
		closeChatHandler();
	});

	const messages = getFilteredChannelMessages(state.messages, state.channel);
	const command = message.split(" ")[0];

	return (
		<div className='absolute top-0 left-0 w-full' tabIndex={-1}>
			<AnimatePresence>
				{state.visible ||
					(state.open && (
						<motion.div
							onKeyDown={(e: any) => e.key === "Tab" && handleTabPress(e)}
							{...anims.slideRight}
							className='absolute top-[1vh] left-[1vh] w-[30rem] h-fit flex flex-col overflow-hidden pointer-events-none space-y-2'
						>
							<div
								tabIndex={-1}
								className='h-[20rem] w-full overflow-y-scroll space-y-2'
								ref={messageBoxRef}
							>
								{messages.map((message, index) => (
									<ChatMessage
										key={index}
										message={message.message}
										channel={message.channel}
										author={message.author}
									/>
								))}
							</div>
							{state.open && (
								<motion.div
									{...anims.fade}
									className='flex gap-1 items-center justify-center transition-all duration-300'
								>
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
								</motion.div>
							)}
							{command && command.trim().length && <Suggestions command={command} fullText={message} />}
						</motion.div>
					))}
			</AnimatePresence>
		</div>
	);
}
