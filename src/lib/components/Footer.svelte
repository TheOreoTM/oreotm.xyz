<script lang="ts">
	import { site, socials } from '$lib/site';
	import SocialIcon from './SocialIcon.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t">
	<div
		class="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
	>
		<p>
			© {year}
			{site.name} ·
			<a href="/rss.xml" class="hover:text-fg">rss</a> ·
			<a href={site.repo} class="hover:text-fg" target="_blank" rel="noopener noreferrer">source</a>
		</p>
		<ul class="flex gap-1" aria-label="Social links">
			{#each socials as social (social.id)}
				<li>
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						class="grid size-9 place-items-center rounded-md transition-colors hover:bg-surface-2 hover:text-fg"
						aria-label={social.label}
						title={social.label}
					>
						<SocialIcon id={social.id} />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>
