<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let region: CssClasses = '';
	export let background: CssClasses = '';
	export let padding: CssClasses = 'p-4';
	export let hover = false;

	let cardHover = hover ? 'card-hover' : '';
</script>

<div class={`card !ring-0 !bg-surface-500 ${region} ${cardHover} ${padding} ${background} `}>
	<header class="card-header"><slot name="header" /></header>
	<section class="p-4"><slot name="body" /></section>
	<footer class="card-footer">
		<slot name="footer" />
	</footer>
</div>
