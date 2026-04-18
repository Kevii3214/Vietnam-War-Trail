// Reusable pixel art people (more detailed figures)
interface PixelPersonProps {
  color?: string;
  x?: number;
  y?: number;
  scale?: number;
  mirror?: boolean;
  variant?: 'civilian' | 'soldier' | 'running';
}

// 7x10 detailed civilian
const CIVILIAN = [
  [0,0,0,1,0,0,0],
  [0,0,1,1,1,0,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
  [0,2,2,2,2,2,0],
  [0,0,2,2,2,0,0],
  [0,0,2,2,2,0,0],
  [0,0,0,2,0,0,0],
  [0,0,1,0,1,0,0],
  [0,1,0,0,0,1,0],
];

// 7x10 detailed soldier (helmet, rifle)
const SOLDIER = [
  [0,0,3,3,3,0,0],
  [0,3,3,3,3,3,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
  [4,2,2,2,2,2,0],
  [0,0,2,2,2,0,0],
  [0,0,2,2,2,0,0],
  [0,0,0,2,0,0,0],
  [0,0,1,0,1,0,0],
  [0,1,0,0,0,1,0],
];

// 7x10 running person with arm extended
const RUNNING = [
  [0,0,0,1,0,0,0],
  [0,0,1,1,1,0,0],
  [0,0,1,1,1,0,0],
  [0,0,0,1,0,0,0],
  [0,1,2,2,2,1,0],
  [0,0,2,2,2,0,0],
  [0,0,2,2,2,0,0],
  [0,0,0,2,0,0,0],
  [0,0,1,0,0,1,0],
  [0,1,0,0,0,0,1],
];

const VARIANTS = {
  civilian: CIVILIAN,
  soldier: SOLDIER,
  running: RUNNING,
};

// Color indices: 1=skin, 2=clothing, 3=helmet/hat, 4=weapon
function getCellColor(cell: number, baseColor: string, variant: string): string {
  if (cell === 1) return baseColor; // skin
  if (cell === 2) {
    if (variant === 'soldier') return '#3a5a2a';
    return '#555588'; // civilian clothing
  }
  if (cell === 3) return '#2a4a1a'; // helmet
  if (cell === 4) return '#444'; // weapon
  return 'transparent';
}

export function PixelPerson({ color = '#d4a574', x = 0, y = 0, scale = 1, mirror = false, variant = 'civilian' }: PixelPersonProps) {
  const pixels = VARIANTS[variant];
  const s = 3 * scale;
  const w = 7;

  return (
    <g transform={`translate(${x}, ${y})${mirror ? ` scale(-1,1) translate(-${w * s}, 0)` : ''}`}>
      {pixels.map((row, ry) =>
        row.map((cell, rx) => {
          if (cell === 0) return null;
          return (
            <rect
              key={`${rx}-${ry}`}
              x={rx * s}
              y={ry * s}
              width={s}
              height={s}
              fill={getCellColor(cell, color, variant)}
            />
          );
        })
      )}
    </g>
  );
}

interface PixelCrowdProps {
  count: number;
  x: number;
  y: number;
  spread: number;
  variant?: 'civilian' | 'soldier' | 'running';
  colors?: string[];
  scale?: number;
}

export function PixelCrowd({ count, x, y, spread, variant = 'civilian', colors = ['#d4a574', '#c49464', '#a47844', '#8b6914'], scale = 1 }: PixelCrowdProps) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <PixelPerson
          key={i}
          x={x + (i * spread)}
          y={y + (Math.sin(i * 1.5) * 4)}
          color={colors[i % colors.length]}
          variant={variant}
          scale={scale}
          mirror={i % 3 === 0}
        />
      ))}
    </g>
  );
}
