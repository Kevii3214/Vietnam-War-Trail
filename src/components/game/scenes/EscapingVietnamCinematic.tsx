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
    <p className="font-retro text-base md:text-lg lg:text-xl text-foreground leading-relaxed text-center">
      {displayed}
      {!done && <span className="opacity-80 animate-pulse">_</span>}
    </p>
  );
}

/* Pixel-art styled dialog box with decorative corners */
function PixelDialogBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-8 md:mx-24 lg:mx-40">
      {/* Outer pixel border */}
      <div className="absolute -inset-[3px] bg-primary/50" style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }} />
      {/* Inner background */}
      <div
        className="relative bg-background/90 backdrop-blur-sm px-5 py-3 md:px-8 md:py-4"
        style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
        {/* Horizontal accent lines */}
        <div className="absolute top-1.5 left-6 right-6 h-px bg-primary/20" />
        <div className="absolute bottom-1.5 left-6 right-6 h-px bg-primary/20" />
        {children}
      </div>
    </div>
  );
}

// --- Scene 1: Helicopter Evacuation ---
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a3a1a]">
      {/* Embassy building - large and centered */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[55%] h-[75%]" viewBox="0 0 200 180" preserveAspectRatio="xMidYMax meet" style={{ imageRendering: 'pixelated' }}>
        {/* Building base */}
        <rect x="30" y="30" width="140" height="150" fill="#3a3a3a" />
        <rect x="25" y="25" width="150" height="8" fill="#4a4a4a" />
        <rect x="40" y="38" width="120" height="4" fill="#555" />
        {/* Column details */}
        {[0,1,2,3,4].map(i => (
          <rect key={`col-${i}`} x={45 + i * 28} y={42} width={6} height="138" fill="#4a4a4a" />
        ))}
        {/* Windows - multiple rows with glow */}
        {[0,1,2,3].map(row =>
          [0,1,2,3,4].map(col => (
            <g key={`w-${row}-${col}`}>
              <rect x={53 + col * 24} y={50 + row * 30} width="14" height="18" fill="#ffdd44" opacity={0.6 + Math.random() * 0.3} />
              <rect x={55 + col * 24} y={52 + row * 30} width="10" height="14" fill="#ffee88" opacity={0.3} />
            </g>
          ))
        )}
        {/* Helipad on roof */}
        <rect x="65" y="12" width="70" height="18" fill="#555" />
        <rect x="75" y="14" width="50" height="12" fill="#666" />
        <text x="100" y="23" textAnchor="middle" fill="#888" fontSize="7" fontFamily="monospace">H</text>
        {/* US Flag */}
        <rect x="98" y="-2" width="2" height="16" fill="#aaa" />
        <rect x="100" y="-2" width="16" height="10" fill="#cc2222" />
        <rect x="100" y="0" width="16" height="2" fill="#fff" />
        <rect x="100" y="4" width="16" height="2" fill="#fff" />
        <rect x="100" y="-2" width="6" height="5" fill="#224488" />
        {/* Grand entrance */}
        <rect x="82" y="145" width="36" height="35" fill="#222" />
        <rect x="80" y="140" width="40" height="6" fill="#555" />
      </svg>

      {/* Crowd at base - larger */}
      <svg className="absolute bottom-0 left-0 w-full h-[50%]" viewBox="0 0 500 120" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        <PixelCrowd count={18} x={80} y={68} spread={20} variant="civilian" colors={['#d4a574', '#c49464', '#a47844', '#e8c9a0', '#b8946a']} scale={2} />
        {/* Reaching arms */}
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <rect key={`arm-${i}`} x={110 + i * 25} y={55} width={4} height={18} fill="#c49464" className="cinematic-arm-reach" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </svg>

      {/* Helicopter flying away - bigger */}
      <div className="cinematic-heli-escape absolute" style={{ top: '5%', left: '30%' }}>
        <PixelHelicopter />
      </div>

      {/* Smoke/dust particles */}
      <div className="absolute bottom-16 left-1/4 w-6 h-6 rounded-full bg-muted-foreground/25 cinematic-smoke" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 left-[35%] w-5 h-5 rounded-full bg-muted-foreground/20 cinematic-smoke" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-14 right-1/3 w-7 h-7 rounded-full bg-muted-foreground/15 cinematic-smoke" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-24 left-[45%] w-4 h-4 rounded-full bg-muted-foreground/20 cinematic-smoke" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}

// --- Scene 2: Fall of Saigon ---
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0505] via-[#3a1a0a] to-[#1a1a0a]">
      {/* City skyline - taller buildings */}
      <svg className="absolute bottom-0 left-0 w-full h-[80%]" viewBox="0 0 500 250" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Buildings - varied heights */}
        <rect x="0" y="60" width="45" height="190" fill="#2a2a2a" />
        <rect x="55" y="30" width="40" height="220" fill="#333" />
        <rect x="105" y="70" width="50" height="180" fill="#2a2a2a" />
        <rect x="165" y="20" width="35" height="230" fill="#383838" />
        <rect x="210" y="50" width="60" height="200" fill="#2a2a2a" />
        <rect x="280" y="65" width="45" height="185" fill="#333" />
        <rect x="335" y="25" width="40" height="225" fill="#2a2a2a" />
        <rect x="385" y="55" width="55" height="195" fill="#383838" />
        <rect x="450" y="75" width="50" height="175" fill="#2a2a2a" />

        {/* Windows with fire glow */}
        {[15,70,120,180,230,300,350,400,465].map((bx, bi) =>
          [0,1,2,3].map(row => (
            <rect key={`fw-${bi}-${row}`} x={bx + 5} y={80 + row * 35} width={10} height={14}
              fill={bi % 2 === 0 ? '#ff4400' : '#ff8800'} opacity={0.8}
              className="cinematic-fire-glow" style={{ animationDelay: `${bi * 0.2 + row * 0.3}s` }}
            />
          ))
        )}

        {/* Fire/flames */}
        {[25, 130, 240, 360, 470].map((fx, fi) => (
          <g key={`fire-${fi}`}>
            <rect x={fx} y={55 - fi * 4} width={8} height={16} fill="#ff4400" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4}s` }} />
            <rect x={fx + 10} y={60 - fi * 3} width={7} height={14} fill="#ff6600" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4 + 0.2}s` }} />
            <rect x={fx + 5} y={50 - fi * 4} width={6} height={10} fill="#ffaa00" className="cinematic-flame" style={{ animationDelay: `${fi * 0.4 + 0.1}s` }} />
          </g>
        ))}

        {/* Road */}
        <rect x="0" y="240" width="500" height="10" fill="#4a4a3a" />

        {/* Marching soldiers - larger */}
        <g className="cinematic-march">
          <PixelCrowd count={12} x={-30} y={195} spread={22} variant="soldier" colors={['#2d4a1a', '#3a5a2a', '#1a3a0a', '#2a4a1a']} scale={2} />
        </g>

        {/* Tank - bigger */}
        <g className="cinematic-march" style={{ animationDelay: '-0.5s' }}>
          <rect x={-90} y={210} width={60} height={24} fill="#3a4a2a" />
          <rect x={-78} y={200} width={36} height={14} fill="#4a5a3a" />
          <rect x={-50} y={196} width={30} height={5} fill="#2a3a1a" />
          {/* Treads */}
          <rect x={-88} y={234} width={56} height={8} fill="#222" />
          <rect x={-86} y={234} width={8} height={8} fill="#333" />
          <rect x={-74} y={234} width={8} height={8} fill="#333" />
          <rect x={-62} y={234} width={8} height={8} fill="#333" />
          <rect x={-50} y={234} width={8} height={8} fill="#333" />
          {/* Star */}
          <rect x={-68} y={215} width={6} height={6} fill="#cc2222" />
        </g>
      </svg>

      {/* Red sky glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-orange-900/25 cinematic-fire-glow" />
    </div>
  );
}

// --- Scene 3: Citizens Fleeing ---
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a1a2a] via-[#1a2a1a] to-[#2a3a1a]">
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 500 280" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Road */}
        <rect x="0" y="235" width="500" height="45" fill="#4a4a3a" />
        <rect x="0" y="240" width="500" height="2" fill="#5a5a4a" />
        <rect x="0" y="260" width="500" height="1" fill="#5a5a4a" opacity="0.5" />

        {/* Distant Saigon skyline */}
        {[10, 35, 55, 75, 95, 115, 135, 155].map((bx, bi) => (
          <rect key={`db-${bi}`} x={bx} y={150 - bi * 4} width={18} height={85 + bi * 4} fill="#222" opacity={0.35} />
        ))}

        {/* Smoke columns from city */}
        {[30, 70, 110, 140].map((sx, si) => (
          <g key={`s-${si}`}>
            <rect x={sx} y={100 - si * 12} width={6} height={55} fill="#555" opacity={0.25}
              className="cinematic-smoke-rise" style={{ animationDelay: `${si * 0.5}s` }}
            />
            <rect x={sx + 3} y={90 - si * 12} width={4} height={40} fill="#444" opacity={0.15}
              className="cinematic-smoke-rise" style={{ animationDelay: `${si * 0.5 + 0.3}s` }}
            />
          </g>
        ))}

        {/* Trees */}
        {[200, 280, 350, 430].map((tx, ti) => (
          <g key={`tree-${ti}`}>
            <rect x={tx} y={160} width={8} height={75} fill="#3a2a1a" />
            <rect x={tx - 14} y={135} width={36} height={30} fill="#1a4a1a" />
            <rect x={tx - 8} y={120} width={24} height={20} fill="#2a5a2a" />
          </g>
        ))}

        {/* Running people - large group */}
        <g className="cinematic-flee">
          <PixelCrowd count={14} x={-20} y={185} spread={24} variant="running" colors={['#d4a574', '#c49464', '#a47844', '#e8c9a0', '#b8946a']} scale={2.2} />
          {/* Bundles on backs */}
          {[0,2,4,6,8,10,12].map(i => (
            <rect key={`bundle-${i}`} x={-8 + i * 24} y={182} width={10} height={8} fill="#8B7355" rx={1} />
          ))}
        </g>
      </svg>

      {/* Dust */}
      <div className="absolute bottom-12 right-0 w-full h-12 bg-gradient-to-l from-amber-900/25 via-transparent to-transparent cinematic-dust" />
    </div>
  );
}

// --- Scene 4: Fleeing by Boat ---
function Scene4() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a1a3a] to-[#0a3a5a]">
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 500 280" preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }}>
        {/* Shoreline */}
        <rect x="0" y="195" width="150" height="85" fill="#5a5a2a" />
        <rect x="100" y="200" width="80" height="80" fill="#4a4a1a" />
        <rect x="120" y="195" width="50" height="5" fill="#7a7a4a" />

        {/* Ocean */}
        <rect x="140" y="200" width="360" height="80" fill="#0a3a6a" />

        {/* Waves - more of them */}
        {[160, 200, 240, 280, 320, 360, 400, 440].map((wx, wi) => (
          <rect key={`wave-${wi}`} x={wx} y={210 + (wi % 3) * 10} width={24} height={3}
            fill="#2a6a9a" className="cinematic-wave" style={{ animationDelay: `${wi * 0.25}s` }}
          />
        ))}

        {/* Moon reflection on water */}
        {[340, 355, 370].map((rx, ri) => (
          <rect key={`ref-${ri}`} x={rx} y={215 + ri * 3} width={8} height={2} fill="#ffffcc" opacity={0.15 - ri * 0.03}
            className="cinematic-twinkle" style={{ animationDelay: `${ri * 0.6}s` }}
          />
        ))}

        {/* Palm trees - bigger */}
        <g>
          <rect x="30" y="120" width={6} height={75} fill="#5a3a1a" />
          <rect x="14" y="105" width={14} height={8} fill="#2a7a2a" />
          <rect x="30" y="98" width={16} height={8} fill="#3a8a3a" />
          <rect x="20" y="92" width={12} height={8} fill="#2a7a2a" />
        </g>
        <g>
          <rect x="80" y="135" width={6} height={60} fill="#5a3a1a" />
          <rect x="68" y="125" width={12} height={7} fill="#2a7a2a" />
          <rect x="82" y="120" width={14} height={7} fill="#3a8a3a" />
          <rect x="72" y="116" width={10} height={6} fill="#2a7a2a" />
        </g>

        {/* People on shore */}
        <PixelCrowd count={8} x={40} y={155} spread={14} variant="civilian" colors={['#d4a574', '#c49464', '#a47844', '#e8c9a0']} scale={1.8} />

        {/* Boat 1 - close, large */}
        <g className="cinematic-boat-1">
          <PixelBoat x={130} y={145} scale={2.5} />
          <PixelCrowd count={3} x={148} y={155} spread={10} variant="civilian" colors={['#d4a574', '#c49464']} scale={0.9} />
        </g>

        {/* Boat 2 - mid distance */}
        <g className="cinematic-boat-2">
          <PixelBoat x={280} y={138} scale={2} />
          <PixelCrowd count={2} x={294} y={147} spread={9} variant="civilian" colors={['#a47844', '#e8c9a0']} scale={0.7} />
        </g>

        {/* Boat 3 - far away */}
        <g className="cinematic-boat-3">
          <PixelBoat x={400} y={155} scale={1.4} />
        </g>

        {/* Moon */}
        <circle cx="420" cy="45" r="24" fill="#ffffcc" opacity="0.8" />
        <circle cx="426" cy="42" r="18" fill="#050510" opacity="0.4" />

        {/* Stars */}
        {[40,100,160,230,300,380,450,70,190,310,420,140,260,350].map((sx, si) => (
          <rect key={`star-${si}`} x={sx} y={15 + (si * 11) % 80} width={2} height={2}
            fill="#fff" opacity={0.5 + (si % 3) * 0.15} className="cinematic-twinkle" style={{ animationDelay: `${si * 0.35}s` }}
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
  const [, setTextDone] = useState(false);
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
      <div key={sceneIndex} className="absolute inset-0 animate-fade-in-up">
        <scene.Component />
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-3 md:pb-5">
        {/* Scene dots */}
        <div className="flex justify-center gap-2 mb-4">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-colors duration-300 ${
                i === sceneIndex ? 'bg-primary' : i < sceneIndex ? 'bg-primary/40' : 'bg-muted'
              }`}
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />
          ))}
        </div>

        {/* Pixel dialog box with text */}
        <PixelDialogBox>
          <div className="min-h-[40px] flex items-center justify-center">
            <Typewriter
              key={sceneIndex}
              text={scene.text}
              onComplete={handleTextDone}
            />
          </div>
          {/* Continue button inside box, bottom right */}
          <div className="flex justify-end h-6 mt-1">
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
        </PixelDialogBox>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines z-20" />
    </div>
  );
}
