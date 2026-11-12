'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * The work, as a list you operate. Each row is a link to its case study. Pointing at a row or
 * moving to it with the keyboard selects it, and the pane beside the list previews the
 * selected project: its image, what it is, what it is built with and where to go.
 *
 * Up/Down or J/K move between rows, Home/End jump to the ends, Enter opens the case study
 * (it is a link, so that needs no code). Below `lg` there is no pane: the rows carry the
 * tagline and stack themselves and a tap opens the case study.
 */
export function Work({ projects }: { projects: Project[] }) {
	const [selected, setSelected] = useState(0);
	const list = useRef<HTMLUListElement>(null);
	const project = projects[selected] ?? projects[0];

	function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
		if (event.metaKey || event.ctrlKey || event.altKey) return;
		const last = projects.length - 1;
		const next =
			event.key === 'ArrowDown' || event.key === 'j'
				? Math.min(selected + 1, last)
				: event.key === 'ArrowUp' || event.key === 'k'
					? Math.max(selected - 1, 0)
					: event.key === 'Home'
						? 0
						: event.key === 'End'
							? last
							: null;
		if (next === null) return;
		event.preventDefault();
		setSelected(next);
		list.current?.querySelectorAll<HTMLAnchorElement>('a[data-row]')[next]?.focus();
	}

	if (!project) return null;

	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-10">
			<div>
				<ul ref={list} onKeyDown={onKeyDown} className="border-t">
					{projects.map((item, index) => {
						const active = index === selected;
						return (
							<li key={item.slug} className="border-b">
								<Link
									data-row
									href={`/projects/${item.slug}`}
									onPointerEnter={() => setSelected(index)}
									onFocus={() => setSelected(index)}
									className={cn(
										'group grid grid-cols-[1rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-1 py-4 transition-colors duration-150 sm:px-3',
										active ? 'lg:bg-foreground/[0.045]' : 'hover:bg-foreground/[0.03]'
									)}
								>
									<span
										className={cn(
											'font-mono text-primary transition-opacity duration-150',
											active ? 'lg:opacity-100' : 'lg:opacity-0'
										)}
										aria-hidden="true"
									>
										❯
									</span>
									<span className="min-w-0">
										<span className="block text-lg font-semibold tracking-tight">{item.name}</span>
										<span className="block text-muted-foreground">{item.tagline}</span>
										<span className="mt-2 block font-mono text-xs text-muted-foreground lg:hidden">
											{item.stack.slice(0, 4).join(', ')}
										</span>
									</span>
									<span className="font-mono text-xs text-muted-foreground tabular-nums">
										{item.year}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
				<p className="mt-3 hidden font-mono text-xs text-faint lg:block" aria-hidden="true">
					<kbd className="rounded border bg-card px-1 py-0.5">↑</kbd>{' '}
					<kbd className="rounded border bg-card px-1 py-0.5">↓</kbd> to move,{' '}
					<kbd className="rounded border bg-card px-1 py-0.5">Enter</kbd> to open
				</p>
			</div>

			{/* The preview follows the selection. Keyed, so each project fades in on its own. */}
			<aside
				aria-label={`Preview of ${project.name}`}
				className="hidden self-start overflow-hidden rounded-[10px] border bg-card lg:block"
			>
				<div key={project.slug} className="animate-in duration-200 ease-out fade-in">
					<Image
						src={project.image}
						alt={project.imageAlt}
						width={672}
						height={378}
						className="aspect-[2/1] w-full border-b bg-muted object-contain"
					/>
					<div className="p-5">
						<p className="text-[0.9375rem] leading-relaxed">{project.summary}</p>
						{project.stack.length > 0 && (
							<p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
								{project.stack.join(', ')}
							</p>
						)}
						<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
							<Link
								href={`/projects/${project.slug}`}
								className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-primary-foreground transition-colors hover:bg-primary/85"
							>
								Read the case study <ArrowRight className="size-4" aria-hidden="true" />
							</Link>
							{project.links.slice(0, 1).map((link) => (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
								>
									{link.label}
									<ArrowUpRight className="size-3.5" aria-hidden="true" />
								</a>
							))}
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
