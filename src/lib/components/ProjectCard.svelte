<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;

	const maxChips = 5;
	$: chips = project.stack.slice(0, maxChips);
	$: hiddenCount = project.stack.length - chips.length;
</script>

<!-- The title link stretches over the whole card (after:inset-0), so the card is clickable
     while screen readers still announce a short link name. -->
<article class="group relative card !ring-0 !bg-surface-500 p-4 card-hover">
	<header class="card-header p-4">
		<div class="flex flex-row items-start justify-between space-x-4">
			<div class="flex flex-col space-y-4">
				<img class="md:hidden max-w-20" src={project.image} alt="" />
				<div>
					<p class="opacity-40 font-semibold">{project.year}</p>
					<h2 class="h2 font-semibold">
						<a href="/projects/{project.slug}" class="after:absolute after:inset-0">
							{project.name}
						</a>
					</h2>
					<p class="opacity-60">{project.tagline}</p>
				</div>
			</div>
			<div aria-hidden="true">
				<i
					class="fa-solid fa-arrow-right-long text-3xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition"
				/>
			</div>
		</div>
	</header>
	<section class="p-4">
		<div class="flex flex-row items-center space-x-0 md:space-x-4">
			<img class="max-w-32 hidden md:block" src={project.image} alt="" />
			<div class="space-y-4">
				<p class="text-base font-[Inter]">{project.summary}</p>
				{#if chips.length}
					<ul class="flex flex-wrap gap-2" aria-label="Built with">
						{#each chips as tech}
							<li class="chip bg-surface-400/30">{tech}</li>
						{/each}
						{#if hiddenCount > 0}
							<li class="chip bg-surface-400/30 opacity-60">+{hiddenCount} more</li>
						{/if}
					</ul>
				{/if}
				<p class="font-semibold text-sm" aria-hidden="true">Read the case study</p>
			</div>
		</div>
	</section>
</article>
