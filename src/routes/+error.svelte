<script lang="ts">
	import { page } from '$app/state';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta title={page.status === 404 ? 'Not found' : 'Error'} noindex />

<div class="mx-auto max-w-2xl py-12">
	<div class="overflow-hidden rounded-xl border bg-surface font-mono text-sm">
		<div class="border-b px-4 py-2.5 text-center text-xs text-faint">oreotm@maldives: ~</div>
		<div class="space-y-1 p-5 leading-relaxed">
			<p>
				<span class="text-accent" aria-hidden="true">❯</span>
				<span class="text-faint" aria-hidden="true">~</span> cd {page.url.pathname}
			</p>
			{#if page.status === 404}
				<p class="text-red-600 dark:text-red-400">
					cd: {page.url.pathname}: No such file or directory
				</p>
			{:else}
				<p class="text-red-600 dark:text-red-400">
					error {page.status}: {page.error?.message ?? 'Something went wrong'}
				</p>
			{/if}
		</div>
	</div>

	<h1 class="mt-10 text-4xl font-semibold tracking-tight">
		{page.status === 404 ? "This page doesn't exist." : 'Something went wrong.'}
	</h1>
	<p class="mt-3 text-lg text-muted">
		{page.status === 404
			? 'It may have moved during the redesign. Try one of these instead:'
			: 'Try again in a moment, or head somewhere else:'}
	</p>
	<ul class="mt-6 flex flex-wrap gap-2 font-mono text-sm">
		<li><a href="/" class="rounded-lg border bg-surface px-3 py-2 hover:border-accent">cd ~</a></li>
		<li>
			<a href="/projects" class="rounded-lg border bg-surface px-3 py-2 hover:border-accent"
				>cd projects</a
			>
		</li>
		<li>
			<a href="/blog" class="rounded-lg border bg-surface px-3 py-2 hover:border-accent">cd blog</a>
		</li>
	</ul>
</div>
