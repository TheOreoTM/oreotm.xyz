<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { url } from '$lib/config';
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconArrowUpRight from '~icons/lucide/arrow-up-right';

	let { data } = $props();

	const project = $derived(data.project);
	const next = $derived(data.next);
	const Content = $derived(data.content);
</script>

<Meta
	title={project.name}
	description={project.summary}
	image={new URL(project.image, url).href}
	imageAlt={project.imageAlt}
/>

<a
	href="/projects"
	class="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-fg"
>
	<IconArrowLeft class="size-4" aria-hidden="true" /> all projects
</a>

<header class="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
	<img
		src={project.image}
		alt={project.imageAlt}
		class="size-20 rounded-xl border bg-surface object-cover sm:size-24"
	/>
	<div>
		<p class="font-mono text-sm text-muted">{project.year}</p>
		<h1 class="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
		<p class="mt-2 text-lg text-muted">{project.tagline}</p>
	</div>
</header>

<div class="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
	<article class="prose max-w-none min-w-0 lg:max-w-[68ch]">
		<Content />
	</article>

	<aside class="self-start lg:sticky lg:top-24">
		<h2 class="font-mono text-sm text-muted">at a glance</h2>
		<dl class="mt-4 space-y-5 border-t pt-4">
			<div>
				<dt class="font-mono text-xs text-muted">year</dt>
				<dd class="mt-1">{project.year}</dd>
			</div>
			{#if project.stack.length}
				<div>
					<dt class="font-mono text-xs text-muted">built with</dt>
					<dd class="mt-2">
						<ul class="flex flex-wrap gap-1.5">
							{#each project.stack as tech (tech)}
								<li class="rounded-md border bg-surface px-2 py-0.5 font-mono text-xs">{tech}</li>
							{/each}
						</ul>
					</dd>
				</div>
			{/if}
		</dl>
		{#if project.links.length}
			<ul class="mt-6 space-y-2">
				{#each project.links as link, i (link.href)}
					<li>
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-opacity {i ===
							0
								? 'bg-accent text-accent-fg hover:opacity-90'
								: 'border bg-surface hover:border-accent'}"
						>
							{link.label}
							<IconArrowUpRight class="size-4 shrink-0" aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</aside>
</div>

{#if next.slug !== project.slug}
	<a
		href="/projects/{next.slug}"
		class="group mt-20 flex items-center justify-between gap-4 rounded-xl border bg-surface p-6 transition-colors hover:border-accent"
	>
		<span>
			<span class="block font-mono text-xs text-muted">next project</span>
			<span class="mt-1 block text-xl font-semibold tracking-tight">{next.name}</span>
		</span>
		<IconArrowRight
			class="size-5 transition-transform group-hover:translate-x-1 group-hover:text-accent"
			aria-hidden="true"
		/>
	</a>
{/if}
