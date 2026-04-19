import { PixelPerson } from './PixelPeople';
import type { CharacterPalette } from './characterPalettes';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * Women refugees — áo-bà-ba style blouses (rose, teal, mustard,
 * lavender, sage, deep red). Used to populate the camp and the
 * ration line so the crowd isn't all the same anonymous civilian.
 */
const WOMEN_PALETTES: CharacterPalette[] = [
  { color: '#f0c8a0', shirtColor: '#c85a6a', pantsColor: '#2a1a10', hairColor: '#0a0404', accentColor: '#f8e4d8' },
  { color: '#f4d0a4', shirtColor: '#8a5a9a', pantsColor: '#2a2030', hairColor: '#1a0a08', accentColor: '#e8c8d8' },
  { color: '#e8b896', shirtColor: '#3a8890', pantsColor: '#2a2028', hairColor: '#0a0408', accentColor: '#f0dcb0' },
  { color: '#f0c8a4', shirtColor: '#e8dab0', pantsColor: '#5a6a48', hairColor: '#2a1810', accentColor: '#8a6a3a' },
  { color: '#e8b896', shirtColor: '#a83030', pantsColor: '#3a2818', hairColor: '#0a0404', accentColor: '#ffcf5c' },
  { color: '#f4d0a4', shirtColor: '#d8a848', pantsColor: '#4a2818', hairColor: '#1a0a06', accentColor: '#c85a5a' },
];

/** Two elder-woman palettes — gray hair, muted muted outfits. */
const ELDER_WOMEN_PALETTES: CharacterPalette[] = [
  { color: '#d8b090', shirtColor: '#6a4858', pantsColor: '#2a1a10', hairColor: '#b0a8a0', accentColor: '#8a7060' },
  { color: '#d8a878', shirtColor: '#5a3828', pantsColor: '#2a1a10', hairColor: '#a89878', accentColor: '#8a6a4a' },
];

/**
 * Ration Day — at the refugee transit camp. Long canvas wall tents
 * stretch in rows, pine trees ring the camp on the horizon, and the
 * family lines up with the other refugees for a bowl from the stew
 * pot. Based visually on a 1975 Fort Chaffee-style military tent city.
 */
export function RationDayScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#d8c8a8] via-[#c8b090] to-[#a08868]">
      <style>{`
        @keyframes rd-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes rd-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        @keyframes rd-chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        .chibi-sway-idle   { animation: rd-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: rd-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: rd-chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes rd-steam {
          0%   { transform: translateY(0)    scale(1);   opacity: 0.55; }
          100% { transform: translateY(-22px) scale(1.4); opacity: 0; }
        }
        @keyframes rd-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-30px); }
        }
        .rd-cloud-drift { animation: rd-cloud-drift 28s linear infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Sky — pale, slightly hazy like the reference photograph === */}
        <rect x="0" y="0" width="500" height="90" fill="#e8dcc0" />
        <rect x="0" y="0" width="500" height="50" fill="#f0e4ca" />
        <rect x="0" y="50" width="500" height="40" fill="#e4d4b4" opacity="0.7" />

        {/* Soft pale clouds drifting */}
        <g className="rd-cloud-drift">
          {[
            { cx: 60,  cy: 28, rx: 34, ry: 6 },
            { cx: 170, cy: 22, rx: 42, ry: 7 },
            { cx: 290, cy: 34, rx: 36, ry: 6 },
            { cx: 400, cy: 18, rx: 40, ry: 7 },
            { cx: 520, cy: 30, rx: 32, ry: 6 },
          ].map((c, i) => (
            <g key={`cl-${i}`}>
              <ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill="#f8efda" opacity="0.9" />
              <ellipse cx={c.cx - 6} cy={c.cy - 2} rx={c.rx * 0.6} ry={c.ry * 0.8} fill="#ffffff" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* === Distant pine tree line ringing the camp === */}
        {/* Darker solid mass of forest at the horizon */}
        <rect x="0" y="78" width="500" height="12" fill="#3a5230" opacity="0.85" />
        <rect x="0" y="76" width="500" height="4"  fill="#4a6238" opacity="0.6" />
        {/* Individual pine silhouettes poking up from the horizon */}
        {[
          10, 32, 58, 84, 108, 132, 158, 184, 210, 236,
          262, 288, 314, 340, 366, 392, 418, 444, 470, 492,
        ].map((tx, ti) => {
          const h = 10 + (ti % 5) * 2.2;
          const w = 6 + (ti % 4);
          return (
            <g key={`pine-${ti}`}>
              <polygon points={`${tx},${78 - h} ${tx - w},${82} ${tx + w},${82}`} fill="#2a4228" />
              <polygon points={`${tx},${78 - h + 2} ${tx - w * 0.85},${80} ${tx + w * 0.85},${80}`} fill="#3a5a32" opacity="0.7" />
            </g>
          );
        })}

        {/* === Ground — dusty dirt with grass patches === */}
        <rect x="0" y="90" width="500" height="190" fill="#b8987a" />
        <rect x="0" y="90" width="500" height="3" fill="#988670" />
        {/* Dirt shading bands */}
        <rect x="0" y="160" width="500" height="120" fill="#a88868" opacity="0.5" />
        <rect x="0" y="220" width="500" height="60"  fill="#8a6848" opacity="0.4" />
        {/* Dirt scuffs */}
        {[110, 125, 145, 165, 185, 205, 230, 255].map((y, i) => (
          <line key={`scuff-${y}`} x1={i * 67 - 20} y1={y} x2={i * 67 + 60} y2={y}
            stroke="#8a7050" strokeWidth="0.4" opacity="0.4" />
        ))}
        {/* Puddle / mud patches */}
        <ellipse cx="70"  cy="228" rx="22" ry="3" fill="#6a5038" opacity="0.55" />
        <ellipse cx="280" cy="246" rx="28" ry="4" fill="#6a5038" opacity="0.55" />

        {/* === Grass tufts / greenery scattered around camp === */}
        {[
          { x: 18,  y: 128 }, { x: 62,  y: 146 }, { x: 118, y: 138 }, { x: 156, y: 152 },
          { x: 34,  y: 170 }, { x: 92,  y: 188 }, { x: 208, y: 140 }, { x: 254, y: 162 },
          { x: 312, y: 144 }, { x: 352, y: 166 }, { x: 402, y: 142 }, { x: 448, y: 160 },
          { x: 188, y: 218 }, { x: 326, y: 234 }, { x: 14,  y: 250 }, { x: 476, y: 240 },
          { x: 238, y: 248 }, { x: 60,  y: 202 }, { x: 424, y: 214 },
        ].map((g, i) => (
          <g key={`grass-${i}`} transform={`translate(${g.x}, ${g.y})`}>
            <rect x={-3} y={0}  width={1} height={3} fill="#4a7030" />
            <rect x={-1} y={-1} width={1} height={4} fill="#5a8838" />
            <rect x={1}  y={0}  width={1} height={3} fill="#4a7030" />
            <rect x={3}  y={1}  width={1} height={2} fill="#6a9040" />
            <rect x={-4} y={2}  width={9} height={1} fill="#3a5a28" opacity="0.7" />
          </g>
        ))}

        {/* === A couple of bushes / leafy shrubs for greenery === */}
        {[
          { x: 42,  y: 134, s: 1 },
          { x: 144, y: 128, s: 0.9 },
          { x: 276, y: 130, s: 1.1 },
          { x: 388, y: 132, s: 0.95 },
          { x: 462, y: 138, s: 0.85 },
          { x: 196, y: 252, s: 1 },
          { x: 12,  y: 244, s: 1.05 },
        ].map((b, i) => {
          const s = b.s;
          return (
            <g key={`bush-${i}`} transform={`translate(${b.x}, ${b.y})`}>
              <ellipse cx={0}        cy={0}       rx={10 * s} ry={4 * s} fill="#2a4a22" />
              <ellipse cx={-5 * s}   cy={-2 * s}  rx={7 * s}  ry={3 * s} fill="#3a5a2a" />
              <ellipse cx={5 * s}    cy={-2 * s}  rx={7 * s}  ry={3 * s} fill="#3a5a2a" />
              <ellipse cx={0}        cy={-4 * s}  rx={5 * s}  ry={2.5 * s} fill="#4a6a32" />
              {/* Highlights */}
              <ellipse cx={-3 * s}   cy={-3 * s}  rx={2 * s}  ry={1 * s} fill="#5a7a3a" opacity="0.8" />
              <ellipse cx={3 * s}    cy={-3 * s}  rx={2 * s}  ry={1 * s} fill="#5a7a3a" opacity="0.8" />
            </g>
          );
        })}

        {/* === Row of military wall-tents (background, smaller) === */}
        {[
          { x: 40,  s: 0.8 },
          { x: 110, s: 0.8 },
          { x: 180, s: 0.8 },
          { x: 250, s: 0.8 },
          { x: 320, s: 0.8 },
          { x: 390, s: 0.8 },
          { x: 460, s: 0.8 },
        ].map((t, ti) => {
          const s = t.s;
          return (
            <g key={`tent-bg-${ti}`} transform={`translate(${t.x}, ${106}) scale(${s})`}>
              {/* Support ropes into the ground */}
              <line x1={-24} y1={-2} x2={-30} y2={28} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.55" />
              <line x1={24}  y1={-2} x2={30}  y2={28} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.55" />
              {/* Ridge peak */}
              <polygon points="0,-16 -22,0 22,0" fill="#6a5e3a" />
              <polygon points="0,-16 -22,0 22,0" fill="none" stroke="#3a2e1a" strokeWidth="0.4" />
              {/* Overhanging tarp eaves */}
              <polygon points="-24,-2 -22,0 22,0 24,-2" fill="#5a4e2a" />
              {/* Walls — main canvas */}
              <rect x={-22} y={0}  width={44} height={20} fill="#a89272" />
              <rect x={-22} y={0}  width={44} height={3}  fill="#8a7452" />
              <rect x={-22} y={17} width={44} height={3}  fill="#7a6442" opacity="0.7" />
              {/* Tarp creases (vertical stitching) */}
              <line x1={-12} y1={0} x2={-12} y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              <line x1={0}   y1={0} x2={0}   y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              <line x1={12}  y1={0} x2={12}  y2={20} stroke="#6a5838" strokeWidth="0.35" opacity="0.6" />
              {/* Roof sag detail */}
              <line x1={-22} y1={0} x2={22} y2={0} stroke="#4a3a1e" strokeWidth="0.4" />
              {/* Door flap — tied open */}
              <polygon points="-4,20 -4,12 -3,10 3,10 4,12 4,20" fill="#3a2e1a" />
              <rect x={-3} y={12} width={6} height={2} fill="#5a4828" />
            </g>
          );
        })}

        {/* === Foreground row of wall-tents (bigger, in front of queue) === */}
        {[
          { x: 70,  s: 1 },
          { x: 180, s: 1 },
          { x: 290, s: 1 },
          { x: 400, s: 1 },
        ].map((t, ti) => {
          const s = t.s;
          return (
            <g key={`tent-fg-${ti}`} transform={`translate(${t.x}, 148) scale(${s})`}>
              {/* Wooden platform under tent (like the image) */}
              <rect x={-30} y={28} width={60} height={4}  fill="#a88858" />
              <rect x={-30} y={28} width={60} height={1}  fill="#d8b878" />
              <rect x={-30} y={32} width={60} height={1}  fill="#7a6038" />
              {/* Plank lines */}
              {[-20, -10, 0, 10, 20].map(px => (
                <line key={`plank-${ti}-${px}`} x1={px} y1={28} x2={px} y2={32} stroke="#6a5028" strokeWidth="0.3" opacity="0.7" />
              ))}
              {/* Support ropes into the ground */}
              <line x1={-28} y1={-2} x2={-36} y2={28} stroke="#5a4a2a" strokeWidth="0.5" opacity="0.65" />
              <line x1={28}  y1={-2} x2={36}  y2={28} stroke="#5a4a2a" strokeWidth="0.5" opacity="0.65" />
              <line x1={0}   y1={-20} x2={0}   y2={-2} stroke="#5a4a2a" strokeWidth="0.4" opacity="0.5" />
              {/* Ridge peak */}
              <polygon points="0,-20 -26,0 26,0" fill="#6a5e3a" />
              <polygon points="0,-20 -26,0 26,0" fill="none" stroke="#3a2e1a" strokeWidth="0.5" />
              {/* Light side of the roof */}
              <polygon points="0,-20 26,0 6,0" fill="#7a6a46" opacity="0.85" />
              {/* Overhanging tarp eaves */}
              <polygon points="-28,-2 -26,0 26,0 28,-2" fill="#5a4e2a" />
              {/* Walls */}
              <rect x={-26} y={0}  width={52} height={28} fill="#b59d7d" />
              <rect x={-26} y={0}  width={52} height={4}  fill="#92785a" />
              <rect x={-26} y={24} width={52} height={4}  fill="#826c4e" opacity="0.75" />
              {/* Vertical canvas seams */}
              {[-14, -4, 6, 16].map(lx => (
                <line key={`seam-${ti}-${lx}`} x1={lx} y1={0} x2={lx} y2={28} stroke="#6a5838" strokeWidth="0.4" opacity="0.65" />
              ))}
              {/* Tarp tension wrinkle shadows */}
              <polygon points={`-26,0 ${-22 * s},${2 * s} -26,4`} fill="#92785a" opacity="0.6" />
              <polygon points={`26,0 ${22 * s},${2 * s} 26,4`}   fill="#92785a" opacity="0.6" />
              {/* Door flap (rolled to one side) */}
              <polygon points="-6,28 -6,14 -4,10 4,10 6,14 6,28" fill="#3a2e1a" />
              <rect x={-4} y={12} width={8} height={3} fill="#5a4828" />
              {/* A small red cross / identifier patch on a couple of them */}
              {ti === 1 && (
                <>
                  <rect x={-4} y={-12} width={8} height={8} fill="#e8e0c8" />
                  <rect x={-1} y={-12} width={2} height={8} fill="#b82020" />
                  <rect x={-4} y={-9}  width={8} height={2} fill="#b82020" />
                </>
              )}
            </g>
          );
        })}

        {/* === Stew / ration station on the right === */}
        <g transform="translate(430, 160)">
          {/* Table */}
          <rect x="-26" y="16" width="52" height="6" fill="#5a4a30" />
          <rect x="-26" y="16" width="52" height="1" fill="#7a6a48" />
          <rect x="-24" y="22" width="4"  height="22" fill="#4a3a20" />
          <rect x="20"  y="22" width="4"  height="22" fill="#4a3a20" />
          {/* Big pot */}
          <ellipse cx="0" cy="8"  rx="18" ry="4"  fill="#2a2a2a" />
          <rect    x="-18" y="-8" width="36" height="16" fill="#3a3a3a" />
          <rect    x="-18" y="-8" width="36" height="2"  fill="#4a4a4a" />
          <ellipse cx="0" cy="-8" rx="18" ry="4"  fill="#5a5a5a" />
          {/* Stew inside */}
          <ellipse cx="0" cy="-6" rx="14" ry="3"  fill="#7a4a28" />
          <ellipse cx="-3" cy="-6.5" rx="4" ry="1" fill="#a06038" opacity="0.7" />
          {/* Steam rising */}
          {[-8, -3, 2, 7].map((sx, si) => (
            <rect key={`steam-${si}`} x={sx} y={-15} width={2.5} height={5}
              fill="#d0d0d0" opacity="0.55"
              style={{ animation: 'rd-steam 2.2s ease-out infinite', animationDelay: `${si * 0.4}s` }}
            />
          ))}
          {/* RATIONS banner hung from the front of the table,
              tied by short ropes under the tabletop so it drapes
              between the front legs below the pot. */}
          <rect x={-18} y={22} width={36} height={10} fill="#d8b878" />
          <rect x={-18} y={22} width={36} height={2}  fill="#a88858" />
          <rect x={-18} y={30} width={36} height={2}  fill="#b08858" opacity="0.6" />
          {/* Tie ropes attaching the banner to the tabletop */}
          <rect x={-16.3} y={20.5} width={0.8} height={2} fill="#6a5028" />
          <rect x={15.5}  y={20.5} width={0.8} height={2} fill="#6a5028" />
          <text x={0} y={30} textAnchor="middle" fill="#3a2810" fontSize="6"
            fontWeight="700" fontFamily="ui-monospace, Menlo, monospace">RATIONS</text>
        </g>

        {/* === Server — standing in FRONT of the table, serving food
            to the queue. Positioned to the left of the station so the
            line of refugees walks up to them. === */}
        <g transform="translate(405, 196)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian"
            color="#f0c8a0" shirtColor="#e8e0d0" pantsColor="#2a2a3a"
            hairColor="#4a3218" accentColor="#b84040"
            mood="determined" sway="idle" />
        </g>

        {/* === The queue — player's family at the front of the line ===
            Shifted LEFT in x so the line no longer crowds the server,
            while the server stays anchored at (405, 196). Vertical
            placement keeps feet on the same ground line as the ration
            stand. */}
        {/* Protagonist — first in line */}
        <g transform="translate(360, 194)">
          <PixelPerson x={0} y={0} scale={1.05} variant="civilian" {...PROTAGONIST}
            mood="weary" sway="idle" mirror />
        </g>
        {/* Mother — right behind the protagonist */}
        <g transform="translate(338, 195)">
          <PixelPerson x={0} y={0} scale={1} variant="civilian" {...MOTHER}
            mood="weary" sway="idle" swayDelay={0.3} mirror />
        </g>
        {/* Child */}
        <g transform="translate(324, 198)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian" {...CHILD}
            mood="sad" sway="idle" swayDelay={0.5} mirror />
        </g>
        {/* Grandfather — leaning on a cane */}
        <g transform="translate(304, 195)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian" {...GRANDFATHER}
            mood="weary" sway="idle" swayDelay={0.7} mirror />
          {/* Cane in one hand — hooked handle at hand height (y≈8) */}
          <rect x={6} y={9}   width={1.3} height={14} fill="#6a4a28" />
          <rect x={5} y={8}   width={3}   height={1.5} fill="#8a6a48" />
        </g>

        {/* Other refugees further back in the line — a mix of
            women (including nón-lá wearers and elders), men, and a
            couple more children, so the crowd reads as varied. */}
        {([
          { x: 282, p: WOMEN_PALETTES[0],       mood: 'weary',   s: 0.95, delay: 0.2 },
          { x: 262, p: FELLOW_PASSENGERS[5],    mood: 'sad',     s: 0.9,  delay: 0.5 },
          { x: 242, p: WOMEN_PALETTES[2],       mood: 'weary',   s: 1,    delay: 0.1 },
          { x: 222, p: ELDER_WOMEN_PALETTES[0], mood: 'weary',   s: 0.85, delay: 0.4 },
          { x: 202, p: WOMEN_PALETTES[3],       mood: 'neutral', s: 0.95, delay: 0.6 },
          { x: 182, p: FELLOW_PASSENGERS[4],    mood: 'sad',     s: 0.9,  delay: 0.3 },
          { x: 160, p: WOMEN_PALETTES[1],       mood: 'weary',   s: 1,    delay: 0.8 },
          { x: 138, p: WOMEN_PALETTES[5],       mood: 'neutral', s: 0.9,  delay: 0.2 },
          { x: 116, p: FELLOW_PASSENGERS[1],    mood: 'weary',   s: 0.95, delay: 0.5 },
          { x: 94,  p: WOMEN_PALETTES[4],       mood: 'sad',     s: 0.95, delay: 0.7 },
          { x: 72,  p: ELDER_WOMEN_PALETTES[1], mood: 'weary',   s: 0.88, delay: 0.4 },
          { x: 52,  p: FELLOW_PASSENGERS[0],    mood: 'sad',     s: 0.85, delay: 0.1 },
          // Small child tucked in between adults
          { x: 128, p: { ...CHILD, shirtColor: '#c85a6a' }, mood: 'sad', s: 0.7, delay: 0.9 },
        ] as const).map((r, i) => (
          <g key={`q-${i}`} transform={`translate(${r.x}, ${196 + (i % 2) * 2})`}>
            <PixelPerson x={0} y={0} scale={r.s} variant="civilian" {...r.p}
              mood={r.mood}
              sway="idle" swayDelay={r.delay}
              mirror />
          </g>
        ))}

        {/* === Camp life away from the line — more women and
            children scattered between the tents, so the camp feels
            populated, not just a queue. === */}
        {/* Woman resting by the front-left tent */}
        <g transform="translate(52, 170)">
          <PixelPerson x={0} y={0} scale={1} variant="civilian" {...WOMEN_PALETTES[0]}
            mood="weary" sway="idle" />
        </g>

        {/* Two women chatting between tents */}
        <g transform="translate(224, 170)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian" {...WOMEN_PALETTES[1]}
            mood="neutral" sway="idle" />
        </g>
        <g transform="translate(258, 172)">
          <PixelPerson x={0} y={0} scale={0.9} variant="civilian" {...WOMEN_PALETTES[4]}
            mood="neutral" sway="idle" swayDelay={0.3} mirror />
          {/* Small market basket on her arm */}
          <ellipse cx={-5} cy={10} rx={3.5} ry={1.2} fill="#8a6a3a" />
          <rect x={-8} y={8}  width={7} height={3} fill="#a8784a" />
          <rect x={-8} y={8}  width={7} height={0.6} fill="#6a4a28" />
          <line x1={-8} y1={8} x2={-6} y2={5.5} stroke="#6a4a28" strokeWidth={0.4} />
          <line x1={-1} y1={8} x2={-3} y2={5.5} stroke="#6a4a28" strokeWidth={0.4} />
        </g>

        {/* Elder woman sitting on a low stool outside a tent */}
        <g transform="translate(148, 176)">
          {/* Small wooden stool */}
          <rect x={-4} y={14} width={9} height={2} fill="#7a5230" />
          <rect x={-4} y={16} width={2} height={4} fill="#5a3820" />
          <rect x={3}  y={16} width={2} height={4} fill="#5a3820" />
          <PixelPerson x={0} y={0} scale={0.9} variant="civilian" {...ELDER_WOMEN_PALETTES[0]}
            mood="weary" sway="idle" />
        </g>

        {/* Young boy running past (small, no hat) */}
        <g transform="translate(196, 178)">
          <PixelPerson x={0} y={0} scale={0.75} variant="civilian"
            color="#e8b896" shirtColor="#3a7aaa" pantsColor="#2a1a10"
            hairColor="#1a0a04" accentColor="#ffcf5c"
            mood="neutral" sway="fast" swayDelay={0.4} />
        </g>

        {/* Woman hanging laundry on a line between tents */}
        <g transform="translate(340, 166)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian" {...WOMEN_PALETTES[2]}
            mood="determined" sway="idle" swayDelay={0.5} mirror />
          {/* Laundry line going to the right */}
          <line x1={6} y1={0} x2={52} y2={-2} stroke="#5a4030" strokeWidth={0.5} />
          {/* Hanging clothes */}
          <rect x={14} y={-1} width={6} height={8} fill="#c85a6a" />
          <rect x={14} y={-1} width={6} height={1} fill="#8a3040" />
          <rect x={26} y={-1} width={6} height={7} fill="#e8dab0" />
          <rect x={26} y={-1} width={6} height={1} fill="#b8a888" />
          <rect x={38} y={-1} width={5} height={6} fill="#3a8890" />
          <rect x={38} y={-1} width={5} height={1} fill="#1a5860" />
        </g>

        {/* Man carrying a sack on his shoulder (variety in gender) */}
        <g transform="translate(290, 172)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian" {...FELLOW_PASSENGERS[3]}
            mood="weary" sway="idle" swayDelay={0.8} />
          {/* Burlap sack on shoulder */}
          <ellipse cx={6} cy={3} rx={3.5} ry={4} fill="#a88860" />
          <ellipse cx={5.5} cy={2} rx={2.5} ry={2} fill="#c8a878" opacity={0.7} />
          <rect x={5} y={-0.5} width={1.5} height={1} fill="#6a4a28" />
        </g>

        {/* === Additional camp-life characters filling the empty gaps
            between tents so the scene reads as a populated village. === */}

        {/* Old man with a cane at the far-left edge */}
        <g transform="translate(18, 176)">
          <PixelPerson x={0} y={0} scale={0.9} variant="civilian"
            color="#d8a878" shirtColor="#4a3828" pantsColor="#2a1810"
            hairColor="#b0a898" accentColor="#8a7060"
            mood="weary" sway="idle" swayDelay={1.1} />
          {/* Wooden cane */}
          <rect x={7} y={9} width={1.2} height={14} fill="#6a4a28" />
          <rect x={6} y={8} width={2.8} height={1.3} fill="#8a6a48" />
        </g>

        {/* Man chopping firewood between front-left tents */}
        <g transform="translate(108, 170)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="determined" sway="idle" swayDelay={0.6} />
          {/* Chopping block + log */}
          <rect x={9} y={11} width={10} height={4} fill="#6a4828" />
          <rect x={9} y={11} width={10} height={1} fill="#8a6a48" />
          <ellipse cx={14} cy={10.5} rx={4} ry={1} fill="#a88060" />
          {/* Stacked logs beside the block */}
          <rect x={20} y={13} width={6} height={2.5} fill="#8a6040" />
          <rect x={20} y={13} width={6} height={0.6} fill="#b8906a" />
          <rect x={20} y={16} width={6} height={2.5} fill="#8a6040" />
          <rect x={20} y={16} width={6} height={0.6} fill="#b8906a" />
          {/* Axe head raised above the shoulder (handle behind character) */}
          <rect x={5} y={-6} width={0.8} height={9} fill="#5a3a18" transform="rotate(30 5.4 3)" />
          <polygon points="7.8,-4 10.5,-3 9.5,-1 6.5,-2" fill="#9a9a9a" transform="rotate(30 5.4 3)" />
          <polygon points="8,-3.7 9.8,-3.1 9.4,-2.1" fill="#c8c8c8" transform="rotate(30 5.4 3)" />
        </g>

        {/* Two kids playing with a small ball between the stool and the running boy */}
        <g transform="translate(166, 180)">
          <PixelPerson x={0} y={0} scale={0.7} variant="civilian"
            color="#f0c8a0" shirtColor="#d8a848" pantsColor="#2a1a10"
            hairColor="#1a0a04" accentColor="#b82020"
            mood="happy" sway="fast" swayDelay={0.1} />
        </g>
        <g transform="translate(184, 180)">
          <PixelPerson x={0} y={0} scale={0.7} variant="civilian"
            color="#e8b896" shirtColor="#c85a6a" pantsColor="#2a2030"
            hairColor="#0a0404" accentColor="#f0dcb0"
            mood="happy" sway="fast" swayDelay={0.5} mirror />
        </g>
        {/* The ball, bouncing between them */}
        <ellipse cx={179} cy={192} rx={1.8} ry={1.4} fill="#e84040" />
        <ellipse cx={178} cy={191} rx={1}  ry={0.6} fill="#ff8080" opacity={0.8} />
        <ellipse cx={179} cy={194} rx={2.2} ry={0.6} fill="#000" opacity={0.25} />

        {/* Woman carrying a shoulder-pole yoke with two water buckets */}
        <g transform="translate(275, 175)">
          <PixelPerson x={0} y={0} scale={0.88} variant="civilian" {...WOMEN_PALETTES[3]}
            mood="weary" sway="idle" swayDelay={0.9} />
          {/* Shoulder pole (horizontal, rests on top of her shoulders) */}
          <rect x={-8} y={5.5} width={22} height={1} fill="#7a5028" />
          <rect x={-8} y={5.3} width={22} height={0.3} fill="#a8784a" />
          {/* Left bucket */}
          <line  x1={-6} y1={6.2} x2={-6} y2={10} stroke="#5a4028" strokeWidth={0.5} />
          <rect  x={-8.5} y={10} width={5} height={4} fill="#6a4a28" />
          <rect  x={-8.5} y={10} width={5} height={0.8} fill="#8a6a48" />
          <ellipse cx={-6} cy={10.2} rx={2.5} ry={0.6} fill="#3a6a8a" />
          {/* Right bucket */}
          <line  x1={12} y1={6.2} x2={12} y2={10} stroke="#5a4028" strokeWidth={0.5} />
          <rect  x={9.5} y={10} width={5} height={4} fill="#6a4a28" />
          <rect  x={9.5} y={10} width={5} height={0.8} fill="#8a6a48" />
          <ellipse cx={12} cy={10.2} rx={2.5} ry={0.6} fill="#3a6a8a" />
        </g>

        {/* Woman gathered around a small cookfire with a pot */}
        <g transform="translate(372, 180)">
          <PixelPerson x={0} y={0} scale={0.85} variant="civilian" {...ELDER_WOMEN_PALETTES[1]}
            mood="neutral" sway="idle" swayDelay={0.3} mirror />
          {/* Small fire ring with stones */}
          <ellipse cx={-9} cy={14} rx={6} ry={1.3} fill="#3a2810" opacity={0.7} />
          <rect x={-12} y={13} width={2} height={2} fill="#7a6a58" />
          <rect x={-10} y={13.3} width={2} height={1.8} fill="#8a7a68" />
          <rect x={-8}  y={13}   width={2} height={2} fill="#7a6a58" />
          <rect x={-6}  y={13.3} width={2} height={1.8} fill="#8a7a68" />
          {/* Flames */}
          <polygon points="-11,13 -10,10 -9,12 -8,9 -7,12 -6,10 -5,13" fill="#ff9030" />
          <polygon points="-10,13 -9,11.2 -8,12.3 -7,10.8 -6,13" fill="#ffd050" opacity={0.85} />
          {/* Small pot suspended over it on a tripod */}
          <line x1={-13} y1={13} x2={-9} y2={7}  stroke="#3a2810" strokeWidth={0.4} />
          <line x1={-5}  y1={13} x2={-9} y2={7}  stroke="#3a2810" strokeWidth={0.4} />
          <ellipse cx={-9} cy={9}  rx={2.5} ry={0.7} fill="#2a2a2a" />
          <rect    x={-11.5} y={9} width={5} height={3} fill="#3a3a3a" />
          <ellipse cx={-9} cy={12} rx={2.5} ry={0.7} fill="#1a1a1a" />
        </g>

        {/* Small boy walking his toddler sister by the hand, back of camp */}
        <g transform="translate(230, 142)">
          <PixelPerson x={0} y={0} scale={0.72} variant="civilian"
            color="#e8b896" shirtColor="#3a7aaa" pantsColor="#2a1a10"
            hairColor="#1a0a04" accentColor="#ffcf5c"
            mood="neutral" sway="idle" swayDelay={0.2} />
        </g>
        <g transform="translate(240, 144)">
          <PixelPerson x={0} y={0} scale={0.6} variant="civilian"
            color="#f0c8a0" shirtColor="#e8c858" pantsColor="#3a2818"
            hairColor="#1a0a04" accentColor="#c85a6a"
            mood="happy" sway="idle" swayDelay={0.5} />
        </g>

        {/* Distant figure walking between back tents (small scale = far away) */}
        <g transform="translate(90, 128)">
          <PixelPerson x={0} y={0} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[5]}
            mood="neutral" sway="idle" swayDelay={0.7} />
        </g>
        <g transform="translate(418, 130)">
          <PixelPerson x={0} y={0} scale={0.7} variant="civilian" {...WOMEN_PALETTES[2]}
            mood="neutral" sway="idle" swayDelay={1.0} mirror />
        </g>

        {/* Background: a few barrels / supply crates by the tents */}
        <g transform="translate(225, 180)">
          <ellipse cx="0" cy="8" rx="6" ry="1.5" fill="#4a3a20" />
          <rect    x="-6" y="-2" width="12" height="10" fill="#7a5230" />
          <rect    x="-6" y="-2" width="12" height="1" fill="#9a7248" />
          <rect    x="-6" y="3"  width="12" height="0.8" fill="#4a3a20" opacity="0.6" />
        </g>
        <g transform="translate(248, 183)">
          <rect x="-5" y="-1" width="10" height="8" fill="#6a5028" />
          <rect x="-5" y="-1" width="10" height="1" fill="#8a6a48" />
          <line x1="-5" y1="3" x2="5" y2="3" stroke="#4a3a20" strokeWidth="0.5" />
        </g>
        <g transform="translate(130, 176)">
          <ellipse cx="0" cy="8" rx="7" ry="1.8" fill="#4a3a20" />
          <rect    x="-7" y="-2" width="14" height="10" fill="#8a6240" />
          <rect    x="-7" y="-2" width="14" height="1" fill="#b08862" />
          <rect    x="-7" y="3"  width="14" height="0.8" fill="#4a3a20" opacity="0.6" />
        </g>

        {/* Vignette */}
        <rect x="0" y="0"   width="500" height="20" fill="#000" opacity="0.2" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.3" />
      </svg>
    </div>
  );
}
