import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  date: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'SSL сертификат истекает',
    description: 'Осталось 6 дней до истечения',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'warning',
    read: false,
  },
  {
    id: '2',
    title: 'VPS успешно продлён',
    description: 'VPS Pro #1 продлён на 1 месяц',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: 'success',
    read: false,
  },
  {
    id: '3',
    title: 'Платёж успешен',
    description: 'Списано 890 ₽',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    type: 'success',
    read: true,
  },
];

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
        unreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
