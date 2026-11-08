<script lang="ts">
	import type { Project } from '$lib/data/projects';

	export let project: Project;
</script>

<a target="_blank" rel="noopener noreferrer" href={project.href} class="block">
	<div class="card !ring-0 !bg-surface-500 p-4">
		<header class="card-header p-4">
			<div class="flex flex-row items-center justify-between space-x-4">
				<div class="flex flex-col space-y-4 self-end">
					<img class="md:hidden max-w-20" src={project.image} alt={project.imageAlt} />
					<div class="flex flex-col max-w-full justify-between">
						<h2 class="h2 font-semibold">{project.name}</h2>
						<p class="opacity-60">{project.tagline}</p>
					</div>
				</div>
				<div class="self-start" aria-hidden="true">
					<i class="fa-solid fa-arrow-up-long text-3xl transform rotate-45" />
				</div>
			</div>
		</header>
		<section class="p-4">
			<div class="flex flex-row items-center space-x-0 md:space-x-4">
				<img class="max-w-32 hidden md:block" src={project.image} alt="" />
				<p class="text-base font-[Inter]">{project.description}</p>
			</div>
		</section>
	</div>
</a>
