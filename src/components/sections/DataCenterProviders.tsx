import { Star, Check, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const providers = [
  { id: 'selectel', name: 'Selectel', logo: 'SL', rating: 4.9, reviewCount: 2340, location: 'СПб', since: '2008', minPrice: '4 990₽/мес', features: ['Tier III ЦОД', 'Гибридная инфраструктура', 'SLA 99.98%'], isPopular: true },
  { id: 'rostelecom', name: 'РТК-ЦОД', logo: 'РТ', rating: 4.5, reviewCount: 870, location: 'Москва', since: '2010', minPrice: '7 500₽/мес', features: ['Tier III+', 'Федеральная сеть', 'Колокация'], isPopular: false },
  { id: 'dataline', name: 'DataLine', logo: 'DL', rating: 4.6, reviewCount: 650, location: 'Москва', since: '2007', minPrice: '6 200₽/мес', features: ['Tier III ЦОД', 'Облако + bare metal', 'PCI DSS'], isPopular: false },
];

const DataCenterProviders = () => {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-foreground relative overflow-hidden">
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
            <div key={p.name} className="relative bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-4 sm:p-6 hover:bg-background/10 transition-all">
              {i === 0 && (
                <div className="absolute -top-2.5 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-medium">⭐ Лидер рейтинга</span>
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

export default DataCenterProviders;
