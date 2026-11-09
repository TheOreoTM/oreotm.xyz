import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LocalTime } from '@/components/local-time';
import { ProjectRow } from '@/components/project-row';
import { SectionHeading } from '@/components/section-heading';
import { SocialIcon } from '@/components/social-icon';
import { Terminal } from '@/components/terminal';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/lib/content';
import { site, socials, toolbox } from '@/lib/site';

export default async function HomePage() {
	const projects = await getProjects();
	const featured = projects.filter((project) => project.featured);
	const summaries = projects.map(({ slug, name, tagline }) => ({ slug, name, tagline }));

	return (
		<>
			{/* Hero */}
			<section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
				<div>
					<p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
						<span className="relative flex size-2" aria-hidden="true">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
							<span className="relative inline-flex size-2 rounded-full bg-primary" />
						</span>
						{site.location} · <LocalTime /> local time
					</p>
					<h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
						I&apos;m OreoTM, a full&#8209;stack developer{' '}
						<span className="text-muted-foreground">
							building Discord bots, websites, and the backends behind them.
						</span>
					</h1>
					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild className="h-11 px-4 text-base">
							<Link href="/projects">
								See my projects <ArrowRight aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild variant="outline" className="h-11 bg-card px-4 text-base">
							<Link href="/contact">Get in touch</Link>
						</Button>
					</div>
				</div>

				<Terminal projects={summaries} />
			</section>

			{/* Selected work */}
			<section className="mt-24" aria-labelledby="work">
				<SectionHeading
					id="work"
					index="01"
					title="selected work"
					action={
						<Link
							href="/projects"
							className="font-mono text-sm text-muted-foreground hover:text-foreground"
						>
							all projects →
						</Link>
					}
				/>
				<ul className="-mx-2 sm:-mx-4">
					{featured.map((project) => (
						<li key={project.slug}>
							<ProjectRow project={project} />
						</li>
					))}
				</ul>
			</section>

			{/* About */}
			<section className="mt-24" aria-labelledby="about">
				<SectionHeading id="about" index="02" title="about" />
				<div className="grid gap-10 md:grid-cols-2">
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
								I&apos;m OreoTM, or{' '}
								<span className="font-mono text-base text-primary">@theoreotm</span> if you want to
								be fancy. I&apos;m a full-stack developer based in the {site.location} (
								{site.utcOffset}).
							</p>
							<p className="text-muted-foreground">
								Most of what I build is backend-heavy: Discord bots that look after servers, the
								APIs and databases behind them, and the websites that sit on top.
							</p>
						</div>
					</div>

					<dl className="space-y-4">
						{toolbox.map((group) => (
							<div
								key={group.group}
								className="grid grid-cols-[8.5rem_1fr] gap-4 border-b pb-4 last:border-0"
							>
								<dt className="font-mono text-sm text-muted-foreground">{group.group}</dt>
								<dd>{group.items.join(', ')}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* Contact */}
			<section className="mt-24 rounded-2xl border bg-card p-8 sm:p-10" aria-labelledby="cta">
				<h2 id="cta" className="text-3xl font-semibold tracking-tight text-balance">
					Got a brilliant{' '}
					<span className="text-muted-foreground line-through decoration-primary">Discord bot</span>{' '}
					idea in mind?
				</h2>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
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
								className="grid size-11 place-items-center rounded-lg border bg-background transition-colors hover:border-primary"
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
