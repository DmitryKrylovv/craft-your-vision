import { Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Comparison = () => {
  const plans = [
    {
      name: 'Виртуальный хостинг',
      description: 'Для блогов и небольших сайтов',
      price: 'от 89₽',
      features: [
        { name: 'Дисковое пространство', value: '1-50 ГБ' },
        { name: 'Выделенные ресурсы', value: false },
        { name: 'Root-доступ', value: false },
        { name: 'Автомасштабирование', value: false },
        { name: 'Подходит для CMS', value: true },
        { name: 'Техподдержка', value: true },
      ],
    },
    {
      name: 'VPS/VDS',
      description: 'Для средних проектов и приложений',
      price: 'от 149₽',
      isPopular: true,
      features: [
        { name: 'Дисковое пространство', value: '10-500 ГБ' },
        { name: 'Выделенные ресурсы', value: true },
        { name: 'Root-доступ', value: true },
        { name: 'Автомасштабирование', value: 'partial' },
        { name: 'Подходит для CMS', value: true },
        { name: 'Техподдержка', value: true },
      ],
    },
    {
      name: 'Выделенный сервер',
      description: 'Для крупных проектов и highload',
      price: 'от 4 990₽',
      features: [
        { name: 'Дисковое пространство', value: '1-20 ТБ' },
        { name: 'Выделенные ресурсы', value: true },
        { name: 'Root-доступ', value: true },
        { name: 'Автомасштабирование', value: true },
        { name: 'Подходит для CMS', value: true },
        { name: 'Техподдержка', value: true },
      ],
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'string') {
      if (value === 'partial') {
        return <HelpCircle className="w-5 h-5 text-muted-foreground" />;
      }
      return <span className="text-foreground font-medium">{value}</span>;
    }
    if (value === true) {
      return <Check className="w-5 h-5 text-primary" />;
    }
    return <X className="w-5 h-5 text-muted-foreground/50" />;
  };

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2 sm:mb-4">Сравнение типов хостинга</h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите оптимальное решение для вашего проекта
          </p>
        </div>

        {/* Cards */}
        <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4 pb-4 md:overflow-visible md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex gap-4 md:grid md:grid-cols-3 max-w-5xl mx-auto min-w-max md:min-w-0">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border w-72 md:w-auto flex-shrink-0 ${
                  plan.isPopular
                    ? 'border-primary bg-primary/5 ring-2 ring-primary'
                    : 'border-border bg-card'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                      Популярный выбор
                    </span>
                  </div>
                )}

                <div className="text-center mb-4 sm:mb-6 pt-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">{plan.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{plan.description}</p>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{plan.price}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">/месяц</div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">{feature.name}</span>
                      {renderValue(feature.value)}
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full text-sm sm:text-base ${plan.isPopular ? 'btn-primary' : 'btn-outline-primary'}`}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  Сравнить тарифы
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
