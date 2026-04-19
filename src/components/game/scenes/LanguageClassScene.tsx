import { PixelPerson } from './PixelPeople';

/**
 * Language Class — inside a canvas tent at the refugee camp. A
 * teacher stands beside a chalkboard covered in deliberately
 * unreadable squiggles (the language is left vague on purpose), and
 * rows of refugee students — men, women, and children of varied
 * appearance — sit on wooden benches and on the floor with their
 * backs to the camera, listening attentively.
 */

/**
 * A sitting student seen from behind. Hair dominates the silhouette;
 * skin shows at the ears and neck; shirt wraps the shoulders. A
 * slightly larger shoulder rect under the head gives the impression
 * of a rounded back. Scale and hair style vary per student so the
 * class doesn't read as a row of clones.
 */
interface StudentBackProps {
  x: number;
  y: number;
  shirt: string;
  hair?: string;
  skin?: string;
  scale?: number;
  hairStyle?: 'short' | 'medium' | 'long' | 'bun' | 'tuft';
  delay?: number;
}
function StudentBack({
  x, y,
  shirt,
  hair = '#1a0a04',
  skin = '#c4956a',
  scale = 1,
  hairStyle = 'short',
  delay = 0,
}: StudentBackProps) {
  const s = scale;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g
        className="lc-listen"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* === SHOULDERS + BACK === */}
        <rect x={-6 * s} y={-3 * s} width={12 * s} height={9 * s}  fill={shirt} />
        <rect x={-6 * s} y={-3 * s} width={12 * s} height={0.8 * s} fill="#000" opacity={0.22} />
        {/* Spine/back shading */}
        <rect x={-0.5 * s} y={-3 * s} width={1 * s} height={9 * s} fill="#000" opacity={0.08} />

        {/* === NECK (skin) === */}
        <rect x={-1.5 * s} y={-4 * s} width={3 * s} height={2 * s} fill={skin} />

        {/* === HEAD === skin base first, then hair on top === */}
        <rect x={-4 * s} y={-12 * s} width={8 * s} height={8 * s} fill={skin} />
        {/* Ears */}
        <rect x={-5 * s}   y={-8 * s}  width={1 * s} height={1.8 * s} fill={skin} />
        <rect x={4 * s}    y={-8 * s}  width={1 * s} height={1.8 * s} fill={skin} />

        {/* === HAIR (varies by style) === */}
        {hairStyle === 'short' && (
          <>
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={6.5 * s} fill={hair} />
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={1.2 * s} fill="#000" opacity={0.3} />
          </>
        )}
        {hairStyle === 'medium' && (
          <>
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={7.5 * s} fill={hair} />
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={1.2 * s} fill="#000" opacity={0.3} />
          </>
        )}
        {hairStyle === 'long' && (
          <>
            {/* Hair flowing down past shoulders */}
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={7.5 * s} fill={hair} />
            <rect x={-5 * s} y={-5 * s}  width={10 * s} height={7 * s} fill={hair} />
            <rect x={-5 * s} y={-5 * s}  width={10 * s} height={0.8 * s} fill="#000" opacity={0.3} />
            {/* Hair highlight down the back */}
            <rect x={-0.5 * s} y={-5 * s} width={1 * s} height={6 * s} fill="#000" opacity={0.2} />
          </>
        )}
        {hairStyle === 'bun' && (
          <>
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={6.5 * s} fill={hair} />
            {/* Bun on back of head */}
            <ellipse cx={0} cy={-11.5 * s} rx={2.8 * s} ry={2 * s} fill={hair} />
            <ellipse cx={-0.8 * s} cy={-12 * s} rx={1.2 * s} ry={0.8 * s} fill="#000" opacity={0.25} />
          </>
        )}
        {hairStyle === 'tuft' && (
          <>
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={6.5 * s} fill={hair} />
            {/* Tuft spikes on top */}
            <rect x={-2 * s} y={-13 * s} width={1.5 * s} height={1.5 * s} fill={hair} />
            <rect x={1 * s}  y={-13 * s} width={1.5 * s} height={1.5 * s} fill={hair} />
            <rect x={-4 * s} y={-12 * s} width={8 * s} height={1.2 * s} fill="#000" opacity={0.3} />
          </>
        )}
      </g>
    </g>
  );
}

export function LanguageClassScene() {
  // A curated cast — deliberately varied in age, gender, shirt color,
  // hair color, hair style, and size. Back-row = small (further away),
  // mid-row = medium, front-row floor-sitters = smallest (children).
  const backRow = [
    { x: 98,  shirt: '#4a3828', skin: '#c4956a', hair: '#0a0404', hairStyle: 'short'  as const, scale: 0.8 },
    { x: 130, shirt: '#a83030', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.8 },
    { x: 162, shirt: '#7a4a28', skin: '#d8a880', hair: '#1a0a04', hairStyle: 'short'  as const, scale: 0.85 },
    { x: 194, shirt: '#c85a6a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.8 },
    { x: 226, shirt: '#4a6a8a', skin: '#c4956a', hair: '#1a0a04', hairStyle: 'tuft'   as const, scale: 0.8 },
    { x: 258, shirt: '#d8a848', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'bun'    as const, scale: 0.8 },
    { x: 290, shirt: '#3a5a48', skin: '#c4956a', hair: '#1a0a04', hairStyle: 'medium' as const, scale: 0.85 },
    { x: 322, shirt: '#8a5a9a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.8 },
    { x: 354, shirt: '#6a4028', skin: '#d8a880', hair: '#a0a090', hairStyle: 'short'  as const, scale: 0.8 }, // elder with gray hair
    { x: 386, shirt: '#3a8890', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'bun'    as const, scale: 0.8 },
  ];

  const midRow = [
    { x: 78,  shirt: '#5a6a7a', skin: '#c4956a', hair: '#1a0a04', hairStyle: 'short'  as const, scale: 1 },
    { x: 114, shirt: '#c85a6a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.95 },
    { x: 150, shirt: '#4a3828', skin: '#d8a880', hair: '#0a0404', hairStyle: 'short'  as const, scale: 1 },
    { x: 186, shirt: '#3a8890', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'bun'    as const, scale: 0.95 },
    { x: 222, shirt: '#6a4848', skin: '#c4956a', hair: '#1a0a04', hairStyle: 'medium' as const, scale: 1 },
    { x: 258, shirt: '#d8a848', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.95 },
    { x: 294, shirt: '#4a6a8a', skin: '#c4956a', hair: '#1a0a04', hairStyle: 'tuft'   as const, scale: 1 },
    { x: 330, shirt: '#8a5a9a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.95 },
    { x: 366, shirt: '#5a4a38', skin: '#c4956a', hair: '#a0a090', hairStyle: 'short'  as const, scale: 1 }, // gray-haired elder
    { x: 402, shirt: '#a83030', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'bun'    as const, scale: 0.95 },
  ];

  const frontRow = [
    { x: 62,  shirt: '#3a7aaa', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'short'  as const, scale: 0.7 },
    { x: 92,  shirt: '#d8a848', skin: '#e8b896', hair: '#1a0a04', hairStyle: 'tuft'   as const, scale: 0.7 },
    { x: 122, shirt: '#c85a6a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.72 },
    { x: 152, shirt: '#4a6a8a', skin: '#e8b896', hair: '#0a0404', hairStyle: 'short'  as const, scale: 0.7 },
    { x: 182, shirt: '#6a5a5a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.75 },
    { x: 213, shirt: '#3a8890', skin: '#e8b896', hair: '#1a0a04', hairStyle: 'short'  as const, scale: 0.7 },
    { x: 243, shirt: '#a83030', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'tuft'   as const, scale: 0.7 },
    { x: 273, shirt: '#8a5a9a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'bun'    as const, scale: 0.72 },
    { x: 303, shirt: '#4a5a38', skin: '#e8b896', hair: '#1a0a04', hairStyle: 'short'  as const, scale: 0.7 },
    { x: 333, shirt: '#d8a848', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.72 },
    { x: 365, shirt: '#c85a6a', skin: '#f0c8a0', hair: '#0a0404', hairStyle: 'long'   as const, scale: 0.75 },
    { x: 397, shirt: '#3a5a8a', skin: '#e8b896', hair: '#1a0a04', hairStyle: 'short'  as const, scale: 0.7 },
    { x: 427, shirt: '#6a4028', skin: '#c4956a', hair: '#0a0404', hairStyle: 'tuft'   as const, scale: 0.7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#2a1e10] via-[#3a2e1c] to-[#2a1c10]">
      <style>{`
        @keyframes lc-listen {
          0%, 100% { transform: translateY(0)     rotate(-0.5deg); }
          50%      { transform: translateY(-0.5px) rotate(0.5deg); }
        }
        @keyframes lc-point {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(2.5deg); }
        }
        @keyframes lc-chalk-drift {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          100%     { transform: translateY(-12px); opacity: 0; }
        }
        @keyframes lc-canvas-sway {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50%      { transform: translateX(0.3px) scaleY(1.003); }
        }
        .lc-listen  { animation: lc-listen 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .lc-point   { animation: lc-point 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 0px 50%; }
        .lc-canvas  { animation: lc-canvas-sway 6s ease-in-out infinite; transform-box: fill-box; transform-origin: top center; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Background — fully enclosed tent back wall === */}
        <rect x="0" y="0" width="500" height="280" fill="#2a1e10" />
        {/* Canvas back wall — stops at y=172 so the back bench has visible
            floor under it and the students don't appear to float. */}
        <rect x="0" y="22" width="500" height="150" fill="#7a5e38" />
        {/* Darker band along the top of the wall, just under the ridge */}
        <rect x="0"   y="22" width="500" height="6"   fill="#6a4e28" />
        <rect x="0"   y="22" width="500" height="2"   fill="#5a4020" />
        {/* A couple of faint vertical seams / canvas crease lines */}
        <line x1="140" y1="22"  x2="140" y2="172" stroke="#5a4028" strokeWidth="0.4" opacity="0.5" />
        <line x1="250" y1="22"  x2="250" y2="172" stroke="#5a4028" strokeWidth="0.4" opacity="0.45" />
        <line x1="360" y1="22"  x2="360" y2="172" stroke="#5a4028" strokeWidth="0.4" opacity="0.5" />
        {/* Soft lantern glow on the back wall behind the blackboard */}
        <ellipse cx="250" cy="95" rx="150" ry="50" fill="#c89868" opacity="0.18" />
        {/* Wall-to-floor baseboard — dark shadow line where the back wall
            meets the sandy floor behind the back row. */}
        <rect x="0" y="170" width="500" height="2" fill="#3a2410" opacity="0.6" />

        {/* === Sloped tent ceiling — trapezoidal canvas panels === */}
        <g className="lc-canvas">
          {/* Front-left ceiling drape */}
          <polygon points="0,0 0,90 175,40 175,0" fill="#a88858" />
          <polygon points="0,0 0,90 175,40 175,0" fill="none" stroke="#5a4028" strokeWidth="0.8" />
          {/* Shadow crease */}
          <polygon points="60,10 175,40 175,0 60,0" fill="#8a6a40" opacity="0.6" />
          {/* Front-right ceiling drape */}
          <polygon points="500,0 500,90 325,40 325,0" fill="#a88858" />
          <polygon points="500,0 500,90 325,40 325,0" fill="none" stroke="#5a4028" strokeWidth="0.8" />
          <polygon points="440,10 325,40 325,0 440,0" fill="#8a6a40" opacity="0.6" />
          {/* Top canvas bar / ridge */}
          <rect x="0" y="0" width="500" height="22" fill="#8a6a40" />
          <rect x="0" y="0" width="500" height="3"  fill="#6a4a28" />
          <rect x="0" y="20" width="500" height="2" fill="#5a3a20" opacity="0.7" />
          {/* Ridge-pole outline at top */}
          <rect x="0" y="22" width="500" height="1.2" fill="#3a2410" />
          {/* Vertical crease lines in canvas */}
          <line x1="60"  y1="0" x2="80"  y2="50" stroke="#6a4a28" strokeWidth="0.4" opacity="0.6" />
          <line x1="110" y1="0" x2="130" y2="45" stroke="#6a4a28" strokeWidth="0.4" opacity="0.6" />
          <line x1="390" y1="0" x2="370" y2="45" stroke="#6a4a28" strokeWidth="0.4" opacity="0.6" />
          <line x1="440" y1="0" x2="420" y2="50" stroke="#6a4a28" strokeWidth="0.4" opacity="0.6" />
        </g>

        {/* === Tent side walls === */}
        <rect x="0"   y="90" width="40" height="175" fill="#7a5e38" />
        <rect x="0"   y="90" width="40" height="4"   fill="#5a4028" />
        <rect x="460" y="90" width="40" height="175" fill="#7a5e38" />
        <rect x="460" y="90" width="40" height="4"   fill="#5a4028" />
        {/* Wall wrinkles */}
        <line x1="18" y1="90" x2="18" y2="265" stroke="#5a4028" strokeWidth="0.4" opacity="0.4" />
        <line x1="478" y1="90" x2="478" y2="265" stroke="#5a4028" strokeWidth="0.4" opacity="0.4" />
        {/* Tent flap lashing ropes */}
        <line x1="40"  y1="40" x2="60"  y2="270" stroke="#4a3020" strokeWidth="0.6" opacity="0.65" />
        <line x1="460" y1="40" x2="440" y2="270" stroke="#4a3020" strokeWidth="0.6" opacity="0.65" />

        {/* Vertical tent support poles */}
        <rect x="39"  y="22" width="2.5" height="250" fill="#3a2810" />
        <rect x="39"  y="22" width="1"   height="250" fill="#5a3a18" />
        <rect x="459" y="22" width="2.5" height="250" fill="#3a2810" />
        <rect x="459" y="22" width="1"   height="250" fill="#5a3a18" />

        {/* === Floor — sandy/dirt ===
            Extends up to y=172 so the back bench rests on visible ground
            instead of hanging in the back wall. */}
        <rect x="0" y="172" width="500" height="108" fill="#c8a878" />
        {/* Slight depth gradient toward the back of the floor */}
        <rect x="0" y="172" width="500" height="10"  fill="#b89068" opacity="0.55" />
        <rect x="0" y="172" width="500" height="3"   fill="#a88858" />
        {/* Sand banding spread across the wider floor */}
        {[184, 196, 208, 222, 236, 250, 264].map((y) => (
          <line key={`floor-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#b89068" strokeWidth="0.35" opacity="0.45" />
        ))}
        {/* Pebbles scattered across the whole floor */}
        {[{x:70,y:186},{x:190,y:200},{x:320,y:192},{x:430,y:214},
          {x:60,y:252},{x:180,y:244},{x:325,y:262},{x:440,y:254}].map((p, pi) => (
          <ellipse key={`pebble-${pi}`} cx={p.x} cy={p.y} rx={1.2} ry={0.5}
            fill="#8a6848" opacity="0.7" />
        ))}

        {/* === Blackboard on a wooden easel === */}
        <g transform="translate(250, 100)">
          {/* Easel legs behind the board */}
          <rect x={-46} y={40} width={2} height={30} fill="#4a2e18" transform="rotate(-10 -45 40)" />
          <rect x={44}  y={40} width={2} height={30} fill="#4a2e18" transform="rotate(10 45 40)" />
          {/* Wooden frame */}
          <rect x={-70} y={-36} width={140} height={82} fill="#5a3818" />
          <rect x={-70} y={-36} width={140} height={4}  fill="#7a5028" />
          <rect x={-70} y={42}  width={140} height={4}  fill="#3a2010" />
          <rect x={-70} y={-36} width={4}   height={82} fill="#6a4220" />
          <rect x={66}  y={-36} width={4}   height={82} fill="#3a2010" />
          {/* Board surface */}
          <rect x={-66} y={-32} width={132} height={74} fill="#2a382a" />
          <rect x={-66} y={-32} width={132} height={2}  fill="#1a2418" />
          {/* Faint chalk smears */}
          <rect x={-58} y={34}  width={42}  height={1}  fill="#d0cfc0" opacity={0.35} />
          <rect x={20}  y={30}  width={38}  height={1.2} fill="#d0cfc0" opacity={0.3} />
          {/* Chalk tray */}
          <rect x={-68} y={42}  width={136} height={2.5} fill="#3a2818" />
          {/* Chalk piece sitting on the tray */}
          <rect x={-6}  y={40.7} width={4}   height={1.3} fill="#f0ece0" />
          <rect x={-6}  y={40.7} width={4}   height={0.4} fill="#ffffff" />
          {/* Wooden eraser */}
          <rect x={45}  y={40.4} width={12}  height={1.8} fill="#8a5a38" />
          <rect x={45}  y={41.2} width={12}  height={0.6} fill="#5a3a20" />

          {/* === Deliberately unreadable chalk writing === Vague
              squiggles, runes, dots, curls — NOT recognizable as any
              particular alphabet. */}
          <g stroke="#e8e8d0" strokeWidth="0.8" strokeLinecap="round" fill="none">
            {/* Title bar */}
            <path d="M -52 -24 q 4 -2 8 0" />
            <path d="M -38 -24 h 6" />
            <path d="M -28 -26 l 2 2 l 2 -2 l 2 2" />
            <path d="M -16 -24 q 3 -2 5 0 t 5 0" />
            <path d="M -2  -26 h 5" />
            <path d="M 6   -24 q 2 -2 4 0" />
            <path d="M 14  -26 l 3 2 l 3 -2" />
            <path d="M 24  -24 h 6" />
            <path d="M 34  -26 l 2 2 l 2 -2" />
            <path d="M 42  -24 h 5" />
            {/* Line 2 */}
            <path d="M -55 -12 h 4" />
            <path d="M -48 -12 q 2 -2 4 0" />
            <path d="M -40 -14 l 2 2 l 2 -2 l 2 2" />
            <path d="M -28 -12 h 5" />
            <path d="M -20 -13 l 2 3 l 2 -3 l 2 3" />
            <path d="M -9  -12 h 3" />
            <path d="M -3  -13 q 3 -1 6 0" />
            <path d="M 8   -12 h 4" />
            <path d="M 15  -12 q 2 -3 4 0" />
            <path d="M 23  -13 l 2 2 l 2 -2 l 2 2" />
            <path d="M 35  -12 h 5" />
            <path d="M 44  -12 q 2 -2 4 0" />
            {/* Line 3 */}
            <path d="M -55 0 h 5" />
            <path d="M -47 -1 l 3 2 l 3 -2" />
            <path d="M -36 0 h 3" />
            <path d="M -30 -2 q 4 -2 7 0" />
            <path d="M -20 0 l 2 -2 l 2 2 l 2 -2" />
            <path d="M -10 0 h 4" />
            <path d="M -4  -1 q 3 -2 6 0" />
            <path d="M 6   0 h 6" />
            <path d="M 15  -2 l 2 2 l 2 -2 l 2 2" />
            <path d="M 25  0 h 3" />
            <path d="M 31  -1 q 3 -2 6 0" />
            <path d="M 41  0 h 4" />
            {/* Line 4 — mid-sentence with a diagram */}
            <path d="M -55 12 h 5" />
            <path d="M -47 11 q 2 -2 4 0" />
            <path d="M -40 13 l 2 -2 l 2 2" />
            <path d="M -32 12 h 6" />
            <path d="M -24 11 l 3 2 l 3 -2" />
            <path d="M -14 12 h 4" />
            <path d="M -8  12 q 2 -2 4 0" />
            <path d="M 0   12 h 5" />
            {/* Small diagram (arrow + labelled box) */}
            <path d="M 14 8 h 14 v 10 h -14 z" />
            <path d="M 30 13 h 8 m -2 -2 l 2 2 l -2 2" />
            <circle cx={46} cy={13} r={3} />
            <path d="M 43 16 l 2 3 l 2 -3 l 2 3" />
          </g>
          {/* Underline under a "keyword" */}
          <rect x={-18} y={15} width={14} height={0.8} fill="#e8e8d0" opacity={0.9} />

          {/* A faint drifting chalk dust puff near where the teacher points */}
          <g style={{ animation: 'lc-chalk-drift 3s ease-out infinite' }}>
            <circle cx={52} cy={16} r={0.6} fill="#e8e8d0" opacity={0.7} />
            <circle cx={54} cy={14} r={0.4} fill="#e8e8d0" opacity={0.5} />
            <circle cx={51} cy={12} r={0.5} fill="#e8e8d0" opacity={0.4} />
          </g>
        </g>

        {/* === Teacher standing to the right of the blackboard ===
            With civilian sprite 13 rows tall × (2·scale) per row, placing
            the group at y = floorTop − 13·(2·1.1) = 172 − 28.6 ≈ 143 makes
            the boots sit exactly on the floor at y = 172. */}
        <g transform="translate(346, 143)">
          <PixelPerson x={0} y={0} scale={1.1} variant="civilian"
            color="#e8b896" shirtColor="#4a6a8a" pantsColor="#2a2018"
            hairColor="#0a0404" accentColor="#8a7050"
            mood="determined" sway="idle" />
        </g>

        {/* === Second instructor / translator on the left side of the board ===
            Same logic: y = 172 − 13·(2·1.0) = 146 so the feet touch down. */}
        <g transform="translate(156, 146)">
          <PixelPerson x={0} y={0} scale={1.0} variant="civilian"
            color="#f0c8a0" shirtColor="#e8dcc0" pantsColor="#3a2a18"
            hairColor="#1a0a04" accentColor="#a83030"
            mood="neutral" sway="idle" swayDelay={0.4} mirror />
        </g>

        {/* === Back row bench === */}
        <g>
          <rect x="85"  y="166" width="330" height="3" fill="#6a4028" />
          <rect x="85"  y="166" width="330" height="0.8" fill="#8a5a38" />
          <rect x="95"  y="169" width="3" height="8" fill="#4a2810" />
          <rect x="205" y="169" width="3" height="8" fill="#4a2810" />
          <rect x="305" y="169" width="3" height="8" fill="#4a2810" />
          <rect x="407" y="169" width="3" height="8" fill="#4a2810" />
        </g>
        {backRow.map((st, i) => (
          <StudentBack key={`r1-${i}`} {...st} y={166} delay={i * 0.22} />
        ))}

        {/* === Middle row bench === */}
        <g>
          <rect x="60"  y="204" width="380" height="3.5" fill="#6a4028" />
          <rect x="60"  y="204" width="380" height="0.9" fill="#8a5a38" />
          <rect x="70"  y="207.5" width="3.5" height="12" fill="#4a2810" />
          <rect x="200" y="207.5" width="3.5" height="12" fill="#4a2810" />
          <rect x="300" y="207.5" width="3.5" height="12" fill="#4a2810" />
          <rect x="430" y="207.5" width="3.5" height="12" fill="#4a2810" />
        </g>
        {midRow.map((st, i) => (
          <StudentBack key={`r2-${i}`} {...st} y={203} delay={i * 0.22 + 0.1} />
        ))}

        {/* === Front row on the floor (children, no bench) === */}
        {frontRow.map((st, i) => (
          <StudentBack key={`r3-${i}`} {...st} y={246} delay={i * 0.18 + 0.05} />
        ))}
        {/* A reed mat under the front row */}
        <rect x={52} y={254} width={400} height={2.2} fill="#a88858" opacity={0.6} />
        <rect x={52} y={256} width={400} height={1}   fill="#8a6838" opacity={0.4} />

        {/* === Subtle warm sunlight shafts through the tent opening === */}
        <polygon points="175,30 240,30 210,200 150,210" fill="#f8e8a8" opacity="0.07" />
        <polygon points="325,30 260,30 290,200 350,210" fill="#f8e8a8" opacity="0.07" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="20" fill="#000" opacity="0.35" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.35" />
      </svg>
    </div>
  );
}
