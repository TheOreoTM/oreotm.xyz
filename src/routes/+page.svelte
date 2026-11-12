<script lang="ts">
	import Marble from '$lib/components/Marble.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import LocalTime from '$lib/components/LocalTime.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { site, socials, toolbox } from '$lib/site';
	import IconArrowRight from '~icons/lucide/arrow-right';

	let { data } = $props();
</script>

<Meta />

<Marble />

<!-- Hero -->
<section class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
	<div>
		<p class="flex items-center gap-2 font-mono text-sm text-muted">
			<span class="relative flex size-2" aria-hidden="true">
				<span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60"
				></span>
				<span class="relative inline-flex size-2 rounded-full bg-accent"></span>
			</span>
			{site.location} · <LocalTime /> local time
		</p>
		<h1 class="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
			I'm OreoTM, a full‑stack developer
			<span class="text-muted">building Discord bots, websites, and the backends behind them.</span>
		</h1>
		<div class="mt-8 flex flex-wrap gap-3">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-accent-fg transition-opacity hover:opacity-90"
			>
				See my projects <IconArrowRight class="size-4" aria-hidden="true" />
			</a>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-lg border bg-surface px-4 py-2.5 font-medium transition-colors hover:border-accent"
			>
				Get in touch
			</a>
		</div>
	</div>

	<Terminal projects={data.projectSummaries} />
</section>

<!-- Selected work -->
<section class="mt-24" aria-labelledby="work">
	<SectionHeading id="work" index="01" title="selected work">
		{#snippet action()}
			<a href="/projects" class="font-mono text-sm text-muted hover:text-fg">all projects →</a>
		{/snippet}
	</SectionHeading>
	<ul class="-mx-2 sm:-mx-4">
		{#each data.featured as project (project.slug)}
			<li><ProjectRow {project} /></li>
		{/each}
	</ul>
</section>

<!-- About -->
<section class="mt-24" aria-labelledby="about">
	<SectionHeading id="about" index="02" title="about" />
	<div class="grid gap-10 md:grid-cols-2">
		<div class="flex gap-5">
			<img
				src="/discord-pfp.png"
				alt="OreoTM's avatar"
				class="size-16 shrink-0 rounded-full border"
				width="64"
				height="64"
			/>
			<div class="space-y-4 text-lg">
				<p>
					I'm OreoTM, or <span class="font-mono text-base text-accent">@theoreotm</span> if you want
					to be fancy. I'm a full-stack developer based in the {site.location} ({site.utcOffset}).
				</p>
				<p class="text-muted">
					Most of what I build is backend-heavy: Discord bots that look after servers, the APIs and
					databases behind them, and the websites that sit on top.
				</p>
			</div>
		</div>

		<dl class="space-y-4">
			{#each toolbox as group (group.group)}
				<div class="grid grid-cols-[8.5rem_1fr] gap-4 border-b pb-4 last:border-0">
					<dt class="font-mono text-sm text-muted">{group.group}</dt>
					<dd>{group.items.join(', ')}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- Contact -->
<section class="mt-24 rounded-2xl border bg-surface p-8 sm:p-10" aria-labelledby="cta">
	<h2 id="cta" class="text-3xl font-semibold tracking-tight text-balance">
		Got a brilliant <span class="text-muted line-through decoration-accent">Discord bot</span> idea in
		mind?
	</h2>
	<p class="mt-3 max-w-prose text-lg text-muted">
		Send me a message and tell me what you're building.
	</p>
	<div class="mt-8 flex flex-wrap items-center gap-3">
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-accent-fg transition-opacity hover:opacity-90"
		>
			Let's talk <IconArrowRight class="size-4" aria-hidden="true" />
		</a>
		{#each socials.filter((s) => s.contact) as social (social.id)}
			<a
				href={social.href}
				target="_blank"
				rel="noopener noreferrer"
				class="grid size-11 place-items-center rounded-lg border bg-bg transition-colors hover:border-accent"
				aria-label={social.label}
				title={social.label}
			>
				<SocialIcon id={social.id} />
			</a>
		{/each}
	</div>
</section>
