import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Pencil,
  Trash2,
  Crown,
  Briefcase,
  Headphones,
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'support';
  avatar: string;
  lastActive: string;
}

const roleLabels: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  owner: { label: 'Владелец', icon: Crown, color: 'text-amber-600 bg-amber-500/10 border-amber-200' },
  manager: { label: 'Менеджер', icon: Briefcase, color: 'text-blue-600 bg-blue-500/10 border-blue-200' },
  support: { label: 'Поддержка', icon: Headphones, color: 'text-emerald-600 bg-emerald-500/10 border-emerald-200' },
};

const ProviderTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([
    { id: 1, name: 'Дмитрий Волков', email: 'dmitry@cloudpro.ru', role: 'owner', avatar: 'ДВ', lastActive: 'Сейчас онлайн' },
    { id: 2, name: 'Анна Соколова', email: 'anna@cloudpro.ru', role: 'manager', avatar: 'АС', lastActive: '2 часа назад' },
    { id: 3, name: 'Михаил Орлов', email: 'mikhail@cloudpro.ru', role: 'support', avatar: 'МО', lastActive: '30 минут назад' },
    { id: 4, name: 'Елена Петрова', email: 'elena@cloudpro.ru', role: 'support', avatar: 'ЕП', lastActive: 'Вчера' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<{ name: string; email: string; role: 'owner' | 'manager' | 'support' }>({ name: '', email: '', role: 'support' });

  const handleAddMember = () => {
    const newId = Math.max(...team.map(m => m.id)) + 1;
    setTeam([...team, {
      id: newId,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: newMember.name.split(' ').map(n => n[0]).join(''),
      lastActive: 'Приглашён',
    }]);
    setNewMember({ name: '', email: '', role: 'support' });
    setIsDialogOpen(false);
  };

  const handleDeleteMember = (id: number) => {
    setTeam(team.filter(m => m.id !== id));
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Команда</h1>
          <p className="text-muted-foreground">Управляйте доступом сотрудников</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Пригласить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Пригласить сотрудника</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Имя</Label>
                <Input
                  placeholder="Иван Иванов"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="ivan@company.ru"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Роль</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(value) => setNewMember({ ...newMember, role: value as 'owner' | 'manager' | 'support' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="support">Поддержка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Role Description */}
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-2">Права доступа:</p>
                {(newMember.role === 'manager' || newMember.role === 'owner') && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Просмотр статистики</li>
                    <li>• Управление локациями и тарифами</li>
                    <li>• Ответы на отзывы</li>
                  </ul>
                )}
                {newMember.role === 'support' && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ответы на отзывы</li>
                    <li>• Просмотр настроек (без редактирования)</li>
                  </ul>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleAddMember}
                  disabled={!newMember.name || !newMember.email}
                >
                  Пригласить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(roleLabels).map(([key, value]) => {
          const RoleIcon = value.icon;
          return (
            <Badge key={key} variant="outline" className={`gap-1 ${value.color}`}>
              <RoleIcon className="w-3 h-3" />
              {value.label}
            </Badge>
          );
        })}
      </div>

      {/* Team List */}
      <div className="space-y-3">
        {team.map((member) => {
          const roleInfo = roleLabels[member.role];
          const RoleIcon = roleInfo.icon;
          
          return (
            <Card key={member.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium">{member.name}</span>
                      <Badge variant="outline" className={`gap-1 ${roleInfo.color}`}>
                        <RoleIcon className="w-3 h-3" />
                        {roleInfo.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${member.lastActive === 'Сейчас онлайн' ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                      {member.lastActive}
                    </p>
                  </div>
                  {member.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Изменить роль
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderTeam;
