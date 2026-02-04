import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface DomainFiltersProps {
  providers: string[];
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  zones: string[];
  selectedZones: string[];
  onZoneChange: (zones: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

const DomainFilters = ({
  providers,
  selectedProviders,
  onProviderChange,
  zones,
  selectedZones,
  onZoneChange,
  priceRange,
  maxPrice,
  onPriceChange,
  onReset,
}: DomainFiltersProps) => {
  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      onProviderChange(selectedProviders.filter(p => p !== provider));
    } else {
      onProviderChange([...selectedProviders, provider]);
    }
  };

  const toggleZone = (zone: string) => {
    if (selectedZones.includes(zone)) {
      onZoneChange(selectedZones.filter(z => z !== zone));
    } else {
      onZoneChange([...selectedZones, zone]);
    }
  };

  const hasActiveFilters = selectedProviders.length > 0 || 
    selectedZones.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice;

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
        <Label className="text-sm font-medium">Цена, ₽/год</Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceChange(value as [number, number])}
          max={maxPrice}
          min={0}
          step={50}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{priceRange[0]}₽</span>
          <span>{priceRange[1]}₽</span>
        </div>
      </div>

      {/* Providers */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Регистраторы</Label>
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

      {/* Zones */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Доменные зоны</Label>
        <div className="flex flex-wrap gap-2">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => toggleZone(zone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedZones.includes(zone)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              .{zone}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainFilters;
