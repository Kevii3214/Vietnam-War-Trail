import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { GameEngine } from '@/components/game/GameEngine';
import { useEffect } from 'react';

export default function GamePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const continueGame = searchParams.get('continue') === 'true';

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="font-pixel text-sm text-primary crt-glow flicker">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      <GameEngine
        userId={user.id}
        onMainMenu={() => navigate('/')}
        loadExistingSave={continueGame}
      />
    </div>
  );
}
