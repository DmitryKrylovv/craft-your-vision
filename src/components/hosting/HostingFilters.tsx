import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface HostingFiltersProps {
  providers: string[];
  selectedProviders: string[];
  onProviderChange: (providers: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  storageOptions: number[];
  selectedStorage: number[];
  onStorageChange: (storage: number[]) => void;
  sitesOptions: number[];
  selectedSites: number[];
  onSitesChange: (sites: number[]) => void;
  onReset: () => void;
}

const HostingFilters = ({
  providers,
  selectedProviders,
  onProviderChange,
  priceRange,
  maxPrice,
  onPriceChange,
  storageOptions,
  selectedStorage,
  onStorageChange,
  sitesOptions,
  selectedSites,
  onSitesChange,
  onReset,
}: HostingFiltersProps) => {
  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      onProviderChange(selectedProviders.filter(p => p !== provider));
    } else {
      onProviderChange([...selectedProviders, provider]);
    }
  };

  const toggleStorage = (storage: number) => {
    if (selectedStorage.includes(storage)) {
      onStorageChange(selectedStorage.filter(s => s !== storage));
    } else {
      onStorageChange([...selectedStorage, storage]);
    }
  };

  const toggleSites = (sites: number) => {
    if (selectedSites.includes(sites)) {
      onSitesChange(selectedSites.filter(s => s !== sites));
    } else {
      onSitesChange([...selectedSites, sites]);
    }
  };

  const hasActiveFilters = selectedProviders.length > 0 || 
    selectedStorage.length > 0 || 
    selectedSites.length > 0 || 
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
          step={10}
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

      {/* Storage */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Диск</Label>
        <div className="flex flex-wrap gap-2">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => toggleStorage(storage)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStorage.includes(storage)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {storage} ГБ
            </button>
          ))}
        </div>
      </div>

      {/* Sites */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Сайтов</Label>
        <div className="flex flex-wrap gap-2">
          {sitesOptions.map((sites) => (
            <button
              key={sites}
              onClick={() => toggleSites(sites)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedSites.includes(sites)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {sites === -1 ? '∞' : sites}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostingFilters;
