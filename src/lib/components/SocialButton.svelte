<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let href = '';
	export let icon: string;
	export let className: CssClasses = '';
</script>

<a
	target="_blank"
	class={`text-center flex-grow block btn variant-filled-surface p-4 text-xl font-bold ${className}`}
	{href}
	><span class="text-2xl"><i class={`${icon} text-2xl`} /></span>
	<span class="hidden md:inline">
		<slot />
	</span></a
>
