import { PixelPerson } from './PixelPeople';
import type { CharacterPalette } from './characterPalettes';
import { PROTAGONIST, FELLOW_PASSENGERS } from './characterPalettes';

/**
 * American foreman palette — fair skin, blue work shirt, jeans,
 * sandy-blond hair. Distinct from the refugee cast so the player
 * instantly reads him as a local / boss.
 */
const FOREMAN: CharacterPalette = {
  color: '#f4d6b0',
  shirtColor: '#4a6fa5',
  pantsColor: '#2a2838',
  hairColor: '#8a6a3a',
  accentColor: '#c8a860',
};

/**
 * First Day of Work — factory interior. The protagonist stands at a
 * conveyor belt beside other refugee workers with an American
 * foreman supervising. Visual grammar matches Phase 3 scenes:
 * PixelPerson chibi sprites on canonical palettes, scene-prefixed
 * keyframes, and the same 500×280 viewBox.
 */
export function FirstDayWorkScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#4a4a52] via-[#3a3a42] to-[#2a2a32]">
      <style>{`
        @keyframes fdw-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes fdw-chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        @keyframes fdw-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: fdw-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: fdw-chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: fdw-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes fdw-belt {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-20px); }
        }
        .fdw-belt-seg { animation: fdw-belt 1.2s linear infinite; }

        @keyframes fdw-item-slide {
          0%   { transform: translateX(0);  opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(-420px); opacity: 0; }
        }
        .fdw-item { animation: fdw-item-slide 8s linear infinite; }

        @keyframes fdw-flicker {
          0%, 93%, 100% { opacity: 0.95; }
          94%           { opacity: 0.35; }
          96%           { opacity: 0.9; }
        }
        .fdw-light { animation: fdw-flicker 5.5s ease-in-out infinite; }

        @keyframes fdw-blink {
          0%, 49%, 100% { fill: #cc3a2a; }
          50%, 99%      { fill: #2acc4a; }
        }
        .fdw-blink { animation: fdw-blink 2.2s steps(1) infinite; }

        @keyframes fdw-steam {
          0%   { transform: translateY(0) scale(1);    opacity: 0.5; }
          100% { transform: translateY(-28px) scale(1.6); opacity: 0; }
        }
        .fdw-steam { animation: fdw-steam 3.2s ease-out infinite; transform-box: fill-box; transform-origin: center bottom; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Back wall — painted cinder-block gray === */}
        <rect x="0" y="0" width="500" height="170" fill="#3a3a42" />
        <rect x="0" y="0" width="500" height="22" fill="#2a2a30" />
        {/* Cinder-block courses */}
        {[30, 50, 70, 90, 110, 130, 150].map((y) => (
          <rect key={y} x="0" y={y} width="500" height="1" fill="#2e2e36" opacity="0.55" />
        ))}
        {/* Horizontal ducts / pipes running along the upper wall */}
        <rect x="0" y="38" width="500" height="5" fill="#5a5a62" />
        <rect x="0" y="38" width="500" height="1" fill="#7a7a82" />
        <rect x="0" y="42" width="500" height="1" fill="#2a2a30" />
        <rect x="0" y="60" width="500" height="3" fill="#4a4a52" />

        {/* Wall bolts / rivets on the ducts */}
        {[40, 100, 160, 220, 280, 340, 400, 460].map((x) => (
          <rect key={x} x={x} y="39" width="2" height="2" fill="#1a1a20" />
        ))}

        {/* === Hanging fluorescent ceiling lights === */}
        {[90, 220, 350, 450].map((x, i) => (
          <g key={`lamp-${i}`}>
            {/* Chain */}
            <rect x={x - 0.5} y="22" width="1" height="14" fill="#6a6a72" />
            {/* Housing */}
            <rect x={x - 18} y="36" width="36" height="5" fill="#6e6e76" />
            <rect x={x - 17} y="41" width="34" height="2" fill="#9a9aa2" />
            {/* Tube */}
            <rect x={x - 16} y="43" width="32" height="2" fill="#fff8c0" className="fdw-light"
              style={{ animationDelay: `${i * 0.9}s` }} />
            {/* Glow pool */}
            <ellipse cx={x} cy="52" rx="26" ry="7" fill="#fff8c0" opacity="0.06" />
          </g>
        ))}

        {/* === Posted safety signs on the wall === */}
        <g>
          <rect x="36" y="80" width="26" height="20" fill="#d8b020" />
          <rect x="36" y="80" width="26" height="3" fill="#1a1a1a" />
          <rect x="40" y="88" width="18" height="2" fill="#1a1a1a" />
          <rect x="40" y="92" width="14" height="2" fill="#1a1a1a" />
          <rect x="40" y="96" width="16" height="2" fill="#1a1a1a" />
        </g>
        <g>
          <rect x="260" y="78" width="40" height="24" fill="#b83030" />
          <text x="280" y="92" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700"
            fontFamily="ui-monospace, Menlo, monospace">DANGER</text>
          <text x="280" y="99" textAnchor="middle" fill="#fff" fontSize="5"
            fontFamily="ui-monospace, Menlo, monospace">KEEP CLEAR</text>
        </g>

        {/* === Wall clock — small accent === */}
        <g transform="translate(430, 86)">
          <circle r="11" fill="#e4e0d4" stroke="#1a1a1a" strokeWidth="1.5" />
          <rect x="-5" y="-9" width="10" height="1.5" fill="#1a1a1a" />
          <rect x="-0.8" y="-8" width="1.6" height="8" fill="#1a1a1a" />
          <rect x="-0.6" y="-0.6" width="7" height="1.2" fill="#1a1a1a" />
          <circle r="1.2" fill="#1a1a1a" />
        </g>

        {/* === Heavy wall machine on the left with blinking indicator === */}
        <g transform="translate(0, 100)">
          <rect x="0" y="0" width="30" height="110" fill="#2a2a32" />
          <rect x="0" y="0" width="30" height="4" fill="#4a4a52" />
          <rect x="4" y="8" width="22" height="18" fill="#1e1e24" />
          <rect x="6" y="10" width="18" height="2" fill="#3a5a3a" />
          <rect x="6" y="14" width="14" height="2" fill="#3a5a3a" />
          <circle cx="15" cy="36" r="2.5" className="fdw-blink" />
          <rect x="6" y="48" width="18" height="3" fill="#6a6a72" />
          <rect x="6" y="54" width="18" height="3" fill="#6a6a72" />
          <rect x="6" y="60" width="18" height="3" fill="#6a6a72" />
        </g>

        {/* === Matching machine on the right with steam vent === */}
        <g transform="translate(470, 96)">
          <rect x="0" y="0" width="30" height="114" fill="#2a2a32" />
          <rect x="0" y="0" width="30" height="4" fill="#4a4a52" />
          <rect x="4" y="10" width="22" height="16" fill="#1e1e24" />
          <rect x="6" y="12" width="14" height="2" fill="#d8b020" />
          {/* Steam vent */}
          <rect x="12" y="-2" width="6" height="6" fill="#6a6a72" />
          <g className="fdw-steam" style={{ animationDelay: '0.4s' }}>
            <ellipse cx="15" cy="-4" rx="3" ry="2" fill="#e8e8ea" opacity="0.7" />
          </g>
          <g className="fdw-steam" style={{ animationDelay: '1.3s' }}>
            <ellipse cx="16" cy="-4" rx="2.5" ry="1.8" fill="#e8e8ea" opacity="0.7" />
          </g>
          <g className="fdw-steam" style={{ animationDelay: '2.2s' }}>
            <ellipse cx="14" cy="-4" rx="2.8" ry="2" fill="#e8e8ea" opacity="0.7" />
          </g>
        </g>

        {/* === Concrete floor === */}
        <rect x="0" y="210" width="500" height="70" fill="#5a5a62" />
        <rect x="0" y="210" width="500" height="2" fill="#2e2e34" />
        {/* Painted yellow safety line */}
        <rect x="0" y="232" width="500" height="2" fill="#d8b020" opacity="0.75" />
        <rect x="0" y="234" width="500" height="1" fill="#3a3a22" opacity="0.4" />
        {/* Scattered concrete speckle */}
        {Array.from({ length: 28 }).map((_, i) => {
          const x = (i * 73 + 17) % 500;
          const y = 214 + ((i * 31 + 5) % 58);
          return <rect key={`spec-${i}`} x={x} y={y} width="1" height="1" fill="#4a4a50" opacity="0.5" />;
        })}

        {/* === Conveyor belt — the main production line === */}
        <g transform="translate(0, 168)">
          {/* Belt frame */}
          <rect x="30" y="0" width="440" height="6" fill="#6a6a6a" />
          <rect x="30" y="0" width="440" height="1" fill="#8a8a8a" />
          {/* Belt surface */}
          <rect x="30" y="6" width="440" height="16" fill="#7a7a7a" />
          {/* Moving belt segments */}
          <g className="fdw-belt-seg">
            {Array.from({ length: 30 }).map((_, i) => (
              <rect key={i} x={30 + i * 20} y="7" width="10" height="14"
                fill={i % 2 === 0 ? '#5a5a5a' : '#8a8a8a'} />
            ))}
          </g>
          {/* Belt underside / shadow */}
          <rect x="30" y="22" width="440" height="3" fill="#3a3a3a" />
          {/* Support legs */}
          {[60, 160, 260, 360, 440].map((lx) => (
            <g key={lx}>
              <rect x={lx} y="25" width="6" height="42" fill="#4a4a4a" />
              <rect x={lx} y="25" width="6" height="2" fill="#6a6a6a" />
            </g>
          ))}
          {/* Items moving along the belt (leftward) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={`item-${i}`} className="fdw-item" style={{ animationDelay: `${i * 1.6}s` }}>
              <rect x={460 + i * 6} y="-4" width="18" height="12" fill="#5a7aa0" />
              <rect x={462 + i * 6} y="-2" width="14" height="4" fill="#7ea0c8" />
              <rect x={462 + i * 6} y="3"  width="14" height="2" fill="#3a506a" />
            </g>
          ))}
        </g>

        {/* === Workers along the belt ===
            Everyone stands BEHIND the belt so the belt's front edge
            (y ≈ 190) visually crosses their hips. Feet land on y ≈ 210
            (the floor line). Sprite is 26px tall at scale 1, so
            translate-y = 210 - 26 = 184 for scale 1. */}

        {/* Worker at the far left — weary veteran refugee */}
        <g transform="translate(70, 184)">
          <PixelPerson x={0} y={0} scale={1} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="weary" sway="idle" swayDelay={0.3} />
          {/* Yellow hard hat overlay */}
          <rect x={2}  y={-1} width={14} height={3} fill="#d8b020" />
          <rect x={3}  y={-3} width={12} height={3} fill="#d8b020" />
          <rect x={2}  y={-1} width={14} height={1} fill="#f0cc30" />
          <rect x={3}  y={-3} width={12} height={1} fill="#f0cc30" />
        </g>

        {/* You — the protagonist, freshly hired, determined but tense */}
        <g transform="translate(180, 184)">
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="determined" sway="fast" swayDelay={0.1} />
          {/* Your hard hat */}
          <rect x={1.5} y={-1.5} width={15} height={3} fill="#d8b020" />
          <rect x={3}   y={-4}   width={12} height={3} fill="#d8b020" />
          <rect x={1.5} y={-1.5} width={15} height={1} fill="#f0cc30" />
          <rect x={3}   y={-4}   width={12} height={1} fill="#f0cc30" />
          {/* "NEW" badge pinned to your shirt */}
          <rect x={9} y={15} width={6} height={3.5} fill="#f4f4f4" />
          <rect x={9} y={15} width={6} height={0.8} fill="#b84040" />
          <text x={12} y={18} textAnchor="middle" fill="#b84040" fontSize="3"
            fontFamily="ui-monospace, Menlo, monospace" fontWeight="700">NEW</text>
        </g>

        {/* Another refugee worker further down the belt */}
        <g transform="translate(290, 184)">
          <PixelPerson x={0} y={0} scale={1} variant="civilian" {...FELLOW_PASSENGERS[3]}
            mood="weary" sway="idle" swayDelay={0.6} />
          <rect x={2}  y={-1} width={14} height={3} fill="#d8b020" />
          <rect x={3}  y={-3} width={12} height={3} fill="#d8b020" />
          <rect x={2}  y={-1} width={14} height={1} fill="#f0cc30" />
          <rect x={3}  y={-3} width={12} height={1} fill="#f0cc30" />
        </g>

        {/* Last worker on the right */}
        <g transform="translate(390, 184)">
          <PixelPerson x={0} y={0} scale={1} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="weary" sway="idle" swayDelay={0.9} />
          <rect x={2}  y={-1} width={14} height={3} fill="#d8b020" />
          <rect x={3}  y={-3} width={12} height={3} fill="#d8b020" />
          <rect x={2}  y={-1} width={14} height={1} fill="#f0cc30" />
          <rect x={3}  y={-3} width={12} height={1} fill="#f0cc30" />
        </g>

        {/* === American foreman — walking the line with a clipboard === */}
        <g transform="translate(228, 182)">
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian" {...FOREMAN}
            mood="neutral" sway="idle" swayDelay={0.2} mirror />
          {/* Clipboard in his right hand (his left, because of mirror) */}
          <rect x={-3}  y={12} width={6}  height={8}  fill="#8a6a3a" />
          <rect x={-2.5} y={12.5} width={5}  height={6} fill="#f4ecd8" />
          <rect x={-2}   y={13.5} width={4}  height={0.6} fill="#6a4a28" />
          <rect x={-2}   y={15}   width={3}  height={0.6} fill="#6a4a28" />
          <rect x={-2}   y={16.5} width={3.5} height={0.6} fill="#6a4a28" />
        </g>
      </svg>
    </div>
  );
}
