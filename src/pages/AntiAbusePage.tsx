import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Shield, ShieldCheck, Bell, Ban, CheckCircle2, ArrowRight, Zap,
  Eye, Server, Send, FileText, Phone, Settings, Play, Users, Lock,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const AntiAbusePage = () => {
  const [formData, setFormData] = useState({ company: '', email: '', billing: '' });
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: Zap, title: 'Авто-блокировка', desc: 'Мгновенная синхронизация блокировок между Plooza и вашим биллингом' },
    { icon: Bell, title: 'Уведомления', desc: 'Email и Telegram оповещения о каждом инциденте в реальном времени' },
    { icon: Users, title: 'Общая база', desc: 'Доступ к базе нарушителей, собранной со всех провайдеров платформы' },
    { icon: Lock, title: 'Безопасность', desc: 'Шифрование данных и защищённое API-взаимодействие между системами' },
    { icon: Server, title: 'API интеграция', desc: 'Готовые модули для BILLmanager и WHMCS с документацией' },
    { icon: Eye, title: 'Мониторинг', desc: 'Дашборд с аналитикой инцидентов и историей блокировок' },
  ];

  const stats = [
    { value: '12K+', label: 'Заблокировано', desc: 'нарушителей на платформе', icon: Ban, color: 'from-destructive/20 to-destructive/5' },
    { value: '73', label: 'Провайдера', desc: 'подключили модуль', icon: Users, color: 'from-primary/20 to-primary/5' },
    { value: '<1с', label: 'Синхронизация', desc: 'между системами', icon: Zap, color: 'from-amber-500/20 to-amber-500/5' },
    { value: '99.9%', label: 'Uptime', desc: 'доступность сервиса', icon: ShieldCheck, color: 'from-emerald-500/20 to-emerald-500/5' },
  ];

  const steps = [
    { num: '01', icon: FileText, title: 'Заявка', desc: 'Заполните форму — это займёт 2 минуты. Укажите биллинговую систему и контакт.' },
    { num: '02', icon: Phone, title: 'Получение модуля', desc: 'Мы отправим вам модуль и инструкцию по установке в течение 24 часов.' },
    { num: '03', icon: Settings, title: 'Установка', desc: 'Установите модуль в ваш биллинг. При необходимости поможем с настройкой.' },
    { num: '04', icon: Play, title: 'Защита активна', desc: 'Выберите режим работы — и ваш биллинг под защитой Plooza Защита.' },
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-destructive/10 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-destructive/5 rounded-full blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-destructive/30"
              style={{ top: `${15 + (i * 10) % 70}%`, left: `${8 + (i * 13) % 85}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            />
          ))}

          <div className="container px-3 sm:px-4 relative z-10 py-20 sm:py-28 md:py-36">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-destructive" />
                </div>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10 mb-5">
                  Plooza Защита
                </Badge>
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-5 sm:mb-6"
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
              >
                Синхронизация блокировок{' '}
                <span className="text-destructive">злоумышленников</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-background/60 max-w-2xl mx-auto mb-8"
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
              >
                Защитите бизнес от недобросовестных клиентов. Модуль для BILLmanager и WHMCS
                с автоматической и ручной синхронизацией.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial="hidden" animate="visible" variants={fadeUp} custom={4}
              >
                <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={scrollToForm}>
                  Подключить модуль <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" className="bg-background/15 hover:bg-background/25 text-background border border-background/20 backdrop-blur-sm">
                  Бесплатно для партнёров
                </Button>
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

        {/* ─── Features ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Возможности модуля</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Полный набор инструментов для защиты вашего бизнеса</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-destructive/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/15 transition-colors">
                    <f.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Стоимость</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Простые и прозрачные условия подключения</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
              {/* Free */}
              <motion.div
                className="relative rounded-2xl border-2 border-destructive/30 bg-card p-6 sm:p-8 ring-2 ring-destructive/10"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              >
                <Badge className="absolute -top-3 left-6 bg-destructive text-destructive-foreground">Рекомендуем</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 mt-2">Партнёр Plooza</h3>
                <p className="text-sm text-muted-foreground mb-5">Для провайдеров в каталоге маркетплейса</p>
                <div className="text-4xl sm:text-5xl font-bold text-destructive mb-1">0₽</div>
                <div className="text-sm text-muted-foreground mb-6">навсегда бесплатно</div>
                <ul className="space-y-2.5 mb-6">
                  {['Полный функционал', 'Безлимитные синхронизации', 'Email и Telegram уведомления', 'Приоритетная поддержка', 'Общая база нарушителей'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={scrollToForm}>
                  Стать партнёром <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              {/* Paid */}
              <motion.div
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Независимый</h3>
                <p className="text-sm text-muted-foreground mb-5">Для провайдеров без интеграции с Plooza</p>
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-1">500₽</div>
                <div className="text-sm text-muted-foreground mb-6">в месяц</div>
                <ul className="space-y-2.5 mb-6">
                  {['Полный функционал', 'Безлимитные синхронизации', 'Email и Telegram уведомления', 'Стандартная поддержка', 'Общая база нарушителей'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>
                  Подключить <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Modes ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Режимы работы</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Выберите подходящий режим защиты для вашего бизнеса</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
              <motion.div
                className="group p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-destructive/30 hover:shadow-md transition-all"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Автоматический</h3>
                    <span className="text-xs text-destructive font-medium">Рекомендуется</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Полное доверие системе. Клиент блокируется на Plooza — автоматически блокируется и в вашем биллинге.
                </p>
                <div className="space-y-2.5">
                  {['Мгновенная блокировка', 'Клиент не купит напрямую', 'Нулевое ручное вмешательство', 'Максимальная защита'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="group p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Ручной</h3>
                    <span className="text-xs text-primary font-medium">Полный контроль</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Получайте уведомления о нарушителях с деталями и рекомендациями. Решение принимаете вы.
                </p>
                <div className="space-y-2.5">
                  {['Email / Telegram уведомления', 'Детали и история нарушений', 'Рекомендации по блокировке', 'Вы принимаете решение'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Integrations ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <motion.div className="text-center mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">Интеграции</h2>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">Готовые модули для популярных биллинговых систем</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
              {[
                { name: 'BILLmanager', version: '2.1.4', desc: 'Модуль для ISPsystem BILLmanager 6' },
                { name: 'WHMCS', version: '1.8.2', desc: 'Плагин для WHMCS 8.x' },
              ].map((int, i) => (
                <motion.div
                  key={int.name}
                  className="p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{int.name}</h3>
                    <Badge variant="outline" className="font-mono text-xs">v{int.version}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{int.desc}</p>
                  <div className="flex gap-3">
                    <Button size="sm"><Server className="w-4 h-4 mr-2" /> Скачать</Button>
                    <Button size="sm" variant="outline">Документация</Button>
                  </div>
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
              <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10 mb-4">Подключение</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background tracking-tight mb-3">Как подключить</h2>
              <p className="text-sm sm:text-lg text-background/50 max-w-2xl mx-auto">4 простых шага — и ваш биллинг защищён</p>
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
                    <div className="w-12 h-12 rounded-xl bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="w-4 h-4 text-destructive" />
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
                <h3 className="text-xl sm:text-2xl font-bold mb-1">Получить модуль</h3>
                <p className="text-sm text-muted-foreground mb-6">Заполните форму и мы отправим модуль</p>

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
                      placeholder="admin@hosting.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Биллинговая система</label>
                    <Input
                      placeholder="BILLmanager / WHMCS"
                      value={formData.billing}
                      onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    <Send className="w-4 h-4 mr-2" /> Получить модуль
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Модуль бесплатный. Установка занимает 5 минут.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container px-3 sm:px-4">
            <div className="bg-gradient-to-br from-destructive via-destructive to-destructive/90 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(hsl(var(--destructive-foreground)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-destructive-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-destructive-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-destructive-foreground mb-4">
                  Защитите ваш бизнес сегодня
                </h2>
                <p className="text-destructive-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                  Присоединяйтесь к 73 провайдерам, которые уже используют Plooza Защита
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" variant="secondary" onClick={scrollToForm}>
                    Подключить бесплатно <ArrowRight className="w-5 h-5 ml-2" />
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

export default AntiAbusePage;
