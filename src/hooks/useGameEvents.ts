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
