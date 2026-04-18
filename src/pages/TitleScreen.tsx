import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, History, Settings, Play, Plus } from 'lucide-react';

export default function TitleScreen() {
  const navigate = useNavigate();
  const { user, profile, loading, signOut, isAdmin } = useAuth();
  const [hasSave, setHasSave] = useState(false);
  const [checkingSave, setCheckingSave] = useState(true);

  useEffect(() => {
    const checkSave = async () => {
      if (!user) {
        setCheckingSave(false);
        return;
      }
      const { data } = await supabase
        .from('game_saves')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      setHasSave(!!data);
      setCheckingSave(false);
    };
    if (!loading) checkSave();
  }, [user, loading]);

  if (loading || checkingSave) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="font-pixel text-sm text-primary crt-glow flicker">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-center p-6 relative scanlines">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="font-pixel text-xl md:text-2xl text-primary crt-glow flicker leading-relaxed">
            Vietnam Trail
          </h1>
          <div className="border-t border-border w-24 mx-auto" />
          <p className="font-retro text-xl md:text-2xl text-muted-foreground">
            A journey through the Vietnam War diaspora
          </p>
        </div>

        {/* Menu */}
        {user ? (
          <div className="space-y-3">
            <p className="font-retro text-lg text-muted-foreground">
              Welcome, <span className="text-primary">{profile?.username || user.email}</span>
            </p>

            {hasSave && (
              <Button
                onClick={() => navigate('/game?continue=true')}
                className="w-full font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80 h-12"
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Journey
              </Button>
            )}

            <Button
              onClick={() => navigate('/game')}
              variant="outline"
              className="w-full font-pixel text-[10px] border-border text-foreground hover:bg-muted h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Journey
            </Button>

            <Button
              onClick={() => navigate('/history')}
              variant="outline"
              className="w-full font-pixel text-[10px] border-border text-foreground hover:bg-muted h-12"
            >
              <History className="w-4 h-4 mr-2" />
              Journey History
            </Button>

            {isAdmin && (
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                className="w-full font-pixel text-[10px] border-border text-secondary hover:bg-muted h-12"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            )}

            <div className="pt-2">
              <Button
                onClick={signOut}
                variant="ghost"
                className="font-retro text-lg text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/auth')}
              className="w-full font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80 h-12"
            >
              Sign In / Sign Up
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-border/30">
          <p className="font-retro text-sm text-muted-foreground/50">
            Based on the real experiences of Vietnamese refugees
          </p>
        </div>
      </div>
    </div>
  );
}
