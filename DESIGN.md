# swarmcard design

## Overview

swarmcard is a public reading page for ultrapara’s independent proposal. It uses warm paper, a forest green accent, serif headings and a narrow reading column. The desktop contents rail and phone disclosure help readers move through the same document. The page presents a proposal, not an operating agreement or a live service.

The source of truth is `src/style.css`, with structure in `src/App.tsx`, proposal data in `src/content.ts`, and navigation enhancements in `src/main.ts`. React renders the document at build time. There is no client React application to wait for.

## Colors

All colors are opaque sRGB hex values. Components use semantic custom properties, which refer to the small primitive palette in `src/style.css:16`.

| Semantic token | Value | Use |
| --- | --- | --- |
| `--color-page` | `#f8f7f2` | Page and diagram box backgrounds |
| `--color-surface` | `#eeeee6` | Gap cards and the existing network connection note |
| `--color-text` | `#25352c` | Headings, body copy and diagram text |
| `--color-text-secondary` | `#5c655e` | Notes, metadata and navigation at rest |
| `--color-border` | `#d1d5ca` | Section rules, data rows and diagram structure |
| `--color-accent` | `#2b604c` | Links, primary action, diagram connections and emphasized title line |
| `--color-accent-hover` | `#204b3a` | Link and primary action hover |
| `--color-accent-pressed` | `#173b2d` | Primary action pressed state |
| `--color-accent-soft` | `#e4ece3` | Current section and navigation hover |
| `--color-on-accent` | `#f8f7f2` | Primary action and central diagram card text |
| `--color-focus` | `#2b604c` | Keyboard focus perimeter |

Measured in Chromium: body on paper 12.05:1, secondary text on paper 5.63:1, secondary text on cards 5.18:1, and accent on paper 6.80:1. Primary action text on its green background also measures 6.80:1. These values describe the measured default states, not every platform rendering. Full measurements are in `artifacts/interaction-results.json`.

The page has one light theme. No gradient, transparency layer or status palette is implemented.

## Typography

`--font-body` uses local DM Sans Variable, then the system sans stack. `--font-display` uses local Newsreader Variable, then Georgia and serif. `--font-data` uses the platform monospace stack only for full addresses. Latin WOFF2 files come from the locked Fontsource packages and are bundled into `dist/assets/`. Their licenses are in `public/licenses/` and the export. Font loading at the used weights was checked in the browser.

The interface uses weights 400 and 600. DM Sans provides weights 100 through 1000, and Newsreader 200 through 800. Both declared faces are normal style; no italic or synthesized emphasis is requested.

| Token | Above 40rem | At or below 40rem | Role |
| --- | --- | --- | --- |
| `--text-small` | 14px | 14px | Navigation, notes, addresses |
| `--text-body` | 16px | 16px | Prose and controls |
| `--text-lead` | 20px | 20px | Subtitle and subheadings |
| `--text-feature` | 28px | 20px | Three line idea and network headings |
| `--text-heading` | 40px | 28px | Section headings |
| `--text-display` | 80px | 48px | Main title |

Values above assume a 16px browser root. Sizes remain in rem so text enlargement works. Mobile network headings use the section heading token. There are six distinct interface sizes on desktop and five on phones.

Body line height is 1.6, subtitle and idea text 1.5, subheadings 1.4, section headings 1.14, and the title 1.02. Phone headings use 1.2 and the title 1.08. The title tracks at −0.045em on desktop and −0.035em on phones; section headings use −0.025em. Body tracking is natural. Long paragraphs are capped at 65ch, with supporting measures of 60ch and 38rem where appropriate. Headings balance, the subtitle uses pretty wrapping, and full addresses wrap anywhere without truncation.

The SVG has its own drawing coordinates: 26px labels, 20px details and a 22px central card label in a 500 by 620 viewBox. The drawing scales to its container. It includes a complete accessible title and description.

## Layout

The spacing tokens are 4, 8, 12, 16, 24, 32, 48, 64 and 80px at the default root. Reuse their semantic `--space-*` names rather than adding isolated values.

The `.shell` is at most 76rem including 2rem inline padding. Desktop `.page-layout` has a 12.5rem contents rail, a flexible document column and a 4rem gap. The rail sticks 2rem from the top. At desktop viewport heights of 50rem or less it returns to normal flow so its bottom remains reachable.

At 66rem and below the rail disappears, the shell caps at 52rem, and the native “On this page” disclosure appears above the proposal. Its navigation is two columns. At 40rem and below, shell padding becomes 1.5rem, network and gap comparisons become one column, phase rows and chain rows stack, the footer stacks, and section spacing changes from 4rem to 3rem. At 22rem and below, shell padding becomes 1rem and contents navigation becomes one column.

The header and action rows can wrap. Controls have maximum widths rather than fixed text widths. The title and wallet addresses can break at extreme text enlargement. Browser checks covered 320, 390, 640, 768, 1056, 1057 and 1440px widths, plus 200% text enlargement at 320, 390 and 1440px. Browser native zoom, RTL and physical devices remain unverified.

Print styles remove navigation and actions, retain the complete proposal, and keep small records and diagram blocks together. Printed output has not been manually checked on paper.

## Elevation & Depth

The interface is flat. There are no shadows, overlays, floating action bars or nested cards. Space groups related material; single pixel rules divide long document sections and data rows. Muted surfaces distinguish the five gap cards and the existing connection note. The diagram uses strokes for relationships and a filled central card for the common profile.

## Shapes

`--radius` is 0.375rem for controls, navigation highlights and muted surfaces. Focus perimeters use a 2px radius. SVG boxes use an 8 unit radius within the drawing. No text is clipped or ellipsized. The favicon and social image use original abstract paired cards, with no project marks or brand art.

## Components

| Component or pattern | Source | Behavior |
| --- | --- | --- |
| `Section` | `src/App.tsx:13` | Stable anchor, numbered visual heading, labeled section and focusable h2. Props: id, number, title, children and optional className. |
| `Contents` | `src/App.tsx:20` | Desktop rail or native phone details element through the mobile prop. Ordinary anchors preserve link behavior and browser history. |
| Navigation enhancement | `src/main.ts` | Menu selection closes the disclosure; Escape closes it and returns focus; section jumps focus the heading; observer and hash changes update aria-current. |
| Primary action | `.button.button-primary` in `src/style.css` | Filled “Read the proposal” anchor, at least 48px high, darker hover and pressed states. |
| Secondary and source links | `.question-link`, `.source-link`, `.download-link`, `.review-links` | Descriptive destinations, decorative currentColor SVG icons, at least 44px targets where standalone. Downloads use native anchors. |
| `SwarmDiagram` | `src/App.tsx:28` | A static inline SVG with one accessible name and description. It scales up to 31.25rem wide. |
| `Address` | `src/App.tsx:65` | Full selectable address in code and bdi, preserved direction and wrapping. No shortening. |
| Comparison and gap patterns | `.network-grid`, `.gap-grid` | Two desktop columns, one phone column. No interactive styling on static content. |
| Phase rows | `.phase-list`, `.exit-test` | Phase, proposal text and explicitly named exit test. Color is supported by words and a border. |

All controls use native links or summary. A 2px focus ring has a 5px offset, 4px on the primary action and 8px on section headings. The skip link becomes visible on keyboard focus. Hover styling is limited to hover capable devices. Only color and background color transition, for 120ms ease out, when reduced motion is not requested. There are no asynchronous, loading, success, empty or error states in this static reading site.

## Do’s and don’ts

Start additional document content with `Section` and existing tokens. Keep substantive text in HTML, preserve source links, keep full addresses selectable, and use the one filled action for the main reading path. Keep proposals and questions phrased as such. Update the plain text export by rebuilding.

Keep the authorship and independence notices. Preserve the required spelling of uxp-labs and ERC-8004; other prose has no dash punctuation. Do not introduce project logos, invented facts, wallet flows, speculative economics, decorative motion, new type sizes or extra surface layers.

For another document page, reuse the shell, title treatment, Section pattern and responsive contents; render its content at build time, then repeat the browser reflow and keyboard checks. The current long page’s exact section count is not a system invariant.

Design review followed Jakub Krehel’s Better Interface, pinned commit `267330e1adfc66a718fb65fa6918c1f06d0a689e` (MIT). Documentation method followed Paul Bakaus’s Impeccable, pinned commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8` (Apache 2.0). The supplied license notices are retained in `artifacts/licenses/design-guides.txt`.
