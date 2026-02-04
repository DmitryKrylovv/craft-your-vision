import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, HelpCircle } from 'lucide-react';
import ploozaLogo from '@/assets/plooza-logo.svg';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mode, email, password, name });
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
    },
    {
      id: 'yandex',
      name: 'Яндекс',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#FC3F1D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15h-2V7h2.5c2.5 0 4 1.5 4 3.5 0 1.5-.8 2.7-2.3 3.2L18 17h-2.3l-2.2-3h-.5v3zm.5-5c1.1 0 2-.7 2-1.5S15.1 9 14 9h-1.5v3H14z" />
        </svg>
      ),
    },
    {
      id: 'vk',
      name: 'VK',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#0077FF" d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.51-.743.673-1.021.673-.139 0-.341-.163-.341-.628V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.259-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.852v-1.966c0-.627.132-.752.574-.752.325 0 .883.163 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.627 0 .939-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.51-.604-1.277-1.254-1.51-1.579-.325-.418-.232-.604 0-.976.001 0 2.672-3.761 2.95-5.04z" />
        </svg>
      ),
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#26A5E4" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ];

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setShowPassword(false);
  };

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    resetForm();
    setMode(newMode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 border-border/50 overflow-hidden">
        <div className="p-6 pb-4">
          {/* Logo & Title */}
          <div className="flex justify-center mb-6">
            {mode === 'forgot' ? (
              <h2 className="text-xl font-semibold text-foreground">
                Восстановление доступа
              </h2>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-lg text-muted-foreground">
                  {mode === 'login' ? 'Вход в' : 'Регистрация в'}
                </span>
                <img src={ploozaLogo} alt="Plooza" className="h-5 w-auto" />
                <span className="text-lg font-bold text-foreground -ml-1">.ID</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[240px] text-center">
                    <p className="text-xs">
                      <span className="font-medium">Plooza.ID</span> — единый аккаунт для всех сервисов платформы: управление серверами, биллинг, поддержка и многое другое.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm">Имя</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 h-10 bg-background"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10 bg-background"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">Пароль</Label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Забыли?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9 h-10 bg-background"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-10 mt-2">
              {mode === 'login' && 'Войти'}
              {mode === 'register' && 'Создать аккаунт'}
              {mode === 'forgot' && 'Отправить ссылку'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Social Login */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-5">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  или
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.id}
                    title={provider.name}
                    className="flex items-center justify-center p-2.5 border border-border rounded-lg bg-background hover:bg-muted transition-colors"
                  >
                    {provider.icon}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border/50 text-center text-sm">
          {mode === 'login' && (
            <p className="text-muted-foreground">
              Нет аккаунта?{' '}
              <button
                onClick={() => switchMode('register')}
                className="text-primary font-medium hover:underline"
              >
                Зарегистрироваться
              </button>
            </p>
          )}
          {mode === 'register' && (
            <>
              <p className="text-muted-foreground">
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-primary font-medium hover:underline"
                >
                  Войти
                </button>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Регистрируясь, вы соглашаетесь с{' '}
                <a href="#" className="hover:underline">условиями</a>
              </p>
            </>
          )}
          {mode === 'forgot' && (
            <button
              onClick={() => switchMode('login')}
              className="text-primary font-medium hover:underline"
            >
              ← Вернуться к входу
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
