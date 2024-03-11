import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types';

export const load = (async ({ fetch, url }) => {
	const searchParams = new URLSearchParams(url.search);
	const categories = searchParams.get('categories')?.split(',') ?? [];

	const response = await fetch('api/posts');
	const allPosts: Post[] = await response.json();
	const posts = allPosts.filter((post) => {
		return categories.every((category) => post.categories.includes(category));
	});

	return { posts };
}) satisfies PageServerLoad;
