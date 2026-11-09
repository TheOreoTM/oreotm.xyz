<script lang="ts">
	import { onMount } from 'svelte';
	import { localTime } from '$lib/site';

	let { class: className = '' }: { class?: string } = $props();

	// Pages are prerendered, so the time is filled in on the client only.
	let time = $state('');

	onMount(() => {
		const update = () => (time = localTime());
		update();
		const interval = setInterval(update, 15_000);
		return () => clearInterval(interval);
	});
</script>

<span class="inline-block min-w-[7ch] tabular-nums {className}">{time}</span>
