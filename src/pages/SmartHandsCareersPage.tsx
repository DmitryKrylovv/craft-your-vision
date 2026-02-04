import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Wrench, Users, MapPin, Clock,
  Check, ArrowRight, Send, Wallet,
  Smartphone, Calendar, Shield,
  Star, ChevronRight,
  Building2, Zap, TrendingUp, Briefcase,
  Bell, CreditCard, Award, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const howItWorks = [
  { 
    num: '01', 
    title: 'Регистрация', 
    desc: 'Заполните анкету и укажите дата-центры, в которых можете работать' 
  },
  { 
    num: '02', 
    title: 'Верификация', 
    desc: 'Мы проверим ваш опыт и добавим в базу инженеров' 
  },
  { 
    num: '03', 
    title: 'Получение заявок', 
    desc: 'Получайте уведомления о новых заданиях в вашем ЦОД' 
  },
  { 
    num: '04', 
    title: 'Выполнение и оплата', 
    desc: 'Выполните работу, отправьте отчёт и получите оплату' 
  },
];

const benefits = [
  { icon: Wallet, title: 'Быстрые выплаты', desc: 'Оплата в течение 3 дней после выполнения заявки' },
  { icon: Calendar, title: 'Свободный график', desc: 'Берите заявки когда удобно, работайте на себя' },
  { icon: Smartphone, title: 'Мобильное приложение', desc: 'Управляйте заявками прямо с телефона' },
  { icon: Bell, title: 'Мгновенные уведомления', desc: 'Первым узнавайте о новых заявках в вашем ЦОД' },
  { icon: TrendingUp, title: 'Рост дохода', desc: 'Чем выше рейтинг — тем больше заявок и выше ставка' },
  { icon: Shield, title: 'Страховка', desc: 'Страхование ответственности на время выполнения работ' },
];

const earnings = [
  { task: 'Визуальный осмотр', price: '500 ₽', time: '15-30 мин' },
  { task: 'Перезагрузка сервера', price: '300-500 ₽', time: '10-20 мин' },
  { task: 'Замена диска', price: '1 500 ₽', time: '30-60 мин' },
  { task: 'Монтаж сервера', price: '2 000-5 000 ₽', time: '1-2 часа' },
  { task: 'Кабельные работы', price: '2 000-4 000 ₽', time: '1-3 часа' },
  { task: 'Консольный доступ', price: '1 500 ₽', time: '30-60 мин' },
];

const cities = [
  'Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 
  'Екатеринбург', 'Нижний Новгород', 'Краснодар', 'Другой город'
];

const datacenters = [
  'DataLine', 'IXcellerate', 'Selectel', 'Rostelecom', 
  'DataPro', 'Stack Group', 'Другой ЦОД'
];

const SmartHandsCareersPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    city: '',
    experience: '',
    datacenters: [] as string[],
    about: ''
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const toggleDatacenter = (dc: string) => {
    if (formData.datacenters.includes(dc)) {
      setFormData({ ...formData, datacenters: formData.datacenters.filter(d => d !== dc) });
    } else {
      setFormData({ ...formData, datacenters: [...formData.datacenters, dc] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left - Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Briefcase className="w-4 h-4" />
                  Для инженеров
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Зарабатывай
                  <br />
                  <span className="text-primary">на своих навыках.</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Стань фриланс-инженером Smart Hands. Получай заявки из дата-центров твоего города и зарабатывай в свободном графике.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="rounded-xl">
                        Стать инженером
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Регистрация инженера</DialogTitle>
                        <DialogDescription>
                          Заполните анкету — мы свяжемся для верификации
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">ФИО</label>
                            <Input 
                              placeholder="Иван Иванов" 
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Телефон</label>
                            <Input 
                              placeholder="+7 (999) 123-45-67"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email</label>
                          <Input 
                            type="email" 
                            placeholder="ivan@mail.ru"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Город</label>
                            <Select value={formData.city} onValueChange={(v) => setFormData({ ...formData, city: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Опыт в ЦОД</label>
                            <Select value={formData.experience} onValueChange={(v) => setFormData({ ...formData, experience: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="no">Без опыта</SelectItem>
                                <SelectItem value="1-2">1-2 года</SelectItem>
                                <SelectItem value="3-5">3-5 лет</SelectItem>
                                <SelectItem value="5+">Более 5 лет</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Доступные ЦОД</label>
                          <div className="flex flex-wrap gap-2">
                            {datacenters.map((dc) => (
                              <Badge 
                                key={dc}
                                variant={formData.datacenters.includes(dc) ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => toggleDatacenter(dc)}
                              >
                                {dc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">О себе и опыте</label>
                          <Textarea 
                            placeholder="Расскажите о своём опыте работы с серверным оборудованием..."
                            className="min-h-[80px]"
                            value={formData.about}
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox 
                            id="terms" 
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          />
                          <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                            Согласен с <a href="#" className="text-primary hover:underline">условиями сотрудничества</a> и <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                          </label>
                        </div>
                        <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                          <Send className="w-4 h-4 mr-2" />
                          Отправить заявку
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button size="lg" variant="outline" className="rounded-xl" asChild>
                    <a href="#how-it-works">
                      Как это работает
                    </a>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary" />
                    Бесплатная регистрация
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-primary" />
                    Выплаты от 3 дней
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    Свободный график
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">120+</div>
                      <div className="text-sm text-muted-foreground">инженеров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">50+</div>
                      <div className="text-sm text-muted-foreground">ЦОД</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">~85K</div>
                      <div className="text-sm text-muted-foreground">средний доход</div>
                    </div>
                  </div>
                </div>

                {/* Feature Blocks */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">До 150K/мес</div>
                  <div className="text-xs text-muted-foreground">Потенциальный доход</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Push-уведомления</div>
                  <div className="text-xs text-muted-foreground">Новые заявки мгновенно</div>
                </div>

                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <Star className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Рейтинговая система</div>
                  <div className="text-xs text-muted-foreground">Больше отзывов — больше заявок</div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Быстрые выплаты</div>
                  <div className="text-xs text-muted-foreground">На карту за 3 дня</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="container py-10 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Как это работает</h2>
            <p className="text-muted-foreground">Простой путь от регистрации до первого заработка</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.num} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
                <div className="bg-card border border-border rounded-2xl p-6 relative z-10 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Earnings */}
        <section className="bg-muted/50 py-10 md:py-16">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Сколько можно заработать</h2>
              <p className="text-muted-foreground">Примеры оплаты за типичные задачи</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnings.map((item) => (
                <Card key={item.task} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-foreground">{item.task}</span>
                      <Badge variant="secondary">{item.time}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">{item.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Активные инженеры зарабатывают 80-150K в месяц</div>
                    <div className="text-sm text-muted-foreground">При выполнении 3-5 заявок в неделю в крупных городах</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="container py-10 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Преимущества работы с нами</h2>
            <p className="text-muted-foreground">Почему инженеры выбирают Smart Hands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="hover:shadow-lg hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-muted/50 py-10 md:py-16">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Требования к инженерам</h2>
              <p className="text-muted-foreground">Что нужно для начала работы</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Обязательно
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                {[
                    'Статус самозанятого или ИП',
                    'Опыт работы с серверным оборудованием',
                    'Смартфон для получения заявок и отчётов',
                    'Возможность быстро добраться до ЦОД',
                    'Ответственность и внимательность',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Повышенный рейтинг за
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Сертификаты вендоров (Dell, HP, Cisco)',
                    'Опыт работы в крупных дата-центрах',
                    'Постоянный пропуск в ЦОД',
                    'Наличие инструментов',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-amber-500 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Self-employed info */}
        <section className="container py-10 md:py-16">
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Требуется статус самозанятого</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Для работы на платформе необходимо быть самозанятым или ИП. Это позволяет нам официально переводить оплату за выполненные заявки. 
                    Оформить самозанятость можно бесплатно за 5 минут через приложение «Мой налог».
                  </p>
                  <a href="https://npd.nalog.ru/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline font-medium">
                    Узнать больше о самозанятости →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Datacenter Vacancies */}
        <section className="bg-muted/50 py-10 md:py-16">
          <div className="container">
            <div className="mb-8">
              <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                Постоянная работа
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Вакансии в дата-центрах</h2>
              <p className="text-muted-foreground">
                Готовы выйти на полную смену? Наши партнёрские ЦОД ищут инженеров в штат
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  dc: 'DataLine', 
                  location: 'Москва, М9', 
                  position: 'Инженер ЦОД',
                  salary: '90 000 - 120 000 ₽',
                  schedule: 'Сменный график 2/2',
                  hot: true,
                },
                { 
                  dc: 'IXcellerate', 
                  location: 'Москва, Южный порт', 
                  position: 'Старший инженер',
                  salary: '130 000 - 160 000 ₽',
                  schedule: '5/2',
                },
                { 
                  dc: 'Selectel', 
                  location: 'Санкт-Петербург', 
                  position: 'Инженер технической поддержки',
                  salary: '80 000 - 100 000 ₽',
                  schedule: 'Сменный график',
                  hot: true,
                },
                { 
                  dc: 'Rostelecom', 
                  location: 'Москва', 
                  position: 'Инженер по эксплуатации',
                  salary: '100 000 - 130 000 ₽',
                  schedule: '5/2',
                },
                { 
                  dc: 'Stack Group', 
                  location: 'Москва', 
                  position: 'Дежурный инженер',
                  salary: '70 000 - 90 000 ₽',
                  schedule: 'Сменный график 2/2',
                },
                { 
                  dc: 'DataPro', 
                  location: 'Москва', 
                  position: 'Инженер ЦОД',
                  salary: '85 000 - 110 000 ₽',
                  schedule: 'Сменный график',
                },
              ].map((vacancy) => (
                <Card 
                  key={`${vacancy.dc}-${vacancy.position}`}
                  className="hover:shadow-lg hover:border-primary/50 transition-all relative"
                >
                  {vacancy.hot && (
                    <Badge className="absolute top-3 right-3 bg-red-500/10 text-red-600 hover:bg-red-500/10">
                      <Zap className="w-3 h-3 mr-1" />
                      Срочно
                    </Badge>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{vacancy.dc}</span>
                    </div>
                    <CardTitle className="text-lg">{vacancy.position}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {vacancy.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {vacancy.schedule}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{vacancy.salary}</span>
                      <Button variant="ghost" size="sm" className="gap-1 text-primary">
                        Откликнуться <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Ваш ЦОД ищет инженеров? Разместите вакансию на нашей платформе
              </p>
              <Button variant="outline" className="rounded-xl">
                Разместить вакансию
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 py-10 md:py-16">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Готов начать зарабатывать?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Регистрация бесплатная и занимает 2 минуты. Первые заявки можно получить уже на следующий день после верификации.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-xl">
                  Зарегистрироваться
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Регистрация инженера</DialogTitle>
                  <DialogDescription>
                    Заполните анкету — мы свяжемся для верификации
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">ФИО</label>
                      <Input 
                        placeholder="Иван Иванов" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Телефон</label>
                      <Input 
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input 
                      type="email" 
                      placeholder="ivan@mail.ru"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Город</label>
                      <Select value={formData.city} onValueChange={(v) => setFormData({ ...formData, city: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Опыт в ЦОД</label>
                      <Select value={formData.experience} onValueChange={(v) => setFormData({ ...formData, experience: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">Без опыта</SelectItem>
                          <SelectItem value="1-2">1-2 года</SelectItem>
                          <SelectItem value="3-5">3-5 лет</SelectItem>
                          <SelectItem value="5+">Более 5 лет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Доступные ЦОД</label>
                    <div className="flex flex-wrap gap-2">
                      {datacenters.map((dc) => (
                        <Badge 
                          key={dc}
                          variant={formData.datacenters.includes(dc) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleDatacenter(dc)}
                        >
                          {dc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">О себе и опыте</label>
                    <Textarea 
                      placeholder="Расскажите о своём опыте..."
                      className="min-h-[80px]"
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms2" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <label htmlFor="terms2" className="text-sm text-muted-foreground leading-tight">
                      Согласен с <a href="#" className="text-primary hover:underline">условиями сотрудничества</a>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SmartHandsCareersPage;
