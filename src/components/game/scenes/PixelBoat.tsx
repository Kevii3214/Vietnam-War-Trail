interface PixelBoatProps {
  x?: number;
  y?: number;
  scale?: number;
}

const BOAT_PIXELS = [
  [0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,1,2,1,2,1,0,0,0,0],
  [0,0,1,2,2,1,2,2,1,0,0,0],
  [0,3,3,3,3,3,3,3,3,3,0,0],
  [0,0,3,3,3,3,3,3,3,0,0,0],
  [0,0,0,3,3,3,3,3,0,0,0,0],
];

const COLORS: Record<number, string> = {
  0: 'transparent',
  1: '#8B4513', // mast
  2: '#F5DEB3', // sail
  3: '#654321', // hull
};

export function PixelBoat({ x = 0, y = 0, scale = 1 }: PixelBoatProps) {
  const s = 3 * scale;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {BOAT_PIXELS.map((row, ry) =>
        row.map((cell, rx) => {
          if (cell === 0) return null;
          return (
            <rect
              key={`${rx}-${ry}`}
              x={rx * s}
              y={ry * s}
              width={s}
              height={s}
              fill={COLORS[cell]}
            />
          );
        })
      )}
    </g>
  );
}
