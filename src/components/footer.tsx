import Link from 'next/link';
import { SocialIcon } from '@/components/social-icon';
import { site, socials } from '@/lib/site';

// Cached so the year is fixed at build time instead of making every page dynamic.
async function currentYear() {
	'use cache';
	return new Date().getFullYear();
}

export async function Footer() {
	const year = await currentYear();

	return (
		<footer className="mt-24 border-t">
			<div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 font-mono text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<p>
					© {year} {site.name} ·{' '}
					<Link href="/rss.xml" className="hover:text-foreground">
						rss
					</Link>{' '}
					·{' '}
					<a
						href={site.repo}
						className="hover:text-foreground"
						target="_blank"
						rel="noopener noreferrer"
					>
						source
					</a>
				</p>
				<ul className="flex gap-1" aria-label="Social links">
					{socials.map((social) => (
						<li key={social.id}>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="grid size-9 place-items-center rounded-md transition-colors hover:bg-muted hover:text-foreground"
								aria-label={social.label}
								title={social.label}
							>
								<SocialIcon id={social.id} />
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
