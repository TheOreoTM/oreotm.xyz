<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
</script>

<Meta />
<div class="space-y-3">
	<div class="flex flex-col space-y-3 md:space-x-3 md:space-y-0 md:flex-row">
		<div class="sm:max-w-full lg:max-w-2xl xl:max-w-4xl flex flex-grow">
			<Card padding="p-2">
				<svelte:fragment slot="header"
					><Avatar width="w-28" src="/discord-pfp.png" alt="OreoTM's avatar" /></svelte:fragment
				>
				<svelte:fragment slot="body">
					<p class="font-semibold text-3xl leading-tight">
						I'm <span class="inline"
							><Tooltip content="or @theoreotm if you want to be fancy">OreoTM,</Tooltip></span
						>
						a full-stack developer
						<span class="opacity-40 whitespace-normal"
							>building Discord bots, websites, and other <span class="hidden md:inline"
								>backend-related</span
							>
							projects.</span
						>
					</p>
				</svelte:fragment>
			</Card>
		</div>

		<div class="sm:flex-col flex-1 space-y-4">
			<div class="sm:max-w-full">
				<Card padding="p-9">
					<svelte:fragment slot="header"
						><div class="text-center">
							<i class="fa-regular fa-lightbulb text-4xl" />
						</div></svelte:fragment
					>
					<svelte:fragment slot="body">
						<p class="text-center font-bold text-2xl leading-tight">
							Got a brilliant <s class="hidden lg:inline">discord bot</s> idea in mind?
						</p>
					</svelte:fragment>
				</Card>
			</div>
			<div>
				<a href="/contact" class="group">
					<Card padding="px-4" background="bg-gradient-to-r from-cyan-500 to-lime-400">
						<svelte:fragment slot="body">
							<div class="flex flex-row justify-between text-xl font-semibold">
								<p>Contact Me</p>
								<span aria-hidden="true"
									><i class="fa-solid fa-arrow-right-long arrow-animation" /></span
								>
							</div>
						</svelte:fragment>
					</Card>
				</a>
			</div>
		</div>
	</div>
	<SocialLinks />
	<div class="flex flex-col space-y-3 lg:space-x-3 lg:space-y-0 lg:flex-row">
		<div class="sm:max-w-full flex-grow">
			<Card>
				<svelte:fragment slot="header">
					<h1 class="h1 font-semibold">Skills</h1>
				</svelte:fragment>
				<svelte:fragment slot="body">
					<Skills />
				</svelte:fragment>
			</Card>
		</div>

		<div class="sm:max-w-full lg:max-w-2xl xl:max-w-4xl flex flex-grow">
			<Card>
				<svelte:fragment slot="header"
					><i class="fa-solid fa-globe text-7xl md:text-8xl" /></svelte:fragment
				>
				<svelte:fragment slot="body">
					<p class="font-semibold text-4xl md:text-7xl leading-tight">
						Based in Maldives
						<span class="opacity-40 whitespace-normal">GMT+5</span>
					</p>
				</svelte:fragment>
			</Card>
		</div>
	</div>
	{#each data.featured as project (project.slug)}
		<ProjectCard {project} />
	{/each}
	<a href="/projects" class="group block">
		<Card padding="px-4">
			<svelte:fragment slot="body">
				<div class="flex flex-row justify-between text-xl font-semibold">
					<p>All projects</p>
					<span aria-hidden="true"
						><i
							class="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"
						/></span
					>
				</div>
			</svelte:fragment>
		</Card>
	</a>
</div>

<style>
	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateX(0);
		}
		40% {
			transform: translateX(-10px);
		}
		60% {
			transform: translateX(-5px);
		}
	}

	.arrow-animation {
		animation: bounce 1s infinite;
	}

	.arrow-animation:hover {
		animation-play-state: paused; /* Set to paused on hover */
	}

	@media (prefers-reduced-motion: reduce) {
		.arrow-animation {
			animation: none;
		}
	}
</style>
