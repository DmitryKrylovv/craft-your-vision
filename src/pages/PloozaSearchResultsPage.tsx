import { useState } from 'react';
import { Search, Globe, Clock, ChevronDown, ImageIcon, Video, Newspaper, MapPin, ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import ploozaLogo from '@/assets/plooza-logo.svg';

const searchTabs = [
  { icon: Globe, label: 'Все', id: 'all' },
  { icon: Newspaper, label: 'Новости', id: 'news' },
  { icon: ImageIcon, label: 'Картинки', id: 'images' },
  { icon: Video, label: 'Видео', id: 'video' },
  { icon: MapPin, label: 'Карты', id: 'maps' },
];

const generateResults = (query: string) => [
  {
    title: `${query} — подробный обзор и сравнение`,
    url: 'https://example.com/review',
    domain: 'example.com',
    snippet: `Полный обзор по запросу «${query}». Сравнение лучших вариантов, актуальные цены, рейтинги пользователей и экспертные мнения на 2026 год.`,
    date: '2 часа назад',
    rating: 4.8,
  },
  {
    title: `${query} — Википедия`,
    url: 'https://ru.wikipedia.org/wiki/article',
    domain: 'ru.wikipedia.org',
    snippet: `${query} — статья из свободной энциклопедии. Определение, история, основные характеристики и ключевые факты.`,
    date: null,
    rating: null,
  },
  {
    title: `Лучшие результаты по «${query}» в 2026 году`,
    url: 'https://top-review.ru/best',
    domain: 'top-review.ru',
    snippet: `ТОП-10 результатов по запросу «${query}». Обновлённый рейтинг марта 2026 года с подробными описаниями, плюсами и минусами.`,
    date: '5 часов назад',
    rating: 4.5,
  },
  {
    title: `${query}: последние новости и события`,
    url: 'https://news-portal.ru/article',
    domain: 'news-portal.ru',
    snippet: `Актуальные новости по теме «${query}». Последние обновления, аналитика, мнения экспертов и прогнозы.`,
    date: 'Вчера',
    rating: null,
  },
  {
    title: `Как выбрать ${query.toLowerCase()} — гид для начинающих`,
    url: 'https://guide-hub.ru/how-to',
    domain: 'guide-hub.ru',
    snippet: `Подробный гид по выбору. Пошаговая инструкция, на что обратить внимание, типичные ошибки и рекомендации от профессионалов.`,
    date: '3 дня назад',
    rating: 4.2,
  },
  {
    title: `${query} — форум обсуждений`,
    url: 'https://forum.discuss.ru/thread',
    domain: 'forum.discuss.ru',
    snippet: `Обсуждение «${query}» на крупнейшем русскоязычном форуме. 847 сообщений, 12 456 просмотров. Реальные отзывы пользователей.`,
    date: '1 неделю назад',
    rating: null,
  },
  {
    title: `Купить ${query.toLowerCase()} по лучшей цене — каталог`,
    url: 'https://market-place.ru/catalog',
    domain: 'market-place.ru',
    snippet: `Каталог товаров и услуг. Сравните цены от 150+ продавцов. Бесплатная доставка, гарантия возврата, рассрочка 0%.`,
    date: null,
    rating: 4.6,
  },
  {
    title: `${query} — видеообзор на YouTube`,
    url: 'https://youtube.com/watch',
    domain: 'youtube.com',
    snippet: `Подробный видеообзор по теме «${query}». Продолжительность: 15:42. 234K просмотров. Автор: ТехноГуру.`,
    date: '2 дня назад',
    rating: null,
  },
];

const relatedSearches = (query: string) => [
  `${query} отзывы`,
  `${query} цена`,
  `${query} сравнение`,
  `${query} альтернативы`,
  `лучший ${query.toLowerCase()} 2026`,
  `${query} для начинающих`,
];

const PloozaSearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [query, setQuery] = useState(q);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const results = generateResults(q);
  const related = relatedSearches(q);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/plooza-search/results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Search Header */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 h-16">
            <Link to="/plooza-search" className="flex-shrink-0 flex items-center gap-1.5">
              <img src={ploozaLogo} alt="Plooza" className="h-7" />
            </Link>

            <div className="flex-1 max-w-2xl relative">
              <div className="relative flex items-center bg-background border border-border rounded-xl hover:border-primary/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full h-10 pl-10 pr-20 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none rounded-xl"
                  placeholder="Поиск..."
                />
                <Button
                  size="sm"
                  onClick={handleSearch}
                  className="absolute right-1.5 rounded-lg h-7 px-3 text-xs"
                >
                  Найти
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px overflow-x-auto scrollbar-hide">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Results */}
          <div>
            <p className="text-xs text-muted-foreground mb-5">
              Найдено примерно 1 240 000 результатов ({(Math.random() * 0.5 + 0.1).toFixed(2)} сек.)
            </p>

            <div className="space-y-6">
              {results.map((result, i) => (
                <article key={i} className="group">
                  {/* URL breadcrumb */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground truncate">{result.domain}</span>
                    {result.rating && (
                      <span className="flex items-center gap-0.5 text-[10px] text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {result.rating}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <a
                    href={result.url}
                    className="text-base sm:text-lg font-semibold text-primary hover:underline underline-offset-2 decoration-primary/40 leading-snug block mb-1"
                  >
                    {result.title}
                    <ExternalLink className="w-3 h-3 inline-block ml-1.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>

                  {/* Snippet */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.date && (
                      <span className="text-xs text-foreground/50 mr-1.5">{result.date} —</span>
                    )}
                    {result.snippet}
                  </p>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-border">
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === 1
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="px-3 h-9 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                Далее →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-5">
            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-2">{q}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Информация по вашему запросу собрана из различных источников интернета. Plooza Поиск помогает находить самую актуальную и достоверную информацию.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                Обновлено только что
              </div>
            </div>

            {/* Related Searches */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Похожие запросы</h3>
              <div className="space-y-1.5">
                {related.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); navigate(`/plooza-search/results?q=${encodeURIComponent(term)}`); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <Search className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <a href="/about" className="hover:text-foreground transition-colors">О нас</a>
          <span className="text-border">•</span>
          <a href="/help" className="hover:text-foreground transition-colors">Помощь</a>
          <span className="text-border">•</span>
          <Link to="/plooza-search" className="hover:text-foreground transition-colors">Plooza Поиск</Link>
          <span className="text-border">•</span>
          <span>© 2026 Plooza</span>
        </div>
      </footer>
    </div>
  );
};

export default PloozaSearchResultsPage;
