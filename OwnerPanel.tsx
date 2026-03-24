import { useState } from 'react';
import { useApp } from '../context/AppContext';

// Wrapper component to use useApp hook

type Tab = 'dashboard' | 'notifications' | 'users' | 'admins' | 'subscriptions' | 'finance' | 'content' | 'promo' | 'settings' | 'logs';

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  uses: number;
  maxUses: number;
  plan: 'basic' | 'pro';
  active: boolean;
  createdAt: string;
}

interface LogEntry {
  id: string;
  type: 'user' | 'payment' | 'admin' | 'system';
  action: string;
  details: string;
  timestamp: string;
  ip?: string;
}

export default function OwnerPanel() {
  const { user, setCurrentPage, notifications, updateNotificationStatus, unreadNotificationsCount } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Симуляція даних користувачів
  const [users, setUsers] = useState([
    { id: '1', name: 'Олександр К.', email: 'alex@gmail.com', telegram: '@alex_nmt', plan: 'pro', points: 2847, status: 'active', paid: true, isAdmin: false, joinDate: '2024-01-15', lastActive: '2 хв тому', messagesCount: 156, videosWatched: 23 },
    { id: '2', name: 'Марія В.', email: 'maria@gmail.com', telegram: '@maria_ua', plan: 'pro', points: 2654, status: 'active', paid: true, isAdmin: false, joinDate: '2024-01-18', lastActive: '15 хв тому', messagesCount: 134, videosWatched: 19 },
    { id: '3', name: 'Дмитро Б.', email: 'dima@gmail.com', telegram: '@dima_hist', plan: 'basic', points: 2341, status: 'active', paid: true, isAdmin: true, joinDate: '2024-01-20', lastActive: '1 год тому', messagesCount: 98, videosWatched: 15 },
    { id: '4', name: 'Анна С.', email: 'anna@gmail.com', telegram: '@anna_s', plan: 'free', points: 1876, status: 'active', paid: false, isAdmin: false, joinDate: '2024-02-01', lastActive: '3 год тому', messagesCount: 45, videosWatched: 8 },
    { id: '5', name: 'Іван П.', email: 'ivan@gmail.com', telegram: '@ivan_pro', plan: 'pro', points: 1654, status: 'blocked', paid: true, isAdmin: false, joinDate: '2024-02-05', lastActive: '2 дні тому', messagesCount: 67, videosWatched: 12 },
    { id: '6', name: 'Софія М.', email: 'sofia@gmail.com', telegram: '@sofia_m', plan: 'free', points: 987, status: 'active', paid: false, isAdmin: false, joinDate: '2024-02-10', lastActive: '5 год тому', messagesCount: 23, videosWatched: 5 },
    { id: '7', name: 'Максим Л.', email: 'max@gmail.com', telegram: '@max_l', plan: 'basic', points: 756, status: 'active', paid: true, isAdmin: false, joinDate: '2024-02-12', lastActive: '1 день тому', messagesCount: 34, videosWatched: 7 },
    { id: '8', name: 'Вікторія Н.', email: 'vika@gmail.com', telegram: '@vika_n', plan: 'pro', points: 2100, status: 'active', paid: true, isAdmin: false, joinDate: '2024-02-15', lastActive: '30 хв тому', messagesCount: 112, videosWatched: 18 },
  ]);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { id: '1', code: 'СТАРТ2024', discount: 50, type: 'percent', uses: 23, maxUses: 100, plan: 'pro', active: true, createdAt: '2024-01-01' },
    { id: '2', code: 'НМТ100', discount: 100, type: 'fixed', uses: 45, maxUses: 50, plan: 'basic', active: true, createdAt: '2024-01-15' },
    { id: '3', code: 'ДРУГ', discount: 30, type: 'percent', uses: 12, maxUses: 999, plan: 'pro', active: true, createdAt: '2024-02-01' },
  ]);

  const [newPromo, setNewPromo] = useState({ code: '', discount: 0, type: 'percent' as 'percent' | 'fixed', maxUses: 100, plan: 'pro' as 'basic' | 'pro' });

  const [logs] = useState<LogEntry[]>([
    { id: '1', type: 'payment', action: 'Оплата PRO', details: 'Олександр К. оплатив PRO підписку (599 грн)', timestamp: '2024-02-20 14:32', ip: '192.168.1.1' },
    { id: '2', type: 'user', action: 'Реєстрація', details: 'Новий користувач: Софія М. (sofia@gmail.com)', timestamp: '2024-02-20 13:15', ip: '192.168.1.2' },
    { id: '3', type: 'admin', action: 'Блокування', details: 'Адмін заблокував користувача Іван П.', timestamp: '2024-02-20 12:00' },
    { id: '4', type: 'system', action: 'Бекап', details: 'Автоматичний бекап бази даних', timestamp: '2024-02-20 03:00' },
    { id: '5', type: 'payment', action: 'Оплата BASIC', details: 'Максим Л. оплатив BASIC підписку (299 грн)', timestamp: '2024-02-19 18:45', ip: '192.168.1.3' },
    { id: '6', type: 'user', action: 'Зміна паролю', details: 'Марія В. змінила пароль', timestamp: '2024-02-19 16:20' },
    { id: '7', type: 'admin', action: 'Видача підписки', details: 'Власник видав PRO підписку користувачу Анна С.', timestamp: '2024-02-19 15:00' },
    { id: '8', type: 'system', action: 'Оновлення', details: 'Система оновлена до версії 2.1.0', timestamp: '2024-02-19 02:00' },
  ]);

  const [settings, setSettings] = useState({
    siteName: 'НМТ Майстер',
    priceBasic: 299,
    pricePro: 599,
    pricePro3: 999,
    freeMessages: 5,
    pointsPerMessage: 10,
    pointsPerVideo: 25,
    pointsPerStreak: 50,
    telegramSupport: '@Bagdanch1k_A',
    cardNumber: '5375 4141 0678 5956',
    maintenanceMode: false,
    registrationOpen: true,
    aiModel: 'gpt-4',
  });

  // Перевірка прав власника
  if (!user?.isOwner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🚫</div>
          <h1 className="text-3xl font-bold text-white mb-4">Доступ заборонено</h1>
          <p className="text-gray-400">Ця панель доступна тільки для власника платформи</p>
          <p className="text-yellow-400 mt-4">Код доступу: ШАБЛЕЗУБ-ВОЛХ</p>
        </div>
      </div>
    );
  }

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.telegram.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const admins = users.filter(u => u.isAdmin);
  const proUsers = users.filter(u => u.plan === 'pro');
  const basicUsers = users.filter(u => u.plan === 'basic');
  const totalRevenue = proUsers.length * settings.pricePro + basicUsers.length * settings.priceBasic;

  const toggleAdmin = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u
    ));
    showNotification('Права адміністратора оновлено! ✅');
  };

  const toggleBlock = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u
    ));
    showNotification('Статус користувача змінено! ✅');
  };

  const deleteUser = (userId: string) => {
    if (confirm('Ви впевнені, що хочете видалити цього користувача? Цю дію неможливо скасувати!')) {
      setUsers(users.filter(u => u.id !== userId));
      showNotification('Користувача видалено! 🗑️');
    }
  };

  const changePlan = (userId: string, plan: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, plan, paid: plan !== 'free' } : u
    ));
    showNotification(`Підписку змінено на ${plan.toUpperCase()}! 💎`);
  };

  const saveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setShowEditModal(false);
      setEditingUser(null);
      showNotification('Дані користувача збережено! ✅');
    }
  };

  const createPromoCode = () => {
    if (newPromo.code && newPromo.discount > 0) {
      const promo: PromoCode = {
        id: Date.now().toString(),
        ...newPromo,
        uses: 0,
        active: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setPromoCodes([...promoCodes, promo]);
      setNewPromo({ code: '', discount: 0, type: 'percent', maxUses: 100, plan: 'pro' });
      setShowPromoModal(false);
      showNotification('Промокод створено! 🎉');
    }
  };

  const togglePromoCode = (promoId: string) => {
    setPromoCodes(promoCodes.map(p => 
      p.id === promoId ? { ...p, active: !p.active } : p
    ));
  };

  const deletePromoCode = (promoId: string) => {
    setPromoCodes(promoCodes.filter(p => p.id !== promoId));
    showNotification('Промокод видалено! 🗑️');
  };

  const saveSettings = () => {
    showNotification('Налаштування збережено! ⚙️');
  };

  const handleConfirmPayment = (notificationId: string) => {
    updateNotificationStatus(notificationId, 'confirmed');
    showNotification('Оплату підтверджено! Активуй підписку користувачу ✅');
  };
  
  const handleRejectPayment = (notificationId: string) => {
    updateNotificationStatus(notificationId, 'rejected');
    showNotification('Оплату відхилено ❌');
  };

  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: 'notifications', label: 'Сповіщення', icon: '🔔', badge: unreadNotificationsCount },
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'users', label: 'Користувачі', icon: '👥' },
    { id: 'admins', label: 'Адміністратори', icon: '🛡️' },
    { id: 'subscriptions', label: 'Підписки', icon: '💎' },
    { id: 'finance', label: 'Фінанси', icon: '💰' },
    { id: 'content', label: 'Контент', icon: '📹' },
    { id: 'promo', label: 'Промокоди', icon: '🎫' },
    { id: 'settings', label: 'Налаштування', icon: '⚙️' },
    { id: 'logs', label: 'Логи', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-slide-in-right flex items-center gap-2">
          <span className="text-xl">✨</span>
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-b border-purple-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg animate-pulse">
                👑
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Панель Власника</h1>
                <p className="text-purple-300 text-sm">Повний контроль над платформою</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-purple-800/50 px-4 py-2 rounded-xl">
                <span className="text-yellow-400">👑</span>
                <span className="text-white font-medium">{user?.name || 'Власник'}</span>
              </div>
              <button 
                onClick={() => setCurrentPage('profile')}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition-all"
              >
                ← Назад
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🔔 Сповіщення про оплати
                {unreadNotificationsCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                    {unreadNotificationsCount} нових
                  </span>
                )}
              </h2>
              
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-400 text-lg">Немає сповіщень</p>
                  <p className="text-gray-500 text-sm">Коли хтось оплатить підписку, ви побачите це тут</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`border rounded-xl p-4 transition-all ${
                        notification.status === 'pending' 
                          ? 'bg-yellow-500/10 border-yellow-500/30' 
                          : notification.status === 'confirmed'
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">
                              {notification.status === 'pending' ? '⏳' : notification.status === 'confirmed' ? '✅' : '❌'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              notification.status === 'pending' 
                                ? 'bg-yellow-500/20 text-yellow-400' 
                                : notification.status === 'confirmed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {notification.status === 'pending' ? 'ОЧІКУЄ ПЕРЕВІРКИ' : notification.status === 'confirmed' ? 'ПІДТВЕРДЖЕНО' : 'ВІДХИЛЕНО'}
                            </span>
                          </div>
                          
                          <h3 className="text-white font-bold text-lg">{notification.userName}</h3>
                          <p className="text-gray-400 text-sm">{notification.userEmail}</p>
                          {notification.userTelegram && (
                            <a href={`https://t.me/${notification.userTelegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
                              Telegram: {notification.userTelegram}
                            </a>
                          )}
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm font-medium">
                              {notification.plan === 'pro' ? 'PRO Місяць' : notification.plan === 'pro3' ? 'PRO 3 Місяці' : 'BASIC'}
                            </span>
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-sm font-bold">
                              💰 {notification.amount} грн
                            </span>
                            <span className="text-gray-500 text-sm">
                              {new Date(notification.timestamp).toLocaleString('uk-UA')}
                            </span>
                          </div>
                        </div>
                        
                        {notification.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleConfirmPayment(notification.id)}
                              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1"
                            >
                              ✅ Підтвердити
                            </button>
                            <button
                              onClick={() => handleRejectPayment(notification.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1"
                            >
                              ❌ Відхилити
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">⚡ Швидкі дії після підтвердження оплати</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveTab('users')}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  👥 Перейти до користувачів
                </button>
                <button 
                  onClick={() => setActiveTab('subscriptions')}
                  className="bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  💎 Видати підписку
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold">{users.length}</div>
                <div className="text-blue-200">Всього користувачів</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-2">💎</div>
                <div className="text-3xl font-bold">{proUsers.length}</div>
                <div className="text-yellow-100">PRO підписки</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold">₴{totalRevenue.toLocaleString()}</div>
                <div className="text-green-100">Загальний дохід</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-2">🛡️</div>
                <div className="text-3xl font-bold">{admins.length}</div>
                <div className="text-purple-100">Адміністраторів</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>📈</span> Статистика підписок
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">PRO (₴{settings.pricePro})</span>
                    <span className="text-yellow-400 font-bold">{proUsers.length} користувачів</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{ width: `${(proUsers.length / users.length) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">BASIC (₴{settings.priceBasic})</span>
                    <span className="text-blue-400 font-bold">{basicUsers.length} користувачів</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full" style={{ width: `${(basicUsers.length / users.length) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">FREE</span>
                    <span className="text-gray-400 font-bold">{users.filter(u => u.plan === 'free').length} користувачів</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-500 h-3 rounded-full" style={{ width: `${(users.filter(u => u.plan === 'free').length / users.length) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>🔥</span> Активність сьогодні
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Нові реєстрації</span>
                    <span className="text-green-400 font-bold text-xl">+12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Оплати</span>
                    <span className="text-yellow-400 font-bold text-xl">+5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Повідомлень ШІ</span>
                    <span className="text-blue-400 font-bold text-xl">847</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Переглядів відео</span>
                    <span className="text-purple-400 font-bold text-xl">234</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>⚡</span> Швидкі дії
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <span>👥</span> Керувати користувачами
                  </button>
                  <button 
                    onClick={() => setActiveTab('promo')}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <span>🎫</span> Створити промокод
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <span>⚙️</span> Налаштування
                  </button>
                  <button 
                    onClick={() => showNotification('Бекап створено! 💾')}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <span>💾</span> Створити бекап
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📋</span> Останні події
              </h3>
              <div className="space-y-3">
                {logs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      log.type === 'payment' ? 'bg-green-500/20 text-green-400' :
                      log.type === 'user' ? 'bg-blue-500/20 text-blue-400' :
                      log.type === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {log.type === 'payment' ? '💰' : log.type === 'user' ? '👤' : log.type === 'admin' ? '🛡️' : '⚙️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{log.action}</p>
                      <p className="text-gray-400 text-sm truncate">{log.details}</p>
                    </div>
                    <div className="text-gray-500 text-sm whitespace-nowrap">{log.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>👥</span> Керування користувачами
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Пошук..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 sm:w-64 bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="text-left text-gray-300 font-medium p-4">Користувач</th>
                      <th className="text-left text-gray-300 font-medium p-4">Контакт</th>
                      <th className="text-left text-gray-300 font-medium p-4">План</th>
                      <th className="text-left text-gray-300 font-medium p-4">Статус</th>
                      <th className="text-left text-gray-300 font-medium p-4">Бали</th>
                      <th className="text-left text-gray-300 font-medium p-4">Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              {u.name[0]}
                            </div>
                            <div>
                              <p className="text-white font-medium flex items-center gap-2">
                                {u.name}
                                {u.isAdmin && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">АДМІН</span>}
                              </p>
                              <p className="text-gray-400 text-sm">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-cyan-400">{u.telegram}</p>
                          <p className="text-gray-500 text-sm">{u.lastActive}</p>
                        </td>
                        <td className="p-4">
                          <select
                            value={u.plan}
                            onChange={(e) => changePlan(u.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                              u.plan === 'pro' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                              u.plan === 'basic' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                              'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                            }`}
                          >
                            <option value="free">FREE</option>
                            <option value="basic">BASIC</option>
                            <option value="pro">PRO</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            u.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {u.status === 'active' ? '✅ Активний' : '🚫 Заблоковано'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-white font-bold">{u.points}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingUser(u); setShowEditModal(true); }}
                              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                              title="Редагувати"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => toggleAdmin(u.id)}
                              className={`p-2 rounded-lg transition-colors ${u.isAdmin ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                              title={u.isAdmin ? 'Забрати права адміна' : 'Зробити адміном'}
                            >
                              🛡️
                            </button>
                            <button
                              onClick={() => toggleBlock(u.id)}
                              className={`p-2 rounded-lg transition-colors ${u.status === 'blocked' ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'}`}
                              title={u.status === 'blocked' ? 'Розблокувати' : 'Заблокувати'}
                            >
                              {u.status === 'blocked' ? '✅' : '🚫'}
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                              title="Видалити"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Керування адміністраторами
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Поточні адміністратори</h3>
                {admins.length === 0 ? (
                  <p className="text-gray-400">Немає призначених адміністраторів</p>
                ) : (
                  <div className="space-y-3">
                    {admins.map(admin => (
                      <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {admin.name[0]}
                          </div>
                          <div>
                            <p className="text-white font-medium">{admin.name}</p>
                            <p className="text-purple-400 text-sm">{admin.telegram}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleAdmin(admin.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition-all"
                        >
                          Забрати права
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Призначити нового адміна</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {users.filter(u => !u.isAdmin).map(u => (
                    <div key={u.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{u.name}</p>
                          <p className="text-gray-400 text-sm">{u.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleAdmin(u.id)}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl transition-all"
                      >
                        Зробити адміном
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-3">📋 Права адміністратора</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Перегляд списку користувачів</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Видача та скасування підписок</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Блокування користувачів</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Редагування балів</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Видалення користувачів (тільки власник)</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Призначення адміністраторів (тільки власник)</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✗</span> Зміна налаштувань системи (тільки власник)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>💎</span> Керування підписками
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600">
                <div className="text-4xl mb-3">🆓</div>
                <h3 className="text-xl font-bold text-white mb-2">FREE</h3>
                <p className="text-3xl font-bold text-gray-400 mb-4">Безкоштовно</p>
                <p className="text-gray-400 mb-4">{users.filter(u => u.plan === 'free').length} користувачів</p>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-gray-500 rounded-full" style={{ width: `${(users.filter(u => u.plan === 'free').length / users.length) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 border border-blue-500/50">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="text-xl font-bold text-white mb-2">BASIC</h3>
                <p className="text-3xl font-bold text-blue-300 mb-4">₴{settings.priceBasic}/міс</p>
                <p className="text-blue-200 mb-4">{basicUsers.length} користувачів</p>
                <p className="text-green-400 font-bold">+₴{basicUsers.length * settings.priceBasic}/міс</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600 to-orange-700 rounded-2xl p-6 border border-yellow-500/50">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-xl font-bold text-white mb-2">PRO</h3>
                <p className="text-3xl font-bold text-yellow-200 mb-4">₴{settings.pricePro}/міс</p>
                <p className="text-yellow-100 mb-4">{proUsers.length} користувачів</p>
                <p className="text-green-300 font-bold">+₴{proUsers.length * settings.pricePro}/міс</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Швидка видача підписки</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map(u => (
                  <div key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-gray-400 text-sm">{u.telegram}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changePlan(u.id, 'free')}
                        className={`px-4 py-2 rounded-xl transition-all ${u.plan === 'free' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                      >
                        FREE
                      </button>
                      <button
                        onClick={() => changePlan(u.id, 'basic')}
                        className={`px-4 py-2 rounded-xl transition-all ${u.plan === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-blue-600'}`}
                      >
                        BASIC
                      </button>
                      <button
                        onClick={() => changePlan(u.id, 'pro')}
                        className={`px-4 py-2 rounded-xl transition-all ${u.plan === 'pro' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-yellow-600'}`}
                      >
                        PRO
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>💰</span> Фінансова статистика
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
                <p className="text-green-200 mb-2">Загальний дохід</p>
                <p className="text-4xl font-bold">₴{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                <p className="text-blue-200 mb-2">Дохід від PRO</p>
                <p className="text-4xl font-bold">₴{(proUsers.length * settings.pricePro).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl p-6 text-white">
                <p className="text-cyan-200 mb-2">Дохід від BASIC</p>
                <p className="text-4xl font-bold">₴{(basicUsers.length * settings.priceBasic).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                <p className="text-purple-200 mb-2">Середній чек</p>
                <p className="text-4xl font-bold">₴{Math.round(totalRevenue / (proUsers.length + basicUsers.length) || 0)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📊 Прогноз доходу</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Цей місяць</span>
                    <span className="text-green-400 font-bold text-xl">₴{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Наступний місяць (+20%)</span>
                    <span className="text-green-400 font-bold text-xl">₴{Math.round(totalRevenue * 1.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">За рік</span>
                    <span className="text-green-400 font-bold text-xl">₴{(totalRevenue * 12).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💳 Реквізити для оплати</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Номер картки</p>
                    <p className="text-white font-mono text-lg">{settings.cardNumber}</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-gray-400 text-sm mb-1">Telegram підтримки</p>
                    <p className="text-cyan-400 font-medium text-lg">{settings.telegramSupport}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">📋 Останні оплати</h3>
              <div className="space-y-3">
                {logs.filter(l => l.type === 'payment').map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 text-xl">
                        💰
                      </div>
                      <div>
                        <p className="text-white font-medium">{log.action}</p>
                        <p className="text-gray-400 text-sm">{log.details}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">{log.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📹</span> Керування контентом
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🎥 Відео на платформі</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-white font-medium">Важливі дати ХХ століття</p>
                    <p className="text-gray-400 text-sm">Базована історія • 234 перегляди</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-white font-medium">Історія України зі скетчів</p>
                    <p className="text-gray-400 text-sm">Базована історія • 189 переглядів</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-white font-medium">Голодомор 1932-33</p>
                    <p className="text-gray-400 text-sm">Базована історія • 156 переглядів</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-xl">
                    <p className="text-white font-medium">Козацька доба для НМТ</p>
                    <p className="text-gray-400 text-sm">Базована історія • 201 перегляд</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">➕ Додати нове відео</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Назва відео</label>
                    <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white" placeholder="Введіть назву..." />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">YouTube URL</label>
                    <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white" placeholder="https://youtu.be/..." />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Категорія</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white">
                      <option>Історія України</option>
                      <option>Українська мова</option>
                      <option>Математика</option>
                    </select>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-medium transition-all">
                    Додати відео
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Promo Tab */}
        {activeTab === 'promo' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>🎫</span> Промокоди
              </h2>
              <button
                onClick={() => setShowPromoModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                <span>➕</span> Створити промокод
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promoCodes.map(promo => (
                <div key={promo.id} className={`rounded-2xl p-6 border ${promo.active ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-900/50 border-gray-800 opacity-60'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <code className="text-xl font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg">{promo.code}</code>
                    <span className={`px-3 py-1 rounded-full text-sm ${promo.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {promo.active ? 'Активний' : 'Вимкнено'}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300">
                      Знижка: <span className="text-white font-bold">{promo.discount}{promo.type === 'percent' ? '%' : ' грн'}</span>
                    </p>
                    <p className="text-gray-300">
                      Використано: <span className="text-white font-bold">{promo.uses}/{promo.maxUses}</span>
                    </p>
                    <p className="text-gray-300">
                      План: <span className={`font-bold ${promo.plan === 'pro' ? 'text-yellow-400' : 'text-blue-400'}`}>{promo.plan.toUpperCase()}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePromoCode(promo.id)}
                      className={`flex-1 py-2 rounded-xl font-medium transition-all ${promo.active ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                    >
                      {promo.active ? 'Вимкнути' : 'Увімкнути'}
                    </button>
                    <button
                      onClick={() => deletePromoCode(promo.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>⚙️</span> Налаштування системи
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💰 Ціни на підписки</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">BASIC (грн/міс)</label>
                    <input
                      type="number"
                      value={settings.priceBasic}
                      onChange={(e) => setSettings({ ...settings, priceBasic: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">PRO (грн/міс)</label>
                    <input
                      type="number"
                      value={settings.pricePro}
                      onChange={(e) => setSettings({ ...settings, pricePro: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">PRO 3 місяці (грн)</label>
                    <input
                      type="number"
                      value={settings.pricePro3}
                      onChange={(e) => setSettings({ ...settings, pricePro3: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🎮 Система балів</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Балів за повідомлення</label>
                    <input
                      type="number"
                      value={settings.pointsPerMessage}
                      onChange={(e) => setSettings({ ...settings, pointsPerMessage: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Балів за відео</label>
                    <input
                      type="number"
                      value={settings.pointsPerVideo}
                      onChange={(e) => setSettings({ ...settings, pointsPerVideo: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Балів за streak</label>
                    <input
                      type="number"
                      value={settings.pointsPerStreak}
                      onChange={(e) => setSettings({ ...settings, pointsPerStreak: Number(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">💳 Платіжна інформація</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Номер картки</label>
                    <input
                      type="text"
                      value={settings.cardNumber}
                      onChange={(e) => setSettings({ ...settings, cardNumber: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Telegram підтримки</label>
                    <input
                      type="text"
                      value={settings.telegramSupport}
                      onChange={(e) => setSettings({ ...settings, telegramSupport: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">🔧 Системні налаштування</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Режим обслуговування</p>
                      <p className="text-gray-400 text-sm">Сайт недоступний для користувачів</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                      className={`w-14 h-8 rounded-full transition-all ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'ml-7' : 'ml-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="text-white font-medium">Реєстрація відкрита</p>
                      <p className="text-gray-400 text-sm">Нові користувачі можуть реєструватись</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}
                      className={`w-14 h-8 rounded-full transition-all ${settings.registrationOpen ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all ${settings.registrationOpen ? 'ml-7' : 'ml-1'}`}></div>
                    </button>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Модель ШІ</label>
                    <select
                      value={settings.aiModel}
                      onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                    >
                      <option value="gpt-4">GPT-4 (найкращий)</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo (дешевший)</option>
                      <option value="claude-3">Claude 3 Sonnet</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              💾 Зберегти всі налаштування
            </button>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Системні логи
            </h2>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button className="px-4 py-2 bg-gray-700 text-white rounded-xl">Всі</button>
              <button className="px-4 py-2 bg-green-600/20 text-green-400 rounded-xl border border-green-500/30">💰 Оплати</button>
              <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">👤 Користувачі</button>
              <button className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">🛡️ Адміни</button>
              <button className="px-4 py-2 bg-gray-600/20 text-gray-400 rounded-xl border border-gray-500/30">⚙️ Система</button>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
              <div className="space-y-1 p-4">
                {logs.map(log => (
                  <div key={log.id} className={`flex items-start gap-4 p-4 rounded-xl ${
                    log.type === 'payment' ? 'bg-green-900/20 border-l-4 border-green-500' :
                    log.type === 'user' ? 'bg-blue-900/20 border-l-4 border-blue-500' :
                    log.type === 'admin' ? 'bg-purple-900/20 border-l-4 border-purple-500' :
                    'bg-gray-900/20 border-l-4 border-gray-500'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      log.type === 'payment' ? 'bg-green-500/20 text-green-400' :
                      log.type === 'user' ? 'bg-blue-500/20 text-blue-400' :
                      log.type === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {log.type === 'payment' ? '💰' : log.type === 'user' ? '👤' : log.type === 'admin' ? '🛡️' : '⚙️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-medium">{log.action}</p>
                        <span className="text-gray-500 text-sm">{log.timestamp}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{log.details}</p>
                      {log.ip && <p className="text-gray-600 text-xs mt-1">IP: {log.ip}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">✏️ Редагування користувача</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Ім'я</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Telegram</label>
                <input
                  type="text"
                  value={editingUser.telegram}
                  onChange={(e) => setEditingUser({ ...editingUser, telegram: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Бали</label>
                <input
                  type="number"
                  value={editingUser.points}
                  onChange={(e) => setEditingUser({ ...editingUser, points: Number(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">План</label>
                <select
                  value={editingUser.plan}
                  onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                >
                  <option value="free">FREE</option>
                  <option value="basic">BASIC</option>
                  <option value="pro">PRO</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setEditingUser(null); }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-medium transition-all"
              >
                Скасувати
              </button>
              <button
                onClick={saveUser}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-medium transition-all"
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Promo Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">🎫 Створити промокод</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Код (латиницею)</label>
                <input
                  type="text"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white font-mono"
                  placeholder="PROMO2024"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Знижка</label>
                  <input
                    type="number"
                    value={newPromo.discount}
                    onChange={(e) => setNewPromo({ ...newPromo, discount: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Тип</label>
                  <select
                    value={newPromo.type}
                    onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value as 'percent' | 'fixed' })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="percent">Відсотки (%)</option>
                    <option value="fixed">Фіксована (грн)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Макс. використань</label>
                  <input
                    type="number"
                    value={newPromo.maxUses}
                    onChange={(e) => setNewPromo({ ...newPromo, maxUses: Number(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Для плану</label>
                  <select
                    value={newPromo.plan}
                    onChange={(e) => setNewPromo({ ...newPromo, plan: e.target.value as 'basic' | 'pro' })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="basic">BASIC</option>
                    <option value="pro">PRO</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPromoModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-medium transition-all"
              >
                Скасувати
              </button>
              <button
                onClick={createPromoCode}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all"
              >
                Створити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
