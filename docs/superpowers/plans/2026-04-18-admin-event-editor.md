# Admin Event Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the admin event editor with per-choice probabilistic outcomes, per-event probability weights, day-in-phase probability schedules, and phase-skip on outcome.

**Architecture:** Two new DB columns on `game_events` (`probability_weight`, `day_weights`) hold event-level probability data. Choice-level outcomes live in the existing `choices` JSONB column as an `outcomes[]` array per choice. `useGameEvents` handles weighted random selection; `GameEngine` resolves outcomes probabilistically and handles phase-skip.

**Tech Stack:** React 19, TypeScript, Supabase (JSONB), Vite, Tailwind CSS, shadcn/ui

---

## File Map

| File | Action |
|------|--------|
| Supabase SQL editor | Run migration to add 2 columns |
| `src/integrations/supabase/types.ts` | Add `probability_weight`, `day_weights` to game_events types |
| `src/hooks/useGameEvents.ts` | New `EventOutcome` type, update `EventChoice`/`GameEvent`, add `normalizeChoice`, `pickRandomOutcome`, update `getRandomEvent` |
| `src/hooks/useGameState.ts` | Add `jumpToPhase` function |
| `src/components/game/GameEngine.tsx` | Add `resolvedOutcome` state, pass `dayInPhase` to `getRandomEvent`, resolve outcome on choice, handle phase-skip |
| `src/components/game/EventCard.tsx` | Update to new `EventChoice` type (component is unused in game but must compile) |
| `src/components/admin/EventForm.tsx` | Complete rewrite: outcomes UI, day weights editor, probability_weight field, force phase dropdown |
| `src/components/admin/EventManager.tsx` | Pass new fields in create/update; deserialize `day_weights` for `initialData` |

---

## Task 1: DB Migration + Supabase Types

**Files:**
- Supabase SQL editor (manual step)
- Modify: `src/integrations/supabase/types.ts`

- [ ] **Step 1: Run migration in Supabase SQL editor**

Go to your Supabase project → SQL editor and run:

```sql
ALTER TABLE game_events ADD COLUMN probability_weight INTEGER NOT NULL DEFAULT 50;
ALTER TABLE game_events ADD COLUMN day_weights JSONB DEFAULT NULL;
```

- [ ] **Step 2: Update Supabase types for game_events Row**

In `src/integrations/supabase/types.ts`, find the `game_events` Row block and add the two new fields:

```ts
// Before (Row block):
        Row: {
          choices: Json
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_active: boolean | null
          phase_id: string
          title: string
        }

// After (Row block):
        Row: {
          choices: Json
          created_at: string | null
          day_weights: Json | null
          description: string
          id: string
          image_url: string | null
          is_active: boolean | null
          phase_id: string
          probability_weight: number
          title: string
        }
```

- [ ] **Step 3: Update Supabase types for game_events Insert**

```ts
// Before (Insert block):
        Insert: {
          choices?: Json
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          phase_id: string
          title: string
        }

// After (Insert block):
        Insert: {
          choices?: Json
          created_at?: string | null
          day_weights?: Json | null
          description: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          phase_id: string
          probability_weight?: number
          title: string
        }
```

- [ ] **Step 4: Update Supabase types for game_events Update**

```ts
// Before (Update block):
        Update: {
          choices?: Json
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          phase_id?: string
          title?: string
        }

// After (Update block):
        Update: {
          choices?: Json
          created_at?: string | null
          day_weights?: Json | null
          description?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          phase_id?: string
          probability_weight?: number
          title?: string
        }
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: no errors referencing `probability_weight` or `day_weights`.

- [ ] **Step 6: Commit**

```bash
git add src/integrations/supabase/types.ts
git commit -m "feat(db): add probability_weight and day_weights columns to game_events"
```

---

## Task 2: Update useGameEvents.ts

**Files:**
- Modify: `src/hooks/useGameEvents.ts`

- [ ] **Step 1: Replace the entire file with the new version**

```ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EventOutcome {
  probability: number;
  health_delta: number;
  food_delta: number;
  morale_delta: number;
  money_delta: number;
  result_text: string;
  force_phase_order?: number | null;
}

export interface EventChoice {
  text: string;
  outcomes: EventOutcome[];
}

export interface GameEvent {
  id: string;
  phase_id: string;
  title: string;
  description: string;
  image_url: string | null;
  choices: EventChoice[];
  is_active: boolean;
  probability_weight: number;
  day_weights: Record<string, number> | null;
}

export interface GamePhase {
  id: string;
  name: string;
  description: string | null;
  phase_order: number;
  image_url: string | null;
  days_in_phase: number;
}

function normalizeChoice(raw: unknown): EventChoice {
  if (raw && typeof raw === 'object' && 'outcomes' in raw) {
    return raw as EventChoice;
  }
  const old = raw as {
    text?: string;
    result_text?: string;
    health_delta?: number;
    food_delta?: number;
    morale_delta?: number;
    money_delta?: number;
  };
  return {
    text: old.text ?? '',
    outcomes: [{
      probability: 100,
      health_delta: old.health_delta ?? 0,
      food_delta: old.food_delta ?? 0,
      morale_delta: old.morale_delta ?? 0,
      money_delta: old.money_delta ?? 0,
      result_text: old.result_text ?? '',
      force_phase_order: null,
    }],
  };
}

function pickWeightedRandom<T>(items: T[], getWeight: (item: T) => number): T | null {
  const total = items.reduce((sum, item) => sum + getWeight(item), 0);
  if (total <= 0) return items[0] ?? null;
  let rand = Math.random() * total;
  for (const item of items) {
    rand -= getWeight(item);
    if (rand <= 0) return item;
  }
  return items[items.length - 1] ?? null;
}

export function pickRandomOutcome(outcomes: EventOutcome[]): EventOutcome | null {
  return pickWeightedRandom(outcomes, o => o.probability);
}

export function useGameEvents() {
  const [phases, setPhases] = useState<GamePhase[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [phasesRes, eventsRes] = await Promise.all([
      supabase.from('game_phases').select('*').order('phase_order'),
      supabase.from('game_events').select('*').eq('is_active', true),
    ]);

    if (phasesRes.data) setPhases(phasesRes.data as unknown as GamePhase[]);
    if (eventsRes.data) {
      setEvents(eventsRes.data.map(e => ({
        ...e,
        probability_weight: (e.probability_weight as number | undefined) ?? 50,
        day_weights: (e.day_weights as Record<string, number> | null) ?? null,
        choices: ((typeof e.choices === 'string' ? JSON.parse(e.choices) : e.choices) as unknown[]).map(normalizeChoice),
      })) as GameEvent[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getPhaseByOrder = useCallback((order: number): GamePhase | undefined => {
    return phases.find(p => p.phase_order === order);
  }, [phases]);

  const getRandomEvent = useCallback((phaseOrder: number, seenEventIds: string[], dayInPhase: number): GameEvent | null => {
    const phase = phases.find(p => p.phase_order === phaseOrder);
    if (!phase) return null;

    const getEffectiveProbability = (event: GameEvent): number => {
      if (event.day_weights && String(dayInPhase) in event.day_weights) {
        return event.day_weights[String(dayInPhase)];
      }
      return event.probability_weight;
    };

    const unseen = events.filter(
      e => e.phase_id === phase.id && !seenEventIds.includes(e.id) && getEffectiveProbability(e) > 0
    );

    if (unseen.length > 0) {
      return pickWeightedRandom(unseen, getEffectiveProbability);
    }

    const all = events.filter(
      e => e.phase_id === phase.id && getEffectiveProbability(e) > 0
    );
    return all.length > 0 ? pickWeightedRandom(all, getEffectiveProbability) : null;
  }, [phases, events]);

  return {
    phases,
    events,
    loading,
    getPhaseByOrder,
    getRandomEvent,
    refetch: fetchData,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: TypeScript errors in `GameEngine.tsx` and `EventCard.tsx` because they still use the old `EventChoice` shape. These will be fixed in Tasks 3–5.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGameEvents.ts
git commit -m "feat(events): add EventOutcome type, normalizeChoice compat, weighted getRandomEvent"
```

---

## Task 3: Fix EventCard.tsx for new EventChoice type

**Files:**
- Modify: `src/components/game/EventCard.tsx`

> Note: `EventCard` is not used in the live game (GameEngine builds event UI inline). This task only makes it compile cleanly.

- [ ] **Step 1: Replace EventCard.tsx with a version that uses the new types**

```tsx
import type { GameEvent, EventChoice } from '@/hooks/useGameEvents';

interface EventCardProps {
  event: GameEvent;
  onChoiceMade: (choice: EventChoice) => void;
}

export function EventCard({ event, onChoiceMade }: EventCardProps) {
  return (
    <div className="border border-primary/30 bg-card animate-fade-in-up p-4 space-y-3">
      <p className="font-pixel text-sm text-primary crt-glow">{event.title}</p>
      <p className="font-retro text-xl text-foreground leading-relaxed">{event.description}</p>
      <div className="space-y-2">
        {event.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onChoiceMade(choice)}
            className="w-full text-left px-3 py-2 border border-border hover:border-primary font-retro text-lg"
          >
            <span className="text-primary mr-2 font-pixel text-[10px]">{index + 1}.</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: errors now only in `GameEngine.tsx` and `EventManager.tsx` (still on old types).

- [ ] **Step 3: Commit**

```bash
git add src/components/game/EventCard.tsx
git commit -m "fix(EventCard): update to new EventChoice type with outcomes array"
```

---

## Task 4: Add jumpToPhase to useGameState

**Files:**
- Modify: `src/hooks/useGameState.ts`

- [ ] **Step 1: Add jumpToPhase callback**

Find the `triggerPhaseIntro` callback (around line 198) and add `jumpToPhase` right after it:

```ts
  const jumpToPhase = useCallback((phaseOrder: number) => {
    setGameState(prev => ({
      ...prev,
      currentPhaseOrder: phaseOrder,
      dayInPhase: 1,
      eventsSeen: [],
    }));
  }, []);
```

- [ ] **Step 2: Export jumpToPhase from the hook's return object**

Find the existing `return { ... }` at the bottom of `useGameState` and add `jumpToPhase` to it (keep all existing keys, just add one):

```ts
    jumpToPhase,   // add this line inside the existing return object
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useGameState.ts
git commit -m "feat(gameState): add jumpToPhase for phase-skip on event outcomes"
```

---

## Task 5: Update GameEngine.tsx

**Files:**
- Modify: `src/components/game/GameEngine.tsx`

- [ ] **Step 1: Update imports**

Replace the existing imports from `useGameEvents` and `useGameState` at the top of the file:

```ts
import { useGameState } from '@/hooks/useGameState';
import { useGameEvents, type EventChoice, type EventOutcome, pickRandomOutcome } from '@/hooks/useGameEvents';
import { useGameSave } from '@/hooks/useGameSave';
import type { GameEvent } from '@/hooks/useGameEvents';
```

- [ ] **Step 2: Destructure jumpToPhase from useGameState**

Find the `useGameState()` destructure (around line 72) and add `jumpToPhase`:

```ts
  const {
    gameState,
    showPhaseIntro,
    eventChance: eventChancePct,
    startNewGame,
    loadGameState,
    applyStatChanges,
    markEventSeen,
    advanceDay,
    setPhaseIntroSeen,
    triggerPhaseIntro,
    jumpToPhase,
  } = useGameState();
```

- [ ] **Step 3: Add resolvedOutcome state**

Find the state declarations block (around line 88, after `const [selectedChoice, ...]`) and add:

```ts
  const [resolvedOutcome, setResolvedOutcome] = useState<EventOutcome | null>(null);
```

- [ ] **Step 4: Update handleNextDay to pass dayInPhase and fix its dependency array**

Replace the `getRandomEvent` call inside `handleNextDay`:

```ts
// Before:
      const event = getRandomEvent(gameState.currentPhaseOrder, gameState.eventsSeen);

// After:
      const event = getRandomEvent(gameState.currentPhaseOrder, gameState.eventsSeen, gameState.dayInPhase);
```

Also update the `useCallback` dependency array for `handleNextDay` to include `gameState.dayInPhase`:

```ts
// Before:
  }, [gameState.currentPhaseOrder, gameState.eventsSeen, getRandomEvent, markEventSeen, eventChancePct]);

// After:
  }, [gameState.currentPhaseOrder, gameState.dayInPhase, gameState.eventsSeen, getRandomEvent, markEventSeen, eventChancePct]);
```

- [ ] **Step 5: Update handleChoiceMade to resolve a random outcome**

Replace the full `handleChoiceMade` function:

```ts
  const handleChoiceMade = useCallback((choice: EventChoice) => {
    const outcome = pickRandomOutcome(choice.outcomes);
    setSelectedChoice(choice);
    setResolvedOutcome(outcome);
    setTypingDone(false);
    setDayState('event_result');
  }, []);
```

- [ ] **Step 6: Update handleContinueAfterResult to use resolvedOutcome and handle phase-skip**

Replace the full `handleContinueAfterResult` function:

```ts
  const handleContinueAfterResult = useCallback(() => {
    if (resolvedOutcome) {
      applyStatChanges({
        health: resolvedOutcome.health_delta,
        food: resolvedOutcome.food_delta,
        morale: resolvedOutcome.morale_delta,
        money: resolvedOutcome.money_delta,
      });
      if (resolvedOutcome.force_phase_order != null) {
        setCurrentEvent(null);
        setSelectedChoice(null);
        setResolvedOutcome(null);
        setDayState('idle');
        jumpToPhase(resolvedOutcome.force_phase_order);
        return;
      }
    }
    setCurrentEvent(null);
    setSelectedChoice(null);
    setResolvedOutcome(null);
    setDayState('idle');
    const phase = getPhaseByOrder(gameState.currentPhaseOrder);
    if (phase) advanceDay(phase.days_in_phase);
  }, [resolvedOutcome, applyStatChanges, jumpToPhase, advanceDay, getPhaseByOrder, gameState.currentPhaseOrder]);
```

- [ ] **Step 7: Update the event_result render block to use resolvedOutcome**

Find the `if (dayState === 'event_result' && selectedChoice)` block (around line 315) and replace it:

```tsx
    // Event result
    if (dayState === 'event_result' && resolvedOutcome) {
      return (
        <div className="animate-fade-in-up">
          <p className="font-retro text-base md:text-lg text-foreground leading-relaxed mb-2">
            <Typewriter key={resolvedOutcome.result_text} text={resolvedOutcome.result_text} onComplete={() => setTypingDone(true)} />
          </p>
          {typingDone && (
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap gap-3 mb-2 font-pixel text-[9px]">
                {resolvedOutcome.health_delta !== 0 && (
                  <span className={resolvedOutcome.health_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    HP {resolvedOutcome.health_delta > 0 ? '+' : ''}{resolvedOutcome.health_delta}
                  </span>
                )}
                {resolvedOutcome.food_delta !== 0 && (
                  <span className={resolvedOutcome.food_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Food {resolvedOutcome.food_delta > 0 ? '+' : ''}{resolvedOutcome.food_delta}
                  </span>
                )}
                {resolvedOutcome.morale_delta !== 0 && (
                  <span className={resolvedOutcome.morale_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Morale {resolvedOutcome.morale_delta > 0 ? '+' : ''}{resolvedOutcome.morale_delta}
                  </span>
                )}
                {resolvedOutcome.money_delta !== 0 && (
                  <span className={resolvedOutcome.money_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Money {resolvedOutcome.money_delta > 0 ? '+' : ''}{resolvedOutcome.money_delta}
                  </span>
                )}
                {resolvedOutcome.force_phase_order != null && (
                  <span className="text-primary">Phase skip incoming...</span>
                )}
              </div>
              <div className="flex justify-end">
                <button onClick={handleContinueAfterResult} className="btn-neon flex items-center gap-2 font-pixel text-[10px] px-4 py-2">
                  Continue Journey
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
```

- [ ] **Step 8: Verify TypeScript compiles with no errors**

```bash
npm run build 2>&1 | head -40
```

Expected: clean build or only EventManager/EventForm errors (not yet updated).

- [ ] **Step 9: Commit**

```bash
git add src/components/game/GameEngine.tsx
git commit -m "feat(GameEngine): probabilistic outcome resolution, phase-skip support"
```

---

## Task 6: Rewrite EventForm.tsx

**Files:**
- Modify: `src/components/admin/EventForm.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import type { EventChoice, EventOutcome, GamePhase } from '@/hooks/useGameEvents';

interface DayWeight {
  day: number;
  probability: number;
}

interface EventFormData {
  title: string;
  description: string;
  image_url: string;
  choices: EventChoice[];
  is_active: boolean;
  probability_weight: number;
  day_weights: DayWeight[];
}

interface EventFormProps {
  initialData?: EventFormData;
  phases: GamePhase[];
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const EMPTY_OUTCOME: EventOutcome = {
  probability: 100,
  health_delta: 0,
  food_delta: 0,
  morale_delta: 0,
  money_delta: 0,
  result_text: '',
  force_phase_order: null,
};

const EMPTY_CHOICE: EventChoice = {
  text: '',
  outcomes: [{ ...EMPTY_OUTCOME }],
};

export type { EventFormData };

export function EventForm({ initialData, phases, onSubmit, onCancel, loading }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData ?? {
      title: '',
      description: '',
      image_url: '',
      choices: [{ ...EMPTY_CHOICE }, { ...EMPTY_CHOICE }],
      is_active: true,
      probability_weight: 50,
      day_weights: [],
    }
  );

  // --- Choice helpers ---
  const updateChoiceText = (ci: number, text: string) => {
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], text };
    setFormData({ ...formData, choices });
  };

  const addChoice = () => {
    setFormData({ ...formData, choices: [...formData.choices, { ...EMPTY_CHOICE, outcomes: [{ ...EMPTY_OUTCOME }] }] });
  };

  const removeChoice = (ci: number) => {
    if (formData.choices.length <= 2) return;
    setFormData({ ...formData, choices: formData.choices.filter((_, i) => i !== ci) });
  };

  // --- Outcome helpers ---
  const updateOutcome = (ci: number, oi: number, field: keyof EventOutcome, value: string | number | null) => {
    const choices = [...formData.choices];
    const outcomes = [...choices[ci].outcomes];
    outcomes[oi] = { ...outcomes[oi], [field]: value };
    choices[ci] = { ...choices[ci], outcomes };
    setFormData({ ...formData, choices });
  };

  const addOutcome = (ci: number) => {
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], outcomes: [...choices[ci].outcomes, { ...EMPTY_OUTCOME, probability: 0 }] };
    setFormData({ ...formData, choices });
  };

  const removeOutcome = (ci: number, oi: number) => {
    if (formData.choices[ci].outcomes.length <= 1) return;
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], outcomes: choices[ci].outcomes.filter((_, i) => i !== oi) };
    setFormData({ ...formData, choices });
  };

  // --- Day weight helpers ---
  const addDayWeight = () => {
    setFormData({ ...formData, day_weights: [...formData.day_weights, { day: 1, probability: 50 }] });
  };

  const updateDayWeight = (index: number, field: keyof DayWeight, value: number) => {
    const dw = [...formData.day_weights];
    dw[index] = { ...dw[index], [field]: value };
    setFormData({ ...formData, day_weights: dw });
  };

  const removeDayWeight = (index: number) => {
    setFormData({ ...formData, day_weights: formData.day_weights.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Event Title</label>
        <Input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground"
          placeholder="A stranger approaches..."
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Description</label>
        <Textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground min-h-[80px]"
          placeholder="Describe what happens..."
        />
      </div>

      {/* Image */}
      <ImageUpload
        value={formData.image_url}
        onChange={url => setFormData({ ...formData, image_url: url })}
        folder="events"
      />

      {/* Active toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
          className="rounded border-border"
          id="is_active"
        />
        <label htmlFor="is_active" className="font-retro text-lg text-foreground">Active</label>
      </div>

      {/* Base Probability */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
          Base Probability (0–100)
        </label>
        <Input
          type="number"
          min={0}
          max={100}
          value={formData.probability_weight}
          onChange={e => setFormData({ ...formData, probability_weight: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
          className="font-retro text-base bg-muted border-border text-foreground h-8 w-28"
        />
        <p className="font-retro text-sm text-muted-foreground mt-0.5">
          Used when no day-specific weight is set.
        </p>
      </div>

      {/* Day Weights */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Day Weights</label>
          <Button type="button" variant="ghost" size="sm" onClick={addDayWeight} className="text-primary font-pixel text-[8px] h-6 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Day Weight
          </Button>
        </div>
        {formData.day_weights.length === 0 && (
          <p className="font-retro text-sm text-muted-foreground/60">No day-specific weights. All days use the base probability above.</p>
        )}
        {formData.day_weights.map((dw, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-retro text-sm text-muted-foreground w-8 shrink-0">Day</span>
            <Input
              type="number"
              min={1}
              value={dw.day}
              onChange={e => updateDayWeight(i, 'day', parseInt(e.target.value) || 1)}
              className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
            />
            <span className="font-retro text-sm text-muted-foreground shrink-0">→</span>
            <Input
              type="number"
              min={0}
              max={100}
              value={dw.probability}
              onChange={e => updateDayWeight(i, 'probability', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
            />
            <span className="font-retro text-sm text-muted-foreground shrink-0">%</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeDayWeight(i)} className="text-destructive h-6 w-6 p-0 ml-auto">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Choices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Choices</label>
          <Button type="button" variant="ghost" size="sm" onClick={addChoice} className="text-primary font-pixel text-[8px] h-6 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Choice
          </Button>
        </div>

        {formData.choices.map((choice, ci) => {
          const probabilitySum = choice.outcomes.reduce((s, o) => s + o.probability, 0);
          const sumWarning = probabilitySum !== 100;

          return (
            <div key={ci} className="border border-border rounded-sm p-3 space-y-3 bg-muted/20">
              {/* Choice header */}
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[8px] text-primary">Choice {ci + 1}</span>
                {formData.choices.length > 2 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeChoice(ci)} className="text-destructive h-6 w-6 p-0">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Choice text */}
              <Input
                value={choice.text}
                onChange={e => updateChoiceText(ci, e.target.value)}
                required
                className="font-retro text-base bg-muted border-border text-foreground"
                placeholder="Choice text shown to player..."
              />

              {/* Outcomes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider">Outcomes</span>
                    <span className={`font-pixel text-[7px] ${sumWarning ? 'text-amber-400' : 'text-green-500'}`}>
                      {probabilitySum}/100
                    </span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => addOutcome(ci)} className="text-primary font-pixel text-[7px] h-5 px-1.5">
                    <Plus className="w-2.5 h-2.5 mr-0.5" /> Add Outcome
                  </Button>
                </div>

                {choice.outcomes.map((outcome, oi) => (
                  <div key={oi} className="border border-border/50 rounded-sm p-2 space-y-2 bg-background/40">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-[7px] text-muted-foreground shrink-0">Probability</span>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={outcome.probability}
                        onChange={e => updateOutcome(ci, oi, 'probability', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
                      />
                      <span className="font-retro text-sm text-muted-foreground shrink-0">%</span>
                      {choice.outcomes.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeOutcome(ci, oi)} className="text-destructive h-6 w-6 p-0 ml-auto">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    <Input
                      value={outcome.result_text}
                      onChange={e => updateOutcome(ci, oi, 'result_text', e.target.value)}
                      required
                      className="font-retro text-base bg-muted border-border text-foreground"
                      placeholder="Result text shown after choosing..."
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-retro text-sm text-game-health">Health</label>
                        <Input
                          type="number"
                          value={outcome.health_delta}
                          onChange={e => updateOutcome(ci, oi, 'health_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-food">Food</label>
                        <Input
                          type="number"
                          value={outcome.food_delta}
                          onChange={e => updateOutcome(ci, oi, 'food_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-morale">Morale</label>
                        <Input
                          type="number"
                          value={outcome.morale_delta}
                          onChange={e => updateOutcome(ci, oi, 'morale_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-money">Money</label>
                        <Input
                          type="number"
                          value={outcome.money_delta}
                          onChange={e => updateOutcome(ci, oi, 'money_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                    </div>

                    {/* Force Phase */}
                    <div>
                      <label className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider">Force Phase Skip</label>
                      <select
                        value={outcome.force_phase_order ?? ''}
                        onChange={e => updateOutcome(ci, oi, 'force_phase_order', e.target.value === '' ? null : parseInt(e.target.value))}
                        className="w-full mt-0.5 font-retro text-base bg-muted border border-border text-foreground h-8 rounded-sm px-2"
                      >
                        <option value="">None</option>
                        {phases.map(phase => (
                          <option key={phase.id} value={phase.phase_order}>
                            Phase {phase.phase_order}: {phase.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80"
        >
          {loading ? 'Saving...' : 'Save Event'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="font-pixel text-[10px] border-border text-foreground hover:bg-muted"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -40
```

Expected: errors in `EventManager.tsx` because it passes the old `EventFormData` shape and is missing the `phases` prop. Fixed in Task 7.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/EventForm.tsx
git commit -m "feat(EventForm): outcomes UI, day weights editor, probability_weight, force phase dropdown"
```

---

## Task 7: Update EventManager.tsx

**Files:**
- Modify: `src/components/admin/EventManager.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EventForm } from './EventForm';
import type { EventFormData } from './EventForm';
import type { GamePhase, GameEvent, EventChoice } from '@/hooks/useGameEvents';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

interface EventManagerProps {
  phases: GamePhase[];
}

function serializeDayWeights(dw: { day: number; probability: number }[]): Record<string, number> | null {
  if (dw.length === 0) return null;
  return Object.fromEntries(dw.map(({ day, probability }) => [String(day), probability]));
}

function deserializeDayWeights(raw: unknown): { day: number; probability: number }[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw as Record<string, number>).map(([day, probability]) => ({
    day: parseInt(day),
    probability,
  }));
}

function normalizeChoiceForForm(raw: unknown): EventChoice {
  if (raw && typeof raw === 'object' && 'outcomes' in raw) {
    return raw as EventChoice;
  }
  const old = raw as {
    text?: string;
    result_text?: string;
    health_delta?: number;
    food_delta?: number;
    morale_delta?: number;
    money_delta?: number;
  };
  return {
    text: old.text ?? '',
    outcomes: [{
      probability: 100,
      health_delta: old.health_delta ?? 0,
      food_delta: old.food_delta ?? 0,
      morale_delta: old.morale_delta ?? 0,
      money_delta: old.money_delta ?? 0,
      result_text: old.result_text ?? '',
      force_phase_order: null,
    }],
  };
}

export function EventManager({ phases }: EventManagerProps) {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (phases.length > 0 && !selectedPhase) {
      setSelectedPhase(phases[0].id);
    }
  }, [phases, selectedPhase]);

  const refetchEvents = async (phaseId: string) => {
    const { data } = await supabase
      .from('game_events')
      .select('*')
      .eq('phase_id', phaseId)
      .order('created_at');
    if (data) {
      setEvents(data.map(e => ({
        ...e,
        probability_weight: (e.probability_weight as number | undefined) ?? 50,
        day_weights: (e.day_weights as Record<string, number> | null) ?? null,
        choices: ((typeof e.choices === 'string' ? JSON.parse(e.choices) : e.choices) as unknown[]).map(normalizeChoiceForForm),
      })) as GameEvent[]);
    }
  };

  useEffect(() => {
    if (!selectedPhase) return;
    refetchEvents(selectedPhase);
  }, [selectedPhase]);

  const handleCreateEvent = async (formData: EventFormData) => {
    setLoading(true);
    const { error } = await supabase.from('game_events').insert({
      phase_id: selectedPhase,
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      choices: formData.choices as unknown as Record<string, unknown>[],
      is_active: formData.is_active,
      probability_weight: formData.probability_weight,
      day_weights: serializeDayWeights(formData.day_weights),
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event created' });
      setCreatingEvent(false);
      await refetchEvents(selectedPhase);
    }
    setLoading(false);
  };

  const handleUpdateEvent = async (formData: EventFormData) => {
    if (!editingEvent) return;
    setLoading(true);
    const { error } = await supabase
      .from('game_events')
      .update({
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url || null,
        choices: formData.choices as unknown as Record<string, unknown>[],
        is_active: formData.is_active,
        probability_weight: formData.probability_weight,
        day_weights: serializeDayWeights(formData.day_weights),
      })
      .eq('id', editingEvent.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event updated' });
      setEditingEvent(null);
      await refetchEvents(selectedPhase);
    }
    setLoading(false);
  };

  const toggleActive = async (event: GameEvent) => {
    await supabase.from('game_events').update({ is_active: !event.is_active }).eq('id', event.id);
    setEvents(prev => prev.map(e => e.id === event.id ? { ...e, is_active: !e.is_active } : e));
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('game_events').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setEvents(prev => prev.filter(e => e.id !== id));
      toast({ title: 'Event deleted' });
    }
  };

  if (phases.length === 0) {
    return (
      <p className="font-retro text-lg text-muted-foreground">
        Create phases first before adding events.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[10px] text-primary">Events</h2>
        {!creatingEvent && !editingEvent && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCreatingEvent(true)}
            className="font-pixel text-[8px] border-border text-foreground hover:bg-muted"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Event
          </Button>
        )}
      </div>

      {/* Phase selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {phases.map(phase => (
          <button
            key={phase.id}
            onClick={() => { setSelectedPhase(phase.id); setEditingEvent(null); setCreatingEvent(false); }}
            className={`font-pixel text-[8px] px-3 py-1.5 rounded-sm border transition-colors whitespace-nowrap ${
              selectedPhase === phase.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {phase.phase_order}. {phase.name}
          </button>
        ))}
      </div>

      {/* Create form */}
      {creatingEvent && (
        <div className="border border-primary/30 rounded-sm p-3 bg-card">
          <p className="font-pixel text-[9px] text-primary mb-3">New Event</p>
          <EventForm
            phases={phases}
            onSubmit={handleCreateEvent}
            onCancel={() => setCreatingEvent(false)}
            loading={loading}
          />
        </div>
      )}

      {/* Edit form */}
      {editingEvent && (
        <div className="border border-primary/30 rounded-sm p-3 bg-card">
          <p className="font-pixel text-[9px] text-primary mb-3">Edit Event</p>
          <EventForm
            phases={phases}
            initialData={{
              title: editingEvent.title,
              description: editingEvent.description,
              image_url: editingEvent.image_url || '',
              choices: editingEvent.choices,
              is_active: editingEvent.is_active,
              probability_weight: editingEvent.probability_weight,
              day_weights: deserializeDayWeights(editingEvent.day_weights),
            }}
            onSubmit={handleUpdateEvent}
            onCancel={() => setEditingEvent(null)}
            loading={loading}
          />
        </div>
      )}

      {/* Event list */}
      {!creatingEvent && !editingEvent && (
        <div className="space-y-2">
          {events.length === 0 ? (
            <p className="font-retro text-lg text-muted-foreground py-4">
              No events for this phase yet. Add some to make the game interesting!
            </p>
          ) : (
            events.map(event => (
              <div
                key={event.id}
                className={`border rounded-sm p-3 bg-card/50 ${event.is_active ? 'border-border' : 'border-border/50 opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[9px] text-foreground">{event.title}</p>
                    <p className="font-retro text-base text-muted-foreground truncate">{event.description}</p>
                    <p className="font-retro text-sm text-muted-foreground/70 mt-1">
                      {event.choices.length} choice{event.choices.length !== 1 ? 's' : ''} · base {event.probability_weight}%
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => toggleActive(event)} className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                      {event.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingEvent(event)} className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify clean build**

```bash
npm run build 2>&1 | head -40
```

Expected: no TypeScript errors.

- [ ] **Step 3: Start dev server and manually test**

```bash
npm run dev
```

Open the admin panel → Events tab. Verify:
- Creating a new event shows the Base Probability field, Day Weights editor, and the Outcomes section per choice
- Each choice has at least one outcome with probability, stat deltas, result text, and Force Phase dropdown
- Adding a day weight row works; removing works
- Probability sum indicator shows correct total and warns in amber when not 100
- Saving and reloading an event preserves all values

Open the game, advance through days, verify:
- Events still trigger and show choices
- After picking a choice, a result text appears (from the resolved outcome)
- Stats change correctly
- If you create an event with `force_phase_order` set on an outcome and trigger it, the game jumps to that phase

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/EventManager.tsx
git commit -m "feat(EventManager): wire probability_weight, day_weights, and outcomes through create/update"
```
