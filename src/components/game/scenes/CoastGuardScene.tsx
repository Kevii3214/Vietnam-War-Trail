import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, CAPTAIN, COAST_GUARD, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Coast Guard Patrol — a searchlight sweeps the water. A patrol boat.
 * Has it seen you yet? Unknown. The night is black, the engine is
 * unbearably loud, everyone crouches. Captain presses a finger to his
 * lips. The light sweeps across your deck every few seconds.
 */
export function CoastGuardScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#050515] via-[#05081a] to-[#081428]">
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
          0%   { transform: rotate(-28deg); }
          50%  { transform: rotate(28deg); }
          100% { transform: rotate(-28deg); }
        }
        @keyframes cg-boat-rock {
          0%, 100% { transform: rotate(-0.3deg) translateY(0); }
          50%      { transform: rotate(0.3deg) translateY(-1px); }
        }
        @keyframes cg-wave {
          0%, 100% { transform: translateX(0); opacity: 0.15; }
          50%      { transform: translateX(6px); opacity: 0.28; }
        }
        @keyframes cg-twinkle {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.85; }
        }
        @keyframes cg-patrol-drift {
          0%   { transform: translateX(60px); }
          100% { transform: translateX(-30px); }
        }
        @keyframes cg-engine-throb {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50%      { opacity: 0.7; transform: scaleX(1.4); }
        }
        @keyframes cg-beam-on-us {
          0%, 18%, 100% { opacity: 0; }
          40%           { opacity: 0.4; }
          60%           { opacity: 0.6; }
          82%           { opacity: 0; }
        }
        @keyframes cg-beacon-blink {
          0%, 45%, 55%, 100% { opacity: 0.1; }
          50%                { opacity: 1; }
        }
        @keyframes cg-heartbeat {
          0%, 100% { transform: scale(1); }
          30%      { transform: scale(1.05); }
        }

        .cg-searchlight   { animation: cg-searchlight 5s ease-in-out infinite; transform-box: fill-box; }
        .cg-boat-rock     { animation: cg-boat-rock 4s ease-in-out infinite; transform-origin: center bottom; }
        .cg-wave          { animation: cg-wave 3s ease-in-out infinite; }
        .cg-twinkle       { animation: cg-twinkle 2.5s ease-in-out infinite; }
        .cg-patrol-drift  { animation: cg-patrol-drift 24s linear infinite; }
        .cg-engine-throb  { animation: cg-engine-throb 0.6s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        .cg-beam-on-us    { animation: cg-beam-on-us 5s ease-in-out infinite; }
        .cg-beacon-blink  { animation: cg-beacon-blink 1.5s ease-in-out infinite; }
        .cg-heartbeat     { animation: cg-heartbeat 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#05071a" />

        {/* Stars */}
        {[
          [30, 10], [80, 28], [140, 6], [200, 32], [260, 14], [320, 36],
          [380, 8], [440, 26], [480, 40], [60, 48], [160, 52], [280, 44],
          [400, 56], [120, 60], [350, 58], [230, 8], [370, 22], [45, 68],
        ].map(([x, y], i) => (
          <rect
            key={`s-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#d0c8b0"
            opacity={0.2 + (i % 3) * 0.15} className="cg-twinkle"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Horizon line, barely visible */}
        <rect x="0" y="104" width="500" height="1" fill="#1a2030" opacity="0.3" />

        {/* Ocean */}
        <rect x="0" y="105" width="500" height="175" fill="#080c1a" />
        {[118, 138, 158, 178, 198, 218, 238, 258].map((y, i) => (
          <line
            key={`w-${y}`} x1={-30} y1={y} x2={530} y2={y}
            stroke="#1a1e30" strokeWidth="0.8" opacity="0.28"
            className="cg-wave" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* === Patrol boat in the distance, drifting across === */}
        <g className="cg-patrol-drift">
          <g transform="translate(350, 98)">
            {/* Military gray hull */}
            <polygon points="-30,10 -22,22 30,22 38,10" fill="#2a2e38" />
            <polygon points="-30,10 -22,22 30,22 38,10" fill="none" stroke="#14161e" strokeWidth="0.7" />
            <rect x="-22" y="4" width="54" height="6" fill="#3a3e48" />
            <rect x="-22" y="4" width="54" height="1" fill="#4a4e58" />
            {/* Bridge */}
            <rect x="-14" y="-6" width="22" height="10" fill="#2a2e38" />
            <rect x="-10" y="-4" width="5" height="4" fill="#1a1a2a" />
            <rect x="-3" y="-4" width="5" height="4" fill="#1a1a2a" />
            {/* Antenna mast */}
            <rect x="8" y="-16" width="1" height="12" fill="#5a5a5a" />
            {/* Rotating red/blue beacon */}
            <rect x="6" y="-10" width="3" height="2" fill="#ff3a3a" className="cg-beacon-blink" />
            <rect x="6" y="-10" width="3" height="2" fill="#3a8aff"
              className="cg-beacon-blink" style={{ animationDelay: '0.75s' }} />
            {/* Flag */}
            <rect x="9" y="-16" width="1" height="3" fill="#c02020" />

            {/* Searchlight — source on bow, cone sweeping.
                The rotation PIVOT should be the lamp on the bow (local
                coordinates ≈ (22, -2)). Because the CSS class uses
                `transform-box: fill-box`, transformOrigin is measured
                from the group's bounding-box top-left. With content
                extending to x=-120 and y=-4, fill-box top-left is at
                local (-120, -4), so the pivot in fill-box-relative
                coords is (22 - (-120), -2 - (-4)) = (142, 2).
                This prevents the bright lamp from swinging wildly off
                the bow (the "moving light" bug). */}
            <g className="cg-searchlight" style={{ transformOrigin: '142px 2px' }}>
              {/* Outer cone */}
              <polygon points="22,-2 -120,280 110,280" fill="#ffee88" opacity="0.08" />
              {/* Inner cone */}
              <polygon points="23,-1 -40,150 82,150" fill="#ffee88" opacity="0.055" />
              {/* Tight cone */}
              <polygon points="24,0 -10,110 50,110" fill="#fff2b0" opacity="0.06" />
              {/* Bright lamp */}
              <rect x="20" y="-4" width="7" height="5" fill="#ffe488" opacity="0.95" />
              <rect x="21" y="-3" width="5" height="3" fill="#ffffff" opacity="0.7" />
            </g>

            {/* Coast-guard officer standing on the bridge (inside the
                patrol-boat group so he drifts WITH the boat, not floats
                in the sky beside it). Scaled small since the patrol
                boat is in the distance. */}
            <g transform="translate(-6, -6)">
              <PixelPerson x={0} y={0} scale={0.32} variant="soldier" {...COAST_GUARD}
                mood="determined" sway="idle" />
            </g>

            {/* Engine wake */}
            <rect x="-34" y="22" width="16" height="2" fill="#1a2a3a"
              opacity="0.4" className="cg-engine-throb" />
            <rect x="-42" y="23" width="12" height="1.5" fill="#1a2a3a"
              opacity="0.3" className="cg-engine-throb" style={{ animationDelay: '0.3s' }} />
          </g>
        </g>

        {/* === Beam occasionally lands ON us (the boat) === */}
        <g className="cg-beam-on-us">
          <ellipse cx="200" cy="185" rx="80" ry="12" fill="#fff2b0" opacity="0.35" />
          <ellipse cx="200" cy="185" rx="48" ry="7" fill="#ffffff" opacity="0.35" />
          {/* Water glint */}
          <ellipse cx="200" cy="196" rx="60" ry="4" fill="#fff2b0" opacity="0.25" />
        </g>

        {/* === Your boat — foreground, dark, everyone crouching === */}
        <g transform="translate(200, 178)" className="cg-boat-rock">
          <ellipse cx="0" cy="26" rx="54" ry="3" fill="#020408" opacity="0.7" />
          {/* Hull */}
          <polygon points="-42,12 -34,26 42,26 50,12" fill="#1a0e06" />
          <polygon points="-42,12 -34,26 42,26 50,12" fill="none" stroke="#0a0402" strokeWidth="1" />
          <line x1="-36" y1="20" x2="44" y2="20" stroke="#0a0402" strokeWidth="0.7" />
          {/* Deck */}
          <rect x="-34" y="8" width="78" height="5" fill="#2a1808" />
          {/* Cabin — completely blacked out */}
          <rect x="-26" y="-6" width="24" height="14" fill="#140a04" />
          <rect x="-22" y="-4" width="6" height="6" fill="#0a0408" />
          <rect x="-12" y="-4" width="6" height="6" fill="#0a0408" />
          {/* Mast */}
          <rect x="16" y="-22" width="2" height="30" fill="#2a1808" />
          {/* No lights, no flag flying — they're trying to be invisible */}

          {/* === Everyone crouching: small-scale PixelPersons cropped by the gunwale === */}
          {/* We clip each passenger so only head + shoulders show above the deck line */}
          <defs>
            <clipPath id="cg-gunwale">
              {/* Crop to only show above y=9 (just above deck surface) */}
              <rect x="-40" y="-40" width="90" height="49" />
            </clipPath>
          </defs>
          <g clipPath="url(#cg-gunwale)">
            {/* Mother ducked — only head + hair show */}
            <PixelPerson x={-18} y={-4} scale={0.8} variant="civilian" {...MOTHER}
              mood="scared" sway="scared" swayDelay={0.1} />
            {/* Child pressed against mother */}
            <PixelPerson x={-10} y={-2} scale={0.7} variant="civilian" {...CHILD}
              mood="scared" sway="scared" swayDelay={0.4} />
            {/* Grandfather quietly weary */}
            <PixelPerson x={0} y={-4} scale={0.8} variant="civilian" {...GRANDFATHER}
              mood="weary" sway="idle" swayDelay={0.2} />
            {/* Protagonist — frozen still */}
            <PixelPerson x={10} y={-6} scale={0.9} variant="civilian" {...PROTAGONIST}
              mood="determined" sway="idle" swayDelay={0.0} />
            {/* Fellow passenger */}
            <PixelPerson x={-28} y={-2} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[3]}
              mood="scared" sway="scared" swayDelay={0.6} mirror />
          </g>

          {/* === Captain at the stern, pressing finger to lips === */}
          <g>
            <PixelPerson x={28} y={-10} scale={0.95} variant="civilian" {...CAPTAIN}
              mood="determined" sway="idle" />
            {/* Finger-to-lips: small skin-toned rect in front of face */}
            <rect x={33} y={-6} width={2} height={4} fill={CAPTAIN.color} />
            <rect x={32} y={-5} width={1.5} height={1.5} fill="#0a0a0a" />
          </g>

          {/* Heartbeat indicator — small pulsing red dot near cabin
              (tiny dramatic cue that everyone's pulse is pounding) */}
          <rect x="-3" y="-16" width="2" height="2" fill="#ff3a3a"
            opacity="0.75" className="cg-heartbeat" />
        </g>

        {/* Heavy vignette, edges very dark */}
        <rect x="0" y="0" width="500" height="40" fill="#000" opacity="0.65" />
        <rect x="0" y="252" width="500" height="28" fill="#000" opacity="0.6" />
        <rect x="0" y="0" width="40" height="280" fill="#000" opacity="0.35" />
        <rect x="460" y="0" width="40" height="280" fill="#000" opacity="0.35" />
      </svg>
    </div>
  );
}
