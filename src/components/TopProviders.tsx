import { Star, MapPin, Clock, Check, ArrowRight, Cloud, Server, Globe, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Provider {
  id?: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  location: string;
  since: string;
  minPrice: string;
  features: string[];
  isPopular?: boolean;
}

/* ─── Section 1: Hosting — horizontal cards with ranking numbers ─── */
const HostingSection = () => {
  const providers: Provider[] = [
    { id: 'timeweb', name: 'TimeWeb', logo: 'TW', rating: 4.8, reviewCount: 3420, location: 'Москва', since: '2006', minPrice: '149₽/мес', features: ['SSD NVMe диски', 'Бесплатный SSL', 'Техподдержка 24/7'], isPopular: true },
    { id: 'beget', name: 'Beget', logo: 'BG', rating: 4.7, reviewCount: 2150, location: 'СПб', since: '2007', minPrice: '165₽/мес', features: ['Неограниченный трафик', 'SSH доступ', 'Git-репозитории'] },
    { id: 'spaceweb', name: 'SpaceWeb', logo: 'SW', rating: 4.4, reviewCount: 1540, location: 'СПб', since: '2001', minPrice: '89₽/мес', features: ['Бесплатный период', 'CMS в 1 клик', 'Email хостинг'] },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">Хостинг</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">Лучшие хостинг-провайдеры</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">Виртуальный хостинг для сайтов, блогов и CMS</p>
          </div>
          <Button variant="outline" className="btn-outline-primary self-start sm:self-auto" asChild>
            <Link to="/hosting">Все хостинги <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {providers.map((p, i) => (
            <div key={p.name} className="group relative bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 sm:gap-5">
                {/* Rank */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0 ${
                  i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  #{i + 1}
                </div>

                {/* Logo */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold text-primary flex-shrink-0">
                  {p.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{p.name}</h3>
                    {p.isPopular && <span className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Топ выбор</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-primary text-primary" /> {p.rating}</span>
                    <span>({p.reviewCount} отзывов)</span>
                    <span className="hidden sm:flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</span>
                  </div>
                </div>

                {/* Features — hidden on mobile */}
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                  {p.features.map(f => (
                    <span key={f} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{f}</span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-muted-foreground">от</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{p.minPrice}</div>
                </div>

                <Button size="sm" className="hidden sm:inline-flex" asChild>
                  <Link to={`/provider/${p.id}`}>Подробнее</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Section 2: Cloud — gradient accent cards ─── */
const CloudSection = () => {
  const providers: Provider[] = [
    { id: 'timeweb-cloud', name: 'TimeWeb Cloud', logo: 'TC', rating: 4.7, reviewCount: 1890, location: 'Москва', since: '2021', minPrice: '199₽/мес', features: ['Почасовая оплата', 'S3 хранилище', 'Kubernetes'], isPopular: true },
    { id: 'ruvds', name: 'RUVDS', logo: 'RV', rating: 4.6, reviewCount: 980, location: 'Москва', since: '2014', minPrice: '210₽/мес', features: ['Посуточная оплата', 'Windows/Linux', 'API управления'] },
    { id: 'firstvds', name: 'FirstVDS', logo: 'FV', rating: 4.5, reviewCount: 1870, location: 'Москва', since: '2002', minPrice: '199₽/мес', features: ['KVM виртуализация', 'DDoS защита', 'Гибкие тарифы'] },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      <div className="container px-3 sm:px-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">Облако</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">Лучшие облачные провайдеры</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">VPS, облачные серверы и масштабируемая инфраструктура</p>
          </div>
          <Button variant="outline" className="btn-outline-primary self-start sm:self-auto" asChild>
            <Link to="/vds">Все VDS/VPS <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {providers.map((p, i) => (
            <div key={p.name} className={`relative bg-card/80 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all hover:shadow-lg ${
              i === 0 ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border hover:border-primary/30'
            }`}>
              {/* Top gradient stripe */}
              <div className={`h-1.5 w-full ${i === 0 ? 'bg-gradient-to-r from-primary to-blue-400' : 'bg-gradient-to-r from-muted to-muted-foreground/20'}`} />

              <div className="p-4 sm:p-6">
                {i === 0 && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Выбор редакции</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold text-primary">
                    {p.logo}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{p.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({p.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                      <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">от</div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{p.minPrice}</div>
                  </div>
                  <Button size="sm" variant={i === 0 ? 'default' : 'outline'} asChild>
                    <Link to={`/provider/${p.id}`}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Section 3: Data Centers — dark/premium feel ─── */
const DataCenterSection = () => {
  const providers: Provider[] = [
    { id: 'selectel', name: 'Selectel', logo: 'SL', rating: 4.9, reviewCount: 2340, location: 'СПб', since: '2008', minPrice: '4 990₽/мес', features: ['Tier III ЦОД', 'Гибридная инфраструктура', 'SLA 99.98%'], isPopular: true },
    { id: 'rostelecom', name: 'РТК-ЦОД', logo: 'РТ', rating: 4.5, reviewCount: 870, location: 'Москва', since: '2010', minPrice: '7 500₽/мес', features: ['Tier III+', 'Федеральная сеть', 'Колокация'] },
    { id: 'dataline', name: 'DataLine', logo: 'DL', rating: 4.6, reviewCount: 650, location: 'Москва', since: '2007', minPrice: '6 200₽/мес', features: ['Tier III ЦОД', 'Облако + bare metal', 'PCI DSS'] },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container px-3 sm:px-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background/10 flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-background/70 uppercase tracking-wider">Инфраструктура</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-2">Лучшие дата-центры</h2>
            <p className="text-sm sm:text-lg text-background/60 max-w-2xl">Выделенные серверы и колокация в проверенных ЦОД</p>
          </div>
          <Button variant="outline" className="self-start sm:self-auto border-background/20 text-background hover:bg-background/10" asChild>
            <Link to="/dedicated">Все дата-центры <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {providers.map((p, i) => (
            <div key={p.name} className="relative bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-4 sm:p-6 hover:bg-background/10 transition-all group">
              {i === 0 && (
                <div className="absolute -top-2.5 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-medium">
                    ⭐ Лидер рейтинга
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 pt-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-background/10 border border-background/10 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold text-background">
                  {p.logo}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-background">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm text-background/60">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {p.rating}</span>
                    <span>· {p.location}</span>
                    <span>· С {p.since}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-background/80">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-background/10">
                <div>
                  <div className="text-xs text-background/50">от</div>
                  <div className="text-xl sm:text-2xl font-bold text-background">{p.minPrice}</div>
                </div>
                <Button size="sm" className="bg-background text-foreground hover:bg-background/90" asChild>
                  <Link to={`/provider/${p.id}`}>Подробнее</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Section 4: Domains — compact table-like with search vibe ─── */
const DomainsSection = () => {
  const providers: Provider[] = [
    { id: 'regru', name: 'REG.RU', logo: 'RG', rating: 4.6, reviewCount: 2890, location: 'Москва', since: '1999', minPrice: '199₽/год', features: ['700+ зон', 'Бесплатный DNS', 'Защита WHOIS'], isPopular: true },
    { id: 'nic', name: 'RU-CENTER', logo: 'RC', rating: 4.4, reviewCount: 1720, location: 'Москва', since: '2001', minPrice: '249₽/год', features: ['Аккредитован ICANN', 'Корп. тарифы', 'API'] },
    { id: 'r01', name: 'R01', logo: 'R1', rating: 4.3, reviewCount: 920, location: 'Москва', since: '2003', minPrice: '179₽/год', features: ['Быстрый трансфер', 'Мультидоменное управление', 'SSL бонус'] },
  ];

  const zones = ['.ru', '.рф', '.com', '.net', '.org', '.io'];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">Домены</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">Лучшие регистраторы доменов</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">Регистрация и управление доменами в популярных зонах</p>
          </div>
          <Button variant="outline" className="btn-outline-primary self-start sm:self-auto" asChild>
            <Link to="/domains">Все регистраторы <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>

        {/* Popular zones chips */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm text-muted-foreground mr-1 self-center">Популярные зоны:</span>
          {zones.map(z => (
            <span key={z} className="text-xs sm:text-sm font-mono bg-muted px-3 py-1 rounded-full text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
              {z}
            </span>
          ))}
        </div>

        {/* Table-like cards */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {providers.map((p, i) => (
            <div key={p.name} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-xl flex items-center justify-center text-base sm:text-lg font-bold text-primary flex-shrink-0">
                  {p.logo}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{p.name}</h3>
                    {i === 0 && <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span>{p.rating}</span>
                    <span>· {p.reviewCount} отзывов</span>
                    <span>· С {p.since}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1">
                {p.features.map(f => (
                  <span key={f} className="text-[11px] sm:text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{f}</span>
                ))}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">от</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{p.minPrice}</div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/provider/${p.id}`}>Подробнее</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TopProviders = () => (
  <div>
    <HostingSection />
    <CloudSection />
    <DataCenterSection />
    <DomainsSection />
  </div>
);

export default TopProviders;
