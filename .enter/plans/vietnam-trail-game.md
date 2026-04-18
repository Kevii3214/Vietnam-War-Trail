# Vietnam Trail - Oregon Trail Style Diaspora Game

## Context
Build an Oregon Trail-style game themed around the Vietnam War diaspora experience. The game has 4 phases with random events, classic survival stats, auth-based progress saving, and an admin CMS for the owner to manage all game content (events, storylines, art).

---

## Phase Structure (4 Phases)
1. **Escaping Vietnam** - fleeing the city/countryside
2. **Traveling by Boat** - the perilous ocean journey
3. **Refugee Camp** - landing + camp life combined
4. **Making it to America** - resettlement and new beginnings

## Player Stats
- **Health** (0-100)
- **Food** (0-100)
- **Morale** (0-100)
- **Money** (numeric, spend on choices)

---

## 1. Database Schema (Supabase Migration)

### Tables:
- **profiles** - `id (uuid, FK auth.users)`, `username`, `is_admin (bool)`, `created_at`
  - Trigger on `auth.users` insert to auto-create profile
- **game_phases** - `id`, `name`, `description`, `phase_order (1-4)`, `image_url`, `created_at`
  - Admin-managed phase definitions
- **game_events** - `id`, `phase_id (FK)`, `title`, `description`, `image_url`, `choices (jsonb)`, `is_active (bool)`, `created_at`
  - Each event has choices as JSONB: `[{text, health_delta, food_delta, morale_delta, money_delta, result_text}]`
- **game_saves** - `id`, `user_id (FK)`, `current_phase_id (FK)`, `day_in_phase`, `health`, `food`, `morale`, `money`, `events_seen (jsonb)`, `updated_at`
  - One active save per user
- **game_runs** - `id`, `user_id (FK)`, `outcome (completed|died|gave_up)`, `final_phase`, `final_day`, `final_stats (jsonb)`, `completed_at`
  - History of all past runs

### RLS Policies:
- `profiles`: Users read own, admin reads all
- `game_phases` / `game_events`: Anyone authenticated can read; only admins can insert/update/delete
- `game_saves`: Users CRUD own saves only
- `game_runs`: Users read own runs only

---

## 2. Design System

Retro pixel-art inspired theme:
- **Dark background** with warm amber/green accent colors (classic terminal/retro game feel)
- **Monospace font** (`"Press Start 2P"` or similar pixel font from Google Fonts, fallback to monospace)
- Custom CSS tokens for game-specific colors (jungle green, ocean blue, camp tan, city amber)
- Scanline/CRT overlay effect (optional CSS)
- Pixel-perfect borders using `border` utilities

### Key Design Tokens:
- `--game-bg`: Deep dark (near black)
- `--game-text`: Amber/warm white
- `--game-accent`: Retro green
- `--game-danger`: Red for health warnings
- `--game-phase-1` through `--game-phase-4`: Phase-specific accent colors

---

## 3. Frontend Architecture

### Pages & Routes:
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `TitleScreen` | Game title, Start/Continue/Login buttons |
| `/auth` | `AuthPage` | Login + Signup forms |
| `/game` | `GamePage` | Main game screen (protected) |
| `/history` | `HistoryPage` | Past run history (protected) |
| `/admin` | `AdminPage` | CMS for phases & events (admin-only) |

### Core Game Components:
- `src/components/game/GameEngine.tsx` - Main game state machine & logic
- `src/components/game/PhaseIntro.tsx` - Phase transition screen
- `src/components/game/EventCard.tsx` - Displays random event + choices
- `src/components/game/StatsBar.tsx` - HUD showing Health/Food/Morale/Money
- `src/components/game/GameOver.tsx` - Death/completion screen
- `src/components/game/TravelAnimation.tsx` - Between-event travel display

### Admin Components:
- `src/components/admin/PhaseManager.tsx` - CRUD for phases
- `src/components/admin/EventManager.tsx` - CRUD for events per phase
- `src/components/admin/EventForm.tsx` - Form for creating/editing events with choices

### Auth:
- `src/hooks/useAuth.ts` - Auth state management hook
- `src/components/auth/AuthForm.tsx` - Login/signup form component
- `src/components/auth/ProtectedRoute.tsx` - Route guard

### Game Logic (hooks):
- `src/hooks/useGameState.ts` - Core game state (stats, phase, day)
- `src/hooks/useGameEvents.ts` - Fetch & randomize events for current phase
- `src/hooks/useGameSave.ts` - Save/load game from database

---

## 4. Game Loop Logic

```
1. Player starts new game or loads save
2. Initialize stats: Health=100, Food=80, Morale=70, Money=50
3. Enter Phase 1 (show PhaseIntro)
4. Each "day":
   a. Show travel progress
   b. Random chance of event (70%) or peaceful day (30%)
   c. If event: show EventCard with choices from DB
   d. Apply stat changes from chosen option
   e. Check for death (any stat hits 0 = game over)
   f. After X days in phase, advance to next phase
5. Complete Phase 4 = Victory
6. Save run to game_runs table
```

### Phase Progression:
- Each phase has a configurable number of days (default: 10-15 per phase)
- Events are randomly selected from the pool for that phase
- Events already seen in this run are tracked to avoid repeats

---

## 5. Implementation Order

### Step 1: Database + Auth
- Create all tables with migrations
- Set up RLS policies
- Configure auth (auto-confirm email)
- Create auth hook + protected routes

### Step 2: Design System + Layout
- Update `index.css` with retro game tokens
- Update `tailwind.config.ts` with game colors
- Add pixel font
- Build base layout components

### Step 3: Title Screen + Auth Pages
- Title screen with retro styling
- Login/signup page

### Step 4: Game Engine + Core Loop
- Game state management hooks
- StatsBar, EventCard, PhaseIntro, GameOver components
- Main GamePage with game loop
- Save/load functionality

### Step 5: Admin Panel
- Phase manager (CRUD)
- Event manager with choice builder
- Admin route protection

### Step 6: History Page
- Display past runs with stats

---

## 6. Files to Create/Modify

### Modify:
- `src/index.css` - Retro design tokens
- `tailwind.config.ts` - Game colors + font
- `index.html` - Add pixel font link
- `src/router.tsx` - Add all routes
- `src/App.tsx` - Add auth provider context

### Create:
- `src/hooks/useAuth.ts`
- `src/hooks/useGameState.ts`
- `src/hooks/useGameEvents.ts`
- `src/hooks/useGameSave.ts`
- `src/components/auth/AuthForm.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/components/game/GameEngine.tsx`
- `src/components/game/StatsBar.tsx`
- `src/components/game/EventCard.tsx`
- `src/components/game/PhaseIntro.tsx`
- `src/components/game/GameOver.tsx`
- `src/components/game/TravelAnimation.tsx`
- `src/components/admin/PhaseManager.tsx`
- `src/components/admin/EventManager.tsx`
- `src/components/admin/EventForm.tsx`
- `src/pages/TitleScreen.tsx`
- `src/pages/AuthPage.tsx`
- `src/pages/GamePage.tsx`
- `src/pages/HistoryPage.tsx`
- `src/pages/AdminPage.tsx`

---

## 7. Verification

- **Auth**: Sign up, log in, see profile created
- **Game**: Start new game, see stats bar, encounter random event, make choice, see stat changes
- **Phase transitions**: Progress through all 4 phases
- **Save/Load**: Close game, reopen, continue from saved state
- **Admin**: Create a phase, add events with choices, see them appear in game
- **History**: Complete a run, see it in history page
- **Death**: Let a stat hit 0, see game over screen
