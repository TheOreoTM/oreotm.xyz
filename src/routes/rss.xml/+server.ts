import * as config from '$lib/config';
import { posts } from '$lib/server/posts';
import { parsePostDate } from '$lib/utils';

export const prerender = true;

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export function GET() {
	const items = posts
		.map((post) => {
			const link = `${config.url}/blog/${post.slug}`;
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
		<title>${escapeXml(config.title)}</title>
		<description>${escapeXml(config.description)}</description>
		<link>${config.url}</link>
		<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}
	</channel>
</rss>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
