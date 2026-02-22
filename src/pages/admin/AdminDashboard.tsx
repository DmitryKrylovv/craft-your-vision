import {
  Users,
  Building2,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const stats = [
  { label: 'Пользователей', value: '12 847', change: '+12%', up: true, icon: Users },
  { label: 'Провайдеров', value: '234', change: '+3%', up: true, icon: Building2 },
  { label: 'Заказов сегодня', value: '1 256', change: '-5%', up: false, icon: ShoppingCart },
  { label: 'Доход (мес)', value: '₽4.2M', change: '+18%', up: true, icon: TrendingUp },
];

const chartData = [
  { name: 'Пн', users: 420, orders: 180 },
  { name: 'Вт', users: 380, orders: 200 },
  { name: 'Ср', users: 510, orders: 240 },
  { name: 'Чт', users: 470, orders: 220 },
  { name: 'Пт', users: 600, orders: 310 },
  { name: 'Сб', users: 350, orders: 150 },
  { name: 'Вс', users: 280, orders: 120 },
];

const recentActivity = [
  { type: 'user', text: 'Новая регистрация: ivan@example.com', time: '2 мин назад', icon: Users, color: 'text-blue-500' },
  { type: 'provider', text: 'Заявка от "CloudHost Pro"', time: '15 мин назад', icon: Building2, color: 'text-emerald-500' },
  { type: 'warning', text: 'Жалоба на провайдера #128', time: '32 мин назад', icon: AlertTriangle, color: 'text-amber-500' },
  { type: 'order', text: 'Заказ VDS #45821 оплачен', time: '1 ч назад', icon: CheckCircle2, color: 'text-emerald-500' },
  { type: 'content', text: 'Статья на модерации: "Как выбрать хостинг"', time: '2 ч назад', icon: FileText, color: 'text-primary' },
  { type: 'provider', text: 'Провайдер "ServerX" обновил тарифы', time: '3 ч назад', icon: Building2, color: 'text-emerald-500' },
];

const pendingItems = [
  { label: 'Заявки провайдеров', count: 8, color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Жалобы', count: 3, color: 'bg-amber-500/10 text-amber-600' },
  { label: 'Статьи на модерации', count: 12, color: 'bg-purple-500/10 text-purple-600' },
  { label: 'Запросы в поддержку', count: 24, color: 'bg-red-500/10 text-red-600' },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Дашборд</h1>
        <p className="text-muted-foreground text-sm mt-1">Обзор платформы за последние 30 дней</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mt-3">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Посещаемость и заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(220, 10%, 45%)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(220, 10%, 45%)' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(0, 0%, 100%)',
                      border: '1px solid hsl(210, 20%, 90%)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="users" stroke="hsl(210, 100%, 50%)" fill="url(#colorUsers)" strokeWidth={2} name="Пользователи" />
                  <Area type="monotone" dataKey="orders" stroke="hsl(150, 60%, 45%)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" name="Заказы" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Ожидают действий
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <span className="text-sm text-foreground">{item.label}</span>
                <Badge variant="secondary" className={item.color}>
                  {item.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.text}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
