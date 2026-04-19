import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GameMenuBar } from './GameMenuBar';
import type { OptionValues } from './optionsKeys';

interface DialogueBoxProps {
  children: React.ReactNode;
  menuBar?: React.ReactNode;
  /** If true, don't render a menu strip on the right */
  noMenu?: boolean;
}

/**
 * Standardised dialogue box used across all scenes and cinematics.
 * White border, pixel-art drop shadow, inner bevel, auto-sizing text area.
 */
export function DialogueBox({ children, menuBar, noMenu }: DialogueBoxProps) {
  return (
    <div className="relative">
      {/* Pixel drop-shadow */}
      <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-white/10 pointer-events-none" />

      {/* Main frame */}
      <div className="relative flex bg-black border-2 border-white">
        {/* Inner bevel — top + left lighter edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/20 pointer-events-none" />
        {/* Inner bevel — bottom + right darker edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/60 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-black/60 pointer-events-none" />

        {/* Text content area */}
        <div className="flex-1 px-4 py-3 md:px-5 md:py-4 relative z-10 min-h-[72px] md:min-h-[88px] flex flex-col justify-center">
          {children}
        </div>

        {/* Menu strip */}
        {!noMenu && menuBar && (
          <div className="flex flex-col border-l-2 border-white bg-black z-10 shrink-0">
            {menuBar}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Auto-sizing typewriter text that fills the dialogue box.
 * Base size is text-base (16px). For very long text it shrinks,
 * for short text it stays at the comfortable base size.
 */
interface DialogueTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  /** Optional label shown above the text (e.g. scene label, event title) */
  label?: string;
}

export function DialogueTypewriter({ text, speed = 28, onComplete, label }: DialogueTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  // Choose font size based on text length
  // Short text (<80 chars) = larger, medium (80-180) = base, long (>180) = slightly smaller
  const sizeClass =
    text.length < 80
      ? 'text-base md:text-lg'
      : text.length < 180
      ? 'text-sm md:text-base'
      : 'text-[13px] md:text-sm';

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="font-retro text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-primary animate-fade-in-up">
          [ {label} ]
        </p>
      )}
      <p className={`font-retro ${sizeClass} leading-relaxed text-foreground text-left`}>
        {displayed}
        {!done && <span className="opacity-80 animate-pulse">_</span>}
      </p>
    </div>
  );
}
