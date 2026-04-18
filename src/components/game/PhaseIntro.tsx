import { Button } from '@/components/ui/button';
import type { GamePhase } from '@/hooks/useGameEvents';

interface PhaseIntroProps {
  phase: GamePhase;
  onContinue: () => void;
}

const PHASE_COLORS = [
  '',
  'text-game-phase1',
  'text-game-phase2',
  'text-game-phase3',
  'text-game-phase4',
];

export function PhaseIntro({ phase, onContinue }: PhaseIntroProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-6 animate-fade-in-up">
        {phase.image_url && (
          <div className="w-full h-48 overflow-hidden rounded-sm border border-border mx-auto">
            <img
              src={phase.image_url}
              alt={phase.name}
              className="w-full h-full object-cover pixel-art"
            />
          </div>
        )}

        <div className="space-y-2">
          <p className="font-pixel text-[10px] text-muted-foreground uppercase tracking-widest">
            Phase {phase.phase_order} of 4
          </p>
          <h1 className={`font-pixel text-lg md:text-xl crt-glow ${PHASE_COLORS[phase.phase_order] || 'text-primary'}`}>
            {phase.name}
          </h1>
        </div>

        {phase.description && (
          <p className="font-retro text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-md mx-auto">
            {phase.description}
          </p>
        )}

        <div className="border-t border-border pt-6">
          <Button
            onClick={onContinue}
            className="font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80 px-8"
          >
            Begin
          </Button>
        </div>
      </div>
    </div>
  );
}
