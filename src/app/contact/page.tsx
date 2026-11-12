import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { LocalTime } from '@/components/local-time';
import { SocialIcon } from '@/components/social-icon';
import { site, socials } from '@/lib/site';

export const metadata: Metadata = {
	title: 'Contact',
	description: "Got a Discord bot or web project in mind? Here's how to reach OreoTM.",
	alternates: { canonical: '/contact' }
};

export default function ContactPage() {
	const channels = socials.filter((social) => social.contact);
	const elsewhere = socials.filter((social) => !social.contact);

	return (
		<>
			<header className="max-w-2xl">
				<h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl">
					Let&apos;s talk.
				</h1>
				<p className="mt-4 text-xl text-muted-foreground">
					Got a bot, website, or backend project in mind? Send me a message and tell me what
					you&apos;re building.
				</p>
				<p className="mt-6 text-muted-foreground">
					It&apos;s <LocalTime className="font-mono text-sm text-foreground" /> for me, in the{' '}
					{site.location} ({site.utcOffset}).
				</p>
			</header>

			<ul className="mt-12 border-t">
				{channels.map((channel) => (
					<li key={channel.id} className="border-b">
						<a
							href={channel.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-4 px-1 py-5 transition-colors hover:bg-foreground/[0.03] sm:px-3"
						>
							<SocialIcon id={channel.id} className="size-6" />
							<span className="min-w-0">
								<span className="block text-xl font-semibold tracking-tight">{channel.label}</span>
								<span className="block text-muted-foreground">
									<span className="font-mono text-sm">{channel.handle}</span>
									<span className="mx-2 text-faint" aria-hidden="true">
										/
									</span>
									{channel.contact?.note}
								</span>
							</span>
							<ArrowUpRight
								className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
								aria-hidden="true"
							/>
						</a>
					</li>
				))}
			</ul>

			<section className="mt-16" aria-labelledby="elsewhere">
				<h2 id="elsewhere" className="text-lg font-semibold tracking-tight">
					Elsewhere
				</h2>
				<ul className="mt-4 flex flex-wrap gap-2">
					{elsewhere.map((social) => (
						<li key={social.id}>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm transition-colors hover:border-primary"
							>
								<SocialIcon id={social.id} />
								{social.label}
							</a>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
