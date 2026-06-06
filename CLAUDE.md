# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

```bash
npm run dev      # Start dev server → http://localhost:3000
npm run build    # Static export → out/
npm run lint     # ESLint (TypeScript + React)
npm test         # Vitest
npm run test:ui  # Vitest UI
```

The project uses **Next.js 14.2.5** (app router, static export) with **React 18.3**, **TypeScript 5.5**, and **Vitest 2.0**.

PNGs in `_review/` are reference screenshots — not part of the runtime.

## Architecture

### Directory structure

```
src/
├── app/                # Next.js app router (layout.tsx, page.tsx)
├── App.tsx             # Root component: routing, theming, event bus, modal state
├── types/index.ts      # All TypeScript types (Deal, Customer, Page, TweakValues, etc.)
├── utils/              # eventBus.ts, initials.ts, avatarColor.ts
├── hooks/              # useTweaks.ts, useToasts.ts, useHelixDb.ts
├── data/               # seedData.ts, seed.ts, inMemoryDb.ts
├── styles/             # CSS tokens + modular component/view styles
├── components/
│   ├── Icon/           # 67 inline SVG icons
│   ├── Sidebar/        # Navigation sidebar
│   ├── Topbar/         # Top bar with breadcrumbs, search, actions
│   ├── Charts/         # RevenueChart, GrowthChart, DonutChart, Sparkline, Counter
│   ├── Pipeline/       # Kanban board with HTML5 drag-and-drop
│   ├── Customers/      # CustomersTable, CustomerDrawer
│   ├── Modals/         # Modal shell + NewDeal, NewContact, NewEvent, NewAutomation, Compose, ConfirmDialog
│   ├── Popovers/       # Popover shell + Notifications, UserMenu, WorkspaceSwitcher
│   ├── AIInsights/     # AIInsights card, ActivityFeed, CommandPalette, Toasts
│   └── TweaksPanel/    # Floating settings panel + form controls
├── panels/             # AIAssistantPanel, HelpWidget
└── views/              # 11 page views (Dashboard, Pipeline, Contacts, Deals, Inbox, etc.)
public/
└── data.js             # Runtime in-memory DB (window.HELIX_DB) loaded via <script>
```

### Module system

All code uses **ESM imports/exports** with `@/` path aliases (maps to `src/`). Every component directory has an `index.ts` barrel export. No global namespace — imports replace the old `window.X` pattern.

### Routing

`App.tsx` switches on a `page` string (`'dashboard' | 'pipeline' | 'contacts' | 'deals' | 'inbox' | 'reports' | 'automations' | 'calendar' | 'chat' | 'settings' | 'components'`). Nav items are defined in `src/components/Sidebar/Sidebar.tsx` (`NAV_MAIN`, `NAV_WORK`, `NAV_RESOURCES`). Adding a page = add to one of those arrays + add a case in `App.tsx`.

### Cross-component communication: custom DOM events

Components dispatch `window.dispatchEvent(new CustomEvent(...))` via typed helpers in `src/utils/eventBus.ts`:

| Event | Dispatch function | Handler in App.tsx |
|-------|------------------|-------------------|
| `helix:new-deal` | `dispatchNewDeal()` | Opens NewDealModal |
| `helix:new-contact` | `dispatchNewContact()` | Opens NewContactModal |
| `helix:new-event` | `dispatchNewEvent()` | Opens NewEventModal |
| `helix:new-automation` | `dispatchNewAutomation()` | Opens NewAutomationModal |
| `helix:compose` | `dispatchCompose()` | Opens ComposeModal |
| `helix:open-ai` | `dispatchOpenAi()` | Opens AIAssistantPanel |
| `helix:openpalette` | `dispatchOpenPalette()` | Opens CommandPalette |
| `helix:confirm` | `dispatchConfirm(config)` | Opens ConfirmDialog |
| `helix:toast` | `dispatchToast(message)` | Pushes a toast |

### Theming

Theme is `[data-theme="dark|light"]` on `<html>`, applied in `App.tsx`. Accent color (5 presets: `indigo`, `emerald`, `rose`, `amber`, `slate`) is written to CSS custom properties `--a1`/`--a2`/`--a3`/`--accent` on `:root`. Density (`compact`/`comfy`/`spacious`) sets `--density` which scales the `--pad-*` token family. **All styling uses CSS custom property tokens** — see `src/styles/tokens.css`.

### Tweaks panel & EDITMODE block

The `TWEAK_DEFAULTS` constant in `src/App.tsx` is wrapped in `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` sentinels. The host rewrites the JSON inside that block on disk when tweaks change. **Do not move, rename, or reformat these sentinels.** The tweaks panel communicates with a host iframe via `postMessage` (`__activate_edit_mode`, `__edit_mode_set_keys`, `__edit_mode_dismissed`).

### Data layer

**Seed data** is in `src/data/seedData.ts` (typed static data for components). The **runtime database** is `public/data.js` — an in-memory store loaded via a regular `<script>` tag that provides CRUD, localStorage persistence, JSON export, and subscription-based reactivity. Components that need reactive data use the `useHelixTable()` hook which wraps `useSyncExternalStore`.

### Pipeline drag-and-drop

`Pipeline.tsx` uses native HTML5 drag-and-drop. It calls `moveDeal()` on the DB and bumps `deal.progress` to a hardcoded value per stage index (`[18, 40, 60, 80, 100]`). The same component renders on both Dashboard and the dedicated Pipeline view.

### GitHub Pages

The project is configured for GitHub Pages static export via `.github/workflows/nextjs.yml`. The workflow uses `actions/configure-pages@v5` to detect the `public/CNAME` (custom domain `helixcrm.zenovasolution.xyz`) and sets `NEXT_PUBLIC_BASE_PATH` accordingly. Config file must be `next.config.mjs` (not `.cjs` — Next.js doesn't load `.cjs` configs).
