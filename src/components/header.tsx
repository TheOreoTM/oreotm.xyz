'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { Search } from 'lucide-react';
import { useCommandMenu } from '@/components/command-menu-context';
import { ThemeToggle } from '@/components/theme-toggle';
import { pages } from '@/lib/site';
import { cn } from '@/lib/utils';

// The logo already links home, so the nav lists the other pages.
const links = pages.filter((link) => link.path !== '/');

const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

function NavLinks({ pathname }: { pathname: string }) {
	return links.map((link) => {
		const active = pathname === link.path || pathname.startsWith(`${link.path}/`);
		return (
			<Link
				key={link.path}
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
		);
	});
}

export function Header() {
	const pathname = usePathname();
	const { setOpen } = useCommandMenu();
	// "Ctrl K" on the server and non-Apple devices, "⌘K" on Apple ones.
	const shortcut = useSyncExternalStore(
		() => () => {},
		() => (isMac() ? '⌘K' : 'Ctrl K'),
		() => 'Ctrl K'
	);

	return (
		<header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
				<Link href="/" className="font-mono font-semibold tracking-tight">
					<span className="text-primary" aria-hidden="true">
						❯
					</span>{' '}
					oreotm
				</Link>

				<nav aria-label="Main" className="hidden items-center gap-6 font-mono text-sm sm:flex">
					<NavLinks pathname={pathname} />
				</nav>

				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex h-9 items-center gap-2 rounded-md px-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:border sm:px-3"
						aria-label="Open command menu"
						aria-keyshortcuts="Control+K Meta+K"
					>
						<Search className="size-4" aria-hidden="true" />
						<span className="hidden sm:inline">Search</span>
						<kbd className="hidden rounded border bg-card px-1.5 py-0.5 font-mono sm:inline">
							{shortcut}
						</kbd>
					</button>
					<ThemeToggle />
				</div>
			</div>

			<nav
				aria-label="Main"
				className="flex items-center justify-center gap-6 border-t py-2 font-mono text-sm sm:hidden"
			>
				<NavLinks pathname={pathname} />
			</nav>
		</header>
	);
}
