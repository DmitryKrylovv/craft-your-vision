import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Shield, ShieldCheck, Zap, Globe, Server, BarChart3, Clock, 
  Check, ArrowRight, AlertTriangle, Lock, Layers, Activity,
  ChevronDown, Star, MapPin, ExternalLink, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

/* ─── Types ─── */
interface DDoSTariff {
  id: string;
  provider: string;
  providerLogo: string;
  name: string;
  type: 'l3-l4' | 'l7' | 'full';
  bandwidth: string;
  mitigation: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  location: string;
  rating: number;
}

/* ─── Data ─── */
const tariffs: DDoSTariff[] = [
  { id: '1', provider: 'DDoS-Guard', providerLogo: 'DG', name: 'Basic', type: 'l3-l4', bandwidth: '100 Гбит/с', mitigation: 'до 500 Гбит/с', price: 2900, features: ['Фильтрация L3/L4', 'Защита IP', 'Мониторинг 24/7'], location: 'Москва', rating: 4.7 },
  { id: '2', provider: 'DDoS-Guard', providerLogo: 'DG', name: 'Pro', type: 'full', bandwidth: '500 Гбит/с', mitigation: 'до 1.5 Тбит/с', price: 9900, features: ['L3-L7 защита', 'WAF', 'GeoIP фильтрация', 'API'], isPopular: true, location: 'Москва', rating: 4.7 },
  { id: '3', provider: 'Qrator', providerLogo: 'QR', name: 'Стандарт', type: 'full', bandwidth: '500 Гбит/с', mitigation: 'до 3 Тбит/с', price: 14900, features: ['L3-L7 защита', 'Анализ трафика AI', 'BGP Anycast', 'SLA 99.95%'], location: 'Глобально', rating: 4.8 },
  { id: '4', provider: 'StormWall', providerLogo: 'SW', name: 'Lite', type: 'l3-l4', bandwidth: '200 Гбит/с', mitigation: 'до 1 Тбит/с', price: 3500, features: ['Фильтрация L3/L4', 'GRE туннель', 'Панель управления'], location: 'Москва', rating: 4.5 },
  { id: '5', provider: 'StormWall', providerLogo: 'SW', name: 'Optimal', type: 'l7', bandwidth: '500 Гбит/с', mitigation: 'до 1.5 Тбит/с', price: 7500, features: ['L7 защита сайта', 'CDN', 'SSL сертификат', 'Бот-защита'], isPopular: true, location: 'Глобально', rating: 4.5 },
  { id: '6', provider: 'Selectel', providerLogo: 'SL', name: 'DDoS Protection', type: 'l3-l4', bandwidth: '100 Гбит/с', mitigation: 'до 500 Гбит/с', price: 4990, features: ['Защита инфраструктуры', 'Интеграция с Cloud', 'SLA 99.9%'], location: 'СПб', rating: 4.9 },
  { id: '7', provider: 'Qrator', providerLogo: 'QR', name: 'Enterprise', type: 'full', bandwidth: '1 Тбит/с', mitigation: 'до 5 Тбит/с', price: 49900, features: ['Полная защита', 'Выделенный инженер', 'Custom правила', 'Отчётность'], location: 'Глобально', rating: 4.8 },
  { id: '8', provider: 'DDoS-Guard', providerLogo: 'DG', name: 'Website', type: 'l7', bandwidth: '200 Гбит/с', mitigation: 'до 1 Тбит/с', price: 4500, features: ['Защита сайта', 'CDN', 'SSL', 'Бот-фильтрация'], location: 'Москва', rating: 4.7 },
];

const protectionTypes = [
  { value: 'all', label: 'Все типы' },
  { value: 'l3-l4', label: 'L3/L4 (Сетевой)' },
  { value: 'l7', label: 'L7 (Прикладной)' },
  { value: 'full', label: 'Комплексная' },
];

const features = [
  { icon: Shield, title: 'Фильтрация L3-L7', desc: 'Защита от всех типов DDoS-атак: от сетевых флудов до сложных HTTP-атак' },
  { icon: Zap, title: 'Мгновенная активация', desc: 'Подключение защиты за считанные минуты без даунтайма и смены IP' },
  { icon: Globe, title: 'Глобальная сеть', desc: 'Точки очистки трафика по всему миру с ёмкостью до 5 Тбит/с' },
  { icon: Activity, title: 'Мониторинг 24/7', desc: 'Круглосуточный мониторинг и автоматическая реакция на аномалии' },
  { icon: Lock, title: 'WAF + Бот-защита', desc: 'Web Application Firewall и интеллектуальная защита от ботов' },
  { icon: BarChart3, title: 'Аналитика атак', desc: 'Подробная статистика, отчёты и оповещения об инцидентах' },
];

const howItWorks = [
  { step: '01', title: 'Подключение', desc: 'Измените DNS-записи или настройте BGP/GRE туннель к сети очистки' },
  { step: '02', title: 'Анализ трафика', desc: 'Весь трафик проходит через центры очистки и анализируется в реальном времени' },
  { step: '03', title: 'Фильтрация', desc: 'Вредоносный трафик блокируется, легитимный — направляется на ваш сервер' },
  { step: '04', title: 'Защита', desc: 'Ваш сервис остаётся доступным даже во время крупномасштабных атак' },
];

/* ─── Page ─── */
const DDoSPage = () => {
  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredTariffs = useMemo(() => {
    let result = activeType === 'all' ? tariffs : tariffs.filter(t => t.type === activeType);
    
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'bandwidth': return parseInt(b.bandwidth) - parseInt(a.bandwidth);
        default: return 0;
      }
    });
    
    return result;
  }, [activeType, sortBy]);

  const providers = useMemo(() => {
    const map = new Map<string, { count: number; logo: string; rating: number }>();
    tariffs.forEach(t => {
      const existing = map.get(t.provider);
      if (existing) {
        existing.count++;
      } else {
        map.set(t.provider, { count: 1, logo: t.providerLogo, rating: t.rating });
      }
    });
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative bg-foreground overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-20 w-48 h-48 bg-destructive/10 rounded-full blur-[80px]" />

          <div className="container px-3 sm:px-4 relative z-10 py-16 sm:py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                  Сетевые услуги
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-4 sm:mb-6">
                Защита от{' '}
                <span className="text-primary">DDoS-атак</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-background/60 max-w-2xl mb-6 sm:mb-8">
                Сравните предложения ведущих провайдеров защиты. Фильтрация L3-L7, 
                WAF, CDN и мониторинг — всё в одном месте.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-background/70">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm sm:text-base">До 5 Тбит/с ёмкости</span>
                </div>
                <div className="flex items-center gap-2 text-background/70">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm sm:text-base">Подключение за 10 мин</span>
                </div>
                <div className="flex items-center gap-2 text-background/70">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-sm sm:text-base">SLA 99.95%</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="text-base">
                  Подобрать защиту
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10">
                  Как это работает
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section className="bg-card border-b border-border">
          <div className="container px-3 sm:px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { value: '5 Тбит/с', label: 'Макс. ёмкость фильтрации' },
                { value: '4', label: 'Провайдера защиты' },
                { value: '<10 мс', label: 'Задержка фильтрации' },
                { value: '99.95%', label: 'Гарантия SLA' },
              ].map(s => (
                <div key={s.label} className="py-5 sm:py-6 px-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features Grid ─── */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Почему нужна DDoS-защита
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Современные атаки становятся всё мощнее — защитите свою инфраструктуру
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((f) => (
                <div key={f.title} className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                Как работает защита
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Простое подключение за 4 шага
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item, i) => (
                <div key={item.step} className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Provider Bar ─── */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container px-3 sm:px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground mr-2">Провайдеры:</span>
              {providers.map(p => (
                <button
                  key={p.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 transition-colors text-sm"
                >
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-primary">{p.logo}</span>
                  <span className="text-foreground font-medium">{p.name}</span>
                  <span className="text-muted-foreground">({p.count})</span>
                  <span className="flex items-center gap-0.5 text-xs">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    {p.rating}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tariffs ─── */}
        <section className="py-10 sm:py-14 md:py-20 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Тарифы защиты ({filteredTariffs.length})
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Type filter */}
                <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                  {protectionTypes.map(pt => (
                    <button
                      key={pt.value}
                      onClick={() => setActiveType(pt.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all",
                        activeType === pt.value
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground"
                >
                  <option value="price-asc">По цене ↑</option>
                  <option value="price-desc">По цене ↓</option>
                  <option value="bandwidth">По ёмкости</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredTariffs.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    "relative bg-card border rounded-2xl p-5 sm:p-6 transition-all hover:shadow-md",
                    t.isPopular
                      ? "border-primary/30 ring-2 ring-primary/10"
                      : "border-border hover:border-primary/20"
                  )}
                >
                  {t.isPopular && (
                    <div className="absolute -top-2.5 right-4">
                      <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-medium">
                        Популярный
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold text-primary">
                        {t.providerLogo}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t.provider}</div>
                        <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-foreground">
                        {t.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-xs text-muted-foreground">/месяц</div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-muted/50 rounded-xl">
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Тип</div>
                      <div className="text-sm font-medium text-foreground mt-0.5">
                        {t.type === 'l3-l4' ? 'L3/L4' : t.type === 'l7' ? 'L7' : 'L3-L7'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Канал</div>
                      <div className="text-sm font-medium text-foreground mt-0.5">{t.bandwidth}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Ёмкость</div>
                      <div className="text-sm font-medium text-foreground mt-0.5">{t.mitigation}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.features.map(f => (
                      <span key={f} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{f}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {t.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" /> {t.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/provider/${t.provider.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> На сайт
                        </Link>
                      </Button>
                      <Button size="sm">Заказать</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Alert Section ─── */}
        <section className="py-10 sm:py-14 bg-destructive/5 border-y border-destructive/10">
          <div className="container px-3 sm:px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  Ваш сервер под атакой прямо сейчас?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Экстренное подключение защиты за 10 минут. Свяжитесь с нами — поможем выбрать 
                  оптимальное решение и подключить его без даунтайма.
                </p>
              </div>
              <Button variant="destructive" size="lg" className="flex-shrink-0">
                Экстренная помощь
              </Button>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="bg-gradient-to-br from-foreground via-foreground to-foreground/90 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(hsl(var(--background)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-4">
                  Не знаете, какую защиту выбрать?
                </h2>
                <p className="text-background/60 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  Оставьте заявку, и наши специалисты помогут подобрать оптимальный тариф 
                  под ваш проект и бюджет
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" className="text-base">
                    Получить консультацию
                  </Button>
                  <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10">
                    Сравнить всех провайдеров
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DDoSPage;
