import type { Metadata } from 'next';
import Link from 'next/link';
import { MissingPath } from '@/components/missing-path';

export const metadata: Metadata = {
	title: 'Not found',
	robots: { index: false, follow: false }
};

export default function NotFound() {
	return (
		<div className="mx-auto max-w-2xl py-12">
			<div className="overflow-hidden rounded-[10px] border bg-card font-mono text-sm">
				<div className="border-b px-4 py-2.5 text-center text-xs text-muted-foreground">
					oreotm@maldives: ~
				</div>
				<div className="space-y-1 p-5 leading-relaxed">
					<p>
						<span className="text-primary" aria-hidden="true">
							❯
						</span>{' '}
						<span className="text-faint" aria-hidden="true">
							~
						</span>{' '}
						cd <MissingPath />
					</p>
					<p className="text-red-600 dark:text-red-400">
						cd: <MissingPath />: No such file or directory
					</p>
				</div>
			</div>

			<h1 className="mt-10 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
			<p className="mt-3 text-lg text-muted-foreground">
				It may have moved during the redesign. Try one of these instead:
			</p>
			<ul className="mt-6 flex flex-wrap gap-2 font-mono text-sm">
				{[
					['/', 'cd ~'],
					['/projects', 'cd projects'],
					['/blog', 'cd blog']
				].map(([href, label]) => (
					<li key={href}>
						<Link
							href={href}
							className="inline-block rounded-md border bg-card px-3 py-2 hover:border-primary"
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
