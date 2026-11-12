import type { ReactNode } from 'react';

/** A section's heading, with an optional link at the end of its line. */
export function SectionHeading({
	id,
	title,
	action
}: {
	id: string;
	title: string;
	action?: ReactNode;
}) {
	return (
		<div className="mb-6 flex items-baseline justify-between gap-4">
			<h2 id={id} className="text-2xl font-semibold tracking-[-0.02em]">
				{title}
			</h2>
			{action}
		</div>
	);
}
