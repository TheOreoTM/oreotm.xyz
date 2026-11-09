<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { formatDate, parsePostDate } from '$lib/utils';
	import IconArrowLeft from '~icons/lucide/arrow-left';

	let { data } = $props();

	const meta = $derived(data.meta);
	const Content = $derived(data.content);
</script>

<Meta
	title={meta.title}
	description={meta.description}
	article={{ publishedTime: parsePostDate(meta.date).toISOString(), tags: meta.categories }}
/>

<div class="mx-auto max-w-[68ch]">
	<a href="/blog" class="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-fg">
		<IconArrowLeft class="size-4" aria-hidden="true" /> all posts
	</a>

	<header class="mt-8">
		<h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{meta.title}</h1>
		<p class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted">
			<time datetime={meta.date}>{formatDate(meta.date, 'long')}</time>
			{#each meta.categories as category (category)}
				<a href="/blog?categories={category}" class="hover:text-fg">#{category}</a>
			{/each}
		</p>
	</header>

	<article class="prose mt-10 max-w-none">
		<Content />
	</article>
</div>
