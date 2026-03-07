import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Cloud, Sun, CloudRain, Wind, Droplets, ThermometerSun, Clock, Sparkles, Globe, Newspaper, ImageIcon, Video, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ploozaLogo from '@/assets/plooza-logo.svg';

const currencies = [
  { pair: 'USD/RUB', value: 88.45, change: +0.32, up: true },
  { pair: 'EUR/RUB', value: 96.12, change: -0.18, up: false },
  { pair: 'CNY/RUB', value: 12.24, change: +0.05, up: true },
  { pair: 'BTC/USD', value: 67842, change: +1.24, up: true },
  { pair: 'ETH/USD', value: 3891, change: -0.67, up: false },
  { pair: 'GBP/RUB', value: 112.38, change: +0.41, up: true },
];

const weatherData = {
  city: 'Москва',
  temp: 4,
  feelsLike: 1,
  condition: 'Облачно',
  humidity: 72,
  wind: 5.2,
  icon: Cloud,
  forecast: [
    { day: 'Сегодня', temp: 4, icon: Cloud },
    { day: 'Завтра', temp: 6, icon: Sun },
    { day: 'Пт', temp: 3, icon: CloudRain },
    { day: 'Сб', temp: 7, icon: Sun },
    { day: 'Вс', temp: 5, icon: Cloud },
  ],
};

const trendingSearches = [
  'Курс доллара сегодня',
  'Погода на выходные',
  'Новости технологий',
  'Рецепты быстрого ужина',
  'Фильмы 2026',
  'Авиабилеты дёшево',
];

const quickCategories = [
  { icon: Newspaper, label: 'Новости', query: 'новости сегодня' },
  { icon: ImageIcon, label: 'Картинки', query: 'картинки' },
  { icon: Video, label: 'Видео', query: 'видео' },
  { icon: MapPin, label: 'Карты', query: 'карты' },
  { icon: Globe, label: 'Переводчик', query: 'переводчик онлайн' },
];

const PloozaSearchPage = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/plooza-search/results?q=${encodeURIComponent(query)}`);
    }
  };

  const WeatherIcon = weatherData.icon;

  const greeting = () => {
    const h = time.getHours();
    if (h < 6) return 'Доброй ночи';
    if (h < 12) return 'Доброе утро';
    if (h < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Top bar with time */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3">
        <span className="text-xs text-muted-foreground">{greeting()}</span>
        <span className="text-xs font-mono text-muted-foreground tabular-nums">
          {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Main Search Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center container max-w-3xl mx-auto px-4 pt-12 sm:pt-24 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-2"
        >
          <img src={ploozaLogo} alt="Plooza" className="h-10 sm:h-12" />
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Поиск
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-muted-foreground text-sm mb-8"
        >
          Ищите всё, что нужно
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full relative mb-4"
        >
          <div className={`relative flex items-center bg-card border rounded-2xl transition-all duration-300 ${focused ? 'border-primary ring-4 ring-primary/10 shadow-xl' : 'border-border shadow-md'}`}>
            <Search className="absolute left-4 sm:left-5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Поиск в интернете..."
              className="w-full h-14 sm:h-16 pl-12 sm:pl-14 pr-28 sm:pr-36 bg-transparent text-base sm:text-lg placeholder:text-muted-foreground focus:outline-none rounded-2xl"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 sm:right-3 rounded-xl px-4 sm:px-6 h-10 sm:h-11 text-sm font-semibold shadow-md"
            >
              <Search className="w-4 h-4 mr-1.5" />
              Найти
            </Button>
          </div>
        </motion.div>

        {/* Quick Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex gap-2 sm:gap-3 mb-8"
        >
          {quickCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => { setQuery(cat.query); navigate(`/plooza-search/results?q=${encodeURIComponent(cat.query)}`); }}
              className="flex flex-col items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <cat.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-full mb-8"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            Сейчас ищут
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term, i) => (
              <button
                key={term}
                onClick={() => { setQuery(term); navigate(`/plooza-search/results?q=${encodeURIComponent(term)}`); }}
                className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 text-foreground transition-all hover:shadow-sm"
              >
                <span className="text-[10px] font-bold text-muted-foreground/50">{i + 1}</span>
                {term}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info Blocks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Currency Block */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Курсы валют</h2>
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  5 мин
                </span>
              </div>
              <div className="space-y-2">
                {currencies.map((c) => (
                  <div key={c.pair} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-secondary/60 transition-colors">
                    <span className="text-sm font-medium text-foreground">{c.pair}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {c.value.toLocaleString('ru-RU', { minimumFractionDigits: c.value > 1000 ? 0 : 2 })}
                      </span>
                      <span className={`flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md ${c.up ? 'text-emerald-700 bg-emerald-500/10' : 'text-red-600 bg-red-500/10'}`}>
                        {c.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {c.up ? '+' : ''}{c.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Block */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ThermometerSun className="w-3.5 h-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Погода — {weatherData.city}</h2>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <WeatherIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-foreground">{weatherData.temp}°C</div>
                  <div className="text-xs text-muted-foreground">
                    Ощущается как {weatherData.feelsLike}° • {weatherData.condition}
                  </div>
                </div>
                <div className="ml-auto space-y-1.5 text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                    <Droplets className="w-3 h-3" />
                    {weatherData.humidity}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
                    <Wind className="w-3 h-3" />
                    {weatherData.wind} м/с
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {weatherData.forecast.map((day) => {
                  const DayIcon = day.icon;
                  return (
                    <div key={day.day} className="flex-1 text-center py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors">
                      <div className="text-[10px] text-muted-foreground mb-1">{day.day}</div>
                      <DayIcon className="w-4 h-4 mx-auto text-primary mb-1" />
                      <div className="text-xs font-bold text-foreground">{day.temp}°</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-5 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <a href="/about" className="hover:text-foreground transition-colors">О нас</a>
          <span className="text-border">•</span>
          <a href="/help" className="hover:text-foreground transition-colors">Помощь</a>
          <span className="text-border">•</span>
          <span>© 2026 Plooza</span>
        </div>
      </footer>
    </div>
  );
};

export default PloozaSearchPage;
