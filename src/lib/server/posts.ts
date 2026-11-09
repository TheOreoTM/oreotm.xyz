import type { Post } from '$lib/types';
import { parsePostDate } from '$lib/utils';

const metadata = import.meta.glob<Omit<Post, 'slug'>>('/src/posts/*.md', {
	eager: true,
	import: 'metadata'
});

/** Published posts, newest first. */
export const posts: Post[] = Object.entries(metadata)
	.map(([path, meta]) => ({ ...meta, slug: path.split('/').at(-1)!.replace(/\.md$/, '') }))
	.filter((post) => post.published)
	.sort((a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime());

export const categories = [...new Set(posts.flatMap((post) => post.categories))].sort();
