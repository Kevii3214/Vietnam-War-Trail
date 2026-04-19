export function TheLetterScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#7a9ab0] via-[#8a9a7a] to-[#a09070]">
      <style>{`
        @keyframes tl-shuffle {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-1.5px); }
        }
        @keyframes tl-sway {
          0%, 100% { transform: translateY(0) rotate(-0.3deg); }
          50%      { transform: translateY(-0.5px) rotate(0.3deg); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Sky */}
        <rect x="0" y="0" width="500" height="90" fill="#7a9ab0" />
        {/* Clouds */}
        {[100, 260, 400].map((cx, ci) => (
          <ellipse key={`cl-${ci}`} cx={cx} cy={22 + ci % 2 * 8} rx={20} ry={6}
            fill="#9ab0c0" opacity="0.3" />
        ))}

        {/* Background tents */}
        {[40, 130, 260, 380, 460].map((tx, ti) => (
          <polygon key={`t-${ti}`}
            points={`${tx},${78 + (ti % 2) * 3} ${tx - 12},${95} ${tx + 12},${95}`}
            fill={ti % 2 === 0 ? '#7a7a6a' : '#8a8070'} />
        ))}

        {/* Ground */}
        <rect x="0" y="95" width="500" height="185" fill="#a09070" />
        <rect x="0" y="95" width="500" height="3" fill="#908060" />

        {/* The mailbox / mail station — right side */}
        <g transform="translate(420, 110)">
          {/* Post */}
          <rect x="-3" y="0" width="6" height="50" fill="#4a4a4a" />
          {/* Box */}
          <rect x="-14" y="-14" width="28" height="18" fill="#2a5a8a" />
          <rect x="-14" y="-14" width="28" height="3" fill="#1a4a7a" />
          {/* Slot */}
          <rect x="-8" y="-8" width="16" height="3" fill="#0a2a4a" />
          {/* Letters sticking out slightly */}
          <rect x="-6" y="-10" width="4" height="3" fill="#e8e0d0" opacity="0.7" />
          <rect x="2" y="-11" width="3" height="4" fill="#f0ece0" opacity="0.6" />
        </g>

        {/* Mail worker behind a small window/counter */}
        <g transform="translate(410, 125)">
          {/* Counter/window structure */}
          <rect x="-20" y="6" width="40" height="4" fill="#5a4a30" />
          <rect x="-22" y="-10" width="44" height="16" fill="#a09080" />
          <rect x="-22" y="-10" width="44" height="16" fill="none" stroke="#706050" strokeWidth="1" />
          {/* Worker */}
          <rect x="-3" y="-6" width="6" height="5" fill="#b08060" /> {/* head */}
          <rect x="-4" y="-1" width="8" height="6" fill="#3a5a3a" /> {/* shirt */}
        </g>

        {/* The long queue of people — snaking from right to left */}
        {/* Row 1 — closest to mailbox */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 390 - i * 22;
          const y = 148 + (i % 3) * 2;
          const shirts = ['#5a6a7a', '#7a5a4a', '#4a5a6a', '#6a6a5a', '#5a4a3a', '#3a5a6a',
            '#6a5a6a', '#4a6a5a', '#7a6a5a', '#5a5a7a', '#6a4a5a', '#4a4a6a', '#7a7a5a', '#5a7a6a'];
          return (
            <g key={`q1-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'tl-shuffle 3s ease-in-out infinite', animationDelay: `${i * 0.12}s` }}>
              <rect x="-3" y="-10" width="6" height="6" fill="#c4956a" />
              <rect x="-3" y="-12" width="6" height="3" fill="#1a0a04" />
              <rect x="-4" y="-4" width="8" height="8" fill={shirts[i]} />
              <rect x="-3" y="4" width="3" height="5" fill="#2a2a38" />
              <rect x="1" y="4" width="3" height="5" fill="#2a2a38" />
              {/* Some holding letters/envelopes */}
              {i % 2 === 0 && (
                <rect x="4" y="-3" width="5" height="4" fill="#e8e0d0" />
              )}
            </g>
          );
        })}

        {/* Row 2 — line loops back right */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 90 + i * 24;
          const y = 185 + (i % 2) * 2;
          const shirts = ['#6a5a4a', '#4a6a5a', '#5a5a6a', '#7a6a4a', '#4a5a4a', '#6a4a6a',
            '#5a7a5a', '#4a4a5a', '#7a5a5a', '#5a6a4a', '#6a6a6a', '#4a7a6a'];
          return (
            <g key={`q2-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'tl-shuffle 3.5s ease-in-out infinite', animationDelay: `${i * 0.18}s` }}>
              <rect x="-2" y="-8" width="5" height="5" fill="#c4956a" />
              <rect x="-2" y="-10" width="5" height="3" fill="#1a0a04" />
              <rect x="-3" y="-3" width="7" height="7" fill={shirts[i]} />
              <rect x="-2" y="4" width="3" height="4" fill="#2a2a38" />
              <rect x="1" y="4" width="3" height="4" fill="#2a2a38" />
            </g>
          );
        })}

        {/* Row 3 — tail end */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 390 - i * 26;
          const y = 218 + (i % 2) * 2;
          const shirts = ['#5a5a4a', '#4a5a5a', '#6a5a5a', '#5a6a5a', '#4a4a5a',
            '#6a6a4a', '#5a4a5a', '#4a6a6a'];
          return (
            <g key={`q3-${i}`} transform={`translate(${x}, ${y})`}
              style={{ animation: 'tl-shuffle 4s ease-in-out infinite', animationDelay: `${i * 0.22}s` }}>
              <rect x="-2" y="-7" width="4" height="4" fill="#c4956a" />
              <rect x="-2" y="-9" width="4" height="3" fill="#1a0a04" />
              <rect x="-3" y="-3" width="6" height="6" fill={shirts[i]} />
              <rect x="-2" y="3" width="2" height="3" fill="#2a2a38" />
              <rect x="1" y="3" width="2" height="3" fill="#2a2a38" />
            </g>
          );
        })}

        {/* Fence posts alongside queue */}
        {[100, 180, 260, 340].map((fx, fi) => (
          <g key={`f-${fi}`}>
            <rect x={fx} y={138} width="2" height="16" fill="#6a5a40" />
            {fi < 3 && (
              <line x1={fx + 2} y1={142} x2={fx + 80} y2={142}
                stroke="#8a7a50" strokeWidth="0.8" opacity="0.4" />
            )}
          </g>
        ))}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="15" fill="#000" opacity="0.2" />
        <rect x="0" y="265" width="500" height="15" fill="#000" opacity="0.25" />
      </svg>
    </div>
  );
}
