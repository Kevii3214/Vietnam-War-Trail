import React from 'react';

interface GameHUDProps {
  children: React.ReactNode;
  menuBar?: React.ReactNode;
}

/**
 * Game HUD — standardized white-bordered dialogue box used in gameplay.
 * Matches the cinematic dialogue box styling exactly.
 */
export function GameHUD({ children, menuBar }: GameHUDProps) {
  return (
    <div className="relative mx-4 md:mx-16 lg:mx-28">
      {/* Pixel drop-shadow */}
      <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-white/10 pointer-events-none" />

      {/* Main dialogue frame — white border, black bg */}
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
        {menuBar && (
          <div className="flex flex-col border-l-2 border-white bg-black z-10 shrink-0">
            {menuBar}
          </div>
        )}
      </div>
    </div>
  );
}
