 import { useRef, useState } from 'react';
 import { Link } from 'react-router-dom';
 import { motion, Variants } from 'framer-motion';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import Footer from '@/components/Footer';
 import ploozaLogo from '@/assets/plooza-logo.svg';
 import {
   Wallet,
   Gift,
   Percent,
   CreditCard,
   ArrowRight,
   Zap,
   ShoppingCart,
   Home,
   Send,
   CheckCircle2,
   TrendingUp,
   BadgePercent,
   Coins,
   Sparkles,
   Store,
   Receipt,
 } from 'lucide-react';
 
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
 
 const PloozaPayPage = () => {
   const [email, setEmail] = useState('');
   const formRef = useRef<HTMLDivElement>(null);
 
   const scrollToForm = () => {
     formRef.current?.scrollIntoView({ behavior: 'smooth' });
   };
 
   const benefits = [
     {
       icon: Coins,
       title: 'Кэшбэк за заказы',
       description: 'До 10% кэшбэка на все покупки услуг хостинга через Plooza'
     },
     {
       icon: Store,
       title: 'Кэшбэк напрямую',
       description: 'Покупайте у провайдера напрямую и всё равно получайте кэшбэк'
     },
     {
       icon: BadgePercent,
       title: 'Эксклюзивные скидки',
       description: 'Специальные предложения и промокоды только для участников'
     },
     {
       icon: Gift,
       title: 'Бонусы и акции',
       description: 'Регулярные акции с повышенным кэшбэком и подарками'
     },
   ];
 
   const howItWorks = [
     {
       step: '01',
       title: 'Создайте кошелёк',
       description: 'Бесплатная регистрация за минуту'
     },
     {
       step: '02',
       title: 'Покупайте услуги',
       description: 'Через Plooza или напрямую у провайдера'
     },
     {
       step: '03',
       title: 'Получайте кэшбэк',
       description: 'Деньги автоматически зачисляются на баланс'
     },
     {
       step: '04',
       title: 'Тратьте или выводите',
       description: 'Оплачивайте услуги или выводите на карту'
     },
   ];
 
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
 
       {/* HERO - Brutalist Style with Green accent */}
       <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
         {/* Grid pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(hsl(142_76%_36%/0.03)_2px,transparent_2px),linear-gradient(90deg,hsl(142_76%_36%/0.03)_2px,transparent_2px)] bg-[size:80px_80px]" />
         
         {/* Large decorative text */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full">
           <motion.div 
             className="text-[20vw] font-black text-[hsl(142_76%_36%/0.03)] leading-none whitespace-nowrap"
             initial={{ x: "0%" }}
             animate={{ x: "-50%" }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           >
             CASHBACK • БОНУСЫ • СКИДКИ • CASHBACK • БОНУСЫ • СКИДКИ •
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
               <div className="w-3 h-3 bg-[hsl(142_76%_36%)] rounded-full animate-pulse" />
               <span className="text-background/60 text-sm font-medium uppercase tracking-widest">
                 Кошелёк с кэшбэком
               </span>
             </motion.div>
 
             {/* Main headline with logo */}
             <motion.h1 
               className="mb-8"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               <motion.div 
                 className="flex items-baseline gap-2 sm:gap-4"
                 initial={{ opacity: 0, y: 60 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
               >
                 <img 
                   src={ploozaLogo} 
                   alt="Plooza" 
                   className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto brightness-0 invert" 
                 />
                 <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-[hsl(142_76%_36%)] leading-[0.85] tracking-tight">
                   .Pay
                 </span>
               </motion.div>
             </motion.h1>
 
             {/* Subtext */}
             <motion.p 
               className="text-xl md:text-2xl text-background/50 max-w-xl mb-12 font-medium"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.7 }}
             >
               Кошелёк для кэшбэка и бонусов.
               <span className="text-background"> Получайте до 10% с каждой покупки.</span>
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
                 className="bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)] rounded-xl text-lg h-16 px-12 font-bold uppercase tracking-wide"
               >
                 Создать кошелёк
                 <ArrowRight className="w-5 h-5 ml-3" />
               </Button>
               <div className="flex items-center gap-6 text-background/40 text-sm">
                 <span>Бесплатно</span>
                 <span>•</span>
                 <span>Без комиссий</span>
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
             <div className="bg-[hsl(142_76%_36%)] p-8 text-white rounded-2xl">
               <div className="text-7xl font-black mb-2">10%</div>
               <div className="text-white/70 text-lg">максимальный<br />кэшбэк</div>
             </div>
           </motion.div>
         </div>
       </section>
 
       {/* Services Strip */}
       <section className="bg-[hsl(142_76%_36%)] py-6 overflow-hidden">
         <motion.div 
           className="flex gap-12 whitespace-nowrap"
           initial={{ x: "0%" }}
           animate={{ x: "-50%" }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
         >
           {[
             { icon: Coins, name: 'Кэшбэк' },
             { icon: Gift, name: 'Бонусы' },
             { icon: Percent, name: 'Скидки' },
             { icon: Sparkles, name: 'Акции' },
             { icon: Wallet, name: 'Кошелёк' },
             { icon: CreditCard, name: 'Вывод средств' },
             { icon: Coins, name: 'Кэшбэк' },
             { icon: Gift, name: 'Бонусы' },
             { icon: Percent, name: 'Скидки' },
             { icon: Sparkles, name: 'Акции' },
             { icon: Wallet, name: 'Кошелёк' },
             { icon: CreditCard, name: 'Вывод средств' },
           ].map((service, i) => (
             <div key={i} className="flex items-center gap-3 text-white">
               <service.icon className="w-5 h-5" />
               <span className="font-semibold">{service.name}</span>
             </div>
           ))}
         </motion.div>
       </section>
 
       {/* Benefits Section */}
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
               ПРЕИМУЩЕСТВА <span className="text-[hsl(142_76%_36%)]">PAY</span>
             </h2>
             <p className="text-xl text-muted-foreground max-w-xl">
               Экономьте на каждой покупке хостинга и серверов
             </p>
           </motion.div>
 
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 gap-6"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
           >
             {benefits.map((benefit, index) => (
               <motion.div key={index} variants={scaleIn}>
                 <div className="bg-muted p-8 md:p-10 border-2 border-transparent hover:border-[hsl(142_76%_36%)] transition-colors h-full rounded-2xl">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 bg-[hsl(142_76%_36%)] text-white flex items-center justify-center rounded-xl">
                       <benefit.icon className="w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-black">{benefit.title}</h3>
                   </div>
                   <p className="text-muted-foreground text-lg">
                     {benefit.description}
                   </p>
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </section>
 
       {/* How it Works */}
       <section className="py-24 md:py-32 bg-foreground text-background">
         <div className="container px-6">
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
             className="mb-16"
           >
             <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
               КАК ЭТО РАБОТАЕТ
             </h2>
             <p className="text-xl text-background/50 max-w-xl">
               4 простых шага к экономии
             </p>
           </motion.div>
 
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
           >
             {howItWorks.map((item, index) => (
               <motion.div key={index} variants={scaleIn}>
                 <div className="bg-background/5 backdrop-blur-sm p-8 border-2 border-background/20 hover:border-[hsl(142_76%_36%)] transition-colors h-full rounded-2xl">
                   <div className="text-6xl font-black text-[hsl(142_76%_36%)] mb-4">{item.step}</div>
                   <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                   <p className="text-background/50">{item.description}</p>
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </section>
 
       {/* Cashback Direct */}
       <section className="py-24 md:py-32 bg-muted">
         <div className="container px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={fadeInUp}
             >
               <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                 КЭШБЭК ДАЖЕ<br />
                 <span className="text-[hsl(142_76%_36%)]">НАПРЯМУЮ</span>
               </h2>
               <p className="text-xl text-muted-foreground mb-8">
                 Покупайте услуги у провайдера напрямую — если он подключён к Plooza, 
                 вы всё равно получите кэшбэк на ваш Pay-кошелёк.
               </p>
               <ul className="space-y-4 mb-8">
                 {[
                   'Провайдер интегрирован с Plooza',
                   'Покупка через сайт провайдера',
                   'Кэшбэк зачисляется автоматически',
                   'Отслеживайте все начисления',
                 ].map((item) => (
                   <li key={item} className="flex items-center gap-3 text-lg">
                     <CheckCircle2 className="w-6 h-6 text-[hsl(142_76%_36%)] shrink-0" />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>
               <Button 
                 onClick={scrollToForm}
                 size="lg"
                 className="bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)] rounded-xl h-14 px-10 font-bold uppercase tracking-wide"
               >
                 Узнать провайдеров
                 <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative"
             >
               <div className="bg-foreground rounded-3xl p-10 text-background">
                 <div className="flex items-center gap-3 mb-8">
                   <img src={ploozaLogo} alt="Plooza" className="h-6 w-auto brightness-0 invert" />
                   <span className="text-xl font-bold text-[hsl(142_76%_36%)]">.Pay</span>
                 </div>
                 <div className="text-sm text-background/50 mb-2">Ваш баланс</div>
                 <div className="text-5xl font-black mb-8">12 450 ₽</div>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between py-3 border-b border-background/10">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-[hsl(142_76%_36%)]/20 rounded-lg flex items-center justify-center">
                         <TrendingUp className="w-5 h-5 text-[hsl(142_76%_36%)]" />
                       </div>
                       <div>
                         <div className="font-medium">Кэшбэк VDS</div>
                         <div className="text-sm text-background/50">Selectel</div>
                       </div>
                     </div>
                     <div className="text-[hsl(142_76%_36%)] font-bold">+450 ₽</div>
                   </div>
                   <div className="flex items-center justify-between py-3 border-b border-background/10">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-[hsl(142_76%_36%)]/20 rounded-lg flex items-center justify-center">
                         <Gift className="w-5 h-5 text-[hsl(142_76%_36%)]" />
                       </div>
                       <div>
                         <div className="font-medium">Бонус за регистрацию</div>
                         <div className="text-sm text-background/50">Акция</div>
                       </div>
                     </div>
                     <div className="text-[hsl(142_76%_36%)] font-bold">+500 ₽</div>
                   </div>
                   <div className="flex items-center justify-between py-3">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-[hsl(142_76%_36%)]/20 rounded-lg flex items-center justify-center">
                         <Receipt className="w-5 h-5 text-[hsl(142_76%_36%)]" />
                       </div>
                       <div>
                         <div className="font-medium">Кэшбэк Хостинг</div>
                         <div className="text-sm text-background/50">REG.RU</div>
                       </div>
                     </div>
                     <div className="text-[hsl(142_76%_36%)] font-bold">+320 ₽</div>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* CTA Form */}
       <section ref={formRef} className="py-24 md:py-32 bg-[hsl(142_76%_36%)]">
         <div className="container px-6">
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
             className="max-w-2xl mx-auto text-center"
           >
             <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
               НАЧНИТЕ ЭКОНОМИТЬ
             </h2>
             <p className="text-xl text-white/70 mb-10">
               Создайте кошелёк Plooza Pay и получите приветственный бонус 500₽
             </p>
 
             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20">
               <form className="space-y-4">
                 <Input
                   type="email"
                   placeholder="Ваш email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl text-lg"
                 />
                 <Button 
                   type="submit"
                   size="lg"
                   className="w-full h-14 bg-white text-[hsl(142_76%_36%)] hover:bg-white/90 rounded-xl text-lg font-bold uppercase tracking-wide"
                 >
                   Создать кошелёк
                   <Send className="w-5 h-5 ml-2" />
                 </Button>
               </form>
               <p className="text-white/50 text-sm mt-4">
                 Регистрируясь, вы соглашаетесь с условиями использования
               </p>
             </div>
 
             <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/60">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5" />
                 <span>Без комиссий</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5" />
                 <span>Мгновенный вывод</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5" />
                 <span>500₽ бонус</span>
               </div>
             </div>
           </motion.div>
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default PloozaPayPage;