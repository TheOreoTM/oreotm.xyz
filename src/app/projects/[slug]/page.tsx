import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MdxContent } from '@/components/mdx-content';
import { Badge } from '@/components/ui/badge';
import { getProject, getProjects } from '@/lib/content';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params
}: PageProps<'/projects/[slug]'>): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project) return {};
	return {
		title: project.meta.name,
		description: project.meta.summary,
		alternates: { canonical: `/projects/${slug}` }
	};
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project) notFound();

	const { meta, body } = project;
	const projects = await getProjects();
	const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

	return (
		<>
			<Link
				href="/projects"
				className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft className="size-4" aria-hidden="true" /> all projects
			</Link>

			<header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
				<Image
					src={meta.image}
					alt={meta.imageAlt}
					width={96}
					height={96}
					className="size-20 rounded-xl border bg-card object-cover sm:size-24"
				/>
				<div>
					<p className="font-mono text-sm text-muted-foreground">{meta.year}</p>
					<h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{meta.name}</h1>
					<p className="mt-2 text-lg text-muted-foreground">{meta.tagline}</p>
				</div>
			</header>

			<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
				<article className="prose max-w-none min-w-0 lg:max-w-[68ch]">
					<MdxContent source={body} />
				</article>

				<aside className="self-start lg:sticky lg:top-24">
					<h2 className="font-mono text-sm text-muted-foreground">at a glance</h2>
					<dl className="mt-4 space-y-5 border-t pt-4">
						<div>
							<dt className="font-mono text-xs text-muted-foreground">year</dt>
							<dd className="mt-1">{meta.year}</dd>
						</div>
						{meta.stack.length > 0 && (
							<div>
								<dt className="font-mono text-xs text-muted-foreground">built with</dt>
								<dd className="mt-2">
									<ul className="flex flex-wrap gap-1.5">
										{meta.stack.map((tech) => (
											<li key={tech}>
												<Badge variant="outline" className="bg-card font-mono">
													{tech}
												</Badge>
											</li>
										))}
									</ul>
								</dd>
							</div>
						)}
					</dl>
					{meta.links.length > 0 && (
						<ul className="mt-6 space-y-2">
							{meta.links.map((link, i) => (
								<li key={link.href}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
											i === 0
												? 'bg-primary text-primary-foreground hover:bg-primary/85'
												: 'border bg-card hover:border-primary'
										)}
									>
										{link.label}
										<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
									</a>
								</li>
							))}
						</ul>
					)}
				</aside>
			</div>

			{next.slug !== slug && (
				<Link
					href={`/projects/${next.slug}`}
					className="group mt-20 flex items-center justify-between gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary"
				>
					<span>
						<span className="block font-mono text-xs text-muted-foreground">next project</span>
						<span className="mt-1 block text-xl font-semibold tracking-tight">{next.name}</span>
					</span>
					<ArrowRight
						className="size-5 transition-transform group-hover:translate-x-1 group-hover:text-primary"
						aria-hidden="true"
					/>
				</Link>
			)}
		</>
	);
}
