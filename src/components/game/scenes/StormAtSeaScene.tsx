import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, CAPTAIN, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Small "!" (or "!!") panic mark that bobs above a character's head.
 * The mark is rendered inside the tossed boat's coordinate space so it
 * stays locked to the person as the boat heaves.
 */
function renderPanicMark(cx: number, cy: number, text: '!' | '!!', delay: number) {
  const single = (ex: number, key: number) => (
    <g key={key}>
      {/* Dark outline so the mark reads against the storm sky */}
      <rect x={ex - 0.85} y={cy - 3.2} width={1.7} height={3.2} fill="#0a0408" />
      <rect x={ex - 0.85} y={cy + 0.9} width={1.7} height={1.7} fill="#0a0408" />
      {/* Bright yellow body */}
      <rect x={ex - 0.5}  y={cy - 3}   width={1}   height={2.8} fill="#ffde5c" />
      <rect x={ex - 0.5}  y={cy + 1.1} width={1}   height={1.3} fill="#ffde5c" />
    </g>
  );
  const positions = text === '!' ? [cx] : [cx - 1.6, cx + 1.6];
  return (
    <g className="sas-panic-bob" style={{ animationDelay: `${delay}s` }}>
      {positions.map((ex, i) => single(ex, i))}
    </g>
  );
}

/**
 * Storm at Sea — dark clouds, crashing waves, rain, lightning,
 * the family's fishing boat being tossed, water sweeping over the
 * sides. Everyone terrified; captain fighting the tiller.
 *
 * Character palettes come from characterPalettes.ts so "you", "mom",
 * "the kid" and "the old man" are recognizably the same people across
 * every scene in the game.
 */
export function StormAtSeaScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#040410] via-[#0a1020] to-[#05142a]">
      <style>{`
        @keyframes sas-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        /* Intense terror — erratic, rapid trembling with translation in
           both axes and larger rotation than the default scared sway so
           the characters read as if fearing for their lives. */
        @keyframes sas-chibi-scared {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          12%      { transform: translate(-1.5px, 0.4px) rotate(-3deg); }
          25%      { transform: translate(1.5px, -0.3px) rotate(2.5deg); }
          37%      { transform: translate(-1.2px, 0.5px) rotate(-2.2deg); }
          50%      { transform: translate(1.7px, -0.4px) rotate(3deg); }
          62%      { transform: translate(-1.5px, 0.4px) rotate(-2.5deg); }
          75%      { transform: translate(1.3px, -0.3px) rotate(2deg); }
          87%      { transform: translate(-1.6px, 0.5px) rotate(-3deg); }
        }
        @keyframes sas-chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        .chibi-sway-idle   { animation: sas-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: sas-chibi-scared 0.28s linear infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: sas-chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* Boat rides a large sine-wave swell — strictly vertical
           motion (no x drift) with gentle rocking tilt for the feel
           of rough seas. Large amplitude so the boat visibly climbs
           up a crest and plunges into the trough. */
        @keyframes sas-boat-heave {
          0%, 100% { transform: translateY(16px)  rotate(-3deg); }
          50%      { transform: translateY(-16px) rotate(3deg); }
        }
        @keyframes sas-wave-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
        /* Wave swell — the whole wave row grows and shrinks vertically
           around the ocean floor (y=280 in the 0 0 500 280 viewBox),
           simulating swells rising and falling. Because the scale pivot
           is anchored at the very bottom of the viewBox, the wave crest
           moves up and down while the underside of the fill stays
           pinned to the bottom of the screen (no gap exposed). */
        @keyframes sas-swell {
          0%, 100% { transform: scaleY(0.82); }
          50%      { transform: scaleY(1.32); }
        }
        /* Small bouncing scale for the "!" panic marks above heads. */
        @keyframes sas-panic-bob {
          0%, 100% { transform: translateY(0)    scale(1); }
          50%      { transform: translateY(-1.4px) scale(1.25); }
        }
        /* Individual raindrops falling mostly straight down. Each drop
           is a tiny teardrop ellipse rather than a long line, so the
           rain reads as individual points rather than dashed streaks. */
        @keyframes sas-raindrop {
          0%   { transform: translateY(-30px); opacity: 0; }
          8%   { opacity: 0.9; }
          92%  { opacity: 0.85; }
          100% { transform: translateY(320px); opacity: 0; }
        }
        /* Brief double-strike lightning: mostly dark, flashes, dark again */
        @keyframes sas-lightning {
          0%, 90%, 100% { opacity: 0; }
          91%           { opacity: 1; }
          92%           { opacity: 0.15; }
          93%           { opacity: 0.9; }
          94%           { opacity: 0.4; }
          95%           { opacity: 0; }
        }
        @keyframes sas-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes sas-spray {
          0%   { transform: translate(0, 0); opacity: 0.9; }
          100% { transform: translate(-20px, -16px); opacity: 0; }
        }
        @keyframes sas-tiller-shake {
          0%, 100% { transform: rotate(-6deg); }
          50%      { transform: rotate(10deg); }
        }

        .sas-boat-heave     { animation: sas-boat-heave 4.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .sas-wave           { animation: sas-wave-slide 3s linear infinite; }
        .sas-swell          { animation-name: sas-swell; animation-timing-function: ease-in-out; animation-iteration-count: infinite; transform-box: view-box; transform-origin: 50% 280px; }
        .sas-panic-bob      { animation: sas-panic-bob 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .sas-raindrop       { animation: sas-raindrop 1s linear infinite; }
        .sas-lightning      { animation: sas-lightning 7s ease-in-out infinite; }
        .sas-lightning-2    { animation: sas-lightning 9s ease-in-out infinite; animation-delay: 3.7s; }
        .sas-cloud-drift    { animation: sas-cloud-drift 22s linear infinite; }
        .sas-spray          { animation: sas-spray 1.4s ease-out infinite; transform-box: fill-box; }
        .sas-tiller-shake   { animation: sas-tiller-shake 1.3s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Sky wash during lightning flash */}
        <rect x="0" y="0" width="500" height="280" fill="#c0c8e0" className="sas-lightning" />
        <rect x="0" y="0" width="500" height="280" fill="#a0b0d0" className="sas-lightning-2" />

        {/* Storm clouds - two drifting layers */}
        <g className="sas-cloud-drift">
          {[
            { cx: 60, cy: 28, rx: 52, ry: 18 },
            { cx: 160, cy: 22, rx: 72, ry: 22 },
            { cx: 280, cy: 28, rx: 66, ry: 20 },
            { cx: 400, cy: 20, rx: 62, ry: 18 },
            { cx: 490, cy: 32, rx: 44, ry: 15 },
            { cx: 560, cy: 25, rx: 58, ry: 20 },
          ].map((c, i) => (
            <ellipse key={`c-${i}`} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
              fill={i % 2 === 0 ? '#0f0f1a' : '#1c1c2c'} />
          ))}
          {/* Darker under-layer, turbulent */}
          {[40, 130, 250, 370, 460, 540].map((cx, i) => (
            <ellipse key={`cb-${i}`} cx={cx} cy={46 + (i % 2) * 4} rx={58} ry={12}
              fill="#0a0a14" opacity="0.9" />
          ))}
        </g>

        {/* Lightning bolts — sync with the sky wash */}
        <g className="sas-lightning">
          {/* Sky halo around strike */}
          <circle cx="195" cy="40" r="70" fill="#e8eaff" opacity="0.45" />
          <polyline points="200,8 206,30 194,48 210,68 198,88 212,108" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <polyline points="200,8 206,30 194,48 210,68 198,88 212,108" fill="none" stroke="#e8eaff" strokeWidth="4" opacity="0.35" />
          <polyline points="210,68 222,76 228,94" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
        </g>
        <g className="sas-lightning-2">
          <circle cx="360" cy="46" r="58" fill="#d8dcf0" opacity="0.4" />
          <polyline points="362,10 368,36 358,58 372,80 360,102" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <polyline points="362,10 368,36 358,58 372,80 360,102" fill="none" stroke="#e0e8ff" strokeWidth="3.5" opacity="0.3" />
          <polyline points="358,58 348,66 352,80" fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.85" />
        </g>

        {/* Rough sea — layered wave paths. Each row nests two transforms:
            an outer `sas-swell` that vertically scales the wave
            amplitude (crests grow and shrink), and an inner `sas-wave`
            that scrolls the pattern horizontally. Staggered delays and
            durations per row make the sea read as chaotic rather than
            uniform. */}
        {[100, 120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
          <g key={`waverow-${y}`} className="sas-swell"
            style={{ animationDelay: `${(i * 0.55) % 3}s`, animationDuration: `${5.5 + (i % 3) * 1.1}s` }}>
            <g className="sas-wave"
              style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${2.5 + i * 0.2}s` }}>
              <path
                d={`M -80 ${y} Q ${-60 + i * 3} ${y - 9} ${-40} ${y} Q ${-20 + i * 2} ${y + 7} 0 ${y}
                    Q 20 ${y - 8} 40 ${y} Q 60 ${y + 6} 80 ${y}
                    Q 100 ${y - 9} 120 ${y} Q 140 ${y + 7} 160 ${y}
                    Q 180 ${y - 8} 200 ${y} Q 220 ${y + 6} 240 ${y}
                    Q 260 ${y - 9} 280 ${y} Q 300 ${y + 7} 320 ${y}
                    Q 340 ${y - 8} 360 ${y} Q 380 ${y + 6} 400 ${y}
                    Q 420 ${y - 9} 440 ${y} Q 460 ${y + 7} 480 ${y}
                    Q 500 ${y - 8} 520 ${y} Q 540 ${y + 6} 560 ${y}
                    V 280 H -80 Z`}
                fill={i < 3 ? '#0a1828' : i < 6 ? '#081628' : '#061224'}
                opacity={0.75 + i * 0.025}
              />
            </g>
          </g>
        ))}

        {/* Whitecaps / foam crests */}
        {[50, 140, 230, 320, 410, 90, 260, 380].map((wx, wi) => (
          <rect
            key={`foam-${wi}`} x={wx} y={118 + (wi % 4) * 22} width={22} height={2}
            fill="#7a9abb" opacity="0.55"
            className="sas-wave" style={{ animationDelay: `${wi * 0.4}s` }}
          />
        ))}

        {/* === The boat — riding a large sine-wave swell ===
            Anchored at SVG (250, 138): horizontally centered in the
            viewport and raised enough that the hull, cabin, mast and
            family all clear the dialogue box at the bottom of the
            screen even at the lowest point of the heave.
            CSS animations override SVG `transform` attributes, so the
            positioning `translate(...)` lives on the OUTER <g> and
            the heave animation lives on the INNER <g>. That way the
            anchor stays put and only the boat bobs vertically. */}
        <g transform="translate(250, 138)">
        <g className="sas-boat-heave">
          {/* Water shadow */}
          <ellipse cx="0" cy="30" rx="55" ry="4" fill="#020510" opacity="0.55" />

          {/* Hull */}
          <polygon points="-40,12 -30,28 40,28 48,12" fill="#3a2214" />
          <polygon points="-40,12 -30,28 40,28 48,12" fill="none" stroke="#1a0a04" strokeWidth="1" />
          <line x1="-34" y1="20" x2="42" y2="20" stroke="#1a0a04" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-32" y="8" width="74" height="5" fill="#5a3a1e" />
          <rect x="-32" y="8" width="74" height="1" fill="#7a5230" />
          {/* Cabin */}
          <rect x="-26" y="-6" width="22" height="14" fill="#3a2214" />
          <rect x="-22" y="-4" width="6" height="6" fill="#0a0a18" />
          <rect x="-14" y="-4" width="6" height="6" fill="#0a0a18" />
          {/* Mast, tilting with boat */}
          <rect x="14" y="-26" width="2.5" height="36" fill="#3a2a18" />
          {/* Tattered furled sail whipping */}
          <rect x="9" y="-22" width="12" height="5" fill="#a09878" />
          <rect x="10" y="-17" width="10" height="2" fill="#80785a" />
          {/* NOTE: the tattered red pennant that used to fly from the
              mast top (a 1.5x4 dark-brown pole at x=16 plus a
              #cc2222 polygon pennant) has been removed at the user's
              request. The bare mast still pokes above the furled
              sail so the silhouette reads correctly. */}

          {/* === Canonical passengers huddled on deck ===
              Everyone is now `scared` (or `sad` for the child so the
              overlay drop reads as tears instead of sweat), and every
              body uses the violent `sway="scared"` animation so they
              tremble for their lives. A "!" panic mark bobs above each
              head for unmistakable pixel-anime panic energy. */}
          {/* The mother — clutching the child */}
          <PixelPerson x={-18} y={-8} scale={0.95} variant="civilian" {...MOTHER}
            mood="scared" sway="scared" swayDelay={0.1} />
          {renderPanicMark(-9.5, -13, '!',  0)}

          {/* The child — crying, clinging to mother */}
          <PixelPerson x={-8} y={-4} scale={0.8} variant="civilian" {...CHILD}
            mood="sad" sway="scared" swayDelay={0.35} />
          {renderPanicMark(0, -10, '!', 0.18)}

          {/* The grandfather — terrified despite his years */}
          <PixelPerson x={4} y={-6} scale={0.95} variant="civilian" {...GRANDFATHER}
            mood="scared" sway="scared" swayDelay={0.2} />
          {renderPanicMark(12.6, -11, '!', 0.33)}

          {/* The protagonist — bracing but clearly terrified */}
          <PixelPerson x={18} y={-10} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="scared" sway="scared" swayDelay={0.6} />
          {renderPanicMark(27.5, -15, '!!', 0.08)}

          {/* One extra fellow passenger for density */}
          <PixelPerson x={-28} y={-6} scale={0.85} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="scared" sway="scared" swayDelay={0.5} mirror />
          {renderPanicMark(-20.4, -11, '!', 0.41)}

          {/* === Captain at the stern — scared but wrestling the tiller === */}
          <g>
            <PixelPerson x={30} y={-10} scale={1} variant="civilian" {...CAPTAIN}
              mood="scared" sway="scared" swayDelay={0.22} />
            {renderPanicMark(39, -15, '!', 0.26)}
            {/* Tiller — shakes back and forth */}
            <g className="sas-tiller-shake" style={{ transformOrigin: '48px 6px' }}>
              <rect x={46} y={-2} width={2} height={16} fill="#3a2614" />
              <rect x={44} y={-4} width={6} height={3} fill="#5a3e20" />
            </g>
          </g>
        </g>
        </g>

        {/* === Rain — individual falling drops ===
            Each drop is a small teardrop ellipse that falls straight
            down the full viewport on its own timing. Varying delay,
            duration, starting x, and size keeps the pattern from
            looking like a dashed grid. */}
        {Array.from({ length: 70 }).map((_, i) => {
          const x = (i * 37 + (i % 5) * 11) % 510 - 5;
          const delay    = ((i * 0.13) % 1.3).toFixed(2);
          const duration = (0.85 + (i % 4) * 0.12).toFixed(2);
          const size     = 0.55 + ((i * 0.7) % 1) * 0.25;
          const len      = 1.1 + (i % 3) * 0.25;
          const shade    = i % 3 === 0 ? '#b8d4e8' : i % 3 === 1 ? '#9ac0d8' : '#7aa8c4';
          return (
            <ellipse
              key={`rain-${i}`}
              cx={x} cy={0}
              rx={size} ry={len}
              fill={shade}
              className="sas-raindrop"
              style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
            />
          );
        })}

        {/* Wind-blown spray specks drifting across the scene */}
        {[120, 180, 240, 300, 360, 420, 460].map((sx, si) => (
          <rect
            key={`spray-${si}`} x={sx} y={150 + (si % 3) * 18} width={1.5} height={1.5}
            fill="#c8d8e8" opacity="0.55"
            className="sas-spray"
            style={{ animationDelay: `${si * 0.22}s`, animationDuration: `${1.2 + (si % 3) * 0.3}s` }}
          />
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="30" fill="#000" opacity="0.4" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}
