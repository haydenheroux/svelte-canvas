const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			// have to use this for compat, == slate
			gray: colors.gray,
		}
	},
	variants: {
		extend: {},
	},
	content: [
		"./public/index.html",
		"./src/**.*.{html,js,jsx,ts,svelte}"
	],
	plugins: [],
}
