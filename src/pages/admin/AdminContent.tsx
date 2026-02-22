import { useState } from 'react';
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  MoreHorizontal,
  Search,
  Filter,
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

const articles = [
  { id: 1, title: 'Как выбрать VPS для стартапа в 2025 году', author: 'Иван Петров', status: 'pending', date: '2 ч назад', views: 0 },
  { id: 2, title: 'Топ-10 провайдеров облачного хостинга', author: 'Мария К.', status: 'pending', date: '5 ч назад', views: 0 },
  { id: 3, title: 'Руководство по настройке DNS', author: 'Алексей С.', status: 'approved', date: '1 день назад', views: 1240 },
  { id: 4, title: 'SSL сертификаты: полный гайд', author: 'Елена В.', status: 'approved', date: '2 дня назад', views: 3420 },
  { id: 5, title: 'Spam article content here', author: 'user42', status: 'rejected', date: '3 дня назад', views: 0 },
];

const reviews = [
  { id: 1, provider: 'CloudHost Pro', user: 'ivan@mail.ru', rating: 1, text: 'Ужасная поддержка, сервер лежал 3 дня...', status: 'reported', date: '1 ч назад' },
  { id: 2, provider: 'ServerX', user: 'maria@tech.io', rating: 5, text: 'Отличный провайдер! Быстрые серверы.', status: 'pending', date: '3 ч назад' },
  { id: 3, provider: 'HostPro', user: 'alex@dev.pro', rating: 4, text: 'Хорошее соотношение цена/качество.', status: 'approved', date: '1 день назад' },
];

const complaints = [
  { id: 1, subject: 'Спам в отзывах', target: 'Провайдер "QuickHost"', reporter: 'ivan@mail.ru', priority: 'high', date: '30 мин назад' },
  { id: 2, subject: 'Фейковые тарифы', target: 'Провайдер "CheapVPS"', reporter: 'support@company.ru', priority: 'high', date: '2 ч назад' },
  { id: 3, subject: 'Нарушение ToS', target: 'Пользователь user42', reporter: 'auto', priority: 'medium', date: '1 день назад' },
];

const statusBadge = (status: string) => {
  const config: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    pending: { label: 'На модерации', className: 'bg-amber-500/10 text-amber-600 border-amber-200', icon: Clock },
    approved: { label: 'Одобрено', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', icon: CheckCircle2 },
    rejected: { label: 'Отклонено', className: 'bg-red-500/10 text-red-600 border-red-200', icon: XCircle },
    reported: { label: 'Жалоба', className: 'bg-red-500/10 text-red-600 border-red-200', icon: AlertTriangle },
  };
  const c = config[status] || config.pending;
  return (
    <Badge variant="outline" className={`gap-1 ${c.className}`}>
      <c.icon className="w-3 h-3" />
      {c.label}
    </Badge>
  );
};

const priorityBadge = (priority: string) => {
  const cls = priority === 'high' ? 'bg-red-500/10 text-red-600 border-red-200' : 'bg-amber-500/10 text-amber-600 border-amber-200';
  return <Badge variant="outline" className={cls}>{priority === 'high' ? 'Высокий' : 'Средний'}</Badge>;
};

const AdminContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Модерация контента</h1>
        <p className="text-muted-foreground text-sm mt-1">Статьи, отзывы и жалобы</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">На модерации</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">14</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Статей</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">847</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Отзывов</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">3 240</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-muted-foreground">Жалоб</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">3</p>
        </div>
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles" className="gap-1.5">
            <FileText className="w-4 h-4" />
            Статьи
            <Badge variant="secondary" className="ml-1 bg-amber-500/10 text-amber-600 text-[10px] px-1.5">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Отзывы
          </TabsTrigger>
          <TabsTrigger value="complaints" className="gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Жалобы
            <Badge variant="secondary" className="ml-1 bg-red-500/10 text-red-600 text-[10px] px-1.5">3</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-4 space-y-3">
          {articles.map((article) => (
            <Card key={article.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground">{article.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                      {article.views > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(article.status)}
                    {article.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 space-y-3">
          {reviews.map((review) => (
            <Card key={review.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{review.provider}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-xs ${i < review.rating ? 'text-amber-400' : 'text-muted'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{review.text}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{review.user}</span>
                      <span>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(review.status)}
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-red-600 border-red-200 hover:bg-red-50">
                        <XCircle className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="complaints" className="mt-4 space-y-3">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground">{complaint.subject}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{complaint.target}</span>
                      <span>·</span>
                      <span>от {complaint.reporter}</span>
                      <span>·</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {priorityBadge(complaint.priority)}
                    <Button size="sm">Рассмотреть</Button>
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

export default AdminContent;
