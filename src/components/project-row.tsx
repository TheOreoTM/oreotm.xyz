import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

/** A project in a list. The title link stretches over the row, so the whole row is clickable
 *  while screen readers hear just the project name. */
export function ProjectRow({
	project,
	detailed = false
}: {
	project: Project;
	detailed?: boolean;
}) {
	return (
		<article className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-lg px-2 py-5 transition-colors hover:bg-card sm:gap-6 sm:px-4">
			<Image
				src={project.image}
				alt=""
				width={56}
				height={56}
				className="size-12 rounded-lg border bg-card object-cover sm:size-14"
			/>
			<div className="min-w-0">
				<h3 className="text-lg font-semibold tracking-tight">
					<Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
						{project.name}
					</Link>
				</h3>
				<p className="text-muted-foreground">{project.tagline}</p>
				{detailed && <p className="mt-3 max-w-prose">{project.summary}</p>}
				{project.stack.length > 0 && (
					<p className="mt-3 font-mono text-xs text-muted-foreground">
						{project.stack.slice(0, detailed ? 8 : 4).join(' · ')}
					</p>
				)}
			</div>
			<div className="flex items-center gap-4 pt-1 font-mono text-xs text-muted-foreground">
				<span className="hidden sm:inline">{project.year}</span>
				<ArrowRight
					className="size-4 transition-transform group-hover:translate-x-1 group-hover:text-primary"
					aria-hidden="true"
				/>
			</div>
		</article>
	);
}
