import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Server, Wrench, Search, 
  ArrowRight, ArrowLeft, Check, Building2,
  ExternalLink, Star, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ColocationWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Локация', icon: MapPin, description: 'Выберите регион размещения' },
  { id: 2, title: 'Мощность', icon: Server, description: 'Укажите требования к оборудованию' },
  { id: 3, title: 'Услуги', icon: Wrench, description: 'Дополнительные сервисы' },
  { id: 4, title: 'Результаты', icon: Search, description: 'Подходящие провайдеры' },
];

const locations = [
  { id: 'moscow', name: 'Москва', flag: '🇷🇺', datacenters: 15 },
  { id: 'spb', name: 'Санкт-Петербург', flag: '🇷🇺', datacenters: 8 },
  { id: 'kazan', name: 'Казань', flag: '🇷🇺', datacenters: 3 },
  { id: 'novosibirsk', name: 'Новосибирск', flag: '🇷🇺', datacenters: 4 },
  { id: 'amsterdam', name: 'Амстердам', flag: '🇳🇱', datacenters: 6 },
  { id: 'frankfurt', name: 'Франкфурт', flag: '🇩🇪', datacenters: 8 },
];

const rackSizes = [
  { id: '1u', label: '1U', description: '1 юнит' },
  { id: '2u', label: '2U', description: '2 юнита' },
  { id: '4u', label: '4U', description: '4 юнита' },
  { id: 'quarter', label: '1/4 стойки', description: '10-11 юнитов' },
  { id: 'half', label: '1/2 стойки', description: '20-21 юнит' },
  { id: 'full', label: 'Полная стойка', description: '42 юнита' },
];

const powerOptions = [
  { id: '0.5kw', label: '0.5 кВт' },
  { id: '1kw', label: '1 кВт' },
  { id: '2kw', label: '2 кВт' },
  { id: '5kw', label: '5 кВт' },
  { id: '10kw', label: '10 кВт' },
  { id: 'custom', label: 'Другое' },
];

const services = [
  { id: 'remote-hands', label: 'Remote Hands', description: 'Удалённые руки для работы с оборудованием' },
  { id: 'monitoring', label: 'Мониторинг 24/7', description: 'Круглосуточный мониторинг серверов' },
  { id: 'backup-power', label: 'Резервное питание', description: 'ДГУ и ИБП на случай аварий' },
  { id: 'ddos', label: 'Защита от DDoS', description: 'Фильтрация вредоносного трафика' },
  { id: 'vpn', label: 'VPN-каналы', description: 'Выделенные защищённые каналы' },
  { id: 'crossconnect', label: 'Cross-connect', description: 'Прямые соединения с операторами' },
];

// Mock provider data
const allProviders = [
  { 
    id: 'dataline', 
    name: 'DataLine', 
    logo: 'DL',
    locations: ['moscow', 'spb'],
    tier: 'III',
    priceFrom: 3500,
    rating: 4.8,
    features: ['remote-hands', 'monitoring', 'backup-power', 'ddos'],
    rackSizes: ['1u', '2u', '4u', 'quarter', 'half', 'full'],
    highlight: true,
  },
  { 
    id: 'selectel', 
    name: 'Selectel', 
    logo: 'SE',
    locations: ['moscow', 'spb'],
    tier: 'III+',
    priceFrom: 4000,
    rating: 4.9,
    features: ['remote-hands', 'monitoring', 'backup-power', 'ddos', 'crossconnect'],
    rackSizes: ['1u', '2u', '4u', 'quarter', 'half', 'full'],
    highlight: false,
  },
  { 
    id: 'rostelecom', 
    name: 'Ростелеком ЦОД', 
    logo: 'RT',
    locations: ['moscow', 'spb', 'kazan', 'novosibirsk'],
    tier: 'III',
    priceFrom: 3000,
    rating: 4.5,
    features: ['remote-hands', 'monitoring', 'backup-power'],
    rackSizes: ['quarter', 'half', 'full'],
    highlight: false,
  },
  { 
    id: 'miran', 
    name: 'Миран', 
    logo: 'MR',
    locations: ['spb'],
    tier: 'III',
    priceFrom: 2800,
    rating: 4.6,
    features: ['remote-hands', 'monitoring', 'backup-power', 'vpn'],
    rackSizes: ['1u', '2u', '4u', 'quarter', 'half'],
    highlight: false,
  },
  { 
    id: 'stack', 
    name: 'Stack Group', 
    logo: 'SG',
    locations: ['moscow'],
    tier: 'IV',
    priceFrom: 5500,
    rating: 4.9,
    features: ['remote-hands', 'monitoring', 'backup-power', 'ddos', 'vpn', 'crossconnect'],
    rackSizes: ['quarter', 'half', 'full'],
    highlight: true,
  },
  { 
    id: 'ix', 
    name: 'IXcellerate', 
    logo: 'IX',
    locations: ['moscow'],
    tier: 'III+',
    priceFrom: 4500,
    rating: 4.7,
    features: ['remote-hands', 'monitoring', 'backup-power', 'crossconnect'],
    rackSizes: ['quarter', 'half', 'full'],
    highlight: false,
  },
  { 
    id: 'hetzner', 
    name: 'Hetzner', 
    logo: 'HZ',
    locations: ['frankfurt', 'amsterdam'],
    tier: 'III',
    priceFrom: 49,
    rating: 4.8,
    features: ['remote-hands', 'monitoring', 'backup-power'],
    rackSizes: ['1u', '2u', '4u', 'quarter', 'half', 'full'],
    highlight: false,
  },
  { 
    id: 'equinix', 
    name: 'Equinix', 
    logo: 'EQ',
    locations: ['frankfurt', 'amsterdam'],
    tier: 'IV',
    priceFrom: 150,
    rating: 4.9,
    features: ['remote-hands', 'monitoring', 'backup-power', 'ddos', 'vpn', 'crossconnect'],
    rackSizes: ['quarter', 'half', 'full'],
    highlight: true,
  },
];

const ColocationWizard = ({ isOpen, onClose }: ColocationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    rackSize: '',
    power: '',
    services: [] as string[],
  });

  const filteredProviders = useMemo(() => {
    return allProviders.filter(provider => {
      // Filter by location
      if (formData.location && !provider.locations.includes(formData.location)) {
        return false;
      }
      // Filter by rack size
      if (formData.rackSize && !provider.rackSizes.includes(formData.rackSize)) {
        return false;
      }
      // Filter by required services
      if (formData.services.length > 0) {
        const hasAllServices = formData.services.every(s => provider.features.includes(s));
        if (!hasAllServices) return false;
      }
      return true;
    }).sort((a, b) => {
      // Sort by highlight first, then by rating
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return b.rating - a.rating;
    });
  }, [formData]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.location;
      case 2: return !!formData.rackSize && !!formData.power;
      case 3: return true;
      default: return false;
    }
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setFormData({
      location: '',
      rackSize: '',
      power: '',
      services: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  const selectedLocation = locations.find(l => l.id === formData.location);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Progress Header */}
      <div className="bg-muted/50 p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Подбор дата-центра</span>
          </div>
          <button 
            onClick={resetAndClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Steps */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div 
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-primary/20 text-primary",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-6 h-0.5 mx-1",
                    isCompleted ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Выберите локацию
              </h3>
              <p className="text-muted-foreground mb-6">
                Где вы хотите разместить оборудование?
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setFormData({ ...formData, location: loc.id })}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      formData.location === loc.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-2xl mb-2">{loc.flag}</div>
                    <div className="font-medium text-foreground">{loc.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {loc.datacenters} ЦОД
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Capacity */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Требования к размещению
              </h3>
              <p className="text-muted-foreground mb-6">
                Укажите размер и мощность
              </p>
              
              <div className="space-y-6">
                {/* Rack Size */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Размер размещения</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {rackSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setFormData({ ...formData, rackSize: size.id })}
                        className={cn(
                          "p-3 rounded-xl border-2 text-left transition-all",
                          formData.rackSize === size.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="font-medium text-foreground">{size.label}</div>
                        <div className="text-xs text-muted-foreground">{size.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Power */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Потребляемая мощность</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {powerOptions.map((power) => (
                      <button
                        key={power.id}
                        onClick={() => setFormData({ ...formData, power: power.id })}
                        className={cn(
                          "p-2 rounded-xl border-2 text-center text-sm transition-all",
                          formData.power === power.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {power.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Дополнительные услуги
              </h3>
              <p className="text-muted-foreground mb-6">
                Выберите нужные сервисы (опционально)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      formData.services.includes(service.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={formData.services.includes(service.id)}
                      onCheckedChange={() => toggleService(service.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium text-foreground">{service.label}</div>
                      <div className="text-xs text-muted-foreground">{service.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Подходящие провайдеры
                </h3>
                <Badge variant="secondary" className="text-sm">
                  {filteredProviders.length} найдено
                </Badge>
              </div>
              <p className="text-muted-foreground mb-6">
                {selectedLocation?.flag} {selectedLocation?.name} • {rackSizes.find(r => r.id === formData.rackSize)?.label} • {powerOptions.find(p => p.id === formData.power)?.label}
              </p>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {filteredProviders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет провайдеров по заданным критериям</p>
                    <p className="text-sm">Попробуйте изменить фильтры</p>
                  </div>
                ) : (
                  filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:border-primary/50",
                        provider.highlight ? "border-primary/30 bg-primary/5" : "border-border"
                      )}
                    >
                      {/* Logo */}
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shrink-0",
                        provider.highlight 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {provider.logo}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{provider.name}</span>
                          {provider.highlight && (
                            <Badge className="bg-primary/20 text-primary text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Рекомендуем
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            Tier {provider.tier}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {provider.rating}
                          </div>
                          <span>•</span>
                          <span>{provider.features.length} услуг</span>
                        </div>
                      </div>
                      
                      {/* Price & Action */}
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-primary">
                          от {provider.priceFrom.toLocaleString()}{provider.priceFrom < 1000 ? '€' : '₽'}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">в месяц</div>
                        <Button size="sm" variant="outline" className="rounded-lg text-xs">
                          Подробнее
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-muted/50 p-4 md:p-6 border-t border-border flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="rounded-xl"
          >
            Далее
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={resetAndClose}
            variant="outline"
            className="rounded-xl"
          >
            Закрыть
          </Button>
        )}
      </div>
    </div>
  );
};

export default ColocationWizard;
