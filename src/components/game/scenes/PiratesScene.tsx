import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, CAPTAIN, PIRATE, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Pirates! — a larger, darker boat approaches with armed men demanding
 * valuables. Blood-red dusk sky, their engine smoking, a searchlight
 * pinning your boat, muzzle flashes, your family cowering.
 *
 * Characters use canonical palettes so the family reads as the same
 * cast from every other scene.
 */
export function PiratesScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0606] via-[#2a1a1a] to-[#080a18]">
      <style>{`
        @keyframes pir-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes pir-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: pir-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: pir-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* Both boats rock gently. We use a translate-rotate-translate
           pattern so the rotation pivot is baked into the keyframe math
           itself — no dependence on transform-origin or transform-box,
           which makes this robust across browsers and resilient to
           bounding-box surprises (e.g. a big searchlight cone inflating
           the fill-box). The pivot point is the boat's own waterline. */
        @keyframes pir-boat-rock {
          0%, 100% { transform: translateY(36px) rotate(-1deg) translateY(-36px); }
          50%      { transform: translateY(36px) rotate(1.2deg) translateY(-38px); }
        }
        @keyframes pir-boat-rock-small {
          0%, 100% { transform: translateY(26px) rotate(-1deg) translateY(-26px); }
          50%      { transform: translateY(26px) rotate(1.3deg) translateY(-28px); }
        }
        @keyframes pir-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        @keyframes pir-flicker {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 0.4; }
        }
        @keyframes pir-muzzle-flash {
          0%, 88%, 100% { opacity: 0; transform: scale(0.5); }
          90%           { opacity: 1; transform: scale(1.3); }
          93%           { opacity: 0; transform: scale(0.6); }
        }
        @keyframes pir-smoke-rise {
          0%   { transform: translate(0, 0) scale(0.6); opacity: 0.5; }
          100% { transform: translate(-12px, -42px) scale(1.4); opacity: 0; }
        }
        @keyframes pir-blood-pulse {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.22; }
        }

        /* Slow horizontal glide — the pirate ship is menacingly closing
           the distance on the refugee boat. One-way drift to the left.
           Long duration so the reset back to the right edge is rarely
           seen within a single cinematic viewing. */
        @keyframes pir-glide-x {
          0%   { transform: translateX(20px); }
          100% { transform: translateX(-120px); }
        }
        /* Gentle sine-wave vertical bob, faster than the horizontal
           glide, so the ship rides the swell while it closes in. */
        @keyframes pir-bob-y {
          0%, 100% { transform: translateY(-2.5px); }
          50%      { transform: translateY(2.5px); }
        }

        .pir-boat-rock       { animation: pir-boat-rock 2.8s ease-in-out infinite; }
        .pir-boat-rock-small { animation: pir-boat-rock-small 2.4s ease-in-out infinite; }
        .pir-wave         { animation: pir-wave 3s linear infinite; }
        .pir-flicker      { animation: pir-flicker 1.5s ease-in-out infinite; }
        .pir-muzzle-flash { animation: pir-muzzle-flash 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .pir-smoke-rise   { animation: pir-smoke-rise 2.8s ease-out infinite; }
        .pir-blood-pulse  { animation: pir-blood-pulse 4s ease-in-out infinite; }
        .pir-glide-x      { animation: pir-glide-x 40s linear infinite; }
        .pir-bob-y        { animation: pir-bob-y 3.6s ease-in-out infinite; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Blood-red dusk sky (banded) */}
        <rect x="0" y="0" width="500" height="60" fill="#1a0606" />
        <rect x="0" y="60" width="500" height="30" fill="#2a0a08" />
        <rect x="0" y="90" width="500" height="20" fill="#3a120a" opacity="0.8" />
        {/* Smoldering sun */}
        <circle cx="250" cy="110" r="28" fill="#8a2a0a" opacity="0.55" />
        <circle cx="250" cy="110" r="18" fill="#c84a1a" opacity="0.5" />
        <rect x="0" y="108" width="500" height="3" fill="#4a1a0a" opacity="0.6" />
        {/* Pulsing red glow band */}
        <rect x="0" y="90" width="500" height="24" fill="#8a1a0a" className="pir-blood-pulse" />

        {/* Scattered ember embers / distant smoke smudges */}
        {[60, 180, 320, 440].map((cx, ci) => (
          <ellipse key={`sm-${ci}`} cx={cx} cy={70 + (ci % 2) * 8} rx={26} ry={6}
            fill="#1a0a08" opacity="0.55" />
        ))}

        {/* Ocean */}
        <rect x="0" y="114" width="500" height="166" fill="#0a1020" />
        {[124, 140, 158, 176, 194, 212, 230, 248, 266].map((y, i) => (
          <g key={`wr-${y}`} className="pir-wave"
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${2.8 + i * 0.2}s` }}>
            <line x1={-60} y1={y} x2={560} y2={y}
              stroke="#1a2030" strokeWidth="1" opacity={0.3 + (i % 3) * 0.05} />
          </g>
        ))}
        {/* Blood-red sheen on water closest to sun */}
        <rect x="140" y="114" width="220" height="30" fill="#6a1a0a" opacity="0.18" />

        {/* === Pirate gunboat ===
            Anchored at SVG (330, 118) — center-right of the ocean.
            The outer `.pir-glide-x` group drifts the whole ship slowly
            to the left (it is closing in on the refugee boat), and the
            intermediate `.pir-bob-y` group gives a gentle sine-wave
            vertical bob on top of the faster rocking animation inside.
            Stacking the transforms this way means the glide, bob, and
            rock all compose naturally. */}
        <g className="pir-glide-x">
        <g className="pir-bob-y">
        <g transform="translate(330, 118)">
          {/* Wake behind — sits OUTSIDE the rocking group so it stays
              painted on the water, not yanked along with the hull.
              Positioned off the right (stern) since the ship is moving
              to the left. */}
          <rect x="50"  y="38" width="40" height="2"   fill="#4a6a8a" opacity="0.5" />
          <rect x="74"  y="40" width="32" height="1.5" fill="#4a6a8a" opacity="0.35" />

          <g className="pir-boat-rock">
            {/* Hull shadow on water */}
            <ellipse cx="0" cy="42" rx="72" ry="3.5" fill="#020408" opacity="0.55" />
            {/* Dark hull */}
            <polygon points="-58,18 -46,40 58,40 70,18" fill="#24100c" />
            <polygon points="-58,18 -46,40 58,40 70,18" fill="none" stroke="#0a0404" strokeWidth="1" />
            <line x1="-50" y1="28" x2="62" y2="28" stroke="#0a0404" strokeWidth="1" />
            {/* Rust / hull detail so the boat reads against dark water */}
            <rect x="-42" y="22" width="12" height="2" fill="#4a2414" opacity="0.7" />
            <rect x="20"  y="24" width="18" height="1.5" fill="#4a2414" opacity="0.6" />
            {/* Waterline foam from aggressive speed */}
            <rect x="-52" y="40" width="110" height="1.5" fill="#5a7a9a" opacity="0.7" />
            {/* Deck */}
            <rect x="-48" y="10" width="106" height="9" fill="#3a1e10" />
            <rect x="-48" y="10" width="106" height="1" fill="#5a3018" />
            {/* Pilothouse */}
            <rect x="-40" y="-10" width="32" height="20" fill="#24100c" />
            <rect x="-40" y="-10" width="32" height="2" fill="#3a1e18" />
            {/* Lit interior (windows glowing) */}
            <rect x="-36" y="-7" width="8" height="7" fill="#e07030" opacity="0.85" className="pir-flicker" />
            <rect x="-22" y="-7" width="8" height="7" fill="#e07030" opacity="0.65" className="pir-flicker" />
            {/* Stack with rising engine smoke */}
            <rect x="-14" y="-18" width="5" height="10" fill="#0a0404" />
            <g className="pir-smoke-rise">
              <ellipse cx={-11} cy={-22} rx={5} ry={4} fill="#2a2028" opacity="0.6" />
            </g>
            <g className="pir-smoke-rise" style={{ animationDelay: '0.9s' }}>
              <ellipse cx={-13} cy={-20} rx={4} ry={3.5} fill="#3a3038" opacity="0.55" />
            </g>
            <g className="pir-smoke-rise" style={{ animationDelay: '1.8s' }}>
              <ellipse cx={-9} cy={-24} rx={4.5} ry={4} fill="#1a1418" opacity="0.55" />
            </g>

            {/* Bow searchlight — mounted on the LEFT end of the ship
                (its bow, facing the refugee boat downrange). Cones now
                point horizontally leftward toward the refugee boat at
                SVG (160, 138) ≈ local (-170, 20). No sweep animation —
                the beam holds steady on its target. */}
            <g>
              {/* Wide outer cone — dim haze */}
              <polygon points="-54,10 -210,-30 -210,50" fill="#ffcc44" opacity="0.1" />
              {/* Narrower inner cone — brighter core */}
              <polygon points="-53,11 -170,-8 -170,30" fill="#ffe488" opacity="0.09" />
              {/* Hot center of the beam */}
              <polygon points="-52,12 -160,4 -160,20" fill="#fff2b0" opacity="0.08" />
            </g>
            {/* Lamp fixture — bolted to the LEFT bow. Stays fixed. */}
            <rect x="-59" y="7" width="10" height="7" fill="#3a2410" />
            <rect x="-58" y="8" width="7"  height="5" fill="#ffe488" className="pir-flicker" />
            <rect x="-57" y="9" width="5"  height="3" fill="#ffffff" opacity="0.75" />
            {/* Lamp housing bracket arm back into the deck */}
            <rect x="-52" y="12" width="4" height="3" fill="#2a1810" />

            {/* Mounted weapon on the stern (right) side — gun crew
                stands behind the searchlight, firing past it. */}
            <rect x="42" y="4" width="14" height="3"   fill="#2a2a2a" />
            <rect x="52" y="4" width="12" height="1.5" fill="#1a1a1a" />
            {/* Muzzle flash. Flash polygons span local x=[62, 82],
                y=[1, 9]. With transform-box: fill-box, origin in
                fill-box-relative coords puts the scaling pivot at the
                gun-barrel tip (local (62, 5)) → (0, 4). */}
            <g className="pir-muzzle-flash" style={{ transformOrigin: '0px 4px' }}>
              <polygon points="62,5 78,1 82,5 78,9" fill="#ffdd66" />
              <polygon points="64,5 74,3 74,7" fill="#fff2b0" />
            </g>

            {/* === Jolly Roger flag on the mast ===
                Black flag field with a bone-white skull and crossbones
                centered on it. The skull is hand-placed pixel art to
                read cleanly at this scale. */}
            <rect x="14"   y="-28" width="1.8" height="20" fill="#0a0408" />
            <rect x="15.8" y="-28" width="12"  height="8"  fill="#0a0408" />
            {/* Flag shadow fold for depth */}
            <rect x="15.8" y="-21" width="12"  height="1"  fill="#040204" opacity="0.7" />
            {/* Crossbones behind the skull — two crossed rects pivoted
                around the flag center (21.8, -23.5). */}
            <g>
              <rect x="17.6" y="-23.9" width="8.4" height="0.7"
                fill="#e8e0c8" transform="rotate(22 21.8 -23.55)" />
              <rect x="17.2" y="-23.6" width="0.9" height="0.9"
                fill="#e8e0c8" transform="rotate(22 21.8 -23.55)" />
              <rect x="25.7" y="-23.6" width="0.9" height="0.9"
                fill="#e8e0c8" transform="rotate(22 21.8 -23.55)" />
              <rect x="17.6" y="-23.9" width="8.4" height="0.7"
                fill="#e8e0c8" transform="rotate(-22 21.8 -23.55)" />
              <rect x="17.2" y="-23.6" width="0.9" height="0.9"
                fill="#e8e0c8" transform="rotate(-22 21.8 -23.55)" />
              <rect x="25.7" y="-23.6" width="0.9" height="0.9"
                fill="#e8e0c8" transform="rotate(-22 21.8 -23.55)" />
            </g>
            {/* Skull cranium — top rounded crown */}
            <rect x="19.4" y="-26.8" width="4.8" height="0.7" fill="#ede4c8" />
            <rect x="18.8" y="-26.1" width="6"   height="2"   fill="#ede4c8" />
            {/* Cranium shading for a touch of depth */}
            <rect x="18.8" y="-26.1" width="6"   height="0.3" fill="#ffffff" opacity="0.25" />
            {/* Eye sockets — black holes cut into the cranium */}
            <rect x="19.5" y="-25.6" width="1.4" height="1.4" fill="#0a0408" />
            <rect x="22.1" y="-25.6" width="1.4" height="1.4" fill="#0a0408" />
            {/* Cheek / zygomatic bones */}
            <rect x="19.2" y="-24.1" width="5.2" height="0.7" fill="#ede4c8" />
            {/* Nose hole */}
            <rect x="21.3" y="-24.1" width="1"   height="0.7" fill="#0a0408" />
            {/* Jaw with teeth row */}
            <rect x="19.8" y="-23.4" width="4"   height="1.1" fill="#ede4c8" />
            {/* Teeth separators — narrow black slits */}
            <rect x="20.55" y="-23.4" width="0.2" height="1.1" fill="#0a0408" />
            <rect x="21.25" y="-23.4" width="0.2" height="1.1" fill="#0a0408" />
            <rect x="21.95" y="-23.4" width="0.2" height="1.1" fill="#0a0408" />
            <rect x="22.65" y="-23.4" width="0.2" height="1.1" fill="#0a0408" />

            {/* === Armed pirates lining the deck ===
                Bodies use the `civilian` sprite variant (no military
                helmet) with the PIRATE palette — weathered skin, black
                shirt, black trousers. On top we layer hand-drawn pirate
                accessories: red or black bandanas, tricorn hat, gold
                hoop earring, eye patch, facial scar, beard, leather
                vest or striped sailor shirt, red waist sash, and a
                real cutlass or flintlock musket instead of a modern
                rifle. Each pirate gets a different combination so the
                crew looks varied. */}
            {[
              { x: -32, mood: 'angry'      as const, style: 'red-bandana-beard'     },
              { x: -18, mood: 'determined' as const, style: 'black-bandana-earring' },
              { x: -2,  mood: 'angry'      as const, style: 'tricorn'               },
              { x: 14,  mood: 'determined' as const, style: 'red-bandana-patch'     },
              { x: 30,  mood: 'angry'      as const, style: 'black-bandana-scar'    },
            ].map((p, i) => {
              // Each sprite "pixel" is 2 * scale = 2 * 0.85 = 1.7 SVG units.
              const s = 1.7;
              const isRed = p.style.includes('red');
              const bandana   = isRed ? '#a01818' : '#0e0e0e';
              const bandanaHi = isRed ? '#c82828' : '#202020';
              const bandanaLo = isRed ? '#701212' : '#050505';
              return (
                <g key={`pirate-${i}`}>
                  <PixelPerson
                    x={p.x} y={0} scale={0.85} variant="civilian"
                    {...PIRATE}
                    mood={p.mood} sway="idle" swayDelay={i * 0.2}
                  />
                  {/* Pirate accessories — local origin = sprite top-left. */}
                  <g transform={`translate(${p.x}, 0)`}>
                    {/* ---- Headwear ---- */}
                    {p.style === 'tricorn' ? (
                      <>
                        <polygon
                          points={`${-s*0.8},${s*1.2} ${s*0.5},${-s*0.2} ${s*8.5},${-s*0.2} ${s*9.8},${s*1.2}`}
                          fill="#1a0f08"
                        />
                        <rect x={-s*0.6} y={s*0.9} width={s*10.2} height={s*1.2} fill="#1a0f08" />
                        <rect x={-s*0.6} y={s*0.9} width={s*10.2} height={s*0.3} fill="#2a1a10" />
                        {/* Gold cockade */}
                        <rect x={s*4.1} y={s*0.1} width={s*0.9} height={s*0.9} fill="#d4a820" />
                        <rect x={s*4.25} y={s*0.25} width={s*0.6} height={s*0.6} fill="#f0d048" />
                      </>
                    ) : (
                      <>
                        {/* Bandana main band */}
                        <rect x={0}     y={s*0.3} width={s*9}   height={s*1.9} fill={bandana} />
                        <rect x={0}     y={s*0.5} width={s*9}   height={s*0.3} fill={bandanaHi} opacity={0.85} />
                        {/* Knot tails on the right side */}
                        <rect x={s*7.8} y={s*0.9} width={s*1.5} height={s*0.6} fill={bandana} />
                        <rect x={s*8.6} y={s*1.3} width={s*0.7} height={s*0.4} fill={bandanaLo} />
                        {/* Classic pirate polka-dot pattern on the red bandanas */}
                        {isRed && (
                          <>
                            <rect x={s*1.6} y={s*1.0} width={s*0.35} height={s*0.35} fill="#ffffff" opacity={0.75} />
                            <rect x={s*4}   y={s*0.7} width={s*0.35} height={s*0.35} fill="#ffffff" opacity={0.75} />
                            <rect x={s*6.3} y={s*1.1} width={s*0.35} height={s*0.35} fill="#ffffff" opacity={0.75} />
                          </>
                        )}
                      </>
                    )}

                    {/* ---- Face details ---- */}
                    {p.style.includes('patch') && (
                      <>
                        {/* Eye patch over the right eye */}
                        <rect x={s*5.7} y={s*2.2} width={s*1.5} height={s*1.3} fill="#0a0a0a" />
                        {/* Strap around the head */}
                        <rect x={s*0.5} y={s*2.6} width={s*6}   height={s*0.3} fill="#0a0a0a" />
                      </>
                    )}
                    {p.style.includes('scar') && (
                      <>
                        <rect x={s*2.1} y={s*2.7} width={s*0.4} height={s*2.0} fill="#7a1818" />
                        <rect x={s*2.0} y={s*3.5} width={s*0.5} height={s*0.3} fill="#a02020" />
                      </>
                    )}
                    {p.style.includes('beard') && (
                      <>
                        <rect x={s*2}   y={s*5.6} width={s*5}   height={s*1.8} fill="#1a1008" />
                        <rect x={s*1.7} y={s*6.2} width={s*5.6} height={s*1.0} fill="#0a0604" />
                        {/* Mustache over the upper lip */}
                        <rect x={s*2.5} y={s*5.1} width={s*4}   height={s*0.4} fill="#1a1008" />
                      </>
                    )}
                    {p.style.includes('earring') && (
                      <>
                        <rect x={s*7.4} y={s*3.6} width={s*0.4} height={s*0.4} fill="#d4a820" />
                        <rect x={s*7.3} y={s*4.0} width={s*0.6} height={s*0.6} fill="#f0c840" />
                        <rect x={s*7.4} y={s*4.6} width={s*0.4} height={s*0.2} fill="#a88014" />
                      </>
                    )}

                    {/* ---- Torso: striped sailor shirt OR open leather vest ---- */}
                    {(i === 1 || i === 3) ? (
                      <>
                        {/* Horizontal cream stripes over the black shirt */}
                        <rect x={s*2} y={s*8.0}  width={s*5} height={s*0.35} fill="#d8c8a8" opacity={0.9} />
                        <rect x={s*2} y={s*8.8}  width={s*5} height={s*0.35} fill="#d8c8a8" opacity={0.9} />
                        <rect x={s*2} y={s*9.6}  width={s*5} height={s*0.35} fill="#d8c8a8" opacity={0.9} />
                      </>
                    ) : (
                      <>
                        {/* Open leather vest — two dark panels flanking the body */}
                        <rect x={s*1.0} y={s*7.5} width={s*1.2} height={s*3.3} fill="#4a2a18" />
                        <rect x={s*6.8} y={s*7.5} width={s*1.2} height={s*3.3} fill="#4a2a18" />
                        <rect x={s*1.0} y={s*7.5} width={s*1.2} height={s*0.3} fill="#6a3a24" />
                        <rect x={s*6.8} y={s*7.5} width={s*1.2} height={s*0.3} fill="#6a3a24" />
                        {/* Brass buttons */}
                        <rect x={s*1.4} y={s*8.3} width={s*0.45} height={s*0.45} fill="#d4a820" />
                        <rect x={s*1.4} y={s*9.6} width={s*0.45} height={s*0.45} fill="#d4a820" />
                      </>
                    )}

                    {/* Red waist sash tied on the side */}
                    <rect x={s*1}   y={s*9.9}  width={s*7}   height={s*0.9}  fill="#8a1418" />
                    <rect x={s*1}   y={s*10.0} width={s*7}   height={s*0.25} fill="#a82020" opacity={0.85} />
                    {/* Sash tails hanging off the right hip */}
                    <rect x={s*7.2} y={s*10.3} width={s*0.7} height={s*1.3}  fill="#8a1418" />
                    <rect x={s*7.2} y={s*11.3} width={s*0.7} height={s*0.25} fill="#6a1014" />
                  </g>

                  {/* ---- Weapon ---- */}
                  {i % 2 === 0 ? (
                    /* Cutlass held across chest: grip + brass hilt + curved blade */
                    <>
                      <rect x={p.x + s*3.3} y={s*7.3} width={s*0.9} height={s*1.0} fill="#4a2810" />
                      <rect x={p.x + s*4.0} y={s*7.2} width={s*0.5} height={s*1.2} fill="#d4a820" />
                      <rect x={p.x + s*4.5} y={s*7.5} width={s*5}   height={s*0.45} fill="#c8ccd0" />
                      <rect x={p.x + s*4.5} y={s*7.95} width={s*5}  height={s*0.2} fill="#9aa0a6" />
                      {/* Slight curve at the tip */}
                      <rect x={p.x + s*9.3} y={s*7.35} width={s*0.5} height={s*0.25} fill="#c8ccd0" />
                    </>
                  ) : (
                    /* Flintlock musket: stock + barrel + brass band + hammer */
                    <>
                      <rect x={p.x + s*4.0} y={s*7.6} width={s*1.6} height={s*1.2} fill="#4a2810" />
                      <rect x={p.x + s*4.5} y={s*7.8} width={s*6.5} height={s*0.4} fill="#4a3018" />
                      <rect x={p.x + s*4.5} y={s*8.2} width={s*6.5} height={s*0.25} fill="#2a1810" />
                      <rect x={p.x + s*8.0} y={s*7.75} width={s*0.35} height={s*0.55} fill="#d4a820" />
                      <rect x={p.x + s*5.8} y={s*7.5} width={s*0.3}   height={s*0.45} fill="#2a1a10" />
                    </>
                  )}
                </g>
              );
            })}
          </g>
        </g>
        </g>
        </g>

        {/* === Your boat ===
            Anchored at SVG (160, 138) — foreground left, raised further
            so the entire hull, cabin, and family clear the dialogue box
            at the bottom of the screen. Still clearly smaller than and
            downrange of the pirate gunboat. */}
        <g transform="translate(160, 138)">
          <g className="pir-boat-rock-small" style={{ animationDelay: '0.4s' }}>
            <ellipse cx="0" cy="28" rx="48" ry="3" fill="#040810" opacity="0.6" />
            <polygon points="-38,12 -30,26 38,26 46,12" fill="#4a2a18" />
            <polygon points="-38,12 -30,26 38,26 46,12" fill="none" stroke="#1a0a04" strokeWidth="1" />
            <line x1="-32" y1="20" x2="40" y2="20" stroke="#1a0a04" strokeWidth="0.8" />
            {/* Deck */}
            <rect x="-30" y="8" width="70" height="5" fill="#6a4a28" />
            {/* Cabin */}
            <rect x="-24" y="-6" width="22" height="14" fill="#4a2a18" />
            <rect x="-20" y="-4" width="6" height="6" fill="#0a0a10" />
            <rect x="-10" y="-4" width="6" height="6" fill="#0a0a10" />
            {/* Mast */}
            <rect x="14" y="-22" width="2" height="28" fill="#3a2a18" />
            {/* Small white cloth raised (plea / "we surrender") */}
            <rect x="16" y="-22" width="8" height="4" fill="#e8e0d0" opacity="0.9" />

            {/* Family cowering — canonical palettes */}
            <PixelPerson x={-20} y={-8}  scale={0.9}  variant="civilian" {...MOTHER}
              mood="scared" sway="scared" swayDelay={0.1} />
            <PixelPerson x={-10} y={-4}  scale={0.75} variant="civilian" {...CHILD}
              mood="sad"    sway="scared" swayDelay={0.4} />
            <PixelPerson x={0}   y={-8}  scale={0.9}  variant="civilian" {...GRANDFATHER}
              mood="scared" sway="idle"   swayDelay={0.3} />
            {/* Protagonist stepping forward — angry but outmatched */}
            <PixelPerson x={14}  y={-10} scale={1}    variant="civilian" {...PROTAGONIST}
              mood="angry"  sway="idle"   swayDelay={0.2} />
            {/* Captain at stern, hands raised */}
            <PixelPerson x={28}  y={-8}  scale={0.9}  variant="civilian" {...CAPTAIN}
              mood="scared" sway="idle"   swayDelay={0.55} />
            <PixelPerson x={-30} y={-4}  scale={0.75} variant="civilian" {...FELLOW_PASSENGERS[1]}
              mood="scared" sway="scared" swayDelay={0.7} mirror />
          </g>
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="26" fill="#000" opacity="0.4" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}
