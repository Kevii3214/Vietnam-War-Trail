import React from 'react';

export const FamiliarFaceScene: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ imageRendering: 'pixelated' }}>
      {/* Supermarket interior */}
      <rect width="500" height="280" fill="#f5f0e0" />
      {/* Ceiling */}
      <rect x="0" y="0" width="500" height="25" fill="#e8e0d0" />
      {/* Fluorescent lights */}
      {[80, 200, 320, 440].map((x, i) => (
        <g key={i}>
          <rect x={x - 30} y="22" width="60" height="4" fill="#fff" opacity="0.9" />
          <rect x={x - 28} y="26" width="56" height="1" fill="#ffee88" opacity="0.5" />
        </g>
      ))}

      {/* Back wall with sign */}
      <rect x="0" y="25" width="500" height="50" fill="#ddd8c8" />
      <rect x="150" y="30" width="200" height="20" fill="#cc3333" rx="2" />
      <text x="250" y="45" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="#fff">SUPERMARKET</text>

      {/* Shelving aisles in perspective */}
      {/* Left shelf */}
      <rect x="40" y="75" width="30" height="130" fill="#8B6914" />
      {[0, 1, 2, 3, 4].map((_, i) => (
        <g key={i}>
          <rect x="42" y={78 + i * 26} width="26" height="22" fill="#9B7924" />
          {/* Products on shelf */}
          {[0, 1, 2, 3].map((_, j) => (
            <rect key={j} x={43 + j * 6} y={80 + i * 26} width="5" height="18"
              fill={['#cc3333', '#3366cc', '#33aa33', '#ffaa00'][j]} rx="1" />
          ))}
        </g>
      ))}

      {/* Middle shelf */}
      <rect x="140" y="75" width="30" height="130" fill="#8B6914" />
      {[0, 1, 2, 3, 4].map((_, i) => (
        <g key={i}>
          <rect x="142" y={78 + i * 26} width="26" height="22" fill="#9B7924" />
          {[0, 1, 2, 3].map((_, j) => (
            <rect key={j} x={143 + j * 6} y={80 + i * 26} width="5" height="18"
              fill={['#ff6633', '#6633cc', '#cc33aa', '#33cccc'][j]} rx="1" />
          ))}
        </g>
      ))}

      {/* Right shelf */}
      <rect x="340" y="75" width="30" height="130" fill="#8B6914" />
      {[0, 1, 2, 3, 4].map((_, i) => (
        <g key={i}>
          <rect x="342" y={78 + i * 26} width="26" height="22" fill="#9B7924" />
          {[0, 1, 2, 3].map((_, j) => (
            <rect key={j} x={343 + j * 6} y={80 + i * 26} width="5" height="18"
              fill={['#aa8833', '#3388aa', '#aa3388', '#88aa33'][j]} rx="1" />
          ))}
        </g>
      ))}

      {/* Floor - tiled */}
      <rect x="0" y="220" width="500" height="60" fill="#ddd5c0" />
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={i} x={i * 30} y="220" width="1" height="60" fill="#ccc5b0" />
      ))}
      {[220, 240, 260].map((y, i) => (
        <rect key={i} x="0" y={y} width="500" height="1" fill="#ccc5b0" />
      ))}

      {/* You - with shopping cart in main aisle */}
      <g className="shopper-you">
        {/* Cart */}
        <rect x="215" y="185" width="25" height="16" fill="#aaa" stroke="#888" strokeWidth="1" rx="1" />
        <circle cx="218" cy="204" r="3" fill="#666" />
        <circle cx="237" cy="204" r="3" fill="#666" />
        <rect x="212" y="180" width="2" height="20" fill="#888" />
        {/* Items in cart */}
        <rect x="218" y="182" width="6" height="5" fill="#cc3333" rx="1" />
        <rect x="226" y="183" width="5" height="4" fill="#33aa33" rx="1" />

        {/* You */}
        <circle cx="205" cy="170" r="6" fill="#d4a574" />
        <rect x="200" y="176" width="10" height="14" fill="#4a7a5a" rx="1" />
        {/* Arms holding cart */}
        <rect x="208" y="180" width="6" height="3" fill="#d4a574" />
        <rect x="198" y="190" width="5" height="7" fill="#2a2a3a" />
        <rect x="207" y="190" width="5" height="7" fill="#2a2a3a" />
      </g>

      {/* Familiar person - facing you, with recognition pose */}
      <g className="familiar-person">
        <circle cx="310" cy="168" r="6" fill="#d4a574" />
        <rect x="305" y="174" width="10" height="14" fill="#cc5588" rx="1" />
        {/* Raised arm in recognition */}
        <rect x="313" y="170" width="4" height="3" fill="#d4a574" className="wave-arm" />
        <rect x="303" y="188" width="5" height="7" fill="#2a2a3a" />
        <rect x="312" y="188" width="5" height="7" fill="#2a2a3a" />
        {/* Hair */}
        <rect x="305" y="162" width="10" height="4" fill="#1a1a1a" />
      </g>

      {/* Recognition sparkle between them */}
      <g className="recognition-sparkle">
        <polygon points="260,170 262,175 267,175 263,178 265,183 260,180 255,183 257,178 253,175 258,175" fill="#ffcc00" />
      </g>

      {/* Exclamation marks */}
      <g className="exclaim-you">
        <rect x="202" y="155" width="3" height="8" fill="#ffcc00" rx="1" />
        <rect x="202" y="165" width="3" height="3" fill="#ffcc00" rx="1" />
      </g>
      <g className="exclaim-them">
        <rect x="308" y="153" width="3" height="8" fill="#ffcc00" rx="1" />
        <rect x="308" y="163" width="3" height="3" fill="#ffcc00" rx="1" />
      </g>

      {/* Other shoppers in background */}
      <g opacity="0.5">
        <circle cx="420" cy="160" r="5" fill="#c49a6c" />
        <rect x="416" y="165" width="8" height="12" fill="#6666aa" rx="1" />
        <circle cx="450" cy="170" r="4" fill="#b88a5a" />
        <rect x="447" y="174" width="6" height="10" fill="#aa6644" rx="1" />
      </g>
    </svg>

    <style>{`
      .shopper-you {
        animation: shopper-idle 2s ease-in-out infinite;
      }
      @keyframes shopper-idle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1px); }
      }
      .familiar-person {
        animation: familiar-appear 3s ease-out forwards;
      }
      @keyframes familiar-appear {
        0% { opacity: 0; transform: translateX(40px); }
        40% { opacity: 0.3; }
        100% { opacity: 1; transform: translateX(0); }
      }
      .wave-arm {
        animation: arm-wave 1s ease-in-out infinite alternate;
        transform-origin: 313px 173px;
      }
      @keyframes arm-wave {
        0% { transform: rotate(-15deg) translateY(-2px); }
        100% { transform: rotate(15deg) translateY(-5px); }
      }
      .recognition-sparkle {
        animation: sparkle-pulse 1.5s ease-in-out infinite;
      }
      @keyframes sparkle-pulse {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      .exclaim-you, .exclaim-them {
        animation: exclaim-bounce 0.8s ease-out infinite;
      }
      .exclaim-them { animation-delay: 0.2s; }
      @keyframes exclaim-bounce {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-4px); opacity: 0.7; }
      }
    `}</style>
  </div>
);
