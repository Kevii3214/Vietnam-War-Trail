import { useEffect, useState } from 'react';

// Pixel art helicopter using CSS grid of colored cells
const HELICOPTER_PIXELS = [
  // Row 0 - rotor
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  // Row 1 - rotor shaft
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  // Row 2 - body top
  [0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],
  // Row 3 - body + windshield
  [0,0,0,0,0,0,2,3,3,2,2,2,2,0,0,0,0,0,0,0,0,0],
  // Row 4 - body main
  [0,0,0,0,0,2,3,3,2,2,2,2,2,2,2,2,2,0,0,0,0,0],
  // Row 5 - body + tail
  [0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
  // Row 6 - undercarriage + tail
  [0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,0],
  // Row 7 - skids
  [0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,2,0,0],
  // Row 8 - skids bar
  [0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0],
];

const COLORS: Record<number, string> = {
  0: 'transparent',
  1: '#555555', // rotor
  2: '#2d5016', // olive green body
  3: '#87CEEB', // windshield
  4: '#333333', // skids
};

interface PixelHelicopterProps {
  className?: string;
}

export function PixelHelicopter({ className = '' }: PixelHelicopterProps) {
  const [rotorFrame, setRotorFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotorFrame(f => (f + 1) % 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-block ${className}`} style={{ imageRendering: 'pixelated' }}>
      <svg viewBox="0 0 88 36" width="176" height="72">
        {HELICOPTER_PIXELS.map((row, y) =>
          row.map((cell, x) => {
            if (cell === 0) return null;
            // Animate rotor
            if (cell === 1 && y === 0) {
              const show = rotorFrame === 0 ? x % 2 === 0 : x % 2 === 1;
              if (!show) return null;
            }
            return (
              <rect
                key={`${x}-${y}`}
                x={x * 4}
                y={y * 4}
                width={4}
                height={4}
                fill={COLORS[cell]}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
