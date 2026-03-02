import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Briefcase, Clock, TrendingUp, Zap, Building2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface FreelanceSearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FreelanceSearch = ({ isOpen, onOpenChange }: FreelanceSearchProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpenChange]);

  const categories = [
    { id: 'devops', label: 'DevOps', count: 89 },
    { id: 'support', label: 'Техподдержка', count: 124 },
    { id: 'dba', label: 'DBA', count: 34 },
    { id: 'sysadmin', label: 'Сисадмин', count: 67 },
    { id: 'cloud', label: 'Cloud', count: 45 },
    { id: 'network', label: 'Сетевой инженер', count: 28 },
  ];

  const locations = [
    { id: 'moscow', label: 'Москва' },
    { id: 'spb', label: 'Санкт-Петербург' },
    { id: 'remote', label: 'Удалённо' },
    { id: 'any', label: 'Любой город' },
  ];

  const experienceLevels = [
    { id: 'junior', label: 'Junior (0–2 года)' },
    { id: 'middle', label: 'Middle (2–5 лет)' },
    { id: 'senior', label: 'Senior (5+ лет)' },
    { id: 'lead', label: 'Lead / Architect' },
  ];

  const recentSearches = [
    'DevOps Engineer удалённо',
    'Техподдержка L2 Москва',
    'PostgreSQL DBA',
  ];

  const trendingSearches = [
    { label: 'Kubernetes инженер', hot: true },
    { label: 'Cloud Architect AWS', hot: false },
    { label: 'SRE Engineer', hot: true },
    { label: 'Системный администратор Linux', hot: false },
  ];

  const instantResults = query.length >= 2 ? [
    { id: 1, title: 'Senior DevOps Engineer', company: 'Selectel', salary: '250 000 – 350 000 ₽', location: 'Москва', hot: true },
    { id: 2, title: 'DevOps / SRE Engineer', company: 'VK Cloud', salary: '200 000 – 300 000 ₽', location: 'Удалённо', hot: false },
    { id: 3, title: 'Junior DevOps', company: 'Timeweb', salary: '100 000 – 150 000 ₽', location: 'Санкт-Петербург', hot: false },
  ] : [];

  const clearAll = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedLocation(null);
    setSelectedExperience(null);
  };

  const hasFilters = selectedCategory || selectedLocation || selectedExperience || query;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in-0 duration-150 hidden md:block"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 md:inset-auto md:left-0 md:right-0 md:top-0 md:px-4 md:pt-24 animate-in fade-in-0 md:slide-in-from-top-4 duration-200">
        <div className="h-full md:h-auto md:container md:max-w-3xl md:mx-auto">
          <div
            className="h-full md:h-auto bg-background md:border md:border-border md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col md:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-3 sm:p-4 bg-muted/30 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Должность, навыки или компания..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-20 sm:pr-24 bg-background border border-border rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="hidden sm:inline-flex h-6 items-center px-1.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
                    ESC
                  </kbd>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Instant Results */}
              {instantResults.length > 0 && (
                <div className="p-4 border-b border-border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Вакансии
                  </div>
                  <div className="space-y-1">
                    {instantResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/freelance/vacancy/${result.id}`}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                          {result.company[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate text-sm">
                              {result.title}
                            </span>
                            {result.hot && (
                              <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{result.company}</span>
                            <span>•</span>
                            <span>{result.location}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary flex-shrink-0 hidden sm:block">
                          {result.salary}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="p-4 space-y-5">
                {/* Categories */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    Специализация
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-medium transition-all border",
                          selectedCategory === cat.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        {cat.label}
                        <span className={cn("ml-1.5", selectedCategory === cat.id ? "text-primary-foreground/70" : "text-muted-foreground")}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Город
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(selectedLocation === loc.id ? null : loc.id)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-medium transition-all border",
                          selectedLocation === loc.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2.5">
                    <DollarSign className="w-3.5 h-3.5 text-primary" />
                    Уровень
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experienceLevels.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-medium transition-all border",
                          selectedExperience === exp.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent & Trending (when no query) */}
                {!query && (
                  <div className="grid sm:grid-cols-2 gap-5 pt-2">
                    {/* Recent */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        Недавние запросы
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trending */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2.5">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        Популярные запросы
                      </div>
                      <div className="space-y-1">
                        {trendingSearches.map((s) => (
                          <button
                            key={s.label}
                            onClick={() => setQuery(s.label)}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                            {s.label}
                            {s.hot && <Zap className="w-3 h-3 text-orange-500 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 sm:p-4 border-t border-border bg-muted/30 flex items-center justify-between gap-3">
              <button
                onClick={clearAll}
                className={cn(
                  "text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors",
                  !hasFilters && "opacity-50 pointer-events-none"
                )}
              >
                Сбросить
              </button>
              <Button
                className="px-4 sm:px-6 rounded-xl text-sm"
                onClick={() => onOpenChange(false)}
              >
                <Search className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Найти вакансии</span>
                <span className="sm:hidden">Найти</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceSearch;
