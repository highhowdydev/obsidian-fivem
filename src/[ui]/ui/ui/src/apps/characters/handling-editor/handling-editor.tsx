import FullscreenApp from "@components/fullscreen-app";
import { RootState } from "@store/index";
import { HandlingField } from "@store/reducers/handling-editor/types";
import anims from "@styles/anims";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import FloatInput from "./components/FloatInput";

export default function HandlingEditor() {
	const state = useSelector((state: RootState) => state.handlingEditor);

	return (
		<FullscreenApp>
			<motion.div {...anims.slideRight} className='absolute top-0 left-0 py-[1vh] pl-[1vh] w-[25rem] h-full'>
				<div className='h-full w-full bg-gray-base rounded-sm overflow-hidden shadow-lg p-6 flex flex-col space-y-4'>
					<h1 className='text-2xl font-bold'>{state.vehicle}</h1>
					<div className='h-full w-full overflow-y-auto'>
						{state.fields.map((field: HandlingField) => {
							const { name, value } = field;
							const { type, value: fieldValue } = value;

							return (
								<FloatInput
									key={name}
									value={fieldValue as number}
									onChange={(value: string) => undefined}
								/>
							);
						})}
					</div>
				</div>
			</motion.div>
		</FullscreenApp>
	);
}
