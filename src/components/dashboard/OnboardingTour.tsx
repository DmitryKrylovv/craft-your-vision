import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Server,
  Wallet,
  Bell,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ploozaLogo from '@/assets/plooza-logo.svg';

interface OnboardingTourProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 'welcome',
    title: 'Добро пожаловать!',
    description: 'Вы зарегистрировались в маркетплейсе хостинг-услуг. Теперь вы можете заказывать VPS, домены и SSL от разных провайдеров в одном месте — всё управляется из единой удобной панели.',
    icon: null, // Will show logo instead
    color: '',
    highlight: null,
    isWelcome: true,
  },
  {
    id: 'sidebar',
    title: 'Навигация по услугам',
    description: 'Слева находится меню с категориями услуг. Нажимайте на категории чтобы фильтровать список. Счётчик показывает количество активных услуг в каждой категории.',
    icon: LayoutDashboard,
    color: 'from-violet-500 to-purple-500',
    highlight: 'onboarding-sidebar',
  },
  {
    id: 'services',
    title: 'Ваши услуги',
    description: 'Здесь отображаются все заказанные услуги. Вы видите статус, характеристики и срок действия. Наведите на карточку для быстрых действий: перезагрузка, продление, настройки.',
    icon: Server,
    color: 'from-emerald-500 to-teal-500',
    highlight: 'onboarding-services',
  },
  {
    id: 'balance',
    title: 'Баланс и оплата',
    description: 'Ваш баланс всегда виден в шапке. Нажмите "+" чтобы пополнить счёт. При достаточном балансе услуги продлеваются автоматически.',
    icon: Wallet,
    color: 'from-amber-500 to-orange-500',
    highlight: 'onboarding-balance',
  },
  {
    id: 'notifications',
    title: 'Уведомления',
    description: 'Колокольчик покажет важные события: истечение услуг, успешные платежи, технические работы. Не пропустите ничего важного!',
    icon: Bell,
    color: 'from-rose-500 to-pink-500',
    highlight: 'onboarding-notifications',
  },
  {
    id: 'complete',
    title: 'Всё готово!',
    description: 'Теперь вы знаете основы работы с личным кабинетом. Закажите первую услугу или исследуйте панель. Удачи!',
    icon: Sparkles,
    color: 'from-blue-500 to-violet-500',
    highlight: null,
  },
];

const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Update highlight position
  useEffect(() => {
    if (step.highlight) {
      const element = document.getElementById(step.highlight);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);
      } else {
        setHighlightRect(null);
      }
    } else {
      setHighlightRect(null);
    }
  }, [currentStep, step.highlight]);

  const nextStep = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with spotlight cutout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Dark overlay with cutout */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left - 8}
                  y={highlightRect.top - 8}
                  width={highlightRect.width + 16}
                  height={highlightRect.height + 16}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="hsl(var(--background) / 0.92)"
            mask="url(#spotlight-mask)"
            style={{ backdropFilter: 'blur(4px)' }}
          />
        </svg>
        
        {/* Spotlight border/glow */}
        <AnimatePresence>
          {highlightRect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none"
              style={{
                left: highlightRect.left - 8,
                top: highlightRect.top - 8,
                width: highlightRect.width + 16,
                height: highlightRect.height + 16,
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 3px hsl(var(--primary) / 0.5), 0 0 20px 5px hsl(var(--primary) / 0.3)',
                    '0 0 0 4px hsl(var(--primary) / 0.6), 0 0 30px 8px hsl(var(--primary) / 0.35)',
                    '0 0 0 3px hsl(var(--primary) / 0.5), 0 0 20px 5px hsl(var(--primary) / 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl border-2 border-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto"
        >
          {/* Close button */}
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="pt-10 pb-4 px-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', duration: 0.35 }}
                className="text-center"
              >
                {/* Icon or Logo */}
                {step.isWelcome ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.1, duration: 0.5 }}
                    className="mb-5"
                  >
                    <img src={ploozaLogo} alt="Plooza" className="h-10 mx-auto" />
                  </motion.div>
                ) : step.icon && (
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.1, duration: 0.4 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-5`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                )}

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="text-xl font-bold text-foreground mb-2"
                >
                  {step.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-1.5 pb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentStep ? 1 : -1);
                  setCurrentStep(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-6 bg-primary'
                    : index < currentStep
                    ? 'w-1.5 bg-primary/50'
                    : 'w-1.5 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevStep}
              disabled={isFirstStep}
              className="gap-1 text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </Button>

            <span className="text-xs text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </span>

            <Button
              size="sm"
              onClick={nextStep}
              className="gap-1"
            >
              {isLastStep ? 'Начать' : 'Далее'}
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingTour;
