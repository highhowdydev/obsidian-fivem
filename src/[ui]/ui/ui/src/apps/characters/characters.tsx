import { useSelector } from "react-redux";
import { RootState } from "store";
import { AnimatePresence, motion } from "motion/react";
import CharacterList from "./components/character-list";
import NewCharacter from "./components/new-character";

function Characters() {
	const state = useSelector((state: RootState) => state.characters);

	return (
		<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='h-full w-full relative'>
			<AnimatePresence>{!state.creatingCharacter && <CharacterList />}</AnimatePresence>
			<AnimatePresence>{state.creatingCharacter && <NewCharacter />}</AnimatePresence>
		</motion.div>
	);
}

export default Characters;
