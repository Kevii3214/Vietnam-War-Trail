import { useEffect, useRef, useCallback, useState } from 'react';

// Map phase numbers to music file paths in /public/music/
// Replace these with your actual MP3 files
const PHASE_MUSIC: Record<number, string> = {
  1: '/music/phase1.mp3',
  2: '/music/phase2.mp3',
  3: '/music/phase3.mp3',
  4: '/music/phase4.mp3',
};

const CROSSFADE_MS = 2000;
const STORAGE_KEY = 'saigone-music-volume';

export function useBackgroundMusic(currentPhase: number, isPlaying: boolean) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadingAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentPhaseRef = useRef<number>(0);

  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : 0.3;
  });
  const [muted, setMuted] = useState(false);
  const volumeRef = useRef(volume);

  // Keep ref in sync
  useEffect(() => {
    volumeRef.current = volume;
    localStorage.setItem(STORAGE_KEY, String(volume));
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const stopFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    if (fadingAudioRef.current) {
      fadingAudioRef.current.pause();
      fadingAudioRef.current.src = '';
      fadingAudioRef.current = null;
    }
  }, []);

  const crossfadeTo = useCallback((src: string) => {
    stopFade();

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = 0;

    // Move current to fading
    const oldAudio = currentAudioRef.current;
    if (oldAudio) {
      fadingAudioRef.current = oldAudio;
    }

    currentAudioRef.current = newAudio;

    const targetVol = muted ? 0 : volumeRef.current;
    const steps = CROSSFADE_MS / 50;
    let step = 0;

    newAudio.play().catch(() => { /* autoplay blocked */ });

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;

      // Fade in new
      newAudio.volume = Math.min(targetVol * progress, 1);

      // Fade out old
      if (fadingAudioRef.current) {
        const oldVol = targetVol * (1 - progress);
        fadingAudioRef.current.volume = Math.max(oldVol, 0);
      }

      if (step >= steps) {
        if (fadingAudioRef.current) {
          fadingAudioRef.current.pause();
          fadingAudioRef.current.src = '';
          fadingAudioRef.current = null;
        }
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, 50);
  }, [stopFade, muted]);

  // Handle phase changes
  useEffect(() => {
    if (!isPlaying) {
      // Stop all music
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.src = '';
        currentAudioRef.current = null;
      }
      stopFade();
      currentPhaseRef.current = 0;
      return;
    }

    const src = PHASE_MUSIC[currentPhase];
    if (!src || currentPhase === currentPhaseRef.current) return;

    currentPhaseRef.current = currentPhase;
    crossfadeTo(src);
  }, [currentPhase, isPlaying, crossfadeTo, stopFade]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.src = '';
      }
      stopFade();
    };
  }, [stopFade]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      if (currentAudioRef.current) {
        currentAudioRef.current.volume = next ? 0 : volumeRef.current;
      }
      return next;
    });
  }, []);

  return { volume, muted, setVolume, toggleMute };
}
