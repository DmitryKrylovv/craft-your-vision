import { ShieldCheck, Globe2, Building2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SSLTariff {
  id: string;
  provider: string;
  name: string;
  type: 'DV' | 'OV' | 'EV';
  domains: number;
  wildcard: boolean;
  warranty: number;
  price: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

interface SSLTariffCardProps {
  tariff: SSLTariff;
}

const SSLTariffCard = ({ tariff }: SSLTariffCardProps) => {
  const typeLabels = {
    DV: 'Domain Validation',
    OV: 'Organization Validation',
    EV: 'Extended Validation'
  };

  const typeColors = {
    DV: 'bg-blue-500/10 text-blue-600',
    OV: 'bg-amber-500/10 text-amber-600',
    EV: 'bg-green-500/10 text-green-600'
  };

  const formatWarranty = (num: number) => {
    if (num >= 1000000) return `$${num / 1000000}M`;
    if (num >= 1000) return `$${num / 1000}K`;
    return `$${num}`;
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
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{tariff.provider}</span>
          </div>
          <h3 className="font-semibold text-foreground">{tariff.name}</h3>
          <Badge className={cn("mt-1 text-[10px]", typeColors[tariff.type])}>
            {typeLabels[tariff.type]}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{tariff.price}₽</div>
          <div className="text-[10px] text-muted-foreground">/год</div>
          {tariff.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{tariff.oldPrice}₽</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe2 className="w-4 h-4" />
            <span>Доменов</span>
          </div>
          <span className="font-medium text-foreground">
            {tariff.domains === -1 ? '∞' : tariff.domains}
            {tariff.wildcard && ' + Wildcard'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>Гарантия</span>
          </div>
          <span className="font-medium text-foreground">{formatWarranty(tariff.warranty)}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Шифрование</span>
          </div>
          <span className="font-medium text-foreground">256-bit</span>
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

export default SSLTariffCard;
