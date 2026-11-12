import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { fileURLToPath } from 'node:url';

const langs = ['javascript', 'typescript', 'svelte', 'json', 'bash', 'html', 'css', 'go', 'python'];

// One highlighter for the whole build, instead of one per code block.
const highlighter = await createHighlighter({
	themes: ['github-light', 'github-dark-dimmed'],
	langs
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		// mdsvex 0.12 needs an absolute path; relative ones resolve against each .md file.
		_: fileURLToPath(new URL('./src/mdsvex.svelte', import.meta.url))
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = highlighter.codeToHtml(code, {
				// getLoadedLanguages() includes aliases such as `ts` and `sh`.
				lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
				// Both themes are emitted as CSS variables; app.css picks one per colour scheme.
				themes: { light: 'github-light', dark: 'github-dark-dimmed' },
				defaultColor: false
			});
			return `{@html \`${escapeSvelte(html)}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
