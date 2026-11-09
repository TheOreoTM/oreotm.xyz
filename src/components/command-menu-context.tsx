'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type CommandMenuState = { open: boolean; setOpen: (open: boolean) => void };

const CommandMenuContext = createContext<CommandMenuState | null>(null);

/** Shares the command menu's open state with the header button, the terminal and Ctrl/⌘ K. */
export function CommandMenuProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		function onKeydown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				setOpen((current) => !current);
			}
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	}, []);

	return <CommandMenuContext value={{ open, setOpen }}>{children}</CommandMenuContext>;
}

export function useCommandMenu() {
	const context = useContext(CommandMenuContext);
	if (!context) throw new Error('useCommandMenu must be used inside <CommandMenuProvider>');
	return context;
}
