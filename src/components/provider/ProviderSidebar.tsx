import { Link, useLocation } from 'react-router-dom';
import { useProviderRole, ProviderRole } from '@/contexts/ProviderRoleContext';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LayoutDashboard,
  MapPin,
  Server,
  Link2,
  MessageSquare,
  BarChart3,
  Settings,
  Crown,
  Briefcase,
  Headphones,
  Users,
  HelpCircle,
  Building2,
} from 'lucide-react';

const roleIcons: Record<ProviderRole, React.ElementType> = {
  owner: Crown,
  manager: Briefcase,
  support: Headphones,
};

const roleColors: Record<ProviderRole, string> = {
  owner: 'bg-amber-500/10 text-amber-600 border-amber-200',
  manager: 'bg-blue-500/10 text-blue-600 border-blue-200',
  support: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
};

const ProviderSidebar = () => {
  const location = useLocation();
  const { currentRole, currentUser, permissions, setRole, allRoles } = useProviderRole();
  const Icon = roleIcons[currentRole];

  const menuItems = [
    { path: '/provider-panel', icon: LayoutDashboard, label: 'Обзор', show: true },
    { path: '/provider-panel/locations', icon: MapPin, label: 'Локации', show: permissions.canManageLocations },
    { path: '/provider-panel/tariffs', icon: Server, label: 'Тарифы', show: permissions.canManageTariffs },
    { path: '/provider-panel/integrations', icon: Link2, label: 'Интеграции', show: permissions.canManageIntegrations },
    { path: '/provider-panel/reviews', icon: MessageSquare, label: 'Отзывы', show: permissions.canRespondReviews },
    { path: '/provider-panel/stats', icon: BarChart3, label: 'Статистика', show: permissions.canViewStats },
    { path: '/provider-panel/team', icon: Users, label: 'Команда', show: permissions.canManageTeam },
    { path: '/provider-panel/settings', icon: Settings, label: 'Настройки', show: true },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-border">
      {/* Company Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
            CP
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{currentUser.company}</p>
            <p className="text-xs text-muted-foreground">Провайдер</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {menuItems.filter(item => item.show).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Role Switcher */}
      <div className="p-4 border-t border-border">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
              Демо-режим
            </span>
          </div>
          
          <Select value={currentRole} onValueChange={(value: ProviderRole) => setRole(value)}>
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
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="p-4 border-t border-border">
        <Link
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Помощь</span>
        </Link>
      </div>
    </aside>
  );
};

export default ProviderSidebar;
