import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';

interface VDSFiltersProps {
  providers: string[];
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  locations: string[];
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  ramOptions: number[];
  selectedRam: number[];
  onRamChange: (ram: number[]) => void;
  onReset: () => void;
}

const VDSFilters = ({
  providers,
  selectedProviders,
  onProviderChange,
  locations,
  selectedLocations,
  onLocationChange,
  priceRange,
  maxPrice,
  onPriceChange,
  ramOptions,
  selectedRam,
  onRamChange,
  onReset,
}: VDSFiltersProps) => {
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

  const toggleRam = (ram: number) => {
    if (selectedRam.includes(ram)) {
      onRamChange(selectedRam.filter(r => r !== ram));
    } else {
      onRamChange([...selectedRam, ram]);
    }
  };

  const hasActiveFilters = selectedProviders.length > 0 || 
    selectedLocations.length > 0 || 
    selectedRam.length > 0 || 
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
        <Label className="text-sm font-medium">Цена, ₽/мес</Label>
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

      {/* RAM */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">RAM</Label>
        <div className="flex flex-wrap gap-2">
          {ramOptions.map((ram) => (
            <button
              key={ram}
              onClick={() => toggleRam(ram)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedRam.includes(ram)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {ram < 1 ? `${ram * 1024} МБ` : `${ram} ГБ`}
            </button>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Локация</Label>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              />
              <label
                htmlFor={`location-${location}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VDSFilters;
