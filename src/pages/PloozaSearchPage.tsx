import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Cloud, Sun, CloudRain, Wind, Droplets, ThermometerSun, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
];

const PloozaSearchPage = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  const WeatherIcon = weatherData.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Search Area */}
      <main className="flex-1 flex flex-col items-center justify-start container max-w-3xl mx-auto px-4 pt-20 sm:pt-32 pb-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={ploozaLogo} alt="Plooza" className="h-10 sm:h-12" />
          <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/60">Поиск</span>
        </div>

        {/* Search Bar */}
        <div className="w-full relative mb-6">
          <div className={`relative flex items-center bg-card border rounded-2xl shadow-sm transition-all duration-200 ${focused ? 'border-primary ring-4 ring-primary/10 shadow-lg' : 'border-border'}`}>
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
              className="absolute right-2 sm:right-3 rounded-xl px-4 sm:px-6 h-10 sm:h-11 text-sm font-semibold"
            >
              <Search className="w-4 h-4 mr-1.5" />
              Найти
            </Button>
          </div>
        </div>

        {/* Trending */}
        <div className="w-full mb-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            Популярные запросы
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-2 text-xs sm:text-sm bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 text-foreground transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Info Blocks Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Currency Block */}
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Курсы валют</h2>
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  5 мин назад
                </span>
              </div>
              <div className="space-y-2.5">
                {currencies.map((c) => (
                  <div key={c.pair} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-foreground">{c.pair}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {c.value.toLocaleString('ru-RU', { minimumFractionDigits: c.value > 1000 ? 0 : 2 })}
                      </span>
                      <span className={`flex items-center gap-0.5 text-xs font-medium ${c.up ? 'text-emerald-600' : 'text-red-500'}`}>
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
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <ThermometerSun className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Погода — {weatherData.city}</h2>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
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
                    <div key={day.day} className="flex-1 text-center py-2 rounded-xl bg-secondary/60">
                      <div className="text-[10px] text-muted-foreground mb-1">{day.day}</div>
                      <DayIcon className="w-4 h-4 mx-auto text-primary mb-1" />
                      <div className="text-xs font-bold text-foreground">{day.temp}°</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Plooza · <a href="/about" className="hover:text-foreground transition-colors">О нас</a> · <a href="/help" className="hover:text-foreground transition-colors">Помощь</a>
      </footer>
    </div>
  );
};

export default PloozaSearchPage;
