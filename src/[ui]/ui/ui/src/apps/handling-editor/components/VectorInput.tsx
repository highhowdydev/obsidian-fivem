import { Input } from "@mantine/core";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { Tooltip } from "@mantine/core";
import { VectorValue } from "@store/reducers/handling-editor/types";

type VectorInputProps = {
	name: string;
	description?: string;
	value: VectorValue;
	onChange: (value: VectorValue, type: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	disabled?: boolean;
	min?: number;
	max?: number;
};

export default function VectorInput({
	name,
	description,
	value,
	onChange,
	onBlur,
	onFocus,
	disabled,
	min,
	max,
}: VectorInputProps) {
	const handleInputChange = (change: string, index: number): void => {
        const newValue = [...value];
        newValue[index] = parseFloat(change);
        onChange(newValue as VectorValue, "vector");
    };

	return (
		<div className='space-y-2 w-full'>
			<div className='flex items-center justify-between'>
				<h1 className='text-md'>{name}</h1>
				{description && (
					<Tooltip color="dark" label={description}>
						<HiMiniQuestionMarkCircle size={20} className='text-gray-300' />
					</Tooltip>
				)}
			</div>
			<div className='grid grid-cols-3 space-x-2'>
				{value.map((v, i) => (
					<Input
						key={i}
						value={v}
						type='number'
						step={0.01}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleInputChange(event.target.value, i)
						}
						onBlur={onBlur}
						onFocus={onFocus}
						disabled={disabled}
						min={min}
						max={max}
					/>
				))}
			</div>
		</div>
	);
}
