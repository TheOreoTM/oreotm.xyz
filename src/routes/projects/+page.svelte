<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
</script>

<Meta
	title="Projects"
	description="Discord bots, websites, and AI experiments built by OreoTM, including Cardinal Bot and the Frieren TCG Wiki."
/>

<div class="space-y-3">
	<Card padding="p-2">
		<svelte:fragment slot="body">
			<h1 class="font-semibold text-3xl leading-tight">
				Projects.
				<span class="opacity-40">Things I've built, shipped, and occasionally abandoned.</span>
			</h1>
		</svelte:fragment>
	</Card>

	{#each projects as project (project.name)}
		<ProjectCard {project} />
	{/each}
</div>
