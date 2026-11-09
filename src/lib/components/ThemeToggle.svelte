<script lang="ts">
	import { toggleTheme } from '$lib/theme';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
</script>

<!-- Both icons render; CSS shows the one for the other theme, so there is no hydration flicker. -->
<button
	type="button"
	onclick={toggleTheme}
	class="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
	aria-label="Toggle light and dark theme"
	title="Toggle theme"
>
	<IconSun class="hidden size-4 dark:block" aria-hidden="true" />
	<IconMoon class="size-4 dark:hidden" aria-hidden="true" />
</button>
