import { useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Ban,
  Mail,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const users = [
  { id: 1, name: 'Иван Петров', email: 'ivan@company.ru', role: 'admin', status: 'active', registered: '12.01.2025', orders: 34, spent: '₽128 400' },
  { id: 2, name: 'Мария Козлова', email: 'maria@tech.io', role: 'user', status: 'active', registered: '28.02.2025', orders: 12, spent: '₽45 200' },
  { id: 3, name: 'Алексей Сидоров', email: 'alex@devops.pro', role: 'user', status: 'active', registered: '05.03.2025', orders: 8, spent: '₽22 800' },
  { id: 4, name: 'Елена Волкова', email: 'elena@mail.ru', role: 'user', status: 'blocked', registered: '15.04.2025', orders: 2, spent: '₽3 500' },
  { id: 5, name: 'Дмитрий Новиков', email: 'dmitry@cloud.com', role: 'provider', status: 'active', registered: '01.05.2025', orders: 0, spent: '₽0' },
  { id: 6, name: 'Анна Белова', email: 'anna@startup.ru', role: 'user', status: 'pending', registered: '20.06.2025', orders: 0, spent: '₽0' },
  { id: 7, name: 'Сергей Морозов', email: 'sergey@host.net', role: 'provider', status: 'active', registered: '10.07.2025', orders: 0, spent: '₽0' },
  { id: 8, name: 'Ольга Лебедева', email: 'olga@design.co', role: 'user', status: 'active', registered: '22.08.2025', orders: 5, spent: '₽18 900' },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Активен', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  blocked: { label: 'Заблокирован', className: 'bg-red-500/10 text-red-600 border-red-200' },
  pending: { label: 'Ожидает', className: 'bg-amber-500/10 text-amber-600 border-amber-200' },
};

const roleConfig: Record<string, { label: string; className: string }> = {
  admin: { label: 'Админ', className: 'bg-primary/10 text-primary' },
  user: { label: 'Клиент', className: 'bg-muted text-muted-foreground' },
  provider: { label: 'Провайдер', className: 'bg-purple-500/10 text-purple-600' },
};

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Пользователи</h1>
          <p className="text-muted-foreground text-sm mt-1">Управление аккаунтами и ролями</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 self-start">
          <Download className="w-4 h-4" />
          Экспорт
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="text-2xl font-bold text-foreground">12 847</p>
          <p className="text-xs text-muted-foreground mt-1">Всего</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="text-2xl font-bold text-emerald-600">11 920</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><UserCheck className="w-3 h-3" /> Активных</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="text-2xl font-bold text-red-500">142</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><UserX className="w-3 h-3" /> Заблокированных</p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="text-2xl font-bold text-amber-500">785</p>
          <p className="text-xs text-muted-foreground mt-1">Ожидают верификации</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени или email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="admin">Админы</SelectItem>
                <SelectItem value="user">Клиенты</SelectItem>
                <SelectItem value="provider">Провайдеры</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="blocked">Заблокированные</SelectItem>
                <SelectItem value="pending">Ожидающие</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead className="hidden md:table-cell">Роль</TableHead>
                <TableHead className="hidden sm:table-cell">Статус</TableHead>
                <TableHead className="hidden lg:table-cell">Регистрация</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Заказы</TableHead>
                <TableHead className="hidden xl:table-cell text-right">Потрачено</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className={roleConfig[user.role].className}>
                      {roleConfig[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className={statusConfig[user.status].className}>
                      {statusConfig[user.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.registered}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-right text-foreground">{user.orders}</TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-right font-medium text-foreground">{user.spent}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />Просмотр</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="w-4 h-4 mr-2" />Написать</DropdownMenuItem>
                        <DropdownMenuItem><Shield className="w-4 h-4 mr-2" />Роль</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive"><Ban className="w-4 h-4 mr-2" />Заблокировать</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Показано {filtered.length} из 12 847</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8 bg-primary text-primary-foreground border-primary">1</Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">2</Button>
            <Button variant="outline" size="sm" className="h-8 min-w-8">3</Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
