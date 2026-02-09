import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Clock, Headphones, Server, Globe, Database, Send } from 'lucide-react';
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

const steps = [
  { num: '01', title: 'Оставьте заявку', desc: 'Заполните форму с данными текущего хостинга. Это займёт пару минут.' },
  { num: '02', title: 'Мы всё проверим', desc: 'Наши специалисты проанализируют ваш сайт и подберут оптимальный тариф.' },
  { num: '03', title: 'Перенос без простоя', desc: 'Мигрируем файлы, базы данных и почту. Ваш сайт продолжает работать.' },
  { num: '04', title: 'Готово!', desc: 'Переключаем DNS. Сайт работает на новом хостинге. Быстрее и надёжнее.' },
];

const benefits = [
  { icon: Shield, title: 'Без потери данных', desc: 'Полная сохранность файлов, баз данных и настроек' },
  { icon: Clock, title: 'Без простоя', desc: 'Сайт работает непрерывно в процессе переноса' },
  { icon: Headphones, title: 'Поддержка 24/7', desc: 'Специалисты контролируют каждый этап миграции' },
  { icon: Server, title: 'Любой хостинг', desc: 'Переносим с любого провайдера без ограничений' },
  { icon: Globe, title: 'Любой CMS', desc: 'WordPress, Joomla, Bitrix, 1C и любые другие' },
  { icon: Database, title: 'Базы данных', desc: 'MySQL, PostgreSQL, MongoDB — мигрируем все' },
];

const MigrationPage = () => {
  const [form, setForm] = useState({ site: '', email: '', provider: '' });

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
                <CheckCircle2 className="w-4 h-4" />
                100% бесплатно
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Бесплатный перенос
                <span className="text-primary"> вашего сайта</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Мы перенесём ваш сайт с любого хостинга — бесплатно, без простоя и потери данных. Просто оставьте заявку.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-xl h-14 px-8 text-lg font-bold" asChild>
                  <a href="#migration-form">
                    Перенести сайт
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Как мы переносим сайты</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Всё продумано до мелочей, чтобы миграция прошла незаметно для ваших пользователей</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            >
              {benefits.map((b) => (
                <motion.div key={b.title} variants={fadeInUp} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <b.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 md:py-28 bg-muted">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">4 простых шага</h2>
              <p className="text-muted-foreground text-lg">От заявки до готового сайта на новом хостинге</p>
            </motion.div>
            <motion.div 
              className="max-w-2xl mx-auto space-y-0"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              {steps.map((step, i) => (
                <motion.div key={step.num} variants={fadeInUp} className="flex gap-5 relative">
                  {i < steps.length - 1 && (
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
        <section id="migration-form" className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-xl mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Оставить заявку</h2>
                <p className="text-muted-foreground">Заполните форму и мы начнём перенос вашего сайта</p>
              </motion.div>
              <motion.form 
                className="space-y-5 p-8 rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">Адрес сайта</label>
                  <Input placeholder="example.com" value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Текущий провайдер</label>
                  <Input placeholder="Название хостинг-провайдера" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} className="h-12 rounded-xl" />
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

export default MigrationPage;
