<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, index, title, action }: { id: string; index: string; title: string; action?: Snippet } =
		$props();
</script>

<div class="mb-6 flex items-baseline justify-between gap-4 border-b pb-3">
	<h2 {id} class="font-mono text-sm text-muted">
		<span class="text-accent">{index}</span>
		<span aria-hidden="true">—</span>
		{title}
	</h2>
	{@render action?.()}
</div>
