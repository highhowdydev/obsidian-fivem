export const scale = {
	initial: {
		scale: 0,
        opacity: 0,
	},
	animate: {
		scale: 1,
        opacity: 1,
	},
	exit: {
		scale: 0,
        opacity: 0,
	},
	transition: {
		scale: { type: "tween", bounce: 0 },
	},
} as const;
