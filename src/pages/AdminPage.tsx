import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useGameEvents } from '@/hooks/useGameEvents';
import { PhaseManager } from '@/components/admin/PhaseManager';
import { EventManager } from '@/components/admin/EventManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { ScenePreviewer } from '@/components/admin/ScenePreviewer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const { phases, loading: phasesLoading, refetch } = useGameEvents();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || phasesLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6 bg-background">
        <h1 className="font-pixel text-sm text-primary crt-glow flicker">Vietnam Trail</h1>
        <div className="loading-spinner" />
        <p className="font-retro text-xl text-muted-foreground/35 italic">Loading your journey...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-full bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-pixel text-sm text-primary crt-glow">Admin Panel</h1>
        </div>

        <Tabs defaultValue="phases" className="w-full">
          <TabsList className="bg-muted border border-border w-full">
            <TabsTrigger value="phases" className="font-pixel text-[8px] flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Phases
            </TabsTrigger>
            <TabsTrigger value="events" className="font-pixel text-[8px] flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Events
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-pixel text-[8px] flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Settings
            </TabsTrigger>
            <TabsTrigger value="scenes" className="font-pixel text-[8px] flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Scenes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phases" className="mt-4">
            <PhaseManager phases={phases} onRefresh={refetch} />
          </TabsContent>

          <TabsContent value="events" className="mt-4">
            <EventManager phases={phases} />
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <SettingsManager />
          </TabsContent>

          <TabsContent value="scenes" className="mt-4">
            <ScenePreviewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
