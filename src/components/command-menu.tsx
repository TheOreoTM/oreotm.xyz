'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { FileText, Folder, Rss, SunMoon } from 'lucide-react';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import { useCommandMenu } from '@/components/command-menu-context';
import { SocialIcon } from '@/components/social-icon';
import { pages, socials } from '@/lib/site';
import type { ProjectSummary } from '@/lib/types';

/**
 * Substring matching instead of cmdk's fuzzy scoring: with this few items, fuzzy matches like
 * "rag" → "page pRojects… thinGs" outrank the obvious result, because cmdk keeps the first
 * group's matches on top.
 */
function filter(value: string, search: string, keywords: string[] = []) {
	const query = search.trim().toLowerCase();
	if (!query) return 1;
	const name = value.toLowerCase();
	if (name.split(' ').some((word) => word.startsWith(query))) return 1;
	if (name.includes(query)) return 0.8;
	if (keywords.some((keyword) => keyword.toLowerCase().includes(query))) return 0.5;
	return 0;
}

export function CommandMenu({ projects }: { projects: ProjectSummary[] }) {
	const router = useRouter();
	const { open, setOpen } = useCommandMenu();
	const { resolvedTheme, setTheme } = useTheme();

	function run(action: () => void) {
		setOpen(false);
		action();
	}

	const openExternal = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			title="Command menu"
			description="Search pages, projects and links, then press Enter to open one."
			className="sm:max-w-lg"
		>
			{/* This shadcn version leaves the cmdk root to the caller. */}
			<Command filter={filter}>
				<CommandInput placeholder="Search pages, projects, links…" />
				<CommandList>
					<CommandEmpty>No results.</CommandEmpty>

					<CommandGroup heading="Pages">
						{pages.map((link) => (
							<CommandItem
								key={link.path}
								value={`page ${link.label}`}
								keywords={[link.description]}
								onSelect={() => run(() => router.push(link.path))}
							>
								<FileText aria-hidden="true" />
								<span>{link.label}</span>
								<span className="truncate text-xs text-muted-foreground">{link.description}</span>
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Projects">
						{projects.map((project) => (
							<CommandItem
								key={project.slug}
								value={`project ${project.name}`}
								keywords={[project.slug, project.tagline]}
								onSelect={() => run(() => router.push(`/projects/${project.slug}`))}
							>
								<Folder aria-hidden="true" />
								<span>{project.name}</span>
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Links">
						{socials.map((social) => (
							<CommandItem
								key={social.id}
								value={`link ${social.label}`}
								keywords={social.handle ? [social.handle] : []}
								onSelect={() => run(() => openExternal(social.href))}
							>
								<SocialIcon id={social.id} />
								<span>{social.label}</span>
								{social.handle && (
									<span className="text-xs text-muted-foreground">{social.handle}</span>
								)}
							</CommandItem>
						))}
					</CommandGroup>

					<CommandGroup heading="Actions">
						<CommandItem
							value="action toggle theme"
							keywords={['dark', 'light', 'mode']}
							onSelect={() => run(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}
						>
							<SunMoon aria-hidden="true" />
							<span>Toggle light/dark theme</span>
						</CommandItem>
						<CommandItem
							value="action rss feed"
							keywords={['subscribe', 'blog']}
							onSelect={() => run(() => openExternal('/rss.xml'))}
						>
							<Rss aria-hidden="true" />
							<span>Open the RSS feed</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}
