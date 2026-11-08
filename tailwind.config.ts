import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
// Explicit extension: Node 22.18+ loads this file natively and needs it.
import { theme } from './src/theme.ts';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// A plain path rather than require.resolve(), which is undefined when Node loads this file as ESM.
		'./node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			fontSize: {
				sm: '0.750rem',
				base: '1rem',
				xl: '1.333rem',
				'2xl': '1.777rem',
				'3xl': '2.369rem',
				'4xl': '3.158rem',
				'5xl': '4.210rem'
			},
			fontFamily: {
				heading: 'Poppins',
				body: 'Inter'
			},
			fontWeight: {
				normal: '400',
				bold: '700'
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [theme]
			}
		})
	]
} satisfies Config;
