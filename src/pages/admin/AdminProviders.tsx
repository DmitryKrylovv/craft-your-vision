import { useState } from 'react';
import {
  Building2,
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Ban,
  Star,
  Server,
  MapPin,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const providers = [
  { id: 1, name: 'CloudHost Pro', status: 'active', tariffs: 24, locations: 5, rating: 4.8, orders: 1240, revenue: '₽2.1M', logo: 'CH' },
  { id: 2, name: 'ServerX', status: 'active', tariffs: 18, locations: 3, rating: 4.5, orders: 890, revenue: '₽1.4M', logo: 'SX' },
  { id: 3, name: 'HostPro', status: 'active', tariffs: 32, locations: 8, rating: 4.2, orders: 2100, revenue: '₽3.8M', logo: 'HP' },
  { id: 4, name: 'QuickVDS', status: 'suspended', tariffs: 12, locations: 2, rating: 3.1, orders: 340, revenue: '₽420K', logo: 'QV' },
  { id: 5, name: 'MegaCloud', status: 'active', tariffs: 45, locations: 12, rating: 4.9, orders: 3200, revenue: '₽5.6M', logo: 'MC' },
];

const applications = [
  { id: 1, name: 'NetHost Solutions', contact: 'info@nethost.ru', locations: 'Москва, Санкт-Петербург', date: '1 ч назад', type: 'VDS, Dedicated' },
  { id: 2, name: 'Облако365', contact: 'admin@oblako365.ru', locations: 'Казань', date: '5 ч назад', type: 'Cloud, VDS' },
  { id: 3, name: 'DataCenter Plus', contact: 'hello@dcplus.io', locations: 'Москва, Франкфурт, Амстердам', date: '1 день назад', type: 'Colocation, Dedicated' },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Активен', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  suspended: { label: 'Приостановлен', className: 'bg-red-500/10 text-red-600 border-red-200' },
};

const AdminProviders = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Провайдеры</h1>
        <p className="text-muted-foreground text-sm mt-1">Управление провайдерами и заявками</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Всего</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">234</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Заявки</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">8</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Тарифов</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">4 120</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Доход (мес)</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">₽13.3M</p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            Все провайдеры
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-1.5">
            Заявки
            <Badge variant="secondary" className="ml-1 bg-amber-500/10 text-amber-600 text-[10px] px-1.5">3</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск провайдеров..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid gap-3">
            {providers
              .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
              .map((provider) => (
                <Card key={provider.id} className="border border-border hover:shadow-sm transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {provider.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground">{provider.name}</h3>
                          <Badge variant="outline" className={statusConfig[provider.status].className}>
                            {statusConfig[provider.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" />{provider.rating}</span>
                          <span className="flex items-center gap-1"><Server className="w-3 h-3" />{provider.tariffs} тарифов</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{provider.locations} лок.</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{provider.orders.toLocaleString()}</p>
                          <p className="text-[11px] text-muted-foreground">заказов</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{provider.revenue}</p>
                          <p className="text-[11px] text-muted-foreground">доход</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />Профиль</DropdownMenuItem>
                          <DropdownMenuItem><Server className="w-4 h-4 mr-2" />Тарифы</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><Ban className="w-4 h-4 mr-2" />Приостановить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-4 space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="border border-border border-l-4 border-l-amber-400">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{app.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{app.contact}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.locations}</span>
                      <span className="hidden sm:inline">·</span>
                      <span>{app.type}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{app.date}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Одобрить</span>
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Отклонить</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProviders;
