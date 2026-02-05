import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
   Sparkles,
   Globe,
   Network,
   Activity,
   TrendingUp,
   Clock,
 } from 'lucide-react';
 
 const AntiAbusePage = () => {
   const [selectedMode, setSelectedMode] = useState<'auto' | 'manual'>('auto');
   const [blockedCount, setBlockedCount] = useState(12847);

   // Animated counter effect
   useEffect(() => {
     const interval = setInterval(() => {
       setBlockedCount(prev => prev + Math.floor(Math.random() * 3));
     }, 5000);
     return () => clearInterval(interval);
   }, []);
 
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
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-500/5 to-rose-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 backdrop-blur-sm"
            >
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Защита нового поколения</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Anti Abuse
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Единая система защиты от недобросовестных клиентов. 
              Синхронизируйте блокировки между <span className="text-foreground font-medium">Plooza</span> и вашим биллингом в реальном времени.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="gap-2 h-14 px-8 text-base bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg shadow-red-500/25">
                <Shield className="w-5 h-5" />
                Подключить бесплатно
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-base border-2">
                <Server className="w-5 h-5" />
                Скачать модуль
              </Button>
             </div>
            
            {/* Live stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-red-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Ban className="w-5 h-5 text-red-500" />
                    <span className="text-3xl font-bold text-red-600">{blockedCount.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Заблокировано</p>
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-orange-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Network className="w-5 h-5 text-orange-500" />
                    <span className="text-3xl font-bold text-orange-600">73</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Провайдера</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-emerald-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    <span className="text-3xl font-bold text-emerald-600">99.9%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-blue-500/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-3xl font-bold text-blue-600">&lt;1с</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Синхронизация</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
         </div>
       </section>
 
      {/* Visual Flow Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как работает защита</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мгновенная синхронизация данных о нарушителях между всеми подключёнными провайдерами
            </p>
          </motion.div>
          
          {/* Flow diagram */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4 items-center">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <Ban className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Нарушитель</h3>
                  <p className="text-xs text-muted-foreground">Клиент нарушает правила</p>
                </div>
              </motion.div>
              
              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="h-1 w-full bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-full origin-left"
                />
              </div>
              
              {/* Step 2 - Plooza */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-2 border-orange-500/30 text-center shadow-lg shadow-orange-500/10">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Plooza</h3>
                  <p className="text-xs text-muted-foreground">Центр синхронизации</p>
                  <Badge className="mt-2 bg-orange-500/20 text-orange-600 border-0">Anti Abuse API</Badge>
                </div>
              </motion.div>
              
              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="h-1 w-full bg-gradient-to-r from-orange-500/50 to-emerald-500/50 rounded-full origin-left"
                />
              </div>
              
              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-600/5 border border-emerald-500/20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Провайдеры</h3>
                  <p className="text-xs text-muted-foreground">Мгновенная блокировка</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

       {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-muted/30">
         <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Настройка</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Выберите режим работы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Выберите режим работы модуля в зависимости от ваших потребностей
             </p>
          </motion.div>
 
           <Tabs value={selectedMode} onValueChange={(v) => setSelectedMode(v as 'auto' | 'manual')} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 p-1.5">
              <TabsTrigger value="auto" className="gap-2 h-full text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
                 <Zap className="w-4 h-4" />
                 Автоматический режим
               </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2 h-full text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                 <Eye className="w-4 h-4" />
                 Ручное управление
               </TabsTrigger>
             </TabsList>
 
             <TabsContent value="auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
              <Card className="border-2 border-red-500/30 bg-gradient-to-br from-red-50/80 to-orange-50/50 dark:from-red-950/30 dark:to-orange-950/20 dark:border-red-800/50 shadow-xl shadow-red-500/10">
                 <CardHeader>
                   <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-7 h-7 text-white" />
                     </div>
                     <div>
                      <CardTitle className="text-xl">Полное доверие системе</CardTitle>
                       <CardDescription>Рекомендуется для максимальной защиты</CardDescription>
                     </div>
                    <Badge className="ml-auto bg-red-500 text-white border-0">Рекомендуется</Badge>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-red-200/50 dark:border-red-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-sm font-bold text-white shadow">1</div>
                       <div>
                         <p className="font-medium">Клиент банится на Plooza</p>
                         <p className="text-sm text-muted-foreground">За нарушение правил маркетплейса</p>
                       </div>
                     </div>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-orange-200/50 dark:border-orange-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm font-bold text-white shadow">2</div>
                       <div>
                         <p className="font-medium">Модуль получает сигнал</p>
                         <p className="text-sm text-muted-foreground">Мгновенная синхронизация данных</p>
                       </div>
                     </div>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-emerald-200/50 dark:border-emerald-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow">3</div>
                       <div>
                         <p className="font-medium">Автоматическая блокировка</p>
                         <p className="text-sm text-muted-foreground">Клиент не сможет купить напрямую</p>
                       </div>
                     </div>
                   </div>
 
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
                     <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                     <p className="text-sm text-amber-800 dark:text-amber-200">
                       При включении автоматического режима все заблокированные на Plooza клиенты будут автоматически заблокированы в вашем биллинге
                     </p>
                   </div>
                 </CardContent>
               </Card>
              </motion.div>
             </TabsContent>
 
             <TabsContent value="manual">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
              <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 dark:border-blue-800/50 shadow-xl shadow-blue-500/10">
                 <CardHeader>
                   <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                      <Bell className="w-7 h-7 text-white" />
                     </div>
                     <div>
                      <CardTitle className="text-xl">Полный контроль</CardTitle>
                       <CardDescription>Вы принимаете решение по каждому случаю</CardDescription>
                     </div>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-blue-200/50 dark:border-blue-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow">1</div>
                       <div>
                         <p className="font-medium">Клиент банится на Plooza</p>
                         <p className="text-sm text-muted-foreground">За нарушение правил маркетплейса</p>
                       </div>
                     </div>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-indigo-200/50 dark:border-indigo-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow">2</div>
                       <div>
                         <p className="font-medium">Вы получаете уведомление</p>
                         <p className="text-sm text-muted-foreground">С деталями нарушения и рекомендациями</p>
                       </div>
                     </div>
                    <div className="flex items-start gap-3 p-5 rounded-xl bg-background/90 border border-violet-200/50 dark:border-violet-800/30">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow">3</div>
                       <div>
                         <p className="font-medium">Принимаете решение</p>
                         <p className="text-sm text-muted-foreground">Заблокировать, предупредить или проигнорировать</p>
                       </div>
                     </div>
                   </div>
 
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800">
                     <Bell className="w-5 h-5 text-blue-600 shrink-0" />
                     <p className="text-sm text-blue-800 dark:text-blue-200">
                       Уведомления приходят на Email, в Telegram или через Webhook в вашу систему
                     </p>
                   </div>
                 </CardContent>
               </Card>
              </motion.div>
             </TabsContent>
           </Tabs>
         </div>
       </section>
 
       {/* Features */}
      <section className="py-20">
         <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Преимущества</h2>
            <p className="text-lg text-muted-foreground">Почему провайдеры выбирают Anti Abuse</p>
          </motion.div>
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
               const Icon = feature.icon;
               return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="relative p-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
               );
             })}
           </div>
         </div>
       </section>
 
       {/* Integrations */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-muted/50">
         <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Интеграции</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Поддерживаемые биллинги</h2>
            <p className="text-lg text-muted-foreground">Готовые модули для популярных биллинговых систем</p>
          </motion.div>
 
           <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {billingIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl group-hover:scale-110 transition-transform">{integration.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{integration.name}</h3>
                          <Badge variant="secondary" className="text-xs font-mono">v{integration.version}</Badge>
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">Stable</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary/80">
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
              </motion.div>
             ))}
           </div>
 
           <div className="text-center mt-8">
             <p className="text-muted-foreground mb-4">Нужна интеграция с другой системой?</p>
            <Button variant="outline" size="lg">Связаться с нами</Button>
           </div>
         </div>
       </section>
 
       {/* Pricing */}
      <section className="py-20">
         <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тарифы</h2>
            <p className="text-lg text-muted-foreground">Выберите план, подходящий для вашего бизнеса</p>
          </motion.div>
 
           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                 key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
               >
                <Card
                  className={`relative h-full ${
                    plan.highlighted
                      ? 'border-2 border-primary shadow-2xl shadow-primary/20 scale-105 z-10'
                      : 'border-0 shadow-lg'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1">Популярный</Badge>
                     </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full h-12 ${plan.highlighted ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg' : ''}`} 
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.price === 'По запросу' ? 'Связаться' : 'Выбрать план'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       {/* CTA */}
      <section className="py-20">
         <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="relative border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
              <CardContent className="relative p-10 md:p-16 text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Shield className="w-10 h-10" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Защитите свой бизнес сегодня</h2>
                <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                  Присоединяйтесь к сообществу провайдеров, которые уже защищают свои сервисы с помощью Anti Abuse
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="gap-2 h-14 px-8 text-base shadow-xl">
                    Начать бесплатно
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-2 border-white/40 hover:bg-white/10 text-white">
                    Запросить демо
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default AntiAbusePage;