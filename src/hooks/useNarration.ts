import { useRef, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const NARRATION_ENABLED_KEY = 'saigone-narration-enabled';
const NARRATION_VOLUME_KEY = 'saigone-narration-volume';

export function useNarration() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(() => {
    return localStorage.getItem(NARRATION_ENABLED_KEY) !== 'false';
  });
  const [narrationVolume, setNarrationVolumeState] = useState(() => {
    const saved = localStorage.getItem(NARRATION_VOLUME_KEY);
    return saved ? parseFloat(saved) : 0.8;
  });

  const narrationVolumeRef = useRef(narrationVolume);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(NARRATION_ENABLED_KEY, String(narrationEnabled));
  }, [narrationEnabled]);

  useEffect(() => {
    narrationVolumeRef.current = narrationVolume;
    localStorage.setItem(NARRATION_VOLUME_KEY, String(narrationVolume));
    if (audioRef.current) {
      audioRef.current.volume = narrationVolume;
    }
  }, [narrationVolume]);

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    // Stop any currently playing narration
    stop();

    if (!text.trim()) return;

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setIsSpeaking(true);

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text },
      });

      // Check if aborted during fetch
      if (controller.signal.aborted) return;

      if (error) {
        console.error('Narration error:', error);
        setIsSpeaking(false);
        return;
      }

      // data comes back as a Blob from the edge function
      let blob: Blob;
      if (data instanceof Blob) {
        blob = data;
      } else if (data instanceof ArrayBuffer) {
        blob = new Blob([data], { type: 'audio/mpeg' });
      } else {
        console.error('Unexpected response type from TTS');
        setIsSpeaking(false);
        return;
      }

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.volume = narrationVolumeRef.current;
      audioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        audioRef.current = null;
      };

      await audio.play();
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        console.error('Narration error:', err);
      }
      setIsSpeaking(false);
    }
  }, [stop]);

  const setNarrationVolume = useCallback((v: number) => {
    setNarrationVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const toggleNarration = useCallback(() => {
    setNarrationEnabled(prev => {
      const next = !prev;
      if (!next) stop();
      return next;
    });
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    speak,
    stop,
    isSpeaking,
    narrationEnabled,
    narrationVolume,
    setNarrationVolume,
    toggleNarration,
  };
}
