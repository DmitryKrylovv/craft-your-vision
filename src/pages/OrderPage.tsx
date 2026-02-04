import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Server,
  Cloud,
  Building2,
  Globe,
  Shield,
  Database,
  Layers,
  ArrowRight,
  Search,
  Zap,
  Check,
  TrendingUp,
  Cpu,
  Lock,
  Headphones,
  ChevronLeft,
  Package,
  Sparkles,
} from 'lucide-react';

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  href: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  features: string[];
  priceFrom: string;
  popular?: boolean;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'vds',
    name: 'VDS / VPS',
    description: 'Виртуальные выделенные серверы от ведущих провайдеров',
    icon: Server,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    href: '/vds',
    badge: 'Популярное',
    popular: true,
    stats: [
      { label: 'Тарифов', value: '50+' },
      { label: 'Провайдеров', value: '6' },
    ],
    features: ['KVM/OpenVZ', 'SSD/NVMe диски', 'Мгновенная активация'],
    priceFrom: 'от 149 ₽/мес',
  },
  {
    id: 'cloud',
    name: 'Облачные серверы',
    description: 'Гибкая конфигурация ресурсов с почасовой оплатой',
    icon: Cloud,
    color: 'text-violet-600',
    bgColor: 'bg-violet-500/10',
    href: '/cloud',
    stats: [
      { label: 'До vCPU', value: '64' },
      { label: 'До RAM', value: '256 ГБ' },
    ],
    features: ['Почасовая оплата', 'Авто-масштабирование', 'API управление'],
    priceFrom: 'от 0.50 ₽/час',
  },
  {
    id: 'colocation',
    name: 'Colocation',
    description: 'Размещение оборудования в надёжных дата-центрах',
    icon: Building2,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    href: '/colocation',
    stats: [
      { label: 'ЦОД', value: '50+' },
      { label: 'Городов', value: '12' },
    ],
    features: ['Tier III/IV', 'SLA 99.99%', '24/7 охрана'],
    priceFrom: 'от 3 000 ₽/мес',
  },
  {
    id: 'dedicated',
    name: 'Dedicated серверы',
    description: 'Выделенные физические серверы для максимальной производительности',
    icon: Cpu,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    href: '/dedicated',
    badge: 'Скоро',
    stats: [
      { label: 'Конфигураций', value: '100+' },
      { label: 'ЦОД', value: '8' },
    ],
    features: ['Полный root-доступ', 'Enterprise SSD', 'IPMI/KVM'],
    priceFrom: 'от 5 000 ₽/мес',
  },
  {
    id: 'domain',
    name: 'Домены',
    description: 'Регистрация и продление доменов в любых зонах',
    icon: Globe,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500/10',
    href: '/domains',
    stats: [
      { label: 'Зон', value: '500+' },
      { label: 'Регистраторов', value: '5' },
    ],
    features: ['WHOIS-защита', 'DNS хостинг', 'Автопродление'],
    priceFrom: 'от 149 ₽/год',
  },
  {
    id: 'ssl',
    name: 'SSL сертификаты',
    description: 'Защитите сайт с помощью SSL/TLS сертификатов',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    href: '/ssl',
    stats: [
      { label: 'Типов', value: '15+' },
      { label: 'Брендов', value: '4' },
    ],
    features: ['DV/OV/EV', 'Wildcard', "Бесплатные Let's Encrypt"],
    priceFrom: 'от 0 ₽/год',
  },
  {
    id: 'database',
    name: 'Managed Databases',
    description: 'Управляемые базы данных: PostgreSQL, MySQL, MongoDB',
    icon: Database,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500/10',
    href: '/databases',
    badge: 'Скоро',
    stats: [
      { label: 'СУБД', value: '5' },
      { label: 'Провайдеров', value: '3' },
    ],
    features: ['Автобэкапы', 'Репликация', 'Мониторинг'],
    priceFrom: 'от 500 ₽/мес',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Managed Kubernetes кластеры для контейнерных приложений',
    icon: Layers,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/10',
    href: '/kubernetes',
    badge: 'Скоро',
    stats: [
      { label: 'Провайдеров', value: '4' },
      { label: 'Регионов', value: '6' },
    ],
    features: ['Автомасштабирование', 'Load Balancer', 'Ingress'],
    priceFrom: 'от 2 000 ₽/мес',
  },
];

const sidebarCategories = [
  { id: 'all', label: 'Все услуги', icon: Package },
  { id: 'vds', label: 'VDS / VPS', icon: Server },
  { id: 'cloud', label: 'Облачные серверы', icon: Cloud },
  { id: 'colocation', label: 'Colocation', icon: Building2 },
  { id: 'dedicated', label: 'Dedicated', icon: Cpu },
  { id: 'domain', label: 'Домены', icon: Globe },
  { id: 'ssl', label: 'SSL', icon: Shield },
  { id: 'database', label: 'Databases', icon: Database },
  { id: 'kubernetes', label: 'Kubernetes', icon: Layers },
];

const OrderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCategories = serviceCategories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || selectedCategory === 'all' || cat.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          {/* Back to Dashboard */}
          <div className="p-4 border-b border-border">
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground" asChild>
              <Link to="/dashboard">
                <ChevronLeft className="w-4 h-4" />
                Назад в кабинет
              </Link>
            </Button>
          </div>

          {/* Categories */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Категории
              </p>
              <nav className="space-y-1">
                {sidebarCategories.map((category) => {
                  const isActive = selectedCategory === category.id || (!selectedCategory && category.id === 'all');
                  const serviceCount = category.id === 'all' 
                    ? serviceCategories.length 
                    : serviceCategories.filter(s => s.id === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <category.icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                      <span className="flex-1 text-left">{category.label}</span>
                      {serviceCount > 0 && (
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                          isActive 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {serviceCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </ScrollArea>

          {/* Help Card */}
          <div className="p-4 border-t border-border">
            <Card className="border-0 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Headphones className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">Нужна помощь?</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Наши эксперты помогут подобрать решение
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link to="/dashboard/support">Написать</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <Sparkles className="w-5 h-5 text-primary" />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Заказать услугу
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Выберите нужную услугу и сравните предложения от лучших провайдеров
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск услуг..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden mb-4">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {sidebarCategories.slice(0, 6).map((category) => {
                    const isActive = selectedCategory === category.id || (!selectedCategory && category.id === 'all');
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'bg-background text-foreground border border-border hover:border-primary/50'
                        }`}
                      >
                        <category.icon className="w-3.5 h-3.5" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <Link to={category.href}>
                      <Card
                        className={`relative h-full border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer bg-background ${
                          category.popular ? 'ring-1 ring-primary/20' : ''
                        }`}
                        onMouseEnter={() => setHoveredCard(category.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div
                              className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                            >
                              <category.icon className={`w-6 h-6 ${category.color}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">
                                  {category.name}
                                </h3>
                                {category.badge && (
                                  <Badge
                                    variant={category.badge === 'Популярное' ? 'default' : 'secondary'}
                                    className="text-[10px] px-1.5 py-0"
                                  >
                                    {category.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                {category.description}
                              </p>

                              {/* Features */}
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {category.features.slice(0, 3).map((feature) => (
                                  <span
                                    key={feature}
                                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                                  >
                                    <Check className="w-2.5 h-2.5 text-primary" />
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              {/* Price & CTA */}
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-primary">
                                  {category.priceFrom}
                                </span>
                                <span
                                  className={`flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-all duration-300 ${
                                    hoveredCard === category.id ? 'translate-x-1' : ''
                                  }`}
                                >
                                  Выбрать
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground text-sm">Попробуйте изменить поисковый запрос</p>
              </div>
            )}

            {/* Why Plooza */}
            <Card className="mt-8 border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-center">Почему Plooza?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs font-medium text-foreground">Лучшие цены</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-xs font-medium text-foreground">Быстрый старт</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                      <Headphones className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xs font-medium text-foreground">Поддержка 24/7</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-2">
                      <Lock className="w-5 h-5 text-violet-600" />
                    </div>
                    <p className="text-xs font-medium text-foreground">Безопасность</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderPage;
