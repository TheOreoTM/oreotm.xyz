import Link from 'next/link';
import { site, socials } from '@/lib/site';

// Cached so the year is fixed at build time instead of making every page dynamic.
async function currentYear() {
	'use cache';
	return new Date().getFullYear();
}

export async function Footer() {
	const year = await currentYear();

	return (
		<footer className="mx-auto mt-28 w-full max-w-[68rem] px-5 sm:px-8 lg:px-12">
			<div className="flex flex-col gap-4 border-t py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {site.name}
				</p>
				<ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
					<li>
						<Link href="/rss.xml" className="hover:text-foreground">
							rss
						</Link>
					</li>
					<li>
						<a
							href={site.repo}
							className="hover:text-foreground"
							target="_blank"
							rel="noopener noreferrer"
						>
							source
						</a>
					</li>
					{/* The rail carries these from lg up. */}
					{socials.map((social) => (
						<li key={social.id} className="lg:hidden">
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-foreground"
							>
								{social.label.toLowerCase()}
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
