/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "node_modules/preline/dist/*.js"],
	plugins: [require("preline/plugin")],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#fbf6fe",
					100: "#f4ebfc",
					200: "#ecdafa",
					300: "#dcbef4",
					400: "#c794ec",
					500: "#b16ae2",
					600: "#9d4bd2",
					700: "#8136b0",
					800: "#713396",
					900: "#5c2a79",
					950: "#401358",
				},
			},
		},
	},
};
