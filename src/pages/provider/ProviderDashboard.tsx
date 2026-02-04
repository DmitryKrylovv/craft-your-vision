import { useProviderRole } from '@/contexts/ProviderRoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Server,
  MapPin,
  Users,
  Star,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ShoppingCart,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

const ProviderDashboard = () => {
  const { permissions, currentUser } = useProviderRole();

  const stats = [
    {
      label: 'Активных серверов',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Локаций',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: MapPin,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Клиентов',
      value: '892',
      change: '+45',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Средний рейтинг',
      value: '4.7',
      change: '-0.1',
      trend: 'down',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const recentOrders = [
    { id: 1, client: 'ООО "ТехноСофт"', tariff: 'VDS Pro 8GB', date: '2 мин назад', status: 'new' },
    { id: 2, client: 'Иван Петров', tariff: 'VDS Start 2GB', date: '15 мин назад', status: 'new' },
    { id: 3, client: 'ИП Сидоров', tariff: 'VDS Business 16GB', date: '1 час назад', status: 'processing' },
    { id: 4, client: 'Digital Agency', tariff: 'VDS Pro 8GB', date: '3 часа назад', status: 'completed' },
  ];

  const recentReviews = [
    { id: 1, author: 'Алексей М.', rating: 5, text: 'Отличный сервис, быстрая поддержка!', date: '1 час назад', replied: false },
    { id: 2, author: 'Мария К.', rating: 4, text: 'Хорошие тарифы, но хотелось бы больше локаций', date: '5 часов назад', replied: true },
    { id: 3, author: 'Дмитрий В.', rating: 2, text: 'Были проблемы с сетью в Москве', date: '1 день назад', replied: false },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '3 отзыва ожидают ответа', link: '/provider-panel/reviews' },
    { id: 2, type: 'info', message: 'Интеграция с VMmanager требует обновления', link: '/provider-panel/integrations' },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Добро пожаловать, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Вот что происходит с вашим хостингом сегодня
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2 mb-6">
          {alerts.map((alert) => (
            <Link
              key={alert.id}
              to={alert.link}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                alert.type === 'warning' 
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' 
                  : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
              }`}
            >
              <AlertCircle className={`w-5 h-5 ${alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
              <span className="text-sm flex-1">{alert.message}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}

      {/* Stats */}
      {permissions.canViewStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Последние заказы
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/provider-panel/stats">Все заказы</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{order.client}</p>
                    <p className="text-xs text-muted-foreground">{order.tariff}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                      {order.status === 'new' ? 'Новый' : order.status === 'processing' ? 'В работе' : 'Готов'}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        {permissions.canRespondReviews && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Новые отзывы
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/provider-panel/reviews">Все отзывы</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{review.author}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      {!review.replied && (
                        <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-200">
                          Без ответа
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {permissions.canManageLocations && (
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/provider-panel/locations">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Добавить локацию</span>
            </Link>
          </Button>
        )}
        {permissions.canManageTariffs && (
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/provider-panel/tariffs">
              <Server className="w-5 h-5" />
              <span className="text-sm">Новый тариф</span>
            </Link>
          </Button>
        )}
        {permissions.canViewStats && (
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/provider-panel/stats">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Статистика</span>
            </Link>
          </Button>
        )}
        {permissions.canRespondReviews && (
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/provider-panel/reviews">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">Отзывы</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
