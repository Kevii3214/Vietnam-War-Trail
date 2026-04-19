import React from 'react';

export const DiscriminationScene: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
      {/* Supermarket interior */}
      <rect width="500" height="280" fill="#f0ead8" />
      <rect x="0" y="0" width="500" height="25" fill="#e0d8c8" />
      {/* Lights */}
      {[100, 250, 400].map((x, i) => (
        <rect key={i} x={x - 25} y="22" width="50" height="3" fill="#fff" opacity="0.8" />
      ))}

      {/* Shelves in background */}
      <rect x="0" y="30" width="60" height="170" fill="#8B6914" />
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <g key={i}>
          <rect x="2" y={33 + i * 28} width="56" height="24" fill="#9B7924" />
          {Array.from({ length: 7 }).map((_, j) => (
            <rect key={j} x={4 + j * 8} y={35 + i * 28} width="6" height="20"
              fill={['#cc3333', '#3366cc', '#33aa33', '#ffaa00', '#cc33aa', '#33cccc', '#ff6633'][j]} rx="1" />
          ))}
        </g>
      ))}

      <rect x="440" y="30" width="60" height="170" fill="#8B6914" />
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <g key={i}>
          <rect x="442" y={33 + i * 28} width="56" height="24" fill="#9B7924" />
          {Array.from({ length: 7 }).map((_, j) => (
            <rect key={j} x={444 + j * 8} y={35 + i * 28} width="6" height="20"
              fill={['#aa8833', '#3388aa', '#aa3388', '#88aa33', '#8833aa', '#33aa88', '#aa3333'][j]} rx="1" />
          ))}
        </g>
      ))}

      {/* Floor */}
      <rect x="0" y="220" width="500" height="60" fill="#d5ccb8" />
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={i} x={i * 30} y="220" width="1" height="60" fill="#c8c0ac" />
      ))}

      {/* You - standing small, holding groceries, looking down */}
      <g className="victim-you">
        <circle cx="280" cy="172" r="6" fill="#d4a574" />
        {/* Downcast eyes */}
        <rect x="277" y="173" width="2" height="1" fill="#333" />
        <rect x="282" y="173" width="2" height="1" fill="#333" />
        <rect x="275" y="178" width="10" height="14" fill="#4a7a5a" rx="1" />
        {/* Grocery bag held */}
        <rect x="268" y="182" width="8" height="10" fill="#8B6914" />
        <rect x="269" y="180" width="6" height="3" fill="#8B6914" />
        <rect x="273" y="192" width="5" height="7" fill="#2a2a3a" />
        <rect x="282" y="192" width="5" height="7" fill="#2a2a3a" />
      </g>

      {/* Angry person - red faced, leaning forward, mouth open */}
      <g className="angry-person">
        {/* Body - large, imposing */}
        <circle cx="180" cy="158" r="9" fill="#f0c8a8" />
        {/* Angry eyebrows */}
        <line x1="174" y1="155" x2="178" y2="157" stroke="#333" strokeWidth="1.5" />
        <line x1="186" y1="155" x2="182" y2="157" stroke="#333" strokeWidth="1.5" />
        {/* Angry eyes */}
        <rect x="176" y="158" width="3" height="2" fill="#333" />
        <rect x="182" y="158" width="3" height="2" fill="#333" />
        {/* Open yelling mouth */}
        <ellipse cx="180" cy="164" rx="4" ry="3" fill="#8B0000" />
        <rect x="177" y="162" width="6" height="2" fill="#fff" />
        {/* Red angry face tint */}
        <circle cx="173" cy="161" r="3" fill="#ff4444" opacity="0.3" />
        <circle cx="187" cy="161" r="3" fill="#ff4444" opacity="0.3" />

        {/* Body */}
        <rect x="170" y="167" width="20" height="22" fill="#cc4444" rx="1" />
        {/* Pointing arm */}
        <rect x="188" y="170" width="20" height="4" fill="#f0c8a8" />
        <rect x="206" y="169" width="4" height="5" fill="#f0c8a8" />
        {/* Other arm */}
        <rect x="162" y="172" width="10" height="4" fill="#f0c8a8" />
        {/* Legs */}
        <rect x="173" y="189" width="7" height="10" fill="#3366aa" />
        <rect x="183" y="189" width="7" height="10" fill="#3366aa" />
        {/* Hair */}
        <rect x="172" y="148" width="16" height="5" fill="#886633" />
      </g>

      {/* Yelling lines / anger marks */}
      <g className="anger-marks">
        {/* Speech burst lines */}
        {[0, 1, 2, 3, 4].map((_, i) => {
          const angle = -0.4 + i * 0.2;
          const x1 = 195 + Math.cos(angle) * 15;
          const y1 = 160 + Math.sin(angle) * 15;
          const x2 = 195 + Math.cos(angle) * 25;
          const y2 = 160 + Math.sin(angle) * 25;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cc3333" strokeWidth="2" strokeLinecap="round" />;
        })}
      </g>

      {/* Anger symbol above head */}
      <g className="anger-symbol">
        <path d="M170,142 L175,147 L170,147 L175,142" fill="none" stroke="#cc0000" strokeWidth="2" />
      </g>

      {/* Bystanders watching uncomfortably */}
      <g opacity="0.5">
        {/* Person 1 looking away */}
        <circle cx="380" cy="170" r="5" fill="#c49a6c" />
        <rect x="376" y="175" width="8" height="12" fill="#6666aa" rx="1" />
        {/* Person 2 */}
        <circle cx="110" cy="175" r="5" fill="#e8c8a8" />
        <rect x="106" y="180" width="8" height="12" fill="#aa6644" rx="1" />
        {/* Person 3 with child */}
        <circle cx="400" cy="180" r="4" fill="#b88a5a" />
        <rect x="397" y="184" width="6" height="10" fill="#5a8855" rx="1" />
      </g>

      {/* Dropped items on floor for tension */}
      <rect x="260" y="210" width="8" height="5" fill="#cc3333" rx="1" style={{ transform: 'rotate(15deg)' }} />
      <circle cx="275" cy="213" r="4" fill="#ff9933" opacity="0.7" />
    </svg>

    <style>{`
      .angry-person {
        animation: angry-shake 0.3s ease-in-out infinite alternate;
      }
      @keyframes angry-shake {
        0% { transform: translateX(-1px); }
        100% { transform: translateX(1px); }
      }
      .victim-you {
        animation: victim-cower 2s ease-in-out infinite;
      }
      @keyframes victim-cower {
        0%, 100% { transform: translateX(0) translateY(0); }
        50% { transform: translateX(2px) translateY(1px); }
      }
      .anger-marks {
        animation: marks-flash 0.6s ease-in-out infinite;
      }
      @keyframes marks-flash {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.1); }
      }
      .anger-symbol {
        animation: symbol-pulse 0.8s ease-in-out infinite;
      }
      @keyframes symbol-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `}</style>
  </div>
);
