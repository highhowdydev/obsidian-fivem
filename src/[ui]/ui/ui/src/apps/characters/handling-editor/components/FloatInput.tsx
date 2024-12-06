import { Input } from "@mantine/core";

type FloatInputProps = {
	value: number;
	onChange: (value: number) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	disabled?: boolean;
	min?: number;
	max?: number;
};

export default function FloatInput({ value, onChange, onBlur, onFocus, disabled, step, min, max }) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value = parseFloat(event.target.value);
		if (!isNaN(value)) onChange(value.toFixed(3));
	};

	return (
		<Input
			value={value}
			onChange={handleInputChange}
			onBlur={onBlur}
			onFocus={onFocus}
			disabled={disabled}
			step={step}
			min={min}
			max={max}
		/>
	);
}
