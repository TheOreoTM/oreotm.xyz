<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { pages } from '$lib/site';
	import { palette } from '$lib/palette.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import IconSearch from '~icons/lucide/search';

	// The logo already links home, so the nav lists the other pages.
	const links = pages.filter((link) => link.path !== '/');

	let shortcut = $state('Ctrl K');
	onMount(() => {
		if (/Mac|iPhone|iPad/.test(navigator.userAgent)) shortcut = '⌘K';
	});

	const isActive = (path: string) =>
		page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);
</script>

{#snippet navLinks()}
	{#each links as link (link.path)}
		<a
			href={link.path}
			aria-current={isActive(link.path) ? 'page' : undefined}
			class="transition-colors hover:text-fg {isActive(link.path) ? 'text-fg' : 'text-muted'}"
		>
			<span class="text-accent" class:invisible={!isActive(link.path)} aria-hidden="true">/</span
			>{link.label}
		</a>
	{/each}
{/snippet}

<header class="sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
		<a href="/" class="font-mono font-semibold tracking-tight">
			<span class="text-accent" aria-hidden="true">❯</span> oreotm
		</a>

		<nav aria-label="Main" class="hidden items-center gap-6 font-mono text-sm sm:flex">
			{@render navLinks()}
		</nav>

		<div class="flex items-center gap-1">
			<button
				type="button"
				onclick={() => (palette.open = true)}
				class="flex h-9 items-center gap-2 rounded-md px-2 font-mono text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg sm:border sm:px-3"
				aria-label="Open command menu"
				aria-keyshortcuts="Control+K Meta+K"
			>
				<IconSearch class="size-4" aria-hidden="true" />
				<span class="hidden sm:inline">Search</span>
				<kbd class="hidden rounded border bg-surface px-1.5 py-0.5 font-mono sm:inline">
					{shortcut}
				</kbd>
			</button>
			<ThemeToggle />
		</div>
	</div>

	<nav
		aria-label="Main"
		class="flex items-center justify-center gap-6 border-t py-2 font-mono text-sm sm:hidden"
	>
		{@render navLinks()}
	</nav>
</header>
