import React from 'react';

interface GameHUDProps {
  children: React.ReactNode;
  menuBar: React.ReactNode;
}

export function GameHUD({ children, menuBar }: GameHUDProps) {
  return (
    <div className="relative mx-4 md:mx-16 lg:mx-28">
      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-lg bg-primary/8 blur-lg pointer-events-none" />
      {/* Unified frame */}
      <div className="relative rounded-lg overflow-hidden flex border border-primary/20 shadow-lg shadow-primary/5">
        {/* Text area - main content */}
        <div className="flex-1 bg-background/80 backdrop-blur-xl px-5 py-3 md:px-6 md:py-3 relative">
          {/* Top accent line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {children}
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        </div>

        {/* Menu strip - seamlessly integrated */}
        <div className="flex flex-col bg-background/60 backdrop-blur-xl border-l border-primary/10">
          {menuBar}
        </div>
      </div>
    </div>
  );
}
