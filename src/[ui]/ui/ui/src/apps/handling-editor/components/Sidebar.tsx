import { FaFileCode, FaFileImport, FaSave } from "react-icons/fa";
import SidebarBtn from "./SidebarBtn";
import { useState } from "react";
import { fetchNui } from "@utils/index";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

const Delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export default function Sidebar() {
	const state = useSelector((state: RootState) => state.handlingEditor);
	const [disabled, setDisabled] = useState(false);
	const [name, setName] = useState("");

	async function handleSave() {
		setDisabled(true);
		await fetchNui("handling/save", {
			fields: state.fields,
			vehicle: state.vehicle,
			name,
		});
		await Delay(100);
		setDisabled(false);
		setName("");
	}

	async function handleMergeRequest() {
		setDisabled(true);
		await fetchNui("handling/mergeJson");
		setDisabled(false);
	}

	return (
		<div className='w-fit h-full bg-gray-base shadow-md rounded-sm p-2 flex flex-col gap-2'>
			<SidebarBtn disabled={disabled} tooltip='Save Handling JSON' icon={<FaSave />} onClick={handleSave} />
			<SidebarBtn
				disabled={disabled}
				tooltip='Import JSON file'
				icon={<FaFileImport />}
				onClick={() => console.log("Load")}
			/>
			<SidebarBtn
				disabled={disabled}
				tooltip='Merge all JSON to meta file'
				icon={<FaFileCode />}
				onClick={handleMergeRequest}
			/>
		</div>
	);
}
