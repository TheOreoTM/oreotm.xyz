<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';

	let { data } = $props();
</script>

<Meta
	title="Projects"
	description="Case studies of Discord bots, websites, and AI experiments built by OreoTM, including Cardinal Bot and the Frieren TCG Wiki."
/>

<header class="max-w-2xl">
	<p class="font-mono text-sm text-muted"><span class="text-accent">❯</span> ls ~/projects</p>
	<h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
	<p class="mt-4 text-lg text-muted">Things I've built, shipped, and occasionally abandoned.</p>
</header>

<ul class="-mx-2 mt-12 divide-y sm:-mx-4">
	{#each data.projects as project (project.slug)}
		<li><ProjectRow {project} detailed /></li>
	{/each}
</ul>
