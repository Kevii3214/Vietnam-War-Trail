import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, CAPTAIN, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Another Boat Sighted — a boat on the horizon, smaller than yours,
 * hull low in the water, maybe forty people packed aboard, waving
 * something white. Dawn, hazy. Your own boat watches from the
 * foreground. Seabird overhead, white cloths flutter frantically.
 */
export function AnotherBoatScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a2038] via-[#0a1828] to-[#0a1020]">
      <style>{`
        @keyframes ab-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes ab-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: ab-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: ab-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes ab-wave-drift {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50%      { transform: translateX(5px); opacity: 0.3; }
        }
        @keyframes ab-boat-rock {
          0%, 100% { transform: rotate(-0.5deg) translateY(0); }
          50%      { transform: rotate(0.5deg) translateY(-1px); }
        }
        @keyframes ab-flag-wave {
          0%, 100% { transform: rotate(-14deg); }
          50%      { transform: rotate(16deg); }
        }
        @keyframes ab-arm-wave {
          0%, 100% { transform: rotate(-8deg); }
          50%      { transform: rotate(10deg); }
        }
        @keyframes ab-distant-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        @keyframes ab-twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.9; }
        }
        @keyframes ab-bird-glide {
          0%   { transform: translate(-60px, -8px); }
          50%  { transform: translate(260px,  8px); }
          100% { transform: translate(580px, -4px); }
        }
        @keyframes ab-bird-flap {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.35); }
        }
        @keyframes ab-shimmer {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.65; }
        }

        .ab-wave-drift  { animation: ab-wave-drift 3.5s ease-in-out infinite; }
        .ab-boat-rock   { animation: ab-boat-rock 3.5s ease-in-out infinite; transform-origin: center bottom; }
        .ab-flag-wave   { animation: ab-flag-wave 2.6s ease-in-out infinite; transform-box: fill-box; }
        .ab-arm-wave    { animation: ab-arm-wave  2.6s ease-in-out infinite; transform-box: fill-box; }
        .ab-distant-bob { animation: ab-distant-bob 3s ease-in-out infinite; }
        .ab-twinkle     { animation: ab-twinkle 2.2s ease-in-out infinite; }
        .ab-bird-glide  { animation: ab-bird-glide 18s linear infinite; }
        .ab-bird-flap   { animation: ab-bird-flap 0.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .ab-shimmer     { animation: ab-shimmer 3.8s ease-in-out infinite; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Hazy dawn sky — layered pastel bands */}
        <rect x="0" y="0" width="500" height="50" fill="#1a2040" />
        <rect x="0" y="50" width="500" height="35" fill="#2a2840" opacity="0.85" />
        <rect x="0" y="85" width="500" height="25" fill="#3a2a2a" opacity="0.6" />

        {/* Low sun — hazy, diffused */}
        <circle cx="250" cy="98" r="20" fill="#d8a860" opacity="0.5" />
        <circle cx="250" cy="98" r="30" fill="#c8904a" opacity="0.18" />
        <circle cx="250" cy="98" r="45" fill="#a8603a" opacity="0.1" />
        {/* Sun path shimmer on water */}
        <rect x="200" y="110" width="100" height="3" fill="#d8a860" opacity="0.35" className="ab-shimmer" />
        <rect x="220" y="120" width="60" height="2" fill="#d8a860" opacity="0.3" className="ab-shimmer"
          style={{ animationDelay: '1.2s' }} />
        <rect x="235" y="128" width="32" height="1.5" fill="#e8c088" opacity="0.3" className="ab-shimmer"
          style={{ animationDelay: '2s' }} />

        {/* Fading stars */}
        {[40, 120, 200, 310, 400, 460, 70, 340, 430].map((x, i) => (
          <rect
            key={`s-${i}`} x={x} y={10 + (i % 3) * 18} width="1.5" height="1.5"
            fill="#d0c8b0" opacity={0.15 + (i % 2) * 0.1} className="ab-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Seabird gliding across sky */}
        <g className="ab-bird-glide">
          <g className="ab-bird-flap">
            <polygon points="-6,0 0,-3 6,0 0,2" fill="#2a2a3a" />
            <polygon points="-2,0 2,0 0,1" fill="#1a1a28" />
          </g>
        </g>
        {/* Second bird, offset */}
        <g className="ab-bird-glide" style={{ animationDelay: '7s' }}>
          <g className="ab-bird-flap" style={{ animationDelay: '0.2s' }}>
            <polygon points="-5,0 0,-2 5,0 0,1.5" fill="#1a1a28" />
          </g>
        </g>

        {/* Ocean */}
        <rect x="0" y="110" width="500" height="170" fill="#0a1626" />
        {[118, 135, 152, 170, 188, 206, 224, 242, 260].map((y, i) => (
          <line
            key={`w-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#1a2030" strokeWidth="0.6" opacity="0.25"
            className="ab-wave-drift" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Haze layer on horizon */}
        <rect x="0" y="108" width="500" height="14" fill="#1a2030" opacity="0.45" />
        <rect x="0" y="110" width="500" height="6" fill="#3a3040" opacity="0.25" />

        {/* === Your boat — center-left, bow facing the other boat ===
            Anchored at SVG (155, 150). The positioning translate lives
            on the OUTER <g> and the rock animation on the INNER <g> so
            the CSS transform doesn't clobber the SVG translate. */}
        <g transform="translate(155, 150)">
        <g className="ab-boat-rock">
          <ellipse cx="0" cy="28" rx="50" ry="3" fill="#020a14" opacity="0.6" />
          {/* Hull — bow on the right (faces the other boat) */}
          <polygon points="-38,12 -30,26 38,26 46,12" fill="#3a2214" />
          <polygon points="-38,12 -30,26 38,26 46,12" fill="none" stroke="#1a0a04" strokeWidth="0.9" />
          <line x1="-32" y1="20" x2="40" y2="20" stroke="#1a0a04" strokeWidth="0.7" />
          {/* Waterline foam */}
          <rect x="-34" y="25.5" width="74" height="0.8" fill="#5a7a9a" opacity="0.55" />
          {/* Deck */}
          <rect x="-30" y="8" width="70" height="5" fill="#5a3a1e" />
          <rect x="-30" y="8" width="70" height="1" fill="#7a5230" />
          {/* Cabin on the stern (left) side */}
          <rect x="-24" y="-6" width="22" height="14" fill="#3a2214" />
          <rect x="-20" y="-4" width="5" height="5" fill="#0a0a10" />
          <rect x="-10" y="-4" width="5" height="5" fill="#ffcf5c" opacity="0.6" />
          {/* Mast, rightward (bow) */}
          <rect x="14" y="-22" width="2" height="28" fill="#3a2a18" />
          <rect x="10" y="-20" width="10" height="4" fill="#a09878" />

          {/* === Canonical family watching === */}
          {/* Protagonist at the gunwale, hand shading eyes */}
          <PixelPerson x={14} y={-10} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="sad" sway="idle" />
          {/* Hand raised to brow */}
          <rect x={15} y={-17} width={7} height={1.5} fill={PROTAGONIST.color} />

          <PixelPerson x={0} y={-8} scale={1} variant="civilian" {...MOTHER}
            mood="sad" sway="idle" swayDelay={0.3} />
          <PixelPerson x={-10} y={-4} scale={0.75} variant="civilian" {...CHILD}
            mood="sad" sway="idle" swayDelay={0.5} />
          <PixelPerson x={-24} y={-6} scale={0.9} variant="civilian" {...GRANDFATHER}
            mood="weary" sway="idle" swayDelay={0.7} />
          <PixelPerson x={28} y={-10} scale={0.95} variant="civilian" {...CAPTAIN}
            mood="weary" sway="idle" swayDelay={0.9} />
          <PixelPerson x={-34} y={-4} scale={0.75} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="sad" sway="idle" swayDelay={1.1} mirror />
        </g>
        </g>

        {/* Small wake between the two boats */}
        <rect x="215" y="178" width="36" height="1" fill="#3a4a5a" opacity="0.45" />
        <rect x="255" y="180" width="28" height="0.8" fill="#3a4a5a" opacity="0.35" />

        {/* === Other refugee boat — center-right, mirrored (bow points
            LEFT, toward your boat). Similar silhouette to your boat so
            it's clearly a fellow fishing vessel; people aboard use the
            `FELLOW_PASSENGERS` palettes so the cast is distinct from
            your family. Anchored at (345, 150), mirrored geometry. */}
        <g transform="translate(345, 150)">
        <g className="ab-boat-rock" style={{ animationDelay: '0.9s' }}>
          <ellipse cx="0" cy="28" rx="50" ry="3" fill="#020a14" opacity="0.6" />
          {/* Hull — mirrored, bow on LEFT */}
          <polygon points="-46,12 -38,26 30,26 38,12" fill="#3a2214" />
          <polygon points="-46,12 -38,26 30,26 38,12" fill="none" stroke="#1a0a04" strokeWidth="0.9" />
          <line x1="-40" y1="20" x2="32" y2="20" stroke="#1a0a04" strokeWidth="0.7" />
          {/* Waterline foam */}
          <rect x="-40" y="25.5" width="74" height="0.8" fill="#5a7a9a" opacity="0.55" />
          {/* Deck */}
          <rect x="-40" y="8" width="70" height="5" fill="#5a3a1e" />
          <rect x="-40" y="8" width="70" height="1" fill="#7a5230" />
          {/* Cabin on stern (right) side */}
          <rect x="2" y="-6" width="22" height="14" fill="#3a2214" />
          <rect x="15" y="-4" width="5" height="5" fill="#0a0a10" />
          <rect x="5"  y="-4" width="5" height="5" fill="#ffcf5c" opacity="0.6" />
          {/* Mast on bow (left) side */}
          <rect x="-16" y="-22" width="2" height="28" fill="#3a2a18" />
          <rect x="-20" y="-20" width="10" height="4" fill="#a09878" />

          {/* === Different refugees aboard, all facing LEFT via mirror
              prop so they're visually oriented toward your boat. === */}
          {/* Leader at the bow */}
          <PixelPerson x={-30} y={-10} scale={1.05} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="determined" sway="idle" mirror />

          {/* Mother-like figure */}
          <PixelPerson x={-18} y={-8} scale={1} variant="civilian" {...FELLOW_PASSENGERS[1]}
            mood="weary" sway="idle" swayDelay={0.3} mirror />
          {/* Small child peering */}
          <PixelPerson x={-8} y={-4} scale={0.75} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="sad" sway="idle" swayDelay={0.5} mirror />
          {/* Elder figure */}
          <PixelPerson x={6} y={-6} scale={0.9} variant="civilian" {...FELLOW_PASSENGERS[3]}
            mood="weary" sway="idle" swayDelay={0.7} mirror />
          {/* Extra fellow passenger */}
          <PixelPerson x={16} y={-4} scale={0.8} variant="civilian" {...FELLOW_PASSENGERS[5]}
            mood="sad" sway="idle" swayDelay={1.0} mirror />
          {/* Their captain at the stern (right) */}
          <PixelPerson x={26} y={-10} scale={0.95} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="determined" sway="idle" swayDelay={0.9} />
        </g>
        </g>

        {/* Small foreground ripples */}
        <g>
          <rect x="60" y="206" width="30" height="1" fill="#3a4a5a" opacity="0.35"
            className="ab-wave-drift" />
          <rect x="140" y="216" width="26" height="1" fill="#3a4a5a" opacity="0.3"
            className="ab-wave-drift" style={{ animationDelay: '1.1s' }} />
          <rect x="240" y="210" width="28" height="1" fill="#3a4a5a" opacity="0.3"
            className="ab-wave-drift" style={{ animationDelay: '2.1s' }} />
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="25" fill="#000" opacity="0.4" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}
