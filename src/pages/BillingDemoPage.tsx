import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Check, Server, Globe, Shield, Zap,
  HardDrive, Cloud, Cpu, MemoryStick, Gauge, Clock,
  MessageSquare, Phone, Mail, MapPin, ChevronRight,
  Monitor, Lock, Headphones, Award, TrendingUp, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

// Demo hosting provider data
const provider = {
  name: 'CloudVex',
  tagline: 'Надёжный хостинг для бизнеса',
  description: 'VPS, выделенные серверы и облачные решения с SLA 99.99%. Работаем с 2018 года, обслуживаем 3 000+ клиентов.',
  logo: 'CV',
  primaryColor: '#6366f1', // indigo
  stats: [
    { value: '3 000+', label: 'Клиентов' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '15 мин', label: 'Среднее время ответа' },
    { value: '6 лет', label: 'На рынке' },
  ],
};

const vpsPlans = [
  { name: 'VPS Start', cpu: '1 vCPU', ram: '1 GB', disk: '20 GB NVMe', bandwidth: '100 Мбит/с', price: 199, popular: false },
  { name: 'VPS Business', cpu: '2 vCPU', ram: '4 GB', disk: '60 GB NVMe', bandwidth: '200 Мбит/с', price: 599, popular: true },
  { name: 'VPS Pro', cpu: '4 vCPU', ram: '8 GB', disk: '120 GB NVMe', bandwidth: '500 Мбит/с', price: 1199, popular: false },
  { name: 'VPS Ultra', cpu: '8 vCPU', ram: '16 GB', disk: '240 GB NVMe', bandwidth: '1 Гбит/с', price: 2399, popular: false },
];

const dedicatedPlans = [
  { name: 'Dedicated E3', cpu: 'Xeon E3-1230v6', ram: '32 GB DDR4', disk: '2×480 GB SSD', bandwidth: '1 Гбит/с', price: 5990 },
  { name: 'Dedicated E5', cpu: 'Xeon E5-2680v4', ram: '64 GB DDR4', disk: '2×960 GB SSD', bandwidth: '1 Гбит/с', price: 9990 },
  { name: 'Dedicated Dual', cpu: '2× Xeon E5-2680v4', ram: '128 GB DDR4', disk: '4×960 GB SSD', bandwidth: '10 Гбит/с', price: 17990 },
];

const features = [
  { icon: Shield, title: 'DDoS-защита', desc: 'Бесплатная фильтрация до 500 Гбит/с на всех тарифах' },
  { icon: Zap, title: 'NVMe диски', desc: 'Скорость чтения до 3 500 МБ/с — в 7 раз быстрее обычных SSD' },
  { icon: Globe, title: 'Москва и Амстердам', desc: '2 дата-центра Tier III с резервированием каналов' },
  { icon: Clock, title: 'Деплой за 60 секунд', desc: 'Автоматическая установка ОС и панели управления' },
  { icon: Lock, title: 'Бэкапы', desc: 'Автоматическое ежедневное резервное копирование с хранением 7 дней' },
  { icon: Headphones, title: 'Поддержка 24/7', desc: 'Техподдержка отвечает за 15 минут, даже ночью и в выходные' },
];

const reviews = [
  { name: 'Алексей М.', company: 'Webstudio Pro', rating: 5, text: 'Переехали с Hetzner полгода назад. Пинг до Москвы стал в 3 раза ниже, поддержка отвечает моментально. Рекомендую.', date: '2 недели назад' },
  { name: 'Ирина К.', company: 'ShopManager', rating: 5, text: 'Держим на VPS Business 4 интернет-магазина. Uptime реально 99.99%, за год был только 1 инцидент на 10 минут.', date: '1 месяц назад' },
  { name: 'Дмитрий В.', company: 'GameDev Studio', rating: 4, text: 'Отличные серверы для игровых проектов. NVMe диски быстрые, сеть стабильная. Хотелось бы больше локаций.', date: '2 месяца назад' },
  { name: 'Марина С.', company: 'Digital Agency', rating: 5, text: 'Пользуемся выделенными серверами. Персональный менеджер помог с настройкой кластера, всё работает идеально.', date: '3 месяца назад' },
];

const BillingDemoPage = () => {
  const [activeTab, setActiveTab] = useState('vps');

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ─── Demo Banner ─── */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-xs sm:text-sm font-medium">
        <span className="opacity-80">Это демо-лендинг, созданный на</span>{' '}
        <Link to="/billing" className="underline font-bold hover:opacity-80 transition-opacity">Plooza Биллинг</Link>{' '}
        <span className="opacity-80">— создайте свой за 10 минут</span>
      </div>

      {/* ─── Provider Nav ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container px-3 sm:px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white" style={{ background: provider.primaryColor }}>
              {provider.logo}
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">{provider.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Услуги</a>
            <a href="#features" className="hover:text-foreground transition-colors">Преимущества</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-foreground transition-colors">Контакты</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Войти</Button>
            <Button size="sm" style={{ background: provider.primaryColor }}>Регистрация</Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${provider.primaryColor}, ${provider.primaryColor}dd, ${provider.primaryColor}bb)` }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          <div className="container px-3 sm:px-4 relative z-10 py-16 sm:py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <Badge className="bg-white/20 text-white border-0 mb-5 backdrop-blur-sm">
                  SLA 99.99% • DDoS-защита • NVMe
                </Badge>
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5"
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
              >
                {provider.tagline}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                {provider.description}
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                <Button size="lg" className="bg-white hover:bg-white/90 font-semibold" style={{ color: provider.primaryColor }}>
                  VPS от 199₽/мес <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" className="bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-sm">
                  Конфигуратор
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
              >
                {provider.stats.map(s => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs sm:text-sm text-white/60">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Services / Tariffs ─── */}
        <section id="services" className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Наши услуги</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Выберите решение под ваши задачи</p>
            </motion.div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="vps">VPS / VDS</TabsTrigger>
                <TabsTrigger value="dedicated">Dedicated</TabsTrigger>
              </TabsList>

              <TabsContent value="vps">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {vpsPlans.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      className={`relative rounded-2xl p-5 sm:p-6 transition-all ${
                        plan.popular ? 'border-2 ring-2 bg-card' : 'border border-border bg-card'
                      }`}
                      style={plan.popular ? { borderColor: `${provider.primaryColor}40`, ringColor: `${provider.primaryColor}15` } : {}}
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-5 text-white" style={{ background: provider.primaryColor }}>
                          Популярный
                        </Badge>
                      )}
                      <h3 className="text-lg font-bold text-foreground mb-3 mt-1">{plan.name}</h3>
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Cpu className="w-3.5 h-3.5" /> {plan.cpu}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MemoryStick className="w-3.5 h-3.5" /> {plan.ram}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <HardDrive className="w-3.5 h-3.5" /> {plan.disk}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Gauge className="w-3.5 h-3.5" /> {plan.bandwidth}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl sm:text-3xl font-bold text-foreground">{plan.price}₽</span>
                        <span className="text-sm text-muted-foreground">/мес</span>
                      </div>
                      <Button
                        className="w-full text-white"
                        variant={plan.popular ? 'default' : 'outline'}
                        style={plan.popular ? { background: provider.primaryColor } : {}}
                      >
                        Заказать
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dedicated">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {dedicatedPlans.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      className="rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 hover:shadow-md transition-all"
                      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    >
                      <h3 className="text-lg font-bold text-foreground mb-3">{plan.name}</h3>
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Cpu className="w-3.5 h-3.5" /> {plan.cpu}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MemoryStick className="w-3.5 h-3.5" /> {plan.ram}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <HardDrive className="w-3.5 h-3.5" /> {plan.disk}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Gauge className="w-3.5 h-3.5" /> {plan.bandwidth}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl sm:text-3xl font-bold text-foreground">{plan.price.toLocaleString()}₽</span>
                        <span className="text-sm text-muted-foreground">/мес</span>
                      </div>
                      <Button className="w-full" variant="outline">Заказать</Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Почему выбирают нас</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Технологии и сервис, которые делают разницу</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-all"
                  style={{ '--hover-color': provider.primaryColor } as React.CSSProperties}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: `${provider.primaryColor}15` }}>
                    <f.icon className="w-6 h-6" style={{ color: provider.primaryColor }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Reviews ─── */}
        <section id="reviews" className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Отзывы клиентов</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Что говорят о нас наши клиенты</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {reviews.map((r, i) => (
                <motion.div
                  key={r.name}
                  className="p-5 sm:p-6 rounded-2xl border border-border bg-card"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.company}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-8"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <Button variant="outline">
                Все отзывы <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ─── Contacts ─── */}
        <section id="contacts" className="py-12 sm:py-16 md:py-24 relative overflow-hidden" style={{ background: provider.primaryColor }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          <div className="container px-3 sm:px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Готовы начать?</h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  Создайте аккаунт и получите VPS за 60 секунд. Тестовый период 3 дня бесплатно.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-10"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              >
                <Button size="lg" className="bg-white hover:bg-white/90 font-semibold" style={{ color: provider.primaryColor }}>
                  Создать аккаунт <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              >
                <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <Mail className="w-4 h-4" /> support@cloudvex.ru
                </div>
                <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <Phone className="w-4 h-4" /> +7 (495) 123-45-67
                </div>
                <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <MessageSquare className="w-4 h-4" /> Telegram чат
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Provider Footer ─── */}
      <footer className="bg-foreground text-background/50 py-8">
        <div className="container px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: provider.primaryColor }}>
                {provider.logo}
              </div>
              <span className="font-semibold text-background/70">{provider.name}</span>
            </div>
            <p className="text-sm">© 2024 {provider.name}. Все права защищены.</p>
            <div className="flex items-center gap-1 text-xs text-background/30">
              Работает на <Link to="/billing" className="text-primary hover:underline ml-1">Plooza Биллинг</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BillingDemoPage;
