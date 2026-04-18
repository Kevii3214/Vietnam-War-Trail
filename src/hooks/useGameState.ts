import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GameStats {
  health: number;
  food: number;
  morale: number;
  money: number;
}

export interface GameState {
  currentPhaseOrder: number;
  dayInPhase: number;
  stats: GameStats;
  eventsSeen: string[];
  isGameOver: boolean;
  gameOverReason: string | null;
  isVictory: boolean;
}

const DEFAULT_STATS: GameStats = {
  health: 100,
  food: 80,
  morale: 70,
  money: 50,
};

export function useGameState() {
  const [initialStats, setInitialStats] = useState<GameStats>(DEFAULT_STATS);
  const [gameState, setGameState] = useState<GameState>({
    currentPhaseOrder: 1,
    dayInPhase: 1,
    stats: { ...DEFAULT_STATS },
    eventsSeen: [],
    isGameOver: false,
    gameOverReason: null,
    isVictory: false,
  });
  const [showPhaseIntro, setShowPhaseIntro] = useState(true);

  // Fetch starting stats from DB
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('game_settings')
        .select('key, value');
      if (data) {
        const stats = { ...DEFAULT_STATS };
        for (const row of data) {
          if (row.key === 'starting_health') stats.health = row.value;
          if (row.key === 'starting_food') stats.food = row.value;
          if (row.key === 'starting_morale') stats.morale = row.value;
          if (row.key === 'starting_money') stats.money = row.value;
        }
        setInitialStats(stats);
      }
    };
    fetchSettings();
  }, []);

  const startNewGame = useCallback(() => {
    setGameState({
      currentPhaseOrder: 1,
      dayInPhase: 1,
      stats: { ...initialStats },
      eventsSeen: [],
      isGameOver: false,
      gameOverReason: null,
      isVictory: false,
    });
    setShowPhaseIntro(true);
  }, [initialStats]);

  const loadGameState = useCallback((saved: {
    current_phase_order: number;
    day_in_phase: number;
    health: number;
    food: number;
    morale: number;
    money: number;
    events_seen: string[];
  }) => {
    setGameState({
      currentPhaseOrder: saved.current_phase_order,
      dayInPhase: saved.day_in_phase,
      stats: {
        health: saved.health,
        food: saved.food,
        morale: saved.morale,
        money: saved.money,
      },
      eventsSeen: saved.events_seen || [],
      isGameOver: false,
      gameOverReason: null,
      isVictory: false,
    });
    setShowPhaseIntro(true);
  }, []);

  const applyStatChanges = useCallback((deltas: Partial<GameStats>) => {
    setGameState(prev => {
      const newStats = { ...prev.stats };
      if (deltas.health !== undefined) newStats.health = Math.max(0, Math.min(100, newStats.health + deltas.health));
      if (deltas.food !== undefined) newStats.food = Math.max(0, Math.min(100, newStats.food + deltas.food));
      if (deltas.morale !== undefined) newStats.morale = Math.max(0, Math.min(100, newStats.morale + deltas.morale));
      if (deltas.money !== undefined) newStats.money = Math.max(0, newStats.money + deltas.money);

      let isGameOver = false;
      let gameOverReason: string | null = null;

      if (newStats.health <= 0) {
        isGameOver = true;
        gameOverReason = 'Your health has failed. The journey ends here.';
      } else if (newStats.food <= 0) {
        isGameOver = true;
        gameOverReason = 'You have run out of food. Starvation claims you.';
      } else if (newStats.morale <= 0) {
        isGameOver = true;
        gameOverReason = 'Your spirit is broken. You can go no further.';
      }

      return { ...prev, stats: newStats, isGameOver, gameOverReason };
    });
  }, []);

  const markEventSeen = useCallback((eventId: string) => {
    setGameState(prev => ({
      ...prev,
      eventsSeen: [...prev.eventsSeen, eventId],
    }));
  }, []);

  const advanceDay = useCallback((daysInPhase: number) => {
    setGameState(prev => {
      // Daily food drain
      const foodDrain = Math.floor(Math.random() * 3) + 2;
      const newFood = Math.max(0, prev.stats.food - foodDrain);

      let isGameOver = prev.isGameOver;
      let gameOverReason = prev.gameOverReason;
      if (newFood <= 0 && !isGameOver) {
        isGameOver = true;
        gameOverReason = 'You have run out of food. Starvation claims you.';
      }

      if (prev.dayInPhase >= daysInPhase) {
        if (prev.currentPhaseOrder >= 4) {
          return {
            ...prev,
            stats: { ...prev.stats, food: newFood },
            isGameOver: true,
            gameOverReason: null,
            isVictory: true,
          };
        }
        return {
          ...prev,
          currentPhaseOrder: prev.currentPhaseOrder + 1,
          dayInPhase: 1,
          stats: { ...prev.stats, food: newFood },
          isGameOver,
          gameOverReason,
        };
      }

      return {
        ...prev,
        dayInPhase: prev.dayInPhase + 1,
        stats: { ...prev.stats, food: newFood },
        isGameOver,
        gameOverReason,
      };
    });
  }, []);

  const setPhaseIntroSeen = useCallback(() => {
    setShowPhaseIntro(false);
  }, []);

  const triggerPhaseIntro = useCallback(() => {
    setShowPhaseIntro(true);
  }, []);

  return {
    gameState,
    showPhaseIntro,
    startNewGame,
    loadGameState,
    applyStatChanges,
    markEventSeen,
    advanceDay,
    setPhaseIntroSeen,
    triggerPhaseIntro,
  };
}
