# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start local dev server (Vite)
npm run build        # Dev build (NODE_ENV=development)
npm run build:prod   # Production build
npm run lint         # ESLint
npm run preview      # Preview production build
```

There are no automated tests in this project.

## Context Navigation
When you need the codebase, docs, or any files in this project:
1. ALWAYS query the knowledge graph first: `/graphify query "your question"`
2. Only read raw files if the user explicitly says "read the file" or "look at the raw file"
3. Use `graphify-out/GRAPH_REPORT.md` for structure overview, or open `graphify-out/obsidian/` as an Obsidian vault for community-level navigation

## Architecture Overview

This is an **Oregon Trail-style Vietnam War diaspora game** built with Vite + React 19 + TypeScript + shadcn/ui + Tailwind CSS. The backend is a managed Supabase instance (EnterCloud).

### Game Loop

The game has 4 ordered phases (Escaping Vietnam → Boat → Refugee Camp → America). Each phase has a configurable number of days. Each day:
1. Food drains randomly (2–5 units). If food hits 0, health drops 10/day (starvation).
2. 70% chance of a random event from the current phase's event pool. Events have JSONB choices that apply stat deltas.
3. Any stat hitting zero triggers game over (health/morale = death; food = starvation path).
4. After phase's day count is reached, advance to next phase. Completing phase 4 = victory.

### State Management

All game logic lives in three hooks — no global store:

- **`useGameState`** — owns the `GameState` struct (`currentPhaseOrder`, `dayInPhase`, `stats`, `eventsSeen`, `isGameOver`, `isVictory`). Starting stats are fetched from the `game_settings` Supabase table on mount. Exposes: `startNewGame`, `loadGameState`, `applyStatChanges`, `advanceDay`, `markEventSeen`, `triggerPhaseIntro`.
- **`useGameEvents`** — fetches and randomizes events for the current phase, filters out already-seen events.
- **`useGameSave`** — reads/writes the `game_saves` table (one save per user). Also writes completed runs to `game_runs`.
- **`useAuth`** — Supabase auth session, profile, and admin flag.

`GameEngine.tsx` composes all three hooks and drives the render. It is the entry point for all game logic changes.

### Supabase Schema

Tables (all in `src/integrations/supabase/types.ts`):
- `profiles` — auto-created via DB trigger on `auth.users` insert; includes `is_admin` flag.
- `game_phases` — ordered phases (1–4), admin-managed.
- `game_events` — linked to a phase; choices stored as JSONB `[{text, health_delta, food_delta, morale_delta, money_delta, result_text}]`.
- `game_saves` — one active save per user (`user_id` unique).
- `game_runs` — append-only history of completed/died runs.
- `game_settings` — key/value table for configurable starting stats (`starting_health`, `starting_food`, `starting_morale`, `starting_money`).

RLS: authenticated users read phases/events; only `is_admin=true` profiles can mutate them.

### Routing

Routes are declared in `src/router.tsx` and consumed by `src/App.tsx`. **All new routes must be added to `router.tsx` above the `"*"` catch-all.** Route objects require a `name` field (used by Enter.pro tooling via `window.__routers__`).

### Key Conventions (from CodeGuideline.md)

- New pages go in `src/pages/<PageName>.tsx`; register in `router.tsx`.
- Page-specific components live in the page file or alongside it; truly reusable ones go in `src/components/`.
- Each hook file exports exactly one hook.
- Use `PascalCase` for components, `camelCase` for hooks/utilities.
- Keep components under ~100 lines; extract subcomponents if larger.

### Design System

Retro pixel-art aesthetic. CSS custom properties defined in `src/index.css`:
- `--game-bg`, `--game-text`, `--game-accent`, `--game-danger`
- `--game-phase-1` through `--game-phase-4` for phase-specific colors

Pixel font ("Press Start 2P") loaded via `index.html`. Tailwind extended in `tailwind.config.ts` with game color tokens.
