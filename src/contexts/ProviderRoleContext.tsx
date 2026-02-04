import { createContext, useContext, useState, ReactNode } from 'react';

export type ProviderRole = 'owner' | 'manager' | 'support';

interface ProviderUser {
  name: string;
  email: string;
  initials: string;
  role: ProviderRole;
  roleLabel: string;
  company: string;
  logo?: string;
}

const providerUsers: Record<ProviderRole, ProviderUser> = {
  owner: {
    name: 'Дмитрий Волков',
    email: 'dmitry@cloudpro.ru',
    initials: 'ДВ',
    role: 'owner',
    roleLabel: 'Владелец',
    company: 'CloudPro Hosting',
  },
  manager: {
    name: 'Анна Соколова',
    email: 'anna@cloudpro.ru',
    initials: 'АС',
    role: 'manager',
    roleLabel: 'Менеджер',
    company: 'CloudPro Hosting',
  },
  support: {
    name: 'Михаил Орлов',
    email: 'support@cloudpro.ru',
    initials: 'МО',
    role: 'support',
    roleLabel: 'Поддержка',
    company: 'CloudPro Hosting',
  },
};

interface ProviderPermissions {
  canViewStats: boolean;
  canManageLocations: boolean;
  canManageTariffs: boolean;
  canManageIntegrations: boolean;
  canRespondReviews: boolean;
  canViewFinances: boolean;
  canManageTeam: boolean;
}

const providerPermissions: Record<ProviderRole, ProviderPermissions> = {
  owner: {
    canViewStats: true,
    canManageLocations: true,
    canManageTariffs: true,
    canManageIntegrations: true,
    canRespondReviews: true,
    canViewFinances: true,
    canManageTeam: true,
  },
  manager: {
    canViewStats: true,
    canManageLocations: true,
    canManageTariffs: true,
    canManageIntegrations: false,
    canRespondReviews: true,
    canViewFinances: false,
    canManageTeam: false,
  },
  support: {
    canViewStats: false,
    canManageLocations: false,
    canManageTariffs: false,
    canManageIntegrations: false,
    canRespondReviews: true,
    canViewFinances: false,
    canManageTeam: false,
  },
};

interface ProviderRoleContextType {
  currentRole: ProviderRole;
  currentUser: ProviderUser;
  permissions: ProviderPermissions;
  setRole: (role: ProviderRole) => void;
  allRoles: { value: ProviderRole; label: string }[];
}

const ProviderRoleContext = createContext<ProviderRoleContextType | undefined>(undefined);

export const ProviderRoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<ProviderRole>('owner');

  const allRoles: { value: ProviderRole; label: string }[] = [
    { value: 'owner', label: 'Владелец' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'support', label: 'Поддержка' },
  ];

  const value: ProviderRoleContextType = {
    currentRole,
    currentUser: providerUsers[currentRole],
    permissions: providerPermissions[currentRole],
    setRole: setCurrentRole,
    allRoles,
  };

  return <ProviderRoleContext.Provider value={value}>{children}</ProviderRoleContext.Provider>;
};

export const useProviderRole = () => {
  const context = useContext(ProviderRoleContext);
  if (!context) {
    throw new Error('useProviderRole must be used within a ProviderRoleProvider');
  }
  return context;
};
