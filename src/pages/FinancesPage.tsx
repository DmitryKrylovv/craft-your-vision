import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RoleSwitcher from '@/components/dashboard/RoleSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  Wallet,
  Plus,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  TrendingUp,
  Calendar,
  Server,
  Globe,
  Shield,
  Building2,
  RefreshCw,
  Banknote,
  QrCode,
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'payment' | 'topup' | 'refund' | 'bonus';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method?: string;
  service?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TX-001',
    type: 'payment',
    description: 'Оплата VPS Pro #1 (февраль)',
    amount: -890,
    status: 'completed',
    date: '2025-01-30 10:15',
    service: 'VPS Pro #1',
  },
  {
    id: 'TX-002',
    type: 'topup',
    description: 'Пополнение баланса',
    amount: 5000,
    status: 'completed',
    date: '2025-01-28 14:30',
    method: 'Банковская карта',
  },
  {
    id: 'TX-003',
    type: 'payment',
    description: 'Оплата Dev Server (февраль)',
    amount: -450,
    status: 'completed',
    date: '2025-01-25 09:00',
    service: 'Dev Server',
  },
  {
    id: 'TX-004',
    type: 'bonus',
    description: 'Бонус за регистрацию',
    amount: 500,
    status: 'completed',
    date: '2025-01-20 12:00',
  },
  {
    id: 'TX-005',
    type: 'payment',
    description: 'Продление домена mysite.ru',
    amount: -199,
    status: 'completed',
    date: '2025-01-15 16:45',
    service: 'mysite.ru',
  },
  {
    id: 'TX-006',
    type: 'topup',
    description: 'Пополнение баланса',
    amount: 3000,
    status: 'completed',
    date: '2025-01-10 11:20',
    method: 'СБП',
  },
  {
    id: 'TX-007',
    type: 'payment',
    description: 'Оплата Colocation Стойка #42',
    amount: -85000,
    status: 'completed',
    date: '2025-01-05 08:00',
    service: 'Стойка #42',
  },
  {
    id: 'TX-008',
    type: 'refund',
    description: 'Возврат за неиспользованный период',
    amount: 150,
    status: 'completed',
    date: '2025-01-02 15:30',
  },
];

const quickAmounts = [500, 1000, 2000, 5000, 10000];

const FinancesPage = () => {
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [activeTab, setActiveTab] = useState('all');

  const balance = 12350;
  const monthlyExpenses = 91039;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'topup':
      case 'bonus':
      case 'refund':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'payment':
        return 'text-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'topup': return ArrowDownLeft;
      case 'payment': return ArrowUpRight;
      case 'refund': return RefreshCw;
      case 'bonus': return TrendingUp;
      default: return Receipt;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'topup': return 'bg-emerald-500/10';
      case 'payment': return 'bg-red-500/10';
      case 'refund': return 'bg-blue-500/10';
      case 'bonus': return 'bg-amber-500/10';
      default: return 'bg-muted';
    }
  };

  const getTypeIconColor = (type: string) => {
    switch (type) {
      case 'topup': return 'text-emerald-600';
      case 'payment': return 'text-red-600';
      case 'refund': return 'text-blue-600';
      case 'bonus': return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-xs">Выполнено</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-600 border-0 text-xs">Ожидает</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/10 text-red-600 border-0 text-xs">Ошибка</Badge>;
      default:
        return null;
    }
  };

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'topups') return tx.type === 'topup';
    if (activeTab === 'payments') return tx.type === 'payment';
    return true;
  });

  const handleTopup = () => {
    const amount = parseInt(topupAmount);
    if (!amount || amount < 100) {
      toast.error('Минимальная сумма пополнения — 100 ₽');
      return;
    }
    toast.success('Переход к оплате...', {
      description: `Пополнение на ${amount.toLocaleString()} ₽`,
    });
    setShowTopupModal(false);
    setTopupAmount('');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          <div className="p-4 border-b border-border">
            <Button className="w-full gap-2" onClick={() => setShowTopupModal(true)}>
              <Plus className="w-4 h-4" />
              Пополнить баланс
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <nav className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                История
              </div>
              {[
                { id: 'all', label: 'Все операции', icon: Receipt },
                { id: 'topups', label: 'Пополнения', icon: ArrowDownLeft },
                { id: 'payments', label: 'Списания', icon: ArrowUpRight },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                );
              })}

              <div className="px-3 py-2 mt-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Документы
              </div>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-all">
                <Download className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-left">Акты и счета</span>
              </button>
            </nav>
          </ScrollArea>

          {/* Role Switcher */}
          <div className="p-4 border-t border-border">
            <RoleSwitcher />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">Финансы</h1>
                  <p className="text-sm text-muted-foreground">
                    Управление балансом и платежами
                  </p>
                </div>
              </div>
              <Button className="gap-2 lg:hidden" onClick={() => setShowTopupModal(true)}>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Пополнить</span>
              </Button>
            </div>

            {/* Balance Card */}
            <Card className="border-0 shadow-lg mb-6 bg-gradient-to-br from-primary/5 via-primary/10 to-blue-600/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Текущий баланс</p>
                    <p className="text-4xl font-bold text-foreground">
                      {balance.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Расходы в этом месяце: <span className="font-medium text-foreground">{monthlyExpenses.toLocaleString()} ₽</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => setShowTopupModal(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Пополнить
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="w-4 h-4" />
                      Автоплатёж
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">8 500 ₽</p>
                      <p className="text-xs text-muted-foreground">Пополнено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10">
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">86 539 ₽</p>
                      <p className="text-xs text-muted-foreground">Списано</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">500 ₽</p>
                      <p className="text-xs text-muted-foreground">Бонусы</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">150 ₽</p>
                      <p className="text-xs text-muted-foreground">Возвраты</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Tabs */}
            <div className="flex gap-2 mb-4 lg:hidden overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'Все' },
                { id: 'topups', label: 'Пополнения' },
                { id: 'payments', label: 'Списания' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Transactions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">История операций</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-2 text-xs">
                    <Download className="w-3.5 h-3.5" />
                    Экспорт
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredTransactions.map((tx) => {
                    const Icon = getTypeIcon(tx.type);
                    return (
                      <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                        <div className={`p-2 rounded-lg shrink-0 ${getTypeBg(tx.type)}`}>
                          <Icon className={`w-4 h-4 ${getTypeIconColor(tx.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{tx.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span>{tx.date}</span>
                            {tx.method && (
                              <>
                                <span>•</span>
                                <span>{tx.method}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`font-semibold ${getTypeStyles(tx.type)}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ₽
                          </p>
                          <div className="mt-1">
                            {getStatusBadge(tx.status)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Topup Modal */}
      <Dialog open={showTopupModal} onOpenChange={setShowTopupModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Пополнение баланса</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Сумма пополнения</Label>
              <Input
                type="number"
                placeholder="Введите сумму"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                className="text-lg"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopupAmount(String(amount))}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      topupAmount === String(amount)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {amount.toLocaleString()} ₽
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Способ оплаты</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'card', label: 'Банковская карта', icon: CreditCard },
                  { id: 'sbp', label: 'СБП', icon: QrCode },
                  { id: 'invoice', label: 'По счёту', icon: Receipt },
                  { id: 'crypto', label: 'Криптовалюта', icon: Banknote },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`w-4 h-4 ${
                      selectedPaymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTopupModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleTopup} className="gap-2">
              <Wallet className="w-4 h-4" />
              Пополнить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancesPage;
