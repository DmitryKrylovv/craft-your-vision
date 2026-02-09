import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Palette, BarChart3, Users, ShieldCheck, Zap, Send, Layers, CreditCard, Headphones, TrendingUp, Star, Rocket, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const features = [
  { icon: Palette, title: 'White-label платформа', desc: 'Ваш бренд, ваш домен, ваш дизайн. Клиенты видят только вашу компанию.', accent: 'from-violet-500/20 to-purple-500/20' },
  { icon: Layers, title: 'Полный каталог услуг', desc: 'VDS, хостинг, серверы, домены, SSL — весь маркетплейс инфраструктуры.', accent: 'from-blue-500/20 to-cyan-500/20' },
  { icon: CreditCard, title: 'Гибкие цены', desc: 'Устанавливайте свою наценку. Зарабатывайте на разнице между оптовой и розничной ценой.', accent: 'from-emerald-500/20 to-green-500/20' },
  { icon: BarChart3, title: 'Аналитика и отчёты', desc: 'Отслеживайте продажи, клиентов и доход в реальном времени.', accent: 'from-orange-500/20 to-amber-500/20' },
  { icon: Headphones, title: 'Поддержка клиентов', desc: 'Мы берём на себя техподдержку или подключаем вашу команду.', accent: 'from-pink-500/20 to-rose-500/20' },
  { icon: ShieldCheck, title: 'Надёжность 99.9%', desc: 'Инфраструктура проверенных провайдеров с мониторингом 24/7.', accent: 'from-sky-500/20 to-blue-500/20' },
];

const whoCanJoin = [
  { icon: Globe, title: 'Веб-студии', desc: 'Хостинг и серверы как дополнение к разработке сайтов', emoji: '🏢' },
  { icon: Users, title: 'Фрилансеры', desc: 'Свой хостинг-бизнес без инвестиций в инфраструктуру', emoji: '💻' },
  { icon: Zap, title: 'IT-компании', desc: 'Расширьте портфель услуг маркетплейсом', emoji: '⚡' },
  { icon: TrendingUp, title: 'Предприниматели', desc: 'Запустите хостинг-бизнес с нуля', emoji: '🚀' },
];

const stats = [
  { value: 500, suffix: '+', label: 'Реселлеров' },
  { value: 50, suffix: 'K+', label: 'Клиентов' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 24, suffix: '/7', label: 'Поддержка' },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const steps = [
  { num: '01', title: 'Регистрация', desc: 'Оставьте заявку — подключим за 24 часа', icon: Send },
  { num: '02', title: 'Брендинг', desc: 'Логотип, цвета, свой домен', icon: Palette },
  { num: '03', title: 'Настройка цен', desc: 'Выберите услуги и установите наценку', icon: CreditCard },
  { num: '04', title: 'Продажи', desc: 'Привлекайте клиентов и зарабатывайте', icon: Rocket },
];

const ResellerPage = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-muted" />
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[80px]" />
          
          <div className="container relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-8 border border-primary/20">
                <Layers className="w-4 h-4" />
                Реселлерская программа
                <ChevronRight className="w-3 h-3" />
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                Ваш собственный
                <br />
                <span className="text-primary">маркетплейс</span>
                <br />
                инфраструктуры
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Запустите white-label хостинг-платформу под своим брендом. 
                Продавайте VDS, серверы, домены — <span className="text-foreground font-medium">без вложений в инфраструктуру</span>.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-10">
                <Button size="lg" className="rounded-xl h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow" asChild>
                  <a href="#reseller-form">
                    Стать реселлером
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-14 px-10 text-lg font-bold" asChild>
                  <a href="#how-it-works">
                    Как это работает
                  </a>
                </Button>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                {['Бесплатный старт', 'Без минимальных объёмов', 'White-label', 'API доступ'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-6 border-y border-border bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-32">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Возможности</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 mb-5">Что вы получаете</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Готовая платформа для продажи хостинг-услуг под вашим брендом</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            >
              {features.map((f) => (
                <motion.div 
                  key={f.title} 
                  variants={scaleIn} 
                  className="group relative p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Who can join */}
        <section className="py-24 md:py-32 bg-muted relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="container relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Аудитория</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 mb-5">Кому подойдёт</h2>
              <p className="text-muted-foreground text-lg">Реселлером может стать любой — от фрилансера до IT-компании</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {whoCanJoin.map((item) => (
                <motion.div 
                  key={item.title} 
                  variants={scaleIn} 
                  className="group p-7 rounded-2xl bg-card border border-border text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 md:py-32">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Процесс</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 mb-5">Как это работает</h2>
              <p className="text-muted-foreground text-lg">Четыре шага до своего маркетплейса</p>
            </motion.div>
            <motion.div 
              className="max-w-3xl mx-auto"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {steps.map((step, i) => (
                <motion.div key={step.num} variants={fadeInUp} className="flex gap-6 relative group">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[31px] top-[72px] w-[2px] h-[calc(100%-32px)] bg-border group-hover:bg-primary/30 transition-colors" />
                  )}
                  <div className="relative z-10 shrink-0">
                    <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center font-black text-lg rounded-2xl shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
                      {step.num}
                    </div>
                  </div>
                  <div className="pb-12 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <step.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonial / Social proof */}
        <section className="py-20 bg-muted border-y border-border">
          <div className="container">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                «Запустили свой хостинг за неделю. Клиенты даже не подозревают, что за нашим брендом стоит Plooza — настолько всё бесшовно интегрировано.»
              </blockquote>
              <div className="text-muted-foreground">
                <span className="font-semibold text-foreground">Алексей К.</span> · Основатель WebPro Studio
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA + Form */}
        <section id="reseller-form" className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="container relative z-10">
            <div className="max-w-lg mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  <Rocket className="w-4 h-4" />
                  Начните сегодня
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Стать реселлером</h2>
                <p className="text-muted-foreground">Заполните форму — подключим вас к программе за 24 часа</p>
              </motion.div>
              <motion.form 
                className="space-y-5 p-8 rounded-2xl border border-border bg-card shadow-xl shadow-black/5"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                  <Input placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Компания <span className="text-muted-foreground font-normal">(необязательно)</span></label>
                  <Input placeholder="Название компании" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-14 text-lg font-bold shadow-lg shadow-primary/20">
                  <Send className="w-5 h-5 mr-2" />
                  Отправить заявку
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                </p>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResellerPage;
