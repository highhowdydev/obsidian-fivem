import { Input } from "@mantine/core";
import { RootState, store } from "@store/index";
import anims from "@styles/anims";
import { fetchNui } from "@utils/index";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const CHANNELS = ["all", "ooc", "me", "dispatch", "staff"] as const;

export default function Chat() {
	const state = useSelector((state: RootState) => state.chat);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleTabPress = (e: KeyboardEvent) => {
		e.preventDefault();
		const currentChannel = state.channel;
		const channel = CHANNELS[CHANNELS.indexOf(currentChannel) + 1];

		if (channel) {
			store.dispatch({
				type: "chat/setChannel",
				payload: { channel },
			});
		} else {
			store.dispatch({
				type: "chat/setChannel",
				payload: { channel: CHANNELS[0] },
			});
		}
	};

	useEffect(() => {
		if (!focus) return;
		inputRef.current?.focus();
	}, [state.visible]);

	return (
		<div
			className='absolute top-0 left-0 w-full'
			onKeyDown={e => {
				switch (e.key) {
					case "Tab":
						e.preventDefault();
						break;
					case "Escape":
						if (!state.visible) return;
						fetchNui("onCloseChatUI");
						store.dispatch({
							type: "chat/setVisible",
							payload: { visible: false },
						});
						break;
					default:
						break;
				}
			}}
		>
			<AnimatePresence>
				{state.visible && (
					<motion.div
						onKeyDown={(e: any) => e.key === "Tab" && handleTabPress(e)}
						{...anims.slideRight}
						className='absolute top-[1vh] left-[1vh] w-[30rem] h-fit flex flex-col overflow-hidden pointer-events-none'
					>
						<div className='h-[20rem] w-full overflow-y-scroll'>
							<div className='p-3 rounded-sm shadow-sm bg-gray-base/70 w-fit text-sm flex gap-2 items-center'>
								<div className='text-xs p-1 rounded-sm bg-gray-base shadow-sm w-fit'>OOC</div>
								This is a message
							</div>
						</div>
						<div className='flex gap-1 items-center justify-center transition-all duration-300'>
							<div className='transition-transform duration-300 w-fit flex items-center justify-center text-xs uppercase font-medium bg-gray-base p-3 rounded-sm'>
								{state.channel}
							</div>
							<Input
								ref={inputRef}
								className='w-full transition-all duration-300'
								placeholder='Press TAB to cycle channels'
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
