import { useState } from 'react';
import { 
  Search, Briefcase, BookmarkCheck, MessageSquare, User,
  MapPin, Heart, Zap, ChevronLeft, ChevronRight, Bell,
  Filter, Star, Clock, Send, Check, Eye, X, Settings,
  FileText, Plus, MoreHorizontal, ArrowLeft, Share2,
  Bookmark, Building2, Calendar, DollarSign, Globe,
  BadgeCheck, TrendingUp, ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Tab = 'vacancies' | 'search' | 'responses' | 'profile';
type Screen = 'main' | 'vacancy-detail' | 'notifications' | 'settings' | 'resume-detail';

const AppsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('vacancies');
  const [screen, setScreen] = useState<Screen>('main');
  const [selectedVacancy, setSelectedVacancy] = useState<number>(0);
  const [savedVacancies, setSavedVacancies] = useState<Set<number>>(new Set([2]));

  const toggleSaved = (id: number) => {
    setSavedVacancies(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openVacancy = (id: number) => {
    setSelectedVacancy(id);
    setScreen('vacancy-detail');
  };

  const goBack = () => setScreen('main');

  const navigateTab = (tab: Tab) => {
    setActiveTab(tab);
    setScreen('main');
  };

  return (
    <div className="min-h-screen bg-foreground/95 flex items-center justify-center p-4 md:p-8">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] rounded-[3rem] border-[8px] border-foreground/70 bg-background overflow-hidden shadow-2xl flex flex-col">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-foreground rounded-b-[1.2rem] z-50" />

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {screen === 'vacancy-detail' ? (
            <VacancyDetailScreen 
              vacancy={vacancies[selectedVacancy]} 
              onBack={goBack}
              isSaved={savedVacancies.has(selectedVacancy)}
              onToggleSave={() => toggleSaved(selectedVacancy)}
            />
          ) : screen === 'notifications' ? (
            <NotificationsScreen onBack={goBack} />
          ) : screen === 'settings' ? (
            <SettingsScreen onBack={goBack} />
          ) : (
            <>
              {activeTab === 'vacancies' && (
                <VacanciesTab 
                  onOpenVacancy={openVacancy} 
                  savedVacancies={savedVacancies}
                  onToggleSave={toggleSaved}
                  onOpenNotifications={() => setScreen('notifications')}
                />
              )}
              {activeTab === 'search' && (
                <SearchTab onOpenVacancy={openVacancy} />
              )}
              {activeTab === 'responses' && (
                <ResponsesTab onOpenVacancy={openVacancy} />
              )}
              {activeTab === 'profile' && (
                <ProfileTab onOpenSettings={() => setScreen('settings')} />
              )}
            </>
          )}
        </div>

        {/* Tab Bar */}
        <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-around px-2 pt-2 pb-1">
            {tabItems.map(t => (
              <button 
                key={t.id}
                onClick={() => navigateTab(t.id as Tab)}
                className="flex flex-col items-center gap-0.5 py-1 px-3 min-w-[64px]"
              >
                <t.icon className={`w-[22px] h-[22px] ${activeTab === t.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-medium ${activeTab === t.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
          {/* Home Indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== DATA =====

const tabItems = [
  { id: 'vacancies', label: 'Вакансии', icon: Briefcase },
  { id: 'search', label: 'Поиск', icon: Search },
  { id: 'responses', label: 'Отклики', icon: Send },
  { id: 'profile', label: 'Профиль', icon: User },
];

const vacancies = [
  { id: 0, title: 'Senior DevOps Engineer', company: 'Selectel', salary: '250 000 – 350 000 ₽', location: 'Москва', remote: false, hot: true, logo: '🟦', skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform', 'AWS'], posted: '2 часа назад', experience: '3–6 лет', type: 'Полная занятость', description: 'Ищем опытного DevOps-инженера для построения и поддержки CI/CD пайплайнов, управления инфраструктурой в Kubernetes и автоматизации процессов деплоя.' },
  { id: 1, title: 'SRE Engineer', company: 'Яндекс Облако', salary: '300 000 – 400 000 ₽', location: 'Удалённо', remote: true, hot: false, logo: '🟨', skills: ['SRE', 'Prometheus', 'Go', 'Linux'], posted: '5 часов назад', experience: '3–6 лет', type: 'Полная занятость', description: 'Команда Яндекс Облака ищет SRE-инженера для обеспечения надёжности и масштабируемости облачных сервисов.' },
  { id: 2, title: 'Network Engineer', company: 'DataLine', salary: '180 000 – 250 000 ₽', location: 'Москва', remote: false, hot: true, logo: '🟩', skills: ['Cisco', 'Juniper', 'BGP', 'MPLS'], posted: '1 день назад', experience: '1–3 года', type: 'Полная занятость', description: 'Приглашаем сетевого инженера для проектирования и обслуживания сетевой инфраструктуры дата-центров.' },
  { id: 3, title: 'Linux System Administrator', company: 'Ростелеком', salary: '150 000 – 200 000 ₽', location: 'Санкт-Петербург', remote: false, hot: false, logo: '🟪', skills: ['Linux', 'Ansible', 'Bash', 'Nginx'], posted: '2 дня назад', experience: '1–3 года', type: 'Полная занятость', description: 'Администрирование серверной инфраструктуры на базе Linux, автоматизация рутинных задач.' },
  { id: 4, title: 'Cloud Architect', company: 'VK Cloud', salary: '400 000 – 550 000 ₽', location: 'Удалённо', remote: true, hot: true, logo: '🟧', skills: ['AWS', 'GCP', 'Terraform', 'Microservices'], posted: '3 часа назад', experience: '6+ лет', type: 'Полная занятость', description: 'Проектирование облачной архитектуры для высоконагруженных систем, менторство команды.' },
  { id: 5, title: 'Security Engineer', company: 'Positive Technologies', salary: '280 000 – 380 000 ₽', location: 'Москва', remote: false, hot: false, logo: '🟥', skills: ['SIEM', 'Penetration Testing', 'SOC'], posted: '1 день назад', experience: '3–6 лет', type: 'Полная занятость', description: 'Обеспечение информационной безопасности инфраструктуры, проведение аудитов и пентестов.' },
];

const responses = [
  { vacancy: 'Senior DevOps Engineer', company: 'Selectel', status: 'viewed' as const, date: '2 мар' },
  { vacancy: 'Cloud Architect', company: 'VK Cloud', status: 'invited' as const, date: '1 мар' },
  { vacancy: 'SRE Engineer', company: 'Яндекс Облако', status: 'pending' as const, date: '28 фев' },
  { vacancy: 'Platform Engineer', company: 'Ozon', status: 'rejected' as const, date: '25 фев' },
  { vacancy: 'Network Engineer', company: 'DataLine', status: 'viewed' as const, date: '24 фев' },
];

const statusConfig = {
  pending: { label: 'Отправлено', color: 'text-muted-foreground', bg: 'bg-muted', icon: Clock },
  viewed: { label: 'Просмотрено', color: 'text-primary', bg: 'bg-primary/10', icon: Eye },
  invited: { label: 'Приглашение', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Check },
  rejected: { label: 'Отказ', color: 'text-destructive', bg: 'bg-destructive/10', icon: X },
};

// ===== SCREENS =====

const IOSHeader = ({ title, left, right, large = false }: { title: string; left?: React.ReactNode; right?: React.ReactNode; large?: boolean }) => (
  <div className="bg-background/95 backdrop-blur-xl sticky top-0 z-40">
    <div className="h-[50px]" /> {/* Status bar space + dynamic island */}
    <div className="flex items-center justify-between px-4 h-11">
      <div className="w-20 flex justify-start">{left}</div>
      {!large && <h1 className="text-[17px] font-semibold text-foreground">{title}</h1>}
      <div className="w-20 flex justify-end">{right}</div>
    </div>
    {large && (
      <div className="px-4 pb-2">
        <h1 className="text-[34px] font-bold text-foreground tracking-tight leading-tight">{title}</h1>
      </div>
    )}
  </div>
);

const VacanciesTab = ({ onOpenVacancy, savedVacancies, onToggleSave, onOpenNotifications }: { 
  onOpenVacancy: (id: number) => void; 
  savedVacancies: Set<number>;
  onToggleSave: (id: number) => void;
  onOpenNotifications: () => void;
}) => (
  <div className="flex-1 overflow-y-auto">
    <IOSHeader 
      title="Вакансии" 
      large
      right={
        <button onClick={onOpenNotifications} className="relative p-1">
          <Bell className="w-[22px] h-[22px] text-primary" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>
      }
    />

    {/* Chips */}
    <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
      {['Все', 'DevOps', 'SRE', 'Network', 'Security', 'Cloud'].map((c, i) => (
        <button key={c} className={`px-4 py-[7px] rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          {c}
        </button>
      ))}
    </div>

    {/* Cards */}
    <div className="px-4 space-y-3 pb-6">
      {vacancies.map(v => (
        <button key={v.id} onClick={() => onOpenVacancy(v.id)} className="w-full text-left p-4 rounded-2xl border border-border bg-card active:bg-muted transition-colors">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">{v.logo}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[15px] font-semibold text-foreground truncate">{v.title}</span>
                {v.hot && <Zap className="w-3.5 h-3.5 text-primary shrink-0" />}
              </div>
              <p className="text-[13px] text-muted-foreground">{v.company}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onToggleSave(v.id); }} className="p-1 shrink-0">
              {savedVacancies.has(v.id) ? (
                <Bookmark className="w-5 h-5 text-primary fill-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-foreground/40" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2.5 ml-14">
            <span className="text-[14px] font-semibold text-primary">{v.salary}</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 ml-14">
            <span className="text-[12px] text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{v.location}</span>
            <span className="text-[12px] text-muted-foreground">·</span>
            <span className="text-[12px] text-muted-foreground">{v.posted}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5 ml-14">
            {v.skills.slice(0, 3).map(s => (
              <span key={s} className="text-[11px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-md">{s}</span>
            ))}
            {v.skills.length > 3 && <span className="text-[11px] text-muted-foreground">+{v.skills.length - 3}</span>}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const SearchTab = ({ onOpenVacancy }: { onOpenVacancy: (id: number) => void }) => {
  const [query, setQuery] = useState('');
  const filtered = vacancies.filter(v => 
    !query || v.title.toLowerCase().includes(query.toLowerCase()) || v.company.toLowerCase().includes(query.toLowerCase()) || v.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <IOSHeader title="Поиск" large />

      {/* Search bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
          <Search className="w-[18px] h-[18px] text-muted-foreground shrink-0" />
          <input 
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Должность, компания, навык..." 
            className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && <button onClick={() => setQuery('')}><X className="w-4 h-4 text-muted-foreground" /></button>}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { label: 'Зарплата', icon: DollarSign },
          { label: 'Локация', icon: MapPin },
          { label: 'Опыт', icon: TrendingUp },
          { label: 'Удалённо', icon: Globe },
        ].map(f => (
          <button key={f.label} className="flex items-center gap-1.5 px-3 py-[7px] rounded-full border border-border text-[13px] font-medium text-foreground whitespace-nowrap">
            <f.icon className="w-3.5 h-3.5" />
            {f.label}
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-4">
        <p className="text-[13px] text-muted-foreground mb-3">{filtered.length} вакансий найдено</p>
        <div className="space-y-2 pb-6">
          {filtered.map(v => (
            <button key={v.id} onClick={() => onOpenVacancy(v.id)} className="w-full text-left p-3.5 rounded-xl border border-border bg-card active:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg shrink-0">{v.logo}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-foreground truncate">{v.title}</p>
                  <p className="text-[12px] text-muted-foreground">{v.company} · {v.location}</p>
                </div>
                <span className="text-[13px] font-semibold text-primary shrink-0 whitespace-nowrap">{v.salary.split(' – ')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResponsesTab = ({ onOpenVacancy }: { onOpenVacancy: (id: number) => void }) => (
  <div className="flex-1 overflow-y-auto">
    <IOSHeader title="Отклики" large />
    
    {/* Stats */}
    <div className="px-4 pb-4 grid grid-cols-4 gap-2">
      {[
        { n: '5', label: 'Всего', color: 'bg-muted text-foreground' },
        { n: '2', label: 'Просмотр.', color: 'bg-primary/10 text-primary' },
        { n: '1', label: 'Приглаш.', color: 'bg-emerald-50 text-emerald-600' },
        { n: '1', label: 'Ожидание', color: 'bg-muted text-muted-foreground' },
      ].map(s => (
        <div key={s.label} className={`rounded-xl p-2.5 text-center ${s.color}`}>
          <p className="text-[20px] font-bold">{s.n}</p>
          <p className="text-[10px] font-medium mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    {/* List */}
    <div className="px-4 space-y-2 pb-6">
      {responses.map((r, i) => {
        const cfg = statusConfig[r.status];
        return (
          <button key={i} className="w-full text-left p-4 rounded-xl border border-border bg-card active:bg-muted transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-foreground truncate">{r.vacancy}</p>
                <p className="text-[13px] text-muted-foreground mt-0.5">{r.company}</p>
              </div>
              <span className="text-[11px] text-muted-foreground shrink-0 ml-3">{r.date}</span>
            </div>
            <div className="mt-2.5">
              <span className={`inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                <cfg.icon className="w-3 h-3" />
                {cfg.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const ProfileTab = ({ onOpenSettings }: { onOpenSettings: () => void }) => (
  <div className="flex-1 overflow-y-auto">
    <IOSHeader 
      title="Профиль" 
      right={<button onClick={onOpenSettings}><Settings className="w-[22px] h-[22px] text-primary" /></button>}
    />

    {/* Avatar */}
    <div className="flex flex-col items-center pt-4 pb-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <span className="text-3xl">👨‍💻</span>
      </div>
      <h2 className="text-[20px] font-bold text-foreground">Алексей Петров</h2>
      <p className="text-[14px] text-muted-foreground mt-0.5">DevOps / SRE Engineer</p>
      <div className="flex items-center gap-1 mt-1">
        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[13px] text-muted-foreground">Москва</span>
      </div>
    </div>

    {/* Stats */}
    <div className="px-4 pb-6 grid grid-cols-3 gap-3">
      {[
        { n: '2', label: 'Резюме' },
        { n: '8', label: 'Откликов' },
        { n: '3', label: 'Приглашений' },
      ].map(s => (
        <div key={s.label} className="bg-muted rounded-xl p-3 text-center">
          <p className="text-[22px] font-bold text-foreground">{s.n}</p>
          <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Menu */}
    <div className="px-4 pb-6">
      <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
        {[
          { icon: FileText, label: 'Мои резюме', badge: '2' },
          { icon: Bookmark, label: 'Избранное', badge: '4' },
          { icon: Bell, label: 'Уведомления', badge: '3' },
          { icon: BadgeCheck, label: 'Подтверждение профиля' },
          { icon: Star, label: 'Оценить приложение' },
        ].map(item => (
          <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-muted transition-colors">
            <item.icon className="w-[20px] h-[20px] text-primary" />
            <span className="flex-1 text-left text-[15px] text-foreground">{item.label}</span>
            {item.badge && (
              <span className="bg-primary/10 text-primary text-[12px] font-semibold px-2 py-0.5 rounded-full">{item.badge}</span>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

const VacancyDetailScreen = ({ vacancy, onBack, isSaved, onToggleSave }: { 
  vacancy: typeof vacancies[0]; onBack: () => void; isSaved: boolean; onToggleSave: () => void 
}) => (
  <div className="flex-1 overflow-y-auto">
    <IOSHeader 
      title={vacancy.company}
      left={<button onClick={onBack} className="flex items-center gap-0.5 text-primary text-[17px]"><ChevronLeft className="w-5 h-5" />Назад</button>}
      right={
        <div className="flex items-center gap-3">
          <button onClick={onToggleSave}>
            {isSaved ? <Bookmark className="w-[22px] h-[22px] text-primary fill-primary" /> : <Bookmark className="w-[22px] h-[22px] text-primary" />}
          </button>
          <Share2 className="w-[20px] h-[20px] text-primary" />
        </div>
      }
    />

    <div className="px-4 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-2xl">{vacancy.logo}</div>
        <div>
          <h2 className="text-[20px] font-bold text-foreground leading-tight">{vacancy.title}</h2>
          <p className="text-[14px] text-muted-foreground mt-0.5">{vacancy.company}</p>
        </div>
      </div>

      {/* Salary */}
      <div className="bg-primary/5 rounded-2xl p-4 mb-4">
        <p className="text-[22px] font-bold text-primary">{vacancy.salary}</p>
        <p className="text-[13px] text-muted-foreground mt-1">до вычета налогов</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {[
          { icon: MapPin, label: vacancy.location },
          { icon: Briefcase, label: vacancy.experience },
          { icon: Clock, label: vacancy.type },
          { icon: Calendar, label: vacancy.posted },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-[13px] text-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-foreground mb-2.5">Навыки</h3>
        <div className="flex flex-wrap gap-2">
          {vacancy.skills.map(s => (
            <span key={s} className="text-[13px] font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-lg">{s}</span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-foreground mb-2.5">Описание</h3>
        <p className="text-[14px] text-muted-foreground leading-relaxed">{vacancy.description}</p>
      </div>

      {/* CTA */}
      <button className="w-full bg-primary text-primary-foreground rounded-2xl py-4 text-[17px] font-semibold active:bg-primary/90 transition-colors">
        Откликнуться
      </button>
    </div>
  </div>
);

const NotificationsScreen = ({ onBack }: { onBack: () => void }) => {
  const notifications = [
    { title: 'Ваше резюме просмотрено', desc: 'Selectel просмотрели ваше резюме DevOps Engineer', time: '10 мин', unread: true },
    { title: 'Приглашение на собеседование', desc: 'VK Cloud приглашает вас на собеседование на позицию Cloud Architect', time: '2 ч', unread: true },
    { title: 'Новые вакансии', desc: '5 новых вакансий по вашим критериям поиска', time: '5 ч', unread: true },
    { title: 'Отклик просмотрен', desc: 'DataLine просмотрели ваш отклик на Network Engineer', time: '1 д', unread: false },
    { title: 'Обновите резюме', desc: 'Ваше резюме не обновлялось более 30 дней', time: '3 д', unread: false },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <IOSHeader 
        title="Уведомления" 
        left={<button onClick={onBack} className="flex items-center gap-0.5 text-primary text-[17px]"><ChevronLeft className="w-5 h-5" />Назад</button>}
      />
      <div className="px-4 space-y-1 pb-6">
        {notifications.map((n, i) => (
          <div key={i} className={`p-4 rounded-xl transition-colors ${n.unread ? 'bg-primary/5' : ''}`}>
            <div className="flex items-start gap-3">
              {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
              <div className={!n.unread ? 'ml-5' : ''}>
                <p className="text-[14px] font-semibold text-foreground">{n.title}</p>
                <p className="text-[13px] text-muted-foreground mt-0.5 leading-snug">{n.desc}</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1.5">{n.time} назад</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="flex-1 overflow-y-auto">
    <IOSHeader 
      title="Настройки"
      left={<button onClick={onBack} className="flex items-center gap-0.5 text-primary text-[17px]"><ChevronLeft className="w-5 h-5" />Назад</button>}
    />
    <div className="px-4 pb-6 space-y-4">
      {[
        { title: 'Аккаунт', items: ['Изменить имя', 'Email', 'Телефон'] },
        { title: 'Уведомления', items: ['Push-уведомления', 'Email-рассылка', 'Новые вакансии'] },
        { title: 'Приватность', items: ['Видимость резюме', 'Чёрный список компаний'] },
        { title: 'О приложении', items: ['Версия 1.0.0', 'Политика конфиденциальности', 'Условия использования'] },
      ].map(section => (
        <div key={section.title}>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</p>
          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {section.items.map(item => (
              <button key={item} className="w-full flex items-center justify-between px-4 py-3.5 active:bg-muted transition-colors">
                <span className="text-[15px] text-foreground">{item}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AppsPage;
