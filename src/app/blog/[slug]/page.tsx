import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MdxContent } from '@/components/mdx-content';
import { getPost, getPosts } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/dates';

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) return {};
	return {
		title: post.meta.title,
		description: post.meta.description,
		alternates: { canonical: `/blog/${slug}` },
		openGraph: {
			type: 'article',
			publishedTime: isoDate(post.meta.date),
			tags: post.meta.categories
		}
	};
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) notFound();
	const { meta, body } = post;

	return (
		<div className="max-w-[68ch]">
			<Link
				href="/blog"
				className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft className="size-4" aria-hidden="true" /> all posts
			</Link>

			<header className="mt-8">
				<h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
					{meta.title}
				</h1>
				<p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted-foreground">
					<time dateTime={isoDate(meta.date)}>{formatDate(meta.date, 'long')}</time>
					{meta.categories.map((category) => (
						<Link
							key={category}
							href={`/blog?categories=${category}`}
							className="hover:text-foreground"
						>
							#{category}
						</Link>
					))}
				</p>
			</header>

			<article className="prose mt-10 max-w-none">
				<MdxContent source={body} />
			</article>
		</div>
	);
}
