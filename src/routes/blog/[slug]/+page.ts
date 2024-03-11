import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata as {
				title: string;
				description: string;
				date: string;
				categories: string[];
				published: boolean;
			}
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
