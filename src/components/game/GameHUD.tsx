import React from 'react';

interface GameHUDProps {
  children: React.ReactNode;
  menuBar: React.ReactNode;
}

export function GameHUD({ children, menuBar }: GameHUDProps) {
  return (
    <div className="relative mx-4 md:mx-16 lg:mx-28">
      {/* Outer shadow — pixel-art drop shadow */}
      <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-primary/15 pointer-events-none" />

      {/* Main dialogue frame */}
      <div className="relative flex bg-background border-2 border-primary/70">
        {/* Inner bevel — top + left lighter edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/25 pointer-events-none" />
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-primary/25 pointer-events-none" />
        {/* Inner bevel — bottom + right darker edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/40 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-black/40 pointer-events-none" />

        {/* Text content area */}
        <div className="flex-1 px-5 py-4 md:px-6 md:py-4 relative z-10">
          {children}
        </div>

        {/* Menu strip */}
        <div className="flex flex-col border-l-2 border-primary/40 bg-background/95 z-10">
          {menuBar}
        </div>
      </div>
    </div>
  );
}
