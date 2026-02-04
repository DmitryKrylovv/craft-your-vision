import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSelectorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
}

interface Country {
  id: string;
  name: string;
  flag: string;
  cities: string[];
}

const countries: Country[] = [
  {
    id: 'russia',
    name: 'Россия',
    flag: '🇷🇺',
    cities: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград'],
  },
  {
    id: 'belarus',
    name: 'Беларусь',
    flag: '🇧🇾',
    cities: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  },
  {
    id: 'kazakhstan',
    name: 'Казахстан',
    flag: '🇰🇿',
    cities: ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз'],
  },
  {
    id: 'ukraine',
    name: 'Украина',
    flag: '🇺🇦',
    cities: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Львов', 'Запорожье'],
  },
  {
    id: 'uzbekistan',
    name: 'Узбекистан',
    flag: '🇺🇿',
    cities: ['Ташкент', 'Самарканд', 'Бухара', 'Наманган', 'Андижан'],
  },
];

const LocationSelector = ({ isOpen, onOpenChange, selectedCity, onCityChange }: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('russia');

  const currentCountry = countries.find(c => c.id === selectedCountry);
  
  const filteredCities = currentCountry?.cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const allFilteredCities = searchQuery
    ? countries.flatMap(country => 
        country.cities
          .filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(city => ({ city, country }))
      )
    : [];

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] lg:max-w-[650px] p-0 gap-0 bg-background border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Выберите город
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск города..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
        </div>

        <div className="flex max-h-[400px]">
          {/* Countries List */}
          {!searchQuery && (
            <div className="w-1/3 border-r border-border overflow-y-auto bg-muted/30">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors",
                    selectedCountry === country.id
                      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="truncate">{country.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Cities List */}
          <div className={cn("overflow-y-auto p-2", searchQuery ? "w-full" : "w-2/3")}>
            {searchQuery ? (
              // Show search results from all countries
              allFilteredCities.length > 0 ? (
                <div className="space-y-1">
                  {allFilteredCities.map(({ city, country }) => (
                    <button
                      key={`${country.id}-${city}`}
                      onClick={() => handleCitySelect(city)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                        selectedCity === city
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{city}</span>
                        <span className="text-xs text-muted-foreground">
                          {country.name}
                        </span>
                      </div>
                      {selectedCity === city && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <MapPin className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">Город не найден</p>
                </div>
              )
            ) : (
              // Show cities from selected country
              <div className="grid grid-cols-2 gap-1">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                      selectedCity === city
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-4 h-4 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Выбрано: <span className="font-medium text-foreground">{selectedCity}</span>
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;
