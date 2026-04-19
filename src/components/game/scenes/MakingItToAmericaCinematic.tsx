import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { GameHUD } from '../GameHUD';
import { PixelPerson } from './PixelPeople';
import type { CharacterPalette } from './characterPalettes';

/* ─── helpers ─── */
function TypewriterText({ text, speed = 45, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); onDone?.(); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, onDone]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

/**
 * US immigration officer behind the desk — navy suit, red tie,
 * sandy hair. Distinct American-bureaucrat palette, echoing the
 * FOREMAN palette used in First Day of Work.
 */
const IMMIGRATION_OFFICER: CharacterPalette = {
  color: '#f0c8a4',
  shirtColor: '#1e2a52',
  pantsColor: '#141828',
  hairColor: '#6a4a28',
  accentColor: '#c83030',
};

/* ─── Scene 1: Application Approved ───
   A US consular office. The APPROVED stamp lands on the protagonist's
   passport while they sit across from an immigration officer. Visual
   grammar matches Phase 3 cinematics: same viewBox, same aspect-ratio
   rule, PixelPerson chibis on canonical palettes, scene-prefixed
   keyframes. */
function VisaStampScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#e8d8b0] via-[#d4c4a0] to-[#a88868]">
      <style>{`
        @keyframes mta1-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        .chibi-sway-idle { animation: mta1-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes mta1-stamp-slam {
          0%   { opacity: 0; transform: scale(3) rotate(-12deg); }
          10%  { opacity: 1; transform: scale(1.15) rotate(-12deg); }
          15%  { transform: scale(1) rotate(-12deg); }
          100% { opacity: 1; transform: scale(1) rotate(-12deg); }
        }
        .mta1-stamp {
          animation: mta1-stamp-slam 1.8s ease-out 2s both;
          transform-box: fill-box;
          transform-origin: center center;
        }

        @keyframes mta1-visa-glow {
          0%   { filter: brightness(1); }
          100% { filter: brightness(1.25) drop-shadow(0 0 4px rgba(197,165,90,0.55)); }
        }
        .mta1-visa-doc { animation: mta1-visa-glow 2s ease-in-out 3s infinite alternate; }

        @keyframes mta1-lamp-hum {
          0%, 94%, 100% { opacity: 0.55; }
          95%, 97%      { opacity: 0.25; }
        }
        .mta1-lamp { animation: mta1-lamp-hum 6s ease-in-out infinite; }

        @keyframes mta1-beam {
          0%, 100% { opacity: 0.14; }
          50%      { opacity: 0.22; }
        }
        .mta1-beam { animation: mta1-beam 5s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Office walls — warm beige with chair-rail === */}
        <rect x="0" y="0" width="500" height="200" fill="#d4c4a0" />
        <rect x="0" y="0" width="500" height="40" fill="#dccba6" />
        <rect x="0" y="140" width="500" height="1.5" fill="#8a7048" opacity="0.6" />

        {/* === Wooden floor === */}
        <rect x="0" y="200" width="500" height="80" fill="#8a6a3a" />
        <rect x="0" y="200" width="500" height="2" fill="#5a3e1a" />
        {/* Floorboards */}
        {[0, 64, 128, 192, 256, 320, 384, 448].map((bx) => (
          <rect key={`fb-${bx}`} x={bx} y="202" width="1" height="78" fill="#6a4e28" opacity="0.7" />
        ))}
        {[218, 240, 262].map((y) => (
          <rect key={`fg-${y}`} x="0" y={y} width="500" height="0.8" fill="#6a4e28" opacity="0.35" />
        ))}

        {/* === Window with morning light === */}
        <g>
          <rect x="20" y="30" width="74" height="94" fill="#1e1a28" />
          <rect x="22" y="32" width="70" height="90" fill="#9cc4e4" />
          {/* Mullions */}
          <rect x="55" y="32" width="2" height="90" fill="#4a3018" />
          <rect x="22" y="75" width="70" height="2" fill="#4a3018" />
          {/* Window frame */}
          <rect x="16" y="26" width="82" height="4" fill="#4a3018" />
          <rect x="16" y="124" width="82" height="4" fill="#4a3018" />
          <rect x="16" y="26" width="4" height="102" fill="#4a3018" />
          <rect x="94" y="26" width="4" height="102" fill="#4a3018" />
          {/* Sill */}
          <rect x="12" y="128" width="90" height="4" fill="#6a4a28" />
        </g>

        {/* Sunbeam streaming through the window */}
        <polygon points="94,42 210,110 210,186 94,128"
          fill="#fff4d0" className="mta1-beam" />

        {/* === American flag on a pole — simplified, pixel-art === */}
        <g transform="translate(400, 28)">
          <rect x="-2" y="0" width="2" height="106" fill="#4a3018" />
          <rect x="-3" y="0" width="4" height="3" fill="#d8a028" />
          {/* Flag rectangle */}
          <rect x="0" y="4" width="58" height="36" fill="#f4ecd0" />
          <rect x="0" y="4" width="58" height="1" fill="#b8a888" />
          {/* Red stripes */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={`s-${i}`} x="0" y={4 + i * 5.1} width="58" height="2.5" fill="#b22234" />
          ))}
          {/* Blue canton */}
          <rect x="0" y="4" width="23" height="18" fill="#2e3868" />
          {/* Stars (9×2 grid, offset) */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => {
              const ox = row % 2 === 0 ? 0 : 2.5;
              return (
                <rect key={`st-${row}-${col}`}
                  x={3 + col * 5 + ox} y={7 + row * 3.5}
                  width="1.5" height="1.5" fill="#fff4d0" />
              );
            }),
          )}
        </g>

        {/* === Filing cabinet in the far corner === */}
        <g transform="translate(450, 130)">
          <rect x="0" y="0" width="44" height="70" fill="#6a5838" />
          <rect x="0" y="0" width="44" height="2" fill="#8a7450" />
          <rect x="0" y="22" width="44" height="2" fill="#4a3818" />
          <rect x="0" y="46" width="44" height="2" fill="#4a3818" />
          {/* Drawer handles */}
          <rect x="19" y="10" width="6" height="2" fill="#d8b870" />
          <rect x="19" y="32" width="6" height="2" fill="#d8b870" />
          <rect x="19" y="56" width="6" height="2" fill="#d8b870" />
        </g>

        {/* === Framed document on the wall === */}
        <g transform="translate(156, 52)">
          <rect x="0" y="0" width="38" height="50" fill="#4a3018" />
          <rect x="3" y="3" width="32" height="44" fill="#f8eed0" />
          <rect x="6" y="8" width="26" height="1.5" fill="#8a6a3a" />
          <rect x="6" y="13" width="22" height="1.5" fill="#8a6a3a" />
          <rect x="6" y="18" width="24" height="1.5" fill="#8a6a3a" />
          <rect x="6" y="30" width="14" height="10" fill="#b22234" opacity="0.75" />
        </g>

        {/* === Immigration officer — seated behind the desk. Drawn
            BEFORE the desk/papers/passport so that the desk surface
            (y=160) naturally clips his lower body, leaving only the
            torso and head visible above. At scale 2.8 the sprite is
            50.4 × 72.8 px; translate-y = 104 places the row-9/row-10
            seam (hip line) exactly at the desk surface. Overlays
            (glasses, tie) sit inside a `scale(2.8)` wrapper so their
            pixel positions stay locked to the sprite grid. === */}
        <g transform="translate(225, 104)">
          <PixelPerson x={0} y={0} scale={2.8} variant="civilian" {...IMMIGRATION_OFFICER}
            mood="neutral" sway="idle" swayDelay={0.1} />
          <g transform="scale(2.8)">
            {/* Black-rim glasses overlay in scale-1 sprite coords.
                Sprite is 9 × 13 cells (each cell = 2 units at scale 1).
                Eyes occupy cols 2–3 and 5–6 on row 3. */}
            <rect x={4}  y={6}   width={4}   height={2}   fill="none" stroke="#1a1a1a" strokeWidth="0.45" />
            <rect x={10} y={6}   width={4}   height={2}   fill="none" stroke="#1a1a1a" strokeWidth="0.45" />
            <rect x={8}  y={6.5} width={2}   height={0.7} fill="#1a1a1a" />
            {/* Red tie hanging from the collar down the shirt. */}
            <polygon points="8.7,14 10.1,14 9.6,22 9.2,22" fill="#b22234" />
            <polygon points="8.7,14 10.1,14 9.9,15"        fill="#8a1a1a" />
          </g>
        </g>

        {/* === Desk — wooden, chunky === */}
        <g>
          <rect x="96" y="160" width="308" height="12" fill="#6a4a28" />
          <rect x="96" y="160" width="308" height="2" fill="#8a6a3a" />
          <rect x="96" y="170" width="308" height="2" fill="#3a2010" />
          {/* Drawer front */}
          <rect x="100" y="172" width="300" height="28" fill="#5a3a20" />
          <rect x="100" y="172" width="300" height="2" fill="#7a5a38" />
          {/* Drawer pulls */}
          <rect x="158" y="184" width="12" height="3" fill="#d8b870" />
          <rect x="246" y="184" width="12" height="3" fill="#d8b870" />
          <rect x="334" y="184" width="12" height="3" fill="#d8b870" />
          {/* Desk legs (visible outside drawer) */}
          <rect x="100" y="200" width="8"   height="10" fill="#3a2010" />
          <rect x="392" y="200" width="8"   height="10" fill="#3a2010" />
        </g>

        {/* === Desk lamp — on the left of the desk === */}
        <g>
          <rect x="120" y="138" width="2" height="22" fill="#3a2010" />
          <polygon points="108,132 134,132 128,144 114,144" fill="#5a3818" />
          <rect x="112" y="144" width="18" height="2" fill="#3a2010" />
          {/* Bulb glow */}
          <ellipse cx="121" cy="146" rx="8" ry="3" fill="#fff4b8" className="mta1-lamp" />
          <ellipse cx="121" cy="146" rx="14" ry="5" fill="#fff4b8" opacity="0.15" />
        </g>

        {/* === Papers stacked on the desk === */}
        <g>
          <rect x="150" y="148" width="50" height="14" fill="#f4ecd0" />
          <rect x="150" y="148" width="50" height="1.5" fill="#b8a888" />
          <rect x="153" y="152" width="40" height="1" fill="#8a6a3a" />
          <rect x="153" y="155" width="34" height="1" fill="#8a6a3a" />
          <rect x="153" y="158" width="38" height="1" fill="#8a6a3a" />

          {/* Pen holder cup */}
          <rect x="380" y="144" width="14" height="16" fill="#4a3018" />
          <rect x="380" y="144" width="14" height="2" fill="#6a4a28" />
          <rect x="383" y="132" width="1.2" height="14" fill="#2a2a30" />
          <rect x="386.5" y="130" width="1.2" height="16" fill="#b83030" />
          <rect x="390" y="134" width="1.2" height="12" fill="#3a5aa8" />
        </g>

        {/* === Passport on the desk — with APPROVED stamp landing === */}
        <g className="mta1-visa-doc" transform="translate(240, 140)">
          <rect x="0" y="0" width="56" height="28" fill="#1e3450" />
          <rect x="0" y="0" width="56" height="2" fill="#12203a" />
          <rect x="0" y="26" width="56" height="2" fill="#12203a" />
          {/* Gold title bar */}
          <rect x="8" y="4" width="40" height="2.5" fill="#c5a55a" />
          <rect x="12" y="8.5" width="32" height="1.5" fill="#c5a55a" />
          {/* Photo */}
          <rect x="8" y="13" width="16" height="12" fill="#e8dcc8" />
          <rect x="8" y="13" width="16" height="12" fill="none" stroke="#c5a55a" strokeWidth="0.6" />
          <rect x="13.5" y="15" width="5" height="4" fill="#e8b896" />
          <rect x="11" y="20" width="10" height="5" fill="#2a4a6a" />
          {/* Stamped lines */}
          <rect x="28" y="14" width="22" height="1" fill="#c5a55a" opacity="0.8" />
          <rect x="28" y="17" width="18" height="1" fill="#c5a55a" opacity="0.7" />
          <rect x="28" y="20" width="22" height="1" fill="#c5a55a" opacity="0.7" />
          <rect x="28" y="23" width="14" height="1" fill="#c5a55a" opacity="0.6" />
          {/* Gold eagle emblem */}
          <rect x="24" y="4" width="8" height="1.5" fill="#c5a55a" />
          <rect x="26" y="5.5" width="4" height="1.5" fill="#c5a55a" />
        </g>

        {/* The APPROVED stamp — slams down over the passport */}
        <g className="mta1-stamp">
          <g transform="rotate(-12, 268, 158)">
            <rect x="226" y="144" width="86" height="30" fill="none" stroke="#b22234" strokeWidth="3" />
            <text x="269" y="165" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace"
              fontWeight="800" fontSize="13" letterSpacing="1.5" fill="#b22234">
              APPROVED
            </text>
          </g>
        </g>

      </svg>
    </div>
  );
}

/* ─── Scene 2: Flying to LAX (Little Saigon) ───
   Night flight descending into Los Angeles. Same pixel-art grammar as
   the other cinematics — fixed star positions (no Math.random), chunky
   pixel buildings, scene-prefixed keyframes. */
function FlyingToLAXScene() {
  const STARS: Array<[number, number, number]> = [
    [30, 20, 0.9], [80, 45, 0.55], [150, 15, 0.8], [200, 50, 0.6],
    [280, 25, 0.85], [350, 40, 0.5], [420, 18, 0.9], [460, 55, 0.6],
    [110, 35, 0.7], [320, 10, 0.55], [400, 48, 0.8], [50, 60, 0.5],
    [230, 30, 0.85], [380, 60, 0.55], [170, 55, 0.7], [440, 35, 0.6],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#141838] via-[#2a2452] to-[#6a2a38]">
      <style>{`
        @keyframes mta2-plane-descend {
          0%   { transform: translate(-60px, -30px) rotate(-3deg); }
          50%  { transform: translate(30px, 15px)   rotate(-1deg); }
          100% { transform: translate(60px, 40px)   rotate(0deg); }
        }
        .mta2-plane { animation: mta2-plane-descend 8s ease-in-out infinite; transform-box: fill-box; }

        @keyframes mta2-clouds-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-500px); }
        }
        .mta2-clouds-1 { animation: mta2-clouds-drift 12s linear infinite; }
        .mta2-clouds-2 { animation: mta2-clouds-drift 18s linear infinite; animation-delay: -5s; }
        .mta2-clouds-3 { animation: mta2-clouds-drift 15s linear infinite; animation-delay: -8s; }

        @keyframes mta2-ground-rise {
          0%   { transform: translateY(30px) scale(0.85); opacity: 0.35; }
          100% { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        .mta2-ground { animation: mta2-ground-rise 6s ease-out forwards; transform-box: fill-box; }

        @keyframes mta2-tower-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .mta2-tower-light { animation: mta2-tower-blink 1.5s step-end infinite; }

        @keyframes mta2-runway-blink {
          0%, 49%   { opacity: 0.95; }
          50%, 100% { opacity: 0.35; }
        }
        .mta2-runway-light { animation: mta2-runway-blink 0.8s step-end infinite alternate; }

        @keyframes mta2-engine-flicker {
          0%   { opacity: 0.4; }
          50%  { opacity: 0.75; }
          100% { opacity: 0.4; }
        }
        .mta2-engine-glow { animation: mta2-engine-flicker 0.3s steps(2) infinite; }

        @keyframes mta2-welcome-pulse {
          0%   { opacity: 0.25; }
          100% { opacity: 0.55; }
        }
        .mta2-welcome-glow { animation: mta2-welcome-pulse 2s ease-in-out infinite alternate; }

        @keyframes mta2-twinkle {
          0%, 100% { opacity: var(--mta2-star, 0.8); }
          50%      { opacity: 0.25; }
        }
        .mta2-star { animation: mta2-twinkle 3.4s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* === Night sky gradient (stacked rect bands for a pixel look) === */}
        <rect x="0" y="0"   width="500" height="100" fill="#141838" />
        <rect x="0" y="100" width="500" height="60"  fill="#2a2452" />
        <rect x="0" y="160" width="500" height="40"  fill="#5a2a52" opacity="0.8" />
        <rect x="0" y="200" width="500" height="40"  fill="#b8522a" opacity="0.55" />

        {/* === Stars — fixed positions, twinkling, different cadences === */}
        {STARS.map(([x, y, b], i) => (
          <rect key={`st-${i}`} x={x} y={y} width="2" height="2"
            fill="#fff4d8"
            className="mta2-star"
            style={{
              ['--mta2-star' as string]: b,
              animationDelay: `${(i % 5) * 0.7}s`,
            }}
          />
        ))}

        {/* A couple of bright "hero" stars with halos */}
        {[[80, 45], [320, 10], [420, 18]].map(([x, y], i) => (
          <g key={`halo-${i}`}>
            <rect x={x - 1} y={y - 1} width="4" height="4" fill="#fff4d8" opacity="0.25" />
            <rect x={x} y={y} width="2" height="2" fill="#fff4d8" />
          </g>
        ))}

        {/* === Drifting cloud wisps === */}
        <g className="mta2-clouds-1">
          <ellipse cx="100" cy="120" rx="40" ry="10" fill="#f4d8c0" opacity="0.12" />
          <ellipse cx="130" cy="115" rx="28" ry="8"  fill="#f4d8c0" opacity="0.10" />
        </g>
        <g className="mta2-clouds-2">
          <ellipse cx="350" cy="140" rx="48" ry="12" fill="#f4d8c0" opacity="0.10" />
          <ellipse cx="390" cy="135" rx="34" ry="9"  fill="#f4d8c0" opacity="0.08" />
        </g>
        <g className="mta2-clouds-3">
          <ellipse cx="220" cy="160" rx="44" ry="11" fill="#f4d8c0" opacity="0.12" />
        </g>

        {/* === Los Angeles coming into view (ground rises in) === */}
        <g className="mta2-ground">
          {/* Pacific Ocean to the left, city to the right */}
          <rect x="0"   y="230" width="200" height="50" fill="#1a3a5a" />
          {/* Wave foam streaks (small, scattered) */}
          {[[30, 240], [64, 236], [102, 244], [136, 240], [172, 246]].map(([x, y], i) => (
            <rect key={`foam-${i}`} x={x} y={y} width="14" height="1" fill="#7aa8c8" opacity="0.55" />
          ))}
          {/* Beach strip */}
          <rect x="180" y="230" width="22" height="50" fill="#c4a66a" />
          <rect x="180" y="230" width="22" height="2" fill="#8a7040" />
          {/* City block */}
          <rect x="200" y="230" width="300" height="50" fill="#1a1a22" />
          <rect x="200" y="230" width="300" height="1" fill="#3a3a48" />
          {/* Skyline silhouettes with lit windows */}
          {[210, 224, 240, 258, 278, 298, 318, 338, 358, 378, 398, 418, 438, 460].map((x, i) => {
            const h = 8 + (i % 5) * 6;
            return (
              <g key={`bldg-${i}`}>
                <rect x={x} y={230 - h} width={10} height={h} fill="#2a2a34" />
                <rect x={x} y={230 - h} width={10} height={1} fill="#4a4a58" />
                {/* Lit windows — deterministic */}
                <rect x={x + 2} y={230 - h + 2} width="1.5" height="1.5" fill="#fff4b8"
                  opacity={(i * 37) % 3 === 0 ? 0.9 : 0.5} />
                <rect x={x + 6} y={230 - h + 2} width="1.5" height="1.5" fill="#fff4b8"
                  opacity={(i * 53) % 4 === 0 ? 0.9 : 0.4} />
                <rect x={x + 2} y={230 - h + 5} width="1.5" height="1.5" fill="#ff9a3a"
                  opacity={(i * 29) % 3 === 0 ? 0.85 : 0.4} />
                <rect x={x + 6} y={230 - h + 5} width="1.5" height="1.5" fill="#fff4b8"
                  opacity={(i * 41) % 4 === 0 ? 0.85 : 0.35} />
              </g>
            );
          })}

          {/* LAX control tower */}
          <g>
            <rect x="300" y="202" width="8"  height="28" fill="#5a5a62" />
            <rect x="294" y="198" width="20" height="6"  fill="#6a6a72" />
            <rect x="294" y="198" width="20" height="1"  fill="#8a8a92" />
            <rect x="296" y="200" width="2"  height="2"  fill="#c83030" className="mta2-tower-light" />
          </g>

          {/* Runway lights */}
          {[250, 266, 282, 298, 314, 330, 346, 362].map((x, i) => (
            <rect key={`rl-${i}`} x={x} y="238" width="2.5" height="2" fill="#8affa0"
              className="mta2-runway-light"
              style={{ animationDelay: `${(i % 4) * 0.2}s` }} />
          ))}

          {/* "WELCOME TO LOS ANGELES" sign glow */}
          <rect x="338" y="226" width="68" height="6" fill="#ffcc3a" className="mta2-welcome-glow" />
          <rect x="338" y="226" width="68" height="1" fill="#fff4a0" opacity="0.55" />
        </g>

        {/* === The airplane — chunky pixel shape, descending === */}
        <g className="mta2-plane">
          {/* Fuselage */}
          <ellipse cx="250" cy="130" rx="44" ry="9"  fill="#e8e8ea" />
          <ellipse cx="250" cy="128" rx="44" ry="3"  fill="#f8f8fa" opacity="0.75" />
          {/* Nose */}
          <polygon points="292,130 306,128 292,125" fill="#c8c8d0" />
          {/* Cockpit window */}
          <rect x="287" y="126.5" width="4" height="3" fill="#3a5a8a" />
          <rect x="287" y="126.5" width="4" height="1" fill="#6a8ab8" />
          {/* Passenger windows */}
          {[218, 226, 234, 242, 250, 258, 266, 274, 282].map((x) => (
            <rect key={`pw-${x}`} x={x} y={127} width="3" height="3" fill="#3a5a8a" />
          ))}
          {/* Wings */}
          <polygon points="240,130 260,130 276,100 224,100" fill="#b8b8c0" />
          <polygon points="240,130 260,130 276,100 224,100" fill="#d8d8e0" opacity="0.35" />
          {/* Lower wing shadow */}
          <polygon points="240,130 260,130 275,158 225,158" fill="#8a8a92" opacity="0.55" />
          {/* Tail fin */}
          <polygon points="205,130 215,130 210,104" fill="#e0e0e8" />
          <polygon points="207,130 213,130 210,110" fill="#b22234" />
          {/* Engines */}
          <ellipse cx="235" cy="110" rx="6" ry="4" fill="#8a8a92" />
          <ellipse cx="265" cy="110" rx="6" ry="4" fill="#8a8a92" />
          {/* Engine glow */}
          <ellipse cx="229" cy="110" rx="3" ry="2" fill="#ff9a3a" className="mta2-engine-glow" />
          <ellipse cx="259" cy="110" rx="3" ry="2" fill="#ff9a3a" className="mta2-engine-glow" />
          {/* Navigation lights on wingtips */}
          <rect x="223" y="99"  width="2" height="2" fill="#c83030" />
          <rect x="274" y="99"  width="2" height="2" fill="#3a8848" />
        </g>
      </svg>
    </div>
  );
}

/* ─── Main Cinematic ─── */

interface Scene {
  title: string;
  text: string;
  bg: () => React.ReactNode;
}

const SCENES: Scene[] = [
  {
    title: 'APPLICATION APPROVED',
    text: "After years of waiting, you were finally sponsored to go live and work in America with a visa. It's been years since you've been home and now you will have to start a new life.",
    bg: () => <VisaStampScene />,
  },
  {
    title: 'LITTLE SAIGON',
    text: 'You finally fly to LAX and move to Garden Grove, California, which has become known as Little Saigon.',
    bg: () => <FlyingToLAXScene />,
  },
];

interface Props {
  onComplete: () => void;
}

export function MakingItToAmericaCinematic({ onComplete }: Props) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [textDone, setTextDone] = useState(false);

  const scene = SCENES[sceneIdx];

  const handleTextDone = useCallback(() => setTextDone(true), []);

  const advance = () => {
    if (sceneIdx < SCENES.length - 1) {
      setSceneIdx(s => s + 1);
      setTextDone(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Background scene */}
      {scene.bg()}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Push HUD to bottom */}
      <div className="flex-1" />

      {/* HUD with text */}
      <div className="relative z-10 pb-4 md:pb-6 px-4 md:px-8">
        <GameHUD>
          <div className="space-y-2 flex-1">
            <h2 className="font-pixel text-[8px] md:text-[10px] text-primary crt-glow tracking-widest">
              {scene.title}
            </h2>
            <p className="font-retro text-sm md:text-base text-foreground/90 leading-relaxed min-h-[3rem]">
              <TypewriterText key={sceneIdx} text={scene.text} speed={40} onDone={handleTextDone} />
            </p>
          </div>

          {/* Continue arrow */}
          {textDone && (
            <button onClick={advance} className="self-end animate-fade-in-up" aria-label="Continue">
              <ChevronRight className="w-6 h-6 text-primary animate-pulse" />
            </button>
          )}
        </GameHUD>
      </div>
    </div>
  );
}
