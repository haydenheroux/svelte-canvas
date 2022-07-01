module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
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
