import { RootState } from "@store/index";
import { AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import { MessageList } from "./components/message-list";

export default function Chat() {
	const state = useSelector((state: RootState) => state.chat);
	const showMessages = state.visible || state.open;

	return (
		<div className='absolute top-0 left-0 w-full' tabIndex={-1}>
			<AnimatePresence>{showMessages && <MessageList />}</AnimatePresence>
		</div>
	);
}
