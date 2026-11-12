import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { RagPipeline } from '@/components/diagrams/rag-pipeline';

/** Components that MDX files can use without importing them. */
const components = {
	RagPipeline,
	img: (props: React.ComponentProps<'img'>) => (
		// eslint-disable-next-line @next/next/no-img-element -- Markdown images have no known size
		<img {...props} alt={props.alt ?? ''} loading="lazy" className="rounded-lg border" />
	)
};

/** Renders a post or case study body. Cached, so it's compiled once at build time. */
export async function MdxContent({ source }: { source: string }) {
	'use cache';
	const { content } = await compileMDX({
		source,
		components,
		options: {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					rehypeSlug,
					[
						rehypeShiki,
						{
							// Both themes become CSS variables; globals.css picks one per theme.
							themes: { light: 'github-light', dark: 'github-dark-dimmed' },
							defaultColor: false
						}
					]
				]
			}
		}
	});
	return content;
}
