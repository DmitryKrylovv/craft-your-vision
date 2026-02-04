import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenLine, Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthModal from '@/components/header/AuthModal';

const BlogHeader = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isLoggedIn = false; // TODO: Replace with actual auth state

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Back + Logo */}
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">На сайт</span>
              </Link>
              
              <div className="w-px h-6 bg-border hidden sm:block" />
              
              <Link to="/blog" className="flex items-center gap-2">
                <img src="/plooza-logo.svg" alt="Plooza" className="h-7" />
                <span className="font-semibold text-foreground">Блог</span>
              </Link>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Поиск статей..." 
                  className="pl-10 bg-muted/50 border-transparent focus:border-primary"
                />
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>

              {/* Write Article */}
              <Button className="hidden sm:flex gap-2" onClick={() => !isLoggedIn && setIsAuthModalOpen(true)}>
                <PenLine className="w-4 h-4" />
                <span className="hidden lg:inline">Написать статью</span>
              </Button>
              <Button size="icon" className="sm:hidden" onClick={() => !isLoggedIn && setIsAuthModalOpen(true)}>
                <PenLine className="w-4 h-4" />
              </Button>

              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2">
                        <div className="font-medium text-foreground">Гость</div>
                        <div className="text-sm text-muted-foreground">guest@plooza.ru</div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/blog/profile/guest">Мой профиль</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Мои статьи</DropdownMenuItem>
                      <DropdownMenuItem>Закладки</DropdownMenuItem>
                      <DropdownMenuItem>Настройки</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button variant="outline" className="gap-2" onClick={() => setIsAuthModalOpen(true)}>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Войти</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
};

export default BlogHeader;
