import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import type { EventChoice, EventOutcome, GamePhase } from '@/hooks/useGameEvents';

interface DayWeight {
  day: number;
  probability: number;
}

interface EventFormData {
  title: string;
  description: string;
  image_url: string;
  choices: EventChoice[];
  is_active: boolean;
  probability_weight: number;
  day_weights: DayWeight[];
}

interface EventFormProps {
  initialData?: EventFormData;
  phases: GamePhase[];
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const EMPTY_OUTCOME: EventOutcome = {
  probability: 100,
  health_delta: 0,
  food_delta: 0,
  morale_delta: 0,
  money_delta: 0,
  result_text: '',
  force_phase_order: null,
};

const EMPTY_CHOICE: EventChoice = {
  text: '',
  outcomes: [{ ...EMPTY_OUTCOME }],
};

export type { EventFormData };

export function EventForm({ initialData, phases, onSubmit, onCancel, loading }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData ?? {
      title: '',
      description: '',
      image_url: '',
      choices: [{ ...EMPTY_CHOICE }, { ...EMPTY_CHOICE }],
      is_active: true,
      probability_weight: 50,
      day_weights: [],
    }
  );

  // --- Choice helpers ---
  const updateChoiceText = (ci: number, text: string) => {
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], text };
    setFormData({ ...formData, choices });
  };

  const addChoice = () => {
    setFormData({ ...formData, choices: [...formData.choices, { ...EMPTY_CHOICE, outcomes: [{ ...EMPTY_OUTCOME }] }] });
  };

  const removeChoice = (ci: number) => {
    if (formData.choices.length <= 2) return;
    setFormData({ ...formData, choices: formData.choices.filter((_, i) => i !== ci) });
  };

  // --- Outcome helpers ---
  const updateOutcome = (ci: number, oi: number, field: keyof EventOutcome, value: string | number | null) => {
    const choices = [...formData.choices];
    const outcomes = [...choices[ci].outcomes];
    outcomes[oi] = { ...outcomes[oi], [field]: value };
    choices[ci] = { ...choices[ci], outcomes };
    setFormData({ ...formData, choices });
  };

  const addOutcome = (ci: number) => {
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], outcomes: [...choices[ci].outcomes, { ...EMPTY_OUTCOME, probability: 0 }] };
    setFormData({ ...formData, choices });
  };

  const removeOutcome = (ci: number, oi: number) => {
    if (formData.choices[ci].outcomes.length <= 1) return;
    const choices = [...formData.choices];
    choices[ci] = { ...choices[ci], outcomes: choices[ci].outcomes.filter((_, i) => i !== oi) };
    setFormData({ ...formData, choices });
  };

  // --- Day weight helpers ---
  const addDayWeight = () => {
    setFormData({ ...formData, day_weights: [...formData.day_weights, { day: 1, probability: 50 }] });
  };

  const updateDayWeight = (index: number, field: keyof DayWeight, value: number) => {
    const dw = [...formData.day_weights];
    dw[index] = { ...dw[index], [field]: value };
    setFormData({ ...formData, day_weights: dw });
  };

  const removeDayWeight = (index: number) => {
    setFormData({ ...formData, day_weights: formData.day_weights.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Event Title</label>
        <Input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground"
          placeholder="A stranger approaches..."
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Description</label>
        <Textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground min-h-[80px]"
          placeholder="Describe what happens..."
        />
      </div>

      {/* Image */}
      <ImageUpload
        value={formData.image_url}
        onChange={url => setFormData({ ...formData, image_url: url })}
        folder="events"
      />

      {/* Active toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
          className="rounded border-border"
          id="is_active"
        />
        <label htmlFor="is_active" className="font-retro text-lg text-foreground">Active</label>
      </div>

      {/* Base Probability */}
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
          Base Probability (0–100)
        </label>
        <Input
          type="number"
          min={0}
          max={100}
          value={formData.probability_weight}
          onChange={e => setFormData({ ...formData, probability_weight: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
          className="font-retro text-base bg-muted border-border text-foreground h-8 w-28"
        />
        <p className="font-retro text-sm text-muted-foreground mt-0.5">
          Used when no day-specific weight is set.
        </p>
      </div>

      {/* Day Weights */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Day Weights</label>
          <Button type="button" variant="ghost" size="sm" onClick={addDayWeight} className="text-primary font-pixel text-[8px] h-6 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Day Weight
          </Button>
        </div>
        {formData.day_weights.length === 0 && (
          <p className="font-retro text-sm text-muted-foreground/60">No day-specific weights. All days use the base probability above.</p>
        )}
        {formData.day_weights.map((dw, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-retro text-sm text-muted-foreground w-8 shrink-0">Day</span>
            <Input
              type="number"
              min={1}
              value={dw.day}
              onChange={e => updateDayWeight(i, 'day', parseInt(e.target.value) || 1)}
              className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
            />
            <span className="font-retro text-sm text-muted-foreground shrink-0">→</span>
            <Input
              type="number"
              min={0}
              max={100}
              value={dw.probability}
              onChange={e => updateDayWeight(i, 'probability', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
            />
            <span className="font-retro text-sm text-muted-foreground shrink-0">%</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeDayWeight(i)} className="text-destructive h-6 w-6 p-0 ml-auto">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Choices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">Choices</label>
          <Button type="button" variant="ghost" size="sm" onClick={addChoice} className="text-primary font-pixel text-[8px] h-6 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Choice
          </Button>
        </div>

        {formData.choices.map((choice, ci) => {
          const probabilitySum = choice.outcomes.reduce((s, o) => s + o.probability, 0);
          const sumWarning = probabilitySum !== 100;

          return (
            <div key={ci} className="border border-border rounded-sm p-3 space-y-3 bg-muted/20">
              {/* Choice header */}
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[8px] text-primary">Choice {ci + 1}</span>
                {formData.choices.length > 2 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeChoice(ci)} className="text-destructive h-6 w-6 p-0">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Choice text */}
              <Input
                value={choice.text}
                onChange={e => updateChoiceText(ci, e.target.value)}
                required
                className="font-retro text-base bg-muted border-border text-foreground"
                placeholder="Choice text shown to player..."
              />

              {/* Outcomes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider">Outcomes</span>
                    <span className={`font-pixel text-[7px] ${sumWarning ? 'text-amber-400' : 'text-green-500'}`}>
                      {probabilitySum}/100
                    </span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => addOutcome(ci)} className="text-primary font-pixel text-[7px] h-5 px-1.5">
                    <Plus className="w-2.5 h-2.5 mr-0.5" /> Add Outcome
                  </Button>
                </div>

                {choice.outcomes.map((outcome, oi) => (
                  <div key={oi} className="border border-border/50 rounded-sm p-2 space-y-2 bg-background/40">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-[7px] text-muted-foreground shrink-0">Probability</span>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={outcome.probability}
                        onChange={e => updateOutcome(ci, oi, 'probability', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="font-retro text-base bg-muted border-border text-foreground h-7 w-16"
                      />
                      <span className="font-retro text-sm text-muted-foreground shrink-0">%</span>
                      {choice.outcomes.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeOutcome(ci, oi)} className="text-destructive h-6 w-6 p-0 ml-auto">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    <Input
                      value={outcome.result_text}
                      onChange={e => updateOutcome(ci, oi, 'result_text', e.target.value)}
                      required
                      className="font-retro text-base bg-muted border-border text-foreground"
                      placeholder="Result text shown after choosing..."
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-retro text-sm text-game-health">Health</label>
                        <Input
                          type="number"
                          value={outcome.health_delta}
                          onChange={e => updateOutcome(ci, oi, 'health_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-food">Food</label>
                        <Input
                          type="number"
                          value={outcome.food_delta}
                          onChange={e => updateOutcome(ci, oi, 'food_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-morale">Morale</label>
                        <Input
                          type="number"
                          value={outcome.morale_delta}
                          onChange={e => updateOutcome(ci, oi, 'morale_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                      <div>
                        <label className="font-retro text-sm text-game-money">Money</label>
                        <Input
                          type="number"
                          value={outcome.money_delta}
                          onChange={e => updateOutcome(ci, oi, 'money_delta', parseInt(e.target.value) || 0)}
                          className="font-retro text-base bg-muted border-border text-foreground h-8"
                        />
                      </div>
                    </div>

                    {/* Force Phase */}
                    <div>
                      <label className="font-pixel text-[7px] text-muted-foreground uppercase tracking-wider">Force Phase Skip</label>
                      <select
                        value={outcome.force_phase_order ?? ''}
                        onChange={e => updateOutcome(ci, oi, 'force_phase_order', e.target.value === '' ? null : parseInt(e.target.value))}
                        className="w-full mt-0.5 font-retro text-base bg-muted border border-border text-foreground h-8 rounded-sm px-2"
                      >
                        <option value="">None</option>
                        {phases.map(phase => (
                          <option key={phase.id} value={phase.phase_order}>
                            Phase {phase.phase_order}: {phase.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80"
        >
          {loading ? 'Saving...' : 'Save Event'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="font-pixel text-[10px] border-border text-foreground hover:bg-muted"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
