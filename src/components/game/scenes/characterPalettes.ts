/**
 * Canonical character palettes for the game's narrative cast.
 *
 * These are the EXACT colors used in EscapingVietnamCinematic.tsx's
 * named scenes (Scene 1–6) so that every time the player sees "the
 * protagonist" / "the mother" / "the child" / "the grandfather", they
 * recognize the same character. Every scene component should import
 * from here instead of inlining its own colors.
 *
 * Passing a palette:
 *
 *   <PixelPerson {...PROTAGONIST} mood="determined" sway="idle" />
 *
 * Only spread color-ish props — don't spread scale/x/y/variant here,
 * those vary per scene.
 */

export interface CharacterPalette {
  color: string;
  shirtColor: string;
  pantsColor: string;
  hairColor: string;
  accentColor: string;
}

/** "You" — the protagonist. Matches Scene 4 "THE BREAKING POINT". */
export const PROTAGONIST: CharacterPalette = {
  color: '#e8b896',
  shirtColor: '#6a4a38',
  pantsColor: '#2a2018',
  hairColor: '#0f0804',
  accentColor: '#8a6848',
};

/** The mother. Matches Scene 5 "THE GOLD LEAF" (áo bà ba top). */
export const MOTHER: CharacterPalette = {
  color: '#f0c8a0',
  shirtColor: '#b8604a',
  pantsColor: '#3a2010',
  hairColor: '#1a0f06',
  accentColor: '#ffcf5c',
};

/** The child. Matches Scene 5's child watching in shadow. */
export const CHILD: CharacterPalette = {
  color: '#d8a880',
  shirtColor: '#4a6a8a',
  pantsColor: '#2a2a3a',
  hairColor: '#1a0f08',
  accentColor: '#ffffff',
};

/** The grandfather / elder — the sick passenger. Gray hair, muted clothes. */
export const GRANDFATHER: CharacterPalette = {
  color: '#d8ac84',
  shirtColor: '#5a4a3a',
  pantsColor: '#2a2018',
  hairColor: '#c0b8a8',
  accentColor: '#8a7a60',
};

/** The father — "Your father goes first." Weathered working man. */
export const FATHER: CharacterPalette = {
  color: '#c89870',
  shirtColor: '#4a3a2a',
  pantsColor: '#2a2018',
  hairColor: '#1a0f08',
  accentColor: '#8a7050',
};

/** The boat captain (owner / pilot). Dark blue work shirt. */
export const CAPTAIN: CharacterPalette = {
  color: '#c4956a',
  shirtColor: '#2a4a6a',
  pantsColor: '#1a1a28',
  hairColor: '#1a0a04',
  accentColor: '#8a8a8a',
};

/** The NLF / communist soldier. Matches Scene 1 "THE FALL" tank crew. */
export const SOLDIER: CharacterPalette = {
  color: '#e8b896',
  shirtColor: '#3a5a2a',
  pantsColor: '#2a3a18',
  hairColor: '#1a1008',
  accentColor: '#ffcf5c',
};

/** The pirate. Dark, weathered — meant to read as menacing at small scale. */
export const PIRATE: CharacterPalette = {
  color: '#b08060',
  shirtColor: '#1a1a1a',
  pantsColor: '#0a0a0a',
  hairColor: '#0a0804',
  accentColor: '#4a3a2a',
};

/** The coast-guard officer. Military gray. */
export const COAST_GUARD: CharacterPalette = {
  color: '#e8b896',
  shirtColor: '#3a4a5a',
  pantsColor: '#2a2a3a',
  hairColor: '#1a1008',
  accentColor: '#8a8a9a',
};

/**
 * Anonymous fellow passengers / refugees for crowd-filling on the raft.
 * Cycle through these to avoid everyone looking identical while staying
 * on-palette. Index into this array with `i % FELLOW_PASSENGERS.length`.
 */
export const FELLOW_PASSENGERS: CharacterPalette[] = [
  // Warm-skinned, dark-blue shirt
  { color: '#f4d0a4', shirtColor: '#3a5a8a', pantsColor: '#2a1a10', hairColor: '#1a0f08', accentColor: '#f8e5a8' },
  // Tan-skinned, rust shirt
  { color: '#e8b896', shirtColor: '#b86048', pantsColor: '#3a2818', hairColor: '#2a1810', accentColor: '#ffffff' },
  // Fair-skinned, mustard shirt
  { color: '#f0c8a4', shirtColor: '#d8a848', pantsColor: '#333348', hairColor: '#3a2210', accentColor: '#b84a4a' },
  // Darker skin, olive-green shirt
  { color: '#d8a880', shirtColor: '#6aa85a', pantsColor: '#2a2a3a', hairColor: '#1a0f08', accentColor: '#ffcf5c' },
  // Mid skin, brown/leather shirt
  { color: '#e8b896', shirtColor: '#8a6048', pantsColor: '#2a2018', hairColor: '#1a0f08', accentColor: '#d8a848' },
  // Warm, teal shirt
  { color: '#f0c8a0', shirtColor: '#3a7aaa', pantsColor: '#3a2818', hairColor: '#2a1810', accentColor: '#ffffff' },
];
