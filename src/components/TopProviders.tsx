import ProviderCard from './ProviderCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const TopProviders = () => {
  const providers = [
    {
      name: 'TimeWeb',
      logo: 'TW',
      rating: 4.8,
      reviewCount: 3420,
      location: 'Москва',
      since: '2006',
      minPrice: '149₽/мес',
      features: ['SSD NVMe диски', 'Бесплатный SSL', 'Техподдержка 24/7'],
      isPopular: true,
    },
    {
      name: 'REG.RU',
      logo: 'RG',
      rating: 4.6,
      reviewCount: 2890,
      location: 'Москва',
      since: '1999',
      minPrice: '119₽/мес',
      features: ['Бесплатный домен', 'Автобэкапы', 'Конструктор сайтов'],
      isPopular: true,
    },
    {
      name: 'Beget',
      logo: 'BG',
      rating: 4.7,
      reviewCount: 2150,
      location: 'СПб',
      since: '2007',
      minPrice: '165₽/мес',
      features: ['Неограниченный трафик', 'SSH доступ', 'Git-репозитории'],
    },
    {
      name: 'FirstVDS',
      logo: 'FV',
      rating: 4.5,
      reviewCount: 1870,
      location: 'Москва',
      since: '2002',
      minPrice: '199₽/мес',
      features: ['KVM виртуализация', 'DDoS защита', 'Гибкие тарифы'],
    },
    {
      name: 'SpaceWeb',
      logo: 'SW',
      rating: 4.4,
      reviewCount: 1540,
      location: 'СПб',
      since: '2001',
      minPrice: '89₽/мес',
      features: ['Бесплатный период', 'CMS в 1 клик', 'Email хостинг'],
    },
    {
      name: 'RUVDS',
      logo: 'RV',
      rating: 4.6,
      reviewCount: 980,
      location: 'Москва',
      since: '2014',
      minPrice: '210₽/мес',
      features: ['Посуточная оплата', 'Windows/Linux', 'API управления'],
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2 sm:mb-4">Лучшие хостинг-провайдеры</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
              Рейтинг составлен на основе отзывов пользователей и экспертных оценок
            </p>
          </div>
          <Button variant="outline" className="btn-outline-primary self-start sm:self-auto text-sm sm:text-base">
            Все провайдеры
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.name} {...provider} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProviders;
