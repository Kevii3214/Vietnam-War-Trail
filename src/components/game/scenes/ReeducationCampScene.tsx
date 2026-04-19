import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, SOLDIER, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Reeducation Registration — the morning after the Fall.
 * A line of former officers, officials, and suspected "puppets" shuffles
 * up a muddy path toward a fortified camp gate: watchtower with a
 * sweeping searchlight, red banners, barbed wire, guards with rifles,
 * smoke rising from barracks. The protagonist is in line. The mother
 * and child watch from outside the fence.
 *
 * Canonical character palettes are imported from characterPalettes.ts
 * so "you" and "mom" / "the kid" read as the same people seen in every
 * other scene.
 */

/** 5-pointed star polygon, used for the red flag. */
function starPath(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(' ');
}

export function ReeducationCampScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#3a3a3e] via-[#4a4838] to-[#3a3020]">
      <style>{`
        @keyframes rc-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes rc-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: rc-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: rc-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* Queue: each prisoner shuffles in place on a staggered interval,
           and the whole queue occasionally takes a step toward the gate. */
        @keyframes rc-queue-shuffle {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        @keyframes rc-queue-advance {
          0%, 45%  { transform: translateX(0); }
          50%      { transform: translateX(3px); }
          55%, 100% { transform: translateX(3px); }
        }
        /* Guard paces back and forth in front of the gate */
        @keyframes rc-guard-pace {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(14px); }
        }
        /* Searchlight cone sweeps */
        @keyframes rc-searchlight {
          0%, 100% { transform: rotate(-30deg); }
          50%      { transform: rotate(30deg); }
        }
        /* Overcast clouds drift left */
        @keyframes rc-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        /* Blowing dust */
        @keyframes rc-dust {
          0%   { transform: translate(0, 0); opacity: 0.7; }
          100% { transform: translate(90px, -10px); opacity: 0; }
        }
        /* Crows circling */
        @keyframes rc-crow-glide {
          0%   { transform: translate(-40px, 0) scale(1, 1); }
          50%  { transform: translate(240px, 20px) scale(1, 1); }
          100% { transform: translate(560px, -6px) scale(1, 1); }
        }
        @keyframes rc-crow-flap {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.3); }
        }
        /* Red banner wind ripple */
        @keyframes rc-banner-wave {
          0%, 100% { transform: rotate(-4deg) skewX(0deg); }
          50%      { transform: rotate(3deg) skewX(6deg); }
        }
        /* Chimney smoke */
        @keyframes rc-smoke-rise {
          0%   { transform: translate(0, 0) scale(0.6); opacity: 0.55; }
          100% { transform: translate(-20px, -42px) scale(1.7); opacity: 0; }
        }
        @keyframes rc-watchtower-sway {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(0.4px); }
        }

        .rc-queue-shuffle  { animation: rc-queue-shuffle 0.9s ease-in-out infinite; transform-box: fill-box; }
        .rc-queue-advance  { animation: rc-queue-advance 6s ease-in-out infinite; transform-box: fill-box; }
        .rc-guard-pace     { animation: rc-guard-pace 4.2s ease-in-out infinite; transform-box: fill-box; }
        .rc-searchlight    { animation: rc-searchlight 6s ease-in-out infinite; transform-box: fill-box; }
        .rc-cloud-drift    { animation: rc-cloud-drift 32s linear infinite; }
        .rc-dust           { animation: rc-dust 5s linear infinite; }
        .rc-crow-glide     { animation: rc-crow-glide 22s linear infinite; transform-box: fill-box; }
        .rc-crow-flap      { animation: rc-crow-flap 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .rc-banner-wave    { animation: rc-banner-wave 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        .rc-smoke-rise     { animation: rc-smoke-rise 4s ease-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .rc-watchtower-sway { animation: rc-watchtower-sway 3s ease-in-out infinite; transform-box: fill-box; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* === Oppressive overcast sky === */}
        <rect x="0" y="0" width="500" height="140" fill="#3a3a3e" />
        <rect x="0" y="70"  width="500" height="50" fill="#4a4838" opacity="0.7" />
        <rect x="0" y="100" width="500" height="30" fill="#5a4838" opacity="0.5" />

        {/* Heavy drifting clouds */}
        <g className="rc-cloud-drift">
          {[
            { cx: 40,  cy: 28, rx: 60, ry: 16 },
            { cx: 150, cy: 22, rx: 80, ry: 20 },
            { cx: 280, cy: 30, rx: 72, ry: 18 },
            { cx: 400, cy: 24, rx: 68, ry: 18 },
            { cx: 520, cy: 28, rx: 56, ry: 16 },
            { cx: 590, cy: 22, rx: 70, ry: 18 },
          ].map((c, i) => (
            <ellipse key={`cloud-${i}`} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
              fill={i % 2 === 0 ? '#4a4a4e' : '#5a5552'} />
          ))}
          {[30, 160, 270, 390, 510].map((cx, i) => (
            <ellipse key={`cbot-${i}`} cx={cx} cy={44 + (i % 2) * 4} rx={64} ry={11}
              fill="#3a3a3e" opacity="0.85" />
          ))}
        </g>

        {/* Circling crows */}
        <g className="rc-crow-glide">
          <g className="rc-crow-flap">
            <polygon points="-5,0 0,-3 5,0 0,2" fill="#0a0a0a" />
          </g>
        </g>
        <g className="rc-crow-glide" style={{ animationDelay: '6s' }}>
          <g className="rc-crow-flap" style={{ animationDelay: '0.2s' }}>
            <polygon points="-4,0 0,-2 4,0 0,1.5" fill="#0a0a0a" />
          </g>
        </g>
        <g className="rc-crow-glide" style={{ animationDelay: '12s' }}>
          <g className="rc-crow-flap" style={{ animationDelay: '0.35s' }}>
            <polygon points="-5,0 0,-3 5,0 0,2" fill="#0a0a0a" />
          </g>
        </g>

        {/* === Distant treeline === */}
        {Array.from({ length: 28 }).map((_, i) => {
          const x = i * 20;
          const h = 22 + (i % 4) * 5;
          const dark = i % 2 === 0;
          return (
            <g key={`tree-${i}`}>
              <rect x={x} y={100 - h + 30} width={18} height={h}
                fill={dark ? '#1a2a14' : '#2a3a1c'} />
              <rect x={x + 2} y={100 - h + 22} width={14} height={10}
                fill={dark ? '#2a3a1c' : '#3a4a2a'} />
              <rect x={x + 5} y={100 - h + 16} width={8} height={8}
                fill="#1a2a14" />
            </g>
          );
        })}

        {/* === Ground: dry dirt / mud === */}
        <rect x="0" y="130" width="500" height="150" fill="#5a4828" />
        <rect x="0" y="130" width="500" height="4"   fill="#7a6540" />
        {/* Dirt path receding toward the gate */}
        <polygon points="0,206 0,240 245,168 245,152" fill="#6a5028" />
        <polygon points="245,152 245,168 500,164 500,150" fill="#6a5028" />
        <line x1="0" y1="206" x2="245" y2="152" stroke="#3a2810" strokeWidth="1" />
        <line x1="0" y1="240" x2="245" y2="168" stroke="#3a2810" strokeWidth="1" />
        {/* Tire tracks / wear marks */}
        <polygon points="60,222 50,232 195,164 200,160" fill="#4a3618" opacity="0.55" />
        <polygon points="110,222 100,232 220,162 225,158" fill="#4a3618" opacity="0.4" />
        {/* Puddles */}
        <ellipse cx={80} cy={232} rx={14} ry={3} fill="#3a4a5a" opacity="0.55" />
        <ellipse cx={180} cy={214} rx={10} ry={2.5} fill="#3a4a5a" opacity="0.45" />

        {/* === Barbed-wire fence, LEFT side === */}
        {[14, 60, 106, 152, 198].map((x, i) => (
          <g key={`fpost-l-${i}`}>
            <rect x={x} y="118" width="4" height="38" fill="#5a5040" />
            <rect x={x - 1} y="115" width="6" height="3" fill="#6a5a4a" />
            <rect x={x} y={154} width={4} height={2} fill="#3a3020" />
          </g>
        ))}
        {[126, 136, 146].map((y, j) => (
          <g key={`wire-l-${y}`}>
            <line x1="14" y1={y} x2="200" y2={y - j * 1.5} stroke="#b0a890" strokeWidth="0.8" />
            {[34, 70, 104, 140, 176].map(bx => (
              <g key={`barb-l-${bx}-${y}`}>
                <line x1={bx} y1={y - 1} x2={bx - 2} y2={y - 4} stroke="#b0a890" strokeWidth="0.7" />
                <line x1={bx} y1={y - 1} x2={bx + 2} y2={y - 4} stroke="#b0a890" strokeWidth="0.7" />
              </g>
            ))}
          </g>
        ))}

        {/* === Barbed-wire fence, RIGHT side === */}
        {[302, 350, 396, 442, 486].map((x, i) => (
          <g key={`fpost-r-${i}`}>
            <rect x={x} y="116" width="4" height="38" fill="#5a5040" />
            <rect x={x - 1} y="113" width="6" height="3" fill="#6a5a4a" />
            <rect x={x} y={152} width={4} height={2} fill="#3a3020" />
          </g>
        ))}
        {[122, 132, 142].map((y, j) => (
          <g key={`wire-r-${y}`}>
            <line x1="302" y1={y - j * 1.5} x2="496" y2={y} stroke="#b0a890" strokeWidth="0.8" />
            {[320, 356, 390, 430, 466].map(bx => (
              <g key={`barb-r-${bx}-${y}`}>
                <line x1={bx} y1={y - 1} x2={bx - 2} y2={y - 4} stroke="#b0a890" strokeWidth="0.7" />
                <line x1={bx} y1={y - 1} x2={bx + 2} y2={y - 4} stroke="#b0a890" strokeWidth="0.7" />
              </g>
            ))}
          </g>
        ))}

        {/* === Barracks in the background === */}
        {/* Barracks 1 */}
        <g transform="translate(306, 104)">
          <rect x="0" y="12" width="60" height="30" fill="#4a4030" />
          <rect x="0" y="12" width="60" height="2"  fill="#5a5040" />
          <polygon points="-4,12 30,-4 64,12" fill="#3a2a18" />
          <rect x="-4" y="12" width="68" height="2" fill="#2a1a10" />
          <rect x="10" y="20" width="8" height="12" fill="#1a1008" />
          <rect x="26" y="20" width="8" height="12" fill="#1a1008" />
          <rect x="42" y="20" width="8" height="12" fill="#1a1008" />
          {/* Chimney with smoke */}
          <rect x="48" y="2" width="4" height="10" fill="#2a1a10" />
          <g className="rc-smoke-rise">
            <ellipse cx={50} cy={-2} rx={5} ry={4} fill="#3a3a42" opacity="0.6" />
          </g>
          <g className="rc-smoke-rise" style={{ animationDelay: '1.3s' }}>
            <ellipse cx={52} cy={-4} rx={4} ry={3.5} fill="#4a4a52" opacity="0.55" />
          </g>
          <g className="rc-smoke-rise" style={{ animationDelay: '2.6s' }}>
            <ellipse cx={48} cy={-2} rx={5.5} ry={4} fill="#2a2a32" opacity="0.55" />
          </g>
        </g>

        {/* Barracks 2 — bigger, further back */}
        <g transform="translate(380, 96)">
          <rect x="0" y="14" width="80" height="34" fill="#4a4030" />
          <rect x="0" y="14" width="80" height="2"  fill="#5a5040" />
          <polygon points="-4,14 40,-6 84,14" fill="#3a2a18" />
          <rect x="-4" y="14" width="88" height="2" fill="#2a1a10" />
          <rect x="10" y="22" width="10" height="14" fill="#1a1008" />
          <rect x="28" y="22" width="10" height="14" fill="#1a1008" />
          <rect x="46" y="22" width="10" height="14" fill="#1a1008" />
          <rect x="64" y="22" width="10" height="14" fill="#1a1008" />
        </g>

        {/* === Watchtower === */}
        <g className="rc-watchtower-sway">
          <g transform="translate(234, 0)">
            {/* Legs */}
            <rect x="0"  y="50" width="4" height="90" fill="#4a4030" />
            <rect x="26" y="50" width="4" height="90" fill="#4a4030" />
            {/* Cross braces */}
            <line x1="4"  y1="72" x2="26" y2="96" stroke="#3a3020" strokeWidth="1.2" />
            <line x1="4"  y1="96" x2="26" y2="72" stroke="#3a3020" strokeWidth="1.2" />
            <line x1="4"  y1="106" x2="26" y2="130" stroke="#3a3020" strokeWidth="1.2" />
            <line x1="4"  y1="130" x2="26" y2="106" stroke="#3a3020" strokeWidth="1.2" />
            {/* Platform */}
            <rect x="-4" y="42" width="38" height="8" fill="#5a5040" />
            <rect x="-4" y="50" width="38" height="2" fill="#3a3020" />
            {/* Railing */}
            <rect x="-4" y="38" width="2" height="4" fill="#5a5040" />
            <rect x="32" y="38" width="2" height="4" fill="#5a5040" />
            <line x1="-4" y1="40" x2="34" y2="40" stroke="#5a5040" strokeWidth="1" />
            {/* Roof */}
            <polygon points="-6,28 15,16 36,28" fill="#3a2a18" />
            <rect x="-6" y="28" width="42" height="3" fill="#5a4030" />
            {/* Beam cones sweep across the ground. The PIVOT must be
                the lamp on the roof at local (15, 35). Because
                .rc-searchlight uses `transform-box: fill-box`, the
                transformOrigin is measured from the cones' bounding-box
                top-left. With cones extending to local x=-80 and y=32,
                fill-box top-left is (-80, 32), so the pivot in
                fill-box-relative coords is (15 - (-80), 35 - 32) =
                (95, 3). Previously the bright lamp rect LIVED INSIDE
                this rotating group, so the whole fixture swung around
                the bad pivot each sweep — the "floating light" bug. */}
            <g className="rc-searchlight" style={{ transformOrigin: '95px 3px' }}>
              <polygon points="15,35 -80,260 110,260" fill="#ffee88" opacity="0.09" />
              <polygon points="15,35 -30,170 60,170" fill="#ffee88" opacity="0.06" />
            </g>
            {/* Lamp fixture — bolted to the underside of the watchtower
                roof. Stays FIXED. Only the beams rotate. */}
            <rect x="11" y="32" width="8" height="5" fill="#3a2a18" />
            <rect x="12" y="32" width="6" height="5" fill="#e8c878" />
            <rect x="13" y="33" width="4" height="3" fill="#fff4b8" opacity="0.95" />
            <rect x="11" y="37" width="8" height="1" fill="#2a1a08" />
          </g>
        </g>

        {/* === Flag of the Socialist Republic of Vietnam ===
            Flown from a pole mounted between the watchtower and the
            gate. Red field with a single yellow five-pointed star
            centered — "cờ đỏ sao vàng". Sways in the wind. */}
        {/* Flagpole */}
        <rect x="206" y="52" width="2" height="56" fill="#3a2a18" />
        <rect x="204" y="50" width="6" height="3" fill="#5a4a2a" />
        {/* Flag — elongated 2:1 proportions, deeper red as requested.
            Hangs from its hoist (left edge) — the .rc-banner-wave class
            already sets transform-origin: left center with
            transform-box: fill-box, so no inline override needed. */}
        <g className="rc-banner-wave">
          {/* Red field */}
          <rect x="208" y="58" width="32" height="16" fill="#8a1010" />
          {/* Hoist shadow (darker stripe next to the pole) */}
          <rect x="208" y="58" width="1.5" height="16" fill="#5a0808" />
          {/* Top-edge sun highlight */}
          <rect x="208" y="58" width="32" height="1.2" fill="#a01818" opacity="0.9" />
          {/* Yellow 5-pointed star centered on the red field */}
          <polygon points={starPath(224, 66, 5, 2.2)}
            fill="#ffcd00" stroke="#a86000" strokeWidth="0.3" />
        </g>

        {/* === Main gate ===
            Drawn BEFORE the camp-name banner so that the banner (which
            is mounted on stakes driven in *front* of the gate) sits
            on top of the gate post caps — otherwise the caps clip the
            "(RE-" and "MP)" ends of the English gloss. */}
        {/* Left post */}
        <rect x="228" y="110" width="7" height="58" fill="#4a4030" />
        <rect x="226" y="106" width="11" height="5" fill="#5a5040" />
        {/* Right post */}
        <rect x="265" y="110" width="7" height="58" fill="#4a4030" />
        <rect x="263" y="106" width="11" height="5" fill="#5a5040" />
        {/* Crossbar + sign */}
        <rect x="228" y="112" width="44" height="5" fill="#5a5040" />
        <rect x="233" y="118" width="34" height="12" fill="#6a1818" />
        <rect x="233" y="118" width="34" height="2"  fill="#8a2020" />
        {/* 5-pointed star on sign */}
        <polygon points={starPath(250, 124, 4.5, 2)} fill="#ffd23a"
          stroke="#c08020" strokeWidth="0.4" />

        {/* Gate open — door leaning */}
        <rect x="236" y="130" width="2" height="30" fill="#3a2a18" opacity="0.7" />
        <rect x="260" y="130" width="2" height="30" fill="#3a2a18" opacity="0.7" />

        {/* === Camp-name banner strung across the compound ===
            Hand-painted propaganda banner reading "TRẠI CẢI TẠO" with
            the English gloss "(RE-EDUCATION CAMP)" underneath. Mounted
            on stakes driven into the ground just in front of the gate,
            so prisoners read it on approach. Rendered AFTER the gate
            so nothing clips the text at the banner's edges. */}
        <g>
          {/* Left mounting stake */}
          <rect x="179" y="82" width="2.5" height="48" fill="#3a2a18" />
          <rect x="177.5" y="80" width="5.5" height="3" fill="#5a4a2a" />
          {/* Right mounting stake */}
          <rect x="317.5" y="82" width="2.5" height="48" fill="#3a2a18" />
          <rect x="316" y="80" width="5.5" height="3" fill="#5a4a2a" />
          {/* Banner fabric — dark oxblood red, compact so it doesn't
              loom too heavily over the gate. */}
          <rect x="178" y="94" width="142" height="18" fill="#6a0a08" />
          {/* Top / bottom stripe accents */}
          <rect x="178" y="94"  width="142" height="2" fill="#8a1414" />
          <rect x="178" y="110" width="142" height="2" fill="#3a0404" />
          {/* Small frayed fabric bulges on each end */}
          <rect x="176" y="97" width="2" height="12" fill="#6a0a08" />
          <rect x="320" y="97" width="2" height="12" fill="#6a0a08" />
          {/* Primary Vietnamese text — compact so the English gloss
              has clear room underneath. */}
          <text x="249" y="103" textAnchor="middle" fill="#ffd23a"
            fontSize="6.5" fontWeight="700"
            fontFamily="ui-monospace, 'SFMono-Regular', Menlo, monospace"
            style={{ letterSpacing: '0.4px' }}>
            TRẠI CẢI TẠO
          </text>
          {/* English gloss underneath — fully visible because the
              banner now draws on top of the gate post caps that
              previously clipped the "(RE-" and "MP)" characters. */}
          <text x="249" y="109" textAnchor="middle" fill="#ffe8a0"
            fontSize="3.6" opacity="0.95"
            fontFamily="ui-monospace, 'SFMono-Regular', Menlo, monospace"
            style={{ letterSpacing: '0.3px' }}>
            (RE-EDUCATION CAMP)
          </text>
        </g>

        {/* === Registration table just past the gate === */}
        <g transform="translate(278, 166)">
          <rect x="0" y="0" width="34" height="3" fill="#4a3618" />
          <rect x="0" y="3" width="3" height="8" fill="#3a2810" />
          <rect x="31" y="3" width="3" height="8" fill="#3a2810" />
          {/* Ledger book on table */}
          <rect x="6" y="-3" width="10" height="4" fill="#d8c088" />
          <rect x="6" y="-3" width="10" height="1" fill="#b89860" />
          {/* Inkwell */}
          <rect x="20" y="-3" width="3" height="3" fill="#0a0a0a" />
          <rect x="20.5" y="-4" width="2" height="1" fill="#1a1a1a" />
          {/* Registration officer (NLF soldier) seated */}
          <PixelPerson x={26} y={-10} scale={0.85} variant="soldier" {...SOLDIER}
            mood="determined" sway="idle" mirror />
        </g>

        {/* === Queue of prisoners coming up the path === */}
        <g className="rc-queue-advance">
          {/* Deepest in line */}
          <g className="rc-queue-shuffle" style={{ animationDelay: '0s' }}>
            <PixelPerson x={176} y={156} scale={0.75} variant="civilian" {...FELLOW_PASSENGERS[0]}
              mood="weary" sway="idle" swayDelay={0.0} />
          </g>
          <g className="rc-queue-shuffle" style={{ animationDelay: '0.15s' }}>
            <PixelPerson x={158} y={162} scale={0.8} variant="civilian" {...GRANDFATHER}
              mood="weary" sway="idle" swayDelay={0.2} />
          </g>
          <g className="rc-queue-shuffle" style={{ animationDelay: '0.3s' }}>
            <PixelPerson x={140} y={170} scale={0.85} variant="civilian" {...FELLOW_PASSENGERS[2]}
              mood="sad" sway="idle" swayDelay={0.4} />
          </g>
          <g className="rc-queue-shuffle" style={{ animationDelay: '0.45s' }}>
            <PixelPerson x={120} y={178} scale={0.9} variant="civilian" {...FELLOW_PASSENGERS[4]}
              mood="weary" sway="idle" swayDelay={0.6} />
          </g>
          {/* === Protagonist ("you") next in line === */}
          <g className="rc-queue-shuffle" style={{ animationDelay: '0.6s' }}>
            <PixelPerson x={98} y={186} scale={1} variant="civilian" {...PROTAGONIST}
              mood="determined" sway="idle" swayDelay={0.8} />
            {/* Small bundle / bag of belongings */}
            <g transform="translate(92, 192)">
              <rect x="0" y="0" width="8" height="8" fill="#6a4a28" />
              <rect x="0" y="0" width="8" height="2" fill="#8a6a40" />
              <line x1="0" y1="3" x2="8" y2="3" stroke="#2a1808" strokeWidth="0.5" />
              {/* Strap */}
              <line x1="0" y1="0" x2="-4" y2="-4" stroke="#4a3a18" strokeWidth="1" />
            </g>
          </g>
        </g>

        {/* === Family watching from outside the fence (foreground left) === */}
        <g transform="translate(46, 186)">
          {/* Mother — one hand on child's shoulder */}
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian" {...MOTHER}
            mood="sad" sway="idle" />
          {/* Child pressed against mother */}
          <PixelPerson x={-12} y={10} scale={0.85} variant="civilian" {...CHILD}
            mood="sad" sway="scared" swayDelay={0.3} />
        </g>

        {/* === Armed guard pacing in front of the gate === */}
        <g className="rc-guard-pace" style={{ transform: 'translateX(0)' }}>
          <PixelPerson x={220} y={180} scale={1.05} variant="soldier" {...SOLDIER}
            mood="determined" sway="idle" />
          {/* Rifle slung across chest */}
          <rect x={220} y={180} width={2} height={0} fill="transparent" />
          <g transform="translate(220, 180)">
            <rect x={-2} y={-18} width={14} height={1.5} fill="#1a0a04"
              transform="rotate(-24)" />
            <rect x={8}  y={-16} width={4} height={2} fill="#3a2a18"
              transform="rotate(-24)" />
          </g>
        </g>

        {/* A second guard standing at gate */}
        <g transform="translate(272, 180)">
          <PixelPerson x={0} y={0} scale={1} variant="soldier" {...SOLDIER}
            mood="determined" sway="idle" mirror />
          <g>
            <rect x={-12} y={-12} width={14} height={1.5} fill="#1a0a04"
              transform="rotate(18)" />
          </g>
        </g>

        {/* === Dust blowing across the foreground === */}
        {[30, 90, 150, 210, 270, 330, 390, 450].map((dx, di) => (
          <rect
            key={`dust-${di}`} x={dx} y={230 + (di % 3) * 6} width={1.8} height={1.8}
            fill="#b08a5a" opacity="0.55"
            className="rc-dust"
            style={{ animationDelay: `${di * 0.6}s`, animationDuration: `${4.5 + (di % 3) * 0.6}s` }}
          />
        ))}
        {[60, 180, 300, 420].map((dx, di) => (
          <rect
            key={`dust-b-${di}`} x={dx} y={250 + (di % 2) * 4} width={1.2} height={1.2}
            fill="#8a6840" opacity="0.55"
            className="rc-dust"
            style={{ animationDelay: `${di * 0.9 + 0.4}s`, animationDuration: `${5 + (di % 2) * 0.7}s` }}
          />
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="22" fill="#000" opacity="0.35" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.45" />
      </svg>
    </div>
  );
}
