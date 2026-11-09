import type { MetadataRoute } from 'next';
import { getPosts, getProjects } from '@/lib/content';
import { parsePostDate } from '@/lib/dates';
import { pages, siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
	return [
		...pages.map((page) => ({ url: `${siteUrl}${page.path}` })),
		...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
		...posts.map((post) => ({
			url: `${siteUrl}/blog/${post.slug}`,
			lastModified: parsePostDate(post.date)
		}))
	];
}
