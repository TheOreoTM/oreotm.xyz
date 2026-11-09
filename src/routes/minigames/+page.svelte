<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
</script>

<!-- Work in progress: not linked from the site, and hidden from search engines. -->
<Meta title="Minigames" noindex />

<div class="max-w-2xl">
	<p class="font-mono text-sm text-muted"><span class="text-accent">❯</span> ./guess-lamar</p>
	<h1 class="mt-4 text-4xl font-semibold tracking-tight">Guess Lamar</h1>
	<p class="mt-4 text-lg text-muted">
		The song's original name will be replaced with a synonym. Try to figure out which song it is!
	</p>

	<form class="mt-8 rounded-xl border bg-surface p-6" onsubmit={(e) => e.preventDefault()}>
		<label for="guess" class="block text-lg font-medium">
			<em>"Monarch Kunta"</em> – What Kendrick Lamar song is this?
		</label>
		<div class="mt-4 flex gap-2">
			<input
				id="guess"
				type="text"
				placeholder="Your guess here"
				autocomplete="off"
				class="w-full min-w-0 rounded-lg border bg-bg px-3 py-2"
			/>
			<button type="submit" class="rounded-lg bg-accent px-4 py-2 font-medium text-accent-fg">
				Submit
			</button>
		</div>
	</form>
</div>
