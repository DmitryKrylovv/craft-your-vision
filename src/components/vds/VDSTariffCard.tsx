import { Server, Cpu, HardDrive, Gauge, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Tariff {
  id: string;
  provider: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  storageType: 'SSD' | 'NVMe';
  location: string;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
}

interface VDSTariffCardProps {
  tariff: Tariff;
}

const VDSTariffCard = ({ tariff }: VDSTariffCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-card rounded-2xl border p-5 transition-all hover:shadow-lg group",
        tariff.highlight 
          ? "border-primary shadow-md shadow-primary/10" 
          : "border-border hover:border-primary/30"
      )}
    >
      {tariff.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            Популярный
          </Badge>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{tariff.provider}</span>
          </div>
          <h3 className="font-semibold text-foreground">{tariff.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{tariff.price}₽</div>
          <div className="text-[10px] text-muted-foreground">/месяц</div>
          {tariff.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{tariff.oldPrice}₽</div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.cpu} vCPU</span>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.ram < 1 ? `${tariff.ram * 1024} МБ` : `${tariff.ram} ГБ`}</span>
        </div>
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.storage} {tariff.storageType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.location}</span>
        </div>
      </div>
      
      <Button 
        className={cn(
          "w-full rounded-xl transition-all",
          tariff.highlight 
            ? "" 
            : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
        )}
      >
        Заказать
      </Button>
    </div>
  );
};

export default VDSTariffCard;
