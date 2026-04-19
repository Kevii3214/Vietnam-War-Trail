import { PixelPerson } from './PixelPeople';
import type { CharacterPalette } from './characterPalettes';
import { PROTAGONIST, FELLOW_PASSENGERS } from './characterPalettes';

/**
 * The familiar face — reuses FELLOW_PASSENGERS[0], the same fair-skin
 * / navy-shirt palette that first appeared on the raft and in the
 * refugee camp. The player should instantly recognize them as a
 * boat-mate from the crossing.
 */
const FAMILIAR_FACE: CharacterPalette = FELLOW_PASSENGERS[0];

/**
 * Background American shoppers — distinct palettes so they don't
 * blend into the refugee cast. Used half-opacity in the background.
 */
const BG_SHOPPERS: CharacterPalette[] = [
  { color: '#f4d6b0', shirtColor: '#3a7a6a', pantsColor: '#2a2a3a', hairColor: '#6a4a28', accentColor: '#d8a848' },
  { color: '#f8dcc0', shirtColor: '#b84040', pantsColor: '#2a2838', hairColor: '#8a6a3a', accentColor: '#f0e8d0' },
  { color: '#e8c090', shirtColor: '#6a4a8a', pantsColor: '#2a2030', hairColor: '#1a0a08', accentColor: '#f8e8d8' },
];

/**
 * A Familiar Face — a supermarket aisle on a weekday. The player is
 * pushing a grocery cart when they lock eyes with someone from the
 * crossing. Visual grammar matches Phase 3: PixelPerson chibis on
 * canonical palettes, scene-prefixed keyframes, same 500×280 viewBox.
 */
export function FamiliarFaceScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#f8f2dc] via-[#f0e8d0] to-[#d8ccb0]">
      <style>{`
        @keyframes ff-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes ff-chibi-happy {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-1.5px) rotate(1.5deg); }
        }
        .chibi-sway-idle { animation: ff-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast { animation: ff-chibi-happy 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes ff-light-buzz {
          0%, 94%, 100% { opacity: 0.9; }
          95%           { opacity: 0.55; }
          97%           { opacity: 0.85; }
        }
        .ff-light { animation: ff-light-buzz 6s ease-in-out infinite; }

        @keyframes ff-spark {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
        .ff-spark {
          animation: ff-spark 1.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center center;
        }

        @keyframes ff-exclaim-bounce {
          0%, 100% { transform: translateY(0);   opacity: 1; }
          50%      { transform: translateY(-3px); opacity: 0.75; }
        }
        .ff-exclaim { animation: ff-exclaim-bounce 0.9s ease-out infinite; }

        @keyframes ff-arrive {
          0%   { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .ff-arrive { animation: ff-arrive 1.5s ease-out 0.2s both; transform-box: fill-box; }

        @keyframes ff-wave {
          0%, 100% { transform: rotate(-18deg); }
          50%      { transform: rotate(18deg); }
        }
        .ff-wave {
          animation: ff-wave 0.9s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center bottom;
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Back wall with store sign === */}
        <rect x="0" y="0" width="500" height="30" fill="#e8dcc0" />
        <rect x="0" y="30" width="500" height="50" fill="#ddd0b4" />
        <rect x="0" y="79" width="500" height="1" fill="#b8a888" />

        {/* Painted store banner */}
        <g>
          <rect x="140" y="34" width="220" height="22" fill="#b83030" />
          <rect x="140" y="34" width="220" height="2" fill="#8a2020" />
          <rect x="140" y="54" width="220" height="2" fill="#8a2020" />
          <text x="250" y="50" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="11" fill="#fff4e0" letterSpacing="2">SUPERMARKET</text>
        </g>
        <g>
          <rect x="70" y="40" width="50" height="12" fill="#d8b020" />
          <text x="95" y="49" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="7" fill="#2a1a04">FRESH</text>
        </g>
        <g>
          <rect x="380" y="40" width="60" height="12" fill="#3a7a4a" />
          <text x="410" y="49" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="7" fill="#fff4e0">SALE $1.99</text>
        </g>

        {/* === Fluorescent ceiling strips === */}
        {[80, 200, 320, 440].map((x, i) => (
          <g key={`ceil-${i}`}>
            <rect x={x - 32} y="18" width="64" height="4" fill="#e8e8ea" />
            <rect x={x - 30} y="22" width="60" height="2" fill="#fff8c0" className="ff-light"
              style={{ animationDelay: `${i * 1.1}s` }} />
            <ellipse cx={x} cy="30" rx="30" ry="4" fill="#fff8c0" opacity="0.07" />
          </g>
        ))}

        {/* === Shelving aisles — left side (mirrored on the right) === */}
        {[30, 410].map((baseX, si) => (
          <g key={`shelf-${si}`} transform={`translate(${baseX}, 80)`}>
            {/* Shelf cabinet */}
            <rect x="0" y="0" width="60" height="130" fill="#7a5a2e" />
            <rect x="0" y="0" width="60" height="3" fill="#a07840" />
            <rect x="0" y="128" width="60" height="2" fill="#4a3818" />
            {/* Five shelves */}
            {[0, 1, 2, 3, 4].map((r) => (
              <g key={`row-${r}`}>
                <rect x="2" y={4 + r * 25} width="56" height="22" fill="#8a6a38" />
                <rect x="2" y={4 + r * 25} width="56" height="1" fill="#b8904a" />
                <rect x="2" y={24 + r * 25} width="56" height="1.5" fill="#4a3818" />
                {/* Products — boxes, bottles, cans */}
                {[0, 1, 2, 3, 4, 5, 6].map((c) => {
                  const px = 4 + c * 8;
                  const py = 7 + r * 25;
                  const palette = [
                    ['#c83838', '#f8e0c8'], ['#3a5aa8', '#dce4f8'], ['#3a8848', '#e0f8e0'],
                    ['#d8a028', '#f8ecd0'], ['#a848a0', '#f0e0f0'], ['#3a9890', '#dcf0ee'],
                    ['#d85a30', '#f8e0d0'],
                  ][(c + r + si) % 7];
                  const isBottle = (c + r) % 3 === 0;
                  return (
                    <g key={`p-${c}`}>
                      {isBottle ? (
                        <>
                          <rect x={px} y={py} width="5" height="3" fill={palette[0]} />
                          <rect x={px + 0.5} y={py + 3} width="4" height="14" fill={palette[0]} />
                          <rect x={px + 0.5} y={py + 6} width="4" height="3" fill={palette[1]} />
                        </>
                      ) : (
                        <>
                          <rect x={px} y={py} width="6" height="17" fill={palette[0]} />
                          <rect x={px} y={py + 4} width="6" height="4" fill={palette[1]} />
                          <rect x={px} y={py + 10} width="6" height="1" fill={palette[1]} opacity="0.7" />
                        </>
                      )}
                    </g>
                  );
                })}
                {/* Price tag strip */}
                <rect x="2" y={24 + r * 25} width="56" height="1" fill="#f0f0f0" opacity="0.5" />
              </g>
            ))}
          </g>
        ))}

        {/* === Middle aisle shelf — smaller, like an end-cap display === */}
        <g transform="translate(120, 100)">
          <rect x="0" y="0" width="30" height="78" fill="#6a4a28" />
          <rect x="0" y="0" width="30" height="2" fill="#8a6a38" />
          {[0, 1, 2].map((r) => (
            <g key={`mid-${r}`}>
              <rect x="2" y={4 + r * 24} width="26" height="22" fill="#8a6a38" />
              {[0, 1, 2].map((c) => {
                const col = ['#3a8848', '#d83030', '#d8a028'][(c + r) % 3];
                return <rect key={c} x={4 + c * 8} y={8 + r * 24} width="6" height="16" fill={col} />;
              })}
            </g>
          ))}
        </g>

        {/* === Floor — pale tile === */}
        <rect x="0" y="210" width="500" height="70" fill="#e4dcc4" />
        <rect x="0" y="210" width="500" height="2" fill="#b8a888" />
        {/* Tile grid */}
        {Array.from({ length: 17 }).map((_, i) => (
          <rect key={`tv-${i}`} x={i * 30} y="210" width="1" height="70" fill="#c8b898" opacity="0.6" />
        ))}
        {[232, 254, 276].map((y) => (
          <rect key={`th-${y}`} x="0" y={y} width="500" height="1" fill="#c8b898" opacity="0.6" />
        ))}

        {/* === Background shoppers — half opacity, further back === */}
        <g opacity="0.55">
          <g transform="translate(92, 194)">
            <PixelPerson x={0} y={0} scale={0.85} variant="civilian" {...BG_SHOPPERS[0]}
              mood="neutral" sway="idle" swayDelay={0.4} />
          </g>
          <g transform="translate(416, 196)">
            <PixelPerson x={0} y={0} scale={0.8} variant="civilian" {...BG_SHOPPERS[1]}
              mood="neutral" sway="idle" swayDelay={0.6} mirror />
          </g>
          <g transform="translate(448, 198)">
            <PixelPerson x={0} y={0} scale={0.7} variant="civilian" {...BG_SHOPPERS[2]}
              mood="neutral" sway="idle" swayDelay={0.9} />
          </g>
        </g>

        {/* === Recognition sparkle between them === */}
        <g className="ff-spark">
          <polygon
            points="250,154 253,162 261,162 255,167 257,175 250,171 243,175 245,167 239,162 247,162"
            fill="#ffdc3c" opacity="0.95" />
          <polygon
            points="250,156 252,162 258,162 253,166 255,172 250,169 245,172 247,166 242,162 248,162"
            fill="#fff4a0" opacity="0.8" />
        </g>

        {/* === YOU — pushing a shopping cart (front-center-left) === */}
        <g transform="translate(200, 184)">
          <PixelPerson x={0} y={0} scale={1.1} variant="civilian" {...PROTAGONIST}
            mood="shocked" sway="fast" swayDelay={0.1} />
        </g>
        {/* Shopping cart in front of the protagonist */}
        <g>
          {/* Handle */}
          <rect x="228" y="200" width="2" height="14" fill="#8a8a92" />
          <rect x="226" y="200" width="6" height="2" fill="#8a8a92" />
          {/* Basket */}
          <rect x="230" y="206" width="28" height="15" fill="#b8b8c0" />
          <rect x="230" y="206" width="28" height="2" fill="#d0d0d8" />
          <rect x="230" y="220" width="28" height="2" fill="#6a6a72" />
          {/* Basket grid */}
          {[234, 238, 242, 246, 250, 254].map((gx) => (
            <rect key={`cg-${gx}`} x={gx} y="208" width="1" height="12" fill="#9a9aa2" />
          ))}
          <rect x="231" y="212" width="26" height="1" fill="#9a9aa2" />
          {/* Groceries inside */}
          <rect x="233" y="203" width="7" height="5" fill="#b83030" />
          <rect x="242" y="204" width="6" height="4" fill="#3a8848" />
          <rect x="250" y="203" width="6" height="5" fill="#d8a028" />
          {/* Wheels */}
          <circle cx="234" cy="226" r="3" fill="#2a2a30" />
          <circle cx="254" cy="226" r="3" fill="#2a2a30" />
          <circle cx="234" cy="226" r="1" fill="#6a6a72" />
          <circle cx="254" cy="226" r="1" fill="#6a6a72" />
        </g>

        {/* === THE FAMILIAR FACE — boat-mate, warm greeting === */}
        <g className="ff-arrive">
          <g transform="translate(300, 184)">
            <PixelPerson x={0} y={0} scale={1.1} variant="civilian" {...FAMILIAR_FACE}
              mood="happy" sway="fast" swayDelay={0.15} mirror />
            {/* Waving arm (on the mirrored sprite, this reads as their
                right arm extending toward the player) */}
            <g className="ff-wave" style={{ transformOrigin: '6px 16px' }}>
              <rect x={4} y={14} width={2.4} height={7.5} fill={FAMILIAR_FACE.color} />
              <rect x={3.3} y={9.5} width={3.5} height={3} fill={FAMILIAR_FACE.color} />
            </g>
            {/* A small paper shopping bag they're carrying */}
            <rect x={14} y={16} width={7}   height={8}   fill="#c4a068" />
            <rect x={14} y={16} width={7}   height={1}   fill="#8a6a38" />
            <rect x={15} y={14} width={2.5} height={2}   fill="#8a6a38" />
            <rect x={18} y={14} width={2.5} height={2}   fill="#8a6a38" />
          </g>
        </g>

        {/* === Exclamation marks over BOTH characters === */}
        <g className="ff-exclaim">
          <rect x="214" y="168" width="3" height="9" fill="#d8b020" rx="1" />
          <rect x="214" y="179" width="3" height="3" fill="#d8b020" rx="1" />
        </g>
        <g className="ff-exclaim" style={{ animationDelay: '0.35s' }}>
          <rect x="310" y="168" width="3" height="9" fill="#d8b020" rx="1" />
          <rect x="310" y="179" width="3" height="3" fill="#d8b020" rx="1" />
        </g>
      </svg>
    </div>
  );
}
