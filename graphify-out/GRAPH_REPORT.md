# Graph Report - .  (2026-04-18)

## Corpus Check
- Corpus is ~36,887 words - fits in a single context window. You may not need a graph.

## Summary
- 201 nodes · 141 edges · 94 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Game Engine Core|Game Engine Core]]
- [[_COMMUNITY_Project Architecture & Config|Project Architecture & Config]]
- [[_COMMUNITY_Directory Structure|Directory Structure]]
- [[_COMMUNITY_Toast Notification System|Toast Notification System]]
- [[_COMMUNITY_Game Design & Narrative|Game Design & Narrative]]
- [[_COMMUNITY_Admin Event Management|Admin Event Management]]
- [[_COMMUNITY_Pagination UI|Pagination UI]]
- [[_COMMUNITY_Event Form & Choices|Event Form & Choices]]
- [[_COMMUNITY_Image Upload|Image Upload]]
- [[_COMMUNITY_Phase Admin CMS|Phase Admin CMS]]
- [[_COMMUNITY_Game Settings Admin|Game Settings Admin]]
- [[_COMMUNITY_Sidebar UI|Sidebar UI]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Event Card UI|Event Card UI]]
- [[_COMMUNITY_GameEngine Component|GameEngine Component]]
- [[_COMMUNITY_Chart UI|Chart UI]]
- [[_COMMUNITY_Auth Form|Auth Form]]
- [[_COMMUNITY_Game HUD|Game HUD]]
- [[_COMMUNITY_Game Menu Bar|Game Menu Bar]]
- [[_COMMUNITY_Escape Cinematic|Escape Cinematic]]
- [[_COMMUNITY_Pixel Helicopter|Pixel Helicopter]]
- [[_COMMUNITY_Pixel People|Pixel People]]
- [[_COMMUNITY_Badge UI|Badge UI]]
- [[_COMMUNITY_Calendar UI|Calendar UI]]
- [[_COMMUNITY_Carousel UI|Carousel UI]]
- [[_COMMUNITY_Skeleton UI|Skeleton UI]]
- [[_COMMUNITY_Sonner Toast UI|Sonner Toast UI]]
- [[_COMMUNITY_Mobile Detection Hook|Mobile Detection Hook]]
- [[_COMMUNITY_Auth Hook|Auth Hook]]
- [[_COMMUNITY_Game Events Hook|Game Events Hook]]
- [[_COMMUNITY_Game Save Hook|Game Save Hook]]
- [[_COMMUNITY_Game State Hook|Game State Hook]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Admin Page|Admin Page]]
- [[_COMMUNITY_Auth Page|Auth Page]]
- [[_COMMUNITY_Game Page|Game Page]]
- [[_COMMUNITY_History Page|History Page]]
- [[_COMMUNITY_404 Page|404 Page]]
- [[_COMMUNITY_Title Screen|Title Screen]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Env Types|Env Types]]
- [[_COMMUNITY_Router Config|Router Config]]
- [[_COMMUNITY_Game Over Screen|Game Over Screen]]
- [[_COMMUNITY_Phase Intro Screen|Phase Intro Screen]]
- [[_COMMUNITY_Stats Bar|Stats Bar]]
- [[_COMMUNITY_Travel Animation|Travel Animation]]
- [[_COMMUNITY_Pixel Boat Scene|Pixel Boat Scene]]
- [[_COMMUNITY_Accordion UI|Accordion UI]]
- [[_COMMUNITY_Alert Dialog UI|Alert Dialog UI]]
- [[_COMMUNITY_Alert UI|Alert UI]]
- [[_COMMUNITY_Aspect Ratio UI|Aspect Ratio UI]]
- [[_COMMUNITY_Avatar UI|Avatar UI]]
- [[_COMMUNITY_Breadcrumb UI|Breadcrumb UI]]
- [[_COMMUNITY_Button UI|Button UI]]
- [[_COMMUNITY_Card UI|Card UI]]
- [[_COMMUNITY_Checkbox UI|Checkbox UI]]
- [[_COMMUNITY_Collapsible UI|Collapsible UI]]
- [[_COMMUNITY_Command UI|Command UI]]
- [[_COMMUNITY_Context Menu UI|Context Menu UI]]
- [[_COMMUNITY_Dialog UI|Dialog UI]]
- [[_COMMUNITY_Drawer UI|Drawer UI]]
- [[_COMMUNITY_Dropdown Menu UI|Dropdown Menu UI]]
- [[_COMMUNITY_Form UI|Form UI]]
- [[_COMMUNITY_Hover Card UI|Hover Card UI]]
- [[_COMMUNITY_Input OTP UI|Input OTP UI]]
- [[_COMMUNITY_Input UI|Input UI]]
- [[_COMMUNITY_Label UI|Label UI]]
- [[_COMMUNITY_Menubar UI|Menubar UI]]
- [[_COMMUNITY_Navigation Menu UI|Navigation Menu UI]]
- [[_COMMUNITY_Popover UI|Popover UI]]
- [[_COMMUNITY_Progress UI|Progress UI]]
- [[_COMMUNITY_Radio Group UI|Radio Group UI]]
- [[_COMMUNITY_Resizable UI|Resizable UI]]
- [[_COMMUNITY_Scroll Area UI|Scroll Area UI]]
- [[_COMMUNITY_Select UI|Select UI]]
- [[_COMMUNITY_Separator UI|Separator UI]]
- [[_COMMUNITY_Sheet UI|Sheet UI]]
- [[_COMMUNITY_Slider UI|Slider UI]]
- [[_COMMUNITY_Switch UI|Switch UI]]
- [[_COMMUNITY_Table UI|Table UI]]
- [[_COMMUNITY_Tabs UI|Tabs UI]]
- [[_COMMUNITY_Textarea UI|Textarea UI]]
- [[_COMMUNITY_Toast UI|Toast UI]]
- [[_COMMUNITY_Toaster UI|Toaster UI]]
- [[_COMMUNITY_Toggle Group UI|Toggle Group UI]]
- [[_COMMUNITY_Toggle UI|Toggle UI]]
- [[_COMMUNITY_Tooltip UI|Tooltip UI]]
- [[_COMMUNITY_use-toast Hook|use-toast Hook]]
- [[_COMMUNITY_Supabase Client|Supabase Client]]
- [[_COMMUNITY_Supabase Types|Supabase Types]]
- [[_COMMUNITY_Index Page|Index Page]]

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md Project Guidance` - 9 edges
2. `Supabase Schema` - 9 edges
3. `Game Loop (4-Phase Day Cycle)` - 6 edges
4. `State Management (3-Hook Architecture)` - 6 edges
5. `GameEngine.tsx` - 6 edges
6. `Code Guideline Document` - 6 edges
7. `Project Directory Structure` - 6 edges
8. `useGameSave Hook` - 5 edges
9. `profiles Table` - 5 edges
10. `src/hooks/ Directory` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Placeholder SVG (Image Placeholder UI Element)` --conceptually_related_to--> `Design System (Retro Pixel-Art)`  [INFERRED]
  public/placeholder.svg → CLAUDE.md
- `Placeholder SVG (Image Placeholder UI Element)` --references--> `public/ Directory`  [INFERRED]
  public/placeholder.svg → CodeGuideline.md
- `src/hooks/ Directory` --references--> `useGameState Hook`  [INFERRED]
  CodeGuideline.md → CLAUDE.md
- `src/hooks/ Directory` --references--> `useGameEvents Hook`  [INFERRED]
  CodeGuideline.md → CLAUDE.md
- `src/hooks/ Directory` --references--> `useGameSave Hook`  [INFERRED]
  CodeGuideline.md → CLAUDE.md

## Hyperedges (group relationships)
- **Core Game Hook Triad** — claude_hook_useGameState, claude_hook_useGameEvents, claude_hook_useGameSave [EXTRACTED 1.00]
- **All Supabase Tables** — claude_table_profiles, claude_table_game_phases, claude_table_game_events, claude_table_game_saves, claude_table_game_runs, claude_table_game_settings [EXTRACTED 1.00]
- **Core Game Loop Mechanics** — game_stats_concept, game_starvation_mechanic, game_event_system, game_phases_concept [EXTRACTED 1.00]
- **Full Tech Stack** — claude_tech_stack, claude_supabase_backend, claude_design_system, claude_routing [EXTRACTED 0.95]
- **Project Documentation Set** — claude_project_guidance, codeguideline_doc, readme_doc [EXTRACTED 1.00]

## Communities

### Community 0 - "Game Engine Core"
Cohesion: 0.2
Nodes (17): GameEngine.tsx, useAuth Hook, useGameEvents Hook, useGameSave Hook, useGameState Hook, Rationale: GameEngine.tsx as Single Entry Point, Rationale: No Global Store â€” Logic in Three Hooks, Row Level Security Policy (+9 more)

### Community 1 - "Project Architecture & Config"
Cohesion: 0.17
Nodes (15): Design System (Retro Pixel-Art), CLAUDE.md Project Guidance, Rationale: Route name Field for Enter.pro Tooling, Routing (router.tsx + App.tsx), Supabase Backend (EnterCloud), Tech Stack (Vite + React 19 + TypeScript + shadcn/ui + Tailwind), Component 100-Line Size Limit, Code Guideline Document (+7 more)

### Community 2 - "Directory Structure"
Cohesion: 0.25
Nodes (8): src/components/ Directory, src/hooks/ Directory, src/lib/ Directory, src/pages/ Directory, public/ Directory, Project Directory Structure, Placeholder SVG (Image Placeholder UI Element), robots.txt (SEO Crawl Permissions)

### Community 3 - "Toast Notification System"
Cohesion: 0.48
Nodes (5): addToRemoveQueue(), dispatch(), genId(), reducer(), toast()

### Community 4 - "Game Design & Narrative"
Cohesion: 0.38
Nodes (7): Game Loop (4-Phase Day Cycle), Oregon Trail-Style Game Concept, Vietnam War Diaspora Narrative Theme, Random Event System (70% daily chance, JSONB choices), 4 Game Phases (Vietnam â†’ Boat â†’ Camp â†’ America), Starvation Mechanic (food=0 â†’ health -10/day), Player Stats (health, food, morale, money)

### Community 5 - "Admin Event Management"
Cohesion: 0.33
Nodes (0): 

### Community 6 - "Pagination UI"
Cohesion: 0.33
Nodes (0): 

### Community 7 - "Event Form & Choices"
Cohesion: 0.4
Nodes (0): 

### Community 8 - "Image Upload"
Cohesion: 0.6
Nodes (3): handleDrop(), handleFileSelect(), uploadFile()

### Community 9 - "Phase Admin CMS"
Cohesion: 0.5
Nodes (0): 

### Community 10 - "Game Settings Admin"
Cohesion: 0.5
Nodes (0): 

### Community 11 - "Sidebar UI"
Cohesion: 0.5
Nodes (0): 

### Community 12 - "App Entry Point"
Cohesion: 0.67
Nodes (0): 

### Community 13 - "Event Card UI"
Cohesion: 0.67
Nodes (0): 

### Community 14 - "GameEngine Component"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "Chart UI"
Cohesion: 0.67
Nodes (0): 

### Community 16 - "Auth Form"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Game HUD"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Game Menu Bar"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Escape Cinematic"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Pixel Helicopter"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Pixel People"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Badge UI"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Calendar UI"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Carousel UI"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Skeleton UI"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Sonner Toast UI"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Mobile Detection Hook"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Auth Hook"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Game Events Hook"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Game Save Hook"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Game State Hook"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Utility Functions"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Admin Page"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Auth Page"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Game Page"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "History Page"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "404 Page"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Title Screen"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Tailwind Config"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Env Types"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Router Config"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Game Over Screen"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Phase Intro Screen"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Stats Bar"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Travel Animation"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Pixel Boat Scene"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Accordion UI"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Alert Dialog UI"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Alert UI"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Aspect Ratio UI"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Avatar UI"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Breadcrumb UI"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Button UI"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Card UI"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Checkbox UI"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Collapsible UI"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Command UI"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Context Menu UI"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Dialog UI"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Drawer UI"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Dropdown Menu UI"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Form UI"
Cohesion: 1.0
Nodes (0): 

### Community 66 - "Hover Card UI"
Cohesion: 1.0
Nodes (0): 

### Community 67 - "Input OTP UI"
Cohesion: 1.0
Nodes (0): 

### Community 68 - "Input UI"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Label UI"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Menubar UI"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Navigation Menu UI"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Popover UI"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Progress UI"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Radio Group UI"
Cohesion: 1.0
Nodes (0): 

### Community 75 - "Resizable UI"
Cohesion: 1.0
Nodes (0): 

### Community 76 - "Scroll Area UI"
Cohesion: 1.0
Nodes (0): 

### Community 77 - "Select UI"
Cohesion: 1.0
Nodes (0): 

### Community 78 - "Separator UI"
Cohesion: 1.0
Nodes (0): 

### Community 79 - "Sheet UI"
Cohesion: 1.0
Nodes (0): 

### Community 80 - "Slider UI"
Cohesion: 1.0
Nodes (0): 

### Community 81 - "Switch UI"
Cohesion: 1.0
Nodes (0): 

### Community 82 - "Table UI"
Cohesion: 1.0
Nodes (0): 

### Community 83 - "Tabs UI"
Cohesion: 1.0
Nodes (0): 

### Community 84 - "Textarea UI"
Cohesion: 1.0
Nodes (0): 

### Community 85 - "Toast UI"
Cohesion: 1.0
Nodes (0): 

### Community 86 - "Toaster UI"
Cohesion: 1.0
Nodes (0): 

### Community 87 - "Toggle Group UI"
Cohesion: 1.0
Nodes (0): 

### Community 88 - "Toggle UI"
Cohesion: 1.0
Nodes (0): 

### Community 89 - "Tooltip UI"
Cohesion: 1.0
Nodes (0): 

### Community 90 - "use-toast Hook"
Cohesion: 1.0
Nodes (0): 

### Community 91 - "Supabase Client"
Cohesion: 1.0
Nodes (0): 

### Community 92 - "Supabase Types"
Cohesion: 1.0
Nodes (0): 

### Community 93 - "Index Page"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **14 isolated node(s):** `src/integrations/supabase/types.ts`, `Rationale: No Global Store â€” Logic in Three Hooks`, `Rationale: GameEngine.tsx as Single Entry Point`, `Rationale: Route name Field for Enter.pro Tooling`, `src/components/ Directory` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Auth Form`** (2 nodes): `handleSubmit()`, `AuthForm.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game HUD`** (2 nodes): `GameHUD()`, `GameHUD.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Menu Bar`** (2 nodes): `MenuButton()`, `GameMenuBar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Escape Cinematic`** (2 nodes): `Typewriter()`, `EscapingVietnamCinematic.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pixel Helicopter`** (2 nodes): `PixelHelicopter()`, `PixelHelicopter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pixel People`** (2 nodes): `getCellColor()`, `PixelPeople.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge UI`** (2 nodes): `Badge()`, `badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Calendar UI`** (2 nodes): `Calendar()`, `calendar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Carousel UI`** (2 nodes): `useCarousel()`, `carousel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Skeleton UI`** (2 nodes): `Skeleton()`, `skeleton.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sonner Toast UI`** (2 nodes): `Toaster()`, `sonner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mobile Detection Hook`** (2 nodes): `use-mobile.tsx`, `useIsMobile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Hook`** (2 nodes): `useAuth.ts`, `useAuth()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Events Hook`** (2 nodes): `useGameEvents.ts`, `useGameEvents()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Save Hook`** (2 nodes): `useGameSave.ts`, `useGameSave()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game State Hook`** (2 nodes): `useGameState.ts`, `useGameState()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utility Functions`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Page`** (2 nodes): `AdminPage()`, `AdminPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Page`** (2 nodes): `AuthPage()`, `AuthPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Page`** (2 nodes): `GamePage()`, `GamePage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `History Page`** (2 nodes): `fetchRuns()`, `HistoryPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `404 Page`** (2 nodes): `NotFound()`, `NotFound.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Title Screen`** (2 nodes): `TitleScreen.tsx`, `checkSave()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tailwind Config`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Env Types`** (1 nodes): `env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Router Config`** (1 nodes): `router.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Game Over Screen`** (1 nodes): `GameOver.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phase Intro Screen`** (1 nodes): `PhaseIntro.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stats Bar`** (1 nodes): `StatsBar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Travel Animation`** (1 nodes): `TravelAnimation.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pixel Boat Scene`** (1 nodes): `PixelBoat.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Accordion UI`** (1 nodes): `accordion.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Alert Dialog UI`** (1 nodes): `alert-dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Alert UI`** (1 nodes): `alert.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Aspect Ratio UI`** (1 nodes): `aspect-ratio.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Avatar UI`** (1 nodes): `avatar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Breadcrumb UI`** (1 nodes): `breadcrumb.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button UI`** (1 nodes): `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Card UI`** (1 nodes): `card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Checkbox UI`** (1 nodes): `checkbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Collapsible UI`** (1 nodes): `collapsible.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Command UI`** (1 nodes): `command.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Context Menu UI`** (1 nodes): `context-menu.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dialog UI`** (1 nodes): `dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Drawer UI`** (1 nodes): `drawer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dropdown Menu UI`** (1 nodes): `dropdown-menu.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form UI`** (1 nodes): `form.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hover Card UI`** (1 nodes): `hover-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input OTP UI`** (1 nodes): `input-otp.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input UI`** (1 nodes): `input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Label UI`** (1 nodes): `label.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Menubar UI`** (1 nodes): `menubar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navigation Menu UI`** (1 nodes): `navigation-menu.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Popover UI`** (1 nodes): `popover.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Progress UI`** (1 nodes): `progress.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Radio Group UI`** (1 nodes): `radio-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Resizable UI`** (1 nodes): `resizable.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Area UI`** (1 nodes): `scroll-area.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Select UI`** (1 nodes): `select.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Separator UI`** (1 nodes): `separator.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sheet UI`** (1 nodes): `sheet.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Slider UI`** (1 nodes): `slider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Switch UI`** (1 nodes): `switch.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Table UI`** (1 nodes): `table.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tabs UI`** (1 nodes): `tabs.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Textarea UI`** (1 nodes): `textarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toast UI`** (1 nodes): `toast.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toaster UI`** (1 nodes): `toaster.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toggle Group UI`** (1 nodes): `toggle-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toggle UI`** (1 nodes): `toggle.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tooltip UI`** (1 nodes): `tooltip.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `use-toast Hook`** (1 nodes): `use-toast.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Client`** (1 nodes): `client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Types`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Index Page`** (1 nodes): `Index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md Project Guidance` connect `Project Architecture & Config` to `Game Engine Core`, `Game Design & Narrative`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Supabase Schema` connect `Game Engine Core` to `Project Architecture & Config`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `Game Loop (4-Phase Day Cycle)` connect `Game Design & Narrative` to `Project Architecture & Config`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `src/integrations/supabase/types.ts`, `Rationale: No Global Store â€” Logic in Three Hooks`, `Rationale: GameEngine.tsx as Single Entry Point` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._