import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, Crown, Search, CheckCircle, XCircle, 
  Shield, Trash2, Edit3, TrendingUp,
  DollarSign, Award, Mail, Phone, Download, Bell, ArrowLeft
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: 'free' | 'basic' | 'pro' | 'admin' | 'owner';
  joinDate: string;
  lastActive: string;
  points: number;
  status: 'active' | 'banned' | 'pending';
  telegram?: string;
  paymentStatus?: 'paid' | 'unpaid';
}

export default function AdminPanel() {
  const { setCurrentPage, notifications, updateNotificationStatus, unreadNotificationsCount } = useApp();
  
  const [activeTab, setActiveTab] = useState<'users' | 'notifications'>('notifications');
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Марія К.', email: 'maria@example.com', phone: '+380991234567', plan: 'pro', joinDate: '2024-01-15', lastActive: '2 хв тому', points: 2450, status: 'active', telegram: '@maria_nmt', paymentStatus: 'paid' },
    { id: 2, name: 'Олег П.', email: 'oleg@example.com', phone: '+380992345678', plan: 'basic', joinDate: '2024-01-14', lastActive: '15 хв тому', points: 1890, status: 'active', telegram: '@oleg_student', paymentStatus: 'paid' },
    { id: 3, name: 'Анна С.', email: 'anna@example.com', phone: '+380993456789', plan: 'free', joinDate: '2024-01-10', lastActive: '1 год тому', points: 920, status: 'active' },
    { id: 4, name: 'Дмитро В.', email: 'dima@example.com', phone: '+380994567890', plan: 'pro', joinDate: '2024-01-08', lastActive: '3 год тому', points: 3100, status: 'active', telegram: '@dima_pro', paymentStatus: 'paid' },
    { id: 5, name: 'Катерина М.', email: 'kate@example.com', phone: '+380995678901', plan: 'basic', joinDate: '2024-01-05', lastActive: 'вчора', points: 1560, status: 'active', telegram: '@kate_boss', paymentStatus: 'unpaid' },
    { id: 6, name: 'Іван Р.', email: 'ivan@example.com', phone: '+380996789012', plan: 'free', joinDate: '2024-01-03', lastActive: '2 дні тому', points: 450, status: 'banned' },
    { id: 7, name: 'Софія Л.', email: 'sofia@example.com', phone: '+380997890123', plan: 'pro', joinDate: '2023-12-28', lastActive: '5 хв тому', points: 4200, status: 'active', telegram: '@sofia_200', paymentStatus: 'paid' },
    { id: 8, name: 'Максим Г.', email: 'max@example.com', phone: '+380998901234', plan: 'free', joinDate: '2023-12-25', lastActive: 'тиждень тому', points: 180, status: 'pending' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const stats = {
    totalUsers: users.length,
    proUsers: users.filter(u => u.plan === 'pro').length,
    basicUsers: users.filter(u => u.plan === 'basic').length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    revenue: users.filter(u => u.plan !== 'free').length * 799,
    activeToday: 5,
    pendingPayments: notifications.filter(n => n.status === 'pending').length,
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.telegram?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'active' ? 'banned' : 'active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };
  
  const handleConfirmPayment = (notificationId: string) => {
    updateNotificationStatus(notificationId, 'confirmed');
  };
  
  const handleRejectPayment = (notificationId: string) => {
    updateNotificationStatus(notificationId, 'rejected');
  };

  const getPlanBadge = (plan: string) => {
    const styles = {
      free: 'bg-gray-100 text-gray-700 border-gray-300',
      basic: 'bg-blue-100 text-blue-700 border-blue-300',
      pro: 'bg-amber-100 text-amber-700 border-amber-300',
      admin: 'bg-purple-100 text-purple-700 border-purple-300',
      owner: 'bg-rose-100 text-rose-700 border-rose-300',
    };
    const labels = { free: 'FREE', basic: 'BASIC', pro: 'PRO', admin: 'ADMIN', owner: 'OWNER' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${styles[plan as keyof typeof styles]}`}>
        {labels[plan as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      banned: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    const labels = { active: 'Активний', banned: 'Заблокований', pending: 'Очікує' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-800/80 backdrop-blur-sm shadow-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('home')}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                🛡️ Адмін Панель
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`relative p-2 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-slate-700 text-slate-400'
                }`}
              >
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'notifications' 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            🔔 Сповіщення
            {unreadNotificationsCount > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{unreadNotificationsCount}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'users' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            👥 Користувачі
          </button>
        </div>
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🔔 Сповіщення про оплати
                {unreadNotificationsCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full animate-pulse">
                    {unreadNotificationsCount} нових
                  </span>
                )}
              </h2>
              
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-slate-400 text-lg">Немає сповіщень</p>
                  <p className="text-slate-500 text-sm">Коли хтось оплатить підписку, ви побачите це тут</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`border rounded-xl p-4 transition-all ${
                        notification.status === 'pending' 
                          ? 'bg-yellow-500/10 border-yellow-500/30 animate-pulse' 
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
                          <p className="text-slate-400 text-sm">{notification.userEmail}</p>
                          {notification.userTelegram && (
                            <p className="text-blue-400 text-sm">Telegram: {notification.userTelegram}</p>
                          )}
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm font-medium">
                              {notification.plan === 'pro' ? 'PRO Місяць' : notification.plan === 'pro3' ? 'PRO 3 Місяці' : 'BASIC'}
                            </span>
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-sm font-bold">
                              💰 {notification.amount} грн
                            </span>
                            <span className="text-slate-500 text-sm">
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
                              <CheckCircle className="h-4 w-4" />
                              Підтвердити
                            </button>
                            <button
                              onClick={() => handleRejectPayment(notification.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1"
                            >
                              <XCircle className="h-4 w-4" />
                              Відхилити
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-xs text-green-400 font-medium">+12%</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-sm text-slate-400">Всього користувачів</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-500/30 hover:border-amber-500/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <span className="text-xs text-amber-400 font-medium">{stats.proUsers}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.proUsers}</p>
                <p className="text-sm text-slate-400">PRO підписників</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">+₴15,000</span>
                </div>
                <p className="text-2xl font-bold text-white">₴{stats.revenue.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Дохід цього місяця</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">+8%</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.activeToday}</p>
                <p className="text-sm text-slate-400">Активних сьогодні</p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Пошук за ім'ям, email або Telegram..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="all">Всі плани</option>
                    <option value="free">FREE</option>
                    <option value="basic">BASIC</option>
                    <option value="pro">PRO</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="all">Всі статуси</option>
                    <option value="active">Активні</option>
                    <option value="banned">Заблоковані</option>
                    <option value="pending">Очікують</option>
                  </select>
                  <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors text-white">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Користувач</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Контакти</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">План</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Бали</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Статус</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Активність</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Дії</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-sm text-slate-400">ID: #{user.id.toString().padStart(4, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-300">
                              <Mail className="h-4 w-4 mr-1 text-slate-400" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-300">
                              <Phone className="h-4 w-4 mr-1 text-slate-400" />
                              {user.phone}
                            </div>
                            {user.telegram && (
                              <div className="flex items-center text-sm text-blue-400">
                                <span className="mr-1">📱</span>
                                {user.telegram}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            {getPlanBadge(user.plan)}
                            {user.paymentStatus === 'unpaid' && user.plan !== 'free' && (
                              <span className="block px-2 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
                                НЕ ОПЛАЧЕНО
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-amber-400 mr-1" />
                            <span className="font-bold text-white">{user.points.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-sm text-slate-300">{user.lastActive}</p>
                            <p className="text-xs text-slate-500">З {user.joinDate}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => { setEditingUser(user); setShowEditModal(true); }}
                              className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Редагувати"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(user.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                user.status === 'active' 
                                  ? 'text-orange-400 hover:bg-orange-500/20' 
                                  : 'text-green-400 hover:bg-green-500/20'
                              }`}
                              title={user.status === 'active' ? 'Заблокувати' : 'Розблокувати'}
                            >
                              {user.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Видалити"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Користувачів не знайдено</p>
                  <p className="text-slate-500 text-sm">Спробуйте змінити параметри пошуку</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-slate-400">
                Показано {filteredUsers.length} з {users.length} користувачів
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 disabled:opacity-50 text-white" disabled>
                  Назад
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  1
                </button>
                <button className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 text-white">
                  2
                </button>
                <button className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 text-white">
                  Далі
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Редагувати користувача</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Ім'я</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">План підписки</label>
                <select
                  value={editingUser.plan}
                  onChange={(e) => setEditingUser({...editingUser, plan: e.target.value as any})}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="free">FREE (Безкоштовно)</option>
                  <option value="basic">BASIC (₴599/міс)</option>
                  <option value="pro">PRO (₴999/міс)</option>
                  <option value="admin">ADMIN (Адміністратор)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Статус оплати</label>
                <select
                  value={editingUser.paymentStatus || 'unpaid'}
                  onChange={(e) => setEditingUser({...editingUser, paymentStatus: e.target.value as any})}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="paid">✅ Оплачено</option>
                  <option value="unpaid">❌ Не оплачено</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Бали</label>
                <input
                  type="number"
                  value={editingUser.points}
                  onChange={(e) => setEditingUser({...editingUser, points: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Telegram</label>
                <input
                  type="text"
                  value={editingUser.telegram || ''}
                  onChange={(e) => setEditingUser({...editingUser, telegram: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="@username"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setEditingUser(null); }}
                className="flex-1 py-3 bg-slate-700 border border-slate-600 rounded-xl font-medium hover:bg-slate-600 text-white"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleUpdateUser(editingUser)}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600"
              >
                Зберегти зміни
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
