import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, CAPTAIN, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Engine Failure — dead calm sea, stars, the boat drifting silently.
 * The loudest silence in days. A final wisp of smoke rises from the
 * dying engine, a shooting star falls indifferently overhead, the
 * family sits in stunned silence while ripples spread from the hull.
 */
export function EngineFailureScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#04040f] via-[#080e20] to-[#061426]">
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
          0%   { opacity: 0.55; transform: translate(0, 0) scale(0.6); }
          40%  { opacity: 0.35; transform: translate(-2px, -10px) scale(1.1); }
          100% { opacity: 0;    transform: translate(-6px, -28px) scale(1.6); }
        }
        @keyframes ef-wave {
          0%, 100% { transform: translateX(0); opacity: 0.22; }
          50%      { transform: translateX(4px); opacity: 0.32; }
        }
        @keyframes ef-twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }
        @keyframes ef-ripple {
          0%   { transform: scale(0.2); opacity: 0.85; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes ef-shoot-star {
          0%, 10%, 100% { opacity: 0; transform: translate(0, 0); }
          12%           { opacity: 0.95; transform: translate(0, 0); }
          28%           { opacity: 0.95; transform: translate(160px, 40px); }
          30%           { opacity: 0;    transform: translate(160px, 40px); }
        }
        @keyframes ef-engine-spark {
          0%, 95%, 100% { opacity: 0; }
          96%           { opacity: 1; }
          98%           { opacity: 0; }
        }
        @keyframes ef-breath {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.03); }
        }

        .ef-drift        { animation: ef-drift 6s ease-in-out infinite; transform-origin: center; }
        .ef-smoke-die    { animation: ef-smoke-die 4s ease-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .ef-wave         { animation: ef-wave 3.5s ease-in-out infinite; }
        .ef-twinkle      { animation: ef-twinkle 2.2s ease-in-out infinite; }
        .ef-ripple       { animation: ef-ripple 5s ease-out infinite; transform-box: fill-box; transform-origin: center center; }
        .ef-shoot-star   { animation: ef-shoot-star 9s ease-in-out infinite; }
        .ef-engine-spark { animation: ef-engine-spark 7s ease-in-out infinite; }
        .ef-breath       { animation: ef-breath 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Vast night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#05061a" />
        {/* Subtle milky way band */}
        <rect x="0" y="20" width="500" height="50" fill="#1a1a3a" opacity="0.12" />
        <rect x="0" y="30" width="500" height="30" fill="#2a2a4a" opacity="0.08" />

        {/* Many stars — emphasizing isolation */}
        {[
          [20, 10], [55, 30], [90, 15], [130, 40], [170, 8], [210, 35], [250, 20],
          [290, 45], [330, 12], [370, 38], [410, 22], [450, 42], [485, 10],
          [40, 55], [110, 50], [180, 58], [260, 52], [340, 60], [420, 48], [475, 56],
          [65, 65], [155, 68], [235, 62], [315, 70], [395, 64], [460, 72],
          [30, 90], [140, 88], [245, 85], [355, 92], [470, 88],
        ].map(([x, y], i) => (
          <rect
            key={`star-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#e0d8c0"
            opacity={0.25 + (i % 4) * 0.18} className="ef-twinkle"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Shooting star streaking across (with tail) */}
        <g className="ef-shoot-star">
          <line x1="80" y1="30" x2="64" y2="26" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          <rect x="80" y="30" width="2" height="2" fill="#ffffff" />
          <rect x="74" y="29" width="4" height="1" fill="#e8e8ff" opacity="0.5" />
        </g>

        {/* Horizon line — very faint */}
        <rect x="0" y="112" width="500" height="1" fill="#1a2030" opacity="0.35" />

        {/* Calm, glassy ocean */}
        <rect x="0" y="113" width="500" height="167" fill="#061224" />
        {[120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <line
            key={`w-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#1a2030" strokeWidth="0.5" opacity="0.2"
            className="ef-wave" style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Ripples spreading out from the dead boat */}
        {[0, 1.6, 3.2].map((delay, i) => (
          <ellipse
            key={`ripple-${i}`}
            cx="250" cy="180" rx="32" ry="4"
            fill="none" stroke="#3a5a7a" strokeWidth="0.8" opacity="0.8"
            className="ef-ripple"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* === The boat — drifting, no power === */}
        <g transform="translate(250, 155)" className="ef-drift">
          <ellipse cx="0" cy="30" rx="52" ry="4" fill="#020510" opacity="0.6" />
          {/* Hull */}
          <polygon points="-42,14 -32,28 42,28 50,14" fill="#3a2214" />
          <polygon points="-42,14 -32,28 42,28 50,14" fill="none" stroke="#1a0a04" strokeWidth="0.9" />
          <line x1="-36" y1="22" x2="44" y2="22" stroke="#1a0a04" strokeWidth="0.7" />
          {/* Deck */}
          <rect x="-34" y="10" width="80" height="5" fill="#5a3a1e" />
          <rect x="-34" y="10" width="80" height="1" fill="#7a5230" />
          {/* Cabin */}
          <rect x="-28" y="-4" width="24" height="14" fill="#3a2214" />
          <rect x="-24" y="-2" width="6" height="6" fill="#0a0a18" />
          <rect x="-14" y="-2" width="6" height="6" fill="#0a0a18" />
          {/* Mast */}
          <rect x="14" y="-26" width="2.5" height="36" fill="#3a2a18" />
          {/* Limp sail */}
          <rect x="10" y="-22" width="10" height="5" fill="#a09878" />
          <rect x="11" y="-17" width="8" height="2" fill="#80785a" />

          {/* Engine — silent, cold, wisps of dying smoke */}
          <rect x="32" y="2" width="16" height="10" fill="#14181e" />
          <rect x="32" y="2" width="16" height="1" fill="#1e242e" />
          <rect x="35" y="-2" width="4" height="6" fill="#0a0c10" />
          {/* Last wisps of smoke fading away */}
          <g className="ef-smoke-die">
            <ellipse cx="37" cy="-6" rx="3" ry="2.5" fill="#4a4a5a" opacity="0.55" />
          </g>
          <g className="ef-smoke-die" style={{ animationDelay: '1.5s' }}>
            <ellipse cx="39" cy="-8" rx="2.5" ry="2" fill="#3a3a4a" opacity="0.5" />
          </g>
          <g className="ef-smoke-die" style={{ animationDelay: '3s' }}>
            <ellipse cx="35" cy="-10" rx="2" ry="1.8" fill="#2a2a3a" opacity="0.4" />
          </g>
          {/* Rare engine spark — the last gasp */}
          <rect x="37" y="-2" width="2" height="2" fill="#ff9944"
            className="ef-engine-spark" />

          {/* === Canonical passengers in stunned silence === */}
          {/* Captain at engine — staring at dead machinery */}
          <PixelPerson x={22} y={-8} scale={0.95} variant="civilian" {...CAPTAIN}
            mood="weary" sway="idle" />
          {/* Protagonist */}
          <PixelPerson x={10} y={-10} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="sad" sway="idle" swayDelay={0.2} />
          {/* Grandfather */}
          <PixelPerson x={0} y={-8} scale={0.95} variant="civilian" {...GRANDFATHER}
            mood="weary" sway="idle" swayDelay={0.4} />
          {/* Mother holding child */}
          <g className="ef-breath" style={{ transformOrigin: 'center bottom' }}>
            <PixelPerson x={-14} y={-8} scale={1} variant="civilian" {...MOTHER}
              mood="sad" sway="idle" swayDelay={0.3} />
            <PixelPerson x={-8} y={-2} scale={0.75} variant="civilian" {...CHILD}
              mood="weary" sway="idle" swayDelay={0.5} />
          </g>
          {/* One more fellow passenger, cross-legged */}
          <PixelPerson x={-28} y={-6} scale={0.85} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="weary" sway="idle" swayDelay={0.7} mirror />
        </g>

        {/* Reflection of boat on water */}
        <g transform="translate(250, 194) scale(1, -0.35)" opacity="0.14">
          <polygon points="-42,14 -32,28 42,28 50,14" fill="#3a2214" />
          <rect x="-28" y="-4" width="24" height="14" fill="#3a2214" />
        </g>

        {/* A few reflected star specks on water */}
        {[120, 220, 300, 380].map((x, i) => (
          <rect key={`refl-${i}`} x={x} y={200 + (i % 2) * 20} width={1} height={1}
            fill="#8aa0c0" opacity="0.4" className="ef-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Vast emptiness — heavy top and bottom vignette */}
        <rect x="0" y="0" width="500" height="24" fill="#000" opacity="0.35" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.55" />
      </svg>
    </div>
  );
}
