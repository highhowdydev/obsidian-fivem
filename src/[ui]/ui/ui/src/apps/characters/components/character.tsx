import { CharacterType } from "@store/reducers/characters/types";
import store from "@store/store";
import { cn } from "@utils/styles";
import { FaPlus } from "react-icons/fa";

type CharacterProps = {
	character: CharacterType | null;
};

export default function Character({ character }: CharacterProps) {
	return (
		<div
			className={cn(
				"w-[12vh] h-[12vh] bg-gray-base/95 p-2 relative border-gray-highlight/15 border-2 hover:border-gray-highlight/30 overflow-hidden rounded-md",
				"transition-colors duration-300",
			)}
		>
			<div
				className='absolute top-0 left-0 w-full h-full pointer-events-none'
				style={{
					background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 100%)`,
					opacity: "12%",
				}}
			></div>
			{character ? <h1>Character</h1> : <NewCharacter />}
		</div>
	);
}

function NewCharacter() {
	const handleCreateCharacter = () => {
		store.dispatch({
			type: "characters/setCreatingCharacter",
			payload: {
				creating: true,
			},
		});
	};

	return (
		<div
			onClick={handleCreateCharacter}
			className={cn(
				"text-4xl text-white/20 flex items-center justify-center w-full h-full hover:text-white/75",
				"transition-colors duration-300",
			)}
		>
			<FaPlus />
		</div>
	);
}
