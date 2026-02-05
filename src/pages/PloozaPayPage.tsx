 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import PayHeader from '@/components/pay/PayHeader';
 import Footer from '@/components/Footer';
 import ploozaLogo from '@/assets/plooza-logo.svg';
 import {
   Wallet,
   Gift,
   Percent,
   CreditCard,
   ArrowRight,
   CheckCircle2,
   TrendingUp,
   BadgePercent,
   Coins,
   Sparkles,
   Store,
   Receipt,
   Check,
   Shield,
   Clock,
 } from 'lucide-react';
 
 const PloozaPayPage = () => {
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
     <div className="min-h-screen flex flex-col bg-background">
       <PayHeader />
       
       <main className="flex-1">
         {/* Hero Section */}
         <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
           <div className="container py-10 md:py-16">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
               
               {/* Left - Text */}
               <div>
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                   <Wallet className="w-4 h-4" />
                   Кошелёк с кэшбэком
                 </div>
                 
                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                   <div className="flex items-baseline gap-2">
                     <img src={ploozaLogo} alt="Plooza" className="h-8 md:h-10 lg:h-12 w-auto" />
                     <span className="text-primary">.Pay</span>
                   </div>
                   <span className="block mt-2">Кэшбэк до 10%</span>
                 </h1>
                 
                 <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                   Получайте кэшбэк за покупки хостинга и серверов. Даже при заказе напрямую у провайдера.
                 </p>
                 
                 <div className="flex flex-wrap gap-3 mb-8">
                   <Button size="lg" className="rounded-xl">
                     Создать кошелёк
                     <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                   <Button size="lg" variant="outline" className="rounded-xl">
                     Как это работает
                   </Button>
                 </div>
 
                 {/* Trust indicators */}
                 <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                   <div className="flex items-center gap-1.5">
                     <Check className="w-4 h-4 text-primary" />
                     Без комиссий
                   </div>
                   <div className="flex items-center gap-1.5">
                     <Clock className="w-4 h-4 text-primary" />
                     Мгновенный вывод
                   </div>
                   <div className="flex items-center gap-1.5">
                     <Shield className="w-4 h-4 text-primary" />
                     Безопасно
                   </div>
                 </div>
               </div>
 
               {/* Right - Wallet Preview */}
               <div className="relative">
                 <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                   {/* Wallet Header */}
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                       <Wallet className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <div className="flex items-center gap-1">
                         <img src={ploozaLogo} alt="Plooza" className="h-4 w-auto" />
                         <span className="font-semibold text-primary">.Pay</span>
                       </div>
                       <div className="text-xs text-muted-foreground">Ваш кошелёк</div>
                     </div>
                   </div>
                   
                   {/* Balance */}
                   <div className="mb-6">
                     <div className="text-sm text-muted-foreground mb-1">Баланс</div>
                     <div className="text-4xl font-bold text-foreground">12 450 ₽</div>
                   </div>
 
                   {/* Recent Transactions */}
                   <div className="space-y-3">
                     <div className="text-sm font-medium text-muted-foreground">Последние начисления</div>
                     <div className="flex items-center justify-between py-2 border-b border-border">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                           <TrendingUp className="w-4 h-4 text-primary" />
                         </div>
                         <div>
                           <div className="text-sm font-medium">Кэшбэк VDS</div>
                           <div className="text-xs text-muted-foreground">Selectel</div>
                         </div>
                       </div>
                       <div className="text-primary font-semibold">+450 ₽</div>
                     </div>
                     <div className="flex items-center justify-between py-2 border-b border-border">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                           <Gift className="w-4 h-4 text-primary" />
                         </div>
                         <div>
                           <div className="text-sm font-medium">Бонус за регистрацию</div>
                           <div className="text-xs text-muted-foreground">Акция</div>
                         </div>
                       </div>
                       <div className="text-primary font-semibold">+500 ₽</div>
                     </div>
                     <div className="flex items-center justify-between py-2">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                           <Receipt className="w-4 h-4 text-primary" />
                         </div>
                         <div>
                           <div className="text-sm font-medium">Кэшбэк Хостинг</div>
                           <div className="text-xs text-muted-foreground">REG.RU</div>
                         </div>
                       </div>
                       <div className="text-primary font-semibold">+320 ₽</div>
                     </div>
                   </div>
                 </div>
 
                 {/* Stats Badge */}
                 <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold shadow-lg">
                   до 10% кэшбэк
                 </div>
               </div>
             </div>
           </div>
         </section>
 
         {/* Benefits Section */}
         <section className="container py-12 md:py-20">
           <div className="text-center mb-12">
             <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
               Преимущества <span className="text-primary">Pay</span>
             </h2>
             <p className="text-muted-foreground max-w-lg mx-auto">
               Экономьте на каждой покупке хостинга и серверов
             </p>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {benefits.map((benefit, index) => (
               <div 
                 key={index}
                 className="bg-card border border-border hover:border-primary/30 rounded-2xl p-5 transition-colors"
               >
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                   <benefit.icon className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                 <p className="text-sm text-muted-foreground">{benefit.description}</p>
               </div>
             ))}
           </div>
         </section>
 
         {/* How it Works */}
         <section className="bg-muted/50 py-12 md:py-20">
           <div className="container">
             <div className="text-center mb-12">
               <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                 Как это работает
               </h2>
               <p className="text-muted-foreground max-w-lg mx-auto">
                 4 простых шага к экономии
               </p>
             </div>
 
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {howItWorks.map((item, index) => (
                 <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center">
                   <div className="text-4xl font-bold text-primary mb-3">{item.step}</div>
                   <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                   <p className="text-sm text-muted-foreground">{item.description}</p>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Direct Cashback */}
         <section className="container py-12 md:py-20">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                 <Sparkles className="w-4 h-4" />
                 Уникальная возможность
               </div>
               
               <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                 Кэшбэк даже при покупке <span className="text-primary">напрямую</span>
               </h2>
               
               <p className="text-muted-foreground mb-6">
                 Покупайте услуги у провайдера напрямую — если он подключён к Plooza, 
                 вы всё равно получите кэшбэк на ваш Pay-кошелёк.
               </p>
               
               <ul className="space-y-3 mb-6">
                 {[
                   'Провайдер интегрирован с Plooza',
                   'Покупка через сайт провайдера',
                   'Кэшбэк зачисляется автоматически',
                   'Отслеживайте все начисления',
                 ].map((item) => (
                   <li key={item} className="flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                     <span className="text-foreground">{item}</span>
                   </li>
                 ))}
               </ul>
               
               <Button className="rounded-xl">
                 Смотреть провайдеров
                 <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </div>
 
             <div className="bg-card border border-border rounded-2xl p-6">
               <div className="text-center mb-6">
                 <div className="text-sm text-muted-foreground mb-2">Провайдеры с кэшбэком</div>
                 <div className="text-3xl font-bold text-foreground">15+</div>
               </div>
               <div className="grid grid-cols-3 gap-3">
                 {['Selectel', 'REG.RU', 'Timeweb', 'VDSina', 'RUVDS', 'Beget'].map((provider) => (
                   <div key={provider} className="bg-muted rounded-xl p-3 text-center">
                     <div className="text-sm font-medium text-foreground">{provider}</div>
                     <div className="text-xs text-primary">до 10%</div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </section>
 
         {/* CTA */}
         <section className="bg-primary py-12 md:py-16">
           <div className="container text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
               Начните экономить уже сегодня
             </h2>
             <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
               Создайте кошелёк Plooza Pay и получите приветственный бонус 500₽
             </p>
             <Button size="lg" variant="secondary" className="rounded-xl">
               Создать кошелёк бесплатно
               <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
             <div className="flex flex-wrap justify-center gap-6 mt-6 text-primary-foreground/70 text-sm">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" />
                 <span>Без комиссий</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" />
                 <span>Мгновенный вывод</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" />
                 <span>500₽ бонус</span>
               </div>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default PloozaPayPage;