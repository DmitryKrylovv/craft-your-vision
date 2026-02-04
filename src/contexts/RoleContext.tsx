import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'devops' | 'accountant';

interface RoleUser {
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  roleLabel: string;
  company: string;
}

const roleUsers: Record<UserRole, RoleUser> = {
  admin: {
    name: 'Иван Петров',
    email: 'ivan@company.ru',
    initials: 'ИП',
    role: 'admin',
    roleLabel: 'Администратор',
    company: 'ООО "ТехноСервис"',
  },
  devops: {
    name: 'Алексей Сидоров',
    email: 'alexey@company.ru',
    initials: 'АС',
    role: 'devops',
    roleLabel: 'DevOps инженер',
    company: 'ООО "ТехноСервис"',
  },
  accountant: {
    name: 'Мария Козлова',
    email: 'maria@company.ru',
    initials: 'МК',
    role: 'accountant',
    roleLabel: 'Бухгалтер',
    company: 'ООО "ТехноСервис"',
  },
};

interface RolePermissions {
  canViewBalance: boolean;
  canViewFinances: boolean;
  canViewServers: boolean;
  canViewDomains: boolean;
  canViewSecurity: boolean;
  canViewSupport: boolean;
  canOrderServices: boolean;
  canManageServers: boolean;
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    canViewBalance: true,
    canViewFinances: true,
    canViewServers: true,
    canViewDomains: true,
    canViewSecurity: true,
    canViewSupport: true,
    canOrderServices: true,
    canManageServers: true,
  },
  devops: {
    canViewBalance: false,
    canViewFinances: false,
    canViewServers: true,
    canViewDomains: true,
    canViewSecurity: true,
    canViewSupport: true,
    canOrderServices: false,
    canManageServers: true,
  },
  accountant: {
    canViewBalance: true,
    canViewFinances: true,
    canViewServers: false,
    canViewDomains: false,
    canViewSecurity: false,
    canViewSupport: true,
    canOrderServices: false,
    canManageServers: false,
  },
};

interface RoleContextType {
  currentRole: UserRole;
  currentUser: RoleUser;
  permissions: RolePermissions;
  setRole: (role: UserRole) => void;
  allRoles: { value: UserRole; label: string }[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  const allRoles: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'Администратор' },
    { value: 'devops', label: 'DevOps инженер' },
    { value: 'accountant', label: 'Бухгалтер' },
  ];

  const value: RoleContextType = {
    currentRole,
    currentUser: roleUsers[currentRole],
    permissions: rolePermissions[currentRole],
    setRole: setCurrentRole,
    allRoles,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
