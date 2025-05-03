<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta title="$ ./theoreotm.sh" pageName="Minigames" />

<Card padding="p-2">
	<svelte:fragment slot="header"><h1 class="h1 font-bold">Guess Lamar</h1></svelte:fragment>
	<svelte:fragment slot="body">
		<p class="mt-2 text-lg">
			The song's original name will be replaced with a synonym. Try to figure out which song it is!
		</p>

		<div class="mt-4">
			<p class="font-medium text-xl">
				<em>"Monarch Kunta"</em> - What Kendrick Lamar song is this?
			</p>
			<input type="text" class="input border p-2 mt-2 w-full" placeholder="Your guess here" />
			<button class="btn variant-filled">Submit</button>
		</div>
	</svelte:fragment>
</Card>
