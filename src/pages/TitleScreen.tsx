import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, History, Settings, Play, Plus, X, Volume2, VolumeX, Mic, MicOff, Sliders } from 'lucide-react';
import { useMenuMusic } from '@/hooks/useMenuMusic';

const NARRATION_ENABLED_KEY = 'saigone-narration-enabled';
const NARRATION_VOLUME_KEY = 'saigone-narration-volume';
const MUSIC_VOLUME_KEY = 'saigone-music-volume';

function OptionsModal({ onClose }: { onClose: () => void }) {
  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = localStorage.getItem(MUSIC_VOLUME_KEY);
    return saved ? parseFloat(saved) : 0.3;
  });
  const [narrationEnabled, setNarrationEnabled] = useState(() => {
    return localStorage.getItem(NARRATION_ENABLED_KEY) === 'true';
  });
  const [narrationVolume, setNarrationVolume] = useState(() => {
    const saved = localStorage.getItem(NARRATION_VOLUME_KEY);
    return saved ? parseFloat(saved) : 0.8;
  });

  const saveMusicVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setMusicVolume(clamped);
    localStorage.setItem(MUSIC_VOLUME_KEY, String(clamped));
  };

  const saveNarrationEnabled = () => {
    setNarrationEnabled(prev => {
      const next = !prev;
      localStorage.setItem(NARRATION_ENABLED_KEY, String(next));
      return next;
    });
  };

  const saveNarrationVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setNarrationVolume(clamped);
    localStorage.setItem(NARRATION_VOLUME_KEY, String(clamped));
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75" style={{ backdropFilter: 'blur(4px)' }} />
      <div
        className="relative bg-background border border-primary/50 min-w-[300px] max-w-sm w-full mx-4 overflow-hidden"
        style={{ borderRadius: '4px', boxShadow: '0 0 24px hsl(var(--primary)/0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20" style={{ background: 'hsl(var(--primary)/0.06)' }}>
          <span className="font-pixel text-[10px] text-primary tracking-widest" style={{ textShadow: '0 0 8px hsl(var(--primary)/0.6)' }}>
            OPTIONS
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full text-foreground/40 hover:text-foreground/80 hover:bg-white/8 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Music Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[9px] text-foreground/60 tracking-wide">MUSIC</span>
              <span className="flex items-center gap-1 font-pixel text-[8px] text-primary/60">
                <Volume2 className="w-3 h-3" />
                {Math.round(musicVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(musicVolume * 100)}
              onInput={e => saveMusicVolume(Number((e.target as HTMLInputElement).value) / 100)}
              onChange={e => saveMusicVolume(Number(e.target.value) / 100)}
              className="volume-slider w-full h-2 cursor-pointer"
              style={{ accentColor: 'hsl(var(--primary))' }}
            />
          </div>

          {/* Narration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[9px] text-foreground/60 tracking-wide">NARRATION</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  saveNarrationEnabled();
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded font-pixel text-[8px] text-primary/60 hover:text-primary hover:bg-primary/8 transition-all cursor-pointer"
              >
                {narrationEnabled ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                {narrationEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={narrationEnabled ? Math.round(narrationVolume * 100) : 0}
              onInput={e => saveNarrationVolume(Number((e.target as HTMLInputElement).value) / 100)}
              onChange={e => saveNarrationVolume(Number(e.target.value) / 100)}
              className="volume-slider w-full h-2 cursor-pointer"
              style={{ accentColor: 'hsl(var(--primary))' }}
            />
            <div className="text-right font-pixel text-[7px] text-muted-foreground/30">
              {narrationEnabled ? Math.round(narrationVolume * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TitleScreen() {
  const navigate = useNavigate();
  const { user, profile, loading, signOut, isAdmin } = useAuth();
  const [hasSave, setHasSave] = useState(false);
  const [checkingSave, setCheckingSave] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  useMenuMusic();

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
      <div className="h-full flex flex-col items-center justify-center gap-6 bg-background">
        <h1 className="font-pixel text-sm text-primary crt-glow flicker">Vietnam Trail</h1>
        <div className="loading-spinner" />
        <p className="font-retro text-xl text-muted-foreground/35 italic">Loading your journey...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
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
        <div className="space-y-3">
            <p className="font-retro text-lg text-muted-foreground">
              Welcome, <span className="text-primary">{profile?.username || user.email}</span>
            </p>

            {hasSave && (
              <Button
                onClick={() => navigate('/game?continue=true')}
                className="w-full font-pixel text-[10px] h-12"
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Journey
              </Button>
            )}

            <Button
              onClick={() => navigate('/game')}
              variant="outline"
              className="w-full font-pixel text-[10px] h-12"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Journey
            </Button>

            <Button
              onClick={() => navigate('/history')}
              variant="outline"
              className="w-full font-pixel text-[10px] h-12"
            >
              <History className="w-4 h-4 mr-2" />
              Journey History
            </Button>

            <Button
              onClick={() => setShowOptions(true)}
              variant="outline"
              className="w-full font-pixel text-[10px] h-12"
            >
              <Sliders className="w-4 h-4 mr-2" />
              Options
            </Button>

            {isAdmin && (
              <Button
                onClick={() => navigate('/admin')}
                variant="outline"
                className="w-full font-pixel text-[10px] h-12"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            )}

            <div className="pt-2">
              <Button
                onClick={signOut}
                variant="ghost"
                className="font-retro text-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border/30">
          <p className="font-retro text-sm text-muted-foreground/50">
            Based on the real experiences of Vietnamese refugees
          </p>
        </div>
      </div>

      {showOptions && <OptionsModal onClose={() => setShowOptions(false)} />}
    </div>
  );
}
