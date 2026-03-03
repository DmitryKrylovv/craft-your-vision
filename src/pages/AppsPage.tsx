import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Download, Star, Shield, Bell, Search, 
  Briefcase, MapPin, BookmarkCheck, MessageSquare, 
  ChevronRight, Zap, Eye, Heart, ArrowRight
} from 'lucide-react';

const AppsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          </div>
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-primary-foreground">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 mb-6">
                  Plooza Apps
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Plooza Jobs
                  <br />
                  <span className="opacity-80 text-3xl md:text-4xl lg:text-5xl font-bold">для iOS</span>
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg leading-relaxed">
                  Находите вакансии в IT-инфраструктуре, откликайтесь мгновенно и отслеживайте статус — всё в одном приложении
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl h-14 px-8 text-base font-semibold gap-3">
                    <Download className="w-5 h-5" />
                    App Store
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 rounded-2xl h-14 px-8 text-base font-semibold">
                    Узнать больше
                  </Button>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm opacity-80">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">4.8</span>
                    <span>в App Store</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download className="w-4 h-4" />
                    <span className="font-semibold">12K+</span>
                    <span>загрузок</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    <span>iOS 16+</span>
                  </div>
                </div>
              </div>

              {/* iPhone Mockup */}
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* App Features */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="badge-blue mb-4">Возможности</Badge>
              <h2 className="section-title mb-4">Всё для поиска работы в IT</h2>
              <p className="section-subtitle mx-auto">
                Полноценный инструмент для IT-специалистов, ищущих работу в инфраструктуре
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="group p-6 rounded-2xl border border-border bg-card card-hover cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Screens Preview */}
        <section className="py-20 md:py-28 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="badge-blue mb-4">Интерфейс</Badge>
              <h2 className="section-title mb-4">Экраны приложения</h2>
              <p className="section-subtitle mx-auto">
                Знакомый дизайн Plooza, оптимизированный для мобильного опыта
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {screens.map((s, i) => (
                <div key={i} className="group">
                  <MiniPhoneScreen screen={s} />
                  <div className="text-center mt-4">
                    <h4 className="font-semibold text-foreground text-sm">{s.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <Badge className="badge-blue mb-4">Быстрый старт</Badge>
              <h2 className="section-title mb-4">Начните за 2 минуты</h2>
            </div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border my-2" />
                    )}
                  </div>
                  <div className="pb-10">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 gradient-hero">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto text-primary-foreground">
              <Smartphone className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Скачайте Plooza Jobs
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Бесплатно в App Store. Начните искать работу в IT-инфраструктуре прямо сейчас.
              </p>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl h-14 px-10 text-base font-semibold gap-3">
                <Download className="w-5 h-5" />
                Загрузить для iOS
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// ---- Data ----

const features = [
  { icon: Search, title: 'Умный поиск', desc: 'Фильтры по специализации, локации, зарплате и формату работы' },
  { icon: Bell, title: 'Push-уведомления', desc: 'Мгновенные оповещения о новых вакансиях и откликах' },
  { icon: Briefcase, title: 'Управление резюме', desc: 'Создавайте и редактируйте резюме прямо в приложении' },
  { icon: BookmarkCheck, title: 'Быстрый отклик', desc: 'Откликайтесь на вакансии одним свайпом' },
  { icon: MessageSquare, title: 'Чат с HR', desc: 'Общайтесь с работодателями в встроенном мессенджере' },
  { icon: Eye, title: 'Отслеживание', desc: 'Статусы откликов в реальном времени — просмотрено, приглашение, отказ' },
];

const screens = [
  { title: 'Главная', desc: 'Лента вакансий', color: 'bg-primary', items: ['DevOps Engineer — 250K', 'SRE — Яндекс Облако', 'NetEng — DataLine', 'Linux Admin — 180K'] },
  { title: 'Поиск', desc: 'Фильтры и категории', color: 'bg-primary', items: ['Специализация ▾', 'Зарплата от...до', 'Москва, удалённо', '→ 142 вакансии'] },
  { title: 'Вакансия', desc: 'Детали и отклик', color: 'bg-primary', items: ['Senior SRE', '₽ 300 000 – 400 000', 'Kubernetes, Terraform', '[ Откликнуться ]'] },
  { title: 'Профиль', desc: 'Резюме и отклики', color: 'bg-primary', items: ['2 резюме', '8 откликов', '3 приглашения', '→ Настройки'] },
];

const steps = [
  { title: 'Скачайте приложение', desc: 'Загрузите Plooza Jobs из App Store бесплатно' },
  { title: 'Создайте профиль', desc: 'Укажите специализацию, опыт и зарплатные ожидания' },
  { title: 'Настройте уведомления', desc: 'Выберите категории вакансий для push-уведомлений' },
  { title: 'Откликайтесь', desc: 'Находите подходящие вакансии и откликайтесь мгновенно' },
];

// ---- Components ----

const PhoneMockup = () => (
  <div className="relative w-[280px] md:w-[320px]">
    {/* Phone frame */}
    <div className="rounded-[3rem] border-[8px] border-foreground/80 bg-background overflow-hidden shadow-2xl">
      {/* Notch */}
      <div className="relative bg-muted">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-foreground/80 rounded-b-2xl z-10" />
      </div>
      {/* Screen content */}
      <div className="bg-background">
        {/* Status bar */}
        <div className="h-12 bg-background" />
        
        {/* App header */}
        <div className="px-5 pb-4">
          <p className="text-xs text-muted-foreground">Plooza Jobs</p>
          <h3 className="text-lg font-bold text-foreground">Вакансии</h3>
        </div>

        {/* Search bar */}
        <div className="px-5 mb-4">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Поиск вакансий...</span>
          </div>
        </div>

        {/* Quick filters */}
        <div className="px-5 mb-4 flex gap-2 overflow-hidden">
          <span className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-medium whitespace-nowrap">Все</span>
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium whitespace-nowrap">DevOps</span>
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium whitespace-nowrap">SRE</span>
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium whitespace-nowrap">Net</span>
        </div>

        {/* Vacancy cards */}
        <div className="px-5 space-y-3 pb-6">
          {[
            { title: 'Senior DevOps', company: 'Selectel', salary: '250–350K', loc: 'Москва', hot: true },
            { title: 'SRE Engineer', company: 'Яндекс Облако', salary: '300–400K', loc: 'Удалённо', hot: false },
            { title: 'Network Engineer', company: 'DataLine', salary: '180–250K', loc: 'Москва', hot: true },
          ].map((v, i) => (
            <div key={i} className="p-3 rounded-2xl border border-border bg-card">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{v.title}</p>
                    {v.hot && <Zap className="w-3 h-3 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{v.company}</p>
                </div>
                <Heart className="w-4 h-4 text-muted-foreground/50" />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-semibold text-primary">₽ {v.salary}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{v.loc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-around py-3 border-t border-border bg-background">
          <div className="flex flex-col items-center gap-0.5">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-primary font-medium">Вакансии</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Поиск</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <BookmarkCheck className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Отклики</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Профиль</span>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2">
          <div className="w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const MiniPhoneScreen = ({ screen }: { screen: typeof screens[0] }) => (
  <div className="rounded-[2rem] border-[6px] border-foreground/60 bg-background overflow-hidden shadow-lg mx-auto w-[200px] group-hover:shadow-xl transition-shadow">
    <div className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/60 rounded-b-xl" />
    </div>
    <div className="pt-8 pb-4 px-4">
      <p className="text-[10px] text-muted-foreground mb-1">Plooza Jobs</p>
      <p className="text-xs font-bold text-foreground mb-3">{screen.title}</p>
      <div className="space-y-2">
        {screen.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-muted rounded-lg px-2.5 py-2">
            <span className="text-[10px] text-foreground font-medium truncate">{item}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-center py-2">
      <div className="w-20 h-1 bg-foreground/20 rounded-full" />
    </div>
  </div>
);

export default AppsPage;
