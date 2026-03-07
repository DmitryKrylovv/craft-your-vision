import { Star, ArrowRight, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const providers = [
  { id: 'regru', name: 'REG.RU', logo: 'RG', rating: 4.6, reviewCount: 2890, since: '1999', minPrice: '199₽/год', features: ['700+ зон', 'Бесплатный DNS', 'Защита WHOIS'] },
  { id: 'nic', name: 'RU-CENTER', logo: 'RC', rating: 4.4, reviewCount: 1720, since: '2001', minPrice: '249₽/год', features: ['Аккредитован ICANN', 'Корп. тарифы', 'API'] },
  { id: 'r01', name: 'R01', logo: 'R1', rating: 4.3, reviewCount: 920, since: '2003', minPrice: '179₽/год', features: ['Быстрый трансфер', 'Мультидоменное управление', 'SSL бонус'] },
];

const zones = ['.ru', '.рф', '.com', '.net', '.org', '.io'];

const DomainProviders = () => {
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

        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm text-muted-foreground mr-1 self-center">Популярные зоны:</span>
          {zones.map(z => (
            <span key={z} className="text-xs sm:text-sm font-mono bg-muted px-3 py-1 rounded-full text-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
              {z}
            </span>
          ))}
        </div>

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

export default DomainProviders;
