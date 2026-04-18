import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { GameMenuBar } from '../GameMenuBar';
import { PixelPerson } from './PixelPeople';

interface CinematicProps {
  onComplete: () => void;
}

interface TypewriterProps {
  text: string;
  onComplete: () => void;
  speed?: number;
}

function Typewriter({ text, onComplete, speed = 28 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <p className="font-retro text-[11px] md:text-xs leading-snug text-foreground text-left">
      {displayed}
      {!done && <span className="opacity-80 animate-pulse">_</span>}
    </p>
  );
}

// ===========================================================================
// SCENE 1 — THE FALL: Tank crashing through Independence Palace gates,
// flag of the South being lowered, flag of the North rising.
// ===========================================================================
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#3a1a1a] via-[#5a2a1a] to-[#2a1a0a]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Smoky sun */}
        <circle cx="380" cy="50" r="22" fill="#ffaa44" opacity="0.8" />
        <circle cx="380" cy="50" r="30" fill="#ff6633" opacity="0.25" />

        {/* Distant buildings */}
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
          {/* Windows */}
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={`w-${i}`} x={187 + i * 28} y={108} width={12} height={20} fill="#3a2a1a" />
          ))}
        </g>

        {/* Broken gates in foreground */}
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

        {/* Two flagpoles on palace */}
        {/* South flag (lowering) - yellow w/ red stripes */}
        <rect x="205" y="60" width="2" height="35" fill="#888" />
        <g className="cinematic-flag-down" style={{ transformOrigin: '206px 60px' }}>
          <rect x="207" y="78" width="24" height="16" fill="#ffcc33" />
          <rect x="207" y="80" width="24" height="2" fill="#cc2222" />
          <rect x="207" y="85" width="24" height="2" fill="#cc2222" />
          <rect x="207" y="90" width="24" height="2" fill="#cc2222" />
        </g>
        {/* North flag (rising) - red w/ yellow star */}
        <rect x="293" y="60" width="2" height="35" fill="#888" />
        <g className="cinematic-flag-up" style={{ transformOrigin: '294px 60px' }}>
          <rect x="295" y="64" width="26" height="18" fill="#cc1a1a" />
          <rect x="305" y="69" width="6" height="6" fill="#ffdd44" />
          <rect x="303" y="71" width="2" height="2" fill="#ffdd44" />
          <rect x="311" y="71" width="2" height="2" fill="#ffdd44" />
          <rect x="305" y="77" width="2" height="2" fill="#ffdd44" />
          <rect x="309" y="77" width="2" height="2" fill="#ffdd44" />
        </g>

        {/* Tank - rolling into scene (with soldier crew & cheering crowd) */}
        <g className="cinematic-tank-roll">
          {/* Hull */}
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
          {/* Red star */}
          <rect x="30" y="225" width="8" height="8" fill="#cc2222" />
          <rect x="31" y="226" width="2" height="2" fill="#ffdd44" />
          <rect x="34" y="228" width="2" height="2" fill="#ffdd44" />
          {/* Soldier on top - determined */}
          <PixelPerson
            x={22} y={184} scale={1.3} variant="soldier"
            color="#e8b896" shirtColor="#3a5a2a" pantsColor="#2a3a18"
            hairColor="#1a1008" accentColor="#ffcf5c"
            mood="determined" sway="idle"
          />
          {/* Waving flag on tank */}
          <rect x="14" y="178" width="1.5" height="18" fill="#4a3018" />
          <rect x="15.5" y="180" width="14" height="10" fill="#cc1a1a" className="cinematic-flicker" />
          <rect x="20" y="183" width="4" height="4" fill="#ffdd44" />
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

        {/* Fleeing refugees walking right-to-left across mid-ground, carrying bundles */}
        {[
          { scale: 1.1, y: 212, shirt: '#4a3a2a', pants: '#2a1a10', hair: '#1a0a04', mood: 'scared', delay: 0, dur: 24 },
          { scale: 1.0, y: 216, shirt: '#b84a4a', pants: '#2a2430', hair: '#2a1810', mood: 'sad', delay: 3, dur: 22 },
          { scale: 1.25, y: 208, shirt: '#3a5a8a', pants: '#2a1a10', hair: '#1a0f08', mood: 'weary', delay: 6, dur: 26 },
          { scale: 0.9, y: 218, shirt: '#c9a24a', pants: '#3a2818', hair: '#2a1810', mood: 'scared', delay: 10, dur: 20 },
        ].map((r, ri) => (
          <g key={`flee-${ri}`} className="cinematic-walk-left"
            style={{ ['--wx-start' as string]: '540px', ['--wx-end' as string]: '-60px',
                     animationDelay: `${r.delay}s`, animationDuration: `${r.dur}s` } as React.CSSProperties}>
            <g transform={`translate(0 ${r.y})`}>
              <g className="cinematic-walk-bob" style={{ animationDelay: `${ri * 0.1}s` }}>
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

        {/* Additional lone refugees (spaced apart so no two overlap) */}
        <g className="cinematic-walk-left"
          style={{ ['--wx-start' as string]: '560px', ['--wx-end' as string]: '-80px',
                   animationDelay: '13s', animationDuration: '28s' } as React.CSSProperties}>
          <g transform="translate(0 214)">
            <g className="cinematic-walk-bob">
              <PixelPerson
                x={0} y={0} scale={1.15} variant="civilian"
                color="#f0c8a0" shirtColor="#8a6048" pantsColor="#2a2018"
                hairColor="#1a0f08" accentColor="#d8a848"
                mood="determined"
              />
            </g>
          </g>
        </g>
        <g className="cinematic-walk-left"
          style={{ ['--wx-start' as string]: '560px', ['--wx-end' as string]: '-80px',
                   animationDelay: '16s', animationDuration: '30s' } as React.CSSProperties}>
          <g transform="translate(0 218)">
            <g className="cinematic-walk-bob" style={{ animationDelay: '0.2s' }}>
              <PixelPerson
                x={0} y={0} scale={0.75} variant="civilian"
                color="#f4d0a4" shirtColor="#6aa85a" pantsColor="#3a2818"
                hairColor="#2a1810" accentColor="#ffffff"
                mood="scared"
              />
            </g>
          </g>
        </g>

        {/* Falling rubble chunks */}
        {[130, 148, 168, 185, 300, 322, 344].map((rx, ri) => (
          <rect key={`rubble-${ri}`} x={rx} y={180 + (ri % 3) * 18} width={4} height={4}
            fill="#6a5a4a" opacity="0.7"
            className="cinematic-smoke-rise" style={{ animationDelay: `${ri * 0.3}s` }}
          />
        ))}

        {/* Rising smoke columns from distant fires */}
        {[60, 440, 470].map((sx, si) => (
          <g key={`smkcol-${si}`}>
            <rect x={sx} y={100 - si * 8} width={6} height={60} fill="#3a3028" opacity={0.35}
              className="cinematic-smoke-rise" style={{ animationDelay: `${si * 0.6}s` }}
            />
            <rect x={sx + 2} y={90 - si * 8} width={4} height={40} fill="#2a241c" opacity={0.28}
              className="cinematic-smoke-rise" style={{ animationDelay: `${si * 0.6 + 0.4}s` }}
            />
          </g>
        ))}

        {/* Dust clouds */}
        <ellipse cx="80" cy="252" rx="40" ry="6" fill="#8a6a4a" opacity="0.5" className="cinematic-smoke" />
        <ellipse cx="40" cy="258" rx="36" ry="5" fill="#6a5a4a" opacity="0.4" className="cinematic-smoke" style={{ animationDelay: '0.4s' }} />

        {/* Drifting ash particles */}
        {[80, 160, 240, 320, 400, 120, 280, 360].map((ax, ai) => (
          <rect key={`ash-${ai}`} x={ax} y={230 - (ai % 4) * 15} width={1.5} height={1.5}
            fill="#d8cfa8" opacity="0.45"
            className="cinematic-ember-drift" style={{ animationDelay: `${ai * 0.4}s` }}
          />
        ))}

        {/* Distant fleeing helicopter silhouettes (evacuation) */}
        {[{ hx: 60, hy: 34, d: 0 }, { hx: 110, hy: 22, d: 1.5 }, { hx: 30, hy: 48, d: 3 }].map((h, hi) => (
          <g key={`heli-${hi}`} className="cinematic-pigeon-fly"
            style={{ animationDelay: `${h.d}s`, animationDuration: '12s' }}
            transform={`translate(${h.hx} ${h.hy})`}>
            <rect x="0" y="2" width="12" height="3" fill="#1a1210" />
            <rect x="10" y="3" width="5" height="1" fill="#1a1210" />
            <rect x="4" y="0" width="2" height="2" fill="#1a1210" />
            <rect x="-4" y="1" width="20" height="0.6" fill="#2a2018" opacity="0.8" className="cinematic-flicker" />
          </g>
        ))}

        {/* Palm trees flanking the palace */}
        {[{ px: 100, py: 150 }, { px: 398, py: 150 }].map((p, pi) => (
          <g key={`palm-${pi}`} transform={`translate(${p.px} ${p.py})`}>
            <rect x="0" y="0" width="5" height="82" fill="#3a2614" />
            <rect x="1" y="8" width="3" height="2" fill="#2a1a0a" />
            <rect x="1" y="28" width="3" height="2" fill="#2a1a0a" />
            <rect x="1" y="48" width="3" height="2" fill="#2a1a0a" />
            {/* Fronds */}
            <polygon points="2,0 -16,-6 -14,2" fill="#2a3a1a" />
            <polygon points="2,0 20,-5 16,3" fill="#2a3a1a" />
            <polygon points="2,0 -14,8 -6,10" fill="#1a2a0a" />
            <polygon points="2,0 18,10 8,10" fill="#1a2a0a" />
            <polygon points="2,0 -4,-14 4,-12" fill="#2a3a1a" />
          </g>
        ))}

        {/* Cheering NLF victors crowd on right side of palace, small red flags */}
        <g transform="translate(340 196)">
          {[0, 1, 2].map(i => (
            <g key={`victor-${i}`} transform={`translate(${i * 22} ${(i % 2) * 3})`}>
              <PixelPerson
                x={0} y={0} scale={0.85} variant="civilian"
                color="#e8b896" shirtColor={i === 1 ? '#4a3a24' : '#6a4a2a'} pantsColor="#2a1a10"
                hairColor="#1a0a04" accentColor="#cc1a1a"
                mood="determined" sway="idle" swayDelay={i * 0.3}
              />
              {/* Small handheld red flag */}
              <rect x={4} y={-8} width={0.8} height={12} fill="#3a2210" />
              <rect x={4.8} y={-8} width={6} height={4} fill="#cc1a1a" className="cinematic-flicker" />
              <rect x={6} y={-7} width={1.5} height={1.5} fill="#ffdd44" />
            </g>
          ))}
        </g>

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
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 2 — THE ERASURE: Painter stencils "HO CHI MINH CITY" over "SAIGON";
// bureaucrat circles "PUPPET" on a dossier in red ink.
// ===========================================================================
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a2a3a] via-[#2a2a2a] to-[#1a1a1a]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Distant buildings */}
        {[20, 70, 130, 200, 370, 440].map((bx, bi) => (
          <rect key={`bg-${bi}`} x={bx} y={80 + (bi % 2) * 12} width={40} height={160} fill="#2a2a2a" opacity={0.7} />
        ))}
        {/* Window lights */}
        {[30, 80, 140, 210, 380, 450].map((wx, wi) => (
          [0, 1, 2, 3].map(row => (
            <rect key={`wl-${wi}-${row}`} x={wx + 4} y={100 + row * 24} width={8} height={12} fill="#c9a24a" opacity="0.55" />
          ))
        ))}

        {/* Ground */}
        <rect x="0" y="240" width="500" height="40" fill="#1a1a10" />
        <rect x="0" y="240" width="500" height="2" fill="#2a2418" />

        {/* Street sign post */}
        <rect x="100" y="110" width="6" height="130" fill="#4a3a2a" />
        {/* Old sign: SAIGON crossed out */}
        <rect x="60" y="118" width="90" height="22" fill="#e8d8a8" />
        <rect x="62" y="120" width="86" height="18" fill="#f0e0b0" />
        <text x="105" y="134" textAnchor="middle" fill="#7a6a40" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.55">SAIGON</text>
        <line x1="64" y1="129" x2="146" y2="129" stroke="#1a1a1a" strokeWidth="2" />
        {/* New sign: HO CHI MINH CITY painted over */}
        <rect x="50" y="150" width="110" height="26" fill="#cc2222" />
        <rect x="52" y="152" width="106" height="22" fill="#d83838" />
        <text x="105" y="163" textAnchor="middle" fill="#ffdd44" fontSize="7" fontFamily="monospace" fontWeight="bold">HO CHI MINH</text>
        <text x="105" y="172" textAnchor="middle" fill="#ffdd44" fontSize="7" fontFamily="monospace" fontWeight="bold">CITY</text>
        {/* Paint drips */}
        <rect x="60" y="176" width="2" height="6" fill="#cc2222" />
        <rect x="100" y="176" width="2" height="8" fill="#cc2222" />
        <rect x="140" y="176" width="2" height="5" fill="#cc2222" />

        {/* Painter with stencil + bucket (left of sign, on ladder) */}
        <g transform="translate(28, 145)">
          {/* Ladder */}
          <rect x="0" y="0" width="3" height="95" fill="#5a3a1a" />
          <rect x="14" y="0" width="3" height="95" fill="#5a3a1a" />
          {[10, 30, 50, 70].map((ry, ri) => (
            <rect key={`rung-${ri}`} x="0" y={ry} width="17" height="2" fill="#6a4a2a" />
          ))}
          {/* Painter - paint-splattered red apron, weary expression */}
          <PixelPerson
            x={-4} y={-20} scale={1.4} variant="civilian"
            color="#e8b890" shirtColor="#8a2a1a" pantsColor="#3a2818"
            hairColor="#1a1008" accentColor="#f0d090"
            mood="weary" sway="idle"
          />
          {/* Brush arm - painting motion */}
          <g className="cinematic-paint-arm" style={{ transformOrigin: '22px 10px' }}>
            <rect x="22" y="8" width="16" height="3" fill="#5a3a1a" />
            <rect x="38" y="6" width="6" height="7" fill="#cc2222" />
            {/* Drips from brush */}
            <rect x="40" y="13" width="1" height="3" fill="#cc2222" opacity="0.7" />
          </g>
          {/* Paint bucket */}
          <rect x="-8" y="92" width="16" height="14" fill="#8a3030" />
          <rect x="-8" y="91" width="16" height="2" fill="#a04040" />
          <rect x="-4" y="94" width="8" height="8" fill="#cc2222" />
          {/* Paint can highlight */}
          <rect x="-5" y="95" width="2" height="1" fill="#ff6a4a" />
        </g>

        {/* Pedestrians standing on the curb (back turned, weary) */}
        <g transform="translate(196, 208)">
          <PixelPerson
            x={0} y={0} scale={1.1} variant="civilian"
            color="#e8b896" shirtColor="#3a3a44" pantsColor="#2a2018"
            hairColor="#1a0f08" accentColor="#a8a8a8"
            mood="weary" sway="idle"
          />
        </g>
        <g transform="translate(232, 212)">
          <PixelPerson
            x={0} y={0} scale={0.95} variant="civilian"
            color="#f0c8a4" shirtColor="#5a3a2a" pantsColor="#2a2030"
            hairColor="#2a1810" accentColor="#d0b080"
            mood="sad" sway="idle" swayDelay={0.3}
            mirror
          />
        </g>

        {/* Walking pedestrians — daily street traffic under the new regime */}
        {/* Left-to-right walkers */}
        {[
          { scale: 1.1, y: 210, shirt: '#2a4a6a', pants: '#2a1810', hair: '#1a0f08', accent: '#c8c8c8', mood: 'weary', delay: 0, dur: 26, bundle: false },
          { scale: 1.0, y: 214, shirt: '#8a6048', pants: '#3a2818', hair: '#2a1810', accent: '#d8a848', mood: 'sad', delay: 5, dur: 24, bundle: true },
          { scale: 1.15, y: 208, shirt: '#4a5a3a', pants: '#2a2018', hair: '#1a0f08', accent: '#ffffff', mood: 'neutral', delay: 10, dur: 28, bundle: false },
          { scale: 0.95, y: 216, shirt: '#6a4a5a', pants: '#2a2030', hair: '#2a1810', accent: '#e0d0b8', mood: 'weary', delay: 15, dur: 22, bundle: false },
        ].map((p, pi) => (
          <g key={`ped-r-${pi}`} className="cinematic-walk-right"
            style={{ ['--wx-start' as string]: '-80px', ['--wx-end' as string]: '560px',
                     animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` } as React.CSSProperties}>
            <g transform={`translate(0 ${p.y})`}>
              <g className="cinematic-walk-bob" style={{ animationDelay: `${pi * 0.12}s` }}>
                <PixelPerson
                  x={0} y={0} scale={p.scale} variant="civilian"
                  color="#e8b896" shirtColor={p.shirt} pantsColor={p.pants}
                  hairColor={p.hair} accentColor={p.accent}
                  mood={p.mood as 'weary' | 'sad' | 'neutral'}
                />
                {p.bundle && (
                  <>
                    <rect x="16" y="-2" width="8" height="7" fill="#8a6a3a" />
                    <rect x="16" y="-2" width="8" height="2" fill="#a88050" />
                  </>
                )}
              </g>
            </g>
          </g>
        ))}

        {/* Right-to-left walkers (other side of the street) */}
        {[
          { scale: 1.05, y: 218, shirt: '#3a3a44', pants: '#2a2018', hair: '#1a0f08', accent: '#a8a8a8', mood: 'sad', delay: 2, dur: 25 },
          { scale: 1.1, y: 212, shirt: '#5a3a2a', pants: '#2a2030', hair: '#2a1810', accent: '#d0b080', mood: 'weary', delay: 8, dur: 23 },
          { scale: 0.9, y: 220, shirt: '#d4a848', pants: '#3a2818', hair: '#1a0f08', accent: '#ffffff', mood: 'neutral', delay: 14, dur: 27 },
        ].map((p, pi) => (
          <g key={`ped-l-${pi}`} className="cinematic-walk-left"
            style={{ ['--wx-start' as string]: '560px', ['--wx-end' as string]: '-80px',
                     animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` } as React.CSSProperties}>
            <g transform={`translate(0 ${p.y})`}>
              <g className="cinematic-walk-bob" style={{ animationDelay: `${pi * 0.15}s` }}>
                <PixelPerson
                  x={0} y={0} scale={p.scale} variant="civilian"
                  color="#f0c8a4" shirtColor={p.shirt} pantsColor={p.pants}
                  hairColor={p.hair} accentColor={p.accent}
                  mood={p.mood as 'sad' | 'weary' | 'neutral'}
                  mirror
                />
              </g>
            </g>
          </g>
        ))}

        {/* Cyclist pedaling across (slower pace) */}
        <g className="cinematic-walk-right"
          style={{ ['--wx-start' as string]: '-60px', ['--wx-end' as string]: '560px',
                   animationDelay: '4s', animationDuration: '18s' } as React.CSSProperties}>
          <g transform="translate(0 220)">
            <g className="cinematic-walk-bob" style={{ animationDuration: '0.25s' }}>
              <PixelPerson
                x={0} y={-12} scale={1.1} variant="civilian"
                color="#e8b896" shirtColor="#3a5a7a" pantsColor="#1a1a28"
                hairColor="#1a0f08" accentColor="#f0d090"
                mood="determined"
              />
            </g>
            {/* Bicycle underneath */}
            <g>
              <circle cx="-2" cy="16" r="5" fill="none" stroke="#2a1810" strokeWidth="1.2" />
              <circle cx="-2" cy="16" r="1" fill="#5a4a34" />
              <circle cx="18" cy="16" r="5" fill="none" stroke="#2a1810" strokeWidth="1.2" />
              <circle cx="18" cy="16" r="1" fill="#5a4a34" />
              <line x1="-2" y1="16" x2="10" y2="6" stroke="#4a3420" strokeWidth="1" />
              <line x1="10" y1="6" x2="18" y2="16" stroke="#4a3420" strokeWidth="1" />
              <line x1="-2" y1="16" x2="18" y2="16" stroke="#4a3420" strokeWidth="1" />
              <line x1="10" y1="6" x2="-2" y2="16" stroke="#4a3420" strokeWidth="1" />
              {/* Spinning spokes (rotating wheels) */}
              <g style={{ transformOrigin: '-2px 16px', animation: 'cin-clock-tick 0.12s linear infinite' }}>
                <line x1="-2" y1="11" x2="-2" y2="21" stroke="#5a4a34" strokeWidth="0.4" />
                <line x1="-7" y1="16" x2="3" y2="16" stroke="#5a4a34" strokeWidth="0.4" />
              </g>
              <g style={{ transformOrigin: '18px 16px', animation: 'cin-clock-tick 0.12s linear infinite' }}>
                <line x1="18" y1="11" x2="18" y2="21" stroke="#5a4a34" strokeWidth="0.4" />
                <line x1="13" y1="16" x2="23" y2="16" stroke="#5a4a34" strokeWidth="0.4" />
              </g>
            </g>
          </g>
        </g>

        {/* Pigeons flying across */}
        {[0, 1, 2].map(i => (
          <g
            key={`pigeon-${i}`}
            className="cinematic-pigeon-fly"
            style={{ animationDelay: `${i * 1.2}s` }}
            transform={`translate(${60 + i * 8} ${60 + i * 8})`}
          >
            <rect x="0" y="0" width="5" height="1.5" fill="#b8b8b8" />
            <rect x="2" y="-1" width="3" height="1" fill="#a0a0a0" />
            <rect x="2" y="1.5" width="3" height="1" fill="#a0a0a0" />
          </g>
        ))}

        {/* Fallen pamphlets / torn papers on the ground */}
        {[220, 260, 310, 360, 420, 460].map((px, pi) => (
          <g key={`paper-${pi}`} transform={`translate(${px} ${244 + (pi % 2) * 3}) rotate(${pi * 22})`}>
            <rect x="0" y="0" width="10" height="6" fill="#d8cfa8" opacity="0.85" />
            <rect x="0" y="0" width="10" height="1" fill="#c8a060" opacity="0.7" />
          </g>
        ))}

        {/* Propaganda poster on building */}
        <g transform="translate(430, 130)">
          <rect x="0" y="0" width="36" height="48" fill="#8a2a1a" />
          <rect x="2" y="2" width="32" height="44" fill="#b83a2a" />
          <rect x="6" y="6" width="24" height="14" fill="#ffdd44" />
          <rect x="8" y="22" width="20" height="2" fill="#ffdd44" />
          <rect x="8" y="26" width="16" height="2" fill="#ffdd44" />
          <rect x="8" y="30" width="22" height="2" fill="#ffdd44" />
          <rect x="8" y="38" width="12" height="6" fill="#ffdd44" />
        </g>

        {/* Ceiling / wire lights strung between buildings */}
        <line x1="0" y1="58" x2="500" y2="70" stroke="#3a3020" strokeWidth="1" />
        {[40, 120, 200, 280, 360, 440].map((lx, li) => (
          <g key={`bulb-${li}`}>
            <rect x={lx - 1} y={60 + (lx / 60)} width={2} height={3} fill="#2a2018" />
            <circle cx={lx} cy={66 + (lx / 60)} r={2.5} fill="#ffdd88" opacity="0.75" className="cinematic-lamp-flicker" />
          </g>
        ))}

        {/* Red banner strung across the street (propaganda slogan) */}
        <g>
          <rect x="0" y="44" width="500" height="14" fill="#a8221a" opacity="0.95" />
          <rect x="0" y="44" width="500" height="2" fill="#c0301c" />
          <rect x="0" y="56" width="500" height="2" fill="#7a1410" />
          <text x="250" y="54" textAnchor="middle" fill="#ffdd44" fontSize="7" fontFamily="monospace" fontWeight="bold">
            ĐỘC LẬP • TỰ DO • HẠNH PHÚC
          </text>
          {/* Banner tie-ropes */}
          <line x1="0" y1="48" x2="14" y2="42" stroke="#6a1a10" strokeWidth="1" />
          <line x1="500" y1="48" x2="486" y2="42" stroke="#6a1a10" strokeWidth="1" />
        </g>

        {/* Armed soldier standing guard on the corner */}
        <g transform="translate(164 198)">
          <PixelPerson
            x={0} y={0} scale={1.3} variant="soldier"
            color="#e8b890" shirtColor="#3a5a2a" pantsColor="#2a3a18"
            hairColor="#1a1008" accentColor="#ffcf5c"
            mood="angry" sway="idle"
          />
          {/* Rifle held diagonally */}
          <g transform="translate(14 6) rotate(-18)">
            <rect x="0" y="0" width="26" height="2" fill="#2a1810" />
            <rect x="22" y="-1" width="6" height="4" fill="#1a1008" />
            <rect x="-2" y="0" width="4" height="2" fill="#4a3424" />
          </g>
        </g>

        {/* Parked bicycle leaning against the wall */}
        <g transform="translate(258 220)">
          <circle cx="6" cy="16" r="6" fill="none" stroke="#3a2a1a" strokeWidth="1.2" />
          <circle cx="6" cy="16" r="1.2" fill="#5a4a34" />
          <circle cx="26" cy="16" r="6" fill="none" stroke="#3a2a1a" strokeWidth="1.2" />
          <circle cx="26" cy="16" r="1.2" fill="#5a4a34" />
          {/* Frame */}
          <line x1="6" y1="16" x2="18" y2="5" stroke="#5a3a1a" strokeWidth="1.4" />
          <line x1="18" y1="5" x2="26" y2="16" stroke="#5a3a1a" strokeWidth="1.4" />
          <line x1="6" y1="16" x2="26" y2="16" stroke="#5a3a1a" strokeWidth="1.2" />
          <line x1="18" y1="5" x2="6" y2="16" stroke="#5a3a1a" strokeWidth="1.2" />
          {/* Seat + handlebars */}
          <rect x="15" y="3" width="6" height="2" fill="#2a1810" />
          <rect x="3" y="4" width="6" height="1.5" fill="#2a1810" />
          {/* Basket with a loaf-like bundle */}
          <rect x="1" y="8" width="8" height="5" fill="#8a6a3a" />
          <rect x="2" y="6" width="6" height="2" fill="#c09a6a" />
        </g>

        {/* Street vendor cart with a steaming pot (phở stand) */}
        <g transform="translate(305 208)">
          {/* Cart body */}
          <rect x="0" y="12" width="42" height="16" fill="#6a4a28" />
          <rect x="0" y="12" width="42" height="3" fill="#8a6a44" />
          {/* Canopy */}
          <rect x="-4" y="0" width="50" height="4" fill="#8a2a1a" />
          <rect x="-4" y="4" width="50" height="2" fill="#6a1a10" />
          <rect x="-2" y="0" width="2" height="12" fill="#3a2418" />
          <rect x="44" y="0" width="2" height="12" fill="#3a2418" />
          {/* Pot with steam */}
          <rect x="6" y="7" width="14" height="8" fill="#3a3a3a" />
          <rect x="5" y="6" width="16" height="2" fill="#5a5a5a" />
          <rect x="11" y="4" width="4" height="3" fill="#2a2a2a" />
          {[0, 1, 2].map(i => (
            <rect key={`vsteam-${i}`} x={9 + i * 3} y={-4 - i * 2} width={2} height={4}
              fill="#e0dcc0" opacity="0.55"
              className="cinematic-smoke-rise" style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2s' }}
            />
          ))}
          {/* Wheels */}
          <circle cx="8" cy="30" r="5" fill="#2a1810" stroke="#5a3a1a" strokeWidth="1" />
          <circle cx="34" cy="30" r="5" fill="#2a1810" stroke="#5a3a1a" strokeWidth="1" />
          {/* Small stools */}
          <rect x="-8" y="24" width="6" height="4" fill="#5a3a1a" />
          <rect x="44" y="24" width="6" height="4" fill="#5a3a1a" />
        </g>

        {/* Vendor behind cart */}
        <g transform="translate(322 198)">
          <PixelPerson
            x={0} y={0} scale={0.95} variant="civilian"
            color="#f0c8a0" shirtColor="#e8d8a0" pantsColor="#3a2818"
            hairColor="#1a0f08" accentColor="#b84a4a"
            mood="weary" sway="idle" swayDelay={0.4}
          />
        </g>

        {/* Chalk graffiti on wall (subtle dissent) */}
        <g transform="translate(200 148)" opacity="0.55">
          <rect x="0" y="0" width="14" height="1" fill="#e8d8a0" />
          <rect x="0" y="3" width="10" height="1" fill="#e8d8a0" />
          <rect x="0" y="6" width="12" height="1" fill="#e8d8a0" />
        </g>

        {/* Bureaucrat's dossier in foreground right - floating inset card */}
        <g transform="translate(270, 170)">
          <rect x="0" y="0" width="200" height="80" fill="#f0e0b8" />
          <rect x="2" y="2" width="196" height="76" fill="#f8ecc0" />
          <rect x="2" y="2" width="196" height="10" fill="#c9a24a" />
          <text x="100" y="10" textAnchor="middle" fill="#2a1a10" fontSize="6" fontFamily="monospace" fontWeight="bold">MINISTRY OF PUBLIC SECURITY</text>
          <text x="10" y="28" fill="#2a1a10" fontSize="7" fontFamily="monospace">NAME: ...........................</text>
          <text x="10" y="42" fill="#2a1a10" fontSize="7" fontFamily="monospace">SERVED: ARVN, SOUTH</text>
          <text x="10" y="56" fill="#2a1a10" fontSize="7" fontFamily="monospace">CLASS:</text>
          <text x="48" y="56" fill="#cc1a1a" fontSize="9" fontFamily="monospace" fontWeight="bold">PUPPET</text>
          {/* Red circle around PUPPET */}
          <ellipse cx="67" cy="53" rx="28" ry="11" fill="none" stroke="#cc1a1a" strokeWidth="2" className="cinematic-fire-glow" />
          <text x="10" y="70" fill="#2a1a10" fontSize="7" fontFamily="monospace">STATUS: RE-EDUCATION</text>
        </g>
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 3 — THE GREAT DEVALUATION: Street bonfire burning paper money;
// a family clutches a thin envelope of "New Dong".
// ===========================================================================
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#2a0a0a] via-[#3a1a08] to-[#1a0a05]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Shuttered storefront */}
        <rect x="20" y="90" width="460" height="150" fill="#2a1a10" />
        <rect x="30" y="100" width="440" height="8" fill="#3a2a18" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <rect key={`slat-${i}`} x={40} y={110 + i * 14} width={420} height={3} fill="#1a1008" />
        ))}
        <rect x="220" y="175" width="60" height="65" fill="#0a0603" />
        {/* Sign */}
        <rect x="180" y="75" width="140" height="20" fill="#8a2a1a" />
        <text x="250" y="89" textAnchor="middle" fill="#ffdd44" fontSize="8" fontFamily="monospace" fontWeight="bold">STATE TREASURY</text>

        {/* Road */}
        <rect x="0" y="240" width="500" height="40" fill="#1a1a14" />

        {/* Bonfire (center) */}
        <g className="cinematic-fire-glow">
          <ellipse cx="250" cy="245" rx="46" ry="7" fill="#ff4400" opacity="0.4" />
        </g>
        {/* Logs */}
        <rect x="215" y="235" width="70" height="8" fill="#3a2010" />
        <rect x="210" y="240" width="80" height="6" fill="#2a180a" />
        {/* Flames */}
        {[230, 244, 258].map((fx, fi) => (
          <g key={`flame-${fi}`} className="cinematic-flame" style={{ animationDelay: `${fi * 0.2}s` }}>
            <rect x={fx} y={210 - fi * 4} width="8" height="25" fill="#ff4400" />
            <rect x={fx + 2} y={205 - fi * 4} width="4" height="15" fill="#ff8800" />
            <rect x={fx + 3} y={202 - fi * 4} width="2" height="10" fill="#ffdd44" />
          </g>
        ))}
        {/* Money flying up & flapping - more bills */}
        {[
          { bx: 220, by: 200, d: 0.0, dx: -24 },
          { bx: 235, by: 195, d: 0.3, dx: -10 },
          { bx: 252, by: 190, d: 0.6, dx: 12 },
          { bx: 266, by: 188, d: 0.9, dx: 28 },
          { bx: 242, by: 182, d: 1.2, dx: -18 },
          { bx: 258, by: 178, d: 0.2, dx: 32 },
          { bx: 272, by: 198, d: 1.0, dx: -6 },
          { bx: 230, by: 210, d: 0.5, dx: 22 },
        ].map((b, i) => (
          <g
            key={`bill-${i}`}
            className="cinematic-bill-flutter"
            style={{ animationDelay: `${b.d}s`, ['--bx' as string]: `${b.dx}px` }}
          >
            <rect x={b.bx} y={b.by} width="14" height="8" fill="#8a6a3a" opacity="0.95" />
            <rect x={b.bx + 2} y={b.by + 2} width="10" height="4" fill="#b8904a" />
            <rect x={b.bx + 5} y={b.by + 3} width="4" height="2" fill="#d8b060" />
          </g>
        ))}

        {/* Background onlookers (shocked) - well-spaced */}
        <g transform="translate(54, 204)">
          <PixelPerson
            x={0} y={0} scale={1} variant="civilian"
            color="#e8b896" shirtColor="#3a3a3a" pantsColor="#2a2018"
            hairColor="#1a0f08" accentColor="#a0a0a0"
            mood="shocked" sway="idle"
          />
        </g>
        <g transform="translate(86, 208)">
          <PixelPerson
            x={0} y={0} scale={0.9} variant="civilian"
            color="#f0c8a0" shirtColor="#6a4a5a" pantsColor="#2a2030"
            hairColor="#2a1810" accentColor="#e0d0b8"
            mood="sad" sway="idle" swayDelay={0.6} mirror
          />
        </g>
        <g transform="translate(446, 206)">
          <PixelPerson
            x={0} y={0} scale={1} variant="civilian"
            color="#d8a880" shirtColor="#2a5a7a" pantsColor="#3a2818"
            hairColor="#1a0f08" accentColor="#ffffff"
            mood="shocked" sway="idle" swayDelay={0.4}
          />
        </g>

        {/* Official (soldier) on left - dumping money (arm animated) */}
        <g transform="translate(130, 194)">
          <PixelPerson
            x={0} y={0} scale={1.8} variant="soldier"
            color="#e8b890" shirtColor="#3a5a2a" pantsColor="#2a3a18"
            hairColor="#1a1008" accentColor="#ffcf5c"
            mood="angry" sway="idle"
          />
          {/* Stack of bills in hand (animated dump arm) */}
          <g className="cinematic-dump-arm" style={{ transformOrigin: '32px 14px' }}>
            <rect x="32" y="16" width="18" height="12" fill="#b8904a" />
            <rect x="34" y="18" width="14" height="8" fill="#d4a864" />
            <rect x="36" y="20" width="10" height="1" fill="#6a4a20" />
            <rect x="36" y="24" width="10" height="1" fill="#6a4a20" />
            <rect x="48" y="16" width="2" height="14" fill="#9a7a38" />
          </g>
        </g>

        {/* Family on right - father holding envelope, sad */}
        <g transform="translate(340, 196)">
          <PixelPerson
            x={0} y={0} scale={1.7} variant="civilian"
            color="#f0c8a0" shirtColor="#5a6a8a" pantsColor="#2a2438"
            hairColor="#1a0f08" accentColor="#f8e5a8"
            mood="sad" sway="idle" swayDelay={0.2}
          />
          {/* Envelope */}
          <rect x="22" y="16" width="16" height="10" fill="#e8d8b0" />
          <rect x="22" y="16" width="16" height="1" fill="#c8b890" />
          <line x1="22" y1="16" x2="30" y2="22" stroke="#c8b890" strokeWidth="1" />
          <line x1="38" y1="16" x2="30" y2="22" stroke="#c8b890" strokeWidth="1" />
          {/* Tear falling */}
          <rect x="8" y="12" width="1.5" height="2" fill="#6ac0ff" opacity="0.9"
            className="cinematic-tear-drop" style={{ animationDelay: '0.4s' }}
          />
        </g>
        {/* Small child a step away from father - scared */}
        <g transform="translate(382, 206)">
          <PixelPerson
            x={0} y={0} scale={1.2} variant="civilian"
            color="#f4d0a4" shirtColor="#d4a848" pantsColor="#3a2818"
            hairColor="#2a1810" accentColor="#ffffff"
            mood="scared" sway="scared" swayDelay={0.25}
            mirror
          />
        </g>

        {/* Walking pedestrians — people moving past the bonfire in both directions */}
        {[
          { scale: 1.1, y: 222, shirt: '#3a4a3a', pants: '#2a1a10', hair: '#1a0f08', mood: 'sad', delay: 1, dur: 26, dir: 'left' },
          { scale: 1.0, y: 226, shirt: '#6a3a2a', pants: '#2a2018', hair: '#2a1810', mood: 'weary', delay: 7, dur: 24, dir: 'right' },
          { scale: 1.15, y: 220, shirt: '#2a4a6a', pants: '#1a1a28', hair: '#1a0f08', mood: 'shocked', delay: 12, dur: 28, dir: 'left' },
          { scale: 0.9, y: 228, shirt: '#8a6048', pants: '#3a2818', hair: '#1a0f08', mood: 'sad', delay: 18, dur: 22, dir: 'right' },
        ].map((p, pi) => (
          <g key={`deval-walk-${pi}`} className={p.dir === 'left' ? 'cinematic-walk-left' : 'cinematic-walk-right'}
            style={{
              ['--wx-start' as string]: p.dir === 'left' ? '560px' : '-60px',
              ['--wx-end' as string]: p.dir === 'left' ? '-60px' : '560px',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            } as React.CSSProperties}>
            <g transform={`translate(0 ${p.y})`}>
              <g className="cinematic-walk-bob" style={{ animationDelay: `${pi * 0.1}s` }}>
                <PixelPerson
                  x={0} y={0} scale={p.scale} variant="civilian"
                  color={pi % 2 ? '#f0c8a0' : '#e8b896'}
                  shirtColor={p.shirt} pantsColor={p.pants}
                  hairColor={p.hair} accentColor="#d8cfa8"
                  mood={p.mood as 'sad' | 'weary' | 'shocked'}
                  mirror={p.dir === 'left'}
                />
              </g>
            </g>
          </g>
        ))}

        {/* A parent walking past carrying a bundle on their back */}
        <g className="cinematic-walk-right"
          style={{ ['--wx-start' as string]: '-80px', ['--wx-end' as string]: '560px',
                   animationDelay: '4s', animationDuration: '30s' } as React.CSSProperties}>
          <g transform="translate(0 224)">
            <g className="cinematic-walk-bob">
              <PixelPerson
                x={0} y={0} scale={1.2} variant="civilian"
                color="#e8b896" shirtColor="#5a4a38" pantsColor="#2a2018"
                hairColor="#1a0f08" accentColor="#b86048"
                mood="weary"
              />
              {/* Bundle tied to back */}
              <rect x={-6} y="0" width="8" height="10" fill="#6a4a28" />
              <rect x={-6} y="0" width="8" height="2" fill="#8a6a40" />
            </g>
          </g>
        </g>
        {/* A small child trailing behind (independent walker, same direction) */}
        <g className="cinematic-walk-right"
          style={{ ['--wx-start' as string]: '-120px', ['--wx-end' as string]: '540px',
                   animationDelay: '4s', animationDuration: '30s' } as React.CSSProperties}>
          <g transform="translate(0 230)">
            <g className="cinematic-walk-bob" style={{ animationDelay: '0.15s' }}>
              <PixelPerson
                x={0} y={0} scale={0.8} variant="civilian"
                color="#f4d0a4" shirtColor="#c9a24a" pantsColor="#3a2818"
                hairColor="#2a1810" accentColor="#ffffff"
                mood="scared"
              />
            </g>
          </g>
        </g>

        {/* Ember particles - more of them */}
        {[120, 150, 180, 210, 280, 310, 340, 380, 400, 430].map((ex, ei) => (
          <rect key={`ember-${ei}`} x={ex} y={200 - (ei % 5) * 20} width={2} height={2} fill={ei % 2 ? '#ff8800' : '#ffbb44'}
            className="cinematic-ember-drift" style={{ animationDelay: `${ei * 0.25}s` }}
          />
        ))}

        {/* Water puddle reflection of fire */}
        <g>
          <ellipse cx="250" cy="265" rx="60" ry="4" fill="#1a1a1a" opacity="0.5" />
          <rect x="238" y="263" width="24" height="2" fill="#ff4400" opacity="0.55" className="cinematic-flicker" />
          <rect x="245" y="265" width="16" height="1" fill="#ffaa44" opacity="0.45" className="cinematic-flicker" />
        </g>

        {/* Pile of un-burned banknotes at official's feet */}
        <g transform="translate(130 242)">
          <ellipse cx="16" cy="10" rx="22" ry="4" fill="#0a0603" opacity="0.6" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <g key={`pile-${i}`} transform={`translate(${i * 3 - 4} ${-i * 1.2}) rotate(${(i - 3) * 6})`}>
              <rect x="0" y="0" width="18" height="5" fill={i % 2 ? '#b8904a' : '#a88040'} />
              <rect x="1" y="1" width="16" height="3" fill="#d4a864" />
              <rect x="3" y="2" width="12" height="1" fill="#6a4a20" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* Broken shop window on the left storefront */}
        <g transform="translate(52 120)">
          <rect x="0" y="0" width="70" height="56" fill="#0a0604" />
          <rect x="0" y="0" width="70" height="56" fill="none" stroke="#3a2a1a" strokeWidth="2" />
          {/* Shattered glass shards */}
          <polyline points="0,18 16,2 30,26 46,6 70,22" fill="none" stroke="#6a8ab0" strokeWidth="1" opacity="0.7" />
          <polyline points="0,38 22,24 40,46 62,32" fill="none" stroke="#6a8ab0" strokeWidth="1" opacity="0.5" />
          <polyline points="8,0 18,20 8,40 22,56" fill="none" stroke="#6a8ab0" strokeWidth="0.6" opacity="0.5" />
          {/* Loose shards on ground */}
          <polygon points="2,56 6,54 8,60 0,60" fill="#6a8ab0" opacity="0.7" />
          <polygon points="14,58 18,55 22,60 12,60" fill="#8aaac8" opacity="0.55" />
        </g>

        {/* Rationing / decree poster nailed to shuttered storefront */}
        <g transform="translate(370 128)">
          <rect x="0" y="0" width="50" height="58" fill="#e8d8a8" />
          <rect x="1" y="1" width="48" height="10" fill="#1a4a2a" />
          <text x="25" y="8" textAnchor="middle" fill="#ffdd44" fontSize="5" fontFamily="monospace" fontWeight="bold">KHẨU PHẦN</text>
          <text x="25" y="20" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace" fontWeight="bold">GẠO: 9 KG</text>
          <text x="25" y="28" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace">THỊT: 100g</text>
          <text x="25" y="36" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace">DẦU: 0.3L</text>
          <text x="25" y="44" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace">MỖI THÁNG</text>
          <rect x="6" y="50" width="38" height="5" fill="#cc1a1a" opacity="0.8" />
          <text x="25" y="54" textAnchor="middle" fill="#ffdd44" fontSize="4" fontFamily="monospace" fontWeight="bold">BẮT BUỘC</text>
          {/* Tacks */}
          <rect x="2" y="2" width="2" height="2" fill="#6a4a20" />
          <rect x="46" y="2" width="2" height="2" fill="#6a4a20" />
        </g>

        {/* Stray dog sniffing at edge of fire */}
        <g transform="translate(180 248)">
          <rect x="0" y="0" width="16" height="6" fill="#5a3a20" />
          <rect x="0" y="0" width="16" height="2" fill="#6a4a28" />
          <rect x="12" y="-3" width="5" height="4" fill="#5a3a20" />
          <rect x="14" y="-5" width="2" height="3" fill="#6a4a28" />
          <rect x="15" y="-1" width="1" height="1" fill="#1a0f04" />
          <rect x="-2" y="-2" width="2" height="6" fill="#4a2e18" />
          <rect x="0" y="6" width="2" height="3" fill="#3a2418" />
          <rect x="5" y="6" width="2" height="3" fill="#3a2418" />
          <rect x="9" y="6" width="2" height="3" fill="#3a2418" />
          <rect x="14" y="6" width="2" height="3" fill="#3a2418" />
        </g>

        {/* Street lamp pole casting sickly light */}
        <g transform="translate(30 70)">
          <rect x="0" y="0" width="3" height="170" fill="#1a1008" />
          <rect x="-10" y="0" width="22" height="3" fill="#1a1008" />
          <rect x="-16" y="-4" width="20" height="10" fill="#2a1a0a" />
          <rect x="-14" y="-2" width="16" height="6" fill="#ffaa44" opacity="0.8" className="cinematic-lamp-flicker" />
          <circle cx="-6" cy="2" r="24" fill="#ffaa44" opacity="0.08" />
        </g>

        {/* Newspaper blowing in the wind (falling) */}
        <g className="cinematic-bill-flutter" style={{ animationDelay: '0.2s', animationDuration: '4s', ['--bx' as string]: '40px' }}>
          <rect x="420" y="160" width="18" height="12" fill="#d8cfa8" />
          <rect x="422" y="162" width="14" height="1" fill="#1a0f04" />
          <rect x="422" y="165" width="14" height="1" fill="#1a0f04" />
          <rect x="422" y="168" width="10" height="1" fill="#1a0f04" />
        </g>

        {/* Warm red overcast */}
        <rect x="0" y="0" width="500" height="280" fill="url(#grad3)" opacity="0.15" />
        <defs>
          <linearGradient id="grad3" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#ff2200" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 4 — THE BREAKING POINT: A table with a draft notice and a relocation
// order; a lone silhouette staring down at both, dimly lamplit.
// ===========================================================================
function Scene4() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a1208] via-[#2a1a0a] to-[#0a0604]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Wooden plank wall */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <g key={`plank-${i}`}>
            <rect x={0} y={i * 22} width={500} height={22} fill={i % 2 === 0 ? '#2a1a0a' : '#241808'} opacity="0.85" />
            <rect x={0} y={i * 22 + 21} width={500} height={1} fill="#140a04" />
          </g>
        ))}
        {/* Wall shadow */}
        <rect x="0" y="0" width="500" height="280" fill="#000" opacity="0.35" />

        {/* Oil lamp on left wall shelf - flickering */}
        <rect x="50" y="60" width="40" height="4" fill="#3a2a18" />
        <g>
          <rect x="64" y="40" width="12" height="20" fill="#8a6a3a" />
          <g className="cinematic-lamp-flicker">
            <rect x="66" y="42" width="8" height="16" fill="#ffdd88" opacity="0.9" />
            <rect x="68" y="26" width="4" height="14" fill="#ff9044" />
            <rect x="69" y="22" width="2" height="6" fill="#ffeecc" />
          </g>
          {/* Lamp halo */}
          <circle cx="70" cy="50" r="42" fill="#ffcc66" opacity="0.15" className="cinematic-lamp-flicker" />
          <circle cx="70" cy="50" r="72" fill="#ffaa44" opacity="0.06" />
        </g>

        {/* Wall clock - ticking pendulum */}
        <g transform="translate(410 60)">
          <circle cx="0" cy="0" r="20" fill="#2a1a0a" />
          <circle cx="0" cy="0" r="17" fill="#d8c8a0" />
          <circle cx="0" cy="0" r="2" fill="#1a0f04" />
          {[0, 1, 2, 3].map(i => (
            <rect key={`ctick-${i}`} x={-1} y={-15} width={2} height={3} fill="#1a0f04"
              transform={`rotate(${i * 90})`}
            />
          ))}
          {/* Minute hand */}
          <rect x={-1} y={-12} width={2} height={12} fill="#1a0f04" />
          {/* Hour hand - ticking */}
          <g className="cinematic-clock-tick">
            <rect x={-1} y={-8} width={2} height={8} fill="#1a0f04" />
          </g>
        </g>

        {/* Window with iron bars and subtle rain outside */}
        <g transform="translate(150 20)">
          <rect x="0" y="0" width="80" height="60" fill="#0a0a18" />
          <rect x="0" y="0" width="80" height="60" fill="none" stroke="#3a2a1a" strokeWidth="3" />
          {[20, 40, 60].map((bx, bi) => (
            <rect key={`bar-${bi}`} x={bx - 1} y={2} width={2} height={56} fill="#1a1008" />
          ))}
          {[15, 30, 45].map((by, bi) => (
            <rect key={`hbar-${bi}`} x={2} y={by} width={76} height={1.5} fill="#1a1008" />
          ))}
          {/* Rain streaks */}
          {[6, 18, 30, 42, 54, 66, 74].map((rx, ri) => (
            <rect key={`rain-${ri}`} x={rx} y={(ri * 9) % 50} width={1} height={8}
              fill="#6aa0c0" opacity="0.5"
              className="cinematic-smoke-rise" style={{ animationDelay: `${ri * 0.15}s`, animationDuration: '1.2s' }}
            />
          ))}
        </g>

        {/* Table */}
        <rect x="80" y="200" width="340" height="10" fill="#4a3418" />
        <rect x="80" y="208" width="340" height="4" fill="#2a1e0c" />
        <rect x="100" y="210" width="10" height="60" fill="#3a2612" />
        <rect x="390" y="210" width="10" height="60" fill="#3a2612" />

        {/* Paper 1: Draft notice - Cambodia */}
        <g transform="translate(120 168) rotate(-3)">
          <rect x="0" y="0" width="120" height="44" fill="#e8d8b0" />
          <rect x="2" y="2" width="116" height="40" fill="#f0e0b8" />
          <rect x="0" y="0" width="120" height="7" fill="#8a2a1a" />
          <text x="60" y="6" textAnchor="middle" fill="#ffdd44" fontSize="5" fontFamily="monospace" fontWeight="bold">SOCIALIST REPUBLIC OF VIETNAM</text>
          <text x="60" y="20" textAnchor="middle" fill="#1a1010" fontSize="9" fontFamily="monospace" fontWeight="bold">DRAFT NOTICE</text>
          <text x="60" y="30" textAnchor="middle" fill="#8a2a1a" fontSize="7" fontFamily="monospace" fontWeight="bold">CAMBODIAN FRONT</text>
          <text x="60" y="39" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace">REPORT 06:00 — 14 DAYS</text>
          {/* Red stamp */}
          <circle cx="100" cy="34" r="7" fill="none" stroke="#cc1a1a" strokeWidth="1.2" />
          <text x="100" y="36" textAnchor="middle" fill="#cc1a1a" fontSize="4" fontFamily="monospace" fontWeight="bold">URGENT</text>
        </g>

        {/* Paper 2: Relocation to New Economic Zone */}
        <g transform="translate(260 174) rotate(4)">
          <rect x="0" y="0" width="126" height="44" fill="#e8d8b0" />
          <rect x="2" y="2" width="122" height="40" fill="#f0e0b8" />
          <rect x="0" y="0" width="126" height="7" fill="#1a4a2a" />
          <text x="63" y="6" textAnchor="middle" fill="#ffdd44" fontSize="5" fontFamily="monospace" fontWeight="bold">PEOPLE'S COMMITTEE - DIST. 3</text>
          <text x="63" y="20" textAnchor="middle" fill="#1a1010" fontSize="8" fontFamily="monospace" fontWeight="bold">RELOCATION ORDER</text>
          <text x="63" y="30" textAnchor="middle" fill="#1a4a2a" fontSize="6" fontFamily="monospace" fontWeight="bold">NEW ECONOMIC ZONE</text>
          <text x="63" y="39" textAnchor="middle" fill="#1a1010" fontSize="5" fontFamily="monospace">DEPART MON. 04:30</text>
          {/* Green stamp */}
          <circle cx="106" cy="34" r="7" fill="none" stroke="#1a4a2a" strokeWidth="1.2" />
          <text x="106" y="36" textAnchor="middle" fill="#1a4a2a" fontSize="4" fontFamily="monospace" fontWeight="bold">FINAL</text>
        </g>

        {/* Lone figure standing in front of table - back to camera, weary */}
        <g transform="translate(230, 138)">
          <PixelPerson
            x={0} y={0} scale={2.6} variant="civilian"
            color="#e8b896" shirtColor="#6a4a38" pantsColor="#2a2018"
            hairColor="#0f0804" accentColor="#8a6848"
            mood="weary" sway="idle"
          />
        </g>

        {/* Teacup with rising steam on the corner of the table */}
        <g transform="translate(110 188)">
          <rect x="0" y="0" width="12" height="10" fill="#e8d8b0" />
          <rect x="0" y="0" width="12" height="2" fill="#c8b890" />
          <rect x="12" y="3" width="3" height="5" fill="#e8d8b0" />
          {/* Steam */}
          {[0, 1, 2].map(i => (
            <rect key={`steam-${i}`} x={3 + i * 3} y={-4 - i * 2} width={2} height={4}
              fill="#e8e0c8" opacity="0.6"
              className="cinematic-smoke-rise" style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2s' }}
            />
          ))}
        </g>

        {/* A trembling pen beside the papers */}
        <g className="cinematic-pen-shake" style={{ transformOrigin: '200px 210px' }} transform="translate(196 205) rotate(-22)">
          <rect x="0" y="0" width="18" height="2" fill="#1a0f04" />
          <rect x="16" y="-1" width="4" height="4" fill="#6a5a40" />
          <rect x="19" y="0" width="2" height="2" fill="#2a1a08" />
          {/* Tiny ink blot on paper */}
          <rect x="-6" y="5" width="3" height="3" fill="#1a0f04" opacity="0.7" />
        </g>

        {/* Scattered crumpled papers on floor */}
        {[90, 140, 300, 420, 460].map((px, pi) => (
          <g key={`crumple-${pi}`} transform={`translate(${px} ${252 + (pi % 2) * 4}) rotate(${pi * 30})`}>
            <rect x="0" y="0" width="14" height="9" fill="#d8cfa8" opacity="0.8" />
            <rect x="1" y="3" width="10" height="1" fill="#c8a060" />
            <rect x="2" y="6" width="8" height="1" fill="#c8a060" />
          </g>
        ))}

        {/* Drifting dust motes in the lamp halo */}
        {[80, 100, 120, 60, 90].map((dx, di) => (
          <rect key={`mote-${di}`} x={dx} y={70 + (di * 8)} width={1} height={1}
            fill="#ffdd88" opacity="0.5"
            className="cinematic-ember-drift" style={{ animationDelay: `${di * 0.8}s`, animationDuration: '5s' }}
          />
        ))}

        {/* Lone figure's shadow cast on the wall (subtle, lamp-side) */}
        <g transform="translate(148 100)" opacity="0.45">
          <ellipse cx="12" cy="110" rx="30" ry="4" fill="#000" opacity="0.5" />
          <path d="M 0 30 Q 24 0 46 30 L 46 110 L 0 110 Z" fill="#000" opacity="0.5" />
        </g>

        {/* Worn coat hanging on a wall peg (near door) */}
        <g transform="translate(30 90)">
          <rect x="8" y="-4" width="6" height="4" fill="#6a4a28" />
          <rect x="10" y="-6" width="2" height="3" fill="#3a2a18" />
          {/* Coat silhouette */}
          <polygon points="0,0 22,0 24,8 26,50 20,52 16,18 6,18 2,52 -4,50 -2,8" fill="#3a2820" />
          <polygon points="0,0 22,0 24,8 26,50 20,52 16,18 6,18 2,52 -4,50 -2,8" fill="none" stroke="#1a0f08" strokeWidth="0.6" />
          {/* Buttons */}
          <rect x="10" y="10" width="1.5" height="1.5" fill="#ffcf5c" opacity="0.7" />
          <rect x="10" y="18" width="1.5" height="1.5" fill="#ffcf5c" opacity="0.7" />
          <rect x="10" y="26" width="1.5" height="1.5" fill="#ffcf5c" opacity="0.7" />
          {/* Nón lá straw hat hung below */}
          <polygon points="-8,58 12,46 32,58" fill="#c9a24a" />
          <polygon points="-8,58 12,46 32,58" fill="none" stroke="#8a6a2a" strokeWidth="0.5" />
          <rect x="10" y="46" width="4" height="2" fill="#8a6a2a" />
        </g>

        {/* Empty rice bowl with chopsticks on the table */}
        <g transform="translate(320 192)">
          <ellipse cx="10" cy="12" rx="12" ry="3" fill="#2a1a08" opacity="0.5" />
          <path d="M -2 6 Q 10 16 22 6 L 20 12 Q 10 20 0 12 Z" fill="#e8dcc0" />
          <path d="M -2 6 Q 10 10 22 6" fill="none" stroke="#8a7a5a" strokeWidth="0.6" />
          {/* A few remaining grains */}
          <rect x="8" y="8" width="1.5" height="1" fill="#ffffff" opacity="0.85" />
          <rect x="12" y="9" width="1.5" height="1" fill="#ffffff" opacity="0.8" />
          {/* Chopsticks resting on rim */}
          <rect x="-6" y="3" width="26" height="1" fill="#8a6a3a" transform="rotate(-10 10 3)" />
          <rect x="-6" y="6" width="26" height="1" fill="#8a6a3a" transform="rotate(-10 10 6)" />
        </g>

        {/* Cigarette smoldering in a small tin ashtray */}
        <g transform="translate(272 195)">
          <rect x="0" y="6" width="14" height="3" fill="#3a3028" />
          <rect x="0" y="6" width="14" height="1" fill="#5a4a40" />
          <rect x="2" y="7" width="10" height="1" fill="#1a0f08" />
          {/* Cigarette */}
          <rect x="10" y="4" width="10" height="1.3" fill="#f0e0c0" transform="rotate(-14 10 4)" />
          <rect x="18" y="3" width="2" height="1.3" fill="#c9a24a" transform="rotate(-14 18 3)" />
          <rect x="19" y="2" width="1.2" height="1.2" fill="#ff4400" transform="rotate(-14 19 2)" />
          {/* Rising smoke wisps */}
          {[0, 1, 2, 3].map(i => (
            <rect key={`csmoke-${i}`} x={16 + (i % 2) * 2} y={-6 - i * 6} width={1.5} height={4}
              fill="#c8c0a8" opacity="0.55"
              className="cinematic-smoke-rise" style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            />
          ))}
        </g>

        {/* Wall map of Vietnam pinned to the right wall */}
        <g transform="translate(440 150)">
          <rect x="0" y="0" width="48" height="70" fill="#e8d8b0" />
          <rect x="1" y="1" width="46" height="68" fill="#f0e0b8" />
          {/* Simple Vietnam S-shape */}
          <path d="M 12 6 Q 22 12 18 22 Q 14 30 22 38 Q 26 46 22 56 Q 18 62 28 66"
            fill="none" stroke="#3a5a2a" strokeWidth="1.4" />
          {/* Red threat arrows (north to south) */}
          <line x1="20" y1="10" x2="16" y2="20" stroke="#cc1a1a" strokeWidth="1" />
          <polygon points="14,18 16,22 18,18" fill="#cc1a1a" />
          <line x1="22" y1="32" x2="18" y2="42" stroke="#cc1a1a" strokeWidth="1" />
          <polygon points="16,40 18,44 20,40" fill="#cc1a1a" />
          {/* Pins */}
          <circle cx="2" cy="2" r="1.2" fill="#cc1a1a" />
          <circle cx="46" cy="2" r="1.2" fill="#cc1a1a" />
          <circle cx="2" cy="68" r="1.2" fill="#cc1a1a" />
          <circle cx="46" cy="68" r="1.2" fill="#cc1a1a" />
          {/* Corner label */}
          <text x="24" y="66" textAnchor="middle" fill="#8a2a1a" fontSize="5" fontFamily="monospace" fontWeight="bold">VIỆT NAM</text>
        </g>

        {/* Military-style boots in the corner */}
        <g transform="translate(460 248)">
          <rect x="0" y="0" width="12" height="10" fill="#1a1008" />
          <rect x="0" y="0" width="12" height="3" fill="#2a1810" />
          <rect x="0" y="10" width="14" height="2" fill="#0a0604" />
          <rect x="14" y="2" width="10" height="8" fill="#1a1008" />
          <rect x="14" y="2" width="10" height="3" fill="#2a1810" />
          <rect x="14" y="10" width="12" height="2" fill="#0a0604" />
        </g>

        {/* Darkness vignette */}
        <rect x="0" y="0" width="500" height="280" fill="url(#grad4)" opacity="0.6" />
        <defs>
          <radialGradient id="grad4" cx="0.5" cy="0.7" r="0.8">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 5 — THE GOLD LEAF: Mother sewing gold leaf into jacket lining,
// lit only by a kerosene lamp.
// ===========================================================================
function Scene5() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0e05] via-[#2a1608] to-[#0a0503]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Warm lamp glow halo */}
        <circle cx="250" cy="160" r="180" fill="#ffaa44" opacity="0.1" className="cinematic-fire-glow" />
        <circle cx="250" cy="160" r="110" fill="#ffcc66" opacity="0.18" />
        <circle cx="250" cy="160" r="60" fill="#ffdd88" opacity="0.28" />

        {/* Wooden plank wall */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <rect key={`plank-${i}`} x={0} y={i * 26} width={500} height={25} fill={i % 2 === 0 ? '#2a1a0a' : '#24160a'} />
        ))}
        <rect x="0" y="0" width="500" height="280" fill="#000" opacity="0.4" />

        {/* Table */}
        <rect x="130" y="205" width="240" height="8" fill="#5a3818" />
        <rect x="130" y="213" width="240" height="3" fill="#3a2410" />
        <rect x="150" y="213" width="8" height="60" fill="#4a2e14" />
        <rect x="342" y="213" width="8" height="60" fill="#4a2e14" />

        {/* Kerosene lamp on table - flickering */}
        <g>
          <rect x="180" y="175" width="12" height="6" fill="#6a4a2a" />
          <rect x="178" y="160" width="16" height="16" fill="#c9a24a" opacity="0.7" />
          <g className="cinematic-lamp-flicker">
            <rect x="180" y="162" width="12" height="12" fill="#ffdd88" />
            <rect x="184" y="150" width="4" height="12" fill="#ff8800" />
            <rect x="185" y="145" width="2" height="7" fill="#ffdd44" />
          </g>
          <rect x="183" y="181" width="10" height="4" fill="#4a2e18" />
          <rect x="181" y="185" width="14" height="3" fill="#3a2410" />
        </g>

        {/* Jacket on table */}
        <g transform="translate(230 182)">
          <rect x="0" y="0" width="110" height="28" fill="#3a2818" />
          <rect x="2" y="2" width="106" height="24" fill="#4a3424" />
          <rect x="4" y="6" width="102" height="6" fill="#2a1a0a" />
          {/* Inner lining */}
          <rect x="10" y="12" width="90" height="10" fill="#6a4a30" />
          <rect x="12" y="14" width="86" height="6" fill="#8a6a48" />
          {/* Gold leaf being sewn in - shimmers */}
          <g className="cinematic-gold-shimmer">
            <rect x="42" y="15" width="28" height="4" fill="#ffd700" />
            <rect x="44" y="16" width="24" height="2" fill="#fff2a0" />
            <rect x="46" y="14" width="2" height="1" fill="#fff6c8" />
            <rect x="62" y="18" width="2" height="1" fill="#fff6c8" />
          </g>
          {/* Thread */}
          <line x1="38" y1="14" x2="74" y2="14" stroke="#ddd" strokeWidth="0.5" />
          <line x1="38" y1="20" x2="74" y2="20" stroke="#ddd" strokeWidth="0.5" />
        </g>

        {/* Sewing basket beside jacket */}
        <g transform="translate(352 196)">
          <rect x="0" y="0" width="22" height="14" fill="#8a6a3a" />
          <rect x="0" y="0" width="22" height="3" fill="#a88050" />
          <rect x="2" y="3" width="18" height="8" fill="#6a4a20" />
          {/* Threaded spools */}
          <rect x="4" y="-4" width="4" height="6" fill="#b8604a" />
          <rect x="10" y="-5" width="4" height="7" fill="#3a6aaa" />
          <rect x="16" y="-3" width="4" height="5" fill="#d8a848" />
          {/* Scissors */}
          <rect x="2" y="-6" width="1" height="10" fill="#6a6a6a" transform="rotate(-20 3 -1)" />
        </g>

        {/* Stack of notes / a passport beside basket */}
        <g transform="translate(130 196)">
          <rect x="0" y="0" width="28" height="14" fill="#3a5a2a" />
          <rect x="1" y="1" width="26" height="12" fill="#4a6a3a" />
          <rect x="4" y="3" width="20" height="2" fill="#ffdd44" opacity="0.7" />
          <rect x="8" y="7" width="12" height="4" fill="#ffdd44" opacity="0.4" />
        </g>

        {/* Mother figure sewing - warm ao-ba-ba top, determined */}
        <g transform="translate(300, 138)">
          <PixelPerson
            x={0} y={0} scale={2.4} variant="civilian"
            color="#f0c8a0" shirtColor="#b8604a" pantsColor="#3a2010"
            hairColor="#1a0f06" accentColor="#ffcf5c"
            mood="determined" sway="idle"
            mirror
          />
          {/* Sewing arm + needle (animated) */}
          <g className="cinematic-sew-arm">
            <rect x={-10} y={40} width={10} height={2} fill="#f0c8a0" />
            <rect x={-12} y={42} width={6} height={1} fill="#ddd" opacity="0.9" />
            <rect x={-13} y={42} width={1} height={3} fill="#fff" opacity="0.9" />
          </g>
        </g>

        {/* Child figure watching from shadow on left - sad */}
        <g transform="translate(110, 168)" opacity="0.95">
          <PixelPerson
            x={0} y={0} scale={1.6} variant="civilian"
            color="#d8a880" shirtColor="#4a6a8a" pantsColor="#2a2a3a"
            hairColor="#1a0f08" accentColor="#ffffff"
            mood="sad" sway="idle" swayDelay={0.5}
          />
        </g>

        {/* Small doll on shelf */}
        <g transform="translate(78 92)">
          <rect x="0" y="0" width="60" height="3" fill="#4a2e18" />
          <rect x="6" y="-10" width="6" height="10" fill="#b8604a" />
          <rect x="5" y="-16" width="8" height="8" fill="#f0c8a0" />
          <rect x="7" y="-14" width="1" height="1" fill="#1a0604" />
          <rect x="10" y="-14" width="1" height="1" fill="#1a0604" />
          {/* Clay jar */}
          <rect x="26" y="-12" width="10" height="12" fill="#8a4a28" />
          <rect x="26" y="-12" width="10" height="2" fill="#a85c34" />
          <rect x="28" y="-14" width="6" height="2" fill="#6a3818" />
          {/* Framed photo */}
          <rect x="44" y="-14" width="12" height="14" fill="#5a3a1a" />
          <rect x="46" y="-12" width="8" height="10" fill="#d8cfa8" />
          <rect x="48" y="-8" width="4" height="6" fill="#8a6a3a" />
        </g>

        {/* Calendar on wall */}
        <g transform="translate(380 40)">
          <rect x="0" y="0" width="36" height="42" fill="#d8cfa8" />
          <rect x="0" y="0" width="36" height="10" fill="#8a2a1a" />
          <text x="18" y="7" textAnchor="middle" fill="#ffdd44" fontSize="6" fontFamily="monospace" fontWeight="bold">1978</text>
          {[0, 1, 2, 3, 4].map(r => (
            [0, 1, 2, 3, 4, 5, 6].map(c => (
              <rect key={`cal-${r}-${c}`} x={2 + c * 5} y={12 + r * 5} width={3} height={3} fill={r * 7 + c === 14 ? '#cc1a1a' : '#8a6a3a'} opacity={0.7} />
            ))
          ))}
        </g>

        {/* Falling dust motes in lamp halo */}
        {[180, 220, 260, 300, 340, 200, 280].map((dx, di) => (
          <rect key={`dust-${di}`} x={dx} y={100 + (di % 3) * 30} width={1} height={1}
            fill="#ffdd88" opacity="0.5"
            className="cinematic-ember-drift" style={{ animationDelay: `${di * 0.6}s`, animationDuration: '6s' }}
          />
        ))}

        {/* Ancestor altar on the right wall with framed photo, incense, offerings */}
        <g transform="translate(410 128)">
          {/* Shelf */}
          <rect x="-4" y="54" width="66" height="4" fill="#4a2e14" />
          <rect x="-4" y="58" width="66" height="2" fill="#2a1a08" />
          {/* Red cloth runner */}
          <rect x="-4" y="52" width="66" height="2" fill="#8a2a1a" />
          {/* Ancestor portrait (sepia) */}
          <rect x="18" y="8" width="24" height="32" fill="#3a2612" />
          <rect x="20" y="10" width="20" height="28" fill="#c9a578" />
          <rect x="23" y="14" width="14" height="10" fill="#8a6a4a" />
          <rect x="26" y="17" width="8" height="7" fill="#a88060" />
          <rect x="28" y="18" width="1.2" height="1.2" fill="#1a0f04" />
          <rect x="31" y="18" width="1.2" height="1.2" fill="#1a0f04" />
          <rect x="29" y="21" width="2" height="0.6" fill="#1a0f04" />
          <rect x="22" y="26" width="16" height="10" fill="#5a3a1a" />
          {/* Black mourning ribbon across corner */}
          <polygon points="36,8 42,8 42,14" fill="#1a0f08" />
          {/* Incense bowl */}
          <rect x="6" y="44" width="14" height="6" fill="#6a4428" />
          <rect x="6" y="44" width="14" height="2" fill="#8a5c38" />
          {/* Three incense sticks with glowing tips + rising smoke */}
          {[0, 1, 2].map(i => (
            <g key={`incense-${i}`} transform={`translate(${8 + i * 3} 44)`}>
              <rect x="0" y="-20" width="0.8" height="22" fill="#6a4a28" />
              <rect x="-0.2" y="-21" width="1.2" height="1.6" fill="#ff4400" className="cinematic-lamp-flicker" />
              {[0, 1, 2].map(j => (
                <rect key={`ismoke-${j}`} x={-1 + j * 0.6} y={-30 - j * 4} width={1} height={3}
                  fill="#d8d0b8" opacity="0.45"
                  className="cinematic-smoke-rise" style={{ animationDelay: `${(i + j) * 0.4}s`, animationDuration: '3s' }}
                />
              ))}
            </g>
          ))}
          {/* Offering bowl of fruit */}
          <rect x="40" y="44" width="14" height="6" fill="#8a6a3a" />
          <rect x="40" y="44" width="14" height="2" fill="#a88050" />
          <circle cx="44" cy="42" r="2.5" fill="#c94a2a" />
          <circle cx="48" cy="41" r="2.5" fill="#c9a24a" />
          <circle cx="52" cy="42" r="2" fill="#6a8a4a" />
        </g>

        {/* Nón lá straw hat hanging on the left wall */}
        <g transform="translate(60 58)">
          <rect x="12" y="-2" width="2" height="4" fill="#3a2410" />
          <polygon points="0,20 14,0 28,20" fill="#c9a24a" />
          <polygon points="0,20 14,0 28,20" fill="none" stroke="#8a6a2a" strokeWidth="0.5" />
          {[4, 8, 12, 16, 20].map((tx, ti) => (
            <line key={`nline-${ti}`} x1={tx} y1="20" x2="14" y2="0" stroke="#8a6a2a" strokeWidth="0.3" opacity="0.6" />
          ))}
          <rect x="12" y="20" width="4" height="1.5" fill="#8a6a2a" />
          {/* Chin strap */}
          <line x1="8" y1="21" x2="14" y2="30" stroke="#8a2a1a" strokeWidth="0.8" />
          <line x1="20" y1="21" x2="14" y2="30" stroke="#8a2a1a" strokeWidth="0.8" />
        </g>

        {/* Dried herbs / peppers hanging from the ceiling beam */}
        <g transform="translate(180 18)">
          <rect x="0" y="0" width="140" height="3" fill="#3a2410" />
          {[10, 30, 52, 76, 100, 124].map((bx, bi) => (
            <g key={`herb-${bi}`} transform={`translate(${bx} 3)`}>
              <line x1="0" y1="0" x2="0" y2="4" stroke="#5a4028" strokeWidth="0.5" />
              {bi % 2 === 0 ? (
                // Chili peppers bundle
                [0, 1, 2, 3].map(j => (
                  <polygon key={`chili-${j}`}
                    points={`${-4 + j * 2},6 ${-5 + j * 2},18 ${-3 + j * 2},18`}
                    fill="#b8281a" />
                ))
              ) : (
                // Dried herb bundle
                <g>
                  <polygon points="-5,6 0,22 5,6" fill="#5a6a3a" />
                  <rect x="-1" y="4" width="2" height="4" fill="#3a2a18" />
                  <rect x="-4" y="10" width="8" height="1" fill="#3a4a22" />
                  <rect x="-4" y="14" width="8" height="1" fill="#3a4a22" />
                  <rect x="-3" y="18" width="6" height="1" fill="#3a4a22" />
                </g>
              )}
            </g>
          ))}
        </g>

        {/* Tea set on the table (teapot + two cups) */}
        <g transform="translate(200 192)">
          {/* Teapot */}
          <rect x="0" y="4" width="18" height="12" fill="#8a5028" />
          <rect x="0" y="4" width="18" height="3" fill="#a86838" />
          <rect x="6" y="0" width="6" height="4" fill="#6a3a18" />
          <rect x="7" y="-2" width="4" height="2" fill="#3a2410" />
          {/* Spout */}
          <polygon points="18,8 24,4 24,10" fill="#8a5028" />
          {/* Handle */}
          <rect x="-3" y="7" width="3" height="6" fill="none" stroke="#8a5028" strokeWidth="1.5" />
          {/* Steam */}
          {[0, 1].map(i => (
            <rect key={`tpsteam-${i}`} x={7 + i * 3} y={-8 - i * 2} width={1.5} height={4}
              fill="#e0d8c0" opacity="0.5"
              className="cinematic-smoke-rise" style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2.5s' }}
            />
          ))}
          {/* Two small cups */}
          <rect x="28" y="10" width="6" height="6" fill="#e8d8b0" />
          <rect x="28" y="10" width="6" height="1.5" fill="#6a4a28" />
          <rect x="36" y="10" width="6" height="6" fill="#e8d8b0" />
          <rect x="36" y="10" width="6" height="1.5" fill="#6a4a28" />
        </g>

        {/* Sleeping younger sibling on a floor mat */}
        <g transform="translate(150 252)">
          <rect x="0" y="0" width="60" height="4" fill="#8a6a3a" />
          <rect x="0" y="0" width="60" height="1" fill="#a88050" />
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={`weave-${i}`} x={4 + i * 12} y="0" width={1} height={4} fill="#6a4a28" />
          ))}
          {/* Bundled blanket */}
          <rect x="8" y="-8" width="44" height="10" fill="#5a6a8a" />
          <rect x="8" y="-8" width="44" height="2" fill="#7a8aaa" />
          <rect x="10" y="-6" width="4" height="6" fill="#4a5a7a" opacity="0.7" />
          <rect x="20" y="-6" width="4" height="6" fill="#4a5a7a" opacity="0.7" />
          <rect x="36" y="-6" width="4" height="6" fill="#4a5a7a" opacity="0.7" />
          {/* Head peeking */}
          <rect x="4" y="-12" width="10" height="6" fill="#f0c8a4" />
          <rect x="4" y="-14" width="10" height="3" fill="#1a0f08" />
          <rect x="6" y="-10" width="1" height="0.8" fill="#1a0f08" />
          <rect x="10" y="-10" width="1" height="0.8" fill="#1a0f08" />
          {/* Zzz */}
          <text x="22" y="-16" fill="#e0d4b0" fontSize="8" fontFamily="monospace" opacity="0.75">z z</text>
        </g>

        {/* Darkness vignette */}
        <rect x="0" y="0" width="500" height="280" fill="url(#grad5)" opacity="0.7" />
        <defs>
          <radialGradient id="grad5" cx="0.5" cy="0.55" r="0.7">
            <stop offset="40%" stopColor="transparent" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 6 — THE VANISHING SHORE: Coastline of Vietnam receding into darkness;
// a fishing boat with a failing engine on the open sea.
// ===========================================================================
function Scene6() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#040418] via-[#081030] to-[#05142a]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Stars */}
        {[30, 80, 140, 210, 290, 360, 420, 470, 60, 200, 380, 150, 330, 450].map((sx, si) => (
          <rect key={`star-${si}`} x={sx} y={15 + (si * 13) % 80} width={2} height={2}
            fill="#fff" opacity={0.5 + (si % 3) * 0.15}
            className="cinematic-twinkle" style={{ animationDelay: `${si * 0.35}s` }}
          />
        ))}

        {/* Moon */}
        <circle cx="90" cy="55" r="22" fill="#e8e4d0" opacity="0.9" />
        <circle cx="96" cy="52" r="18" fill="#05142a" opacity="0.5" />

        {/* Distant coastline - jagged black line receding */}
        <g className="cinematic-shore-fade">
          <polygon points="0,130 40,120 70,125 95,115 130,128 160,118 190,126 220,115 250,122 280,110 310,118 340,112 380,122 410,114 440,120 470,114 500,122 500,140 0,140" fill="#0a0a18" />
          {/* Small mountain silhouettes */}
          <polygon points="60,125 85,100 110,125" fill="#0a0a18" />
          <polygon points="180,122 210,95 240,122" fill="#0a0a18" />
          <polygon points="340,118 370,92 400,118" fill="#0a0a18" />
        </g>

        {/* Water */}
        <rect x="0" y="140" width="500" height="140" fill="#04081a" />

        {/* Waves */}
        {[20, 70, 130, 190, 240, 300, 360, 410, 460, 100, 260, 400].map((wx, wi) => (
          <rect key={`wave-${wi}`} x={wx} y={170 + (wi % 4) * 18} width={26} height={2}
            fill="#1a2a44" opacity="0.7"
            className="cinematic-wave" style={{ animationDelay: `${wi * 0.22}s` }}
          />
        ))}

        {/* Moon reflection trail */}
        {[80, 95, 110].map((rx, ri) => (
          <rect key={`ref-${ri}`} x={rx} y={150 + ri * 6} width={20 - ri * 4} height={1}
            fill="#e8e4d0" opacity={0.25 - ri * 0.06}
            className="cinematic-twinkle" style={{ animationDelay: `${ri * 0.6}s` }}
          />
        ))}

        {/* --- Wooden raft with passengers (bobbing on the waves) --- */}
        <g className="cinematic-boat-bob">
          {/* Water shadow under raft */}
          <ellipse cx="265" cy="245" rx="95" ry="6" fill="#020510" opacity="0.6" />

          {/* Raft logs - six horizontal planks, tied with rope */}
          <g>
            {/* Back row (slightly smaller for perspective) */}
            <rect x="185" y="222" width="160" height="6" fill="#3a2418" />
            <rect x="186" y="223" width="158" height="3" fill="#5a3a1e" />
            <rect x="188" y="224" width="3" height="2" fill="#2a1810" />
            {/* Main log 1 */}
            <rect x="180" y="228" width="170" height="8" fill="#4a2e18" />
            <rect x="181" y="229" width="168" height="4" fill="#6a4424" />
            <rect x="181" y="232" width="168" height="1" fill="#3a2212" />
            {/* Log grain ticks */}
            {[195, 218, 245, 275, 300, 330].map((gx, gi) => (
              <rect key={`grain1-${gi}`} x={gx} y={230} width={2} height={4} fill="#3a2212" />
            ))}
            {/* Main log 2 */}
            <rect x="180" y="236" width="170" height="8" fill="#3a2212" />
            <rect x="181" y="237" width="168" height="3" fill="#5a3a1e" />
            {/* Log grain ticks */}
            {[200, 228, 258, 290, 320].map((gx, gi) => (
              <rect key={`grain2-${gi}`} x={gx} y={239} width={2} height={3} fill="#241408" />
            ))}
            {/* Front plank (lighter, top-rim look) */}
            <rect x="178" y="244" width="174" height="3" fill="#5a3820" />

            {/* Rope bindings - three vertical wraps across the logs */}
            {[215, 265, 315].map((rx, ri) => (
              <g key={`rope-${ri}`}>
                <rect x={rx - 1} y={220} width={2} height={26} fill="#b8956a" />
                <rect x={rx - 2} y={222} width={4} height={2} fill="#8a6a40" />
                <rect x={rx - 2} y={230} width={4} height={2} fill="#8a6a40" />
                <rect x={rx - 2} y={238} width={4} height={2} fill="#8a6a40" />
              </g>
            ))}

            {/* Log end-caps (sawn rings) */}
            <g>
              <circle cx="180" cy="232" r="4" fill="#5a3a1e" />
              <circle cx="180" cy="232" r="2.5" fill="#3a2212" />
              <circle cx="180" cy="232" r="1" fill="#6a4428" />
              <circle cx="180" cy="240" r="4" fill="#4a2e18" />
              <circle cx="180" cy="240" r="2.5" fill="#2a1810" />
              <circle cx="180" cy="240" r="1" fill="#5a3620" />
              <circle cx="350" cy="232" r="4" fill="#5a3a1e" />
              <circle cx="350" cy="232" r="2.5" fill="#3a2212" />
              <circle cx="350" cy="240" r="4" fill="#4a2e18" />
              <circle cx="350" cy="240" r="2.5" fill="#2a1810" />
            </g>

            {/* Small bundle / jug on raft */}
            <rect x="198" y="214" width="10" height="10" fill="#5a3a20" />
            <rect x="198" y="214" width="10" height="2" fill="#8a6a48" />
            <rect x="336" y="216" width="8" height="8" fill="#3a3040" />
            <rect x="336" y="216" width="8" height="2" fill="#5a4a68" />
          </g>

          {/* Passengers sitting on the raft - varied clothing + moods */}
          <PixelPerson
            x={220} y={186} scale={1.3} variant="civilian"
            color="#f4d0a4" shirtColor="#b84a4a" pantsColor="#2a2848" hairColor="#1a0f08" accentColor="#ffdd88"
            mood="scared" sway="scared" swayDelay={0.1}
          />
          <PixelPerson
            x={246} y={184} scale={1.4} variant="civilian"
            color="#e8b896" shirtColor="#3a7aaa" pantsColor="#3a2818" hairColor="#2a1810" accentColor="#ffffff"
            mood="determined" sway="idle" swayDelay={0.3}
            mirror
          />
          <PixelPerson
            x={274} y={188} scale={1.25} variant="civilian"
            color="#f0c8a4" shirtColor="#d8a848" pantsColor="#333348" hairColor="#3a2210" accentColor="#b84a4a"
            mood="weary" sway="idle" swayDelay={0.6}
          />
          <PixelPerson
            x={298} y={192} scale={1.1} variant="civilian"
            color="#d8a880" shirtColor="#6aa85a" pantsColor="#2a2a3a" hairColor="#1a0f08" accentColor="#ffcf5c"
            mood="sad" sway="idle" swayDelay={0.9}
          />
          {/* Teardrop from the scared passenger */}
          <rect x={228} y={195} width={1.5} height={2.5} fill="#6ac0ff" opacity="0.8"
            className="cinematic-tear-drop" style={{ animationDelay: '0.3s' }} />

          {/* Mast with tattered sail */}
          <rect x="258" y="156" width="2" height="36" fill="#3a2a1a" />
          <rect x="260" y="164" width="18" height="14" fill="#d8cfa8" opacity="0.85" />
          <rect x="260" y="164" width="18" height="1" fill="#8a8060" />
          <rect x="260" y="177" width="14" height="1" fill="#8a8060" />
          <rect x="276" y="170" width="2" height="2" fill="#6a5a44" />

          {/* Glowing lantern hung at top of mast */}
          <g>
            <rect x="256" y="148" width="6" height="3" fill="#3a2a1a" />
            <rect x="255" y="150" width="8" height="8" fill="#6a4a28" />
            <rect x="256" y="151" width="6" height="6" fill="#ffdd88" opacity="0.95" className="cinematic-lamp-flicker" />
            <rect x="257" y="152" width="4" height="4" fill="#ff9044" />
            <rect x="255" y="158" width="8" height="1.5" fill="#3a2a1a" />
            <circle cx="259" cy="154" r="18" fill="#ffcc66" opacity="0.12" />
            <circle cx="259" cy="154" r="10" fill="#ffdd88" opacity="0.22" />
          </g>

          {/* Tattered South Vietnam flag (yellow with red stripes) on the mast */}
          <g className="cinematic-flicker" style={{ animationDuration: '3.5s' }}>
            <rect x="260" y="180" width="14" height="9" fill="#ffcc33" opacity="0.85" />
            <rect x="260" y="182" width="14" height="1" fill="#cc2222" opacity="0.85" />
            <rect x="260" y="185" width="14" height="1" fill="#cc2222" opacity="0.85" />
            <rect x="260" y="188" width="14" height="1" fill="#cc2222" opacity="0.85" />
            {/* Tears at the tail */}
            <polygon points="274,180 278,183 274,186" fill="#04081a" />
            <polygon points="274,186 276,189 274,189" fill="#04081a" />
          </g>

          {/* Small sputtering engine at the back */}
          <rect x="336" y="208" width="10" height="8" fill="#2a2a2a" />
          <rect x="340" y="204" width="4" height="4" fill="#1a1a1a" />

          {/* Engine smoke - failing, uneven */}
          <circle cx="344" cy="200" r="5" fill="#3a3a3a" opacity="0.55" className="cinematic-smoke-rise" />
          <circle cx="350" cy="190" r="4" fill="#2a2a2a" opacity="0.45" className="cinematic-smoke-rise" style={{ animationDelay: '0.4s' }} />
          <circle cx="356" cy="180" r="3" fill="#1a1a1a" opacity="0.35" className="cinematic-smoke-rise" style={{ animationDelay: '0.8s' }} />

          {/* Wooden oar sticking into water */}
          <g transform="translate(186 224) rotate(-25)">
            <rect x="-20" y="0" width="36" height="2" fill="#5a3a1a" />
            <rect x="-30" y="-3" width="12" height="8" fill="#4a2e18" />
          </g>

          {/* Coiled rope */}
          <g transform="translate(322 216)">
            <ellipse cx="0" cy="0" rx="8" ry="2.5" fill="#a88050" />
            <ellipse cx="0" cy="-2" rx="6" ry="2" fill="#b8956a" />
            <ellipse cx="0" cy="-4" rx="4" ry="1.5" fill="#a88050" />
          </g>

          {/* Fishing net pile */}
          <g transform="translate(204 219)">
            <ellipse cx="0" cy="0" rx="12" ry="3" fill="#4a5a3a" opacity="0.9" />
            {[0, 1, 2, 3].map(i => (
              <line key={`net-${i}`} x1={-10 + i * 6} y1={-1} x2={-8 + i * 6} y2={2} stroke="#6a7a5a" strokeWidth="0.5" />
            ))}
          </g>

          {/* Baby bundle wrapped in blanket, tucked at the front of the raft (not on a passenger) */}
          <g transform="translate(322 232)">
            <ellipse cx="6" cy="4" rx="9" ry="3.5" fill="#6a3a2a" />
            <ellipse cx="6" cy="3" rx="8" ry="3" fill="#8a4a3a" />
            <rect x="2" y="0" width="4" height="4" fill="#f4d0a4" />
            <rect x="2" y="-1" width="4" height="2" fill="#1a0f08" />
            <rect x="3" y="2" width="0.8" height="0.8" fill="#1a0f08" />
            <rect x="5" y="2" width="0.8" height="0.8" fill="#1a0f08" />
            <rect x="6" y="2" width="6" height="1" fill="#a85c40" opacity="0.7" />
          </g>

          {/* Hand-drawn paper map lying on the raft floor in front of passengers */}
          <g transform="translate(250 246) rotate(-6)">
            <rect x="0" y="0" width="20" height="13" fill="#e8d8a8" />
            <rect x="1" y="1" width="18" height="11" fill="#f0e0b8" />
            <path d="M 2 2 Q 6 5 4 8 Q 3 10 8 11" fill="none" stroke="#3a2a18" strokeWidth="0.4" />
            {[3, 6, 9, 12, 15].map((dx, di) => (
              <rect key={`route-${di}`} x={dx} y={3 + di} width={1} height={1} fill="#cc1a1a" />
            ))}
            <rect x="16" y="8" width="2" height="2" fill="#cc1a1a" />
            <rect x="15" y="9" width="4" height="1" fill="#cc1a1a" />
          </g>
        </g>

        {/* Water splashes around raft (outside bobbing group so they're continuous) */}
        {[195, 215, 255, 290, 320, 355].map((sx, si) => (
          <g key={`splash-${si}`} className="cinematic-splash" style={{ animationDelay: `${si * 0.25}s` }}>
            <rect x={sx} y={248} width={6} height={3} fill="#3a5a7a" opacity="0.8" />
            <rect x={sx + 1} y={246} width={1.5} height={2} fill="#6a9ac0" opacity="0.6" />
            <rect x={sx + 3} y={245} width={1.5} height={3} fill="#6a9ac0" opacity="0.6" />
          </g>
        ))}

        {/* Distant lightning flash behind the coast (subtle, infrequent) */}
        <g className="cinematic-flicker" style={{ animationDuration: '7s', animationDelay: '2s' }}>
          <rect x="0" y="0" width="500" height="100" fill="#8090a0" opacity="0.08" />
        </g>
        <g className="cinematic-flicker" style={{ animationDuration: '11s', animationDelay: '5s' }}>
          <polyline points="330,30 336,55 328,70 340,95" stroke="#e8eaff" strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* Extra drifting spray specks */}
        {[140, 180, 240, 300, 360, 410, 460].map((px, pi) => (
          <rect key={`spray-${pi}`} x={px} y={200 + (pi % 3) * 12} width={1} height={1}
            fill="#c8d8e8" opacity="0.5"
            className="cinematic-ember-drift" style={{ animationDelay: `${pi * 0.4}s`, animationDuration: '4s' }}
          />
        ))}

        {/* Distant foreign freighter silhouette on the horizon (hope?) */}
        <g transform="translate(430 136)" opacity="0.75">
          <rect x="0" y="8" width="38" height="4" fill="#0a0a18" />
          <rect x="2" y="6" width="34" height="2" fill="#0a0a18" />
          <rect x="8" y="0" width="4" height="6" fill="#0a0a18" />
          <rect x="18" y="-3" width="3" height="9" fill="#0a0a18" />
          <rect x="26" y="2" width="3" height="4" fill="#0a0a18" />
          {/* Tiny twinkling ship lights */}
          <rect x="4" y="9" width="1" height="1" fill="#ffdd88" className="cinematic-twinkle" />
          <rect x="14" y="9" width="1" height="1" fill="#ffdd88" className="cinematic-twinkle" style={{ animationDelay: '0.5s' }} />
          <rect x="28" y="9" width="1" height="1" fill="#ffdd88" className="cinematic-twinkle" style={{ animationDelay: '1s' }} />
          {/* Reflection */}
          <rect x="6" y="15" width="28" height="0.8" fill="#0a0a18" opacity="0.4" />
        </g>

        {/* Shooting star / meteor streaking across sky */}
        <g className="cinematic-pigeon-fly" style={{ animationDuration: '9s', animationDelay: '2s' }}
          transform="translate(150 30)">
          <rect x="0" y="0" width="2" height="2" fill="#ffffff" />
          <rect x="-8" y="0.5" width="8" height="1" fill="#ffffff" opacity="0.6" />
          <rect x="-14" y="0.5" width="6" height="0.6" fill="#ffffff" opacity="0.25" />
        </g>

        {/* Jumping fish arc near the bow */}
        <g transform="translate(168 228)">
          <path d="M 0 10 Q 5 -2 10 10" fill="none" stroke="#6a8ab0" strokeWidth="1.2" opacity="0.85" />
          <rect x="4" y="0" width="3" height="1.5" fill="#8aaac8" />
          <rect x="3" y="1.5" width="5" height="1" fill="#6a8ab0" />
          <polygon points="2,2 0,4 2,5" fill="#6a8ab0" />
          {/* Splash droplets */}
          <rect x="-1" y="9" width="1" height="1" fill="#c8d8e8" opacity="0.7" />
          <rect x="11" y="9" width="1" height="1" fill="#c8d8e8" opacity="0.7" />
        </g>

        {/* Small constellation markers to emphasize vast sky */}
        <g opacity="0.7">
          <line x1="300" y1="30" x2="330" y2="45" stroke="#ffffff" strokeWidth="0.3" opacity="0.25" />
          <line x1="330" y1="45" x2="348" y2="36" stroke="#ffffff" strokeWidth="0.3" opacity="0.25" />
          <line x1="348" y1="36" x2="370" y2="52" stroke="#ffffff" strokeWidth="0.3" opacity="0.25" />
        </g>

        {/* Ocean mist */}
        <rect x="0" y="130" width="500" height="20" fill="url(#grad6)" opacity="0.4" />
        <defs>
          <linearGradient id="grad6" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#040418" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ===========================================================================
// Main Cinematic Controller
// ===========================================================================
interface SceneEntry {
  text: string;
  Component: () => JSX.Element;
  label?: string;
  badge?: string;
}

const SCENES: SceneEntry[] = [
  {
    label: 'THE FALL',
    badge: 'SAIGON · APR 30, 1975',
    text: 'A North Vietnamese tank crushes the gates of the Independence Palace, as the gold-and-red flag of the South is lowered and replaced by the star of the North, signaling the Fall of Saigon on April 30th, 1975.',
    Component: Scene1,
  },
  {
    label: 'THE ERASURE',
    badge: 'HO CHI MINH CITY · 1975',
    text: 'A state painter stencils "HO CHI MINH CITY" over a faded "SAIGON" street sign, while a bureaucrat circles your family\'s "Puppet" military history in a permanent red ink.',
    Component: Scene2,
  },
  {
    label: 'THE GREAT DEVALUATION',
    badge: 'VIETNAM · 1975',
    text: 'You watch in silence as a government official burns your family\'s life savings in a street bonfire, handing you a small envelope of "New Dong" that won\'t buy a week\'s worth of rice.',
    Component: Scene3,
  },
  {
    label: 'THE BREAKING POINT',
    badge: 'VIETNAM · 1975',
    text: 'A draft notice for the bloody Cambodian front sits on the table next to a relocation order for a "New Economic Zone," leaving you with no future and nothing left to lose.',
    Component: Scene4,
  },
  {
    label: 'THE GOLD LEAF',
    badge: 'A HIDDEN ROOM · NIGHT',
    text: 'In the flickering light of a kerosene lamp, your mother sews a thin, leaf-like sheet of gold into the lining of your jacket — the secret price of a passage to the unknown.',
    Component: Scene5,
  },
  {
    label: 'THE VANISHING SHORE',
    badge: 'SOUTH CHINA SEA',
    text: 'The mechanical thrum of a failing engine drowns out the waves as the coastline of Vietnam becomes a jagged black line that finally disappears into the dark of the sea.',
    Component: Scene6,
  },
];

export function EscapingVietnamCinematic({ onComplete }: CinematicProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [, setTextDone] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setArrowVisible(true), 500);
  }, []);

  const handleNext = useCallback(() => {
    if (!arrowVisible) return;

    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex(s => s + 1);
      setTextDone(false);
      setArrowVisible(false);
    } else {
      onComplete();
    }
  }, [sceneIndex, arrowVisible, onComplete]);

  const scene = SCENES[sceneIndex];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Scene-local keyframes (kept inside this file so edits stay scoped to scenes/) */}
      <style>{`
        /* --- character sway presets (used by PixelPerson 'sway' prop) --- */
        @keyframes chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes chibi-scared {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        @keyframes chibi-fast {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-2px) rotate(2deg); }
        }
        .chibi-sway-idle   { animation: chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-fast   { animation: chibi-fast 0.9s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* --- scene-specific motion --- */
        @keyframes cin-flag-down { 0% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
        @keyframes cin-flag-up   { 0% { transform: translateY(22px); }  100% { transform: translateY(0); } }
        @keyframes cin-tank-roll { 0% { transform: translateX(-80px); } 100% { transform: translateX(90px); } }

        @keyframes cin-raft-rock {
          0%, 100% { transform: translate(0,0) rotate(-1.4deg); }
          50%      { transform: translate(-2px,-4px) rotate(1.4deg); }
        }
        @keyframes cin-shore-fade { 0% { opacity: 0.9; } 100% { opacity: 0.35; } }

        @keyframes cin-paint-arm {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(3px) rotate(6deg); }
        }
        @keyframes cin-sew-arm {
          0%, 100% { transform: translate(0,0); }
          50%      { transform: translate(-1px,-2px); }
        }
        @keyframes cin-dump-arm {
          0%, 100% { transform: rotate(-8deg); }
          50%      { transform: rotate(18deg); }
        }
        @keyframes cin-lamp-flicker {
          0%, 100% { opacity: 0.9; }
          45%      { opacity: 0.65; }
          55%      { opacity: 1.0; }
          80%      { opacity: 0.8; }
        }
        @keyframes cin-ember-drift {
          0%   { transform: translate(0,0); opacity: 1; }
          100% { transform: translate(-18px,-60px); opacity: 0; }
        }
        @keyframes cin-bill-flutter {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--bx,20px),-80px) rotate(180deg); opacity: 0; }
        }
        @keyframes cin-tear-drop {
          0%   { transform: translate(0,0); opacity: 0.9; }
          100% { transform: translate(0,14px); opacity: 0; }
        }
        @keyframes cin-gold-shimmer {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes cin-pigeon-fly {
          0%   { transform: translate(0,0); }
          100% { transform: translate(220px,-40px); }
        }
        @keyframes cin-flicker {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 0.35; }
        }
        @keyframes cin-splash {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50%      { transform: scaleY(0.3); opacity: 0.3; }
        }
        @keyframes cin-clock-tick {
          0%, 49%  { transform: rotate(0deg); }
          50%,100% { transform: rotate(6deg); }
        }
        @keyframes cin-pen-shake {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          30%      { transform: translate(0.5px,0) rotate(-2deg); }
          70%      { transform: translate(-0.5px,0) rotate(2deg); }
        }

        /* --- walking motion (translate across screen, with a tiny bob) --- */
        @keyframes cin-walk-right {
          0%   { transform: translate(var(--wx-start, -60px), 0); }
          100% { transform: translate(var(--wx-end, 540px), 0); }
        }
        @keyframes cin-walk-left {
          0%   { transform: translate(var(--wx-start, 540px), 0); }
          100% { transform: translate(var(--wx-end, -60px), 0); }
        }
        @keyframes cin-walk-bob {
          0%, 100% { transform: translateY(0); }
          25%      { transform: translateY(-1px); }
          50%      { transform: translateY(0); }
          75%      { transform: translateY(-1px); }
        }
        /* 'backwards' keeps them offscreen at the starting keyframe during the delay,
           so they slide INTO the frame instead of popping from (0,0). */
        .cinematic-walk-right { animation: cin-walk-right 22s linear infinite backwards; }
        .cinematic-walk-left  { animation: cin-walk-left 22s linear infinite backwards; }
        .cinematic-walk-bob   { animation: cin-walk-bob 0.5s ease-in-out infinite; transform-box: fill-box; }

        .cinematic-flag-down   { animation: cin-flag-down 6s ease-in-out forwards; }
        .cinematic-flag-up     { animation: cin-flag-up 6s ease-in-out forwards; }
        .cinematic-tank-roll   { animation: cin-tank-roll 7s ease-in-out forwards; }
        .cinematic-boat-bob    { animation: cin-raft-rock 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .cinematic-shore-fade  { animation: cin-shore-fade 8s ease-out forwards; }
        .cinematic-paint-arm   { animation: cin-paint-arm 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 50%; }
        .cinematic-sew-arm     { animation: cin-sew-arm 0.45s ease-in-out infinite; transform-box: fill-box; }
        .cinematic-dump-arm    { animation: cin-dump-arm 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
        .cinematic-lamp-flicker{ animation: cin-lamp-flicker 2.4s ease-in-out infinite; }
        .cinematic-ember-drift { animation: cin-ember-drift 3s linear infinite; }
        .cinematic-bill-flutter{ animation: cin-bill-flutter 2.4s ease-out infinite; }
        .cinematic-tear-drop   { animation: cin-tear-drop 2.2s ease-in infinite; transform-box: fill-box; }
        .cinematic-gold-shimmer{ animation: cin-gold-shimmer 1.6s ease-in-out infinite; }
        .cinematic-pigeon-fly  { animation: cin-pigeon-fly 6s linear infinite; transform-box: fill-box; }
        .cinematic-flicker     { animation: cin-flicker 2s ease-in-out infinite; }
        .cinematic-splash      { animation: cin-splash 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .cinematic-clock-tick  { animation: cin-clock-tick 1s steps(1) infinite; transform-box: fill-box; transform-origin: center center; }
        .cinematic-pen-shake   { animation: cin-pen-shake 0.35s ease-in-out infinite; transform-box: fill-box; }
      `}</style>

      {/* --- Scene region (top) --- takes the majority of the screen --- */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div key={sceneIndex} className="absolute inset-0 animate-fade-in-up">
          <scene.Component />
        </div>

        {/* Progress dots - top-left */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex gap-1">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-colors duration-300 ${
                i === sceneIndex
                  ? 'bg-primary'
                  : i < sceneIndex
                  ? 'bg-primary/50'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Period badge - top-right */}
        {scene.badge && (
          <div
            key={`badge-${sceneIndex}`}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 animate-fade-in-up"
          >
            <div className="font-retro text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-primary bg-black/70 backdrop-blur-sm border border-white/70 px-3 py-1">
              {scene.badge}
            </div>
          </div>
        )}

        {/* Scanlines only over the scene */}
        <div className="absolute inset-0 pointer-events-none scanlines z-10" />
      </div>

      {/* --- Text panel region (bottom) --- compact, white-bordered --- */}
      <div className="relative shrink-0 bg-black px-2 md:px-4 pt-1.5 pb-2 md:pb-3">
        <div className="relative flex bg-black border-2 border-white">
          {/* Text area (also click-to-advance) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!arrowVisible}
            className="flex-1 text-left px-3 md:px-4 py-2 min-h-[54px] md:min-h-[64px] focus:outline-none disabled:cursor-default cursor-pointer"
          >
            <div className="flex flex-col gap-0.5">
              {scene.label && (
                <p
                  key={`label-${sceneIndex}`}
                  className="font-retro text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-primary animate-fade-in-up"
                >
                  [ {scene.label} ]
                </p>
              )}
              <Typewriter
                key={sceneIndex}
                text={scene.text}
                onComplete={handleTextDone}
              />
            </div>

            {/* Continue indicator - bottom-right down-arrow */}
            {arrowVisible && (
              <div className="absolute right-1.5 bottom-0.5 md:right-2 md:bottom-1 animate-fade-in-up">
                <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white animate-pulse" />
              </div>
            )}
          </button>

          {/* Menu strip on the right */}
          <div className="flex flex-col border-l-2 border-white bg-black">
            <GameMenuBar onSaveAndExit={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
