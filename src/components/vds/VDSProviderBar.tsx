import { Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Provider {
  name: string;
  count: number;
}

interface VDSProviderBarProps {
  providers: Provider[];
  activeProvider: string | null;
  onProviderClick: (provider: string | null) => void;
}

const VDSProviderBar = ({ providers, activeProvider, onProviderClick }: VDSProviderBarProps) => {
  const total = providers.reduce((acc, p) => acc + p.count, 0);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onProviderClick(null)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all",
          !activeProvider 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "bg-card border border-border text-foreground hover:border-primary/50"
        )}
      >
        <span className="font-medium">Все</span>
        <span className={cn(
          "text-xs px-2 py-0.5 rounded-full",
          !activeProvider ? "bg-primary-foreground/20" : "bg-muted"
        )}>
          {total}
        </span>
      </button>
      
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => onProviderClick(provider.name)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all",
            activeProvider === provider.name 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-card border border-border text-foreground hover:border-primary/50"
          )}
        >
          <Server className="w-4 h-4" />
          <span className="font-medium">{provider.name}</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            activeProvider === provider.name ? "bg-primary-foreground/20" : "bg-muted"
          )}>
            {provider.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default VDSProviderBar;
