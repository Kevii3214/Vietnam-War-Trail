import { Button } from '@/components/ui/button';
import type { GameStats } from '@/hooks/useGameState';
import { Skull, Trophy } from 'lucide-react';

interface GameOverProps {
  isVictory: boolean;
  reason: string | null;
  stats: GameStats;
  phase: number;
  day: number;
  onNewGame: () => void;
  onMainMenu: () => void;
}

export function GameOver({ isVictory, reason, stats, phase, day, onNewGame, onMainMenu }: GameOverProps) {
  const phaseNames = ['', 'Escaping Vietnam', 'Traveling by Boat', 'Refugee Camp', 'Making it to America'];

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
        {isVictory ? (
          <Trophy className="w-16 h-16 text-primary mx-auto crt-glow" />
        ) : (
          <Skull className="w-16 h-16 text-destructive mx-auto" />
        )}

        <h1 className={`font-pixel text-xl crt-glow ${isVictory ? 'text-primary' : 'text-destructive'}`}>
          {isVictory ? 'You Made It!' : 'Journey Ended'}
        </h1>

        {isVictory ? (
          <p className="font-retro text-xl text-foreground/80">
            Against all odds, you have survived the journey and made it to America.
            A new chapter begins.
          </p>
        ) : (
          <p className="font-retro text-xl text-foreground/80">{reason}</p>
        )}

        <div className="border border-border rounded-sm p-4 bg-card text-left space-y-1">
          <p className="font-pixel text-[9px] text-muted-foreground mb-2">Final Stats</p>
          <div className="font-retro text-lg space-y-1">
            <p className="text-foreground">
              Reached: <span className="text-primary">{phaseNames[phase]}</span>, Day {day}
            </p>
            <p className="text-game-health">Health: {stats.health}</p>
            <p className="text-game-food">Food: {stats.food}</p>
            <p className="text-game-morale">Morale: {stats.morale}</p>
            <p className="text-game-money">Money: {stats.money}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={onNewGame} className="font-pixel text-[10px]">
            Try Again
          </Button>
          <Button onClick={onMainMenu} variant="outline" className="font-pixel text-[10px]">
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
