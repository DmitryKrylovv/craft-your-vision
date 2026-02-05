 import { useRef, useState } from 'react';
 import { Link } from 'react-router-dom';
 import { motion, Variants } from 'framer-motion';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import Footer from '@/components/Footer';
 import {
   Shield,
   ShieldCheck,
   Bell,
   Ban,
   CheckCircle2,
   ArrowRight,
   Zap,
   Eye,
   Server,
   Home,
   Send,
   FileText,
   Phone,
   Settings,
   Play,
   Users,
   Lock,
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
 
 const AntiAbusePage = () => {
   const [formData, setFormData] = useState({ company: '', email: '', billing: '' });
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
         <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--destructive)/0.03)_2px,transparent_2px),linear-gradient(90deg,hsl(var(--destructive)/0.03)_2px,transparent_2px)] bg-[size:80px_80px]" />
         
         {/* Large decorative text */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full">
           <motion.div 
             className="text-[20vw] font-black text-destructive/[0.03] leading-none whitespace-nowrap"
             initial={{ x: "0%" }}
             animate={{ x: "-50%" }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           >
             ANTI ABUSE • ЗАЩИТА • БЕЗОПАСНОСТЬ • ANTI ABUSE • ЗАЩИТА • БЕЗОПАСНОСТЬ •
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
               <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
               <span className="text-background/60 text-sm font-medium uppercase tracking-widest">
                 Модуль для биллинга
               </span>
             </motion.div>
 
             {/* Main headline */}
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
                 ANTI
               </motion.span>
               <motion.span 
                 className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tight text-destructive"
                 initial={{ opacity: 0, y: 60 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
               >
                 ABUSE
               </motion.span>
             </motion.h1>
 
             {/* Subtext */}
             <motion.p 
               className="text-xl md:text-2xl text-background/50 max-w-xl mb-12 font-medium"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.7 }}
             >
               Синхронизация блокировок между Plooza и вашим биллингом.
               <span className="text-background"> Защитите бизнес от нарушителей.</span>
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
                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl text-lg h-16 px-12 font-bold uppercase tracking-wide"
               >
                 Подключить модуль
                 <ArrowRight className="w-5 h-5 ml-3" />
               </Button>
               <div className="flex items-center gap-6 text-background/40 text-sm">
                 <span>Бесплатно</span>
                 <span>•</span>
                 <span>BILLmanager & WHMCS</span>
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
             <div className="bg-destructive p-8 text-destructive-foreground rounded-2xl">
               <div className="text-7xl font-black mb-2">12K+</div>
               <div className="text-destructive-foreground/70 text-lg">нарушителей<br />заблокировано</div>
             </div>
           </motion.div>
         </div>
       </section>
 
       {/* Services Strip */}
       <section className="bg-destructive py-6 overflow-hidden">
         <motion.div 
           className="flex gap-12 whitespace-nowrap"
           initial={{ x: "0%" }}
           animate={{ x: "-50%" }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
         >
           {[
             { icon: Shield, name: 'Авто-блокировка' },
             { icon: Bell, name: 'Уведомления' },
             { icon: Zap, name: 'Мгновенная синхронизация' },
             { icon: Lock, name: 'Безопасность' },
             { icon: Users, name: 'Общая база' },
             { icon: Server, name: 'API интеграция' },
             { icon: Shield, name: 'Авто-блокировка' },
             { icon: Bell, name: 'Уведомления' },
             { icon: Zap, name: 'Мгновенная синхронизация' },
             { icon: Lock, name: 'Безопасность' },
             { icon: Users, name: 'Общая база' },
             { icon: Server, name: 'API интеграция' },
           ].map((service, i) => (
             <div key={i} className="flex items-center gap-3 text-destructive-foreground">
               <service.icon className="w-5 h-5" />
               <span className="font-semibold">{service.name}</span>
             </div>
           ))}
         </motion.div>
       </section>
 
       {/* How it Works - Two Modes */}
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
               РЕЖИМЫ <span className="text-destructive">РАБОТЫ</span>
             </h2>
             <p className="text-xl text-muted-foreground max-w-xl">
               Выберите подходящий режим защиты для вашего бизнеса
             </p>
           </motion.div>
 
           <motion.div 
             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
           >
             {/* Auto Mode */}
             <motion.div variants={scaleIn}>
               <div className="bg-muted p-8 md:p-10 border-2 border-transparent hover:border-destructive transition-colors h-full rounded-2xl">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 bg-destructive text-destructive-foreground flex items-center justify-center rounded-xl">
                     <Zap className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-black">АВТОМАТИЧЕСКИЙ</h3>
                     <span className="text-sm text-muted-foreground uppercase tracking-wide">Рекомендуется</span>
                   </div>
                 </div>
                 <p className="text-muted-foreground mb-8 text-lg">
                   Полное доверие системе. Клиент банится на Plooza — автоматически блокируется и в вашем биллинге.
                 </p>
                 <div className="space-y-4">
                   {[
                     'Мгновенная блокировка нарушителей',
                     'Клиент не сможет купить напрямую',
                     'Нулевое ручное вмешательство',
                     'Максимальная защита бизнеса',
                   ].map((item) => (
                     <div key={item} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-destructive shrink-0" />
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </motion.div>
 
             {/* Manual Mode */}
             <motion.div variants={scaleIn}>
               <div className="bg-muted p-8 md:p-10 border-2 border-transparent hover:border-primary transition-colors h-full rounded-2xl">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-xl">
                     <Eye className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-black">РУЧНОЙ</h3>
                     <span className="text-sm text-muted-foreground uppercase tracking-wide">Полный контроль</span>
                   </div>
                 </div>
                 <p className="text-muted-foreground mb-8 text-lg">
                   Вы получаете уведомления о нарушителях с деталями и рекомендациями. Решение за вами.
                 </p>
                 <div className="space-y-4">
                   {[
                     'Уведомления в Email / Telegram',
                     'Детали нарушения и история',
                     'Рекомендации по блокировке',
                     'Вы принимаете решение',
                   ].map((item) => (
                     <div key={item} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </motion.div>
           </motion.div>
         </div>
       </section>
 
       {/* Stats */}
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
               ПОЧЕМУ <span className="text-destructive">ANTI ABUSE</span>
             </h2>
             <p className="text-xl text-background/50 max-w-xl">
               Защитите свой бизнес от недобросовестных клиентов
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
               { icon: Ban, value: '12K+', label: 'заблокировано', desc: 'нарушителей на платформе' },
               { icon: Users, value: '73', label: 'провайдера', desc: 'подключили модуль' },
               { icon: Zap, value: '<1с', label: 'синхронизация', desc: 'между Plooza и биллингом' },
               { icon: ShieldCheck, value: '99.9%', label: 'uptime', desc: 'доступность сервиса' },
             ].map((stat) => (
               <motion.div
                 key={stat.label}
                 variants={scaleIn}
                 className="group relative"
               >
                 <div className="bg-background text-foreground p-8 border-2 border-transparent hover:border-destructive transition-colors h-full rounded-2xl">
                   <stat.icon className="w-8 h-8 text-destructive mb-6" />
                   <div className="text-5xl font-black mb-2">{stat.value}</div>
                   <div className="text-lg font-bold mb-1">{stat.label}</div>
                   <div className="text-muted-foreground text-sm">{stat.desc}</div>
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </section>
 
       {/* Integrations */}
       <section className="py-24 md:py-32 bg-background">
         <div className="container px-6">
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
             className="mb-16 text-center"
           >
             <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
               ИНТЕГРАЦИИ
             </h2>
             <p className="text-xl text-muted-foreground max-w-xl mx-auto">
               Готовые модули для популярных биллинговых систем
             </p>
           </motion.div>
 
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
           >
             {[
               { name: 'BILLmanager', version: '2.1.4', desc: 'Модуль для ISPsystem BILLmanager 6' },
               { name: 'WHMCS', version: '1.8.2', desc: 'Плагин для WHMCS 8.x' },
             ].map((integration) => (
               <motion.div key={integration.name} variants={scaleIn}>
                 <div className="bg-muted p-8 border-2 border-transparent hover:border-primary transition-colors rounded-2xl">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-3xl font-black">{integration.name}</h3>
                     <span className="text-sm font-mono text-muted-foreground bg-background px-3 py-1 rounded-lg">
                       v{integration.version}
                     </span>
                   </div>
                   <p className="text-muted-foreground mb-6">{integration.desc}</p>
                   <div className="flex gap-3">
                     <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold">
                       <Server className="w-4 h-4 mr-2" />
                       Скачать
                     </Button>
                     <Button variant="outline" className="rounded-xl font-bold border-2">
                       Документация
                     </Button>
                   </div>
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
               КАК <span className="text-destructive">ПОДКЛЮЧИТЬ</span>
             </h2>
             <p className="text-xl text-background/50 max-w-xl">
               4 простых шага — и ваш биллинг защищён
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
                 { num: '01', icon: FileText, title: 'Заявка', desc: 'Заполните форму — это займёт 2 минуты. Укажите биллинговую систему и контакт.' },
                 { num: '02', icon: Phone, title: 'Получение модуля', desc: 'Мы отправим вам модуль и инструкцию по установке в течение 24 часов.' },
                 { num: '03', icon: Settings, title: 'Установка', desc: 'Установите модуль в ваш биллинг. При необходимости поможем с настройкой.' },
                 { num: '04', icon: Play, title: 'Защита', desc: 'Выберите режим работы и ваш биллинг под защитой Anti Abuse.' },
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
                     <div className="w-14 h-14 bg-destructive text-destructive-foreground flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform rounded-xl">
                       {step.num}
                     </div>
                   </div>
                   
                   {/* Content */}
                   <div className="pb-10">
                     <div className="flex items-center gap-3 mb-2">
                       <step.icon className="w-5 h-5 text-destructive" />
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
               <h3 className="text-3xl font-black mb-2">ПОЛУЧИТЬ МОДУЛЬ</h3>
               <p className="text-muted-foreground mb-8">Заполните форму и мы отправим модуль</p>
               
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
                     className="h-14 rounded-xl border-2 border-border focus:border-destructive text-lg"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                     Email
                   </label>
                   <Input 
                     type="email"
                     placeholder="admin@hosting.ru"
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     className="h-14 rounded-xl border-2 border-border focus:border-destructive text-lg"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                     Биллинговая система
                   </label>
                   <Input 
                     type="text"
                     placeholder="BILLmanager / WHMCS"
                     value={formData.billing}
                     onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
                     className="h-14 rounded-xl border-2 border-border focus:border-destructive text-lg"
                   />
                 </div>
                 
                 <Button 
                   type="submit"
                   size="lg"
                   className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl h-16 text-lg font-bold uppercase tracking-wide"
                 >
                   <Send className="w-5 h-5 mr-3" />
                   Получить модуль
                 </Button>
                 
                 <p className="text-center text-sm text-muted-foreground">
                   Модуль бесплатный. Установка занимает 5 минут.
                 </p>
               </form>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* Benefits Strip */}
       <section className="bg-destructive py-16">
         <div className="container px-6">
           <motion.div 
             className="grid grid-cols-2 md:grid-cols-4 gap-8 text-destructive-foreground"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
           >
             {[
               { label: 'Бесплатный модуль' },
               { label: 'Мгновенная синхронизация' },
               { label: 'Техподдержка 24/7' },
               { label: 'Простая установка' },
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
 
       <Footer />
     </div>
   );
 };
 
 export default AntiAbusePage;