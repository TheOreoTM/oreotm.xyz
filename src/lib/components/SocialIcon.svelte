<script lang="ts">
	import type { SocialId } from '$lib/site';
	import IconDiscord from '~icons/simple-icons/discord';
	import IconGithub from '~icons/simple-icons/github';
	import IconX from '~icons/simple-icons/x';
	import IconYoutube from '~icons/simple-icons/youtube';
	import IconSpotify from '~icons/simple-icons/spotify';
	import IconTwitch from '~icons/simple-icons/twitch';

	let { id, class: className = 'size-4' }: { id: SocialId; class?: string } = $props();

	const icons = {
		discord: IconDiscord,
		github: IconGithub,
		x: IconX,
		youtube: IconYoutube,
		spotify: IconSpotify,
		twitch: IconTwitch
	};

	const Icon = $derived(icons[id]);
</script>

<Icon class={className} aria-hidden="true" />
