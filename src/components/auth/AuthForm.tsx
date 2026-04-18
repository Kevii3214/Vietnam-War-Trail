import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        onSuccess();
      }
    } else {
      const { error } = await signUp(email, password, username);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Account created', description: 'Welcome to Vietnam Trail.' });
        onSuccess();
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-pixel text-sm text-primary crt-glow">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="font-retro text-lg text-muted-foreground">
          {isLogin ? 'Enter your credentials to continue' : 'Join the journey'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Your name"
              required={!isLogin}
              className="font-retro text-lg bg-muted border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
        )}

        <div>
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="font-retro text-lg bg-muted border-border text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        <div>
          <label className="font-pixel text-[8px] text-muted-foreground uppercase tracking-wider">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            minLength={6}
            className="font-retro text-lg bg-muted border-border text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full font-pixel text-[10px] bg-primary text-primary-foreground hover:bg-primary/80"
        >
          {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-retro text-lg text-muted-foreground hover:text-primary transition-colors"
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
