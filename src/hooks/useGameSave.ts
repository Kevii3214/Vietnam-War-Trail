import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GameState } from './useGameState';

export function useGameSave(userId: string | undefined) {
  const saveGame = useCallback(async (state: GameState) => {
    if (!userId) return;

    const saveData = {
      user_id: userId,
      current_phase_order: state.currentPhaseOrder,
      day_in_phase: state.dayInPhase,
      health: state.stats.health,
      food: state.stats.food,
      morale: state.stats.morale,
      money: state.stats.money,
      events_seen: state.eventsSeen,
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from('game_saves')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('game_saves')
        .update(saveData)
        .eq('user_id', userId);
    } else {
      await supabase.from('game_saves').insert(saveData);
    }
  }, [userId]);

  const loadGame = useCallback(async () => {
    if (!userId) return null;

    const { data } = await supabase
      .from('game_saves')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    return data;
  }, [userId]);

  const deleteSave = useCallback(async () => {
    if (!userId) return;
    await supabase.from('game_saves').delete().eq('user_id', userId);
  }, [userId]);

  const saveRun = useCallback(async (
    outcome: 'completed' | 'died' | 'gave_up',
    finalPhase: number,
    finalDay: number,
    finalStats: Record<string, number>
  ) => {
    if (!userId) return;
    await supabase.from('game_runs').insert({
      user_id: userId,
      outcome,
      final_phase: finalPhase,
      final_day: finalDay,
      final_stats: finalStats,
    });
    await deleteSave();
  }, [userId, deleteSave]);

  return { saveGame, loadGame, deleteSave, saveRun };
}
