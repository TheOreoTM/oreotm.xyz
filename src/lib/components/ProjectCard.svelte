<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let region: CssClasses = '';
	export let background: CssClasses = '';
	export let padding: CssClasses = 'p-4';
	export let hover = false;

	let cardHover = hover ? 'card-hover' : '';

	export let href: string;
</script>

<a {href}>
	<div class={`card !ring-0 !bg-surface-500 ${region} ${cardHover} ${padding} ${background} `}>
		<header class="card-header p-4">
			<div class="flex justify-between">
				<h2 class="h2 font-semibold"><slot name="header" /></h2>
				<i class="fa-solid fa-arrow-up-long text-3xl transform rotate-45" />
			</div>
			<div>
				<p class="opacity-60"><slot name="description" /></p>
			</div>
		</header>
		<section class="p-4">
			<div class="flex flex-row items-center space-x-4">
				<div class="max-w-32"><slot name="preview" /></div>
				<div class="text-base font-[Inter]"><slot name="body" /></div>
			</div>
		</section>
	</div>
</a>
