<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { formatDate } from '$lib/utils';

	let { data } = $props();

	/** The blog URL with `category` toggled in or out of the filter. */
	function toggleHref(category: string) {
		const next = data.selected.includes(category)
			? data.selected.filter((c) => c !== category)
			: [...data.selected, category];
		return next.length ? `/blog?categories=${next.join(',')}` : '/blog';
	}
</script>

<Meta
	title="Blog"
	description="Notes from OreoTM on building Discord bots, SvelteKit sites, and other side projects."
/>

<header class="max-w-2xl">
	<p class="font-mono text-sm text-muted"><span class="text-accent">❯</span> ls ~/blog</p>
	<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Blog</h1>
	<p class="mt-4 text-lg text-muted">Notes on things I've built and broken.</p>
</header>

<nav
	aria-label="Filter posts by tag"
	class="mt-10 flex flex-wrap items-center gap-2 font-mono text-sm"
>
	<span class="mr-1 text-muted">tags:</span>
	{#each data.categories as category (category)}
		{@const active = data.selected.includes(category)}
		<a
			href={toggleHref(category)}
			data-sveltekit-noscroll
			class="rounded-md border px-2.5 py-1 transition-colors {active
				? 'border-accent bg-accent text-accent-fg'
				: 'bg-surface text-muted hover:border-accent hover:text-fg'}"
		>
			#{category}{#if active}<span class="sr-only">{' (selected, click to remove)'}</span>{/if}
		</a>
	{/each}
	{#if data.selected.length}
		<a href="/blog" data-sveltekit-noscroll class="ml-1 text-muted underline hover:text-fg">clear</a
		>
	{/if}
</nav>

{#if data.posts.length}
	<ul class="-mx-2 mt-8 divide-y sm:-mx-4">
		{#each data.posts as post (post.slug)}
			<li>
				<article
					class="group relative grid gap-1 rounded-lg px-2 py-5 transition-colors hover:bg-surface sm:grid-cols-[8rem_1fr] sm:gap-6 sm:px-4"
				>
					<time datetime={post.date} class="pt-1 font-mono text-sm text-muted">
						{formatDate(post.date)}
					</time>
					<div>
						<h2 class="text-lg font-semibold tracking-tight">
							<a href="/blog/{post.slug}" class="after:absolute after:inset-0">{post.title}</a>
						</h2>
						<p class="text-muted">{post.description}</p>
						<p class="mt-2 font-mono text-xs text-muted">
							{post.categories.map((c) => `#${c}`).join(' ')}
						</p>
					</div>
				</article>
			</li>
		{/each}
	</ul>
{:else}
	<p class="mt-8 font-mono text-sm text-muted">No posts match those tags.</p>
{/if}
