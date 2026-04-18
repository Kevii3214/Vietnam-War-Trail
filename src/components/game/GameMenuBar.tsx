import { useState } from 'react';
import { Save, Package, Settings, LogOut } from 'lucide-react';

interface GameMenuBarProps {
  onSaveAndExit?: () => void;
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] font-pixel text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
    >
      {icon}
      {label}
    </button>
  );
}

export function GameMenuBar({ onSaveAndExit }: GameMenuBarProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const items = [
    { id: 'save', icon: <Save className="w-3.5 h-3.5" />, color: 'text-primary' },
    { id: 'inventory', icon: <Package className="w-3.5 h-3.5" />, color: 'text-amber-400' },
    { id: 'settings', icon: <Settings className="w-3.5 h-3.5" />, color: 'text-muted-foreground' },
  ];

  return (
    <div className="relative flex flex-col">
      {/* Matching border strip connecting to dialog */}
      <div className="bg-gradient-to-b from-background/95 to-background/85 border-y border-r border-primary/40 rounded-r-sm overflow-hidden">
        <div className="flex flex-col">
          {items.map((item, i) => {
            const isOpen = expanded === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className={`relative w-9 h-8 flex items-center justify-center transition-all duration-150 cursor-pointer group
                  ${isOpen ? 'bg-primary/15' : 'hover:bg-primary/10'}
                  ${i < items.length - 1 ? 'border-b border-primary/10' : ''}`}
                title={item.id}
              >
                <span className={`${item.color} transition-opacity ${isOpen ? 'opacity-100' : 'opacity-50 group-hover:opacity-90'}`}>
                  {item.icon}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded flyout panel */}
      {expanded && (
        <div
          className="absolute right-full top-0 mr-0 bg-background/95 border border-primary/30 border-r-0 backdrop-blur-md animate-fade-in-up min-w-[130px] rounded-l-sm"
        >
          <div className="p-1.5">
            {expanded === 'save' && (
              <>
                <MenuButton icon={<Save className="w-3 h-3" />} label="Save Game" onClick={() => setExpanded(null)} />
                <MenuButton icon={<LogOut className="w-3 h-3" />} label="Save & Exit" onClick={() => { onSaveAndExit?.(); setExpanded(null); }} />
              </>
            )}
            {expanded === 'inventory' && (
              <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">
                Inventory empty
              </div>
            )}
            {expanded === 'settings' && (
              <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">
                No settings yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
