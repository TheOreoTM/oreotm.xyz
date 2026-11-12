import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MdxContent } from '@/components/mdx-content';
import { getProject, getProjects } from '@/lib/content';

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
				className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft className="size-4" aria-hidden="true" /> All projects
			</Link>

			<header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
				<Image
					src={meta.image}
					alt={meta.imageAlt}
					width={96}
					height={96}
					className="size-20 rounded-[10px] border bg-card object-cover sm:size-24"
				/>
				<div>
					<h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
						{meta.name}
					</h1>
					<p className="mt-2 text-xl text-muted-foreground">{meta.tagline}</p>
				</div>
			</header>

			<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
				<article className="prose max-w-none min-w-0 lg:max-w-[68ch]">
					<MdxContent source={body} />
				</article>

				<aside className="self-start lg:sticky lg:top-24">
					<h2 className="text-lg font-semibold tracking-tight">At a glance</h2>
					<dl className="mt-3 border-t">
						<div className="border-b py-3">
							<dt className="text-sm text-muted-foreground">Year</dt>
							<dd className="mt-1 tabular-nums">{meta.year}</dd>
						</div>
						{meta.stack.length > 0 && (
							<div className="border-b py-3">
								<dt className="text-sm text-muted-foreground">Built with</dt>
								<dd className="mt-1 font-mono text-sm leading-relaxed">{meta.stack.join(', ')}</dd>
							</div>
						)}
					</dl>
					{meta.links.length > 0 && (
						<ul className="mt-6 space-y-2">
							{meta.links.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-between gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-primary"
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
					className="group mt-20 flex items-baseline justify-between gap-4 border-y px-1 py-6 transition-colors hover:bg-foreground/[0.03] sm:px-3"
				>
					<span>
						<span className="block text-sm text-muted-foreground">Next project</span>
						<span className="mt-1 block text-2xl font-semibold tracking-tight">{next.name}</span>
					</span>
					<ArrowRight
						className="size-5 self-center transition-transform group-hover:translate-x-1 group-hover:text-primary"
						aria-hidden="true"
					/>
				</Link>
			)}
		</>
	);
}
