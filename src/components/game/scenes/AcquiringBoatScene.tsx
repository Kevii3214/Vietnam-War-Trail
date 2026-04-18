import { useEffect, useState } from 'react';

export function AcquiringBoatScene() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => f + 1), 100);
    return () => clearInterval(timer);
  }, []);

  const waveCycle = Math.sin(frame * 0.08);
  const waveOffset = waveCycle * 3;

  // Protagonist negotiating – slight lean-in animation
  const leanCycle = frame % 40;
  const leanX = leanCycle < 20 ? 1 : 0;

  // Seller gesturing
  const gestureUp = frame % 30 < 15 ? -2 : 0;

  // Money exchange sparkle
  const showSparkle = frame > 60 && frame % 16 < 8;
  const sparkleOpacity = showSparkle ? 0.8 : 0;

  // Water shimmer
  const shimmerFrame = frame * 0.4;

  // Boat gentle bob
  const boatBob = Math.sin(frame * 0.06) * 2;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        {/* Sky – dusk, warm tones */}
        <defs>
          <linearGradient id="ab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2040" />
            <stop offset="40%" stopColor="#5a3050" />
            <stop offset="70%" stopColor="#8a5030" />
            <stop offset="100%" stopColor="#c07028" />
          </linearGradient>
          <linearGradient id="ab-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3a5a" />
            <stop offset="100%" stopColor="#1a2030" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="180" fill="url(#ab-sky)" />

        {/* Sun setting */}
        <circle cx="260" cy="58" r="16" fill="#e08020" opacity="0.7" />
        <circle cx="260" cy="58" r="12" fill="#f0a030" opacity="0.5" />

        {/* Distant coastline */}
        <polygon points="0,78 40,72 80,76 120,70 160,74 200,68 240,72 280,66 320,74 320,85 0,85" fill="#2a3020" />

        {/* Water */}
        <rect x="0" y="85" width="320" height="95" fill="url(#ab-water)" />

        {/* Sun reflection on water */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={`sunref-${i}`}
            x={248 + Math.sin(shimmerFrame * 0.2 + i) * 4}
            y={88 + i * 8}
            width={8 - i}
            height="2"
            fill="#e08020"
            opacity={0.3 - i * 0.04}
          />
        ))}

        {/* Water ripple lines */}
        {[90, 100, 110, 120, 130, 140, 150, 160, 170].map((y, i) => (
          <line
            key={`ripple-${y}`}
            x1={Math.sin(shimmerFrame * 0.15 + i * 2) * 10}
            y1={y}
            x2={320 + Math.sin(shimmerFrame * 0.15 + i * 2) * 10}
            y2={y}
            stroke="#3a5a7a"
            strokeWidth="1"
            opacity={0.2 + Math.sin(shimmerFrame * 0.1 + i) * 0.1}
          />
        ))}

        {/* Dock / pier */}
        {/* Pilings */}
        {[60, 90, 120, 150].map(x => (
          <g key={`piling-${x}`}>
            <rect x={x} y="102" width="4" height="20" fill="#5a4020" />
            <rect x={x - 1} y="100" width="6" height="4" fill="#6a5030" />
          </g>
        ))}
        {/* Dock planks */}
        <rect x="55" y="98" width="105" height="5" fill="#7a6040" />
        <rect x="55" y="99" width="105" height="1" fill="#8a7050" />
        <rect x="55" y="102" width="105" height="1" fill="#6a5030" />
        {/* Plank lines */}
        {[70, 85, 100, 115, 130, 145].map(x => (
          <line key={`plank-${x}`} x1={x} y1="98" x2={x} y2="103" stroke="#6a5030" strokeWidth="1" />
        ))}

        {/* Rope coil on dock */}
        <circle cx="68" cy="97" r="3" fill="none" stroke="#8a7a50" strokeWidth="2" />
        <circle cx="68" cy="97" r="1" fill="#8a7a50" />

        {/* === The boat === */}
        <g transform={`translate(160, ${95 + boatBob})`}>
          {/* Hull */}
          <polygon points="-25,8 -20,16 25,16 30,8" fill="#5a3a1a" />
          <polygon points="-25,8 -20,16 25,16 30,8" fill="none" stroke="#4a2a0a" strokeWidth="1" />
          {/* Hull plank lines */}
          <line x1="-22" y1="12" x2="27" y2="12" stroke="#4a2a0a" strokeWidth="1" />
          {/* Deck */}
          <rect x="-22" y="6" width="47" height="4" fill="#6a4a2a" />
          {/* Mast */}
          <rect x="0" y="-24" width="3" height="30" fill="#5a4020" />
          {/* Furled sail */}
          <rect x="-2" y="-22" width="8" height="4" fill="#c0b898" />
          <rect x="-2" y="-18" width="8" height="2" fill="#a09878" />
          {/* Small cabin */}
          <rect x="-18" y="-2" width="14" height="8" fill="#5a3a1a" />
          <rect x="-16" y="0" width="4" height="4" fill="#2a1a08" />
          <rect x="-10" y="0" width="4" height="4" fill="#2a1a08" />
          {/* Flag on mast */}
          <rect x="3" y="-24" width="8" height="5" fill="#c05020" />
        </g>

        {/* Mooring rope from dock to boat */}
        <line
          x1="150" y1="100"
          x2="142" y2={101 + boatBob}
          stroke="#8a7a50" strokeWidth="1"
          strokeDasharray="2,1"
        />

        {/* === Seller (boat owner) – on dock near boat === */}
        <g transform={`translate(130, 0)`}>
          {/* Hat - conical */}
          <polygon points="0,80 5,74 10,80" fill="#c0b070" />
          {/* Head */}
          <rect x="1" y="80" width="8" height="5" fill="#c4956a" />
          {/* Eyes */}
          <rect x="2" y="82" width="1" height="1" fill="#1a1008" />
          <rect x="6" y="82" width="1" height="1" fill="#1a1008" />
          {/* Body */}
          <rect x="0" y="85" width="10" height="8" fill="#4a6a4a" />
          {/* Gesturing arm (pointing at boat) */}
          <rect x="10" y={84 + gestureUp} width="8" height="3" fill="#c4956a" />
          <rect x="16" y={83 + gestureUp} width="2" height="2" fill="#c4956a" />
          {/* Other arm */}
          <rect x="-3" y="86" width="4" height="3" fill="#c4956a" />
          {/* Pants */}
          <rect x="1" y="93" width="3" height="5" fill="#2a2a2a" />
          <rect x="5" y="93" width="3" height="5" fill="#2a2a2a" />
          {/* Feet */}
          <rect x="0" y="98" width="4" height="2" fill="#3a2a1a" />
          <rect x="5" y="98" width="4" height="2" fill="#3a2a1a" />
        </g>

        {/* === Protagonist (you) – on dock, negotiating === */}
        <g transform={`translate(${95 + leanX}, 0)`}>
          {/* Hair */}
          <rect x="1" y="78" width="8" height="2" fill="#1a1008" />
          {/* Head */}
          <rect x="1" y="80" width="8" height="5" fill="#c4956a" />
          {/* Eyes */}
          <rect x="6" y="82" width="1" height="1" fill="#1a1008" />
          {/* Body */}
          <rect x="0" y="85" width="10" height="8" fill="#5a6a7a" />
          {/* Collar */}
          <rect x="3" y="85" width="4" height="2" fill="#6a7a8a" />
          {/* Arm reaching out with money */}
          <rect x="10" y="87" width="6" height="3" fill="#c4956a" />
          {/* Money in hand */}
          <rect x="15" y="86" width="4" height="3" fill="#c0a020" />
          <rect x="16" y="87" width="2" height="1" fill="#a08010" />
          {/* Other arm down */}
          <rect x="-2" y="87" width="3" height="5" fill="#c4956a" />
          {/* Bundle on back */}
          <rect x="-3" y="84" width="5" height="6" fill="#6a5a3a" />
          {/* Pants */}
          <rect x="1" y="93" width="3" height="5" fill="#3a3a3a" />
          <rect x="5" y="93" width="3" height="5" fill="#3a3a3a" />
          {/* Feet */}
          <rect x="0" y="98" width="4" height="2" fill="#2a1a0a" />
          <rect x="5" y="98" width="4" height="2" fill="#2a1a0a" />
        </g>

        {/* Gold/money exchange sparkle */}
        <g opacity={sparkleOpacity}>
          <rect x="111" y="84" width="2" height="2" fill="#ffe060" />
          <rect x="108" y="86" width="1" height="1" fill="#ffe060" />
          <rect x="114" y="82" width="1" height="1" fill="#ffe060" />
          <rect x="116" y="87" width="1" height="1" fill="#ffd030" />
          <rect x="109" y="83" width="1" height="1" fill="#ffd030" />
        </g>

        {/* Other boats moored in background */}
        {[220, 270].map((bx, i) => (
          <g key={`bgboat-${i}`} transform={`translate(${bx}, ${108 + Math.sin(frame * 0.05 + i * 3) * 1.5})`}>
            <polygon points="-12,4 -10,8 12,8 14,4" fill={i === 0 ? '#4a3018' : '#3a2810'} />
            <rect x="-1" y="-10" width="2" height="14" fill="#4a3018" />
            <polygon points="1,-10 1,-2 10,-6" fill="#a09870" opacity="0.6" />
          </g>
        ))}

        {/* Seabirds */}
        {[30, 80, 180, 250, 290].map((bx, i) => {
          const by = 30 + i * 6 + Math.sin(frame * 0.06 + i * 2) * 5;
          return (
            <g key={`bird-${i}`} transform={`translate(${bx + Math.sin(frame * 0.04 + i) * 8}, ${by})`}>
              <line x1="0" y1="0" x2="-3" y2={frame % 12 < 6 ? -2 : 0} stroke="#444" strokeWidth="1" />
              <line x1="0" y1="0" x2="3" y2={frame % 12 < 6 ? -2 : 0} stroke="#444" strokeWidth="1" />
            </g>
          );
        })}

        {/* Palm tree on shore */}
        <g transform="translate(30, 0)">
          <rect x="0" y="65" width="4" height="25" fill="#4a3a1a" />
          <rect x="1" y="63" width="2" height="4" fill="#4a3a1a" />
          {/* Fronds */}
          <polygon points="2,58 -12,52 -8,58" fill="#2a5a1a" />
          <polygon points="2,58 16,50 12,58" fill="#3a6a2a" />
          <polygon points="2,56 -8,46 -4,56" fill="#2a5a1a" />
          <polygon points="2,56 12,44 8,54" fill="#3a6a2a" />
          <polygon points="2,58 0,48 4,48" fill="#2a4a1a" />
        </g>

        {/* Shore ground */}
        <rect x="0" y="90" width="55" height="14" fill="#6a5a3a" />
        <rect x="0" y="90" width="55" height="2" fill="#7a6a4a" />
        {/* Pebbles */}
        <rect x="10" y="92" width="2" height="1" fill="#8a7a5a" />
        <rect x="25" y="94" width="3" height="1" fill="#7a6a4a" />
        <rect x="40" y="91" width="2" height="1" fill="#8a7a5a" />

        {/* Water lapping at shore */}
        {[...Array(4)].map((_, i) => (
          <rect
            key={`lap-${i}`}
            x={50 + Math.sin(frame * 0.1 + i * 2) * 3}
            y={93 + i * 3 + waveOffset * 0.3}
            width={6}
            height="1"
            fill="#4a6a8a"
            opacity={0.3}
          />
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="320" height="25" fill="#000" opacity="0.3" />
        <rect x="0" y="160" width="320" height="20" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}
