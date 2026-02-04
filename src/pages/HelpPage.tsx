import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Server, 
  Globe, 
  Shield, 
  CreditCard,
  HelpCircle,
  BookOpen,
  Headphones,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const helpCategories = [
  {
    id: 'hosting',
    icon: Server,
    title: 'Хостинг и серверы',
    description: 'VPS, VDS, выделенные серверы',
    color: 'bg-blue-500/10 text-blue-600',
    articles: 24,
  },
  {
    id: 'domains',
    icon: Globe,
    title: 'Домены',
    description: 'Регистрация, трансфер, DNS',
    color: 'bg-green-500/10 text-green-600',
    articles: 18,
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Безопасность',
    description: 'SSL, защита, бэкапы',
    color: 'bg-purple-500/10 text-purple-600',
    articles: 15,
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Оплата и счета',
    description: 'Тарифы, оплата, возвраты',
    color: 'bg-orange-500/10 text-orange-600',
    articles: 12,
  },
  {
    id: 'account',
    icon: HelpCircle,
    title: 'Аккаунт',
    description: 'Регистрация, настройки',
    color: 'bg-pink-500/10 text-pink-600',
    articles: 10,
  },
  {
    id: 'guides',
    icon: BookOpen,
    title: 'Руководства',
    description: 'Инструкции и туториалы',
    color: 'bg-cyan-500/10 text-cyan-600',
    articles: 32,
  },
];

const popularFAQ = [
  {
    question: 'Как выбрать подходящий VPS-сервер?',
    answer: 'При выборе VPS сервера учитывайте: объем оперативной памяти (от 1 ГБ для небольших проектов), тип накопителя (NVMe быстрее SSD), локацию дата-центра (ближе к вашей аудитории), наличие DDoS-защиты и качество технической поддержки. Используйте наш конфигуратор для подбора оптимального варианта.',
  },
  {
    question: 'Как перенести сайт на другой хостинг?',
    answer: 'Миграция сайта включает несколько этапов: 1) Создайте бэкап файлов и базы данных, 2) Настройте новый хостинг, 3) Загрузите файлы и импортируйте БД, 4) Проверьте работоспособность, 5) Обновите DNS-записи. Многие провайдеры предлагают бесплатную миграцию — уточните у поддержки.',
  },
  {
    question: 'Что делать, если сайт недоступен?',
    answer: 'Проверьте: 1) Статус сервера в панели управления провайдера, 2) Оплачен ли хостинг, 3) DNS-записи домена, 4) Логи ошибок сервера. Если проблема на стороне провайдера — обратитесь в техподдержку. Используйте инструменты мониторинга для отслеживания uptime.',
  },
  {
    question: 'Как установить SSL-сертификат?',
    answer: 'Большинство провайдеров предлагают бесплатные SSL от Let\'s Encrypt с автоматической установкой. В панели управления найдите раздел "SSL/TLS" и активируйте сертификат для вашего домена. Для коммерческих сертификатов потребуется дополнительная верификация.',
  },
  {
    question: 'Как связаться с поддержкой провайдера?',
    answer: 'На Plooza вы можете найти контакты поддержки каждого провайдера на его странице. Обычно доступны: тикет-система (рекомендуется для сложных вопросов), онлайн-чат, телефон и email. Проверяйте время работы поддержки — не все работают 24/7.',
  },
  {
    question: 'Что такое Colocation и кому это нужно?',
    answer: 'Colocation — это размещение вашего собственного оборудования в дата-центре провайдера. Подходит для компаний с высокими требованиями к производительности, безопасности или специфическому оборудованию. Вы получаете стойко-место, электропитание, охлаждение и каналы связи.',
  },
];

const quickLinks = [
  { title: 'Сравнение VPS провайдеров', href: '/vds', icon: Server },
  { title: 'Рейтинг провайдеров', href: '/providers', icon: BookOpen },
  { title: 'Облачные решения', href: '/cloud', icon: Globe },
  { title: 'Colocation', href: '/colocation', icon: Shield },
];

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQ = popularFAQ.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Headphones className="w-4 h-4" />
                Центр поддержки
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Чем можем помочь?
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Найдите ответы на популярные вопросы или свяжитесь с нашей командой поддержки
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по базе знаний..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-base rounded-2xl border-2 border-border focus:border-primary bg-background shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Категории помощи
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {helpCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="group cursor-pointer card-hover border-border hover:border-primary/30"
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.articles} статей
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FAQ Accordion */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Часто задаваемые вопросы
                </h2>
                
                {filteredFAQ.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-3">
                    {filteredFAQ.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border border-border rounded-xl px-4 bg-card data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-2xl">
                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      По вашему запросу ничего не найдено
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Нужна помощь?
                    </CardTitle>
                    <CardDescription>
                      Свяжитесь с нами любым удобным способом
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a 
                      href="tel:+78001234567" 
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          8 800 123-45-67
                        </p>
                        <p className="text-xs text-muted-foreground">Бесплатно по России</p>
                      </div>
                    </a>
                    <a 
                      href="mailto:support@plooza.ru" 
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          support@plooza.ru
                        </p>
                        <p className="text-xs text-muted-foreground">Ответим в течение часа</p>
                      </div>
                    </a>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Написать в чат
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Полезные разделы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Не нашли ответ на свой вопрос?
              </h2>
              <p className="text-muted-foreground mb-8">
                Наша команда поддержки готова помочь вам с любыми вопросами о выборе хостинга и провайдеров
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Связаться с поддержкой
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl" asChild>
                  <Link to="/blog">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Читать блог
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
