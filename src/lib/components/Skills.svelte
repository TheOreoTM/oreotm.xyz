<script>
	import Tooltip from '$lib/components/Tooltip.svelte';

	const icons = [
		{ name: 'Typescript', icon: 'devicon-typescript-plain' },
		{ name: 'Javascript', icon: 'devicon-javascript-plain' },
		{ name: 'Go', icon: 'devicon-go-plain' },
		{ name: 'NodeJS', icon: 'devicon-nodejs-plain-wordmark' },
		{ name: 'Python', icon: 'devicon-python-plain' },
		{ name: 'HTML', icon: 'devicon-html5-plain' },
		{ name: 'CSS', icon: 'devicon-css3-plain' },
		{ name: 'Docker', icon: 'devicon-docker-plain' },
		{ name: 'Git', icon: 'devicon-git-plain' },
		{ name: 'MongoDB', icon: 'devicon-mongodb-plain' },
		{ name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
		{ name: 'Redis', icon: 'devicon-redis-plain' }
	];
</script>

<div class="grid grid-cols-6 gap-4 lg:gap-y-10 lg:grid-cols-4">
	{#each icons as { name, icon } (name)}
		<div class="flex-grow text-center">
			<Tooltip event="click" content={name}><i class={`${icon} lg:text-4xl text-3xl`}></i></Tooltip>
		</div>
	{/each}
</div>
