import type { Metadata } from 'next';
import { Work } from '@/components/work';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Projects',
	description:
		'Case studies of Discord bots, websites, and AI experiments built by OreoTM, including Cardinal Bot and the Frieren TCG Wiki.',
	alternates: { canonical: '/projects' }
};

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<>
			<header className="max-w-2xl">
				<h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">
					Projects
				</h1>
				<p className="mt-4 text-xl text-muted-foreground">
					Things I&apos;ve built, shipped, and occasionally abandoned.
				</p>
			</header>

			<div className="mt-12">
				<Work projects={projects} />
			</div>
		</>
	);
}
