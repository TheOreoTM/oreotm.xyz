<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<Meta title="$ ./theoreotm.sh" pageName="Blog" />

<!-- Posts -->
<div class="grid gap-3 grid-flow-row grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
	{#each data.posts as post}
		<a href={`blog/${post.slug}`}>
			<Card hover region="block w-full h-full" padding="p-2">
				<svelte:fragment slot="header">
					<h2 class="h2 font-semibold capitalize">{post.title}</h2>
				</svelte:fragment>
				<svelte:fragment slot="body">
					<p class="mt-2">{post.description}</p>
				</svelte:fragment>
				<svelte:fragment slot="footer">
					<p class="opacity-40">{formatDate(post.date)}</p>
				</svelte:fragment>
			</Card>
		</a>
	{/each}
</div>
