import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Users, Calendar, Star, ExternalLink, Building2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceCompanyPage = () => {
  const { companyId } = useParams();

  const company = {
    id: companyId,
    name: 'Selectel',
    logo: 'S',
    description: 'Один из крупнейших независимых провайдеров IT-инфраструктуры в России. Мы предоставляем облачные серверы, выделенные серверы, хранение данных и CDN для бизнеса любого масштаба.',
    website: 'selectel.ru',
    location: 'Санкт-Петербург',
    employees: '500+',
    founded: '2008',
    rating: 4.7,
    reviewsCount: 89,
    openVacancies: 12,
    industry: 'IT-инфраструктура',
    benefits: [
      'ДМС со стоматологией',
      'Гибкий график работы',
      'Удалённая работа',
      'Оплата обучения и конференций',
      'Компенсация спорта',
      'Корпоративные мероприятия',
    ],
    techStack: ['Kubernetes', 'Go', 'Python', 'PostgreSQL', 'Terraform', 'Ansible', 'Prometheus', 'React'],
  };

  const vacancies = [
    { id: 1, title: 'Senior DevOps Engineer', salary: '250 000 – 350 000 ₽', location: 'Москва', remote: true, hot: true, postedAt: '2 часа назад' },
    { id: 2, title: 'Backend Developer (Go)', salary: '200 000 – 300 000 ₽', location: 'Санкт-Петербург', remote: true, hot: false, postedAt: '1 день назад' },
    { id: 3, title: 'Frontend Developer (React)', salary: '180 000 – 260 000 ₽', location: 'Санкт-Петербург', remote: true, hot: false, postedAt: '3 дня назад' },
    { id: 4, title: 'SRE Engineer', salary: '220 000 – 320 000 ₽', location: 'Москва', remote: false, hot: true, postedAt: '5 дней назад' },
    { id: 5, title: 'Product Manager', salary: '200 000 – 280 000 ₽', location: 'Санкт-Петербург', remote: true, hot: false, postedAt: '1 неделю назад' },
  ];

  const reviews = [
    { id: 1, author: 'Алексей К.', role: 'DevOps Engineer', rating: 5, date: '2 недели назад', text: 'Отличная компания с сильной инженерной культурой. Много интересных задач, хорошая команда.' },
    { id: 2, author: 'Мария С.', role: 'Frontend Developer', rating: 4, date: '1 месяц назад', text: 'Комфортные условия работы, адекватное руководство. Есть возможности для роста.' },
    { id: 3, author: 'Дмитрий В.', role: 'Backend Developer', rating: 5, date: '2 месяца назад', text: 'Современный стек, интересные проекты. ДМС и другие бенефиты на высшем уровне.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8">
        <Link
          to="/freelance"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Все вакансии
        </Link>

        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {company.logo}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-1">{company.name}</h1>
                <p className="text-muted-foreground mb-4">{company.industry}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{company.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{company.employees} сотрудников</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />С {company.founded} года</span>
                  <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-500 hover:underline">
                    <Globe className="w-4 h-4" />{company.website}<ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{company.rating}</span>
                    <span className="text-sm text-muted-foreground">({company.reviewsCount} отзывов)</span>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Briefcase className="w-3 h-3" />
                    {company.openVacancies} вакансий
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList>
            <TabsTrigger value="about">О компании</TabsTrigger>
            <TabsTrigger value="vacancies">Вакансии ({vacancies.length})</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3">Описание</h2>
                    <p className="text-muted-foreground leading-relaxed">{company.description}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Технологии</h2>
                    <div className="flex flex-wrap gap-2">
                      {company.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm py-1.5 px-3">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Преимущества</h2>
                  <div className="space-y-3">
                    {company.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vacancies Tab */}
          <TabsContent value="vacancies">
            <div className="space-y-3">
              {vacancies.map((v) => (
                <Link key={v.id} to={`/freelance/vacancy/${v.id}`}>
                  <Card className="hover:border-blue-500/30 transition-colors">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{v.title}</span>
                          {v.hot && <Badge className="bg-orange-500/10 text-orange-600 text-xs">Срочно</Badge>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{v.location}</span>
                          {v.remote && <Badge variant="secondary" className="text-xs">Удалёнка</Badge>}
                          <span>{v.postedAt}</span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-blue-500 whitespace-nowrap">{v.salary}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-foreground">{r.author}</div>
                        <div className="text-sm text-muted-foreground">{r.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{r.date}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceCompanyPage;
