import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface DNSFiltersProps {
  providers: string[];
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  zonesRange: [number, number];
  maxZones: number;
  onZonesChange: (range: [number, number]) => void;
  onReset: () => void;
}

const DNSFilters = ({
  providers,
  selectedProviders,
  onProviderChange,
  priceRange,
  maxPrice,
  onPriceChange,
  zonesRange,
  maxZones,
  onZonesChange,
  onReset,
}: DNSFiltersProps) => {
  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      onProviderChange(selectedProviders.filter(p => p !== provider));
    } else {
      onProviderChange([...selectedProviders, provider]);
    }
  };

  const hasActiveFilters = selectedProviders.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice ||
    zonesRange[0] > 0 ||
    zonesRange[1] < maxZones;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Фильтры</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs">
            <RotateCcw className="w-3 h-3 mr-1" />
            Сбросить
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Цена, ₽/месяц</Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceChange(value as [number, number])}
          max={maxPrice}
          min={0}
          step={10}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{priceRange[0]}₽</span>
          <span>{priceRange[1]}₽</span>
        </div>
      </div>

      {/* Zones Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Количество зон</Label>
        <Slider
          value={zonesRange}
          onValueChange={(value) => onZonesChange(value as [number, number])}
          max={maxZones}
          min={0}
          step={1}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{zonesRange[0]}</span>
          <span>{zonesRange[1] === maxZones ? '∞' : zonesRange[1]}</span>
        </div>
      </div>

      {/* Providers */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Провайдеры</Label>
        <div className="space-y-2">
          {providers.map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox
                id={`provider-${provider}`}
                checked={selectedProviders.includes(provider)}
                onCheckedChange={() => toggleProvider(provider)}
              />
              <label
                htmlFor={`provider-${provider}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {provider}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DNSFilters;
