import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { GameHUD } from '../GameHUD';

/* ─── helpers ─── */
function TypewriterText({ text, speed = 45, onDone }: { text: string; speed?: number; onDone?: () => void }) {
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

/* ─── Scene 1: Application Approved ─── */
function VisaStampScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <filter id="visa-shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Office background - warm beige walls */}
        <rect width="500" height="280" fill="#d4c4a0" />
        {/* Floor */}
        <rect x="0" y="200" width="500" height="80" fill="#8b7355" />
        <rect x="0" y="200" width="500" height="2" fill="#6b5335" />

        {/* Window with light streaming in */}
        <rect x="20" y="30" width="70" height="90" fill="#87ceeb" stroke="#6b5335" strokeWidth="4" />
        <line x1="55" y1="30" x2="55" y2="120" stroke="#6b5335" strokeWidth="2" />
        <line x1="20" y1="75" x2="90" y2="75" stroke="#6b5335" strokeWidth="2" />
        {/* Sunbeam */}
        <polygon points="90,40 200,100 200,180 90,120" fill="#fffbe6" opacity="0.15" />

        {/* American flag on wall */}
        <rect x="380" y="25" width="4" height="100" fill="#6b5335" />
        {/* Flag */}
        <g transform="translate(384,25)">
          <rect width="60" height="35" fill="#fff" />
          {/* Red stripes */}
          {[0, 2, 4, 6, 8, 10, 12].map(i => (
            <rect key={i} x="0" y={i * (35 / 13)} width="60" height={35 / 13} fill="#b22234" />
          ))}
          {/* Blue canton */}
          <rect width="24" height="19" fill="#3c3b6e" />
          {/* Stars (simplified dots) */}
          {[3, 9, 15, 21].map(x =>
            [3, 8, 13].map(y => (
              <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" fill="#fff" />
            ))
          )}
        </g>

        {/* Desk - large wooden desk in center */}
        <rect x="120" y="130" width="260" height="70" fill="#8b6914" rx="2" />
        <rect x="120" y="130" width="260" height="4" fill="#a07818" />
        {/* Desk legs */}
        <rect x="130" y="200" width="12" height="40" fill="#6b5010" />
        <rect x="358" y="200" width="12" height="40" fill="#6b5010" />

        {/* Desk lamp */}
        <rect x="135" y="100" width="4" height="30" fill="#444" />
        <rect x="125" y="95" width="24" height="8" fill="#666" rx="2" />
        <circle cx="137" cy="93" r="3" fill="#ffee88" opacity="0.6" />

        {/* Papers / documents on desk */}
        <rect x="180" y="138" width="50" height="65" fill="#fff" stroke="#ccc" strokeWidth="1" rx="1" />
        <rect x="183" y="142" width="44" height="3" fill="#ddd" />
        <rect x="183" y="148" width="44" height="3" fill="#ddd" />
        <rect x="183" y="154" width="30" height="3" fill="#ddd" />
        <rect x="183" y="160" width="44" height="3" fill="#ddd" />
        <rect x="183" y="166" width="38" height="3" fill="#ddd" />

        {/* Passport document */}
        <g className="visa-doc">
          <rect x="260" y="136" width="55" height="68" fill="#1a3a5c" stroke="#0f2640" strokeWidth="2" rx="2" />
          {/* Gold text lines */}
          <rect x="270" y="142" width="35" height="3" fill="#c5a55a" />
          <rect x="275" y="148" width="25" height="2" fill="#c5a55a" />
          {/* Photo area */}
          <rect x="272" y="156" width="22" height="26" fill="#e8dcc8" stroke="#c5a55a" strokeWidth="1" />
          {/* Tiny photo face */}
          <circle cx="283" cy="165" r="5" fill="#d4a574" />
          <rect x="279" y="172" width="8" height="6" fill="#d4a574" rx="1" />
          {/* Gold eagle emblem */}
          <rect x="280" y="188" width="10" height="8" fill="#c5a55a" rx="1" />
        </g>

        {/* APPROVED stamp - animated */}
        <g className="visa-stamp">
          <rect x="245" y="145" width="85" height="40" fill="none" stroke="#cc0000" strokeWidth="4" rx="4"
            transform="rotate(-12, 287, 165)" />
          <text x="287" y="170" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="#cc0000"
            transform="rotate(-12, 287, 165)">
            APPROVED
          </text>
        </g>

        {/* Official sitting behind desk */}
        {/* Body */}
        <rect x="232" y="95" width="36" height="35" fill="#2c3e50" rx="2" />
        {/* Head */}
        <circle cx="250" cy="82" r="14" fill="#d4a574" />
        {/* Hair */}
        <rect x="237" y="68" width="26" height="8" fill="#4a3728" rx="2" />
        {/* Glasses */}
        <circle cx="244" cy="82" r="4" fill="none" stroke="#333" strokeWidth="1.5" />
        <circle cx="256" cy="82" r="4" fill="none" stroke="#333" strokeWidth="1.5" />
        <line x1="248" y1="82" x2="252" y2="82" stroke="#333" strokeWidth="1" />
        {/* Tie */}
        <polygon points="248,95 252,95 251,110 249,110" fill="#cc0000" />
        {/* Arms on desk */}
        <rect x="220" y="120" width="16" height="12" fill="#d4a574" rx="2" />
        <rect x="264" y="120" width="16" height="12" fill="#d4a574" rx="2" />
        {/* Pen in hand */}
        <rect x="268" y="115" width="2" height="18" fill="#333" transform="rotate(15,269,124)" />

        {/* Chair back */}
        <rect x="228" y="80" width="44" height="55" fill="#3a2a1a" rx="4" opacity="0.3" />
      </svg>

      <style>{`
        .visa-stamp {
          animation: stamp-slam 1.8s ease-out 2s both;
        }
        @keyframes stamp-slam {
          0% { opacity: 0; transform: scale(3) rotate(-12deg); }
          10% { opacity: 1; transform: scale(1.1) rotate(-12deg); }
          15% { transform: scale(1) rotate(-12deg); }
          100% { opacity: 1; transform: scale(1) rotate(-12deg); }
        }
        .visa-doc {
          animation: visa-glow 2s ease-in-out 3s infinite alternate;
        }
        @keyframes visa-glow {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.2) drop-shadow(0 0 4px #c5a55a88); }
        }
      `}</style>
    </div>
  );
}

/* ─── Scene 2: Flying to LAX ─── */
function FlyingToLAXScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
        {/* Sky gradient - sunrise/golden hour */}
        <rect width="500" height="280" fill="#1a1a3a" />
        <rect x="0" y="100" width="500" height="180" fill="#2a2a5a" opacity="0.6" />
        <rect x="0" y="160" width="500" height="120" fill="#ff6b35" opacity="0.15" />
        <rect x="0" y="200" width="500" height="80" fill="#ff8c42" opacity="0.2" />

        {/* Stars in upper sky */}
        {[
          [30, 20], [80, 45], [150, 15], [200, 50], [280, 25], [350, 40], [420, 18], [460, 55],
          [110, 35], [320, 10], [400, 48], [50, 60], [230, 30], [380, 60], [170, 55], [440, 35],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="2" height="2" fill="#fff" opacity={0.4 + Math.random() * 0.5} />
        ))}

        {/* Clouds (passing by) */}
        <g className="lax-clouds-1">
          <ellipse cx="100" cy="120" rx="40" ry="12" fill="#fff" opacity="0.15" />
          <ellipse cx="130" cy="115" rx="30" ry="10" fill="#fff" opacity="0.12" />
        </g>
        <g className="lax-clouds-2">
          <ellipse cx="350" cy="140" rx="50" ry="14" fill="#fff" opacity="0.1" />
          <ellipse cx="390" cy="135" rx="35" ry="10" fill="#fff" opacity="0.08" />
        </g>
        <g className="lax-clouds-3">
          <ellipse cx="220" cy="160" rx="45" ry="12" fill="#fff" opacity="0.12" />
        </g>

        {/* Ground / city below - Los Angeles appearing */}
        <g className="lax-ground">
          {/* Ocean to the left */}
          <rect x="0" y="230" width="200" height="50" fill="#1a4a6a" />
          {/* Beach line */}
          <rect x="180" y="230" width="20" height="50" fill="#c4a66a" />
          {/* City grid */}
          <rect x="200" y="230" width="300" height="50" fill="#2a2a2a" />
          {/* City lights / buildings */}
          {[210, 225, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460].map((x, i) => {
            const h = 8 + (i % 5) * 6;
            return (
              <g key={i}>
                <rect x={x} y={230 - h} width={8} height={h} fill="#333" />
                {/* Lit windows */}
                <rect x={x + 2} y={230 - h + 2} width="2" height="2" fill="#ffee88" opacity="0.8" />
                <rect x={x + 5} y={230 - h + 4} width="2" height="2" fill="#ffee88" opacity="0.6" />
              </g>
            );
          })}
          {/* LAX control tower */}
          <rect x="300" y="205" width="8" height="25" fill="#555" />
          <rect x="294" y="200" width="20" height="8" fill="#666" />
          <rect x="296" y="200" width="2" height="2" fill="#ff0000" className="lax-tower-light" />
          {/* Runway lights */}
          {[260, 275, 290, 305, 320, 335, 350].map((x, i) => (
            <rect key={i} x={x} y={238} width="3" height="2" fill="#88ff88" opacity="0.7" className="lax-runway-light" />
          ))}
        </g>

        {/* Airplane - descending */}
        <g className="lax-airplane">
          {/* Fuselage */}
          <ellipse cx="250" cy="130" rx="45" ry="10" fill="#e0e0e0" />
          {/* Nose */}
          <polygon points="295,130 310,128 295,126" fill="#d0d0d0" />
          {/* Cockpit windows */}
          <rect x="289" y="127" width="4" height="3" fill="#87ceeb" rx="1" />
          {/* Passenger windows */}
          {[220, 228, 236, 244, 252, 260, 268, 276, 284].map(x => (
            <rect key={x} x={x} y={127} width="3" height="3" fill="#87ceeb" rx="0.5" />
          ))}
          {/* Wings */}
          <polygon points="240,130 260,130 275,100 225,100" fill="#ccc" />
          <polygon points="240,130 260,130 275,160 225,160" fill="#ccc" opacity="0.6" />
          {/* Tail */}
          <polygon points="205,130 215,130 210,105" fill="#e0e0e0" />
          <polygon points="207,130 213,130 210,110" fill="#cc0000" />
          {/* Engines */}
          <ellipse cx="235" cy="110" rx="6" ry="4" fill="#999" />
          <ellipse cx="265" cy="110" rx="6" ry="4" fill="#999" />
          {/* Engine glow */}
          <ellipse cx="229" cy="110" rx="3" ry="2" fill="#ff8844" opacity="0.5" className="lax-engine-glow" />
          <ellipse cx="259" cy="110" rx="3" ry="2" fill="#ff8844" opacity="0.5" className="lax-engine-glow" />
        </g>

        {/* "WELCOME TO LOS ANGELES" sign glow on ground */}
        <rect x="340" y="228" width="60" height="6" fill="#ffcc00" opacity="0.3" rx="1" className="lax-welcome-glow" />
      </svg>

      <style>{`
        .lax-airplane {
          animation: plane-descend 8s ease-in-out infinite;
        }
        @keyframes plane-descend {
          0% { transform: translate(-60px, -30px) rotate(-3deg); }
          50% { transform: translate(30px, 15px) rotate(-1deg); }
          100% { transform: translate(60px, 40px) rotate(0deg); }
        }
        .lax-clouds-1 { animation: clouds-drift 12s linear infinite; }
        .lax-clouds-2 { animation: clouds-drift 18s linear infinite; animation-delay: -5s; }
        .lax-clouds-3 { animation: clouds-drift 15s linear infinite; animation-delay: -8s; }
        @keyframes clouds-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-500px); }
        }
        .lax-ground {
          animation: ground-rise 8s ease-in-out forwards;
        }
        @keyframes ground-rise {
          0% { transform: translateY(40px) scale(0.8); opacity: 0.3; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .lax-tower-light {
          animation: tower-blink 1.5s step-end infinite;
        }
        @keyframes tower-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .lax-runway-light {
          animation: runway-blink 0.8s step-end infinite alternate;
        }
        @keyframes runway-blink {
          0%, 49% { opacity: 0.9; }
          50%, 100% { opacity: 0.3; }
        }
        .lax-engine-glow {
          animation: engine-flicker 0.3s step-end infinite;
        }
        @keyframes engine-flicker {
          0% { opacity: 0.4; rx: 3; }
          50% { opacity: 0.7; rx: 4; }
        }
        .lax-welcome-glow {
          animation: welcome-pulse 2s ease-in-out infinite alternate;
        }
        @keyframes welcome-pulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Cinematic ─── */

interface Scene {
  title: string;
  text: string;
  bg: () => React.ReactNode;
}

const SCENES: Scene[] = [
  {
    title: 'APPLICATION APPROVED',
    text: "After years of waiting, you were finally sponsored to go live and work in America with a visa. It's been years since you've been home and now you will have to start a new life.",
    bg: () => <VisaStampScene />,
  },
  {
    title: 'LITTLE SAIGON',
    text: 'You finally fly to LAX and move to Garden Grove, California, which has become known as Little Saigon.',
    bg: () => <FlyingToLAXScene />,
  },
];

interface Props {
  onComplete: () => void;
}

export function MakingItToAmericaCinematic({ onComplete }: Props) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [textDone, setTextDone] = useState(false);

  const scene = SCENES[sceneIdx];

  const handleTextDone = useCallback(() => setTextDone(true), []);

  const advance = () => {
    if (sceneIdx < SCENES.length - 1) {
      setSceneIdx(s => s + 1);
      setTextDone(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Background scene */}
      {scene.bg()}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Push HUD to bottom */}
      <div className="flex-1" />

      {/* HUD with text */}
      <div className="relative z-10 pb-4 md:pb-6 px-4 md:px-8">
        <GameHUD>
          <div className="space-y-2 flex-1">
            <h2 className="font-pixel text-[8px] md:text-[10px] text-primary crt-glow tracking-widest">
              {scene.title}
            </h2>
            <p className="font-retro text-sm md:text-base text-foreground/90 leading-relaxed min-h-[3rem]">
              <TypewriterText key={sceneIdx} text={scene.text} speed={40} onDone={handleTextDone} />
            </p>
          </div>

          {/* Continue arrow */}
          {textDone && (
            <button onClick={advance} className="self-end animate-fade-in-up" aria-label="Continue">
              <ChevronRight className="w-6 h-6 text-primary animate-pulse" />
            </button>
          )}
        </GameHUD>
      </div>
    </div>
  );
}
