module.exports = {
	content: [
		"./node_modules/flowbite-react/**/*.js",
		"./components/**/*.tsx",
		"./pages/**/*.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
};
