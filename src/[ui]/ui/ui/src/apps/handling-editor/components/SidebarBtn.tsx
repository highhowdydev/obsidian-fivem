import { Tooltip } from "@mantine/core";
import { cn } from "@utils/styles";

type SidebarBtnProps = {
	onClick: () => void;
	disabled?: boolean;
	icon: React.ReactNode;
	tooltip: string;
};

export default function SidebarBtn({ onClick, disabled, icon, tooltip }: SidebarBtnProps) {
	return (
		<Tooltip label={tooltip} color='dark'>
			<button
				onClick={onClick}
				disabled={disabled}
				className={cn(
					"w-10 h-10 rounded-md flex items-center justify-center bg-gray-base border border-white border-opacity-0 transition-all duration-200",
					disabled ? "cursor-not-allowed opacity-40" : "hover:border-opacity-20",
				)}
			>
				{icon}
			</button>
		</Tooltip>
	);
}
