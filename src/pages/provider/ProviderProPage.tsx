import { useProviderRole } from '@/contexts/ProviderRoleContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Crown,
  Star,
  Bot,
  BarChart3,
  Users,
  Percent,
  Globe,
  Check,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Расширенная карточка провайдера',
    description: 'Добавляйте больше преимуществ, сертификаты, кейсы и медиа-контент в свою карточку на платформе.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Bot,
    title: 'Автообработка отзывов — Стив AI',
    description: 'ИИ-ассистент анализирует тональность, генерирует черновики ответов и уведомляет о критических отзывах.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: BarChart3,
    title: 'Расширенная статистика',
    description: 'Когорты, воронки конверсий, тепловые карты кликов, сравнение с конкурентами и экспорт в PDF.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: 'Безлимитная команда',
    description: 'Приглашайте неограниченное количество сотрудников с гибкой системой ролей и прав доступа.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Percent,
    title: 'Сниженная комиссия',
    description: 'Комиссия платформы снижена с 12% до 5% на все заказы, оформленные через Plooza.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: Globe,
    title: 'White-label лендинг',
    description: 'Создайте собственный лендинг без брендинга Plooza для провайдеров, работающих через Plooza Billing.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500/10',
  },
];

const plans = [
  {
    name: 'Стандарт',
    price: 'Бесплатно',
    period: '',
    badge: null,
    description: 'Базовый доступ к платформе',
    features: [
      'До 5 преимуществ в карточке',
      'Базовая статистика',
      'До 3 пользователей в команде',
      'Комиссия 12%',
      'Ручная обработка отзывов',
    ],
    excluded: [
      'Стив AI для отзывов',
      'White-label лендинг',
    ],
    cta: 'Текущий план',
    variant: 'outline' as const,
    disabled: true,
  },
  {
    name: 'Plooza Pro',
    price: '4 990 ₽',
    period: '/мес',
    badge: 'Популярный',
    description: 'Всё для масштабирования бизнеса',
    features: [
      'Неограниченные преимущества в карточке',
      'Расширенная статистика и аналитика',
      'Безлимитная команда',
      'Комиссия 5%',
      'Стив AI — автообработка отзывов',
      'White-label лендинг',
      'Приоритетная поддержка',
    ],
    excluded: [],
    cta: 'Подключить Pro',
    variant: 'default' as const,
    disabled: false,
  },
];

const ProviderProPage = () => {
  const { currentUser } = useProviderRole();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-200 dark:border-amber-800 mb-4">
          <Crown className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Plooza Pro</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Раскройте весь потенциал платформы
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Продвинутые инструменты для провайдеров, которые хотят расти быстрее и управлять бизнесом эффективнее
        </p>
      </div>

      {/* Features grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {features.map((f) => (
          <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg ${f.bgColor} flex items-center justify-center mb-3`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative overflow-hidden ${
              plan.badge
                ? 'border-primary shadow-lg ring-1 ring-primary/20'
                : 'border-border shadow-sm'
            }`}
          >
            {plan.badge && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              </div>
            )}
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                {plan.badge && <Sparkles className="w-5 h-5 text-primary" />}
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                )}
              </div>

              <div className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
                {plan.excluded.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm opacity-40">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-through">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                variant={plan.variant}
                disabled={plan.disabled}
                size="lg"
              >
                {plan.cta}
                {!plan.disabled && <ArrowRight className="w-4 h-4 ml-1" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
        <CardContent className="p-6 text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Есть вопросы по Plooza Pro?
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Наша команда поможет подобрать оптимальный план и настроить все инструменты за вас
          </p>
          <Button variant="outline">Связаться с менеджером</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderProPage;
