import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Message, SubscriptionPlan, LeaderboardUser } from '../types';

// Типи для сповіщень
export interface PaymentNotification {
  id: string;
  userName: string;
  userEmail: string;
  userTelegram?: string;
  plan: 'basic' | 'pro' | 'pro3';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'rejected';
  message?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (name: string, email: string, secretCode?: string) => void;
  logout: () => void;
  addPoints: (points: number) => void;
  chatHistory: Message[];
  addMessage: (msg: Message) => void;
  clearChat: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  leaderboardUsers: LeaderboardUser[];
  updateUserSubscription: (userId: string, plan: SubscriptionPlan) => void;
  isOwner: boolean;
  isAdmin: boolean;
  dailyMessagesLimit: number;
  canSendMessage: boolean;
  incrementMessageCount: () => void;
  // Нові функції для сповіщень
  notifications: PaymentNotification[];
  addPaymentNotification: (notification: Omit<PaymentNotification, 'id' | 'timestamp' | 'status'>) => void;
  updateNotificationStatus: (id: string, status: 'confirmed' | 'rejected') => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

// Секретні коди для власника та адміна
const OWNER_CODE = 'ШАБЛЕЗУБ-ВОЛХ';
const ADMIN_CODE = 'ШАБЛЕЗУБ-АДМІН';

// Початкові користувачі для рейтингу
const initialLeaderboardUsers: LeaderboardUser[] = [
  { id: '1', name: 'Богдан Власник', avatar: '👑', points: 15200, subscription: 'pro', streak: 45 },
  { id: '2', name: 'Олександра К.', avatar: '👩‍🎓', points: 8450, subscription: 'pro', streak: 28 },
  { id: '3', name: 'Дмитро М.', avatar: '🧑‍💻', points: 7200, subscription: 'basic', streak: 21 },
  { id: '4', name: 'Анна П.', avatar: '📚', points: 6800, subscription: 'pro', streak: 33 },
  { id: '5', name: 'Максим В.', avatar: '🎯', points: 5900, subscription: 'free', streak: 14 },
  { id: '6', name: 'Юлія Г.', avatar: '✨', points: 5200, subscription: 'basic', streak: 19 },
  { id: '7', name: 'Ігор Т.', avatar: '🚀', points: 4700, subscription: 'free', streak: 12 },
  { id: '8', name: 'Марія С.', avatar: '🌟', points: 4100, subscription: 'pro', streak: 25 },
  { id: '9', name: 'Сергій Р.', avatar: '💪', points: 3600, subscription: 'free', streak: 8 },
  { id: '10', name: 'Катя Л.', avatar: '🎨', points: 3200, subscription: 'basic', streak: 15 },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nmt_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, joinDate: new Date(parsed.joinDate) };
    }
    return null;
  });
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [leaderboardUsers] = useState<LeaderboardUser[]>(initialLeaderboardUsers);
  
  // Система сповіщень про оплати
  const [notifications, setNotifications] = useState<PaymentNotification[]>(() => {
    const saved = localStorage.getItem('nmt_notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((n: PaymentNotification) => ({ ...n, timestamp: new Date(n.timestamp) }));
    }
    return [];
  });

  // Перевірка днів для обмежень повідомлень
  const today = new Date().toDateString();

  useEffect(() => {
    if (user) {
      localStorage.setItem('nmt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nmt_user');
    }
  }, [user]);
  
  // Зберігаємо сповіщення
  useEffect(() => {
    localStorage.setItem('nmt_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const login = (name: string, email: string, secretCode?: string) => {
    const isOwner = secretCode === OWNER_CODE;
    const isAdmin = secretCode === ADMIN_CODE || isOwner;
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isOwner ? 'Богдан Власник' : name,
      email,
      isPro: isOwner || isAdmin,
      isOwner,
      isAdmin,
      subscription: isOwner || isAdmin ? 'pro' : 'free',
      points: isOwner ? 15200 : isAdmin ? 5000 : 50,
      streak: isOwner ? 45 : isAdmin ? 20 : 1,
      badges: [
        { id: '1', name: 'Перший крок', icon: '🚀', description: 'Зареєструвався на платформі', earned: true },
        { id: '2', name: 'Тиждень поспіль', icon: '🔥', description: '7 днів навчання підряд', earned: isOwner || isAdmin },
        { id: '3', name: 'Відмінник', icon: '⭐', description: 'Набрав 500 балів', earned: isOwner || isAdmin },
        { id: '4', name: 'Маестро', icon: '🏆', description: 'Здав НМТ на 200', earned: isOwner },
        { id: '5', name: 'Власник', icon: '👑', description: 'Власник платформи', earned: isOwner },
        { id: '6', name: 'Адміністратор', icon: '🛡️', description: 'Адміністратор платформи', earned: isAdmin },
      ],
      completedLessons: isOwner ? ['v1', 'v2', 'v3', 'v4'] : isAdmin ? ['v1', 'v2'] : [],
      joinDate: new Date(),
      dailyMessagesUsed: 0,
      lastMessageDate: today,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setChatHistory([]);
  };

  const addPoints = (points: number) => {
    if (user) {
      setUser({ ...user, points: user.points + points });
    }
  };

  const addMessage = (msg: Message) => {
    setChatHistory(prev => [...prev, msg]);
  };

  const clearChat = () => setChatHistory([]);

  const updateUserSubscription = (userId: string, plan: SubscriptionPlan) => {
    // Оновлюємо підписку поточного користувача
    if (user && user.id === userId) {
      setUser({ ...user, subscription: plan, isPro: plan === 'pro' });
    }
    // Тут можна додати логіку для оновлення інших користувачів
  };

  // Обмеження повідомлень
  const dailyMessagesLimit = user?.subscription === 'pro' ? 999 : user?.subscription === 'basic' ? 20 : 5;
  const canSendMessage = !user || (user.dailyMessagesUsed < dailyMessagesLimit);

  const incrementMessageCount = () => {
    if (user) {
      // Скидаємо лічильник, якщо новий день
      if (user.lastMessageDate !== today) {
        setUser({ ...user, dailyMessagesUsed: 1, lastMessageDate: today });
      } else {
        setUser({ ...user, dailyMessagesUsed: user.dailyMessagesUsed + 1 });
      }
    }
  };
  
  // Додавання сповіщення про оплату
  const addPaymentNotification = (notification: Omit<PaymentNotification, 'id' | 'timestamp' | 'status'>) => {
    const newNotification: PaymentNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      status: 'pending',
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  // Оновлення статусу сповіщення
  const updateNotificationStatus = (id: string, status: 'confirmed' | 'rejected') => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status } : n
    ));
  };
  
  // Кількість непрочитаних сповіщень
  const unreadNotificationsCount = notifications.filter(n => n.status === 'pending').length;

  return (
    <AppContext.Provider value={{
      user, setUser, isLoggedIn: !!user,
      login, logout, addPoints,
      chatHistory, addMessage, clearChat,
      currentPage, setCurrentPage,
      leaderboardUsers,
      updateUserSubscription,
      isOwner: user?.isOwner || false,
      isAdmin: user?.isAdmin || false,
      dailyMessagesLimit, canSendMessage, incrementMessageCount,
      notifications, addPaymentNotification, updateNotificationStatus, unreadNotificationsCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
