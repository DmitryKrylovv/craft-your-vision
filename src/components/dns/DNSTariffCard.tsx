import { Server, Globe2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DNSTariff {
  id: string;
  provider: string;
  name: string;
  zones: number;
  queries: number;
  ttl: number;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

interface DNSTariffCardProps {
  tariff: DNSTariff;
}

const DNSTariffCard = ({ tariff }: DNSTariffCardProps) => {
  const formatQueries = (num: number) => {
    if (num === -1) return '∞';
    if (num >= 1000000) return `${num / 1000000}M`;
    if (num >= 1000) return `${num / 1000}K`;
    return num.toString();
  };

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
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{tariff.price}₽</div>
          <div className="text-[10px] text-muted-foreground">/месяц</div>
          {tariff.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{tariff.oldPrice}₽</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe2 className="w-4 h-4" />
            <span>DNS зоны</span>
          </div>
          <span className="font-medium text-foreground">{tariff.zones === -1 ? '∞' : tariff.zones}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>Запросов/мес</span>
          </div>
          <span className="font-medium text-foreground">{formatQueries(tariff.queries)}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Мин. TTL</span>
          </div>
          <span className="font-medium text-foreground">{tariff.ttl} сек</span>
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
        Подключить
      </Button>
    </div>
  );
};

export default DNSTariffCard;
