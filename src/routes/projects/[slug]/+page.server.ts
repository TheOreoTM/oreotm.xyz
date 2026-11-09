import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/server/projects';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const project = getProject(params.slug);

	if (!project) {
		error(404, `No project called "${params.slug}"`);
	}

	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];

	return { project, next };
};
