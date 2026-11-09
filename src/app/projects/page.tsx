import type { Metadata } from 'next';
import { ProjectRow } from '@/components/project-row';
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
				<p className="font-mono text-sm text-muted-foreground">
					<span className="text-primary">❯</span> ls ~/projects
				</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Things I&apos;ve built, shipped, and occasionally abandoned.
				</p>
			</header>

			<ul className="-mx-2 mt-12 divide-y sm:-mx-4">
				{projects.map((project) => (
					<li key={project.slug}>
						<ProjectRow project={project} detailed />
					</li>
				))}
			</ul>
		</>
	);
}
