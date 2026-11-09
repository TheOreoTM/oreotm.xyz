import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { Post } from '$lib/types';
import type { PageLoad } from './$types';

const modules = import.meta.glob<{ default: Component; metadata: Omit<Post, 'slug'> }>(
	'/src/posts/*.md'
);

export const load: PageLoad = async ({ params }) => {
	const load = modules[`/src/posts/${params.slug}.md`];
	const post = load ? await load() : undefined;

	if (!post || !post.metadata.published) {
		error(404, `No post called "${params.slug}"`);
	}

	return { content: post.default, meta: { ...post.metadata, slug: params.slug } };
};
