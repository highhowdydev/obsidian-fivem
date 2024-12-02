import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva("font-semibold inline-flex transition-colors duration-150", {
	variants: {
		size: {
			sm: "text-xs py-1 px-3",
			md: "text-sm py-2 px-4",
			lg: "text-base py-3 px-6",
		},
		rounding: {
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			full: "rounded-full",
		},
		color: {
			primary: "bg-primary-700 hover:bg-primary-600 border-primary-700 hover:border-primary-600",
		},
		variant: {
			default: "",
			outline: "border bg-transparent",
			ghost: "bg-opacity-0 hover:bg-opacity-25",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		color: "primary",
		rounding: "sm",
	},
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
