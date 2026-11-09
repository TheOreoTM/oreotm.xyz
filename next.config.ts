import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	// Pages read Markdown from /content at build time; ship it with the server functions too.
	outputFileTracingIncludes: {
		'/**': ['./content/**/*']
	},
	turbopack: {
		rules: {
			'*.css': {
				loaders: ['@tailwindcss/turbopack'],
				as: '*.css'
			}
		}
	}
};

export default nextConfig;
