import { PixelPerson } from './PixelPeople';

/**
 * Pirates! — A larger threatening boat approaches with armed men,
 * your smaller boat in foreground, tense ocean standoff.
 */
export function PiratesScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a0a] via-[#2a1a1a] to-[#0a1020]">
      <style>{`
        @keyframes pir-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes pir-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: pir-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: pir-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes pir-approach {
          0%   { transform: translate(120px, -20px) scale(0.5); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pir-boat-rock {
          0%, 100% { transform: rotate(-1deg) translateY(0); }
          50%      { transform: rotate(1deg) translateY(-2px); }
        }
        @keyframes pir-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes pir-flicker {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 0.4; }
        }
        @keyframes pir-spotlight {
          0%, 100% { opacity: 0.3; transform: rotate(-5deg); }
          50%      { opacity: 0.6; transform: rotate(5deg); }
        }

        .pir-approach   { animation: pir-approach 8s ease-out forwards; }
        .pir-boat-rock  { animation: pir-boat-rock 3s ease-in-out infinite; transform-origin: center bottom; }
        .pir-wave       { animation: pir-wave 3s linear infinite; }
        .pir-flicker    { animation: pir-flicker 1.5s ease-in-out infinite; }
        .pir-spotlight  { animation: pir-spotlight 4s ease-in-out infinite; transform-origin: top center; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Red-tinged sky — dusk/danger */}
        <rect x="0" y="0" width="500" height="100" fill="#1a0a0a" />
        <rect x="0" y="60" width="500" height="40" fill="#2a1008" opacity="0.5" />

        {/* Low sun / blood-red horizon */}
        <circle cx="250" cy="100" r="20" fill="#8a2a0a" opacity="0.4" />
        <rect x="0" y="96" width="500" height="4" fill="#4a1a0a" opacity="0.5" />

        {/* Ocean */}
        <rect x="0" y="100" width="500" height="180" fill="#0a1020" />
        {[110, 130, 150, 170, 190, 210, 230, 250].map((y, i) => (
          <line key={`w-${y}`} x1={-40} y1={y} x2={540} y2={y}
            stroke="#1a2030" strokeWidth="1" opacity="0.3"
            className="pir-wave" style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Pirate boat — larger, menacing, approaching from right */}
        <g transform="translate(340, 120)" className="pir-approach">
          <g className="pir-boat-rock">
            {/* Dark hull — bigger */}
            <polygon points="-55,16 -45,36 55,36 65,16" fill="#1a1008" />
            <polygon points="-55,16 -45,36 55,36 65,16" fill="none" stroke="#0a0804" strokeWidth="1" />
            <line x1="-47" y1="26" x2="57" y2="26" stroke="#0a0804" strokeWidth="1" />
            {/* Dark deck */}
            <rect x="-45" y="10" width="100" height="8" fill="#2a1a0a" />
            {/* Wheelhouse */}
            <rect x="-38" y="-6" width="28" height="16" fill="#1a1008" />
            <rect x="-34" y="-4" width="8" height="8" fill="#2a1a0a" />
            <rect x="-22" y="-4" width="8" height="8" fill="#2a1a0a" />
            {/* Spotlight on bow */}
            <g className="pir-spotlight">
              <polygon points="52,8 30,-40 74,-40" fill="#ffcc44" opacity="0.15" />
              <rect x="48" y="6" width="8" height="4" fill="#ffcc44" opacity="0.6" className="pir-flicker" />
            </g>

            {/* Armed pirates */}
            {[
              { x: -30, mood: 'angry' as const, shirt: '#1a1a1a' },
              { x: -14, mood: 'determined' as const, shirt: '#2a1a0a' },
              { x: 0, mood: 'angry' as const, shirt: '#1a0a0a' },
              { x: 14, mood: 'determined' as const, shirt: '#2a2a1a' },
              { x: 30, mood: 'angry' as const, shirt: '#1a1a0a' },
            ].map((p, i) => (
              <g key={`pirate-${i}`}>
                <PixelPerson
                  x={p.x} y={4} scale={0.7} variant="soldier"
                  color="#b08060" shirtColor={p.shirt} pantsColor="#0a0a0a"
                  hairColor="#0a0804" accentColor="#4a3a2a"
                  mood={p.mood} sway="idle" swayDelay={i * 0.2}
                />
                {/* Machete/weapon */}
                <rect x={p.x + 8} y={8} width={8} height={1.5} fill="#8a8a8a" />
              </g>
            ))}
          </g>
        </g>

        {/* Your boat — foreground left, smaller */}
        <g transform="translate(130, 175)" className="pir-boat-rock" style={{ animationDelay: '0.5s' }}>
          {/* Hull */}
          <polygon points="-30,10 -24,20 30,20 36,10" fill="#3a2a14" />
          <line x1="-26" y1="15" x2="32" y2="15" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-24" y="6" width="54" height="5" fill="#4a3a20" />
          {/* Mast */}
          <rect x="10" y="-16" width="2" height="22" fill="#3a2a18" />

          {/* Scared passengers */}
          {[
            { x: -16, mood: 'scared' as const },
            { x: -6, mood: 'scared' as const },
            { x: 4, mood: 'scared' as const },
            { x: 14, mood: 'scared' as const },
            { x: 24, mood: 'scared' as const },
          ].map((p, i) => (
            <PixelPerson key={`you-${i}`}
              x={p.x} y={0} scale={0.5} variant="civilian"
              color="#c4956a" shirtColor={['#5a6a7a', '#4a3a2a', '#3a4a5a', '#5a4a3a', '#2a3a4a'][i]}
              pantsColor="#1a1a1a" hairColor="#1a0a04" accentColor="#5a5a5a"
              mood={p.mood} sway="scared" swayDelay={i * 0.15}
            />
          ))}
        </g>

        {/* Red warning glow on horizon */}
        <rect x="0" y="90" width="500" height="20" fill="#8a1a0a" opacity="0.12" />
      </svg>
    </div>
  );
}
