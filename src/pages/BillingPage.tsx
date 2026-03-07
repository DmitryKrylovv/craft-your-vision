import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, CreditCard, BarChart3, CheckCircle2,
  Server, Shield, Globe, Zap, Send, FileText, Phone,
  Settings, Play, Layers, Receipt, UserPlus, Bell,
  Database, Monitor, Headphones, Code, Lock, Wallet,
  PieChart, RefreshCw, Mail, LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const BillingPage = () => {
  const [formData, setFormData] = useState({ company: '', email: '', phone: '' });
  const formRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '200+', label: 'Хостеров', desc: 'используют платформу', icon: Users, color: 'from-primary/20 to-primary/5' },
    { value: '50K+', label: 'Клиентов', desc: 'обслуживаются через нас', icon: UserPlus, color: 'from-emerald-500/20 to-emerald-500/5' },
    { value: '99.9%', label: 'Uptime', desc: 'доступность биллинга', icon: Shield, color: 'from-violet-500/20 to-violet-500/5' },
    { value: '0₽', label: 'На старте', desc: 'бесплатный тариф', icon: CreditCard, color: 'from-amber-500/20 to-amber-500/5' },
  ];

  const coreFeatures = [
    { icon: UserPlus, title: 'Управление клиентами', desc: 'Полная CRM для хостинг-провайдера: регистрация, верификация, история заказов, обращения и заметки по каждому клиенту' },
    { icon: Receipt, title: 'Автоматический биллинг', desc: 'Выставление счетов, рекуррентные платежи, автопродление услуг. Поддержка ЮKassa, CloudPayments и банковских переводов' },
    { icon: Server, title: 'Провижининг серверов', desc: 'Автоматическое создание VPS, выделенных серверов и хостинг-аккаунтов через API интеграции с популярными панелями' },
    { icon: LayoutDashboard, title: 'Личный кабинет клиента', desc: 'Готовый white-label кабинет с вашим брендом: управление услугами, оплата, тикеты, DNS и статистика' },
    { icon: Headphones, title: 'Тикет-система', desc: 'Встроенная система обращений с приоритетами, SLA, шаблонами ответов и интеграцией с Telegram-ботом' },
    { icon: PieChart, title: 'Аналитика и отчёты', desc: 'Дашборд с MRR, churn rate, LTV клиентов. Финансовые отчёты, акты и счета-фактуры для бухгалтерии' },
  ];

  const techFeatures = [
    { icon: Code, title: 'REST API', desc: 'Полноценное API для автоматизации: управление клиентами, заказами, серверами и платежами' },
    { icon: RefreshCw, title: 'Вебхуки', desc: 'Получайте уведомления о событиях: оплата, регистрация, тикет, истечение услуги' },
    { icon: Database, title: 'Интеграции', desc: 'Proxmox, VMmanager, ISPmanager, cPanel, DirectAdmin, Cloudflare и десятки других' },
    { icon: Lock, title: 'Безопасность', desc: '2FA, IP-фильтрация, логи действий, шифрование данных и соответствие 152-ФЗ' },
    { icon: Mail, title: 'Email & SMS', desc: 'Шаблоны уведомлений, напоминания об оплате, маркетинговые рассылки по сегментам' },
    { icon: Globe, title: 'Мультиязычность', desc: 'Поддержка русского, английского и других языков. Мультивалютность: ₽, $, €, ₸' },
  ];

  const plans = [
    {
      name: 'Старт',
      price: '0₽',
      period: 'навсегда',
      desc: 'Для начинающих хостеров до 50 клиентов',
      features: ['До 50 активных клиентов', 'Базовый биллинг и CRM', 'Личный кабинет клиента', 'Тикет-система', 'Email уведомления', '1 платёжная система'],
      highlighted: false,
      badge: null,
    },
    {
      name: 'Бизнес',
      price: '2 990₽',
      period: 'в месяц',
      desc: 'Для растущих провайдеров до 500 клиентов',
      features: ['До 500 активных клиентов', 'Полный биллинг и автопродление', 'White-label кабинет', 'API и вебхуки', 'Все платёжные системы', 'Приоритетная поддержка'],
      highlighted: true,
      badge: 'Популярный',
    },
    {
      name: 'Энтерпрайз',
      price: '9 990₽',
      period: 'в месяц',
      desc: 'Для крупных провайдеров без ограничений',
      features: ['Безлимит клиентов', 'Выделенный сервер биллинга', 'Кастомные интеграции', 'SLA 99.99%', 'Персональный менеджер', 'Аудит безопасности'],
      highlighted: false,
      badge: null,
    },
  ];

  const useCases = [
    { title: 'Начинающий хостер', desc: 'Запускаете первый хостинг-бизнес? Получите готовую платформу за 10 минут: сайт, биллинг, панель клиента и приём платежей — без программирования.', icon: Zap },
    { title: 'Реселлер', desc: 'Перепродаёте VPS или хостинг? Автоматизируйте провижининг и биллинг. Клиенты видят ваш бренд, а вы управляете всем из одной панели.', icon: Layers },
    { title: 'Растущий провайдер', desc: 'Переросли самописный биллинг? Мигрируйте клиентов без потерь. API-интеграции с вашей инфраструктурой за часы, не недели.', icon: BarChart3 },
    { title: 'Дата-центр', desc: 'Сдаёте стойки и colocation? Учёт электроэнергии, управление портами, договоры и акты — всё в одной системе с биллингом.', icon: Monitor },
  ];

  const steps = [
    { num: '01', icon: FileText, title: 'Регистрация', desc: 'Создайте аккаунт за 2 минуты. Укажите данные компании и выберите тариф.' },
    { num: '02', icon: Settings, title: 'Настройка', desc: 'Загрузите логотип, настройте тарифы, подключите платёжную систему и панель управления.' },
    { num: '03', icon: Globe, title: 'Запуск', desc: 'Привяжите домен к клиентской панели. Ваш биллинг готов к работе.' },
    { num: '04', icon: Users, title: 'Рост', desc: 'Принимайте заказы, автоматизируйте рутину и масштабируйте бизнес.' },
  ];

  const integrations = [
    'Proxmox VE', 'VMmanager', 'ISPmanager', 'cPanel', 'DirectAdmin',
    'Cloudflare', 'ЮKassa', 'CloudPayments', 'Robokassa', 'Telegram Bot',
    'WHMCS Import', 'BILLmanager Import',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="relative bg-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[25%] right-[15%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]"
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'w-1.5 h-1.5 bg-primary/35' : 'w-1 h-1 bg-primary/20'}`}
              style={{ top: `${10 + (i * 8) % 80}%`, left: `${5 + (i * 11) % 90}%` }}
              animate={{ y: [0, -35, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}

          {/* Rotating rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] rounded-full border border-primary/[0.06]"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-primary/[0.04]"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          <div className="container px-3 sm:px-4 relative z-10 py-20 sm:py-28 md:py-36">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-5">
                  Plooza Биллинг
                </Badge>
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-5 sm:mb-6"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                Платформа для{' '}
                <span className="text-primary">хостинг-бизнеса</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-background/60 max-w-2xl mx-auto mb-8"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                Всё что нужно начинающему хостеру: биллинг, CRM, личный кабинет клиента,
                автоматический провижининг и приём платежей — запуск за 10 минут.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
              >
                <Button size="lg" onClick={scrollToForm}>
                  Начать бесплатно <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" className="bg-background/15 hover:bg-background/25 text-background border border-background/20 backdrop-blur-sm" onClick={scrollToFeatures}>
                  Возможности
                </Button>
              </motion.div>

              {/* Mini trust bar */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 text-background/40 text-xs sm:text-sm"
                initial="hidden" animate="visible" variants={fadeUp} custom={5}
              >
                {['Бесплатный тариф', 'Без программирования', 'White-label', 'REST API'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
                  <div className="text-xs text-muted-foreground/70">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-4">Для кого</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Кому подойдёт Plooza Биллинг</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">От первого VPS до дата-центра — платформа растёт вместе с вами</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <uc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Core Features ─── */}
        <section ref={featuresRef} className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Основные возможности</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Полный набор инструментов для управления хостинг-бизнесом</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {coreFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tech Features ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div className="container px-3 sm:px-4 relative z-10">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-4">Для разработчиков</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-3">Технические возможности</h2>
              <p className="text-sm sm:text-lg text-background/50 max-w-2xl mx-auto">API, вебхуки и интеграции для полной автоматизации</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {techFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-background/10 bg-background/5 hover:bg-background/10 hover:border-primary/20 transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-background mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-background/50 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Integrations ticker */}
            <motion.div
              className="mt-12 sm:mt-16"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <p className="text-center text-sm text-background/40 mb-5">Интеграции</p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
                {integrations.map(name => (
                  <span key={name} className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-background/5 border border-background/10 text-background/60 rounded-lg hover:border-primary/20 hover:text-primary transition-colors">
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Тарифы</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Начните бесплатно и масштабируйтесь по мере роста</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 sm:p-8 transition-all ${
                    plan.highlighted
                      ? 'border-2 border-primary/30 bg-card ring-2 ring-primary/10'
                      : 'border border-border bg-card'
                  }`}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">{plan.badge}</Badge>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 mt-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-0.5">{plan.price}</div>
                  <div className="text-sm text-muted-foreground mb-6">{plan.period}</div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.highlighted ? '' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={scrollToForm}
                  >
                    {plan.price === '0₽' ? 'Начать бесплатно' : 'Подключить'} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works + Form ─── */}
        <section ref={formRef} className="py-12 sm:py-16 md:py-24 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div className="container px-3 sm:px-4 relative z-10">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-4">Быстрый старт</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-3">Запуск за 10 минут</h2>
              <p className="text-sm sm:text-lg text-background/50 max-w-2xl mx-auto">4 простых шага до собственного хостинг-бизнеса</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="flex gap-4 sm:gap-5"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h3 className="text-lg font-semibold text-background">{step.title}</h3>
                      </div>
                      <p className="text-sm text-background/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="bg-card text-foreground p-6 sm:p-8 rounded-2xl border border-border"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-1">Начать бесплатно</h3>
                <p className="text-sm text-muted-foreground mb-6">Создайте аккаунт и запустите биллинг</p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Название компании</label>
                    <Input
                      placeholder="ООО «Мой Хостинг»"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <Input
                      type="email"
                      placeholder="admin@myhosting.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Телефон</label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Создать аккаунт
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Бесплатно до 50 клиентов. Без банковской карты.
                  </p>
                </form>
              </motion.div>
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
                  <Wallet className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Запустите хостинг-бизнес сегодня
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  200+ хостеров уже зарабатывают с Plooza Биллинг. Бесплатный старт — без рисков.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" variant="secondary" onClick={scrollToForm}>
                    Начать бесплатно <ArrowRight className="w-5 h-5 ml-2" />
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

export default BillingPage;
