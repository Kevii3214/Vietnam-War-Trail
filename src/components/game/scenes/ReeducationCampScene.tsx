import { useEffect, useState } from 'react';

export function ReeducationCampScene() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => f + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Walking figure progresses slowly toward the gate
  const walkerX = Math.min(40 + frame * 0.6, 145);
  const walkCycle = frame % 12;
  const legSwap = walkCycle < 6;
  const armSwing = walkCycle < 6 ? 2 : -2;

  // Queue of people shuffling
  const queueShuffle = frame % 20 < 10 ? 0 : 1;

  // Guard patrol slight side step
  const guardShift = Math.sin(frame * 0.08) * 2;

  // Watchtower searchlight sweep
  const searchAngle = Math.sin(frame * 0.04) * 25;

  // Dust particles
  const dustFrame = frame * 0.5;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        {/* Sky - overcast, oppressive */}
        <defs>
          <linearGradient id="rc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="50%" stopColor="#4a4838" />
            <stop offset="100%" stopColor="#5a5540" />
          </linearGradient>
          <linearGradient id="rc-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a5a3a" />
            <stop offset="100%" stopColor="#4a3a20" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="180" fill="url(#rc-sky)" />

        {/* Distant treeline / jungle */}
        {[0, 18, 34, 52, 68, 86, 102, 118, 136, 152, 170, 190, 210, 228, 248, 266, 284, 302].map((x, i) => (
          <g key={`tree-${i}`}>
            <rect x={x} y={56 - (i % 3) * 4} width={12} height={20 + (i % 3) * 4} fill={i % 2 === 0 ? '#2a3a1a' : '#1a2a10'} />
            <rect x={x + 2} y={50 - (i % 3) * 4} width={8} height={8} fill={i % 2 === 0 ? '#3a4a2a' : '#2a3a18'} />
            <rect x={x + 4} y={46 - (i % 3) * 4} width={4} height={6} fill="#2a3a1a" />
          </g>
        ))}

        {/* Ground - dirt path */}
        <rect x="0" y="110" width="320" height="70" fill="url(#rc-ground)" />
        <rect x="0" y="110" width="320" height="3" fill="#7a6a4a" />

        {/* Dirt path leading to gate */}
        <polygon points="0,140 0,155 170,130 170,122" fill="#5a4a2a" />
        <polygon points="170,122 170,130 320,126 320,118" fill="#5a4a2a" />
        {/* Path edges */}
        <line x1="0" y1="140" x2="170" y2="122" stroke="#4a3a1a" strokeWidth="1" />
        <line x1="0" y1="155" x2="170" y2="130" stroke="#4a3a1a" strokeWidth="1" />

        {/* Barbed wire fence left side */}
        {[10, 35, 60, 85, 110, 135].map(x => (
          <g key={`fpost-l-${x}`}>
            <rect x={x} y="90" width="3" height="28" fill="#5a5040" />
            <rect x={x - 1} y="88" width="5" height="3" fill="#5a5040" />
          </g>
        ))}
        {/* Wire lines */}
        {[95, 102, 108].map(y => (
          <g key={`wire-l-${y}`}>
            <line x1="10" y1={y} x2="155" y2={y - 2} stroke="#666" strokeWidth="1" />
            {/* Barbs */}
            {[25, 50, 75, 100, 125].map(bx => (
              <g key={`barb-${bx}-${y}`}>
                <line x1={bx} y1={y - 2} x2={bx - 2} y2={y - 5} stroke="#666" strokeWidth="1" />
                <line x1={bx} y1={y - 2} x2={bx + 2} y2={y - 5} stroke="#666" strokeWidth="1" />
              </g>
            ))}
          </g>
        ))}

        {/* Barbed wire fence right side */}
        {[185, 210, 235, 260, 285, 310].map(x => (
          <g key={`fpost-r-${x}`}>
            <rect x={x} y="88" width="3" height="28" fill="#5a5040" />
            <rect x={x - 1} y="86" width="5" height="3" fill="#5a5040" />
          </g>
        ))}
        {[93, 100, 106].map(y => (
          <g key={`wire-r-${y}`}>
            <line x1="165" y1={y - 2} x2="315" y2={y} stroke="#666" strokeWidth="1" />
            {[195, 220, 245, 270, 295].map(bx => (
              <g key={`barb-r-${bx}-${y}`}>
                <line x1={bx} y1={y - 1} x2={bx - 2} y2={y - 4} stroke="#666" strokeWidth="1" />
                <line x1={bx} y1={y - 1} x2={bx + 2} y2={y - 4} stroke="#666" strokeWidth="1" />
              </g>
            ))}
          </g>
        ))}

        {/* Camp gate */}
        {/* Left post */}
        <rect x="152" y="72" width="6" height="46" fill="#4a4030" />
        <rect x="150" y="70" width="10" height="4" fill="#5a5040" />
        {/* Right post */}
        <rect x="172" y="72" width="6" height="46" fill="#4a4030" />
        <rect x="170" y="70" width="10" height="4" fill="#5a5040" />
        {/* Gate crossbar */}
        <rect x="152" y="74" width="26" height="4" fill="#5a5040" />
        {/* Sign on gate */}
        <rect x="155" y="78" width="20" height="8" fill="#6a2020" />
        {/* Star on sign */}
        <rect x="163" y="80" width="4" height="4" fill="#ffcc00" />

        {/* Watchtower */}
        <rect x="230" y="42" width="4" height="48" fill="#4a4030" />
        <rect x="240" y="42" width="4" height="48" fill="#4a4030" />
        {/* Platform */}
        <rect x="226" y="38" width="22" height="6" fill="#5a5040" />
        {/* Roof */}
        <polygon points="224,32 237,24 250,32" fill="#4a3a20" />
        <rect x="224" y="32" width="26" height="3" fill="#5a5040" />
        {/* Guard in tower */}
        <rect x="234" y="33" width="6" height="3" fill="#3a4a30" />
        <rect x="235" y="30" width="4" height="4" fill="#c4956a" />
        <rect x="233" y="29" width="8" height="3" fill="#3a4a30" />
        {/* Searchlight beam */}
        <polygon
          points={`237,36 ${237 + searchAngle - 15},110 ${237 + searchAngle + 15},110`}
          fill="#ffff88"
          opacity="0.06"
        />

        {/* Camp buildings in background */}
        {/* Barracks 1 */}
        <rect x="190" y="82" width="28" height="14" fill="#4a4030" />
        <polygon points="188,82 204,74 220,82" fill="#3a3020" />
        <rect x="200" y="88" width="6" height="8" fill="#2a2010" />

        {/* Barracks 2 */}
        <rect x="250" y="78" width="32" height="16" fill="#4a4030" />
        <polygon points="248,78 266,70 284,78" fill="#3a3020" />
        <rect x="260" y="84" width="5" height="10" fill="#2a2010" />
        <rect x="270" y="84" width="5" height="10" fill="#2a2010" />

        {/* Queue of people waiting at gate */}
        {[155, 162, 168].map((x, i) => (
          <g key={`queue-${i}`} transform={`translate(0, ${queueShuffle * (i % 2 === 0 ? 1 : 0)})`}>
            {/* Head */}
            <rect x={x} y={104} width={4} height={3} fill="#c4956a" />
            {/* Hair */}
            <rect x={x} y={103} width={4} height={2} fill="#1a1008" />
            {/* Body - civilian clothes */}
            <rect x={x - 1} y={107} width={6} height={6} fill={['#5a5a5a', '#4a4a6a', '#5a4a3a'][i]} />
            {/* Legs */}
            <rect x={x} y={113} width={2} height={4} fill={['#3a3a3a', '#3a3a4a', '#3a3020'][i]} />
            <rect x={x + 2} y={113} width={2} height={4} fill={['#3a3a3a', '#3a3a4a', '#3a3020'][i]} />
          </g>
        ))}

        {/* Armed guard at gate */}
        <g transform={`translate(${180 + guardShift}, 0)`}>
          {/* Helmet */}
          <rect x="0" y="96" width="8" height="4" fill="#3a4a30" />
          <rect x="-1" y="99" width="10" height="2" fill="#2a3a20" />
          {/* Face */}
          <rect x="1" y="100" width="6" height="4" fill="#c4956a" />
          {/* Body */}
          <rect x="0" y="104" width="8" height="8" fill="#3a4a30" />
          {/* Belt */}
          <rect x="0" y="108" width="8" height="2" fill="#2a2010" />
          {/* Rifle across chest */}
          <rect x="8" y="100" width="2" height="14" fill="#2a1a0a" />
          <rect x="8" y="98" width="2" height="4" fill="#444" />
          {/* Legs */}
          <rect x="1" y="112" width="3" height="6" fill="#3a4a30" />
          <rect x="5" y="112" width="3" height="6" fill="#3a4a30" />
          {/* Boots */}
          <rect x="0" y="118" width="4" height="2" fill="#1a0a00" />
          <rect x="5" y="118" width="4" height="2" fill="#1a0a00" />
        </g>

        {/* Second guard behind gate */}
        <g transform={`translate(${148 - guardShift * 0.5}, 0)`}>
          <rect x="0" y="98" width="8" height="4" fill="#3a4a30" />
          <rect x="1" y="101" width="6" height="4" fill="#c4956a" />
          <rect x="0" y="105" width="8" height="7" fill="#3a4a30" />
          <rect x="1" y="112" width="3" height="5" fill="#3a4a30" />
          <rect x="5" y="112" width="3" height="5" fill="#3a4a30" />
        </g>

        {/* === Walking protagonist (you) === */}
        <g transform={`translate(${walkerX}, 0)`}>
          {/* Shadow */}
          <ellipse cx="5" cy="140" rx="6" ry="2" fill="#000" opacity="0.2" />

          {/* Hair */}
          <rect x="2" y="110" width="7" height="2" fill="#1a1008" />
          {/* Head */}
          <rect x="2" y="112" width="7" height="5" fill="#c4956a" />
          {/* Eye */}
          <rect x="7" y="113" width="1" height="1" fill="#1a1008" />
          {/* Mouth */}
          <rect x="7" y="116" width="1" height="1" fill="#a07050" />

          {/* Body - civilian shirt */}
          <rect x="1" y="117" width="9" height="8" fill="#5a6a7a" />
          {/* Collar */}
          <rect x="3" y="117" width="5" height="2" fill="#6a7a8a" />

          {/* Bundle/bag on shoulder */}
          <rect x="-2" y="116" width="5" height="6" fill="#6a5a3a" />
          <rect x="-1" y="115" width="3" height="2" fill="#5a4a2a" />
          {/* Strap */}
          <line x1="0" y1="115" x2="5" y2="120" stroke="#4a3a1a" strokeWidth="1" />

          {/* Arms */}
          <rect x={-1 + armSwing} y="118" width="3" height="6" fill="#c4956a" />
          <rect x={9 - armSwing} y="118" width="3" height="6" fill="#c4956a" />

          {/* Pants */}
          <rect x="2" y="125" width="3" height="7" fill="#3a3a3a" />
          <rect x="6" y="125" width="3" height={legSwap ? 7 : 6} fill="#3a3a3a" />

          {/* Feet */}
          <rect x="1" y={legSwap ? 132 : 131} width="4" height="2" fill="#2a1a0a" />
          <rect x="6" y={legSwap ? 131 : 132} width="4" height="2" fill="#2a1a0a" />
        </g>

        {/* Other people walking ahead (already past you) */}
        {[165, 175, 158].map((px, i) => {
          const py = 114 - i * 2;
          const personShuffle = (frame + i * 7) % 14 < 7;
          return (
            <g key={`ahead-${i}`} opacity={0.7 - i * 0.1}>
              <rect x={px} y={py} width={4} height={2} fill="#1a1008" />
              <rect x={px} y={py + 2} width={4} height={3} fill="#c4956a" />
              <rect x={px - 1} y={py + 5} width={6} height={5} fill={['#5a5040', '#4a5a5a', '#6a5a4a'][i]} />
              <rect x={px} y={py + 10} width={2} height={personShuffle ? 4 : 3} fill="#3a3020" />
              <rect x={px + 2} y={py + 10} width={2} height={personShuffle ? 3 : 4} fill="#3a3020" />
            </g>
          );
        })}

        {/* Dust particles on path */}
        {[...Array(10)].map((_, i) => {
          const dx = (i * 37 + dustFrame) % 320;
          const dy = 125 + Math.sin(dustFrame * 0.2 + i * 3) * 8;
          return (
            <rect
              key={`dust-${i}`}
              x={dx}
              y={dy}
              width="2"
              height="2"
              fill="#8a7a5a"
              opacity={0.2 + Math.sin(frame * 0.1 + i) * 0.1}
            />
          );
        })}

        {/* Birds / crows in sky */}
        {[50, 120, 200, 270].map((bx, i) => {
          const by = 20 + i * 8 + Math.sin(frame * 0.05 + i * 2) * 4;
          return (
            <g key={`bird-${i}`} transform={`translate(${bx + Math.sin(frame * 0.03 + i) * 10}, ${by})`}>
              <line x1="0" y1="0" x2="-3" y2={frame % 10 < 5 ? -2 : 0} stroke="#222" strokeWidth="1" />
              <line x1="0" y1="0" x2="3" y2={frame % 10 < 5 ? -2 : 0} stroke="#222" strokeWidth="1" />
            </g>
          );
        })}

        {/* Vignette */}
        <rect x="0" y="0" width="320" height="30" fill="#000" opacity="0.25" />
        <rect x="0" y="160" width="320" height="20" fill="#000" opacity="0.35" />
      </svg>
    </div>
  );
}
