import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Clock, Users, ExternalLink, ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, Check, X, Globe, Server, Zap, HeadphonesIcon, Award, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock provider data
const providerData = {
  id: 'timeweb',
  name: 'Timeweb',
  logo: 'https://timeweb.com/favicon.ico',
  description: 'Один из крупнейших хостинг-провайдеров России с 15-летним опытом работы. Предоставляет полный спектр услуг: от виртуального хостинга до выделенных серверов.',
  rating: 4.8,
  reviewsCount: 1247,
  ordersViaPlooza: 3456,
  founded: 2006,
  website: 'timeweb.com',
  isPartner: true, // Партнёр Plooza - можно заказать напрямую
  features: [
    { icon: Shield, label: 'SSL бесплатно' },
    { icon: Clock, label: 'Uptime 99.98%' },
    { icon: HeadphonesIcon, label: 'Поддержка 24/7' },
    { icon: Zap, label: 'NVMe SSD' },
  ],
  stats: {
    avgResponseTime: '15 мин',
    satisfactionRate: 96,
    totalClients: '150 000+',
  }
};

const tariffs = [
  {
    id: 1,
    name: 'Start',
    type: 'Виртуальный хостинг',
    price: 99,
    oldPrice: 199,
    period: 'мес',
    features: ['1 сайт', '5 ГБ SSD', '50 ГБ трафик', 'SSL бесплатно', 'PHP 8.x'],
    popular: false,
  },
  {
    id: 2,
    name: 'Business',
    type: 'Виртуальный хостинг',
    price: 299,
    oldPrice: 499,
    period: 'мес',
    features: ['10 сайтов', '30 ГБ NVMe SSD', 'Безлимит трафик', 'SSL бесплатно', 'PHP 8.x', 'Резервные копии'],
    popular: true,
  },
  {
    id: 3,
    name: 'VPS-1',
    type: 'VPS хостинг',
    price: 449,
    oldPrice: null,
    period: 'мес',
    features: ['1 vCPU', '1 ГБ RAM', '20 ГБ NVMe SSD', 'Безлимит трафик', 'Root доступ', 'Любая ОС'],
    popular: false,
  },
  {
    id: 4,
    name: 'VPS-2',
    type: 'VPS хостинг',
    price: 799,
    oldPrice: 999,
    period: 'мес',
    features: ['2 vCPU', '4 ГБ RAM', '60 ГБ NVMe SSD', 'Безлимит трафик', 'Root доступ', 'Любая ОС', 'Бэкапы'],
    popular: true,
  },
];

const reviews = [
  {
    id: 1,
    author: 'Александр К.',
    rating: 5,
    date: '2 дня назад',
    title: 'Отличный хостинг для бизнеса',
    text: 'Пользуюсь уже 3 года. За это время не было ни одного серьезного сбоя. Техподдержка отвечает быстро и по делу. Рекомендую!',
    helpful: 24,
    notHelpful: 2,
    tariff: 'Business',
  },
  {
    id: 2,
    author: 'Мария В.',
    rating: 4,
    date: '1 неделя назад',
    title: 'Хорошо, но есть нюансы',
    text: 'В целом доволен хостингом. Сайт работает стабильно, скорость загрузки хорошая. Единственный минус — иногда долго отвечает поддержка в выходные.',
    helpful: 15,
    notHelpful: 3,
    tariff: 'Start',
  },
  {
    id: 3,
    author: 'Дмитрий П.',
    rating: 5,
    date: '2 недели назад',
    title: 'Лучший VPS за свои деньги',
    text: 'Перешел с другого провайдера и не жалею. NVMe диски реально быстрые, пинг отличный. За полгода использования проблем не было.',
    helpful: 31,
    notHelpful: 1,
    tariff: 'VPS-2',
  },
];

const ProviderPage = () => {
  const { providerId } = useParams();
  const [activeTab, setActiveTab] = useState('tariffs');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-foreground transition-colors cursor-pointer">Хостинг провайдеры</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{providerData.name}</span>
          </nav>
        </div>
      </div>

      {/* Provider Header */}
      <section className="py-6 sm:py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Provider Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-md flex items-center justify-center border border-border flex-shrink-0">
                  <Server className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{providerData.name}</h1>
                    {providerData.isPartner && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                        <Award className="w-3.5 h-3.5" />
                        Партнёр Plooza
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      {renderStars(providerData.rating)}
                      <span className="font-semibold text-foreground ml-1">{providerData.rating}</span>
                      <span className="text-muted-foreground text-sm">({providerData.reviewsCount} отзывов)</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                    {providerData.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                    {providerData.features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted rounded-lg text-sm">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="lg:w-80 bg-muted/50 rounded-2xl p-5 sm:p-6">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{providerData.ordersViaPlooza.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">заказов через Plooza</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{providerData.stats.satisfactionRate}%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{providerData.stats.avgResponseTime}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">среднее время ответа</div>
                </div>
              </div>
              
              <div className="mt-5 pt-5 border-t border-border space-y-3">
                {providerData.isPartner ? (
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 h-11 shadow-md">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Заказать на Plooza
                  </Button>
                ) : (
                  <Button className="w-full bg-primary hover:bg-primary/90 h-11" asChild>
                    <a href={`https://${providerData.website}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Перейти на сайт
                    </a>
                  </Button>
                )}
                {providerData.isPartner && (
                  <Button variant="outline" className="w-full h-10" asChild>
                    <a href={`https://${providerData.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Сайт провайдера
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-6 sm:py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 rounded-xl mb-6 overflow-x-auto">
              <TabsTrigger value="tariffs" className="px-4 sm:px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Тарифы
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-4 sm:px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Отзывы ({providerData.reviewsCount})
              </TabsTrigger>
              <TabsTrigger value="about" className="px-4 sm:px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                О провайдере
              </TabsTrigger>
            </TabsList>

            {/* Tariffs Tab */}
            <TabsContent value="tariffs" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tariffs.map((tariff) => (
                  <div
                    key={tariff.id}
                    className={`relative bg-card rounded-2xl border p-5 transition-all hover:shadow-lg ${
                      tariff.popular ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {tariff.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Популярный
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground mb-1">{tariff.type}</div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{tariff.name}</h3>
                    
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-3xl font-bold text-foreground">{tariff.price}₽</span>
                      <span className="text-muted-foreground">/{tariff.period}</span>
                      {tariff.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">{tariff.oldPrice}₽</span>
                      )}
                    </div>
                    
                    <ul className="space-y-2 mb-5">
                      {tariff.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className={`w-full ${tariff.popular ? 'bg-primary hover:bg-primary/90' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                    >
                      Заказать
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-0">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Reviews List */}
                <div className="flex-1 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-card rounded-2xl border border-border p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{review.author}</span>
                            <span className="text-xs text-muted-foreground">• {review.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                              Тариф: {review.tariff}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{review.text}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.helpful}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{review.notHelpful}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                          <MessageSquare className="w-4 h-4" />
                          Ответить
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    Показать больше отзывов
                  </Button>
                </div>

                {/* Review Summary */}
                <div className="lg:w-80">
                  <div className="sticky top-32 space-y-4">
                    {/* Rating Block */}
                    <div className="bg-muted/50 rounded-2xl p-5">
                      <h3 className="font-semibold text-foreground mb-4">Рейтинг отзывов</h3>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl font-bold text-foreground">{providerData.rating}</div>
                        <div>
                          <div className="flex">{renderStars(providerData.rating)}</div>
                          <div className="text-sm text-muted-foreground">{providerData.reviewsCount} отзывов</div>
                        </div>
                      </div>
                      
                      {/* Rating bars */}
                      <div className="space-y-2 mb-5">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const percentage = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : 2;
                          return (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground w-3">{stars}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Написать отзыв
                      </Button>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-muted/50 rounded-2xl p-5 border border-border">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">AI-суммаризатор</h3>
                          <span className="text-xs text-muted-foreground">на основе {providerData.reviewsCount} отзывов</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2.5 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-muted-foreground leading-snug">
                            <span className="font-medium text-foreground">Стабильная работа:</span> высокий uptime и быстрая загрузка
                          </p>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-muted-foreground leading-snug">
                            <span className="font-medium text-foreground">Быстрая поддержка:</span> ответ за 15 минут
                          </p>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">!</span>
                          </div>
                          <p className="text-muted-foreground leading-snug">
                            <span className="font-medium text-foreground">Нюанс:</span> задержки в выходные
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                          <Sparkles className="w-3 h-3" />
                          <span>Plooza AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">О компании</h3>
                    <p className="text-muted-foreground mb-4">
                      {providerData.name} — один из ведущих хостинг-провайдеров России, основанный в {providerData.founded} году. 
                      Компания предоставляет полный спектр услуг веб-хостинга: от базового виртуального хостинга до мощных выделенных серверов.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      За годы работы компания зарекомендовала себя как надежный партнер для бизнеса любого масштаба. 
                      Собственные дата-центры уровня Tier III обеспечивают бесперебойную работу с гарантированным uptime 99.98%.
                    </p>
                    <p className="text-muted-foreground">
                      Команда технической поддержки работает круглосуточно и готова помочь с любыми вопросами. 
                      Среднее время ответа составляет всего {providerData.stats.avgResponseTime}.
                    </p>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Преимущества</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: Shield, title: 'Безопасность', desc: 'DDoS защита и SSL сертификаты' },
                        { icon: Zap, title: 'Скорость', desc: 'NVMe SSD и CDN для быстрой загрузки' },
                        { icon: HeadphonesIcon, title: 'Поддержка', desc: 'Круглосуточная помощь экспертов' },
                        { icon: Server, title: 'Надежность', desc: 'Дата-центры уровня Tier III' },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{item.title}</div>
                              <div className="text-sm text-muted-foreground">{item.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Информация</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Год основания</dt>
                        <dd className="font-medium text-foreground">{providerData.founded}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Клиентов</dt>
                        <dd className="font-medium text-foreground">{providerData.stats.totalClients}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Uptime</dt>
                        <dd className="font-medium text-foreground">99.98%</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Сайт</dt>
                        <dd className="font-medium text-primary hover:underline cursor-pointer">{providerData.website}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{providerData.ordersViaPlooza.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground mb-4">заказов через Plooza</div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Выбрать тариф
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProviderPage;
