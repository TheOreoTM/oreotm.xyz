<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let content: string;
	export let event: 'hover' | 'click' | 'focus-blur' | 'focus-click' = 'hover';

	const popupHover: PopupSettings = {
		event,
		target: `popupHover-${content}`,
		placement: 'top',
		middleware: {
			offset: 24
		}
	};
</script>

<span use:popup={popupHover}><slot /></span>

<div class="card p-4 bg-surface-500" data-popup={`popupHover-${content}`}>
	<p class="text-base font-[Inter]">{content}</p>
	<div class="arrow bg-surface-900" />
</div>
