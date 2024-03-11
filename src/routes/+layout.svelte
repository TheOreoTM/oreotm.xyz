<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	import { page } from '$app/stores';
	import Meta from '$lib/components/Meta.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import PageTransition from '$lib/components/PageTransition.svelte';

	function isActivePath(path: string) {
		return $page.url.pathname === path;
	}

	const navLinks = [
		{ path: '/', label: 'Home.' },
		{ path: '/blog', label: 'Blog.' },
		{ path: '/projects', label: 'Projects.' },
		{ path: '/donate', label: 'Donate.' },
		{ path: '/contact', label: 'Contact.' }
	];

	export let data;
</script>

<Meta title="$ ./theoreotm.sh" />
<!-- App Shell -->
<AppShell
	slotPageHeader="mx-auto container p-4 bg-transparent"
	slotPageContent="container mx-auto px-4 pb-10"
>
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<NavBar regionRowHeadline="rounded-full" regionRowMain="rounded-full">
			<svelte:fragment slot="lead">
				<strong class="text-lg">OreoTM.</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<nav class="flex space-x-8 font-semibold">
					{#each navLinks as { label, path } (path)}
						<a class={$page.url.pathname === path ? 'text-base' : 'opacity-60'} href={path}
							>{label}</a
						>
					{/each}
				</nav>
			</svelte:fragment>
		</NavBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
</AppShell>
