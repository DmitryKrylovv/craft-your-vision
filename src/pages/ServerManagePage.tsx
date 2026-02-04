import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChevronLeft,
  Server,
  Power,
  RotateCcw,
  Square,
  Play,
  Terminal,
  Copy,
  Check,
  Cpu,
  MemoryStick,
  HardDrive,
  Globe,
  Shield,
  Download,
  Upload,
  Trash2,
  Plus,
  Settings,
  AlertTriangle,
  RefreshCw,
  Zap,
  Network,
  Timer,
  BarChart3,
  History,
  Camera,
  Archive,
  FolderOpen,
  ExternalLink,
  Wallet,
  CreditCard,
  Info,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const sidebarSections = [
  { id: 'overview', label: 'Обзор', icon: BarChart3 },
  { id: 'network', label: 'Сеть', icon: Network },
  { id: 'backups', label: 'Бэкапы', icon: Archive },
  { id: 'snapshots', label: 'Снапшоты', icon: Camera },
  { id: 'activity', label: 'История', icon: History },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

const mockServer = {
  id: 1,
  name: 'VPS Pro #1',
  provider: 'TimeWeb',
  status: 'running',
  ip: '185.232.45.123',
  ipv6: '2a00:1450:4001:81b::200e',
  hostname: 'vps-pro-1.example.com',
  os: 'Ubuntu 22.04 LTS',
  osIcon: '🐧',
  location: 'Москва, Россия',
  datacenter: 'M9',
  specs: {
    cpu: 4,
    ram: 8,
    disk: 160,
    diskType: 'NVMe SSD',
    bandwidth: 'Безлимит',
    speed: '1 Гбит/с',
  },
  usage: {
    cpu: 34,
    ram: 62,
    disk: 45,
    networkIn: 156.7,
    networkOut: 89.3,
  },
  price: 890,
  createdAt: '15 декабря 2024',
  expiresAt: '15 февраля 2025',
  daysLeft: 16,
  uptime: '23 дня 14 часов',
  lastReboot: '7 января 2025, 14:32',
};

// Mock data for charts - last 24 hours
const generateChartData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: `${time.getHours().toString().padStart(2, '0')}:00`,
      cpu: Math.floor(20 + Math.random() * 40 + (i < 8 ? 15 : 0)),
      ram: Math.floor(50 + Math.random() * 25),
      disk: Math.floor(42 + Math.random() * 8),
    });
  }
  return data;
};

const chartData = generateChartData();

const mockBackups = [
  { id: 1, name: 'backup-2025-01-28', date: '28 янв 2025, 03:00', size: '12.4 GB', type: 'auto' },
  { id: 2, name: 'backup-2025-01-21', date: '21 янв 2025, 03:00', size: '11.8 GB', type: 'auto' },
  { id: 3, name: 'before-update', date: '15 янв 2025, 18:45', size: '11.2 GB', type: 'manual' },
];

const mockSnapshots = [
  { id: 1, name: 'clean-install', date: '20 дек 2024, 10:00', size: '8.2 GB' },
  { id: 2, name: 'after-nginx-setup', date: '22 дек 2024, 15:30', size: '9.1 GB' },
];

const mockActivity = [
  { id: 1, action: 'Перезагрузка', date: '30 янв 2025, 10:15', status: 'success', user: 'Иван' },
  { id: 2, action: 'Изменение DNS', date: '28 янв 2025, 14:30', status: 'success', user: 'Иван' },
  { id: 3, action: 'Создание бэкапа', date: '28 янв 2025, 03:00', status: 'success', user: 'Система' },
  { id: 4, action: 'Обновление ОС', date: '25 янв 2025, 16:45', status: 'success', user: 'Иван' },
  { id: 5, action: 'Неудачный вход SSH', date: '24 янв 2025, 22:10', status: 'warning', user: '91.108.12.45' },
];

const ServerManagePage = () => {
  const { serverId } = useParams();
  const { addNotification } = useNotifications();
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPowerLoading, setIsPowerLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(mockServer.status);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [renewPeriod, setRenewPeriod] = useState('1');
  const [isRenewLoading, setIsRenewLoading] = useState(false);
  const [isHourlyBilling, setIsHourlyBilling] = useState(false);

  // Calculate hourly rate (monthly / 720 hours)
  const hourlyRate = (mockServer.price / 720).toFixed(2);

  const renewalPeriods = [
    { value: '1', label: '1 месяц', price: mockServer.price, discount: 0 },
    { value: '3', label: '3 месяца', price: mockServer.price * 3 * 0.95, discount: 5 },
    { value: '6', label: '6 месяцев', price: mockServer.price * 6 * 0.9, discount: 10 },
    { value: '12', label: '12 месяцев', price: mockServer.price * 12 * 0.85, discount: 15 },
  ];

  const selectedPeriod = renewalPeriods.find(p => p.value === renewPeriod) || renewalPeriods[0];

  const handleRenew = () => {
    setIsRenewLoading(true);
    
    if (isHourlyBilling) {
      toast.loading('Активация почасовой оплаты...', { id: 'renew-action' });
    } else {
      toast.loading('Обработка платежа...', { id: 'renew-action' });
    }
    
    setTimeout(() => {
      setIsRenewLoading(false);
      setIsRenewModalOpen(false);
      
      if (isHourlyBilling) {
        toast.success('Почасовая оплата активирована', { id: 'renew-action' });
        addNotification({
          title: 'Почасовая оплата активирована',
          description: `${mockServer.name} переведён на почасовую оплату`,
          type: 'success',
        });
      } else {
        toast.success(`${mockServer.name} продлён на ${selectedPeriod.label}`, { id: 'renew-action' });
        addNotification({
          title: 'Сервер продлён',
          description: `${mockServer.name} продлён на ${selectedPeriod.label}`,
          type: 'success',
        });
      }
    }, 2000);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePowerAction = (action: string) => {
    setIsPowerLoading(true);
    
    // Show "in progress" toast
    if (action === 'stop') {
      toast.loading(`${mockServer.name} выключается...`, { id: 'power-action' });
    } else if (action === 'start') {
      toast.loading(`${mockServer.name} включается...`, { id: 'power-action' });
    } else if (action === 'restart') {
      toast.loading(`${mockServer.name} перезагружается...`, { id: 'power-action' });
    }

    setTimeout(() => {
      if (action === 'stop') {
        setServerStatus('stopped');
        toast.success(`${mockServer.name} выключен`, { id: 'power-action' });
        addNotification({
          title: 'Сервер выключен',
          description: `${mockServer.name} успешно остановлен`,
          type: 'info',
        });
      } else if (action === 'start') {
        setServerStatus('running');
        toast.success(`${mockServer.name} включён`, { id: 'power-action' });
        addNotification({
          title: 'Сервер включён',
          description: `${mockServer.name} успешно запущен`,
          type: 'success',
        });
      } else if (action === 'restart') {
        setServerStatus('running');
        toast.success(`${mockServer.name} перезагружен`, { id: 'power-action' });
        addNotification({
          title: 'Сервер перезагружен',
          description: `${mockServer.name} успешно перезагружен`,
          type: 'success',
        });
      }
      setIsPowerLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-emerald-500';
      case 'stopped': return 'bg-red-500';
      case 'restarting': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running': return 'Работает';
      case 'stopped': return 'Остановлен';
      case 'restarting': return 'Перезагрузка';
      default: return 'Неизвестно';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Statistics Section - Separate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CPU Card */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-blue-500/10">
                        <Cpu className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">CPU</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{mockServer.usage.cpu}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                          interval={5}
                        />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value: number) => [`${value}%`, 'CPU']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="cpu" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          fill="url(#cpuGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* RAM Card */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-purple-500/10">
                        <MemoryStick className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">RAM</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{mockServer.usage.ram}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="ramGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                          interval={5}
                        />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value: number) => [`${value}%`, 'RAM']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="ram" 
                          stroke="#a855f7" 
                          strokeWidth={2}
                          fill="url(#ramGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Disk Card */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-amber-500/10">
                        <HardDrive className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Диск</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{mockServer.usage.disk}%</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="diskGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                          interval={5}
                        />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value: number) => [`${value}%`, 'Диск']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="disk" 
                          stroke="#f59e0b" 
                          strokeWidth={2}
                          fill="url(#diskGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Uptime info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Uptime:</span>
              <span className="text-sm font-medium text-foreground">{mockServer.uptime}</span>
              <span className="text-xs text-muted-foreground ml-auto">Последние 24 часа</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Server Info */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Информация о сервере</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">IP адрес</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{mockServer.ip}</code>
                      <button 
                        onClick={() => copyToClipboard(mockServer.ip, 'ip')}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        {copiedField === 'ip' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hostname</span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono text-xs">{mockServer.hostname}</code>
                      <button 
                        onClick={() => copyToClipboard(mockServer.hostname, 'hostname')}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        {copiedField === 'hostname' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Операционная система</span>
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span>{mockServer.osIcon}</span>
                      {mockServer.os}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Дата-центр</span>
                    <span className="text-sm font-medium">{mockServer.datacenter}, {mockServer.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Создан</span>
                    <span className="text-sm font-medium">{mockServer.createdAt}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Specs */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Конфигурация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Процессор</span>
                    </div>
                    <span className="text-sm font-medium">{mockServer.specs.cpu} vCPU</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Оперативная память</span>
                    </div>
                    <span className="text-sm font-medium">{mockServer.specs.ram} GB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Диск</span>
                    </div>
                    <span className="text-sm font-medium">{mockServer.specs.disk} GB {mockServer.specs.diskType}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Скорость порта</span>
                    </div>
                    <span className="text-sm font-medium">{mockServer.specs.speed}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Трафик</span>
                    </div>
                    <span className="text-sm font-medium">{mockServer.specs.bandwidth}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">IPv4</p>
                    <code className="font-mono text-sm">{mockServer.ip}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Основной</Badge>
                    <button 
                      onClick={() => copyToClipboard(mockServer.ip, 'ipv4')}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                    >
                      {copiedField === 'ipv4' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">IPv6</p>
                    <code className="font-mono text-xs">{mockServer.ipv6}</code>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(mockServer.ipv6, 'ipv6')}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                  >
                    {copiedField === 'ipv6' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить IP адрес
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Трафик за текущий период</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Download className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Входящий</p>
                      <p className="font-semibold text-foreground">{mockServer.usage.networkIn} GB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground text-right">Исходящий</p>
                      <p className="font-semibold text-foreground">{mockServer.usage.networkOut} GB</p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Upload className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="text-center text-sm text-muted-foreground">
                  Лимит: {mockServer.specs.bandwidth}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Защита от DDoS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-medium text-foreground">Защита активна</p>
                      <p className="text-sm text-muted-foreground">Базовая защита L3/L4 включена</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'backups':
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Резервные копии</CardTitle>
                  <CardDescription>Автоматические бэкапы каждую неделю</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Создать бэкап
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBackups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-background">
                        <Archive className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{backup.name}</p>
                        <p className="text-sm text-muted-foreground">{backup.date} • {backup.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={backup.type === 'auto' ? 'secondary' : 'outline'} className="text-xs">
                        {backup.type === 'auto' ? 'Авто' : 'Ручной'}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Восстановить
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="w-4 h-4" />
                            Скачать
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'snapshots':
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Снапшоты</CardTitle>
                  <CardDescription>Мгновенные снимки состояния сервера</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Создать снапшот
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSnapshots.map((snapshot) => (
                  <div key={snapshot.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-background">
                        <Camera className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{snapshot.name}</p>
                        <p className="text-sm text-muted-foreground">{snapshot.date} • {snapshot.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Восстановить
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'activity':
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">История действий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {mockActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'success' ? 'bg-emerald-500' : 
                      item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Основные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="server-name">Название сервера</Label>
                  <Input id="server-name" defaultValue={mockServer.name} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="hostname">Hostname</Label>
                  <Input id="hostname" defaultValue={mockServer.hostname} className="mt-1.5" />
                </div>
                <Button className="w-full">Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Автоматическое резервное копирование</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Включено</p>
                    <p className="text-sm text-muted-foreground">Бэкапы создаются еженедельно</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label>Расписание</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm lg:col-span-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-base text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Опасная зона
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                  <div>
                    <p className="font-medium">Переустановить ОС</p>
                    <p className="text-sm text-muted-foreground">Все данные будут удалены</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Переустановить</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Переустановка ОС</DialogTitle>
                        <DialogDescription>
                          Выберите операционную систему для установки. Все текущие данные будут удалены.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Select defaultValue="ubuntu-22">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ubuntu-22">Ubuntu 22.04 LTS</SelectItem>
                            <SelectItem value="ubuntu-24">Ubuntu 24.04 LTS</SelectItem>
                            <SelectItem value="debian-12">Debian 12</SelectItem>
                            <SelectItem value="centos-9">CentOS Stream 9</SelectItem>
                            <SelectItem value="rocky-9">Rocky Linux 9</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="destructive">Переустановить</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                  <div>
                    <p className="font-medium text-destructive">Удалить сервер</p>
                    <p className="text-sm text-muted-foreground">Это действие нельзя отменить</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Удалить</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить сервер?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Это действие нельзя отменить. Все данные, включая бэкапы и снапшоты, будут безвозвратно удалены.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Удалить навсегда
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
        {/* Sidebar - Navigation Only */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          {/* Back link */}
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
            {/* Mobile Header with back link */}
            <div className="lg:hidden mb-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Все услуги
              </Link>
            </div>

            {/* Server Info & Payment Card - Top Block */}
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Server Name & Status */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10">
                      <Server className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-foreground">{mockServer.name}</h1>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(serverStatus)} ${serverStatus === 'running' ? 'animate-pulse' : ''}`} />
                        <span className="text-sm text-muted-foreground">{getStatusLabel(serverStatus)}</span>
                        <span className="text-muted-foreground mx-1">·</span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=timeweb.com&sz=16`} 
                            alt={mockServer.provider}
                            className="w-4 h-4 rounded"
                          />
                          {mockServer.provider}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Dialog open={isRenewModalOpen} onOpenChange={setIsRenewModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <RefreshCw className="w-4 h-4" />
                          <span className="hidden sm:inline">Продлить</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[425px] max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
                        <DialogHeader className="flex-shrink-0">
                          <DialogTitle>Продление сервера</DialogTitle>
                          <DialogDescription>
                            Выберите тип и период оплаты
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex-1 overflow-y-auto space-y-3 py-2 -mx-6 px-6">
                          {/* Server info */}
                          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <Server className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm text-foreground truncate">{mockServer.name}</p>
                              <p className="text-xs text-muted-foreground">{mockServer.specs.cpu} vCPU · {mockServer.specs.ram} GB · {mockServer.specs.disk} GB</p>
                            </div>
                          </div>

                          {/* Billing type toggle */}
                          <div className="space-y-2">
                            <Label className="text-xs">Тип оплаты</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setIsHourlyBilling(false)}
                                className={`p-2.5 rounded-lg border text-left transition-all ${
                                  !isHourlyBilling
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <CreditCard className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-sm font-medium text-foreground">Фиксированный</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Оплата за период</p>
                              </button>
                              <button
                                onClick={() => setIsHourlyBilling(true)}
                                className={`p-2.5 rounded-lg border text-left transition-all ${
                                  isHourlyBilling
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <Timer className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-sm font-medium text-foreground">Почасовая</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{hourlyRate} ₽/час</p>
                              </button>
                            </div>
                          </div>

                          {!isHourlyBilling ? (
                            <>
                              {/* Period selection */}
                              <div className="space-y-2">
                                <Label className="text-xs">Период</Label>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {renewalPeriods.map((period) => (
                                    <button
                                      key={period.value}
                                      onClick={() => setRenewPeriod(period.value)}
                                      className={`p-2 rounded-lg border text-center transition-all ${
                                        renewPeriod === period.value
                                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                          : 'border-border hover:border-primary/50'
                                      }`}
                                    >
                                      <span className="text-sm font-medium text-foreground block">{period.label.split(' ')[0]}</span>
                                      <span className="text-[10px] text-muted-foreground">{period.label.split(' ')[1]}</span>
                                      {period.discount > 0 && (
                                        <span className="text-[10px] text-emerald-600 block">-{period.discount}%</span>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Payment summary */}
                              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Стоимость</span>
                                  <span className="text-foreground">{mockServer.price} ₽ × {renewPeriod} мес</span>
                                </div>
                                {selectedPeriod.discount > 0 && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Скидка</span>
                                    <span className="text-emerald-600">-{selectedPeriod.discount}%</span>
                                  </div>
                                )}
                                <Separator />
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground">Итого</span>
                                  <span className="text-lg font-bold text-foreground">{Math.round(selectedPeriod.price)} ₽</span>
                                </div>
                              </div>

                              {/* Balance info */}
                              <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex items-center gap-2 text-sm">
                                  <Wallet className="w-4 h-4 text-blue-600" />
                                  <span className="text-blue-900">Баланс</span>
                                </div>
                                <span className="font-semibold text-blue-900">2 450 ₽</span>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Hourly billing info */}
                              <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Стоимость в час</span>
                                  <span className="text-lg font-bold text-foreground">{hourlyRate} ₽</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">≈ в сутки</span>
                                  <span className="text-foreground">{(parseFloat(hourlyRate) * 24).toFixed(2)} ₽</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">≈ в месяц (макс.)</span>
                                  <span className="text-foreground">{mockServer.price} ₽</span>
                                </div>
                              </div>

                              {/* Card binding notice */}
                              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                <div className="flex items-start gap-2">
                                  <CreditCard className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-amber-900">Требуется привязка карты</p>
                                    <p className="text-xs text-amber-700 mt-0.5">
                                      Для почасовой оплаты привяжите карту или включите автопополнение.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Balance info */}
                              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 space-y-2">
                                <div className="flex items-start gap-2">
                                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-blue-700">
                                    Средства списываются с баланса каждый час.
                                  </p>
                                </div>
                                <div className="flex items-center justify-between text-sm pt-2 border-t border-blue-200">
                                  <span className="text-blue-800">Баланс</span>
                                  <span className="font-semibold text-blue-900">2 450 ₽</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-blue-800">Хватит на</span>
                                  <span className="font-medium text-blue-900">≈ {Math.floor(2450 / parseFloat(hourlyRate))} ч</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <DialogFooter className="flex-shrink-0 flex-col sm:flex-row gap-2 pt-4 border-t border-border mt-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsRenewModalOpen(false)}
                            className="w-full sm:w-auto"
                            size="sm"
                          >
                            Отмена
                          </Button>
                          <Button 
                            onClick={handleRenew}
                            disabled={isRenewLoading}
                            className="w-full sm:w-auto gap-2"
                            size="sm"
                          >
                            {isRenewLoading ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Обработка...
                              </>
                            ) : isHourlyBilling ? (
                              'Активировать'
                            ) : (
                              `Оплатить ${Math.round(selectedPeriod.price)} ₽`
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Actions dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Settings className="w-4 h-4" />
                          <span className="hidden sm:inline">Действия</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {/* Power actions */}
                        {serverStatus === 'running' ? (
                          <>
                            <DropdownMenuItem 
                              onClick={() => handlePowerAction('stop')}
                              disabled={isPowerLoading}
                              className="gap-2 text-red-600"
                            >
                              <Square className="w-4 h-4" />
                              Выключить сервер
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePowerAction('restart')}
                              disabled={isPowerLoading}
                              className="gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Перезагрузить
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Power className="w-4 h-4" />
                              Жёсткая перезагрузка
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handlePowerAction('start')}
                            disabled={isPowerLoading}
                            className="gap-2"
                          >
                            <Play className="w-4 h-4" />
                            Включить сервер
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Terminal className="w-4 h-4" />
                          Открыть консоль
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Camera className="w-4 h-4" />
                          Создать снапшот
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Archive className="w-4 h-4" />
                          Создать бэкап
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Download className="w-4 h-4" />
                          Переустановить ОС
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Shield className="w-4 h-4" />
                          Сбросить root-пароль
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Удалить сервер
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Payment Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                    <p className="text-xl md:text-2xl font-bold text-foreground">
                      {mockServer.price} ₽<span className="text-sm font-normal text-muted-foreground">/мес</span>
                    </p>
                  </div>
                  <div className="border-l border-border pl-4">
                    <p className="text-sm text-muted-foreground mb-1">Оплачен до</p>
                    <p className="text-base md:text-lg font-semibold text-foreground">{mockServer.expiresAt}</p>
                  </div>
                  <div className="border-l border-border pl-4 text-right sm:text-left">
                    <p className="text-sm text-muted-foreground mb-1">Осталось</p>
                    <p className={`text-base md:text-lg font-semibold ${mockServer.daysLeft < 7 ? 'text-amber-600' : 'text-foreground'}`}>
                      {mockServer.daysLeft} дней
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Navigation */}
            <div className="lg:hidden mb-4">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {sidebarSections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
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
              </ScrollArea>
            </div>

            {/* Section Title for Desktop */}
            <div className="hidden lg:block mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {sidebarSections.find(s => s.id === activeSection)?.label}
              </h2>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServerManagePage;
