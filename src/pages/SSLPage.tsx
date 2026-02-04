import { useState, useMemo } from 'react';
import { ShieldCheck, Filter, LayoutGrid, List, ChevronDown, Lock, Globe2, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SSLProviderBar from '@/components/ssl/SSLProviderBar';
import SSLFilters from '@/components/ssl/SSLFilters';
import SSLTariffCard from '@/components/ssl/SSLTariffCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock data
const sslTariffs = [
  { id: '1', provider: 'Sectigo', name: 'PositiveSSL', type: 'DV' as const, domains: 1, wildcard: false, warranty: 10000, price: 990, features: ['Быстрая выдача'] },
  { id: '2', provider: 'Sectigo', name: 'PositiveSSL Wildcard', type: 'DV' as const, domains: -1, wildcard: true, warranty: 10000, price: 4990, highlight: true, features: ['Все поддомены'] },
  { id: '3', provider: 'Sectigo', name: 'InstantSSL', type: 'OV' as const, domains: 1, wildcard: false, warranty: 50000, price: 3500, features: ['Проверка организации'] },
  { id: '4', provider: 'DigiCert', name: 'Standard SSL', type: 'OV' as const, domains: 1, wildcard: false, warranty: 1250000, price: 12000, features: ['Премиум бренд'] },
  { id: '5', provider: 'DigiCert', name: 'EV SSL', type: 'EV' as const, domains: 1, wildcard: false, warranty: 1750000, price: 25000, features: ['Зелёная строка'] },
  { id: '6', provider: 'GlobalSign', name: 'DomainSSL', type: 'DV' as const, domains: 1, wildcard: false, warranty: 10000, price: 2200, features: ['Автоматическая выдача'] },
  { id: '7', provider: 'GlobalSign', name: 'OrganizationSSL', type: 'OV' as const, domains: 1, wildcard: false, warranty: 1250000, price: 8500, highlight: true, features: ['Проверка бизнеса'] },
  { id: '8', provider: 'Thawte', name: 'SSL123', type: 'DV' as const, domains: 1, wildcard: false, warranty: 500000, price: 3200, features: ['Быстрая выдача'] },
  { id: '9', provider: 'Thawte', name: 'SSL Web Server', type: 'OV' as const, domains: 1, wildcard: false, warranty: 1250000, price: 9800, features: ['Бизнес валидация'] },
  { id: '10', provider: 'RapidSSL', name: 'Standard', type: 'DV' as const, domains: 1, wildcard: false, warranty: 10000, price: 890, features: ['Бюджетный вариант'] },
  { id: '11', provider: 'RapidSSL', name: 'Wildcard', type: 'DV' as const, domains: -1, wildcard: true, warranty: 10000, price: 5500, features: ['Все поддомены'] },
  { id: '12', provider: "Let's Encrypt", name: 'Free SSL', type: 'DV' as const, domains: 1, wildcard: false, warranty: 0, price: 0, features: ['Бесплатно', 'Автообновление'] },
];

const MAX_PRICE = 25000;
const CERT_TYPES = ['DV', 'OV', 'EV'];

type SortOption = 'price-asc' | 'price-desc' | 'warranty-asc' | 'warranty-desc';

const SSLPage = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  
  // Filter states
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

  const providers = useMemo(() => {
    const providerCounts: Record<string, number> = {};
    sslTariffs.forEach(t => {
      providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1;
    });
    return Object.entries(providerCounts).map(([name, count]) => ({ name, count }));
  }, []);

  const allProviders = useMemo(() => [...new Set(sslTariffs.map(t => t.provider))], []);

  const filteredTariffs = useMemo(() => {
    let result = [...sslTariffs];
    
    // Provider filter (from bar)
    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }
    
    // Provider filter (from sidebar)
    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    
    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter(t => selectedTypes.includes(t.type));
    }
    
    // Price filter
    result = result.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    
    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'warranty-asc':
          return a.warranty - b.warranty;
        case 'warranty-desc':
          return b.warranty - a.warranty;
        default:
          return 0;
      }
    });
    
    return result;
  }, [activeProvider, selectedProviders, selectedTypes, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedProviders([]);
    setSelectedTypes([]);
    setPriceRange([0, MAX_PRICE]);
  };

  const sortLabels: Record<SortOption, string> = {
    'price-asc': 'Сначала дешёвые',
    'price-desc': 'Сначала дорогие',
    'warranty-asc': 'По гарантии ↑',
    'warranty-desc': 'По гарантии ↓',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              SSL Сертификаты
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              SSL сертификаты для вашего сайта
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Защитите свой сайт с помощью SSL сертификатов от ведущих центров сертификации
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>256-bit шифрование</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary" />
              <span>Совместимость 99.9%</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Гарантия до $1.75M</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Provider Bar */}
          <div className="mb-6">
            <SSLProviderBar
              providers={providers}
              activeProvider={activeProvider}
              onProviderClick={setActiveProvider}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SSLFilters
                    providers={allProviders}
                    selectedProviders={selectedProviders}
                    onProviderChange={setSelectedProviders}
                    types={CERT_TYPES}
                    selectedTypes={selectedTypes}
                    onTypeChange={setSelectedTypes}
                    priceRange={priceRange}
                    maxPrice={MAX_PRICE}
                    onPriceChange={setPriceRange}
                    onReset={resetFilters}
                  />
                </SheetContent>
              </Sheet>

              <span className="text-sm text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{filteredTariffs.length}</span> сертификатов
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortLabels[sortBy]}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => setSortBy(key as SortOption)}
                      className={cn(sortBy === key && "bg-accent")}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode */}
              <div className="hidden sm:flex items-center border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'grid' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'list' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex gap-6">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border p-4">
                <SSLFilters
                  providers={allProviders}
                  selectedProviders={selectedProviders}
                  onProviderChange={setSelectedProviders}
                  types={CERT_TYPES}
                  selectedTypes={selectedTypes}
                  onTypeChange={setSelectedTypes}
                  priceRange={priceRange}
                  maxPrice={MAX_PRICE}
                  onPriceChange={setPriceRange}
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Tariffs Grid */}
            <div className="flex-1">
              <div className={cn(
                "grid gap-4",
                viewMode === 'grid' 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              )}>
                {filteredTariffs.map((tariff) => (
                  <SSLTariffCard key={tariff.id} tariff={tariff} />
                ))}
              </div>

              {filteredTariffs.length === 0 && (
                <div className="text-center py-12">
                  <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Сертификаты не найдены</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SSLPage;
