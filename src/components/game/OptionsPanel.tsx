import { useState, useEffect, useCallback } from 'react';
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
 * Reads/writes all settings to localStorage and calls an optional onChange
 * so the caller can apply changes in real-time (e.g. adjust an Audio element).
 */
export function OptionsPanel({ onChange }: { onChange?: (vals: OptionValues) => void }) {
  const [musicVolume, setMusicVolumeRaw] = useState(() => readOptions().musicVolume);
  const [musicMuted, setMusicMutedRaw] = useState(() => readOptions().musicMuted);
  const [narrationEnabled, setNarrationEnabledRaw] = useState(() => readOptions().narrationEnabled);
  const [narrationVolume, setNarrationVolumeRaw] = useState(() => readOptions().narrationVolume);

  // Notify parent whenever anything changes
  const notify = useCallback(
    (patch: Partial<OptionValues>) => {
      onChange?.({
        musicVolume,
        musicMuted,
        narrationEnabled,
        narrationVolume,
        ...patch,
      });
    },
    [musicVolume, musicMuted, narrationEnabled, narrationVolume, onChange],
  );

  /* ---------- Music volume ---------- */
  const handleMusicVolume = (v: number) => {
    const clamped = clamp(v);
    setMusicVolumeRaw(clamped);
    localStorage.setItem(MUSIC_VOLUME_KEY, String(clamped));
    notify({ musicVolume: clamped });
  };

  const handleMusicMute = () => {
    setMusicMutedRaw(prev => {
      const next = !prev;
      localStorage.setItem(MUSIC_MUTED_KEY, String(next));
      notify({ musicMuted: next });
      return next;
    });
  };

  /* ---------- Narration ---------- */
  const handleNarrationToggle = () => {
    setNarrationEnabledRaw(prev => {
      const next = !prev;
      localStorage.setItem(NARRATION_ENABLED_KEY, String(next));
      notify({ narrationEnabled: next });
      return next;
    });
  };

  const handleNarrationVolume = (v: number) => {
    const clamped = clamp(v);
    setNarrationVolumeRaw(clamped);
    localStorage.setItem(NARRATION_VOLUME_KEY, String(clamped));
    notify({ narrationVolume: clamped });
  };

  // If localStorage is mutated elsewhere (e.g. different tab) pick it up
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
