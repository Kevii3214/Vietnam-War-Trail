import { PixelPerson } from './PixelPeople';
import {
  PROTAGONIST, MOTHER, CHILD, GRANDFATHER, FELLOW_PASSENGERS,
} from './characterPalettes';

/**
 * A Sick Passenger — interior of the boat's hold. The grandfather has
 * fallen ill with fever; he shivers under a thin blanket. A wet cloth
 * on his forehead. The protagonist kneels beside him with a bucket of
 * water; the mother shields the child; other passengers keep their
 * distance. A single lantern swings and flickers with the roll of the sea.
 */
export function SickPassengerScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a1208] via-[#2a1a0a] to-[#0a0604]">
      <style>{`
        @keyframes sp-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes sp-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: sp-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: sp-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes sp-shiver {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-1px); }
          75%      { transform: translateX(1px); }
        }
        @keyframes sp-breath {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.08); }
        }
        @keyframes sp-lamp-flicker {
          0%, 100% { opacity: 0.8; }
          40%      { opacity: 0.5; }
          60%      { opacity: 0.95; }
          85%      { opacity: 0.6; }
        }
        @keyframes sp-lamp-swing {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        @keyframes sp-boat-rock {
          0%, 100% { transform: rotate(-0.5deg); }
          50%      { transform: rotate(0.5deg); }
        }
        @keyframes sp-sweat-drop {
          0%   { transform: translateY(0); opacity: 0.85; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes sp-halo-pulse {
          0%, 100% { opacity: 0.08; }
          50%      { opacity: 0.15; }
        }
        @keyframes sp-hand-dab {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }

        .sp-shiver       { animation: sp-shiver 0.3s ease-in-out infinite; }
        .sp-breath       { animation: sp-breath 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center center; }
        .sp-lamp-flicker { animation: sp-lamp-flicker 2s ease-in-out infinite; }
        .sp-lamp-swing   { animation: sp-lamp-swing 4.4s ease-in-out infinite; transform-origin: top center; }
        .sp-boat-rock    { animation: sp-boat-rock 4.4s ease-in-out infinite; transform-origin: center bottom; }
        .sp-sweat-drop   { animation: sp-sweat-drop 2s ease-in infinite; }
        .sp-halo-pulse   { animation: sp-halo-pulse 2s ease-in-out infinite; }
        .sp-hand-dab     { animation: sp-hand-dab 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        <g className="sp-boat-rock">
          {/* Wooden plank wall texture */}
          <rect x="0" y="0" width="500" height="280" fill="#2a1a0a" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <g key={`plank-${i}`}>
              <rect x={0} y={i * 24} width={500} height={24}
                fill={i % 2 === 0 ? '#2a1a0a' : '#241808'} />
              <rect x={0} y={i * 24 + 23} width={500} height={1}
                fill="#140a04" opacity="0.7" />
              {/* Knot texture */}
              {i % 3 === 0 && (
                <ellipse cx={60 + i * 47} cy={i * 24 + 10} rx={3} ry={1.5}
                  fill="#180a04" opacity="0.5" />
              )}
            </g>
          ))}
          {/* Iron bracket on wall */}
          <rect x={390} y={60} width={18} height={3} fill="#1a1410" />
          <rect x={390} y={60} width={3} height={30} fill="#1a1410" />

          {/* Global darkness overlay */}
          <rect x="0" y="0" width="500" height="280" fill="#000" opacity="0.4" />

          {/* === Hanging lantern — swinging with boat roll === */}
          <g transform="translate(250, 20)" className="sp-lamp-swing">
            {/* Chain */}
            <rect x="-0.5" y="0" width="1" height="20" fill="#3a2a18" />
            {[4, 10, 16].map((ly, i) => (
              <rect key={`link-${i}`} x="-1.5" y={ly} width="3" height="1.5" fill="#3a2a18" />
            ))}
            {/* Lantern body */}
            <rect x="-7" y="20" width="14" height="14" fill="#6a4a2a" />
            <rect x="-7" y="20" width="14" height="2" fill="#8a6a40" />
            <rect x="-7" y="32" width="14" height="2" fill="#4a2e18" />
            {/* Flame */}
            <g className="sp-lamp-flicker">
              <rect x="-4" y="22" width="8" height="10" fill="#ffcc66" opacity="0.85" />
              <rect x="-2" y="18" width="4" height="6" fill="#ff9944" opacity="0.7" />
              <rect x="-1" y="14" width="2" height="5" fill="#ffd888" opacity="0.6" />
            </g>
            {/* Halos */}
            <circle cx="0" cy="28" r="50" fill="#ffaa44" className="sp-halo-pulse" />
            <circle cx="0" cy="28" r="90" fill="#ffaa44" opacity="0.04" />
            <circle cx="0" cy="28" r="140" fill="#ffaa44" opacity="0.02" />
          </g>

          {/* === The sick grandfather — CENTERED, lying down ===
              No more shiver/shake animation (user request). Instead
              of drawing him as an elongated manual figure, we use
              the canonical PixelPerson sprite from the refugee
              palette and rotate it -90 degrees so the character lies
              on his back with his HEAD on the LEFT and FEET on the
              RIGHT. The triple-nested transform reads right-to-left:
                1. translate(-9, -13)   — shift sprite so its
                   bounding-box center sits at local (0,0)
                2. rotate(-90)          — spin 90 degrees to the
                   left (counter-clockwise) so he's horizontal
                3. translate(250, 180)  — place the center of the
                   lying body at the middle of the scene.
              Only the shallow sp-breath animation remains on the
              blanket; the character himself uses sway="idle" so he
              reads as motionless / unconscious. */}
          <g transform="translate(250, 180)">
            <g transform="rotate(-90) translate(-9, -13)">
              <PixelPerson x={0} y={0} scale={1.15} variant="civilian" {...GRANDFATHER}
                mood="weary" sway="idle" />
            </g>
            {/* Blanket draped across his torso and legs — drawn in
                world space (post-rotation) so it looks like a
                horizontal blanket covering the lower body. The head
                sticks out on the left. */}
            <g className="sp-breath">
              <rect x="-6" y="-7" width="24" height="14" fill="#3a4a5a" opacity="0.9" />
              <rect x="-6" y="-7" width="24" height="2"  fill="#4a5a6a" opacity="0.6" />
              <rect x="-6" y="5"  width="24" height="1"  fill="#2a3a4a" opacity="0.8" />
              {/* Fold suggesting legs beneath */}
              <rect x="6"  y="-1" width="12" height="0.8" fill="#2a3a4a" opacity="0.5" />
            </g>
            {/* Wet cloth on forehead (head is on the LEFT side) */}
            <rect x="-20" y="-5" width="8" height="3" fill="#6a8a9a" />
            <rect x="-20" y="-4" width="8" height="1" fill="#8aaac0" opacity="0.7" />
            {/* Sweat beading on forehead */}
            <rect x="-18" y="-1" width="1.5" height="2" fill="#6aa0c0" opacity="0.8"
              className="sp-sweat-drop" />
            <rect x="-14" y="-2" width="1.5" height="2" fill="#6aa0c0" opacity="0.7"
              className="sp-sweat-drop" style={{ animationDelay: '0.7s' }} />
          </g>

          {/* Small water bucket between the protagonist and the
              sick grandfather — wooden, for wetting the cloth on
              his forehead. Shifted left with the protagonist so
              it sits between them rather than on grandfather's face. */}
          <g transform="translate(208, 184)">
            <rect x="0" y="0" width="16" height="12" fill="#4a2e18" />
            <rect x="0" y="0" width="16" height="2"  fill="#6a4428" />
            <rect x="0" y="10" width="16" height="2" fill="#2a1808" />
            <rect x="2" y="3" width="12" height="7" fill="#2a4a6a" />
            <rect x="2" y="3" width="12" height="1" fill="#4a7090" opacity="0.8" />
            <rect x="12" y="-1" width="7" height="4" fill="#8aaac0" opacity="0.85" />
          </g>

          {/* === Protagonist — kneeling a short distance from grandfather's head ===
              The extended "dabbing arm" + blue cloth rectangle that
              previously jutted out to the right has been removed
              (user request — it read as a floating arm). The
              protagonist now uses only the canonical PixelPerson
              sprite, with the sad expression doing the work of
              showing his worry. */}
          <g transform="translate(188, 162)">
            <g transform="rotate(-6)">
              <PixelPerson x={0} y={0} scale={1.15} variant="civilian" {...PROTAGONIST}
                mood="sad" sway="idle" />
            </g>
          </g>

          {/* === Mother shielding child, keeping a small distance === */}
          <g transform="translate(68, 168)">
            <PixelPerson x={0} y={0} scale={1.2} variant="civilian" {...MOTHER}
              mood="sad" sway="idle" swayDelay={0.3} />
            {/* Child tucked slightly behind */}
            <PixelPerson x={-13} y={8} scale={0.8} variant="civilian" {...CHILD}
              mood="scared" sway="scared" swayDelay={0.5} />
          </g>

          {/* === Other passengers — keeping distance, fearful === */}
          <PixelPerson
            x={310} y={150} scale={1.25} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="scared" sway="scared" swayDelay={0.2} mirror
          />
          <PixelPerson
            x={340} y={154} scale={1.1} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="weary" sway="idle" swayDelay={0.5} mirror
          />
          <PixelPerson
            x={374} y={158} scale={0.95} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="scared" sway="scared" swayDelay={0.8} mirror
          />
          <PixelPerson
            x={410} y={162} scale={0.9} variant="civilian" {...FELLOW_PASSENGERS[5]}
            mood="weary" sway="idle" swayDelay={1.1} mirror
          />

          {/* === Luggage & belongings crowding the hold ===
              Refugee families brought everything they could carry —
              cloth-wrapped bundles, wooden trunks, clay water jugs,
              sleeping mats, conical hats, sandals. The hold is packed
              with these household goods stuffed into every corner. */}

          {/* Left-corner pile: wooden trunk with a tied cloth bundle on top */}
          <g transform="translate(6, 208)">
            {/* Trunk body */}
            <rect x="0" y="0" width="44" height="20" fill="#3a2414" />
            <rect x="0" y="0" width="44" height="2"  fill="#5a3a20" />
            <rect x="0" y="18" width="44" height="2" fill="#1a0a04" />
            {/* Iron strapping */}
            <rect x="4"  y="0" width="2" height="20" fill="#2a1a0f" />
            <rect x="38" y="0" width="2" height="20" fill="#2a1a0f" />
            <rect x="0"  y="9" width="44" height="1.5" fill="#2a1a0f" />
            {/* Brass lock */}
            <rect x="20" y="8" width="4" height="4" fill="#8a6828" />
            <rect x="20" y="8" width="4" height="1" fill="#b08838" />
          </g>
          {/* Tied cloth bundle sitting on the trunk */}
          <g transform="translate(10, 186)">
            <ellipse cx="16" cy="14" rx="18" ry="10" fill="#6a4a2a" />
            <ellipse cx="16" cy="10" rx="16" ry="8"  fill="#8a6a40" />
            {/* Tied knot on top */}
            <rect x="13" y="0" width="6" height="6" fill="#5a3a18" />
            <rect x="11" y="3" width="10" height="2" fill="#3a2410" />
            {/* Patterned cloth stripes */}
            <line x1="2"  y1="12" x2="30" y2="12" stroke="#4a2e18" strokeWidth="0.6" opacity="0.7" />
            <line x1="4"  y1="16" x2="28" y2="16" stroke="#4a2e18" strokeWidth="0.6" opacity="0.6" />
          </g>
          {/* Smaller bundle tucked beside the trunk */}
          <g transform="translate(52, 214)">
            <ellipse cx="9" cy="8" rx="11" ry="6" fill="#5a4a3a" />
            <ellipse cx="9" cy="6" rx="9" ry="4.5" fill="#7a6a50" />
            <rect x="7" y="0" width="4" height="3.5" fill="#3a2a18" />
            <line x1="-1" y1="8" x2="19" y2="8" stroke="#2a1810" strokeWidth="0.5" opacity="0.6" />
          </g>

          {/* NOTE: the conical straw hat (nón lá) that used to hang
              on the wall at (96, 108) has been removed at the user's
              request. That patch of wall is now left bare (with just
              the plank texture) so the eye isn't drawn to a hat. */}

          {/* Rolled sleeping mat leaning in the mid-background */}
          <g transform="translate(122, 200)">
            <ellipse cx="6" cy="0" rx="6" ry="2.5" fill="#b0905a" />
            <rect x="0" y="0" width="12" height="26" fill="#a08450" />
            <rect x="0" y="0" width="12" height="1.5" fill="#c8a870" />
            <ellipse cx="6" cy="26" rx="6" ry="2.5" fill="#6a5230" />
            {/* Weave stripes along the length */}
            {[4, 9, 14, 19].map((sy, i) => (
              <line key={`mat-${i}`} x1="0" y1={sy} x2="12" y2={sy}
                stroke="#6a5230" strokeWidth="0.4" opacity="0.7" />
            ))}
            {/* Rope tied around it */}
            <rect x="-1" y="12" width="14" height="1.2" fill="#3a2a14" />
          </g>

          {/* A pair of sandals discarded near the sick man's feet */}
          <g transform="translate(240, 222)">
            <ellipse cx="5"  cy="2" rx="5.5" ry="1.8" fill="#3a2a18" />
            <rect x="4"  y="0.5" width="1" height="2" fill="#1a0a04" />
            <ellipse cx="14" cy="3" rx="5.5" ry="1.8" fill="#3a2a18" />
            <rect x="13" y="1.5" width="1" height="2" fill="#1a0a04" />
          </g>

          {/* Folded clothes resting on a small stool/box */}
          <g transform="translate(262, 208)">
            <rect x="0" y="8"  width="18" height="8" fill="#4a2e18" />
            <rect x="0" y="8"  width="18" height="1" fill="#6a4228" />
            {/* Folded cloth stack */}
            <rect x="2" y="4" width="14" height="3" fill="#3a5a7a" opacity="0.9" />
            <rect x="1" y="1" width="16" height="3" fill="#7a4a3a" opacity="0.9" />
            <rect x="2" y="1" width="14" height="0.8" fill="#9a6a50" opacity="0.8" />
          </g>

          {/* Small crate (original) */}
          <g transform="translate(286, 214)">
            <rect x="0" y="0" width="12" height="8" fill="#6a4a28" />
            <rect x="0" y="0" width="12" height="2" fill="#8a6a40" />
            <line x1="0" y1="3" x2="12" y2="3" stroke="#2a1808" strokeWidth="0.6" />
            {/* Rope handle */}
            <path d="M 2 0 Q 6 -3 10 0" fill="none" stroke="#3a2810" strokeWidth="0.6" />
          </g>

          {/* Clay water jug with a wooden lid */}
          <g transform="translate(308, 200)">
            {/* Body */}
            <ellipse cx="9" cy="14" rx="10" ry="6" fill="#6a3a28" />
            <path d="M 0 14 Q 0 6, 9 4 Q 18 6, 18 14 Z" fill="#7a4a34" />
            <path d="M 0 14 Q 0 6, 9 4 Q 18 6, 18 14" fill="none" stroke="#3a1a0e" strokeWidth="0.6" />
            {/* Neck */}
            <rect x="6" y="0" width="6" height="5" fill="#5a2a1c" />
            <rect x="5" y="0" width="8" height="1.5" fill="#3a1a0e" />
            {/* Wood stopper */}
            <rect x="5.5" y="-2" width="7" height="2.5" fill="#6a4a28" />
            <rect x="5.5" y="-2" width="7" height="0.8" fill="#8a6a40" />
            {/* Glaze highlight */}
            <path d="M 3 10 Q 3 7, 7 6" fill="none" stroke="#b07050" strokeWidth="0.6" opacity="0.7" />
          </g>

          {/* Original green tin/can (kept, bumped right) */}
          <g transform="translate(330, 214)">
            <rect x="0" y="0" width="14" height="9" fill="#3a4a3a" />
            <rect x="2" y="2" width="10" height="5" fill="#4a5a4a" />
          </g>

          {/* Wicker basket with clothes spilling out */}
          <g transform="translate(354, 202)">
            {/* Basket body */}
            <polygon points="0,20 2,6 22,6 24,20" fill="#8a6a30" />
            <polygon points="0,20 2,6 22,6 24,20" fill="none" stroke="#4a3a14" strokeWidth="0.6" />
            {/* Weave horizontal lines */}
            {[9, 12, 15, 18].map((wy, i) => (
              <line key={`wk-${i}`} x1={1 + (i * 0.3)} y1={wy} x2={23 - (i * 0.3)} y2={wy}
                stroke="#5a4214" strokeWidth="0.4" opacity="0.8" />
            ))}
            {/* Weave vertical warp */}
            {[6, 10, 14, 18].map((wx, i) => (
              <line key={`wkv-${i}`} x1={wx} y1={7} x2={wx} y2={19}
                stroke="#5a4214" strokeWidth="0.3" opacity="0.6" />
            ))}
            {/* Clothes overflowing */}
            <rect x="4" y="2" width="8" height="4" fill="#6a8aa0" opacity="0.9" />
            <rect x="11" y="3" width="10" height="3" fill="#b86048" opacity="0.9" />
            <rect x="9" y="1" width="5" height="2" fill="#d8c890" opacity="0.9" />
            {/* Rope handle */}
            <path d="M 5 6 Q 12 -2 19 6" fill="none" stroke="#3a2a14" strokeWidth="0.7" />
          </g>

          {/* Stack of folded blankets wedged in the far-right foreground */}
          <g transform="translate(384, 212)">
            <rect x="0" y="0" width="22" height="3" fill="#4a6a8a" />
            <rect x="0" y="3" width="22" height="3" fill="#7a4a3a" />
            <rect x="0" y="6" width="22" height="3" fill="#3a5a3a" />
            <rect x="0" y="0"  width="22" height="0.8" fill="#6a8aa0" opacity="0.7" />
            <rect x="0" y="3"  width="22" height="0.8" fill="#9a6a50" opacity="0.7" />
            <rect x="0" y="6"  width="22" height="0.8" fill="#5a7a5a" opacity="0.7" />
            {/* Fold lines */}
            <line x1="11" y1="0" x2="11" y2="9" stroke="#2a1a10" strokeWidth="0.4" opacity="0.6" />
          </g>

          {/* Original rice sack (bumped slightly) */}
          <g transform="translate(432, 204)">
            <rect x="0" y="0" width="22" height="16" fill="#b0a07a" opacity="0.85" />
            <rect x="0" y="0" width="22" height="2" fill="#c8b890" opacity="0.6" />
            <rect x="4" y="4" width="4" height="3" fill="#6a5a38" opacity="0.5" />
            {/* Stamped character/mark */}
            <rect x="12" y="6" width="1.5" height="4" fill="#4a3820" opacity="0.7" />
            <rect x="10" y="7" width="5.5" height="1.5" fill="#4a3820" opacity="0.7" />
            {/* Tied opening */}
            <rect x="8" y="-2" width="6" height="3" fill="#8a7858" />
            <rect x="10" y="-3" width="2" height="2" fill="#3a2a18" />
          </g>

          {/* Coiled rope hanging from the iron bracket on the wall */}
          <g transform="translate(392, 64)">
            <line x1="0" y1="0" x2="-2" y2="10" stroke="#6a5a3a" strokeWidth="0.6" />
            <ellipse cx="-4" cy="18"  rx="6" ry="2.5" fill="#6a5a3a" />
            <ellipse cx="-4" cy="15.5" rx="5" ry="2"   fill="#8a7a50" />
            <ellipse cx="-4" cy="13"   rx="4" ry="1.6" fill="#6a5a3a" />
            <ellipse cx="-4" cy="10.8" rx="3" ry="1.3" fill="#8a7a50" />
          </g>

          {/* Fishing net hanging on wall near the lantern */}
          <g transform="translate(340, 50)" opacity="0.8">
            <line x1="0" y1="0"  x2="0"  y2="18" stroke="#6a5a3a" strokeWidth="0.5" />
            <line x1="14" y1="0" x2="14" y2="18" stroke="#6a5a3a" strokeWidth="0.5" />
            {/* Net mesh */}
            {[0, 1, 2, 3, 4].map(r => (
              <g key={`net-r-${r}`}>
                <line x1={0} y1={4 + r * 3} x2={14} y2={4 + r * 3}
                  stroke="#8a7a50" strokeWidth="0.3" opacity="0.7" />
              </g>
            ))}
            {[3, 6, 9, 12].map(c => (
              <line key={`net-c-${c}`} x1={c} y1={4} x2={c} y2={16}
                stroke="#8a7a50" strokeWidth="0.3" opacity="0.7" />
            ))}
            <rect x="5" y="18" width="4" height="2" fill="#3a2a14" />
          </g>

          {/* Paper bundle tied with string (identity papers / letters) */}
          <g transform="translate(220, 220)">
            <rect x="0" y="0" width="14" height="5" fill="#d8c8a0" opacity="0.9" />
            <rect x="0" y="0" width="14" height="1" fill="#e8dcb8" opacity="0.85" />
            <rect x="1" y="5" width="13" height="2.5" fill="#c8b890" opacity="0.85" />
            {/* Twine wrap */}
            <rect x="3" y="-0.5" width="1.2" height="8.5" fill="#4a3618" />
            <rect x="9" y="-0.5" width="1.2" height="8.5" fill="#4a3618" />
          </g>

          {/* ===================================================== */}
          {/* === FOOD + WATER PROVISIONS (to last the trip)    === */}
          {/* ===================================================== */}

          {/* Wooden wall shelf — runs across the previously-empty
              mid-upper wall area so several floor items can be
              re-housed up there, filling the empty space above the
              passengers and breaking up the bottom-heavy clutter. */}
          <g>
            {/* Shelf plank */}
            <rect x="196" y="150" width="182" height="4" fill="#4a2e18" />
            <rect x="196" y="150" width="182" height="1" fill="#6a4228" />
            <rect x="196" y="153" width="182" height="1" fill="#1a0a04" />
            {/* Shelf brackets (triangular supports under each end) */}
            <polygon points="196,154 196,162 204,154" fill="#2a1808" />
            <polygon points="378,154 378,162 370,154" fill="#2a1808" />
            {/* Shadow cast by the shelf onto the wall below */}
            <rect x="196" y="154" width="182" height="3" fill="#000" opacity="0.35" />
          </g>

          {/* NOTE: the large earthenware water basin that sat on the
              wall shelf here has been removed at the user's
              request. The shelf now carries only the rice pot. */}

          {/* Earthenware rice pot with lid — hot food, steam rising.
              Also relocated UP onto the wall shelf (was at y=214 on
              the floor). Its body bottom (local y=16) lines up with
              the shelf top surface at world y=150. */}
          <g transform="translate(308, 134)">
            {/* Shadow */}
            <ellipse cx="10" cy="18" rx="12" ry="2.5" fill="#000" opacity="0.55" />
            {/* Pot body (clay) */}
            <path d="M -2 16 Q -2 6, 10 4 Q 22 6, 22 16 Z" fill="#5a2e1c" />
            <path d="M -2 16 Q -2 6, 10 4 Q 22 6, 22 16" fill="none"
              stroke="#2a1208" strokeWidth="0.6" />
            {/* Clay gloss highlight */}
            <path d="M 1 10 Q 1 6, 6 5" fill="none" stroke="#8a4828" strokeWidth="0.6" opacity="0.6" />
            {/* Lid */}
            <ellipse cx="10" cy="4" rx="11" ry="2" fill="#4a2614" />
            <ellipse cx="10" cy="4" rx="11" ry="2" fill="none"
              stroke="#2a1208" strokeWidth="0.6" />
            <rect x="8" y="-1" width="4" height="3" fill="#6a4428" />
            <rect x="8" y="-1" width="4" height="0.8" fill="#8a6440" />
            {/* Steam wisps — curling up */}
            <g className="sp-breath">
              <ellipse cx="10" cy="-4"  rx="3"   ry="2"   fill="#d0dce4" opacity="0.45" />
              <ellipse cx="11" cy="-8"  rx="2.5" ry="1.8" fill="#c0ccd8" opacity="0.3" />
              <ellipse cx="9"  cy="-12" rx="2"   ry="1.4" fill="#b0bcc8" opacity="0.2" />
            </g>
          </g>

          {/* Small rice bowl with chopsticks — someone's half-eaten meal */}
          <g transform="translate(200, 232)">
            <ellipse cx="8" cy="7" rx="9" ry="1.5" fill="#1a0a04" opacity="0.6" />
            <path d="M 0 6 Q 0 2, 8 1 Q 16 2, 16 6 Z" fill="#6a4a28" />
            <path d="M 0 6 Q 0 2, 8 1 Q 16 2, 16 6" fill="none"
              stroke="#2a1808" strokeWidth="0.5" />
            {/* Cooked rice mound */}
            <ellipse cx="8" cy="2" rx="6.5" ry="1.2" fill="#f0e0b8" />
            <ellipse cx="8" cy="1.8" rx="5" ry="0.7" fill="#fffad8" opacity="0.7" />
            {/* Chopsticks leaning in */}
            <rect x="9" y="-5" width="0.7" height="8" fill="#b0905a" transform="rotate(15, 9, 1)" />
            <rect x="11" y="-5" width="0.7" height="8" fill="#b0905a" transform="rotate(18, 11, 1)" />
          </g>

          {/* Bamboo tray of dried fish — long-keeping protein for the journey */}
          <g transform="translate(254, 192)">
            {/* Tray */}
            <rect x="0" y="2" width="32" height="8" fill="#8a6a30" />
            <rect x="0" y="2" width="32" height="1.5" fill="#b08838" />
            <rect x="0" y="9.5" width="32" height="1" fill="#4a3214" />
            {/* Weave detail */}
            {[4, 10, 16, 22, 28].map((wx, i) => (
              <line key={`tray-w-${i}`} x1={wx} y1={2} x2={wx} y2={10}
                stroke="#5a3e1a" strokeWidth="0.3" opacity="0.7" />
            ))}
            {/* Dried fish rows — silvery, shriveled */}
            {[{x:2,y:-1},{x:10,y:-1.5},{x:18,y:-1},{x:26,y:-1.4}].map((f, i) => (
              <g key={`fish-${i}`}>
                <ellipse cx={f.x + 2.5} cy={f.y + 2} rx="3" ry="1.2" fill="#8a7860" />
                <ellipse cx={f.x + 2.5} cy={f.y + 1.6} rx="2.6" ry="0.9" fill="#a89878" />
                {/* Tail */}
                <polygon points={`${f.x},${f.y + 2} ${f.x - 1.5},${f.y + 1} ${f.x - 1.5},${f.y + 3}`} fill="#6a5a3a" />
                {/* Eye */}
                <rect x={f.x + 4} y={f.y + 1.8} width="0.6" height="0.6" fill="#1a0a04" />
              </g>
            ))}
          </g>

          {/* Dried bananas / palm-leaf wrapped food bundles hanging on wall
              (replaces the empty patch where the conical hat used to be) */}
          <g transform="translate(92, 98)">
            {/* Nail/peg */}
            <rect x="14" y="0" width="1.5" height="2" fill="#1a1008" />
            {/* Hanging cord */}
            <line x1="14.75" y1="2" x2="8" y2="10" stroke="#3a2a14" strokeWidth="0.5" />
            <line x1="14.75" y1="2" x2="22" y2="11" stroke="#3a2a14" strokeWidth="0.5" />
            {/* Leaf-wrapped food bundle (bánh tét style, cylindrical) */}
            <ellipse cx="8" cy="18" rx="5" ry="2" fill="#3a5228" />
            <rect x="3" y="10" width="10" height="16" fill="#4a6a30" />
            <rect x="3" y="10" width="10" height="2" fill="#6a8a40" />
            <rect x="3" y="24" width="10" height="2" fill="#2a3a18" />
            {/* Twine tying top and bottom */}
            <rect x="2" y="13" width="12" height="0.8" fill="#2a1808" />
            <rect x="2" y="20" width="12" height="0.8" fill="#2a1808" />
            {/* Second hanging bundle (smaller, shifted) */}
            <rect x="18" y="11" width="8" height="12" fill="#4a6a30" />
            <rect x="18" y="11" width="8" height="1.5" fill="#6a8a40" />
            <rect x="18" y="21.5" width="8" height="1.5" fill="#2a3a18" />
            <rect x="17" y="14" width="10" height="0.7" fill="#2a1808" />
            <rect x="17" y="19" width="10" height="0.7" fill="#2a1808" />
          </g>

          {/* Clustered bundle + gourd in the mid-left empty area */}
          <g transform="translate(40, 166)">
            {/* Striped cloth bundle */}
            <ellipse cx="10" cy="10" rx="12" ry="7" fill="#6a3a28" />
            <ellipse cx="10" cy="7" rx="11" ry="6" fill="#8a5238" />
            <rect x="7" y="0" width="6" height="4" fill="#4a2818" />
            <line x1="-2" y1="9" x2="22" y2="9" stroke="#3a1808" strokeWidth="0.6" opacity="0.7" />
            <line x1="0"  y1="12" x2="20" y2="12" stroke="#3a1808" strokeWidth="0.6" opacity="0.6" />
          </g>
          {/* Dried gourd canteen (water) resting on the bundle above */}
          <g transform="translate(68, 158)">
            <ellipse cx="6" cy="8" rx="6" ry="7" fill="#a0783a" />
            <ellipse cx="6" cy="5" rx="5" ry="5" fill="#b88a48" />
            <rect x="5" y="-2" width="2" height="3" fill="#3a2410" />
            <rect x="4" y="-2" width="4" height="1" fill="#2a1808" />
            {/* Strap */}
            <path d="M 0 5 Q -2 10 -3 16" fill="none" stroke="#3a2410" strokeWidth="0.6" />
          </g>

          {/* Small oil lamp sitting on the folded-clothes box — extra
              clutter and a warm point of light */}
          <g transform="translate(268, 198)">
            <rect x="2" y="6" width="10" height="4" fill="#2a1a0a" />
            <rect x="2" y="6" width="10" height="1" fill="#4a2e14" />
            <rect x="5" y="2" width="4" height="4" fill="#ffcc66" opacity="0.85"
              className="sp-lamp-flicker" />
            <rect x="6" y="0" width="2" height="3" fill="#ff9944" opacity="0.7"
              className="sp-lamp-flicker" />
            <circle cx="7" cy="4" r="8" fill="#ffaa44" opacity="0.1" />
          </g>

          {/* Tangle of discarded shoes in the foreground (clutter cue) */}
          <g transform="translate(102, 236)">
            <ellipse cx="4" cy="2" rx="5" ry="1.6" fill="#3a2818" />
            <rect x="3" y="0.5" width="1" height="2" fill="#1a0a04" />
            <ellipse cx="14" cy="1.5" rx="5.5" ry="1.8" fill="#2a1810" />
            <rect x="13" y="0" width="1" height="2" fill="#0a0a04" />
            <ellipse cx="22" cy="3" rx="4.5" ry="1.4" fill="#3a2a18" />
          </g>

          {/* Floor boards */}
          <rect x="0" y="228" width="500" height="52" fill="#1a0a04" />
          <rect x="0" y="228" width="500" height="2"  fill="#2a1808" />
          {/* Bilge water shimmer */}
          <rect x="0" y="258" width="500" height="22" fill="#0a1018" opacity="0.6" />
          <rect x="0" y="262" width="500" height="1"  fill="#2a4a6a" opacity="0.35" />
          <rect x="0" y="270" width="500" height="1"  fill="#2a4a6a" opacity="0.2" />
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="20" fill="#000" opacity="0.5" />
        <rect x="0" y="264" width="500" height="16" fill="#000" opacity="0.55" />
      </svg>
    </div>
  );
}
