---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/layout.tsx","src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/blog/page.tsx","src/app/blog/[slug]/page.tsx","src/app/contact/page.tsx"]
---

# Surface: oreotm.xyz, whole site (home, projects, case studies, blog, posts, contact, 404, shell)

Mode: Experience (portfolio). Audience: developers and clients, equally. Job: read how things were built, or decide to message. Primary action: open a case study; secondary: message on Discord.

Constraints from the owner (2026-11-12): keep the current style (near-black and warm off-white themes, lime accent, monospace details, the terminal); inspiration from Linear and award-winning sites; every page consistent; more interactive; the marbling becomes the main background and the dotted ground goes. Asked to choose between three compositions, the owner could not, so the dealt lead is built. The roll ran degraded (no network): no challengers, no quality-bar boards, no image generation, so the build is code-led.

Unresolved: none.

## Direction contract

THESIS: The portfolio is a workspace, not a brochure. It is laid out and operated like the tools its owner builds: a rail you navigate from, a list you move through with the keyboard, a terminal that runs. It refuses the portfolio default of a centred hero over a grid of project cards.

OWN-WORLD: One continuous ground, the marbling, fixed behind every page in the theme's own greys, with lime only where something is live: the cursor's contour lines, the selected row's marker, the prompt, focus. Type is Inter at tight display settings and JetBrains Mono for paths, keys, times and stack names only. No cards: content sits directly on the ground, separated by hairlines; the two framed objects are the terminal and the preview pane. Radius 10px on those, none elsewhere.

STORY: A visitor sees who this is and what they build, moves through the work without leaving the page, opens one case study, and finds the way to message.

FIRST VIEWPORT: Left, a fixed 15rem rail: wordmark, the four destinations with the current one marked, and at its foot the place, the ticking local time, search and theme. Right, on the marbling: the statement at display size across about seven columns with the terminal beside it; under them the work begins, a list of projects on the left and a preview pane on the right that follows the selected row. Primary action: the selected project's "Read the case study", in the preview pane.

FORM: Workspace (candidate 3 of 7, the dealt lead). seed:41a53688e6335861

SIGNATURE: The work list is operated, not scrolled past. Arrow keys or J/K move the selection, the preview pane changes with it, Enter opens the case study; hover does the same for a pointer. Motion grammar: the selection marker and preview cross-fade in 160ms on an exponential ease-out; the marbling drifts on its own and gathers lime contours around the cursor on every page; nothing else animates on load.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
