import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, ChevronDown, FileText, Briefcase, MapPin, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ploozaLogo from '@/assets/plooza-logo.svg';

const FreelanceHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/freelance/vacancies', label: 'Вакансии' },
    { href: '/freelance/specialists', label: 'Специалисты' },
    { href: '/freelance/companies', label: 'Компании' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Top utility bar - same as main site */}
      <div className="bg-foreground text-background">
        <div className="container">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <MapPin className="w-3 h-3" />
                <span>Москва</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <Link to="/" className="hover:opacity-80 transition-opacity">Главная</Link>
              <Link to="/providers" className="hover:opacity-80 transition-opacity">Провайдеры</Link>
              <Link to="/blog" className="hover:opacity-80 transition-opacity">Блог</Link>
              <Link to="/help" className="hover:opacity-80 transition-opacity">Помощь</Link>
              <a href="tel:+78001234567" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium">
                <Phone className="w-3 h-3" />
                8 800 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-background">
        <div className="container">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/freelance" className="flex items-center gap-2 flex-shrink-0">
              <img src={ploozaLogo} alt="Plooza" className="h-8" />
              <span className="font-semibold text-primary text-lg">Jobs</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Разместить
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link to="/freelance/create-resume" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      Резюме
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/freelance/post-vacancy" className="flex items-center gap-2 cursor-pointer">
                      <Briefcase className="w-4 h-4" />
                      Вакансию
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Войти
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden ml-auto">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-border">
                      <Link to="/freelance" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src={ploozaLogo} alt="Plooza" className="h-6" />
                        <span className="font-semibold text-primary">Jobs</span>
                      </Link>
                    </div>
                    
                    <nav className="flex-1 p-4 space-y-1">
                      <Link
                        to="/freelance"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          location.pathname === '/freelance'
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        Главная
                      </Link>
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            isActive(link.href)
                              ? 'text-primary bg-primary/10'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                      
                      <div className="pt-4 border-t border-border mt-4">
                        <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Разместить</p>
                        <Link
                          to="/freelance/create-resume"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Резюме
                        </Link>
                        <Link
                          to="/freelance/post-vacancy"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <Briefcase className="w-4 h-4" />
                          Вакансию
                        </Link>
                      </div>
                    </nav>

                    <div className="p-4 border-t border-border">
                      <Button className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Войти
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FreelanceHeader;
