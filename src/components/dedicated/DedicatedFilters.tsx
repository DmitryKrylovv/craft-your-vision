import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface DedicatedFiltersProps {
  providers: string[];
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  locations: string[];
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  cpuRange: [number, number];
  maxCpu: number;
  onCpuChange: (range: [number, number]) => void;
  ramRange: [number, number];
  maxRam: number;
  onRamChange: (range: [number, number]) => void;
  onReset: () => void;
}

const DedicatedFilters = ({
  providers,
  selectedProviders,
  onProviderChange,
  locations,
  selectedLocations,
  onLocationChange,
  priceRange,
  maxPrice,
  onPriceChange,
  cpuRange,
  maxCpu,
  onCpuChange,
  ramRange,
  maxRam,
  onRamChange,
  onReset,
}: DedicatedFiltersProps) => {
  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      onProviderChange(selectedProviders.filter(p => p !== provider));
    } else {
      onProviderChange([...selectedProviders, provider]);
    }
  };

  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      onLocationChange(selectedLocations.filter(l => l !== location));
    } else {
      onLocationChange([...selectedLocations, location]);
    }
  };

  const hasActiveFilters = selectedProviders.length > 0 || 
    selectedLocations.length > 0 ||
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice ||
    cpuRange[0] > 0 ||
    cpuRange[1] < maxCpu ||
    ramRange[0] > 0 ||
    ramRange[1] < maxRam;

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
          step={1000}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{priceRange[0].toLocaleString()}₽</span>
          <span>{priceRange[1].toLocaleString()}₽</span>
        </div>
      </div>

      {/* CPU Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">CPU (ядер)</Label>
        <Slider
          value={cpuRange}
          onValueChange={(value) => onCpuChange(value as [number, number])}
          max={maxCpu}
          min={0}
          step={2}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{cpuRange[0]}</span>
          <span>{cpuRange[1]}</span>
        </div>
      </div>

      {/* RAM Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">RAM (ГБ)</Label>
        <Slider
          value={ramRange}
          onValueChange={(value) => onRamChange(value as [number, number])}
          max={maxRam}
          min={0}
          step={8}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{ramRange[0]} ГБ</span>
          <span>{ramRange[1]} ГБ</span>
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Локация</Label>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => toggleLocation(location)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedLocations.includes(location)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {location}
            </button>
          ))}
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

export default DedicatedFilters;
