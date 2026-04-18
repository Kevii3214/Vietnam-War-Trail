# Admin Event Editor — Enhanced Design Spec
**Date:** 2026-04-18

## Overview

Extend the admin event editor with four new capabilities:
1. Per-choice probabilistic outcomes (multiple possible consequences per choice)
2. Event-level base probability weight
3. Day-in-phase probability schedule per event
4. Phase-skip on a specific outcome

All event-level data changes require two new DB columns. Choice-level data lives entirely in the existing `choices` JSONB column.

---

## DB Migration

Run in Supabase SQL editor:

```sql
ALTER TABLE game_events ADD COLUMN probability_weight INTEGER NOT NULL DEFAULT 50;
ALTER TABLE game_events ADD COLUMN day_weights JSONB DEFAULT NULL;
```

`probability_weight` — base selection weight (0–100) used when no day-specific weight is set.  
`day_weights` — map of day-in-phase (as string key) to probability, e.g. `{"1": 100, "2": 50, "3": 0}`. Days not listed fall back to `probability_weight`.

---

## Data Model

### New types in `useGameEvents.ts`

```ts
interface EventOutcome {
  probability: number;              // 0–100; outcomes in a choice should sum to 100
  health_delta: number;
  food_delta: number;
  morale_delta: number;
  money_delta: number;
  result_text: string;
  force_phase_order?: number | null; // if set, jumps game to this phase_order after resolving
}

interface EventChoice {
  text: string;
  outcomes: EventOutcome[];
}
```

Old flat-format choices (with `result_text` at top level and no `outcomes` array) are converted at read time to a single outcome with `probability: 100`. This ensures backward compatibility with existing DB data.

### `GameEvent` additions

```ts
interface GameEvent {
  // ...existing fields...
  probability_weight: number;                    // default 50
  day_weights: Record<string, number> | null;
}
```

### Supabase types update

Add `probability_weight: number` and `day_weights: Json | null` to the `game_events` Row, Insert, and Update types in `src/integrations/supabase/types.ts`.

---

## Game Engine Changes

### `getRandomEvent` in `useGameEvents.ts`

**New signature:**
```ts
getRandomEvent(phaseOrder: number, seenEventIds: string[], dayInPhase: number): GameEvent | null
```

**Algorithm:**
1. Filter to active events for the current phase, excluding seen IDs (or allow repeats if all seen).
2. For each candidate event, compute effective probability:
   - If `day_weights[String(dayInPhase)]` exists → use that value
   - Else → use `probability_weight`
3. Exclude events with effective probability `0`.
4. Weighted random selection: sum all effective probabilities, pick `random * total`, walk the list.
5. If no candidates remain, return `null`.

All callsites in `GameEngine.tsx` must pass `dayInPhase` from `useGameState`.

### Outcome resolution in `GameEngine.tsx`

When a player picks a choice:
1. Use weighted random selection over `choice.outcomes` using each outcome's `probability` field.
2. Apply the selected outcome's stat deltas via `applyStatChanges`.
3. If `force_phase_order` is set on the selected outcome, advance the game to that phase immediately (call the appropriate phase-advance logic in `useGameState`, bypassing normal day-count advancement).

---

## Admin UI Changes

### `EventForm.tsx`

**Event-level additions** (above the choices section):

- **Base Probability** — number input, 0–100, default 50. Label: "Base Probability (0–100)".
- **Day Weights** — dynamic list of `[day, probability]` row pairs. Each row: day number input + probability 0–100 input + remove button. "Add Day Weight" button appends a blank row. Empty by default.

**Choice editor** — each choice block replaces flat stat fields with:

- Choice text input (unchanged)
- Outcomes sub-section:
  - Each outcome row contains: probability (0–100), health/food/morale/money delta inputs, result_text input, Force Phase dropdown ("None" + all phase names in order)
  - "Add Outcome" button appends a new outcome row with probability 0 and zero deltas
  - Remove button on each outcome row; minimum 1 outcome per choice
  - Probability sum indicator (e.g. "85 / 100") shown next to the outcomes label; amber warning color if not equal to 100

**`EventFormData` type update:**
```ts
interface EventFormData {
  title: string;
  description: string;
  image_url: string;
  choices: EventChoice[];       // uses new EventChoice with outcomes[]
  is_active: boolean;
  probability_weight: number;
  day_weights: { day: number; probability: number }[];  // UI array form, serialized to JSONB on save
}
```

### `EventManager.tsx`

Pass `probability_weight` and `day_weights` through `handleCreateEvent` and `handleUpdateEvent` into the Supabase insert/update calls.

---

## Backward Compatibility

A migration helper function `normalizeChoice(raw)` is added in `useGameEvents.ts`:

```ts
function normalizeChoice(raw: unknown): EventChoice {
  if (raw && typeof raw === 'object' && 'outcomes' in raw) {
    return raw as EventChoice; // already new format
  }
  // old flat format
  const old = raw as { text: string; result_text: string; health_delta: number; food_delta: number; morale_delta: number; money_delta: number };
  return {
    text: old.text,
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
```

Applied when fetching events in both `useGameEvents.ts` and `EventManager.tsx`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/integrations/supabase/types.ts` | Add `probability_weight`, `day_weights` to game_events Row/Insert/Update |
| `src/hooks/useGameEvents.ts` | New types, `normalizeChoice`, updated `getRandomEvent` signature + weighted selection |
| `src/components/game/GameEngine.tsx` | Pass `dayInPhase` to `getRandomEvent`; probabilistic outcome resolution; phase-skip logic |
| `src/components/admin/EventForm.tsx` | Full redesign of choice editor + new event-level fields |
| `src/components/admin/EventManager.tsx` | Pass new fields through create/update handlers |
