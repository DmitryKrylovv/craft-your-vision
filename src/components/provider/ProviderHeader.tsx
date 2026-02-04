import { Link } from 'react-router-dom';
import { useProviderRole } from '@/contexts/ProviderRoleContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Bell,
  Menu,
  Settings,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';
import { useState } from 'react';

interface ProviderHeaderProps {
  onMenuClick?: () => void;
}

const ProviderHeader = ({ onMenuClick }: ProviderHeaderProps) => {
  const { currentUser } = useProviderRole();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 bg-background border-b border-border px-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Logo */}
        <Link to="/provider-panel" className="flex items-center gap-2">
          <img 
            src="/plooza-logo.svg" 
            alt="Plooza" 
            className="h-7"
          />
          <Badge variant="secondary" className="text-xs">
            Провайдер
          </Badge>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* View public page */}
        <Button variant="ghost" size="sm" className="hidden sm:flex gap-2" asChild>
          <Link to="/provider/cloudpro">
            <ExternalLink className="w-4 h-4" />
            Публичная страница
          </Link>
        </Button>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">
                {currentUser.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/provider-panel/settings" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/" className="cursor-pointer text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ProviderHeader;
