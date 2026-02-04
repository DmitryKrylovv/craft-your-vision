import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  name: string;
  country: string;
  flag: string;
  count: number;
}

interface VDSLocationBarProps {
  locations: Location[];
  selectedLocations: string[];
  onLocationClick: (location: string) => void;
}

const VDSLocationBar = ({ locations, selectedLocations, onLocationClick }: VDSLocationBarProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((location) => {
        const isSelected = selectedLocations.includes(location.name);
        return (
          <button
            key={location.name}
            onClick={() => onLocationClick(location.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
              isSelected 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-card border border-border text-foreground hover:border-primary/50"
            )}
          >
            <span className="text-base">{location.flag}</span>
            <span className="font-medium">{location.name}</span>
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              isSelected ? "bg-primary-foreground/20" : "bg-muted"
            )}>
              {location.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VDSLocationBar;
