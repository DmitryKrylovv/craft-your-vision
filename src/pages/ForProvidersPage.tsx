import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, Variants } from 'framer-motion';
import { 
  ArrowRight, Users, TrendingUp, 
  BarChart3, CheckCircle2, 
  Server, Database, Cloud, HardDrive,
  Lock, Globe, Home, Send,
  FileText, Phone, Settings, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const services = [
  { icon: Server, name: 'VDS / VPS' },
  { icon: HardDrive, name: 'Dedicated' },
  { icon: Globe, name: 'Хостинг' },
  { icon: Database, name: 'Colocation' },
  { icon: Cloud, name: 'Облако' },
  { icon: Lock, name: 'SSL / Домены' },
];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const ForProvidersPage = () => {
  const [formData, setFormData] = useState({ company: '', email: '', phone: '' });
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Nav */}
      <nav className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors shadow-lg"
        >
          <Home className="w-4 h-4" />
          На главную
        </Link>
      </nav>

      {/* HERO - Brutalist Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_2px,transparent_2px),linear-gradient(90deg,hsl(var(--primary)/0.03)_2px,transparent_2px)] bg-[size:80px_80px]" />
        
        {/* Large decorative text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full">
          <motion.div 
            className="text-[20vw] font-black text-primary/[0.03] leading-none whitespace-nowrap"
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            PLOOZA • ПАРТНЁРСТВО • ХОСТИНГ • PLOOZA • ПАРТНЁРСТВО • ХОСТИНГ •
          </motion.div>
        </div>

        <div className="container relative z-10 px-6 py-32">
          <div className="max-w-5xl">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-background/60 text-sm font-medium uppercase tracking-widest">
                Для хостинг-провайдеров
              </span>
            </motion.div>

            {/* Main headline - Brutalist typography */}
            <motion.h1 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span 
                className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-background leading-[0.85] tracking-tight"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                СТАНЬТЕ
              </motion.span>
              <motion.span 
                className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tight"
                style={{ WebkitTextStroke: '3px hsl(var(--primary))', color: 'transparent' }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ПАРТНЁРОМ
              </motion.span>
              <motion.span 
                className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-primary leading-[0.85] tracking-tight"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                PLOOZA
              </motion.span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className="text-xl md:text-2xl text-background/50 max-w-xl mb-12 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              15 000+ пользователей ищут хостинг каждый месяц. 
              <span className="text-background"> Ваши услуги — в каталоге.</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Button 
                size="lg"
                onClick={scrollToForm}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-lg h-16 px-12 font-bold uppercase tracking-wide"
              >
                Оставить заявку
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              <div className="flex items-center gap-6 text-background/40 text-sm">
                <span>Бесплатно</span>
                <span>•</span>
                <span>Без комиссии на старте</span>
              </div>
            </motion.div>
          </div>

          {/* Stats block - right side */}
          <motion.div 
            className="absolute right-6 lg:right-20 bottom-32 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="bg-primary p-8 text-primary-foreground rounded-2xl">
              <div className="text-7xl font-black mb-2">+40%</div>
              <div className="text-primary-foreground/70 text-lg">рост заказов<br />у партнёров</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="bg-primary py-6 overflow-hidden">
        <motion.div 
          className="flex gap-12 whitespace-nowrap"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...services, ...services, ...services, ...services].map((service, i) => (
            <div key={i} className="flex items-center gap-3 text-primary-foreground">
              <service.icon className="w-5 h-5" />
              <span className="font-semibold">{service.name}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Why Partner - Brutalist Cards */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              ПОЧЕМУ <span className="text-primary">PLOOZA</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Увеличьте продажи без затрат на маркетинг
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Users, value: '15K+', label: 'активных пользователей', desc: 'ищут хостинг ежемесячно' },
              { icon: TrendingUp, value: '+40%', label: 'рост продаж', desc: 'средний показатель провайдеров' },
              { icon: BarChart3, value: '24/7', label: 'аналитика', desc: 'отслеживайте конверсии' },
              { icon: CheckCircle2, value: '0₽', label: 'за подключение', desc: 'платите только за результат' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="group relative"
              >
                <div className="bg-muted p-8 border-2 border-transparent hover:border-primary transition-colors h-full rounded-2xl">
                  <stat.icon className="w-8 h-8 text-primary mb-6" />
                  <div className="text-5xl font-black text-foreground mb-2">{stat.value}</div>
                  <div className="text-lg font-bold mb-1">{stat.label}</div>
                  <div className="text-muted-foreground text-sm">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Connect - Steps + Form */}
      <section ref={formRef} className="py-24 md:py-32 bg-foreground text-background">
        <div className="container px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              КАК <span className="text-primary">ПОДКЛЮЧИТЬСЯ</span>
            </h2>
            <p className="text-xl text-background/50 max-w-xl">
              4 простых шага — и ваши услуги в каталоге
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Steps */}
            <motion.div 
              className="space-y-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { num: '01', icon: FileText, title: 'Заявка', desc: 'Заполните форму — это займёт 2 минуты. Укажите название компании и контакт.' },
                { num: '02', icon: Phone, title: 'Созвон', desc: 'Менеджер свяжется в течение 24 часов. Обсудим условия и ответим на вопросы.' },
                { num: '03', icon: Settings, title: 'Интеграция', desc: 'Настроим API или загрузим ваш прайс-лист. Поможем с оформлением.' },
                { num: '04', icon: Play, title: 'Запуск', desc: 'Ваши услуги появятся в каталоге. Получайте заявки и отслеживайте аналитику.' },
              ].map((step, i) => (
                <motion.div 
                  key={step.num}
                  variants={fadeInUp}
                  className="group flex gap-6 relative"
                >
                  {/* Vertical line */}
                  {i < 3 && (
                    <div className="absolute left-[27px] top-[72px] w-[2px] h-[calc(100%-24px)] bg-background/10" />
                  )}
                  
                  {/* Number */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform rounded-xl">
                      {step.num}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="pb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-2xl font-bold text-background">{step.title}</h3>
                    </div>
                    <p className="text-background/50 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div 
              className="bg-background text-foreground p-8 md:p-12 sticky top-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-3xl font-black mb-2">ОСТАВИТЬ ЗАЯВКУ</h3>
              <p className="text-muted-foreground mb-8">Заполните форму и мы свяжемся с вами</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Название компании
                  </label>
                  <Input 
                    type="text"
                    placeholder="ООО «Хостинг»"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-14 rounded-xl border-2 border-border focus:border-primary text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="partner@hosting.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-14 rounded-xl border-2 border-border focus:border-primary text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Телефон
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-14 rounded-xl border-2 border-border focus:border-primary text-lg"
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-16 text-lg font-bold uppercase tracking-wide"
                >
                  <Send className="w-5 h-5 mr-3" />
                  Отправить заявку
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-primary py-16">
        <div className="container px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { label: 'Бесплатное размещение' },
              { label: 'Оплата за результат' },
              { label: 'Персональный менеджер' },
              { label: 'Аналитика 24/7' },
            ].map((item) => (
              <motion.div 
                key={item.label} 
                variants={scaleIn}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span className="font-semibold">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              ГОТОВЫ <span className="text-primary">НАЧАТЬ?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Присоединяйтесь к провайдерам на Plooza и увеличьте свои продажи
            </p>
            <Button 
              size="lg"
              onClick={scrollToForm}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-xl text-lg h-16 px-16 font-bold uppercase tracking-wide"
            >
              Стать партнёром
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/40 py-8">
        <div className="container px-6 text-center">
          <p>© 2024 Plooza. Платформа для хостинг-провайдеров.</p>
        </div>
      </footer>
    </div>
  );
};

export default ForProvidersPage;
