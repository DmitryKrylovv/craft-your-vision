import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Search, SlidersHorizontal, Star, MapPin, Server, Zap, Globe, Shield, 
  X, ChevronDown, Check, Clock, TrendingUp, LayoutGrid, List, ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  categories: string[];
  locations: string[];
  since: number;
  uptime: number;
  minPrice: number;
  features: string[];
  badge?: string;
  description: string;
}

const allProviders: Provider[] = [
  {
    id: 'timeweb',
    name: 'Timeweb',
    logo: 'TW',
    rating: 4.9,
    reviewsCount: 2847,
    categories: ['vps', 'hosting'],
    locations: ['moscow', 'spb', 'europe'],
    since: 2006,
    uptime: 99.98,
    minPrice: 169,
    features: ['NVMe SSD', 'Бесплатный SSL', 'Антивирус', 'DDoS защита'],
    badge: 'Выбор пользователей',
    description: 'Один из крупнейших хостинг-провайдеров России с широким спектром услуг.',
  },
  {
    id: 'selectel',
    name: 'Selectel',
    logo: 'SE',
    rating: 4.8,
    reviewsCount: 1923,
    categories: ['vps', 'cloud', 'dedicated'],
    locations: ['moscow', 'spb'],
    since: 2008,
    uptime: 99.99,
    minPrice: 499,
    features: ['Собственные ЦОД', 'API', 'S3 хранилище', 'Kubernetes'],
    badge: 'Лучший uptime',
    description: 'Провайдер IT-инфраструктуры с собственными дата-центрами в России.',
  },
  {
    id: 'ruvds',
    name: 'RUVDS',
    logo: 'RU',
    rating: 4.7,
    reviewsCount: 1654,
    categories: ['vps'],
    locations: ['moscow', 'spb', 'europe', 'usa'],
    since: 2014,
    uptime: 99.95,
    minPrice: 199,
    features: ['DDoS защита', 'Windows VPS', 'Криптооплата', 'ISO установка'],
    description: 'VPS-провайдер с акцентом на безопасность и анонимность.',
  },
  {
    id: 'beget',
    name: 'Beget',
    logo: 'BG',
    rating: 4.7,
    reviewsCount: 3421,
    categories: ['hosting', 'vps'],
    locations: ['moscow', 'spb'],
    since: 2007,
    uptime: 99.96,
    minPrice: 119,
    features: ['Бесплатный домен', 'Автобэкап', 'SSH доступ', 'Git'],
    badge: 'Лучшая поддержка',
    description: 'Популярный хостинг-провайдер с отличной технической поддержкой.',
  },
  {
    id: 'vdsina',
    name: 'VDSina',
    logo: 'VD',
    rating: 4.6,
    reviewsCount: 987,
    categories: ['vps', 'cloud'],
    locations: ['moscow', 'europe', 'usa'],
    since: 2016,
    uptime: 99.94,
    minPrice: 99,
    features: ['Почасовая оплата', 'API', 'Snapshots', 'Firewall'],
    badge: 'Лучшая цена',
    description: 'Облачный VPS-провайдер с почасовой тарификацией.',
  },
  {
    id: 'reg',
    name: 'REG.RU',
    logo: 'RG',
    rating: 4.5,
    reviewsCount: 4521,
    categories: ['hosting', 'vps', 'dedicated'],
    locations: ['moscow'],
    since: 2006,
    uptime: 99.92,
    minPrice: 149,
    features: ['№1 по доменам', 'Конструктор сайтов', 'SSL', 'DNS-хостинг'],
    description: 'Крупнейший регистратор доменов и хостинг-провайдер в России.',
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    logo: 'HZ',
    rating: 4.8,
    reviewsCount: 2156,
    categories: ['vps', 'dedicated', 'cloud'],
    locations: ['europe'],
    since: 1997,
    uptime: 99.99,
    minPrice: 299,
    features: ['Европейские ЦОД', 'Cloud', 'Низкие цены', 'Load Balancer'],
    badge: 'Цена/качество',
    description: 'Немецкий провайдер с отличным соотношением цена/качество.',
  },
  {
    id: 'firstvds',
    name: 'FirstVDS',
    logo: 'FV',
    rating: 4.4,
    reviewsCount: 876,
    categories: ['vps', 'dedicated'],
    locations: ['moscow', 'spb'],
    since: 2002,
    uptime: 99.90,
    minPrice: 189,
    features: ['Арендные серверы', 'ISPmanager', 'IPv6', 'Бэкапы'],
    description: 'Один из старейших VPS-провайдеров России.',
  },
  {
    id: 'dataline',
    name: 'DataLine',
    logo: 'DL',
    rating: 4.6,
    reviewsCount: 432,
    categories: ['dedicated', 'cloud'],
    locations: ['moscow'],
    since: 2007,
    uptime: 99.98,
    minPrice: 2990,
    features: ['Tier III ЦОД', 'Гибридное облако', 'SLA 99.98%', 'Remote Hands'],
    description: 'Провайдер услуг ЦОД и облачных решений корпоративного класса.',
  },
  {
    id: 'techru',
    name: 'Tech.ru',
    logo: 'TR',
    rating: 4.5,
    reviewsCount: 654,
    categories: ['dedicated', 'cloud'],
    locations: ['moscow'],
    since: 2005,
    uptime: 99.97,
    minPrice: 1990,
    features: ['Московские ЦОД', 'Remote Hands', 'Cross-connect', 'SLA'],
    description: 'Российский провайдер с фокусом на colocation и выделенные серверы.',
  },
];

const serviceTypes = [
  { id: 'vps', label: 'VPS', icon: Server },
  { id: 'hosting', label: 'Хостинг', icon: Globe },
  { id: 'dedicated', label: 'Выделенные', icon: Server },
  { id: 'cloud', label: 'Облачные', icon: Zap },
];

const locationOptions = [
  { id: 'moscow', label: 'Москва' },
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'europe', label: 'Европа' },
  { id: 'usa', label: 'США' },
  { id: 'asia', label: 'Азия' },
];

const ratingOptions = [4.5, 4.0, 3.5];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get('types')?.split(',').filter(Boolean) || []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams.get('locations')?.split(',').filter(Boolean) || []
  );
  const [minRating, setMinRating] = useState<number | null>(
    searchParams.get('rating') ? Number(searchParams.get('rating')) : null
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedTypes.length) params.types = selectedTypes.join(',');
    if (selectedLocations.length) params.locations = selectedLocations.join(',');
    if (minRating) params.rating = String(minRating);
    if (maxPrice) params.maxPrice = String(maxPrice);
    if (sortBy !== 'rating') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedTypes, selectedLocations, minRating, maxPrice, sortBy]);

  const filteredProviders = useMemo(() => {
    let result = [...allProviders];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (selectedTypes.length) {
      result = result.filter(p => selectedTypes.some(t => p.categories.includes(t)));
    }

    if (selectedLocations.length) {
      result = result.filter(p => selectedLocations.some(l => p.locations.includes(l)));
    }

    if (minRating) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (maxPrice) {
      result = result.filter(p => p.minPrice <= maxPrice);
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'price-asc':
        result.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case 'uptime':
        result.sort((a, b) => b.uptime - a.uptime);
        break;
    }

    return result;
  }, [searchQuery, selectedTypes, selectedLocations, minRating, maxPrice, sortBy]);

  const toggleType = (id: string) => setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  const toggleLocation = (id: string) => setSelectedLocations(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);

  const activeFiltersCount = selectedTypes.length + selectedLocations.length + (minRating ? 1 : 0) + (maxPrice ? 1 : 0);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setMinRating(null);
    setMaxPrice(null);
  };

  const FilterSidebar = ({ className }: { className?: string }) => (
    <div className={cn("space-y-6", className)}>
      {/* Service Types */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Server className="w-4 h-4 text-primary" />
          Тип услуги
        </h3>
        <div className="space-y-2">
          {serviceTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border text-left",
                  selectedTypes.includes(type.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {type.label}
                {selectedTypes.includes(type.id) && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          Расположение серверов
        </h3>
        <div className="space-y-2">
          {locationOptions.map(loc => (
            <button
              key={loc.id}
              onClick={() => toggleLocation(loc.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border text-left",
                selectedLocations.includes(loc.id)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {loc.label}
              {selectedLocations.includes(loc.id) && <Check className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Star className="w-4 h-4 text-primary" />
          Минимальный рейтинг
        </h3>
        <div className="space-y-2">
          {ratingOptions.map(r => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? null : r)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border text-left",
                minRating === r
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              {r}+ и выше
              {minRating === r && <Check className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Максимальная цена</h3>
        <div className="grid grid-cols-2 gap-2">
          {[300, 500, 1000, 3000].map(price => (
            <button
              key={price}
              onClick={() => setMaxPrice(maxPrice === price ? null : price)}
              className={cn(
                "px-3 py-2.5 rounded-xl text-sm font-medium transition-all border",
                maxPrice === price
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              до {price}₽
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Сбросить все фильтры ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Hero */}
        <section className="border-b border-border bg-muted/30">
          <div className="container py-6 md:py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Поиск провайдеров
            </h1>
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                placeholder="Поиск по названию, услугам, технологиям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-14 pl-12 pr-12 bg-background border border-border rounded-2xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Quick filters - horizontal chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {serviceTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border",
                      selectedTypes.includes(type.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-6">
          <div className="flex gap-6">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-[140px]">
                <FilterSidebar />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-5 gap-3">
                <div className="text-sm text-muted-foreground">
                  Найдено <span className="font-semibold text-foreground">{filteredProviders.length}</span> провайдеров
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="ml-2 text-primary hover:underline">
                      Сбросить фильтры
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile filter toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden rounded-xl gap-1.5"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Фильтры
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9 rounded-xl text-sm hidden sm:flex">
                      <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="reviews">По отзывам</SelectItem>
                      <SelectItem value="price-asc">Цена ↑</SelectItem>
                      <SelectItem value="price-desc">Цена ↓</SelectItem>
                      <SelectItem value="uptime">По uptime</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn("p-2 transition-colors", viewMode === 'grid' ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn("p-2 transition-colors", viewMode === 'list' ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="lg:hidden mb-6 p-4 bg-card border border-border rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-foreground">Фильтры</span>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              )}

              {/* Active filter tags */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTypes.map(t => {
                    const type = serviceTypes.find(st => st.id === t);
                    return type ? (
                      <Badge key={t} variant="secondary" className="gap-1 pr-1 rounded-lg">
                        {type.label}
                        <button onClick={() => toggleType(t)} className="p-0.5 hover:bg-foreground/10 rounded">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                  {selectedLocations.map(l => {
                    const loc = locationOptions.find(lo => lo.id === l);
                    return loc ? (
                      <Badge key={l} variant="secondary" className="gap-1 pr-1 rounded-lg">
                        {loc.label}
                        <button onClick={() => toggleLocation(l)} className="p-0.5 hover:bg-foreground/10 rounded">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                  {minRating && (
                    <Badge variant="secondary" className="gap-1 pr-1 rounded-lg">
                      ★ {minRating}+
                      <button onClick={() => setMinRating(null)} className="p-0.5 hover:bg-foreground/10 rounded">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {maxPrice && (
                    <Badge variant="secondary" className="gap-1 pr-1 rounded-lg">
                      до {maxPrice}₽
                      <button onClick={() => setMaxPrice(null)} className="p-0.5 hover:bg-foreground/10 rounded">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Results Grid */}
              {filteredProviders.length > 0 ? (
                <div className={cn(
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "space-y-3"
                )}>
                  {filteredProviders.map(provider => (
                    viewMode === 'grid' ? (
                      <ProviderGridCard key={provider.id} provider={provider} />
                    ) : (
                      <ProviderListCard key={provider.id} provider={provider} />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ничего не найдено</h3>
                  <p className="text-muted-foreground mb-4">Попробуйте изменить параметры поиска или сбросить фильтры</p>
                  <Button variant="outline" onClick={clearFilters} className="rounded-xl">
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const ProviderGridCard = ({ provider }: { provider: Provider }) => (
  <Link
    to={`/provider/${provider.id}`}
    className="block bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all group"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
        {provider.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {provider.name}
          </h3>
          {provider.badge && (
            <Badge className="bg-primary/10 text-primary border-0 text-[10px] shrink-0">
              {provider.badge}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
          <span className="text-xs text-muted-foreground">({provider.reviewsCount.toLocaleString()})</span>
        </div>
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{provider.description}</p>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {provider.features.slice(0, 3).map(f => (
        <span key={f} className="text-[11px] px-2 py-1 bg-muted rounded-lg text-muted-foreground">
          {f}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-border">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          {provider.uptime}%
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          с {provider.since}
        </span>
      </div>
      <div className="text-right">
        <span className="text-xs text-muted-foreground">от </span>
        <span className="font-bold text-foreground">{provider.minPrice}₽</span>
        <span className="text-xs text-muted-foreground">/мес</span>
      </div>
    </div>
  </Link>
);

const ProviderListCard = ({ provider }: { provider: Provider }) => (
  <Link
    to={`/provider/${provider.id}`}
    className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-lg transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
      {provider.logo}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {provider.name}
        </h3>
        {provider.badge && (
          <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
            {provider.badge}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-1">{provider.description}</p>
    </div>

    <div className="hidden sm:flex items-center gap-1.5 shrink-0">
      <Star className="w-4 h-4 fill-primary text-primary" />
      <span className="font-semibold text-foreground">{provider.rating}</span>
      <span className="text-xs text-muted-foreground">({provider.reviewsCount.toLocaleString()})</span>
    </div>

    <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground shrink-0">
      <Shield className="w-3.5 h-3.5" />
      {provider.uptime}%
    </div>

    <div className="text-right shrink-0">
      <span className="text-xs text-muted-foreground">от </span>
      <span className="font-bold text-foreground">{provider.minPrice}₽</span>
    </div>
  </Link>
);

export default SearchPage;
