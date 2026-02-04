import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, 
  Heart, 
  Zap, 
  Shield, 
  Users, 
  Server, 
  Globe, 
  Clock,
  Award,
  TrendingUp,
  Linkedin,
  Twitter,
  Rocket,
  ArrowRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ploozaLogo from '@/assets/plooza-logo.svg';

// Values data
const values = [
  {
    icon: Target,
    title: 'Прозрачность',
    description: 'Честные цены без скрытых комиссий. Вы видите реальную стоимость услуг.'
  },
  {
    icon: Heart,
    title: 'Забота о клиенте',
    description: 'Ваш успех — наш приоритет. Помогаем найти лучшее решение.'
  },
  {
    icon: Zap,
    title: 'Инновации',
    description: 'Постоянно развиваем платформу, добавляя новые функции.'
  },
  {
    icon: Shield,
    title: 'Надёжность',
    description: 'Работаем только с проверенными провайдерами.'
  }
];

// Stats data
const stats = [
  { value: '150+', label: 'Провайдеров', icon: Server },
  { value: '50 000+', label: 'Клиентов', icon: Users },
  { value: '99.9%', label: 'Uptime', icon: TrendingUp },
  { value: '24/7', label: 'Поддержка', icon: Clock }
];

// Team data
const team = [
  {
    name: 'Александр Петров',
    role: 'CEO & Основатель',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Мария Иванова',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Елена Смирнова',
    role: 'Head of Partnerships',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  }
];

// Timeline data
const timeline = [
  {
    year: '2019',
    title: 'Основание компании',
    description: 'Начинали как классический хостинг-провайдер, предоставляя VPS и выделенные серверы.'
  },
  {
    year: '2021',
    title: 'Собственный личный кабинет',
    description: 'Разработали своё решение для управления услугами клиентов.'
  },
  {
    year: '2024',
    title: 'Новый путь',
    description: 'После принятия закона о реестре хостеров начали искать альтернативные направления.'
  },
  {
    year: '2026',
    title: 'Запуск маркетплейса',
    description: 'Трансформация в агрегатор хостинг-провайдеров.'
  }
];

const TOTAL_SLIDES = 7;

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index < 0 || index >= TOTAL_SLIDES) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(wheelTimeout);
    };
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: { opacity: 0, y: 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-background relative"
    >
      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-8 right-6 z-50 text-sm text-muted-foreground font-medium">
        {currentSlide + 1} / {TOTAL_SLIDES}
      </div>

      <AnimatePresence mode="wait">
        {/* Slide 0: Hero */}
        {currentSlide === 0 && (
          <motion.section
            key="hero"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-hero opacity-5" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative text-center">
              <motion.img 
                src={ploozaLogo} 
                alt="Plooza" 
                className="h-16 md:h-20 mx-auto mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="mb-6 badge-blue">О компании</Badge>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Делаем выбор хостинга{' '}
                <span className="text-gradient">простым и прозрачным</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Агрегатор хостинг-провайдеров, который помогает найти идеальный сервер 
                за считанные минуты.
              </motion.p>
            </div>
          </motion.section>
        )}

        {/* Slide 1: Mission */}
        {currentSlide === 1 && (
          <motion.section
            key="mission"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center bg-muted/30"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Наша миссия
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-muted-foreground mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Мы верим, что каждый бизнес заслуживает надёжную инфраструктуру без переплат и сложных поисков.
                  </motion.p>
                  <motion.p 
                    className="text-xl text-muted-foreground"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Наша миссия — стать единой точкой входа в мир хостинга.
                  </motion.p>
                </div>
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Globe className="w-40 h-40 text-primary/60" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <Award className="w-12 h-12 text-primary" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Slide 2: Values */}
        {currentSlide === 2 && (
          <motion.section
            key="values"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center"
          >
            <div className="container mx-auto px-4">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Наши ценности</h2>
                <p className="text-xl text-muted-foreground">Принципы, которыми мы руководствуемся</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="h-full border-0 shadow-lg bg-background group hover:shadow-xl transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                          <value.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Slide 3: Stats */}
        {currentSlide === 3 && (
          <motion.section
            key="stats"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center bg-primary text-primary-foreground"
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Цифры говорят сами за себя
              </motion.h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                    <div className="text-primary-foreground/80 text-lg font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Slide 4: Team */}
        {currentSlide === 4 && (
          <motion.section
            key="team"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center"
          >
            <div className="container mx-auto px-4">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Наша команда</h2>
                <p className="text-xl text-muted-foreground">Люди, которые делают Plooza лучше</p>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {team.map((member, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Slide 5: Timeline */}
        {currentSlide === 5 && (
          <motion.section
            key="timeline"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center bg-muted/30"
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Наша история
              </motion.h2>

              <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap max-w-5xl mx-auto">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    className="relative"
                  >
                    <Card className="border-0 shadow-lg bg-background w-56 md:w-64">
                      <CardContent className="p-5 text-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
                          <span className="text-primary-foreground font-bold text-sm">{item.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                    {index < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Slide 6: CTA */}
        {currentSlide === 6 && (
          <motion.section
            key="cta"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptLTYgMGgtNHYyaDR2LTJ6bTEyLTEyaC0ydjJoMnYtMnptLTYgMGgtMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            
            <div className="container mx-auto px-4 relative text-center text-primary-foreground">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
              >
                <Rocket className="w-12 h-12" />
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Будущее хостинга создаётся сейчас
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Присоединяйтесь к тысячам компаний, которые уже выбрали прозрачность и удобство.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="gap-2 text-lg px-10 py-6"
                  asChild
                >
                  <Link to="/vds">
                    Начать поиск
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="gap-2 text-lg px-10 py-6 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
                  asChild
                >
                  <Link to="/for-providers">
                    Стать провайдером
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;
