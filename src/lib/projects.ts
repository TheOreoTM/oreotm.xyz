import type { ComponentType } from 'svelte';
import type { Project, ProjectMeta } from '$lib/types';

// Only the frontmatter is imported here, so list pages don't bundle every case study.
const metadata = import.meta.glob<ProjectMeta>('/src/content/projects/*.md', {
	eager: true,
	import: 'metadata'
});

const content = import.meta.glob<{ default: ComponentType }>('/src/content/projects/*.md');

function slugFromPath(path: string) {
	return path.split('/').at(-1)!.replace(/\.md$/, '');
}

export const projects: Project[] = Object.entries(metadata)
	.map(([path, meta]) => ({ ...meta, slug: slugFromPath(path) }))
	.sort((a, b) => a.order - b.order);

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

/** Loads the case study body for a project. Returns undefined for unknown slugs. */
export async function loadProjectContent(slug: string) {
	const load = content[`/src/content/projects/${slug}.md`];
	if (!load) return undefined;
	const module = await load();
	return module.default;
}
