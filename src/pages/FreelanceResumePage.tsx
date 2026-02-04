import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Mail, Phone, ExternalLink, Download, MessageSquare, Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceResumePage = () => {
  const { resumeId } = useParams();

  // Mock resume data
  const resume = {
    id: resumeId,
    name: 'Александр Петров',
    initials: 'АП',
    title: 'Senior DevOps Engineer',
    location: 'Москва',
    salary: 'от 280 000 ₽',
    age: 32,
    experience: '8 лет',
    relocate: false,
    remote: true,
    available: true,
    updatedAt: '3 дня назад',
    about: `
Опытный DevOps-инженер с 8-летним стажем работы в высоконагруженных проектах. 
Специализируюсь на построении отказоустойчивых инфраструктур, автоматизации CI/CD процессов и работе с Kubernetes.

Имею опыт работы с облачными провайдерами AWS, GCP и Yandex Cloud. 
Успешно реализовал миграцию монолитного приложения в микросервисную архитектуру.
    `,
    skills: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Linux', 'AWS', 'GCP', 'GitLab CI', 'Prometheus', 'Grafana', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Nginx'],
    workExperience: [
      {
        company: 'Selectel',
        position: 'Senior DevOps Engineer',
        period: 'Январь 2021 — Настоящее время',
        duration: '4 года',
        description: 'Разработка и поддержка инфраструктуры облачной платформы. Управление Kubernetes кластерами, автоматизация деплоя, настройка мониторинга.',
      },
      {
        company: 'Mail.ru Group',
        position: 'DevOps Engineer',
        period: 'Март 2018 — Декабрь 2020',
        duration: '2 года 10 месяцев',
        description: 'Поддержка CI/CD пайплайнов, работа с Docker и Kubernetes, настройка систем мониторинга и алертинга.',
      },
      {
        company: 'Яндекс',
        position: 'Системный администратор',
        period: 'Июнь 2016 — Февраль 2018',
        duration: '1 год 9 месяцев',
        description: 'Администрирование Linux-серверов, автоматизация рутинных задач, настройка сетевого оборудования.',
      },
    ],
    education: [
      {
        institution: 'МГТУ им. Баумана',
        degree: 'Информатика и вычислительная техника',
        period: '2012 — 2016',
      },
    ],
    certificates: [
      'AWS Certified Solutions Architect',
      'Certified Kubernetes Administrator (CKA)',
      'HashiCorp Certified: Terraform Associate',
    ],
    languages: [
      { name: 'Русский', level: 'Родной' },
      { name: 'Английский', level: 'Upper-Intermediate' },
    ],
  };

  const similarResumes = [
    { id: 2, name: 'Дмитрий К.', title: 'DevOps Engineer', salary: 'от 220 000 ₽' },
    { id: 3, name: 'Сергей М.', title: 'SRE Engineer', salary: 'от 250 000 ₽' },
    { id: 4, name: 'Игорь В.', title: 'Infrastructure Engineer', salary: 'от 200 000 ₽' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8">
        {/* Breadcrumb */}
        <Link 
          to="/freelance/specialists" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Все специалисты
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="w-24 h-24 text-2xl">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {resume.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{resume.name}</h1>
                      {resume.available && (
                        <Badge className="bg-green-500/10 text-green-600">
                          Ищет работу
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">{resume.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {resume.location}, {resume.age} лет
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        Опыт {resume.experience}
                      </span>
                      {resume.remote && (
                        <Badge variant="secondary">Удалёнка</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{resume.salary}</div>
                    <div className="text-xs text-muted-foreground">ожидаемая зарплата</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 flex-1 sm:flex-none gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Написать
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Показать контакты
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Скачать PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">О себе</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {resume.about}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Ключевые навыки</h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Опыт работы
                </h2>
                <div className="space-y-6">
                  {resume.workExperience.map((job, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-border">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 bg-blue-500 rounded-full" />
                      <div className="mb-1">
                        <h3 className="font-semibold text-foreground">{job.position}</h3>
                        <p className="text-blue-500 font-medium">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {job.period}
                        <span className="text-muted-foreground/60">•</span>
                        {job.duration}
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Образование
                </h2>
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-muted-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Сертификаты
                </h2>
                <ul className="space-y-2">
                  {resume.certificates.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Обновлено</span>
                  <span className="text-foreground">{resume.updatedAt}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Готов к переезду</span>
                  <span className="text-foreground">{resume.relocate ? 'Да' : 'Нет'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Удалённая работа</span>
                  <span className="text-foreground">{resume.remote ? 'Да' : 'Нет'}</span>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Языки</div>
                  {resume.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{lang.name}</span>
                      <span className="text-muted-foreground">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Similar Resumes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Похожие специалисты</h3>
                <div className="space-y-3">
                  {similarResumes.map((r) => (
                    <Link 
                      key={r.id} 
                      to={`/freelance/resume/${r.id}`}
                      className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="font-medium text-foreground text-sm mb-1">{r.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{r.title}</div>
                      <div className="text-sm text-blue-500 font-medium">{r.salary}</div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/freelance/specialists">Все специалисты</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceResumePage;