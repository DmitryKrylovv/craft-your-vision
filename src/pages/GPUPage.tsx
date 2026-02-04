import { useState, useMemo } from 'react';
import { Cpu, Filter, LayoutGrid, List, ChevronDown, Shield, Zap, Gauge } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DedicatedProviderBar from '@/components/dedicated/DedicatedProviderBar';
import DedicatedFilters from '@/components/dedicated/DedicatedFilters';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock GPU tariffs data
const gpuTariffs = [
  { id: '1', provider: 'Selectel', name: 'GPU Starter', gpu: 'NVIDIA RTX 3090', gpuCount: 1, cpu: 'AMD EPYC 7302', cpuCores: 8, ram: 64, storage: '1TB NVMe', bandwidth: '1 Гбит/с', location: 'Москва', price: 45000, features: ['CUDA 12', 'PyTorch'] },
  { id: '2', provider: 'Selectel', name: 'GPU Pro', gpu: 'NVIDIA A100 40GB', gpuCount: 1, cpu: 'AMD EPYC 7543', cpuCores: 16, ram: 128, storage: '2TB NVMe', bandwidth: '10 Гбит/с', location: 'Москва', price: 120000, highlight: true, features: ['NVLink', 'Tensor Cores'] },
  { id: '3', provider: 'Selectel', name: 'GPU Cluster', gpu: 'NVIDIA A100 80GB', gpuCount: 4, cpu: 'AMD EPYC 7763', cpuCores: 64, ram: 512, storage: '8TB NVMe', bandwidth: '100 Гбит/с', location: 'Москва', price: 650000, features: ['InfiniBand', 'Multi-GPU'] },
  { id: '4', provider: 'FirstVDS', name: 'ML Basic', gpu: 'NVIDIA RTX 4090', gpuCount: 1, cpu: 'Intel Xeon Gold', cpuCores: 8, ram: 64, storage: '512GB NVMe', bandwidth: '1 Гбит/с', location: 'Москва', price: 55000, features: ['24GB VRAM'] },
  { id: '5', provider: 'FirstVDS', name: 'ML Advanced', gpu: 'NVIDIA RTX 4090', gpuCount: 2, cpu: 'AMD EPYC 7313P', cpuCores: 16, ram: 128, storage: '2TB NVMe', bandwidth: '1 Гбит/с', location: 'Москва', price: 95000, highlight: true, features: ['Dual GPU', 'NVMe RAID'] },
  { id: '6', provider: 'Lambda Labs', name: 'GPU Cloud 1x', gpu: 'NVIDIA H100', gpuCount: 1, cpu: 'AMD EPYC 9004', cpuCores: 24, ram: 256, storage: '2TB NVMe', bandwidth: '10 Гбит/с', location: 'США', price: 180000, features: ['80GB HBM3'] },
  { id: '7', provider: 'Lambda Labs', name: 'GPU Cloud 8x', gpu: 'NVIDIA H100', gpuCount: 8, cpu: 'AMD EPYC 9004', cpuCores: 128, ram: 2048, storage: '16TB NVMe', bandwidth: '400 Гбит/с', location: 'США', price: 1200000, features: ['NVSwitch', 'Enterprise'] },
  { id: '8', provider: 'Vast.ai', name: 'Render Node', gpu: 'NVIDIA RTX 3080', gpuCount: 1, cpu: 'AMD Ryzen 9', cpuCores: 8, ram: 32, storage: '256GB NVMe', bandwidth: '1 Гбит/с', location: 'Европа', price: 25000, features: ['Почасовая оплата'] },
  { id: '9', provider: 'Vast.ai', name: 'Training Node', gpu: 'NVIDIA A6000', gpuCount: 2, cpu: 'Intel Xeon', cpuCores: 16, ram: 128, storage: '1TB NVMe', bandwidth: '10 Гбит/с', location: 'Европа', price: 85000, features: ['48GB VRAM', 'ECC'] },
  { id: '10', provider: 'CoreWeave', name: 'Inference', gpu: 'NVIDIA L4', gpuCount: 1, cpu: 'AMD EPYC', cpuCores: 8, ram: 32, storage: '256GB NVMe', bandwidth: '1 Гбит/с', location: 'США', price: 35000, features: ['Low Power', 'Inference'] },
];

const MAX_PRICE = 1500000;
const MAX_CPU = 128;
const MAX_RAM = 2048;
const LOCATIONS = ['Москва', 'США', 'Европа'];

type SortOption = 'price-asc' | 'price-desc' | 'gpu-asc' | 'gpu-desc' | 'ram-asc' | 'ram-desc';

const GPUPage = () => {
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
    gpuTariffs.forEach(t => {
      providerCounts[t.provider] = (providerCounts[t.provider] || 0) + 1;
    });
    return Object.entries(providerCounts).map(([name, count]) => ({ name, count }));
  }, []);

  const allProviders = useMemo(() => [...new Set(gpuTariffs.map(t => t.provider))], []);

  const filteredTariffs = useMemo(() => {
    let result = [...gpuTariffs];
    
    if (activeProvider) {
      result = result.filter(t => t.provider === activeProvider);
    }
    
    if (selectedProviders.length > 0) {
      result = result.filter(t => selectedProviders.includes(t.provider));
    }
    
    if (selectedLocations.length > 0) {
      result = result.filter(t => selectedLocations.includes(t.location));
    }
    
    result = result.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    result = result.filter(t => t.cpuCores >= cpuRange[0] && t.cpuCores <= cpuRange[1]);
    result = result.filter(t => t.ram >= ramRange[0] && t.ram <= ramRange[1]);
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'gpu-asc': return a.gpuCount - b.gpuCount;
        case 'gpu-desc': return b.gpuCount - a.gpuCount;
        case 'ram-asc': return a.ram - b.ram;
        case 'ram-desc': return b.ram - a.ram;
        default: return 0;
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
    'gpu-asc': 'По GPU ↑',
    'gpu-desc': 'По GPU ↓',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full text-rose-600 text-sm font-medium mb-4">
              <Cpu className="w-4 h-4" />
              GPU серверы
              <Badge className="bg-rose-500 text-white text-[10px] ml-1">Новинка</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              GPU серверы для AI и Machine Learning
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мощные серверы с NVIDIA GPU для обучения нейросетей, рендеринга и научных вычислений
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-rose-500" />
              <span>NVIDIA H100, A100, RTX 4090</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-500" />
              <span>CUDA & PyTorch ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-500" />
              <span>До 8x GPU в кластере</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-rose-500" />
              <span>InfiniBand / NVLink</span>
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
                  <div
                    key={tariff.id}
                    className={cn(
                      "bg-card rounded-2xl border p-5 transition-all hover:shadow-lg hover:border-rose-200",
                      tariff.highlight && "ring-2 ring-rose-500 ring-offset-2"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{tariff.provider}</p>
                        <h3 className="font-semibold text-foreground">{tariff.name}</h3>
                      </div>
                      {tariff.highlight && (
                        <Badge className="bg-rose-500 text-white">Популярный</Badge>
                      )}
                    </div>

                    {/* GPU Info */}
                    <div className="bg-rose-50 dark:bg-rose-950/30 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-4 h-4 text-rose-600" />
                        <span className="font-medium text-rose-700 dark:text-rose-400">{tariff.gpu}</span>
                      </div>
                      <p className="text-sm text-rose-600 dark:text-rose-400">
                        {tariff.gpuCount}x GPU
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="text-foreground">{tariff.cpuCores} ядер</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RAM</span>
                        <span className="text-foreground">{tariff.ram} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Диск</span>
                        <span className="text-foreground">{tariff.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сеть</span>
                        <span className="text-foreground">{tariff.bandwidth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Локация</span>
                        <span className="text-foreground">{tariff.location}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tariff.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          {tariff.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-sm text-muted-foreground">/мес</span>
                      </div>
                      <Button className="bg-rose-500 hover:bg-rose-600">
                        Заказать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTariffs.length === 0 && (
                <div className="text-center py-12">
                  <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
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

export default GPUPage;
