import { Server, Cpu, MemoryStick, HardDrive, MapPin, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DedicatedTariff {
  id: string;
  provider: string;
  name: string;
  cpu: string;
  cpuCores: number;
  ram: number;
  storage: string;
  bandwidth: string;
  location: string;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

interface DedicatedTariffCardProps {
  tariff: DedicatedTariff;
}

const DedicatedTariffCard = ({ tariff }: DedicatedTariffCardProps) => {
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
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{tariff.provider}</span>
          </div>
          <h3 className="font-semibold text-foreground">{tariff.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {tariff.location}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{tariff.price.toLocaleString()}₽</div>
          <div className="text-[10px] text-muted-foreground">/месяц</div>
          {tariff.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{tariff.oldPrice.toLocaleString()}₽</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="w-4 h-4" />
            <span>Процессор</span>
          </div>
          <span className="font-medium text-foreground text-right text-xs">{tariff.cpu}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MemoryStick className="w-4 h-4" />
            <span>RAM</span>
          </div>
          <span className="font-medium text-foreground">{tariff.ram} ГБ</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            <span>Диск</span>
          </div>
          <span className="font-medium text-foreground">{tariff.storage}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="w-4 h-4" />
            <span>Канал</span>
          </div>
          <span className="font-medium text-foreground">{tariff.bandwidth}</span>
        </div>
      </div>

      {tariff.features && tariff.features.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tariff.features.map((feature, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0.5">
              {feature}
            </Badge>
          ))}
        </div>
      )}
      
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

export default DedicatedTariffCard;
