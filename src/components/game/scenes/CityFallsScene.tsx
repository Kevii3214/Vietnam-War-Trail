import { useEffect, useState } from 'react';

export function CityFallsScene() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => f + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const fireFlicker = frame % 3;
  const smokeY = -(frame * 0.3) % 60;
  const soldierX = Math.min(frame * 1.2, 75);
  const tankX = Math.min(frame * 0.8, 55);
  const flagRaise = Math.min(frame * 0.8, 40);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <svg
        viewBox="0 0 320 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        {/* Sky - darkened by smoke/fire */}
        <defs>
          <linearGradient id="cf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0a00" />
            <stop offset="40%" stopColor="#331100" />
            <stop offset="100%" stopColor="#552200" />
          </linearGradient>
          <linearGradient id="cf-fire" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#cc3300" />
            <stop offset="50%" stopColor="#ff6600" />
            <stop offset="100%" stopColor="#ffcc00" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="180" fill="url(#cf-sky)" />

        {/* Distant fires glow on horizon */}
        <rect x="0" y="70" width="320" height="30" fill="#331100" opacity="0.6" />
        {[30, 90, 150, 210, 270].map((x, i) => (
          <circle
            key={`glow-${i}`}
            cx={x}
            cy={85}
            r={12 + (fireFlicker === i % 3 ? 3 : 0)}
            fill="#ff4400"
            opacity={0.15 + (fireFlicker === i % 3 ? 0.1 : 0)}
          />
        ))}

        {/* Smoke columns */}
        {[60, 130, 200, 260].map((x, i) => (
          <g key={`smoke-${i}`} opacity={0.3 + (i % 2) * 0.1}>
            <rect x={x - 3} y={20 + smokeY + i * 5} width={6} height={8} fill="#444" rx="2" />
            <rect x={x - 5} y={10 + smokeY + i * 5} width={10} height={8} fill="#333" rx="3" />
            <rect x={x - 4} y={0 + smokeY + i * 5} width={8} height={10} fill="#222" rx="3" />
          </g>
        ))}

        {/* Background buildings - damaged/burning */}
        {/* Tall building left */}
        <rect x="20" y="55" width="25" height="65" fill="#2a1a0a" />
        <rect x="22" y="57" width="5" height="5" fill={fireFlicker === 0 ? '#ff6600' : '#cc3300'} />
        <rect x="30" y="57" width="5" height="5" fill="#111" />
        <rect x="22" y="65" width="5" height="5" fill="#111" />
        <rect x="30" y="65" width="5" height="5" fill={fireFlicker === 1 ? '#ffcc00' : '#ff6600'} />
        <rect x="22" y="73" width="5" height="5" fill={fireFlicker === 2 ? '#ff6600' : '#111'} />
        <rect x="30" y="73" width="5" height="5" fill="#111" />

        {/* Mid building */}
        <rect x="55" y="65" width="30" height="55" fill="#221505" />
        <rect x="58" y="68" width="6" height="6" fill={fireFlicker === 1 ? '#ff4400' : '#111'} />
        <rect x="67" y="68" width="6" height="6" fill="#111" />
        <rect x="76" y="68" width="6" height="6" fill={fireFlicker === 0 ? '#ffcc00' : '#cc3300'} />
        <rect x="58" y="78" width="6" height="6" fill="#111" />
        <rect x="67" y="78" width="6" height="6" fill={fireFlicker === 2 ? '#ff6600' : '#111'} />
        {/* Flame on top */}
        <rect x="62" y={58 - (fireFlicker * 2)} width="8" height={10 + fireFlicker * 2} fill="url(#cf-fire)" opacity="0.8" />

        {/* Tall tower */}
        <rect x="100" y="45" width="18" height="75" fill="#1a0d05" />
        <rect x="104" y="48" width="4" height="4" fill={fireFlicker === 0 ? '#ff6600' : '#331100'} />
        <rect x="110" y="48" width="4" height="4" fill="#111" />
        <rect x="104" y="56" width="4" height="4" fill="#111" />
        <rect x="110" y="56" width="4" height="4" fill={fireFlicker === 2 ? '#ffcc00' : '#111'} />
        {/* Antenna broken */}
        <rect x="107" y="38" width="3" height="7" fill="#333" />
        <rect x="105" y="36" width="2" height="4" fill="#333" transform="rotate(-20 106 38)" />

        {/* Presidential Palace (center) */}
        <rect x="135" y="60" width="50" height="60" fill="#2a1808" />
        <rect x="140" y="55" width="40" height="8" fill="#331a0a" />
        {/* Columns */}
        {[142, 152, 162, 172].map(x => (
          <rect key={`col-${x}`} x={x} y="63" width="3" height="55" fill="#3a2010" />
        ))}
        {/* Windows */}
        {[144, 154, 164].map((x, i) => (
          <g key={`pw-${i}`}>
            <rect x={x} y="70" width="6" height="6" fill={fireFlicker === i ? '#ff4400' : '#111'} />
            <rect x={x} y="82" width="6" height="6" fill="#111" />
          </g>
        ))}
        {/* Flag being raised on palace */}
        <rect x="158" y={60 - flagRaise} width="2" height={flagRaise} fill="#666" />
        {flagRaise > 10 && (
          <g>
            {/* Viet Cong flag - red with yellow star */}
            <rect x="160" y={60 - flagRaise} width="16" height="10" fill="#cc0000" />
            {/* Star */}
            <polygon
              points={`168,${62 - flagRaise} 169.5,${66 - flagRaise} 173,${66 - flagRaise} 170,${68.5 - flagRaise} 171.5,${72 - flagRaise} 168,${70 - flagRaise} 164.5,${72 - flagRaise} 166,${68.5 - flagRaise} 163,${66 - flagRaise} 166.5,${66 - flagRaise}`}
              fill="#ffcc00"
            />
          </g>
        )}

        {/* Right buildings */}
        <rect x="200" y="70" width="22" height="50" fill="#1a0d05" />
        <rect x="203" y="73" width="5" height="5" fill={fireFlicker === 1 ? '#ff6600' : '#111'} />
        <rect x="212" y="73" width="5" height="5" fill="#111" />
        <rect x="203" y="82" width="5" height="5" fill="#111" />
        <rect x="212" y="82" width="5" height="5" fill={fireFlicker === 0 ? '#cc3300' : '#111'} />

        <rect x="230" y="60" width="28" height="60" fill="#221505" />
        <rect x="234" y="64" width="5" height="5" fill="#111" />
        <rect x="244" y="64" width="5" height="5" fill={fireFlicker === 2 ? '#ffcc00' : '#111'} />
        <rect x="234" y="74" width="5" height="5" fill={fireFlicker === 0 ? '#ff4400' : '#111'} />

        <rect x="268" y="68" width="20" height="52" fill="#1a0a05" />
        <rect x="271" y="72" width="4" height="4" fill={fireFlicker === 1 ? '#ff6600' : '#111'} />
        <rect x="279" y="72" width="4" height="4" fill="#111" />

        {/* Large fire in foreground */}
        {[45, 125, 245].map((x, i) => (
          <g key={`bigfire-${i}`}>
            <rect x={x - 4} y={112 - fireFlicker * 3 - i * 2} width={8} height={12 + fireFlicker * 3} fill="#ff6600" opacity="0.7" />
            <rect x={x - 2} y={108 - fireFlicker * 2 - i * 2} width={4} height={8 + fireFlicker * 2} fill="#ffcc00" opacity="0.8" />
            <rect x={x - 6} y={116 - fireFlicker * 2} width={12} height={6} fill="#cc3300" opacity="0.5" />
          </g>
        ))}

        {/* Ground / road */}
        <rect x="0" y="120" width="320" height="60" fill="#1a1008" />
        <rect x="0" y="120" width="320" height="3" fill="#2a1a0a" />
        {/* Road lines */}
        {[0, 40, 80, 120, 160, 200, 240, 280].map(x => (
          <rect key={`road-${x}`} x={x} y="145" width="20" height="2" fill="#2a1a0a" opacity="0.5" />
        ))}

        {/* Tank rolling in */}
        <g transform={`translate(${tankX}, 0)`}>
          {/* Treads */}
          <rect x="10" y="126" width="40" height="10" fill="#2a3a20" rx="3" />
          <rect x="12" y="128" width="8" height="6" fill="#1a2a10" />
          <rect x="22" y="128" width="8" height="6" fill="#1a2a10" />
          <rect x="32" y="128" width="8" height="6" fill="#1a2a10" />
          <rect x="42" y="128" width="6" height="6" fill="#1a2a10" />
          {/* Body */}
          <rect x="15" y="118" width="32" height="10" fill="#3a4a30" />
          {/* Turret */}
          <rect x="22" y="112" width="18" height="8" fill="#4a5a40" />
          {/* Barrel */}
          <rect x="40" y="114" width="18" height="3" fill="#3a4a30" />
          {/* Star */}
          <rect x="27" y="115" width="4" height="4" fill="#cc0000" />
        </g>

        {/* Soldiers marching */}
        {[0, 14, 28, 42, 56].map((offset, i) => (
          <g key={`soldier-${i}`} transform={`translate(${soldierX + offset}, 0)`}>
            {/* Helmet */}
            <rect x="4" y="108" width="8" height="4" fill="#3a4a30" rx="1" />
            <rect x="3" y="111" width="10" height="2" fill="#2a3a20" />
            {/* Head */}
            <rect x="5" y="112" width="6" height="4" fill="#c4956a" />
            {/* Body */}
            <rect x="4" y="116" width="8" height="8" fill="#4a5a40" />
            {/* Rifle */}
            <rect x="12" y="112" width="2" height="14" fill="#2a1a0a" />
            <rect x="12" y="110" width="2" height="4" fill="#333" />
            {/* Legs - animated march */}
            <rect x="5" y="124" width="3" height="6" fill="#3a4a30" />
            <rect x="9" y="124" width="3" height={frame % 8 < 4 ? '6' : '5'} fill="#3a4a30" />
            {/* Boots */}
            <rect x="4" y="130" width="4" height="2" fill="#1a0a00" />
            <rect x="9" y={frame % 8 < 4 ? 130 : 129} width="4" height="2" fill="#1a0a00" />
          </g>
        ))}

        {/* Fleeing civilians in distance */}
        {[270, 285, 295].map((x, i) => (
          <g key={`civ-${i}`} transform={`translate(${x + (frame * 0.3)}, 0)`} opacity={0.6}>
            <rect x="0" y="116" width="4" height="3" fill="#8a7a6a" />
            <rect x="0" y="119" width="4" height="5" fill="#6a5a4a" />
            <rect x="0" y="124" width="2" height="4" fill="#5a4a3a" />
            <rect x="3" y="124" width="2" height="4" fill="#5a4a3a" />
          </g>
        ))}

        {/* Debris particles */}
        {[...Array(8)].map((_, i) => {
          const px = (i * 47 + frame * 2) % 320;
          const py = 90 + Math.sin(frame * 0.1 + i) * 15;
          return (
            <rect key={`debris-${i}`} x={px} y={py} width="2" height="2" fill="#553311" opacity={0.4} />
          );
        })}

        {/* Embers floating up */}
        {[...Array(12)].map((_, i) => {
          const ex = (i * 29 + frame) % 320;
          const ey = 120 - ((frame + i * 20) % 100);
          return (
            <rect
              key={`ember-${i}`}
              x={ex}
              y={ey}
              width="2"
              height="2"
              fill={i % 2 === 0 ? '#ff6600' : '#ffcc00'}
              opacity={Math.max(0, 1 - ((frame + i * 20) % 100) / 100)}
            />
          );
        })}

        {/* Vignette overlay */}
        <rect x="0" y="0" width="320" height="40" fill="#000" opacity="0.3" />
        <rect x="0" y="160" width="320" height="20" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}
