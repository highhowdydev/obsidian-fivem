import { Input } from "@mantine/core";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { Tooltip } from "@mantine/core";

type FloatInputProps = {
	name: string;
	description?: string;
	value: number;
	onChange: (value: number, type: string, skipVehicleChange: boolean) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	disabled?: boolean;
	min?: number;
	max?: number;
};

export default function FloatInput({
	name,
	description,
	value,
	onChange,
	onBlur,
	onFocus,
	disabled,
	min,
	max,
}: FloatInputProps) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (!event.target.value.trim().length) return onChange(+event.target.value, "float", true);
		const value = parseFloat(event.target.value);
		if (!isNaN(value)) onChange(value, "float", false);
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
			<Input
				className='w-full'
				value={value}
				type='number'
				step={0.01}
				onChange={handleInputChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				min={min}
				max={max}
			/>
		</div>
	);
}
