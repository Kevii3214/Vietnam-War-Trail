import { PixelPerson } from './PixelPeople';

// Builds the 10-vertex point string for a 5-pointed star centered at (cx, cy).
// `outer` is the outer radius, `inner` is the inner (indent) radius.
// Starts at the top and goes clockwise, which is how the gold star on a red
// field is conventionally oriented.
function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? outer : inner;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

// ===========================================================================
// CityFallsScene
// Styled to match the "previous scenes" we designed in
// EscapingVietnamCinematic.tsx (Scene 1 — "THE FALL").
//
// 500x280 pixel canvas, bg-gradient wrapper, detailed pixel-art layers,
// PixelPerson sprites with moods/sway, and CSS-keyframe animation via
// the `cinematic-*` classes.  Because this scene also renders standalone
// inside GameEngine (outside the EscapingVietnamCinematic wrapper that
// defines those keyframes locally), we include a scoped <style> block
// so the animations always resolve.
// ===========================================================================
export function CityFallsScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#3a1a1a] via-[#5a2a1a] to-[#2a1a0a]">
      {/* Scoped keyframes so cinematic-* classes work standalone. */}
      <style>{`
        @keyframes cfs-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes cfs-chibi-scared {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        @keyframes cfs-chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        .chibi-sway-idle   { animation: cfs-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: cfs-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: cfs-chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes cfs-flag-down { 0% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
        @keyframes cfs-flag-up   { 0% { transform: translateY(22px); }  100% { transform: translateY(0); } }
        @keyframes cfs-tank-roll { 0% { transform: translateX(-80px); } 100% { transform: translateX(90px); } }
        @keyframes cfs-walk-left {
          0%   { transform: translate(var(--wx-start, 540px), 0); }
          100% { transform: translate(var(--wx-end, -60px), 0); }
        }
        @keyframes cfs-walk-bob {
          0%, 100% { transform: translateY(0); }
          25%      { transform: translateY(-1px); }
          50%      { transform: translateY(0); }
          75%      { transform: translateY(-1px); }
        }
        @keyframes cfs-smoke-rise {
          0%   { transform: translateY(0); opacity: 0.55; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
        @keyframes cfs-ember-drift {
          0%   { transform: translate(0,0); opacity: 1; }
          100% { transform: translate(-18px,-60px); opacity: 0; }
        }
        @keyframes cfs-flicker {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 0.35; }
        }
        @keyframes cfs-pigeon-fly {
          0%   { transform: translate(0,0); }
          100% { transform: translate(220px,-40px); }
        }

        .cfs-flag-down   { animation: cfs-flag-down 6s ease-in-out forwards; }
        .cfs-flag-up     { animation: cfs-flag-up 6s ease-in-out forwards; }
        .cfs-tank-roll   { animation: cfs-tank-roll 7s ease-in-out forwards; }
        .cfs-walk-left   { animation: cfs-walk-left 22s linear infinite backwards; }
        .cfs-walk-bob    { animation: cfs-walk-bob 0.5s ease-in-out infinite; transform-box: fill-box; }
        .cfs-smoke-rise  { animation: cfs-smoke-rise 3s ease-out infinite; }
        .cfs-ember-drift { animation: cfs-ember-drift 3s linear infinite; }
        .cfs-flicker     { animation: cfs-flicker 2s ease-in-out infinite; }
        .cfs-pigeon-fly  { animation: cfs-pigeon-fly 12s linear infinite; transform-box: fill-box; }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Smoky sun */}
        <circle cx="380" cy="50" r="22" fill="#ffaa44" opacity="0.8" />
        <circle cx="380" cy="50" r="30" fill="#ff6633" opacity="0.25" />

        {/* Distant city silhouettes */}
        {[0, 30, 60, 90, 430, 460].map((bx, bi) => (
          <rect key={`db-${bi}`} x={bx} y={120 - (bi % 3) * 8} width={26} height={120} fill="#2a1a1a" opacity={0.6} />
        ))}

        {/* Independence Palace - center background */}
        <g>
          <rect x="160" y="90" width="180" height="140" fill="#d8cfa8" />
          <rect x="155" y="86" width="190" height="8" fill="#b8af88" />
          <rect x="180" y="70" width="140" height="22" fill="#c8c098" />
          <rect x="230" y="50" width="40" height="22" fill="#c8c098" />
          <rect x="246" y="30" width="8" height="22" fill="#8a8070" />
          <rect x="243" y="26" width="14" height="6" fill="#cc2222" />
          <rect x="250" y="24" width="5" height="5" fill="#ffdd44" />
          {/* Columns */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={`col-${i}`} x={175 + i * 28} y={100} width={8} height={128} fill="#f0e8c0" />
          ))}
          {/* Windows - some lit with fire */}
          {[0, 1, 2, 3, 4].map(i => (
            <rect
              key={`w-${i}`}
              x={187 + i * 28}
              y={108}
              width={12}
              height={20}
              fill={i === 1 || i === 3 ? '#cc3300' : '#3a2a1a'}
              className={i === 1 || i === 3 ? 'cfs-flicker' : undefined}
            />
          ))}
        </g>

        {/* Broken palace gates in foreground */}
        <rect x="120" y="200" width="6" height="50" fill="#5a5a5a" />
        <rect x="370" y="200" width="6" height="50" fill="#5a5a5a" />
        <g transform="translate(130 230) rotate(-25)">
          <rect x="0" y="0" width="80" height="4" fill="#6a6a6a" />
          <rect x="0" y="8" width="80" height="4" fill="#6a6a6a" />
        </g>
        <g transform="translate(300 230) rotate(15)">
          <rect x="0" y="0" width="70" height="4" fill="#6a6a6a" />
          <rect x="0" y="8" width="70" height="4" fill="#6a6a6a" />
        </g>

        {/* South flag (lowering) */}
        <rect x="205" y="60" width="2" height="35" fill="#888" />
        <g className="cfs-flag-down" style={{ transformOrigin: '206px 60px' }}>
          <rect x="207" y="78" width="24" height="16" fill="#ffcc33" />
          <rect x="207" y="80" width="24" height="2" fill="#cc2222" />
          <rect x="207" y="85" width="24" height="2" fill="#cc2222" />
          <rect x="207" y="90" width="24" height="2" fill="#cc2222" />
        </g>
        {/* North flag (rising) — red field with a proper 5-pointed gold star */}
        <rect x="293" y="60" width="2" height="35" fill="#888" />
        <g className="cfs-flag-up" style={{ transformOrigin: '294px 60px' }}>
          <rect x="295" y="64" width="26" height="18" fill="#cc1a1a" />
          {/* Slightly darker outline so the star edges stay crisp over red */}
          <polygon points={starPath(308, 73, 6.5, 2.6)} fill="#a07020" />
          <polygon points={starPath(308, 73, 6, 2.4)}   fill="#ffdd44" />
          {/* Little highlight on the top point */}
          <polygon points={starPath(308, 72.4, 2.2, 0.9)} fill="#fff2a0" opacity="0.85" />
        </g>

        {/* Tank rolling in */}
        <g className="cfs-tank-roll">
          <rect x="0" y="220" width="90" height="22" fill="#3a4a2a" />
          <rect x="0" y="220" width="90" height="2" fill="#4a5a3a" />
          <rect x="14" y="208" width="58" height="14" fill="#4a5a3a" />
          <rect x="60" y="204" width="50" height="6" fill="#2a3a1a" />
          {/* Hatch */}
          <rect x="22" y="210" width="10" height="6" fill="#1a2010" />
          {/* Barrel */}
          <rect x="70" y="212" width="36" height="3" fill="#2a3a1a" />
          <rect x="104" y="211" width="4" height="5" fill="#1a2010" />
          {/* Treads */}
          <rect x="0" y="242" width="92" height="8" fill="#1a1a1a" />
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={`tr-${i}`} x={4 + i * 14} y={242} width={10} height={8} fill="#2a2a2a" />
          ))}
          {/* Red star insignia */}
          <rect x="30" y="225" width="8" height="8" fill="#cc2222" />
          <rect x="31" y="226" width="2" height="2" fill="#ffdd44" />
          <rect x="34" y="228" width="2" height="2" fill="#ffdd44" />
          {/* Soldier on top */}
          <PixelPerson
            x={22} y={184} scale={1.3} variant="soldier"
            color="#e8b896" shirtColor="#3a5a2a" pantsColor="#2a3a18"
            hairColor="#1a1008" accentColor="#ffcf5c"
            mood="determined" sway="idle"
          />
          {/* Waving flag on tank — red field with matching gold star */}
          <rect x="14" y="178" width="1.5" height="18" fill="#4a3018" />
          <g className="cfs-flicker">
            <rect x="15.5" y="180" width="14" height="10" fill="#cc1a1a" />
            <polygon points={starPath(22.5, 185, 3.2, 1.3)} fill="#a07020" />
            <polygon points={starPath(22.5, 185, 2.8, 1.15)} fill="#ffdd44" />
          </g>
        </g>

        {/* Scared civilians watching from far right */}
        <g transform="translate(418, 198)">
          <PixelPerson
            x={0} y={0} scale={1.1} variant="civilian"
            color="#f4d0a4" shirtColor="#3a5a8a" pantsColor="#2a2030"
            hairColor="#1a0f08" accentColor="#f8e5a8"
            mood="shocked" sway="scared" swayDelay={0.2}
          />
        </g>
        <g transform="translate(446, 202)">
          <PixelPerson
            x={0} y={0} scale={0.95} variant="civilian"
            color="#e8b896" shirtColor="#b86048" pantsColor="#3a2818"
            hairColor="#2a1810" accentColor="#ffffff"
            mood="scared" sway="scared" swayDelay={0.5}
            mirror
          />
        </g>
        <g transform="translate(472, 204)">
          <PixelPerson
            x={0} y={0} scale={1} variant="civilian"
            color="#f0c8a4" shirtColor="#d8a848" pantsColor="#333348"
            hairColor="#3a2210" accentColor="#b84a4a"
            mood="sad" sway="idle" swayDelay={0.1}
          />
        </g>

        {/* Fleeing refugees walking right-to-left */}
        {[
          { scale: 1.1, y: 212, shirt: '#4a3a2a', pants: '#2a1a10', hair: '#1a0a04', mood: 'scared', delay: 0, dur: 24 },
          { scale: 1.0, y: 216, shirt: '#b84a4a', pants: '#2a2430', hair: '#2a1810', mood: 'sad',    delay: 3, dur: 22 },
          { scale: 1.25, y: 208, shirt: '#3a5a8a', pants: '#2a1a10', hair: '#1a0f08', mood: 'weary', delay: 6, dur: 26 },
          { scale: 0.9, y: 218, shirt: '#c9a24a', pants: '#3a2818', hair: '#2a1810', mood: 'scared', delay: 10, dur: 20 },
        ].map((r, ri) => (
          <g
            key={`flee-${ri}`}
            className="cfs-walk-left"
            style={{
              ['--wx-start' as string]: '540px',
              ['--wx-end' as string]: '-60px',
              animationDelay: `${r.delay}s`,
              animationDuration: `${r.dur}s`,
            } as React.CSSProperties}
          >
            <g transform={`translate(0 ${r.y})`}>
              <g className="cfs-walk-bob" style={{ animationDelay: `${ri * 0.1}s` }}>
                <PixelPerson
                  x={0} y={0} scale={r.scale} variant="civilian"
                  color="#e8b896" shirtColor={r.shirt} pantsColor={r.pants}
                  hairColor={r.hair} accentColor="#f0d090"
                  mood={r.mood as 'scared' | 'sad' | 'weary'}
                />
                {/* Bundle carried over shoulder */}
                <rect x={ri % 2 ? -4 : 16} y={-4} width={10} height={8} fill="#6a4a28" />
                <rect x={ri % 2 ? -4 : 16} y={-4} width={10} height={2} fill="#8a6a40" />
                <rect x={ri % 2 ? -2 : 18} y={-8} width={1} height={6} fill="#3a2a18" />
              </g>
            </g>
          </g>
        ))}

        {/* Cheering NLF victors on right side of palace, with small red flags */}
        <g transform="translate(340 196)">
          {[0, 1, 2].map(i => (
            <g key={`victor-${i}`} transform={`translate(${i * 22} ${(i % 2) * 3})`}>
              <PixelPerson
                x={0} y={0} scale={0.85} variant="civilian"
                color="#e8b896" shirtColor={i === 1 ? '#4a3a24' : '#6a4a2a'} pantsColor="#2a1a10"
                hairColor="#1a0a04" accentColor="#cc1a1a"
                mood="determined" sway="idle" swayDelay={i * 0.3}
              />
              <rect x={4} y={-8} width={0.8} height={12} fill="#3a2210" />
              <rect x={4.8} y={-8} width={6} height={4} fill="#cc1a1a" className="cfs-flicker" />
              <rect x={6} y={-7} width={1.5} height={1.5} fill="#ffdd44" />
            </g>
          ))}
        </g>

        {/* Palm trees flanking the palace */}
        {[{ px: 100, py: 150 }, { px: 398, py: 150 }].map((p, pi) => (
          <g key={`palm-${pi}`} transform={`translate(${p.px} ${p.py})`}>
            <rect x="0" y="0" width="5" height="82" fill="#3a2614" />
            <rect x="1" y="8" width="3" height="2" fill="#2a1a0a" />
            <rect x="1" y="28" width="3" height="2" fill="#2a1a0a" />
            <rect x="1" y="48" width="3" height="2" fill="#2a1a0a" />
            <polygon points="2,0 -16,-6 -14,2" fill="#2a3a1a" />
            <polygon points="2,0 20,-5 16,3" fill="#2a3a1a" />
            <polygon points="2,0 -14,8 -6,10" fill="#1a2a0a" />
            <polygon points="2,0 18,10 8,10" fill="#1a2a0a" />
            <polygon points="2,0 -4,-14 4,-12" fill="#2a3a1a" />
          </g>
        ))}

        {/* Sandbag barricade in foreground left */}
        <g transform="translate(64 244)">
          {[0, 1, 2, 3].map(i => (
            <g key={`sb-${i}`} transform={`translate(${i * 14} 0)`}>
              <rect x="0" y="0" width="14" height="8" fill="#8a6a40" />
              <rect x="0" y="0" width="14" height="2" fill="#a88050" />
              <rect x="2" y="2" width="2" height="6" fill="#6a4a28" opacity="0.6" />
              <rect x="10" y="2" width="2" height="6" fill="#6a4a28" opacity="0.6" />
            </g>
          ))}
          {[0, 1, 2].map(i => (
            <g key={`sb2-${i}`} transform={`translate(${7 + i * 14} -6)`}>
              <rect x="0" y="0" width="14" height="7" fill="#7a5a38" />
              <rect x="0" y="0" width="14" height="2" fill="#986f44" />
              <rect x="5" y="2" width="2" height="5" fill="#5a3e20" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* Abandoned military helmet on the ground */}
        <g transform="translate(220 256)">
          <ellipse cx="0" cy="2" rx="8" ry="2" fill="#0a0a0a" opacity="0.6" />
          <path d="M -8 1 Q 0 -6 8 1 Z" fill="#3a4a2a" />
          <path d="M -8 1 Q 0 -6 8 1 Z" fill="none" stroke="#2a3a1a" strokeWidth="0.6" />
          <rect x="-2" y="-3" width="4" height="1.5" fill="#ffcf5c" opacity="0.5" />
        </g>

        {/* Dropped rifle and shell casings */}
        <g transform="translate(252 260) rotate(18)">
          <rect x="0" y="0" width="22" height="2" fill="#3a2818" />
          <rect x="16" y="-2" width="6" height="5" fill="#2a1810" />
          <rect x="-2" y="-1" width="4" height="3" fill="#4a3820" />
        </g>
        {[274, 280, 266].map((cx, ci) => (
          <rect key={`cas-${ci}`} x={cx} y={264} width={1.2} height={2.5} fill="#c9a24a" opacity="0.8" />
        ))}

        {/* Rising smoke columns from distant fires */}
        {[60, 440, 470].map((sx, si) => (
          <g key={`smkcol-${si}`}>
            <rect
              x={sx} y={100 - si * 8} width={6} height={60} fill="#3a3028" opacity={0.35}
              className="cfs-smoke-rise" style={{ animationDelay: `${si * 0.6}s` }}
            />
            <rect
              x={sx + 2} y={90 - si * 8} width={4} height={40} fill="#2a241c" opacity={0.28}
              className="cfs-smoke-rise" style={{ animationDelay: `${si * 0.6 + 0.4}s` }}
            />
          </g>
        ))}

        {/* Dust clouds */}
        <ellipse cx="80" cy="252" rx="40" ry="6" fill="#8a6a4a" opacity="0.5" className="cinematic-smoke" />
        <ellipse cx="40" cy="258" rx="36" ry="5" fill="#6a5a4a" opacity="0.4" className="cinematic-smoke" style={{ animationDelay: '0.4s' }} />

        {/* Drifting ash particles */}
        {[80, 160, 240, 320, 400, 120, 280, 360].map((ax, ai) => (
          <rect
            key={`ash-${ai}`} x={ax} y={230 - (ai % 4) * 15} width={1.5} height={1.5}
            fill="#d8cfa8" opacity="0.45"
            className="cfs-ember-drift" style={{ animationDelay: `${ai * 0.4}s` }}
          />
        ))}

        {/* Falling rubble chunks */}
        {[130, 148, 168, 185, 300, 322, 344].map((rx, ri) => (
          <rect
            key={`rubble-${ri}`} x={rx} y={180 + (ri % 3) * 18} width={4} height={4}
            fill="#6a5a4a" opacity="0.7"
            className="cfs-smoke-rise" style={{ animationDelay: `${ri * 0.3}s` }}
          />
        ))}

        {/* Distant fleeing helicopter silhouettes (evacuation) */}
        {[{ hx: 60, hy: 34, d: 0 }, { hx: 110, hy: 22, d: 1.5 }, { hx: 30, hy: 48, d: 3 }].map((h, hi) => (
          <g
            key={`heli-${hi}`} className="cfs-pigeon-fly"
            style={{ animationDelay: `${h.d}s`, animationDuration: '12s' }}
            transform={`translate(${h.hx} ${h.hy})`}
          >
            <rect x="0" y="2" width="12" height="3" fill="#1a1210" />
            <rect x="10" y="3" width="5" height="1" fill="#1a1210" />
            <rect x="4" y="0" width="2" height="2" fill="#1a1210" />
            <rect x="-4" y="1" width="20" height="0.6" fill="#2a2018" opacity="0.8" className="cfs-flicker" />
          </g>
        ))}
      </svg>
    </div>
  );
}
