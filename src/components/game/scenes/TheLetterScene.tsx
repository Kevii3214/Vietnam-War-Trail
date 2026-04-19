import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST,
  MOTHER,
  CHILD,
  GRANDFATHER,
  FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * "The Letter" — out in the open dirt yard of the refugee transit
 * camp. A tall canvas "POST" wall-tent sits to one side and houses
 * the camp's mail worker, who sorts letters into wooden country
 * crates. The rest of the camp's refugees sit at makeshift wooden
 * desks writing letters home to family already resettled in the USA,
 * France, Australia, and Canada.
 *
 * Scenery matches the refugee-camp look from RationDayScene — pale
 * hazy sky, drifting clouds, pine-treed horizon, dusty bands of
 * dirt, grass tufts and bushes, and rows of military wall tents —
 * but the activity and foreground layout are different.
 *
 * The player's character is the foreground central figure, with
 * the mother and child at the desk beside him and the grandfather
 * at his own desk. Other refugees fill the yard at smaller scale.
 */

/* =========================================================================
 *  SMALL VISUAL HELPERS
 * ========================================================================= */

function Desk({ x, y, w = 52, h = 20, top = '#8a5a38', side = '#5a3a20', leg = '#4a2810' }:
  { x: number; y: number; w?: number; h?: number; top?: string; side?: string; leg?: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={w} height={3} fill={top} />
      <rect x={0} y={0} width={w} height={0.8} fill="#a87848" />
      <rect x={2} y={3} width={w - 4} height={2} fill={side} />
      <rect x={2}       y={5} width={2.4} height={h - 5} fill={leg} />
      <rect x={w - 4.4} y={5} width={2.4} height={h - 5} fill={leg} />
      <rect x={-1} y={h - 0.5} width={w + 2} height={1.2} fill="#000" opacity={0.18} />
    </g>
  );
}

function Envelope({ x, y, w = 9, h = 6, open = false, stripe = true }:
  { x: number; y: number; w?: number; h?: number; open?: boolean; stripe?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {open && (
        <>
          <rect x={1.2} y={-h * 0.8} width={w - 2.4} height={h * 0.9} fill="#f6efd8" />
          <rect x={1.2} y={-h * 0.8} width={w - 2.4} height={0.6}   fill="#e2d8b8" />
          <line x1={2.0} y1={-h * 0.6} x2={w - 2.2} y2={-h * 0.6} stroke="#3a3328" strokeWidth={0.22} />
          <line x1={2.0} y1={-h * 0.4} x2={w - 2.4} y2={-h * 0.4} stroke="#3a3328" strokeWidth={0.22} />
          <line x1={2.0} y1={-h * 0.2} x2={w - 3.0} y2={-h * 0.2} stroke="#3a3328" strokeWidth={0.22} />
        </>
      )}
      <rect x={0} y={0} width={w} height={h} fill="#f0ece0" />
      <rect x={0} y={0} width={w} height={0.6} fill="#ded6c0" />
      {stripe && (
        <>
          <rect x={0}       y={h - 0.8} width={w}    height={0.8} fill="#a83030" opacity={0.75} />
          <rect x={0}       y={0}       width={0.8} height={h}    fill="#2a5a8a" opacity={0.55} />
          <rect x={w - 0.8} y={0}       width={0.8} height={h}    fill="#a83030" opacity={0.55} />
        </>
      )}
      <polyline points={`0,0 ${w / 2},${h * 0.55} ${w},0`} fill="none" stroke="#a89878" strokeWidth={0.25} />
      <rect x={w - 2.8} y={0.6} width={2} height={1.6} fill="#7a2828" />
      <rect x={w - 2.8} y={0.6} width={2} height={0.35} fill="#a84030" />
    </g>
  );
}

function InkAndPen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0}   y={2} width={4} height={3} fill="#1a1a2a" />
      <rect x={0}   y={1.5} width={4} height={0.7} fill="#3a3a5a" />
      <rect x={1.3} y={0.5} width={1.4} height={1} fill="#0a0a1a" />
      <rect x={4}   y={2.7} width={6} height={0.6} fill="#3a3a3a" />
      <polygon points={`10,2.4 12,3 10,3.6`} fill="#c0c0c0" />
    </g>
  );
}

function DeskPhoto({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={7} height={9} fill="#5a3a20" />
      <rect x={0.7} y={0.7} width={5.6} height={7.6} fill="#e8d8b0" />
      <ellipse cx={2.6} cy={3.5} rx={1} ry={1.2} fill="#6a5040" />
      <ellipse cx={4.6} cy={3.5} rx={1} ry={1.2} fill="#6a5040" />
      <rect x={1.2} y={4.6} width={4.8} height={2.2} fill="#7a5a40" />
      <rect x={-0.5} y={9} width={8} height={0.9} fill="#3a2410" />
    </g>
  );
}

function MailBin({ x, y, label, flag }: {
  x: number; y: number; label: string; flag: (cx: number, cy: number) => React.ReactNode;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={32} height={22} fill="#7a5028" />
      <rect x={0} y={0} width={32} height={2}  fill="#a87848" />
      <rect x={0} y={20} width={32} height={2} fill="#4a2810" />
      <line x1={8}  y1={2} x2={8}  y2={20} stroke="#5a3a20" strokeWidth="0.6" />
      <line x1={16} y1={2} x2={16} y2={20} stroke="#5a3a20" strokeWidth="0.6" />
      <line x1={24} y1={2} x2={24} y2={20} stroke="#5a3a20" strokeWidth="0.6" />
      <rect x={3}  y={-3} width={7} height={4} fill="#f0ece0" />
      <rect x={11} y={-4} width={7} height={5} fill="#f6efd8" />
      <rect x={19} y={-2} width={7} height={3} fill="#e8e0d0" />
      <rect x={11} y={0}  width={7} height={0.5} fill="#a83030" />
      <rect x={11} y={-4} width={7} height={0.5} fill="#2a5a8a" />
      <rect x={5} y={8} width={22} height={6} fill="#f0ece0" />
      <rect x={5} y={8} width={22} height={0.8} fill="#d8cfb8" />
      <text x={16} y={13}
        fontFamily="ui-monospace, monospace"
        fontSize="5"
        fontWeight="700"
        textAnchor="middle"
        fill="#2a1808"
        style={{ letterSpacing: '0.5px' }}
      >
        {label}
      </text>
      <rect x={28} y={-10} width={0.8} height={12} fill="#3a2410" />
      {flag(28.4, -9)}
    </g>
  );
}

/* =========================================================================
 *  SCENE
 * ========================================================================= */

export function TheLetterScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#e8dcc0] via-[#c8b090] to-[#9a7e58]">
      <style>{`
        @keyframes tl-write-hand {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          25%      { transform: translate(1px, -0.3px) rotate(2deg); }
          50%      { transform: translate(-0.5px, 0.2px) rotate(-2deg); }
          75%      { transform: translate(0.8px, -0.1px) rotate(3deg); }
        }
        @keyframes tl-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-0.4px); }
        }
        @keyframes tl-flag {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.85); }
        }
        @keyframes tl-pen-tap {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-0.6px); }
        }
        @keyframes tl-paper-flutter {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(0.4deg); }
        }
        @keyframes tl-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-30px); }
        }
        .tl-write-hand   { animation: tl-write-hand 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
        .tl-bob          { animation: tl-bob 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .tl-flag         { animation: tl-flag 2s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        .tl-pen-tap      { animation: tl-pen-tap 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .tl-paper        { animation: tl-paper-flutter 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .tl-cloud-drift  { animation: tl-cloud-drift 28s linear infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* =================================================================
            SKY — pale, slightly hazy (matches ration-camp daylight)
           ================================================================= */}
        <rect x="0" y="0" width="500" height="90" fill="#e8dcc0" />
        <rect x="0" y="0" width="500" height="50" fill="#f0e4ca" />
        <rect x="0" y="50" width="500" height="40" fill="#e4d4b4" opacity="0.7" />

        {/* Soft pale clouds drifting across the sky */}
        <g className="tl-cloud-drift">
          {[
            { cx: 50,  cy: 24, rx: 32, ry: 6 },
            { cx: 160, cy: 18, rx: 40, ry: 7 },
            { cx: 280, cy: 30, rx: 34, ry: 6 },
            { cx: 380, cy: 14, rx: 38, ry: 7 },
            { cx: 510, cy: 26, rx: 30, ry: 6 },
          ].map((c, i) => (
            <g key={`cl-${i}`}>
              <ellipse cx={c.cx}     cy={c.cy}     rx={c.rx}       ry={c.ry} fill="#f8efda" opacity="0.9" />
              <ellipse cx={c.cx - 6} cy={c.cy - 2} rx={c.rx * 0.6} ry={c.ry * 0.8} fill="#ffffff" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* =================================================================
            PINE TREE HORIZON LINE
           ================================================================= */}
        <rect x="0" y="78" width="500" height="12" fill="#3a5230" opacity="0.85" />
        <rect x="0" y="76" width="500" height="4"  fill="#4a6238" opacity="0.6" />
        {/* Individual pine silhouettes — positions intentionally differ
            from the Ration scene so the horizon doesn't repeat exactly. */}
        {[
          14, 38, 66, 94, 118, 142, 170, 196, 224, 248,
          272, 298, 324, 350, 378, 404, 430, 456, 480, 498,
        ].map((tx, ti) => {
          const h = 9 + (ti % 6) * 2;
          const w = 5.5 + (ti % 4);
          return (
            <g key={`pine-${ti}`}>
              <polygon points={`${tx},${78 - h} ${tx - w},${82} ${tx + w},${82}`} fill="#2a4228" />
              <polygon points={`${tx},${78 - h + 2} ${tx - w * 0.85},${80} ${tx + w * 0.85},${80}`}
                fill="#3a5a32" opacity="0.7" />
            </g>
          );
        })}

        {/* =================================================================
            GROUND — dusty dirt with shading bands and scuffs
           ================================================================= */}
        <rect x="0" y="90" width="500" height="190" fill="#b8987a" />
        <rect x="0" y="90" width="500" height="3"   fill="#988670" />
        {/* Darker dirt bands further forward */}
        <rect x="0" y="160" width="500" height="120" fill="#a88868" opacity="0.5" />
        <rect x="0" y="220" width="500" height="60"  fill="#8a6848" opacity="0.4" />
        {/* Dirt scuff lines */}
        {[108, 124, 142, 164, 188, 214, 242, 262].map((y, i) => (
          <line key={`scuff-${y}`} x1={i * 63 - 24} y1={y} x2={i * 63 + 64} y2={y}
            stroke="#8a7050" strokeWidth="0.4" opacity="0.4" />
        ))}
        {/* Mud patches */}
        <ellipse cx="58"  cy="232" rx="20" ry="3" fill="#6a5038" opacity="0.55" />
        <ellipse cx="342" cy="252" rx="26" ry="4" fill="#6a5038" opacity="0.55" />

        {/* =================================================================
            GRASS TUFTS scattered around the yard
           ================================================================= */}
        {[
          { x: 24,  y: 132 }, { x: 72,  y: 142 }, { x: 126, y: 134 }, { x: 162, y: 150 },
          { x: 44,  y: 170 }, { x: 100, y: 188 }, { x: 214, y: 142 }, { x: 262, y: 160 },
          { x: 306, y: 148 }, { x: 356, y: 164 }, { x: 408, y: 144 }, { x: 452, y: 158 },
          { x: 202, y: 222 }, { x: 348, y: 238 }, { x: 20,  y: 252 }, { x: 472, y: 244 },
          { x: 250, y: 252 }, { x: 68,  y: 208 }, { x: 418, y: 216 },
        ].map((g, i) => (
          <g key={`grass-${i}`} transform={`translate(${g.x}, ${g.y})`}>
            <rect x={-3} y={0}  width={1} height={3} fill="#4a7030" />
            <rect x={-1} y={-1} width={1} height={4} fill="#5a8838" />
            <rect x={1}  y={0}  width={1} height={3} fill="#4a7030" />
            <rect x={3}  y={1}  width={1} height={2} fill="#6a9040" />
            <rect x={-4} y={2}  width={9} height={1} fill="#3a5a28" opacity="0.7" />
          </g>
        ))}

        {/* =================================================================
            BUSHES for greenery — layout different from RationDay
           ================================================================= */}
        {[
          { x: 36,  y: 134, s: 0.95 },
          { x: 118, y: 128, s: 1.05 },
          { x: 232, y: 132, s: 0.85 },
          { x: 354, y: 130, s: 1 },
          { x: 452, y: 136, s: 0.9 },
          { x: 178, y: 250, s: 1.05 },
          { x: 478, y: 252, s: 0.95 },
        ].map((b, i) => {
          const s = b.s;
          return (
            <g key={`bush-${i}`} transform={`translate(${b.x}, ${b.y})`}>
              <ellipse cx={0}      cy={0}      rx={10 * s} ry={4 * s}   fill="#2a4a22" />
              <ellipse cx={-5 * s} cy={-2 * s} rx={7 * s}  ry={3 * s}   fill="#3a5a2a" />
              <ellipse cx={5 * s}  cy={-2 * s} rx={7 * s}  ry={3 * s}   fill="#3a5a2a" />
              <ellipse cx={0}      cy={-4 * s} rx={5 * s}  ry={2.5 * s} fill="#4a6a32" />
              <ellipse cx={-3 * s} cy={-3 * s} rx={2 * s}  ry={1 * s}   fill="#5a7a3a" opacity="0.8" />
              <ellipse cx={3 * s}  cy={-3 * s} rx={2 * s}  ry={1 * s}   fill="#5a7a3a" opacity="0.8" />
            </g>
          );
        })}

        {/* =================================================================
            BACKGROUND ROW OF SMALL MILITARY WALL TENTS — fewer than the
            ration scene (5 vs 7), shifted so the horizon reads different.
           ================================================================= */}
        {[
          { x: 58,  s: 0.75 },
          { x: 138, s: 0.75 },
          { x: 218, s: 0.75 },
          { x: 298, s: 0.75 },
          { x: 456, s: 0.75 },
        ].map((t, ti) => {
          const s = t.s;
          return (
            <g key={`tent-bg-${ti}`} transform={`translate(${t.x}, ${106}) scale(${s})`}>
              <line x1={-24} y1={-2} x2={-30} y2={28} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.55" />
              <line x1={24}  y1={-2} x2={30}  y2={28} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.55" />
              <polygon points="0,-16 -22,0 22,0" fill="#6a5e3a" />
              <polygon points="0,-16 -22,0 22,0" fill="none" stroke="#3a2e1a" strokeWidth="0.4" />
              <polygon points="-24,-2 -22,0 22,0 24,-2" fill="#5a4e2a" />
              <rect x={-22} y={0}  width={44} height={20} fill="#a89272" />
              <rect x={-22} y={0}  width={44} height={3}  fill="#8a7452" />
              <rect x={-22} y={17} width={44} height={3}  fill="#7a6442" opacity="0.7" />
              <line x1={-12} y1={0} x2={-12} y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              <line x1={0}   y1={0} x2={0}   y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              <line x1={12}  y1={0} x2={12}  y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              <line x1={-22} y1={0} x2={22} y2={0} stroke="#4a3a1e" strokeWidth="0.4" />
              <polygon points="-4,20 -4,12 -3,10 3,10 4,12 4,20" fill="#3a2e1a" />
              <rect x={-3} y={12} width={6} height={2} fill="#5a4828" />
            </g>
          );
        })}

        {/* =================================================================
            FOREGROUND "POST" WALL TENT — a bigger military tent on the
            right side housing the mail-sorting station.
           ================================================================= */}
        <g transform="translate(410, 148)">
          {/* Wooden platform under the tent */}
          <rect x={-34} y={28} width={68} height={4} fill="#a88858" />
          <rect x={-34} y={28} width={68} height={1} fill="#d8b878" />
          <rect x={-34} y={32} width={68} height={1} fill="#7a6038" />
          {[-22, -10, 2, 14, 26].map(px => (
            <line key={`post-plank-${px}`} x1={px} y1={28} x2={px} y2={32}
              stroke="#6a5028" strokeWidth="0.3" opacity="0.7" />
          ))}
          {/* Support ropes */}
          <line x1={-30} y1={-2} x2={-40} y2={28} stroke="#5a4a2a" strokeWidth="0.5" opacity="0.65" />
          <line x1={30}  y1={-2} x2={40}  y2={28} stroke="#5a4a2a" strokeWidth="0.5" opacity="0.65" />
          <line x1={0}   y1={-22} x2={0}  y2={-2} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.5" />
          {/* Ridge peak */}
          <polygon points="0,-22 -28,0 28,0" fill="#6a5e3a" />
          <polygon points="0,-22 -28,0 28,0" fill="none" stroke="#3a2e1a" strokeWidth="0.5" />
          <polygon points="0,-22 28,0 6,0" fill="#7a6a46" opacity="0.85" />
          {/* Eaves */}
          <polygon points="-30,-2 -28,0 28,0 30,-2" fill="#5a4e2a" />
          {/* Walls */}
          <rect x={-28} y={0}  width={56} height={28} fill="#b59d7d" />
          <rect x={-28} y={0}  width={56} height={4}  fill="#92785a" />
          <rect x={-28} y={24} width={56} height={4}  fill="#826c4e" opacity="0.75" />
          {[-16, -4, 8, 20].map(lx => (
            <line key={`post-seam-${lx}`} x1={lx} y1={0} x2={lx} y2={28}
              stroke="#6a5838" strokeWidth="0.4" opacity="0.65" />
          ))}
          {/* Door flap rolled open showing the interior darker */}
          <rect x={-10} y={4} width={20} height={24} fill="#3a2e1a" />
          <rect x={-10} y={4} width={20} height={1.5} fill="#1a1008" />
          <polygon points="-10,28 -10,10 -7,8 7,8 10,10 10,28" fill="#2a200e" />
          {/* "POST" sign nailed above the door */}
          <rect x={-18} y={-6} width={36} height={8} fill="#6a4228" />
          <rect x={-18} y={-6} width={36} height={1.5} fill="#8a6238" />
          <rect x={-18} y={1}  width={36} height={1.3} fill="#3a2010" />
          <text x={0} y={0.5}
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            fontWeight="700"
            textAnchor="middle"
            fill="#f0e0b0"
            style={{ letterSpacing: '1.5px' }}
          >
            POST
          </text>
          {/* Small red airmail identifier patch (like the red cross on
              the medical tent in RationDay but here it's a tiny mail
              symbol — envelope striped with an airmail band). */}
          <rect x={-4} y={-16} width={8} height={6} fill="#f0ece0" />
          <rect x={-4} y={-16} width={8} height={1.2} fill="#2a5a8a" />
          <rect x={-4} y={-11} width={8} height={1.2} fill="#a83030" />
        </g>

        {/* =================================================================
            BACK-ROW REFUGEES AT SMALL DESKS (distant writers)

            For each writer we render in three passes so the desk hides
            the lower half of the body (feet are on the ground UNDER
            the desk, not on top of it):
              1) the character (low y-index, behind desk)
              2) the desk (drawn on top, covering the character's torso
                 and legs)
              3) the desk items (letter, pen, ink) drawn last so they
                 sit on the tabletop.

            Y-formula: `charY = deskTop − 7·(2·scale)`  — this lifts the
            sprite so the head pokes above the desk while the feet end
            up hidden inside the desk's volume.
           ================================================================= */}
        {/* --- Writer 1 (back-left) --- */}
        <g transform="translate(78, 139)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian"
            {...FELLOW_PASSENGERS[0]} mood="neutral" sway="idle" />
        </g>
        <Desk x={70}  y={150} w={40} h={16} />
        <g transform="translate(78, 135)">
          <Envelope x={17} y={16} open stripe />
          <g className="tl-write-hand" style={{ transformOrigin: '25px 17.3px' }}>
            <rect x={23.5} y={17.2} width={3} height={0.4} fill="#3a3a3a" />
          </g>
        </g>

        {/* --- Writer 2 (back-center) --- */}
        <g transform="translate(208, 139)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian"
            {...FELLOW_PASSENGERS[3]} mood="weary" sway="idle" swayDelay={0.4} />
        </g>
        <Desk x={200} y={150} w={40} h={16} />
        <g transform="translate(208, 135)">
          <Envelope x={17} y={16} stripe />
          <InkAndPen x={28} y={14} />
        </g>

        {/* --- Writer 3 (back-right, mirrored) --- */}
        <g transform="translate(282, 143)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian"
            {...FELLOW_PASSENGERS[2]} mood="determined" sway="idle" swayDelay={0.8} mirror />
        </g>
        <Desk x={274} y={154} w={40} h={16} />
        <g transform="translate(282, 139)">
          <Envelope x={8} y={16} open stripe />
          <g className="tl-write-hand" style={{ transformOrigin: '7.5px 17.3px' }}>
            <rect x={6} y={17.2} width={3} height={0.4} fill="#3a3a3a" />
          </g>
        </g>

        {/* =================================================================
            MIDDLE ROW — GRANDFATHER writing a careful letter
           ================================================================= */}
        <g transform="translate(60, 181)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian"
            {...GRANDFATHER} mood="weary" sway="idle" swayDelay={0.2} />
        </g>
        <Desk x={50}  y={194} w={58} h={26} />
        <g transform="translate(60, 174)">
          <g className="tl-paper">
            <rect x={18} y={21} width={20} height={14} fill="#f6efd8" />
            <rect x={18} y={21} width={20} height={0.8} fill="#e2d8b8" />
            {[23, 25.5, 28, 30.5, 33].map((ly, li) => (
              <line key={`gl-${li}`} x1={19.5} y1={ly} x2={36.5 - (li === 4 ? 6 : 0)}
                y2={ly} stroke="#2a2418" strokeWidth={0.3} />
            ))}
          </g>
          <g className="tl-pen-tap" style={{ transformOrigin: '30px 28.7px' }}>
            <rect x={28} y={28.3} width={4} height={0.5} fill="#3a3a3a" />
            <polygon points="32,28.2 34,28.8 32,29.4" fill="#c0c0c0" />
          </g>
          {/* Cup of tea */}
          <rect x={45} y={18} width={5} height={5} fill="#e8d8b0" />
          <rect x={45} y={18} width={5} height={1} fill="#d8c8a0" />
          <ellipse cx={47.5} cy={18.2} rx={2.2} ry={0.9} fill="#6a3a18" />
          <g className="tl-bob" style={{ transformOrigin: '47px 18px' }}>
            <path d="M 46.5 17 q 0.5 -2 -0.3 -3" stroke="#f0e8d0" strokeWidth="0.4" fill="none" opacity="0.6" />
            <path d="M 48 17 q 0.5 -2.5 0.3 -4" stroke="#f0e8d0" strokeWidth="0.4" fill="none" opacity="0.5" />
          </g>
        </g>

        {/* =================================================================
            MIDDLE — MOTHER AND CHILD at the same desk
           ================================================================= */}
        <g transform="translate(148, 181)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian"
            {...MOTHER} mood="determined" sway="idle" />
        </g>
        {/* Child is standing beside mother's desk — not behind it — so
            ground level for the child is the dirt right next to the desk
            (y ≈ 220, the desk's bottom edge). */}
        <g transform="translate(180, 199)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian"
            {...CHILD} mood="happy" sway="idle" swayDelay={0.6} />
        </g>
        <Desk x={140} y={194} w={66} h={26} />
        <g transform="translate(148, 174)">
          <g className="tl-paper">
            <rect x={14} y={21} width={16} height={12} fill="#f6efd8" />
            {[23, 25.2, 27.4, 29.6, 31.8].map((ly, li) => (
              <line key={`ml-${li}`} x1={15.2} y1={ly} x2={28.5 - (li === 4 ? 4 : 0)}
                y2={ly} stroke="#3a3328" strokeWidth={0.28} />
            ))}
          </g>
          <g className="tl-write-hand" style={{ transformOrigin: '27.5px 26.6px' }}>
            <rect x={26} y={26.4} width={3.5} height={0.4} fill="#3a3a3a" />
          </g>
        </g>
        {/* Child's crayon drawing sitting on mother's desk */}
        <g transform="translate(180, 182)">
          <rect x={14} y={13} width={10} height={8} fill="#f6efd8" />
          <path d="M 15 15 q 2 -1 4 0 t 4 0" stroke="#3a3328" strokeWidth="0.3" fill="none" />
          <path d="M 15 17 q 2 -1 3 0 t 3 0" stroke="#3a3328" strokeWidth="0.3" fill="none" />
          <path d="M 15 19 q 2 -1 3 0" stroke="#3a3328" strokeWidth="0.3" fill="none" />
          <g className="tl-write-hand" style={{ transformOrigin: '20px 17px' }}>
            <rect x={17} y={17} width={3.5} height={0.8} fill="#a83030" />
          </g>
        </g>

        {/* =================================================================
            FOREGROUND — THE PLAYER'S DESK (center stage)
           ================================================================= */}
        <g transform="translate(228, 210)">
          <PixelPerson x={0} y={0} scale={1.15} variant="civilian"
            {...PROTAGONIST} mood="determined" sway="idle" />
        </g>
        <Desk x={210} y={226} w={84} h={34} top="#9a6a48" side="#6a4428" />
        <g>
          <g className="tl-paper">
            <rect x={222} y={229} width={36} height={22} fill="#faf0d6" />
            <rect x={222} y={229} width={36} height={1.1} fill="#e8dcbc" />
            <rect x={222} y={229} width={36} height={22} fill="none" stroke="#c8b890" strokeWidth="0.3" />
            <line x1={224} y1={232.5} x2={242} y2={232.5} stroke="#1a1408" strokeWidth="0.55" />
            {[235, 237.4, 239.8, 242.2, 244.6, 247].map((ly, li) => (
              <line key={`pl-${li}`} x1={224} y1={ly}
                x2={256 - (li === 5 ? 12 : li * 2)} y2={ly}
                stroke="#2a2418" strokeWidth={0.32} />
            ))}
          </g>
          <Envelope x={262} y={233} w={16} h={10} stripe />
          <text x={266} y={239}
            fontFamily="ui-monospace, monospace" fontSize="2.4" fill="#2a1808">
            To: USA
          </text>
          <DeskPhoto x={283} y={224} />
          <InkAndPen x={212} y={233} />
          <rect x={226} y={251} width={14} height={4} fill="#e8e0d0" />
          <rect x={226} y={251} width={14} height={0.5} fill="#d8cfb8" />
          {/* Pen — hovering over the letter, animated as if writing */}
          <g className="tl-write-hand" style={{ transformOrigin: '255px 239.7px' }}>
            <rect x={250} y={239} width={5} height={1.3} fill="#3a3a3a" />
            <polygon points="255,238.7 257,239.6 255,240.5" fill="#c0c0c0" />
          </g>
        </g>

        {/* =================================================================
            LEFT FOREGROUND — A refugee woman writing, close view
           ================================================================= */}
        <g transform="translate(76, 211)">
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian"
            {...FELLOW_PASSENGERS[5]} mood="sad" sway="idle" swayDelay={0.5} />
        </g>
        <Desk x={66} y={226} w={70} h={34} top="#8a5a38" />
        <g transform="translate(76, 198)">
          <g className="tl-paper">
            <rect x={15} y={30} width={22} height={14} fill="#f6efd8" />
            {[33, 35, 37, 39, 41, 43].map((ly, li) => (
              <line key={`ll-${li}`} x1={17} y1={ly}
                x2={35 - (li === 5 ? 6 : 0)} y2={ly}
                stroke="#2a2418" strokeWidth={0.3} />
            ))}
          </g>
          <g className="tl-write-hand" style={{ transformOrigin: '24px 31.5px' }}>
            <rect x={22} y={31} width={4} height={1.1} fill="#3a3a3a" />
          </g>
          <DeskPhoto x={40} y={26} />
        </g>

        {/* =================================================================
            MAIL-SORTING TABLE — sits just in front of the POST tent
            on the right. Four country bins with flags.
           ================================================================= */}
        {/* Counter table */}
        <rect x="346" y="188" width="140" height="6"  fill="#5a4a30" />
        <rect x="346" y="188" width="140" height="1.3" fill="#7a6a48" />
        <rect x="346" y="194" width="140" height="3"  fill="#3a2010" />
        <rect x="352" y="197" width="3" height="30" fill="#3a2010" />
        <rect x="479" y="197" width="3" height="30" fill="#3a2010" />

        {/* USA */}
        <MailBin x={356} y={166} label="USA"
          flag={(cx, cy) => (
            <g className="tl-flag">
              <rect x={cx} y={cy} width={10} height={6} fill="#e0e0e0" />
              {[cy + 0.9, cy + 2.5, cy + 4.1].map((ly, li) => (
                <rect key={`us-${li}`} x={cx} y={ly} width={10} height={0.9} fill="#b83030" />
              ))}
              <rect x={cx} y={cy} width={4} height={3} fill="#2a3a7a" />
              {[[0.8,0.6],[2.2,0.6],[1.5,1.5],[0.8,2.2],[2.2,2.2]].map((p, si) => (
                <rect key={`st-${si}`} x={cx + p[0]} y={cy + p[1]} width={0.5} height={0.5} fill="#f0f0f0" />
              ))}
            </g>
          )} />

        {/* FRANCE */}
        <MailBin x={396} y={166} label="FR"
          flag={(cx, cy) => (
            <g className="tl-flag">
              <rect x={cx}       y={cy} width={3.3} height={6} fill="#2a3a8a" />
              <rect x={cx + 3.3} y={cy} width={3.3} height={6} fill="#f0f0f0" />
              <rect x={cx + 6.6} y={cy} width={3.4} height={6} fill="#c83030" />
            </g>
          )} />

        {/* AUSTRALIA */}
        <MailBin x={436} y={166} label="AU"
          flag={(cx, cy) => (
            <g className="tl-flag">
              <rect x={cx} y={cy} width={10} height={6} fill="#1a3a7a" />
              <rect x={cx} y={cy}     width={4}   height={3} fill="#1a2860" />
              <line x1={cx} y1={cy}     x2={cx + 4} y2={cy + 3} stroke="#e0e0e0" strokeWidth="0.4" />
              <line x1={cx} y1={cy + 3} x2={cx + 4} y2={cy}     stroke="#e0e0e0" strokeWidth="0.4" />
              <rect x={cx + 1.5} y={cy}     width={1} height={3} fill="#e0e0e0" />
              <rect x={cx}       y={cy + 1} width={4} height={1} fill="#e0e0e0" />
              <rect x={cx + 1.2} y={cy + 4} width={1.6} height={1.6} fill="#f0f0f0" />
              <rect x={cx + 6} y={cy + 1.2} width={0.5} height={0.5} fill="#f0f0f0" />
              <rect x={cx + 7.4} y={cy + 3} width={0.5} height={0.5} fill="#f0f0f0" />
              <rect x={cx + 8.6} y={cy + 1.8} width={0.5} height={0.5} fill="#f0f0f0" />
              <rect x={cx + 6.5} y={cy + 4.2} width={0.5} height={0.5} fill="#f0f0f0" />
            </g>
          )} />

        {/* CANADA — pushed below the other row for variety */}
        <MailBin x={396} y={210} label="CAN"
          flag={(cx, cy) => (
            <g className="tl-flag">
              <rect x={cx}       y={cy} width={3} height={6} fill="#c83030" />
              <rect x={cx + 3}   y={cy} width={4} height={6} fill="#f0f0f0" />
              <rect x={cx + 7}   y={cy} width={3} height={6} fill="#c83030" />
              <rect x={cx + 4.3} y={cy + 1.5} width={1.4} height={3}   fill="#c83030" />
              <rect x={cx + 3.6} y={cy + 2.3} width={2.8} height={1.4} fill="#c83030" />
              <rect x={cx + 4.6} y={cy + 4.3} width={0.8} height={0.8} fill="#c83030" />
            </g>
          )} />

        {/* Mail worker behind the counter */}
        <g transform="translate(460, 196)">
          <PixelPerson x={0} y={0} scale={0.9} variant="civilian"
            color="#c4956a" shirtColor="#2a4a6a" pantsColor="#1a1a28"
            hairColor="#1a0a04" accentColor="#c0c0c0"
            mood="neutral" sway="idle" swayDelay={0.2} mirror />
          {/* Rubber stamp */}
          <rect x={-6} y={18} width={4} height={2} fill="#3a2818" />
          <rect x={-6} y={16.5} width={4} height={1.8} fill="#5a3a20" />
          {/* Stack of accepted letters */}
          <rect x={-14} y={21} width={10} height={5} fill="#f0ece0" />
          <rect x={-14} y={21} width={10} height={0.6} fill="#ded6c0" />
          <rect x={-14} y={22.2} width={10} height={0.4} fill="#d0c4a0" />
        </g>

        {/* =================================================================
            ATMOSPHERIC OVERLAYS — light dust, vignette, wind-blown paper
           ================================================================= */}
        {/* A couple of wind-blown sheets drifting */}
        <g className="tl-paper" style={{ animationDuration: '5s', transformOrigin: '330px 232px' }}>
          <rect x="328" y="230" width="5" height="4" fill="#f6efd8" opacity="0.9" />
        </g>
        <g className="tl-paper" style={{ animationDuration: '6s', animationDelay: '1s', transformOrigin: '160px 258px' }}>
          <rect x="158" y="256" width="5" height="4" fill="#f6efd8" opacity="0.85" />
        </g>

        {/* Vignette */}
        <rect x="0" y="0"   width="500" height="14" fill="#000" opacity="0.22" />
        <rect x="0" y="266" width="500" height="14" fill="#000" opacity="0.28" />
      </svg>
    </div>
  );
}
