export function LanguageClassScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#6a8aaa] via-[#8a9a7a] to-[#a09070]">
      <style>{`
        @keyframes lc-read {
          0%, 100% { transform: translateY(0) rotate(-0.3deg); }
          50%      { transform: translateY(-0.5px) rotate(0.3deg); }
        }
        @keyframes lc-page-flip {
          0%, 90%, 100% { transform: rotateY(0deg); }
          95%            { transform: rotateY(10deg); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Outdoor camp setting — sky */}
        <rect x="0" y="0" width="500" height="90" fill="#6a8aaa" />
        {/* Clouds */}
        {[80, 220, 380].map((cx, ci) => (
          <ellipse key={`cl-${ci}`} cx={cx} cy={25 + ci % 2 * 10} rx={22} ry={7}
            fill="#8aa0b8" opacity="0.35" />
        ))}

        {/* Tents in background */}
        {[60, 160, 300, 420].map((tx, ti) => (
          <polygon key={`tent-${ti}`}
            points={`${tx},${80 + (ti % 2) * 3} ${tx - 14},${100} ${tx + 14},${100}`}
            fill={ti % 2 === 0 ? '#7a7a6a' : '#8a8070'} />
        ))}

        {/* Ground */}
        <rect x="0" y="100" width="500" height="180" fill="#a09070" />
        <rect x="0" y="100" width="500" height="3" fill="#908060" />

        {/* The circle of people sitting on the ground reading */}
        {/* Positioned in a rough circle around center (250, 175) */}
        {[
          { x: 250, y: 130, rot: 0 },   // top
          { x: 300, y: 145, rot: 25 },   // top-right
          { x: 330, y: 175, rot: 50 },   // right
          { x: 310, y: 205, rot: 0 },    // bottom-right
          { x: 260, y: 220, rot: -10 },  // bottom
          { x: 200, y: 210, rot: -20 },  // bottom-left
          { x: 170, y: 180, rot: -40 },  // left
          { x: 190, y: 148, rot: -15 },  // top-left
        ].map((p, i) => {
          const shirts = ['#5a6a7a', '#7a5a4a', '#4a5a6a', '#6a6a5a', '#5a4a3a', '#3a5a6a', '#6a5a6a', '#4a6a5a'];
          return (
            <g key={`reader-${i}`} transform={`translate(${p.x}, ${p.y})`}
              style={{ animation: 'lc-read 3.5s ease-in-out infinite', animationDelay: `${i * 0.3}s` }}>
              {/* Sitting person */}
              {/* Head */}
              <rect x="-3" y="-14" width="7" height="6" fill="#c4956a" />
              {/* Hair */}
              <rect x="-3" y="-16" width="7" height="3" fill="#1a0a04" />
              {/* Body — leaning forward slightly */}
              <rect x="-4" y="-8" width="9" height="9" fill={shirts[i]} />
              {/* Legs folded (sitting) */}
              <rect x="-5" y="1" width="11" height="5" fill="#2a2a38" />

              {/* Pamphlet in hands — white rectangle with text lines */}
              <g transform={`translate(5, -6) rotate(${p.rot})`}
                style={{ animation: 'lc-page-flip 8s ease-in-out infinite', animationDelay: `${i * 1.2}s` }}>
                <rect x="0" y="0" width="12" height="9" fill="#f0ece0" />
                <rect x="0" y="0" width="12" height="9" fill="none" stroke="#c0b8a0" strokeWidth="0.5" />
                {/* Text lines */}
                <rect x="1.5" y="1.5" width="9" height="1" fill="#3a3a3a" opacity="0.5" />
                <rect x="1.5" y="3.5" width="7" height="1" fill="#3a3a3a" opacity="0.4" />
                <rect x="1.5" y="5.5" width="8" height="1" fill="#3a3a3a" opacity="0.4" />
                <rect x="1.5" y="7" width="5" height="0.8" fill="#3a3a3a" opacity="0.3" />
                {/* "ENGLISH" header */}
                <rect x="2" y="0.5" width="8" height="1.2" fill="#2a4a6a" opacity="0.7" />
              </g>
            </g>
          );
        })}

        {/* Center of circle — a small stool or mat with a larger English book */}
        <g transform="translate(250, 175)">
          <rect x="-8" y="-2" width="16" height="4" fill="#8a7a5a" />
          {/* Open book */}
          <rect x="-10" y="-8" width="10" height="7" fill="#f0ece0" />
          <rect x="0" y="-8" width="10" height="7" fill="#e8e0d0" />
          <line x1="0" y1="-8" x2="0" y2="-1" stroke="#a09080" strokeWidth="0.8" />
          {/* Text on pages */}
          <rect x="-8" y="-6" width="6" height="0.8" fill="#3a3a3a" opacity="0.4" />
          <rect x="-8" y="-4.5" width="5" height="0.8" fill="#3a3a3a" opacity="0.3" />
          <rect x="2" y="-6" width="6" height="0.8" fill="#3a3a3a" opacity="0.4" />
          <rect x="2" y="-4.5" width="5" height="0.8" fill="#3a3a3a" opacity="0.3" />
        </g>

        {/* Some scattered extra pamphlets on the ground */}
        {[140, 350, 280, 170].map((px, pi) => (
          <rect key={`pam-${pi}`}
            x={px} y={230 + (pi % 3) * 6}
            width="8" height="6" fill="#e8e0d0"
            transform={`rotate(${-15 + pi * 12} ${px + 4} ${233 + (pi % 3) * 6})`}
            opacity="0.5"
          />
        ))}

        {/* Simple rope/string boundary of the class area */}
        {[150, 200, 300, 350].map((rx, ri) => (
          <rect key={`post-${ri}`} x={rx} y={115} width="2" height="18" fill="#6a5a40" opacity="0.4" />
        ))}
        <line x1="151" y1="120" x2="351" y2="120" stroke="#8a7a50" strokeWidth="0.5" opacity="0.3" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="15" fill="#000" opacity="0.2" />
        <rect x="0" y="265" width="500" height="15" fill="#000" opacity="0.25" />
      </svg>
    </div>
  );
}
