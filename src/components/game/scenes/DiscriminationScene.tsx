import { PixelPerson } from './PixelPeople';
import type { CharacterPalette } from './characterPalettes';
import { PROTAGONIST, FELLOW_PASSENGERS } from './characterPalettes';

/**
 * The hostile American — larger, red-faced, aggressive posture.
 * Distinct palette (ruddy skin, red plaid shirt, jeans, sandy hair)
 * so he reads unmistakably as a local antagonist, not a refugee.
 */
const ANGRY_AMERICAN: CharacterPalette = {
  color: '#f0b090',
  shirtColor: '#b83030',
  pantsColor: '#2a3a5a',
  hairColor: '#6a4a28',
  accentColor: '#f8e4a0',
};

/**
 * A couple of neutral passers-by — different palettes, so the
 * bystanders don't read as part of the refugee cast.
 */
const BYSTANDERS: CharacterPalette[] = [
  { color: '#f4d6b0', shirtColor: '#3a5a8a', pantsColor: '#2a2a3a', hairColor: '#8a6a3a', accentColor: '#d0d8e8' },
  { color: '#e8c090', shirtColor: '#6a4a8a', pantsColor: '#2a2030', hairColor: '#1a0a08', accentColor: '#f8e8d8' },
];

/**
 * Discrimination — outside a storefront, the player is cornered by
 * a hostile local shouting slurs. Matches the Phase 3 visual grammar:
 * PixelPerson chibis with canonical palettes, scene-prefixed
 * keyframes, and the shared 500×280 viewBox.
 */
export function DiscriminationScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#e8d8b8] via-[#d8c4a0] to-[#a88860]">
      <style>{`
        @keyframes disc-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes disc-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.9px) rotate(-1.4deg); }
          75%      { transform: translateX(0.9px) rotate(1.4deg); }
        }
        @keyframes disc-chibi-angry {
          0%, 100% { transform: translateX(-1px) rotate(-1.5deg); }
          50%      { transform: translateX(1px) rotate(1.5deg); }
        }
        .chibi-sway-idle   { animation: disc-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: disc-chibi-scared 0.32s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: disc-chibi-angry 0.28s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes disc-anger-flash {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.15); }
        }
        .disc-anger {
          animation: disc-anger-flash 0.55s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center center;
        }

        @keyframes disc-symbol {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        .disc-symbol { animation: disc-symbol 0.9s ease-in-out infinite; }

        @keyframes disc-shout-drift {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-6px) scale(1.4); }
        }
        .disc-shout {
          animation: disc-shout-drift 1.1s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center bottom;
        }

        @keyframes disc-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-32px); }
        }
        .disc-cloud-drift { animation: disc-cloud-drift 30s linear infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Hazy sky over a suburban street === */}
        <rect x="0" y="0" width="500" height="90" fill="#eadcb8" />
        <rect x="0" y="0" width="500" height="38" fill="#f2e4c0" />
        <g className="disc-cloud-drift">
          {[
            { cx: 60, cy: 26, rx: 30, ry: 5 },
            { cx: 200, cy: 20, rx: 36, ry: 6 },
            { cx: 330, cy: 30, rx: 28, ry: 5 },
            { cx: 460, cy: 22, rx: 34, ry: 5 },
            { cx: 560, cy: 28, rx: 30, ry: 5 },
          ].map((c, i) => (
            <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill="#fff4d8" opacity="0.75" />
          ))}
        </g>

        {/* === Storefront facade — brick + awning === */}
        {/* Brick wall */}
        <rect x="0" y="50" width="500" height="100" fill="#a04828" />
        <rect x="0" y="50" width="500" height="2" fill="#702810" />
        {/* Brick courses */}
        {Array.from({ length: 14 }).map((_, r) => {
          const y = 52 + r * 7;
          const offset = r % 2 === 0 ? 0 : 12;
          return (
            <g key={`brick-${r}`}>
              {Array.from({ length: 22 }).map((_, c) => (
                <rect key={`b-${r}-${c}`} x={offset + c * 24} y={y} width="23" height="6"
                  fill="#b85838" />
              ))}
              <rect x="0" y={y + 6} width="500" height="1" fill="#781a08" opacity="0.5" />
            </g>
          );
        })}

        {/* Striped awning over the shop */}
        <g>
          <rect x="150" y="92" width="220" height="4" fill="#6a3818" />
          {Array.from({ length: 11 }).map((_, i) => (
            <rect key={`stripe-${i}`} x={150 + i * 20} y="96"
              width="20" height="14"
              fill={i % 2 === 0 ? '#b83030' : '#f0e4c8'} />
          ))}
          <rect x="150" y="110" width="220" height="2" fill="#4a1a08" />
          {/* Scalloped hem */}
          {Array.from({ length: 22 }).map((_, i) => (
            <polygon key={`hem-${i}`}
              points={`${150 + i * 10},112 ${155 + i * 10},118 ${160 + i * 10},112`}
              fill={i % 2 === 0 ? '#b83030' : '#f0e4c8'} />
          ))}
        </g>

        {/* Shop window with painted sign */}
        <g>
          <rect x="180" y="120" width="160" height="74" fill="#1a1e2a" />
          <rect x="180" y="120" width="160" height="3" fill="#4a3818" />
          <rect x="180" y="191" width="160" height="3" fill="#4a3818" />
          <rect x="180" y="120" width="3" height="74" fill="#4a3818" />
          <rect x="337" y="120" width="3" height="74" fill="#4a3818" />
          {/* Painted "OPEN" sign */}
          <rect x="198" y="130" width="50" height="16" fill="#2a2a32" />
          <rect x="198" y="130" width="50" height="2" fill="#d8a028" />
          <text x="223" y="142" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="8" fill="#fff4c8">OPEN</text>
          {/* Faint window reflections */}
          <polygon points="190,128 220,128 198,175 186,175" fill="#ffffff" opacity="0.06" />
          <polygon points="310,128 330,128 320,165 300,165" fill="#ffffff" opacity="0.05" />
          {/* Hanging sale poster */}
          <rect x="275" y="128" width="52" height="28" fill="#f4ecd0" />
          <rect x="275" y="128" width="52" height="4" fill="#b83030" />
          <text x="301" y="141" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="6" fill="#2a1a04">TODAY</text>
          <text x="301" y="150" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
            fontWeight="700" fontSize="6" fill="#b83030">ONLY</text>
        </g>

        {/* Shop door to the right of the window */}
        <g>
          <rect x="352" y="120" width="36" height="90" fill="#4a2818" />
          <rect x="352" y="120" width="36" height="3" fill="#2a1408" />
          <rect x="356" y="126" width="28" height="30" fill="#1a1e2a" />
          <rect x="356" y="126" width="28" height="2" fill="#2a1408" />
          <rect x="384" y="165" width="2" height="3" fill="#d8a028" />
        </g>

        {/* === Sidewalk === */}
        <rect x="0" y="210" width="500" height="70" fill="#c8b896" />
        <rect x="0" y="210" width="500" height="2" fill="#8a7c58" />
        {/* Sidewalk panel cracks */}
        {[130, 260, 390].map((x) => (
          <rect key={`crack-${x}`} x={x} y="212" width="1.5" height="68" fill="#a89868" opacity="0.8" />
        ))}
        {/* Curb */}
        <rect x="0" y="262" width="500" height="4" fill="#6a5838" />
        <rect x="0" y="266" width="500" height="14" fill="#2a2428" />
        {/* Dropped grocery bag near the protagonist's feet — a spilled apple */}
        <g>
          <rect x="268" y="214" width="12" height="10" fill="#8a6a3a" />
          <rect x="268" y="214" width="12" height="2" fill="#6a4a28" />
          <rect x="269" y="212" width="3" height="3" fill="#6a4a28" />
          <rect x="276" y="212" width="3" height="3" fill="#6a4a28" />
          <circle cx="256" cy="222" r="3" fill="#c83030" />
          <rect x="255.3" y="218.5" width="1.2" height="1.5" fill="#3a6828" />
        </g>

        {/* === Distant bystanders — half-opacity, looking away === */}
        <g opacity="0.5">
          <g transform="translate(60, 190)">
            <PixelPerson x={0} y={0} scale={0.8} variant="civilian" {...BYSTANDERS[0]}
              mood="sad" sway="idle" swayDelay={0.4} mirror />
          </g>
          <g transform="translate(432, 192)">
            <PixelPerson x={0} y={0} scale={0.8} variant="civilian" {...BYSTANDERS[1]}
              mood="sad" sway="idle" swayDelay={0.7} />
          </g>
          <g transform="translate(90, 196)">
            <PixelPerson x={0} y={0} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[2]}
              mood="scared" sway="idle" swayDelay={0.9} />
          </g>
        </g>

        {/* === YOU — cowering, head slightly down === */}
        <g transform="translate(288, 184)">
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="scared" sway="scared" swayDelay={0.1} />
          {/* You're clutching a small paper bag to your chest */}
          <rect x={-2} y={13} width={8}   height={8}   fill="#c4a068" />
          <rect x={-2} y={13} width={8}   height={1}   fill="#8a6a38" />
          <rect x={-1} y={11} width={2.5} height={2}   fill="#8a6a38" />
          <rect x={2.5} y={11} width={2.5} height={2}   fill="#8a6a38" />
        </g>

        {/* === THE AGGRESSOR — bigger, angrier, leaning in === */}
        <g transform="translate(150, 178)">
          <PixelPerson x={0} y={0} scale={1.25} variant="civilian" {...ANGRY_AMERICAN}
            mood="angry" sway="fast" swayDelay={0.05} />
          {/* Red anger flush on the cheeks */}
          <rect x={2.5}  y={10} width={2.5} height={1.5} fill="#c83030" opacity="0.55" />
          <rect x={17.5} y={10} width={2.5} height={1.5} fill="#c83030" opacity="0.55" />
          {/* Pointing arm jabbing toward the protagonist */}
          <rect x={22} y={16} width={11} height={3.2} fill={ANGRY_AMERICAN.color} />
          <rect x={32} y={15.2} width={3.2} height={4.5} fill={ANGRY_AMERICAN.color} />
        </g>

        {/* === Anger burst lines radiating out from the yeller === */}
        <g className="disc-anger">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = -0.55 + i * 0.22;
            const cx = 198, cy = 192;
            const r0 = 18, r1 = 30;
            const x1 = cx + Math.cos(angle) * r0;
            const y1 = cy + Math.sin(angle) * r0;
            const x2 = cx + Math.cos(angle) * r1;
            const y2 = cy + Math.sin(angle) * r1;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#c83030" strokeWidth="2.2" strokeLinecap="round" />
            );
          })}
        </g>

        {/* Anger symbol floating above the yeller's head */}
        <g className="disc-symbol">
          <rect x="172" y="152" width="3" height="3" fill="#c83030" />
          <rect x="178" y="148" width="3" height="3" fill="#c83030" />
          <rect x="184" y="152" width="3" height="3" fill="#c83030" />
          <rect x="178" y="156" width="3" height="3" fill="#c83030" />
        </g>

        {/* Shouted speech blobs near the yeller's mouth */}
        <g className="disc-shout">
          <ellipse cx="210" cy="190" rx="6" ry="3" fill="#fff4d8" opacity="0.9" />
          <rect x="207" y="188.5" width="6" height="1" fill="#2a1a04" />
          <rect x="207" y="191"    width="4" height="1" fill="#2a1a04" />
        </g>
        <g className="disc-shout" style={{ animationDelay: '0.35s' }}>
          <ellipse cx="224" cy="195" rx="5" ry="2.5" fill="#fff4d8" opacity="0.85" />
          <rect x="221" y="194" width="6" height="1" fill="#2a1a04" />
        </g>

        {/* Sweat drop beside your head to sell the fear */}
        <g>
          <ellipse cx="302" cy="188" rx="1.6" ry="2.4" fill="#6ecff0" opacity="0.9" />
          <rect x="301.5" y="185" width="1" height="1.3" fill="#aae0f8" />
        </g>
      </svg>
    </div>
  );
}
