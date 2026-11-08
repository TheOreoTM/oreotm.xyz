<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';

	const links = [
		{ path: '/', label: 'Home.' },
		{ path: '/projects', label: 'Projects.' },
		{ path: '/blog', label: 'Blog.', isNew: true },
		{ path: '/contact', label: 'Contact.' }
	];

	let open = false;

	// Close the mobile menu once a link has been followed.
	afterNavigate(() => (open = false));

	$: isActive = (path: string) =>
		path === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(path);

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}
</script>

<svelte:window on:keydown={onKeydown} />

<header>
	<div class="flex items-center justify-between bg-surface-500 rounded-full p-3 px-6">
		<a href="/" class="text-lg font-bold">OreoTM.</a>

		<nav aria-label="Main" class="hidden md:flex space-x-8 font-semibold">
			{#each links as { label, path, isNew } (path)}
				<a
					href={path}
					class={isActive(path) ? '' : 'opacity-60 hover:opacity-100 transition-opacity'}
					aria-current={isActive(path) ? 'page' : undefined}
				>
					{label}
					{#if isNew}<span class="badge variant-soft-warning">New</span>{/if}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="md:hidden w-10 h-10 -mr-2 flex items-center justify-center"
			aria-expanded={open}
			aria-controls="mobile-nav"
			aria-label={open ? 'Close menu' : 'Open menu'}
			on:click={() => (open = !open)}
		>
			<i class="fa-solid {open ? 'fa-xmark' : 'fa-burger'} text-xl" aria-hidden="true" />
		</button>
	</div>

	{#if open}
		<nav
			id="mobile-nav"
			aria-label="Main"
			class="md:hidden mt-2 bg-surface-500 rounded-container-token p-2"
			transition:slide={{ duration: 150 }}
		>
			<ul class="flex flex-col font-semibold text-lg">
				{#each links as { label, path, isNew } (path)}
					<li>
						<a
							href={path}
							class="flex items-center justify-between rounded-full px-4 py-3 {isActive(path)
								? 'bg-surface-400/40'
								: 'opacity-60'}"
							aria-current={isActive(path) ? 'page' : undefined}
						>
							{label}
							{#if isNew}<span class="badge variant-soft-warning">New</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
