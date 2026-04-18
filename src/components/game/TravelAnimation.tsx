import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface TravelAnimationProps {
  phase: number;
  day: number;
  onContinue: () => void;
}

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
    'Someone spots land in the distance, but it is a mirage...',
    'The engine sputters but keeps running...',
    'Stars guide your path through the dark ocean...',
  ],
  3: [
    'Another day in the refugee camp...',
    'You wait in line for your ration card...',
    'Children play between the tents...',
    'News arrives about resettlement opportunities...',
    'You help build a new shelter for arriving families...',
    'A letter arrives from someone who made it to America...',
  ],
  4: [
    'The plane touches down on American soil...',
    'Everything feels strange and new...',
    'You search for work in this new land...',
    'Learning English is harder than expected...',
    'A kind stranger helps you navigate the bus system...',
    'You find a community of fellow refugees...',
  ],
};

export function TravelAnimation({ phase, day, onContinue }: TravelAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const messages = PHASE_MESSAGES[phase] || PHASE_MESSAGES[1];
    const message = messages[Math.floor(Math.random() * messages.length)];

    setDisplayText('');
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayText(message.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [phase, day]);

  return (
    <div className="border border-border rounded-sm p-4 bg-card/50 space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-pixel text-[9px] text-muted-foreground">Day {day}</span>
        <div className="flex-1 border-t border-border/50" />
      </div>

      <p className={`font-retro text-xl text-foreground min-h-[2em] ${isTyping ? 'cursor-blink' : ''}`}>
        {displayText}
      </p>

      {!isTyping && (
        <Button
          onClick={onContinue}
          className="w-full font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80 animate-fade-in-up"
        >
          Continue
        </Button>
      )}
    </div>
  );
}
