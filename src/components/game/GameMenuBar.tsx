import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Save, Package, Settings, LogOut, X, Volume2, VolumeX } from 'lucide-react';

interface GameMenuBarProps {
  onSaveAndExit?: () => void;
  volume?: number;
  muted?: boolean;
  onVolumeChange?: (v: number) => void;
  onToggleMute?: () => void;
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 font-pixel text-[9px] text-foreground/60 hover:text-primary hover:bg-primary/8 active:bg-primary/15 transition-all cursor-pointer whitespace-nowrap border-b border-primary/8 last:border-b-0 group"
      style={{ transition: 'all 0.15s ease' }}
    >
      <span className="group-hover:[filter:drop-shadow(0_0_4px_hsl(var(--primary)/0.7))] transition-all duration-150">
        {icon}
      </span>
      {label}
    </button>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75" style={{ backdropFilter: 'blur(4px)' }} />

      {/* Panel */}
      <div
        className="relative bg-background border border-primary/50 min-w-[280px] max-w-sm w-full mx-4 modal-enter overflow-hidden"
        style={{ borderRadius: '4px', boxShadow: '0 0 24px hsl(var(--primary)/0.2), 0 0 60px hsl(var(--primary)/0.06)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20" style={{ background: 'hsl(var(--primary)/0.06)' }}>
          <span className="font-pixel text-[10px] text-primary tracking-widest" style={{ textShadow: '0 0 8px hsl(var(--primary)/0.6)' }}>
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full text-foreground/40 hover:text-foreground/80 hover:bg-white/8 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Content */}
        <div className="py-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

const ITEMS = [
  { id: 'save', icon: <Save className="w-3.5 h-3.5" />, label: 'SAVE' },
  { id: 'inventory', icon: <Package className="w-3.5 h-3.5" />, label: 'ITEMS' },
  { id: 'settings', icon: <Settings className="w-3.5 h-3.5" />, label: 'OPTS' },
] as const;

export function GameMenuBar({ onSaveAndExit, volume = 0.3, muted = false, onVolumeChange, onToggleMute }: GameMenuBarProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {ITEMS.map((item, i) => {
        const isOpen = open === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setOpen(isOpen ? null : item.id)}
            title={item.label}
            style={isOpen ? {
              color: 'hsl(var(--primary))',
              textShadow: '0 0 10px hsl(var(--primary)/0.8)',
              background: 'hsl(var(--primary)/0.1)',
              boxShadow: 'inset 0 0 10px hsl(var(--primary)/0.06)',
              transition: 'all 0.15s ease',
            } : { transition: 'all 0.15s ease' }}
            className={[
              'w-12 flex flex-col items-center justify-center gap-1 px-1 py-2.5 cursor-pointer font-pixel text-[7px] tracking-wide',
              isOpen
                ? ''
                : 'text-primary/40 hover:text-primary/80 hover:bg-primary/6',
              i < ITEMS.length - 1 ? 'border-b border-primary/15' : '',
            ].join(' ')}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}

      {open === 'save' && (
        <Modal title="SAVE" onClose={() => setOpen(null)}>
          <MenuButton icon={<Save className="w-3.5 h-3.5" />} label="Save Game" onClick={() => setOpen(null)} />
          <MenuButton
            icon={<LogOut className="w-3.5 h-3.5" />}
            label="Save & Exit"
            onClick={() => { onSaveAndExit?.(); setOpen(null); }}
          />
        </Modal>
      )}

      {open === 'inventory' && (
        <Modal title="ITEMS" onClose={() => setOpen(null)}>
          <div className="px-4 py-6 font-pixel text-[9px] text-muted-foreground/40 text-center leading-loose">
            No items yet.
          </div>
        </Modal>
      )}

      {open === 'settings' && (
        <Modal title="OPTIONS" onClose={() => setOpen(null)}>
          <div className="px-4 py-4 space-y-4">
            {/* Music Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[9px] text-foreground/60 tracking-wide">MUSIC</span>
                <button
                  onClick={() => onToggleMute?.()}
                  className="flex items-center gap-1.5 px-2 py-1 rounded font-pixel text-[8px] text-primary/60 hover:text-primary hover:bg-primary/8 transition-all cursor-pointer"
                >
                  {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  {muted ? 'MUTED' : 'ON'}
                </button>
              </div>
              <div className="relative h-6 flex items-center">
                {/* Visual track */}
                <div className="absolute left-0 right-0 h-2 rounded-full border border-primary/20 overflow-hidden pointer-events-none" style={{ background: 'hsl(var(--primary)/0.05)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-150"
                    style={{
                      width: `${(muted ? 0 : volume) * 100}%`,
                      background: 'linear-gradient(90deg, hsl(var(--primary)/0.4), hsl(var(--primary)))',
                      boxShadow: '0 0 6px hsl(var(--primary)/0.4)',
                    }}
                  />
                </div>
                {/* Actual range input on top */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : Math.round(volume * 100)}
                  onChange={e => {
                    const val = Number(e.target.value) / 100;
                    onVolumeChange?.(val);
                  }}
                  className="relative z-10 w-full h-6 opacity-0 cursor-pointer"
                  style={{ margin: 0 }}
                />
              </div>
              <div className="text-right font-pixel text-[7px] text-muted-foreground/30">
                {muted ? '0' : Math.round(volume * 100)}%
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
