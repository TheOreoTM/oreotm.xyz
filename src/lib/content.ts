import 'server-only';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { parsePostDate } from '@/lib/dates';
import type { Post, Project, ProjectMeta } from '@/lib/types';

// Content is read from disk at build time. 'use cache' makes the results part of the
// prerendered pages rather than per-request work.

const contentDir = path.join(process.cwd(), 'content');

async function readCollection(folder: string) {
	const dir = path.join(contentDir, folder);
	const files = (await readdir(dir)).filter((file) => file.endsWith('.mdx'));
	return Promise.all(
		files.map(async (file) => {
			const { data, content } = matter(await readFile(path.join(dir, file), 'utf8'));
			return { slug: file.replace(/\.mdx$/, ''), data, content };
		})
	);
}

/** All projects, in display order. */
export async function getProjects(): Promise<Project[]> {
	'use cache';
	const entries = await readCollection('projects');
	return entries
		.map(({ slug, data }) => ({ ...(data as ProjectMeta), slug }))
		.sort((a, b) => a.order - b.order);
}

/** A project's metadata and MDX body, or undefined if there is no such project. */
export async function getProject(slug: string) {
	'use cache';
	const entry = (await readCollection('projects')).find((e) => e.slug === slug);
	if (!entry) return undefined;
	return { meta: { ...(entry.data as ProjectMeta), slug }, body: entry.content };
}

/** Published posts, newest first. */
export async function getPosts(): Promise<Post[]> {
	'use cache';
	const entries = await readCollection('posts');
	return entries
		.map(({ slug, data }) => ({ ...(data as Omit<Post, 'slug'>), slug }))
		.filter((post) => post.published)
		.sort((a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime());
}

/** A published post's metadata and MDX body, or undefined. */
export async function getPost(slug: string) {
	'use cache';
	const entry = (await readCollection('posts')).find((e) => e.slug === slug);
	if (!entry || !entry.data.published) return undefined;
	return { meta: { ...(entry.data as Omit<Post, 'slug'>), slug }, body: entry.content };
}
