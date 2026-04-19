export const MUSIC_VOLUME_KEY = 'saigone-music-volume';
export const MUSIC_MUTED_KEY = 'saigone-music-muted';
export const NARRATION_ENABLED_KEY = 'saigone-narration-enabled';
export const NARRATION_VOLUME_KEY = 'saigone-narration-volume';

export interface OptionValues {
  musicVolume: number;
  musicMuted: boolean;
  narrationEnabled: boolean;
  narrationVolume: number;
}

/** Read current settings from localStorage */
export function readOptions(): OptionValues {
  return {
    musicVolume: parseFloat(localStorage.getItem(MUSIC_VOLUME_KEY) ?? '0.3'),
    musicMuted: localStorage.getItem(MUSIC_MUTED_KEY) === 'true',
    narrationEnabled: localStorage.getItem(NARRATION_ENABLED_KEY) === 'true',
    narrationVolume: parseFloat(localStorage.getItem(NARRATION_VOLUME_KEY) ?? '0.8'),
  };
}
