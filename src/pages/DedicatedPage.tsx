import { useState, useMemo } from 'react';
import { Server, Filter, LayoutGrid, List, ChevronDown, Shield, Zap, Cpu } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DedicatedProviderBar from '@/components/dedicated/DedicatedProviderBar';
import DedicatedFilters from '@/components/dedicated/DedicatedFilters';
import DedicatedTariffCard from '@/components/dedicated/DedicatedTariffCard';
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
const dedicatedTariffs = [
  { id: '1', provider: 'Selectel', name: 'Dedicated Start', cpu: 'Intel Xeon E-2236', cpuCores: 6, ram: 32, storage: '2x480GB SSD', bandwidth: '1 Гбит/с', location: 'Москва', price: 8900, features: ['IPMI', 'KVM'] },
  { id: '2', provider: 'Selectel', name: 'Dedicated Pro', cpu: 'Intel Xeon Silver 4214', cpuCores: 12, ram: 64, storage: '2x960GB SSD', bandwidth: '1 Гбит/с', location: 'Москва', price: 15900, highlight: true, features: ['RAID', 'DDoS защита'] },
  { id: '3', provider: 'Selectel', name: 'Dedicated Enterprise', cpu: 'AMD EPYC 7302', cpuCores: 16, ram: 128, storage: '4x1.92TB NVMe', bandwidth: '10 Гбит/с', location: 'Санкт-Петербург', price: 35000, features: ['Premium SLA', 'GPU'] },
  { id: '4', provider: 'FirstVDS', name: 'Dedicated Lite', cpu: 'Intel Xeon E3-1230v6', cpuCores: 4, ram: 16, storage: '2x240GB SSD', bandwidth: '100 Мбит/с', location: 'Москва', price: 4990, features: ['Быстрый старт'] },
  { id: '5', provider: 'FirstVDS', name: 'Dedicated Power', cpu: 'Intel Xeon E-2288G', cpuCores: 8, ram: 64, storage: '2x1TB NVMe', bandwidth: '1 Гбит/с', location: 'Москва', price: 12900, highlight: true, features: ['NVMe', 'IPMI'] },
  { id: '6', provider: 'Hetzner', name: 'AX41-NVMe', cpu: 'AMD Ryzen 5 3600', cpuCores: 6, ram: 64, storage: '2x512GB NVMe', bandwidth: '1 Гбит/с', location: 'Германия', price: 4200, features: ['Трафик ∞'] },
  { id: '7', provider: 'Hetzner', name: 'AX101', cpu: 'AMD EPYC 7443P', cpuCores: 24, ram: 128, storage: '2x1.92TB NVMe', bandwidth: '1 Гбит/с', location: 'Германия', price: 13500, features: ['ECC RAM', 'RAID'] },
  { id: '8', provider: 'OVH', name: 'Rise-1', cpu: 'Intel Xeon E-2136', cpuCores: 6, ram: 32, storage: '2x500GB SSD', bandwidth: '1 Гбит/с', location: 'Франция', price: 5500, features: ['Anti-DDoS'] },
  { id: '9', provider: 'OVH', name: 'Advance-2', cpu: 'AMD EPYC 7313P', cpuCores: 16, ram: 128, storage: '2x960GB NVMe', bandwidth: '1 Гбит/с', location: 'Франция', price: 16900, features: ['vRack', 'Backup'] },
  { id: '10', provider: 'RUVDS', name: 'Dedicated Basic', cpu: 'Intel Xeon E3-1270v6', cpuCores: 4, ram: 32, storage: '2x480GB SSD', bandwidth: '100 Мбит/с', location: 'Москва', price: 7900, features: ['Российский ЦОД'] },
];

const MAX_PRICE = 40000;
const MAX_CPU = 24;
const MAX_RAM = 128;
const LOCATIONS = ['Москва', 'Санкт-Петербург', 'Германия', 'Франция'];

type SortOption = 'price-asc' | 'price-desc' | 'cpu-asc' | 'cpu-desc' | 'ram-asc' | 'ram-desc';

const DedicatedPage = () => {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  
  // Filter states
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [cpuRange, setCpuRange] = useState<[number, number]>([0, MAX_CPU]);
  const [ramRange, setRamRange] = useState<[number, number]>([0, MAX_RAM]);

  const providers = useMemo(() => {
    const providerCounts: Record<string, number> = {};
    dedicatedTariffs.forEach(t => {
      providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1;
    });
    return Object.entries(providerCounts).map(([name, count]) => ({ name, count }));
  }, []);

  const allProviders = useMemo(() => [...new Set(dedicatedTariffs.map(t => t.provider))], []);

  const filteredTariffs = useMemo(() => {
    let result = [...dedicatedTariffs];
    
    // Provider filter (from bar)
    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }
    
    // Provider filter (from sidebar)
    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    
    // Location filter
    if (selectedLocations.length > 0) {
      result = result.filter(t => selectedLocations.includes(t.location));
    }
    
    // Price filter
    result = result.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    
    // CPU filter
    result = result.filter(t => t.cpuCores >= cpuRange[0] && t.cpuCores <= cpuRange[1]);
    
    // RAM filter
    result = result.filter(t => t.ram >= ramRange[0] && t.ram <= ramRange[1]);
    
    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'cpu-asc':
          return a.cpuCores - b.cpuCores;
        case 'cpu-desc':
          return b.cpuCores - a.cpuCores;
        case 'ram-asc':
          return a.ram - b.ram;
        case 'ram-desc':
          return b.ram - a.ram;
        default:
          return 0;
      }
    });
    
    return result;
  }, [activeProvider, selectedProviders, selectedLocations, priceRange, cpuRange, ramRange, sortBy]);

  const resetFilters = () => {
    setSelectedProviders([]);
    setSelectedLocations([]);
    setPriceRange([0, MAX_PRICE]);
    setCpuRange([0, MAX_CPU]);
    setRamRange([0, MAX_RAM]);
  };

  const sortLabels: Record<SortOption, string> = {
    'price-asc': 'Сначала дешёвые',
    'price-desc': 'Сначала дорогие',
    'cpu-asc': 'По CPU ↑',
    'cpu-desc': 'По CPU ↓',
    'ram-asc': 'По RAM ↑',
    'ram-desc': 'По RAM ↓',
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
              Dedicated серверы
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Выделенные серверы для ваших проектов
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Максимальная производительность и полный контроль. Сравните предложения от ведущих провайдеров
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span>До 128 ядер</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>DDoS защита</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>NVMe диски</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Provider Bar */}
          <div className="mb-6">
            <DedicatedProviderBar
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
                  <DedicatedFilters
                    providers={allProviders}
                    selectedProviders={selectedProviders}
                    onProviderChange={setSelectedProviders}
                    locations={LOCATIONS}
                    selectedLocations={selectedLocations}
                    onLocationChange={setSelectedLocations}
                    priceRange={priceRange}
                    maxPrice={MAX_PRICE}
                    onPriceChange={setPriceRange}
                    cpuRange={cpuRange}
                    maxCpu={MAX_CPU}
                    onCpuChange={setCpuRange}
                    ramRange={ramRange}
                    maxRam={MAX_RAM}
                    onRamChange={setRamRange}
                    onReset={resetFilters}
                  />
                </SheetContent>
              </Sheet>

              <span className="text-sm text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{filteredTariffs.length}</span> серверов
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
                <DedicatedFilters
                  providers={allProviders}
                  selectedProviders={selectedProviders}
                  onProviderChange={setSelectedProviders}
                  locations={LOCATIONS}
                  selectedLocations={selectedLocations}
                  onLocationChange={setSelectedLocations}
                  priceRange={priceRange}
                  maxPrice={MAX_PRICE}
                  onPriceChange={setPriceRange}
                  cpuRange={cpuRange}
                  maxCpu={MAX_CPU}
                  onCpuChange={setCpuRange}
                  ramRange={ramRange}
                  maxRam={MAX_RAM}
                  onRamChange={setRamRange}
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
                  <DedicatedTariffCard key={tariff.id} tariff={tariff} />
                ))}
              </div>

              {filteredTariffs.length === 0 && (
                <div className="text-center py-12">
                  <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Серверы не найдены</h3>
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

export default DedicatedPage;
