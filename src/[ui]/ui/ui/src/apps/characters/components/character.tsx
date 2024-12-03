import { RootState } from "@store/index";
import { CharacterType } from "@store/reducers/characters/types";
import store from "@store/store";
import { CloseApplication } from "@utils/application";
import { fetchNui } from "@utils/index";
import { cn } from "@utils/styles";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

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
			{character ? <ExistingCharacterSlot character={character} /> : <NewCharacterSlot />}
		</div>
	);
}

function ExistingCharacterSlot({character}: CharacterProps) {
	const isBusy = useSelector((state: RootState) => state.characters.isBusy);

	const handleSelectCharacter = async () => {
		if (isBusy) return;

		store.dispatch({
			type: "characters/setBusy",
			payload: true,
		})

		const result: any = await fetchNui("characters:selectCharacter", character);

		if (result.success === true) {
			store.dispatch({
				type: "characters/reset"
			})

			CloseApplication("characters");
			return;
		}

		store.dispatch({
			type: "characters/setBusy",
			payload: false
		})
	}

	return (
		<div onDoubleClick={handleSelectCharacter} className={cn("flex flex-col w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-300 overflow-hidden")}>
			<div className="mt-auto text-center lime-clamp-1 z-50">
				{character?.data.firstName} {character?.data.lastName}
			</div>
		</div>
	)
}

function NewCharacterSlot() {
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
