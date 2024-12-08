import { Button, Modal, Select } from "@mantine/core";
import { useState } from "react";

type JsonListProps = {
	opened: boolean;
	close: () => void;
	list: string[];
};

export default function JsonList({ opened, close, list }: JsonListProps) {
	const [value, setValue] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function loadPreset() {}

	return (
		<Modal
			closeOnEscape={!loading}
			withCloseButton={!loading}
			closeOnClickOutside={!loading}
			centered
			opened={opened}
			onClose={close}
			title='Import Handling File'
		>
			<div className='flex flex-col gap-2'>
				<Select
					searchable
					onChange={opt => setValue(opt)}
					value={value}
					label='Handling File'
					placeholder='Choose Handling File...'
					data={list}
					allowDeselect={false}
				/>
				<Button onClick={loadPreset} disabled={!value}>
					Load File
				</Button>
			</div>
		</Modal>
	);
}
