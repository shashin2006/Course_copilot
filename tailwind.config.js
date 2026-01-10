/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx,html}',
	],
	theme: {
		extend: {
			colors: {
				brand: {
					50: '#eef6ff',
					100: '#d8eaff',
					500: '#2563eb',
				},
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
			},
		},
	},
	plugins: [],
};
