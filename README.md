# oreotm.xyz

Source for [oreotm.xyz](https://oreotm.xyz), my portfolio and blog. It's a Next.js app with a
working terminal on the home page, project case studies, and a Ctrl/⌘ K command menu.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Cache Components), React 19, TypeScript,
  self-hosted on a VPS with Docker (`Dockerfile`, standalone output)
- [Tailwind CSS](https://tailwindcss.com) 4 and [shadcn/ui](https://ui.shadcn.com) (Radix), themed with
  CSS variables in `src/app/globals.css`; light and dark mode via [next-themes](https://github.com/pacocoursey/next-themes)
- MDX content rendered with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) and
  highlighted with [Shiki](https://shiki.style)
- [cmdk](https://cmdk.paco.me) command menu, [Lucide](https://lucide.dev) and
  [Simple Icons](https://simpleicons.org) icons
- Link-preview images generated with `next/og`; Vercel Analytics and Speed Insights
- Playwright end-to-end tests

## Getting started

You need Node 26 (see `engines` in `package.json`) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | Start the dev server                            |
| `pnpm build`     | Build for production                            |
| `pnpm start`     | Serve the production build                      |
| `pnpm lint`      | Lint with ESLint                                |
| `pnpm typecheck` | Generate route types and type-check             |
| `pnpm format`    | Format with Prettier (`format:check` to verify) |
| `pnpm test:e2e`  | Build, serve and run the Playwright tests       |

Add shadcn components with `pnpm dlx shadcn@latest add <component>`; they land in
`src/components/ui`.

## Writing content

**Projects** live in `content/projects/*.mdx`. The frontmatter holds the list data and the body is
the case study:

```yaml
---
name: Cardinal Bot
tagline: A feature-rich general purpose Discord bot.
summary: One or two sentences for lists and link previews.
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

Quote any value that contains `: ` or ` #`, or YAML will cut it short. MDX treats `{` and `<` as
code, so keep them inside backticks or code blocks. Case studies can use the components listed in
`src/components/mdx-content.tsx`, such as `<RagPipeline />`.

**Blog posts** live in `content/posts/*.mdx` with `title`, `description`, `date`, `categories` and
`published` in the frontmatter. Only published posts are listed, and they also appear in
`/rss.xml` and `/sitemap.xml`.

Pages are prerendered from these files at build time, so a new deploy picks up content changes.

## Where things are

```
content/               projects and posts (MDX)
data/                  data for the work-in-progress minigame
src/app/               routes, plus rss.xml, sitemap, robots and preview images
src/components/        header, terminal, command menu, project rows, …
src/components/ui/     shadcn/ui components
src/lib/content.ts     reads and caches content (server only)
src/lib/site.ts        name, links, socials and toolbox shared across the site
tests/                 Playwright tests
```
