import { Search, BarChart3, Shield, MessageSquare, Zap, Award } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Search,
      title: 'Умный поиск',
      description: 'Находите идеальный хостинг по параметрам: цена, характеристики, расположение серверов',
    },
    {
      icon: BarChart3,
      title: 'Честное сравнение',
      description: 'Сравнивайте тарифы разных провайдеров в удобных таблицах с актуальными ценами',
    },
    {
      icon: MessageSquare,
      title: 'Реальные отзывы',
      description: 'Читайте проверенные отзывы от реальных пользователей каждого хостинга',
    },
    {
      icon: Shield,
      title: 'Независимость',
      description: 'Мы не продвигаем определённых провайдеров — только честные рейтинги',
    },
    {
      icon: Zap,
      title: 'Актуальные данные',
      description: 'Информация о тарифах обновляется ежедневно в автоматическом режиме',
    },
    {
      icon: Award,
      title: 'Экспертные обзоры',
      description: 'Подробные обзоры и тесты производительности от наших специалистов',
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2 sm:mb-4">Почему выбирают Plooza</h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы помогаем сделать правильный выбор хостинга уже более 5 лет
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 gradient-hero rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-xs sm:text-base text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
