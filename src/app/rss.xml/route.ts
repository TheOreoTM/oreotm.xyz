import { getPosts } from '@/lib/content';
import { parsePostDate } from '@/lib/dates';
import { site, siteUrl } from '@/lib/site';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export async function GET() {
	const posts = await getPosts();
	const items = posts
		.map((post) => {
			const link = `${siteUrl}/blog/${post.slug}`;
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			<pubDate>${parsePostDate(post.date).toUTCString()}</pubDate>
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
		<title>${escapeXml(site.blog.title)}</title>
		<description>${escapeXml(site.blog.description)}</description>
		<link>${siteUrl}</link>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>${items}
	</channel>
</rss>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
