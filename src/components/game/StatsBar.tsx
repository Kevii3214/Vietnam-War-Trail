import { Heart, Apple, Smile, Coins } from 'lucide-react';
import type { GameStats } from '@/hooks/useGameState';

interface StatsBarProps {
  stats: GameStats;
  phase: number;
  day: number;
  landingCountry?: string | null;
}

function StatItem({ icon: Icon, label, value, max, colorClass }: {
  icon: React.ElementType;
  label: string;
  value: number;
  max: number;
  colorClass: string;
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const isLow = percent <= 25;

  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${colorClass} ${isLow ? 'animate-pulse' : ''}`} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="font-pixel text-[8px] text-foreground/70 uppercase tracking-wider">{label}</span>
          <span className={`font-pixel text-[8px] ${colorClass}`}>{value}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-sm overflow-hidden">
          <div
            className={`h-full rounded-sm transition-all duration-500 ${isLow ? 'animate-pulse' : ''}`}
            style={{
              width: `${percent}%`,
              backgroundColor: `var(--tw-${label.toLowerCase()}-color, currentColor)`,
            }}
          >
            <div className={`h-full rounded-sm ${colorClass.replace('text-', 'bg-')}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsBar({ stats, phase, day, landingCountry }: StatsBarProps) {
  const phaseNames = ['', 'Escape', 'At Sea', landingCountry || 'Camp', 'America'];

  return (
    <div className="border border-border bg-card/80 p-3 rounded-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-pixel text-[9px] text-primary crt-glow">
          {phaseNames[phase] || '???'}
        </span>
        <span className="font-pixel text-[9px] text-muted-foreground">
          Day {day}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <StatItem icon={Heart} label="Health" value={stats.health} max={100} colorClass="text-game-health" />
        <StatItem icon={Apple} label="Food" value={stats.food} max={100} colorClass="text-game-food" />
        <StatItem icon={Smile} label="Morale" value={stats.morale} max={100} colorClass="text-game-morale" />
        <StatItem icon={Coins} label="Money" value={stats.money} max={999} colorClass="text-game-money" />
      </div>
    </div>
  );
}
