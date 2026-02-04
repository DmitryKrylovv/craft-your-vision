import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw, MapPin, Monitor, Cpu, MemoryStick, HardDrive } from 'lucide-react';
import { CloudConfig, CloudProvider } from '@/pages/CloudPage';
import { cn } from '@/lib/utils';

interface CloudConfiguratorProps {
  config: CloudConfig;
  onConfigChange: (config: CloudConfig) => void;
  locations: string[];
  operatingSystems: string[];
  providers: CloudProvider[];
}

const CloudConfigurator = ({
  config,
  onConfigChange,
  locations,
  operatingSystems,
  providers,
}: CloudConfiguratorProps) => {
  const updateConfig = (updates: Partial<CloudConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const resetConfig = () => {
    onConfigChange({
      provider: null,
      location: null,
      os: null,
      cpu: 2,
      ram: 4,
      storage: 40,
      storageType: 'ssd',
    });
  };

  const hasChanges = config.provider || config.location || config.os || 
    config.cpu !== 2 || config.ram !== 4 || config.storage !== 40 || config.storageType !== 'ssd';

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Конфигуратор</h3>
        {hasChanges && (
          <Button variant="ghost" size="sm" onClick={resetConfig} className="h-8 text-xs">
            <RotateCcw className="w-3 h-3 mr-1" />
            Сбросить
          </Button>
        )}
      </div>

      {/* Location */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Локация</Label>
        </div>
        <Select
          value={config.location || 'any'}
          onValueChange={(value) => updateConfig({ location: value === 'any' ? null : value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Любая локация" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Любая локация</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* OS */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Операционная система</Label>
        </div>
        <Select
          value={config.os || 'any'}
          onValueChange={(value) => updateConfig({ os: value === 'any' ? null : value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Любая ОС" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Любая ОС</SelectItem>
            {operatingSystems.map((os) => (
              <SelectItem key={os} value={os}>
                {os}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CPU */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium">CPU</Label>
          </div>
          <span className="text-sm font-semibold text-primary">{config.cpu} vCPU</span>
        </div>
        <Slider
          value={[config.cpu]}
          onValueChange={([value]) => updateConfig({ cpu: value })}
          min={1}
          max={32}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 vCPU</span>
          <span>32 vCPU</span>
        </div>
      </div>

      {/* RAM */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MemoryStick className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium">RAM</Label>
          </div>
          <span className="text-sm font-semibold text-primary">{config.ram} ГБ</span>
        </div>
        <Slider
          value={[config.ram]}
          onValueChange={([value]) => updateConfig({ ram: value })}
          min={1}
          max={128}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 ГБ</span>
          <span>128 ГБ</span>
        </div>
      </div>

      {/* Storage */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Диск</Label>
          </div>
          <span className="text-sm font-semibold text-primary">{config.storage} ГБ</span>
        </div>
        <Slider
          value={[config.storage]}
          onValueChange={([value]) => updateConfig({ storage: value })}
          min={10}
          max={1000}
          step={10}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10 ГБ</span>
          <span>1000 ГБ</span>
        </div>
      </div>

      {/* Storage Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Тип диска</Label>
        <RadioGroup
          value={config.storageType}
          onValueChange={(value: 'ssd' | 'nvme') => updateConfig({ storageType: value })}
          className="flex gap-2"
        >
          <div className="flex-1">
            <RadioGroupItem value="ssd" id="ssd" className="peer sr-only" />
            <label
              htmlFor="ssd"
              className={cn(
                "flex items-center justify-center px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium",
                config.storageType === 'ssd'
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              SSD
            </label>
          </div>
          <div className="flex-1">
            <RadioGroupItem value="nvme" id="nvme" className="peer sr-only" />
            <label
              htmlFor="nvme"
              className={cn(
                "flex items-center justify-center px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium",
                config.storageType === 'nvme'
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              NVMe
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-border">
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Ваша конфигурация</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">CPU:</div>
            <div className="text-foreground font-medium text-right">{config.cpu} vCPU</div>
            <div className="text-muted-foreground">RAM:</div>
            <div className="text-foreground font-medium text-right">{config.ram} ГБ</div>
            <div className="text-muted-foreground">Диск:</div>
            <div className="text-foreground font-medium text-right">{config.storage} ГБ {config.storageType.toUpperCase()}</div>
            {config.location && (
              <>
                <div className="text-muted-foreground">Локация:</div>
                <div className="text-foreground font-medium text-right">{config.location}</div>
              </>
            )}
            {config.os && (
              <>
                <div className="text-muted-foreground">ОС:</div>
                <div className="text-foreground font-medium text-right truncate">{config.os}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudConfigurator;
