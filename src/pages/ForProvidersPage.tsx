import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, TrendingUp, BarChart3, CheckCircle2,
  Server, Database, Cloud, HardDrive, Lock, Globe,
  Send, FileText, Phone, Settings, Play
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

const ForProvidersPage = () => {
  const [formData, setFormData] = useState({ company: '', email: '', phone: '' });
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: Users, value: '50K+', label: 'Активных пользователей', desc: 'Ищут хостинг каждый месяц на нашей платформе' },
    { icon: TrendingUp, value: '+40%', label: 'Рост продаж', desc: 'Средний показатель у партнёров за первые 3 месяца' },
    { icon: BarChart3, value: '24/7', label: 'Аналитика', desc: 'Отслеживайте конверсии, клики и заявки в реальном времени' },
    { icon: CheckCircle2, value: '0₽', label: 'За подключение', desc: 'Платите только за результат — никаких скрытых платежей' },
  ];

  const services = [
    { icon: Server, name: 'VDS / VPS' },
    { icon: HardDrive, name: 'Dedicated' },
    { icon: Globe, name: 'Хостинг' },
    { icon: Database, name: 'Colocation' },
    { icon: Cloud, name: 'Облако' },
    { icon: Lock, name: 'SSL / Домены' },
  ];

  const advantages = [
    { title: 'Бесплатное размещение', desc: 'Разместите свои услуги в каталоге без абонентской платы и авансовых взносов' },
    { title: 'Целевой трафик', desc: 'Наши пользователи уже ищут хостинг — вам не нужно тратить бюджет на привлечение' },
    { title: 'Персональный менеджер', desc: 'Выделенный специалист поможет с интеграцией и оптимизацией вашего профиля' },
    { title: 'Аналитика и отчёты', desc: 'Подробная статистика по просмотрам, кликам и конверсиям в личном кабинете' },
    { title: 'API интеграция', desc: 'Автоматическая синхронизация тарифов и наличия через REST API или загрузку прайса' },
    { title: 'Экосистема сервисов', desc: 'Доступ к Plooza Защита, Plooza Кошелёк и другим инструментам бесплатно' },
  ];

  const steps = [
    { num: '01', icon: FileText, title: 'Заявка', desc: 'Заполните форму — это займёт 2 минуты. Укажите название компании и контакт.' },
    { num: '02', icon: Phone, title: 'Созвон', desc: 'Менеджер свяжется в течение 24 часов. Обсудим условия и ответим на вопросы.' },
    { num: '03', icon: Settings, title: 'Интеграция', desc: 'Настроим API или загрузим ваш прайс-лист. Поможем с оформлением профиля.' },
    { num: '04', icon: Play, title: 'Запуск', desc: 'Ваши услуги появятся в каталоге. Получайте заявки и отслеживайте аналитику.' },
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
            className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{ top: `${15 + (i * 10) % 70}%`, left: `${8 + (i * 13) % 85}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            />
          ))}

          <div className="container px-3 sm:px-4 relative z-10 py-20 sm:py-28 md:py-36">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-5">
                  Для провайдеров
                </Badge>
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-5 sm:mb-6"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                Станьте партнёром{' '}
                <span className="text-primary">Plooza</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-background/60 max-w-2xl mx-auto mb-8"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                50 000+ пользователей ищут хостинг каждый месяц.
                Разместите свои услуги в каталоге и увеличьте продажи.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
              >
                <Button size="lg" onClick={scrollToForm}>
                  Оставить заявку <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" className="bg-background/15 hover:bg-background/25 text-background border border-background/20 backdrop-blur-sm">
                  Бесплатно • Без комиссии
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Services strip ─── */}
        <section className="py-5 bg-primary overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...services, ...services, ...services, ...services].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 text-primary-foreground">
                <s.icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{s.name}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ─── Benefits ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Почему Plooza</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Увеличьте продажи без затрат на маркетинг</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="text-center p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{b.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{b.label}</div>
                  <div className="text-xs text-muted-foreground">{b.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Advantages ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Преимущества партнёрства</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Всё что нужно для роста вашего бизнеса</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {advantages.map((a, i) => (
                <motion.div
                  key={a.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Steps + Form ─── */}
        <section ref={formRef} className="py-12 sm:py-16 md:py-24 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div className="container px-3 sm:px-4 relative z-10">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 mb-4">Подключение</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-3">Как подключиться</h2>
              <p className="text-sm sm:text-lg text-background/50 max-w-2xl mx-auto">4 простых шага — и ваши услуги в каталоге</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
              {/* Steps */}
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

              {/* Form */}
              <motion.div
                className="bg-card text-foreground p-6 sm:p-8 rounded-2xl border border-border"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-1">Оставить заявку</h3>
                <p className="text-sm text-muted-foreground mb-6">Заполните форму и мы свяжемся с вами</p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Название компании</label>
                    <Input
                      placeholder="ООО «Хостинг»"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <Input
                      type="email"
                      placeholder="partner@hosting.ru"
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
                    <Send className="w-4 h-4 mr-2" /> Отправить заявку
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
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
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Готовы увеличить продажи?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  Присоединяйтесь к 150+ провайдерам, которые уже растут вместе с Plooza
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" variant="secondary" onClick={scrollToForm}>
                    Стать партнёром <ArrowRight className="w-5 h-5 ml-2" />
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

export default ForProvidersPage;
