import { error } from '@sveltejs/kit';
import { loadProjectContent } from '$lib/projects';
import type { PageLoad } from './$types';

// Project data comes from +page.server.ts; the case study body is a component, which can't be
// serialised, so it is loaded here instead.
export const load: PageLoad = async ({ data, params }) => {
	const content = await loadProjectContent(params.slug);

	if (!content) {
		error(404, `No project called "${params.slug}"`);
	}

	return { ...data, content };
};
