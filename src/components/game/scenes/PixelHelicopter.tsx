import { useEffect, useState } from 'react';

// Larger, more detailed Huey helicopter pixel art (28x14)
const HELICOPTER_PIXELS = [
  // Rotor
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // Cockpit top
  [0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,2,3,3,3,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
  // Main body
  [0,0,0,0,0,0,0,2,3,3,3,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,3,3,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  // Body + tail section
  [0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
  [0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,0,0],
  [0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,2,5,0],
  // Skid struts
  [0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0],
  [0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // Skids
  [0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const COLORS: Record<number, string> = {
  0: 'transparent',
  1: '#777', // rotor
  2: '#2d5016', // olive green body
  3: '#6CB4EE', // windshield blue
  4: '#333', // skids
  5: '#1a3a0a', // tail rotor
};

interface PixelHelicopterProps {
  className?: string;
}

export function PixelHelicopter({ className = '' }: PixelHelicopterProps) {
  const [rotorFrame, setRotorFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotorFrame(f => (f + 1) % 2);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-block ${className}`} style={{ imageRendering: 'pixelated' }}>
      <svg viewBox="0 0 168 84" width="336" height="168">
        {HELICOPTER_PIXELS.map((row, y) =>
          row.map((cell, x) => {
            if (cell === 0) return null;
            // Animate rotor blades
            if (cell === 1 && y === 0) {
              const show = rotorFrame === 0 ? x % 2 === 0 : x % 2 === 1;
              if (!show) return null;
            }
            return (
              <rect
                key={`${x}-${y}`}
                x={x * 6}
                y={y * 6}
                width={6}
                height={6}
                fill={COLORS[cell]}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
