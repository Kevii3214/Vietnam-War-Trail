import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import {
  MUSIC_VOLUME_KEY,
  MUSIC_MUTED_KEY,
  NARRATION_ENABLED_KEY,
  NARRATION_VOLUME_KEY,
  readOptions,
  type OptionValues,
} from './optionsKeys';

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}

/**
 * Shared options panel used by both TitleScreen and in-game OPTS modal.
 * Reads/writes all settings to localStorage and calls onChange
 * so the caller can apply changes in real-time.
 */
export function OptionsPanel({ onChange }: { onChange?: (vals: OptionValues) => void }) {
  const [musicVolume, setMusicVolumeRaw] = useState(() => readOptions().musicVolume);
  const [musicMuted, setMusicMutedRaw] = useState(() => readOptions().musicMuted);
  const [narrationEnabled, setNarrationEnabledRaw] = useState(() => readOptions().narrationEnabled);
  const [narrationVolume, setNarrationVolumeRaw] = useState(() => readOptions().narrationVolume);

  // Use a ref for the callback so we always call the latest version
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Whenever ANY state changes, persist to localStorage and notify parent
  useEffect(() => {
    localStorage.setItem(MUSIC_VOLUME_KEY, String(musicVolume));
    localStorage.setItem(MUSIC_MUTED_KEY, String(musicMuted));
    localStorage.setItem(NARRATION_ENABLED_KEY, String(narrationEnabled));
    localStorage.setItem(NARRATION_VOLUME_KEY, String(narrationVolume));

    onChangeRef.current?.({ musicVolume, musicMuted, narrationEnabled, narrationVolume });
  }, [musicVolume, musicMuted, narrationEnabled, narrationVolume]);

  /* ---------- Music ---------- */
  const handleMusicVolume = useCallback((v: number) => {
    setMusicVolumeRaw(clamp(v));
  }, []);

  const handleMusicMute = useCallback(() => {
    setMusicMutedRaw(prev => !prev);
  }, []);

  /* ---------- Narration ---------- */
  const handleNarrationToggle = useCallback(() => {
    setNarrationEnabledRaw(prev => !prev);
  }, []);

  const handleNarrationVolume = useCallback((v: number) => {
    setNarrationVolumeRaw(clamp(v));
  }, []);

  // Sync if localStorage changes from another tab
  useEffect(() => {
    const onStorage = () => {
      const vals = readOptions();
      setMusicVolumeRaw(vals.musicVolume);
      setMusicMutedRaw(vals.musicMuted);
      setNarrationEnabledRaw(vals.narrationEnabled);
      setNarrationVolumeRaw(vals.narrationVolume);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="px-4 py-4 space-y-5">
      {/* ---- MUSIC ---- */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[9px] text-foreground/60 tracking-wide">MUSIC</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMusicMute();
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded font-pixel text-[8px] text-primary/60 hover:text-primary hover:bg-primary/8 active:bg-primary/15 transition-all cursor-pointer select-none"
          >
            {musicMuted
              ? <VolumeX className="w-3 h-3" />
              : <Volume2 className="w-3 h-3" />}
            {musicMuted ? 'OFF' : 'ON'}
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={musicMuted ? 0 : Math.round(musicVolume * 100)}
          onInput={e => handleMusicVolume(Number((e.target as HTMLInputElement).value) / 100)}
          onChange={e => handleMusicVolume(Number(e.target.value) / 100)}
          className="volume-slider w-full cursor-pointer"
          style={{ accentColor: 'hsl(var(--primary))' }}
        />
        <div className="text-right font-pixel text-[7px] text-muted-foreground/30">
          {musicMuted ? 0 : Math.round(musicVolume * 100)}%
        </div>
      </div>

      {/* ---- NARRATION ---- */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[9px] text-foreground/60 tracking-wide">NARRATION</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNarrationToggle();
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded font-pixel text-[8px] text-primary/60 hover:text-primary hover:bg-primary/8 active:bg-primary/15 transition-all cursor-pointer select-none"
          >
            {narrationEnabled
              ? <Mic className="w-3 h-3" />
              : <MicOff className="w-3 h-3" />}
            {narrationEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={narrationEnabled ? Math.round(narrationVolume * 100) : 0}
          onInput={e => handleNarrationVolume(Number((e.target as HTMLInputElement).value) / 100)}
          onChange={e => handleNarrationVolume(Number(e.target.value) / 100)}
          className="volume-slider w-full cursor-pointer"
          style={{ accentColor: 'hsl(var(--primary))' }}
        />
        <div className="text-right font-pixel text-[7px] text-muted-foreground/30">
          {narrationEnabled ? Math.round(narrationVolume * 100) : 0}%
        </div>
      </div>
    </div>
  );
}
