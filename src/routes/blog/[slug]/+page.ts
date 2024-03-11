import { error } from '@sveltejs/kit';

export async function load({ params }) {
	console.log('🚀 ~ load ~ params:', params);
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
