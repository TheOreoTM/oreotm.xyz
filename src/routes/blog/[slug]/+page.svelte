<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<ol class="breadcrumb mt-6">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li class="crumb"><a class="anchor" href="/blog">Blog</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li>{data.meta.title}</li>
</ol>

<article class="mt-4 max-w-content-3 mx-auto">
	<!-- Title -->
	<hgroup>
		<h1 class="text-2xl font-bold">{data.meta.title}</h1>
		<p class="mt-2 opacity-40">Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<!-- Tags -->
	<div class="flex mt-2 mb-10 gap-3">
		{#each data.meta.categories as category}
			<a href={`/blog?categories=${category}`}>
				<span class="badge variant-filled">&num;{category}</span>
			</a>
		{/each}
	</div>

	<!-- Post -->
	<div class="prose prose-invert">
		<svelte:component this={data.content} />
	</div>
</article>
