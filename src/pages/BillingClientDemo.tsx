import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Server, CreditCard, Headphones, Settings, Bell, LogOut,
  Plus, ChevronRight, Clock, CheckCircle2, AlertTriangle,
  Cpu, MemoryStick, HardDrive, Gauge, Globe, Power,
  RefreshCw, BarChart3, Shield, Copy, ExternalLink,
  ArrowUpRight, ArrowDownRight, Wallet, Receipt,
  MessageSquare, PlusCircle, Search, Monitor
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

const user = {
  name: 'Алексей Морозов',
  email: 'alex@webstudio.pro',
  balance: 2450,
  bonuses: 180,
};

const servers = [
  {
    id: 'vps-2847',
    name: 'production-web',
    plan: 'VPS Business',
    status: 'active',
    ip: '185.234.12.47',
    os: 'Ubuntu 22.04 LTS',
    cpu: { used: 34, total: 2, label: '2 vCPU' },
    ram: { used: 62, total: 4, label: '4 GB' },
    disk: { used: 45, total: 60, label: '60 GB NVMe' },
    bandwidth: { used: 320, total: 2000, label: '2 TB' },
    price: 599,
    nextPayment: '15 мар 2026',
    uptime: '45д 12ч 34м',
    location: 'Москва',
  },
  {
    id: 'vps-3102',
    name: 'staging-api',
    plan: 'VPS Start',
    status: 'active',
    ip: '185.234.12.93',
    os: 'Debian 12',
    cpu: { used: 12, total: 1, label: '1 vCPU' },
    ram: { used: 38, total: 1, label: '1 GB' },
    disk: { used: 22, total: 20, label: '20 GB NVMe' },
    bandwidth: { used: 85, total: 1000, label: '1 TB' },
    price: 199,
    nextPayment: '22 мар 2026',
    uptime: '12д 5ч 18м',
    location: 'Амстердам',
  },
];

const transactions = [
  { id: 1, type: 'payment', desc: 'Оплата VPS Business (мар 2026)', amount: -599, date: '01.03.2026', status: 'success' },
  { id: 2, type: 'topup', desc: 'Пополнение баланса', amount: 3000, date: '28.02.2026', status: 'success' },
  { id: 3, type: 'payment', desc: 'Оплата VPS Start (мар 2026)', amount: -199, date: '22.02.2026', status: 'success' },
  { id: 4, type: 'bonus', desc: 'Кэшбэк за февраль', amount: 80, date: '01.02.2026', status: 'success' },
  { id: 5, type: 'payment', desc: 'Оплата VPS Business (фев 2026)', amount: -599, date: '01.02.2026', status: 'success' },
];

const tickets = [
  { id: 'T-1247', subject: 'Настройка SSL сертификата', status: 'answered', date: '05.03.2026', priority: 'normal' },
  { id: 'T-1198', subject: 'Увеличение диска на VPS', status: 'closed', date: '18.02.2026', priority: 'normal' },
  { id: 'T-1156', subject: 'Проблема с SSH подключением', status: 'closed', date: '02.02.2026', priority: 'high' },
];

const navItems = [
  { icon: Monitor, label: 'Серверы', id: 'servers' },
  { icon: CreditCard, label: 'Финансы', id: 'finances' },
  { icon: Headphones, label: 'Поддержка', id: 'support' },
  { icon: Settings, label: 'Настройки', id: 'settings' },
];

const BillingClientDemo = () => {
  const [activeSection, setActiveSection] = useState('servers');
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const activeServer = servers.find(s => s.id === selectedServer);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Demo Banner */}
      <div className="text-center py-2.5 px-4 text-xs sm:text-sm font-medium text-white" style={{ background: provider.primaryColor }}>
        <span className="opacity-80">Демо клиентской панели</span>{' '}
        <Link to="/billing" className="underline font-bold hover:opacity-80">Plooza Биллинг</Link>{' '}
        <span className="opacity-80">— так видят ваш сервис клиенты</span>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card shrink-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: provider.primaryColor }}>
                {provider.logo}
              </div>
              <span className="font-bold text-foreground">{provider.name}</span>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSelectedServer(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                style={activeSection === item.id ? { background: provider.primaryColor } : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                АМ
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" /> Выйти
            </Button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
            <div className="md:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ background: provider.primaryColor }}>
                {provider.logo}
              </div>
              <span className="font-bold text-sm text-foreground">{provider.name}</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground capitalize">
                {selectedServer ? activeServer?.name : navItems.find(n => n.id === activeSection)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">{user.balance.toLocaleString()}₽</span>
              </div>
              <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: provider.primaryColor }} />
              </button>
            </div>
          </header>

          {/* Mobile nav */}
          <div className="md:hidden flex border-b border-border bg-card overflow-x-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSelectedServer(null); }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === item.id
                    ? 'text-foreground'
                    : 'border-transparent text-muted-foreground'
                }`}
                style={activeSection === item.id ? { borderColor: provider.primaryColor, color: provider.primaryColor } : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 max-w-6xl">

            {/* ═══ SERVERS ═══ */}
            {activeSection === 'servers' && !selectedServer && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Мои серверы</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{servers.length} активных услуг</p>
                  </div>
                  <Button style={{ background: provider.primaryColor }} className="text-white">
                    <Plus className="w-4 h-4 mr-2" /> Заказать
                  </Button>
                </div>

                <div className="space-y-4">
                  {servers.map(srv => (
                    <div
                      key={srv.id}
                      className="border border-border bg-card rounded-2xl p-4 sm:p-5 hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => setSelectedServer(srv.id)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${provider.primaryColor}15` }}>
                            <Server className="w-5 h-5" style={{ color: provider.primaryColor }} />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{srv.name}</div>
                            <div className="text-xs text-muted-foreground">{srv.plan} • {srv.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Активен
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">CPU</div>
                          <Progress value={srv.cpu.used} className="h-1.5" />
                          <div className="text-xs text-muted-foreground mt-1">{srv.cpu.used}% • {srv.cpu.label}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">RAM</div>
                          <Progress value={srv.ram.used} className="h-1.5" />
                          <div className="text-xs text-muted-foreground mt-1">{srv.ram.used}% • {srv.ram.label}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Диск</div>
                          <Progress value={srv.disk.used} className="h-1.5" />
                          <div className="text-xs text-muted-foreground mt-1">{srv.disk.used}% • {srv.disk.label}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Трафик</div>
                          <Progress value={(srv.bandwidth.used / srv.bandwidth.total) * 100} className="h-1.5" />
                          <div className="text-xs text-muted-foreground mt-1">{srv.bandwidth.used} GB • {srv.bandwidth.label}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {srv.ip}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Uptime: {srv.uptime}</span>
                        <span className="flex items-center gap-1 ml-auto"><CreditCard className="w-3 h-3" /> {srv.price}₽/мес • до {srv.nextPayment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ SERVER DETAIL ═══ */}
            {activeSection === 'servers' && selectedServer && activeServer && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <button
                  onClick={() => setSelectedServer(null)}
                  className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
                >
                  ← Все серверы
                </button>

                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${provider.primaryColor}15` }}>
                      <Server className="w-6 h-6" style={{ color: provider.primaryColor }} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{activeServer.name}</h2>
                      <div className="text-sm text-muted-foreground">{activeServer.plan} • {activeServer.os}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><RefreshCw className="w-4 h-4 mr-1" /> Перезагрузить</Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/30"><Power className="w-4 h-4 mr-1" /> Стоп</Button>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'IP-адрес', value: activeServer.ip, icon: Globe },
                    { label: 'Uptime', value: activeServer.uptime, icon: Clock },
                    { label: 'Локация', value: activeServer.location, icon: Shield },
                    { label: 'Оплата', value: `${activeServer.price}₽/мес`, icon: CreditCard },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <item.icon className="w-3 h-3" /> {item.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                <div className="border border-border bg-card rounded-2xl p-5 mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Ресурсы</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'CPU', ...activeServer.cpu, icon: Cpu },
                      { label: 'RAM', ...activeServer.ram, icon: MemoryStick },
                      { label: 'Диск', ...activeServer.disk, icon: HardDrive },
                      { label: 'Трафик', used: (activeServer.bandwidth.used / activeServer.bandwidth.total) * 100, total: activeServer.bandwidth.total, label2: activeServer.bandwidth.label, icon: Gauge },
                    ].map(r => (
                      <div key={r.label}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="flex items-center gap-1.5 text-muted-foreground"><r.icon className="w-3.5 h-3.5" /> {r.label}</span>
                          <span className="font-medium text-foreground">{r.used}%</span>
                        </div>
                        <Progress value={r.used} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Консоль', icon: Monitor },
                    { label: 'Бэкапы', icon: RefreshCw },
                    { label: 'DNS', icon: Globe },
                    { label: 'Мониторинг', icon: BarChart3 },
                  ].map(a => (
                    <button
                      key={a.label}
                      className="p-4 rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-sm transition-all text-center"
                    >
                      <a.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{a.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ FINANCES ═══ */}
            {activeSection === 'finances' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Финансы</h2>
                  <Button style={{ background: provider.primaryColor }} className="text-white">
                    <Plus className="w-4 h-4 mr-2" /> Пополнить
                  </Button>
                </div>

                {/* Balance cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="rounded-2xl p-5 text-white" style={{ background: provider.primaryColor }}>
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                      <Wallet className="w-4 h-4" /> Баланс
                    </div>
                    <div className="text-3xl font-bold">{user.balance.toLocaleString()}₽</div>
                  </div>
                  <div className="rounded-2xl p-5 border border-border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <Receipt className="w-4 h-4" /> Расход/мес
                    </div>
                    <div className="text-3xl font-bold text-foreground">798₽</div>
                  </div>
                  <div className="rounded-2xl p-5 border border-border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <CreditCard className="w-4 h-4" /> Бонусы
                    </div>
                    <div className="text-3xl font-bold text-foreground">{user.bonuses} PLZ</div>
                  </div>
                </div>

                {/* Transactions */}
                <div className="border border-border bg-card rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">История операций</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-secondary text-muted-foreground'
                          }`}>
                            {tx.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{tx.desc}</div>
                            <div className="text-xs text-muted-foreground">{tx.date}</div>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ SUPPORT ═══ */}
            {activeSection === 'support' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Поддержка</h2>
                  <Button style={{ background: provider.primaryColor }} className="text-white">
                    <PlusCircle className="w-4 h-4 mr-2" /> Новый тикет
                  </Button>
                </div>

                <div className="border border-border bg-card rounded-2xl overflow-hidden">
                  <div className="divide-y divide-border">
                    {tickets.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            t.status === 'answered' ? 'text-white' : 'bg-secondary text-muted-foreground'
                          }`} style={t.status === 'answered' ? { background: provider.primaryColor } : {}}>
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{t.subject}</div>
                            <div className="text-xs text-muted-foreground">{t.id} • {t.date}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          t.status === 'answered' ? 'border-primary/30 text-primary bg-primary/5' :
                          'text-muted-foreground'
                        }>
                          {t.status === 'answered' ? 'Отвечен' : 'Закрыт'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Knowledge base */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Частые вопросы</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Как подключиться по SSH?',
                      'Как установить SSL сертификат?',
                      'Как сделать бэкап сервера?',
                      'Как сменить ОС на VPS?',
                    ].map(q => (
                      <button key={q} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-border/80 hover:shadow-sm transition-all text-left">
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground">{q}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ SETTINGS ═══ */}
            {activeSection === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Настройки</h2>

                <div className="space-y-6 max-w-2xl">
                  <div className="border border-border bg-card rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Личные данные</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Имя</label>
                        <Input defaultValue={user.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <Input defaultValue={user.email} />
                      </div>
                      <Button style={{ background: provider.primaryColor }} className="text-white">Сохранить</Button>
                    </div>
                  </div>

                  <div className="border border-border bg-card rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Безопасность</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-foreground">Двухфакторная аутентификация</div>
                          <div className="text-xs text-muted-foreground">Дополнительная защита аккаунта</div>
                        </div>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Включена</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-foreground">API-ключи</div>
                          <div className="text-xs text-muted-foreground">Управление ключами доступа</div>
                        </div>
                        <Button variant="outline" size="sm">Управление</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border bg-card rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Уведомления</h3>
                    <div className="space-y-3 text-sm">
                      {['Email уведомления об оплате', 'Telegram уведомления', 'Уведомления о нагрузке сервера'].map(item => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-foreground">{item}</span>
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Вкл</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingClientDemo;
