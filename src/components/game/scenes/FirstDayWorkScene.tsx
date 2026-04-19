import React from 'react';

export const FirstDayWorkScene: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
      {/* Factory interior - grey walls */}
      <rect width="500" height="280" fill="#3a3a3a" />
      <rect x="0" y="0" width="500" height="30" fill="#2a2a2a" />
      {/* Ceiling lights */}
      {[60, 180, 300, 420].map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y="30" width="4" height="10" fill="#666" />
          <rect x={x - 15} y="38" width="30" height="6" fill="#ddd" />
          <rect x={x - 12} y="44" width="24" height="2" fill="#ffee88" className="factory-light" style={{ animationDelay: `${i * 0.5}s` }} />
          <ellipse cx={x} cy="55" rx="20" ry="8" fill="#ffee88" opacity="0.06" />
        </g>
      ))}

      {/* Back wall with pipes */}
      <rect x="0" y="30" width="500" height="60" fill="#444" />
      {[0, 1, 2].map((_, i) => (
        <rect key={i} x="0" y={35 + i * 18} width="500" height="4" fill="#555" rx="2" />
      ))}

      {/* Conveyor belt structure */}
      <rect x="30" y="150" width="440" height="8" fill="#666" />
      <rect x="30" y="158" width="440" height="20" fill="#888" />
      <rect x="30" y="178" width="440" height="4" fill="#555" />
      {/* Belt segments moving */}
      {Array.from({ length: 22 }).map((_, i) => (
        <rect key={i} x={30 + i * 20} y="159" width="18" height="18" fill={i % 2 === 0 ? '#777' : '#999'} className="belt-segment" />
      ))}
      {/* Conveyor legs */}
      {[60, 160, 260, 360, 440].map((x, i) => (
        <rect key={i} x={x} y="182" width="6" height="40" fill="#555" />
      ))}

      {/* Items on belt */}
      {[80, 160, 240, 340, 420].map((x, i) => (
        <g key={i} className="belt-item" style={{ animationDelay: `${i * 0.8}s` }}>
          <rect x={x} y="138" width="16" height="12" fill="#6a8caf" rx="1" />
          <rect x={x + 2} y="140" width="12" height="4" fill="#88aacc" />
        </g>
      ))}

      {/* Workers along the belt */}
      {/* Worker 1 - left */}
      <g>
        <circle cx="90" cy="120" r="6" fill="#d4a574" />
        <rect x="85" y="126" width="10" height="14" fill="#336699" rx="1" />
        <rect x="83" y="126" width="4" height="10" fill="#336699" />
        <rect x="93" y="126" width="4" height="10" fill="#336699" />
        <rect x="83" y="140" width="5" height="8" fill="#2a2a3a" />
        <rect x="92" y="140" width="5" height="8" fill="#2a2a3a" />
        {/* Hard hat */}
        <rect x="82" y="113" width="16" height="4" fill="#ffcc00" />
        <rect x="84" y="110" width="12" height="5" fill="#ffcc00" rx="2" />
      </g>

      {/* Worker 2 - you (protagonist, slightly different) */}
      <g className="worker-you">
        <circle cx="200" cy="118" r="6" fill="#d4a574" />
        <rect x="195" y="124" width="10" height="14" fill="#336699" rx="1" />
        {/* Arms reaching to belt */}
        <rect x="190" y="128" width="6" height="3" fill="#d4a574" />
        <rect x="204" y="128" width="6" height="3" fill="#d4a574" />
        <rect x="193" y="138" width="5" height="8" fill="#2a2a3a" />
        <rect x="202" y="138" width="5" height="8" fill="#2a2a3a" />
        {/* Hard hat */}
        <rect x="192" y="111" width="16" height="4" fill="#ffcc00" />
        <rect x="194" y="108" width="12" height="5" fill="#ffcc00" rx="2" />
      </g>

      {/* Worker 3 */}
      <g>
        <circle cx="310" cy="120" r="6" fill="#c49a6c" />
        <rect x="305" y="126" width="10" height="14" fill="#336699" rx="1" />
        <rect x="303" y="126" width="4" height="10" fill="#336699" />
        <rect x="313" y="126" width="4" height="10" fill="#336699" />
        <rect x="303" y="140" width="5" height="8" fill="#2a2a3a" />
        <rect x="312" y="140" width="5" height="8" fill="#2a2a3a" />
        <rect x="302" y="113" width="16" height="4" fill="#ffcc00" />
        <rect x="304" y="110" width="12" height="5" fill="#ffcc00" rx="2" />
      </g>

      {/* Worker 4 */}
      <g>
        <circle cx="410" cy="120" r="6" fill="#b8956a" />
        <rect x="405" y="126" width="10" height="14" fill="#336699" rx="1" />
        <rect x="403" y="126" width="4" height="10" fill="#336699" />
        <rect x="413" y="126" width="4" height="10" fill="#336699" />
        <rect x="403" y="140" width="5" height="8" fill="#2a2a3a" />
        <rect x="412" y="140" width="5" height="8" fill="#2a2a3a" />
        <rect x="402" y="113" width="16" height="4" fill="#ffcc00" />
        <rect x="404" y="110" width="12" height="5" fill="#ffcc00" rx="2" />
      </g>

      {/* Floor */}
      <rect x="0" y="222" width="500" height="58" fill="#4a4a4a" />
      {/* Floor markings */}
      <rect x="0" y="248" width="500" height="3" fill="#cccc00" opacity="0.5" />
      <rect x="0" y="222" width="500" height="2" fill="#555" />

      {/* Machinery in background */}
      <rect x="0" y="90" width="30" height="130" fill="#555" />
      <rect x="470" y="90" width="30" height="130" fill="#555" />
      <rect x="5" y="95" width="20" height="20" fill="#444" rx="2" />
      <circle cx="15" cy="105" r="6" fill="#333" />
      <circle cx="15" cy="105" r="2" fill="#cc3333" className="machine-light" />

      {/* Clock on wall */}
      <circle cx="250" cy="55" r="12" fill="#ddd" stroke="#888" strokeWidth="2" />
      <line x1="250" y1="55" x2="250" y2="46" stroke="#333" strokeWidth="2" />
      <line x1="250" y1="55" x2="257" y2="55" stroke="#333" strokeWidth="1.5" className="clock-hand" />
    </svg>

    <style>{`
      .belt-segment {
        animation: belt-move 2s linear infinite;
      }
      @keyframes belt-move {
        0% { transform: translateX(0); }
        100% { transform: translateX(20px); }
      }
      .belt-item {
        animation: item-slide 4s linear infinite;
      }
      @keyframes item-slide {
        0% { transform: translateX(0); opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translateX(40px); opacity: 0.5; }
      }
      .worker-you {
        animation: worker-bob 1.5s ease-in-out infinite;
      }
      @keyframes worker-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      .factory-light {
        animation: light-flicker 4s ease-in-out infinite;
      }
      @keyframes light-flicker {
        0%, 90%, 100% { opacity: 0.9; }
        92% { opacity: 0.3; }
        94% { opacity: 0.8; }
      }
      .machine-light {
        animation: machine-blink 2s ease-in-out infinite;
      }
      @keyframes machine-blink {
        0%, 49% { fill: #cc3333; }
        50%, 100% { fill: #33cc33; }
      }
      .clock-hand {
        transform-origin: 250px 55px;
        animation: clock-tick 10s linear infinite;
      }
      @keyframes clock-tick {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
