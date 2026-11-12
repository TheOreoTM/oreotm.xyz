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
			<div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
				<header className="max-w-2xl">
					<p className="font-mono text-sm text-muted-foreground">
						<span className="text-primary">❯</span> contact
					</p>
					<h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
						Let&apos;s talk.
					</h1>
					<p className="mt-4 text-lg text-muted-foreground">
						Got a bot, website, or backend project in mind? Send me a message and tell me what
						you&apos;re building.
					</p>
				</header>

				<div className="self-end rounded-xl border bg-card p-6">
					<p className="font-mono text-xs text-muted-foreground">my local time</p>
					<p className="mt-2 text-3xl font-semibold tracking-tight">
						<LocalTime />
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{site.location}, {site.utcOffset}
					</p>
				</div>
			</div>

			<ul className="mt-12 grid gap-3 md:grid-cols-2">
				{channels.map((channel) => (
					<li key={channel.id}>
						<a
							href={channel.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary"
						>
							<span className="flex items-start justify-between">
								<SocialIcon id={channel.id} className="size-7" />
								<ArrowUpRight
									className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
									aria-hidden="true"
								/>
							</span>
							<span className="mt-8 text-xl font-semibold tracking-tight">{channel.label}</span>
							<span className="font-mono text-sm text-muted-foreground">{channel.handle}</span>
							<span className="mt-3">{channel.contact?.note}</span>
						</a>
					</li>
				))}
			</ul>

			<section className="mt-16" aria-labelledby="elsewhere">
				<h2 id="elsewhere" className="font-mono text-sm text-muted-foreground">
					elsewhere
				</h2>
				<ul className="mt-4 flex flex-wrap gap-2">
					{elsewhere.map((social) => (
						<li key={social.id}>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm transition-colors hover:border-primary"
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
