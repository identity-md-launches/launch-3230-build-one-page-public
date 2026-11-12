# swarmcard

A one page independent proposal by ultrapara of uxp-labs: Claus as the second swarm beside IMD. The complete production website is in **dist/**. Serve that directory as static files; no application server, API, wallet or credentials are needed.

## Install, develop and preview

Node 24 and npm were used for this delivery. Install the exact dependencies from the lockfile:

```sh
npm ci
npm run dev
```

Vite prints the development URL. React renders the proposal at build time, so after changing `src/App.tsx` or `src/content.ts`, run `npm run render` in another terminal or restart the development command. CSS and client navigation changes use Vite’s normal development updates.

Rebuild and preview the production export:

```sh
npm run typecheck
npm run build
npm run preview
```

Vite prints the preview URL. Deploy the contents of `dist/` together, including assets, fonts, image, licenses and the text download. Vite uses `base: './'`; all export assets are relative and section navigation uses hashes. Subpath hosting was checked under `/preview/`. Hosting and naming are handled after this assignment; preferred label: **swarmcard**, fallback: **adjacent-swarms**.

## Source and assets

`src/content.ts` holds structured proposal copy; `src/App.tsx` supplies the document, SVG and remaining prose. `src/style.css` defines the design system. `src/main.ts` is a small progressive enhancement for focus, disclosure closing and active section navigation. `scripts/render.tsx` generates the root `index.html` and `public/swarmcard-proposal-v0.3.txt` from the same React document before Vite builds. The entire proposal, native section links, contents disclosure and text download remain usable without JavaScript.

`public/share.png` is the local 1200 by 630 social image. Its original drawing source is `scripts/generate-share.mjs`; `public/favicon.svg` is also original. To regenerate the image after a copy or visual change, install Playwright’s Chromium and run `npm run share`, then rebuild. The normal production build uses the included image and does not require a browser. Local DM Sans and Newsreader fonts are bundled from their locked packages; font licenses are retained in `public/licenses/` and `dist/licenses/`.

## Validation performed

| Command or check | Actual result |
| --- | --- |
| `npm run typecheck` | Passed, exit 0 |
| `npm run build` | Passed, exit 0; complete static export generated |
| `npm run check` | Passed, 16 of 16 Chromium interaction and accessibility checks |
| Pinned `taste.mjs --out test/scratch/taste --offline` | Passed, 16 of 16 checks at 320, 390 and 1440 wide |
| `npm run check:bundle` | Passed the 8 MiB submission budget |

The interaction script starts and closes its own temporary preview. It checks section and address integrity, first screen visibility, keyboard navigation, disclosure selection and Escape, anchor history, the actual text download, metadata assets, local fonts, static subpath loading, zero external runtime requests, responsive widths, 200% text enlargement and use without JavaScript. Axe found no WCAG A or AA violations in the checked Chromium phone and desktop states. This is a limited automated result, not an accessibility certification.

To repeat browser validation on a development machine:

```sh
npx playwright install chromium
npm run check
```

`CHROMIUM_EXECUTABLE_PATH` can select an existing browser executable. The worker used the installed Chromium headless shell and a scratch temporary directory. `CHECK_ENGINE=webkit npm run check` selects WebKit when that browser and its platform libraries are available. Results and temporary screenshots go to `test/scratch/interaction/`. That directory is not part of the deliverable.

The supplied browser connector could not launch because its temporary socket path was too long; direct Playwright provided the rendered checks and screenshots. A separate WebKit attempt could not start because system libraries were unavailable, including liblcms2. WebKit, physical devices, assistive technology sessions, browser native zoom, print output and RTL were not verified. Text enlargement is reported separately from native zoom. X returned 403 for the supplied post; its paraphrase uses only the summary given in the brief. The supplied chain facts were preserved, not independently refreshed with RPC calls.

The pinned taste tool was an assignment input and is removed from the submission. Its measured results are preserved in `artifacts/taste-results.json`. See **[artifacts/validation.md](artifacts/validation.md)** for the six domain review, fixes and coverage, **[DESIGN.md](DESIGN.md)** for the implemented design system, and **[artifacts/screenshots/](artifacts/screenshots/)** for final rendered evidence.

## Submission budget

The hard limit is 8,388,608 bytes. `npm run check:bundle` measures every delivered source, manifest, document, static asset and evidence file. The explicit `.gitignore` path budget is **512 bytes**; it is currently 136 bytes. Its exclusions cover generated dependency directories, caches, TypeScript build information and `test/scratch/`, at every relevant nesting level. Review artifacts and the production export are included. No dependency archives, caches, node_modules, submodules or browser binaries are delivered.
