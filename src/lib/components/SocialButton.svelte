<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let href = '';
	export let icon: string;
	export let className: CssClasses = '';
</script>

<a
	target="_blank"
	class={`text-center flex-grow block btn variant-filled-surface p-4 text-lg font-bold ${className}`}
	{href}
	><div class="flex flex-row justify-center space-x-0 md:space-x-4">
		<div class="flex flex-col items-center">
			<span class="text-xl"><i class={`${icon} text-xl`} /></span>
		</div>
		<div>
			<span class="hidden md:inline">
				<slot />
			</span>
		</div>
	</div>
</a>
