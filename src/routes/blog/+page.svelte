<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { formatDate } from '$lib/utils';
	import { goto, pushState } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let allFilters: Record<string, boolean> = {};
	export let data;

	$: filters = data.filter.filters;
	$: {
		data.filter.available.forEach((item) => {
			const hasFilter = filters.includes(item);
			allFilters[item] = hasFilter;
		});
	}
	$: showFilters = false;

	function toggleFilters() {
		if (showFilters === true) {
			setFilter();
			return;
		}

		showFilters = !showFilters;
	}

	function removeFilter(category: string) {
		const set = new Set(filters);
		set.delete(category);
		filters = Array.from(set);
	}

	function toggleFilter(category: string) {
		allFilters[category] = !allFilters[category];

		if (allFilters[category]) {
			addFilter(category);
		} else {
			removeFilter(category);
		}
	}

	function setFilter() {
		if (filters.length === 0) {
			goto('/blog');
			return;
		}
		const filter = filters.join(',');
		goto(`/blog?categories=${filter}`);
	}

	function addFilter(category: string) {
		const set = new Set(filters);
		set.add(category);
		filters = Array.from(set);
	}
</script>

<Meta title="$ ./theoreotm.sh" pageName="Blog" />

<div class="pb-3">
	{#if data.filter.raw !== null}
		<Card padding="p-0">
			<svelte:fragment slot="body">
				<p>
					<span class="opacity-60 mr-2"> Posts tagged with: </span>
					<span class="mt-2">
						<span class="space-x-2">
							{#each filters as category}
								<button
									class="chip variant-filled"
									on:click={() => {
										removeFilter(category);
										setFilter();
									}}
								>
									<span> &num;{category} </span>
								</button>
							{/each}
						</span>
					</span>
				</p>
				<p><span class="text-xs opacity-30">(click to remove)</span></p>
			</svelte:fragment>
		</Card>
	{/if}
</div>

<!-- Posts -->
<div class="grid gap-3 grid-flow-row grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
	{#each data.posts as post}
		<a href={`blog/${post.slug}`}>
			<Card hover region="block w-full h-full" padding="p-2">
				<svelte:fragment slot="header">
					<h2 class="h3 font-semibold capitalize">{post.title}</h2>
				</svelte:fragment>
				<svelte:fragment slot="body">
					<p class="mt-2">{post.description}</p>
				</svelte:fragment>
				<svelte:fragment slot="footer">
					<p class="opacity-40">
						{formatDate(post.date)}
					</p>
					<p class="mt-2 space-x-2">
						{#each post.categories as category}
							<span class="badge variant-filled">
								&num;{category}
							</span>
						{/each}
					</p>
				</svelte:fragment>
			</Card>
		</a>
	{/each}
</div>
{#if data.filter.raw === null}
	<div class="pt-3 flex flex-col sm:flex-row">
		<button
			type="button"
			class="btn btn-md variant-filled-surface hover:variant-filled transition duration-300 mr-2 z-10"
			on:click={toggleFilters}
		>
			{#if showFilters}
				<span><i class="fa-solid fa-check"></i></span>
				<span>Save Filter</span>
			{:else}
				<span><i class="fa-solid fa-plus" /></span>
				<span>Create Filter</span>
			{/if}
		</button>
		{#if showFilters}
			<div
				class="mt-4 sm:mt-0 sm:ml-2 space-x-2 flex items-center"
				transition:fly={{
					delay: 0,
					duration: 500,
					x: -200,
					opacity: 0
				}}
			>
				{#each data.filter.available as category}
					<button
						class="chip {allFilters[category] ? 'variant-filled' : 'variant-filled-surface'}"
						on:click={() => {
							toggleFilter(category);
						}}
					>
						<span class="capitalize">{category}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
