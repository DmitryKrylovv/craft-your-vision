 import { useState } from 'react';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import {
   Shield,
   ShieldCheck,
   ShieldAlert,
   Bell,
   Settings,
   Users,
   Ban,
   CheckCircle2,
   ArrowRight,
   Zap,
   Lock,
   Eye,
   AlertTriangle,
   RefreshCw,
   Server,
 } from 'lucide-react';
 
 const AntiAbusePage = () => {
   const [selectedMode, setSelectedMode] = useState<'auto' | 'manual'>('auto');
 
   const features = [
     {
       icon: Zap,
       title: 'Мгновенная синхронизация',
       description: 'Данные о нарушителях синхронизируются в реальном времени между Plooza и вашим биллингом',
     },
     {
       icon: Shield,
       title: 'Защита от мошенников',
       description: 'Блокируйте клиентов с историей нарушений до того, как они нанесут ущерб',
     },
     {
       icon: Users,
       title: 'Общая база нарушителей',
       description: 'Доступ к базе заблокированных пользователей со всего маркетплейса',
     },
     {
       icon: Lock,
       title: 'Конфиденциальность',
       description: 'Данные о ваших клиентах остаются защищёнными и не передаются третьим лицам',
     },
   ];
 
   const billingIntegrations = [
     {
       id: 'billmanager',
       name: 'BILLmanager',
       logo: '💳',
       description: 'Модуль для ISPsystem BILLmanager 6',
       version: '2.1.4',
       status: 'stable',
     },
     {
       id: 'whmcs',
       name: 'WHMCS',
       logo: '🔷',
       description: 'Плагин для WHMCS 8.x',
       version: '1.8.2',
       status: 'stable',
     },
   ];
 
   const pricingPlans = [
     {
       name: 'Starter',
       price: 'Бесплатно',
       period: '',
       description: 'Для небольших провайдеров',
       features: [
         'До 100 клиентов',
         'Только уведомления',
         'Email-оповещения',
         'Базовая статистика',
       ],
       highlighted: false,
     },
     {
       name: 'Professional',
       price: '2 990',
       period: '₽/мес',
       description: 'Для растущего бизнеса',
       features: [
         'До 1 000 клиентов',
         'Авто-блокировка',
         'Webhook интеграция',
         'Расширенная аналитика',
         'Telegram-уведомления',
         'Приоритетная поддержка',
       ],
       highlighted: true,
     },
     {
       name: 'Enterprise',
       price: 'По запросу',
       period: '',
       description: 'Для крупных провайдеров',
       features: [
         'Неограниченно клиентов',
         'Кастомные правила',
         'API доступ',
         'SLA 99.9%',
         'Выделенный менеджер',
         'On-premise установка',
       ],
       highlighted: false,
     },
   ];
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       {/* Hero Section */}
       <section className="relative py-16 md:py-24 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />
         <div className="container relative">
           <div className="max-w-4xl mx-auto text-center">
             <Badge className="mb-6 bg-red-500/10 text-red-600 border-red-200 px-4 py-1.5">
               <ShieldAlert className="w-4 h-4 mr-2" />
               Защита от абьюза
             </Badge>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
               Anti Abuse
             </h1>
             <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
               Модуль синхронизации блокировок между Plooza и вашим биллингом. 
               Защитите свой бизнес от недобросовестных клиентов.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" className="gap-2">
                 Подключить бесплатно
                 <ArrowRight className="w-4 h-4" />
               </Button>
               <Button size="lg" variant="outline" className="gap-2">
                 Документация
               </Button>
             </div>
           </div>
         </div>
       </section>
 
       {/* How it works */}
       <section className="py-16 bg-muted/30">
         <div className="container">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               Выберите режим работы модуля в зависимости от ваших потребностей
             </p>
           </div>
 
           <Tabs value={selectedMode} onValueChange={(v) => setSelectedMode(v as 'auto' | 'manual')} className="max-w-4xl mx-auto">
             <TabsList className="grid w-full grid-cols-2 mb-8">
               <TabsTrigger value="auto" className="gap-2">
                 <Zap className="w-4 h-4" />
                 Автоматический режим
               </TabsTrigger>
               <TabsTrigger value="manual" className="gap-2">
                 <Eye className="w-4 h-4" />
                 Ручное управление
               </TabsTrigger>
             </TabsList>
 
             <TabsContent value="auto">
               <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-800">
                 <CardHeader>
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                       <ShieldCheck className="w-6 h-6 text-red-600" />
                     </div>
                     <div>
                       <CardTitle>Полное доверие системе</CardTitle>
                       <CardDescription>Рекомендуется для максимальной защиты</CardDescription>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-4">
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm font-bold text-red-600">1</div>
                       <div>
                         <p className="font-medium">Клиент банится на Plooza</p>
                         <p className="text-sm text-muted-foreground">За нарушение правил маркетплейса</p>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-sm font-bold text-orange-600">2</div>
                       <div>
                         <p className="font-medium">Модуль получает сигнал</p>
                         <p className="text-sm text-muted-foreground">Мгновенная синхронизация данных</p>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm font-bold text-green-600">3</div>
                       <div>
                         <p className="font-medium">Автоматическая блокировка</p>
                         <p className="text-sm text-muted-foreground">Клиент не сможет купить напрямую</p>
                       </div>
                     </div>
                   </div>
 
                   <div className="flex items-center gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                     <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                     <p className="text-sm text-amber-800 dark:text-amber-200">
                       При включении автоматического режима все заблокированные на Plooza клиенты будут автоматически заблокированы в вашем биллинге
                     </p>
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>
 
             <TabsContent value="manual">
               <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
                 <CardHeader>
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                       <Bell className="w-6 h-6 text-blue-600" />
                     </div>
                     <div>
                       <CardTitle>Полный контроль</CardTitle>
                       <CardDescription>Вы принимаете решение по каждому случаю</CardDescription>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-4">
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-600">1</div>
                       <div>
                         <p className="font-medium">Клиент банится на Plooza</p>
                         <p className="text-sm text-muted-foreground">За нарушение правил маркетплейса</p>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm font-bold text-indigo-600">2</div>
                       <div>
                         <p className="font-medium">Вы получаете уведомление</p>
                         <p className="text-sm text-muted-foreground">С деталями нарушения и рекомендациями</p>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 p-4 rounded-lg bg-background/80">
                       <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-sm font-bold text-violet-600">3</div>
                       <div>
                         <p className="font-medium">Принимаете решение</p>
                         <p className="text-sm text-muted-foreground">Заблокировать, предупредить или проигнорировать</p>
                       </div>
                     </div>
                   </div>
 
                   <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                     <Bell className="w-5 h-5 text-blue-600 shrink-0" />
                     <p className="text-sm text-blue-800 dark:text-blue-200">
                       Уведомления приходят на Email, в Telegram или через Webhook в вашу систему
                     </p>
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>
           </Tabs>
         </div>
       </section>
 
       {/* Features */}
       <section className="py-16">
         <div className="container">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Преимущества</h2>
             <p className="text-muted-foreground">Почему провайдеры выбирают Anti Abuse</p>
           </div>
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {features.map((feature) => {
               const Icon = feature.icon;
               return (
                 <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                   <CardContent className="p-6">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                       <Icon className="w-6 h-6 text-primary" />
                     </div>
                     <h3 className="font-semibold mb-2">{feature.title}</h3>
                     <p className="text-sm text-muted-foreground">{feature.description}</p>
                   </CardContent>
                 </Card>
               );
             })}
           </div>
         </div>
       </section>
 
       {/* Integrations */}
       <section className="py-16 bg-muted/30">
         <div className="container">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Поддерживаемые биллинги</h2>
             <p className="text-muted-foreground">Готовые модули для популярных биллинговых систем</p>
           </div>
 
           <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
             {billingIntegrations.map((integration) => (
               <Card key={integration.id} className="border-0 shadow-sm">
                 <CardContent className="p-6">
                   <div className="flex items-start gap-4">
                     <div className="text-4xl">{integration.logo}</div>
                     <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-semibold text-lg">{integration.name}</h3>
                         <Badge variant="secondary" className="text-xs">v{integration.version}</Badge>
                       </div>
                       <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                       <div className="flex gap-2">
                         <Button size="sm" className="gap-2">
                           <Server className="w-4 h-4" />
                           Скачать модуль
                         </Button>
                         <Button size="sm" variant="outline">
                           Документация
                         </Button>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
 
           <div className="text-center mt-8">
             <p className="text-muted-foreground mb-4">Нужна интеграция с другой системой?</p>
             <Button variant="outline">Связаться с нами</Button>
           </div>
         </div>
       </section>
 
       {/* Pricing */}
       <section className="py-16">
         <div className="container">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Тарифы</h2>
             <p className="text-muted-foreground">Выберите план, подходящий для вашего бизнеса</p>
           </div>
 
           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
             {pricingPlans.map((plan) => (
               <Card
                 key={plan.name}
                 className={`relative ${
                   plan.highlighted
                     ? 'border-2 border-primary shadow-lg scale-105'
                     : 'border-0 shadow-sm'
                 }`}
               >
                 {plan.highlighted && (
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                     <Badge className="bg-primary">Популярный</Badge>
                   </div>
                 )}
                 <CardContent className="p-6">
                   <div className="text-center mb-6">
                     <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                     <div className="flex items-baseline justify-center gap-1">
                       <span className="text-3xl font-bold">{plan.price}</span>
                       {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                     </div>
                     <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                   </div>
                   <ul className="space-y-3 mb-6">
                     {plan.features.map((feature) => (
                       <li key={feature} className="flex items-center gap-2 text-sm">
                         <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                         {feature}
                       </li>
                     ))}
                   </ul>
                   <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                     {plan.price === 'По запросу' ? 'Связаться' : 'Выбрать план'}
                   </Button>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </section>
 
       {/* Stats */}
       <section className="py-16 bg-muted/30">
         <div className="container">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
             <div>
               <div className="text-4xl font-bold text-primary mb-2">50+</div>
               <div className="text-muted-foreground">Провайдеров подключено</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-primary mb-2">12K+</div>
               <div className="text-muted-foreground">Заблокировано нарушителей</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
               <div className="text-muted-foreground">Uptime сервиса</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-primary mb-2">&lt;1с</div>
               <div className="text-muted-foreground">Время синхронизации</div>
             </div>
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <section className="py-16">
         <div className="container">
           <Card className="border-0 bg-gradient-to-br from-red-500 to-orange-500 text-white">
             <CardContent className="p-8 md:p-12 text-center">
               <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
               <h2 className="text-3xl font-bold mb-4">Защитите свой бизнес сегодня</h2>
               <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                 Присоединяйтесь к сообществу провайдеров, которые уже защищают свои сервисы с помощью Anti Abuse
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button size="lg" variant="secondary" className="gap-2">
                   Начать бесплатно
                   <ArrowRight className="w-4 h-4" />
                 </Button>
                 <Button size="lg" variant="outline" className="bg-transparent border-white/30 hover:bg-white/10 text-white">
                   Запросить демо
                 </Button>
               </div>
             </CardContent>
           </Card>
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default AntiAbusePage;