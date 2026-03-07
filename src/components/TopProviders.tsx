import ProviderCard from './ProviderCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

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

interface ProviderCategory {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  providers: Provider[];
}

const categories: ProviderCategory[] = [
  {
    title: 'Лучшие хостинг-провайдеры',
    description: 'Виртуальный хостинг для сайтов, блогов и CMS',
    linkText: 'Все хостинги',
    linkHref: '/hosting',
    providers: [
      {
        id: 'timeweb',
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
        id: 'beget',
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
        id: 'spaceweb',
        name: 'SpaceWeb',
        logo: 'SW',
        rating: 4.4,
        reviewCount: 1540,
        location: 'СПб',
        since: '2001',
        minPrice: '89₽/мес',
        features: ['Бесплатный период', 'CMS в 1 клик', 'Email хостинг'],
      },
    ],
  },
  {
    title: 'Лучшие облачные провайдеры',
    description: 'VPS, облачные серверы и масштабируемая инфраструктура',
    linkText: 'Все VDS/VPS',
    linkHref: '/vds',
    providers: [
      {
        id: 'timeweb-cloud',
        name: 'TimeWeb Cloud',
        logo: 'TC',
        rating: 4.7,
        reviewCount: 1890,
        location: 'Москва',
        since: '2021',
        minPrice: '199₽/мес',
        features: ['Почасовая оплата', 'S3 хранилище', 'Kubernetes'],
        isPopular: true,
      },
      {
        id: 'ruvds',
        name: 'RUVDS',
        logo: 'RV',
        rating: 4.6,
        reviewCount: 980,
        location: 'Москва',
        since: '2014',
        minPrice: '210₽/мес',
        features: ['Посуточная оплата', 'Windows/Linux', 'API управления'],
      },
      {
        id: 'firstvds',
        name: 'FirstVDS',
        logo: 'FV',
        rating: 4.5,
        reviewCount: 1870,
        location: 'Москва',
        since: '2002',
        minPrice: '199₽/мес',
        features: ['KVM виртуализация', 'DDoS защита', 'Гибкие тарифы'],
      },
    ],
  },
  {
    title: 'Лучшие дата-центры',
    description: 'Выделенные серверы и колокация в проверенных ЦОД',
    linkText: 'Все дата-центры',
    linkHref: '/dedicated',
    providers: [
      {
        id: 'selectel',
        name: 'Selectel',
        logo: 'SL',
        rating: 4.9,
        reviewCount: 2340,
        location: 'СПб',
        since: '2008',
        minPrice: '4 990₽/мес',
        features: ['Tier III ЦОД', 'Гибридная инфраструктура', 'SLA 99.98%'],
        isPopular: true,
      },
      {
        id: 'rostelecom',
        name: 'РТК-ЦОД',
        logo: 'РТ',
        rating: 4.5,
        reviewCount: 870,
        location: 'Москва',
        since: '2010',
        minPrice: '7 500₽/мес',
        features: ['Tier III+', 'Федеральная сеть', 'Колокация'],
      },
      {
        id: 'dataline',
        name: 'DataLine',
        logo: 'DL',
        rating: 4.6,
        reviewCount: 650,
        location: 'Москва',
        since: '2007',
        minPrice: '6 200₽/мес',
        features: ['Tier III ЦОД', 'Облако + bare metal', 'PCI DSS'],
      },
    ],
  },
  {
    title: 'Лучшие регистраторы доменов',
    description: 'Регистрация и управление доменами в популярных зонах',
    linkText: 'Все регистраторы',
    linkHref: '/domains',
    providers: [
      {
        id: 'regru',
        name: 'REG.RU',
        logo: 'RG',
        rating: 4.6,
        reviewCount: 2890,
        location: 'Москва',
        since: '1999',
        minPrice: '199₽/год',
        features: ['700+ зон', 'Бесплатный DNS', 'Защита WHOIS'],
        isPopular: true,
      },
      {
        id: 'nic',
        name: 'RU-CENTER',
        logo: 'RC',
        rating: 4.4,
        reviewCount: 1720,
        location: 'Москва',
        since: '2001',
        minPrice: '249₽/год',
        features: ['Аккредитован ICANN', 'Корп. тарифы', 'API'],
      },
      {
        id: 'r01',
        name: 'R01',
        logo: 'R1',
        rating: 4.3,
        reviewCount: 920,
        location: 'Москва',
        since: '2003',
        minPrice: '179₽/год',
        features: ['Быстрый трансфер', 'Мультидоменное управление', 'SSL бонус'],
      },
    ],
  },
];

const TopProviders = () => {
  return (
    <>
      {categories.map((category, idx) => (
        <section
          key={category.title}
          className={`py-10 sm:py-16 md:py-24 ${idx % 2 === 0 ? 'bg-secondary/30' : 'bg-background'}`}
        >
          <div className="container px-3 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2 sm:mb-4">
                  {category.title}
                </h2>
                <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
                  {category.description}
                </p>
              </div>
              <Button variant="outline" className="btn-outline-primary self-start sm:self-auto text-sm sm:text-base" asChild>
                <a href={category.linkHref}>
                  {category.linkText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {category.providers.map((provider) => (
                <ProviderCard key={provider.name} {...provider} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default TopProviders;
