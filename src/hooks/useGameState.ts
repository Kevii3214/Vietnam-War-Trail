import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GameStats {
  health: number;
  food: number;
  morale: number;
  money: number;
}

export const LANDING_COUNTRIES = [
  'Malaysia',
  'Philippines',
  'Indonesia',
  'Thailand',
  'Hong Kong',
  'Singapore',
] as const;

export type LandingCountry = (typeof LANDING_COUNTRIES)[number];

export interface GameState {
  currentPhaseOrder: number;
  dayInPhase: number;
  stats: GameStats;
  eventsSeen: string[];
  isGameOver: boolean;
  gameOverReason: string | null;
  isVictory: boolean;
  landingCountry: LandingCountry | null;
}

const DEFAULT_STATS: GameStats = {
  health: 100,
  food: 80,
  morale: 70,
  money: 50,
};

export function useGameState() {
  const [initialStats, setInitialStats] = useState<GameStats | null>(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
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
  const [eventChance, setEventChance] = useState(70);
  const [foodDrainPerDay, setFoodDrainPerDay] = useState(3);

  // Fetch starting stats + gameplay settings from DB
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('game_settings')
        .select('key, value');
      if (data && data.length > 0) {
        const stats = { ...DEFAULT_STATS };
        for (const row of data) {
          if (row.key === 'starting_health') stats.health = row.value;
          if (row.key === 'starting_food') stats.food = row.value;
          if (row.key === 'starting_morale') stats.morale = row.value;
          if (row.key === 'starting_money') stats.money = row.value;
          if (row.key === 'event_chance') setEventChance(row.value);
          if (row.key === 'food_drain_per_day') setFoodDrainPerDay(row.value);
        }
        setInitialStats(stats);
      } else {
        setInitialStats(DEFAULT_STATS);
      }
      setSettingsLoaded(true);
    };
    fetchSettings();
  }, []);

  const getStartingStats = useCallback((): GameStats => {
    return initialStats ?? DEFAULT_STATS;
  }, [initialStats]);

  const startNewGame = useCallback(() => {
    const stats = getStartingStats();
    setGameState({
      currentPhaseOrder: 1,
      dayInPhase: 1,
      stats: { ...stats },
      eventsSeen: [],
      isGameOver: false,
      gameOverReason: null,
      isVictory: false,
      landingCountry: null,
    });
    setShowPhaseIntro(true);
  }, [getStartingStats]);

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
      landingCountry: null,
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
      // Daily food drain (configurable)
      const newFood = Math.max(0, prev.stats.food - foodDrainPerDay);

      // If no food, health drops by 10 per day
      const starvationDamage = newFood <= 0 ? 10 : 0;
      const newHealth = Math.max(0, prev.stats.health - starvationDamage);

      let isGameOver = prev.isGameOver;
      let gameOverReason = prev.gameOverReason;

      if (newHealth <= 0 && !isGameOver) {
        isGameOver = true;
        gameOverReason = 'Starvation has taken its toll. Your body gives out.';
      }
      if (prev.stats.morale <= 0 && !isGameOver) {
        isGameOver = true;
        gameOverReason = 'Your spirit is broken. You can go no further.';
      }

      if (prev.dayInPhase >= daysInPhase) {
        if (prev.currentPhaseOrder >= 4) {
          return {
            ...prev,
            stats: { ...prev.stats, food: newFood, health: newHealth },
            isGameOver: true,
            gameOverReason: null,
            isVictory: true,
          };
        }
        return {
          ...prev,
          currentPhaseOrder: prev.currentPhaseOrder + 1,
          dayInPhase: 1,
          stats: { ...prev.stats, food: newFood, health: newHealth },
          isGameOver,
          gameOverReason,
          landingCountry: prev.currentPhaseOrder + 1 === 3
            ? LANDING_COUNTRIES[Math.floor(Math.random() * LANDING_COUNTRIES.length)]
            : prev.landingCountry,
        };
      }

      return {
        ...prev,
        dayInPhase: prev.dayInPhase + 1,
        stats: { ...prev.stats, food: newFood, health: newHealth },
        isGameOver,
        gameOverReason,
      };
    });
  }, [foodDrainPerDay]);

  const setPhaseIntroSeen = useCallback(() => {
    setShowPhaseIntro(false);
  }, []);

  const triggerPhaseIntro = useCallback(() => {
    setShowPhaseIntro(true);
  }, []);

  const jumpToPhase = useCallback((phaseOrder: number) => {
    setGameState(prev => ({
      ...prev,
      currentPhaseOrder: phaseOrder,
      dayInPhase: 1,
      eventsSeen: [],
      landingCountry: phaseOrder === 3 && !prev.landingCountry
        ? LANDING_COUNTRIES[Math.floor(Math.random() * LANDING_COUNTRIES.length)]
        : prev.landingCountry,
    }));
  }, []);

  return {
    gameState,
    showPhaseIntro,
    settingsLoaded,
    eventChance,
    startNewGame,
    loadGameState,
    applyStatChanges,
    markEventSeen,
    advanceDay,
    setPhaseIntroSeen,
    triggerPhaseIntro,
    jumpToPhase,
  };
}
