import { ChevronLeft, ChevronRight, Server, Shield, Zap, Percent, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Скидка до 50%',
      subtitle: 'на первый месяц хостинга',
      description: 'Выберите провайдера и получите выгодное предложение',
      badge: 'Акция',
      gradient: 'from-primary via-blue-500 to-blue-400',
    },
    {
      title: 'VPS от 99₽',
      subtitle: 'с SSD NVMe дисками',
      description: 'Быстрые виртуальные серверы для любых задач',
      badge: 'Хит продаж',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
      title: 'Бесплатный SSL',
      subtitle: 'для всех тарифов',
      description: 'Защитите ваш сайт без дополнительных затрат',
      badge: 'Новинка',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    },
  ];

  const promoCards = [
    {
      icon: Percent,
      title: 'Кэшбэк до 15%',
      description: 'при заказе через Plooza',
      badge: 'Кэшбэк до 15%',
    },
    {
      icon: Gift,
      title: 'Бонус к тарифу',
      description: 'дополнительный месяц бесплатно',
      badge: 'Бонус +1 мес',
    },
    {
      icon: Star,
      title: 'Топ провайдеры',
      description: 'только проверенные компании',
      badge: 'Рейтинг 4.8+',
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-4 sm:py-6 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Main Hero Banner */}
          <div className={`md:col-span-2 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${slides[currentSlide].gradient} p-5 sm:p-8 min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] transition-all duration-500`}>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full blur-2xl" />
            
            {/* Navigation arrows - TOP RIGHT */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2 z-20">
              <button
                onClick={prevSlide}
                className="w-8 sm:w-9 h-8 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 sm:w-9 h-8 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* Slide content */}
            <div className="relative z-10 max-w-sm sm:max-w-md">
              <span className="inline-block px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {slides[currentSlide].badge}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-1.5">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
                {slides[currentSlide].description}
              </p>
              <Button className="bg-white text-foreground hover:bg-white/90 font-semibold px-4 sm:px-6 py-2.5 h-auto rounded-lg sm:rounded-xl text-sm sm:text-base shadow-lg">
                Подобрать хостинг
              </Button>
            </div>

            {/* Decorative server illustration */}
            <div className="absolute right-6 sm:right-8 bottom-6 sm:bottom-8 hidden sm:flex items-end gap-1.5 sm:gap-2">
              <div className="w-12 sm:w-14 h-16 sm:h-20 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Server className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div className="w-14 sm:w-16 h-20 sm:h-28 bg-white/30 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div className="w-12 sm:w-14 h-18 sm:h-24 bg-white/25 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
            </div>

            {/* Slide indicators - BOTTOM LEFT */}
            <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8 flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/40 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side Promo Cards */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2 sm:gap-3">
            {promoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="flex-1 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-100 p-3 sm:p-5 relative overflow-hidden group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="relative z-10 pr-0 sm:pr-16 lg:pr-20">
                    <div className="w-8 h-8 sm:hidden bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-foreground mb-0.5 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground mb-1.5 sm:mb-3 leading-tight hidden sm:block">
                      {card.description}
                    </p>
                    <span className="inline-block px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] lg:text-xs font-medium rounded-md">
                      {card.badge}
                    </span>
                  </div>
                  {/* Decorative icon - hidden on mobile */}
                  <div className="absolute right-2 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg lg:rounded-xl items-center justify-center group-hover:scale-110 transition-transform hidden sm:flex">
                    <Icon className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
