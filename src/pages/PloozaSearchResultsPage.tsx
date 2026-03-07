import { useState } from 'react';
import { Search, Globe, Clock, ImageIcon, Video, Newspaper, MapPin, ExternalLink, Star, Play, Eye, ThumbsUp, ArrowRight, Languages, ArrowLeftRight, Copy, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import ploozaLogo from '@/assets/plooza-logo.svg';

const searchTabs = [
  { icon: Globe, label: 'Все', id: 'all' },
  { icon: Newspaper, label: 'Новости', id: 'news' },
  { icon: ImageIcon, label: 'Картинки', id: 'images' },
  { icon: Video, label: 'Видео', id: 'video' },
  { icon: MapPin, label: 'Карты', id: 'maps' },
  { icon: Languages, label: 'Переводчик', id: 'translate' },
];

// ── Data generators ──

const generateResults = (query: string) => [
  { title: `${query} — подробный обзор и сравнение`, url: 'https://example.com/review', domain: 'example.com', snippet: `Полный обзор по запросу «${query}». Сравнение лучших вариантов, актуальные цены и экспертные мнения на 2026 год.`, date: '2 часа назад', rating: 4.8 },
  { title: `${query} — Википедия`, url: 'https://ru.wikipedia.org/wiki/article', domain: 'ru.wikipedia.org', snippet: `${query} — статья из свободной энциклопедии. Определение, история и ключевые факты.`, date: null, rating: null },
  { title: `Лучшие результаты по «${query}» в 2026 году`, url: 'https://top-review.ru/best', domain: 'top-review.ru', snippet: `ТОП-10 результатов по запросу «${query}». Обновлённый рейтинг марта 2026 года.`, date: '5 часов назад', rating: 4.5 },
  { title: `${query}: последние новости и события`, url: 'https://news-portal.ru/article', domain: 'news-portal.ru', snippet: `Актуальные новости по теме «${query}». Аналитика, мнения экспертов и прогнозы.`, date: 'Вчера', rating: null },
  { title: `Как выбрать ${query.toLowerCase()} — гид для начинающих`, url: 'https://guide-hub.ru/how-to', domain: 'guide-hub.ru', snippet: `Подробный гид по выбору. Пошаговая инструкция и рекомендации от профессионалов.`, date: '3 дня назад', rating: 4.2 },
  { title: `${query} — форум обсуждений`, url: 'https://forum.discuss.ru/thread', domain: 'forum.discuss.ru', snippet: `Обсуждение «${query}» на крупнейшем русскоязычном форуме. 847 сообщений, 12 456 просмотров.`, date: '1 неделю назад', rating: null },
  { title: `Купить ${query.toLowerCase()} по лучшей цене`, url: 'https://market-place.ru/catalog', domain: 'market-place.ru', snippet: `Каталог товаров и услуг. Сравните цены от 150+ продавцов. Бесплатная доставка.`, date: null, rating: 4.6 },
  { title: `${query} — видеообзор на YouTube`, url: 'https://youtube.com/watch', domain: 'youtube.com', snippet: `Подробный видеообзор. 15:42. 234K просмотров. Автор: ТехноГуру.`, date: '2 дня назад', rating: null },
];

const generateNews = (query: string) => [
  { title: `${query}: главные события за сегодня`, source: 'РИА Новости', time: '32 мин назад', category: 'Главное', image: `https://picsum.photos/seed/${query}1/400/220` },
  { title: `Эксперты прокомментировали ситуацию с «${query}»`, source: 'Коммерсантъ', time: '1 час назад', category: 'Аналитика', image: `https://picsum.photos/seed/${query}2/400/220` },
  { title: `Новые данные по теме «${query}» опубликованы`, source: 'ТАСС', time: '2 часа назад', category: 'Наука', image: `https://picsum.photos/seed/${query}3/400/220` },
  { title: `${query} — что изменилось за последнюю неделю`, source: 'Ведомости', time: '3 часа назад', category: 'Обзор', image: `https://picsum.photos/seed/${query}4/400/220` },
  { title: `Мировые СМИ обсуждают ${query.toLowerCase()}`, source: 'Интерфакс', time: '5 часов назад', category: 'Мир', image: `https://picsum.photos/seed/${query}5/400/220` },
  { title: `«${query}» стал главным трендом дня`, source: 'Лента.ру', time: '6 часов назад', category: 'Тренды', image: `https://picsum.photos/seed/${query}6/400/220` },
];

const generateImages = (query: string) => Array.from({ length: 12 }, (_, i) => ({
  url: `https://picsum.photos/seed/${query}img${i}/${300 + (i % 3) * 50}/${250 + (i % 4) * 40}`,
  title: `${query} — изображение ${i + 1}`,
  source: ['pinterest.com', 'unsplash.com', 'flickr.com', 'shutterstock.com'][i % 4],
  size: `${1200 + i * 100} × ${800 + i * 50}`,
}));

const generateVideos = (query: string) => [
  { title: `${query} — полный обзор 2026`, channel: 'ТехноГуру', views: '1.2M', duration: '15:42', time: '2 дня назад', thumbnail: `https://picsum.photos/seed/${query}v1/480/270` },
  { title: `Всё что нужно знать о ${query.toLowerCase()}`, channel: 'Наука и Факты', views: '845K', duration: '22:10', time: '1 неделю назад', thumbnail: `https://picsum.photos/seed/${query}v2/480/270` },
  { title: `${query} для начинающих — пошаговое руководство`, channel: 'Простые Уроки', views: '432K', duration: '18:35', time: '3 дня назад', thumbnail: `https://picsum.photos/seed/${query}v3/480/270` },
  { title: `ТОП-10 фактов о ${query.toLowerCase()}`, channel: 'ФактоРум', views: '678K', duration: '11:20', time: '5 дней назад', thumbnail: `https://picsum.photos/seed/${query}v4/480/270` },
  { title: `${query} — мнение эксперта`, channel: 'Экспертный Взгляд', views: '256K', duration: '28:45', time: '1 день назад', thumbnail: `https://picsum.photos/seed/${query}v5/480/270` },
  { title: `Почему ${query.toLowerCase()} так популярен?`, channel: 'Тренды', views: '987K', duration: '9:15', time: '4 дня назад', thumbnail: `https://picsum.photos/seed/${query}v6/480/270` },
];

const relatedSearches = (query: string) => [
  `${query} отзывы`, `${query} цена`, `${query} сравнение`,
  `${query} альтернативы`, `лучший ${query.toLowerCase()} 2026`, `${query} для начинающих`,
];

// ── Tab Content Components ──

const AllResults = ({ q, results }: { q: string; results: ReturnType<typeof generateResults> }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-5">
      Найдено примерно 1 240 000 результатов (0.24 сек.)
    </p>
    <div className="space-y-6">
      {results.map((result, i) => (
        <article key={i} className="group">
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
          <a href={result.url} className="text-base sm:text-lg font-semibold text-primary hover:underline underline-offset-2 decoration-primary/40 leading-snug block mb-1">
            {result.title}
            <ExternalLink className="w-3 h-3 inline-block ml-1.5 opacity-0 group-hover:opacity-50 transition-opacity" />
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.date && <span className="text-xs text-foreground/50 mr-1.5">{result.date} —</span>}
            {result.snippet}
          </p>
        </article>
      ))}
    </div>
  </div>
);

const NewsResults = ({ q }: { q: string }) => {
  const news = generateNews(q);
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-5">Новости по запросу «{q}»</p>
      <div className="space-y-4">
        {news.map((item, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0 bg-muted overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">{item.category}</span>
                  <span className="text-[10px] text-muted-foreground">{item.time}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug hover:text-primary transition-colors cursor-pointer">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Newspaper className="w-3 h-3" />
                  {item.source}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ImageResults = ({ q }: { q: string }) => {
  const images = generateImages(q);
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-5">Картинки по запросу «{q}»</p>
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid group cursor-pointer">
            <div className="rounded-xl overflow-hidden bg-muted relative">
              <img src={img.url} alt={img.title} className="w-full block group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div>
                  <p className="text-xs font-medium text-white truncate">{img.title}</p>
                  <p className="text-[10px] text-white/70">{img.source} • {img.size}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoResults = ({ q }: { q: string }) => {
  const videos = generateVideos(q);
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-5">Видео по запросу «{q}»</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((vid, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative bg-muted aspect-video overflow-hidden">
              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-foreground/80 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Play className="w-5 h-5 text-background ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-[10px] font-mono px-1.5 py-0.5 rounded">
                {vid.duration}
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">{vid.title}</h3>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="font-medium">{vid.channel}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vid.views}</span>
                <span>{vid.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MapsResults = ({ q }: { q: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-5">Карты по запросу «{q}»</p>
    <Card className="overflow-hidden">
      <div className="relative bg-muted aspect-[16/9] sm:aspect-[2/1] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative text-center z-10">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground mb-1">Результаты на карте</p>
          <p className="text-xs text-muted-foreground mb-4">Найдено 24 места по запросу «{q}»</p>
          <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
            <MapPin className="w-3 h-3" />
            Открыть на карте
          </Button>
        </div>
      </div>
    </Card>
    {/* Place cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {[
        { name: `${q} — центр`, address: 'ул. Примерная, 12, Москва', dist: '1.2 км', rating: 4.7, reviews: 342 },
        { name: `${q} на Арбате`, address: 'Арбат, 24, Москва', dist: '2.8 км', rating: 4.3, reviews: 128 },
        { name: `${q} Сити`, address: 'Пресненская наб., 8, Москва', dist: '4.1 км', rating: 4.9, reviews: 567 },
        { name: `${q} Парк`, address: 'Парковая ул., 5, Москва', dist: '5.6 км', rating: 4.1, reviews: 89 },
      ].map((place, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-1">{place.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{place.address}</p>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {place.rating}
                <span className="text-muted-foreground">({place.reviews})</span>
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {place.dist}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const TranslateView = () => {
  const [sourceLang, setSourceLang] = useState('Английский');
  const [targetLang, setTargetLang] = useState('Русский');
  const [sourceText, setSourceText] = useState('Hello! How are you today? I hope everything is going well.');
  const [copied, setCopied] = useState(false);

  const translations: Record<string, string> = {
    'Hello! How are you today? I hope everything is going well.': 'Привет! Как дела сегодня? Надеюсь, всё хорошо.',
  };
  const translated = translations[sourceText] || 'Введите текст для перевода...';

  const swapLangs = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translated !== 'Введите текст для перевода...' ? translated : '');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-5">Plooza Переводчик</p>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Language selector */}
          <div className="flex items-center border-b border-border">
            <div className="flex-1 px-4 py-3">
              <span className="text-sm font-semibold text-primary">{sourceLang}</span>
            </div>
            <button onClick={swapLangs} className="p-2 hover:bg-muted rounded-lg transition-colors mx-1">
              <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex-1 px-4 py-3 text-right">
              <span className="text-sm font-semibold text-primary">{targetLang}</span>
            </div>
          </div>

          {/* Text areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Введите текст..."
                className="w-full h-40 p-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
              />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <span className="text-[10px] text-muted-foreground">{sourceText.length} символов</span>
              </div>
            </div>
            <div className="relative bg-secondary/30">
              <div className="w-full h-40 p-4 text-sm text-foreground overflow-auto">
                {translated}
              </div>
              <div className="absolute bottom-3 right-4 flex items-center gap-2">
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" onClick={handleCopy}>
                  {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language quick picks */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['Немецкий', 'Французский', 'Испанский', 'Китайский', 'Японский', 'Корейский', 'Арабский', 'Турецкий'].map((lang) => (
          <button
            key={lang}
            onClick={() => setTargetLang(lang)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${targetLang === lang ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Main Page ──

const PloozaSearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const tab = searchParams.get('tab') || 'all';
  const [query, setQuery] = useState(q);
  const [activeTab, setActiveTab] = useState(tab);
  const navigate = useNavigate();

  const results = generateResults(q);
  const related = relatedSearches(q);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/plooza-search/results?q=${encodeURIComponent(query)}&tab=${activeTab}`);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/plooza-search/results?q=${encodeURIComponent(q)}&tab=${tabId}`);
  };

  const showSidebar = activeTab === 'all' || activeTab === 'news';

  const renderContent = () => {
    switch (activeTab) {
      case 'news': return <NewsResults q={q} />;
      case 'images': return <ImageResults q={q} />;
      case 'video': return <VideoResults q={q} />;
      case 'maps': return <MapsResults q={q} />;
      case 'translate': return <TranslateView />;
      default: return <AllResults q={q} results={results} />;
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
                <Button size="sm" onClick={handleSearch} className="absolute right-1.5 rounded-lg h-7 px-3 text-xs">
                  Найти
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px overflow-x-auto scrollbar-hide">
            {searchTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <div className={showSidebar ? 'grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8' : ''}>
          <div>{renderContent()}</div>

          {/* Sidebar — only for all & news */}
          {showSidebar && (
            <aside className="hidden lg:block space-y-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-2">{q}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Информация по запросу собрана из различных источников. Plooza Поиск помогает находить актуальную и достоверную информацию.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Обновлено только что
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Похожие запросы</h3>
                <div className="space-y-1.5">
                  {related.map((term) => (
                    <button
                      key={term}
                      onClick={() => { setQuery(term); navigate(`/plooza-search/results?q=${encodeURIComponent(term)}&tab=${activeTab}`); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                    >
                      <Search className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Pagination — only for list views */}
        {(activeTab === 'all' || activeTab === 'news') && (
          <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-border">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="px-3 h-9 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              Далее →
            </button>
          </div>
        )}
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
