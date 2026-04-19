import { useState } from 'react';
import { Eye, Film, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { CityFallsScene } from '@/components/game/scenes/CityFallsScene';
import { ReeducationCampScene } from '@/components/game/scenes/ReeducationCampScene';
import { AcquiringBoatScene } from '@/components/game/scenes/AcquiringBoatScene';
import { StormAtSeaScene } from '@/components/game/scenes/StormAtSeaScene';
import { PiratesScene } from '@/components/game/scenes/PiratesScene';
import { CoastGuardScene } from '@/components/game/scenes/CoastGuardScene';
import { EngineFailureScene } from '@/components/game/scenes/EngineFailureScene';
import { SickPassengerScene } from '@/components/game/scenes/SickPassengerScene';
import { AnotherBoatScene } from '@/components/game/scenes/AnotherBoatScene';
import { RationDayScene } from '@/components/game/scenes/RationDayScene';
import { InterviewDayScene } from '@/components/game/scenes/InterviewDayScene';
import { LanguageClassScene } from '@/components/game/scenes/LanguageClassScene';
import { TheLetterScene } from '@/components/game/scenes/TheLetterScene';
import { WaitingScene } from '@/components/game/scenes/WaitingScene';
import { EscapingVietnamCinematic } from '@/components/game/scenes/EscapingVietnamCinematic';
import { TravelingByBoatCinematic } from '@/components/game/scenes/TravelingByBoatCinematic';
import { RefugeeCampCinematic } from '@/components/game/scenes/RefugeeCampCinematic';

type SceneEntry = {
  key: string;
  label: string;
  phase: string;
  type: 'event' | 'cinematic';
  render: (onComplete?: () => void) => React.ReactNode;
};

const SCENES: SceneEntry[] = [
  // Phase 1 cinematics
  { key: 'cin-escaping', label: 'Escaping Vietnam', phase: 'Phase 1', type: 'cinematic', render: (onComplete) => <EscapingVietnamCinematic onComplete={onComplete || (() => {})} /> },

  // Phase 1 events
  { key: 'city-falls', label: 'The City Falls', phase: 'Phase 1', type: 'event', render: () => <CityFallsScene /> },
  { key: 'reeducation-camp', label: 'Reeducation Registration', phase: 'Phase 1', type: 'event', render: () => <ReeducationCampScene /> },
  { key: 'acquiring-boat', label: 'Acquiring a Boat Directly', phase: 'Phase 1', type: 'event', render: () => <AcquiringBoatScene /> },

  // Phase 2 cinematics
  { key: 'cin-boat', label: 'Traveling by Boat', phase: 'Phase 2', type: 'cinematic', render: (onComplete) => <TravelingByBoatCinematic onComplete={onComplete || (() => {})} /> },

  // Phase 2 events
  { key: 'storm-at-sea', label: 'Storm at Sea', phase: 'Phase 2', type: 'event', render: () => <StormAtSeaScene /> },
  { key: 'pirates', label: 'Pirates!', phase: 'Phase 2', type: 'event', render: () => <PiratesScene /> },
  { key: 'coast-guard', label: 'Coast Guard Patrol', phase: 'Phase 2', type: 'event', render: () => <CoastGuardScene /> },
  { key: 'engine-failure', label: 'Engine Failure', phase: 'Phase 2', type: 'event', render: () => <EngineFailureScene /> },
  { key: 'sick-passenger', label: 'A Sick Passenger', phase: 'Phase 2', type: 'event', render: () => <SickPassengerScene /> },
  { key: 'another-boat', label: 'Another Boat Sighted', phase: 'Phase 2', type: 'event', render: () => <AnotherBoatScene /> },

  // Phase 3 cinematics
  { key: 'cin-refugee', label: 'Refugee Camp', phase: 'Phase 3', type: 'cinematic', render: (onComplete) => <RefugeeCampCinematic onComplete={onComplete || (() => {})} /> },

  // Phase 3 events
  { key: 'ration-day', label: 'Ration Day', phase: 'Phase 3', type: 'event', render: () => <RationDayScene /> },
  { key: 'interview-day', label: 'Interview Day', phase: 'Phase 3', type: 'event', render: () => <InterviewDayScene /> },
  { key: 'language-classes', label: 'Language Classes', phase: 'Phase 3', type: 'event', render: () => <LanguageClassScene /> },
  { key: 'the-letter', label: 'The Letter', phase: 'Phase 3', type: 'event', render: () => <TheLetterScene /> },
  { key: 'waiting', label: 'Waiting', phase: 'Phase 3', type: 'event', render: () => <WaitingScene /> },
];

const PHASES = ['Phase 1', 'Phase 2', 'Phase 3'];

export function ScenePreviewer() {
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<string | null>(null);

  const filtered = filterPhase ? SCENES.filter(s => s.phase === filterPhase) : SCENES;

  const currentScene = SCENES.find(s => s.key === activeScene);

  if (currentScene) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-3 bg-muted border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            {currentScene.type === 'cinematic' ? (
              <Film className="w-4 h-4 text-accent" />
            ) : (
              <Eye className="w-4 h-4 text-primary" />
            )}
            <span className="font-pixel text-[8px] text-foreground">
              {currentScene.phase} &bull; {currentScene.label}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="font-pixel text-[8px]"
            onClick={() => setActiveScene(null)}
          >
            Close
          </Button>
        </div>

        {/* Scene content */}
        <div className="flex-1 relative overflow-hidden">
          {currentScene.render(() => setActiveScene(null))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Phase filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filterPhase === null ? 'default' : 'outline'}
          size="sm"
          className="font-pixel text-[8px]"
          onClick={() => setFilterPhase(null)}
        >
          All
        </Button>
        {PHASES.map(p => (
          <Button
            key={p}
            variant={filterPhase === p ? 'default' : 'outline'}
            size="sm"
            className="font-pixel text-[8px]"
            onClick={() => setFilterPhase(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      {/* Scene grid */}
      <div className="grid gap-2">
        {filtered.map(scene => (
          <button
            key={scene.key}
            onClick={() => setActiveScene(scene.key)}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/10 hover:border-primary/30 transition-colors text-left group"
          >
            <div className="shrink-0 w-8 h-8 rounded bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {scene.type === 'cinematic' ? (
                <Film className="w-4 h-4 text-accent" />
              ) : (
                <Play className="w-3 h-3 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-pixel text-[8px] text-foreground truncate">{scene.label}</p>
              <p className="font-retro text-xs text-muted-foreground">
                {scene.phase} &bull; {scene.type === 'cinematic' ? 'Cinematic' : 'Event Scene'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
