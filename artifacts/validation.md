# Validation and design review

Complete for the requested static proposal website, with the browser and manual testing limitations below. These are worker observations, not an independent certification.

## Scope and assumptions

The deliverable is one public document, labeled swarmcard, with a contents disclosure on phones, a contents rail on larger screens, section anchors and a plain text proposal download. All 12 content sections follow the header and precede the footer in the supplied order. The downloadable text is generated from the rendered proposal, not presented as a signed or implemented swarm profile.

The independent author, supplied facts, addresses, dates, rates and questions come from the brief. No chain facts were refreshed or inferred. The thesis paraphrases only the provided summary; no direct quotation is used. The supplied X link returned 403. Its link remains intact. Protocol names retain the required hyphens in uxp-labs and ERC-8004; there is no dash punctuation in the site’s prose. The specified existing request rate and the flat CLAUS price removed from the earlier draft are the only required price references.

The supplied build website workflow and pinned Better Interface and design critic references informed implementation and review. The wallet connector reference was read; wallet infrastructure is not applicable because the page has no signing or transaction actions. No hosting or publishing was attempted.

## At a glance

| Area | Final result |
| --- | --- |
| Brief content sections | 14 met, 0 missing, 0 faked |
| Broken primary flows | 0 observed in Chromium |
| Product and main action on first 390 screen | Yes, main action at y 518.83 through 568.42 in an 844px high viewport |
| taste@1 | 16 of 16 passed |
| Interaction and accessibility checks | 16 of 16 passed |
| Remaining copy findings | 0 against the supplied copy constraints |
| Share card | Local 1200 by 630 PNG, verified load and dimensions |

Visual idea: a long form independent proposal carried by a serif title, quiet forest green accents and warm paper, with the same reading order on phones and desktops.

## Brief coverage

| Requested section | Status and evidence |
| --- | --- |
| “Two swarms, one card.” | Met: title, exact subtitle, v0.3 revision line, 18 agent steps and independent authorship in the header |
| “The idea in three lines” | Met: `#idea`, the three supplied statements |
| “Thesis” | Met: `#thesis`, Nov 10 source link, paraphrase and all five proposal takeaways |
| “Where each network stands today” | Met: `#today`, both fact lists, desktop columns, date and five member dispute panel with four agreeing |
| “The gap” | Met: `#gap`, all five short cards |
| “The design” | Met: `#design`, all four meeting points and one inline labeled SVG with Rider, both swarms, shared card, dashed next slot and signed record |
| “Seven pieces of work” | Met: `#work`, ordered list of all seven pieces and the five named operations |
| “The swarm card” | Met: `#swarm-card`, signed versioned file proposal, seven questions and unrelated third swarm stability test |
| “Chains, in order” | Met: `#chains`, Ethereum, Robinhood Chain, Base, later FLOP devnet and later Tempo, with the supplied roles |
| “Phases, each with its exit test” | Met: `#phases`, Phase 0 through Phase 4 and explicitly marked exit tests; counts and conditions preserved |
| “Who holds the keys today” | Met: `#keys`, dated facts, all six exact supplied address strings and ownership or result writer relationships; publication request retained |
| “Questions for the founders” | Met: `#questions`, four for IMD, four for Claus and two for both |
| “How this was made” | Met: `#review`, all three exact job links, six agents each, and both named cuts from the draft |
| “Footer” | Met: independent author, non affiliation, no agreement and the specified financial advice notice |

The source, lockfile and complete `dist/` are present in the submission tree. The export uses relative assets and hash navigation. No project logos, brand art, speculative prices, investment copy, wallet controls or added factual claims are included. `README.md` explains installation, preview and rebuild. Root `DESIGN.md` records the implemented tokens, components and responsive rules.

## Six domain review

| Domain | Coverage | Evidence and limits |
| --- | --- | --- |
| Accessibility | Checked | Native links and summary, one main and h1, heading order, full addresses, SVG name and description, skip link, keyboard selection and Escape return, section focus, focus perimeter, target sizes, reduced motion. Axe reports zero violations for its checked WCAG A and AA rules at 390 and 1440. Screen reader sessions and physical device accessibility were not performed. |
| Layout | Checked | DOM order, logical spacing, native disclosure, two column comparison and responsive rules reviewed in source. Export measured at 320, 390, 640, 768, 1056, 1057 and 1440. No horizontal overflow. The probe found no overlapping text, floating controls over text or clipped text. 200% text enlargement passes at 320, 390 and 1440. Native zoom, RTL and every possible viewport were not tested. |
| Writing | Checked | Labels name their actions. Source links are descriptive. Supplied facts, proposal status, questions, attribution and disclosures retained. No em or en dash prose, slogans, invented figures or claims. No forms or asynchronous errors need copy. Required proper name hyphens retained. |
| Typography | Checked | Local font files, intended 400 and 600 weights, descending heading hierarchy, measure and wrap rules reviewed. Both fonts load at the used weights. Final probe measures five interface sizes on phones and six on desktop, three families including code and two weights. SVG art is excluded from probe type counting; its label fit was inspected separately. |
| Colors | Checked | Semantic tokens and solid backgrounds reviewed. Browser measured body 12.05:1 on paper, secondary text 5.63:1 on paper and 5.18:1 on cards, accent and primary action 6.80:1. Focus color on paper measures 6.80:1. Probe passes all measured text pairs. Hover, pressed and focus states were exercised in a separate pointer context. There is one light theme; dark theme checks are not applicable. Forced colors and all SVG boundaries were not separately contrast audited. |
| UI | Checked | Native disclosure open and closed states, focus return, anchor history, download completion, current section, primary action rest, hover, pressed and keyboard focus checked. SVG labels fit on the phone rendering. Flat surfaces have no shadows or nested cards. Color transitions are 120ms and guarded by no preference for reduced motion. Loading, pending, empty, error, modal and account states are not applicable. No animation playback audit was necessary because there is no animated sequence. |

## Findings corrected

1. **High, layout: enlarged text overflowed the header and actions.** Source: `src/style.css:85`, `.header-row`; `src/style.css:102`, h1; `src/style.css:107`, `.button`; `src/style.css:111`, `.question-link`. Earlier behavior: at 200% text, the download link exceeded the page at 390px; after wrapping the header, title and action content still exceeded 320px. Change: allow the header to wrap, constrain actions to the container, use narrower mobile action padding and gaps, and allow emergency title wrapping. Why: controls and proposal copy must remain reachable when enlarged. Reproduction: set root font size to 200% at 320 or 390. Recheck: final interaction measurements have viewport and content widths both exactly 320, 390 and 1440, with no offending elements.

2. **Medium, accessibility: the skip link focused the first section rather than main.** Source: `src/main.ts:20`, target selection. Earlier behavior: a generic query for h2 selected the first section even when the link target was main. Change: find an h2 only for a section target, otherwise focus the requested target. Why: skip navigation should reach its announced landmark. Reproduction: Tab from the top and press Enter on Skip to proposal. Recheck: active element id is main; ordinary section jumps still focus their own h2.

3. **Low, layout: diagram details ran too close to box edges.** Source: `src/App.tsx:46`, Rider and IMD text positions. Earlier phone screenshot: Rider’s one line description extended outside its box, and the IMD description had little inset. Change: split those details across lines inside the existing boxes. Why: diagram labels must remain readable and grouped with their node. Recheck: final `screenshots/diagram-mobile.png` shows the details inside their boxes without clipping.

4. **Low, UI: hover styling could override the pressed action color on a mouse.** Source: `src/style.css:196`, `.button-primary:hover:active`. Earlier behavior: the later hover rule had the same specificity as the active rule. Change: explicitly keep the pressed color while hovered. Why: primary action states should remain distinct across pointer types. Recheck: the pointer context measured hover as `#204b3a`, pressed as `#173b2d`, and the focus perimeter as a 2px solid green outline.

No applicable high or medium finding remains from the performed checks. These corrections did not change the proposal’s factual content.

## Commands and results

The final source and export passed `npm run typecheck` and `npm run build`, both exit 0. The render command uses `node --import tsx` to avoid the tsx CLI’s temporary IPC socket limit. Font imports were corrected to the actual packaged Latin WOFF2 files after an initial build failed on nonexistent subset CSS paths.

`npm run check` passed all 16 checks against the production export at a local `/preview/` subpath. Chromium version was 155.0.8059.12. The installed headless shell was selected with `CHROMIUM_EXECUTABLE_PATH`; the temporary directory was set to a permitted scratch path. The script closes its own server and browser. It exercised native navigation, download bytes, focus, both pointer states, hash history, no JavaScript behavior, font loading, metadata files and accessibility. No runtime exception, failed local resource or external runtime request was observed. See `interaction-results.json` for measured widths, colors and first screen action bounds.

The final pinned probe ran from the repository root:

```sh
node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste --offline
```

The worker selected the available Playwright module and browser cache and used a short scratch temporary path. The probe completed, exit 0, all 16 checks passed. Its screenshots were made at 390 by 844 and 1440 by 900; reflow also measured at 320 by 700. The first phone screen contains 45 words of measured prose, within the 60 word threshold. `taste-results.json` preserves the actual check outputs; the task supplied probe itself is not shipped.

Final screenshots inspected and retained:

| Evidence | State |
| --- | --- |
| `screenshots/mobile-390.png` | First screen with proposal and action |
| `screenshots/desktop-1440.png` | Desktop hierarchy and contents rail |
| `screenshots/keyboard-focus-mobile.png` | Visible skip link and focus indicator |
| `screenshots/keyboard-focus-desktop.png` | Primary action with visible keyboard focus |
| `screenshots/diagram-mobile.png` | Final diagram label fit |
| `screenshots/keys-mobile.png` | Complete selectable address strings wrapping |

The share PNG was generated, opened for inspection, then its production response and 1200 by 630 dimensions were checked. `npm run check:bundle` checks the complete delivery paths against 8,388,608 bytes and the explicit 512 byte `.gitignore` budget. Source, local fonts, licenses, text download, social image, production export and review evidence are retained. Dependency directories, caches and browser downloads are excluded at every nesting level and are not delivered.

## Limitations and completion

The supplied browser connector failed before loading the page because its Chromium temporary socket path was too long. Direct Playwright with the installed Chromium headless shell supplied the actual rendered inspection and interaction evidence.

WebKit was downloaded only into scratch for a second engine check. It could not start with the available platform libraries; the launch reported missing dependencies, including liblcms2. No WebKit observation or Safari pass is claimed. Screen reader sessions, physical phones, browser native zoom, forced colors rendering, printed output and RTL were not performed. The 200% text test is a root text size enlargement test, not native zoom. The automated scans do not establish full accessibility compliance. External source availability beyond the supplied X fetch was not evaluated.

The website, documentation and production export are complete for this bounded assignment. The unperformed platform and manual checks remain explicit limitations. This page and the download present only the independent proposal; they do not implement or imply agreement to any cross swarm service.
