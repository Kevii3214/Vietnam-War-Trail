import { useState } from 'react';
import { Save, Package, Settings, X, LogOut, ChevronLeft } from 'lucide-react';

interface GameMenuBarProps {
  onSaveAndExit?: () => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  expanded: string | null;
  id: string;
  onToggle: (id: string | null) => void;
  children?: React.ReactNode;
  accent?: string;
}

function MenuItem({ icon, label, expanded, id, onToggle, children, accent = 'text-primary' }: MenuItemProps) {
  const isOpen = expanded === id;

  return (
    <div className="relative flex items-center">
      {/* Expanded panel - slides out left */}
      {isOpen && children && (
        <div
          className="absolute right-full mr-2 bg-background/95 border border-primary/30 backdrop-blur-sm animate-fade-in-up min-w-[140px]"
          style={{ clipPath: 'polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0% 100%, 0% 4px)' }}
        >
          <div className="p-2 space-y-1">
            {children}
          </div>
        </div>
      )}

      {/* Icon button */}
      <button
        onClick={() => onToggle(isOpen ? null : id)}
        className={`relative w-9 h-9 flex items-center justify-center transition-all duration-200 cursor-pointer group
          ${isOpen ? 'bg-primary/20 border-primary/50' : 'bg-background/80 border-primary/20 hover:border-primary/40 hover:bg-primary/10'}
          border backdrop-blur-sm`}
        style={{ clipPath: 'polygon(3px 0%, 100% 0%, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0% 100%, 0% 3px)' }}
        title={label}
      >
        <span className={`${accent} transition-colors ${isOpen ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
          {icon}
        </span>
      </button>
    </div>
  );
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

  return (
    <div className="flex flex-col gap-1.5">
      {/* Save & Exit */}
      <MenuItem
        id="save"
        icon={<Save className="w-4 h-4" />}
        label="Save & Exit"
        expanded={expanded}
        onToggle={setExpanded}
        accent="text-primary"
      >
        <MenuButton
          icon={<Save className="w-3 h-3" />}
          label="Save Game"
          onClick={() => {
            setExpanded(null);
          }}
        />
        <MenuButton
          icon={<LogOut className="w-3 h-3" />}
          label="Save & Exit"
          onClick={() => {
            onSaveAndExit?.();
            setExpanded(null);
          }}
        />
      </MenuItem>

      {/* Inventory */}
      <MenuItem
        id="inventory"
        icon={<Package className="w-4 h-4" />}
        label="Inventory"
        expanded={expanded}
        onToggle={setExpanded}
        accent="text-amber-400"
      >
        <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">
          Inventory empty
        </div>
      </MenuItem>

      {/* Settings */}
      <MenuItem
        id="settings"
        icon={<Settings className="w-4 h-4" />}
        label="Settings"
        expanded={expanded}
        onToggle={setExpanded}
        accent="text-muted-foreground"
      >
        <div className="px-2 py-1.5 text-[10px] font-pixel text-muted-foreground text-center">
          No settings yet
        </div>
      </MenuItem>

      {/* Close all */}
      {expanded && (
        <MenuItem
          id="__close"
          icon={<ChevronLeft className="w-4 h-4" />}
          label="Close"
          expanded={null}
          onToggle={() => setExpanded(null)}
        />
      )}
    </div>
  );
}
