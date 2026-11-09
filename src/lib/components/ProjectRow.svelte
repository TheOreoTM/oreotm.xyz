<script lang="ts">
	import type { Project } from '$lib/types';
	import IconArrowRight from '~icons/lucide/arrow-right';

	let { project, detailed = false }: { project: Project; detailed?: boolean } = $props();
</script>

<!-- The title link stretches over the row (after:inset-0): the whole row is clickable and
     screen readers hear just the project name. -->
<article
	class="group relative grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-lg px-2 py-5 transition-colors hover:bg-surface sm:gap-6 sm:px-4"
>
	<img
		src={project.image}
		alt=""
		class="size-12 rounded-lg border bg-surface object-cover sm:size-14"
		loading="lazy"
	/>
	<div class="min-w-0">
		<h3 class="text-lg font-semibold tracking-tight">
			<a href="/projects/{project.slug}" class="after:absolute after:inset-0">{project.name}</a>
		</h3>
		<p class="text-muted">{project.tagline}</p>
		{#if detailed}
			<p class="mt-3 max-w-prose">{project.summary}</p>
		{/if}
		{#if project.stack.length}
			<p class="mt-3 font-mono text-xs text-muted">
				{project.stack.slice(0, detailed ? 8 : 4).join(' · ')}
			</p>
		{/if}
	</div>
	<div class="flex items-center gap-4 pt-1 font-mono text-xs text-muted">
		<span class="hidden sm:inline">{project.year}</span>
		<IconArrowRight
			class="size-4 transition-transform group-hover:translate-x-1 group-hover:text-accent"
			aria-hidden="true"
		/>
	</div>
</article>
