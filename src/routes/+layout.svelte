<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	let { data, children } = $props();

	// Cross-fade between pages where the browser supports view transitions.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a
	href="#main"
	class="sr-only z-50 rounded-md bg-accent px-3 py-2 font-mono text-sm text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	Skip to content
</a>

<Header />

<main id="main" class="mx-auto max-w-5xl px-4 pt-10 sm:pt-16">
	{@render children()}
</main>

<Footer />

<CommandPalette projects={data.projectSummaries} />
