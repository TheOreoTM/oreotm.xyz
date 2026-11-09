<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import LocalTime from '$lib/components/LocalTime.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { site, socials } from '$lib/site';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';

	const channels = socials.filter((s) => s.contact);
	const elsewhere = socials.filter((s) => !s.contact);
</script>

<Meta
	title="Contact"
	description="Got a Discord bot or web project in mind? Here's how to reach OreoTM."
/>

<div class="grid gap-12 lg:grid-cols-[1fr_18rem]">
	<header class="max-w-2xl">
		<p class="font-mono text-sm text-muted"><span class="text-accent">❯</span> contact</p>
		<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let's talk.</h1>
		<p class="mt-4 text-lg text-muted">
			Got a bot, website, or backend project in mind? Send me a message and tell me what you're
			building.
		</p>
	</header>

	<div class="self-end rounded-xl border bg-surface p-6">
		<p class="font-mono text-xs text-muted">my local time</p>
		<p class="mt-2 text-3xl font-semibold tracking-tight"><LocalTime /></p>
		<p class="mt-1 text-sm text-muted">{site.location}, {site.utcOffset}</p>
	</div>
</div>

<ul class="mt-12 grid gap-3 md:grid-cols-2">
	{#each channels as channel (channel.id)}
		<li>
			<a
				href={channel.href}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex h-full flex-col rounded-xl border bg-surface p-6 transition-colors hover:border-accent"
			>
				<span class="flex items-start justify-between">
					<SocialIcon id={channel.id} class="size-7" />
					<IconArrowUpRight
						class="size-5 text-muted transition-colors group-hover:text-accent"
						aria-hidden="true"
					/>
				</span>
				<span class="mt-8 text-xl font-semibold tracking-tight">{channel.label}</span>
				<span class="font-mono text-sm text-muted">{channel.handle}</span>
				<span class="mt-3">{channel.contact?.note}</span>
			</a>
		</li>
	{/each}
</ul>

<section class="mt-16" aria-labelledby="elsewhere">
	<h2 id="elsewhere" class="font-mono text-sm text-muted">elsewhere</h2>
	<ul class="mt-4 flex flex-wrap gap-2">
		{#each elsewhere as social (social.id)}
			<li>
				<a
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm transition-colors hover:border-accent"
				>
					<SocialIcon id={social.id} />
					{social.label}
				</a>
			</li>
		{/each}
	</ul>
</section>
