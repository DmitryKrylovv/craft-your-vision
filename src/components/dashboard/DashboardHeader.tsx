import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '@/contexts/NotificationsContext';
import { useRole } from '@/contexts/RoleContext';
import { 
  Menu, 
  Bell, 
  Settings, 
  LogOut, 
  CreditCard, 
  Server, 
  HelpCircle,
  ChevronDown,
  Receipt,
  Shield,
  Headphones,
  Wallet,
  Plus,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Wrench,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import ploozaLogo from '@/assets/plooza-logo.svg';

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Только что';
  if (diffMins < 60) return `${diffMins} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  return `${diffDays} дн. назад`;
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
    default: return <Info className="w-4 h-4 text-blue-500" />;
  }
};

const roleIcons = {
  admin: Shield,
  devops: Wrench,
  accountant: Calculator,
};

const roleBadgeColors = {
  admin: 'bg-red-500/10 text-red-600 border-red-200',
  devops: 'bg-blue-500/10 text-blue-600 border-blue-200',
  accountant: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
};

const DashboardHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { currentUser, permissions, currentRole } = useRole();
  const location = useLocation();

  const RoleIcon = roleIcons[currentRole];

  // Build nav links based on permissions
  const navLinks = [
    permissions.canViewServers && { href: '/dashboard', label: 'Услуги', icon: Server },
    permissions.canViewFinances && { href: '/dashboard/finances', label: 'Финансы', icon: CreditCard },
    permissions.canViewSecurity && { href: '/dashboard/security', label: 'Безопасность', icon: Shield },
    permissions.canViewSupport && { href: '/dashboard/support', label: 'Поддержка', icon: Headphones },
  ].filter(Boolean) as { href: string; label: string; icon: React.ElementType }[];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center h-14 md:h-16">
        {/* Logo - aligned with sidebar on lg+ */}
        <Link to="/" className="hidden lg:flex w-64 items-center justify-center border-r border-border h-full shrink-0">
          <img src={ploozaLogo} alt="Plooza" className="h-7" />
        </Link>
        
        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-2">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-4 border-b border-border">
                <img src={ploozaLogo} alt="Plooza" className="h-7" />
              </div>

              {/* Mobile User Info */}
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {currentUser.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{currentUser.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roleBadgeColors[currentRole]}`}>
                        {currentUser.roleLabel}
                      </Badge>
                    </div>
                  </div>
                </div>
                {permissions.canViewBalance && (
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Баланс</span>
                    <span className="font-semibold">2 450 ₽</span>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link
                  to="/dashboard/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Настройки
                </Link>
                <Link
                  to="/help"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                  Помощь
                </Link>
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  Выйти
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <Link to="/" className="lg:hidden flex items-center ml-2">
          <img src={ploozaLogo} alt="Plooza" className="h-6" />
        </Link>

        <div className="flex items-center flex-1 gap-4 px-3 md:px-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-2 lg:ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Balance - only show if permission allows */}
            {permissions.canViewBalance && (
              <div 
                id="onboarding-balance"
                className="hidden sm:flex items-center h-8 md:h-9 rounded-full border border-border bg-muted/50"
              >
                <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3">
                  <Wallet className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">2 450 ₽</span>
                </div>
                <div className="w-px h-4 md:h-5 bg-border" />
                <button className="h-full px-2 md:px-3 hover:bg-muted transition-colors rounded-r-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </button>
              </div>
            )}

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="onboarding-notifications" variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Уведомления</h4>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Прочитать все
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground text-sm">
                      Нет уведомлений
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification, index) => (
                      <div 
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-3 hover:bg-muted cursor-pointer ${
                          index < notifications.length - 1 ? 'border-b border-border' : ''
                        } ${!notification.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex items-start gap-2">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''} text-foreground`}>
                              {notification.title}
                            </p>
                            {notification.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(notification.date)}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-primary">
                    Все уведомления
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
              <Link to="/help">
                <HelpCircle className="w-5 h-5" />
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pr-3 rounded-full hover:bg-muted transition-colors">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                    {currentUser.initials}
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground">{currentUser.name.split(' ')[0]}</span>
                    <Badge variant="outline" className={`text-[10px] px-1 py-0 ${roleBadgeColors[currentRole]}`}>
                      <RoleIcon className="w-3 h-3" />
                    </Badge>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {currentUser.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${roleBadgeColors[currentRole]}`}>
                      <RoleIcon className="w-3 h-3 mr-1" />
                      {currentUser.roleLabel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{currentUser.company}</p>
                  {permissions.canViewBalance && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">Баланс</span>
                      <span className="text-sm font-semibold text-foreground">2 450 ₽</span>
                    </div>
                  )}
                </div>
                {permissions.canViewServers && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Server className="w-4 h-4 mr-2" />
                      Мои услуги
                    </Link>
                  </DropdownMenuItem>
                )}
                {permissions.canViewFinances && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/finances" className="cursor-pointer">
                      <Receipt className="w-4 h-4 mr-2" />
                      Финансы
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Настройки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
