import { useState } from 'react';
import { Save, Package, Settings, LogOut, X } from 'lucide-react';

interface GameMenuBarProps {
  onSaveAndExit?: () => void;
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-pixel text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer whitespace-nowrap rounded"
    >
      {icon}
      {label}
    </button>
  );
}

const ITEMS = [
  { id: 'save', icon: <Save className="w-3.5 h-3.5" />, label: 'Save' },
  { id: 'inventory', icon: <Package className="w-3.5 h-3.5" />, label: 'Items' },
  { id: 'settings', icon: <Settings className="w-3.5 h-3.5" />, label: 'Settings' },
] as const;

export function GameMenuBar({ onSaveAndExit }: GameMenuBarProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {ITEMS.map((item, i) => {
        const isOpen = expanded === item.id;
        return (
          <div key={item.id} className="relative">
            <button
              onClick={() => setExpanded(isOpen ? null : item.id)}
              className={`w-10 flex items-center justify-center transition-all duration-200 cursor-pointer group
                ${isOpen ? 'bg-primary/15 text-primary' : 'text-foreground/30 hover:text-foreground/70 hover:bg-primary/5'}
                ${i < ITEMS.length - 1 ? 'border-b border-primary/5' : ''}`}
              style={{ minHeight: 30 }}
              title={item.label}
            >
              {item.icon}
            </button>

            {/* Flyout panel */}
            {isOpen && (
              <div className="absolute right-full top-0 bg-background/90 backdrop-blur-xl border border-primary/15 border-r-0 rounded-l-lg animate-fade-in-up min-w-[130px] z-30 shadow-lg shadow-background/50">
                <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-primary/10">
                  <span className="text-[8px] font-pixel text-primary/60 uppercase tracking-widest">{item.label}</span>
                  <button onClick={() => setExpanded(null)} className="text-foreground/30 hover:text-foreground/60 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-1">
                  {item.id === 'save' && (
                    <>
                      <MenuButton icon={<Save className="w-3 h-3" />} label="Save Game" onClick={() => setExpanded(null)} />
                      <MenuButton icon={<LogOut className="w-3 h-3" />} label="Save & Exit" onClick={() => { onSaveAndExit?.(); setExpanded(null); }} />
                    </>
                  )}
                  {item.id === 'inventory' && (
                    <div className="px-3 py-2 text-[10px] font-pixel text-muted-foreground/50 text-center">No items</div>
                  )}
                  {item.id === 'settings' && (
                    <div className="px-3 py-2 text-[10px] font-pixel text-muted-foreground/50 text-center">Coming soon</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
