import { json } from '@sveltejs/kit';
import { posts } from '$lib/server/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => json(posts);
