import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { StatsBar } from './StatsBar';
import { PhaseIntro } from './PhaseIntro';
import { GameOver } from './GameOver';
import { GameHUD } from './GameHUD';
import { GameMenuBar } from './GameMenuBar';
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

type DayState = 'traveling' | 'event' | 'event_result' | 'idle';

const PHASE_MESSAGES: Record<number, string[]> = {
  1: [
    'You move quietly through the streets...',
    'The sound of distant gunfire echoes...',
    'You travel through the countryside under cover of night...',
    'The path ahead is uncertain but you press on...',
    'A family joins your group, seeking safety...',
    'You hide in a rice paddy until the patrol passes...',
  ],
  2: [
    'The boat rocks gently on the waves...',
    'Nothing but open sea in every direction...',
    'A storm approaches on the horizon...',
    'The engine sputters but keeps running...',
    'Stars guide your path through the dark ocean...',
  ],
  3: [
    'Another day in the refugee camp...',
    'You wait in line for your ration card...',
    'Children play between the tents...',
    'News arrives about resettlement opportunities...',
  ],
  4: [
    'Everything feels strange and new...',
    'You search for work in this new land...',
    'Learning English is harder than expected...',
    'A kind stranger helps you navigate the bus system...',
  ],
};

function Typewriter({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text, onComplete]);
  return <span>{displayed}</span>;
}

export function GameEngine({ userId, onMainMenu, loadExistingSave }: GameEngineProps) {
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
  } = useGameState();

  const { phases, loading, getPhaseByOrder, getRandomEvent } = useGameEvents();
  const { saveGame, loadGame, saveRun } = useGameSave(userId);

  const [dayState, setDayState] = useState<DayState>('idle');
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [lastPhase, setLastPhase] = useState(1);
  const [showCinematic, setShowCinematic] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [travelText, setTravelText] = useState('');

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
      saveRun(outcome, gameState.currentPhaseOrder, gameState.dayInPhase, gameState.stats);
    }
  }, [gameState.isGameOver, gameState.isVictory, initialized, saveRun, gameState.currentPhaseOrder, gameState.dayInPhase, gameState.stats]);

  const handleNextDay = useCallback(() => {
    setTypingDone(false);
    const roll = Math.random();
    if (roll < eventChancePct / 100) {
      const event = getRandomEvent(gameState.currentPhaseOrder, gameState.eventsSeen);
      if (event) {
        setCurrentEvent(event);
        setSelectedChoice(null);
        setDayState('event');
        markEventSeen(event.id);
        return;
      }
    }
    // Travel day
    const msgs = PHASE_MESSAGES[gameState.currentPhaseOrder] || PHASE_MESSAGES[1];
    setTravelText(msgs[Math.floor(Math.random() * msgs.length)]);
    setDayState('traveling');
  }, [gameState.currentPhaseOrder, gameState.eventsSeen, getRandomEvent, markEventSeen, eventChancePct]);

  const handleChoiceMade = useCallback((choice: EventChoice) => {
    setSelectedChoice(choice);
    setTypingDone(false);
    setDayState('event_result');
  }, []);

  const handleContinueAfterResult = useCallback(() => {
    if (selectedChoice) {
      applyStatChanges({
        health: selectedChoice.health_delta,
        food: selectedChoice.food_delta,
        morale: selectedChoice.morale_delta,
        money: selectedChoice.money_delta,
      });
    }
    setCurrentEvent(null);
    setSelectedChoice(null);
    setDayState('idle');
    const phase = getPhaseByOrder(gameState.currentPhaseOrder);
    if (phase) advanceDay(phase.days_in_phase);
  }, [selectedChoice, applyStatChanges, advanceDay, getPhaseByOrder, gameState.currentPhaseOrder]);

  const handleTravelContinue = useCallback(() => {
    setDayState('idle');
    const phase = getPhaseByOrder(gameState.currentPhaseOrder);
    if (phase) advanceDay(phase.days_in_phase);
  }, [advanceDay, getPhaseByOrder, gameState.currentPhaseOrder]);

  const handleNewGame = useCallback(() => {
    startNewGame();
    setDayState('idle');
    setCurrentEvent(null);
    setSelectedChoice(null);
    setInitialized(true);
    setShowCinematic(true);
  }, [startNewGame]);

  if (loading || !initialized) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6 bg-background">
        <h1 className="font-pixel text-sm text-primary crt-glow flicker">Vietnam Trail</h1>
        <div className="loading-spinner" />
        <p className="font-retro text-xl text-muted-foreground/35 italic">Loading your journey...</p>
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

  // Build HUD content based on current dayState
  const renderHUDContent = () => {
    // Idle state - prompt next day
    if (dayState === 'idle') {
      return (
        <div className="animate-fade-in-up">
          <p className="font-retro text-base md:text-lg text-foreground/70 mb-3">
            The journey continues. What will today bring?
          </p>
          <div className="flex justify-end">
            <button onClick={handleNextDay} className="btn-neon flex items-center gap-2 font-pixel text-[10px] px-4 py-2">
              Next Day
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    // Traveling - typewriter text
    if (dayState === 'traveling') {
      return (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Day {gameState.dayInPhase}</span>
            <div className="flex-1 border-t border-primary/10" />
          </div>
          <p className="font-retro text-base md:text-lg text-foreground min-h-[1.5em]">
            <Typewriter key={travelText} text={travelText} onComplete={() => setTypingDone(true)} />
          </p>
          <div className="flex justify-end mt-2 min-h-[34px]">
            {typingDone && (
              <button onClick={handleTravelContinue} className="btn-neon flex items-center gap-2 font-pixel text-[10px] px-4 py-2 animate-fade-in-up">
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      );
    }

    // Event - show title, description, choices
    if (dayState === 'event' && currentEvent) {
      return (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-pixel text-[10px] text-primary crt-glow">{currentEvent.title}</span>
            <div className="flex-1 border-t-2 border-primary/20" />
          </div>
          <p className="font-retro text-base md:text-lg text-foreground leading-relaxed mb-3">
            {currentEvent.description}
          </p>
          <div className="space-y-1.5">
            {currentEvent.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceMade(choice)}
                className="w-full text-left flex items-start gap-2.5 px-3 py-2 border border-primary/20 hover:border-primary/70 hover:bg-primary/6 active:scale-[0.99] transition-all cursor-pointer group"
                style={{ borderRadius: '2px', transition: 'all 0.15s ease' }}
              >
                <span
                  className="text-primary font-pixel text-[9px] mt-0.5 shrink-0 transition-all duration-150"
                  style={{ textShadow: '0 0 6px hsl(var(--primary)/0.4)' }}
                >
                  &gt;{index + 1}
                </span>
                <span className="font-retro text-base text-foreground/70 group-hover:text-foreground transition-colors duration-150">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Event result
    if (dayState === 'event_result' && selectedChoice) {
      return (
        <div className="animate-fade-in-up">
          <p className="font-retro text-base md:text-lg text-foreground leading-relaxed mb-2">
            <Typewriter key={selectedChoice.result_text} text={selectedChoice.result_text} onComplete={() => setTypingDone(true)} />
          </p>
          {typingDone && (
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap gap-3 mb-2 font-pixel text-[9px]">
                {selectedChoice.health_delta !== 0 && (
                  <span className={selectedChoice.health_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    HP {selectedChoice.health_delta > 0 ? '+' : ''}{selectedChoice.health_delta}
                  </span>
                )}
                {selectedChoice.food_delta !== 0 && (
                  <span className={selectedChoice.food_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Food {selectedChoice.food_delta > 0 ? '+' : ''}{selectedChoice.food_delta}
                  </span>
                )}
                {selectedChoice.morale_delta !== 0 && (
                  <span className={selectedChoice.morale_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Morale {selectedChoice.morale_delta > 0 ? '+' : ''}{selectedChoice.morale_delta}
                  </span>
                )}
                {selectedChoice.money_delta !== 0 && (
                  <span className={selectedChoice.money_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                    Money {selectedChoice.money_delta > 0 ? '+' : ''}{selectedChoice.money_delta}
                  </span>
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

    return null;
  };

  return (
    <div className="h-full flex flex-col bg-background relative scanlines">
      {/* Stats bar at top */}
      <div className="p-3">
        <StatsBar stats={gameState.stats} phase={gameState.currentPhaseOrder} day={gameState.dayInPhase} />
      </div>

      {/* Main area fills remaining space and pushes HUD to bottom */}
      <div className="flex-1 flex flex-col justify-end pb-4 md:pb-6">
        {/* Event image above HUD if present */}
        {dayState === 'event' && currentEvent?.image_url && (
          <div className="mx-4 md:mx-16 lg:mx-28 mb-3 animate-fade-in-up">
            <div className="rounded-lg overflow-hidden border border-primary/10 max-h-[35vh]">
              <img src={currentEvent.image_url} alt={currentEvent.title} className="w-full h-full object-cover pixel-art" />
            </div>
          </div>
        )}

        {/* Game HUD with content + menu */}
        <GameHUD menuBar={<GameMenuBar onSaveAndExit={onMainMenu} />}>
          {renderHUDContent()}
        </GameHUD>
      </div>
    </div>
  );
}
