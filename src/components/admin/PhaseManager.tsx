import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { GamePhase } from '@/hooks/useGameEvents';
import { Edit2, Save, X } from 'lucide-react';

interface PhaseManagerProps {
  phases: GamePhase[];
  onRefresh: () => void;
}

export function PhaseManager({ phases, onRefresh }: PhaseManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<GamePhase>>({});
  const [creating, setCreating] = useState(false);
  const [newPhase, setNewPhase] = useState({ name: '', description: '', phase_order: 1, image_url: '', days_in_phase: 12 });
  const { toast } = useToast();

  const startEdit = (phase: GamePhase) => {
    setEditingId(phase.id);
    setEditData({ ...phase });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from('game_phases')
      .update({
        name: editData.name,
        description: editData.description,
        image_url: editData.image_url,
        days_in_phase: editData.days_in_phase,
      })
      .eq('id', editingId);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Phase updated' });
      setEditingId(null);
      onRefresh();
    }
  };

  const createPhase = async () => {
    const { error } = await supabase.from('game_phases').insert({
      name: newPhase.name,
      description: newPhase.description || null,
      phase_order: newPhase.phase_order,
      image_url: newPhase.image_url || null,
      days_in_phase: newPhase.days_in_phase,
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Phase created' });
      setCreating(false);
      setNewPhase({ name: '', description: '', phase_order: 1, image_url: '', days_in_phase: 12 });
      onRefresh();
    }
  };

  const missingPhases = [1, 2, 3, 4].filter(o => !phases.find(p => p.phase_order === o));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[10px] text-primary">Phases</h2>
        {missingPhases.length > 0 && !creating && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCreating(true);
              setNewPhase(prev => ({ ...prev, phase_order: missingPhases[0] }));
            }}
            className="font-pixel text-[8px] border-border text-foreground hover:bg-muted"
          >
            Add Phase
          </Button>
        )}
      </div>

      {creating && (
        <div className="border border-primary/30 rounded-sm p-3 bg-card space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-retro text-sm text-muted-foreground">Phase Order</label>
              <select
                value={newPhase.phase_order}
                onChange={e => setNewPhase({ ...newPhase, phase_order: parseInt(e.target.value) })}
                className="w-full h-8 bg-muted border border-border rounded-sm font-retro text-base text-foreground px-2"
              >
                {missingPhases.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="font-retro text-sm text-muted-foreground">Days</label>
              <Input
                type="number"
                value={newPhase.days_in_phase}
                onChange={e => setNewPhase({ ...newPhase, days_in_phase: parseInt(e.target.value) || 12 })}
                className="font-retro text-base bg-muted border-border text-foreground h-8"
              />
            </div>
          </div>
          <Input
            value={newPhase.name}
            onChange={e => setNewPhase({ ...newPhase, name: e.target.value })}
            placeholder="Phase name..."
            className="font-retro text-base bg-muted border-border text-foreground"
          />
          <Textarea
            value={newPhase.description}
            onChange={e => setNewPhase({ ...newPhase, description: e.target.value })}
            placeholder="Phase description..."
            className="font-retro text-base bg-muted border-border text-foreground min-h-[60px]"
          />
          <Input
            value={newPhase.image_url}
            onChange={e => setNewPhase({ ...newPhase, image_url: e.target.value })}
            placeholder="Image URL (optional)"
            className="font-retro text-base bg-muted border-border text-foreground"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={createPhase} className="font-pixel text-[8px] bg-primary text-primary-foreground">
              Create
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCreating(false)} className="font-pixel text-[8px] text-muted-foreground">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {phases.length === 0 && !creating && (
        <p className="font-retro text-lg text-muted-foreground">
          No phases created yet. Add phases 1-4 to set up the game.
        </p>
      )}

      {phases.map(phase => (
        <div key={phase.id} className="border border-border rounded-sm p-3 bg-card/50 space-y-2">
          {editingId === phase.id ? (
            <>
              <Input
                value={editData.name || ''}
                onChange={e => setEditData({ ...editData, name: e.target.value })}
                className="font-retro text-base bg-muted border-border text-foreground"
              />
              <Textarea
                value={editData.description || ''}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
                className="font-retro text-base bg-muted border-border text-foreground min-h-[60px]"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-retro text-sm text-muted-foreground">Image URL</label>
                  <Input
                    value={editData.image_url || ''}
                    onChange={e => setEditData({ ...editData, image_url: e.target.value })}
                    className="font-retro text-base bg-muted border-border text-foreground h-8"
                  />
                </div>
                <div>
                  <label className="font-retro text-sm text-muted-foreground">Days</label>
                  <Input
                    type="number"
                    value={editData.days_in_phase || 12}
                    onChange={e => setEditData({ ...editData, days_in_phase: parseInt(e.target.value) || 12 })}
                    className="font-retro text-base bg-muted border-border text-foreground h-8"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={saveEdit} className="font-pixel text-[8px] bg-primary text-primary-foreground">
                  <Save className="w-3 h-3 mr-1" /> Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-muted-foreground">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] text-muted-foreground">#{phase.phase_order}</span>
                  <span className="font-pixel text-[10px] text-foreground">{phase.name}</span>
                  <span className="font-retro text-sm text-muted-foreground">({phase.days_in_phase} days)</span>
                </div>
                {phase.description && (
                  <p className="font-retro text-base text-muted-foreground mt-1">{phase.description}</p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => startEdit(phase)} className="text-muted-foreground hover:text-foreground">
                <Edit2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
