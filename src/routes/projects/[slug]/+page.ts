import { error } from '@sveltejs/kit';
import { getProject, loadProjectContent, projects } from '$lib/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
	const project = getProject(params.slug);
	const content = project ? await loadProjectContent(params.slug) : undefined;

	if (!project || !content) {
		error(404, `No project called "${params.slug}"`);
	}

	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];

	return { project, content, next };
};
