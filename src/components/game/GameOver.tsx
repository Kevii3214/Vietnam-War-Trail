import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import type { GameStats } from '@/hooks/useGameState';
import { Skull, RotateCcw, Home } from 'lucide-react';

interface GameOverProps {
  isVictory: boolean;
  reason: string | null;
  stats: GameStats;
  phase: number;
  day: number;
  onNewGame: () => void;
  onMainMenu: () => void;
}

/* ─── Typewriter ─── */
function TypewriterText({ text, speed = 35, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); onDone?.(); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, onDone]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

/* ─── Victory Background ─── */
function VictoryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
        {/* Warm sunset sky */}
        <rect width="500" height="280" fill="#1a1a3a" />
        <rect x="0" y="60" width="500" height="220" fill="#2a1a4a" opacity="0.5" />
        <rect x="0" y="120" width="500" height="160" fill="#ff6b35" opacity="0.12" />
        <rect x="0" y="180" width="500" height="100" fill="#ff8c42" opacity="0.15" />

        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <rect key={i} x={15 + (i * 67) % 480} y={8 + (i * 37) % 70} width="2" height="2" fill="#fff" opacity={0.3 + (i % 4) * 0.15}
            className="victory-star" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}

        {/* Little Saigon street */}
        <rect x="0" y="200" width="500" height="80" fill="#3a3a3a" />
        <rect x="0" y="198" width="500" height="4" fill="#555" />

        {/* Sidewalk */}
        <rect x="0" y="210" width="500" height="6" fill="#888" />

        {/* Buildings - Vietnamese shops */}
        {[
          { x: 10, w: 60, h: 80, color: '#cc3333', sign: 'PHO' },
          { x: 80, w: 55, h: 70, color: '#e8a832', sign: 'BANH MI' },
          { x: 145, w: 50, h: 75, color: '#3377aa', sign: '' },
          { x: 205, w: 65, h: 85, color: '#cc3333', sign: '' },
          { x: 280, w: 55, h: 70, color: '#dda040', sign: '' },
          { x: 345, w: 60, h: 78, color: '#336644', sign: '' },
          { x: 415, w: 55, h: 72, color: '#aa3344', sign: '' },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={200 - b.h} width={b.w} height={b.h} fill={b.color} />
            <rect x={b.x} y={200 - b.h} width={b.w} height={4} fill="#fff" opacity="0.15" />
            {/* Windows with warm light */}
            {Array.from({ length: Math.floor(b.w / 14) }).map((_, wi) =>
              Array.from({ length: Math.floor(b.h / 18) }).map((_, hi) => (
                <rect key={`${wi}-${hi}`}
                  x={b.x + 4 + wi * 14} y={200 - b.h + 8 + hi * 18}
                  width="8" height="10" fill="#ffee88" opacity={0.5 + Math.random() * 0.4}
                  rx="1" />
              ))
            )}
            {/* Sign */}
            {b.sign && (
              <g>
                <rect x={b.x + 5} y={200 - 20} width={b.w - 10} height="14" fill="#fff" opacity="0.9" rx="1" />
                <text x={b.x + b.w / 2} y={200 - 10} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#cc0000" fontWeight="bold">{b.sign}</text>
              </g>
            )}
          </g>
        ))}

        {/* "LITTLE SAIGON" arch sign */}
        <g className="victory-sign">
          <rect x="150" y="90" width="200" height="30" fill="#cc0000" rx="3" stroke="#ffcc00" strokeWidth="2" />
          <text x="250" y="110" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="#ffcc00">LITTLE SAIGON</text>
          {/* Arch poles */}
          <rect x="155" y="120" width="6" height="80" fill="#888" />
          <rect x="339" y="120" width="6" height="80" fill="#888" />
        </g>

        {/* Lanterns strung between buildings */}
        {[60, 110, 160, 210, 260, 310, 360, 410].map((x, i) => (
          <g key={i} className="victory-lantern" style={{ animationDelay: `${i * 0.3}s` }}>
            <line x1={x - 15} y1={115} x2={x + 15} y2={115} stroke="#333" strokeWidth="0.5" />
            <ellipse cx={x} cy={120} rx="5" ry="7" fill={i % 2 === 0 ? '#ff3333' : '#ffcc00'} />
            <rect x={x - 1} y={114} width="2" height="3" fill="#666" />
            <ellipse cx={x} cy={120} rx="3" ry="4" fill="#fff" opacity="0.15" />
          </g>
        ))}

        {/* Family walking together */}
        <g className="victory-family">
          {/* Father */}
          <circle cx="230" cy="196" r="5" fill="#d4a574" />
          <rect x="226" y="201" width="8" height="12" fill="#2c5f7c" rx="1" />
          <rect x="224" y="213" width="4" height="6" fill="#1a1a1a" />
          <rect x="232" y="213" width="4" height="6" fill="#1a1a1a" />
          {/* Mother */}
          <circle cx="248" cy="196" r="5" fill="#d4a574" />
          <rect x="244" y="201" width="8" height="14" fill="#cc5588" rx="1" />
          <rect x="242" y="215" width="4" height="4" fill="#1a1a1a" />
          <rect x="250" y="215" width="4" height="4" fill="#1a1a1a" />
          {/* You (protagonist) */}
          <circle cx="260" cy="198" r="4" fill="#d4a574" />
          <rect x="257" y="202" width="6" height="10" fill="#4a7a5a" rx="1" />
          <rect x="255" y="212" width="4" height="5" fill="#1a1a1a" />
          <rect x="261" y="212" width="4" height="5" fill="#1a1a1a" />
        </g>

        {/* Fireworks */}
        {[
          { cx: 80, cy: 40, color: '#ff4444', delay: '0s' },
          { cx: 350, cy: 30, color: '#ffcc00', delay: '1.5s' },
          { cx: 200, cy: 25, color: '#44ff88', delay: '3s' },
          { cx: 420, cy: 45, color: '#ff66aa', delay: '4.5s' },
          { cx: 140, cy: 35, color: '#44aaff', delay: '2s' },
        ].map((fw, i) => (
          <g key={i} className="victory-firework" style={{ animationDelay: fw.delay }}>
            {Array.from({ length: 8 }).map((_, j) => {
              const angle = (j / 8) * Math.PI * 2;
              return (
                <line key={j}
                  x1={fw.cx} y1={fw.cy}
                  x2={fw.cx + Math.cos(angle) * 15} y2={fw.cy + Math.sin(angle) * 15}
                  stroke={fw.color} strokeWidth="2" strokeLinecap="round" />
              );
            })}
            <circle cx={fw.cx} cy={fw.cy} r="3" fill="#fff" />
          </g>
        ))}
      </svg>

      <style>{`
        .victory-star {
          animation: star-twinkle 2s ease-in-out infinite alternate;
        }
        @keyframes star-twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        .victory-sign {
          animation: sign-glow 2s ease-in-out infinite alternate;
        }
        @keyframes sign-glow {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.3) drop-shadow(0 0 8px #ffcc0066); }
        }
        .victory-lantern {
          animation: lantern-sway 3s ease-in-out infinite alternate;
        }
        @keyframes lantern-sway {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        .victory-family {
          animation: family-walk 6s linear infinite;
        }
        @keyframes family-walk {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        .victory-firework {
          animation: firework-burst 3s ease-out infinite;
        }
        @keyframes firework-burst {
          0% { opacity: 0; transform: scale(0); }
          10% { opacity: 1; transform: scale(0.3); }
          30% { opacity: 1; transform: scale(1); }
          60% { opacity: 0.5; transform: scale(1.3); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}

export function GameOver({ isVictory, reason, stats, phase, day, onNewGame, onMainMenu }: GameOverProps) {
  const phaseNames = ['', 'Escaping Vietnam', 'Traveling by Boat', 'Refugee Camp', 'Making it to America'];
  const [textDone, setTextDone] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setShowButtons(true), 600);
  }, []);

  // Death screen
  if (!isVictory) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6 scanlines">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
          <Skull className="w-16 h-16 text-destructive mx-auto" />

          <h1 className="font-pixel text-xl text-destructive">Journey Ended</h1>
          <p className="font-retro text-xl text-foreground/80">{reason}</p>

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
              <RotateCcw className="w-3 h-3 mr-1" /> Try Again
            </Button>
            <Button onClick={onMainMenu} variant="outline" className="font-pixel text-[10px]">
              <Home className="w-3 h-3 mr-1" /> Main Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Victory screen
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Animated Little Saigon background */}
      <VictoryBackground />

      {/* Dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full text-center space-y-5 animate-fade-in-up">
          {/* Title */}
          <h1 className="font-pixel text-lg md:text-2xl text-primary crt-glow tracking-wider">
            YOU MADE IT TO AMERICA
          </h1>

          {/* Story text */}
          <div className="min-h-[5rem] px-4">
            <p className="font-retro text-base md:text-lg text-foreground/90 leading-relaxed">
              <TypewriterText
                text="Against all odds, your family has survived the journey. From the fall of Saigon, across the open sea, through the refugee camps, and now here -- in Little Saigon, Garden Grove, California. The road was long. The cost was high. But you are here. And you are free."
                speed={35}
                onDone={handleTextDone}
              />
            </p>
          </div>

          {/* Stats card - fades in after text */}
          {textDone && (
            <div className="animate-fade-in-up border border-primary/20 rounded-sm p-4 bg-card/80 backdrop-blur-sm text-left space-y-1 mx-auto max-w-sm">
              <p className="font-pixel text-[9px] text-primary/70 mb-2">Journey Complete</p>
              <div className="font-retro text-sm space-y-1">
                <p className="text-game-health">Health: {stats.health}</p>
                <p className="text-game-food">Food: {stats.food}</p>
                <p className="text-game-morale">Morale: {stats.morale}</p>
                <p className="text-game-money">Money: {stats.money}</p>
              </div>
            </div>
          )}

          {/* Buttons - fade in after stats */}
          {showButtons && (
            <div className="flex gap-3 justify-center animate-fade-in-up">
              <Button onClick={onNewGame} className="font-pixel text-[10px]">
                <RotateCcw className="w-3 h-3 mr-1" /> Play Again
              </Button>
              <Button onClick={onMainMenu} variant="outline" className="font-pixel text-[10px]">
                <Home className="w-3 h-3 mr-1" /> Main Menu
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
