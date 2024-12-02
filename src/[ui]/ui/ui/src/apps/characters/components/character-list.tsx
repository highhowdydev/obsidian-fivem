import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Character from "./character";

export default function CharacterList() {
	const { characters } = useSelector((state: RootState) => state.characters);

	return (
		<motion.div className='absolute bottom-[4vh] flex-col gap-[1.5vh] mx-auto left-0 right-0 flex items-center w-fit'>
			<div className='leading-[1.4vh] self-start text-levt pl-[0.5vh] select-none'>
				<h1 className='text-4xl font-extrabold drop-shadow-lg'>Characters</h1>
				<p className='text-white/80 pl-[.1vh] drop-shadow-lg'>Select or create a character</p>
			</div>
			<div className='flex gap-4'>
				{characters?.map((character, index) => (
					<Character key={index} character={character} />
				))}
			</div>
		</motion.div>
	);
}
