import { useState, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal, Star, MapPin, Server, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchFilterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

const SearchFilter = ({ isOpen, onOpenChange }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut
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

  const serviceTypes = [
    { id: 'vps', label: 'VPS', icon: Server },
    { id: 'hosting', label: 'Хостинг', icon: Server },
    { id: 'dedicated', label: 'Выделенные', icon: Server },
    { id: 'cloud', label: 'Облачные', icon: Zap },
  ];

  const locations = [
    { id: 'moscow', label: 'Москва' },
    { id: 'spb', label: 'Санкт-Петербург' },
    { id: 'europe', label: 'Европа' },
    { id: 'usa', label: 'США' },
    { id: 'asia', label: 'Азия' },
  ];

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId) 
        ? prev.filter(l => l !== locationId)
        : [...prev, locationId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedLocations([]);
    setMinRating(null);
    setPriceRange([0, 10000]);
  };

  const hasFilters = selectedTypes.length > 0 || selectedLocations.length > 0 || minRating !== null || searchQuery;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay - only on desktop */}
      <div 
        className="absolute inset-0 bg-black/40 animate-in fade-in-0 duration-150 hidden md:block" 
        onClick={() => onOpenChange(false)}
      />

      {/* Search Container - Fullscreen on mobile, dropdown on desktop */}
      <div className="absolute inset-0 md:inset-auto md:left-0 md:right-0 md:top-[105px] md:px-4 animate-in fade-in-0 md:slide-in-from-top-2 duration-200">
        <div className="h-full md:h-auto md:container md:max-w-3xl md:mx-auto">
          <div 
            className="h-full md:h-auto bg-background md:bg-card md:border md:border-border md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-3 sm:p-4 bg-muted/30 border-b sm:border-b-0 border-border">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Поиск провайдеров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 bg-background border border-border rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button 
                  onClick={() => onOpenChange(false)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex-1 p-4 sm:p-5 space-y-4 sm:space-y-5 overflow-y-auto">
              {/* Service Types */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  Тип услуги
                </div>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        className={cn(
                          "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all border",
                          selectedTypes.includes(type.id)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Locations */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  Расположение серверов
                </div>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => toggleLocation(location.id)}
                        className={cn(
                          "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all border",
                        selectedLocations.includes(location.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      {location.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  Минимальный рейтинг
                </div>
                <div className="flex flex-wrap gap-2">
                  {ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? null : rating)}
                      className={cn(
                        "flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all border",
                        minRating === rating
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                  <span>Цена в месяц</span>
                  <span className="text-muted-foreground font-normal">
                    {priceRange[0]}₽ — {priceRange[1]}₽
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1 h-10 sm:h-11 px-3 sm:px-4 bg-background border border-border rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1 h-10 sm:h-11 px-3 sm:px-4 bg-background border border-border rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 sm:p-4 border-t border-border bg-muted/30 flex items-center justify-between gap-3 mt-auto">
              <button
                onClick={clearFilters}
                className={cn(
                  "text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors",
                  !hasFilters && "opacity-50 pointer-events-none"
                )}
              >
                Сбросить
              </button>
              <Button 
                className="px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm"
                onClick={() => onOpenChange(false)}
              >
                <Search className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Найти провайдеров</span>
                <span className="sm:hidden">Найти</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
