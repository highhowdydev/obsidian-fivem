import { FaFileCode, FaFileImport, FaSave } from "react-icons/fa";
import SidebarBtn from "./SidebarBtn";
import { useState } from "react";
import { fetchNui } from "@utils/index";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import JsonList from "./JsonList";

const Delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

type SidebarProps = {
	isDisabled: boolean;
};

export default function Sidebar({ isDisabled }: SidebarProps) {
	const state = useSelector((state: RootState) => state.handlingEditor);
	const [disabled, setDisabled] = useState(false);
	const [name, setName] = useState("");
	const [importList, setImportList] = useState<string[]>([]);
	const [importOpened, { open: importOpen, close: importClosed }] = useDisclosure(false);

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

	const handleLoadPresetRequest = async () => {
		setDisabled(true);
		const result: string[] = await fetchNui("handling/loadJsonList");
		if (!result || !result.length) return;
		setImportList(result);
		importOpen();
		setDisabled(false);
	};

	async function handleMergeRequest() {
		setDisabled(true);
		await fetchNui("handling/mergeJson");
		setDisabled(false);
	}

	return (
		<div className='w-fit h-full bg-gray-base shadow-md rounded-sm p-2 flex flex-col gap-2'>
			<SidebarBtn
				disabled={disabled || isDisabled}
				tooltip='Save Handling JSON'
				icon={<FaSave />}
				onClick={handleSave}
			/>
			<SidebarBtn
				disabled={disabled || isDisabled}
				tooltip='Import JSON file'
				icon={<FaFileImport />}
				onClick={handleLoadPresetRequest}
			/>
			<JsonList opened={importOpened} close={importClosed} list={importList} />
			<SidebarBtn
				disabled={disabled || isDisabled}
				tooltip='Merge all JSON to meta file'
				icon={<FaFileCode />}
				onClick={handleMergeRequest}
			/>
		</div>
	);
}
