import { PixelPerson } from './PixelPeople';

/**
 * Storm at Sea — dark clouds, crashing waves, rain, lightning,
 * a small boat being tossed around.
 */
export function StormAtSeaScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2a] to-[#0a1828]">
      <style>{`
        @keyframes sas-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes sas-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: sas-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: sas-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes sas-boat-toss {
          0%, 100% { transform: translate(0, 0) rotate(-4deg); }
          25%      { transform: translate(-6px, -8px) rotate(5deg); }
          50%      { transform: translate(4px, -3px) rotate(-3deg); }
          75%      { transform: translate(-3px, -10px) rotate(6deg); }
        }
        @keyframes sas-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        @keyframes sas-rain {
          0%   { transform: translateY(-20px); opacity: 0.7; }
          100% { transform: translateY(300px); opacity: 0.3; }
        }
        @keyframes sas-lightning {
          0%, 92%, 96%, 100% { opacity: 0; }
          93%, 95%           { opacity: 0.9; }
          94%                { opacity: 0; }
        }
        @keyframes sas-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-30px); }
        }
        @keyframes sas-splash {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50%      { transform: scaleY(0.2); opacity: 0.2; }
        }

        .sas-boat-toss   { animation: sas-boat-toss 2.5s ease-in-out infinite; transform-origin: center bottom; }
        .sas-wave         { animation: sas-wave 3s linear infinite; }
        .sas-rain         { animation: sas-rain 0.8s linear infinite; }
        .sas-lightning    { animation: sas-lightning 6s ease-in-out infinite; }
        .sas-lightning-2  { animation: sas-lightning 6s ease-in-out infinite; animation-delay: 3.2s; }
        .sas-cloud-drift  { animation: sas-cloud-drift 20s linear infinite; }
        .sas-splash       { animation: sas-splash 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Lightning flash (sky wash) */}
        <rect x="0" y="0" width="500" height="280" fill="#c0c8e0" className="sas-lightning" />
        <rect x="0" y="0" width="500" height="280" fill="#a0b0d0" className="sas-lightning-2" />

        {/* Storm clouds */}
        <g className="sas-cloud-drift">
          {[
            { cx: 60, cy: 30, rx: 50, ry: 18 },
            { cx: 150, cy: 22, rx: 70, ry: 22 },
            { cx: 280, cy: 28, rx: 65, ry: 20 },
            { cx: 400, cy: 20, rx: 60, ry: 18 },
            { cx: 480, cy: 32, rx: 40, ry: 15 },
            { cx: 540, cy: 25, rx: 55, ry: 20 },
          ].map((c, i) => (
            <ellipse key={`cloud-${i}`} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
              fill={i % 2 === 0 ? '#1a1a2a' : '#2a2a3a'} />
          ))}
          {/* Cloud bottom layer (darker) */}
          {[40, 130, 250, 370, 460].map((cx, i) => (
            <ellipse key={`cbot-${i}`} cx={cx} cy={44 + (i % 2) * 4} rx={55} ry={12}
              fill="#1a1a28" opacity="0.9" />
          ))}
        </g>

        {/* Lightning bolts */}
        <g className="sas-lightning">
          <polyline points="180,50 174,80 182,85 170,120" fill="none" stroke="#e0e8ff" strokeWidth="2" />
          <polyline points="182,85 190,70 186,90" fill="none" stroke="#f0f4ff" strokeWidth="1" />
        </g>
        <g className="sas-lightning-2">
          <polyline points="360,45 354,72 362,78 348,115" fill="none" stroke="#e0e8ff" strokeWidth="2" />
        </g>

        {/* Rough sea - layered wave rows */}
        {[100, 120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <g key={`waverow-${y}`} className="sas-wave"
            style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${2.5 + i * 0.2}s` }}>
            <path
              d={`M -80 ${y} Q ${-60 + i * 3} ${y - 8} ${-40} ${y} Q ${-20 + i * 2} ${y + 6} 0 ${y}
                  Q 20 ${y - 7} 40 ${y} Q 60 ${y + 5} 80 ${y}
                  Q 100 ${y - 8} 120 ${y} Q 140 ${y + 6} 160 ${y}
                  Q 180 ${y - 7} 200 ${y} Q 220 ${y + 5} 240 ${y}
                  Q 260 ${y - 8} 280 ${y} Q 300 ${y + 6} 320 ${y}
                  Q 340 ${y - 7} 360 ${y} Q 380 ${y + 5} 400 ${y}
                  Q 420 ${y - 8} 440 ${y} Q 460 ${y + 6} 480 ${y}
                  Q 500 ${y - 7} 520 ${y} Q 540 ${y + 5} 560 ${y}
                  V 280 H -80 Z`}
              fill={i < 3 ? '#0a1828' : i < 6 ? '#0a1a2a' : '#0a1c30'}
              opacity={0.7 + i * 0.03}
            />
          </g>
        ))}

        {/* Whitecaps / foam */}
        {[50, 140, 230, 320, 410].map((wx, wi) => (
          <rect key={`foam-${wi}`} x={wx} y={118 + (wi % 3) * 22} width={20} height={2}
            fill="#6a8aaa" opacity="0.5" className="sas-wave"
            style={{ animationDelay: `${wi * 0.5}s` }}
          />
        ))}

        {/* The boat — tossed by waves */}
        <g transform="translate(250, 155)" className="sas-boat-toss">
          {/* Hull */}
          <polygon points="-36,12 -28,24 36,24 42,12" fill="#3a2a14" />
          <line x1="-30" y1="18" x2="38" y2="18" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-28" y="8" width="64" height="5" fill="#4a3a20" />
          {/* Cabin */}
          <rect x="-22" y="-4" width="20" height="12" fill="#3a2a14" />
          <rect x="-18" y="-2" width="6" height="6" fill="#0a0a18" />
          {/* Mast (tilting with boat) */}
          <rect x="14" y="-22" width="2" height="30" fill="#3a2a18" />
          {/* Furled sail whipping */}
          <rect x="10" y="-20" width="10" height="4" fill="#908868" />

          {/* Splash over bow */}
          <g className="sas-splash">
            <rect x="-36" y="4" width="6" height="8" fill="#4a7a9a" opacity="0.5" />
            <rect x="-32" y="0" width="4" height="6" fill="#6a9ab8" opacity="0.4" />
          </g>

          {/* Passengers huddled, scared */}
          {[
            { x: -14, y: 0, mood: 'scared' as const, shirt: '#3a3a4a' },
            { x: -4, y: 2, mood: 'scared' as const, shirt: '#4a3a2a' },
            { x: 6, y: 0, mood: 'scared' as const, shirt: '#2a3a4a' },
            { x: 16, y: 2, mood: 'scared' as const, shirt: '#5a4a3a' },
            { x: 26, y: 0, mood: 'scared' as const, shirt: '#3a4a3a' },
          ].map((p, i) => (
            <PixelPerson key={`pass-${i}`}
              x={p.x} y={p.y} scale={0.55} variant="civilian"
              color="#c4956a" shirtColor={p.shirt} pantsColor="#1a1a1a"
              hairColor="#1a0a04" accentColor="#4a4a4a"
              mood={p.mood} sway="scared" swayDelay={i * 0.15}
            />
          ))}

          {/* Captain at stern fighting the tiller */}
          <PixelPerson
            x={30} y={0} scale={0.65} variant="civilian"
            color="#c4956a" shirtColor="#2a4a5a" pantsColor="#1a1a28"
            hairColor="#1a0a04" accentColor="#8a8a8a"
            mood="determined" sway="idle"
          />
        </g>

        {/* Rain overlay */}
        {[...Array(40)].map((_, i) => (
          <line key={`rain-${i}`}
            x1={12 + (i * 13) % 500} y1={0}
            x2={8 + (i * 13) % 500} y2={12}
            stroke="#6a8ab0" strokeWidth="0.8" opacity="0.4"
            className="sas-rain"
            style={{ animationDelay: `${(i * 0.07) % 0.8}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
