import { cn } from '@/lib/utils';

interface Zone {
  name: string;
  count: number;
  popular?: boolean;
}

interface DomainZoneBarProps {
  zones: Zone[];
  selectedZones: string[];
  onZoneClick: (zone: string) => void;
}

const DomainZoneBar = ({ zones, selectedZones, onZoneClick }: DomainZoneBarProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {zones.map((zone) => {
        const isSelected = selectedZones.includes(zone.name);
        return (
          <button
            key={zone.name}
            onClick={() => onZoneClick(zone.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
              isSelected 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-card border border-border text-foreground hover:border-primary/50",
              zone.popular && !isSelected && "border-primary/30"
            )}
          >
            <span className="font-medium">.{zone.name}</span>
            {zone.popular && !isSelected && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                ХИТ
              </span>
            )}
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              isSelected ? "bg-primary-foreground/20" : "bg-muted"
            )}>
              {zone.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DomainZoneBar;
