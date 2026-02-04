import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Star, MapPin, Clock, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceSpecialistsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const categories = [
    'Все категории',
    'DevOps инженеры',
    'Техподдержка',
    'DBA специалисты',
    'Cloud архитекторы',
    'Мониторинг',
    'Администраторы',
  ];

  const specialists = [
    {
      id: 1,
      name: 'Александр Козлов',
      role: 'Senior DevOps Engineer',
      rating: 4.9,
      reviews: 47,
      rate: 'от 3 500 ₽/час',
      location: 'Москва',
      experience: '8 лет опыта',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Ansible', 'CI/CD'],
      available: true,
      verified: true,
      description: 'Специализируюсь на построении и оптимизации CI/CD пайплайнов, контейнеризации приложений и управлении облачной инфраструктурой.',
    },
    {
      id: 2,
      name: 'Мария Соколова',
      role: 'Cloud Architect',
      rating: 5.0,
      reviews: 32,
      rate: 'от 4 000 ₽/час',
      location: 'Санкт-Петербург',
      experience: '10 лет опыта',
      skills: ['GCP', 'Azure', 'AWS', 'Terraform', 'Kubernetes'],
      available: true,
      verified: true,
      description: 'Проектирование и миграция инфраструктуры в облако. Оптимизация затрат на облачные ресурсы.',
    },
    {
      id: 3,
      name: 'Дмитрий Волков',
      role: 'DBA PostgreSQL / MySQL',
      rating: 4.8,
      reviews: 28,
      rate: 'от 2 800 ₽/час',
      location: 'Новосибирск',
      experience: '6 лет опыта',
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'Репликация', 'Оптимизация'],
      available: false,
      verified: true,
      description: 'Администрирование и оптимизация баз данных. Настройка репликации, бэкапов, мониторинга.',
    },
    {
      id: 4,
      name: 'Елена Петрова',
      role: 'Техподдержка L3',
      rating: 4.9,
      reviews: 56,
      rate: 'от 2 000 ₽/час',
      location: 'Казань',
      experience: '5 лет опыта',
      skills: ['Linux', 'Windows Server', 'Сети', 'Troubleshooting', 'cPanel', 'Plesk'],
      available: true,
      verified: false,
      description: 'Техническая поддержка хостинг-клиентов. Решение сложных проблем с серверами и сетями.',
    },
    {
      id: 5,
      name: 'Иван Новиков',
      role: 'Системный администратор',
      rating: 4.7,
      reviews: 41,
      rate: 'от 2 200 ₽/час',
      location: 'Екатеринбург',
      experience: '7 лет опыта',
      skills: ['Linux', 'Nginx', 'Apache', 'MySQL', 'Безопасность', 'Мониторинг'],
      available: true,
      verified: true,
      description: 'Администрирование Linux-серверов, настройка веб-серверов, обеспечение безопасности.',
    },
    {
      id: 6,
      name: 'Анна Михайлова',
      role: 'DevOps Engineer',
      rating: 4.6,
      reviews: 19,
      rate: 'от 2 500 ₽/час',
      location: 'Москва',
      experience: '4 года опыта',
      skills: ['Docker', 'GitLab CI', 'Jenkins', 'Python', 'Bash'],
      available: true,
      verified: false,
      description: 'Автоматизация процессов разработки и деплоя. Написание скриптов и пайплайнов.',
    },
    {
      id: 7,
      name: 'Сергей Федоров',
      role: 'Мониторинг и алертинг',
      rating: 4.8,
      reviews: 23,
      rate: 'от 2 300 ₽/час',
      location: 'Самара',
      experience: '5 лет опыта',
      skills: ['Prometheus', 'Grafana', 'Zabbix', 'ELK Stack', 'Alertmanager'],
      available: false,
      verified: true,
      description: 'Настройка систем мониторинга и алертинга. Создание дашбордов, оптимизация метрик.',
    },
    {
      id: 8,
      name: 'Ольга Кузнецова',
      role: 'Cloud Engineer',
      rating: 4.9,
      reviews: 35,
      rate: 'от 3 200 ₽/час',
      location: 'Санкт-Петербург',
      experience: '6 лет опыта',
      skills: ['AWS', 'Terraform', 'CloudFormation', 'Lambda', 'S3'],
      available: true,
      verified: true,
      description: 'Разработка и поддержка облачной инфраструктуры на AWS. Infrastructure as Code.',
    },
  ];

  const filteredSpecialists = specialists.filter(s => {
    if (onlyAvailable && !s.available) return false;
    if (selectedCategory && selectedCategory !== 'Все категории') {
      // Simple matching logic
      const categoryLower = selectedCategory.toLowerCase();
      const roleLower = s.role.toLowerCase();
      if (categoryLower.includes('devops') && !roleLower.includes('devops')) return false;
      if (categoryLower.includes('техподдержка') && !roleLower.includes('техподдержка')) return false;
      if (categoryLower.includes('dba') && !roleLower.includes('dba')) return false;
      if (categoryLower.includes('cloud') && !roleLower.includes('cloud')) return false;
      if (categoryLower.includes('мониторинг') && !roleLower.includes('мониторинг')) return false;
      if (categoryLower.includes('администратор') && !roleLower.includes('администратор')) return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(query) || 
             s.role.toLowerCase().includes(query) ||
             s.skills.some(skill => skill.toLowerCase().includes(query));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/freelance" className="hover:text-foreground">IT-фриланс</Link>
          <span>/</span>
          <span className="text-foreground">Специалисты</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Sticky */}
          <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-28">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground">Фильтры</h3>
                    <button 
                      className="lg:hidden text-muted-foreground hover:text-foreground"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">Категория</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все категории" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={onlyAvailable} 
                        onCheckedChange={(checked) => setOnlyAvailable(checked as boolean)}
                      />
                      <span className="text-sm text-foreground">Только доступные</span>
                    </label>
                  </div>

                  {/* Rate Range */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">Ставка (₽/час)</label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="От" type="number" className="w-full" />
                      <span className="text-muted-foreground">—</span>
                      <Input placeholder="До" type="number" className="w-full" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">Город</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой город" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой город</SelectItem>
                        <SelectItem value="moscow">Москва</SelectItem>
                        <SelectItem value="spb">Санкт-Петербург</SelectItem>
                        <SelectItem value="nsk">Новосибирск</SelectItem>
                        <SelectItem value="ekb">Екатеринбург</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Навыки</label>
                    <div className="flex flex-wrap gap-2">
                      {['Kubernetes', 'Docker', 'AWS', 'Linux', 'PostgreSQL'].map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, роли или навыкам..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="lg:hidden gap-2"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Фильтры
                </Button>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="reviews">По отзывам</SelectItem>
                    <SelectItem value="rate-low">Ставка: по возрастанию</SelectItem>
                    <SelectItem value="rate-high">Ставка: по убыванию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground mb-4">
              Найдено {filteredSpecialists.length} специалистов
            </div>

            {/* Specialists List */}
            <div className="divide-y divide-border rounded-xl border border-border overflow-hidden bg-card">
              {filteredSpecialists.map((specialist) => (
                <Link key={specialist.id} to={`/freelance/specialist/${specialist.id}`}>
                  <div className="p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {specialist.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground">{specialist.name}</h3>
                          {specialist.verified && (
                            <Badge variant="secondary" className="text-xs">Проверен</Badge>
                          )}
                          {specialist.available ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Доступен
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                              Занят
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{specialist.role}</p>
                        <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{specialist.description}</p>
                        
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium text-foreground">{specialist.rating}</span>
                            <span>({specialist.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {specialist.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {specialist.experience}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {specialist.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Rate */}
                      <div className="md:text-right flex-shrink-0">
                        <div className="text-lg font-semibold text-blue-500">{specialist.rate}</div>
                        <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600">
                          Связаться
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceSpecialistsPage;
