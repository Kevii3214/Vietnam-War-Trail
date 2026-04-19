import { useEffect, useRef } from 'react';

const MENU_MUSIC_URL = 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100035289/cc04.mp3';
const FADE_MS = 1500;
const VOLUME_KEY = 'menu-music-volume';

// Shared audio element so music doesn't restart between auth ↔ title navigation
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

  useEffect(() => {
    const audio = getSharedAudio();
    const savedVol = parseFloat(localStorage.getItem(VOLUME_KEY) ?? '0.3');
    const targetVol = Math.max(0, Math.min(1, savedVol));

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

    // Start playing (browsers require user gesture — catch and ignore)
    audio.play().then(fadeIn).catch(() => {
      // Autoplay blocked — listen for first interaction
      const tryPlay = () => {
        audio.play().then(fadeIn).catch(() => {});
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('keydown', tryPlay);
      };
      document.addEventListener('click', tryPlay, { once: true });
      document.addEventListener('keydown', tryPlay, { once: true });
    });

    // Cleanup: fade out when leaving menu pages
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
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
