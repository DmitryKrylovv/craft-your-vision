import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Palette, BarChart3, Users, ShieldCheck, Zap, Send, Layers, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const features = [
  { icon: Palette, title: 'White-label платформа', desc: 'Ваш бренд, ваш домен, ваш дизайн. Клиенты видят только вашу компанию.' },
  { icon: Layers, title: 'Полный каталог услуг', desc: 'VDS, хостинг, серверы, домены, SSL — весь маркетплейс инфраструктуры под вашим брендом.' },
  { icon: CreditCard, title: 'Гибкие цены', desc: 'Устанавливайте свою наценку. Зарабатывайте на разнице между оптовой и розничной ценой.' },
  { icon: BarChart3, title: 'Аналитика и отчёты', desc: 'Отслеживайте продажи, клиентов и доход в реальном времени через личный кабинет.' },
  { icon: Headphones, title: 'Поддержка клиентов', desc: 'Мы берём на себя техническую поддержку или подключаем вашу команду.' },
  { icon: ShieldCheck, title: 'Надёжность', desc: 'Инфраструктура проверенных провайдеров с SLA 99.9% и мониторингом 24/7.' },
];

const whoCanJoin = [
  { icon: Globe, title: 'Веб-студии', desc: 'Предлагайте хостинг и серверы как дополнение к разработке сайтов' },
  { icon: Users, title: 'Фрилансеры', desc: 'Создайте свой хостинг-бизнес без инвестиций в инфраструктуру' },
  { icon: Zap, title: 'IT-компании', desc: 'Расширьте портфель услуг маркетплейсом инфраструктуры' },
  { icon: BarChart3, title: 'Предприниматели', desc: 'Запустите хостинг-бизнес с нуля — мы даём всё необходимое' },
];

const ResellerPage = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 md:py-32 bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="container relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Layers className="w-4 h-4" />
                Реселлерская программа
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Ваш собственный
                <span className="text-primary"> маркетплейс инфраструктуры</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Запустите white-label хостинг-платформу под своим брендом. Продавайте VDS, серверы, домены и другие услуги — без вложений в инфраструктуру.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-xl h-14 px-8 text-lg font-bold" asChild>
                  <a href="#reseller-form">
                    Стать реселлером
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Бесплатный старт</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Без минимальных объёмов</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> White-label</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Что вы получаете</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Готовая платформа для продажи хостинг-услуг под вашим брендом</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            >
              {features.map((f) => (
                <motion.div key={f.title} variants={fadeInUp} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <f.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Who can join */}
        <section className="py-20 md:py-28 bg-muted">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Кому подойдёт</h2>
              <p className="text-muted-foreground text-lg">Реселлером может стать любой — от фрилансера до IT-компании</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {whoCanJoin.map((item) => (
                <motion.div key={item.title} variants={fadeInUp} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Как это работает</h2>
            </motion.div>
            <motion.div 
              className="max-w-2xl mx-auto space-y-0"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {[
                { num: '01', title: 'Регистрация', desc: 'Оставьте заявку — мы подключим вас к реселлерской панели за 24 часа.' },
                { num: '02', title: 'Настройка бренда', desc: 'Загрузите логотип, выберите цвета, подключите свой домен.' },
                { num: '03', title: 'Установите цены', desc: 'Выберите услуги и установите свою наценку на каждый тариф.' },
                { num: '04', title: 'Продавайте', desc: 'Привлекайте клиентов и зарабатывайте. Мы берём на себя техническую часть.' },
              ].map((step, i, arr) => (
                <motion.div key={step.num} variants={fadeInUp} className="flex gap-5 relative">
                  {i < arr.length - 1 && (
                    <div className="absolute left-[27px] top-[60px] w-[2px] h-[calc(100%-20px)] bg-border" />
                  )}
                  <div className="relative z-10 shrink-0 w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center font-black text-lg rounded-xl">
                    {step.num}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section id="reseller-form" className="py-20 md:py-28 bg-muted">
          <div className="container">
            <div className="max-w-xl mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Стать реселлером</h2>
                <p className="text-muted-foreground">Заполните форму и мы подключим вас к программе</p>
              </motion.div>
              <motion.form 
                className="space-y-5 p-8 rounded-2xl border border-border bg-card"
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
                  <label className="block text-sm font-semibold mb-2">Компания (необязательно)</label>
                  <Input placeholder="Название компании" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-14 text-lg font-bold">
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
