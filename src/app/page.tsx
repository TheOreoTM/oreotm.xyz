import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LocalTime } from '@/components/local-time';
import { SectionHeading } from '@/components/section-heading';
import { SocialIcon } from '@/components/social-icon';
import { Terminal } from '@/components/terminal';
import { Button } from '@/components/ui/button';
import { Work } from '@/components/work';
import { getProjects } from '@/lib/content';
import { site, socials, toolbox } from '@/lib/site';

export default async function HomePage() {
	const projects = await getProjects();
	const featured = projects.filter((project) => project.featured);
	const summaries = projects.map(({ slug, name, tagline }) => ({ slug, name, tagline }));

	return (
		<>
			{/* The statement and the terminal. */}
			<section className="grid items-end gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:gap-12">
				<div>
					{/* Wraps naturally, with "a" tied to "full-stack" so it never ends a line alone. */}
					<h1 className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-wrap sm:text-6xl">
						I&apos;m OreoTM, a&nbsp;full&#8209;stack developer.
					</h1>
					<p className="mt-5 max-w-[34ch] text-xl leading-snug text-muted-foreground sm:text-2xl">
						I build Discord bots, websites, and the backends behind them.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						{/* Neither is filled: on this screen the lime belongs to the work below. */}
						<Button asChild variant="outline" className="h-11 bg-card px-4 text-base">
							<Link href="/projects">
								See my projects <ArrowRight aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild variant="ghost" className="h-11 px-4 text-base">
							<Link href="/contact">Get in touch</Link>
						</Button>
					</div>
					{/* The rail shows this from lg up. */}
					<p className="mt-6 text-sm text-muted-foreground lg:hidden">
						{site.location}, <LocalTime className="font-mono" /> local time
					</p>
				</div>

				<Terminal projects={summaries} />
			</section>

			{/* Selected work */}
			<section className="mt-16 lg:mt-14" aria-labelledby="work">
				<SectionHeading
					id="work"
					title="Selected work"
					action={
						<Link
							href="/projects"
							className="text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
						>
							All projects
						</Link>
					}
				/>
				<Work projects={featured} />
			</section>

			{/* About */}
			<section className="mt-24 lg:mt-28" aria-labelledby="about">
				<SectionHeading id="about" title="About" />
				<div className="grid gap-10 md:grid-cols-2 md:gap-12">
					<div className="flex gap-5">
						<Image
							src={site.avatar}
							alt="OreoTM's avatar"
							width={64}
							height={64}
							className="size-16 shrink-0 rounded-full border"
						/>
						<div className="space-y-4 text-lg">
							<p>
								I go by OreoTM, or{' '}
								<span className="font-mono text-base text-primary">@theoreotm</span> if you want to
								be fancy. I&apos;m a full-stack developer based in the {site.location} (
								{site.utcOffset}).
							</p>
							<p className="text-muted-foreground">
								Most of what I build is backend-heavy: Discord bots that look after servers, the
								APIs and databases behind them, and the websites on top.
							</p>
						</div>
					</div>

					<dl className="border-t">
						{toolbox.map((group) => (
							<div key={group.group} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b py-3.5">
								<dt className="text-sm leading-6 text-muted-foreground">{group.group}</dt>
								<dd>{group.items.join(', ')}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* Contact */}
			<section className="mt-24 border-t pt-12 lg:mt-28" aria-labelledby="cta">
				<h2
					id="cta"
					className="max-w-[18ch] text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl"
				>
					Got a brilliant{' '}
					<span className="text-muted-foreground line-through decoration-primary">Discord bot</span>{' '}
					idea in mind?
				</h2>
				<p className="mt-4 max-w-prose text-lg text-muted-foreground">
					Send me a message and tell me what you&apos;re building.
				</p>
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<Button asChild className="h-11 px-4 text-base">
						<Link href="/contact">
							Let&apos;s talk <ArrowRight aria-hidden="true" />
						</Link>
					</Button>
					{socials
						.filter((social) => social.contact)
						.map((social) => (
							<a
								key={social.id}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="grid size-11 place-items-center rounded-lg border bg-card transition-colors hover:border-primary"
								aria-label={social.label}
								title={social.label}
							>
								<SocialIcon id={social.id} />
							</a>
						))}
				</div>
			</section>
		</>
	);
}
