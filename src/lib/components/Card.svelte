<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let region: CssClasses = '';
	export let background: CssClasses = '';
	export let padding: CssClasses = 'p-4';
	export let hover = false;

	let cardHover = hover ? 'card-hover' : '';
</script>

<div class={`card !ring-0 !bg-surface-500 ${region} ${cardHover} ${padding} ${background} `}>
	{#if $$slots.header}
		<header class="card-header"><slot name="header" /></header>
	{/if}
	{#if $$slots.body}
		<section class="p-4"><slot name="body" /></section>
	{/if}
	{#if $$slots.footer}
		<footer class="card-footer">
			<slot name="footer" />
		</footer>
	{/if}
</div>
