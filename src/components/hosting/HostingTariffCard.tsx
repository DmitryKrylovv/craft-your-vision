import { Globe, HardDrive, Database, Mail, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HostingTariff {
  id: string;
  provider: string;
  name: string;
  storage: number;
  sites: number;
  databases: number;
  emails: number;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

interface HostingTariffCardProps {
  tariff: HostingTariff;
}

const HostingTariffCard = ({ tariff }: HostingTariffCardProps) => {
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
            <Globe className="w-4 h-4 text-primary" />
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
          <HardDrive className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.storage} ГБ</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.sites === -1 ? '∞' : tariff.sites} сайтов</span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.databases === -1 ? '∞' : tariff.databases} БД</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{tariff.emails === -1 ? '∞' : tariff.emails} почт</span>
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

export default HostingTariffCard;
