import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Heart, Zap, Shield, Users, Server, Globe, Clock,
  Award, TrendingUp, Rocket, ArrowRight, Building2, Handshake,
  BarChart3, MessageSquare, Check, MapPin, Code, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ploozaLogo from '@/assets/plooza-logo.svg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const values = [
  { icon: Target, title: 'Прозрачность', desc: 'Честные цены без скрытых комиссий. Вы видите реальную стоимость услуг каждого провайдера.' },
  { icon: Heart, title: 'Забота о клиенте', desc: 'Ваш успех — наш приоритет. Помогаем найти лучшее решение для любого бюджета.' },
  { icon: Zap, title: 'Инновации', desc: 'Постоянно развиваем платформу: ИИ-подбор, мониторинг и автоматизация.' },
  { icon: Shield, title: 'Надёжность', desc: 'Работаем только с проверенными провайдерами — каждый проходит верификацию.' },
  { icon: Handshake, title: 'Партнёрство', desc: 'Строим экосистему, выгодную и клиентам, и провайдерам.' },
  { icon: Code, title: 'Технологичность', desc: 'Собственные инструменты: API, мониторинг, конфигуратор серверов.' },
];

const stats = [
  { value: '150+', label: 'Провайдеров', icon: Server, color: 'from-primary/20 to-primary/5' },
  { value: '50 000+', label: 'Активных клиентов', icon: Users, color: 'from-emerald-500/20 to-emerald-500/5' },
  { value: '99.9%', label: 'Uptime платформы', icon: TrendingUp, color: 'from-violet-500/20 to-violet-500/5' },
  { value: '24/7', label: 'Поддержка', icon: Clock, color: 'from-amber-500/20 to-amber-500/5' },
  { value: '12', label: 'Категорий услуг', icon: BarChart3, color: 'from-rose-500/20 to-rose-500/5' },
  { value: '25 000+', label: 'Отзывов', icon: MessageSquare, color: 'from-cyan-500/20 to-cyan-500/5' },
];

const team = [
  { name: 'Александр Петров', role: 'CEO & Основатель', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', bio: 'Ex-CTO хостинг-провайдера. 12 лет в индустрии.' },
  { name: 'Мария Иванова', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', bio: 'Full-stack архитектор. Строила инфраструктуру в Mail.ru.' },
  { name: 'Дмитрий Козлов', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', bio: 'Продуктолог с опытом в B2B SaaS и маркетплейсах.' },
  { name: 'Елена Смирнова', role: 'Head of Partnerships', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', bio: 'Выстраивает отношения с 150+ провайдерами.' },
];

const timeline = [
  { year: '2019', title: 'Основание', desc: 'Начинали как хостинг-провайдер — VPS и выделенные серверы.', icon: Rocket },
  { year: '2021', title: 'Свой ЛК', desc: 'Разработали собственное решение для управления услугами.', icon: Code },
  { year: '2024', title: 'Поворотный момент', desc: 'Закон о реестре хостеров — начали искать новые направления.', icon: Sparkles },
  { year: '2025', title: 'Экосистема', desc: 'Запуск Plooza Pay, Plooza Jobs, Smart Hands и Anti Abuse.', icon: Building2 },
  { year: '2026', title: 'Маркетплейс', desc: 'Трансформация в агрегатор — 150+ провайдеров на одной платформе.', icon: Globe },
];

const ecosystem = [
  { name: 'Plooza Pay', desc: 'Единый биллинг для оплаты услуг у разных провайдеров', link: '/pay' },
  { name: 'Plooza Jobs', desc: 'Платформа вакансий в IT-инфраструктуре', link: '/apps' },
  { name: 'Plooza Smart Hands', desc: 'Удалённые руки в дата-центрах по всей России', link: '/smart-hands' },
  { name: 'Anti Abuse', desc: 'Сервис синхронизации блокировок злоумышленников', link: '/anti-abuse' },
  { name: 'Реселлер', desc: 'White-label маркетплейс для партнёров', link: '/reseller' },
  { name: 'Миграция', desc: 'Бесплатный перенос сайтов между провайдерами', link: '/migration' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="relative bg-foreground overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Animated glowing orbs */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] bg-primary/5 rounded-full blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Floating particles */}
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 3 === 0 ? 'w-1.5 h-1.5 bg-primary/40' : i % 3 === 1 ? 'w-1 h-1 bg-primary/25' : 'w-2 h-2 bg-primary/15'}`}
              style={{
                top: `${8 + (i * 7) % 85}%`,
                left: `${5 + (i * 11) % 90}%`,
              }}
              animate={{
                y: [0, -40 - i * 5, 0],
                x: [0, i % 2 === 0 ? 20 + i * 3 : -20 - i * 3, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Rotating rings with orbiting dots */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full border border-primary/[0.07]"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full border border-dashed border-primary/[0.05]"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border border-primary/[0.03]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          <div className="container px-3 sm:px-4 relative z-10 py-20 sm:py-28 md:py-36">
            <div className="max-w-4xl mx-auto text-center">
              <motion.img
                src={ploozaLogo}
                alt="Plooza"
                className="h-12 sm:h-14 md:h-16 mx-auto mb-6 brightness-0 invert"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
              />
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-5">
                  О компании
                </Badge>
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-5 sm:mb-6"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                Делаем выбор хостинга{' '}
                <span className="text-primary">простым и прозрачным</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-background/60 max-w-2xl mx-auto mb-8"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                Plooza — независимый маркетплейс хостинг-провайдеров России и СНГ. 
                Сравнивайте цены, читайте отзывы и находите идеальный сервер за минуты.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
              >
                <Button size="lg" asChild>
                  <Link to="/vds">Подобрать сервер <ArrowRight className="w-5 h-5 ml-2" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10" asChild>
                  <Link to="/for-providers">Стать провайдером</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="text-center p-4 sm:p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3`}>
                    <s.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Mission ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-4">Миссия</Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5">
                  Единая точка входа в мир хостинга
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Мы верим, что каждый бизнес заслуживает надёжную инфраструктуру без переплат и сложных поисков. 
                  Рынок хостинга в России — это сотни провайдеров, тысячи тарифов и хаос в ценообразовании.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Plooza наводит порядок: собирает все предложения в одном месте, стандартизирует параметры 
                  и даёт инструменты для объективного сравнения. Вы выбираете — мы гарантируем прозрачность.
                </p>
                <div className="space-y-3">
                  {['Независимые рейтинги провайдеров', 'Реальные отзывы клиентов', 'Прозрачное сравнение цен'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-sm sm:text-base">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center">
                  <Globe className="w-32 h-32 sm:w-40 sm:h-40 text-primary/40" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">#1 агрегатор</div>
                      <div className="text-xs text-muted-foreground">хостинга в РФ</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 bg-card border border-border rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">15+ городов</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Наши ценности</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Принципы, которыми мы руководствуемся каждый день</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Наша история</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">От хостинг-провайдера к маркетплейсу инфраструктуры</p>
            </motion.div>

            <div className="max-w-3xl mx-auto relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8 sm:space-y-10">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="relative flex gap-5 sm:gap-7"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  >
                    {/* Dot */}
                    <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-lg">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Team ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Наша команда</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Люди, которые делают Plooza лучше каждый день</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  className="group text-center bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">{m.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{m.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Ecosystem ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="container px-3 sm:px-4 relative z-10">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-3">Экосистема Plooza</h2>
              <p className="text-sm sm:text-lg text-background/60 max-w-2xl mx-auto">
                Не просто агрегатор — целая платформа инструментов для инфраструктуры
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {ecosystem.map((e, i) => (
                <motion.div
                  key={e.name}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <Link
                    to={e.link}
                    className="block p-5 sm:p-6 rounded-2xl border border-background/10 bg-background/5 hover:bg-background/10 transition-all group"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-background mb-1.5 group-hover:text-primary transition-colors">
                      {e.name}
                    </h3>
                    <p className="text-sm text-background/60">{e.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Подробнее <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Будущее хостинга создаётся сейчас
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  Присоединяйтесь к 50 000+ компаний, которые уже выбрали прозрачность и удобство
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/vds">Начать поиск <ArrowRight className="w-5 h-5 ml-2" /></Link>
                  </Button>
                  <Button size="lg" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0" asChild>
                    <Link to="/for-providers">Стать провайдером</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
