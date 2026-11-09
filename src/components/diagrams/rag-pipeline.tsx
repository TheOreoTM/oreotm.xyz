import { cn } from '@/lib/utils';

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

/** The Frieren RAG pipeline, used in content/projects/frieren-rag.mdx. */
export function RagPipeline() {
	return (
		<figure className="not-prose my-8">
			<div className="grid items-start gap-3 sm:grid-cols-2">
				{lanes.map((lane) => (
					<div key={lane.title} className="rounded-xl border bg-background p-4">
						<span className="block font-mono text-xs font-semibold tracking-wide uppercase">
							{lane.title}{' '}
							<span className="font-normal tracking-normal text-muted-foreground normal-case">
								· {lane.when}
							</span>
						</span>
						<ol className="mt-3 flex flex-col items-stretch">
							{lane.steps.map((step, i) => (
								<li key={`${lane.title}-${step.label}`}>
									<div
										className={cn(
											'rounded-xl border px-3 py-2',
											step.store ? 'border-primary bg-primary/10' : 'bg-card'
										)}
									>
										<span className="block font-semibold">{step.label}</span>
										<span className="block text-sm text-muted-foreground">{step.detail}</span>
									</div>
									{i < lane.steps.length - 1 && (
										<span className="block py-1 text-center text-faint" aria-hidden="true">
											↓
										</span>
									)}
								</li>
							))}
						</ol>
					</div>
				))}
			</div>
			<figcaption className="mt-3 text-sm text-muted-foreground">
				The highlighted steps share one vector store: ingest fills it once, and every question reads
				from it.
			</figcaption>
		</figure>
	);
}
