import { useEffect, useRef } from 'react';

const MENU_MUSIC_URL = 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/cc04.mp3';
const FADE_MS = 1500;
const VOLUME_KEY = 'saigone-music-volume';
const MUTED_KEY = 'saigone-music-muted';

// Shared audio element so music doesn't restart between auth <-> title navigation
let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    sharedAudio = new Audio(MENU_MUSIC_URL);
    sharedAudio.loop = true;
    sharedAudio.volume = 0;
  }
  return sharedAudio;
}

export function useMenuMusic() {
  const fadeRef = useRef<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const audio = getSharedAudio();
    const savedVol = parseFloat(localStorage.getItem(VOLUME_KEY) ?? '0.3');
    const savedMuted = localStorage.getItem(MUTED_KEY) === 'true';
    const targetVol = savedMuted ? 0 : Math.max(0, Math.min(1, savedVol));

    // Fade in
    const fadeIn = () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      const start = performance.now();
      const startVol = audio.volume;
      const step = (now: number) => {
        const t = Math.min((now - start) / FADE_MS, 1);
        audio.volume = startVol + (targetVol - startVol) * t;
        if (t < 1) fadeRef.current = requestAnimationFrame(step);
      };
      fadeRef.current = requestAnimationFrame(step);
    };

    // Start playing
    audio.play().then(fadeIn).catch(() => {
      const tryPlay = () => {
        audio.play().then(fadeIn).catch(() => {});
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('keydown', tryPlay);
      };
      document.addEventListener('click', tryPlay, { once: true });
      document.addEventListener('keydown', tryPlay, { once: true });
    });

    // Poll localStorage so OptionsPanel changes apply in real-time
    pollRef.current = setInterval(() => {
      const vol = parseFloat(localStorage.getItem(VOLUME_KEY) ?? '0.3');
      const mut = localStorage.getItem(MUTED_KEY) === 'true';
      audio.volume = mut ? 0 : Math.max(0, Math.min(1, vol));
    }, 200);

    // Cleanup: fade out when leaving menu pages
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      const a = sharedAudio;
      if (!a || a.paused) return;

      const startVol = a.volume;
      const start = performance.now();
      const fadeOut = (now: number) => {
        const t = Math.min((now - start) / FADE_MS, 1);
        a.volume = startVol * (1 - t);
        if (t < 1) {
          requestAnimationFrame(fadeOut);
        } else {
          a.pause();
          a.currentTime = 0;
          a.volume = 0;
        }
      };
      requestAnimationFrame(fadeOut);
    };
  }, []);
}
