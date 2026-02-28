import { useState } from 'react';
import { Menu, Search, Phone, MapPin, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import ProductsMenu from '@/components/header/ProductsMenu';
import SearchFilter from '@/components/header/SearchFilter';
import LocationSelector from '@/components/header/LocationSelector';
import AuthModal from '@/components/header/AuthModal';
import ploozaLogo from '@/assets/plooza-logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Москва');

  return (
    <>
      <header className="sticky top-0 z-50 bg-background">
        {/* Top utility bar */}
        <div className="bg-foreground text-background">
          <div className="container">
            <div className="flex items-center justify-between h-9 text-xs">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsLocationOpen(true)}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <Link to="/for-providers" className="hover:opacity-80 transition-opacity">Для провайдеров</Link>
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
              <Link to="/" className="flex-shrink-0">
                <img src={ploozaLogo} alt="Plooza" className="h-8" />
              </Link>

              {/* Products Menu Button - Desktop */}
              <div className="hidden md:block">
                <ProductsMenu
                  isOpen={isProductsOpen}
                  onOpenChange={setIsProductsOpen}
                />
              </div>

              {/* Search Button - Desktop & Tablet */}
              <button
                onClick={() => navigate('/search')}
                className="hidden md:flex items-center gap-2 lg:gap-3 flex-1 max-w-[180px] lg:max-w-xs xl:max-w-md px-4 py-3 bg-muted rounded-xl text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Поиск провайдеров...</span>
                <kbd className="ml-auto hidden xl:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground flex-shrink-0">
                  ⌘K
                </kbd>
              </button>

              {/* Quick Links - Desktop */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link to="/providers" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted whitespace-nowrap">
                  Рейтинг провайдеров
                </Link>
                <a href="#" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted whitespace-nowrap">
                  Сравнить
                </a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted whitespace-nowrap">
                  Отзывы
                </a>
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center ml-auto">
                <Button 
                  size="sm" 
                  className="text-sm font-medium gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-primary-foreground"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <User className="w-4 h-4" />
                  Войти
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-2 ml-auto">
                <button
                  onClick={() => navigate('/search')}
                  className="p-2.5 hover:bg-muted rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button className="p-2.5 hover:bg-muted rounded-lg transition-colors">
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] p-0">
                    <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Filter Modal */}
      <SearchFilter isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />

      {/* Location Selector Modal */}
      <LocationSelector 
        isOpen={isLocationOpen} 
        onOpenChange={setIsLocationOpen}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
};

// Mobile Menu Component
const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const mobileCategories = [
    {
      id: 'hosting',
      label: 'Хостинг',
      items: [
        { title: 'Виртуальный хостинг', href: '/hosting' },
        { title: 'WordPress хостинг', href: '/hosting' },
        { title: 'DNS-хостинг', href: '/dns' },
      ],
    },
    {
      id: 'vps',
      label: 'VPS серверы',
      items: [
        { title: 'VPS на SSD', href: '/vds' },
        { title: 'VPS на NVMe', href: '/vds' },
        { title: 'High-CPU VPS', href: '/vds' },
      ],
    },
    {
      id: 'domains',
      label: 'Домены',
      items: [
        { title: 'Регистрация', href: '/domains' },
        { title: 'Трансфер', href: '/domains' },
      ],
    },
    {
      id: 'ssl',
      label: 'SSL-сертификаты',
      items: [
        { title: 'Бесплатный SSL', href: '/ssl' },
        { title: 'Коммерческий SSL', href: '/ssl' },
      ],
    },
    {
      id: 'services',
      label: 'Сервисы',
      items: [
        { title: 'Выделенные серверы', href: '/dedicated' },
        { title: 'Колокация', href: '/colocation' },
        { title: 'Облачные сервисы', href: '/cloud' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="p-4 border-b border-border">
        <img src={ploozaLogo} alt="Plooza" className="h-7" />
      </div>

      {/* Mobile Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
          Каталог услуг
        </div>
        {mobileCategories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <span>{category.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
            </button>
            {expandedCategory === category.id && (
              <div className="ml-4 space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="border-t border-border mt-4 pt-4">
          <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
            Навигация
          </div>
          <Link to="/providers" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Рейтинг провайдеров
          </Link>
          <a href="#" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Сравнить тарифы
          </a>
          <a href="#" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Отзывы
          </a>
          <Link to="/blog" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Блог
          </Link>
          <Link to="/pay" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Pay
          </Link>
          <Link to="/smart-hands/careers" className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors" onClick={onClose}>
            Для инженеров
          </Link>
        </div>
      </nav>

      {/* Mobile Footer */}
      <div className="p-4 border-t border-border space-y-3">
        <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Phone className="w-4 h-4" />
          8 800 123-45-67
        </a>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-primary-foreground" 
          size="sm"
          onClick={() => {
            onClose();
            // Note: Auth modal will be triggered from parent
          }}
        >
          <User className="w-4 h-4 mr-2" />
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Header;
