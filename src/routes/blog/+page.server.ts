import { categories, posts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	// ?categories=a,b keeps working for links shared before the redesign.
	const selected = url.searchParams.get('categories')?.split(',').filter(Boolean) ?? [];

	return {
		posts: posts.filter((post) => selected.every((c) => post.categories.includes(c))),
		categories,
		selected
	};
};
