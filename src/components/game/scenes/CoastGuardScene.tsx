import { PixelPerson } from './PixelPeople';

/**
 * Coast Guard Patrol — a searchlight sweeps the water,
 * everyone on the boat hiding/ducking, tense darkness.
 */
export function CoastGuardScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a0a18] to-[#0a1020]">
      <style>{`
        @keyframes cg-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes cg-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: cg-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: cg-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes cg-searchlight {
          0%   { transform: rotate(-25deg); }
          50%  { transform: rotate(25deg); }
          100% { transform: rotate(-25deg); }
        }
        @keyframes cg-boat-rock {
          0%, 100% { transform: rotate(-0.3deg) translateY(0); }
          50%      { transform: rotate(0.3deg) translateY(-1px); }
        }
        @keyframes cg-wave {
          0%, 100% { transform: translateX(0); opacity: 0.15; }
          50%      { transform: translateX(5px); opacity: 0.25; }
        }
        @keyframes cg-twinkle {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.8; }
        }
        @keyframes cg-patrol-move {
          0%   { transform: translateX(80px); }
          100% { transform: translateX(-20px); }
        }
        @keyframes cg-engine-throb {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50%      { opacity: 0.6; transform: scaleX(1.3); }
        }

        .cg-searchlight  { animation: cg-searchlight 5s ease-in-out infinite; transform-origin: top center; }
        .cg-boat-rock    { animation: cg-boat-rock 4s ease-in-out infinite; transform-origin: center bottom; }
        .cg-wave         { animation: cg-wave 3s ease-in-out infinite; }
        .cg-twinkle      { animation: cg-twinkle 2.5s ease-in-out infinite; }
        .cg-patrol-move  { animation: cg-patrol-move 20s linear infinite; }
        .cg-engine-throb { animation: cg-engine-throb 0.8s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a14" />

        {/* Stars */}
        {[
          [30, 10], [80, 28], [140, 6], [200, 32], [260, 14], [320, 36],
          [380, 8], [440, 26], [480, 40], [60, 48], [160, 52], [280, 44],
          [400, 56], [120, 60], [350, 58],
        ].map(([x, y], i) => (
          <rect key={`s-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#d0c8b0"
            opacity={0.2 + (i % 3) * 0.15} className="cg-twinkle"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Ocean */}
        <rect x="0" y="110" width="500" height="170" fill="#0a0a18" />
        {[120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <line key={`w-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#1a1a28" strokeWidth="0.5" opacity="0.2"
            className="cg-wave" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Patrol boat in distance — moving slowly */}
        <g className="cg-patrol-move">
          <g transform="translate(350, 108)">
            {/* Hull — military gray */}
            <polygon points="-26,8 -20,16 26,16 32,8" fill="#3a3a3a" />
            <rect x="-20" y="4" width="44" height="5" fill="#4a4a4a" />
            {/* Bridge */}
            <rect x="-14" y="-4" width="18" height="8" fill="#3a3a3a" />
            <rect x="-10" y="-2" width="4" height="4" fill="#1a1a2a" />
            {/* Antenna */}
            <rect x="6" y="-12" width="1" height="10" fill="#5a5a5a" />

            {/* Searchlight beam — sweeping cone */}
            <g className="cg-searchlight" style={{ transformOrigin: '20px 0px' }}>
              <polygon points="18,-2 -60,180 80,180" fill="#ffee88" opacity="0.08" />
              <polygon points="19,-1 -20,120 58,120" fill="#ffee88" opacity="0.04" />
              {/* Bright spot at source */}
              <rect x="16" y="-4" width="6" height="4" fill="#ffee88" opacity="0.7" />
            </g>

            {/* Engine wake */}
            <rect x="-24" y="16" width="10" height="3" fill="#1a2a3a" opacity="0.3" className="cg-engine-throb" />
          </g>
        </g>

        {/* Your boat — foreground, dark, everyone hiding */}
        <g transform="translate(180, 175)" className="cg-boat-rock">
          {/* Hull */}
          <polygon points="-36,12 -28,24 36,24 42,12" fill="#2a1a0a" />
          <line x1="-30" y1="18" x2="38" y2="18" stroke="#1a0a04" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-28" y="8" width="64" height="5" fill="#3a2a14" />
          {/* Cabin */}
          <rect x="-22" y="-4" width="20" height="12" fill="#2a1a0a" />
          {/* Windows dark — no light */}
          <rect x="-18" y="-2" width="6" height="6" fill="#0a0a0a" />
          <rect x="-8" y="-2" width="6" height="6" fill="#0a0a0a" />
          {/* Mast */}
          <rect x="14" y="-18" width="2" height="26" fill="#2a1a0a" />

          {/* People crouching/hiding (very low profiles) */}
          {[
            { x: -16, shirt: '#2a2a3a' },
            { x: -6, shirt: '#3a2a1a' },
            { x: 4, shirt: '#1a2a3a' },
            { x: 14, shirt: '#2a3a2a' },
            { x: 24, shirt: '#3a3a2a' },
          ].map((p, i) => (
            <g key={`hide-${i}`}>
              {/* Crouching body — just head + hunched torso visible */}
              <rect x={p.x} y={4} width={6} height={4} fill="#c4956a" /> {/* head */}
              <rect x={p.x - 1} y={8} width={8} height={3} fill={p.shirt} /> {/* body */}
              {/* Eyes — wide, fearful dots */}
              <rect x={p.x + 1} y={5} width={1} height={1} fill="#1a0a04" />
              <rect x={p.x + 4} y={5} width={1} height={1} fill="#1a0a04" />
            </g>
          ))}

          {/* Captain pressing finger to lips (shhh) */}
          <PixelPerson
            x={30} y={0} scale={0.6} variant="civilian"
            color="#c4956a" shirtColor="#2a3a4a" pantsColor="#1a1a1a"
            hairColor="#1a0a04" accentColor="#5a5a5a"
            mood="determined" sway="idle"
          />
        </g>

        {/* Subtle water highlight where searchlight passes */}
        <g className="cg-searchlight" style={{ transformOrigin: '370px 108px' }}>
          <ellipse cx="320" cy="220" rx="50" ry="6" fill="#ffee88" opacity="0.04" />
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="30" fill="#000" opacity="0.5" />
        <rect x="0" y="255" width="500" height="25" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}
