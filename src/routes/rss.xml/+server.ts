import * as config from '$lib/config';
import type { Post } from '$lib/types';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export async function GET({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };

	const items = posts
		.map((post) => {
			const link = `${config.url}/blog/${post.slug}`;
			// Same Safari-safe parsing as formatDate: dates are written like 2025-5-02.
			const pubDate = new Date(post.date.replaceAll('-', '/')).toUTCString();
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			<pubDate>${pubDate}</pubDate>
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

	return new Response(xml, { headers });
}
