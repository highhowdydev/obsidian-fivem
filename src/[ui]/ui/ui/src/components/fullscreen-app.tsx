import { cn } from "@utils/styles";

type FullscreenAppProps = {
	children: React.ReactNode;
	className?: string;
	disablePointerEvents?: boolean;
};

export default function FullscreenApp({ children, className, disablePointerEvents }: FullscreenAppProps) {
	return (
		<div
			className={cn(
				"absolute w-screen h-screen top-0 left-0 overflow-hidden",
				disablePointerEvents && "pointer-events-none",
				className,
			)}
		>
			{children}
		</div>
	);
}
