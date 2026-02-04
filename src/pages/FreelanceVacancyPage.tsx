import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Building2, Users, Zap, ExternalLink, Heart, Share2, CheckCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceVacancyPage = () => {
  const { vacancyId } = useParams();

  // Mock vacancy data
  const vacancy = {
    id: vacancyId,
    title: 'Senior DevOps Engineer',
    company: {
      name: 'Selectel',
      logo: 'S',
      description: 'Один из крупнейших хостинг-провайдеров России с собственными дата-центрами',
      employees: '500+',
      founded: '2008',
      website: 'selectel.ru',
    },
    location: 'Москва',
    salary: '250 000 – 350 000 ₽',
    salaryGross: true,
    type: 'Полная занятость',
    experience: '3-6 лет',
    remote: true,
    hot: true,
    postedAt: '2 часа назад',
    views: 234,
    responses: 12,
    description: `
Мы ищем опытного DevOps-инженера для работы над инфраструктурными проектами нашей облачной платформы.

**Чем предстоит заниматься:**
- Разработка и поддержка CI/CD пайплайнов
- Автоматизация инфраструктуры с помощью Terraform и Ansible
- Работа с Kubernetes кластерами
- Мониторинг и алертинг (Prometheus, Grafana, ELK)
- Оптимизация производительности сервисов

**Требования:**
- Опыт работы DevOps/SRE от 3 лет
- Глубокое понимание Linux
- Опыт работы с контейнерами (Docker, Kubernetes)
- Знание IaC инструментов (Terraform, Ansible)
- Опыт настройки CI/CD (GitLab CI, Jenkins, GitHub Actions)
- Понимание принципов построения отказоустойчивых систем

**Будет плюсом:**
- Опыт работы с облачными провайдерами (AWS, GCP, Yandex Cloud)
- Знание Go или Python для автоматизации
- Опыт работы с service mesh (Istio, Linkerd)
    `,
    benefits: [
      'Белая зарплата',
      'ДМС со стоматологией',
      'Гибкий график',
      'Удалённая работа',
      'Оплата обучения',
      'Компенсация спорта',
    ],
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Linux', 'CI/CD', 'Prometheus', 'Grafana'],
  };

  const similarVacancies = [
    { id: 2, title: 'DevOps Engineer', company: 'REG.RU', salary: '180 000 – 250 000 ₽' },
    { id: 3, title: 'SRE Engineer', company: 'VK Cloud', salary: '220 000 – 320 000 ₽' },
    { id: 4, title: 'Infrastructure Engineer', company: 'Timeweb', salary: '200 000 – 280 000 ₽' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8">
        {/* Breadcrumb */}
        <Link 
          to="/freelance" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Все вакансии
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{vacancy.title}</h1>
                      {vacancy.hot && (
                        <Badge className="bg-orange-500/10 text-orange-600">
                          <Zap className="w-3 h-3 mr-1" />
                          Срочно
                        </Badge>
                      )}
                    </div>
                    <Link 
                      to={`/freelance/company/${vacancy.company.name.toLowerCase()}`}
                      className="text-lg text-muted-foreground hover:text-primary"
                    >
                      {vacancy.company.name}
                    </Link>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {vacancy.company.logo}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {vacancy.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {vacancy.experience}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {vacancy.type}
                  </span>
                  {vacancy.remote && (
                    <Badge variant="secondary">Удалёнка</Badge>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{vacancy.salary}</div>
                    {vacancy.salaryGross && (
                      <div className="text-xs text-muted-foreground">до вычета налогов</div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 flex-1 sm:flex-none">
                    Откликнуться
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Heart className="w-4 h-4" />
                    В избранное
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Описание вакансии</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {vacancy.description}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Ключевые навыки</h2>
                <div className="flex flex-wrap gap-2">
                  {vacancy.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Условия работы</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {vacancy.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {vacancy.company.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{vacancy.company.name}</h3>
                    <a 
                      href={`https://${vacancy.company.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                      {vacancy.company.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {vacancy.company.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Сотрудников</span>
                    <span className="font-medium text-foreground">{vacancy.company.employees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Основана</span>
                    <span className="font-medium text-foreground">{vacancy.company.founded}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 gap-2" asChild>
                  <Link to={`/freelance/company/${vacancy.company.name.toLowerCase()}`}>
                    <Building2 className="w-4 h-4" />
                    Все вакансии компании
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Опубликовано</span>
                  <span className="text-foreground">{vacancy.postedAt}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Просмотров</span>
                  <span className="text-foreground">{vacancy.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Откликов</span>
                  <span className="text-foreground">{vacancy.responses}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Vacancies */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Похожие вакансии</h3>
                <div className="space-y-3">
                  {similarVacancies.map((v) => (
                    <Link 
                      key={v.id} 
                      to={`/freelance/vacancy/${v.id}`}
                      className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="font-medium text-foreground text-sm mb-1">{v.title}</div>
                      <div className="text-xs text-muted-foreground mb-1">{v.company}</div>
                      <div className="text-sm text-blue-500 font-medium">{v.salary}</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceVacancyPage;