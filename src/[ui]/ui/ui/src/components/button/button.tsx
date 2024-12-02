import React from "react";
import { cn } from "../../utils/styles";

import { buttonVariants, type ButtonProps } from "./variants";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";

export { Button };
