# Notes: AI Tools & Design Decisions

## AI tools used

**Claude Code (Anthropic), in the Claude desktop app.** I used it as a pair programmer. I set the
direction and reviewed and adjusted everything it produced. It helped with:

- **Tooling setup:** ESLint flat config + oxlint + Prettier, Vuetify auto-import
  (`vite-plugin-vuetify`), Sass variable overrides, and switching from the MDI icon font to
  tree-shaken SVG icons (`@mdi/js`).
- **Typing:** TypeScript interfaces from sample API responses, and a generic `HttpService.get<T>`.
- **Lighthouse review:** analysing the report and fixing the accessibility issues it pointed to.
- **Checking its own work:** running type-check, lint and builds, and checking the UI in a browser
  (desktop and phone widths).

## Design decisions

### Architecture

```
views/LeaguesView.vue        page: wires the store, filters and components together
components/                  LeagueCard, LeagueCardSkeleton, LeagueFilters, LeagueBadge (dialog)
composables/                 useLeagueFilters (search + sport filter), usePageTitle (title/meta)
store/leagues.store.ts       Pinia store: leagues list + seasons cache
services/                    http.service (typed axios wrapper), leagues.service (API endpoints)
interfaces/                  ILeague, ISeason and the API response types
```

- **API calls live only in services.** Components never call axios directly.
- **The store owns app-wide data,** meaning the leagues and the seasons cache.
- **Page-only state stays out of the store:** the search text, the selected sport and the dialog
  state belong to the page.

### Caching ("responses should be cached to avoid repeat calls")

- **Seasons are cached per league** in the Pinia store. Re-opening a league makes no new request.
- **Requests already running are shared.** Two quick clicks on the same league send one HTTP
  request.
- **Failed requests aren't cached,** so the next attempt retries.
- **The leagues list is fetched once** and reused.
- **The cache is in-memory only** (no `localStorage` persistence). It resets on page reload, so
  users don't see stale data.

### Filtering

- **Filtering is client-side,** with computed values over the cached list.
- **Name search** ignores case and surrounding spaces.
- **The sport dropdown appears only when the response has more than one sport,** as the brief
  asks. The free API key (`123`) currently returns 10 leagues, all Soccer, so the dropdown stays
  hidden with real data. I tested it by adding non-Soccer leagues to the store in the browser.
- **An empty state with a "Clear filters" button** shows when nothing matches.

### Season badge dialog

- **Clicking a league** (or pressing Enter/Space on it) opens a dialog that loads its seasons.
- **Only seasons that have a badge are shown,** newest first, as a button group. The newest is
  selected by default. On narrow screens the group scrolls sideways.
- **Leagues with no badges** show an explicit "no badges" state.
- **The free API key returns only a few seasons per league,** so the newest available season is
  often from the 1990s or early 2010s.

### UI / UX

- **Vuetify 4** with compact density globally (buttons keep their normal size). List sizes are set
  through Vuetify Sass variables instead of override CSS.
- **Skeleton loaders** show while data loads, and the error snackbar uses a central error handler.
- **Responsive grid:** one card per row on phones, two from 600px up.
- **Light/dark theme toggle and vue-i18n.** All UI text is in `src/locales/en.json`.

### Performance

- **Vuetify components are tree-shaken** (auto-import) instead of registering the whole library.
- **SVG icons replace the full MDI icon font,** removing ~3.6 MB of font files and ~325 KB of CSS
  from the build.
- **`preconnect` to the API host** starts the connection while the JS bundle is still downloading.
- **Lazy-loading the dialog was tried and dropped.** It made the initial bundle slightly bigger,
  because the dialog shares most of its Vuetify code with the page.
- **Production build:** about 196 KB of JS and 47 KB of CSS (gzip).

### Accessibility

- **`<html lang>`** follows the selected language.
- **Icon-only buttons have `aria-label`s.**
- **League cards are keyboard accessible:** `role="button"`, focusable, and they open with
  Enter/Space.
- **A screen-reader-only `<h1>`** gives the page a heading, and badge images have descriptive alt
  text.

### Code quality

- **TypeScript in strict mode,** with `noUncheckedIndexedAccess`.
- **ESLint, oxlint and Prettier** run through `npm run lint` and `npm run format`.

## Known limitations / next steps

- **No automated tests yet.** The next step would be unit tests for the store cache and
  `useLeagueFilters` (Vitest), plus one end-to-end test for the search → open dialog flow.
- **The language switcher offers Spanish,** but only `en.json` exists, so it falls back to
  English.
- **`isSeasonsLoading` is a single flag for the whole app.** That's fine with one dialog, but it
  should become per-league if several components load seasons at once.
