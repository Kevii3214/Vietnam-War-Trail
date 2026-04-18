import { useState, useEffect, useCallback } from 'react';
import { StatsBar } from './StatsBar';
import { EventCard } from './EventCard';
import { PhaseIntro } from './PhaseIntro';
import { GameOver } from './GameOver';
import { TravelAnimation } from './TravelAnimation';
import { EscapingVietnamCinematic } from './scenes/EscapingVietnamCinematic';
import { useGameState } from '@/hooks/useGameState';
import { useGameEvents, type EventChoice } from '@/hooks/useGameEvents';
import { useGameSave } from '@/hooks/useGameSave';
import type { GameEvent } from '@/hooks/useGameEvents';

interface GameEngineProps {
  userId: string;
  onMainMenu: () => void;
  loadExistingSave?: boolean;
}

type DayState = 'traveling' | 'event' | 'idle';

export function GameEngine({ userId, onMainMenu, loadExistingSave }: GameEngineProps) {
  const {
    gameState,
    showPhaseIntro,
    startNewGame,
    loadGameState,
    applyStatChanges,
    markEventSeen,
    advanceDay,
    setPhaseIntroSeen,
    triggerPhaseIntro,
  } = useGameState();

  const { phases, loading, getPhaseByOrder, getRandomEvent } = useGameEvents();
  const { saveGame, loadGame, saveRun } = useGameSave(userId);

  const [dayState, setDayState] = useState<DayState>('idle');
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [lastPhase, setLastPhase] = useState(1);
  const [showCinematic, setShowCinematic] = useState(false);

  // Initialize game
  useEffect(() => {
    if (initialized || loading) return;

    const init = async () => {
      if (loadExistingSave) {
        const save = await loadGame();
        if (save) {
          loadGameState({
            current_phase_order: save.current_phase_order,
            day_in_phase: save.day_in_phase,
            health: save.health,
            food: save.food,
            morale: save.morale,
            money: save.money,
            events_seen: (save.events_seen as string[]) || [],
          });
          setLastPhase(save.current_phase_order);
        } else {
          startNewGame();
        }
      } else {
        startNewGame();
        setShowCinematic(true);
      }
      setInitialized(true);
    };

    init();
  }, [loading, initialized, loadExistingSave, loadGame, loadGameState, startNewGame]);

  // Detect phase changes
  useEffect(() => {
    if (gameState.currentPhaseOrder !== lastPhase) {
      setLastPhase(gameState.currentPhaseOrder);
      triggerPhaseIntro();
    }
  }, [gameState.currentPhaseOrder, lastPhase, triggerPhaseIntro]);

  // Auto-save on state changes
  useEffect(() => {
    if (initialized && !gameState.isGameOver) {
      saveGame(gameState);
    }
  }, [gameState, initialized, saveGame]);

  // Handle game over
  useEffect(() => {
    if (gameState.isGameOver && initialized) {
      const outcome = gameState.isVictory ? 'completed' : 'died';
      saveRun(
        outcome,
        gameState.currentPhaseOrder,
        gameState.dayInPhase,
        gameState.stats
      );
    }
  }, [gameState.isGameOver, gameState.isVictory, initialized, saveRun, gameState.currentPhaseOrder, gameState.dayInPhase, gameState.stats]);

  const handleNextDay = useCallback(() => {
    const eventChance = Math.random();
    if (eventChance < 0.7) {
      const event = getRandomEvent(gameState.currentPhaseOrder, gameState.eventsSeen);
      if (event) {
        setCurrentEvent(event);
        setDayState('event');
        markEventSeen(event.id);
        return;
      }
    }
    setDayState('traveling');
  }, [gameState.currentPhaseOrder, gameState.eventsSeen, getRandomEvent, markEventSeen]);

  const handleChoiceMade = useCallback((choice: EventChoice) => {
    applyStatChanges({
      health: choice.health_delta,
      food: choice.food_delta,
      morale: choice.morale_delta,
      money: choice.money_delta,
    });
    setCurrentEvent(null);
    setDayState('idle');

    const phase = getPhaseByOrder(gameState.currentPhaseOrder);
    if (phase) {
      advanceDay(phase.days_in_phase);
    }
  }, [applyStatChanges, advanceDay, getPhaseByOrder, gameState.currentPhaseOrder]);

  const handleTravelContinue = useCallback(() => {
    setDayState('idle');
    const phase = getPhaseByOrder(gameState.currentPhaseOrder);
    if (phase) {
      advanceDay(phase.days_in_phase);
    }
  }, [advanceDay, getPhaseByOrder, gameState.currentPhaseOrder]);

  const handleNewGame = useCallback(() => {
    startNewGame();
    setDayState('idle');
    setCurrentEvent(null);
    setInitialized(true);
    setShowCinematic(true);
  }, [startNewGame]);

  if (loading || !initialized) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="font-pixel text-sm text-primary crt-glow flicker">Loading...</p>
      </div>
    );
  }

  if (showCinematic) {
    return <EscapingVietnamCinematic onComplete={() => setShowCinematic(false)} />;
  }

  if (gameState.isGameOver) {
    return (
      <GameOver
        isVictory={gameState.isVictory}
        reason={gameState.gameOverReason}
        stats={gameState.stats}
        phase={gameState.currentPhaseOrder}
        day={gameState.dayInPhase}
        onNewGame={handleNewGame}
        onMainMenu={onMainMenu}
      />
    );
  }

  const currentPhase = getPhaseByOrder(gameState.currentPhaseOrder);

  if (showPhaseIntro && currentPhase) {
    return <PhaseIntro phase={currentPhase} onContinue={setPhaseIntroSeen} />;
  }

  return (
    <div className="h-full flex flex-col bg-background relative scanlines">
      <div className="p-3 border-b border-border">
        <StatsBar
          stats={gameState.stats}
          phase={gameState.currentPhaseOrder}
          day={gameState.dayInPhase}
        />
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {dayState === 'idle' && (
            <div className="text-center py-8 animate-fade-in-up">
              <p className="font-retro text-xl text-foreground/70 mb-6">
                The journey continues. What will today bring?
              </p>
              <button
                onClick={handleNextDay}
                className="font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded-sm transition-colors"
              >
                Next Day
              </button>
            </div>
          )}

          {dayState === 'traveling' && (
            <TravelAnimation
              phase={gameState.currentPhaseOrder}
              day={gameState.dayInPhase}
              onContinue={handleTravelContinue}
            />
          )}

          {dayState === 'event' && currentEvent && (
            <EventCard event={currentEvent} onChoiceMade={handleChoiceMade} />
          )}
        </div>
      </div>
    </div>
  );
}
