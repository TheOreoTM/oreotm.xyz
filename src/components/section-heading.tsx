import type { ReactNode } from 'react';

export function SectionHeading({
	id,
	index,
	title,
	action
}: {
	id: string;
	index: string;
	title: string;
	action?: ReactNode;
}) {
	return (
		<div className="mb-6 flex items-baseline justify-between gap-4 border-b pb-3">
			<h2 id={id} className="font-mono text-sm text-muted-foreground">
				<span className="text-primary">{index}</span> <span aria-hidden="true">—</span> {title}
			</h2>
			{action}
		</div>
	);
}
