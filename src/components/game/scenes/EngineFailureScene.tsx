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
        /* Dramatic broken-engine smoke — rises higher, wider, and
           drifts further with the wind. Loops seamlessly so the
           column of smoke is always visible. Keyframes also cover
           more vertical distance (up to -62px) and scale larger
           (up to 2.8×) compared with the old gentle wisps. */
        @keyframes ef-smoke-broken {
          0%   { opacity: 0;    transform: translate(0, 8px)    scale(0.5); }
          10%  { opacity: 0.95; transform: translate(-1px, 2px)  scale(0.95); }
          40%  { opacity: 0.8;  transform: translate(-6px, -20px) scale(1.6); }
          75%  { opacity: 0.5;  transform: translate(-12px, -42px) scale(2.2); }
          100% { opacity: 0;    transform: translate(-20px, -64px) scale(2.9); }
        }
        /* Rising embers — smaller, faster than smoke puffs, no scale. */
        @keyframes ef-ember-rise {
          0%   { opacity: 0;    transform: translate(0, 2px); }
          10%  { opacity: 0.95; transform: translate(-1px, 0); }
          70%  { opacity: 0.75; transform: translate(-7px, -28px); }
          100% { opacity: 0;    transform: translate(-14px, -46px); }
        }
        /* Heat-glow pulse for cracked engine casing. */
        @keyframes ef-heat-pulse {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.7; }
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
        .ef-smoke-broken { animation: ef-smoke-broken 3.6s linear infinite; transform-box: fill-box; transform-origin: center bottom; }
        .ef-ember-rise   { animation: ef-ember-rise 2.4s linear infinite; transform-box: fill-box; transform-origin: center bottom; }
        .ef-heat-pulse   { animation: ef-heat-pulse 1.4s ease-in-out infinite; }
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

        {/* Ripples spreading out from the dead boat (tracked to the
            boat's new raised y-position so they radiate from the
            hull shadow, not from open water below). */}
        {[0, 1.6, 3.2].map((delay, i) => (
          <ellipse
            key={`ripple-${i}`}
            cx="250" cy="160" rx="32" ry="4"
            fill="none" stroke="#3a5a7a" strokeWidth="0.8" opacity="0.8"
            className="ef-ripple"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* === The boat — CENTERED, drifting without power ===
            Moved from translate(250, 155) to (250, 135) so the whole
            hull and mast sit clearly in the middle of the scene
            above any bottom text box.

            IMPORTANT: use a nested group — the OUTER <g> carries the
            static SVG `transform="translate(...)"` that places the
            boat, while the INNER <g> carries the CSS
            `className="ef-drift"` animation. Without this split, the
            CSS animation's `transform: translate(3px,-1px)...` on
            the same element overrides the SVG transform attribute
            and the whole boat snaps back near (0,0). */}
        <g transform="translate(250, 135)">
        <g className="ef-drift">
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

          {/* === Engine — catastrophically broken, smoldering ===
              Visible damage: hairline cracks running down the
              casing, a blown-out side panel exposing glowing red-
              hot innards, a torn/jagged exhaust pipe, heavy soot
              staining, a dripping oil leak, and a loose cable. A
              thick column of dark smoke rolls off the pipe carrying
              orange glow and rising embers — the engine reads as
              "this machine is on fire and finished," not idle. */}

          {/* Main engine casing */}
          <rect x="32" y="2" width="16" height="10" fill="#14181e" />
          <rect x="32" y="2" width="16" height="1" fill="#1e242e" />
          <rect x="32" y="11" width="16" height="1" fill="#05060a" />

          {/* Hairline cracks running down the casing */}
          <path d="M 38 3 L 37 6 L 38.5 8 L 37 11" fill="none"
            stroke="#3a0a04" strokeWidth="0.5" opacity="0.85" />
          <path d="M 40 4 L 41 7 L 40 10" fill="none"
            stroke="#2a0604" strokeWidth="0.4" opacity="0.7" />
          <path d="M 34 5 L 35 8 L 34 11" fill="none"
            stroke="#2a0604" strokeWidth="0.4" opacity="0.6" />

          {/* Blown-out side panel exposing glowing innards */}
          <rect x="44" y="5" width="4" height="4" fill="#2a0a04" />
          <rect x="45" y="6" width="2" height="2" fill="#8a2a0a" />
          <rect x="44" y="5" width="4" height="4" fill="#ff5522" opacity="0.5"
            className="ef-heat-pulse" />
          {/* Secondary heat glow leaking through a crack */}
          <rect x="37" y="6" width="2" height="3" fill="#ff3308" opacity="0.4"
            className="ef-heat-pulse" style={{ animationDelay: '0.7s' }} />

          {/* Torn/jagged exhaust pipe — wider opening suggesting
              damage from an overheating blowout */}
          <rect x="34" y="-3" width="6" height="7" fill="#0a0c10" />
          <rect x="35" y="-4" width="4" height="2" fill="#1a1a1a" />
          {/* Jagged broken rim at the top of the pipe */}
          <polygon points="34,-3 34.5,-5 35.5,-3.5 36.2,-5 37,-3 38,-4.5 39,-3 39.6,-4 40,-3"
            fill="#1a1a1a" />
          <polygon points="34.4,-3.5 35.2,-4.2 36,-3.8" fill="#3a3a3a" />
          {/* Dark inside of the pipe */}
          <rect x="35.5" y="-2.5" width="3" height="2" fill="#000" />

          {/* Heavy layered soot staining around the pipe */}
          <ellipse cx="37" cy="-3" rx="10" ry="2.5" fill="#0a0a0a" opacity="0.75" />
          <ellipse cx="36" cy="-4" rx="8" ry="1.3" fill="#1a1a1a" opacity="0.6" />
          <ellipse cx="38" cy="-2.5" rx="6" ry="1" fill="#2a2a2a" opacity="0.5" />

          {/* Oil leak dripping from the engine underside */}
          <rect x="42" y="11" width="2" height="4" fill="#05060a" />
          <ellipse cx="43" cy="15.5" rx="3.2" ry="1" fill="#05060a" opacity="0.75" />
          <ellipse cx="43" cy="16.3" rx="2.2" ry="0.6" fill="#1a1a2a" opacity="0.55" />

          {/* Loose dangling cable / torn fuel line */}
          <path d="M 31 4 Q 28 8, 30 13" fill="none"
            stroke="#1a1a1a" strokeWidth="0.9" />
          <rect x="29.5" y="12.5" width="1.6" height="1.6" fill="#8a4408" />
          {/* Tiny spark at the end of the frayed cable */}
          <rect x="29.5" y="12.5" width="1.6" height="1.6" fill="#ffaa44"
            opacity="0.9" className="ef-engine-spark"
            style={{ animationDelay: '4s' }} />

          {/* === Thick, continuous smoke column ===
              Seven staggered puffs (mix of cool greys and warmer
              ashes) so the column never clears. The staggered
              animation delays are small (0.45s apart) to keep the
              column dense. */}
          <g className="ef-smoke-broken">
            <ellipse cx="37" cy="-6" rx="4.6" ry="4"   fill="#3a3a4a" opacity="0.92" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '0.45s' }}>
            <ellipse cx="38" cy="-6" rx="4.2" ry="3.7" fill="#2a2a38" opacity="0.9" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '0.9s' }}>
            <ellipse cx="36" cy="-6" rx="4.3" ry="3.8" fill="#4a4a5a" opacity="0.88" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '1.35s' }}>
            <ellipse cx="39" cy="-6" rx="3.9" ry="3.5" fill="#3a3a4a" opacity="0.85" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '1.8s' }}>
            <ellipse cx="35" cy="-6" rx="4"   ry="3.6" fill="#2a2a3a" opacity="0.82" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '2.25s' }}>
            <ellipse cx="38" cy="-6" rx="3.8" ry="3.4" fill="#5a5a6a" opacity="0.8" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '2.7s' }}>
            <ellipse cx="37" cy="-6" rx="4.1" ry="3.5" fill="#1a1a28" opacity="0.75" />
          </g>

          {/* Orange/red hot-ash glow mixed into the base of the
              smoke column (fades before the smoke reaches the top) */}
          <g className="ef-smoke-broken" style={{ animationDelay: '0.3s' }}>
            <ellipse cx="37" cy="-5" rx="2.8" ry="2" fill="#ff5522" opacity="0.55" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '1.1s' }}>
            <ellipse cx="37" cy="-5" rx="2.2" ry="1.6" fill="#ff3308" opacity="0.45" />
          </g>
          <g className="ef-smoke-broken" style={{ animationDelay: '2.1s' }}>
            <ellipse cx="37" cy="-5" rx="1.8" ry="1.4" fill="#ff7733" opacity="0.4" />
          </g>

          {/* Bright rising embers — small glowing pixels */}
          <g className="ef-ember-rise">
            <rect x="36.5" y="-6" width="1" height="1" fill="#ffcc66" />
          </g>
          <g className="ef-ember-rise" style={{ animationDelay: '0.6s' }}>
            <rect x="38" y="-6" width="1" height="1" fill="#ffaa44" />
          </g>
          <g className="ef-ember-rise" style={{ animationDelay: '1.2s' }}>
            <rect x="36" y="-6" width="1" height="1" fill="#ff8822" />
          </g>
          <g className="ef-ember-rise" style={{ animationDelay: '1.8s' }}>
            <rect x="37.5" y="-6" width="1" height="1" fill="#ffdd88" />
          </g>

          {/* Occasional electrical spark flash at the top of the
              engine — visible even when smoke thins momentarily */}
          <rect x="37" y="-2" width="2" height="2" fill="#ffdd88"
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
        </g>

        {/* Reflection of boat on water (follows the raised boat) */}
        <g transform="translate(250, 174) scale(1, -0.35)" opacity="0.14">
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
