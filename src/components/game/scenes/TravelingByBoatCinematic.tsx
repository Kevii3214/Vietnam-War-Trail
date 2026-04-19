import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { GameMenuBar } from '../GameMenuBar';
import { DialogueBox, DialogueTypewriter } from '../DialogueBox';
import { PixelPerson } from './PixelPeople';

interface CinematicProps {
  onComplete: () => void;
  onNarrate?: (text: string) => void;
}

// ===========================================================================
// SCENE 1 — GOING TO THE BOAT
// Walking down a nighttime pier toward a distant fishing boat
// ===========================================================================
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a1020] to-[#0a1828]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a18" />

        {/* Stars */}
        {[
          [40, 12], [90, 28], [140, 8], [200, 22], [250, 16], [300, 6], [340, 30],
          [380, 14], [420, 24], [460, 10], [60, 40], [170, 36], [280, 42], [430, 38],
          [120, 50], [320, 48], [475, 52], [20, 55], [220, 58],
        ].map(([x, y], i) => (
          <rect
            key={`star-${i}`}
            x={x} y={y}
            width="1.5" height="1.5"
            fill="#f0e8d0"
            opacity={0.4 + (i % 3) * 0.2}
            className="cinematic-twinkle-star"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Moon – low crescent */}
        <circle cx="420" cy="42" r="14" fill="#d8d0a0" opacity="0.3" />
        <circle cx="420" cy="42" r="10" fill="#e8e0c0" opacity="0.5" />
        <circle cx="414" cy="38" r="10" fill="#0a0a18" />

        {/* Moonlight path on water */}
        {[...Array(8)].map((_, i) => (
          <rect
            key={`moonref-${i}`}
            x={408 + Math.sin(i * 1.2) * 6}
            y={140 + i * 10}
            width={12 - i}
            height="2"
            fill="#d8d0a0"
            opacity={0.12 - i * 0.01}
          />
        ))}

        {/* Distant shoreline (homeland) behind you */}
        <polygon
          points="0,120 30,114 70,118 120,110 170,116 220,108 280,114 340,106 400,112 450,104 500,110 500,128 0,128"
          fill="#0a0f18"
          className="p2-shore-recede"
        />
        {/* Tiny city lights on shore */}
        {[20, 55, 90, 130, 180, 230, 290, 350, 410, 460].map((lx, li) => (
          <rect
            key={`shorelight-${li}`}
            x={lx} y={112 + (li % 3) * 2}
            width="2" height="2"
            fill="#ffcc66"
            opacity={0.3 + (li % 2) * 0.15}
            className="cinematic-lamp-flicker"
            style={{ animationDelay: `${li * 0.4}s` }}
          />
        ))}

        {/* Water */}
        <rect x="0" y="128" width="500" height="152" fill="#0a1828" />
        {/* Ripple lines */}
        {[134, 148, 162, 176, 190, 204, 218, 232, 246, 260].map((y, i) => (
          <line
            key={`rip-${y}`}
            x1={-10} y1={y}
            x2={510} y2={y}
            stroke="#1a2838"
            strokeWidth="1"
            opacity={0.3}
            className="p2-wave-drift"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Wooden pier / dock — receding perspective */}
        {/* Planks */}
        <polygon points="180,230 320,230 290,128 210,128" fill="#3a2a18" />
        <polygon points="180,230 320,230 290,128 210,128" fill="none" stroke="#2a1a0a" strokeWidth="1" />
        {/* Plank grain lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const t = i / 7;
          const topX = 215 + t * 70;
          const botX = 188 + t * 124;
          return (
            <line key={`grain-${i}`} x1={topX} y1={130} x2={botX} y2={228} stroke="#2a1a0a" strokeWidth="0.5" opacity="0.5" />
          );
        })}
        {/* Cross planks */}
        {[140, 160, 180, 200, 220].map((y, i) => {
          const t = (y - 128) / 102;
          const lx = 210 - t * 30;
          const rx = 290 + t * 30;
          return (
            <line key={`cross-${i}`} x1={lx} y1={y} x2={rx} y2={y} stroke="#4a3a24" strokeWidth={1 + t} opacity={0.7} />
          );
        })}

        {/* Pilings */}
        {[140, 170, 200].map((y, i) => {
          const t = (y - 128) / 102;
          const lx = 210 - t * 30 - 3;
          const rx = 290 + t * 30 + 3;
          return (
            <g key={`piling-${i}`}>
              <rect x={lx - 2} y={y} width={4} height={16 + i * 4} fill="#2a1a0a" />
              <rect x={rx - 2} y={y} width={4} height={16 + i * 4} fill="#2a1a0a" />
            </g>
          );
        })}

        {/* Boat at end of pier (small, distant) */}
        <g transform="translate(250, 126)" className="p2-boat-wait">
          <polygon points="-10,4 -8,8 8,8 10,4" fill="#3a2a14" />
          <rect x="-6" y="2" width="12" height="3" fill="#4a3a20" />
          <rect x="0" y="-8" width="2" height="10" fill="#3a2a18" />
          {/* Tiny lantern on mast */}
          <rect x="-1" y="-10" width="4" height="3" fill="#ffcc44" opacity="0.8" className="cinematic-lamp-flicker" />
        </g>

        {/* Your family walking toward boat — silhouettes moving up the pier */}
        {/* Father (ahead, slightly smaller = further away) */}
        <g className="p2-walk-forward-1">
          <PixelPerson
            x={0} y={0} scale={1.0} variant="civilian"
            color="#1a1a2a" shirtColor="#1a1a2a" pantsColor="#0a0a18"
            hairColor="#0a0a18" accentColor="#2a2a3a"
            mood="determined" sway="idle"
          />
          {/* Bundle */}
          <rect x={-4} y={-2} width={6} height={5} fill="#1a1a2a" />
        </g>

        {/* You (middle) */}
        <g className="p2-walk-forward-2">
          <PixelPerson
            x={0} y={0} scale={1.1} variant="civilian"
            color="#1a1a2a" shirtColor="#1a1a2a" pantsColor="#0a0a18"
            hairColor="#0a0a18" accentColor="#2a2a3a"
            mood="determined" sway="idle" swayDelay={0.3}
          />
        </g>

        {/* Mother (behind, slightly larger = closer) */}
        <g className="p2-walk-forward-3">
          <PixelPerson
            x={0} y={0} scale={1.2} variant="civilian"
            color="#1a1a2a" shirtColor="#1a1a2a" pantsColor="#0a0a18"
            hairColor="#0a0a18" accentColor="#2a2a3a"
            mood="sad" sway="idle" swayDelay={0.6}
          />
          {/* Small bag */}
          <rect x={12} y={2} width={5} height={4} fill="#1a1a2a" />
        </g>

        {/* Fog / mist layer */}
        <rect x="0" y="120" width="500" height="16" fill="#1a2030" opacity="0.4" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="40" fill="#000" opacity="0.4" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 2 — GETTING ON THE BOAT
// People crossing a plank one at a time onto a crowded fishing boat
// ===========================================================================
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a18] via-[#0a1020] to-[#0a1828]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Night sky */}
        <rect x="0" y="0" width="500" height="130" fill="#0a0a18" />

        {/* Stars */}
        {[30, 80, 140, 210, 270, 330, 390, 450].map((x, i) => (
          <rect key={`s-${i}`} x={x} y={8 + (i % 4) * 14} width="1.5" height="1.5" fill="#e0d8c0"
            opacity={0.3 + (i % 3) * 0.2}
            className="cinematic-twinkle-star" style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Water */}
        <rect x="0" y="130" width="500" height="150" fill="#0a1828" />
        {[140, 155, 170, 185, 200, 215, 230, 245, 260].map((y, i) => (
          <line key={`wr-${y}`} x1={-10} y1={y} x2={510} y2={y} stroke="#1a2a3a" strokeWidth="1" opacity="0.25"
            className="p2-wave-drift" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Dock edge (left side) */}
        <rect x="0" y="180" width="165" height="10" fill="#4a3a24" />
        <rect x="0" y="178" width="165" height="4" fill="#5a4a30" />
        {/* Piling under dock */}
        <rect x="40" y="188" width="5" height="30" fill="#3a2a14" />
        <rect x="100" y="188" width="5" height="30" fill="#3a2a14" />
        <rect x="155" y="188" width="5" height="30" fill="#3a2a14" />

        {/* Plank bridging dock to boat */}
        <g transform="rotate(-8 165 182)">
          <rect x="155" y="180" width="80" height="4" fill="#6a5a3a" />
          <rect x="155" y="180" width="80" height="1" fill="#8a7a50" />
        </g>

        {/* The fishing boat */}
        <g transform="translate(290, 155)" className="p2-boat-gentle-rock">
          {/* Hull */}
          <polygon points="-50,18 -40,34 50,34 60,18" fill="#3a2a14" />
          <polygon points="-50,18 -40,34 50,34 60,18" fill="none" stroke="#2a1a0a" strokeWidth="1" />
          <line x1="-42" y1="26" x2="52" y2="26" stroke="#2a1a0a" strokeWidth="1" />
          {/* Deck */}
          <rect x="-42" y="14" width="94" height="6" fill="#4a3a20" />
          {/* Cabin */}
          <rect x="-36" y="0" width="30" height="14" fill="#3a2a14" />
          <rect x="-32" y="2" width="8" height="8" fill="#0a0a18" />
          <rect x="-20" y="2" width="8" height="8" fill="#0a0a18" />
          {/* Mast */}
          <rect x="20" y="-30" width="3" height="44" fill="#3a2a18" />
          {/* Furled sail */}
          <rect x="16" y="-28" width="12" height="5" fill="#b0a880" />
          <rect x="16" y="-23" width="12" height="3" fill="#908868" />
          {/* Lantern on mast */}
          <rect x="18" y="-32" width="6" height="4" fill="#ffcc44" opacity="0.75" className="cinematic-lamp-flicker" />
          {/* Engine housing at stern */}
          <rect x="34" y="4" width="16" height="10" fill="#2a2a2a" />
          <rect x="38" y="0" width="4" height="6" fill="#1a1a1a" />
          {/* Exhaust */}
          <rect x="39" y="-4" width="2" height="4" fill="#3a3a3a" opacity="0.5" className="cinematic-smoke-rise" />

          {/* People already on boat (strangers, huddled) */}
          {[
            { x: -30, y: 6, scale: 0.7, shirt: '#2a2a3a', mood: 'scared' as const },
            { x: -16, y: 8, scale: 0.65, shirt: '#3a2a1a', mood: 'sad' as const },
            { x: -6, y: 6, scale: 0.7, shirt: '#1a2a3a', mood: 'weary' as const },
            { x: 4, y: 8, scale: 0.6, shirt: '#3a3a2a', mood: 'scared' as const },
            { x: 12, y: 6, scale: 0.7, shirt: '#2a1a2a', mood: 'sad' as const },
            { x: 30, y: 8, scale: 0.65, shirt: '#2a3a2a', mood: 'weary' as const },
            { x: 40, y: 6, scale: 0.6, shirt: '#3a2a3a', mood: 'scared' as const },
          ].map((p, i) => (
            <g key={`seated-${i}`}>
              <PixelPerson
                x={p.x} y={p.y} scale={p.scale} variant="civilian"
                color="#c4956a" shirtColor={p.shirt} pantsColor="#1a1a1a"
                hairColor="#1a0a04" accentColor="#4a4a4a"
                mood={p.mood} sway="idle" swayDelay={i * 0.2}
              />
            </g>
          ))}
        </g>

        {/* Father already across - on the boat deck, waiting */}
        <g transform="translate(260, 163)" className="p2-boat-gentle-rock">
          <PixelPerson
            x={0} y={0} scale={0.85} variant="civilian"
            color="#c4956a" shirtColor="#4a3a2a" pantsColor="#2a2018"
            hairColor="#1a0f08" accentColor="#8a8070"
            mood="determined" sway="idle"
          />
        </g>

        {/* You - walking the plank (animated slowly crossing) */}
        <g className="p2-cross-plank">
          <PixelPerson
            x={0} y={0} scale={1.0} variant="civilian"
            color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
            hairColor="#1a0f08" accentColor="#8a7a5a"
            mood="scared" sway="idle" swayDelay={0.2}
          />
        </g>

        {/* Mother - waiting on dock, next in line */}
        <g transform="translate(130, 162)">
          <PixelPerson
            x={0} y={0} scale={1.1} variant="civilian"
            color="#c4956a" shirtColor="#5a3a2a" pantsColor="#2a1a18"
            hairColor="#2a1810" accentColor="#d0b080"
            mood="scared" sway="scared" swayDelay={0.4}
          />
          {/* Clutching a bag */}
          <rect x={-4} y={6} width={6} height={5} fill="#4a3a20" />
        </g>

        {/* Others waiting behind mother on dock */}
        {[80, 55, 30].map((px, i) => (
          <g key={`dockwait-${i}`} transform={`translate(${px}, ${164 + i * 2})`}>
            <PixelPerson
              x={0} y={0} scale={0.9 - i * 0.05} variant="civilian"
              color="#c4956a" shirtColor={['#3a3a4a', '#4a3a3a', '#2a3a2a'][i]}
              pantsColor="#1a1a1a" hairColor="#1a0a04" accentColor="#5a5a5a"
              mood="weary" sway="idle" swayDelay={0.5 + i * 0.3}
            />
          </g>
        ))}

        {/* Water splashing against hull */}
        {[240, 260, 340, 350].map((sx, si) => (
          <rect key={`splash-${si}`}
            x={sx} y={186 + si % 3}
            width="3" height="2"
            fill="#2a4a6a" opacity="0.4"
            className="cinematic-splash"
            style={{ animationDelay: `${si * 0.3}s` }}
          />
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="35" fill="#000" opacity="0.5" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 3 — THE BOAT DEPARTS
// Boat moving away from shore, shore shrinking, open water ahead
// ===========================================================================
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a1020] to-[#0a1830]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Deep night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a18" />

        {/* Stars – many, to show the vastness */}
        {[
          [18, 8], [55, 22], [90, 12], [130, 32], [165, 6], [200, 26], [235, 14],
          [270, 36], [305, 10], [340, 28], [375, 18], [410, 38], [445, 8], [480, 24],
          [35, 44], [105, 48], [180, 42], [250, 50], [320, 46], [400, 54], [460, 40],
          [70, 56], [150, 60], [295, 58], [370, 52], [430, 62],
        ].map(([x, y], i) => (
          <rect key={`star-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#e8e0c0"
            opacity={0.3 + (i % 4) * 0.15}
            className="cinematic-twinkle-star" style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Receding shoreline — fading away */}
        <g className="p2-shore-vanish">
          <polygon
            points="0,94 40,88 90,92 150,84 220,90 300,82 380,88 440,80 500,86 500,100 0,100"
            fill="#0a0f14"
          />
          {/* City silhouette on shore, tiny */}
          {[30, 80, 140, 200, 280, 340, 420, 470].map((bx, bi) => (
            <rect key={`bld-${bi}`} x={bx} y={80 + (bi % 3) * 2} width={8} height={14 - (bi % 4) * 2} fill="#0a0a10" />
          ))}
          {/* Fading lights */}
          {[40, 100, 160, 230, 300, 380, 450].map((lx, li) => (
            <rect key={`fl-${li}`} x={lx} y={84 + li % 3} width="1.5" height="1.5" fill="#ffcc66" opacity="0.2" />
          ))}
        </g>

        {/* River/sea water */}
        <rect x="0" y="100" width="500" height="180" fill="#0a1828" />

        {/* Animated water ripples */}
        {[110, 125, 140, 155, 170, 185, 200, 215, 230, 245, 260].map((y, i) => (
          <line key={`wr-${y}`} x1={-10} y1={y} x2={510} y2={y}
            stroke="#1a2a3a" strokeWidth="1" opacity={0.2}
            className="p2-wave-drift" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Wake trail behind the boat (V-shape) */}
        <g className="p2-wake-grow">
          <line x1="250" y1="180" x2="200" y2="260" stroke="#1a3050" strokeWidth="2" opacity="0.3" />
          <line x1="250" y1="180" x2="300" y2="260" stroke="#1a3050" strokeWidth="2" opacity="0.3" />
          <line x1="250" y1="185" x2="210" y2="260" stroke="#1a2a40" strokeWidth="1" opacity="0.2" />
          <line x1="250" y1="185" x2="290" y2="260" stroke="#1a2a40" strokeWidth="1" opacity="0.2" />
        </g>

        {/* The boat — center, moving forward (away from shore) */}
        <g transform="translate(250, 152)" className="p2-boat-depart">
          {/* Hull */}
          <polygon points="-40,14 -34,26 40,26 46,14" fill="#3a2a14" />
          <polygon points="-40,14 -34,26 40,26 46,14" fill="none" stroke="#2a1a0a" strokeWidth="1" />
          <line x1="-36" y1="20" x2="42" y2="20" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-34" y="10" width="76" height="6" fill="#4a3a20" />
          {/* Cabin */}
          <rect x="-28" y="-2" width="24" height="12" fill="#3a2a14" />
          <rect x="-24" y="0" width="6" height="6" fill="#0a0a18" />
          <rect x="-14" y="0" width="6" height="6" fill="#0a0a18" />
          {/* Mast */}
          <rect x="16" y="-26" width="2" height="36" fill="#3a2a18" />
          {/* Furled sail */}
          <rect x="12" y="-24" width="10" height="4" fill="#b0a880" />
          {/* Lantern */}
          <rect x="14" y="-28" width="6" height="4" fill="#ffcc44" opacity="0.7" className="cinematic-lamp-flicker" />
          {/* Engine exhaust */}
          <rect x="32" y="0" width="12" height="10" fill="#2a2a2a" />
          <g className="cinematic-smoke-rise" style={{ animationDuration: '2s' }}>
            <rect x="35" y="-8" width="3" height="8" fill="#3a3a4a" opacity="0.4" />
          </g>
          <g className="cinematic-smoke-rise" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
            <rect x="37" y="-12" width="2" height="6" fill="#2a2a3a" opacity="0.3" />
          </g>

          {/* Passengers huddled (silhouettes) */}
          {[-20, -10, 0, 8, 16, 26, 34].map((px, pi) => (
            <g key={`pass-${pi}`}>
              {/* Simple silhouette heads + bodies */}
              <rect x={px} y={2 + (pi % 2)} width={4} height={4} fill="#1a1a2a" />
              <rect x={px - 1} y={6 + (pi % 2)} width={6} height={5} fill={pi % 3 === 0 ? '#2a2a3a' : '#1a1a2a'} />
            </g>
          ))}

          {/* You — looking forward, not back */}
          <g transform="translate(-5, 2)">
            <PixelPerson
              x={0} y={0} scale={0.7} variant="civilian"
              color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
              hairColor="#1a0f08" accentColor="#6a6a7a"
              mood="determined" sway="idle"
            />
          </g>
        </g>

        {/* Distant birds (leaving the shore too) */}
        {[120, 160, 200].map((bx, bi) => (
          <g key={`bird-${bi}`}
            transform={`translate(${bx}, ${70 + bi * 3})`}
            className="p2-birds-fly"
            style={{ animationDelay: `${bi * 1.5}s` }}
          >
            <line x1="0" y1="0" x2="-3" y2="-2" stroke="#3a3a4a" strokeWidth="1" />
            <line x1="0" y1="0" x2="3" y2="-2" stroke="#3a3a4a" strokeWidth="1" />
          </g>
        ))}

        {/* Very subtle fog layer at waterline */}
        <rect x="0" y="96" width="500" height="10" fill="#1a2030" opacity="0.35" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="35" fill="#000" opacity="0.4" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENES ARRAY & MAIN EXPORT
// ===========================================================================
const SCENES = [
  {
    label: 'GOING TO THE BOAT',
    badge: 'THE PIER · NIGHT',
    text: 'As you approach the boat, you do not look back at your homeland. You are afraid that if you look, you will stop.',
    Component: Scene1,
  },
  {
    label: 'GETTING ON THE BOAT',
    badge: 'THE PIER · NIGHT',
    text: 'One at a time across a plank of wood. Nobody speaks above a whisper. Your father goes first. You follow. Your mother last. You look onward and realize you do not know many of these people. However, they are the only people in your world until who knows when.',
    Component: Scene2,
  },
  {
    label: 'THE BOAT',
    badge: 'THE RIVER · NIGHT',
    text: 'Finally, the boat moves. The bank falls away. The city disappears around a bend in the river. This is the part that cannot be undone.',
    Component: Scene3,
  },
];

export function TravelingByBoatCinematic({ onComplete, onNarrate }: CinematicProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [, setTextDone] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  // Narrate when scene changes
  useEffect(() => {
    onNarrate?.(SCENES[sceneIndex].text);
  }, [sceneIndex, onNarrate]);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setArrowVisible(true), 500);
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
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Scene-local keyframes */}
      <style>{`
        /* Star twinkling */
        @keyframes p2-twinkle-star {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .cinematic-twinkle-star { animation: p2-twinkle-star 2.2s ease-in-out infinite; }

        /* Water ripple drift */
        @keyframes p2-wave-drift {
          0%   { transform: translateX(0); opacity: 0.2; }
          50%  { transform: translateX(8px); opacity: 0.35; }
          100% { transform: translateX(0); opacity: 0.2; }
        }
        .p2-wave-drift { animation: p2-wave-drift 3s ease-in-out infinite; }

        /* Scene 1: shore receding slightly */
        @keyframes p2-shore-recede {
          0%   { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
        .p2-shore-recede { animation: p2-shore-recede 12s ease-out forwards; }

        /* Scene 1: boat lantern waiting */
        @keyframes p2-boat-wait {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1px); }
        }
        .p2-boat-wait { animation: p2-boat-wait 3s ease-in-out infinite; }

        /* Scene 1: family walking forward along pier */
        @keyframes p2-walk-forward {
          0%   { transform: translate(var(--wf-sx), var(--wf-sy)); }
          100% { transform: translate(var(--wf-ex), var(--wf-ey)); }
        }
        .p2-walk-forward-1 {
          --wf-sx: 240px; --wf-sy: 200px; --wf-ex: 248px; --wf-ey: 160px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
        }
        .p2-walk-forward-2 {
          --wf-sx: 232px; --wf-sy: 210px; --wf-ex: 244px; --wf-ey: 172px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
          animation-delay: 0.8s;
        }
        .p2-walk-forward-3 {
          --wf-sx: 224px; --wf-sy: 218px; --wf-ex: 238px; --wf-ey: 184px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
          animation-delay: 1.6s;
        }

        /* Scene 2: boat gentle rock */
        @keyframes p2-boat-gentle-rock {
          0%, 100% { transform: rotate(-0.5deg) translateY(0); }
          50%      { transform: rotate(0.5deg) translateY(-2px); }
        }
        .p2-boat-gentle-rock { animation: p2-boat-gentle-rock 4s ease-in-out infinite; transform-origin: center bottom; }

        /* Scene 2: You crossing the plank */
        @keyframes p2-cross-plank {
          0%   { transform: translate(155px, 168px); }
          50%  { transform: translate(195px, 162px); }
          100% { transform: translate(235px, 158px); }
        }
        .p2-cross-plank {
          animation: p2-cross-plank 8s ease-in-out infinite alternate;
        }

        /* Scene 3: shore vanishing */
        @keyframes p2-shore-vanish {
          0%   { opacity: 0.7; transform: translateY(0) scaleY(1); }
          100% { opacity: 0.15; transform: translateY(4px) scaleY(0.6); }
        }
        .p2-shore-vanish { animation: p2-shore-vanish 14s ease-out forwards; transform-origin: center bottom; }

        /* Scene 3: boat departing (subtle drift upward = moving away) */
        @keyframes p2-boat-depart {
          0%   { transform: translate(250px, 152px) scale(1); }
          100% { transform: translate(250px, 142px) scale(0.92); }
        }
        .p2-boat-depart { animation: p2-boat-depart 14s ease-out forwards; transform-origin: center center; }

        /* Scene 3: wake growing */
        @keyframes p2-wake-grow {
          0%   { opacity: 0; transform: scaleY(0.3); }
          100% { opacity: 0.5; transform: scaleY(1); }
        }
        .p2-wake-grow { animation: p2-wake-grow 10s ease-out forwards; transform-origin: center top; }

        /* Scene 3: birds flying */
        @keyframes p2-birds-fly {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-80px, -30px); }
        }
        .p2-birds-fly { animation: p2-birds-fly 12s linear infinite; }
      `}</style>

      {/* --- Scene region (top) --- */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div key={sceneIndex} className="absolute inset-0 animate-fade-in-up">
          <scene.Component />
        </div>

        {/* Progress dots */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex gap-1">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-colors duration-300 ${
                i === sceneIndex
                  ? 'bg-primary'
                  : i < sceneIndex
                  ? 'bg-primary/50'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Period badge */}
        {scene.badge && (
          <div
            key={`badge-${sceneIndex}`}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 animate-fade-in-up"
          >
            <div className="font-retro text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-primary bg-black/70 backdrop-blur-sm border border-white/70 px-3 py-1">
              {scene.badge}
            </div>
          </div>
        )}

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none scanlines z-10" />
      </div>

      {/* --- Text panel (bottom) --- standardised dialogue box --- */}
      <div className="relative shrink-0 px-4 md:px-8 pt-1.5 pb-2 md:pb-3">
        <DialogueBox menuBar={<GameMenuBar onSaveAndExit={onComplete} />}>
          <button
            type="button"
            onClick={handleNext}
            disabled={!arrowVisible}
            className="w-full text-left focus:outline-none disabled:cursor-default cursor-pointer"
          >
            <DialogueTypewriter
              key={sceneIndex}
              text={scene.text}
              label={scene.label}
              onComplete={handleTextDone}
            />

            {arrowVisible && (
              <div className="absolute right-2 bottom-1 md:right-3 md:bottom-2 animate-fade-in-up">
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white animate-pulse" />
              </div>
            )}
          </button>
        </DialogueBox>
      </div>
    </div>
  );
}
