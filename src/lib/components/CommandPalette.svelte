<script lang="ts">
	import { Command, Dialog } from 'bits-ui';
	import { goto } from '$app/navigation';
	import { palette } from '$lib/palette.svelte';
	import { pages, socials } from '$lib/site';
	import { toggleTheme } from '$lib/theme';
	import type { ProjectSummary } from '$lib/types';
	import SocialIcon from './SocialIcon.svelte';
	import IconSearch from '~icons/lucide/search';
	import IconFile from '~icons/lucide/file-text';
	import IconFolder from '~icons/lucide/folder';
	import IconTheme from '~icons/lucide/sun-moon';
	import IconRss from '~icons/lucide/rss';

	let { projects }: { projects: ProjectSummary[] } = $props();

	function run(action: () => void) {
		palette.open = false;
		action();
	}

	function openExternal(href: string) {
		window.open(href, '_blank', 'noopener,noreferrer');
	}

	function onKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			palette.open = !palette.open;
		}
	}

	const item =
		'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-muted outline-none data-selected:bg-surface-2 data-selected:text-fg';
	const heading = 'px-3 pt-3 pb-1 font-mono text-xs text-faint';
</script>

<svelte:window onkeydown={onKeydown} />

<Dialog.Root bind:open={palette.open}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
		<Dialog.Content
			class="fixed top-[12vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-surface shadow-2xl"
		>
			<Dialog.Title class="sr-only">Command menu</Dialog.Title>
			<Dialog.Description class="sr-only">
				Search pages, projects and links, then press Enter to open one.
			</Dialog.Description>
			<Command.Root>
				<div class="flex items-center gap-3 border-b px-4">
					<IconSearch class="size-4 shrink-0 text-faint" aria-hidden="true" />
					<Command.Input
						class="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-faint focus-visible:outline-none"
						placeholder="Search pages, projects, links…"
					/>
				</div>
				<Command.List class="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
					<Command.Viewport>
						<Command.Empty class="px-3 py-8 text-center text-sm text-muted">
							No results.
						</Command.Empty>

						<Command.Group>
							<Command.GroupHeading class={heading}>Pages</Command.GroupHeading>
							<Command.GroupItems>
								{#each pages as link (link.path)}
									<Command.Item
										value="page {link.label}"
										keywords={[link.description]}
										onSelect={() => run(() => goto(link.path))}
										class={item}
									>
										<IconFile class="size-4 shrink-0" aria-hidden="true" />
										<span class="text-fg">{link.label}</span>
										<span class="truncate text-xs text-faint">{link.description}</span>
									</Command.Item>
								{/each}
							</Command.GroupItems>
						</Command.Group>

						<Command.Group>
							<Command.GroupHeading class={heading}>Projects</Command.GroupHeading>
							<Command.GroupItems>
								{#each projects as project (project.slug)}
									<Command.Item
										value="project {project.name}"
										keywords={[project.slug, project.tagline]}
										onSelect={() => run(() => goto(`/projects/${project.slug}`))}
										class={item}
									>
										<IconFolder class="size-4 shrink-0" aria-hidden="true" />
										<span class="text-fg">{project.name}</span>
									</Command.Item>
								{/each}
							</Command.GroupItems>
						</Command.Group>

						<Command.Group>
							<Command.GroupHeading class={heading}>Links</Command.GroupHeading>
							<Command.GroupItems>
								{#each socials as social (social.id)}
									<Command.Item
										value="link {social.label}"
										keywords={[social.handle ?? '']}
										onSelect={() => run(() => openExternal(social.href))}
										class={item}
									>
										<SocialIcon id={social.id} class="size-4 shrink-0" />
										<span class="text-fg">{social.label}</span>
										{#if social.handle}<span class="text-xs text-faint">{social.handle}</span>{/if}
									</Command.Item>
								{/each}
							</Command.GroupItems>
						</Command.Group>

						<Command.Group>
							<Command.GroupHeading class={heading}>Actions</Command.GroupHeading>
							<Command.GroupItems>
								<Command.Item
									value="action toggle theme"
									keywords={['dark', 'light', 'mode']}
									onSelect={() => run(toggleTheme)}
									class={item}
								>
									<IconTheme class="size-4 shrink-0" aria-hidden="true" />
									<span class="text-fg">Toggle light/dark theme</span>
								</Command.Item>
								<Command.Item
									value="action rss feed"
									keywords={['subscribe', 'blog']}
									onSelect={() => run(() => openExternal('/rss.xml'))}
									class={item}
								>
									<IconRss class="size-4 shrink-0" aria-hidden="true" />
									<span class="text-fg">Open the RSS feed</span>
								</Command.Item>
							</Command.GroupItems>
						</Command.Group>
					</Command.Viewport>
				</Command.List>
				<div
					class="flex items-center justify-between border-t px-4 py-2 font-mono text-xs text-faint"
				>
					<span>↑↓ to move · ↵ to open</span>
					<span>esc to close</span>
				</div>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
