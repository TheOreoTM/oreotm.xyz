import { url } from '$lib/config';
import { pages } from '$lib/site';
import { projects } from '$lib/server/projects';
import { posts } from '$lib/server/posts';
import { parsePostDate } from '$lib/utils';

export const prerender = true;

export function GET() {
	const entries = [
		...pages.map((page) => ({ loc: page.path })),
		...projects.map((project) => ({ loc: `/projects/${project.slug}` })),
		...posts.map((post) => ({
			loc: `/blog/${post.slug}`,
			lastmod: parsePostDate(post.date).toISOString().slice(0, 10)
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) =>
			`	<url><loc>${url}${entry.loc}</loc>${'lastmod' in entry ? `<lastmod>${entry.lastmod}</lastmod>` : ''}</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
