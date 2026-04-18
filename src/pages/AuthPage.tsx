import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { CinematicBackground } from '@/components/auth/CinematicBackground';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-full relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Animated pixel-art background */}
      <CinematicBackground />

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
        }}
      />

      {/* Dark vignette so the form stays readable */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full">
        <div className="mb-8 text-center">
          <h1 className="font-pixel text-lg md:text-xl text-primary crt-glow flicker mb-2">
            Vietnam Trail
          </h1>
          <p className="font-retro text-xl text-muted-foreground">
            The journey of a lifetime
          </p>
        </div>
        <AuthForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
}
