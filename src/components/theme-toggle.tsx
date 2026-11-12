'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon-lg"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			aria-label="Toggle light and dark theme"
			title="Toggle theme"
			className="text-muted-foreground"
		>
			{/* Both icons render; CSS shows the right one, so there's no hydration mismatch. */}
			<Sun className="hidden dark:block" aria-hidden="true" />
			<Moon className="dark:hidden" aria-hidden="true" />
		</Button>
	);
}
