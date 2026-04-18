export type Mood =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'shocked'
  | 'angry'
  | 'scared'
  | 'determined'
  | 'weary';

export type SwayStyle = 'none' | 'idle' | 'scared' | 'fast';

interface PixelPersonProps {
  color?: string;
  shirtColor?: string;
  pantsColor?: string;
  hairColor?: string;
  accentColor?: string;
  x?: number;
  y?: number;
  scale?: number;
  mirror?: boolean;
  variant?: 'civilian' | 'soldier' | 'running';
  mood?: Mood;
  /** Optional explicit mouth shape that overrides the mood's default. */
  mouthStyle?: MouthShape;
  sway?: SwayStyle;
  swayDelay?: number;
}

/*
  Kindergarten-style chibi sprite.

  Face strategy: the sprite grid draws only the BODY + HAIR + HEAD shape
  (skin-colored where the face goes). Eyes and mouth are drawn afterward
  as their own rectangles on top. This guarantees each eye is a single
  solid bar (not two stacked cells) so it never looks like two dots.

  Cell codes (grid):
    0  = transparent
    1  = skin
    2  = shirt
    3  = hat / helmet
    4  = weapon
    5  = pants
    6  = hair
    7  = boots
    11 = shirt accent
*/

// 9 wide × 13 tall. Face rows (2–6) are clean skin; overlay draws features.
const CIVILIAN = [
  [0, 0, 6, 6, 6, 6, 6, 0, 0],   // 0  hair top
  [0, 6, 6, 6, 6, 6, 6, 6, 0],   // 1  hair
  [6, 6, 1, 1, 1, 1, 1, 6, 6],   // 2  face (eye row - drawn by overlay)
  [6, 1, 1, 1, 1, 1, 1, 1, 6],   // 3  face (eye row - drawn by overlay)
  [0, 1, 1, 1, 1, 1, 1, 1, 0],   // 4  face (cheek row - tear/sweat overlay)
  [0, 1, 1, 1, 1, 1, 1, 1, 0],   // 5  face (mouth row - drawn by overlay)
  [0, 0, 1, 1, 1, 1, 1, 0, 0],   // 6  chin
  [0, 0, 2, 2, 2, 2, 2, 0, 0],   // 7  neck
  [1, 2, 2, 2,11, 2, 2, 2, 1],   // 8  shoulders with accent
  [0, 2, 2, 2, 2, 2, 2, 2, 0],   // 9  body
  [0, 0, 5, 5, 0, 5, 5, 0, 0],   // 10 pants
  [0, 0, 5, 5, 0, 5, 5, 0, 0],   // 11 pants
  [0, 0, 7, 7, 0, 7, 7, 0, 0],   // 12 boots
];

const SOLDIER = [
  [0, 3, 3, 3, 3, 3, 3, 3, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [0, 3, 3, 3,11, 3, 3, 3, 0],
  [0, 3, 1, 1, 1, 1, 1, 3, 0],   // 3  face (eye row)
  [0, 1, 1, 1, 1, 1, 1, 1, 0],   // 4  face (eye row)
  [0, 1, 1, 1, 1, 1, 1, 1, 0],   // 5  face (mouth row)
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0],
  [4, 2, 2, 2, 2, 2, 2, 2, 1],
  [4, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 5, 5, 0, 5, 5, 0, 0],
  [0, 0, 5, 5, 0, 5, 5, 0, 0],
  [0, 0, 7, 7, 0, 7, 7, 0, 0],
];

const RUNNING = [
  [0, 0, 6, 6, 6, 6, 6, 0, 0],
  [0, 6, 6, 6, 6, 6, 6, 6, 0],
  [6, 6, 1, 1, 1, 1, 1, 6, 6],
  [6, 1, 1, 1, 1, 1, 1, 1, 6],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 2, 2, 2, 0, 0],
  [1, 2, 2, 2,11, 2, 2, 1, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 1],
  [0, 5, 5, 0, 0, 0, 5, 5, 0],
  [5, 5, 0, 0, 0, 0, 0, 5, 5],
  [7, 7, 0, 0, 0, 0, 0, 7, 7],
];

const VARIANTS = {
  civilian: CIVILIAN,
  soldier: SOLDIER,
  running: RUNNING,
};

// ---------- face overlay ----------
// Eyes are drawn as a SINGLE solid rect each — no stacked cells, no seam.

// All faces share the same eye shape (tall vertical bars, like the reference).
// Mouth is almost always a simple dot or short line — only happy curves.
// Mood differences are shown subtly via tear / sweat drops.
export type MouthShape = 'dot' | 'line' | 'smile';
type FaceExtra = 'none' | 'tear' | 'sweat';

interface FaceLook {
  mouth: MouthShape;
  extra: FaceExtra;
}

const MOOD_FACE: Record<Mood, FaceLook> = {
  neutral:    { mouth: 'dot',   extra: 'none'  },
  happy:      { mouth: 'smile', extra: 'none'  },
  sad:        { mouth: 'dot',   extra: 'tear'  },
  shocked:    { mouth: 'dot',   extra: 'none'  },
  angry:      { mouth: 'dot',   extra: 'none'  },
  scared:     { mouth: 'dot',   extra: 'sweat' },
  determined: { mouth: 'dot',   extra: 'none'  },
  weary:      { mouth: 'dot',   extra: 'none'  },
};

const INK = '#2a1810';   // warm dark brown — softer than pure black
const DROP = '#7ac4ff';  // tear / sweat drop

interface FaceOverlayProps {
  look: FaceLook;
  variant: string;
  s: number;
}

function FaceOverlay({ look, variant, s }: FaceOverlayProps) {
  const isSoldier = variant === 'soldier';
  // Eye column positions (same for all variants)
  const leftX = 2 * s;
  const rightX = 6 * s;

  // Row positions depend on variant (soldier's hat shifts face down 1 row)
  const eyeTopY = (isSoldier ? 3 : 2) * s;  // top of the 2-tall eye
  const eyeBotY = (isSoldier ? 4 : 3) * s;  // bottom row of the eye area
  const cheekY  = (isSoldier ? 5 : 4) * s;  // tear / sweat row
  const mouthY  = 5 * s;

  // -------- eyes (always the same tall vertical bars) --------
  const renderEye = (x: number) => (
    <rect
      key={x}
      x={x}
      y={eyeTopY}
      width={s}
      height={s * 2}
      fill={INK}
      shapeRendering="crispEdges"
    />
  );

  // -------- mouth --------
  const renderMouth = () => {
    const cx = 4 * s;  // center column
    switch (look.mouth) {
      case 'dot':
        return (
          <rect x={cx} y={mouthY} width={s} height={s} fill={INK} shapeRendering="crispEdges" />
        );
      case 'line':
        // horizontal 2-pixel line (stoic / resting mouth)
        return (
          <rect
            x={Math.floor(3.5 * s)}
            y={mouthY}
            width={s * 2}
            height={s}
            fill={INK}
            shapeRendering="crispEdges"
          />
        );
      case 'smile':
        // U-shape: single pixel on top, connected 3-pixel bar on the bottom
        //   . X .
        //   X X X
        return (
          <>
            <rect x={cx} y={mouthY} width={s} height={s} fill={INK} shapeRendering="crispEdges" />
            <rect x={3 * s} y={mouthY + s} width={s * 3} height={s} fill={INK} shapeRendering="crispEdges" />
          </>
        );
    }
  };

  // -------- extras (tear / sweat) --------
  const renderExtra = () => {
    if (look.extra === 'tear') {
      return <rect x={2 * s} y={cheekY} width={s} height={s} fill={DROP} shapeRendering="crispEdges" />;
    }
    if (look.extra === 'sweat') {
      return <rect x={7 * s} y={cheekY} width={s} height={s} fill={DROP} shapeRendering="crispEdges" />;
    }
    return null;
  };

  return (
    <>
      {renderEye(leftX)}
      {renderEye(rightX)}
      {renderMouth()}
      {renderExtra()}
    </>
  );
}

// ---------- color mapping for body cells ----------

interface ColorContext {
  skin: string;
  shirt: string;
  pants: string;
  hair: string;
  accent: string;
  variant: string;
}

function getCellColor(cell: number, ctx: ColorContext): string {
  switch (cell) {
    case 1: return ctx.skin;
    case 2: return ctx.shirt;
    case 3: return ctx.variant === 'soldier' ? '#3a5a2a' : '#5a3a1a';
    case 4: return '#2a2018';
    case 5: return ctx.pants;
    case 6: return ctx.hair;
    case 7: return '#1f1812';
    case 11: return ctx.accent;
    default: return 'transparent';
  }
}

function defaultShirtFor(variant: string): string {
  if (variant === 'soldier') return '#4a6a3a';
  if (variant === 'running') return '#c74a3a';
  return '#6a8ac8';
}

function defaultPantsFor(variant: string): string {
  if (variant === 'soldier') return '#3a4a28';
  return '#2a2a44';
}

function swayClass(style: SwayStyle): string {
  switch (style) {
    case 'idle': return 'chibi-sway-idle';
    case 'scared': return 'chibi-sway-scared';
    case 'fast': return 'chibi-sway-fast';
    default: return '';
  }
}

export function PixelPerson({
  color = '#f4d0a4',
  shirtColor,
  pantsColor,
  hairColor = '#2a180c',
  accentColor = '#f8e5a8',
  x = 0,
  y = 0,
  scale = 1,
  mirror = false,
  variant = 'civilian',
  mood = 'neutral',
  mouthStyle,
  sway = 'none',
  swayDelay = 0,
}: PixelPersonProps) {
  const pixels = VARIANTS[variant];
  const s = 2 * scale;
  const w = pixels[0].length;
  const h = pixels.length;

  const ctx: ColorContext = {
    skin: color,
    shirt: shirtColor ?? defaultShirtFor(variant),
    pants: pantsColor ?? defaultPantsFor(variant),
    hair: hairColor,
    accent: accentColor,
    variant,
  };

  const baseLook = MOOD_FACE[mood];
  // Default rule: if no explicit mouthStyle is given and the mood's default
  // is a plain dot, alternate between line and dot deterministically based on
  // position so ~half of all characters in any scene have line mouths.
  let resolvedMouth = baseLook.mouth;
  if (mouthStyle) {
    resolvedMouth = mouthStyle;
  } else if (baseLook.mouth === 'dot') {
    const seed = Math.floor(x * 0.37 + y * 0.13);
    if (seed % 2 === 0) resolvedMouth = 'line';
  }
  const look: FaceLook = { ...baseLook, mouth: resolvedMouth };
  const cls = swayClass(sway);
  const transform = `translate(${x}, ${y})${mirror ? ` scale(-1,1) translate(-${w * s}, 0)` : ''}`;

  return (
    <g transform={transform}>
      <g
        className={cls}
        style={{
          animationDelay: swayDelay ? `${swayDelay}s` : undefined,
          transformOrigin: `${(w * s) / 2}px ${h * s}px`,
          transformBox: 'fill-box',
        }}
      >
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
                fill={getCellColor(cell, ctx)}
                shapeRendering="crispEdges"
              />
            );
          })
        )}
        <FaceOverlay look={look} variant={variant} s={s} />
      </g>
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
  shirtColors?: string[];
  pantsColors?: string[];
  hairColors?: string[];
  accentColors?: string[];
  scale?: number;
  mood?: Mood;
  sway?: SwayStyle;
}

const DEFAULT_SHIRTS = [
  '#6a8ac8', '#c74a3a', '#3a8a4a', '#e0a848',
  '#8a5ab8', '#c87a3a', '#d6a0c8', '#4aaab0',
];
const DEFAULT_PANTS = ['#2a2a44', '#4a3218', '#2f2838', '#5a4a38', '#3a3a3a'];
const DEFAULT_HAIRS = ['#2a180c', '#1a0f08', '#3a2210', '#4a2a18', '#2a1818'];
const DEFAULT_ACCENTS = ['#f8e5a8', '#ffffff', '#ffcf5c', '#ffb0b8', '#a8d4ff'];

export function PixelCrowd({
  count,
  x,
  y,
  spread,
  variant = 'civilian',
  colors = ['#f4d0a4', '#e8c090', '#d4a07a', '#e8b896', '#f0c8a8', '#c89a70'],
  shirtColors,
  pantsColors,
  hairColors,
  accentColors,
  scale = 1,
  mood = 'neutral',
  sway = 'idle',
}: PixelCrowdProps) {
  const shirts = shirtColors ?? DEFAULT_SHIRTS;
  const pants = pantsColors ?? DEFAULT_PANTS;
  const hairs = hairColors ?? DEFAULT_HAIRS;
  const accents = accentColors ?? DEFAULT_ACCENTS;

  // Mix mouth shapes 50/50 so crowds don't all look identical.
  const MOUTH_CYCLE: MouthShape[] = ['line', 'dot'];

  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <PixelPerson
          key={i}
          x={x + i * spread}
          y={y + Math.sin(i * 1.5) * 2}
          color={colors[i % colors.length]}
          shirtColor={shirts[(i * 3 + 1) % shirts.length]}
          pantsColor={pants[(i * 2 + 2) % pants.length]}
          hairColor={hairs[i % hairs.length]}
          accentColor={accents[(i * 5) % accents.length]}
          variant={variant}
          scale={scale}
          mirror={i % 3 === 0}
          mood={mood}
          mouthStyle={mood === 'happy' ? undefined : MOUTH_CYCLE[i % MOUTH_CYCLE.length]}
          sway={sway}
          swayDelay={(i * 0.27) % 2}
        />
      ))}
    </g>
  );
}
