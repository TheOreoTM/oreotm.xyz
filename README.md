# oreotm.xyz

Source for [oreotm.xyz](https://oreotm.xyz), my portfolio and blog. It's a SvelteKit site with a
working terminal on the home page, project case studies, and a Ctrl/⌘ K command menu.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) 2 with Svelte 5, self-hosted on a VPS with Docker (`Dockerfile`, Node adapter)
- Tailwind CSS 4 with light and dark themes driven by CSS variables (`src/app.css`)
- [mdsvex](https://github.com/pngwn/MDsveX) for Markdown content, with [Shiki](https://shiki.style) syntax highlighting
- [Bits UI](https://bits-ui.com) for the command menu, and [unplugin-icons](https://github.com/unplugin/unplugin-icons) for Lucide and Simple Icons
- Playwright for end-to-end tests

## Getting started

You need Node 26 (see `engines` in `package.json`) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `pnpm dev`      | Start the dev server                          |
| `pnpm build`    | Build for production (Node adapter, `build/`) |
| `pnpm preview`  | Serve the production build locally            |
| `pnpm check`    | Type-check with svelte-check                  |
| `pnpm lint`     | Check formatting with Prettier                |
| `pnpm test:e2e` | Build, serve and run the Playwright tests     |

## Writing content

**Projects** live in `src/content/projects/*.md`. The frontmatter holds the card data and the body
is the case study:

```yaml
---
name: Cardinal Bot
tagline: A feature-rich general purpose Discord bot.
summary: One or two sentences for cards and link previews.
year: '2023–2024'
order: 2 # lower comes first
featured: true # also shown on the home page
image: /cardinal.webp
imageAlt: Cardinal Bot avatar
stack: [TypeScript, discord.js]
links:
  - label: Source on GitHub
    href: https://github.com/TheOreoTM/cardinal-bot
---
```

Quote any value that contains `: ` or ` #`, or YAML will cut it short. Case studies can import
Svelte components, like the pipeline diagram in `frieren-rag.md`.

**Blog posts** live in `src/posts/*.md` with `title`, `description`, `date`, `categories` and
`published` in the frontmatter. Only published posts are listed, and they also appear in
`/rss.xml` and `/sitemap.xml`.

## Where things are

```
src/
  app.css              colour tokens, prose and code styles
  lib/site.ts          name, links, socials and toolbox shared across the site
  lib/components/      Header, Terminal, CommandPalette, ProjectRow, …
  lib/server/          project and post metadata (server only)
  content/projects/    case studies
  posts/               blog posts
  routes/              pages, plus rss.xml and sitemap.xml
tests/                 Playwright tests
```
