export type Categories = 'sveltekit' | 'svelte' | string;

export type Post = {
	title: string;
	description: string;
	slug: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
