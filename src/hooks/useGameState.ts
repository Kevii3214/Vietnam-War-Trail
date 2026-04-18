import { useState, useCallback } from 'react';

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

const INITIAL_STATS: GameStats = {
  health: 100,
  food: 80,
  morale: 70,
  money: 50,
};

const INITIAL_STATE: GameState = {
  currentPhaseOrder: 1,
  dayInPhase: 1,
  stats: { ...INITIAL_STATS },
  eventsSeen: [],
  isGameOver: false,
  gameOverReason: null,
  isVictory: false,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({ ...INITIAL_STATE });
  const [showPhaseIntro, setShowPhaseIntro] = useState(true);

  const startNewGame = useCallback(() => {
    setGameState({ ...INITIAL_STATE, eventsSeen: [] });
    setShowPhaseIntro(true);
  }, []);

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
