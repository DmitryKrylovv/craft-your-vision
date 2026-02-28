import { Link } from 'react-router-dom';
import { FileText, Send, Eye, Clock, MapPin, Briefcase, Star, Settings, Bell, ChevronRight, MoreHorizontal, CheckCircle2, XCircle, Hourglass, PenLine, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceProfilePage = () => {
  const user = {
    name: 'Алексей Иванов',
    email: 'alexey.ivanov@mail.ru',
    phone: '+7 (999) 123-45-67',
    location: 'Москва',
    joinedAt: 'Январь 2024',
    avatar: 'АИ',
  };

  const resumes = [
    {
      id: 1,
      title: 'Senior DevOps Engineer',
      salary: 'от 280 000 ₽',
      status: 'active',
      views: 342,
      responses: 12,
      updatedAt: '2 дня назад',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    },
    {
      id: 2,
      title: 'SRE / Infrastructure Engineer',
      salary: 'от 250 000 ₽',
      status: 'hidden',
      views: 89,
      responses: 3,
      updatedAt: '2 недели назад',
      skills: ['Linux', 'Prometheus', 'Grafana'],
    },
  ];

  const applications = [
    {
      id: 1,
      vacancy: 'Senior DevOps Engineer',
      company: 'Selectel',
      salary: '250 000 – 350 000 ₽',
      status: 'viewed',
      appliedAt: '3 дня назад',
      resumeTitle: 'Senior DevOps Engineer',
    },
    {
      id: 2,
      vacancy: 'Cloud Architect (AWS/GCP)',
      company: 'VK Cloud',
      salary: '300 000 – 450 000 ₽',
      status: 'invited',
      appliedAt: '5 дней назад',
      resumeTitle: 'Senior DevOps Engineer',
    },
    {
      id: 3,
      vacancy: 'Lead SRE',
      company: 'Яндекс.Облако',
      salary: '350 000 – 500 000 ₽',
      status: 'rejected',
      appliedAt: '1 неделю назад',
      resumeTitle: 'SRE / Infrastructure Engineer',
    },
    {
      id: 4,
      vacancy: 'DBA PostgreSQL',
      company: 'Timeweb',
      salary: '180 000 – 250 000 ₽',
      status: 'pending',
      appliedAt: '2 недели назад',
      resumeTitle: 'Senior DevOps Engineer',
    },
  ];

  const favoriteVacancies = [
    {
      id: 1,
      title: 'Platform Engineer',
      company: 'Selectel',
      salary: '280 000 – 380 000 ₽',
      location: 'Санкт-Петербург',
      remote: true,
    },
    {
      id: 2,
      title: 'DevOps Team Lead',
      company: 'REG.RU',
      salary: '320 000 – 420 000 ₽',
      location: 'Москва',
      remote: true,
    },
    {
      id: 3,
      title: 'Infrastructure Engineer',
      company: 'Beget',
      salary: '200 000 – 300 000 ₽',
      location: 'Удалённо',
      remote: true,
    },
  ];

  const notifications = [
    { id: 1, text: 'Selectel просмотрел ваш отклик на «Senior DevOps Engineer»', time: '2 часа назад', read: false },
    { id: 2, text: 'VK Cloud приглашает вас на собеседование', time: '1 день назад', read: false },
    { id: 3, text: 'Ваше резюме «Senior DevOps Engineer» поднято в поиске', time: '3 дня назад', read: true },
    { id: 4, text: 'Яндекс.Облако отклонил ваш отклик', time: '1 неделю назад', read: true },
  ];

  const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
    pending: { label: 'Ожидает', icon: Hourglass, className: 'bg-muted text-muted-foreground' },
    viewed: { label: 'Просмотрен', icon: Eye, className: 'bg-blue-500/10 text-blue-600' },
    invited: { label: 'Приглашение', icon: CheckCircle2, className: 'bg-green-500/10 text-green-600' },
    rejected: { label: 'Отказ', icon: XCircle, className: 'bg-destructive/10 text-destructive' },
  };

  const resumeStatusConfig: Record<string, { label: string; className: string }> = {
    active: { label: 'Активно', className: 'bg-green-500/10 text-green-600' },
    hidden: { label: 'Скрыто', className: 'bg-muted text-muted-foreground' },
  };

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
              {user.avatar}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.location}
              </span>
              <span>•</span>
              <span>{user.email}</span>
              <span>•</span>
              <span>На платформе с {user.joinedAt}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Настройки
              </Button>
              <Button size="sm" className="gap-2" asChild>
                <Link to="/freelance/create-resume">
                  <FileText className="w-4 h-4" />
                  Новое резюме
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{resumes.length}</div>
                <div className="text-xs text-muted-foreground">Резюме</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{applications.length}</div>
                <div className="text-xs text-muted-foreground">Отклики</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{favoriteVacancies.length}</div>
                <div className="text-xs text-muted-foreground">Избранное</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="resumes" className="space-y-6">
          <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="resumes" className="gap-2">
              <FileText className="w-4 h-4" />
              Мои резюме
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Send className="w-4 h-4" />
              Отклики
              <Badge className="bg-primary/10 text-primary text-xs ml-1">
                {applications.filter(a => a.status === 'invited').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Star className="w-4 h-4" />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Уведомления
              <Badge className="bg-destructive/10 text-destructive text-xs ml-1">
                {notifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Resumes Tab */}
          <TabsContent value="resumes" className="space-y-4">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link to={`/freelance/resume/${resume.id}`} className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {resume.title}
                        </Link>
                        <Badge className={resumeStatusConfig[resume.status].className}>
                          {resumeStatusConfig[resume.status].label}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold text-primary mb-3">{resume.salary}</div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {resume.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {resume.views} просмотров
                        </span>
                        <span className="flex items-center gap-1">
                          <Send className="w-4 h-4" />
                          {resume.responses} откликов
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Обновлено {resume.updatedAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <PenLine className="w-4 h-4" />
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed hover:border-primary/50 transition-colors">
              <CardContent className="p-8 text-center">
                <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Создать ещё одно резюме</h3>
                <p className="text-sm text-muted-foreground mb-4">Для разных позиций — разные резюме</p>
                <Button asChild>
                  <Link to="/freelance/create-resume">Создать резюме</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            {applications.map((app) => {
              const status = statusConfig[app.status];
              const StatusIcon = status.icon;
              return (
                <Card key={app.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                          {app.company[0]}
                        </div>
                        <div className="flex-1">
                          <Link to={`/freelance/vacancy/${app.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                            {app.vacancy}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-0.5">
                            {app.company} · {app.salary}
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>Резюме: {app.resumeTitle}</span>
                            <span>•</span>
                            <span>{app.appliedAt}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${status.className} gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            {favoriteVacancies.map((vacancy) => (
              <Card key={vacancy.id} className="hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                        {vacancy.company[0]}
                      </div>
                      <div>
                        <Link to={`/freelance/vacancy/${vacancy.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                          {vacancy.title}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {vacancy.company} · {vacancy.location}
                          {vacancy.remote && <Badge className="bg-primary/10 text-primary text-xs ml-2">Удалёнка</Badge>}
                        </div>
                        <div className="font-semibold text-primary mt-1">{vacancy.salary}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2">
                        <Send className="w-4 h-4" />
                        Откликнуться
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-2">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {notification.text}
                    </p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceProfilePage;
