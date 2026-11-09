import { getProject, getProjects } from '@/lib/content';
import { ogImage, ogSize } from '@/lib/og';

export const alt = 'Project case study';
export const size = ogSize;
export const contentType = 'image/png';

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = await getProject(slug);
	return ogImage({
		eyebrow: `open projects/${slug}`,
		title: project?.meta.name ?? 'Project',
		subtitle: project?.meta.tagline
	});
}
