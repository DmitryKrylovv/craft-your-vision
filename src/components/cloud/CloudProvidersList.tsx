import { Star, Check, ExternalLink, MapPin, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CloudProvider, CloudConfig } from '@/pages/CloudPage';
import { cn } from '@/lib/utils';

interface CloudProviderWithPrice extends CloudProvider {
  calculatedPrice: number;
}

interface CloudProvidersListProps {
  providers: CloudProviderWithPrice[];
  selectedProvider: string | null;
  onProviderSelect: (id: string | null) => void;
  config: CloudConfig;
}

const CloudProvidersList = ({
  providers,
  selectedProvider,
  onProviderSelect,
  config,
}: CloudProvidersListProps) => {
  if (providers.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Провайдеры не найдены
        </h3>
        <p className="text-muted-foreground">
          Попробуйте изменить параметры конфигурации или сбросить фильтры
        </p>
      </div>
    );
  }

  const minPrice = Math.min(...providers.map(p => p.calculatedPrice));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Доступные провайдеры ({providers.length})
        </h2>
        <div className="text-sm text-muted-foreground">
          Сортировка по цене
        </div>
      </div>

      <div className="grid gap-4">
        {providers.map((provider, index) => {
          const isSelected = selectedProvider === provider.id;
          const isCheapest = provider.calculatedPrice === minPrice;

          return (
            <div
              key={provider.id}
              className={cn(
                "relative bg-card border rounded-2xl p-5 transition-all cursor-pointer",
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => onProviderSelect(isSelected ? null : provider.id)}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex gap-2">
                {isCheapest && (
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full font-medium">
                    Лучшая цена
                  </span>
                )}
                {index === 0 && !isCheapest && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    Рекомендуем
                  </span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Provider Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {provider.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{provider.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{provider.rating}</span>
                      </div>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">
                        {provider.locations.length} локаций
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {provider.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {provider.calculatedPrice.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-sm text-muted-foreground">в месяц</div>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Locations */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        Доступные локации
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.locations.map((loc) => (
                          <span
                            key={loc}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-full",
                              config.location === loc
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* OS */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                        <Monitor className="w-4 h-4" />
                        Операционные системы
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.operatingSystems.slice(0, 4).map((os) => (
                          <span
                            key={os}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-full",
                              config.os === os
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {os}
                          </span>
                        ))}
                        {provider.operatingSystems.length > 4 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                            +{provider.operatingSystems.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-5 p-4 bg-muted/50 rounded-xl">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Расчёт стоимости
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">CPU ({config.cpu} vCPU)</div>
                        <div className="font-medium text-foreground">
                          {(config.cpu * provider.pricePerCore).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">RAM ({config.ram} ГБ)</div>
                        <div className="font-medium text-foreground">
                          {(config.ram * provider.pricePerGbRam).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Диск ({config.storage} ГБ {config.storageType.toUpperCase()})
                        </div>
                        <div className="font-medium text-foreground">
                          {(config.storage * (config.storageType === 'nvme' ? provider.pricePerGbNvme : provider.pricePerGbStorage)).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex gap-3">
                    <Button className="flex-1">
                      <Check className="w-4 h-4 mr-2" />
                      Заказать сервер
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      На сайт
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CloudProvidersList;
