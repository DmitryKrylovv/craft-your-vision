import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CloudConfigurator from '@/components/cloud/CloudConfigurator';
import CloudProvidersList from '@/components/cloud/CloudProvidersList';
import { Cloud, Server, Shield, Zap, ArrowRight, Check, Clock, Cpu, HardDrive, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CloudConfig {
  provider: string | null;
  location: string | null;
  os: string | null;
  cpu: number;
  ram: number;
  storage: number;
  storageType: 'ssd' | 'nvme';
}

export interface CloudProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  locations: string[];
  operatingSystems: string[];
  pricePerCore: number;
  pricePerGbRam: number;
  pricePerGbStorage: number;
  pricePerGbNvme: number;
  minCpu: number;
  maxCpu: number;
  minRam: number;
  maxRam: number;
  minStorage: number;
  maxStorage: number;
  features: string[];
}

const cloudProviders: CloudProvider[] = [
  {
    id: 'timeweb',
    name: 'Timeweb Cloud',
    logo: '⚡',
    rating: 4.8,
    locations: ['Москва', 'Санкт-Петербург', 'Казань', 'Амстердам'],
    operatingSystems: ['Ubuntu 22.04', 'Ubuntu 20.04', 'Debian 12', 'CentOS 9', 'Windows Server 2022'],
    pricePerCore: 150,
    pricePerGbRam: 100,
    pricePerGbStorage: 5,
    pricePerGbNvme: 10,
    minCpu: 1,
    maxCpu: 32,
    minRam: 1,
    maxRam: 128,
    minStorage: 10,
    maxStorage: 1000,
    features: ['DDoS-защита', 'Бэкапы', 'API'],
  },
  {
    id: 'selectel',
    name: 'Selectel',
    logo: '🔷',
    rating: 4.7,
    locations: ['Москва', 'Санкт-Петербург'],
    operatingSystems: ['Ubuntu 22.04', 'Ubuntu 20.04', 'Debian 12', 'Debian 11', 'CentOS 9', 'Rocky Linux 9'],
    pricePerCore: 180,
    pricePerGbRam: 120,
    pricePerGbStorage: 6,
    pricePerGbNvme: 12,
    minCpu: 1,
    maxCpu: 64,
    minRam: 1,
    maxRam: 256,
    minStorage: 10,
    maxStorage: 2000,
    features: ['Kubernetes', 'S3 Storage', 'Managed DBs'],
  },
  {
    id: 'vdsina',
    name: 'VDSina',
    logo: '🟢',
    rating: 4.5,
    locations: ['Москва', 'Амстердам', 'Франкфурт'],
    operatingSystems: ['Ubuntu 22.04', 'Ubuntu 20.04', 'Debian 12', 'CentOS 8'],
    pricePerCore: 120,
    pricePerGbRam: 80,
    pricePerGbStorage: 4,
    pricePerGbNvme: 8,
    minCpu: 1,
    maxCpu: 16,
    minRam: 0.5,
    maxRam: 64,
    minStorage: 5,
    maxStorage: 500,
    features: ['Низкие цены', 'Быстрый старт'],
  },
  {
    id: 'ruvds',
    name: 'RuVDS',
    logo: '🔴',
    rating: 4.4,
    locations: ['Москва', 'Новосибирск', 'Казань', 'Екатеринбург'],
    operatingSystems: ['Ubuntu 22.04', 'Debian 12', 'CentOS 9', 'Windows Server 2019', 'Windows Server 2022'],
    pricePerCore: 140,
    pricePerGbRam: 90,
    pricePerGbStorage: 5,
    pricePerGbNvme: 9,
    minCpu: 1,
    maxCpu: 24,
    minRam: 1,
    maxRam: 96,
    minStorage: 10,
    maxStorage: 800,
    features: ['Региональные ЦОД', 'Windows лицензии'],
  },
  {
    id: 'beget',
    name: 'Beget',
    logo: '🟡',
    rating: 4.6,
    locations: ['Москва', 'Санкт-Петербург'],
    operatingSystems: ['Ubuntu 22.04', 'Ubuntu 20.04', 'Debian 12'],
    pricePerCore: 160,
    pricePerGbRam: 110,
    pricePerGbStorage: 5,
    pricePerGbNvme: 11,
    minCpu: 1,
    maxCpu: 16,
    minRam: 1,
    maxRam: 64,
    minStorage: 10,
    maxStorage: 500,
    features: ['Простая панель', 'Техподдержка 24/7'],
  },
];

const allLocations = Array.from(new Set(cloudProviders.flatMap(p => p.locations)));
const allOS = Array.from(new Set(cloudProviders.flatMap(p => p.operatingSystems)));

const CloudPage = () => {
  const [config, setConfig] = useState<CloudConfig>({
    provider: null,
    location: null,
    os: null,
    cpu: 2,
    ram: 4,
    storage: 40,
    storageType: 'ssd',
  });

  const filteredProviders = useMemo(() => {
    return cloudProviders.filter(provider => {
      if (config.location && !provider.locations.includes(config.location)) return false;
      if (config.os && !provider.operatingSystems.includes(config.os)) return false;
      if (config.cpu < provider.minCpu || config.cpu > provider.maxCpu) return false;
      if (config.ram < provider.minRam || config.ram > provider.maxRam) return false;
      if (config.storage < provider.minStorage || config.storage > provider.maxStorage) return false;
      return true;
    });
  }, [config]);

  const calculatePrice = (provider: CloudProvider) => {
    const cpuPrice = config.cpu * provider.pricePerCore;
    const ramPrice = config.ram * provider.pricePerGbRam;
    const storagePrice = config.storage * (config.storageType === 'nvme' ? provider.pricePerGbNvme : provider.pricePerGbStorage);
    return cpuPrice + ramPrice + storagePrice;
  };

  const providersWithPrices = useMemo(() => {
    return filteredProviders
      .map(provider => ({
        ...provider,
        calculatedPrice: calculatePrice(provider),
      }))
      .sort((a, b) => a.calculatedPrice - b.calculatedPrice);
  }, [filteredProviders, config]);

  const availableLocations = config.provider
    ? cloudProviders.find(p => p.id === config.provider)?.locations || []
    : allLocations;

  const availableOS = config.provider
    ? cloudProviders.find(p => p.id === config.provider)?.operatingSystems || []
    : allOS;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left - Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Cloud className="w-4 h-4" />
                  Облачные серверы
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Настройте сервер.
                  <br />
                  <span className="text-primary">Сравните цены.</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Конфигуратор облачных серверов от {cloudProviders.length} провайдеров. Выберите ресурсы — мы покажем лучшие предложения.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button size="lg" className="rounded-xl">
                    Подобрать сервер
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
                    Без наценки
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Запуск за 60 сек
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    DDoS-защита
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">{cloudProviders.length}</div>
                      <div className="text-sm text-muted-foreground">провайдеров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">{allLocations.length}</div>
                      <div className="text-sm text-muted-foreground">локаций</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">{allOS.length}</div>
                      <div className="text-sm text-muted-foreground">ОС</div>
                    </div>
                  </div>
                </div>

                {/* Feature Block 1 */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">До 64 vCPU</div>
                  <div className="text-xs text-muted-foreground">Мощные процессоры</div>
                </div>

                {/* Feature Block 2 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">До 256 ГБ RAM</div>
                  <div className="text-xs text-muted-foreground">Для любых нагрузок</div>
                </div>

                {/* Feature Block 3 */}
                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <HardDrive className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">NVMe диски</div>
                  <div className="text-xs text-muted-foreground">Максимальная скорость</div>
                </div>

                {/* Feature Block 4 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Мгновенный запуск</div>
                  <div className="text-xs text-muted-foreground">Сервер за минуту</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Configurator */}
        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <CloudConfigurator
                  config={config}
                  onConfigChange={setConfig}
                  locations={availableLocations}
                  operatingSystems={availableOS}
                  providers={cloudProviders}
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <CloudProvidersList
                providers={providersWithPrices}
                selectedProvider={config.provider}
                onProviderSelect={(id) => setConfig(prev => ({ ...prev, provider: id }))}
                config={config}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CloudPage;
