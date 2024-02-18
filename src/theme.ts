import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '24px',
		'--theme-rounded-container': '24px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #B8B7C6
		'--color-primary-50': '244 244 246', // #f4f4f6
		'--color-primary-100': '241 241 244', // #f1f1f4
		'--color-primary-200': '237 237 241', // #ededf1
		'--color-primary-300': '227 226 232', // #e3e2e8
		'--color-primary-400': '205 205 215', // #cdcdd7
		'--color-primary-500': '184 183 198', // #B8B7C6
		'--color-primary-600': '166 165 178', // #a6a5b2
		'--color-primary-700': '138 137 149', // #8a8995
		'--color-primary-800': '110 110 119', // #6e6e77
		'--color-primary-900': '90 90 97', // #5a5a61
		// secondary | #5C4C60
		'--color-secondary-50': '231 228 231', // #e7e4e7
		'--color-secondary-100': '222 219 223', // #dedbdf
		'--color-secondary-200': '214 210 215', // #d6d2d7
		'--color-secondary-300': '190 183 191', // #beb7bf
		'--color-secondary-400': '141 130 144', // #8d8290
		'--color-secondary-500': '92 76 96', // #5C4C60
		'--color-secondary-600': '83 68 86', // #534456
		'--color-secondary-700': '69 57 72', // #453948
		'--color-secondary-800': '55 46 58', // #372e3a
		'--color-secondary-900': '45 37 47', // #2d252f
		// tertiary | #A3739D
		'--color-tertiary-50': '241 234 240', // #f1eaf0
		'--color-tertiary-100': '237 227 235', // #ede3eb
		'--color-tertiary-200': '232 220 231', // #e8dce7
		'--color-tertiary-300': '218 199 216', // #dac7d8
		'--color-tertiary-400': '191 157 186', // #bf9dba
		'--color-tertiary-500': '163 115 157', // #A3739D
		'--color-tertiary-600': '147 104 141', // #93688d
		'--color-tertiary-700': '122 86 118', // #7a5676
		'--color-tertiary-800': '98 69 94', // #62455e
		'--color-tertiary-900': '80 56 77', // #50384d
		// success | #75D054
		'--color-success-50': '234 248 229', // #eaf8e5
		'--color-success-100': '227 246 221', // #e3f6dd
		'--color-success-200': '221 243 212', // #ddf3d4
		'--color-success-300': '200 236 187', // #c8ecbb
		'--color-success-400': '158 222 135', // #9ede87
		'--color-success-500': '117 208 84', // #75D054
		'--color-success-600': '105 187 76', // #69bb4c
		'--color-success-700': '88 156 63', // #589c3f
		'--color-success-800': '70 125 50', // #467d32
		'--color-success-900': '57 102 41', // #396629
		// warning | #FB7135
		'--color-warning-50': '254 234 225', // #feeae1
		'--color-warning-100': '254 227 215', // #fee3d7
		'--color-warning-200': '254 220 205', // #fedccd
		'--color-warning-300': '253 198 174', // #fdc6ae
		'--color-warning-400': '252 156 114', // #fc9c72
		'--color-warning-500': '251 113 53', // #FB7135
		'--color-warning-600': '226 102 48', // #e26630
		'--color-warning-700': '188 85 40', // #bc5528
		'--color-warning-800': '151 68 32', // #974420
		'--color-warning-900': '123 55 26', // #7b371a
		// error | #9D031A
		'--color-error-50': '240 217 221', // #f0d9dd
		'--color-error-100': '235 205 209', // #ebcdd1
		'--color-error-200': '231 192 198', // #e7c0c6
		'--color-error-300': '216 154 163', // #d89aa3
		'--color-error-400': '186 79 95', // #ba4f5f
		'--color-error-500': '157 3 26', // #9D031A
		'--color-error-600': '141 3 23', // #8d0317
		'--color-error-700': '118 2 20', // #760214
		'--color-error-800': '94 2 16', // #5e0210
		'--color-error-900': '77 1 13', // #4d010d
		// surface | #1c1c1e
		'--color-surface-50': '221 221 221', // #dddddd
		'--color-surface-100': '210 210 210', // #d2d2d2
		'--color-surface-200': '198 198 199', // #c6c6c7
		'--color-surface-300': '164 164 165', // #a4a4a5
		'--color-surface-400': '96 96 98', // #606062
		'--color-surface-500': '28 28 30', // #1c1c1e
		'--color-surface-600': '25 25 27', // #19191b
		'--color-surface-700': '21 21 23', // #151517
		'--color-surface-800': '17 17 18', // #111112
		'--color-surface-900': '14 14 15' // #0e0e0f
	}
};
