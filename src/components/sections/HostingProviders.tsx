import { Star, MapPin, Check, ArrowRight, Server, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const providers = [
  { id: 'timeweb', name: 'TimeWeb', logo: 'TW', rating: 4.8, reviewCount: 3420, location: 'Москва', since: '2006', minPrice: '149₽/мес', features: ['SSD NVMe диски', 'Бесплатный SSL', 'Техподдержка 24/7'], isTop: true },
  { id: 'beget', name: 'Beget', logo: 'BG', rating: 4.7, reviewCount: 2150, location: 'СПб', since: '2007', minPrice: '165₽/мес', features: ['Неограниченный трафик', 'SSH доступ', 'Git-репозитории'], isTop: false },
  { id: 'spaceweb', name: 'SpaceWeb', logo: 'SW', rating: 4.4, reviewCount: 1540, location: 'СПб', since: '2001', minPrice: '89₽/мес', features: ['Бесплатный период', 'CMS в 1 клик', 'Email хостинг'], isTop: false },
];

const HostingProviders = () => {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Server className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">Хостинг</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
              Лучшие хостинг-провайдеры
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
              Виртуальный хостинг для сайтов, блогов и CMS
            </p>
          </div>
          <Button variant="outline" className="btn-outline-primary self-start sm:self-auto" asChild>
            <Link to="/hosting">
              Все хостинги <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {providers.map((p) => (
            <div
              key={p.name}
              className={`relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                p.isTop
                  ? 'border-primary/30 ring-2 ring-primary/10 shadow-md'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              {/* Top accent bar */}
              {p.isTop && (
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
              )}

              <div className="p-5 sm:p-6">
                {/* Badge */}
                {p.isTop && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <Crown className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">Лидер рейтинга</span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0 ${
                    p.isTop
                      ? 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary'
                      : 'bg-secondary text-primary'
                  }`}>
                    {p.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{p.rating}</span>
                      <span className="text-sm text-muted-foreground">({p.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.location}
                  </span>
                  <span>С {p.since} г.</span>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">от</div>
                    <div className="text-2xl font-bold text-foreground">{p.minPrice}</div>
                  </div>
                  <Button
                    variant={p.isTop ? 'default' : 'outline'}
                    asChild
                  >
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

export default HostingProviders;
