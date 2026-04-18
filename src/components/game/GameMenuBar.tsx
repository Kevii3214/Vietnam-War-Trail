import { useState } from 'react';
import { Save, Package, Settings, LogOut } from 'lucide-react';

interface GameMenuBarProps {
  onSaveAndExit?: () => void;
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] font-pixel text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors cursor-pointer whitespace-nowrap"
    >
      {icon}
      {label}
    </button>
  );
}

const ITEMS = [
  { id: 'save', icon: <Save className="w-3.5 h-3.5" />, color: 'text-primary' },
  { id: 'inventory', icon: <Package className="w-3.5 h-3.5" />, color: 'text-amber-400' },
  { id: 'settings', icon: <Settings className="w-3.5 h-3.5" />, color: 'text-muted-foreground' },
];

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
              className={`w-10 h-full flex items-center justify-center transition-all duration-150 cursor-pointer group
                ${isOpen ? 'bg-primary/15' : 'hover:bg-primary/10'}
                ${i < ITEMS.length - 1 ? 'border-b border-primary/10' : ''}`}
              style={{ minHeight: 28 }}
              title={item.id}
            >
              <span className={`${item.color} transition-opacity ${isOpen ? 'opacity-100' : 'opacity-50 group-hover:opacity-90'}`}>
                {item.icon}
              </span>
            </button>

            {/* Flyout panel */}
            {isOpen && (
              <div className="absolute right-full top-0 bg-background/95 border border-primary/20 border-r-0 backdrop-blur-md animate-fade-in-up min-w-[120px] rounded-l-sm z-20">
                <div className="p-1">
                  {item.id === 'save' && (
                    <>
                      <MenuButton icon={<Save className="w-3 h-3" />} label="Save Game" onClick={() => setExpanded(null)} />
                      <MenuButton icon={<LogOut className="w-3 h-3" />} label="Save & Exit" onClick={() => { onSaveAndExit?.(); setExpanded(null); }} />
                    </>
                  )}
                  {item.id === 'inventory' && (
                    <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">Empty</div>
                  )}
                  {item.id === 'settings' && (
                    <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">No settings</div>
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
