import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  Server,
  Copy,
  Check,
  Globe,
  Settings,
  Zap,
  Network,
  BarChart3,
  History,
  Monitor,
  Thermometer,
  Activity,
  Clock,
  Building2,
  Plug,
  Fan,
  Wrench,
  Phone,
  CheckCircle2,
  XCircle,
  Plus,
  AlertTriangle,
  Cpu,
  MemoryStick,
  HardDrive,
  RefreshCw,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const sidebarSections = [
  { id: 'overview', label: 'Обзор', icon: BarChart3 },
  { id: 'equipment', label: 'Оборудование', icon: Server },
  { id: 'network', label: 'Сеть', icon: Network },
  { id: 'power', label: 'Питание', icon: Zap },
  { id: 'services', label: 'Услуги', icon: Wrench },
  { id: 'activity', label: 'История', icon: History },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

type ColocationType = 'rack' | 'server';

interface ColocationData {
  id: number;
  type: ColocationType;
  name: string;
  provider: string;
  datacenter: string;
  status: string;
  location: string;
  rack: string;
  position: string;
  units: number;
  totalUnits: number;
  contractNumber: string;
  contractStart: string;
  contractEnd: string;
  daysLeft: number;
  powerAllocated: number;
  powerUsed: number;
  powerCircuits: number;
  uplinkSpeed: string;
  trafficIncluded: string;
  trafficUsed: number;
  ipv4Count: number;
  ipv4Addresses: string[];
  ipv6Prefix: string;
  temperature: number;
  humidity: number;
  monthlyPrice: number;
  equipment: { id: number; name: string; type: string; units: number; serial: string }[];
  serverModel?: string;
  serverSerial?: string;
  cpu?: string;
  ram?: string;
  storage?: string;
}

const mockRackColocation: ColocationData = {
  id: 1,
  type: 'rack',
  name: 'Стойка #42',
  provider: 'DataLine',
  datacenter: 'M9',
  status: 'active',
  location: 'Москва, ул. Бутлерова 12',
  rack: '42',
  position: 'Full Rack',
  units: 42,
  totalUnits: 42,
  contractNumber: 'COL-2024-00156',
  contractStart: '15 января 2024',
  contractEnd: '15 января 2025',
  daysLeft: 350,
  powerAllocated: 10,
  powerUsed: 6.8,
  powerCircuits: 2,
  uplinkSpeed: '10 Гбит/с',
  trafficIncluded: '100 TB',
  trafficUsed: 45.2,
  ipv4Count: 16,
  ipv4Addresses: ['185.232.45.120', '185.232.45.121', '185.232.45.122', '185.232.45.123'],
  ipv6Prefix: '2a00:1450:4001:81b::/64',
  temperature: 22,
  humidity: 45,
  monthlyPrice: 85000,
  equipment: [
    { id: 1, name: 'Dell PowerEdge R750', type: 'Сервер', units: 2, serial: 'SN-R750-001' },
    { id: 2, name: 'Dell PowerEdge R750', type: 'Сервер', units: 2, serial: 'SN-R750-002' },
    { id: 3, name: 'Cisco Nexus 9300', type: 'Коммутатор', units: 1, serial: 'SN-N9300-001' },
    { id: 4, name: 'APC Smart-UPS', type: 'ИБП', units: 3, serial: 'SN-UPS-001' },
  ],
};

const mockServerColocation: ColocationData = {
  id: 3,
  type: 'server',
  name: 'Dell R750 #1',
  provider: 'Selectel',
  datacenter: 'Цветочная',
  status: 'active',
  location: 'Санкт-Петербург',
  rack: '15',
  position: 'U12-U13',
  units: 2,
  totalUnits: 42,
  contractNumber: 'COL-2024-00892',
  contractStart: '1 марта 2024',
  contractEnd: '1 марта 2025',
  daysLeft: 395,
  powerAllocated: 0.5,
  powerUsed: 0.35,
  powerCircuits: 2,
  uplinkSpeed: '1 Гбит/с',
  trafficIncluded: '30 TB',
  trafficUsed: 8.3,
  ipv4Count: 1,
  ipv4Addresses: ['91.108.45.67'],
  ipv6Prefix: '2a00:1450:4002::/64',
  temperature: 21,
  humidity: 48,
  monthlyPrice: 4500,
  equipment: [],
  serverModel: 'Dell PowerEdge R750',
  serverSerial: 'SN-R750-003',
  cpu: '2x Intel Xeon Gold 6348 (56 cores)',
  ram: '256 GB DDR4 ECC',
  storage: '4x 1.92TB NVMe SSD',
};

const mockActivity = [
  { id: 1, action: 'Визит инженера', date: '28 янв 2025, 14:30', status: 'success', details: 'Замена диска SSD 2TB' },
  { id: 2, action: 'Обращение в поддержку', date: '25 янв 2025, 10:15', status: 'success', details: 'Запрос на доп. IP' },
  { id: 3, action: 'Оплата услуг', date: '15 янв 2025, 00:00', status: 'success', details: '15 000 ₽' },
  { id: 4, action: 'Перезагрузка по питанию', date: '10 янв 2025, 03:22', status: 'warning', details: 'Сработал UPS' },
];

const ColocationManagePage = () => {
  const { colocationId } = useParams();
  const { addNotification } = useNotifications();
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const colocation = colocationId === '3' ? mockServerColocation : mockRackColocation;
  const isServerType = colocation.type === 'server';
  
  const [isMonitoringModalOpen, setIsMonitoringModalOpen] = useState(false);
  const [isKvmModalOpen, setIsKvmModalOpen] = useState(false);
  const [isRemoteHandsModalOpen, setIsRemoteHandsModalOpen] = useState(false);
  const [kvmDuration, setKvmDuration] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const [services, setServices] = useState({
    monitoring: false,
    kvmAccess: false,
    remoteHands: true,
    backupPower: true,
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleEnableMonitoring = () => {
    setIsLoading(true);
    toast.loading('Подключение мониторинга...', { id: 'monitoring-action' });
    setTimeout(() => {
      setServices(prev => ({ ...prev, monitoring: true }));
      setIsMonitoringModalOpen(false);
      setIsLoading(false);
      toast.success('Мониторинг успешно подключён', { id: 'monitoring-action' });
      addNotification({
        title: 'Мониторинг подключён',
        description: `${colocation.name}: мониторинг 24/7 активирован`,
        type: 'success',
      });
    }, 2000);
  };

  const handleEnableKvm = () => {
    setIsLoading(true);
    toast.loading('Активация KVM доступа...', { id: 'kvm-action' });
    setTimeout(() => {
      setServices(prev => ({ ...prev, kvmAccess: true }));
      setIsKvmModalOpen(false);
      setIsLoading(false);
      toast.success('KVM доступ активирован', { id: 'kvm-action' });
      addNotification({
        title: 'KVM подключён',
        description: `${colocation.name}: удалённый доступ к консоли активирован`,
        type: 'success',
      });
    }, 2000);
  };

  const handleRequestRemoteHands = () => {
    setIsLoading(true);
    toast.loading('Создание заявки...', { id: 'remote-hands-action' });
    setTimeout(() => {
      setIsRemoteHandsModalOpen(false);
      setIsLoading(false);
      toast.success('Заявка создана, ожидайте звонка', { id: 'remote-hands-action' });
      addNotification({
        title: 'Заявка создана',
        description: `Remote Hands для ${colocation.name}`,
        type: 'info',
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'pending': return 'Ожидание';
      case 'suspended': return 'Приостановлен';
      default: return 'Неизвестно';
    }
  };

  const kvmPrices = [
    { value: '1', label: '1 мес', price: 1500 },
    { value: '3', label: '3 мес', price: 4050, discount: 10 },
    { value: '6', label: '6 мес', price: 7650, discount: 15 },
    { value: '12', label: '12 мес', price: 14400, discount: 20 },
  ];

  const selectedKvmPeriod = kvmPrices.find(p => p.value === kvmDuration) || kvmPrices[0];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Environment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-blue-500/10">
                        <Thermometer className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Температура</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{colocation.temperature}°C</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Progress value={(colocation.temperature / 30) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Норма: 18-24°C</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-cyan-500/10">
                        <Fan className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Влажность</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{colocation.humidity}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Progress value={colocation.humidity} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Норма: 40-60%</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-amber-500/10">
                        <Zap className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Питание</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{colocation.powerUsed} кВт</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Progress value={(colocation.powerUsed / colocation.powerAllocated) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Лимит: {colocation.powerAllocated} кВт</p>
                </CardContent>
              </Card>
            </div>

            {/* Contract info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Договор до:</span>
              <span className="text-sm font-medium text-foreground">{colocation.contractEnd}</span>
              <Badge variant="outline" className="ml-auto bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                {colocation.daysLeft} дней
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Location Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Информация о размещении</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Дата-центр</span>
                    <span className="text-sm font-medium">{colocation.provider} / {colocation.datacenter}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Адрес</span>
                    <span className="text-sm font-medium">{colocation.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Стойка</span>
                    <span className="text-sm font-medium">#{colocation.rack}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Позиция</span>
                    <span className="text-sm font-medium">{colocation.position} ({colocation.units}U)</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Договор</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{colocation.contractNumber}</code>
                  </div>
                </CardContent>
              </Card>

              {/* Server Info (for server type) or Quick Services */}
              {isServerType ? (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Характеристики сервера</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Модель</span>
                      </div>
                      <span className="text-sm font-medium">{colocation.serverModel}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Процессор</span>
                      </div>
                      <span className="text-sm font-medium">{colocation.cpu}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Память</span>
                      </div>
                      <span className="text-sm font-medium">{colocation.ram}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Накопители</span>
                      </div>
                      <span className="text-sm font-medium">{colocation.storage}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Подключённые услуги</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${services.monitoring ? 'bg-emerald-500/5 border border-emerald-500/30' : 'bg-muted/30 border border-border'}`}>
                      <div className="flex items-center gap-2">
                        {services.monitoring ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm font-medium">Мониторинг 24/7</span>
                      </div>
                      {!services.monitoring ? (
                        <Button size="sm" variant="outline" onClick={() => setIsMonitoringModalOpen(true)}>Подключить</Button>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0">Активен</Badge>
                      )}
                    </div>

                    <div className={`flex items-center justify-between p-3 rounded-lg ${services.kvmAccess ? 'bg-emerald-500/5 border border-emerald-500/30' : 'bg-muted/30 border border-border'}`}>
                      <div className="flex items-center gap-2">
                        {services.kvmAccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm font-medium">KVM over IP</span>
                      </div>
                      {!services.kvmAccess ? (
                        <Button size="sm" variant="outline" onClick={() => setIsKvmModalOpen(true)}>Подключить</Button>
                      ) : (
                        <Button size="sm" variant="outline">Открыть консоль</Button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium">Remote Hands</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setIsRemoteHandsModalOpen(true)}>
                        <Phone className="w-3 h-3 mr-1" />Вызов
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 'equipment':
        return (
          <div className="space-y-6">
            {isServerType ? (
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Ваш сервер</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Server className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-lg">{colocation.serverModel}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {colocation.cpu} • {colocation.ram}
                      </div>
                      <div className="text-sm text-muted-foreground">{colocation.storage}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">S/N</div>
                      <code className="text-sm font-mono">{colocation.serverSerial}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Размещённое оборудование</CardTitle>
                    <Badge variant="outline">{colocation.equipment.reduce((sum, e) => sum + e.units, 0)}U занято</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {colocation.equipment.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Server className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.type} • {item.units}U</div>
                        </div>
                      </div>
                      <code className="text-sm font-mono text-muted-foreground">{item.serial}</code>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Расположение в стойке</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-20 flex flex-col-reverse gap-0.5">
                    {Array.from({ length: Math.min(10, colocation.totalUnits) }, (_, i) => i + 1).map((u) => (
                      <div
                        key={u}
                        className={`h-7 rounded text-xs flex items-center justify-center font-mono ${
                          u <= colocation.units 
                            ? 'bg-primary/20 border border-primary/40 text-primary' 
                            : 'bg-muted/50 border border-border text-muted-foreground'
                        }`}
                      >
                        {u}U
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="text-sm font-medium mb-3">Позиция: {colocation.position}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary/20 border border-primary/40" />
                        <span className="text-muted-foreground">Ваше оборудование</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-muted/50 border border-border" />
                        <span className="text-muted-foreground">Свободно</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'network':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">IP адреса</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {colocation.ipv4Addresses.map((ip, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">IPv4 #{idx + 1}</p>
                      <code className="font-mono text-sm">{ip}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      {idx === 0 && <Badge variant="outline" className="text-xs">Основной</Badge>}
                      <button 
                        onClick={() => copyToClipboard(ip, `ip-${idx}`)}
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                      >
                        {copiedField === `ip-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">IPv6 префикс</p>
                    <code className="font-mono text-sm">{colocation.ipv6Prefix}</code>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(colocation.ipv6Prefix, 'ipv6')}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                  >
                    {copiedField === 'ipv6' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Параметры канала</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Скорость порта</span>
                  </div>
                  <span className="text-sm font-medium">{colocation.uplinkSpeed}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Включённый трафик</span>
                  </div>
                  <span className="text-sm font-medium">{colocation.trafficIncluded}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Использовано</span>
                  </div>
                  <span className="text-sm font-medium">{colocation.trafficUsed} TB</span>
                </div>
                <Progress value={(colocation.trafficUsed / parseFloat(colocation.trafficIncluded)) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>
        );

      case 'power':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{colocation.powerAllocated} кВт</div>
                      <div className="text-xs text-muted-foreground">Выделено</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{colocation.powerUsed} кВт</div>
                      <div className="text-xs text-muted-foreground">Потребление</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Plug className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{colocation.powerCircuits}</div>
                      <div className="text-xs text-muted-foreground">Вводов (A+B)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Резервное питание</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-emerald-600">Резервирование активно</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ИБП + ДГУ обеспечивают бесперебойную работу до 72 часов.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-4">
            {/* PREMIUM: Plooza Smart Hands */}
            <Card className="border-0 shadow-lg relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-blue-600/10">
              {/* Premium badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-blue-500 to-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                  ⭐ PREMIUM
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-primary shadow-lg shadow-primary/25">
                    <Wrench className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-foreground">Plooza Smart Hands</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Полное восстановление и ремонт сервера нашими инженерами
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">от 5 000 ₽</div>
                        <div className="text-xs text-muted-foreground">за работу</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Диагностика неисправностей</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Замена комплектующих</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Восстановление ОС</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Ввод сервера в строй</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button className="bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-primary/90 shadow-lg shadow-primary/25">
                        <Phone className="w-4 h-4 mr-2" />
                        Заказать Smart Hands
                      </Button>
                      <span className="text-xs text-muted-foreground">Ответ в течение 30 минут</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regular services */}
            <div className="pt-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Стандартные услуги</h3>
            </div>

            <Card className={`border-0 shadow-sm ${services.monitoring ? 'ring-1 ring-primary/30' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${services.monitoring ? 'bg-primary/10' : 'bg-muted/50'}`}>
                    <Activity className={`w-6 h-6 ${services.monitoring ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">Мониторинг 24/7</h3>
                        {services.monitoring && <Badge className="bg-emerald-500/10 text-emerald-600 border-0">Активно</Badge>}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">2 000 ₽</div>
                        <div className="text-xs text-muted-foreground">/мес</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Мониторинг состояния оборудования</p>
                    {!services.monitoring ? (
                      <Button size="sm" onClick={() => setIsMonitoringModalOpen(true)}><Plus className="w-4 h-4 mr-1" />Подключить</Button>
                    ) : (
                      <Button size="sm" variant="outline">Открыть дашборд</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-sm ${services.kvmAccess ? 'ring-1 ring-primary/30' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${services.kvmAccess ? 'bg-primary/10' : 'bg-muted/50'}`}>
                    <Monitor className={`w-6 h-6 ${services.kvmAccess ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">KVM over IP</h3>
                        {services.kvmAccess && <Badge className="bg-emerald-500/10 text-emerald-600 border-0">Активно</Badge>}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">1 500 ₽</div>
                        <div className="text-xs text-muted-foreground">/мес</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Удалённый доступ к консоли сервера</p>
                    {!services.kvmAccess ? (
                      <Button size="sm" onClick={() => setIsKvmModalOpen(true)}><Plus className="w-4 h-4 mr-1" />Подключить</Button>
                    ) : (
                      <Button size="sm" variant="outline"><Monitor className="w-4 h-4 mr-1" />Открыть консоль</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <Wrench className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">Remote Hands</h3>
                        <Badge variant="outline" className="text-xs">Базовый</Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">от 500 ₽</div>
                        <div className="text-xs text-muted-foreground">за вызов</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Простые операции: перезагрузка, подключение кабелей, фото
                    </p>
                    <Button size="sm" variant="outline" onClick={() => setIsRemoteHandsModalOpen(true)}>
                      <Phone className="w-4 h-4 mr-1" />Заказать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'activity':
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">История событий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{item.action}</div>
                      <div className="text-xs text-muted-foreground">{item.details}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Контакты дата-центра</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Телефон поддержки</span>
                  <span className="text-sm font-medium">+7 (495) 123-45-67</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">support@{colocation.provider.toLowerCase()}.ru</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="text-base text-red-600">Опасная зона</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" size="sm">Расторгнуть договор</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Оборудование нужно забрать в течение 14 дней.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          <div className="p-4 border-b border-border">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Все услуги
            </Link>
          </div>
          
          <ScrollArea className="flex-1">
            <nav className="p-3">
              {sidebarSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <section.icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                    <span className="text-left">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Mobile back */}
            <div className="lg:hidden mb-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Все услуги
              </Link>
            </div>

            {/* Header Card */}
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${isServerType ? 'bg-blue-500/10' : 'bg-amber-500/10'}`}>
                      {isServerType ? (
                        <Server className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-foreground">{colocation.name}</h1>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(colocation.status)} ${colocation.status === 'active' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm text-muted-foreground">{getStatusLabel(colocation.status)}</span>
                        <span className="text-muted-foreground mx-1">·</span>
                        <span className="text-sm text-muted-foreground">{colocation.provider} / {colocation.datacenter}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Button variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Продлить</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile nav */}
            <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
              {sidebarSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'bg-background text-foreground border border-border hover:border-primary/50'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>

            {renderContent()}
          </div>
        </main>
      </div>

      {/* Monitoring Modal */}
      <Dialog open={isMonitoringModalOpen} onOpenChange={setIsMonitoringModalOpen}>
        <DialogContent className="max-w-md max-h-[calc(100vh-2rem)] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Подключить мониторинг
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="font-medium mb-2">Что включено:</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Ping/HTTP мониторинг</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />SNMP метрики</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Уведомления в Telegram</li>
              </ul>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-medium">Стоимость</span>
              <span className="text-xl font-bold text-primary">2 000 ₽/мес</span>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsMonitoringModalOpen(false)}>Отмена</Button>
            <Button onClick={handleEnableMonitoring} disabled={isLoading}>
              {isLoading ? 'Подключение...' : 'Подключить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* KVM Modal */}
      <Dialog open={isKvmModalOpen} onOpenChange={setIsKvmModalOpen}>
        <DialogContent className="max-w-md max-h-[calc(100vh-2rem)] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Подключить KVM
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="font-medium mb-2">Возможности:</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Доступ через браузер</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Монтирование ISO</li>
              </ul>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Период</Label>
              <div className="grid grid-cols-4 gap-2">
                {kvmPrices.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => setKvmDuration(period.value)}
                    className={`relative p-2 rounded-lg border text-center transition-all ${
                      kvmDuration === period.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {period.discount && (
                      <div className="absolute -top-2 -right-1 px-1 py-0.5 rounded-full bg-emerald-500 text-white text-[10px]">
                        -{period.discount}%
                      </div>
                    )}
                    <div className="text-xs font-medium">{period.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-medium">Итого</span>
              <span className="text-xl font-bold text-primary">{selectedKvmPeriod.price.toLocaleString()} ₽</span>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsKvmModalOpen(false)}>Отмена</Button>
            <Button onClick={handleEnableKvm} disabled={isLoading}>
              {isLoading ? 'Активация...' : `Оплатить ${selectedKvmPeriod.price.toLocaleString()} ₽`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remote Hands Modal */}
      <Dialog open={isRemoteHandsModalOpen} onOpenChange={setIsRemoteHandsModalOpen}>
        <DialogContent className="max-w-md max-h-[calc(100vh-2rem)] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Remote Hands
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="font-medium mb-2">Услуги инженера:</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Перезагрузка сервера</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Замена комплектующих</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Фотоотчёт</li>
              </ul>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Опишите задачу</Label>
              <textarea
                className="w-full min-h-[80px] p-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Например: нужно перезагрузить сервер..."
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-medium">Стоимость</span>
              <span className="text-xl font-bold text-primary">от 500 ₽</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm text-amber-600">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Инженер свяжется для уточнения деталей</span>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsRemoteHandsModalOpen(false)}>Отмена</Button>
            <Button onClick={handleRequestRemoteHands} disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColocationManagePage;
