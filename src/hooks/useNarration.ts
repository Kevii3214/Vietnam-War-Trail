import { useRef, useState, useCallback, useEffect } from 'react';

const NARRATION_ENABLED_KEY = 'saigone-narration-enabled';
const NARRATION_VOLUME_KEY = 'saigone-narration-volume';
const NARRATION_MODE_KEY = 'saigone-narration-mode'; // 'browser' | 'elevenlabs'

export function useNarration() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(() => {
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
  }, [narrationVolume]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    stop();
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = Math.max(0, Math.min(1, narrationVolumeRef.current));
    utterance.rate = 0.9;
    utterance.pitch = 0.95;

    // Try to pick a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));

    if (preferred) {
      utterance.voice = preferred;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [stop]);

  const setNarrationVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setNarrationVolumeState(clamped);
    // Update in-progress speech if any
    if (utteranceRef.current) {
      utteranceRef.current.volume = clamped;
    }
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
