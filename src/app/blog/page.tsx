import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getPosts } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/dates';
import type { Post } from '@/lib/types';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Notes from OreoTM on building Discord bots, websites, and other side projects.',
	alternates: { canonical: '/blog' }
};

/** The blog URL with `category` toggled in or out of the filter. */
function toggleHref(selected: string[], category: string) {
	const next = selected.includes(category)
		? selected.filter((c) => c !== category)
		: [...selected, category];
	return next.length ? `/blog?categories=${next.join(',')}` : '/blog';
}

function PostList({ posts, selected }: { posts: Post[]; selected: string[] }) {
	const categories = [...new Set(posts.flatMap((post) => post.categories))].sort();
	const shown = posts.filter((post) => selected.every((c) => post.categories.includes(c)));

	return (
		<>
			<nav
				aria-label="Filter posts by tag"
				className="mt-10 flex flex-wrap items-center gap-2 font-mono text-sm"
			>
				<span className="mr-1 text-muted-foreground">tags:</span>
				{categories.map((category) => {
					const active = selected.includes(category);
					return (
						<Link
							key={category}
							href={toggleHref(selected, category)}
							scroll={false}
							className={cn(
								'rounded-md border px-2.5 py-1 transition-colors',
								active
									? 'border-primary bg-primary text-primary-foreground'
									: 'bg-card text-muted-foreground hover:border-primary hover:text-foreground'
							)}
						>
							#{category}
							{active && <span className="sr-only"> (selected, click to remove)</span>}
						</Link>
					);
				})}
				{selected.length > 0 && (
					<Link
						href="/blog"
						scroll={false}
						className="ml-1 text-muted-foreground underline hover:text-foreground"
					>
						clear
					</Link>
				)}
			</nav>

			{shown.length > 0 ? (
				<ul className="mt-8 border-t">
					{shown.map((post) => (
						<li key={post.slug} className="border-b">
							<article className="group relative grid gap-1 px-1 py-5 transition-colors hover:bg-foreground/[0.03] sm:grid-cols-[8rem_1fr] sm:gap-6 sm:px-3">
								<time
									dateTime={isoDate(post.date)}
									className="pt-1 font-mono text-sm text-muted-foreground tabular-nums"
								>
									{formatDate(post.date)}
								</time>
								<div>
									<h2 className="text-lg font-semibold tracking-tight">
										<Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
											{post.title}
										</Link>
									</h2>
									<p className="text-muted-foreground">{post.description}</p>
									<p className="mt-2 font-mono text-xs text-muted-foreground">
										{post.categories.map((c) => `#${c}`).join(' ')}
									</p>
								</div>
							</article>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-8 font-mono text-sm text-muted-foreground">No posts match those tags.</p>
			)}
		</>
	);
}

/** Reads ?categories= at request time; old ?categories=a,b links keep working. */
async function FilteredPostList({
	posts,
	searchParams
}: {
	posts: Post[];
	searchParams: PageProps<'/blog'>['searchParams'];
}) {
	const { categories } = await searchParams;
	const raw = Array.isArray(categories) ? categories.join(',') : (categories ?? '');
	return <PostList posts={posts} selected={raw.split(',').filter(Boolean)} />;
}

export default async function BlogPage({ searchParams }: PageProps<'/blog'>) {
	const posts = await getPosts();

	return (
		<>
			<header className="max-w-2xl">
				<h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">
					Blog
				</h1>
				<p className="mt-4 text-xl text-muted-foreground">
					Notes on things I&apos;ve built and broken.
				</p>
			</header>

			{/* The unfiltered list is prerendered; the filter applies once the URL is read. */}
			<Suspense fallback={<PostList posts={posts} selected={[]} />}>
				<FilteredPostList posts={posts} searchParams={searchParams} />
			</Suspense>
		</>
	);
}
