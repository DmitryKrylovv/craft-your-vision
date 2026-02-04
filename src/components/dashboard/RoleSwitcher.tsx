import { useRole, UserRole } from '@/contexts/RoleContext';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Shield, Wrench, Calculator, Users } from 'lucide-react';

const roleIcons: Record<UserRole, React.ElementType> = {
  admin: Shield,
  devops: Wrench,
  accountant: Calculator,
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-500/10 text-red-600 border-red-200',
  devops: 'bg-blue-500/10 text-blue-600 border-blue-200',
  accountant: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
};

const RoleSwitcher = () => {
  const { currentRole, currentUser, setRole, allRoles } = useRole();
  const Icon = roleIcons[currentRole];

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-amber-600" />
        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
          Демо-режим: переключение ролей
        </span>
      </div>
      
      <Select value={currentRole} onValueChange={(value: UserRole) => setRole(value)}>
        <SelectTrigger className="w-full bg-background">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{currentUser.roleLabel}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {allRoles.map((role) => {
            const RoleIcon = roleIcons[role.value];
            return (
              <SelectItem key={role.value} value={role.value}>
                <div className="flex items-center gap-2">
                  <RoleIcon className="w-4 h-4" />
                  <span>{role.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline" className={`text-[10px] ${roleColors[currentRole]}`}>
          {currentUser.roleLabel}
        </Badge>
        <span className="text-xs text-muted-foreground truncate">{currentUser.company}</span>
      </div>
    </div>
  );
};

export default RoleSwitcher;
