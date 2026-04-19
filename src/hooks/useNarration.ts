import { useRef, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const NARRATION_ENABLED_KEY = 'saigone-narration-enabled';
const NARRATION_VOLUME_KEY = 'saigone-narration-volume';

// Match the URL from client.ts — edge functions are at /functions/v1/
const SUPABASE_URL = 'https://spb-t4n35y82y7lcggk6.supabase.opentrust.net';

export function useNarration() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRequestRef = useRef(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(() => {
    // Default OFF to save credits
    return localStorage.getItem(NARRATION_ENABLED_KEY) === 'true';
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
      audioRef.current.volume = Math.max(0, Math.min(1, narrationVolume));
    }
  }, [narrationVolume]);

  const stop = useCallback(() => {
    // Increment request id to invalidate in-flight requests
    currentRequestRef.current++;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    stop();
    if (!text.trim()) return;

    const requestId = ++currentRequestRef.current;

    try {
      setIsSpeaking(true);

      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || '';

      // Fetch audio as blob directly (supabase.functions.invoke can't handle binary)
      const res = await fetch(`${SUPABASE_URL}/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'apikey': token,
        },
        body: JSON.stringify({ text }),
      });

      // Check if this request was superseded
      if (currentRequestRef.current !== requestId) return;

      if (!res.ok) {
        const errText = await res.text();
        console.error('Narration error:', res.status, errText);
        setIsSpeaking(false);
        return;
      }

      const blob = await res.blob();
      if (currentRequestRef.current !== requestId) return;

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, narrationVolumeRef.current));
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
      if (currentRequestRef.current === requestId) {
        console.error('Narration error:', err);
        setIsSpeaking(false);
      }
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
