import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { EventChoice } from '@/hooks/useGameEvents';

interface EventFormData {
  title: string;
  description: string;
  image_url: string;
  choices: EventChoice[];
  is_active: boolean;
}

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const EMPTY_CHOICE: EventChoice = {
  text: '',
  health_delta: 0,
  food_delta: 0,
  morale_delta: 0,
  money_delta: 0,
  result_text: '',
};

export function EventForm({ initialData, onSubmit, onCancel, loading }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
      title: '',
      description: '',
      image_url: '',
      choices: [{ ...EMPTY_CHOICE }, { ...EMPTY_CHOICE }],
      is_active: true,
    }
  );

  const updateChoice = (index: number, field: keyof EventChoice, value: string | number) => {
    const newChoices = [...formData.choices];
    newChoices[index] = { ...newChoices[index], [field]: value };
    setFormData({ ...formData, choices: newChoices });
  };

  const addChoice = () => {
    setFormData({ ...formData, choices: [...formData.choices, { ...EMPTY_CHOICE }] });
  };

  const removeChoice = (index: number) => {
    if (formData.choices.length <= 2) return;
    setFormData({ ...formData, choices: formData.choices.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
          Event Title
        </label>
        <Input
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground"
          placeholder="A stranger approaches..."
        />
      </div>

      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
          className="font-retro text-lg bg-muted border-border text-foreground min-h-[100px]"
          placeholder="Describe what happens in this event..."
        />
      </div>

      <div>
        <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
          Image URL (optional)
        </label>
        <Input
          value={formData.image_url}
          onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          className="font-retro text-lg bg-muted border-border text-foreground"
          placeholder="https://..."
        />
      </div>

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
            Choices
          </label>
          <Button type="button" variant="ghost" size="sm" onClick={addChoice} className="text-primary">
            <Plus className="w-3 h-3 mr-1" /> Add Choice
          </Button>
        </div>

        {formData.choices.map((choice, i) => (
          <div key={i} className="border border-border rounded-sm p-3 space-y-2 bg-muted/20">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[8px] text-primary">Choice {i + 1}</span>
              {formData.choices.length > 2 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeChoice(i)} className="text-destructive h-6 w-6 p-0">
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            <Input
              value={choice.text}
              onChange={e => updateChoice(i, 'text', e.target.value)}
              required
              className="font-retro text-base bg-muted border-border text-foreground"
              placeholder="Choice text..."
            />

            <Input
              value={choice.result_text}
              onChange={e => updateChoice(i, 'result_text', e.target.value)}
              required
              className="font-retro text-base bg-muted border-border text-foreground"
              placeholder="Result text after choosing..."
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-retro text-sm text-game-health">Health</label>
                <Input
                  type="number"
                  value={choice.health_delta}
                  onChange={e => updateChoice(i, 'health_delta', parseInt(e.target.value) || 0)}
                  className="font-retro text-base bg-muted border-border text-foreground h-8"
                />
              </div>
              <div>
                <label className="font-retro text-sm text-game-food">Food</label>
                <Input
                  type="number"
                  value={choice.food_delta}
                  onChange={e => updateChoice(i, 'food_delta', parseInt(e.target.value) || 0)}
                  className="font-retro text-base bg-muted border-border text-foreground h-8"
                />
              </div>
              <div>
                <label className="font-retro text-sm text-game-morale">Morale</label>
                <Input
                  type="number"
                  value={choice.morale_delta}
                  onChange={e => updateChoice(i, 'morale_delta', parseInt(e.target.value) || 0)}
                  className="font-retro text-base bg-muted border-border text-foreground h-8"
                />
              </div>
              <div>
                <label className="font-retro text-sm text-game-money">Money</label>
                <Input
                  type="number"
                  value={choice.money_delta}
                  onChange={e => updateChoice(i, 'money_delta', parseInt(e.target.value) || 0)}
                  className="font-retro text-base bg-muted border-border text-foreground h-8"
                />
              </div>
            </div>
          </div>
        ))}
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
