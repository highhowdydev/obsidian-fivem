import FullscreenApp from "@components/fullscreen-app";
import { RootState, store } from "@store/index";
import { HandlingField, VectorValue } from "@store/reducers/handling-editor/types";
import anims from "@styles/anims";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import FloatInput from "./components/FloatInput";
import VectorInput from "./components/VectorInput";
import IntegerInput from "./components/IntegerInput";
import { fetchNui } from "@utils/index";
import useKeyPress from "@hooks/useKeyPress";
import { useKeyListener } from "@hooks/useKeyListener";
import { CloseApplication } from "@utils/application";
import Sidebar from "./components/Sidebar";
import { Input } from "@mantine/core";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function HandlingEditor() {
	const state = useSelector((state: RootState) => state.handlingEditor);
	const [search, setSearch] = useState("");

	useKeyListener("Escape", () => CloseApplication("handling-editor"));

	const handleInputChange = (name: string, value: any, type: string) => {
		console.log(type);
		fetchNui("handling/setField", { name, value, type });
		store.dispatch({ type: "handling/setFieldValid", payload: { name, value, type } });
	};

	const filteredFields = state.fields.filter((field: HandlingField) => {
		return field.name.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<motion.div
			{...anims.slideRight}
			className='absolute top-0 left-0 py-[1vh] pl-[1vh] w-[30rem] h-full flex space-x-2'
		>
			<Sidebar />
			<div className='h-full w-full bg-gray-base rounded-sm overflow-hidden shadow-lg p-6 flex flex-col space-y-4'>
				<div className='flex flex-col gap-4'>
					<div className='title'>
						<h1 className='text-2xl font-bold'>Handling Editor</h1>
						<p className="text-sm opacity-70">You are modifying the handling files for the {state.vehicle}</p>
					</div>
					<Input leftSection={<FaSearch />} value={search} onChange={e => setSearch(e.target.value)} />
				</div>
				<div className='h-full w-full overflow-y-auto space-y-4'>
					{filteredFields.map((field: HandlingField) => {
						const { name, value, description } = field;

						switch (value.type) {
							case "float":
								return (
									<FloatInput
										name={name}
										key={name}
										description={description}
										value={value.value}
										onChange={(value: any, type: string) => handleInputChange(name, value, type)}
									/>
								);
							case "vector":
								return (
									<VectorInput
										name={name}
										key={name}
										description={description}
										value={value.value as VectorValue}
										onChange={(value: any, type: string) => handleInputChange(name, value, type)}
									/>
								);
							case "integer":
								return (
									<IntegerInput
										name={name}
										key={name}
										description={description}
										value={value.value as number}
										onChange={(value: any, type: string) => handleInputChange(name, value, type)}
									/>
								);
							default:
								return null;
						}
					})}
				</div>
			</div>
		</motion.div>
	);
}
