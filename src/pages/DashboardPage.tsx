import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OnboardingTour from '@/components/dashboard/OnboardingTour';
import RoleSwitcher from '@/components/dashboard/RoleSwitcher';
import { useRole } from '@/contexts/RoleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  Server,
  Globe,
  Shield,
  HardDrive,
  Plus,
  Clock,
  MoreVertical,
  RefreshCw,
  Power,
  Copy,
  ChevronRight,
  Cloud,
  Database,
  Layers,
  FolderOpen,
  Cpu,
  MemoryStick,
  HardDriveDownload,
  Wallet,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  HelpCircle,
  Building2,
  Zap,
  Thermometer,
  Droplets,
  Network,
  MapPin,
  Box,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { permissions } = useRole();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('plooza_onboarding_complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('plooza_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  const restartOnboarding = () => {
    setShowOnboarding(true);
  };

  const userServices = [
    {
      id: 1,
      type: 'vps',
      name: 'VPS Pro #1',
      provider: 'TimeWeb',
      status: 'active',
      ip: '185.232.45.123',
      specs: '4 vCPU • 8 GB RAM • 160 GB NVMe',
      price: 890,
      expiresAt: '15 февраля 2025',
      daysLeft: 16,
      usage: { cpu: 34, ram: 62, disk: 45 },
    },
    {
      id: 2,
      type: 'vps',
      name: 'Dev Server',
      provider: 'Selectel',
      status: 'active',
      ip: '91.108.12.45',
      specs: '2 vCPU • 4 GB RAM • 80 GB NVMe',
      price: 450,
      expiresAt: '20 марта 2025',
      daysLeft: 49,
      usage: { cpu: 12, ram: 28, disk: 33 },
    },
    {
      id: 1,
      type: 'colocation',
      subtype: 'rack',
      name: 'Стойка #42',
      provider: 'DataLine',
      status: 'active',
      specs: 'Full Rack • 42U • M9',
      location: 'М9, Москва',
      power: { used: 8.2, total: 10 },
      units: { used: 28, total: 42 },
      environment: { temp: 21.5, humidity: 45 },
      bandwidth: '10 Гбит/с',
      price: 85000,
      expiresAt: '15 января 2026',
      daysLeft: 350,
    },
    {
      id: 3,
      type: 'colocation',
      subtype: 'server',
      name: 'Dell R750 #1',
      provider: 'Selectel',
      status: 'active',
      specs: '2U • Стойка #15',
      location: 'Цветочная, СПб',
      power: { used: 0.8, total: 1.2 },
      environment: { temp: 22.1, humidity: 42 },
      bandwidth: '1 Гбит/с',
      serverModel: 'Dell PowerEdge R750',
      price: 4500,
      expiresAt: '1 марта 2025',
      daysLeft: 395,
    },
    {
      id: 4,
      type: 'domain',
      name: 'mysite.ru',
      provider: 'REG.RU',
      status: 'active',
      specs: 'Домен .RU',
      price: 199,
      expiresAt: '10 января 2026',
      daysLeft: 345,
    },
    {
      id: 5,
      type: 'ssl',
      name: 'SSL Wildcard',
      provider: "Let's Encrypt",
      status: 'expiring',
      domain: '*.mysite.ru',
      specs: 'Wildcard сертификат',
      price: 0,
      expiresAt: '5 февраля 2025',
      daysLeft: 6,
    },
  ];

  const sidebarCategories = [
    { id: 'all', label: 'Все услуги', icon: FolderOpen, count: 6 },
    { id: 'vps', label: 'VPS серверы', icon: Server, count: 2 },
    { id: 'colocation', label: 'Colocation', icon: Building2, count: 2 },
    { id: 'cloud', label: 'Облако', icon: Cloud, count: 0 },
    { id: 'database', label: 'Базы данных', icon: Database, count: 0 },
    { id: 'kubernetes', label: 'Kubernetes', icon: Layers, count: 0 },
    { id: 'domain', label: 'Домены', icon: Globe, count: 1 },
    { id: 'ssl', label: 'SSL сертификаты', icon: Shield, count: 1 },
  ];

  const filteredServices = selectedCategory && selectedCategory !== 'all'
    ? userServices.filter(s => s.type === selectedCategory)
    : userServices;

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'vps': return Server;
      case 'colocation': return Building2;
      case 'hosting': return HardDrive;
      case 'domain': return Globe;
      case 'ssl': return Shield;
      default: return Server;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'expiring':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'suspended':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'suspended': return 'Приостановлен';
      default: return 'Неизвестно';
    }
  };

  // Stats
  const totalMonthly = userServices.reduce((sum, s) => sum + s.price, 0);
  const activeCount = userServices.filter(s => s.status === 'active').length;
  const expiringCount = userServices.filter(s => s.status === 'expiring' || s.daysLeft < 14).length;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />}

      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside id="onboarding-sidebar" className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          {/* Order Button - only for users with permission */}
          {permissions.canOrderServices && (
            <div className="p-4 border-b border-border">
              <Button className="w-full gap-2" asChild>
                <Link to="/dashboard/order">
                  <Plus className="w-4 h-4" />
                  Заказать услугу
                </Link>
              </Button>
            </div>
          )}

          {/* Categories */}
          <ScrollArea className="flex-1">
            <nav className="p-2">
              {sidebarCategories.map((category) => {
                const isActive = selectedCategory === category.id || (!selectedCategory && category.id === 'all');
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <category.icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                    <span className="flex-1 text-left">{category.label}</span>
                    {category.count > 0 && (
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                        isActive 
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {category.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Role Switcher */}
          <div className="p-4 border-t border-border">
            <RoleSwitcher />
          </div>

          {/* Help Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={restartOnboarding}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Как пользоваться?</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-6xl mx-auto">
            {/* Stats Grid */}
            <div className={`grid gap-3 md:gap-4 mb-6 md:mb-8 ${permissions.canViewBalance ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
              <Card className="border-0 shadow-sm bg-background">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Активных</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground mt-0.5 md:mt-1">{activeCount}</p>
                    </div>
                    <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10">
                      <Server className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {permissions.canViewBalance && (
                <Card className="border-0 shadow-sm bg-background">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">Расходы/мес</p>
                        <p className="text-xl md:text-2xl font-bold text-foreground mt-0.5 md:mt-1">{totalMonthly.toLocaleString()} ₽</p>
                      </div>
                      <div className="p-2 md:p-3 rounded-xl bg-primary/10">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className={`border-0 shadow-sm ${permissions.canViewBalance ? 'col-span-2 sm:col-span-1' : ''} ${expiringCount > 0 ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-background'}`}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Скоро истекают</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground mt-0.5 md:mt-1">{expiringCount}</p>
                    </div>
                    <div className={`p-2 md:p-3 rounded-xl ${expiringCount > 0 ? 'bg-amber-500/20' : 'bg-muted'}`}>
                      <Calendar className={`w-4 h-4 md:w-5 md:h-5 ${expiringCount > 0 ? 'text-amber-600' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden mb-4 md:mb-6">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {sidebarCategories.map((category) => {
                    const isActive = selectedCategory === category.id || (!selectedCategory && category.id === 'all');
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                        className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'bg-background text-foreground border border-border hover:border-primary/50'
                        }`}
                      >
                        <category.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="hidden xs:inline">{category.label}</span>
                        <span className="xs:hidden">{category.label.split(' ')[0]}</span>
                        {category.count > 0 && (
                          <span className={`text-xs ${isActive ? 'opacity-80' : 'text-muted-foreground'}`}>
                            ({category.count})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Services Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-semibold text-foreground">
                {selectedCategory 
                  ? sidebarCategories.find(c => c.id === selectedCategory)?.label 
                  : 'Все услуги'}
              </h2>
              <Button variant="outline" size="sm" className="gap-1.5 md:gap-2 text-xs md:text-sm lg:hidden" asChild>
                <Link to="/dashboard/order">
                  <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden xs:inline">Заказать</span>
                  <span className="xs:hidden">+</span>
                </Link>
              </Button>
            </div>

            {/* Services List */}
            <div id="onboarding-services" className="space-y-2 md:space-y-3">
              {filteredServices.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-8 md:p-12 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Server className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Услуг пока нет</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 max-w-sm mx-auto">
                      Закажите вашу первую услугу и начните использовать мощности облака
                    </p>
                    <Button asChild size="sm" className="md:text-base md:px-4 md:py-2">
                      <Link to="/dashboard/order">
                        <Plus className="w-4 h-4 mr-2" />
                        Заказать услугу
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredServices.map((service) => {
                  const Icon = getServiceIcon(service.type);
                  return (
                    <Link 
                      key={`${service.type}-${service.id}`} 
                      to={
                        service.type === 'vps' ? `/dashboard/server/${service.id}` : 
                        service.type === 'colocation' ? `/dashboard/colocation/${service.id}` : 
                        service.type === 'domain' ? `/dashboard/domain/${service.id}` :
                        '#'
                      }
                      className="block"
                    >
                      <Card 
                        className="border-0 shadow-sm hover:shadow-md transition-all bg-background group cursor-pointer"
                      >
                        <CardContent className="p-0">
                        <div className="flex items-stretch">
                          {/* Left accent */}
                          <div className={`w-1 rounded-l-lg shrink-0 ${
                            service.status === 'active' ? 'bg-emerald-500' :
                            service.status === 'expiring' ? 'bg-amber-500' : 'bg-red-500'
                          }`} />

                          <div className="flex-1 p-3 md:p-4 min-w-0">
                            <div className="flex items-start gap-3 md:gap-4">
                              {/* Icon - hidden on very small screens */}
                              <div className={`hidden xs:flex p-2 md:p-3 rounded-xl shrink-0 ${
                                service.type === 'vps' ? 'bg-blue-500/10' :
                                service.type === 'colocation' ? 'bg-amber-500/10' :
                                service.type === 'domain' ? 'bg-emerald-500/10' :
                                'bg-purple-500/10'
                              }`}>
                                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${
                                  service.type === 'vps' ? 'text-blue-600' :
                                  service.type === 'colocation' ? 'text-amber-600' :
                                  service.type === 'domain' ? 'text-emerald-600' :
                                  'text-purple-600'
                                }`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">{service.name}</h3>
                                  <Badge className={`${getStatusStyles(service.status)} border-0 text-[10px] md:text-xs`}>
                                    {getStatusLabel(service.status)}
                                  </Badge>
                                </div>
                                
                                <p className="text-xs md:text-sm text-muted-foreground mb-2 truncate">
                                  {service.provider} • {service.specs}
                                </p>

                                {/* IP Address */}
                                {service.ip && (
                                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                                    <code className="text-[10px] md:text-xs bg-muted px-1.5 md:px-2 py-0.5 md:py-1 rounded-md font-mono text-foreground">
                                      {service.ip}
                                    </code>
                                    <button className="p-0.5 md:p-1 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted">
                                      <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                    </button>
                                  </div>
                                )}

                                {/* VPS Resources */}
                                {service.usage && service.type === 'vps' && (
                                  <div className="grid grid-cols-3 gap-2 md:gap-4 pt-2 md:pt-3 border-t border-border">
                                    <div>
                                      <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
                                        <Cpu className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
                                        <span className="text-[10px] md:text-xs text-muted-foreground">CPU</span>
                                      </div>
                                      <div className="flex items-center gap-1 md:gap-2">
                                        <Progress value={service.usage.cpu} className="h-1 md:h-1.5 flex-1" />
                                        <span className="text-[10px] md:text-xs font-medium text-foreground w-6 md:w-8">{service.usage.cpu}%</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
                                        <MemoryStick className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
                                        <span className="text-[10px] md:text-xs text-muted-foreground">RAM</span>
                                      </div>
                                      <div className="flex items-center gap-1 md:gap-2">
                                        <Progress value={service.usage.ram} className="h-1 md:h-1.5 flex-1" />
                                        <span className="text-[10px] md:text-xs font-medium text-foreground w-6 md:w-8">{service.usage.ram}%</span>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
                                        <HardDriveDownload className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
                                        <span className="text-[10px] md:text-xs text-muted-foreground">Диск</span>
                                      </div>
                                      <div className="flex items-center gap-1 md:gap-2">
                                        <Progress value={service.usage.disk} className="h-1 md:h-1.5 flex-1" />
                                        <span className="text-[10px] md:text-xs font-medium text-foreground w-6 md:w-8">{service.usage.disk}%</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Colocation Resources */}
                                {service.type === 'colocation' && (
                                  <div className="pt-2 md:pt-3 border-t border-border">
                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                                      <MapPin className="w-3 h-3" />
                                      <span>{service.location}</span>
                                      <span className="mx-1">•</span>
                                      <Network className="w-3 h-3" />
                                      <span>{service.bandwidth}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                                      {/* Power consumption */}
                                      {service.power && (
                                        <div className="bg-muted/50 rounded-lg p-2">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Zap className="w-3 h-3 text-amber-500" />
                                            <span className="text-[10px] text-muted-foreground">Мощность</span>
                                          </div>
                                          <div className="text-xs font-medium text-foreground">
                                            {service.power.used} / {service.power.total} кВт
                                          </div>
                                          <Progress 
                                            value={(service.power.used / service.power.total) * 100} 
                                            className="h-1 mt-1" 
                                          />
                                        </div>
                                      )}
                                      
                                      {/* Units (for rack type) */}
                                      {service.subtype === 'rack' && service.units && (
                                        <div className="bg-muted/50 rounded-lg p-2">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Box className="w-3 h-3 text-blue-500" />
                                            <span className="text-[10px] text-muted-foreground">Юниты</span>
                                          </div>
                                          <div className="text-xs font-medium text-foreground">
                                            {service.units.used} / {service.units.total} U
                                          </div>
                                          <Progress 
                                            value={(service.units.used / service.units.total) * 100} 
                                            className="h-1 mt-1" 
                                          />
                                        </div>
                                      )}
                                      
                                      {/* Server model (for server type) */}
                                      {service.subtype === 'server' && service.serverModel && (
                                        <div className="bg-muted/50 rounded-lg p-2">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Server className="w-3 h-3 text-blue-500" />
                                            <span className="text-[10px] text-muted-foreground">Сервер</span>
                                          </div>
                                          <div className="text-xs font-medium text-foreground truncate">
                                            {service.serverModel}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Temperature */}
                                      {service.environment && (
                                        <div className="bg-muted/50 rounded-lg p-2">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Thermometer className="w-3 h-3 text-red-400" />
                                            <span className="text-[10px] text-muted-foreground">Темп.</span>
                                          </div>
                                          <div className="text-xs font-medium text-foreground">
                                            {service.environment.temp}°C
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Humidity */}
                                      {service.environment && (
                                        <div className="bg-muted/50 rounded-lg p-2">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Droplets className="w-3 h-3 text-cyan-500" />
                                            <span className="text-[10px] text-muted-foreground">Влажн.</span>
                                          </div>
                                          <div className="text-xs font-medium text-foreground">
                                            {service.environment.humidity}%
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Right side - Price & Actions */}
                              <div className="text-right shrink-0 ml-2">
                                <div className="flex items-center gap-1 text-[10px] md:text-sm text-muted-foreground mb-0.5 md:mb-1 justify-end">
                                  <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                  <span>{service.daysLeft} дн.</span>
                                </div>
                                {permissions.canViewBalance ? (
                                  <>
                                    <div className="font-semibold text-foreground text-xs md:text-base">
                                      {service.price > 0 ? `${service.price.toLocaleString()} ₽` : 'Бесплатно'}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground hidden md:inline">/мес</span>
                                  </>
                                ) : (
                                  <div className="text-xs text-muted-foreground">—</div>
                                )}
                                
                                <div className="flex items-center gap-1 mt-2 md:mt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity justify-end">
                                  {service.type === 'vps' && (
                                    <>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                                        <Power className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 hidden sm:flex">
                                        <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                      </Button>
                                    </>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                                        <MoreVertical className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem className="gap-2">
                                        <ArrowUpRight className="w-4 h-4" />
                                        Открыть
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="gap-2">
                                        <RefreshCw className="w-4 h-4" />
                                        Продлить
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="gap-2 text-destructive">
                                        Удалить
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
