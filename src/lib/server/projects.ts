import type { Project, ProjectMeta } from '$lib/types';
import { slugFromPath } from '$lib/projects';

// Server-only, so list pages receive just the card data and never bundle the case studies.
const metadata = import.meta.glob<ProjectMeta>('/src/content/projects/*.md', {
	eager: true,
	import: 'metadata'
});

export const projects: Project[] = Object.entries(metadata)
	.map(([path, meta]) => ({ ...meta, slug: slugFromPath(path) }))
	.sort((a, b) => a.order - b.order);

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
