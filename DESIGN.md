---
name: oreotm.xyz
description: The portfolio and blog of OreoTM, laid out and operated like a workspace on a slow marbled ground.
colors:
  background: '#f6f5f1'
  foreground: '#18181b'
  card: '#ffffff'
  primary: '#4d7c0f'
  primary-foreground: '#ffffff'
  muted: '#eeece6'
  muted-foreground: '#57564f'
  border: '#e0ddd5'
  faint: '#8a877f'
  destructive: '#b91c1c'
  background-dark: '#0c0c0d'
  foreground-dark: '#ececec'
  card-dark: '#141416'
  primary-dark: '#a3e635'
  primary-foreground-dark: '#0c0c0d'
  muted-dark: '#1c1c1f'
  muted-foreground-dark: '#a3a3a8'
  border-dark: '#27272b'
  faint-dark: '#6b6b71'
  destructive-dark: '#f87171'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '3.75rem'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.035em'
    fontFeature: '"cv11", "ss03", "calt"'
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '3rem'
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: '-0.03em'
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: '-0.02em'
  row-title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.556
    letterSpacing: '-0.025em'
  lead:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"cv11", "ss03", "calt"'
  nav:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
  button:
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 500
  wordmark:
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '1rem'
    fontWeight: 600
    letterSpacing: '-0.025em'
  terminal:
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.429
  label:
    fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.333
rounded:
  key: '0.25rem'
  control: '0.5rem'
  frame: '0.625rem'
  full: '9999px'
spacing:
  rail: '15rem'
  content-max: '68rem'
  page-x: '1.25rem'
  page-x-sm: '2rem'
  page-x-lg: '3rem'
  page-top: '2.5rem'
  page-top-lg: '5rem'
  section: '6rem'
  section-lg: '7rem'
  heading-gap: '1.5rem'
  row-y: '1rem'
  row-y-loose: '1.25rem'
  row-x: '0.25rem'
  row-x-sm: '0.75rem'
  frame-pad: '1.25rem'
  terminal-pad: '1rem'
  control-h: '2.25rem'
  action-h: '2.75rem'
components:
  rail:
    textColor: '{colors.foreground}'
    width: '{spacing.rail}'
    padding: '1.5rem 1.25rem'
  rail-link:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.nav}'
    rounded: '{rounded.control}'
    height: '{spacing.control-h}'
    padding: '0 0.5rem'
  rail-link-hover:
    backgroundColor: '{colors.muted}'
  rail-link-current:
    textColor: '{colors.foreground}'
  mobile-bar:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    height: '3.5rem'
    padding: '0 1rem'
  work-row:
    textColor: '{colors.foreground}'
    typography: '{typography.row-title}'
    padding: '1rem 0.75rem'
  preview-pane:
    backgroundColor: '{colors.card}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.frame}'
    padding: '{spacing.frame-pad}'
  terminal:
    backgroundColor: '{colors.card}'
    textColor: '{colors.foreground}'
    typography: '{typography.terminal}'
    rounded: '{rounded.frame}'
    padding: '{spacing.terminal-pad}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.button}'
    rounded: '{rounded.frame}'
    height: '{spacing.action-h}'
    padding: '0 1rem'
  button-outline:
    backgroundColor: '{colors.card}'
    textColor: '{colors.foreground}'
    typography: '{typography.button}'
    rounded: '{rounded.frame}'
    height: '{spacing.action-h}'
    padding: '0 1rem'
  button-ghost:
    textColor: '{colors.muted-foreground}'
    rounded: '{rounded.frame}'
    size: '{spacing.control-h}'
  button-ghost-hover:
    backgroundColor: '{colors.muted}'
    textColor: '{colors.foreground}'
  pane-action:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    height: '{spacing.control-h}'
    padding: '0 0.75rem'
  tag:
    backgroundColor: '{colors.card}'
    textColor: '{colors.muted-foreground}'
    typography: '{typography.mono}'
    rounded: '{rounded.control}'
    padding: '0.25rem 0.625rem'
  tag-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
  key:
    backgroundColor: '{colors.card}'
    textColor: '{colors.faint}'
    typography: '{typography.label}'
    rounded: '{rounded.key}'
    padding: '0.125rem 0.25rem'
  section-heading:
    textColor: '{colors.foreground}'
    typography: '{typography.title}'
  footer:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.mono}'
    padding: '2rem 0'
---

# Design System: oreotm.xyz

## Overview

**Creative North Star: "The Workspace"**

The site is laid out and operated like the tools its owner builds. A rail sits fixed on the left the way an app's sidebar does, the work is a list you move through with the keyboard, and the terminal on the home page runs real commands. It is a portfolio that behaves like software, so the evidence for "backend developer" is the page itself.

Everything sits on one continuous ground: a slow marbling drawn in WebGL, fixed behind every page and printed in three flat tones taken from the theme's own greys. Content is placed straight onto it and separated by hairlines. There are no cards. Exactly two things have a frame: the terminal and the preview pane beside the work list. There are two themes, a warm off-white and a near-black, and both use the same tokens, the same layout and the same rules. The theme follows the system and can be toggled from the rail, the terminal or the command menu.

The mood is quiet and exact: dense enough to feel like a tool, with large tight headings and small monospace detail. Colour is nearly absent. The one accent is lime (olive-lime on the light theme, bright lime on the dark), and it marks what is live or what can be acted on. Motion is limited to the ground drifting, the pointer's lamp, and short state changes; nothing slides or reveals itself on scroll.

**Key Characteristics:**

- One marbled ground behind every page, in the theme's own greys; no second background anywhere.
- A fixed 15rem rail from 64rem up; a two-row bar below that.
- Rows separated by hairlines in place of cards; lists open with a top rule and close each row with a bottom rule.
- Two framed objects only: the terminal and the preview pane, both on the card colour with a 1px border and a 10px radius.
- One accent. Lime marks the live and the actionable and never fills a surface.
- Inter at tight display settings for reading; JetBrains Mono for the machine's voice.
- Keyboard first: arrow keys or J/K on the work list, Ctrl/⌘ K for the command menu, a visible focus ring everywhere.

## Colors

Two neutral ramps, one warm and one cool, each with a single lime accent. Every colour is a CSS custom property that changes with the theme; the dark value of each token is listed in the front matter with a `-dark` suffix.

### Primary

- **Lime** (`primary`, `primary-dark`): the accent. Olive-lime on the light theme so it holds 4.6:1 on the ground as text; bright lime on the dark theme at 13:1. It draws the `❯` prompt and wordmark glyph, the `/` beside the current page in the rail, the `❯` marker on the selected work row, the caret, the focus ring, text selection, the lamp's contour lines in the marbling, bullets and quote rules in long-form text, and the underline colour of links. As a fill it appears only on the primary action and on a selected tag.
- **On Lime** (`primary-foreground`, `primary-foreground-dark`): text on a lime fill. White on olive-lime (5.0:1), near-black on bright lime (13:1).

### Neutral

- **Ground** (`background`): warm off-white on light, near-black on dark. Painted on `html`, so the marbling canvas sits in front of it and behind the content. Also the mobile bar's fill, at 98% opacity.
- **Ink** (`foreground`): primary text and headings. 16:1 on the ground in both themes.
- **Frame** (`card`): the fill of the two framed objects, and of small bordered controls (outline button, tags, key caps, link chips). White on light, a step above the ground on dark.
- **Muted** (`muted`): hover fill for rail links and ghost buttons, inline code and code block backgrounds, and the quietest tone of the marbling.
- **Quiet Ink** (`muted-foreground`): secondary text: taglines, leads, dates, stack lists, inactive navigation. 6.8:1 on light, 7.8:1 on dark.
- **Hairline** (`border`): every rule, row divider and frame border, the scrollbar thumb, the terminal's three window dots, and the middle tone of the marbling.
- **Faint** (`faint`): decorative text only: the `~/path` under the wordmark, the terminal title bar, the `~` in the prompt, the key hint under the work list. About 3.3:1 on light and 3.7:1 on dark, so it never carries anything a reader needs.
- **Error** (`destructive`): the shadcn error token, used by the destructive button variant and invalid fields. Nothing on the public pages currently triggers it.

### The marbling's tones

The shader takes its colours from the theme at run time, so the ground always matches. Tone one is Muted, tone two is Hairline, and tone three is Hairline mixed 38% towards Faint (which computes to `#bfbcb4` on light and `#414146` on dark). Where the noise is below the first threshold the canvas is transparent and the plain Ground shows through. The contour lines near the pointer are Lime.

### Named Rules

**The Live Lime Rule.** Lime marks what is live or what can be acted on: the prompt, the caret, the selection marker, the current page, focus, a link's underline, the primary action. It is never a background, a heading colour, a tint or decoration.

**The Theme Greys Rule.** The ground, the frames and the marbling use only the theme's neutral tokens. No extra greys, no gradients, no second accent.

**The Faint Rule.** Faint is for text that repeats something stated elsewhere or decorates. If a reader needs it, it is Quiet Ink.

## Typography

**Display and Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif), loaded with `next/font`, with the `cv11`, `ss03` and `calt` features on.
**Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace).

**Character:** Inter set large, semibold and tight for statements, and at ordinary sizes for reading. JetBrains Mono is the machine's voice: the wordmark, the terminal, paths, keys, times, dates, stack names, tags and the small labels around them.

### Hierarchy

- **Display** (600, 3.75rem from 40rem up, line-height 1.02, -0.035em): the page statement, one per page. Below 40rem it is 2.75rem on the home page and 3rem on the projects, blog and contact pages.
- **Headline** (600, 3rem from 40rem up and 2.25rem below, line-height 1.05, -0.03em): case study and post titles, and the closing question on the home page (max 18ch).
- **Title** (600, 1.5rem, -0.02em): section headings ("Selected work", "About"), and the name in the "Next project" link.
- **Row title** (600, 1.125rem, -0.025em): the name on a work row and a post row, and small side headings ("At a glance", "Elsewhere"). Contact rows step up to 1.25rem.
- **Lead** (400, 1.25rem, Quiet Ink): the sentence under a page statement. On the home page it grows to 1.5rem from 40rem up at line-height 1.375, max 34ch.
- **Body** (400, 1rem, line-height 1.5): row taglines and general text. The About paragraphs are 1.125rem; the preview pane's summary is 0.9375rem at line-height 1.625. Long-form text uses the typography plugin's `prose` scale at a 68ch measure.
- **Nav** (400, 0.9375rem; 500 for the current page): rail links.
- **Button** (500, 0.875rem; 1rem on the 2.75rem home page actions).
- **Mono** (400, 0.875rem): the terminal (line-height 1.625), dates, back links, tags, the footer, the mobile nav.
- **Label** (400, 0.75rem mono): stack lists, years, the rail's place and time, key caps, definition labels.
- **Wordmark** (600, 1rem mono, -0.025em): `❯ oreotm`, with the glyph in Lime.

Headings (`h1` to `h3`) use `text-wrap: balance`. Numbers that line up (years, dates, the clock) use tabular figures.

### Named Rules

**The Two Voices Rule.** Inter says things; JetBrains Mono reports them. Mono is for what a machine would print: commands, paths, keys, times, dates, stacks, tags. Sentences are never set in mono outside the terminal.

**The Tight Display Rule.** Anything 2.25rem or larger is semibold with negative tracking (-0.03em to -0.035em) and a line-height of 1.02 to 1.05. Display type is never light, never loose and never uppercase.

## Layout

A fixed rail and one content column.

- **Rail (64rem and up):** fixed to the left edge, 15rem wide, full height, with a hairline on its right edge and no fill, so the marbling runs behind it. Top: the wordmark and the current path. Then the four destinations, 2.25rem tall each. At the foot: the search button with its key cap, the place and local time, the social links and the theme toggle. The content is offset by the rail's width.
- **Bar (below 64rem):** sticky, two rows: a 3.5rem row with the wordmark, search and theme, and a mono row with the four destinations that scrolls sideways if it must. It has the Ground at 98% opacity and a hairline under it.
- **Content column:** max 68rem, centred in the space beside the rail, with gutters of 1.25rem, 2rem from 40rem and 3rem from 64rem. It starts 2.5rem below the top, 5rem from 64rem. `scroll-padding-top` is 5rem.
- **Home, first screen:** from 80rem the statement and the terminal share a row (`1.1fr | 1fr`, 3rem apart, bottom-aligned); below that the terminal sits under the statement, 2.5rem down.
- **Work:** from 64rem the list and the preview pane sit side by side (`1fr | up to 23rem`, 2.5rem apart) and the pane follows the selection. Below 64rem there is no pane: each row carries its own tagline and the first four stack names, and a tap opens the case study.
- **Case study:** prose at up to 68ch beside a 16rem "At a glance" column that sticks 6rem from the top, from 64rem; stacked below that. Blog posts are a single 68ch column.
- **Rhythm:** sections on the home page are 6rem apart (7rem from 64rem). A section heading sits 1.5rem above its content. Rows have 1rem of vertical padding (1.25rem on blog and contact rows, 0.875rem in the toolbox list) and 0.25rem of side padding, 0.75rem from 40rem. The footer sits 7rem below the content, under a hairline, in the same 68rem column.

**The One Column Rule.** Every page uses the same shell, the same 68rem column and the same gutters. No page is full-bleed and no page has its own container.

**The Rail Carries It Rule.** What the rail shows from 64rem up (place, time, social links) is shown in the page or footer below 64rem, never both at once.

## Elevation & Depth

Flat. There are no shadows anywhere on the pages. Depth has three layers and no more: the Ground on `html`; the marbling, fixed in front of it at a negative z-index; and the content, set straight on top. The two framed objects are raised only by their fill and a 1px hairline. The rail has no fill at all. The mobile bar is the one opaque band, because it has to cover what scrolls under it.

The command menu is the only overlay. It is the stock shadcn dialog: a popover-coloured panel with a 1px ring of Ink at 10% opacity over a backdrop of black at 10% with a slight blur, and no shadow.

### The marbling

- **What it is:** a full-viewport canvas, `position: fixed`, behind everything, ignoring the pointer and hidden from assistive technology. A fragment shader folds four-octave noise through itself twice and cuts the result into three flat tones with a fine diagonal hatch and grain at the cuts, so it reads as print and not as a gradient.
- **Strength:** full at the top of the home page, easing to 0.8 over the first 80% of a screen of scrolling; 0.8 on every other page, so text always sits on the quieter version.
- **The lamp:** the pointer is a lamp. It eases after the mouse (160ms time constant), stirs the marbling slightly, draws contour lines in Lime around itself and, where the strength is near full, brightens it. A touch or pen places it where it lands. It comes up over about 400ms, goes out over about 900ms, and starts to go out 2.6 seconds after the pointer rests.
- **Cost:** drawn to a budget of 700,000 pixels at no more than 1.5 device pixels per CSS pixel and scaled up in CSS. 30 frames a second while the lamp is lit, five a second while only the drift is left, none in a hidden tab. The canvas fades in over one second once the first frame is drawn.
- **Fallbacks:** with reduced motion it draws one still frame and redraws only on scroll, resize, theme or page change. Without JavaScript or WebGL, or if the context is lost, the plain Ground remains.

**The Flat Rule.** No shadows, no glows, no blurred panels. A thing is separated from the ground by a hairline or by space.

**The Two Frames Rule.** Only the terminal and the preview pane get a filled, bordered frame. Everything else that looks like it wants a card is a row between hairlines.

## Shapes

Lines and a few soft corners.

- **Hairlines:** 1px in the Hairline colour. Lists start with a top rule and each row ends with a bottom rule; the rail has one on its right edge, the mobile bar and the footer one each.
- **Frames:** 10px radius (`frame`), 1px border, content clipped to the corner. The terminal, the preview pane and the case study's image tile.
- **Controls:** 8px (`control`) on rail links, the search button, tags, link chips and the preview pane's action; 10px on the shadcn buttons and the home page's square social links; 4px (`key`) on key caps.
- **Circles:** the avatar (4rem, hairline border) and the terminal's three 0.625rem window dots.
- **Rows:** square. Rows, rules and the rail have no radius.
- **Focus ring:** a 2px outline in the ring colour (Lime), offset 2px, on every focusable element. The terminal shows focus by turning its border Lime instead, since its input has no outline of its own.
- **Underlines:** links in running text are underlined in Hairline with a 4px offset and turn the underline Lime on hover. In long-form text the underline is Lime at rest, offset 3px.

**The Square Row Rule.** Radius belongs to frames and controls. A row, a rule or a section never gets rounded corners.

## Components

Plain and operable: each one is type on the ground with a hairline, and each responds to the keyboard as well as the pointer.

### Rail and mobile bar

- **Rail:** see Layout. A link is 2.25rem tall with an 8px radius; inactive links are Quiet Ink, the current one is Ink at weight 500 with a Lime mono `/` before it (the `/` is present but invisible on the others, so labels stay aligned). Hover fills the link with Muted. The current page is also given as `aria-current="page"`.
- **Search button:** bordered, 2.25rem, mono label size, with a key cap showing `Ctrl K` or `⌘K`. It opens the command menu.
- **Mobile bar:** the same links in mono at 0.875rem with the same Lime `/`; search is an icon only.

### Work list (signature)

- **Structure:** a list under a top hairline; each row is one link to its case study, laid out as marker, name and tagline, year. The year is mono label size with tabular figures.
- **Selection:** pointing at a row or focusing it selects it. From 64rem the selected row is tinted with Ink at 4.5% and shows a Lime `❯`; other rows tint to 3% on hover. Below 64rem every row shows the marker and none is tinted at rest.
- **Keyboard:** Up/Down or J/K move the selection and the focus, Home/End jump to the ends, Enter opens the case study. A faint key hint sits under the list from 64rem.
- **Motion:** the tint and the marker change over 150ms.

### Preview pane

- **Shape:** one of the two frames: Frame fill, hairline border, 10px radius, clipped. Shown from 64rem only, top-aligned beside the list.
- **Content:** the project image at 2:1 on Muted with a hairline under it; then, with 1.25rem of padding, the summary, the stack in mono label size, and the actions.
- **Action:** "Read the case study" is a Lime-filled link, 2.25rem tall, 8px radius, with an arrow; hover drops the fill to 85%. The first external link sits beside it as an underlined text link.
- **Motion:** when the selection changes the new content fades in over 200ms on an ease-out curve.

### Terminal

- **Shape:** the other frame: Frame fill, hairline border, 10px radius, mono at 0.875rem. A title bar with three Hairline dots and a Faint title, a hairline, then 1rem of padding around a log (max 18rem tall, scrolls) and the input line.
- **Colour:** the prompt is a Lime `❯` and a Faint `~`. Output is Ink; hints are Quiet Ink; command names inside hints are Lime; links are underlined in Lime. Errors are red. The caret is Lime.
- **Focus:** clicking anywhere in the window focuses the input, and the whole frame's border turns Lime while it has focus. The input is 1rem below 40rem so phones do not zoom.
- **Behaviour:** real commands, history on Up/Down, Tab completion, Ctrl+L to clear; the log is a polite live region.

### Buttons

- **Shape:** 10px radius, weight 500, 0.875rem. The home page's actions are 2.75rem tall with 1rem of side padding and 1rem text; the stock sizes are 2rem and 2.25rem.
- **Primary:** Lime fill with On Lime text; hover drops the fill to 80%. Used for the page's main action.
- **Outline:** hairline border on the Frame fill; hover fills with Muted.
- **Ghost:** no fill, Quiet Ink; hover fills with Muted and turns the icon Ink. The theme toggle; the rail's social links get the same treatment at an 8px radius.
- **States:** colour transitions take 150ms; pressing moves the button down 1px; disabled is 50% opacity.

### Tags and link chips

- **Tag:** mono, 0.875rem, 8px radius, hairline border on the Frame fill, Quiet Ink text, written as `#name`. Hover turns the border Lime and the text Ink. Selected is a Lime fill with On Lime text and a Lime border.
- **Link chip:** the same bordered shape for a secondary link (the "Elsewhere" links, the secondary case study links, the 404 suggestions): hover turns the border Lime.
- **Key cap:** 4px radius, hairline border, Frame fill, mono label size.

### Hairline rows

The pattern for anything that would otherwise be a card: post rows (date column of 8rem, then title, description and tags), contact rows (icon, name and handle, arrow), the toolbox list (an 8.5rem mono label, then the items) and the "At a glance" list. Rows that link tint with Ink at 3% on hover; a trailing arrow nudges 2px to 4px and turns Lime.

### Section heading

A Title on the left and an optional mono text link at the end of the same line, baseline-aligned, 1.5rem above the content.

### Footer

A hairline, then a mono line in Quiet Ink: the copyright on one side, `rss` and `source` on the other. Below 64rem it also lists the social links the rail would have carried.

## Do's and Don'ts

### Do:

- **Do** put content straight on the marbled ground and separate it with 1px hairlines: a top rule on the list, a bottom rule on each row.
- **Do** use the theme tokens for every colour, so both themes and the marbling stay in step.
- **Do** keep lime for the live and the actionable: prompt, caret, selection marker, current page, focus ring, link underline, the primary action.
- **Do** set anything a machine would print in JetBrains Mono: paths, keys, times, dates, stack names, tags.
- **Do** make every list operable from the keyboard and keep the 2px lime focus ring visible.
- **Do** keep state changes short: 150ms for colour, 200ms for the preview pane's fade.
- **Do** leave the marbling at its quiet strength (0.8) under anything that is mostly reading.
- **Do** repeat below 64rem, in the page or footer, whatever the rail carries above it.
- **Do** respect reduced motion: one still frame of marbling and near-instant transitions.

### Don't:

- **Don't** add cards, panels or tiles. The terminal and the preview pane are the only framed objects.
- **Don't** add shadows, glows, gradients or blurred surfaces.
- **Don't** use lime as a background tint, a heading colour or decoration, and don't add a second accent.
- **Don't** set Faint on anything a reader needs; it is about 3.3:1 on the light ground.
- **Don't** give the rail a fill, or put any background between the content and the marbling.
- **Don't** animate on load or on scroll. Only the ground drifts.
- **Don't** round rows, rules or sections; radius is for frames (10px) and controls (8px).
- **Don't** set sentences in mono outside the terminal.
- **Don't** give a page its own container, width or background; every page uses the same shell.
