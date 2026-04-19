interface PixelBoatProps {
  /** Top-left x offset of the boat's bounding box (in SVG units). */
  x?: number;
  /** Top-left y offset of the boat's bounding box (in SVG units). */
  y?: number;
  /** Uniform scale factor; 1 = the canonical ~80-wide fishing boat used in the cinematic. */
  scale?: number;
  /** If true, mirrors the boat horizontally (bow faces left). */
  mirror?: boolean;
  /** Lantern on the mast; defaults to true (matches the night-cinematic look). */
  lantern?: boolean;
  /** Show an engine housing + exhaust stack at the stern. */
  engine?: boolean;
  /** Optional: small red flag on the mast (matches Scene 3 "THE BOAT"). */
  flag?: boolean;
}

/**
 * PixelBoat — a small Vietnamese fishing boat.
 *
 * This is the canonical pixel-art sprite used whenever a small fishing
 * boat is shown in the game: the cinematics, the traveling animation,
 * the ocean-phase scenes. It matches the look of the boats drawn inline
 * in EscapingVietnamCinematic Scene 6 "THE VANISHING SHORE",
 * AcquiringBoatScene, and the ocean event scenes — the same silhouette
 * everywhere.
 *
 * The sprite is an SVG group designed to be embedded inside a parent
 * <svg viewBox="0 0 500 280"> (or similar). Its natural width is ~92px
 * at scale=1, drawn around an internal origin at the center-bottom of
 * the hull so that rotating for wave-rock looks correct.
 */
export function PixelBoat({
  x = 0,
  y = 0,
  scale = 1,
  mirror = false,
  lantern = true,
  engine = true,
  flag = false,
}: PixelBoatProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * (mirror ? -1 : 1)}, ${scale})`}>
      {/* Water-line shadow */}
      <ellipse cx="0" cy="30" rx="52" ry="3.5" fill="#02040a" opacity="0.55" />

      {/* Hull — trapezoidal, wooden */}
      <polygon points="-42,12 -32,28 42,28 50,12" fill="#3a2214" />
      <polygon points="-42,12 -32,28 42,28 50,12" fill="none" stroke="#1a0a04" strokeWidth="1" />
      {/* Mid-hull plank line */}
      <line x1="-36" y1="20" x2="44" y2="20" stroke="#1a0a04" strokeWidth="0.8" />
      {/* Waterline highlight */}
      <rect x="-38" y="26" width="78" height="1" fill="#5a3820" opacity="0.8" />
      {/* Plank grain on hull */}
      <line x1="-34" y1="14" x2="-28" y2="26" stroke="#2a1810" strokeWidth="0.4" opacity="0.7" />
      <line x1="-18" y1="13" x2="-14" y2="27" stroke="#2a1810" strokeWidth="0.4" opacity="0.7" />
      <line x1="0"   y1="13" x2="2"   y2="27" stroke="#2a1810" strokeWidth="0.4" opacity="0.7" />
      <line x1="18"  y1="13" x2="22"  y2="27" stroke="#2a1810" strokeWidth="0.4" opacity="0.7" />
      <line x1="34"  y1="13" x2="40"  y2="27" stroke="#2a1810" strokeWidth="0.4" opacity="0.7" />

      {/* Deck */}
      <rect x="-34" y="8" width="78" height="5" fill="#5a3a1e" />
      <rect x="-34" y="8" width="78" height="1" fill="#7a5230" />

      {/* Cabin / pilothouse */}
      <rect x="-28" y="-4" width="24" height="14" fill="#3a2214" />
      <rect x="-28" y="-4" width="24" height="1" fill="#5a3820" opacity="0.7" />
      {/* Cabin windows */}
      <rect x="-24" y="-2" width="6" height="6" fill="#0a0a18" />
      <rect x="-14" y="-2" width="6" height="6" fill="#0a0a18" />
      {/* Subtle window-frame highlight */}
      <rect x="-24" y="-2" width="6" height="1" fill="#1a2a3a" opacity="0.4" />
      <rect x="-14" y="-2" width="6" height="1" fill="#1a2a3a" opacity="0.4" />
      {/* Door on cabin front */}
      <rect x="-6" y="0" width="2" height="10" fill="#1a0a04" opacity="0.85" />

      {/* Mast */}
      <rect x="14" y="-26" width="2.5" height="36" fill="#3a2a18" />
      {/* Crossbar / boom */}
      <rect x="8" y="-22" width="14" height="1.5" fill="#3a2a18" />
      {/* Furled sail */}
      <rect x="10" y="-20" width="10" height="4" fill="#a09878" />
      <rect x="11" y="-16" width="8" height="2" fill="#80785a" />
      {/* Rigging lines */}
      <line x1="15" y1="-26" x2="8" y2="-20" stroke="#2a1a10" strokeWidth="0.5" />
      <line x1="15" y1="-26" x2="22" y2="-20" stroke="#2a1a10" strokeWidth="0.5" />

      {/* Optional red flag (for the "departing" look) */}
      {flag && (
        <>
          <rect x="16" y="-28" width="1.2" height="4" fill="#3a2a18" />
          <polygon points="17.2,-28 24,-26 20,-23 17.2,-25" fill="#c02020" />
        </>
      )}

      {/* Optional lantern on the mast */}
      {lantern && (
        <g>
          <rect x="11.5" y="-32" width="7" height="5" fill="#4a3618" />
          <rect x="11.5" y="-32" width="7" height="1" fill="#6a4e28" />
          <rect x="13" y="-30.5" width="4" height="3" fill="#ffcc44" opacity="0.9" />
          {/* Glow halo */}
          <circle cx="15" cy="-29" r="10" fill="#ffaa44" opacity="0.12" />
          <circle cx="15" cy="-29" r="18" fill="#ffaa44" opacity="0.05" />
        </g>
      )}

      {/* Optional engine housing at the stern with a small smokestack */}
      {engine && (
        <>
          <rect x="34" y="2" width="14" height="10" fill="#2a2a2a" />
          <rect x="34" y="2" width="14" height="1" fill="#3a3a3a" />
          <rect x="37" y="-2" width="4" height="5" fill="#1a1a1a" />
          {/* Static wisp — animation is expected to come from the parent scene */}
          <rect x="38" y="-6" width="2" height="4" fill="#3a3a4a" opacity="0.5" />
        </>
      )}

      {/* Rudder peeking out aft */}
      <rect x="48" y="18" width="4" height="8" fill="#2a1a0a" />

      {/* Small bow anchor */}
      <rect x="-40" y="14" width="3" height="2" fill="#2a1a0a" />
    </g>
  );
}
