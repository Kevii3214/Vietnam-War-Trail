import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { GameMenuBar } from '../GameMenuBar';
import { PixelPerson } from './PixelPeople';

interface CinematicProps {
  onComplete: () => void;
  landingCountry: string;
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
// SCENE 1 — THE SPOTTING
// A searchlight sweeps across the water and finds your boat
// ===========================================================================
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a18] via-[#0a1020] to-[#0a1828]">
      <style>{`
        @keyframes p3s1-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes p3s1-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: p3s1-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: p3s1-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes p3s1-sweep {
          0%   { transform: rotate(-35deg); }
          40%  { transform: rotate(15deg); }
          60%  { transform: rotate(5deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes p3s1-sweep-lock {
          0%   { transform: rotate(8deg); }
          100% { transform: rotate(8deg); }
        }
        @keyframes p3s1-boat-rock {
          0%, 100% { transform: rotate(-0.5deg) translateY(0); }
          50%      { transform: rotate(0.5deg) translateY(-1.5px); }
        }
        @keyframes p3s1-wave {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50%      { transform: translateX(6px); opacity: 0.3; }
        }
        @keyframes p3s1-twinkle {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 0.8; }
        }
        @keyframes p3s1-vessel-approach {
          0%   { transform: translate(500px, 80px) scale(0.3); }
          60%  { transform: translate(100px, 90px) scale(0.6); }
          100% { transform: translate(60px, 95px) scale(0.7); }
        }
        @keyframes p3s1-pulse-light {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 0.4; }
        }
        @keyframes p3s1-your-boat-drift {
          0%, 100% { transform: translate(0, 0) rotate(-0.3deg); }
          50%      { transform: translate(2px, -1px) rotate(0.3deg); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a18" />

        {/* Stars */}
        {[
          [25, 10], [70, 25], [120, 8], [175, 30], [230, 12], [280, 35],
          [330, 15], [380, 28], [430, 6], [475, 22], [50, 45], [150, 48],
          [260, 42], [370, 50], [450, 40],
        ].map(([x, y], i) => (
          <rect key={`s-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#d0c8b0"
            opacity={0.2 + (i % 3) * 0.15}
            style={{ animation: `p3s1-twinkle 2.2s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Horizon — faint land mass to the north */}
        <polygon points="0,92 60,88 130,92 200,86 280,90 360,84 440,88 500,86 500,100 0,100"
          fill="#0a0f14" opacity="0.6" />

        {/* Ocean */}
        <rect x="0" y="100" width="500" height="180" fill="#0a1020" />
        {[110, 128, 146, 164, 182, 200, 218, 236, 254].map((y, i) => (
          <line key={`w-${y}`} x1={-10} y1={y} x2={510} y2={y}
            stroke="#1a2030" strokeWidth="0.6" opacity="0.25"
            style={{ animation: `p3s1-wave 3.5s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Coast guard vessel approaching from the north */}
        <g style={{ animation: 'p3s1-vessel-approach 8s ease-out forwards' }}>
          {/* Hull - gray military */}
          <polygon points="-30,10 -24,22 30,22 36,10" fill="#3a3a3a" />
          <rect x="-24" y="4" width="50" height="8" fill="#4a4a4a" />
          {/* Bridge */}
          <rect x="-18" y="-8" width="22" height="12" fill="#3a3a3a" />
          <rect x="-14" y="-6" width="6" height="6" fill="#1a1a2a" />
          <rect x="-4" y="-6" width="6" height="6" fill="#1a1a2a" />
          {/* Antenna/mast */}
          <rect x="8" y="-20" width="1.5" height="14" fill="#5a5a5a" />
          {/* Blinking red nav light */}
          <rect x="7" y="-22" width="3" height="3" fill="#cc2222"
            style={{ animation: 'p3s1-pulse-light 1.2s ease-in-out infinite' }} />

          {/* Searchlight — sweeps then locks on */}
          <g style={{ transformOrigin: '24px 2px', animation: 'p3s1-sweep 6s ease-in-out forwards' }}>
            <polygon points="22,0 300,120 360,100" fill="#ffee88" opacity="0.06" />
            <polygon points="23,0 250,80 310,70" fill="#ffee88" opacity="0.03" />
            <rect x="20" y="-2" width="6" height="4" fill="#ffee88" opacity="0.7" />
          </g>

          {/* Second searchlight (locks onto your boat) */}
          <g style={{ transformOrigin: '-18px 2px', animation: 'p3s1-sweep 5s ease-in-out forwards', animationDelay: '1s' }}>
            <polygon points="-20,0 200,140 260,120" fill="#ffee88" opacity="0.04" />
            <rect x="-22" y="-2" width="6" height="4" fill="#ffdd88" opacity="0.5" />
          </g>

          {/* Wake behind vessel */}
          <rect x="-34" y="22" width="12" height="3" fill="#1a2a3a" opacity="0.3" />
        </g>

        {/* Your fishing boat — center-right, lit up by searchlight */}
        <g transform="translate(320, 160)" style={{ animation: 'p3s1-your-boat-drift 5s ease-in-out infinite' }}>
          <g style={{ animation: 'p3s1-boat-rock 3.5s ease-in-out infinite', transformOrigin: 'center bottom' }}>
            {/* Hull */}
            <polygon points="-34,12 -28,22 34,22 40,12" fill="#3a2a14" />
            <line x1="-30" y1="17" x2="36" y2="17" stroke="#2a1a0a" strokeWidth="0.8" />
            {/* Deck */}
            <rect x="-28" y="8" width="62" height="5" fill="#4a3a20" />
            {/* Cabin */}
            <rect x="-22" y="-2" width="18" height="10" fill="#3a2a14" />
            <rect x="-18" y="0" width="5" height="5" fill="#0a0a18" />
            {/* Mast */}
            <rect x="12" y="-16" width="2" height="24" fill="#3a2a18" />

            {/* People — shielding their eyes from the light */}
            {[
              { x: -14, mood: 'shocked' as const },
              { x: -4, mood: 'scared' as const },
              { x: 6, mood: 'scared' as const },
              { x: 16, mood: 'shocked' as const },
              { x: 26, mood: 'scared' as const },
            ].map((p, i) => (
              <PixelPerson key={`you-${i}`}
                x={p.x} y={2} scale={0.5} variant="civilian"
                color="#c4956a" shirtColor={['#5a6a7a', '#4a3a2a', '#3a4a5a', '#5a4a3a', '#2a3a4a'][i]}
                pantsColor="#1a1a1a" hairColor="#1a0a04" accentColor="#5a5a5a"
                mood={p.mood} sway="scared" swayDelay={i * 0.15}
              />
            ))}

            {/* Searchlight glow hitting the boat */}
            <ellipse cx="0" cy="10" rx="40" ry="12" fill="#ffee88" opacity="0.06" />
          </g>
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="25" fill="#000" opacity="0.4" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 2 — THE SINKING
// Coast guard hits your boat, hull cracking, people jumping into water
// ===========================================================================
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a1828] to-[#0a2038]">
      <style>{`
        @keyframes p3s2-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes p3s2-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: p3s2-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: p3s2-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes p3s2-sink {
          0%   { transform: rotate(0deg) translateY(0); }
          30%  { transform: rotate(8deg) translateY(4px); }
          60%  { transform: rotate(15deg) translateY(14px); }
          100% { transform: rotate(22deg) translateY(28px); }
        }
        @keyframes p3s2-wave {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50%      { transform: translateX(5px); opacity: 0.45; }
        }
        @keyframes p3s2-splash {
          0%   { transform: scaleY(0.3) scaleX(0.5); opacity: 0; }
          30%  { transform: scaleY(1.2) scaleX(1); opacity: 0.8; }
          100% { transform: scaleY(0.5) scaleX(1.3); opacity: 0; }
        }
        @keyframes p3s2-swimmer {
          0%   { transform: translate(var(--sw-sx), var(--sw-sy)); }
          100% { transform: translate(var(--sw-ex), var(--sw-ey)); }
        }
        @keyframes p3s2-boat-rock {
          0%, 100% { transform: rotate(-0.3deg); }
          50%      { transform: rotate(0.3deg); }
        }
        @keyframes p3s2-bubble {
          0%   { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(-12px); opacity: 0; }
        }
        @keyframes p3s2-impact-flash {
          0%   { opacity: 0; }
          5%   { opacity: 0.4; }
          15%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes p3s2-debris {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(180deg); opacity: 0; }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#0a0a18" />

        {/* Stars */}
        {[40, 110, 180, 250, 330, 400, 470].map((x, i) => (
          <rect key={`s-${i}`} x={x} y={8 + (i % 4) * 14} width="1.5" height="1.5" fill="#d0c8b0" opacity={0.2 + (i % 3) * 0.12} />
        ))}

        {/* Distant shore — land is close now */}
        <polygon points="0,86 60,80 140,84 220,76 310,82 400,74 480,78 500,76 500,96 0,96"
          fill="#1a2a1a" opacity="0.5" />
        {/* Treeline on shore */}
        {[20, 60, 100, 150, 200, 260, 320, 380, 430, 470].map((tx, ti) => (
          <polygon key={`tree-${ti}`}
            points={`${tx},${78 + (ti % 3) * 2} ${tx - 6},${88 + (ti % 2) * 2} ${tx + 6},${88 + (ti % 2) * 2}`}
            fill="#0a1a0a" opacity="0.5"
          />
        ))}

        {/* Ocean — rougher waves */}
        <rect x="0" y="96" width="500" height="184" fill="#0a1828" />
        {[105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255].map((y, i) => (
          <line key={`w-${y}`} x1={-10} y1={y} x2={510} y2={y}
            stroke="#1a2a3a" strokeWidth="0.8" opacity="0.3"
            style={{ animation: `p3s2-wave 2.5s ease-in-out infinite`, animationDelay: `${i * 0.35}s` }}
          />
        ))}

        {/* Impact flash overlay */}
        <rect x="0" y="0" width="500" height="280" fill="#ffee88"
          style={{ animation: 'p3s2-impact-flash 3s ease-in-out forwards', animationDelay: '1s' }} />

        {/* Coast guard vessel — large, looming */}
        <g transform="translate(170, 110)" style={{ animation: 'p3s2-boat-rock 3s ease-in-out infinite', transformOrigin: 'center bottom' }}>
          {/* Large hull */}
          <polygon points="-50,16 -42,34 50,34 58,16" fill="#3a3a3a" />
          <rect x="-42" y="8" width="96" height="10" fill="#4a4a4a" />
          {/* Bridge */}
          <rect x="-36" y="-10" width="36" height="18" fill="#3a3a3a" />
          <rect x="-32" y="-8" width="8" height="8" fill="#1a1a2a" />
          <rect x="-20" y="-8" width="8" height="8" fill="#1a1a2a" />
          {/* Mast */}
          <rect x="10" y="-26" width="2" height="20" fill="#5a5a5a" />
          {/* Searchlight — pointed down at water */}
          <rect x="44" y="4" width="8" height="4" fill="#ffee88" opacity="0.6" />
          <polygon points="44,6 60,60 80,50" fill="#ffee88" opacity="0.04" />
          {/* Railing */}
          {[-38, -28, -18, -8, 2, 12, 22, 32, 42].map((rx, ri) => (
            <rect key={`rail-${ri}`} x={rx} y={6} width="1" height="4" fill="#5a5a5a" />
          ))}
          <line x1="-38" y1="6" x2="44" y2="6" stroke="#5a5a5a" strokeWidth="0.5" />

          {/* Coast guard crew on deck */}
          {[
            { x: -30, mood: 'determined' as const },
            { x: -14, mood: 'neutral' as const },
            { x: 20, mood: 'determined' as const },
            { x: 36, mood: 'neutral' as const },
          ].map((p, i) => (
            <PixelPerson key={`crew-${i}`}
              x={p.x} y={2} scale={0.45} variant="soldier"
              color="#b08060" shirtColor="#2a3a4a" pantsColor="#1a1a2a"
              hairColor="#0a0804" accentColor="#4a4a5a"
              mood={p.mood} sway="idle" swayDelay={i * 0.3}
            />
          ))}
        </g>

        {/* Your boat — sinking, tilting */}
        <g transform="translate(320, 140)"
          style={{ animation: 'p3s2-sink 10s ease-in forwards', transformOrigin: 'right bottom' }}>
          {/* Cracked hull */}
          <polygon points="-34,12 -28,22 34,22 40,12" fill="#3a2a14" />
          <line x1="-30" y1="17" x2="36" y2="17" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Crack in hull */}
          <polyline points="-10,14 -8,18 -4,15 0,20 4,16" fill="none" stroke="#0a0a18" strokeWidth="1.5" />
          {/* Deck */}
          <rect x="-28" y="8" width="62" height="5" fill="#4a3a20" />
          {/* Cabin — breaking apart */}
          <rect x="-22" y="-2" width="18" height="10" fill="#3a2a14" />
          {/* Mast — tilting */}
          <rect x="12" y="-16" width="2" height="24" fill="#3a2a18" />

          {/* Water flooding in */}
          <rect x="-10" y="16" width="20" height="6" fill="#1a3050" opacity="0.6" />

          {/* Debris flying */}
          {[
            { x: -5, y: 8, dx: -20, dy: -15 },
            { x: 10, y: 5, dx: 25, dy: -20 },
            { x: 0, y: 10, dx: -15, dy: -25 },
            { x: 15, y: 6, dx: 30, dy: -10 },
          ].map((d, i) => (
            <rect key={`debris-${i}`} x={d.x} y={d.y} width="3" height="2" fill="#4a3a20"
              style={{
                animation: 'p3s2-debris 2s ease-out forwards',
                animationDelay: `${1.5 + i * 0.3}s`,
                ['--dx' as string]: `${d.dx}px`,
                ['--dy' as string]: `${d.dy}px`,
              } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Bubbles from sinking boat */}
        {[300, 310, 320, 330, 340, 315, 325].map((bx, bi) => (
          <circle key={`bub-${bi}`} cx={bx} cy={170 + (bi % 3) * 5} r={1 + (bi % 2)}
            fill="#4a8aaa" opacity="0.4"
            style={{ animation: 'p3s2-bubble 2s ease-out infinite', animationDelay: `${3 + bi * 0.5}s` }}
          />
        ))}

        {/* People swimming toward shore */}
        {[
          { sx: 310, sy: 160, ex: 160, ey: 130, delay: 2, dur: 12 },
          { sx: 330, sy: 155, ex: 180, ey: 125, delay: 2.5, dur: 14 },
          { sx: 300, sy: 165, ex: 140, ey: 135, delay: 3, dur: 11 },
          { sx: 340, sy: 158, ex: 200, ey: 128, delay: 3.5, dur: 13 },
          { sx: 320, sy: 162, ex: 170, ey: 132, delay: 4, dur: 12 },
          { sx: 350, sy: 155, ex: 220, ey: 122, delay: 2.8, dur: 15 },
          { sx: 290, sy: 168, ex: 130, ey: 140, delay: 4.5, dur: 13 },
        ].map((sw, i) => (
          <g key={`swim-${i}`}
            style={{
              animation: 'p3s2-swimmer 12s ease-in-out forwards',
              animationDelay: `${sw.delay}s`,
              animationDuration: `${sw.dur}s`,
              ['--sw-sx' as string]: `${sw.sx}px`,
              ['--sw-sy' as string]: `${sw.sy}px`,
              ['--sw-ex' as string]: `${sw.ex}px`,
              ['--sw-ey' as string]: `${sw.ey}px`,
            } as React.CSSProperties}
          >
            {/* Swimmer — just a head and arms */}
            <rect x={-2} y={-2} width={4} height={4} fill="#c4956a" /> {/* head */}
            <rect x={-5} y={1} width={10} height={2} fill={['#5a6a7a', '#4a3a2a', '#3a4a5a', '#5a4a3a', '#2a3a4a', '#3a5a3a', '#5a3a4a'][i]} /> {/* arms */}
            {/* Splash */}
            <rect x={-6} y={2} width={2} height={1} fill="#4a8aaa" opacity="0.3" />
            <rect x={5} y={2} width={2} height={1} fill="#4a8aaa" opacity="0.3" />
          </g>
        ))}

        {/* Splash effects at impact point */}
        {[260, 275, 290].map((sx, si) => (
          <g key={`splash-${si}`} transform={`translate(${sx}, 145)`}
            style={{ animation: 'p3s2-splash 1.5s ease-out forwards', animationDelay: `${1.2 + si * 0.2}s`, transformOrigin: 'center bottom' }}>
            <rect x="-4" y="-8" width="8" height="8" fill="#4a8aaa" opacity="0.5" />
            <rect x="-6" y="-4" width="12" height="4" fill="#6aaac0" opacity="0.3" />
          </g>
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="25" fill="#000" opacity="0.4" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 3 — THE SHORE
// Everyone arriving on the beach, getting escorted by authorities
// ===========================================================================
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a2030] via-[#2a3040] to-[#c8b890]">
      <style>{`
        @keyframes p3s3-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes p3s3-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: p3s3-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: p3s3-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes p3s3-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-20px); }
        }
        @keyframes p3s3-crawl {
          0%   { transform: translate(var(--cr-sx), var(--cr-sy)); }
          100% { transform: translate(var(--cr-ex), var(--cr-ey)); }
        }
        @keyframes p3s3-dawn-glow {
          0%   { opacity: 0; }
          100% { opacity: 0.3; }
        }
        @keyframes p3s3-breathe {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.02); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Pre-dawn sky */}
        <rect x="0" y="0" width="500" height="100" fill="#1a2030" />
        {/* Dawn glow on horizon */}
        <rect x="0" y="70" width="500" height="30" fill="#3a3a50"
          style={{ animation: 'p3s3-dawn-glow 10s ease-out forwards' }} />
        <rect x="0" y="85" width="500" height="15" fill="#4a4a60"
          style={{ animation: 'p3s3-dawn-glow 12s ease-out forwards' }} />

        {/* Fading stars */}
        {[40, 110, 190, 280, 360, 440].map((x, i) => (
          <rect key={`s-${i}`} x={x} y={10 + (i % 3) * 16} width="1.5" height="1.5" fill="#c0b8a0" opacity={0.15 + (i % 2) * 0.1} />
        ))}

        {/* Ocean — calmer near shore */}
        <rect x="0" y="100" width="500" height="60" fill="#1a3050" />
        {[106, 118, 130, 142, 154].map((y, i) => (
          <line key={`ow-${y}`} x1={-20} y1={y} x2={520} y2={y}
            stroke="#2a4060" strokeWidth="0.8" opacity="0.25"
            style={{ animation: 'p3s3-wave 4s linear infinite', animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Surf / foam line where water meets sand */}
        <rect x="0" y="158" width="500" height="3" fill="#6a9ab0" opacity="0.4" />
        <rect x="0" y="160" width="500" height="2" fill="#a0c8d0" opacity="0.3"
          style={{ animation: 'p3s3-wave 3s linear infinite' }} />

        {/* Sandy beach */}
        <rect x="0" y="162" width="500" height="118" fill="#c8b890" />
        {/* Sand texture */}
        {[170, 185, 200, 215, 230, 245, 260].map((y, i) => (
          <line key={`sand-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#b8a880" strokeWidth="0.5" opacity="0.3" />
        ))}
        {/* Wet sand near waterline */}
        <rect x="0" y="162" width="500" height="12" fill="#a89870" />

        {/* People who have crawled/walked ashore — wet, exhausted, on the sand */}
        {/* Survivor on knees, catching breath */}
        {[
          { x: 200, y: 180 },
          { x: 280, y: 176 },
          { x: 340, y: 182 },
        ].map((p, i) => (
          <g key={`kneel-${i}`} transform={`translate(${p.x}, ${p.y})`}
            style={{ animation: 'p3s3-breathe 3s ease-in-out infinite', animationDelay: `${i * 0.4}s`, transformOrigin: 'center bottom' }}>
            {/* Kneeling figure */}
            <rect x="0" y="0" width="6" height="6" fill="#c4956a" /> {/* head */}
            <rect x="-2" y="6" width="10" height="6" fill={['#5a6a7a', '#4a3a2a', '#3a4a5a'][i]} /> {/* torso */}
            <rect x="0" y="12" width="6" height="4" fill="#2a2a38" /> {/* legs folded */}
            {/* Hands on ground */}
            <rect x="-4" y="10" width="3" height="2" fill="#c4956a" />
            <rect x="8" y="10" width="3" height="2" fill="#c4956a" />
            {/* Water dripping */}
            <rect x="2" y="14" width="1" height="2" fill="#6a9ab0" opacity="0.4" />
          </g>
        ))}

        {/* You — standing, turning around to count */}
        <g transform="translate(250, 184)">
          <PixelPerson
            x={0} y={0} scale={1.6} variant="civilian"
            color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
            hairColor="#1a0f08" accentColor="#8a7a5a"
            mood="weary" sway="idle"
          />
        </g>

        {/* Your family — accounted for nearby */}
        {/* Father */}
        <g transform="translate(224, 190)">
          <PixelPerson
            x={0} y={0} scale={1.3} variant="civilian"
            color="#c4956a" shirtColor="#4a3a2a" pantsColor="#2a2018"
            hairColor="#1a0f08" accentColor="#8a8070"
            mood="weary" sway="idle" swayDelay={0.2}
          />
        </g>
        {/* Mother */}
        <g transform="translate(270, 188)">
          <PixelPerson
            x={0} y={0} scale={1.3} variant="civilian"
            color="#c4956a" shirtColor="#5a3a2a" pantsColor="#2a1a18"
            hairColor="#2a1810" accentColor="#d0b080"
            mood="sad" sway="idle" swayDelay={0.4}
          />
        </g>

        {/* More survivors arriving from water */}
        {[
          { sx: 160, sy: 162, ex: 180, ey: 188, delay: 0, dur: 6 },
          { sx: 320, sy: 162, ex: 340, ey: 186, delay: 1, dur: 7 },
          { sx: 120, sy: 164, ex: 150, ey: 192, delay: 2, dur: 8 },
        ].map((cr, i) => (
          <g key={`crawl-${i}`}
            style={{
              animation: 'p3s3-crawl 8s ease-out forwards',
              animationDelay: `${cr.delay}s`,
              animationDuration: `${cr.dur}s`,
              ['--cr-sx' as string]: `${cr.sx}px`,
              ['--cr-sy' as string]: `${cr.sy}px`,
              ['--cr-ex' as string]: `${cr.ex}px`,
              ['--cr-ey' as string]: `${cr.ey}px`,
            } as React.CSSProperties}
          >
            <PixelPerson
              x={0} y={0} scale={0.8} variant="civilian"
              color="#c4956a" shirtColor={['#3a4a5a', '#5a4a3a', '#2a3a4a'][i]}
              pantsColor="#1a1a1a" hairColor="#1a0a04" accentColor="#5a5a5a"
              mood="weary" sway="idle" swayDelay={i * 0.3}
            />
          </g>
        ))}

        {/* The two authority figures — standing in front of you, gesturing to follow */}
        <g transform="translate(242, 210)">
          <PixelPerson
            x={0} y={0} scale={1.5} variant="soldier"
            color="#b08060" shirtColor="#2a4a2a" pantsColor="#1a2a1a"
            hairColor="#0a0804" accentColor="#6a8a6a"
            mood="determined" sway="idle"
          />
        </g>
        <g transform="translate(266, 210)">
          <PixelPerson
            x={0} y={0} scale={1.5} variant="soldier"
            color="#b08060" shirtColor="#2a4a2a" pantsColor="#1a2a1a"
            hairColor="#0a0804" accentColor="#6a8a6a"
            mood="neutral" sway="idle" swayDelay={0.3}
            mirror
          />
        </g>

        {/* Footprints in wet sand */}
        {[180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330].map((fx, fi) => (
          <g key={`foot-${fi}`} transform={`translate(${fx}, ${172 + (fi % 3) * 3})`}>
            <rect x="0" y="0" width="2" height="3" fill="#a89870" opacity="0.5" />
            <rect x="4" y="1" width="2" height="3" fill="#a89870" opacity="0.5" />
          </g>
        ))}

        {/* Distant coast guard ship still on water with light */}
        <g transform="translate(400, 108)">
          <polygon points="-18,6 -14,14 18,14 22,6" fill="#3a3a3a" opacity="0.5" />
          <rect x="-12" y="2" width="26" height="5" fill="#4a4a4a" opacity="0.5" />
          <rect x="16" y="0" width="4" height="2" fill="#ffee88" opacity="0.3" />
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="25" fill="#000" opacity="0.3" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.3" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENES ARRAY & MAIN EXPORT
// ===========================================================================
const SCENES_TEMPLATE = [
  {
    label: 'THE SPOTTING',
    badge: 'THE SOUTH CHINA SEA · NIGHT',
    text: 'A light sweeps across the water from the north. Then another. A vessel, speeding fast, no markings visible. Maybe it is a rescue. The light finds your boat and stays on it.',
    Component: Scene1,
  },
  {
    label: 'THE SINKING',
    badge: 'THE SOUTH CHINA SEA · NIGHT',
    text: 'The coast guard vessel is closing in and hits your boat. The hull cracks below the waterline on the second impact. The only choice now is to swim.',
    Component: Scene2,
  },
  {
    label: 'THE SHORE',
    badge: '__COUNTRY__',
    text: 'The sand comes up under your hands before you expected it. You stand. You walk the last few meters. You turn around and count the people behind you. You count again. Your family is all accounted for. However, standing in front of you were two men. They pulled you along to follow them.',
    Component: Scene3,
  },
];

export function RefugeeCampCinematic({ onComplete, landingCountry }: CinematicProps) {
  // Use a ref so the country is locked on mount — never changes mid-cinematic
  const [country] = useState(() => landingCountry || 'Malaysia');

  const countryBadge: Record<string, string> = {
    'Malaysia': 'MALAYSIAN COAST · PRE-DAWN',
    'Philippines': 'PHILIPPINE SHORE · PRE-DAWN',
    'Indonesia': 'INDONESIAN COAST · PRE-DAWN',
    'Thailand': 'THAI COAST · PRE-DAWN',
    'Hong Kong': 'HONG KONG HARBOUR · PRE-DAWN',
    'Singapore': 'SINGAPORE STRAIT · PRE-DAWN',
  };

  const scenes = SCENES_TEMPLATE.map(s => ({
    ...s,
    badge: s.badge === '__COUNTRY__'
      ? (countryBadge[country] || `${country.toUpperCase()} · PRE-DAWN`)
      : s.badge,
  }));
  const [sceneIndex, setSceneIndex] = useState(0);
  const [, setTextDone] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setArrowVisible(true), 500);
  }, []);

  const handleNext = useCallback(() => {
    if (!arrowVisible) return;

    if (sceneIndex < scenes.length - 1) {
      setSceneIndex(s => s + 1);
      setTextDone(false);
      setArrowVisible(false);
    } else {
      onComplete();
    }
  }, [sceneIndex, arrowVisible, onComplete, scenes.length]);

  const scene = scenes[sceneIndex];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* --- Scene region (top) --- */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div key={sceneIndex} className="absolute inset-0 animate-fade-in-up">
          <scene.Component />
        </div>

        {/* Progress dots */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex gap-1">
          {scenes.map((_, i) => (
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

        {/* Period badge */}
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

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none scanlines z-10" />
      </div>

      {/* --- Text panel (bottom) --- */}
      <div className="relative shrink-0 bg-black px-2 md:px-4 pt-1.5 pb-2 md:pb-3">
        <div className="relative flex bg-black border-2 border-white">
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

            {arrowVisible && (
              <div className="absolute right-1.5 bottom-0.5 md:right-2 md:bottom-1 animate-fade-in-up">
                <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white animate-pulse" />
              </div>
            )}
          </button>

          <div className="flex flex-col border-l-2 border-white bg-black">
            <GameMenuBar onSaveAndExit={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
