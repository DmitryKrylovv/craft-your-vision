import { Globe2, RefreshCw, Shield, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DomainTariff {
  id: string;
  provider: string;
  zone: string;
  priceRegister: number;
  priceRenew: number;
  priceTransfer: number;
  oldPrice?: number;
  highlight?: boolean;
  features?: string[];
}

interface DomainTariffCardProps {
  tariff: DomainTariff;
}

const DomainTariffCard = ({ tariff }: DomainTariffCardProps) => {
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
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{tariff.provider}</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">.{tariff.zone}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{tariff.priceRegister}₽</div>
          <div className="text-[10px] text-muted-foreground">/год</div>
          {tariff.oldPrice && (
            <div className="text-xs text-muted-foreground line-through">{tariff.oldPrice}₽</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>Продление</span>
          </div>
          <span className="font-medium text-foreground">{tariff.priceRenew}₽/год</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Трансфер</span>
          </div>
          <span className="font-medium text-foreground">{tariff.priceTransfer}₽</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>WHOIS защита</span>
          </div>
          <span className="font-medium text-foreground">Бесплатно</span>
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
        Зарегистрировать
      </Button>
    </div>
  );
};

export default DomainTariffCard;
