import { Star, ArrowRight, Cloud, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const providers = [
  { id: 'timeweb-cloud', name: 'TimeWeb Cloud', logo: 'TC', rating: 4.7, reviewCount: 1890, location: 'Москва', since: '2021', minPrice: '199₽/мес', features: ['Почасовая оплата', 'S3 хранилище', 'Kubernetes'], isPopular: true },
  { id: 'ruvds', name: 'RUVDS', logo: 'RV', rating: 4.6, reviewCount: 980, location: 'Москва', since: '2014', minPrice: '210₽/мес', features: ['Посуточная оплата', 'Windows/Linux', 'API управления'], isPopular: false },
  { id: 'firstvds', name: 'FirstVDS', logo: 'FV', rating: 4.5, reviewCount: 1870, location: 'Москва', since: '2002', minPrice: '199₽/мес', features: ['KVM виртуализация', 'DDoS защита', 'Гибкие тарифы'], isPopular: false },
];

const CloudProviders = () => {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
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
            <div key={p.name} className={`relative bg-card/80 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all hover:shadow-lg ${i === 0 ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border hover:border-primary/30'}`}>
              <div className={`h-1.5 w-full ${i === 0 ? 'bg-gradient-to-r from-primary to-primary/60' : 'bg-muted'}`} />
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

export default CloudProviders;
