<script lang="ts">
	type Step = { label: string; detail: string; store?: boolean };

	const lanes: { title: string; when: string; steps: Step[] }[] = [
		{
			title: 'Ingest',
			when: 'once, at setup',
			steps: [
				{ label: 'Wiki text', detail: '51 character files' },
				{ label: 'Chunk', detail: '1,000 chars, 200 overlap' },
				{ label: 'Embed', detail: 'OpenAI or Gemini' },
				{ label: 'Vector store', detail: 'in-memory or ChromaDB', store: true }
			]
		},
		{
			title: 'Answer',
			when: 'for every question',
			steps: [
				{ label: 'Question', detail: 'CLI or POST /query' },
				{ label: 'Embed', detail: 'same model as the chunks' },
				{ label: 'Retrieve', detail: 'top 5 from the store', store: true },
				{ label: 'Prompt', detail: 'context + question' },
				{ label: 'LLM', detail: 'temperature 0.1' },
				{ label: 'Answer', detail: 'streamed back' }
			]
		}
	];
</script>

<figure class="not-prose my-8">
	<div class="grid gap-3 sm:grid-cols-2 items-start">
		{#each lanes as lane}
			<div class="rounded-container-token bg-surface-900/60 p-4">
				<span class="block text-sm font-semibold uppercase tracking-wide">
					{lane.title}
					<span class="opacity-50 normal-case tracking-normal font-normal">· {lane.when}</span>
				</span>
				<ol class="mt-3 flex flex-col items-stretch">
					{#each lane.steps as step, i}
						<li>
							<div
								class="rounded-xl px-3 py-2 {step.store
									? 'bg-tertiary-500/25 ring-1 ring-tertiary-400/60'
									: 'bg-surface-500'}"
							>
								<span class="block font-semibold">{step.label}</span>
								<span class="block text-sm opacity-60">{step.detail}</span>
							</div>
							{#if i < lane.steps.length - 1}
								<span class="block text-center py-1 opacity-40" aria-hidden="true">
									<i class="fa-solid fa-arrow-down text-sm" />
								</span>
							{/if}
						</li>
					{/each}
				</ol>
			</div>
		{/each}
	</div>
	<figcaption class="mt-3 text-sm opacity-60">
		The highlighted steps share one vector store: ingest fills it once, and every question reads
		from it.
	</figcaption>
</figure>
