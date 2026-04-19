import { PixelPerson } from './PixelPeople';

// ===========================================================================
// AcquiringBoatScene
// Styled to match the "previous scenes" we designed in
// EscapingVietnamCinematic.tsx (Scene 6 — "THE VANISHING SHORE").
//
// 500x280 pixel canvas, bg-gradient dusk palette, layered pixel-art
// dock + fishing boat + shimmering bay, and PixelPerson sprites for the
// protagonist, seller, and waiting family.  A scoped <style> block provides
// the cinematic-* keyframes since this scene renders standalone from
// GameEngine (outside the cinematic wrapper that normally defines them).
// ===========================================================================
export function AcquiringBoatScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#2a1840] via-[#6a3028] to-[#c0601c]">
      <style>{`
        @keyframes abs-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes abs-chibi-scared {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        @keyframes abs-chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        .chibi-sway-idle   { animation: abs-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: abs-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: abs-chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes abs-boat-bob {
          0%, 100% { transform: translate(0,0) rotate(-1.4deg); }
          50%      { transform: translate(-2px,-4px) rotate(1.4deg); }
        }
        @keyframes abs-lamp-flicker {
          0%, 100% { opacity: 0.95; }
          45%      { opacity: 0.70; }
          55%      { opacity: 1.0; }
          80%      { opacity: 0.82; }
        }
        @keyframes abs-splash {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50%      { transform: scaleY(0.3); opacity: 0.3; }
        }
        @keyframes abs-gold-shimmer {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes abs-flicker {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 0.45; }
        }
        @keyframes abs-paint-arm {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(3px) rotate(6deg); }
        }
        @keyframes abs-drift {
          0%   { transform: translate(0,0); opacity: 1; }
          100% { transform: translate(-18px,-60px); opacity: 0; }
        }
        @keyframes abs-pigeon-fly {
          0%   { transform: translate(0,0); }
          100% { transform: translate(220px,-40px); }
        }

        .abs-boat-bob      { animation: abs-boat-bob 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .abs-lamp-flicker  { animation: abs-lamp-flicker 2.4s ease-in-out infinite; }
        .abs-splash        { animation: abs-splash 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .abs-gold-shimmer  { animation: abs-gold-shimmer 1.6s ease-in-out infinite; }
        .abs-flicker       { animation: abs-flicker 2s ease-in-out infinite; }
        .abs-paint-arm     { animation: abs-paint-arm 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 50%; }
        .abs-drift         { animation: abs-drift 3s linear infinite; }
        .abs-pigeon-fly    { animation: abs-pigeon-fly 6s linear infinite; transform-box: fill-box; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Early stars above the dusk band */}
        {[60, 120, 180, 240, 300, 360, 420, 470, 90, 210, 330].map((sx, si) => (
          <rect
            key={`star-${si}`} x={sx} y={10 + (si * 9) % 30} width={1.5} height={1.5}
            fill="#fff" opacity={0.35 + (si % 3) * 0.1}
            className="cinematic-twinkle" style={{ animationDelay: `${si * 0.35}s` }}
          />
        ))}

        {/* Setting sun */}
        <circle cx="400" cy="112" r="30" fill="#ffb050" opacity="0.45" />
        <circle cx="400" cy="112" r="20" fill="#ffd078" opacity="0.9" />
        <circle cx="400" cy="112" r="12" fill="#fff0c0" />

        {/* Low clouds streaked across the sun */}
        {[90, 140, 175].map((cy, ci) => (
          <rect key={`cloud-${ci}`} x={320} y={cy} width={160} height={3} fill="#4a2828" opacity={0.5 - ci * 0.1} />
        ))}

        {/* Distant mountainous coastline */}
        <polygon
          points="0,150 40,140 70,144 100,130 140,146 180,136 230,148 280,132 320,142 360,130 400,142 440,134 500,144 500,160 0,160"
          fill="#2a1820"
        />
        <polygon
          points="0,158 50,150 90,154 130,146 170,156 210,148 260,158 300,146 340,154 380,146 420,154 460,148 500,156 500,172 0,172"
          fill="#1a1018" opacity="0.85"
        />

        {/* Water surface */}
        <rect x="0" y="160" width="500" height="120" fill="#3a2036" />
        <rect x="0" y="160" width="500" height="40" fill="url(#abs-water)" opacity="0.9" />
        <defs>
          <linearGradient id="abs-water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8a3828" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2a1830" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sun reflection trail on water */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <rect
            key={`sunref-${i}`}
            x={380 - i * 2}
            y={166 + i * 6}
            width={40 - i * 4}
            height={1.5}
            fill="#ffc878"
            opacity={0.7 - i * 0.09}
            className="abs-flicker"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Far-horizon freighter silhouette */}
        <g transform="translate(60 148)" opacity="0.8">
          <rect x="0" y="8" width="38" height="4" fill="#1a0a18" />
          <rect x="2" y="6" width="34" height="2" fill="#1a0a18" />
          <rect x="8" y="0" width="4" height="6" fill="#1a0a18" />
          <rect x="18" y="-3" width="3" height="9" fill="#1a0a18" />
          <rect x="26" y="2" width="3" height="4" fill="#1a0a18" />
          <rect x="4" y="9" width="1" height="1" fill="#ffdd88" className="cinematic-twinkle" />
          <rect x="14" y="9" width="1" height="1" fill="#ffdd88" className="cinematic-twinkle" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Seabirds */}
        {[
          { x: 140, y: 50, d: 0 },
          { x: 230, y: 40, d: 1.2 },
          { x: 300, y: 60, d: 0.6 },
        ].map((b, bi) => (
          <g
            key={`bird-${bi}`}
            className="abs-pigeon-fly"
            style={{ animationDelay: `${b.d}s`, animationDuration: '14s' }}
            transform={`translate(${b.x} ${b.y})`}
          >
            <rect x="0" y="0" width="1.5" height="1.5" fill="#1a0a18" />
            <rect x="-3" y="-1" width="3" height="0.8" fill="#1a0a18" />
            <rect x="2" y="-1" width="3" height="0.8" fill="#1a0a18" />
          </g>
        ))}

        {/* Palm tree on shore (left) */}
        <g transform="translate(28 150)">
          <rect x="0" y="0" width="5" height="80" fill="#3a2614" />
          <rect x="1" y="10" width="3" height="2" fill="#2a1a0a" />
          <rect x="1" y="30" width="3" height="2" fill="#2a1a0a" />
          <rect x="1" y="52" width="3" height="2" fill="#2a1a0a" />
          <polygon points="2,0 -16,-6 -14,2" fill="#2a3a1a" />
          <polygon points="2,0 20,-5 16,3" fill="#2a3a1a" />
          <polygon points="2,0 -14,8 -6,10" fill="#1a2a0a" />
          <polygon points="2,0 18,10 8,10" fill="#1a2a0a" />
          <polygon points="2,0 -4,-14 4,-12" fill="#2a3a1a" />
        </g>

        {/* Shore ground / wet sand */}
        <polygon points="0,200 0,280 120,280 100,200" fill="#3a2418" />
        <polygon points="0,200 100,200 90,205 0,210" fill="#5a3a20" />
        {/* Pebbles */}
        {[10, 36, 62, 84].map((rx, ri) => (
          <rect key={`pebble-${ri}`} x={rx} y={214 + (ri % 2) * 6} width={3} height={1.5} fill="#7a5a3a" opacity="0.8" />
        ))}

        {/* Lapping shore waves */}
        {[0, 1, 2, 3].map(i => (
          <rect
            key={`lap-${i}`} x={80 + i * 6} y={210 + i * 3} width={20 - i * 3} height={1.5}
            fill="#c08050" opacity={0.55 - i * 0.1}
            className="cinematic-wave" style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* === Wooden dock extending from shore to water === */}
        {/* Pilings */}
        {[120, 160, 200, 240, 280, 320].map((px, pi) => (
          <g key={`piling-${pi}`}>
            <rect x={px} y="196" width="5" height="48" fill="#4a2c18" />
            <rect x={px - 1} y="194" width="7" height="4" fill="#6a4428" />
            {/* water splash at base */}
            <g className="abs-splash" style={{ animationDelay: `${pi * 0.18}s` }}>
              <rect x={px - 4} y={242} width={13} height={2} fill="#8a4830" opacity="0.75" />
            </g>
          </g>
        ))}
        {/* Deck planks */}
        <rect x="110" y="190" width="230" height="7" fill="#6a4428" />
        <rect x="110" y="190" width="230" height="2" fill="#8a5a32" />
        <rect x="110" y="195" width="230" height="2" fill="#3a2010" />
        {/* Plank seam lines */}
        {[130, 150, 170, 190, 210, 230, 250, 270, 290, 310].map((x, i) => (
          <line key={`plank-${i}`} x1={x} y1={190} x2={x} y2={197} stroke="#3a2010" strokeWidth="0.6" />
        ))}

        {/* Rope coil + crate on dock */}
        <g transform="translate(128 186)">
          <ellipse cx="0" cy="0" rx="6" ry="2" fill="#a88050" />
          <ellipse cx="0" cy="-1.5" rx="4.5" ry="1.5" fill="#b8956a" />
          <ellipse cx="0" cy="-3" rx="3" ry="1" fill="#a88050" />
        </g>
        <g transform="translate(148 178)">
          <rect x="0" y="0" width="14" height="12" fill="#5a3820" />
          <rect x="0" y="0" width="14" height="2" fill="#7a5230" />
          <rect x="6" y="2" width="2" height="10" fill="#3a2010" />
          <rect x="0" y="6" width="14" height="1" fill="#3a2010" />
        </g>

        {/*
          Nón-lá resting on the crate. Drawn as a standalone prop (same
          convention as the hat hung on a wall peg in Scenes 4 & 5) —
          never drawn on a character's head.
        */}
        <g transform="translate(146 172)">
          <polygon points="0,8 10,-2 20,8" fill="#c9a24a" />
          <polygon points="0,8 10,-2 20,8" fill="none" stroke="#8a6a2a" strokeWidth="0.5" />
          {[3, 6, 10, 14, 17].map((tx, ti) => (
            <line key={`nline-${ti}`} x1={tx} y1={8} x2={10} y2={-2} stroke="#8a6a2a" strokeWidth="0.3" opacity="0.6" />
          ))}
          <rect x={8} y={8} width={4} height={1.5} fill="#8a6a2a" />
        </g>

        {/* === Fishing boat moored to the end of the dock === */}
        <g className="abs-boat-bob">
          {/* Water shadow */}
          <ellipse cx="390" cy="238" rx="70" ry="5" fill="#1a0c18" opacity="0.55" />

          {/* Hull */}
          <polygon points="340,226 350,244 436,244 446,226" fill="#3a2014" />
          <polygon points="340,226 350,244 436,244 446,226" fill="none" stroke="#1a0806" strokeWidth="1" />
          <rect x="344" y="234" width="98" height="2" fill="#5a3620" />
          {/* Deck */}
          <rect x="342" y="222" width="102" height="5" fill="#5a3a1e" />
          <rect x="342" y="222" width="102" height="1" fill="#7a5230" />
          {/* Cabin */}
          <rect x="352" y="204" width="32" height="19" fill="#4a2c18" />
          <rect x="352" y="204" width="32" height="2" fill="#6a4428" />
          <rect x="356" y="208" width="6" height="6" fill="#2a1408" />
          <rect x="366" y="208" width="6" height="6" fill="#2a1408" />
          <rect x="376" y="208" width="6" height="6" fill="#2a1408" />
          {/* Mast */}
          <rect x="400" y="180" width="2.5" height="44" fill="#3a2a1a" />
          {/* Furled sail tied to mast */}
          <rect x="396" y="188" width="12" height="6" fill="#c0b898" />
          <rect x="396" y="195" width="12" height="2" fill="#a09878" />
          {/* Small flag on mast */}
          <rect x="402" y="176" width="10" height="6" fill="#ffcc33" className="abs-flicker" />
          <rect x="402" y="178" width="10" height="1" fill="#cc2222" />
          <rect x="402" y="180" width="10" height="1" fill="#cc2222" />

          {/* Lantern hung from boom */}
          <g>
            <rect x="395" y="198" width="14" height="1.5" fill="#3a2a1a" />
            <rect x="398" y="199" width="8" height="8" fill="#6a4a28" />
            <rect x="399" y="200" width="6" height="6" fill="#ffdd88" className="abs-lamp-flicker" />
            <rect x="400" y="201" width="4" height="4" fill="#ff9044" />
            <circle cx="402" cy="203" r="16" fill="#ffcc66" opacity="0.14" />
            <circle cx="402" cy="203" r="9" fill="#ffdd88" opacity="0.22" />
          </g>

          {/* Coiled rope on deck */}
          <g transform="translate(352 220)">
            <ellipse cx="0" cy="0" rx="5" ry="1.6" fill="#a88050" />
            <ellipse cx="0" cy="-1.2" rx="3.5" ry="1.2" fill="#b8956a" />
          </g>
          {/* Net pile on deck */}
          <g transform="translate(422 220)">
            <ellipse cx="0" cy="0" rx="8" ry="2" fill="#4a5a3a" opacity="0.9" />
            {[0, 1, 2, 3].map(i => (
              <line key={`net-${i}`} x1={-6 + i * 4} y1={-0.6} x2={-4 + i * 4} y2={1.4} stroke="#6a7a5a" strokeWidth="0.4" />
            ))}
          </g>
        </g>

        {/* Mooring rope from dock to boat bow */}
        <line
          x1="330" y1="194"
          x2="348" y2="228"
          stroke="#a88050" strokeWidth="1.2"
          strokeDasharray="3,1.5"
        />

        {/*
          === Boat owner (seller) on boat deck, arm outstretched ===
          Uses variant="soldier" so the built-in helmet stands in as
          a nón-style wide brim — consistent with PixelPerson's design
          (no custom hat polygons on civilian heads). Mood: determined.
        */}
        <g transform="translate(360 188)">
          <PixelPerson
            x={0} y={0} scale={1.2} variant="civilian"
            color="#c4956a" shirtColor="#4a6a4a" pantsColor="#2a2218"
            hairColor="#1a0a04" accentColor="#c0b070"
            mood="determined" sway="idle" swayDelay={0.2}
          />
          {/* Outstretched arm pointing at boat (same skin color as PixelPerson body) */}
          <g className="abs-paint-arm" style={{ transformOrigin: '0% 50%' }}>
            <rect x={16} y={12} width={12} height={2.5} fill="#c4956a" />
            <rect x={26} y={11} width={3} height={3} fill="#c4956a" />
          </g>
        </g>

        {/*
          === Protagonist ("you") on the dock, offering a gold leaf ===
          Palette matches Scene 4 "THE BREAKING POINT" protagonist so
          the player character looks like the same person across scenes.
        */}
        <g transform="translate(252 190)">
          <PixelPerson
            x={0} y={0} scale={1.3} variant="civilian"
            color="#e8b896" shirtColor="#6a4a38" pantsColor="#2a2018"
            hairColor="#0f0804" accentColor="#8a6848"
            mood="determined" sway="idle"
          />
          {/* Arm reaching out with gold leaf — matches protagonist skin color */}
          <rect x={15} y={12} width={10} height={3} fill="#e8b896" />
          {/* Gold leaf in hand (shares Scene 5 gold palette) */}
          <g className="abs-gold-shimmer">
            <rect x={24} y={10} width={7} height={4} fill="#ffd700" />
            <rect x={25} y={11} width={5} height={2} fill="#fff2a0" />
            <rect x={24} y={14} width={7} height={1} fill="#c89030" />
          </g>
          {/* Tiny sparkles around the gold */}
          <rect x={31} y={8} width={1} height={1} fill="#fff6c8" className="abs-flicker" />
          <rect x={23} y={8} width={1} height={1} fill="#fff6c8" className="abs-flicker" style={{ animationDelay: '0.4s' }} />
          <rect x={27} y={15} width={1} height={1} fill="#fff6c8" className="abs-flicker" style={{ animationDelay: '0.8s' }} />

          {/* Small bundle/satchel on back */}
          <rect x={-6} y={6} width={6} height={8} fill="#6a4a28" />
          <rect x={-6} y={6} width={6} height={2} fill="#8a6a40" />
          <line x1={-2} y1={6} x2={4} y2={3} stroke="#3a2a18" strokeWidth="0.6" />
        </g>

        {/*
          === Family waiting on the shore with bundles ===
          Mother's palette matches Scene 5 "THE GOLD LEAF" mother, and
          the child's palette matches that scene's child in the shadow —
          keeping the same family recognizable across scenes.
        */}
        <g transform="translate(90 192)">
          {/* Mother */}
          <PixelPerson
            x={0} y={0} scale={1.2} variant="civilian"
            color="#f0c8a0" shirtColor="#b8604a" pantsColor="#3a2010"
            hairColor="#1a0f06" accentColor="#ffcf5c"
            mood="weary" sway="idle" swayDelay={0.2}
          />
          {/* Travel bundle beside her */}
          <rect x={-12} y={14} width={10} height={10} fill="#6a4a28" />
          <rect x={-12} y={14} width={10} height={2} fill="#8a6a40" />
          <rect x={-8} y={10} width={1} height={6} fill="#3a2a18" />
        </g>
        {/* Child standing next to the mother (no double-scale) */}
        <g transform="translate(118 208)">
          <PixelPerson
            x={0} y={0} scale={0.9} variant="civilian"
            color="#d8a880" shirtColor="#4a6a8a" pantsColor="#2a2a3a"
            hairColor="#1a0f08" accentColor="#ffffff"
            mood="sad" sway="idle" swayDelay={0.4}
          />
        </g>

        {/* Second refugee on the dock shoulder, mirrored so the gaze faces the boat */}
        <g transform="translate(200 188)">
          <PixelPerson
            x={0} y={0} scale={1.0} variant="civilian"
            color="#d8a880" shirtColor="#4a3a24" pantsColor="#2a1a10"
            hairColor="#2a1810" accentColor="#ffcf5c"
            mood="weary" sway="idle" swayDelay={0.5}
            mirror
          />
          {/* Their bundle on the planks */}
          <rect x={-6} y={16} width={7} height={7} fill="#5a3a20" />
          <rect x={-6} y={16} width={7} height={1.5} fill="#7a5230" />
        </g>

        {/* Distant smaller boats moored in the bay */}
        {[{ x: 210, y: 220, d: 0.1 }, { x: 480, y: 214, d: 0.6 }].map((bg, bi) => (
          <g key={`bgboat-${bi}`} transform={`translate(${bg.x} ${bg.y})`} className="abs-boat-bob" style={{ animationDelay: `${bg.d}s`, animationDuration: '4.2s' }}>
            <polygon points="-14,5 -10,12 14,12 18,5" fill={bi === 0 ? '#3a2014' : '#2a1810'} />
            <rect x="-2" y="-12" width="2" height="18" fill="#3a2614" />
            <polygon points="0,-12 0,-2 14,-6" fill="#a09870" opacity="0.55" />
          </g>
        ))}

        {/* Water waves / shimmer lines */}
        {[172, 182, 196, 208, 220, 232, 248, 258].map((y, i) => (
          <rect
            key={`wave-${i}`}
            x={0} y={y}
            width={500} height={0.8}
            fill="#ffb050" opacity={0.12 + (i % 3) * 0.05}
            className="cinematic-wave" style={{ animationDelay: `${i * 0.22}s` }}
          />
        ))}

        {/* Sparkling water specks */}
        {[140, 170, 240, 300, 360, 410, 460, 110, 220, 280, 390].map((px, pi) => (
          <rect
            key={`spray-${pi}`} x={px} y={206 + (pi % 3) * 10} width={1} height={1}
            fill="#ffe0a8" opacity="0.6"
            className="abs-drift" style={{ animationDelay: `${pi * 0.4}s`, animationDuration: '4.2s' }}
          />
        ))}

        {/* Subtle low mist */}
        <rect x="0" y="190" width="500" height="14" fill="url(#abs-mist)" opacity="0.4" />
        <defs>
          <linearGradient id="abs-mist" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#3a1a26" />
          </linearGradient>
        </defs>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="30" fill="#000" opacity="0.25" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.35" />
      </svg>
    </div>
  );
}
