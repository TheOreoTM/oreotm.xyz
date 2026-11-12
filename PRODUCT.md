# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, confirmed by the owner (2026-11-12) as equal:

- **Developers**: peers and community members, many of whom know the Discord bots. They read the case studies and the blog to see how things were built.
- **Clients**: people who want a Discord bot, website or backend built. They are deciding whether to message OreoTM about a project.

## Product Purpose

oreotm.xyz is the portfolio and blog of OreoTM (@theoreotm), a full-stack developer based in the Maldives who builds Discord bots, websites and the backends behind them. It shows what has been built and how, and gives a way to get in touch. Success is a developer reading a case study or post, or a client sending a message.

## Positioning

The work is backend-heavy: bots that look after servers, the APIs, databases and job queues behind them, and the websites on top. The site itself is evidence of that: it has a working terminal and a command menu, not only pages.

## Operating Context

- Visitors arrive from Discord profiles, GitHub and links shared in servers, on desktop and phone.
- Contact happens off-site: Discord direct message first, GitHub second. There is no contact form and no email address on the site.
- The site is self-hosted on a VPS from a Dockerfile; `main` is what is deployed.

## Capabilities and Constraints

- Pages: home, projects index, project case studies, blog index with tag filter, blog posts, contact, 404.
- Content is MDX in `content/projects` and `content/posts`, with frontmatter described in `src/lib/types.ts`. Four projects (Frieren TCG Wiki, Cardinal Bot, Frieren RAG, Gir Bot) and one post exist.
- A terminal on the home page runs real commands (navigation, project lookup, theme, tab completion). A command menu opens with Ctrl/⌘ K from any page.
- Light and dark themes, following the system by default, with a toggle.
- RSS feed, sitemap, per-page Open Graph images.
- Stack: Next.js 16 (App Router, cache components), React 19, Tailwind CSS 4, shadcn/ui primitives, next-themes, next-mdx-remote with Shiki. Node 26, pnpm. CI runs lint, types, format and Playwright.
- Undecided: none recorded.

## Brand Commitments

- Name "OreoTM", handle `@theoreotm`, wordmark `❯ oreotm` in monospace.
- Owner's instruction for the 2026-11 overhaul: keep the current style (near-black and warm off-white themes, lime accent, monospace details, the terminal) and take inspiration from Linear and award-winning sites; keep every page consistent; make the site more interactive; free rein otherwise.
- Voice: first person, plain, a little self-deprecating ("Things I've built, shipped, and occasionally abandoned.").

## Evidence on Hand

- Real: the four case studies and their stacks and links, one blog post, the avatar (`public/discord-pfp.png`), project images in `public/`, social links in `src/lib/site.ts`.
- Absent, and not to be invented: testimonials, client names, user or server counts, uptime or performance figures, pricing, availability status.

## Product Principles

1. The work is the proof: case studies and working things on the page, not claims.
2. The site should behave like something a backend developer built: fast, keyboard-friendly, with real interaction.
3. One consistent system across every page; no page is a special case.
4. Developers and clients are both served; neither is talked down to.

## Accessibility & Inclusion

Keyboard operable throughout, visible focus, reduced motion respected, readable in both themes. The existing Playwright suite checks every page for errors and sideways scrolling on desktop and phone.
