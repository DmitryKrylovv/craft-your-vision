import { Link } from 'react-router-dom';
import { Search, Users, Briefcase, Star, ArrowRight, Building2, FileText, TrendingUp, Clock, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelancePage = () => {
  const featuredVacancies = [
    {
      id: 1,
      title: 'Senior DevOps Engineer',
      company: 'Selectel',
      location: 'Москва',
      salary: '250 000 – 350 000 ₽',
      type: 'Полная занятость',
      remote: true,
      hot: true,
      postedAt: '2 часа назад',
    },
    {
      id: 2,
      title: 'Техподдержка L2/L3',
      company: 'REG.RU',
      location: 'Санкт-Петербург',
      salary: '120 000 – 180 000 ₽',
      type: 'Полная занятость',
      remote: true,
      hot: false,
      postedAt: '5 часов назад',
    },
    {
      id: 3,
      title: 'DBA PostgreSQL',
      company: 'Timeweb',
      location: 'Удалённо',
      salary: '180 000 – 250 000 ₽',
      type: 'Полная занятость',
      remote: true,
      hot: true,
      postedAt: '1 день назад',
    },
    {
      id: 4,
      title: 'Cloud Architect (AWS/GCP)',
      company: 'VK Cloud',
      location: 'Москва',
      salary: '300 000 – 450 000 ₽',
      type: 'Полная занятость',
      remote: false,
      hot: false,
      postedAt: '1 день назад',
    },
  ];

  const featuredResumes = [
    {
      id: 1,
      name: 'Александр П.',
      title: 'Senior DevOps Engineer',
      experience: '8 лет',
      salary: 'от 280 000 ₽',
      location: 'Москва',
      skills: ['Kubernetes', 'Docker', 'AWS'],
      available: true,
    },
    {
      id: 2,
      name: 'Дмитрий К.',
      title: 'DBA PostgreSQL',
      experience: '5 лет',
      salary: 'от 200 000 ₽',
      location: 'Санкт-Петербург',
      skills: ['PostgreSQL', 'MySQL', 'Redis'],
      available: true,
    },
    {
      id: 3,
      name: 'Сергей М.',
      title: 'SRE Engineer',
      experience: '6 лет',
      salary: 'от 250 000 ₽',
      location: 'Удалённо',
      skills: ['Linux', 'Prometheus', 'Terraform'],
      available: false,
    },
  ];

  const topCompanies = [
    { name: 'Selectel', vacancies: 12, logo: 'S' },
    { name: 'REG.RU', vacancies: 8, logo: 'R' },
    { name: 'Timeweb', vacancies: 6, logo: 'T' },
    { name: 'VK Cloud', vacancies: 15, logo: 'V' },
    { name: 'Beget', vacancies: 4, logo: 'B' },
    { name: 'FirstVDS', vacancies: 7, logo: 'F' },
  ];

  const categories = [
    { label: 'DevOps', count: 89 },
    { label: 'Техподдержка', count: 124 },
    { label: 'DBA', count: 34 },
    { label: 'Системные администраторы', count: 67 },
    { label: 'Cloud-инженеры', count: 45 },
    { label: 'Сетевые инженеры', count: 28 },
  ];

  const stats = [
    { value: '340+', label: 'Вакансий' },
    { value: '2 800+', label: 'Резюме' },
    { value: '180+', label: 'Компаний' },
    { value: '15K+', label: 'Откликов' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      {/* Hero Section - bold primary gradient */}
      <section className="relative py-16 md:py-24 overflow-hidden gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Работа в хостинг-индустрии
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Вакансии от ведущих хостинг-провайдеров и дата-центров. 
              DevOps, техподдержка, DBA и другие IT-специалисты.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 shadow-xl max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Должность, навыки или компания..."
                    className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Найти
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.label}
                  to={`/freelance/vacancies?category=${encodeURIComponent(cat.label)}`}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm text-white transition-colors"
                >
                  {cat.label} <span className="text-white/70">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two CTAs */}
      <section className="py-12 mt-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Specialists */}
            <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ищете работу?</h3>
                    <p className="text-muted-foreground mb-4">
                      Создайте резюме и получайте предложения от ведущих хостинг-компаний
                    </p>
                    <Button className="gap-2" asChild>
                      <Link to="/freelance/create-resume">
                        Разместить резюме
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Employers */}
            <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-muted/80 transition-colors">
                    <Briefcase className="w-7 h-7 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ищете сотрудников?</h3>
                    <p className="text-muted-foreground mb-4">
                      Разместите вакансию и найдите DevOps, техподдержку, DBA и других специалистов
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <Link to="/freelance/post-vacancy">
                        Разместить вакансию
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Vacancies */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Свежие вакансии</h2>
              <p className="text-muted-foreground">Предложения от хостинг-провайдеров</p>
            </div>
            <Button variant="outline" className="hidden sm:flex gap-2" asChild>
              <Link to="/freelance/vacancies">
                Все вакансии
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {featuredVacancies.map((vacancy) => (
              <Link key={vacancy.id} to={`/freelance/vacancy/${vacancy.id}`}>
                <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-primary hover:border-l-primary/80 group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{vacancy.title}</h3>
                          {vacancy.hot && (
                            <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20">
                              <Zap className="w-3 h-3 mr-1" />
                              Срочно
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{vacancy.company}</p>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                        {vacancy.company[0]}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        {vacancy.location}
                      </span>
                      {vacancy.remote && (
                        <Badge className="bg-primary/10 text-primary text-xs">Удалёнка</Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{vacancy.salary}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {vacancy.postedAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/freelance/vacancies">
                Все вакансии
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Resumes */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Специалисты</h2>
              <p className="text-muted-foreground">Резюме инженеров и IT-специалистов</p>
            </div>
            <Button variant="outline" className="hidden sm:flex gap-2" asChild>
              <Link to="/freelance/specialists">
                Все резюме
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {featuredResumes.map((resume) => (
              <Link key={resume.id} to={`/freelance/resume/${resume.id}`}>
                <Card className="h-full hover:shadow-lg transition-all group overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 shadow-lg shadow-primary/25">
                        {resume.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{resume.name}</h3>
                          {resume.available && (
                            <Badge className="bg-green-500/10 text-green-600 text-xs">
                              Ищет работу
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{resume.title}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {resume.location}
                      </span>
                      <span>•</span>
                      <span>{resume.experience}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {resume.skills.map((skill) => (
                        <Badge key={skill} className="bg-primary/10 text-primary text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="font-semibold text-primary">{resume.salary}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/freelance/specialists">
                Все резюме
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">Категории вакансий</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={`/freelance/vacancies?category=${encodeURIComponent(cat.label)}`}
              >
                <Card className="hover:shadow-md transition-all hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="font-medium text-foreground mb-1">{cat.label}</div>
                    <div className="text-sm text-muted-foreground">{cat.count} вакансий</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Компании</h2>
            <Button variant="ghost" className="gap-2" asChild>
              <Link to="/freelance/companies">
                Все компании
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCompanies.map((company) => (
              <Link key={company.name} to={`/freelance/company/${company.name.toLowerCase()}`}>
                <Card className="hover:shadow-md transition-all hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-3">
                      {company.logo}
                    </div>
                    <div className="font-medium text-foreground mb-1">{company.name}</div>
                    <div className="text-sm text-muted-foreground">{company.vacancies} вакансий</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 gradient-hero relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Присоединяйтесь к Plooza Jobs
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Специализированная платформа для поиска работы в хостинг-индустрии
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg" asChild>
                <Link to="/freelance/create-resume">Создать резюме</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link to="/freelance/post-vacancy">Разместить вакансию</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FreelanceFooter />
    </div>
  );
};

export default FreelancePage;
