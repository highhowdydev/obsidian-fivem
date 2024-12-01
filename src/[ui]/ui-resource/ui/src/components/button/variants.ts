import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// <a
// 	href='#_'
// 	class='relative block w-auto px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-50 hover:text-black hover:bg-white'
// >
// 	Button Text
// </a>;

export const buttonVariants = cva(
	'inline-flex items-center justify-center block w-auto px-6 py-3 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-md bg-gray-50 hover:text-black hover:bg-white transition-colors duration-150',
	{
		variants: {
			variant: {
				primary: "bg-primary-700 text-white hover:bg-primary-600 hover:text-white",
			},
			size: {
				sm: "text-xs py-1 px-3",
				md: "text-sm py-2 px-4",
				lg: "text-base py-3 px-6",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "lg",
		},
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
