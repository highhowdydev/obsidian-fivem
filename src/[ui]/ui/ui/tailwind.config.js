/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "node_modules/preline/dist/*.js"],
	plugins: [require("preline/plugin"), require("tailwindcss-animate")],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)"],
			},
			colors: {
				dark: "#181823",
				primary: "#5e34eb",
				secondary: "#111118",
				accent: "#70c28e",
				text: "#ededf2",
				background: "#0a0b0f",
				gray: {
					base: "#201F1F",
					highlight: "#797878",
				},
				inventory: {
					bg: "#181823",
					primary: "#614CC1",
					common: "#969696",
					uncommon: "#6AC14C",
					superior: "#C1AE4C",
					slot: "#D9D9D9",
					border: "rgba(168, 170, 169, 11%)",
					condition: {
						good: "#59F374",
						neutral: "#F0F359",
						bad: "#F35959",
					},
				},
				menu: {
					primary: "#5e34eb",
					item: "rgba(0, 0, 0, 0.932)",
					inactive: "rgb(212, 199, 199)",
					disabled: "rgba(255, 255, 255, 0.5)",
					active: "rgba(255, 255, 255, 0.15)",
					bg: "rgba(21, 20, 27, 0.938)",
				},
			},
		},
	},
};
