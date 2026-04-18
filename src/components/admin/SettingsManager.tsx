import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Apple, Smile, Coins, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Setting {
  id: string;
  key: string;
  value: number;
  label: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  starting_health: <Heart className="w-4 h-4 text-destructive" />,
  starting_food: <Apple className="w-4 h-4 text-green-400" />,
  starting_morale: <Smile className="w-4 h-4 text-yellow-400" />,
  starting_money: <Coins className="w-4 h-4 text-primary" />,
};

export function SettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('game_settings')
      .select('*')
      .order('created_at');
    if (data) setSettings(data);
    setLoading(false);
  };

  const updateValue = (key: string, value: number) => {
    setSettings(prev =>
      prev.map(s => (s.key === key ? { ...s, value } : s))
    );
  };

  const saveAll = async () => {
    setSaving(true);
    for (const setting of settings) {
      await supabase
        .from('game_settings')
        .update({ value: setting.value })
        .eq('id', setting.id);
    }
    setSaving(false);
    toast({ title: 'Settings saved', description: 'Starting stats updated successfully.' });
  };

  if (loading) {
    return <p className="font-pixel text-[8px] text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="space-y-4">
      <p className="font-pixel text-[8px] text-muted-foreground">
        Configure the starting stats for new games.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {settings.map(setting => (
          <div
            key={setting.key}
            className="flex items-center gap-3 p-3 rounded border border-border bg-muted/30"
          >
            {ICON_MAP[setting.key]}
            <div className="flex-1">
              <Label className="font-pixel text-[8px] text-foreground">{setting.label}</Label>
              <Input
                type="number"
                min={0}
                max={setting.key === 'starting_money' ? 999 : 100}
                value={setting.value}
                onChange={e => updateValue(setting.key, parseInt(e.target.value) || 0)}
                className="mt-1 h-8 text-sm bg-background border-border font-retro"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={saveAll}
        disabled={saving}
        className="w-full font-pixel text-[8px]"
      >
        <Save className="w-3 h-3 mr-2" />
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
}
