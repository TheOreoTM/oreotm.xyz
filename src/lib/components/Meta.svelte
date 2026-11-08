<script lang="ts">
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import { defaultImage, siteDescription, siteName, url } from '$lib/config';

	/** Page name, e.g. "Projects". Leave unset on the home page. */
	export let title: string | undefined = undefined;
	export let description = siteDescription;
	export let image = defaultImage;
	export let imageAlt = `${siteName}'s avatar`;
	/** Set for blog posts so link previews are marked as articles. */
	export let article: { publishedTime?: string; tags?: string[] } | undefined = undefined;
	export let noindex = false;

	$: fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Full-stack developer`;
	$: canonical = new URL($page.url.pathname, url).href;
</script>

<MetaTags
	title={fullTitle}
	{description}
	{canonical}
	robots={noindex ? 'noindex,nofollow' : 'index,follow'}
	openGraph={{
		type: article ? 'article' : 'website',
		url: canonical,
		title: fullTitle,
		description,
		images: [{ url: image, alt: imageAlt }],
		siteName,
		article
	}}
	twitter={{
		cardType: 'summary',
		site: '@theoreotm',
		title: fullTitle,
		description,
		image,
		imageAlt
	}}
/>

<svelte:head>
	<meta name="theme-color" content="#0c0c0c" />
</svelte:head>
