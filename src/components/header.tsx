'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { Search } from 'lucide-react';
import { useCommandMenu } from '@/components/command-menu-context';
import { LocalTime } from '@/components/local-time';
import { SocialIcon } from '@/components/social-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { pages, site, socials } from '@/lib/site';
import { cn } from '@/lib/utils';

const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

const isActive = (pathname: string, path: string) =>
	path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

function Wordmark() {
	return (
		<Link href="/" className="font-mono font-semibold tracking-tight">
			<span className="text-primary" aria-hidden="true">
				❯
			</span>{' '}
			oreotm
		</Link>
	);
}

/**
 * The site's navigation. From `lg` up it is a rail fixed to the left edge, the way an app's
 * sidebar is: the wordmark and where you are, the four destinations, and at its foot the
 * command menu, the place and its local time, the theme and the social links. Below `lg` it
 * is a bar across the top.
 */
export function Header() {
	const pathname = usePathname();
	const { setOpen } = useCommandMenu();
	// "Ctrl K" on the server and non-Apple devices, "⌘K" on Apple ones.
	const shortcut = useSyncExternalStore(
		() => () => {},
		() => (isMac() ? '⌘K' : 'Ctrl K'),
		() => 'Ctrl K'
	);

	const search = (className: string, label: boolean) => (
		<button
			type="button"
			onClick={() => setOpen(true)}
			className={cn(
				'flex h-9 items-center gap-2 rounded-md font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
				className
			)}
			aria-label="Open command menu"
			aria-keyshortcuts="Control+K Meta+K"
		>
			<Search className="size-4" aria-hidden="true" />
			{label && (
				<>
					<span>Search</span>
					<kbd className="ml-auto rounded border bg-card px-1.5 py-0.5 font-mono">{shortcut}</kbd>
				</>
			)}
		</button>
	);

	return (
		<>
			{/* The rail. */}
			<header className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r px-5 py-6 lg:flex">
				<Wordmark />
				<p className="mt-1 truncate font-mono text-xs text-faint" title={`~${pathname}`}>
					~{pathname === '/' ? '' : pathname}
				</p>

				<nav aria-label="Main" className="-mx-2 mt-10">
					<ul className="space-y-0.5">
						{pages.map((link) => {
							const active = isActive(pathname, link.path);
							return (
								<li key={link.path}>
									<Link
										href={link.path}
										aria-current={active ? 'page' : undefined}
										className={cn(
											'flex h-9 items-center gap-2 rounded-md px-2 text-[0.9375rem] transition-colors hover:bg-muted',
											active ? 'font-medium text-foreground' : 'text-muted-foreground'
										)}
									>
										<span
											className={cn('font-mono text-primary', !active && 'invisible')}
											aria-hidden="true"
										>
											/
										</span>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="mt-auto space-y-4">
					{search('-mx-2 w-[calc(100%+1rem)] border px-2.5', true)}
					<p className="font-mono text-xs leading-relaxed text-muted-foreground">
						{site.location}, {site.utcOffset}
						<br />
						<LocalTime className="text-foreground" /> local time
					</p>
					<div className="-mx-2 flex items-center justify-between">
						<ul className="flex" aria-label="Social links">
							{socials.map((social) => (
								<li key={social.id}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										aria-label={social.label}
										title={social.label}
									>
										<SocialIcon id={social.id} />
									</a>
								</li>
							))}
						</ul>
						<ThemeToggle />
					</div>
				</div>
			</header>

			{/* The bar, on screens too narrow for a rail. Its ground is a hair short of opaque on
			    purpose: over a fully opaque bar, Chromium's software compositor was seen to drop
			    the bottom strip of the fixed canvas behind it. */}
			<header className="sticky top-0 z-40 border-b bg-background/[0.98] lg:hidden">
				<div className="flex h-14 items-center justify-between gap-4 px-4">
					<Wordmark />
					<div className="flex items-center gap-1">
						{search('px-2.5', false)}
						<ThemeToggle />
					</div>
				</div>
				<nav aria-label="Main" className="border-t px-4 font-mono text-sm">
					<ul className="flex items-center gap-5 overflow-x-auto py-2.5">
						{pages.map((link) => {
							const active = isActive(pathname, link.path);
							return (
								<li key={link.path}>
									<Link
										href={link.path}
										aria-current={active ? 'page' : undefined}
										className={cn(
											'transition-colors hover:text-foreground',
											active ? 'text-foreground' : 'text-muted-foreground'
										)}
									>
										<span className={cn('text-primary', !active && 'invisible')} aria-hidden="true">
											/
										</span>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</header>
		</>
	);
}
