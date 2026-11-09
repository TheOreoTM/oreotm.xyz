export type Categories = 'sveltekit' | 'svelte' | string;

export type Post = {
	title: string;
	description: string;
	slug: string;
	date: string;
	categories: Categories[];
	published: boolean;
};

export type ProjectLink = {
	label: string;
	href: string;
};

/** Frontmatter of a file in src/content/projects. */
export type ProjectMeta = {
	name: string;
	/** One line shown under the title. */
	tagline: string;
	/** A short paragraph for project cards and link previews. */
	summary: string;
	year: string;
	/** Lower numbers are listed first. */
	order: number;
	/** Featured projects are also shown on the home page. */
	featured: boolean;
	image: string;
	imageAlt: string;
	stack: string[];
	links: ProjectLink[];
};

export type Project = ProjectMeta & {
	/** The file name without .md, used in /projects/[slug]. */
	slug: string;
};
