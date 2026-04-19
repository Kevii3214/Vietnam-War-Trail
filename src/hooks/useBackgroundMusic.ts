import { useEffect, useRef, useCallback, useState } from 'react';

// Map phase numbers to music URLs
const PHASE_MUSIC: Record<number, string> = {
  1: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/4a9a.mp3',
  2: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/58ce.mp3',
  3: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/8756.mp3',
  4: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/227c.mp3',
};

const CROSSFADE_MS = 2000;
const STORAGE_KEY = 'saigone-music-volume';
const MUTED_KEY = 'saigone-music-muted';

export function useBackgroundMusic(currentPhase: number, isPlaying: boolean) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadingAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentPhaseRef = useRef<number>(0);

  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseFloat(saved) : 0.3;
  });
  const [muted, setMutedState] = useState(() => {
    return localStorage.getItem(MUTED_KEY) === 'true';
  });
  const volumeRef = useRef(volume);

  // Keep ref in sync
  useEffect(() => {
    volumeRef.current = volume;
    localStorage.setItem(STORAGE_KEY, String(volume));
    localStorage.setItem(MUTED_KEY, String(muted));
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
      newAudio.volume = Math.max(0, Math.min(1, targetVol * progress));

      // Fade out old
      if (fadingAudioRef.current) {
        fadingAudioRef.current.volume = Math.max(0, Math.min(1, targetVol * (1 - progress)));
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
    setMutedState(prev => {
      const next = !prev;
      if (currentAudioRef.current) {
        currentAudioRef.current.volume = next ? 0 : volumeRef.current;
      }
      return next;
    });
  }, []);

  const setMutedExplicit = useCallback((val: boolean) => {
    setMutedState(val);
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = val ? 0 : volumeRef.current;
    }
  }, []);

  return { volume, muted, setVolume, setMuted: setMutedExplicit, toggleMute };
}
