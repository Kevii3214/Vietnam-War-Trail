import { PixelPerson } from './PixelPeople';

export function WaitingScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#4a6a9a] via-[#c88040] to-[#e0a050]">
      <style>{`
        @keyframes wait-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-0.5px) rotate(0.5deg); }
        }
        .chibi-sway-idle { animation: wait-chibi-idle 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes wait-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-60px); }
        }
        @keyframes wait-sun-rays {
          0%, 100% { opacity: 0.06; }
          50%      { opacity: 0.12; }
        }
        @keyframes wait-grass-sway {
          0%, 100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg); }
        }
        @keyframes wait-bird {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(40px, -8px); }
          100% { transform: translate(80px, 0); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Golden sunset sky */}
        <rect x="0" y="0" width="500" height="280" fill="#4a6a9a" />
        {/* Gradient bands — sunset layers */}
        <rect x="0" y="50" width="500" height="30" fill="#6a80a0" opacity="0.6" />
        <rect x="0" y="80" width="500" height="25" fill="#a0805a" opacity="0.5" />
        <rect x="0" y="105" width="500" height="20" fill="#c09050" opacity="0.6" />
        <rect x="0" y="125" width="500" height="15" fill="#e0a050" opacity="0.7" />

        {/* Sun — low on horizon */}
        <circle cx="350" cy="120" r="28" fill="#e8b040" opacity="0.8" />
        <circle cx="350" cy="120" r="22" fill="#f0c050" opacity="0.9" />
        <circle cx="350" cy="120" r="14" fill="#f8d868" />

        {/* Sun rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 350 + Math.cos(rad) * 120;
          const y2 = 120 + Math.sin(rad) * 80;
          return (
            <line key={`ray-${i}`} x1={350} y1={120} x2={x2} y2={y2}
              stroke="#f0c050" strokeWidth="1"
              style={{ animation: 'wait-sun-rays 5s ease-in-out infinite', animationDelay: `${i * 0.3}s` }}
            />
          );
        })}

        {/* Clouds — drifting slowly */}
        {[
          { x: 80, y: 30, rx: 24, ry: 7 },
          { x: 200, y: 50, rx: 18, ry: 6 },
          { x: 420, y: 35, rx: 28, ry: 8 },
          { x: 140, y: 65, rx: 16, ry: 5 },
        ].map((c, ci) => (
          <g key={`cloud-${ci}`}
            style={{ animation: 'wait-cloud-drift 40s linear infinite', animationDelay: `${ci * 8}s` }}>
            <ellipse cx={c.x} cy={c.y} rx={c.rx} ry={c.ry}
              fill={ci < 2 ? '#8aa0c0' : '#c0a080'} opacity="0.35" />
            <ellipse cx={c.x + 10} cy={c.y - 3} rx={c.rx * 0.6} ry={c.ry * 0.8}
              fill={ci < 2 ? '#8aa0c0' : '#c0a080'} opacity="0.25" />
          </g>
        ))}

        {/* Birds in the distance */}
        {[
          { x: 120, y: 55, delay: 0 },
          { x: 160, y: 48, delay: 2 },
          { x: 200, y: 60, delay: 4 },
        ].map((b, bi) => (
          <g key={`bird-${bi}`} transform={`translate(${b.x}, ${b.y})`}
            style={{ animation: 'wait-bird 15s linear infinite', animationDelay: `${b.delay}s` }}>
            <line x1="0" y1="0" x2="-3" y2="-2" stroke="#2a2a3a" strokeWidth="1" />
            <line x1="0" y1="0" x2="3" y2="-2" stroke="#2a2a3a" strokeWidth="1" />
          </g>
        ))}

        {/* Horizon line */}
        <rect x="0" y="138" width="500" height="2" fill="#a08050" opacity="0.4" />

        {/* Ground — grassy camp area */}
        <rect x="0" y="140" width="500" height="140" fill="#708040" />
        <rect x="0" y="140" width="500" height="6" fill="#607030" />

        {/* Grass texture */}
        {Array.from({ length: 30 }).map((_, i) => {
          const gx = 10 + i * 16 + (i % 3) * 5;
          const gy = 145 + (i % 5) * 20;
          return (
            <g key={`grass-${i}`} transform={`translate(${gx}, ${gy})`}
              style={{ animation: 'wait-grass-sway 3s ease-in-out infinite', animationDelay: `${i * 0.15}s`, transformOrigin: 'center bottom' }}>
              <line x1="0" y1="0" x2="-2" y2="-6" stroke="#5a7030" strokeWidth="1" />
              <line x1="2" y1="0" x2="4" y2="-5" stroke="#5a7030" strokeWidth="1" />
              <line x1="4" y1="0" x2="3" y2="-7" stroke="#5a7030" strokeWidth="1" />
            </g>
          );
        })}

        {/* Distant camp structures — very faint */}
        {[40, 120, 400, 460].map((tx, ti) => (
          <polygon key={`dtent-${ti}`}
            points={`${tx},${136} ${tx - 8},${144} ${tx + 8},${144}`}
            fill="#5a6a3a" opacity="0.3" />
        ))}

        {/* Your character — sitting alone on a small rise, staring at the sky */}
        <g transform="translate(240, 175)">
          {/* Small hill/mound */}
          <ellipse cx="0" cy="12" rx="30" ry="8" fill="#607030" />

          {/* Sitting figure — legs out front, leaning back on hands, looking up */}
          <PixelPerson
            x={0} y={-4} scale={2.2} variant="civilian"
            color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
            hairColor="#1a0f08" accentColor="#8a7a5a"
            mood="sad" sway="idle"
          />
        </g>

        {/* Barbed wire fence — subtle reminder this is a camp */}
        <g transform="translate(0, 245)" opacity="0.35">
          {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((px, pi) => (
            <rect key={`fp-${pi}`} x={px} y={0} width="2" height="16" fill="#4a4a4a" />
          ))}
          <line x1="0" y1="4" x2="500" y2="4" stroke="#5a5a5a" strokeWidth="0.8" />
          <line x1="0" y1="10" x2="500" y2="10" stroke="#5a5a5a" strokeWidth="0.8" />
          {/* Barbs */}
          {Array.from({ length: 16 }).map((_, bi) => (
            <g key={`barb-${bi}`} transform={`translate(${15 + bi * 30}, ${bi % 2 === 0 ? 4 : 10})`}>
              <line x1="0" y1="-2" x2="0" y2="2" stroke="#6a6a6a" strokeWidth="1" />
              <line x1="-2" y1="0" x2="2" y2="0" stroke="#6a6a6a" strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="15" fill="#000" opacity="0.15" />
        <rect x="0" y="265" width="500" height="15" fill="#000" opacity="0.2" />
      </svg>
    </div>
  );
}
