import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Wrench, Server, HardDrive, Network,
  Cable, Zap, Shield, Clock,
  Check, MapPin, ArrowRight,
  Package, Eye, Camera, Thermometer,
  Headphones, Send, Phone, Users,
  ChevronRight, Star, BadgeCheck, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  popular?: boolean;
}

const services: Service[] = [
  { 
    id: 'mount', 
    icon: Package, 
    title: 'Монтаж / демонтаж', 
    description: 'Установка серверов в стойку, прокладка кабелей, подключение питания',
    price: 'от 2 000 ₽',
    popular: true,
  },
  { 
    id: 'replace', 
    icon: HardDrive, 
    title: 'Замена компонентов', 
    description: 'Замена дисков, модулей памяти, блоков питания',
    price: 'от 1 500 ₽',
    popular: true,
  },
  { 
    id: 'inspect', 
    icon: Eye, 
    title: 'Визуальный осмотр', 
    description: 'Проверка индикаторов, состояния кабелей, фиксация положения',
    price: 'от 500 ₽',
  },
  { 
    id: 'photo', 
    icon: Camera, 
    title: 'Фото-фиксация', 
    description: 'Фото оборудования, серийных номеров, кабельных подключений',
    price: 'от 500 ₽',
  },
  { 
    id: 'reboot', 
    icon: Zap, 
    title: 'Перезагрузка', 
    description: 'Аппаратная перезагрузка, сброс питания, включение/выключение',
    price: 'от 300 ₽',
  },
  { 
    id: 'network', 
    icon: Network, 
    title: 'Сетевые работы', 
    description: 'Переключение портов, замена патч-кордов, проверка линков',
    price: 'от 1 000 ₽',
  },
  { 
    id: 'environment', 
    icon: Thermometer, 
    title: 'Мониторинг среды', 
    description: 'Контроль температуры, влажности, состояния охлаждения',
    price: 'от 500 ₽',
  },
  { 
    id: 'console', 
    icon: Headphones, 
    title: 'Консольный доступ', 
    description: 'Подключение через KVM/IPMI, помощь с загрузкой и диагностикой',
    price: 'от 1 500 ₽',
  },
  { 
    id: 'cabling', 
    icon: Cable, 
    title: 'Кабельные работы', 
    description: 'Укладка кабелей, маркировка, организация кабель-менеджмента',
    price: 'от 2 000 ₽',
  },
];

const datacenters = [
  { name: 'DataLine M9', city: 'Москва', flag: '🇷🇺' },
  { name: 'Selectel Цветочная', city: 'СПб', flag: '🇷🇺' },
  { name: 'IXcellerate', city: 'Москва', flag: '🇷🇺' },
  { name: 'Rostelecom', city: 'Москва', flag: '🇷🇺' },
  { name: 'DataPro', city: 'Москва', flag: '🇷🇺' },
  { name: 'Linxdatacenter', city: 'СПб', flag: '🇷🇺' },
];

const SmartHandsPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    datacenter: '',
    description: ''
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left - Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Wrench className="w-4 h-4" />
                  Smart Hands
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Удалённые руки.
                  <br />
                  <span className="text-primary">В вашем ЦОД.</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Профессиональные сервисные инженеры в крупнейших дата-центрах России. Работаем за вас на месте 24/7.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="rounded-xl">
                        Заказать услугу
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Заказать Smart Hands</DialogTitle>
                        <DialogDescription>
                          Опишите задачу — мы свяжемся в течение 15 минут
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Имя</label>
                            <Input 
                              placeholder="Иван" 
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
                            placeholder="ivan@company.ru"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Дата-центр</label>
                          <Input 
                            placeholder="DataLine M9, Москва"
                            value={formData.datacenter}
                            onChange={(e) => setFormData({ ...formData, datacenter: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Описание задачи</label>
                          <Textarea 
                            placeholder="Что нужно сделать?"
                            className="min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Отправить заявку
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button size="lg" variant="outline" className="rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    +7 (800) 123-45-67
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary" />
                    SLA до 1 часа
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Работаем 24/7
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    Фото-отчёты
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">50+</div>
                      <div className="text-sm text-muted-foreground">дата-центров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">120+</div>
                      <div className="text-sm text-muted-foreground">инженеров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">&lt;1ч</div>
                      <div className="text-sm text-muted-foreground">реакция</div>
                    </div>
                  </div>
                </div>

                {/* Feature Block 1 */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Свои инженеры</div>
                  <div className="text-xs text-muted-foreground">Штатные специалисты</div>
                </div>

                {/* Feature Block 2 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Camera className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Фото-отчёты</div>
                  <div className="text-xs text-muted-foreground">До и после работ</div>
                </div>

                {/* Feature Block 3 */}
                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">24/7/365</div>
                  <div className="text-xs text-muted-foreground">Круглосуточно</div>
                </div>

                {/* Feature Block 4 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <BadgeCheck className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Гарантия</div>
                  <div className="text-xs text-muted-foreground">99.9% успешных работ</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Catalog */}
        <section className="container py-10 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Каталог услуг</h2>
            <p className="text-muted-foreground">Выберите нужную услугу или оставьте заявку с описанием задачи</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer relative"
                onClick={() => setSelectedService(service)}
              >
                {service.popular && (
                  <Badge className="absolute top-3 right-3 bg-primary/10 text-primary hover:bg-primary/10">
                    Популярное
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{service.price}</span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      Заказать <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Datacenters */}
        <section className="bg-muted/50 py-10 md:py-16">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">География присутствия</h2>
              <p className="text-muted-foreground">Работаем в крупнейших дата-центрах России</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {datacenters.map((dc) => (
                <Card key={dc.name} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{dc.flag}</div>
                    <div className="font-medium text-sm text-foreground">{dc.name}</div>
                    <div className="text-xs text-muted-foreground">{dc.city}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-6 text-sm">
              И ещё 40+ дата-центров по всей России и СНГ
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="container py-10 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Как это работает</h2>
            <p className="text-muted-foreground">Простой процесс заказа услуги Smart Hands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Заявка', desc: 'Опишите задачу и укажите дата-центр' },
              { num: '02', title: 'Согласование', desc: 'Уточним детали и сроки выполнения' },
              { num: '03', title: 'Выполнение', desc: 'Инженер выполнит работы на месте' },
              { num: '04', title: 'Отчёт', desc: 'Получите фото-отчёт о выполнении' },
            ].map((step, index) => (
              <div key={step.num} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
                <div className="bg-card border border-border rounded-2xl p-6 relative z-10">
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

        {/* Join Team Banner */}
        <section className="container py-10 md:py-16">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Briefcase className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Ты инженер? Зарабатывай с нами!
                  </h3>
                  <p className="text-muted-foreground mb-4 md:mb-0">
                    Стань фриланс-инженером Smart Hands. Получай заявки, работай в свободном графике и зарабатывай до 150K в месяц.
                  </p>
                </div>
                <Button size="lg" className="rounded-xl shrink-0" asChild>
                  <Link to="/smart-hands/careers">
                    Стать инженером
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 py-10 md:py-16">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Нужна помощь в дата-центре?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Свяжитесь с нами — инженер будет на площадке в кратчайшие сроки
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="rounded-xl">
                    Оставить заявку
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Заказать Smart Hands</DialogTitle>
                    <DialogDescription>
                      Опишите задачу — мы свяжемся в течение 15 минут
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Имя</label>
                        <Input 
                          placeholder="Иван" 
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
                        placeholder="ivan@company.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Дата-центр</label>
                      <Input 
                        placeholder="DataLine M9, Москва"
                        value={formData.datacenter}
                        onChange={(e) => setFormData({ ...formData, datacenter: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Описание задачи</label>
                      <Textarea 
                        placeholder="Что нужно сделать?"
                        className="min-h-[100px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="rounded-xl">
                <Phone className="w-4 h-4 mr-2" />
                +7 (800) 123-45-67
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Service Order Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedService && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedService.icon className="w-5 h-5 text-primary" />
                  </div>
                  {selectedService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Стоимость</div>
              <div className="font-semibold text-foreground">{selectedService?.price}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Имя</label>
                <Input 
                  placeholder="Иван" 
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
              <label className="text-sm font-medium mb-1.5 block">Дата-центр</label>
              <Input 
                placeholder="DataLine M9, Москва"
                value={formData.datacenter}
                onChange={(e) => setFormData({ ...formData, datacenter: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Дополнительная информация</label>
              <Textarea 
                placeholder="Укажите детали задачи..."
                className="min-h-[80px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SmartHandsPage;
