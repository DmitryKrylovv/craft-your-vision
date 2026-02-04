import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Star, TrendingUp, Award, Users, MessageSquare,
  ExternalLink, ChevronUp, ChevronDown, Search, Shield, Clock, ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  category: string;
  since: number;
  uptime: number;
  support: number;
  price: number;
  features: string[];
  badge?: string;
  trend: 'up' | 'down' | 'stable';
}

interface Review {
  id: string;
  author: string;
  provider: string;
  rating: number;
  text: string;
  date: string;
}

const providers: Provider[] = [
  {
    id: 'timeweb',
    name: 'Timeweb',
    logo: 'TW',
    rating: 4.9,
    reviewsCount: 2847,
    category: 'VPS, Хостинг',
    since: 2006,
    uptime: 99.98,
    support: 4.9,
    price: 4.7,
    features: ['NVMe SSD', 'Бесплатный SSL', 'Антивирус'],
    badge: 'Выбор пользователей',
    trend: 'up',
  },
  {
    id: 'selectel',
    name: 'Selectel',
    logo: 'SE',
    rating: 4.8,
    reviewsCount: 1923,
    category: 'VPS, Облако, Colocation',
    since: 2008,
    uptime: 99.99,
    support: 4.8,
    price: 4.3,
    features: ['Собственные ЦОД', 'API', 'S3 хранилище'],
    badge: 'Лучший uptime',
    trend: 'stable',
  },
  {
    id: 'ruvds',
    name: 'RUVDS',
    logo: 'RU',
    rating: 4.7,
    reviewsCount: 1654,
    category: 'VPS',
    since: 2014,
    uptime: 99.95,
    support: 4.6,
    price: 4.8,
    features: ['DDoS защита', 'Windows VPS', 'Криптооплата'],
    trend: 'up',
  },
  {
    id: 'beget',
    name: 'Beget',
    logo: 'BG',
    rating: 4.7,
    reviewsCount: 3421,
    category: 'Хостинг, VPS',
    since: 2007,
    uptime: 99.96,
    support: 4.9,
    price: 4.9,
    features: ['Бесплатный домен', 'Автобэкап', 'SSH доступ'],
    badge: 'Лучшая поддержка',
    trend: 'stable',
  },
  {
    id: 'vdsina',
    name: 'VDSina',
    logo: 'VD',
    rating: 4.6,
    reviewsCount: 987,
    category: 'VPS',
    since: 2016,
    uptime: 99.94,
    support: 4.5,
    price: 4.9,
    features: ['Почасовая оплата', 'API', 'Snapshots'],
    badge: 'Лучшая цена',
    trend: 'up',
  },
  {
    id: 'reg',
    name: 'REG.RU',
    logo: 'RG',
    rating: 4.5,
    reviewsCount: 4521,
    category: 'Домены, Хостинг, VPS',
    since: 2006,
    uptime: 99.92,
    support: 4.4,
    price: 4.2,
    features: ['№1 по доменам', 'Конструктор сайтов', 'SSL'],
    trend: 'stable',
  },
  {
    id: 'firstvds',
    name: 'FirstVDS',
    logo: 'FV',
    rating: 4.4,
    reviewsCount: 876,
    category: 'VPS, Dedicated',
    since: 2002,
    uptime: 99.90,
    support: 4.3,
    price: 4.5,
    features: ['Арендные серверы', 'ISPmanager', 'IPv6'],
    trend: 'down',
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    logo: 'HZ',
    rating: 4.8,
    reviewsCount: 2156,
    category: 'VPS, Dedicated, Colocation',
    since: 1997,
    uptime: 99.99,
    support: 4.2,
    price: 4.9,
    features: ['Европейские ЦОД', 'Cloud', 'Низкие цены'],
    badge: 'Лучшее соотношение цена/качество',
    trend: 'up',
  },
  {
    id: 'techru',
    name: 'Tech.ru',
    logo: 'TR',
    rating: 4.5,
    reviewsCount: 654,
    category: 'Colocation, Dedicated',
    since: 2005,
    uptime: 99.97,
    support: 4.6,
    price: 4.4,
    features: ['Московские ЦОД', 'Remote Hands', 'Cross-connect'],
    trend: 'up',
  },
  {
    id: 'dataline',
    name: 'DataLine',
    logo: 'DL',
    rating: 4.6,
    reviewsCount: 432,
    category: 'Colocation, Облако',
    since: 2007,
    uptime: 99.98,
    support: 4.7,
    price: 4.0,
    features: ['Tier III ЦОД', 'Гибридное облако', 'SLA'],
    trend: 'stable',
  },
];

const recentReviews: Review[] = [
  { id: '1', author: 'Алексей М.', provider: 'Timeweb', rating: 5, text: 'Отличный хостинг! Переехал с другого провайдера, разница огромная. Поддержка отвечает за минуты.', date: '2 часа назад' },
  { id: '2', author: 'Ирина К.', provider: 'Selectel', rating: 5, text: 'Пользуюсь уже 3 года, ни разу не подвели. Uptime реально 99.99%, проверял сам.', date: '5 часов назад' },
  { id: '3', author: 'Дмитрий В.', provider: 'Beget', rating: 5, text: 'Лучшая техподдержка из всех, что встречал. Помогли настроить сервер бесплатно!', date: '8 часов назад' },
  { id: '4', author: 'Марина С.', provider: 'RUVDS', rating: 4, text: 'Хороший VPS за свои деньги. Иногда бывают небольшие задержки в поддержке, но в целом доволен.', date: '12 часов назад' },
  { id: '5', author: 'Павел Н.', provider: 'Hetzner', rating: 5, text: 'Цены просто космос! За эти деньги такие характеристики — это подарок.', date: '1 день назад' },
  { id: '6', author: 'Ольга Р.', provider: 'VDSina', rating: 5, text: 'Почасовая оплата — то что нужно для тестов. Очень удобно и выгодно.', date: '1 день назад' },
  { id: '7', author: 'Сергей Л.', provider: 'REG.RU', rating: 4, text: 'Домены регистрирую только тут. Цены адекватные, автопродление работает.', date: '2 дня назад' },
  { id: '8', author: 'Анна Б.', provider: 'DataLine', rating: 5, text: 'Разместили серверы в их ЦОД — всё на высшем уровне. Рекомендую для colocation.', date: '2 дня назад' },
];

const ProvidersRatingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    providers.forEach(p => {
      p.category.split(', ').forEach(c => cats.add(c));
    });
    return Array.from(cats).sort();
  }, []);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category.includes(categoryFilter));
    }

    // Sort by rating by default
    result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, categoryFilter]);

  const totalReviews = providers.reduce((sum, p) => sum + p.reviewsCount, 0);
  const avgRating = (providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(1);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return 'text-emerald-600';
    if (rating >= 4.4) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
          <div className="container py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Award className="w-4 h-4" />
                  Независимый рейтинг
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Рейтинг хостинг-
                  <br />
                  <span className="text-primary">провайдеров России</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Актуальный рейтинг на основе реальных отзывов пользователей. Сравнивайте провайдеров и выбирайте лучшего.
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    {totalReviews.toLocaleString()} отзывов
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    Проверенные данные
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Обновлено сегодня
                  </div>
                </div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold text-foreground mb-1">{providers.length}</div>
                  <div className="text-sm text-muted-foreground">Провайдеров</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold text-primary mb-1">{avgRating}</div>
                  <div className="text-sm text-muted-foreground">Средний рейтинг</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold text-foreground mb-1">{totalReviews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Отзывов</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Средний uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Search & Filters */}
        <section className="border-b border-border">
          <div className="container py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Найти провайдера по названию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl text-base"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px] h-12 rounded-xl">
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="container py-6 md:py-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden lg:grid grid-cols-[60px_1fr_140px_100px_100px_140px] gap-3 px-6 py-4 bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div>#</div>
              <div>Провайдер</div>
              <div>Рейтинг</div>
              <div>Uptime</div>
              <div className="text-center">Поддержка</div>
              <div className="text-right">Действия</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {filteredProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  className={cn(
                    "group hover:bg-muted/30 transition-colors",
                    provider.badge && "bg-primary/[0.03]"
                  )}
                >
                  {/* Desktop Row */}
                  <div className="hidden lg:grid grid-cols-[60px_1fr_140px_100px_100px_140px] gap-3 px-6 py-4 items-center">
                    {/* Rank */}
                    <div>
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm",
                        index === 0 && "bg-amber-500 text-white",
                        index === 1 && "bg-slate-400 text-white",
                        index === 2 && "bg-amber-700 text-white",
                        index > 2 && "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shrink-0 text-sm",
                        index === 0 ? "bg-primary" : "bg-slate-600"
                      )}>
                        {provider.logo}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{provider.name}</span>
                          {provider.trend === 'up' && (
                            <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          {provider.trend === 'down' && (
                            <ChevronDown className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {provider.category}
                        </div>
                        {provider.badge && (
                          <Badge className="mt-1.5 bg-primary/10 text-primary text-[10px] font-medium border-0">
                            {provider.badge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <Star className={cn("w-5 h-5 fill-current shrink-0", getRatingColor(provider.rating))} />
                      <div>
                        <span className={cn("text-lg font-bold", getRatingColor(provider.rating))}>
                          {provider.rating}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({provider.reviewsCount.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Uptime */}
                    <div>
                      <span className={cn(
                        "text-sm font-medium",
                        provider.uptime >= 99.95 ? "text-emerald-600" : "text-muted-foreground"
                      )}>
                        {provider.uptime}%
                      </span>
                    </div>

                    {/* Support */}
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(provider.support / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">{provider.support}</span>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-end">
                      <Link to={`/provider/${provider.id}`}>
                        <Button size="sm" variant="outline" className="rounded-lg text-xs">
                          Подробнее
                          <ExternalLink className="w-3 h-3 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile/Tablet Row */}
                  <div className="lg:hidden px-4 py-4">
                    <div className="flex items-start gap-3">
                      {/* Rank */}
                      <div className={cn(
                        "w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0",
                        index === 0 && "bg-amber-500 text-white",
                        index === 1 && "bg-slate-400 text-white",
                        index === 2 && "bg-amber-700 text-white",
                        index > 2 && "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>

                      {/* Logo */}
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shrink-0 text-xs",
                        index === 0 ? "bg-primary" : "bg-slate-600"
                      )}>
                        {provider.logo}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-semibold text-foreground truncate">{provider.name}</span>
                            {provider.trend === 'up' && (
                              <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                            {provider.trend === 'down' && (
                              <ChevronDown className="w-4 h-4 text-red-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className={cn("w-4 h-4 fill-current", getRatingColor(provider.rating))} />
                            <span className={cn("font-bold", getRatingColor(provider.rating))}>
                              {provider.rating}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                          {provider.category}
                        </div>

                        {provider.badge && (
                          <Badge className="mt-2 bg-primary/10 text-primary text-[10px] font-medium border-0">
                            {provider.badge}
                          </Badge>
                        )}

                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className={provider.uptime >= 99.95 ? "text-emerald-600 font-medium" : ""}>
                            Uptime: {provider.uptime}%
                          </span>
                          <span>С {provider.since} г.</span>
                        </div>

                        <div className="mt-3">
                          <Link to={`/provider/${provider.id}`}>
                            <Button size="sm" variant="outline" className="rounded-lg text-xs w-full">
                              Подробнее
                              <ExternalLink className="w-3 h-3 ml-1.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Провайдеры не найдены</p>
                <p className="text-sm">Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container py-8 md:py-12">
          <div className="flex items-center gap-2 mb-6">
            <ThumbsUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Последние отзывы</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentReviews.slice(0, 8).map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {review.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{review.author}</div>
                      <div className="text-xs text-muted-foreground">{review.provider}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{review.text}</p>
                <div className="text-xs text-muted-foreground mt-3">{review.date}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProvidersRatingPage;
