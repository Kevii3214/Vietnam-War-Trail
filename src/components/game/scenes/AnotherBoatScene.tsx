import { PixelPerson } from './PixelPeople';

/**
 * Another Boat Sighted — a distant overloaded boat on the horizon,
 * people waving something white, your boat watching from afar.
 */
export function AnotherBoatScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a2030] via-[#0a1828] to-[#0a1020]">
      <style>{`
        @keyframes ab-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes ab-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: ab-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: ab-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes ab-wave-drift {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50%      { transform: translateX(5px); opacity: 0.3; }
        }
        @keyframes ab-boat-rock {
          0%, 100% { transform: rotate(-0.5deg) translateY(0); }
          50%      { transform: rotate(0.5deg) translateY(-1px); }
        }
        @keyframes ab-flag-wave {
          0%, 100% { transform: rotate(-8deg); }
          50%      { transform: rotate(8deg); }
        }
        @keyframes ab-distant-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        @keyframes ab-twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.9; }
        }

        .ab-wave-drift  { animation: ab-wave-drift 3.5s ease-in-out infinite; }
        .ab-boat-rock   { animation: ab-boat-rock 3.5s ease-in-out infinite; transform-origin: center bottom; }
        .ab-flag-wave   { animation: ab-flag-wave 0.8s ease-in-out infinite; transform-origin: bottom left; }
        .ab-distant-bob { animation: ab-distant-bob 3s ease-in-out infinite; }
        .ab-twinkle     { animation: ab-twinkle 2.2s ease-in-out infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Hazy dawn sky */}
        <rect x="0" y="0" width="500" height="280" fill="#1a2030" />
        <rect x="0" y="80" width="500" height="30" fill="#2a3040" opacity="0.4" />

        {/* Low sun — hazy, diffused */}
        <circle cx="250" cy="95" r="16" fill="#d8a860" opacity="0.3" />
        <circle cx="250" cy="95" r="24" fill="#c8904a" opacity="0.12" />

        {/* Stars fading in dawn */}
        {[40, 120, 200, 310, 400, 460].map((x, i) => (
          <rect key={`s-${i}`} x={x} y={10 + (i % 3) * 18} width="1.5" height="1.5"
            fill="#d0c8b0" opacity={0.15 + (i % 2) * 0.1} className="ab-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Ocean */}
        <rect x="0" y="108" width="500" height="172" fill="#0a1020" />
        {[118, 135, 152, 170, 188, 206, 224, 242, 260].map((y, i) => (
          <line key={`w-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#1a2030" strokeWidth="0.5" opacity="0.2"
            className="ab-wave-drift" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Distant boat on horizon — small, low in water, overloaded */}
        <g transform="translate(340, 112)" className="ab-distant-bob">
          {/* Tiny hull — barely above water */}
          <polygon points="-16,3 -12,8 16,8 20,3" fill="#2a1a0a" />
          <rect x="-12" y="1" width="28" height="3" fill="#3a2a14" />
          {/* Crowded heads — about 40 people compressed into tiny silhouettes */}
          {[-10, -7, -4, -1, 2, 5, 8, 11, 14].map((hx, hi) => (
            <rect key={`head-${hi}`} x={hx} y={-1 - (hi % 2)} width={2.5} height={2.5}
              fill="#1a1a2a" />
          ))}
          {/* Person waving white cloth */}
          <g className="ab-flag-wave" style={{ transformOrigin: `0px 0px` }}>
            <rect x="0" y="-8" width="1" height="6" fill="#3a2a18" />
            <rect x="1" y="-8" width="6" height="4" fill="#e8e0d0" />
          </g>
          {/* Second person waving */}
          <g className="ab-flag-wave" style={{ animationDelay: '0.3s', transformOrigin: '8px 0px' }}>
            <rect x="8" y="-7" width="1" height="5" fill="#3a2a18" />
            <rect x="9" y="-7" width="5" height="3" fill="#e8e0d0" />
          </g>
        </g>

        {/* Your boat — foreground left, watching */}
        <g transform="translate(140, 170)" className="ab-boat-rock">
          {/* Hull */}
          <polygon points="-36,12 -28,24 36,24 42,12" fill="#3a2a14" />
          <line x1="-30" y1="18" x2="38" y2="18" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-28" y="8" width="64" height="5" fill="#4a3a20" />
          {/* Cabin */}
          <rect x="-22" y="-4" width="20" height="12" fill="#3a2a14" />
          {/* Mast */}
          <rect x="14" y="-18" width="2" height="26" fill="#3a2a18" />

          {/* You — standing, looking toward the distant boat */}
          <PixelPerson
            x={20} y={0} scale={0.65} variant="civilian"
            color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
            hairColor="#1a0f08" accentColor="#8a7a5a"
            mood="sad" sway="idle"
          />

          {/* Others watching */}
          {[
            { x: -16, mood: 'sad' as const, shirt: '#3a3a4a' },
            { x: -6, mood: 'weary' as const, shirt: '#4a3a2a' },
            { x: 4, mood: 'sad' as const, shirt: '#2a4a4a' },
            { x: 30, mood: 'weary' as const, shirt: '#3a4a3a' },
          ].map((p, i) => (
            <PixelPerson key={`watch-${i}`}
              x={p.x} y={2} scale={0.55} variant="civilian"
              color="#c4956a" shirtColor={p.shirt} pantsColor="#1a1a1a"
              hairColor="#1a0a04" accentColor="#5a5a5a"
              mood={p.mood} sway="idle" swayDelay={i * 0.3}
            />
          ))}
        </g>

        {/* Haze on horizon */}
        <rect x="0" y="104" width="500" height="12" fill="#1a2030" opacity="0.4" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="25" fill="#000" opacity="0.4" />
        <rect x="0" y="258" width="500" height="22" fill="#000" opacity="0.4" />
      </svg>
    </div>
  );
}
