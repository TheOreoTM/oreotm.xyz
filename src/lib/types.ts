export type ProjectLink = { label: string; href: string };

/** Frontmatter of a file in content/projects. */
export type ProjectMeta = {
	name: string;
	/** One line shown under the title. */
	tagline: string;
	/** A short paragraph for project lists and link previews. */
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
	/** The file name without .mdx, used in /projects/[slug]. */
	slug: string;
};

/** The few project fields the command menu and terminal need on every page. */
export type ProjectSummary = Pick<Project, 'slug' | 'name' | 'tagline'>;

/** Frontmatter of a file in content/posts. */
export type Post = {
	slug: string;
	title: string;
	description: string;
	/** Written like 2025-5-02. */
	date: string;
	categories: string[];
	published: boolean;
};
