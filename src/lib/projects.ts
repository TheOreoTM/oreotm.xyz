import type { ComponentType } from 'svelte';

// Lazy: each case study becomes its own chunk, loaded only on its page.
const content = import.meta.glob<{ default: ComponentType }>('/src/content/projects/*.md');

export function slugFromPath(path: string) {
	return path.split('/').at(-1)!.replace(/\.md$/, '');
}

/** Loads the case study body for a project. Returns undefined for unknown slugs. */
export async function loadProjectContent(slug: string) {
	const load = content[`/src/content/projects/${slug}.md`];
	if (!load) return undefined;
	const module = await load();
	return module.default;
}
