import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useNotifications } from '@/contexts/NotificationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  Globe,
  Copy,
  Check,
  Settings,
  BarChart3,
  History,
  Shield,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Server,
  Mail,
  FileText,
  Lock,
  Pencil,
  ArrowRight,
  Info,
  Wallet,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from '@/components/ui/alert-dialog';

const sidebarSections = [
  { id: 'overview', label: 'Обзор', icon: BarChart3 },
  { id: 'dns', label: 'DNS записи', icon: Server },
  { id: 'ssl', label: 'SSL сертификат', icon: Shield },
  { id: 'redirects', label: 'Редиректы', icon: ArrowRight },
  { id: 'activity', label: 'История', icon: History },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

interface DnsRecord {
  id: number;
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
}

const mockDomain = {
  id: 1,
  name: 'mysite.ru',
  status: 'active',
  registrar: 'REG.RU',
  createdAt: '10 января 2024',
  expiresAt: '10 января 2026',
  daysLeft: 345,
  autoRenew: true,
  privacy: true,
  nameservers: ['ns1.reg.ru', 'ns2.reg.ru'],
  price: 199,
};

const mockDnsRecords: DnsRecord[] = [
  { id: 1, type: 'A', name: '@', value: '185.232.45.123', ttl: 3600 },
  { id: 2, type: 'A', name: 'www', value: '185.232.45.123', ttl: 3600 },
  { id: 3, type: 'AAAA', name: '@', value: '2a00:1450:4001:81b::200e', ttl: 3600 },
  { id: 4, type: 'MX', name: '@', value: 'mail.mysite.ru', ttl: 3600, priority: 10 },
  { id: 5, type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
  { id: 6, type: 'CNAME', name: 'blog', value: 'mysite.ru', ttl: 3600 },
];

const mockSslCertificate = {
  status: 'active',
  issuer: "Let's Encrypt",
  type: 'Wildcard',
  domains: ['mysite.ru', '*.mysite.ru'],
  issuedAt: '5 января 2025',
  expiresAt: '5 апреля 2025',
  daysLeft: 65,
  autoRenew: true,
};

const mockActivity = [
  { id: 1, action: 'Обновление DNS записи A', date: '30 янв 2025, 10:15', status: 'success', user: 'Иван' },
  { id: 2, action: 'Продление сертификата SSL', date: '5 янв 2025, 03:00', status: 'success', user: 'Система' },
  { id: 3, action: 'Добавление TXT записи', date: '28 дек 2024, 14:30', status: 'success', user: 'Иван' },
  { id: 4, action: 'Изменение NS серверов', date: '15 дек 2024, 11:00', status: 'success', user: 'Иван' },
  { id: 5, action: 'Регистрация домена', date: '10 янв 2024, 09:00', status: 'success', user: 'Иван' },
];

const mockRedirects = [
  { id: 1, from: 'old.mysite.ru', to: 'mysite.ru', type: '301', active: true },
  { id: 2, from: 'blog.mysite.ru/old-post', to: 'blog.mysite.ru/new-post', type: '301', active: true },
];

const DomainManagePage = () => {
  const { domainId } = useParams();
  const { addNotification } = useNotifications();
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>(mockDnsRecords);
  const [showAddDnsModal, setShowAddDnsModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewPeriod, setRenewPeriod] = useState('1');
  const [isRenewLoading, setIsRenewLoading] = useState(false);
  const [showDeleteDnsDialog, setShowDeleteDnsDialog] = useState<number | null>(null);
  const [newDnsRecord, setNewDnsRecord] = useState({
    type: 'A',
    name: '',
    value: '',
    ttl: '3600',
    priority: '',
  });

  const renewalPeriods = [
    { value: '1', label: '1 год', price: mockDomain.price, discount: 0 },
    { value: '2', label: '2 года', price: mockDomain.price * 2 * 0.9, discount: 10 },
    { value: '3', label: '3 года', price: mockDomain.price * 3 * 0.85, discount: 15 },
    { value: '5', label: '5 лет', price: mockDomain.price * 5 * 0.8, discount: 20 },
  ];

  const selectedPeriod = renewalPeriods.find(p => p.value === renewPeriod) || renewalPeriods[0];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Скопировано');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRenew = () => {
    setIsRenewLoading(true);
    toast.loading('Обработка платежа...', { id: 'renew-action' });
    
    setTimeout(() => {
      setIsRenewLoading(false);
      setShowRenewModal(false);
      toast.success(`${mockDomain.name} продлён на ${selectedPeriod.label}`, { id: 'renew-action' });
      addNotification({
        title: 'Домен продлён',
        description: `${mockDomain.name} продлён на ${selectedPeriod.label}`,
        type: 'success',
      });
    }, 2000);
  };

  const handleAddDnsRecord = () => {
    if (!newDnsRecord.name || !newDnsRecord.value) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    const newRecord: DnsRecord = {
      id: Date.now(),
      type: newDnsRecord.type,
      name: newDnsRecord.name,
      value: newDnsRecord.value,
      ttl: parseInt(newDnsRecord.ttl),
      priority: newDnsRecord.priority ? parseInt(newDnsRecord.priority) : undefined,
    };
    
    setDnsRecords([...dnsRecords, newRecord]);
    setShowAddDnsModal(false);
    setNewDnsRecord({ type: 'A', name: '', value: '', ttl: '3600', priority: '' });
    toast.success('DNS запись добавлена');
    addNotification({
      title: 'DNS запись добавлена',
      description: `${newRecord.type} ${newRecord.name}.${mockDomain.name}`,
      type: 'success',
    });
  };

  const handleDeleteDnsRecord = (id: number) => {
    setDnsRecords(dnsRecords.filter(r => r.id !== id));
    setShowDeleteDnsDialog(null);
    toast.success('DNS запись удалена');
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'expiring':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'expired':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'expired': return 'Истёк';
      default: return status;
    }
  };

  const getDnsTypeColor = (type: string) => {
    switch (type) {
      case 'A': return 'bg-blue-500/10 text-blue-600';
      case 'AAAA': return 'bg-purple-500/10 text-purple-600';
      case 'CNAME': return 'bg-amber-500/10 text-amber-600';
      case 'MX': return 'bg-emerald-500/10 text-emerald-600';
      case 'TXT': return 'bg-pink-500/10 text-pink-600';
      case 'NS': return 'bg-cyan-500/10 text-cyan-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Domain Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Регистратор</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{mockDomain.registrar}</p>
                      <p className="text-sm text-muted-foreground">Зарегистрирован {mockDomain.createdAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Срок действия</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${mockDomain.daysLeft < 30 ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                        <Clock className={`w-5 h-5 ${mockDomain.daysLeft < 30 ? 'text-amber-600' : 'text-emerald-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{mockDomain.expiresAt}</p>
                        <p className="text-sm text-muted-foreground">Осталось {mockDomain.daysLeft} дней</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setShowRenewModal(true)}>
                      Продлить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nameservers */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">NS серверы</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-2 text-xs">
                    <Pencil className="w-3.5 h-3.5" />
                    Изменить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockDomain.nameservers.map((ns, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Server className="w-4 h-4 text-muted-foreground" />
                        <code className="text-sm font-mono">{ns}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(ns, `ns-${i}`)}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        {copiedField === `ns-${i}` ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Server className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{dnsRecords.length}</p>
                      <p className="text-xs text-muted-foreground">DNS записей</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockSslCertificate.daysLeft}</p>
                      <p className="text-xs text-muted-foreground">Дней SSL</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <ArrowRight className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockRedirects.length}</p>
                      <p className="text-xs text-muted-foreground">Редиректов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Lock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mockDomain.privacy ? 'Вкл' : 'Выкл'}</p>
                      <p className="text-xs text-muted-foreground">Приватность</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SSL Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">SSL сертификат</CardTitle>
                  <Badge className={`${getStatusStyles(mockSslCertificate.status)} border-0`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Активен
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">Издатель:</span> {mockSslCertificate.issuer}
                    </p>
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">Тип:</span> {mockSslCertificate.type} ({mockSslCertificate.domains.join(', ')})
                    </p>
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">Действителен до:</span> {mockSslCertificate.expiresAt}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveSection('ssl')}>
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'dns':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">DNS записи</h3>
                <p className="text-sm text-muted-foreground">Управление DNS записями домена</p>
              </div>
              <Button onClick={() => setShowAddDnsModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Добавить запись
              </Button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {dnsRecords.map((record) => (
                  <div key={record.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <Badge className={`${getDnsTypeColor(record.type)} border-0 font-mono text-xs min-w-[50px] justify-center`}>
                      {record.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-medium text-foreground">
                          {record.name === '@' ? mockDomain.name : `${record.name}.${mockDomain.name}`}
                        </code>
                        {record.priority !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            Приоритет: {record.priority}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">{record.value}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">TTL: {record.ttl}</span>
                      <button
                        onClick={() => copyToClipboard(record.value, `dns-${record.id}`)}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        {copiedField === `dns-${record.id}` ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => setShowDeleteDnsDialog(record.id)}
                        className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Info */}
            <Card className="border-0 shadow-sm bg-blue-500/5">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Изменения DNS</p>
                    <p className="text-muted-foreground">
                      Изменения DNS записей могут занять до 24 часов для полного распространения по всему миру.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'ssl':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">SSL сертификат</h3>
              <p className="text-sm text-muted-foreground">Управление SSL/TLS сертификатом</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{mockSslCertificate.type} SSL</h4>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Активен
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Издатель</p>
                        <p className="font-medium text-foreground">{mockSslCertificate.issuer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Выдан</p>
                        <p className="font-medium text-foreground">{mockSslCertificate.issuedAt}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Истекает</p>
                        <p className="font-medium text-foreground">{mockSslCertificate.expiresAt}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Осталось дней</p>
                        <p className="font-medium text-foreground">{mockSslCertificate.daysLeft}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Защищённые домены:</p>
                      <div className="flex flex-wrap gap-2">
                        {mockSslCertificate.domains.map((domain, i) => (
                          <Badge key={i} variant="outline" className="font-mono text-xs">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Автопродление</p>
                    <p className="text-sm text-muted-foreground">Автоматически продлевать сертификат</p>
                  </div>
                  <Switch checked={mockSslCertificate.autoRenew} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Force HTTPS</p>
                    <p className="text-sm text-muted-foreground">Перенаправлять HTTP на HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">HSTS</p>
                    <p className="text-sm text-muted-foreground">HTTP Strict Transport Security</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Перевыпустить
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Скачать сертификат
              </Button>
            </div>
          </div>
        );

      case 'redirects':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Редиректы</h3>
                <p className="text-sm text-muted-foreground">Настройка перенаправлений URL</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Добавить редирект
              </Button>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {mockRedirects.map((redirect) => (
                  <div key={redirect.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <Badge variant="outline" className="font-mono text-xs shrink-0">
                      {redirect.type}
                    </Badge>
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <code className="text-sm text-foreground truncate">{redirect.from}</code>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <code className="text-sm text-primary truncate">{redirect.to}</code>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Switch checked={redirect.active} />
                      <button className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {mockRedirects.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Нет редиректов</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Добавьте редирект для перенаправления трафика
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить редирект
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">История действий</h3>
              <p className="text-sm text-muted-foreground">Журнал изменений домена</p>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {mockActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      item.status === 'success' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                    }`}>
                      {item.status === 'success' ? (
                        <CheckCircle2 className={`w-4 h-4 text-emerald-600`} />
                      ) : (
                        <AlertTriangle className={`w-4 h-4 text-amber-600`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0">{item.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Настройки домена</h3>
              <p className="text-sm text-muted-foreground">Управление параметрами домена</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-0 divide-y divide-border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">Автопродление</p>
                    <p className="text-sm text-muted-foreground">Автоматически продлевать домен</p>
                  </div>
                  <Switch checked={mockDomain.autoRenew} />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">Приватность WHOIS</p>
                    <p className="text-sm text-muted-foreground">Скрыть персональные данные</p>
                  </div>
                  <Switch checked={mockDomain.privacy} />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">Блокировка трансфера</p>
                    <p className="text-sm text-muted-foreground">Запретить перенос к другому регистратору</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm border-red-500/20 bg-red-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-red-600">Опасная зона</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Удалить домен</p>
                    <p className="text-sm text-muted-foreground">Безвозвратно удалить домен из аккаунта</p>
                  </div>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить
                  </Button>
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
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          <div className="p-4 border-b border-border">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад к услугам
            </Link>
          </div>

          <ScrollArea className="flex-1">
            <nav className="p-2">
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
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Renew Block */}
          <div className="p-4 border-t border-border">
            <Card className="border-0 shadow-sm bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Истекает через</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{mockDomain.daysLeft} дней</p>
                <p className="text-xs text-muted-foreground mb-3">{mockDomain.expiresAt}</p>
                <Button className="w-full" size="sm" onClick={() => setShowRenewModal(true)}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Продлить
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-bold text-foreground">{mockDomain.name}</h1>
                    <button
                      onClick={() => copyToClipboard(mockDomain.name, 'domain')}
                      className="p-1 rounded hover:bg-muted transition-colors"
                    >
                      {copiedField === 'domain' ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">{mockDomain.registrar}</p>
                </div>
              </div>

              {/* Status Card */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-medium text-foreground">{getStatusLabel(mockDomain.status)}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${mockDomain.name}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Открыть
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden mb-6">
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

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Add DNS Record Modal */}
      <Dialog open={showAddDnsModal} onOpenChange={setShowAddDnsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить DNS запись</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Тип записи</Label>
              <Select
                value={newDnsRecord.type}
                onValueChange={(value) => setNewDnsRecord({ ...newDnsRecord, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="AAAA">AAAA</SelectItem>
                  <SelectItem value="CNAME">CNAME</SelectItem>
                  <SelectItem value="MX">MX</SelectItem>
                  <SelectItem value="TXT">TXT</SelectItem>
                  <SelectItem value="NS">NS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Имя (хост)</Label>
              <Input
                placeholder="@ или subdomain"
                value={newDnsRecord.name}
                onChange={(e) => setNewDnsRecord({ ...newDnsRecord, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">@ для корневого домена</p>
            </div>

            <div className="space-y-2">
              <Label>Значение</Label>
              <Input
                placeholder={newDnsRecord.type === 'A' ? 'IP адрес' : 'Значение'}
                value={newDnsRecord.value}
                onChange={(e) => setNewDnsRecord({ ...newDnsRecord, value: e.target.value })}
              />
            </div>

            {newDnsRecord.type === 'MX' && (
              <div className="space-y-2">
                <Label>Приоритет</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={newDnsRecord.priority}
                  onChange={(e) => setNewDnsRecord({ ...newDnsRecord, priority: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>TTL (секунды)</Label>
              <Select
                value={newDnsRecord.ttl}
                onValueChange={(value) => setNewDnsRecord({ ...newDnsRecord, ttl: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">5 минут</SelectItem>
                  <SelectItem value="3600">1 час</SelectItem>
                  <SelectItem value="86400">1 день</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDnsModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddDnsRecord}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renew Modal */}
      <Dialog open={showRenewModal} onOpenChange={setShowRenewModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Продление домена</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{mockDomain.name}</p>
                  <p className="text-sm text-muted-foreground">Истекает {mockDomain.expiresAt}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Период продления</Label>
              <div className="grid grid-cols-2 gap-2">
                {renewalPeriods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => setRenewPeriod(period.value)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      renewPeriod === period.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{period.label}</span>
                      {period.discount > 0 && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-xs">
                          -{period.discount}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg font-bold text-foreground">{Math.round(period.price)} ₽</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenewModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleRenew} disabled={isRenewLoading} className="gap-2">
              <Wallet className="w-4 h-4" />
              Оплатить {Math.round(selectedPeriod.price)} ₽
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete DNS Record Dialog */}
      <AlertDialog open={showDeleteDnsDialog !== null} onOpenChange={() => setShowDeleteDnsDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить DNS запись?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. DNS запись будет удалена безвозвратно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteDnsDialog && handleDeleteDnsRecord(showDeleteDnsDialog)}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DomainManagePage;
