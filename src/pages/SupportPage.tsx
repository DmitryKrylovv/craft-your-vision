import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ChevronRight,
  Paperclip,
  Send,
  Headphones,
  LifeBuoy,
  FileText,
  Server,
  CreditCard,
  Settings,
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'waiting' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  lastMessage: string;
  unread: boolean;
}

const mockTickets: Ticket[] = [
  {
    id: 'TK-2401',
    subject: 'Проблема с доступом к серверу VPS Pro #1',
    category: 'technical',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-01-28',
    updatedAt: '2025-01-29 14:30',
    lastMessage: 'Инженер подключился к диагностике...',
    unread: true,
  },
  {
    id: 'TK-2398',
    subject: 'Вопрос по оплате услуг',
    category: 'billing',
    status: 'waiting',
    priority: 'medium',
    createdAt: '2025-01-25',
    updatedAt: '2025-01-27 10:15',
    lastMessage: 'Ожидаем подтверждение от вас',
    unread: false,
  },
  {
    id: 'TK-2385',
    subject: 'Настройка DNS для домена mysite.ru',
    category: 'technical',
    status: 'closed',
    priority: 'low',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-22 16:45',
    lastMessage: 'Рады были помочь! Обращайтесь.',
    unread: false,
  },
  {
    id: 'TK-2370',
    subject: 'Запрос на увеличение лимитов',
    category: 'general',
    status: 'closed',
    priority: 'medium',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-17 09:00',
    lastMessage: 'Лимиты успешно увеличены.',
    unread: false,
  },
];

const categories = [
  { id: 'technical', label: 'Техническая поддержка', icon: Server },
  { id: 'billing', label: 'Оплата и счета', icon: CreditCard },
  { id: 'general', label: 'Общие вопросы', icon: MessageSquare },
  { id: 'other', label: 'Другое', icon: FileText },
];

const SupportPage = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'in_progress':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'waiting':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Открыт';
      case 'in_progress': return 'В работе';
      case 'waiting': return 'Ожидает ответа';
      case 'closed': return 'Закрыт';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return MessageSquare;
      case 'in_progress': return Clock;
      case 'waiting': return AlertCircle;
      case 'closed': return CheckCircle2;
      default: return MessageSquare;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'low':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.message) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    toast.success('Обращение создано', {
      description: 'Мы ответим в ближайшее время',
    });
    setShowCreateModal(false);
    setNewTicket({ subject: '', category: '', priority: 'medium', message: '' });
  };

  const openCount = tickets.filter(t => t.status !== 'closed').length;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
          <div className="p-4 border-b border-border">
            <Button className="w-full gap-2" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4" />
              Новое обращение
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <nav className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Фильтры
              </div>
              {[
                { id: 'all', label: 'Все обращения', count: tickets.length },
                { id: 'open', label: 'Открытые', count: tickets.filter(t => t.status === 'open').length },
                { id: 'in_progress', label: 'В работе', count: tickets.filter(t => t.status === 'in_progress').length },
                { id: 'waiting', label: 'Ожидают ответа', count: tickets.filter(t => t.status === 'waiting').length },
                { id: 'closed', label: 'Закрытые', count: tickets.filter(t => t.status === 'closed').length },
              ].map((filter) => {
                const isActive = statusFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="flex-1 text-left">{filter.label}</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <Link
              to="/help"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>База знаний</span>
            </Link>
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
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">Поддержка</h1>
                  <p className="text-sm text-muted-foreground">
                    {openCount} активных обращений
                  </p>
                </div>
              </div>
              <Button className="gap-2 lg:hidden" onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Новое обращение</span>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{tickets.length}</p>
                      <p className="text-xs text-muted-foreground">Всего</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {tickets.filter(t => t.status === 'in_progress').length}
                      </p>
                      <p className="text-xs text-muted-foreground">В работе</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <AlertCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {tickets.filter(t => t.status === 'waiting').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Ожидают</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {tickets.filter(t => t.status === 'closed').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Решено</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по номеру или теме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Mobile Filters */}
            <div className="flex gap-2 mb-4 lg:hidden overflow-x-auto pb-2">
              {['all', 'open', 'in_progress', 'waiting', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status === 'all' ? 'Все' : getStatusLabel(status)}
                </button>
              ))}
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
              {filteredTickets.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                      <Headphones className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Нет обращений</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Создайте первое обращение, если нужна помощь
                    </p>
                    <Button onClick={() => setShowCreateModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Создать обращение
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredTickets.map((ticket) => {
                  const StatusIcon = getStatusIcon(ticket.status);
                  return (
                    <Card 
                      key={ticket.id} 
                      className={`border-0 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                        ticket.unread ? 'bg-primary/5' : 'bg-background'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg shrink-0 ${getStatusStyles(ticket.status)}`}>
                            <StatusIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                                {ticket.unread && (
                                  <span className="w-2 h-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">{ticket.updatedAt}</span>
                            </div>
                            <h3 className="font-medium text-foreground mb-2 line-clamp-1">{ticket.subject}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{ticket.lastMessage}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`${getStatusStyles(ticket.status)} border-0 text-xs`}>
                                {getStatusLabel(ticket.status)}
                              </Badge>
                              <Badge className={`${getPriorityStyles(ticket.priority)} border-0 text-xs`}>
                                {getPriorityLabel(ticket.priority)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === ticket.category)?.label || ticket.category}
                              </Badge>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create Ticket Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Новое обращение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Тема обращения *</Label>
              <Input
                id="subject"
                placeholder="Опишите проблему кратко"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Категория *</Label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Приоритет</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Сообщение *</Label>
              <Textarea
                id="message"
                placeholder="Подробно опишите вашу проблему или вопрос..."
                rows={5}
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              />
            </div>

            <Button variant="outline" className="gap-2" type="button">
              <Paperclip className="w-4 h-4" />
              Прикрепить файл
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateTicket} className="gap-2">
              <Send className="w-4 h-4" />
              Отправить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportPage;
