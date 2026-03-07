import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, CreditCard, Server, Settings, BarChart3, Bell,
  TrendingUp, TrendingDown, ArrowUpRight, Package, Globe,
  ShoppingCart, Eye, Plus, Search, Filter, Download,
  CheckCircle2, Clock, AlertTriangle, XCircle, Star,
  Zap, ExternalLink, Copy, MoreVertical, ChevronRight,
  Wallet, Receipt, PieChart, Activity, ShieldCheck,
  Store, Tag, Megaphone, ArrowRight, Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const provider = {
  name: 'CloudVex',
  logo: 'CV',
  primaryColor: '#6366f1',
};

// Stats
const stats = [
  { label: 'Активных клиентов', value: '1 247', change: '+12%', up: true, icon: Users },
  { label: 'MRR', value: '₽2.4M', change: '+8.3%', up: true, icon: TrendingUp },
  { label: 'Активных услуг', value: '3 891', change: '+5%', up: true, icon: Server },
  { label: 'Средний чек', value: '₽1 920', change: '-2.1%', up: false, icon: CreditCard },
];

const recentOrders = [
  { id: 'ORD-4821', client: 'WebStudio Pro', email: 'alex@webstudio.pro', plan: 'VPS Business', price: 599, status: 'active', date: '07.03.2026' },
  { id: 'ORD-4820', client: 'DataFlow Inc', email: 'admin@dataflow.io', plan: 'Dedicated E-2288G', price: 8900, status: 'active', date: '06.03.2026' },
  { id: 'ORD-4819', client: 'Иван Петров', email: 'ivan@mail.ru', plan: 'VPS Start', price: 199, status: 'pending', date: '06.03.2026' },
  { id: 'ORD-4818', client: 'ShopOnline', email: 'tech@shoponline.ru', plan: 'VPS Pro', price: 1299, status: 'active', date: '05.03.2026' },
  { id: 'ORD-4817', client: 'GameHost', email: 'info@gamehost.gg', plan: 'VPS Gaming', price: 899, status: 'suspended', date: '05.03.2026' },
  { id: 'ORD-4816', client: 'MediaGroup', email: 'dev@mediagroup.ru', plan: 'Cloud S', price: 399, status: 'active', date: '04.03.2026' },
];

const tariffs = [
  { name: 'VPS Start', cpu: '1 vCPU', ram: '1 GB', disk: '20 GB NVMe', price: 199, clients: 412, revenue: 82000 },
  { name: 'VPS Business', cpu: '2 vCPU', ram: '4 GB', disk: '60 GB NVMe', price: 599, clients: 287, revenue: 171800 },
  { name: 'VPS Pro', cpu: '4 vCPU', ram: '8 GB', disk: '120 GB NVMe', price: 1299, clients: 156, revenue: 202600 },
  { name: 'VPS Gaming', cpu: '4 vCPU', ram: '16 GB', disk: '200 GB NVMe', price: 899, clients: 98, revenue: 88100 },
];

const tickets = [
  { id: 'T-3021', client: 'WebStudio Pro', subject: 'Не работает SSH', priority: 'high', status: 'open', date: '07.03.2026' },
  { id: 'T-3020', client: 'DataFlow Inc', subject: 'Увеличить RAM', priority: 'normal', status: 'open', date: '07.03.2026' },
  { id: 'T-3019', client: 'Иван Петров', subject: 'Вопрос по оплате', priority: 'low', status: 'answered', date: '06.03.2026' },
  { id: 'T-3018', client: 'ShopOnline', subject: 'Настройка firewall', priority: 'normal', status: 'answered', date: '06.03.2026' },
];

const navItems = [
  { icon: BarChart3, label: 'Обзор', id: 'overview' },
  { icon: Users, label: 'Клиенты', id: 'clients' },
  { icon: Package, label: 'Тарифы', id: 'tariffs' },
  { icon: CreditCard, label: 'Финансы', id: 'finances' },
  { icon: Store, label: 'Маркетплейс', id: 'marketplace' },
  { icon: Settings, label: 'Настройки', id: 'settings' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Активен', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  pending: { label: 'Ожидает', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  suspended: { label: 'Приост.', color: 'bg-red-500/10 text-red-600 border-red-200' },
  open: { label: 'Открыт', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  answered: { label: 'Отвечен', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
};

const priorityMap: Record<string, { label: string; color: string }> = {
  high: { label: 'Высокий', color: 'text-red-500' },
  normal: { label: 'Обычный', color: 'text-muted-foreground' },
  low: { label: 'Низкий', color: 'text-muted-foreground' },
};

const BillingProviderDemo = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${provider.primaryColor}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: provider.primaryColor }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Выручка за 30 дней</h3>
            <Badge variant="outline" className="text-xs">+8.3% к прошлому месяцу</Badge>
          </div>
          <div className="h-48 flex items-end gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const h = 20 + Math.random() * 80;
              return (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `${provider.primaryColor}${i > 24 ? '' : '40'}` }} />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>5 фев</span>
            <span>15 фев</span>
            <span>25 фев</span>
            <span>7 мар</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-sm font-medium text-foreground mb-3">Быстрые действия</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 text-sm" style={{ borderColor: `${provider.primaryColor}30`, color: provider.primaryColor }}>
                <Plus className="w-4 h-4" /> Новый тариф
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 text-sm" style={{ borderColor: `${provider.primaryColor}30`, color: provider.primaryColor }}>
                <Megaphone className="w-4 h-4" /> Рассылка клиентам
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 text-sm" style={{ borderColor: `${provider.primaryColor}30`, color: provider.primaryColor }}>
                <Download className="w-4 h-4" /> Экспорт отчёта
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-sm font-medium text-foreground mb-3">Тикеты</h4>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">7</p>
                <p className="text-[10px] text-muted-foreground">Открытых</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">12</p>
                <p className="text-[10px] text-muted-foreground">Сегодня</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-emerald-600">94%</p>
                <p className="text-[10px] text-muted-foreground">SLA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Последние заказы</h3>
          <Button variant="ghost" size="sm" className="text-xs gap-1" style={{ color: provider.primaryColor }}>
            Все заказы <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">Клиент</th>
                <th className="text-left p-3 font-medium">Тариф</th>
                <th className="text-right p-3 font-medium">Сумма</th>
                <th className="text-center p-3 font-medium">Статус</th>
                <th className="text-right p-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-3 text-sm font-mono text-muted-foreground">{order.id}</td>
                  <td className="p-3">
                    <p className="text-sm font-medium text-foreground">{order.client}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="p-3 text-sm text-foreground">{order.plan}</td>
                  <td className="p-3 text-sm font-medium text-foreground text-right">₽{order.price}</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline" className={`text-[10px] ${statusMap[order.status].color}`}>
                      {statusMap[order.status].label}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground text-right">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Активные тикеты</h3>
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200 text-xs">2 новых</Badge>
        </div>
        <div className="divide-y divide-border">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 hover:bg-muted/50 transition-colors flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                  <span className={`text-xs ${priorityMap[ticket.priority].color}`}>● {priorityMap[ticket.priority].label}</span>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">{ticket.client}</p>
              </div>
              <Badge variant="outline" className={`text-[10px] ${statusMap[ticket.status].color}`}>
                {statusMap[ticket.status].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{ticket.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Поиск клиентов..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-1"><Filter className="w-4 h-4" /> Фильтры</Button>
        <Button size="sm" className="gap-1 text-white" style={{ background: provider.primaryColor }}>
          <Plus className="w-4 h-4" /> Добавить
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left p-3 font-medium">Клиент</th>
              <th className="text-left p-3 font-medium">Услуги</th>
              <th className="text-right p-3 font-medium">Баланс</th>
              <th className="text-right p-3 font-medium">Потрачено</th>
              <th className="text-center p-3 font-medium">Статус</th>
              <th className="text-right p-3 font-medium">Регистрация</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'WebStudio Pro', email: 'alex@webstudio.pro', services: 3, balance: 2450, spent: 34500, status: 'active', date: '12.01.2025' },
              { name: 'DataFlow Inc', email: 'admin@dataflow.io', services: 1, balance: 15200, spent: 89000, status: 'active', date: '05.08.2024' },
              { name: 'Иван Петров', email: 'ivan@mail.ru', services: 1, balance: 50, spent: 2400, status: 'pending', date: '01.03.2026' },
              { name: 'ShopOnline', email: 'tech@shoponline.ru', services: 2, balance: 3800, spent: 18700, status: 'active', date: '18.06.2025' },
              { name: 'GameHost', email: 'info@gamehost.gg', services: 1, balance: -200, spent: 12600, status: 'suspended', date: '22.11.2025' },
              { name: 'MediaGroup', email: 'dev@mediagroup.ru', services: 2, balance: 1200, spent: 8900, status: 'active', date: '14.02.2026' },
            ].map((client, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                <td className="p-3">
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </td>
                <td className="p-3 text-sm text-foreground">{client.services} услуг</td>
                <td className={`p-3 text-sm font-medium text-right ${client.balance < 0 ? 'text-red-500' : 'text-foreground'}`}>₽{client.balance.toLocaleString()}</td>
                <td className="p-3 text-sm text-muted-foreground text-right">₽{client.spent.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className={`text-[10px] ${statusMap[client.status].color}`}>
                    {statusMap[client.status].label}
                  </Badge>
                </td>
                <td className="p-3 text-sm text-muted-foreground text-right">{client.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTariffs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Ваши тарифы</h3>
        <Button size="sm" className="gap-1 text-white" style={{ background: provider.primaryColor }}>
          <Plus className="w-4 h-4" /> Новый тариф
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tariffs.map((tariff, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-foreground">{tariff.name}</h4>
                <p className="text-lg font-bold mt-1" style={{ color: provider.primaryColor }}>₽{tariff.price}<span className="text-xs text-muted-foreground font-normal">/мес</span></p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs mb-4">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-muted-foreground">CPU</p>
                <p className="font-medium text-foreground">{tariff.cpu}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-muted-foreground">RAM</p>
                <p className="font-medium text-foreground">{tariff.ram}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-muted-foreground">Диск</p>
                <p className="font-medium text-foreground">{tariff.disk}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-border pt-3">
              <span className="text-muted-foreground">{tariff.clients} клиентов</span>
              <span className="font-medium text-foreground">₽{tariff.revenue.toLocaleString()}/мес</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFinances = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Выручка (март)', value: '₽2 418 700', icon: Wallet, change: '+8.3%' },
          { label: 'Ожидает оплаты', value: '₽342 100', icon: Clock, change: '142 счёта' },
          { label: 'Просрочено', value: '₽28 500', icon: AlertTriangle, change: '12 клиентов' },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${provider.primaryColor}15` }}>
                <item.icon className="w-4 h-4" style={{ color: provider.primaryColor }} />
              </div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Последние транзакции</h3>
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <Download className="w-3 h-3" /> Экспорт
          </Button>
        </div>
        <div className="divide-y divide-border">
          {[
            { client: 'WebStudio Pro', desc: 'Оплата VPS Business', amount: 599, date: '07.03.2026', type: 'income' },
            { client: 'DataFlow Inc', desc: 'Оплата Dedicated E-2288G', amount: 8900, date: '06.03.2026', type: 'income' },
            { client: 'ShopOnline', desc: 'Оплата VPS Pro', amount: 1299, date: '05.03.2026', type: 'income' },
            { client: 'Plooza', desc: 'Комиссия маркетплейса (фев)', amount: -12400, date: '01.03.2026', type: 'expense' },
            { client: 'MediaGroup', desc: 'Оплата Cloud S', amount: 399, date: '04.03.2026', type: 'income' },
          ].map((tx, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                {tx.type === 'income'
                  ? <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  : <TrendingDown className="w-4 h-4 text-red-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                <p className="text-xs text-muted-foreground">{tx.client}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'income' ? '+' : ''}₽{Math.abs(tx.amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      {/* Marketplace Hero */}
      <div className="rounded-xl border border-border p-6" style={{ background: `linear-gradient(135deg, ${provider.primaryColor}08, ${provider.primaryColor}15)` }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${provider.primaryColor}20` }}>
            <Store className="w-6 h-6" style={{ color: provider.primaryColor }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">Продажи на маркетплейсе Plooza</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ваши тарифы отображаются на Plooza.com и доступны тысячам потенциальных клиентов. 
              Управляйте видимостью, ценами и описаниями прямо из биллинга.
            </p>
            <div className="flex items-center gap-3">
              <Button size="sm" className="gap-1 text-white" style={{ background: provider.primaryColor }}>
                <ExternalLink className="w-4 h-4" /> Открыть на Plooza
              </Button>
              <Button variant="outline" size="sm" className="gap-1" style={{ borderColor: `${provider.primaryColor}30`, color: provider.primaryColor }}>
                <Settings className="w-4 h-4" /> Настройки
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Просмотры профиля', value: '8 420', change: '+24%', icon: Eye },
          { label: 'Переходы в тарифы', value: '1 230', change: '+18%', icon: ShoppingCart },
          { label: 'Заказы с Plooza', value: '87', change: '+31%', icon: Package },
          { label: 'Конверсия', value: '7.1%', change: '+0.8%', icon: Activity },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <span className="text-xs text-emerald-600">{s.change}</span>
          </div>
        ))}
      </div>

      {/* Published Tariffs on Marketplace */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Тарифы на маркетплейсе</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Управляйте тем, что видят клиенты на Plooza</p>
          </div>
          <Button size="sm" className="gap-1 text-white" style={{ background: provider.primaryColor }}>
            <Plus className="w-4 h-4" /> Опубликовать тариф
          </Button>
        </div>

        <div className="divide-y divide-border">
          {[
            { name: 'VPS Start', price: 199, views: 3200, orders: 34, rating: 4.8, published: true, badge: null },
            { name: 'VPS Business', price: 599, views: 2100, orders: 28, rating: 4.9, published: true, badge: 'Популярный' },
            { name: 'VPS Pro', price: 1299, views: 980, orders: 15, rating: 4.7, published: true, badge: null },
            { name: 'VPS Gaming', price: 899, views: 1540, orders: 10, rating: 4.6, published: true, badge: 'Новинка' },
            { name: 'Cloud S', price: 399, views: 0, orders: 0, rating: 0, published: false, badge: null },
          ].map((t, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${t.published ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  {t.badge && (
                    <Badge variant="outline" className="text-[10px]" style={{ borderColor: `${provider.primaryColor}40`, color: provider.primaryColor }}>
                      {t.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">₽{t.price}/мес</p>
              </div>
              {t.published ? (
                <>
                  <div className="text-center px-3">
                    <p className="text-sm font-medium text-foreground">{t.views.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Просмотров</p>
                  </div>
                  <div className="text-center px-3">
                    <p className="text-sm font-medium text-foreground">{t.orders}</p>
                    <p className="text-[10px] text-muted-foreground">Заказов</p>
                  </div>
                  <div className="flex items-center gap-1 px-3">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">{t.rating}</span>
                  </div>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Не опубликован</span>
              )}
              <Button variant="ghost" size="sm" className="text-xs" style={{ color: provider.primaryColor }}>
                {t.published ? 'Редактировать' : 'Опубликовать'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Zap, title: 'Автоматический провижн', desc: 'Клиент заказывает — сервер разворачивается автоматически через API' },
          { icon: ShieldCheck, title: 'Верифицированный профиль', desc: 'Значок верификации повышает доверие и конверсию заказов' },
          { icon: Tag, title: 'Промо-акции', desc: 'Запускайте скидки и акции прямо на маркетплейсе Plooza' },
        ].map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${provider.primaryColor}15` }}>
              <f.icon className="w-4 h-4" style={{ color: provider.primaryColor }} />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">{f.title}</h4>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Настройки компании</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Название компании</label>
            <Input defaultValue="CloudVex" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Домен панели</label>
            <Input defaultValue="billing.cloudvex.ru" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email поддержки</label>
            <Input defaultValue="support@cloudvex.ru" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Основной цвет</label>
            <div className="flex gap-2">
              <Input defaultValue="#6366f1" className="flex-1" />
              <div className="w-10 h-10 rounded-md border border-border" style={{ background: provider.primaryColor }} />
            </div>
          </div>
        </div>
        <Button className="mt-4 text-white" style={{ background: provider.primaryColor }}>Сохранить</Button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Интеграции</h3>
        <div className="space-y-3">
          {[
            { name: 'API провижнинга', desc: 'Автоматическое создание серверов', status: 'connected' },
            { name: 'Платёжные системы', desc: 'Банковские карты, ЮKassa, криптовалюта', status: 'connected' },
            { name: 'WHMCS Import', desc: 'Импорт клиентов и услуг из WHMCS', status: 'available' },
            { name: 'Маркетплейс Plooza', desc: 'Публикация тарифов на plooza.com', status: 'connected' },
          ].map((int, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{int.name}</p>
                <p className="text-xs text-muted-foreground">{int.desc}</p>
              </div>
              {int.status === 'connected' ? (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">Подключено</Badge>
              ) : (
                <Button variant="outline" size="sm" className="text-xs" style={{ borderColor: `${provider.primaryColor}30`, color: provider.primaryColor }}>
                  Подключить
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const sections: Record<string, () => JSX.Element> = {
    overview: renderOverview,
    clients: renderClients,
    tariffs: renderTariffs,
    finances: renderFinances,
    marketplace: renderMarketplace,
    settings: renderSettings,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="text-white text-center py-2 text-sm" style={{ background: provider.primaryColor }}>
        <span className="opacity-80">Демо: панель хостера в</span>{' '}
        <Link to="/billing" className="font-medium underline underline-offset-2">Plooza Биллинг</Link>
        <span className="opacity-80"> • </span>
        <Link to="/billing/client" className="font-medium underline underline-offset-2 opacity-80 hover:opacity-100">
          Панель клиента →
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-36px)]">
        {/* Sidebar */}
        <aside className="hidden md:flex w-56 flex-col border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg text-white text-sm font-bold flex items-center justify-center" style={{ background: provider.primaryColor }}>
                {provider.logo}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{provider.name}</p>
                <p className="text-[10px] text-muted-foreground">Биллинг-панель</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 ${
                  activeSection === item.id
                    ? 'text-white font-medium'
                    : 'text-foreground hover:bg-muted'
                }`}
                style={activeSection === item.id ? { background: provider.primaryColor } : {}}
              >
                <item.icon className={`w-4 h-4 ${activeSection === item.id ? '' : 'text-muted-foreground'}`} />
                {item.label}
                {item.id === 'marketplace' && (
                  <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0 bg-amber-500/10 text-amber-600 border-amber-200">NEW</Badge>
                )}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-border">
            <div className="text-[10px] text-muted-foreground text-center">
              Работает на{' '}
              <Link to="/billing" className="font-medium" style={{ color: provider.primaryColor }}>Plooza Биллинг</Link>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
            {/* Mobile nav */}
            <div className="md:hidden">
              <select
                value={activeSection}
                onChange={e => setActiveSection(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground"
              >
                {navItems.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>

            <h2 className="text-sm font-semibold text-foreground hidden md:block">
              {navItems.find(n => n.id === activeSection)?.label}
            </h2>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: provider.primaryColor }}>
                  АД
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-foreground">Админ</p>
                  <p className="text-[10px] text-muted-foreground">admin@cloudvex.ru</p>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-6 overflow-auto">
            {sections[activeSection]?.()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillingProviderDemo;
