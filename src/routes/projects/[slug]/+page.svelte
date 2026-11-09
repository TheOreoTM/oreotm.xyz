<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { url } from '$lib/config';

	export let data;

	$: ({ project, content, next } = data);
</script>

<Meta
	title={project.name}
	description={project.summary}
	image={new URL(project.image, url).href}
	imageAlt={project.imageAlt}
/>

<div class="space-y-3 max-w-5xl mx-auto">
	<a
		href="/projects"
		class="inline-block font-semibold opacity-60 hover:opacity-100 transition-opacity"
	>
		<i class="fa-solid fa-arrow-left-long mr-1" aria-hidden="true" /> All projects
	</a>

	<Card padding="p-2">
		<svelte:fragment slot="body">
			<div class="flex flex-col sm:flex-row sm:items-center gap-6">
				<img
					src={project.image}
					alt={project.imageAlt}
					class="w-24 md:w-32 rounded-xl self-start sm:self-center"
				/>
				<div>
					<p class="opacity-40 font-semibold">{project.year}</p>
					<h1 class="font-semibold text-3xl md:text-4xl leading-tight">{project.name}</h1>
					<p class="opacity-60 text-lg mt-1">{project.tagline}</p>
				</div>
			</div>
		</svelte:fragment>
	</Card>

	<div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
		<Card padding="p-2">
			<svelte:fragment slot="body">
				<article
					class="prose prose-invert [&>:first-child]:!mt-0 prose-code:before:content-none prose-code:after:content-none prose-code:font-normal prose-code:bg-surface-900/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:break-words"
				>
					<svelte:component this={content} />
				</article>
			</svelte:fragment>
		</Card>

		<aside class="lg:sticky lg:top-4 self-start">
			<Card padding="p-2">
				<svelte:fragment slot="body">
					<h2 class="font-semibold text-xl">At a glance</h2>
					<dl class="mt-4 space-y-4">
						<div>
							<dt class="text-sm opacity-60">Year</dt>
							<dd class="font-semibold">{project.year}</dd>
						</div>
						{#if project.stack.length}
							<div>
								<dt class="text-sm opacity-60">Built with</dt>
								<dd>
									<ul class="flex flex-wrap gap-2 mt-2">
										{#each project.stack as tech}
											<li class="chip bg-surface-400/30">{tech}</li>
										{/each}
									</ul>
								</dd>
							</div>
						{/if}
					</dl>
					{#if project.links.length}
						<ul class="mt-6 space-y-2">
							{#each project.links as link, i}
								<li>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										class="btn w-full justify-between {i === 0
											? 'variant-filled'
											: 'variant-soft-surface'}"
									>
										<span>{link.label}</span>
										<i class="fa-solid fa-arrow-up-long rotate-45" aria-hidden="true" />
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</svelte:fragment>
			</Card>
		</aside>
	</div>

	{#if next.slug !== project.slug}
		<a href="/projects/{next.slug}" class="group block">
			<Card padding="px-4">
				<svelte:fragment slot="body">
					<div class="flex flex-row items-center justify-between gap-4">
						<div>
							<p class="text-sm opacity-60">Next project</p>
							<p class="text-xl font-semibold">{next.name}</p>
						</div>
						<i
							class="fa-solid fa-arrow-right-long text-xl group-hover:translate-x-1 transition-transform"
							aria-hidden="true"
						/>
					</div>
				</svelte:fragment>
			</Card>
		</a>
	{/if}
</div>
