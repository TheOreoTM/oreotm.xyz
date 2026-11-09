import { projects } from '$lib/server/projects';
import type { LayoutServerLoad } from './$types';

// Every page gets a light project list for the command menu and the terminal.
export const load: LayoutServerLoad = () => ({
	projectSummaries: projects.map(({ slug, name, tagline }) => ({ slug, name, tagline }))
});
