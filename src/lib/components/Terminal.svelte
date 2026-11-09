<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { localTime, pages, site, socials, toolbox } from '$lib/site';
	import { palette } from '$lib/palette.svelte';
	import { setTheme, toggleTheme } from '$lib/theme';
	import type { ProjectSummary } from '$lib/types';

	let { projects }: { projects: ProjectSummary[] } = $props();

	type Part = { text: string; href?: string; external?: boolean; tone?: 'accent' | 'muted' };
	type Line = { id: number; kind: 'input' | 'output' | 'error'; parts: Part[] };

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

	let lines: Line[] = $state([
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
	]);

	let value = $state('');
	let history: string[] = [];
	let historyIndex = -1;
	let input: HTMLInputElement;
	let output: HTMLDivElement;

	type Command = { usage: string; summary: string; run: (args: string[]) => Line[] | void };

	const pageNames = pages.filter((p) => p.path !== '/').map((p) => p.label);

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

	function navigate(name: string | undefined, verb: string) {
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
		goto(target.path!);
	}

	const commands: Record<string, Command> = {
		help: {
			usage: 'help',
			summary: 'list commands',
			run: () =>
				Object.values(commands).map((c) =>
					line('output', text(c.usage.padEnd(16), 'accent'), text(c.summary, 'muted'))
				)
		},
		whoami: { usage: 'whoami', summary: 'who I am', run: whoami },
		ls: {
			usage: 'ls',
			summary: 'list pages',
			run: () => [
				line(
					'output',
					...pages
						.filter((p) => p.path !== '/')
						.flatMap((p) => [{ text: `${p.label}/`, href: p.path }, text('  ')])
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
						line('output', text(s.label.padEnd(14), 'muted'), {
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
				const next = choice === 'light' || choice === 'dark' ? choice : toggleTheme();
				setTheme(next);
				return [line('output', text(`Switched to the ${next} theme.`, 'muted'))];
			}
		},
		menu: {
			usage: 'menu',
			summary: 'open the command menu (Ctrl/⌘ K)',
			run: () => {
				palette.open = true;
			}
		},
		clear: {
			usage: 'clear',
			summary: 'clear the screen',
			run: () => {
				lines = [];
			}
		}
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

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const raw = value.trim();
		value = '';
		historyIndex = -1;
		if (raw) history = [raw, ...history.filter((h) => h !== raw)].slice(0, 50);

		lines.push(line('input', text(raw)));
		if (raw) {
			const [name, ...args] = raw.split(/\s+/);
			const command = commands[name.toLowerCase()];
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
			if (result) lines.push(...result);
		}

		await tick();
		output.scrollTop = output.scrollHeight;
	}

	function complete() {
		const [name, ...rest] = value.split(' ');
		if (rest.length === 0) {
			const matches = Object.keys(commands).filter((c) => c.startsWith(name.toLowerCase()));
			if (matches.length === 1) value = `${matches[0]} `;
			else if (matches.length > 1) lines.push(line('output', text(matches.join('  '), 'muted')));
			return;
		}
		if (name === 'open' || name === 'cd') {
			const partial = rest.join(' ').toLowerCase();
			const options = [...pageNames, ...projects.map((p) => p.slug)];
			const matches = options.filter((o) => o.startsWith(partial));
			if (matches.length === 1) value = `${name} ${matches[0]}`;
			else if (matches.length > 1) lines.push(line('output', text(matches.join('  '), 'muted')));
		}
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab' && value) {
			event.preventDefault();
			complete();
		} else if (event.key === 'ArrowUp' && history.length) {
			event.preventDefault();
			historyIndex = Math.min(historyIndex + 1, history.length - 1);
			value = history[historyIndex];
		} else if (event.key === 'ArrowDown' && historyIndex >= 0) {
			event.preventDefault();
			historyIndex -= 1;
			value = historyIndex >= 0 ? history[historyIndex] : '';
		} else if (event.key === 'l' && event.ctrlKey) {
			event.preventDefault();
			lines = [];
		}
	}

	function focusInput() {
		// Don't steal the click if the visitor is selecting text.
		if (!window.getSelection()?.toString()) input.focus();
	}

	const toneClass = { accent: 'text-accent', muted: 'text-muted' };
</script>

{#snippet prompt()}
	<span class="shrink-0 select-none" aria-hidden="true">
		<span class="text-accent">❯</span> <span class="text-faint">~</span>
	</span>
{/snippet}

<section
	aria-label="Interactive terminal"
	class="overflow-hidden rounded-xl border bg-surface font-mono text-sm shadow-sm transition-colors focus-within:border-accent"
>
	<div class="flex items-center gap-2 border-b px-4 py-2.5">
		<span class="flex gap-1.5" aria-hidden="true">
			<span class="size-2.5 rounded-full bg-border"></span>
			<span class="size-2.5 rounded-full bg-border"></span>
			<span class="size-2.5 rounded-full bg-border"></span>
		</span>
		<span class="mx-auto pr-10 text-xs text-faint">oreotm@maldives: ~</span>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="p-4" onclick={focusInput}>
		<div
			bind:this={output}
			role="log"
			aria-live="polite"
			class="max-h-72 space-y-1 overflow-y-auto leading-relaxed"
		>
			{#each lines as l (l.id)}
				<p
					class="flex gap-2 break-words whitespace-pre-wrap {l.kind === 'error'
						? 'text-red-600 dark:text-red-400'
						: ''}"
				>
					{#if l.kind === 'input'}{@render prompt()}{/if}
					<span class="min-w-0">
						{#each l.parts as part, i (i)}
							{#if part.href}
								<a
									href={part.href}
									class="underline decoration-accent underline-offset-2 hover:text-accent"
									target={part.external ? '_blank' : undefined}
									rel={part.external ? 'noopener noreferrer' : undefined}>{part.text}</a
								>
							{:else}
								<span class={part.tone ? toneClass[part.tone] : ''}>{part.text}</span>
							{/if}
						{/each}
					</span>
				</p>
			{/each}
		</div>

		<form onsubmit={submit} class="mt-1 flex gap-2">
			{@render prompt()}
			<input
				bind:this={input}
				bind:value
				onkeydown={onKeydown}
				aria-label="Terminal command. Type help for a list of commands."
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
				enterkeyhint="send"
				class="w-full min-w-0 bg-transparent text-base caret-accent outline-none focus-visible:outline-none sm:text-sm"
			/>
		</form>
	</div>
</section>
