import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Skull, Flag } from 'lucide-react';

interface GameRun {
  id: string;
  outcome: string;
  final_phase: number;
  final_day: number;
  final_stats: Record<string, number>;
  completed_at: string;
}

const PHASE_NAMES = ['', 'Escaping Vietnam', 'Traveling by Boat', 'Refugee Camp', 'Making it to America'];

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [runs, setRuns] = useState<GameRun[]>([]);
  const [loadingRuns, setLoadingRuns] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchRuns = async () => {
      const { data } = await supabase
        .from('game_runs')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });
      setRuns((data as unknown as GameRun[]) || []);
      setLoadingRuns(false);
    };
    fetchRuns();
  }, [user]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="font-pixel text-sm text-primary crt-glow flicker">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background p-4 md:p-6 relative scanlines">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-pixel text-sm text-primary crt-glow">Journey History</h1>
        </div>

        {loadingRuns ? (
          <p className="font-retro text-lg text-muted-foreground">Loading history...</p>
        ) : runs.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-retro text-xl text-muted-foreground">No journeys recorded yet.</p>
            <p className="font-retro text-lg text-muted-foreground/70 mt-2">
              Complete or fail a journey to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {runs.map(run => (
              <div
                key={run.id}
                className="border border-border rounded-sm p-4 bg-card/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {run.outcome === 'completed' ? (
                      <Trophy className="w-4 h-4 text-primary" />
                    ) : run.outcome === 'died' ? (
                      <Skull className="w-4 h-4 text-destructive" />
                    ) : (
                      <Flag className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={`font-pixel text-[10px] ${
                      run.outcome === 'completed' ? 'text-primary' :
                      run.outcome === 'died' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {run.outcome === 'completed' ? 'SUCCESS' :
                       run.outcome === 'died' ? 'PERISHED' : 'GAVE UP'}
                    </span>
                  </div>
                  <span className="font-retro text-sm text-muted-foreground">
                    {new Date(run.completed_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="font-retro text-lg text-foreground/80">
                  Reached {PHASE_NAMES[run.final_phase] || 'Unknown'}, Day {run.final_day}
                </p>

                {run.final_stats && (
                  <div className="flex gap-3 font-retro text-sm">
                    <span className="text-game-health">HP: {run.final_stats.health ?? '?'}</span>
                    <span className="text-game-food">Food: {run.final_stats.food ?? '?'}</span>
                    <span className="text-game-morale">Morale: {run.final_stats.morale ?? '?'}</span>
                    <span className="text-game-money">$: {run.final_stats.money ?? '?'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
