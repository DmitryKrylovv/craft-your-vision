import { useState, useMemo } from 'react';
import { Server, Filter, LayoutGrid, List, ChevronDown, Shield, Zap, Globe2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DNSProviderBar from '@/components/dns/DNSProviderBar';
import DNSFilters from '@/components/dns/DNSFilters';
import DNSTariffCard from '@/components/dns/DNSTariffCard';
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
const dnsTariffs = [
  { id: '1', provider: 'Cloudflare', name: 'Free', zones: 1, queries: 100000, ttl: 120, price: 0, features: ['DDoS защита', 'Anycast'] },
  { id: '2', provider: 'Cloudflare', name: 'Pro', zones: 20, queries: 1000000, ttl: 60, price: 1500, highlight: true, features: ['WAF', 'Image Optimization'] },
  { id: '3', provider: 'Cloudflare', name: 'Business', zones: 50, queries: -1, ttl: 30, price: 15000, features: ['100% SLA', 'Custom SSL'] },
  { id: '4', provider: 'AWS Route 53', name: 'Standard', zones: 25, queries: 1000000, ttl: 60, price: 400, features: ['Health Checks', 'Geo Routing'] },
  { id: '5', provider: 'AWS Route 53', name: 'Enterprise', zones: -1, queries: -1, ttl: 1, price: 2500, features: ['Private DNS', 'DNSSEC'] },
  { id: '6', provider: 'Google Cloud DNS', name: 'Standard', zones: 100, queries: -1, ttl: 300, price: 200, features: ['Anycast', 'DNSSEC'] },
  { id: '7', provider: 'Selectel', name: 'DNS Basic', zones: 10, queries: 500000, ttl: 300, price: 0, features: ['API доступ'] },
  { id: '8', provider: 'Selectel', name: 'DNS Pro', zones: 50, queries: 2000000, ttl: 60, price: 500, highlight: true, features: ['GeoDNS', 'Failover'] },
  { id: '9', provider: 'REG.RU', name: 'DNS Хостинг', zones: 5, queries: 100000, ttl: 600, price: 99, features: ['Бесплатно к домену'] },
  { id: '10', provider: 'Timeweb', name: 'DNS Зона', zones: 3, queries: 50000, ttl: 300, price: 0, features: ['Простая настройка'] },
];

const MAX_PRICE = 15000;
const MAX_ZONES = 100;

type SortOption = 'price-asc' | 'price-desc' | 'zones-asc' | 'zones-desc';

const DNSPage = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  
  // Filter states
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [zonesRange, setZonesRange] = useState<[number, number]>([0, MAX_ZONES]);

  const providers = useMemo(() => {
    const providerCounts: Record<string, number> = {};
    dnsTariffs.forEach(t => {
      providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1;
    });
    return Object.entries(providerCounts).map(([name, count]) => ({ name, count }));
  }, []);

  const allProviders = useMemo(() => [...new Set(dnsTariffs.map(t => t.provider))], []);

  const filteredTariffs = useMemo(() => {
    let result = [...dnsTariffs];
    
    // Provider filter (from bar)
    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }
    
    // Provider filter (from sidebar)
    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    
    // Price filter
    result = result.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    
    // Zones filter
    result = result.filter(t => {
      if (t.zones === -1) return true;
      return t.zones >= zonesRange[0] && (zonesRange[1] === MAX_ZONES || t.zones <= zonesRange[1]);
    });
    
    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'zones-asc':
          return (a.zones === -1 ? Infinity : a.zones) - (b.zones === -1 ? Infinity : b.zones);
        case 'zones-desc':
          return (b.zones === -1 ? Infinity : b.zones) - (a.zones === -1 ? Infinity : a.zones);
        default:
          return 0;
      }
    });
    
    return result;
  }, [activeProvider, selectedProviders, priceRange, zonesRange, sortBy]);

  const resetFilters = () => {
    setSelectedProviders([]);
    setPriceRange([0, MAX_PRICE]);
    setZonesRange([0, MAX_ZONES]);
  };

  const sortLabels: Record<SortOption, string> = {
    'price-asc': 'Сначала дешёвые',
    'price-desc': 'Сначала дорогие',
    'zones-asc': 'По зонам ↑',
    'zones-desc': 'По зонам ↓',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Server className="w-4 h-4" />
              DNS Хостинг
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              DNS хостинг от лучших провайдеров
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Сравните тарифы DNS хостинга. Быстрые и надёжные DNS серверы с DDoS защитой и GeoDNS
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>DDoS защита</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Anycast сеть</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary" />
              <span>Глобальное покрытие</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Provider Bar */}
          <div className="mb-6">
            <DNSProviderBar
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
                  <DNSFilters
                    providers={allProviders}
                    selectedProviders={selectedProviders}
                    onProviderChange={setSelectedProviders}
                    priceRange={priceRange}
                    maxPrice={MAX_PRICE}
                    onPriceChange={setPriceRange}
                    zonesRange={zonesRange}
                    maxZones={MAX_ZONES}
                    onZonesChange={setZonesRange}
                    onReset={resetFilters}
                  />
                </SheetContent>
              </Sheet>

              <span className="text-sm text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{filteredTariffs.length}</span> тарифов
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
                <DNSFilters
                  providers={allProviders}
                  selectedProviders={selectedProviders}
                  onProviderChange={setSelectedProviders}
                  priceRange={priceRange}
                  maxPrice={MAX_PRICE}
                  onPriceChange={setPriceRange}
                  zonesRange={zonesRange}
                  maxZones={MAX_ZONES}
                  onZonesChange={setZonesRange}
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
                  <DNSTariffCard key={tariff.id} tariff={tariff} />
                ))}
              </div>

              {filteredTariffs.length === 0 && (
                <div className="text-center py-12">
                  <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Тарифы не найдены</h3>
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

export default DNSPage;
