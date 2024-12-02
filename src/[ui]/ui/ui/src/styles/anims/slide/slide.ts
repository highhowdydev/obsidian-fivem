export const slideUp = {
	initial: {
		y: 350,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: {
		y: 350,
		opacity: 0,
	},
	transition: {
		y: { type: "tween", bounce: 0 },
	},
} as const;

export const slideDown = {
	initial: {
		y: -350,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: {
		y: -350,
		opacity: 0,
	},
	transition: {
		y: { type: "tween", bounce: 0 },
	},
} as const;

export const slideLeft = {
	initial: {
		x: 100,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: 100,
		opacity: 0,
	},
	transition: {
		x: { type: "tween", bounce: 0 },
	},
} as const;

export const slideRight = {
	initial: {
		x: -100,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: -100,
		opacity: 0,
	},
	transition: {
		x: { type: "tween", bounce: 0 },
	},
} as const;
