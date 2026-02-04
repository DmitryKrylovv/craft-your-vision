import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DomainFilters from '@/components/domains/DomainFilters';
import DomainTariffCard from '@/components/domains/DomainTariffCard';
import DomainProviderBar from '@/components/domains/DomainProviderBar';
import DomainZoneBar from '@/components/domains/DomainZoneBar';
import { 
  ArrowRight, CreditCard, BarChart3, RefreshCw, 
  Check, Zap, Shield, Clock, SlidersHorizontal,
  ArrowUpDown, Grid3X3, List, Headphones, Globe2, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DomainTariff {
  id: string;
  provider: string;
  zone: string;
  priceRegister: number;
  priceRenew: number;
  priceTransfer: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

const allTariffs: DomainTariff[] = [
  // .ru
  { id: 'reg-ru', provider: 'REG.RU', zone: 'ru', priceRegister: 199, priceRenew: 890, priceTransfer: 0, highlight: true, features: ['DNS хостинг'] },
  { id: 'nrg-ru', provider: 'NIC.RU', zone: 'ru', priceRegister: 249, priceRenew: 950, priceTransfer: 0 },
  { id: 'bg-ru', provider: 'Beget', zone: 'ru', priceRegister: 189, priceRenew: 850, priceTransfer: 0, features: ['Бесплатный SSL'] },
  { id: 'tw-ru', provider: 'Timeweb', zone: 'ru', priceRegister: 219, priceRenew: 890, priceTransfer: 0 },
  
  // .рф
  { id: 'reg-rf', provider: 'REG.RU', zone: 'рф', priceRegister: 299, priceRenew: 990, priceTransfer: 0 },
  { id: 'nrg-rf', provider: 'NIC.RU', zone: 'рф', priceRegister: 349, priceRenew: 1050, priceTransfer: 0 },
  { id: 'bg-rf', provider: 'Beget', zone: 'рф', priceRegister: 279, priceRenew: 950, priceTransfer: 0 },
  
  // .com
  { id: 'reg-com', provider: 'REG.RU', zone: 'com', priceRegister: 1290, priceRenew: 1590, priceTransfer: 1290, highlight: true, features: ['Международный'] },
  { id: 'nrg-com', provider: 'NIC.RU', zone: 'com', priceRegister: 1390, priceRenew: 1690, priceTransfer: 1390 },
  { id: 'tw-com', provider: 'Timeweb', zone: 'com', priceRegister: 1350, priceRenew: 1650, priceTransfer: 1350 },
  
  // .net
  { id: 'reg-net', provider: 'REG.RU', zone: 'net', priceRegister: 1490, priceRenew: 1790, priceTransfer: 1490 },
  { id: 'nrg-net', provider: 'NIC.RU', zone: 'net', priceRegister: 1590, priceRenew: 1890, priceTransfer: 1590 },
  
  // .org
  { id: 'reg-org', provider: 'REG.RU', zone: 'org', priceRegister: 1390, priceRenew: 1690, priceTransfer: 1390 },
  { id: 'tw-org', provider: 'Timeweb', zone: 'org', priceRegister: 1450, priceRenew: 1750, priceTransfer: 1450 },
  
  // .su
  { id: 'reg-su', provider: 'REG.RU', zone: 'su', priceRegister: 690, priceRenew: 890, priceTransfer: 0 },
  { id: 'nrg-su', provider: 'NIC.RU', zone: 'su', priceRegister: 750, priceRenew: 950, priceTransfer: 0 },
  
  // .online
  { id: 'reg-online', provider: 'REG.RU', zone: 'online', priceRegister: 99, priceRenew: 3990, priceTransfer: 2990, oldPrice: 2990, features: ['Акция'] },
  { id: 'tw-online', provider: 'Timeweb', zone: 'online', priceRegister: 149, priceRenew: 4190, priceTransfer: 3190 },
  
  // .site
  { id: 'reg-site', provider: 'REG.RU', zone: 'site', priceRegister: 149, priceRenew: 3490, priceTransfer: 2490, oldPrice: 2490, features: ['Акция'] },
  { id: 'bg-site', provider: 'Beget', zone: 'site', priceRegister: 199, priceRenew: 3290, priceTransfer: 2290 },
  
  // .store
  { id: 'reg-store', provider: 'REG.RU', zone: 'store', priceRegister: 99, priceRenew: 5990, priceTransfer: 4990, oldPrice: 4990, features: ['E-commerce'] },
  
  // .moscow
  { id: 'reg-moscow', provider: 'REG.RU', zone: 'moscow', priceRegister: 990, priceRenew: 1290, priceTransfer: 990 },
  { id: 'nrg-moscow', provider: 'NIC.RU', zone: 'moscow', priceRegister: 1090, priceRenew: 1390, priceTransfer: 1090 },
];

const DomainsPage = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const providers = useMemo(() => {
    const counts = allTariffs.reduce((acc, t) => {
      acc[t.provider] = (acc[t.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  const zones = useMemo(() => {
    const counts = allTariffs.reduce((acc, t) => {
      acc[t.zone] = (acc[t.zone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const popularZones = ['ru', 'com', 'рф'];
    return Object.entries(counts)
      .map(([name, count]) => ({ 
        name, 
        count, 
        popular: popularZones.includes(name) 
      }))
      .sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return a.name.localeCompare(b.name);
      });
  }, []);

  const zonesList = useMemo(() => zones.map(z => z.name), [zones]);
  const maxPrice = useMemo(() => Math.max(...allTariffs.map(t => t.priceRegister)), []);

  const filteredTariffs = useMemo(() => {
    let result = allTariffs;

    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }

    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    if (selectedZones.length > 0) {
      result = result.filter(t => selectedZones.includes(t.zone));
    }
    result = result.filter(t => t.priceRegister >= priceRange[0] && t.priceRegister <= priceRange[1]);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().replace(/^\./, '');
      result = result.filter(t => t.zone.toLowerCase().includes(query));
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.priceRegister - b.priceRegister);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.priceRegister - a.priceRegister);
        break;
      case 'renew-asc':
        result = [...result].sort((a, b) => a.priceRenew - b.priceRenew);
        break;
      case 'zone':
        result = [...result].sort((a, b) => a.zone.localeCompare(b.zone));
        break;
    }

    return result;
  }, [activeProvider, selectedProviders, selectedZones, priceRange, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedProviders([]);
    setSelectedZones([]);
    setPriceRange([0, maxPrice]);
    setActiveProvider(null);
    setSearchQuery('');
  };

  const activeFiltersCount = selectedProviders.length + selectedZones.length + 
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left - Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Globe2 className="w-4 h-4" />
                  Домены
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Ваш адрес в сети.
                  <br />
                  <span className="text-primary">Лучшие цены.</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Сравнивайте цены на домены у разных регистраторов и управляйте всеми доменами в одном месте
                </p>
                
                {/* Domain Search */}
                <div className="flex gap-2 mb-6 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      placeholder="Введите домен или зону..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                    />
                  </div>
                  <Button size="lg" className="rounded-xl h-12 px-6">
                    Найти
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary" />
                    WHOIS защита
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Мгновенная регистрация
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    Бесплатный SSL
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">{zones.length}</div>
                      <div className="text-sm text-muted-foreground">зон</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">{providers.length}</div>
                      <div className="text-sm text-muted-foreground">регистраторов</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">от {Math.min(...allTariffs.map(t => t.priceRegister))}₽</div>
                      <div className="text-sm text-muted-foreground">в год</div>
                    </div>
                  </div>
                </div>

                {/* Feature Block 1 */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Единый счёт</div>
                  <div className="text-xs text-muted-foreground">Один платёж за всё</div>
                </div>

                {/* Feature Block 2 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Управление DNS</div>
                  <div className="text-xs text-muted-foreground">Все записи в одном месте</div>
                </div>

                {/* Feature Block 3 */}
                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <RefreshCw className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Автопродление</div>
                  <div className="text-xs text-muted-foreground">Не потеряете домен</div>
                </div>

                {/* Feature Block 4 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Headphones className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Поддержка 24/7</div>
                  <div className="text-xs text-muted-foreground">Помощь с трансфером</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tariffs Section */}
        <section className="container py-8 md:py-12">
          {/* Provider Quick Filter */}
          <div className="mb-4">
            <DomainProviderBar 
              providers={providers}
              activeProvider={activeProvider}
              onProviderClick={setActiveProvider}
            />
          </div>

          {/* Zone Quick Filter */}
          <div className="mb-6">
            <DomainZoneBar
              zones={zones}
              selectedZones={selectedZones}
              onZoneClick={(zone) => {
                if (selectedZones.includes(zone)) {
                  setSelectedZones(selectedZones.filter(z => z !== zone));
                } else {
                  setSelectedZones([...selectedZones, zone]);
                }
              }}
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden rounded-xl">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Фильтры
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <DomainFilters
                      providers={providers.map(p => p.name)}
                      selectedProviders={selectedProviders}
                      onProviderChange={setSelectedProviders}
                      zones={zonesList}
                      selectedZones={selectedZones}
                      onZoneChange={setSelectedZones}
                      priceRange={priceRange}
                      maxPrice={maxPrice}
                      onPriceChange={setPriceRange}
                      onReset={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <span className="text-sm text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{filteredTariffs.length}</span> предложений
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] rounded-xl">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="renew-asc">По цене продления</SelectItem>
                  <SelectItem value="zone">По зоне</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:flex border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'grid' ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === 'list' ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-4 bg-card border border-border rounded-2xl p-5">
                <DomainFilters
                  providers={providers.map(p => p.name)}
                  selectedProviders={selectedProviders}
                  onProviderChange={setSelectedProviders}
                  zones={zonesList}
                  selectedZones={selectedZones}
                  onZoneChange={setSelectedZones}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onPriceChange={setPriceRange}
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Tariff Grid */}
            <div className="flex-1">
              {filteredTariffs.length > 0 ? (
                <div className={cn(
                  "grid gap-4",
                  viewMode === 'grid' 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                )}>
                  {filteredTariffs.map((tariff) => (
                    <DomainTariffCard key={tariff.id} tariff={tariff} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <p className="text-muted-foreground mb-4">Домены не найдены</p>
                  <Button variant="outline" onClick={resetFilters} className="rounded-xl">
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container pb-12 md:pb-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3">
              Нужна помощь с выбором домена?
            </h2>
            <p className="text-primary-foreground/80 mb-5 max-w-lg mx-auto text-sm">
              Наши эксперты помогут подобрать идеальное доменное имя для вашего проекта
            </p>
            <Button size="lg" variant="secondary" className="rounded-xl">
              Получить консультацию
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DomainsPage;
