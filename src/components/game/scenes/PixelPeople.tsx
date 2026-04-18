// Reusable pixel art people (small figures)
interface PixelPersonProps {
  color?: string;
  x?: number;
  y?: number;
  scale?: number;
  mirror?: boolean;
  variant?: 'civilian' | 'soldier' | 'running';
}

const CIVILIAN = [
  [0,0,1,0,0],
  [0,1,1,1,0],
  [0,0,1,0,0],
  [0,1,1,1,0],
  [0,0,1,0,0],
  [0,1,0,1,0],
];

const SOLDIER = [
  [0,1,1,1,0],
  [0,1,1,1,0],
  [1,0,1,0,0],
  [0,1,1,1,0],
  [0,0,1,0,0],
  [0,1,0,1,0],
];

const RUNNING = [
  [0,0,1,0,0],
  [0,1,1,1,0],
  [0,0,1,0,0],
  [0,1,1,1,0],
  [0,1,0,0,0],
  [1,0,0,1,0],
];

const VARIANTS = {
  civilian: CIVILIAN,
  soldier: SOLDIER,
  running: RUNNING,
};

export function PixelPerson({ color = '#d4a574', x = 0, y = 0, scale = 1, mirror = false, variant = 'civilian' }: PixelPersonProps) {
  const pixels = VARIANTS[variant];
  const s = 3 * scale;

  return (
    <g transform={`translate(${x}, ${y})${mirror ? ` scale(-1,1) translate(-${5 * s}, 0)` : ''}`}>
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
              fill={color}
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
