import { PixelPerson } from './PixelPeople';

/**
 * Engine Failure — dead calm sea, the boat drifts silently,
 * everyone staring at the dead engine, vast empty ocean.
 */
export function EngineFailureScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a1020] to-[#0a1828]">
      <style>{`
        @keyframes ef-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes ef-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: ef-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: ef-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes ef-drift {
          0%, 100% { transform: translate(0, 0) rotate(-0.3deg); }
          50%      { transform: translate(3px, -1px) rotate(0.3deg); }
        }
        @keyframes ef-smoke-die {
          0%   { opacity: 0.5; transform: translateY(0); }
          40%  { opacity: 0.2; transform: translateY(-8px); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes ef-wave {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50%      { transform: translateX(4px); opacity: 0.3; }
        }
        @keyframes ef-twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        .ef-drift      { animation: ef-drift 6s ease-in-out infinite; transform-origin: center; }
        .ef-smoke-die  { animation: ef-smoke-die 4s ease-out forwards; }
        .ef-wave       { animation: ef-wave 3.5s ease-in-out infinite; }
        .ef-twinkle    { animation: ef-twinkle 2.2s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Vast night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a18" />

        {/* Many stars — emphasizing isolation */}
        {[
          [20, 10], [55, 30], [90, 15], [130, 40], [170, 8], [210, 35], [250, 20],
          [290, 45], [330, 12], [370, 38], [410, 22], [450, 42], [485, 10],
          [40, 55], [110, 50], [180, 58], [260, 52], [340, 60], [420, 48], [475, 56],
          [65, 65], [155, 68], [235, 62], [315, 70], [395, 64], [460, 72],
        ].map(([x, y], i) => (
          <rect key={`star-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#e0d8c0"
            opacity={0.25 + (i % 4) * 0.18} className="ef-twinkle"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Horizon line — very faint */}
        <rect x="0" y="110" width="500" height="1" fill="#1a2030" opacity="0.3" />

        {/* Calm, still ocean */}
        <rect x="0" y="111" width="500" height="169" fill="#0a1020" />
        {[120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <line key={`w-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#1a2030" strokeWidth="0.5" opacity="0.2"
            className="ef-wave" style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* The boat — drifting, no power */}
        <g transform="translate(250, 155)" className="ef-drift">
          {/* Hull */}
          <polygon points="-40,14 -32,26 40,26 48,14" fill="#3a2a14" />
          <line x1="-34" y1="20" x2="42" y2="20" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-32" y="10" width="78" height="5" fill="#4a3a20" />
          {/* Cabin */}
          <rect x="-26" y="-2" width="22" height="12" fill="#3a2a14" />
          <rect x="-22" y="0" width="6" height="6" fill="#0a0a18" />
          <rect x="-12" y="0" width="6" height="6" fill="#0a0a18" />
          {/* Mast */}
          <rect x="16" y="-22" width="2" height="32" fill="#3a2a18" />
          {/* Engine — smoking, dying */}
          <rect x="32" y="2" width="14" height="10" fill="#2a2a2a" />
          <rect x="35" y="-2" width="4" height="6" fill="#1a1a1a" />
          {/* Last wisps of smoke fading */}
          <g className="ef-smoke-die">
            <rect x="36" y="-10" width="2" height="6" fill="#4a4a5a" opacity="0.4" />
          </g>
          <g className="ef-smoke-die" style={{ animationDelay: '0.5s' }}>
            <rect x="38" y="-14" width="2" height="5" fill="#3a3a4a" opacity="0.3" />
          </g>

          {/* Someone staring at dead engine */}
          <PixelPerson
            x={24} y={2} scale={0.65} variant="civilian"
            color="#c4956a" shirtColor="#4a3a2a" pantsColor="#1a1a1a"
            hairColor="#1a0a04" accentColor="#5a5a5a"
            mood="shocked" sway="idle"
          />

          {/* People sitting in stunned silence */}
          {[
            { x: -18, mood: 'shocked' as const, shirt: '#3a3a4a' },
            { x: -8, mood: 'sad' as const, shirt: '#5a4a3a' },
            { x: 2, mood: 'scared' as const, shirt: '#2a3a4a' },
            { x: 12, mood: 'weary' as const, shirt: '#4a4a3a' },
          ].map((p, i) => (
            <PixelPerson key={`sit-${i}`}
              x={p.x} y={4} scale={0.55} variant="civilian"
              color="#c4956a" shirtColor={p.shirt} pantsColor="#1a1a1a"
              hairColor="#1a0a04" accentColor="#4a4a4a"
              mood={p.mood} sway="idle" swayDelay={i * 0.3}
            />
          ))}
        </g>

        {/* Reflection of boat on water */}
        <g transform="translate(250, 190) scale(1, -0.3)" opacity="0.12">
          <polygon points="-40,14 -32,26 40,26 48,14" fill="#3a2a14" />
        </g>

        {/* Vast emptiness — no land anywhere */}
        <rect x="0" y="0" width="500" height="20" fill="#000" opacity="0.3" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}
