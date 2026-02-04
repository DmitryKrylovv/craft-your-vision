import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HostingFilters from '@/components/hosting/HostingFilters';
import HostingTariffCard from '@/components/hosting/HostingTariffCard';
import HostingProviderBar from '@/components/hosting/HostingProviderBar';
import { 
  ArrowRight, CreditCard, BarChart3, Settings, 
  Check, Zap, Shield, Clock, SlidersHorizontal,
  ArrowUpDown, Grid3X3, List, Headphones, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface HostingTariff {
  id: string;
  provider: string;
  name: string;
  storage: number;
  sites: number;
  databases: number;
  emails: number;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

const allTariffs: HostingTariff[] = [
  { id: 'bg-h1', provider: 'Beget', name: 'Начальный', storage: 5, sites: 1, databases: 1, emails: 5, price: 99, features: ['SSL', 'PHP 8'] },
  { id: 'tw-h1', provider: 'Timeweb', name: 'Лёгкий', storage: 5, sites: 1, databases: 1, emails: 10, price: 119, features: ['SSL', 'Автобэкапы'] },
  { id: 'reg-h1', provider: 'REG.RU', name: 'Старт', storage: 3, sites: 1, databases: 1, emails: 3, price: 129 },
  { id: 'bg-h2', provider: 'Beget', name: 'Базовый', storage: 10, sites: 3, databases: 3, emails: 10, price: 159, features: ['SSL', 'PHP 8', 'SSH'] },
  { id: 'sp-h1', provider: 'SpaceWeb', name: 'Эконом', storage: 5, sites: 2, databases: 2, emails: 10, price: 169 },
  { id: 'tw-h2', provider: 'Timeweb', name: 'Оптима', storage: 15, sites: 5, databases: 5, emails: 25, price: 199, highlight: true, features: ['SSL', 'SSH', 'Node.js'] },
  { id: 'reg-h2', provider: 'REG.RU', name: 'Базовый', storage: 10, sites: 3, databases: 3, emails: 10, price: 219 },
  { id: 'hc-h1', provider: 'HostiQ', name: 'Стандарт', storage: 10, sites: 3, databases: 5, emails: 20, price: 229, features: ['SSL'] },
  { id: 'bg-h3', provider: 'Beget', name: 'Оптимальный', storage: 20, sites: 10, databases: 10, emails: 25, price: 269, features: ['SSL', 'SSH', 'Git'] },
  { id: 'sp-h2', provider: 'SpaceWeb', name: 'Стандарт', storage: 15, sites: 5, databases: 5, emails: 25, price: 289, features: ['SSL', 'Автобэкапы'] },
  { id: 'tw-h3', provider: 'Timeweb', name: 'Бизнес', storage: 30, sites: 10, databases: 10, emails: 50, price: 349, features: ['SSL', 'SSH', 'Node.js', 'Python'] },
  { id: 'reg-h3', provider: 'REG.RU', name: 'Про', storage: 25, sites: 10, databases: 10, emails: 30, price: 399, features: ['SSL', 'SSH'] },
  { id: 'hc-h2', provider: 'HostiQ', name: 'Бизнес', storage: 25, sites: 10, databases: 15, emails: 50, price: 429, features: ['SSL', 'SSH', 'Git'] },
  { id: 'bg-h4', provider: 'Beget', name: 'Продвинутый', storage: 50, sites: -1, databases: -1, emails: -1, price: 499, features: ['SSL', 'SSH', 'Git', 'Node.js'] },
  { id: 'sp-h3', provider: 'SpaceWeb', name: 'Премиум', storage: 40, sites: -1, databases: -1, emails: -1, price: 549, features: ['SSL', 'SSH', 'Приоритет'] },
  { id: 'tw-h4', provider: 'Timeweb', name: 'Безлимит', storage: 60, sites: -1, databases: -1, emails: -1, price: 599, features: ['SSL', 'SSH', 'Node.js', 'Python', 'SSD'] },
];

const HostingPage = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<number[]>([]);
  const [selectedSites, setSelectedSites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 700]);
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const providers = useMemo(() => {
    const counts = allTariffs.reduce((acc, t) => {
      acc[t.provider] = (acc[t.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  const storageOptions = useMemo(() => [...new Set(allTariffs.map(t => t.storage))].sort((a, b) => a - b), []);
  const sitesOptions = useMemo(() => [...new Set(allTariffs.map(t => t.sites))].sort((a, b) => a - b), []);
  const maxPrice = useMemo(() => Math.max(...allTariffs.map(t => t.price)), []);

  const filteredTariffs = useMemo(() => {
    let result = allTariffs;

    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }

    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    if (selectedStorage.length > 0) {
      result = result.filter(t => selectedStorage.includes(t.storage));
    }
    if (selectedSites.length > 0) {
      result = result.filter(t => selectedSites.includes(t.sites));
    }
    result = result.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'storage-desc':
        result = [...result].sort((a, b) => b.storage - a.storage);
        break;
      case 'sites-desc':
        result = [...result].sort((a, b) => b.sites - a.sites);
        break;
    }

    return result;
  }, [activeProvider, selectedProviders, selectedStorage, selectedSites, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedProviders([]);
    setSelectedStorage([]);
    setSelectedSites([]);
    setPriceRange([0, maxPrice]);
    setActiveProvider(null);
  };

  const activeFiltersCount = selectedProviders.length + selectedStorage.length + selectedSites.length + 
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
                  <Globe className="w-4 h-4" />
                  Виртуальный хостинг
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Хостинг для сайтов.
                  <br />
                  <span className="text-primary">Просто и надёжно.</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Сравнивайте тарифы виртуального хостинга и управляйте всеми сайтами в одном месте
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button size="lg" className="rounded-xl">
                    Выбрать тариф
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Как это работает
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary" />
                    SSL бесплатно
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Активация мгновенно
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    Бэкапы каждый день
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">{allTariffs.length}</div>
                      <div className="text-sm text-muted-foreground">тарифов</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">{providers.length}</div>
                      <div className="text-sm text-muted-foreground">провайдеров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">от {Math.min(...allTariffs.map(t => t.price))}₽</div>
                      <div className="text-sm text-muted-foreground">в месяц</div>
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
                  <div className="font-semibold text-foreground text-sm">Единый дашборд</div>
                  <div className="text-xs text-muted-foreground">Мониторинг сайтов</div>
                </div>

                {/* Feature Block 3 */}
                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <Settings className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Управление DNS</div>
                  <div className="text-xs text-muted-foreground">Домены и записи</div>
                </div>

                {/* Feature Block 4 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Headphones className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Поддержка 24/7</div>
                  <div className="text-xs text-muted-foreground">Решаем за вас</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tariffs Section */}
        <section className="container py-8 md:py-12">
          {/* Provider Quick Filter */}
          <div className="mb-6">
            <HostingProviderBar 
              providers={providers}
              activeProvider={activeProvider}
              onProviderClick={setActiveProvider}
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
                    <HostingFilters
                      providers={providers.map(p => p.name)}
                      selectedProviders={selectedProviders}
                      onProviderChange={setSelectedProviders}
                      priceRange={priceRange}
                      maxPrice={maxPrice}
                      onPriceChange={setPriceRange}
                      storageOptions={storageOptions}
                      selectedStorage={selectedStorage}
                      onStorageChange={setSelectedStorage}
                      sitesOptions={sitesOptions}
                      selectedSites={selectedSites}
                      onSitesChange={setSelectedSites}
                      onReset={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <span className="text-sm text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{filteredTariffs.length}</span> тарифов
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-xl">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="storage-desc">По диску</SelectItem>
                  <SelectItem value="sites-desc">По сайтам</SelectItem>
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
                <HostingFilters
                  providers={providers.map(p => p.name)}
                  selectedProviders={selectedProviders}
                  onProviderChange={setSelectedProviders}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onPriceChange={setPriceRange}
                  storageOptions={storageOptions}
                  selectedStorage={selectedStorage}
                  onStorageChange={setSelectedStorage}
                  sitesOptions={sitesOptions}
                  selectedSites={selectedSites}
                  onSitesChange={setSelectedSites}
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
                    <HostingTariffCard key={tariff.id} tariff={tariff} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <p className="text-muted-foreground mb-4">Тарифы не найдены</p>
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
              Не можете выбрать хостинг?
            </h2>
            <p className="text-primary-foreground/80 mb-5 max-w-lg mx-auto text-sm">
              Наши эксперты помогут подобрать оптимальный тариф под ваш проект
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

export default HostingPage;
