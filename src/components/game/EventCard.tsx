import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GameEvent, EventChoice } from '@/hooks/useGameEvents';

interface EventCardProps {
  event: GameEvent;
  onChoiceMade: (choice: EventChoice) => void;
}

export function EventCard({ event, onChoiceMade }: EventCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (choice: EventChoice) => {
    setSelectedChoice(choice);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (selectedChoice) {
      onChoiceMade(selectedChoice);
    }
  };

  return (
    <Card className="border-primary/30 bg-card animate-fade-in-up">
      {event.image_url && (
        <div className="w-full h-40 overflow-hidden border-b border-border">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover pixel-art"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="font-pixel text-sm text-primary crt-glow">
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-retro text-xl text-foreground leading-relaxed mb-4">
          {event.description}
        </p>

        {!showResult ? (
          <div className="space-y-2">
            {event.choices.map((choice, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start font-retro text-lg h-auto py-2 px-3 border-border hover:border-primary hover:text-primary transition-colors"
                onClick={() => handleChoice(choice)}
              >
                <span className="text-primary mr-2 font-pixel text-[10px]">{index + 1}.</span>
                {choice.text}
              </Button>
            ))}
          </div>
        ) : selectedChoice ? (
          <div className="space-y-3 animate-fade-in-up">
            <div className="border border-border rounded-sm p-3 bg-muted/30">
              <p className="font-retro text-xl text-foreground leading-relaxed">
                {selectedChoice.result_text}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-retro">
              {selectedChoice.health_delta !== 0 && (
                <span className={selectedChoice.health_delta > 0 ? 'text-game-food' : 'text-game-health'}>
                  Health {selectedChoice.health_delta > 0 ? '+' : ''}{selectedChoice.health_delta}
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
            <Button
              onClick={handleContinue}
              className="w-full font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80"
            >
              Continue Journey
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
