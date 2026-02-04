import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';

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
    // TODO: Implement auth logic
    console.log({ mode, email, password, name });
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      color: 'hover:bg-red-50 hover:border-red-200 hover:text-red-600',
    },
    {
      id: 'yandex',
      name: 'Яндекс',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15h-2V7h2.5c2.5 0 4 1.5 4 3.5 0 1.5-.8 2.7-2.3 3.2L18 17h-2.3l-2.2-3h-.5v3zm.5-5c1.1 0 2-.7 2-1.5S15.1 9 14 9h-1.5v3H14z"
          />
        </svg>
      ),
      color: 'hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-600',
    },
    {
      id: 'vk',
      name: 'VK',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.51-.743.673-1.021.673-.139 0-.341-.163-.341-.628V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.259-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.852v-1.966c0-.627.132-.752.574-.752.325 0 .883.163 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.627 0 .939-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.51-.604-1.277-1.254-1.51-1.579-.325-.418-.232-.604 0-.976.001 0 2.672-3.761 2.95-5.04z"
          />
        </svg>
      ),
      color: 'hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
          />
        </svg>
      ),
      color: 'hover:bg-sky-50 hover:border-sky-400 hover:text-sky-500',
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
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-background border-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">
              {mode === 'login' && 'Добро пожаловать!'}
              {mode === 'register' && 'Создать аккаунт'}
              {mode === 'forgot' && 'Восстановление пароля'}
            </DialogTitle>
            <p className="text-blue-100 text-center text-sm mt-1">
              {mode === 'login' && 'Войдите, чтобы продолжить'}
              {mode === 'register' && 'Зарегистрируйтесь бесплатно'}
              {mode === 'forgot' && 'Введите email для восстановления'}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Имя</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 bg-muted/50 border-border focus:bg-background"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-muted/50 border-border focus:bg-background"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Пароль</Label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-primary hover:underline"
                    >
                      Забыли пароль?
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
                    className="pl-10 pr-10 h-11 bg-muted/50 border-border focus:bg-background"
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

            <Button
              type="submit"
              className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl gap-2"
            >
              {mode === 'login' && 'Войти'}
              {mode === 'register' && 'Создать аккаунт'}
              {mode === 'forgot' && 'Отправить ссылку'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Social Login Buttons */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                  или через соц сети
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.id}
                    className={`flex items-center justify-center gap-2 p-3 border border-border rounded-xl bg-background transition-all duration-200 ${provider.color}`}
                  >
                    {provider.icon}
                    <span className="text-sm font-medium">{provider.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
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
              <p className="text-muted-foreground">
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-primary font-medium hover:underline"
                >
                  Войти
                </button>
              </p>
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

          {/* Terms */}
          {mode === 'register' && (
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Регистрируясь, вы соглашаетесь с{' '}
              <a href="#" className="text-primary hover:underline">условиями использования</a>
              {' '}и{' '}
              <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
