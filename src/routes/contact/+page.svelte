<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';

	const channels = [
		{
			name: 'Discord',
			handle: '@theoreotm',
			note: 'Send me a message.',
			href: 'https://discord.com/users/600707283097485322',
			icon: 'fa-brands fa-discord'
		},
		{
			name: 'GitHub',
			handle: 'theoreotm',
			note: "See what I'm working on.",
			href: 'https://github.com/theoreotm',
			icon: 'fa-brands fa-github'
		},
		{
			name: 'Twitter',
			handle: '@theoreotm',
			note: 'Follow along.',
			href: 'https://twitter.com/theoreotm',
			icon: 'fa-brands fa-twitter'
		}
	];

	const timeFormatter = new Intl.DateTimeFormat('en', {
		timeZone: 'Indian/Maldives',
		hour: 'numeric',
		minute: '2-digit'
	});

	// Rendered on the client only, so the server never shows a stale time.
	let localTime = '';

	onMount(() => {
		const tick = () => (localTime = timeFormatter.format(new Date()));
		tick();
		const interval = setInterval(tick, 15_000);
		return () => clearInterval(interval);
	});
</script>

<Meta
	title="Contact"
	description="Got a Discord bot or web project in mind? Here's how to reach OreoTM."
/>

<div class="space-y-3">
	<div class="flex flex-col space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
		<div class="flex-grow">
			<Card padding="p-2" region="h-full">
				<svelte:fragment slot="body">
					<h1 class="font-semibold text-3xl leading-tight">
						Let's talk.
						<span class="opacity-40"
							>Got a bot, website, or backend project in mind? Send me a message and tell me what
							you're building.</span
						>
					</h1>
				</svelte:fragment>
			</Card>
		</div>
		<div class="md:w-80 shrink-0">
			<Card padding="p-2" region="h-full">
				<svelte:fragment slot="body">
					<p class="opacity-60">My local time</p>
					<p
						class="font-semibold text-3xl leading-tight mt-2 min-h-[1.25em] whitespace-nowrap tabular-nums"
					>
						{localTime}
					</p>
					<p class="opacity-40 mt-1">Maldives, GMT+5</p>
				</svelte:fragment>
			</Card>
		</div>
	</div>

	<ul class="grid gap-3 md:grid-cols-3">
		{#each channels as channel (channel.name)}
			<li>
				<a href={channel.href} target="_blank" rel="noopener noreferrer" class="group block h-full">
					<Card region="h-full">
						<svelte:fragment slot="body">
							<div class="flex items-start justify-between">
								<i class="{channel.icon} text-4xl" aria-hidden="true" />
								<i
									class="fa-solid fa-arrow-up-long text-xl rotate-45 opacity-60 group-hover:opacity-100 transition-opacity"
									aria-hidden="true"
								/>
							</div>
							<h2 class="font-semibold text-2xl mt-6">{channel.name}</h2>
							<p class="opacity-60">{channel.handle}</p>
							<p class="mt-2">{channel.note}</p>
						</svelte:fragment>
					</Card>
				</a>
			</li>
		{/each}
	</ul>
</div>
