import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EventForm } from './EventForm';
import type { EventFormData } from './EventForm';
import type { GamePhase, GameEvent, EventChoice } from '@/hooks/useGameEvents';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

interface EventManagerProps {
  phases: GamePhase[];
}

function serializeDayWeights(dw: { day: number; probability: number }[]): Record<string, number> | null {
  if (dw.length === 0) return null;
  return Object.fromEntries(dw.map(({ day, probability }) => [String(day), probability]));
}

function deserializeDayWeights(raw: unknown): { day: number; probability: number }[] {
  if (!raw || typeof raw !== 'object') return [];
  return Object.entries(raw as Record<string, number>).map(([day, probability]) => ({
    day: parseInt(day),
    probability,
  }));
}

function normalizeChoiceForForm(raw: unknown): EventChoice {
  if (raw && typeof raw === 'object' && 'outcomes' in raw) {
    const choice = raw as EventChoice;
    if (Array.isArray(choice.outcomes) && choice.outcomes.length > 0) {
      return choice;
    }
  }
  const old = raw as {
    text?: string;
    result_text?: string;
    health_delta?: number;
    food_delta?: number;
    morale_delta?: number;
    money_delta?: number;
  };
  return {
    text: old.text ?? '',
    outcomes: [{
      probability: 100,
      health_delta: old.health_delta ?? 0,
      food_delta: old.food_delta ?? 0,
      morale_delta: old.morale_delta ?? 0,
      money_delta: old.money_delta ?? 0,
      result_text: old.result_text ?? '',
      force_phase_order: null,
    }],
  };
}

export function EventManager({ phases }: EventManagerProps) {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (phases.length > 0 && !selectedPhase) {
      setSelectedPhase(phases[0].id);
    }
  }, [phases, selectedPhase]);

  const refetchEvents = async (phaseId: string) => {
    const { data } = await supabase
      .from('game_events')
      .select('*')
      .eq('phase_id', phaseId)
      .order('created_at');
    if (data) {
      setEvents(data.map(e => ({
        ...e,
        probability_weight: (e.probability_weight as number | undefined) ?? 50,
        day_weights: (e.day_weights as Record<string, number> | null) ?? null,
        choices: ((typeof e.choices === 'string' ? JSON.parse(e.choices) : e.choices) as unknown[]).map(normalizeChoiceForForm),
      })) as GameEvent[]);
    }
  };

  useEffect(() => {
    if (!selectedPhase) return;
    refetchEvents(selectedPhase);
  }, [selectedPhase]);

  const handleCreateEvent = async (formData: EventFormData) => {
    setLoading(true);
    const { error } = await supabase.from('game_events').insert({
      phase_id: selectedPhase,
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      choices: formData.choices as unknown as Record<string, unknown>[],
      is_active: formData.is_active,
      probability_weight: formData.probability_weight,
      day_weights: serializeDayWeights(formData.day_weights),
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event created' });
      setCreatingEvent(false);
      await refetchEvents(selectedPhase);
    }
    setLoading(false);
  };

  const handleUpdateEvent = async (formData: EventFormData) => {
    if (!editingEvent) return;
    setLoading(true);
    const { error } = await supabase
      .from('game_events')
      .update({
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url || null,
        choices: formData.choices as unknown as Record<string, unknown>[],
        is_active: formData.is_active,
        probability_weight: formData.probability_weight,
        day_weights: serializeDayWeights(formData.day_weights),
      })
      .eq('id', editingEvent.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Event updated' });
      setEditingEvent(null);
      await refetchEvents(selectedPhase);
    }
    setLoading(false);
  };

  const toggleActive = async (event: GameEvent) => {
    await supabase.from('game_events').update({ is_active: !event.is_active }).eq('id', event.id);
    setEvents(prev => prev.map(e => e.id === event.id ? { ...e, is_active: !e.is_active } : e));
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('game_events').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setEvents(prev => prev.filter(e => e.id !== id));
      toast({ title: 'Event deleted' });
    }
  };

  if (phases.length === 0) {
    return (
      <p className="font-retro text-lg text-muted-foreground">
        Create phases first before adding events.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[10px] text-primary">Events</h2>
        {!creatingEvent && !editingEvent && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCreatingEvent(true)}
            className="font-pixel text-[8px] border-border text-foreground hover:bg-muted"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Event
          </Button>
        )}
      </div>

      {/* Phase selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {phases.map(phase => (
          <button
            key={phase.id}
            onClick={() => { setSelectedPhase(phase.id); setEditingEvent(null); setCreatingEvent(false); }}
            className={`font-pixel text-[8px] px-3 py-1.5 rounded-sm border transition-colors whitespace-nowrap ${
              selectedPhase === phase.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {phase.phase_order}. {phase.name}
          </button>
        ))}
      </div>

      {/* Create form */}
      {creatingEvent && (
        <div className="border border-primary/30 rounded-sm p-3 bg-card">
          <p className="font-pixel text-[9px] text-primary mb-3">New Event</p>
          <EventForm
            phases={phases}
            onSubmit={handleCreateEvent}
            onCancel={() => setCreatingEvent(false)}
            loading={loading}
          />
        </div>
      )}

      {/* Edit form */}
      {editingEvent && (
        <div className="border border-primary/30 rounded-sm p-3 bg-card">
          <p className="font-pixel text-[9px] text-primary mb-3">Edit Event</p>
          <EventForm
            phases={phases}
            initialData={{
              title: editingEvent.title,
              description: editingEvent.description,
              image_url: editingEvent.image_url || '',
              choices: editingEvent.choices,
              is_active: editingEvent.is_active,
              probability_weight: editingEvent.probability_weight,
              day_weights: deserializeDayWeights(editingEvent.day_weights),
            }}
            onSubmit={handleUpdateEvent}
            onCancel={() => setEditingEvent(null)}
            loading={loading}
          />
        </div>
      )}

      {/* Event list */}
      {!creatingEvent && !editingEvent && (
        <div className="space-y-2">
          {events.length === 0 ? (
            <p className="font-retro text-lg text-muted-foreground py-4">
              No events for this phase yet. Add some to make the game interesting!
            </p>
          ) : (
            events.map(event => (
              <div
                key={event.id}
                className={`border rounded-sm p-3 bg-card/50 ${event.is_active ? 'border-border' : 'border-border/50 opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[9px] text-foreground">{event.title}</p>
                    <p className="font-retro text-base text-muted-foreground truncate">{event.description}</p>
                    <p className="font-retro text-sm text-muted-foreground/70 mt-1">
                      {event.choices.length} choice{event.choices.length !== 1 ? 's' : ''} · base {event.probability_weight}%
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => toggleActive(event)} className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                      {event.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingEvent(event)} className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
