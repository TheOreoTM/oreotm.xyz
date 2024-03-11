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
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Highlight.js
	import hljs from 'highlight.js/lib/core';

	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import json from 'highlight.js/lib/languages/json';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import shell from 'highlight.js/lib/languages/shell';

	// Register each imported language module
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('shell', shell);

	import PageTransition from '$lib/components/PageTransition.svelte';

	$: isActivePath = (path: string) => {
		if (path === '/blog' && $page.url.pathname.startsWith('/blog')) {
			return true;
		}

		return $page.url.pathname === path;
	};

	const navLinks = [
		{ path: '/blog', label: 'Blog.', isNew: true },
		{ path: '/', label: 'Home.' },
		{ path: '/projects', label: 'Projects.' },
		{ path: '/donate', label: 'Donate.' },
		{ path: '/contact', label: 'Contact.' }
	];

	export let data;
</script>

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
					{#each navLinks as { label, path, isNew } (path)}
						<a class={`${isActivePath(path) ? 'text-base' : 'opacity-60'}`} href={path}
							>{label}
							{#if isNew}
								<span class="badge variant-soft-warning">New</span>
							{/if}
						</a>
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
