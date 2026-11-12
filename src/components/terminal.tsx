'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCommandMenu } from '@/components/command-menu-context';
import { localTime, pages, site, socials, toolbox } from '@/lib/site';
import type { ProjectSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

type Part = { text: string; href?: string; external?: boolean; tone?: 'accent' | 'muted' };
type Line = { id: number; kind: 'input' | 'output' | 'error'; parts: Part[] };
type Command = { usage: string; summary: string; run: (args: string[]) => Line[] | void };

let nextId = 0;
const text = (value: string, tone?: Part['tone']): Part => ({ text: value, tone });
const line = (kind: Line['kind'], ...parts: Part[]): Line => ({ id: nextId++, kind, parts });

const whoami = () => [
	line(
		'output',
		text(`${site.name}, a full-stack developer based in the ${site.location}. `),
		text('I build Discord bots, websites, and the backends behind them.', 'muted')
	)
];

const initialLines = (): Line[] => [
	line('input', text('whoami')),
	...whoami(),
	line(
		'output',
		text('Type ', 'muted'),
		text('help', 'accent'),
		text(' to look around, or try ', 'muted'),
		text('projects', 'accent'),
		text('.', 'muted')
	)
];

const pageNames = pages.filter((p) => p.path !== '/').map((p) => p.label);
const toneClass = { accent: 'text-primary', muted: 'text-muted-foreground' };

function Prompt() {
	return (
		<span className="shrink-0 select-none" aria-hidden="true">
			<span className="text-primary">❯</span> <span className="text-faint">~</span>
		</span>
	);
}

export function Terminal({ projects }: { projects: ProjectSummary[] }) {
	const router = useRouter();
	const { setTheme, resolvedTheme } = useTheme();
	const { setOpen } = useCommandMenu();

	const [lines, setLines] = useState<Line[]>(initialLines);
	const [value, setValue] = useState('');
	const history = useRef<string[]>([]);
	const historyIndex = useRef(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const outputRef = useRef<HTMLDivElement>(null);

	// Keep the newest output in view.
	useEffect(() => {
		const output = outputRef.current;
		if (output) output.scrollTop = output.scrollHeight;
	}, [lines]);

	function findTarget(name: string) {
		const query = name.toLowerCase().replace(/\/$/, '');
		const page = pages.find((p) => p.label === query || p.path === `/${query}`);
		if (page) return { path: page.path };
		if (['~', '/', '..', 'home'].includes(query)) return { path: '/' };
		const slug = query.replace(/^projects\//, '');
		const project =
			projects.find((p) => p.slug === slug) ?? projects.find((p) => p.slug.startsWith(slug));
		if (project) return { path: `/projects/${project.slug}` };
		const social = socials.find((s) => s.id === query || s.label.toLowerCase() === query);
		if (social) return { href: social.href };
		return undefined;
	}

	function navigate(name: string | undefined, verb: string): Line[] | void {
		if (!name) return [line('error', text(`usage: ${verb} <page|project>`))];
		const target = findTarget(name);
		if (!target) {
			return [
				line('error', text(`${verb}: ${name}: no such page or project`)),
				line(
					'output',
					text('Try ', 'muted'),
					text('ls', 'accent'),
					text(' or ', 'muted'),
					text('projects', 'accent')
				)
			];
		}
		if (target.href) {
			window.open(target.href, '_blank', 'noopener,noreferrer');
			return [line('output', text(`Opening ${target.href}`, 'muted'))];
		}
		router.push(target.path!);
	}

	const commands: Record<string, Command> = {
		help: {
			usage: 'help',
			summary: 'list commands',
			run: () =>
				Object.values(commands).map((c) =>
					line('output', text(c.usage.padEnd(20), 'accent'), text(c.summary, 'muted'))
				)
		},
		whoami: { usage: 'whoami', summary: 'who I am', run: whoami },
		ls: {
			usage: 'ls',
			summary: 'list pages',
			run: () => [
				line(
					'output',
					...pageNames.flatMap((label) => [{ text: `${label}/`, href: `/${label}` }, text('  ')])
				)
			]
		},
		projects: {
			usage: 'projects',
			summary: 'list my projects',
			run: () =>
				projects.map((p) =>
					line(
						'output',
						{ text: p.slug, href: `/projects/${p.slug}` },
						text(' '.repeat(Math.max(2, 18 - p.slug.length))),
						text(p.tagline, 'muted')
					)
				)
		},
		open: {
			usage: 'open <name>',
			summary: 'open a page, project or link',
			run: ([name]) => navigate(name, 'open')
		},
		cd: {
			usage: 'cd <page>',
			summary: 'go to a page',
			run: ([name]) => navigate(name ?? '~', 'cd')
		},
		contact: {
			usage: 'contact',
			summary: 'ways to reach me',
			run: () =>
				socials
					.filter((s) => s.contact)
					.map((s) =>
						line('output', text(s.label.padEnd(10), 'muted'), {
							text: s.handle ?? s.href,
							href: s.href,
							external: true
						})
					)
		},
		stack: {
			usage: 'stack',
			summary: 'tools I use',
			run: () =>
				toolbox.map((g) =>
					line('output', text(g.group.padEnd(16), 'muted'), text(g.items.join(', ')))
				)
		},
		time: {
			usage: 'time',
			summary: 'my local time',
			run: () => [
				line('output', text(`It's ${localTime()} in the ${site.location} (${site.utcOffset}).`))
			]
		},
		theme: {
			usage: 'theme [light|dark]',
			summary: 'switch colour theme',
			run: ([choice]) => {
				const next =
					choice === 'light' || choice === 'dark'
						? choice
						: resolvedTheme === 'dark'
							? 'light'
							: 'dark';
				setTheme(next);
				return [line('output', text(`Switched to the ${next} theme.`, 'muted'))];
			}
		},
		menu: {
			usage: 'menu',
			summary: 'open the command menu (Ctrl/⌘ K)',
			run: () => setOpen(true)
		},
		clear: { usage: 'clear', summary: 'clear the screen', run: () => setLines([]) }
	};

	// Easter eggs: not listed in help.
	const extras: Record<string, (args: string[]) => Line[]> = {
		sudo: () => [line('error', text('Nice try.'))],
		echo: (args) => [line('output', text(args.join(' ')))],
		exit: () => [
			line('output', text('There is no exit. Try ', 'muted'), text('cd projects', 'accent'))
		],
		pwd: () => [line('output', text('/home/oreotm'))]
	};

	function submit(event: FormEvent) {
		event.preventDefault();
		const raw = value.trim();
		setValue('');
		historyIndex.current = -1;
		if (raw) history.current = [raw, ...history.current.filter((h) => h !== raw)].slice(0, 50);

		const echo = line('input', text(raw));
		if (!raw) return setLines((current) => [...current, echo]);

		const [name, ...args] = raw.split(/\s+/);
		const command = commands[name.toLowerCase()];
		if (command?.usage === 'clear') return setLines([]);

		const result = command
			? command.run(args)
			: (extras[name.toLowerCase()]?.(args) ?? [
					line('error', text(`command not found: ${name}`)),
					line(
						'output',
						text('Type ', 'muted'),
						text('help', 'accent'),
						text(' to see what you can do.', 'muted')
					)
				]);
		setLines((current) => [...current, echo, ...(result ?? [])]);
	}

	function complete() {
		const [name, ...rest] = value.split(' ');
		const show = (matches: string[]) =>
			setLines((current) => [...current, line('output', text(matches.join('  '), 'muted'))]);

		if (rest.length === 0) {
			const matches = Object.keys(commands).filter((c) => c.startsWith(name.toLowerCase()));
			if (matches.length === 1) setValue(`${matches[0]} `);
			else if (matches.length > 1) show(matches);
			return;
		}
		if (name === 'open' || name === 'cd') {
			const partial = rest.join(' ').toLowerCase();
			const options = [...pageNames, ...projects.map((p) => p.slug)];
			const matches = options.filter((o) => o.startsWith(partial));
			if (matches.length === 1) setValue(`${name} ${matches[0]}`);
			else if (matches.length > 1) show(matches);
		}
	}

	function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		const past = history.current;
		if (event.key === 'Tab' && value) {
			event.preventDefault();
			complete();
		} else if (event.key === 'ArrowUp' && past.length) {
			event.preventDefault();
			historyIndex.current = Math.min(historyIndex.current + 1, past.length - 1);
			setValue(past[historyIndex.current]);
		} else if (event.key === 'ArrowDown' && historyIndex.current >= 0) {
			event.preventDefault();
			historyIndex.current -= 1;
			setValue(historyIndex.current >= 0 ? past[historyIndex.current] : '');
		} else if (event.key === 'l' && event.ctrlKey) {
			event.preventDefault();
			setLines([]);
		}
	}

	function focusInput() {
		// Don't steal the click if the visitor is selecting text.
		if (!window.getSelection()?.toString()) inputRef.current?.focus();
	}

	return (
		<section
			aria-label="Interactive terminal"
			className="overflow-hidden rounded-[10px] border bg-card font-mono text-sm transition-colors focus-within:border-primary"
		>
			<div className="flex items-center gap-2 border-b px-4 py-2.5">
				<span className="flex gap-1.5" aria-hidden="true">
					<span className="size-2.5 rounded-full bg-border" />
					<span className="size-2.5 rounded-full bg-border" />
					<span className="size-2.5 rounded-full bg-border" />
				</span>
				<span className="mx-auto pr-10 text-xs text-faint">oreotm@maldives: ~</span>
			</div>

			{/* Clicking anywhere in the window focuses the input; the input is focusable on its own. */}
			<div className="p-4" onClick={focusInput}>
				<div
					ref={outputRef}
					role="log"
					aria-live="polite"
					className="max-h-72 space-y-1 overflow-y-auto leading-relaxed"
				>
					{lines.map((l) => (
						<p
							key={l.id}
							className={cn(
								'flex gap-2 break-words whitespace-pre-wrap',
								l.kind === 'error' && 'text-red-600 dark:text-red-400'
							)}
						>
							{l.kind === 'input' && <Prompt />}
							<span className="min-w-0">
								{l.parts.map((part, i) =>
									part.href && part.external ? (
										<a
											key={i}
											href={part.href}
											target="_blank"
											rel="noopener noreferrer"
											className="underline decoration-primary underline-offset-2 hover:text-primary"
										>
											{part.text}
										</a>
									) : part.href ? (
										<Link
											key={i}
											href={part.href}
											className="underline decoration-primary underline-offset-2 hover:text-primary"
										>
											{part.text}
										</Link>
									) : (
										<span key={i} className={part.tone ? toneClass[part.tone] : undefined}>
											{part.text}
										</span>
									)
								)}
							</span>
						</p>
					))}
				</div>

				<form onSubmit={submit} className="mt-1 flex gap-2">
					<Prompt />
					<input
						ref={inputRef}
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onKeyDown={onKeyDown}
						aria-label="Terminal command. Type help for a list of commands."
						autoComplete="off"
						autoCapitalize="off"
						spellCheck={false}
						enterKeyHint="send"
						className="w-full min-w-0 bg-transparent text-base caret-primary outline-none focus-visible:outline-none sm:text-sm"
					/>
				</form>
			</div>
		</section>
	);
}
