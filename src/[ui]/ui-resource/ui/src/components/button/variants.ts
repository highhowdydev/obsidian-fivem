import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva(
	`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none
	focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`,
	{
		variants: {
			variant: {
				default: "bg-slate-900 text-white hover:bg-slate-800",
			},
			size: {
				md: "text-sm h-9 px-5 rounded-md",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
