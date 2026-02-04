import { ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTA = () => {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl gradient-hero p-6 sm:p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 sm:w-60 h-40 sm:h-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Подпишитесь на обновления</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
              Получайте лучшие предложения первыми
            </h2>
            <p className="text-sm sm:text-lg text-primary-foreground/80 mb-6 sm:mb-8">
              Скидки, акции и новые тарифы от хостинг-провайдеров — прямо в вашу почту
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-sm md:max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                className="h-11 sm:h-12 bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                className="h-11 sm:h-12 px-5 sm:px-6 bg-foreground text-background hover:bg-foreground/90 text-sm sm:text-base"
              >
                Подписаться
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-primary-foreground/60 mt-3 sm:mt-4">
              Никакого спама. Отписаться можно в любой момент.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
