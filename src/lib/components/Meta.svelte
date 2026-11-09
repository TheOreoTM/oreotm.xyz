<script lang="ts">
	import { page } from '$app/state';
	import { defaultImage, siteDescription, siteName, url } from '$lib/config';

	type Props = {
		/** Page name, e.g. "Projects". Leave unset on the home page. */
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		/** Set for blog posts so link previews are marked as articles. */
		article?: { publishedTime?: string; tags?: string[] };
		noindex?: boolean;
	};

	let {
		title,
		description = siteDescription,
		image = defaultImage,
		imageAlt = `${siteName}'s avatar`,
		article,
		noindex = false
	}: Props = $props();

	const fullTitle = $derived(
		title ? `${title} | ${siteName}` : `${siteName} | Full-stack developer`
	);
	const canonical = $derived(new URL(page.url.pathname, url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
	<meta name="theme-color" content="#0c0c0d" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#f6f5f1" media="(prefers-color-scheme: light)" />

	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={imageAlt} />
	{#if article?.publishedTime}
		<meta property="article:published_time" content={article.publishedTime} />
	{/if}
	{#each article?.tags ?? [] as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
