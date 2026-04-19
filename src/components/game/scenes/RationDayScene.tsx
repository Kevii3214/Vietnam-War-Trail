export function RationDayScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#5a7a9a] via-[#708a6a] to-[#a09070]">
      <style>{`
        @keyframes rd-sway {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-1px) rotate(0.5deg); }
        }
        @keyframes rd-steam {
          0%   { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(-14px); opacity: 0; }
        }
        @keyframes rd-shuffle {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-1px); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Sky */}
        <rect x="0" y="0" width="500" height="100" fill="#6a8aaa" />
        {/* Clouds */}
        {[60, 180, 320, 440].map((cx, ci) => (
          <g key={`cl-${ci}`} transform={`translate(${cx}, ${20 + (ci % 3) * 12})`}>
            <ellipse cx="0" cy="0" rx={18 + ci % 2 * 6} ry="6" fill="#8aa0b8" opacity="0.4" />
            <ellipse cx="8" cy="-3" rx="12" ry="5" fill="#8aa0b8" opacity="0.3" />
          </g>
        ))}

        {/* Background — tents / camp structures */}
        {[30, 100, 170, 240, 310, 380, 450].map((tx, ti) => (
          <g key={`tent-${ti}`} transform={`translate(${tx}, ${80 + (ti % 3) * 4})`}>
            <polygon points="0,0 -16,20 16,20" fill={ti % 2 === 0 ? '#7a7a6a' : '#8a8070'} />
            <polygon points="0,0 -16,20 16,20" fill="none" stroke="#5a5a4a" strokeWidth="0.5" />
          </g>
        ))}

        {/* Ground */}
        <rect x="0" y="100" width="500" height="180" fill="#a09070" />
        <rect x="0" y="100" width="500" height="4" fill="#908060" />
        {/* Dirt texture */}
        {[110, 130, 150, 170, 190, 210, 230, 250].map((y, i) => (
          <line key={`dirt-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#988868" strokeWidth="0.4" opacity="0.3" />
        ))}

        {/* Stew station — large pot on table */}
        <g transform="translate(420, 116)">
          {/* Table */}
          <rect x="-26" y="16" width="52" height="6" fill="#5a4a30" />
          <rect x="-24" y="22" width="4" height="20" fill="#4a3a20" />
          <rect x="20" y="22" width="4" height="20" fill="#4a3a20" />
          {/* Big pot */}
          <ellipse cx="0" cy="8" rx="18" ry="4" fill="#4a4a4a" />
          <rect x="-18" y="-8" width="36" height="16" fill="#4a4a4a" />
          <ellipse cx="0" cy="-8" rx="18" ry="4" fill="#5a5a5a" />
          {/* Stew inside */}
          <ellipse cx="0" cy="-6" rx="14" ry="3" fill="#6a4a2a" />
          {/* Steam */}
          {[-6, 0, 6].map((sx, si) => (
            <rect key={`steam-${si}`} x={sx} y={-16 - si * 4} width="2" height="6"
              fill="#d0d0d0" opacity="0.4"
              style={{ animation: 'rd-steam 2s ease-out infinite', animationDelay: `${si * 0.5}s` }}
            />
          ))}
          {/* Ladle */}
          <rect x="14" y="-14" width="2" height="16" fill="#6a6a6a" transform="rotate(15 14 -6)" />
          {/* Server person */}
          <g transform="translate(0, -16)">
            <rect x="-3" y="-8" width="6" height="6" fill="#b08060" /> {/* head */}
            <rect x="-5" y="-2" width="10" height="10" fill="#e8e0d0" /> {/* apron */}
            <rect x="-4" y="8" width="8" height="6" fill="#3a3a3a" /> {/* legs */}
          </g>
        </g>

        {/* The queue — a giant line snaking left from the pot */}
        {/* Row 1 — closest to pot, going left */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 380 - i * 24;
          const y = 136 + (i % 3) * 2;
          const shirts = ['#5a6a7a', '#7a5a4a', '#4a5a6a', '#6a6a5a', '#5a4a3a', '#3a5a6a', '#6a5a6a',
            '#4a6a5a', '#7a6a5a', '#5a5a7a', '#6a4a5a', '#4a4a6a', '#7a7a5a', '#5a7a6a'];
          return (
            <g key={`q1-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'rd-shuffle 3s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}>
              {/* Head */}
              <rect x="-3" y="-10" width="6" height="6" fill="#c4956a" />
              {/* Hair */}
              <rect x="-3" y="-12" width="6" height="3" fill="#1a0a04" />
              {/* Body */}
              <rect x="-4" y="-4" width="8" height="8" fill={shirts[i]} />
              {/* Legs */}
              <rect x="-3" y="4" width="3" height="5" fill="#2a2a38" />
              <rect x="1" y="4" width="3" height="5" fill="#2a2a38" />
              {/* Bowl in hand (some people) */}
              {i < 6 && (
                <rect x="4" y="-2" width="5" height="3" fill="#d0c8b0" rx="1" />
              )}
            </g>
          );
        })}

        {/* Row 2 — line wraps around, going right, further back */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 50 + i * 26;
          const y = 170 + (i % 2) * 2;
          const shirts = ['#6a5a4a', '#4a6a5a', '#5a5a6a', '#7a6a4a', '#4a5a4a', '#6a4a6a',
            '#5a7a5a', '#4a4a5a', '#7a5a5a', '#5a6a4a', '#6a6a6a', '#4a7a6a'];
          return (
            <g key={`q2-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'rd-shuffle 3.5s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}>
              <rect x="-2" y="-8" width="5" height="5" fill="#c4956a" />
              <rect x="-2" y="-10" width="5" height="3" fill="#1a0a04" />
              <rect x="-3" y="-3" width="7" height="7" fill={shirts[i]} />
              <rect x="-2" y="4" width="3" height="4" fill="#2a2a38" />
              <rect x="1" y="4" width="3" height="4" fill="#2a2a38" />
            </g>
          );
        })}

        {/* Row 3 — even further back, smaller */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 380 - i * 28;
          const y = 200 + (i % 2) * 2;
          const shirts = ['#5a5a4a', '#4a5a5a', '#6a5a5a', '#5a6a5a', '#4a4a5a',
            '#6a6a4a', '#5a4a5a', '#4a6a6a', '#7a5a4a', '#5a5a5a'];
          return (
            <g key={`q3-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'rd-shuffle 4s ease-in-out infinite', animationDelay: `${i * 0.25}s` }}>
              <rect x="-2" y="-7" width="4" height="4" fill="#c4956a" />
              <rect x="-2" y="-9" width="4" height="3" fill="#1a0a04" />
              <rect x="-3" y="-3" width="6" height="6" fill={shirts[i]} />
              <rect x="-2" y="3" width="2" height="3" fill="#2a2a38" />
              <rect x="1" y="3" width="2" height="3" fill="#2a2a38" />
            </g>
          );
        })}

        {/* Fence / barrier posts along the line */}
        {[60, 140, 220, 300, 380].map((fx, fi) => (
          <g key={`fence-${fi}`}>
            <rect x={fx} y={130} width="2" height="26" fill="#6a5a40" />
            {fi < 4 && (
              <line x1={fx + 2} y1={136} x2={fx + 80} y2={136}
                stroke="#8a7a50" strokeWidth="1" opacity="0.5" />
            )}
          </g>
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="20" fill="#000" opacity="0.25" />
        <rect x="0" y="260" width="500" height="20" fill="#000" opacity="0.3" />
      </svg>
    </div>
  );
}
