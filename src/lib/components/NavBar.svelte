<script lang="ts">
	$: classesBase = `flex flex-col bg-surface-500 rounded-full space-y-4 p-3 px-6 ${$$props.class ?? ''}`;
	$: classesRowMain = `grid items-center grid-cols-[auto_1fr_auto] gap-4 `;
	$: classesRowHeadline = ``;
	$: classesSlotLead = `flex-none flex justify-between items-center `;
	$: classesSlotDefault = `flex-auto `;
	$: classesSlotTrail = `flex-none flex items-center space-x-4`;

	const hamburgerMenu = () => {
		console.log('hamburgerMenu');
	};
</script>

<div class="app-bar w-full {classesBase}" data-testid="app-bar" role="toolbar">
	<!-- Row: Main -->
	<div class="app-bar-row-main bg-transparent {classesRowMain}">
		<!-- Slot: lead -->
		{#if $$slots.lead}
			<div class="app-bar-slot-lead {classesSlotLead}"><slot name="lead" /></div>
		{/if}
		<!-- Slot: default -->
		<div class="app-bar-slot-default {classesSlotDefault}"><slot /></div>
		<!-- Slot: trail -->
		{#if $$slots.trail}
			<!-- Big -->
			<div class="app-bar-slot-trail hidden md:flex {classesSlotTrail}"><slot name="trail" /></div>
			<!-- Mobile -->
			<div class="app-bar-slot-trail md:hidden {classesSlotTrail}">
				<button on:click={hamburgerMenu}><i class="fa-solid fa-burger text-xl"></i></button>
			</div>
		{/if}
	</div>
	<!-- Row: Headline -->
	{#if $$slots.headline}
		<div class="app-bar-row-headline {classesRowHeadline}"><slot name="headline" /></div>
	{/if}
</div>
