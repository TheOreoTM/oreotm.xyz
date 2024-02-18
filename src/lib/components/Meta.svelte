<script lang="ts">
	import { MetaTags, type AdditionalRobotsProps } from 'svelte-meta-tags';

	export let title: string;
	export let guildName = '';
	export let disableTemplate = true;
	export let description = 'An aspiring developer';
	export let logo = 'https://oreotm.xyz/images/discord-pfp.png';
	export let url = 'https://oreotm.xyz/';
	export let blockRobots = false;

	const robotsProps: AdditionalRobotsProps = blockRobots
		? {}
		: {
				noarchive: true,
				nosnippet: true,
				notranslate: true,
				noimageindex: true,
				maxSnippet: -1,
				maxImagePreview: 'none',
				maxVideoPreview: -1
			};
</script>

<MetaTags
	title={guildName ? `${title} | ${guildName}` : title}
	titleTemplate={disableTemplate ? undefined : '%s | OreoTM'}
	{description}
	canonical={url}
	openGraph={{
		type: 'website',
		url,
		title,
		description,
		images: [{ url: logo, alt: 'icon' }],
		siteName: 'theoreotm'
	}}
	twitter={{
		cardType: 'summary',
		title,
		description,
		image: logo,
		imageAlt: 'icon'
	}}
	robots={blockRobots ? 'noindex,nofollow' : undefined}
	additionalRobotsProps={blockRobots ? undefined : robotsProps}
/>

<svelte:head>
	<meta name="theme-color" data-react-helmet="true" content="#0c0c0c" />
</svelte:head>
