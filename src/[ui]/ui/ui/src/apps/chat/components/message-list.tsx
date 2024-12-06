import { RootState, store } from "@store/index";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import anims from "@styles/anims";
import { getFilteredChannelMessages } from "../utils";
import ChatMessage from "./chat-message";
import { ChatInput } from "./chat-input";

export function MessageList() {
	const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null);
	const state = useSelector((state: RootState) => state.chat);
	const messageBoxRef = useRef<HTMLDivElement>(null);
	const messages = getFilteredChannelMessages(state.messages, state.channel);

	useEffect(() => {
		if (closeTimer) clearInterval(closeTimer);

		const timeout = setTimeout(() => {
			store.dispatch({ type: "chat/setVisible", payload: { visible: false } });
			setCloseTimer(null);
		}, 3500);

		setCloseTimer(timeout);

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [state.visible]);

	useEffect(() => {
		if (!state.visible) return;

		messageBoxRef.current?.scrollTo({
			top: messageBoxRef.current.scrollHeight,
		});
	}, [state.messages, state.channel]);

	return (
		<motion.div
			tabIndex={-1}
			{...anims.slideRight}
			className='absolute top-[1vh] left-[1vh] w-[30rem] h-fit flex flex-col overflow-hidden pointer-events-none space-y-2'
		>
			<div tabIndex={-1} className='h-[20rem] w-full overflow-y-scroll space-y-2' ref={messageBoxRef}>
				{messages.map((message, index) => (
					<ChatMessage
						key={index}
						message={message.message}
						channel={message.channel}
						author={message.author}
					/>
				))}
			</div>
			<AnimatePresence>{state.open && <ChatInput />}</AnimatePresence>
		</motion.div>
	);
}
