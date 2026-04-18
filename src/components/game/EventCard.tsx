import type { GameEvent, EventChoice } from '@/hooks/useGameEvents';

interface EventCardProps {
  event: GameEvent;
  onChoiceMade: (choice: EventChoice) => void;
}

export function EventCard({ event, onChoiceMade }: EventCardProps) {
  return (
    <div className="border border-primary/30 bg-card animate-fade-in-up p-4 space-y-3">
      <p className="font-pixel text-sm text-primary crt-glow">{event.title}</p>
      <p className="font-retro text-xl text-foreground leading-relaxed">{event.description}</p>
      <div className="space-y-2">
        {event.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onChoiceMade(choice)}
            className="w-full text-left px-3 py-2 border border-border hover:border-primary font-retro text-lg"
          >
            <span className="text-primary mr-2 font-pixel text-[10px]">{index + 1}.</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
