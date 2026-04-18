import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EventChoice {
  text: string;
  health_delta: number;
  food_delta: number;
  morale_delta: number;
  money_delta: number;
  result_text: string;
}

export interface GameEvent {
  id: string;
  phase_id: string;
  title: string;
  description: string;
  image_url: string | null;
  choices: EventChoice[];
  is_active: boolean;
}

export interface GamePhase {
  id: string;
  name: string;
  description: string | null;
  phase_order: number;
  image_url: string | null;
  days_in_phase: number;
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
        choices: (typeof e.choices === 'string' ? JSON.parse(e.choices) : e.choices) as EventChoice[],
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

  const getRandomEvent = useCallback((phaseOrder: number, seenEventIds: string[]): GameEvent | null => {
    const phase = phases.find(p => p.phase_order === phaseOrder);
    if (!phase) return null;

    const phaseEvents = events.filter(e => e.phase_id === phase.id && !seenEventIds.includes(e.id));
    if (phaseEvents.length === 0) {
      // If all events seen, allow repeats
      const allPhaseEvents = events.filter(e => e.phase_id === phase.id);
      if (allPhaseEvents.length === 0) return null;
      return allPhaseEvents[Math.floor(Math.random() * allPhaseEvents.length)];
    }

    return phaseEvents[Math.floor(Math.random() * phaseEvents.length)];
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
