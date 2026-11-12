import { getPost, getPosts } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { ogImage, ogSize } from '@/lib/og';

export const alt = 'Blog post';
export const size = ogSize;
export const contentType = 'image/png';

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPost(slug);
	return ogImage({
		eyebrow: `cat blog/${slug}`,
		title: post?.meta.title ?? 'Blog post',
		subtitle: post ? `${post.meta.description} · ${formatDate(post.meta.date, 'long')}` : undefined
	});
}
