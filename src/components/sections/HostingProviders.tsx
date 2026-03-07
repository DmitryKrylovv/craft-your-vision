import { Star, MapPin, Check, ArrowRight, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const providers = [
  { id: 'timeweb', name: 'TimeWeb', logo: 'TW', rating: 4.8, reviewCount: 3420, location: 'Москва', since: '2006', minPrice: '149₽/мес', features: ['SSD NVMe диски', 'Бесплатный SSL', 'Техподдержка 24/7'], isPopular: true },
  { id: 'beget', name: 'Beget', logo: 'BG', rating: 4.7, reviewCount: 2150, location: 'СПб', since: '2007', minPrice: '165₽/мес', features: ['Неограниченный трафик', 'SSH доступ', 'Git-репозитории'], isPopular: false },
  { id: 'spaceweb', name: 'SpaceWeb', logo: 'SW', rating: 4.4, reviewCount: 1540, location: 'СПб', since: '2001', minPrice: '89₽/мес', features: ['Бесплатный период', 'CMS в 1 клик', 'Email хостинг'], isPopular: false },
];

const HostingProviders = () => {
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
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0 ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  #{i + 1}
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold text-primary flex-shrink-0">
                  {p.logo}
                </div>
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
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                  {p.features.map(f => (
                    <span key={f} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{f}</span>
                  ))}
                </div>
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

export default HostingProviders;
