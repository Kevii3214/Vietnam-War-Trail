import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { PixelHelicopter } from './PixelHelicopter';
import { PixelCrowd } from './PixelPeople';
import { PixelBoat } from './PixelBoat';

interface CinematicProps {
  onComplete: () => void;
}

interface TypewriterProps {
  text: string;
  onComplete: () => void;
  speed?: number;
}

function Typewriter({ text, onComplete, speed = 45 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <p className="font-retro text-2xl md:text-3xl text-foreground leading-relaxed text-center px-4">
      {displayed}
      {!done && <span className="opacity-80 animate-pulse">_</span>}
    </p>
  );
}

// --- Scene 1: Helicopter Evacuation ---
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a3a1a]">
      {/* Embassy building */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] h-[70%]" viewBox="0 0 200 180" preserveAspectRatio="xMidYMax meet" style={{ imageRendering: 'pixelated' }}>
        {/* Building base */}
        <rect x="40" y="40" width="120" height="140" fill="#3a3a3a" />
        <rect x="50" y="50" width="100" height="6" fill="#555" />
        {/* Windows */}
        {[0,1,2].map(row =>
          [0,1,2,3].map(col => (
            <rect key={`w-${row}-${col}`} x={60 + col * 24} y={65 + row * 35} width="16" height="20" fill="#ffdd44" opacity={0.7} />
          ))
        )}
        {/* Roof */}
        <rect x="35" y="35" width="130" height="8" fill="#444" />
        {/* Helipad on roof */}
        <rect x="75" y="20" width="50" height="18" fill="#555" />
        <rect x="85" y="22" width="30" height="14" fill="#666" />
        {/* US Flag */}
        <rect x="95" y="8" width="2" height="14" fill="#888" />
        <rect x="97" y="8" width="12" height="8" fill="#cc2222" />
        <rect x="97" y="10" width="12" height="2" fill="#fff" />
        <rect x="97" y="14" width="12" height="2" fill="#fff" />
        {/* Door */}
        <rect x="88" y="150" width="24" height="30" fill="#222" />
      </svg>

      {/* Crowd reaching up at base */}
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        <PixelCrowd count={14} x={80} y={178} spread={16} variant="civilian" colors={['#d4a574', '#c49464', '#a47844', '#e8c9a0']} scale={1.2} />
        {/* Reaching arms */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={`arm-${i}`} x={105 + i * 20} y={170} width={3} height={10} fill="#c49464" className="cinematic-arm-reach" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </svg>

      {/* Helicopter flying away */}
      <div className="cinematic-heli-escape absolute">
        <PixelHelicopter />
      </div>

      {/* Smoke/dust particles */}
      <div className="absolute bottom-12 left-1/4 w-4 h-4 rounded-full bg-muted-foreground/20 cinematic-smoke" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-16 left-1/3 w-3 h-3 rounded-full bg-muted-foreground/15 cinematic-smoke" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-10 right-1/3 w-5 h-5 rounded-full bg-muted-foreground/10 cinematic-smoke" style={{ animationDelay: '1s' }} />
    </div>
  );
}

// --- Scene 2: Fall of Saigon ---
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0505] via-[#3a1a0a] to-[#1a1a0a]">
      {/* City skyline */}
      <svg className="absolute bottom-0 left-0 w-full h-[70%]" viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Buildings */}
        <rect x="10" y="80" width="35" height="120" fill="#2a2a2a" />
        <rect x="55" y="60" width="30" height="140" fill="#333" />
        <rect x="95" y="90" width="40" height="110" fill="#2a2a2a" />
        <rect x="145" y="50" width="25" height="150" fill="#383838" />
        <rect x="180" y="70" width="50" height="130" fill="#2a2a2a" />
        <rect x="240" y="85" width="35" height="115" fill="#333" />
        <rect x="285" y="55" width="30" height="145" fill="#2a2a2a" />
        <rect x="325" y="75" width="40" height="125" fill="#383838" />
        <rect x="375" y="90" width="25" height="110" fill="#2a2a2a" />

        {/* Windows with fire glow */}
        {[20,70,110,160,200,260,300,340].map((bx, bi) =>
          [0,1,2].map(row => (
            <rect key={`fw-${bi}-${row}`} x={bx + 5} y={90 + row * 28} width={8} height={10}
              fill={bi % 2 === 0 ? '#ff4400' : '#ff8800'} opacity={0.8}
              className="cinematic-fire-glow" style={{ animationDelay: `${bi * 0.2 + row * 0.3}s` }}
            />
          ))
        )}

        {/* Fire/flames on some buildings */}
        {[30, 120, 200, 310].map((fx, fi) => (
          <g key={`fire-${fi}`}>
            <rect x={fx} y={75 - fi * 3} width={6} height={12} fill="#ff4400" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4}s` }} />
            <rect x={fx + 8} y={80 - fi * 2} width={5} height={10} fill="#ff6600" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4 + 0.2}s` }} />
            <rect x={fx + 4} y={70 - fi * 3} width={4} height={8} fill="#ffaa00" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4 + 0.1}s` }} />
          </g>
        ))}

        {/* Marching soldiers */}
        <g className="cinematic-march">
          <PixelCrowd count={10} x={-30} y={170} spread={18} variant="soldier" colors={['#2d4a1a', '#3a5a2a', '#1a3a0a', '#2a4a1a']} scale={1.3} />
        </g>

        {/* Tank */}
        <g className="cinematic-march" style={{ animationDelay: '-0.5s' }}>
          <rect x={-60} y={178} width={40} height={16} fill="#3a4a2a" />
          <rect x={-50} y={172} width={20} height={8} fill="#4a5a3a" />
          <rect x={-35} y={169} width={18} height={4} fill="#2a3a1a" />
          {/* Wheels */}
          <rect x={-58} y={194} width={8} height={6} fill="#222" />
          <rect x={-46} y={194} width={8} height={6} fill="#222" />
          <rect x={-34} y={194} width={8} height={6} fill="#222" />
        </g>
      </svg>

      {/* Red sky glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-orange-900/20 cinematic-fire-glow" />
    </div>
  );
}

// --- Scene 3: Citizens Fleeing ---
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a1a2a] via-[#1a2a1a] to-[#2a3a1a]">
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Road */}
        <rect x="0" y="185" width="400" height="35" fill="#4a4a3a" />
        <rect x="0" y="188" width="400" height="2" fill="#5a5a4a" />

        {/* Trees in background */}
        {[30, 90, 170, 270, 340].map((tx, ti) => (
          <g key={`tree-${ti}`}>
            <rect x={tx} y={120} width={6} height={65} fill="#3a2a1a" />
            <rect x={tx - 10} y={100} width={26} height={25} fill="#1a4a1a" />
            <rect x={tx - 6} y={90} width={18} height={15} fill="#2a5a2a" />
          </g>
        ))}

        {/* Distant buildings (Saigon skyline) */}
        <rect x="0" y="140" width="400" height="2" fill="#333" opacity="0.3" />
        {[20, 50, 80, 100, 130, 150].map((bx, bi) => (
          <rect key={`db-${bi}`} x={bx} y={130 - bi * 2} width={15} height={55 + bi * 2} fill="#222" opacity={0.3} />
        ))}

        {/* Smoke rising from city */}
        {[40, 80, 120].map((sx, si) => (
          <rect key={`s-${si}`} x={sx} y={90 - si * 10} width={4} height={40} fill="#555" opacity={0.2}
            className="cinematic-smoke-rise" style={{ animationDelay: `${si * 0.5}s` }}
          />
        ))}

        {/* Running people - group moving right */}
        <g className="cinematic-flee">
          <PixelCrowd count={12} x={-20} y={163} spread={20} variant="running" colors={['#d4a574', '#c49464', '#a47844', '#e8c9a0', '#b8946a']} scale={1.4} />
          {/* Bundles/belongings on backs */}
          {[0,2,4,7,9].map(i => (
            <rect key={`bundle-${i}`} x={-10 + i * 20} y={160} width={8} height={6} fill="#8B7355" rx={1} />
          ))}
        </g>
      </svg>

      {/* Dust particles */}
      <div className="absolute bottom-8 right-0 w-full h-8 bg-gradient-to-l from-amber-900/20 via-transparent to-transparent cinematic-dust" />
    </div>
  );
}

// --- Scene 4: Fleeing by Boat ---
function Scene4() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a2a] via-[#0a2a4a] to-[#0a3a5a]">
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Shoreline */}
        <rect x="0" y="160" width="120" height="60" fill="#6a6a3a" />
        <rect x="80" y="165" width="60" height="55" fill="#5a5a2a" />
        {/* Beach edge */}
        <rect x="100" y="160" width="40" height="4" fill="#8a8a5a" />

        {/* Ocean */}
        <rect x="120" y="164" width="280" height="56" fill="#0a3a6a" />

        {/* Waves */}
        {[140, 180, 220, 260, 300, 340].map((wx, wi) => (
          <rect key={`wave-${wi}`} x={wx} y={170 + (wi % 2) * 8} width={20} height={2}
            fill="#2a6a9a" className="cinematic-wave" style={{ animationDelay: `${wi * 0.3}s` }}
          />
        ))}

        {/* Palm trees on shore */}
        <g>
          <rect x="30" y="110" width={4} height={50} fill="#5a3a1a" />
          <rect x="18" y="100" width={10} height={6} fill="#2a7a2a" />
          <rect x="30" y="96" width={12} height={6} fill="#3a8a3a" />
          <rect x="22" y="92" width={8} height={6} fill="#2a7a2a" />
        </g>
        <g>
          <rect x="70" y="120" width={4} height={40} fill="#5a3a1a" />
          <rect x="60" y="112" width={10} height={5} fill="#2a7a2a" />
          <rect x="72" y="108" width={10} height={5} fill="#3a8a3a" />
        </g>

        {/* People on shore waiting */}
        <PixelCrowd count={6} x={60} y={138} spread={12} variant="civilian" colors={['#d4a574', '#c49464', '#a47844']} scale={1} />

        {/* Boats heading out to sea */}
        <g className="cinematic-boat-1">
          <PixelBoat x={130} y={135} scale={1.5} />
          {/* People in boat */}
          <PixelCrowd count={3} x={138} y={138} spread={8} variant="civilian" colors={['#d4a574', '#c49464']} scale={0.6} />
        </g>

        <g className="cinematic-boat-2">
          <PixelBoat x={230} y={128} scale={1.2} />
          <PixelCrowd count={2} x={236} y={131} spread={7} variant="civilian" colors={['#a47844', '#e8c9a0']} scale={0.5} />
        </g>

        <g className="cinematic-boat-3">
          <PixelBoat x={310} y={140} scale={1} />
        </g>

        {/* Moon */}
        <circle cx="350" cy="40" r="18" fill="#ffffcc" opacity="0.7" />
        <circle cx="354" cy="38" r="14" fill="#0a0a2a" opacity="0.4" />

        {/* Stars */}
        {[50,120,200,280,370,160,330,70].map((sx, si) => (
          <rect key={`star-${si}`} x={sx} y={20 + (si * 7) % 60} width={2} height={2}
            fill="#fff" opacity={0.6} className="cinematic-twinkle" style={{ animationDelay: `${si * 0.4}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

// --- Main Cinematic Controller ---
const SCENES = [
  {
    text: 'America has pulled out of the Vietnam War.',
    Component: Scene1,
  },
  {
    text: 'Saigon falls to the Viet Cong on April 30, 1975 and is renamed Ho Chi Minh City.',
    Component: Scene2,
  },
  {
    text: 'The Vietnam War (called the American War in Vietnam) has ended.',
    Component: Scene3,
  },
  {
    text: 'People now begin to flee from Communist Vietnam by fishing boats.',
    Component: Scene4,
  },
];

export function EscapingVietnamCinematic({ onComplete }: CinematicProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [textDone, setTextDone] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setArrowVisible(true), 600);
  }, []);

  const handleNext = useCallback(() => {
    if (!arrowVisible) return;

    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex(s => s + 1);
      setTextDone(false);
      setArrowVisible(false);
    } else {
      onComplete();
    }
  }, [sceneIndex, arrowVisible, onComplete]);

  const scene = SCENES[sceneIndex];

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Full-screen scene background */}
      <div key={sceneIndex} className="animate-fade-in-up">
        <scene.Component />
      </div>

      {/* Overlay UI on top of scene */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8 md:pb-16">
        {/* Scene counter */}
        <div className="flex justify-center gap-2 mb-4">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === sceneIndex ? 'bg-primary' : i < sceneIndex ? 'bg-primary/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Text area with dark backdrop */}
        <div className="mx-4 md:mx-auto md:max-w-2xl bg-background/80 backdrop-blur-sm border border-border/50 rounded-sm p-6">
          {/* Typewriter text */}
          <div className="min-h-[60px] flex items-center justify-center">
            <Typewriter
              key={sceneIndex}
              text={scene.text}
              onComplete={handleTextDone}
            />
          </div>

          {/* Next arrow */}
          <div className="flex justify-center h-10 mt-3">
            {arrowVisible && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 font-pixel text-[10px] text-primary hover:text-primary/80 transition-colors animate-fade-in-up cursor-pointer group"
              >
                {sceneIndex < SCENES.length - 1 ? 'Continue' : 'Begin Your Journey'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines z-20" />
    </div>
  );
}
