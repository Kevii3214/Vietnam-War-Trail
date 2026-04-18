import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-center p-6 relative scanlines">
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
  );
}
