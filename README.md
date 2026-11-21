# Sports Leagues

A single-page app that lists sports leagues from [TheSportsDB](https://www.thesportsdb.com/free_sports_api),
with search by name, a sport filter, and a dialog showing season badges for each league.

> 📝 **AI tools used and design decisions:** see [NOTES.md](./NOTES.md).

---

## Features

- League list showing name and sport, with loading skeletons and an empty state
- Search leagues by name
- Sport filter dropdown, shown when the API returns more than one sport
- Click a league (or press Enter/Space on it) to see its season badges, with a button group to
  switch between seasons
- Season responses are cached per league, so re-opening a league makes no new request
- Responsive layout, light/dark theme, i18n-ready, keyboard accessible

---

## Tech Stack

- **[Vue 3](https://vuejs.org/)** + **[TypeScript](https://www.typescriptlang.org/)** + **[Vite](https://vite.dev/)**
- **[Vuetify 4](https://vuetifyjs.com/)**: UI components, tree-shaken via `vite-plugin-vuetify`
- **[Pinia](https://pinia.vuejs.org/)**: state management and the response cache
- **[Vue Router](https://router.vuejs.org/)**, **[Vue I18n](https://vue-i18n.intlify.dev/)**, **[@vueuse/head](https://github.com/vueuse/head)**: routing, translations, page title and meta
- **[Axios](https://axios-http.com/)**: HTTP client
- **[@mdi/js](https://pictogrammers.com/library/mdi/)**: SVG icons, only the ones used are bundled
- **ESLint** + **oxlint** + **Prettier**: linting and formatting

---

## Getting Started

**Requirements:** Node.js `^22.18.0` or `>=24.12.0`.

```bash
git clone https://github.com/arsenyeghiazarian/sports-leagues-task.git
cd sports-leagues-task
npm install
cp .env-example .env
npm run dev
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable        | Description              | Value in `.env-example`                        |
| --------------- | ------------------------ | ---------------------------------------------- |
| `VITE_BASE_URL` | TheSportsDB API base URL | `https://www.thesportsdb.com/api/v1/json/123/` |

`123` is TheSportsDB's free public test key. It returns a limited dataset: 10 leagues (all Soccer)
and only a few seasons per league.

---

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the dev server                  |
| `npm run build`        | Type-check and build for production   |
| `npm run preview`      | Serve the production build locally    |
| `npm run type-check`   | Type-check with `vue-tsc`             |
| `npm run lint`         | Run oxlint and ESLint (with auto-fix) |
| `npm run format`       | Format `src/` with Prettier           |
| `npm run format:check` | Check formatting without writing      |

---

## Project Structure

```
src/
├── components/      # LeagueCard, LeagueFilters, LeagueBadge (dialog), layout components
├── composables/     # useLeagueFilters, usePageTitle
├── interfaces/      # API response types (ILeague, ISeason, …)
├── locales/         # Translations (en.json)
├── plugins/         # Axios, Vuetify, i18n setup
├── router/          # Routes
├── services/        # HTTP wrapper and API endpoints
├── store/           # Pinia store (leagues + seasons cache)
├── styles/          # Vuetify Sass variable overrides
├── utils/           # Error handling
├── views/           # Pages (LeaguesView, PageNotFoundView)
├── App.vue
└── main.ts
```

---

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) with the extensions recommended in
`.vscode/extensions.json`: Vue (Official), ESLint, oxc, Prettier and EditorConfig.
