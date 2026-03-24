import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { user, logout, setCurrentPage } = useApp();

  if (!user) {
    setCurrentPage('login');
    return null;
  }

  const progressToNextLevel = (user.points % 500) / 500 * 100;
  const currentLevel = Math.floor(user.points / 500) + 1;

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl font-black text-slate-900 shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                {user.isPro && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-sm font-black px-3 py-1 rounded-full">
                    💎 PRO
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mt-1">{user.email}</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap justify-center sm:justify-start">
                <div className="text-center">
                  <div className="text-yellow-400 font-black text-xl">{user.points}</div>
                  <div className="text-slate-500 text-xs">балів</div>
                </div>
                <div className="w-px h-8 bg-slate-600" />
                <div className="text-center">
                  <div className="text-orange-400 font-black text-xl">🔥 {user.streak}</div>
                  <div className="text-slate-500 text-xs">днів streak</div>
                </div>
                <div className="w-px h-8 bg-slate-600" />
                <div className="text-center">
                  <div className="text-purple-400 font-black text-xl">Lv.{currentLevel}</div>
                  <div className="text-slate-500 text-xs">рівень</div>
                </div>
              </div>
            </div>
            {!user.isPro && (
              <button
                onClick={() => setCurrentPage('pricing')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black px-4 py-2 rounded-xl text-sm hover:opacity-90 transition whitespace-nowrap"
              >
                ⬆️ Отримати PRO
              </button>
            )}
          </div>

          {/* Level progress */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Прогрес до рівня {currentLevel + 1}</span>
              <span>{user.points % 500}/500 балів</span>
            </div>
            <div className="bg-slate-900 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Уроків переглянуто', value: user.completedLessons.length, icon: '📹', color: 'text-red-400' },
            { label: 'Балів зароблено', value: user.points, icon: '⚡', color: 'text-yellow-400' },
            { label: 'Днів поспіль', value: user.streak, icon: '🔥', color: 'text-orange-400' },
            { label: 'Нагород отримано', value: user.badges.filter(b => b.earned).length, icon: '🏅', color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-black text-lg mb-4">🏅 Мої нагороди</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {user.badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl p-3 text-center border ${
                  badge.earned
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-slate-900/50 border-slate-700 opacity-40'
                }`}
              >
                <div className={`text-3xl mb-1 ${!badge.earned ? 'grayscale' : ''}`}>{badge.icon}</div>
                <div className={`text-xs font-bold ${badge.earned ? 'text-yellow-400' : 'text-slate-600'}`}>
                  {badge.name}
                </div>
                <div className="text-slate-500 text-xs mt-0.5">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Panel - Only for Owner */}
        {user.isOwner && (
          <div className="bg-gradient-to-r from-rose-900/50 via-purple-900/50 to-pink-900/50 border border-rose-500/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-black text-xl flex items-center gap-2">
                  <span className="text-3xl animate-pulse">👑</span> Панель Власника
                </h2>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1 rounded-full text-sm font-black animate-pulse">
                  МАКСИМАЛЬНИЙ ДОСТУП
                </span>
              </div>
              <p className="text-rose-200 mb-4 text-sm">Повний контроль над всією платформою, користувачами та налаштуваннями</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Всього користувачів', value: '2,847', icon: '👥', color: 'text-blue-400' },
                  { label: 'PRO підписників', value: '127', icon: '💎', color: 'text-yellow-400' },
                  { label: 'Дохід цього місяця', value: '₴76,073', icon: '💰', color: 'text-green-400' },
                  { label: 'Адміністраторів', value: '3', icon: '🛡️', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 text-center border border-white/5">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className={`font-black text-lg ${stat.color}`}>{stat.value}</div>
                    <div className="text-slate-500 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage('owner')}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-rose-500 text-white font-black rounded-xl hover:from-yellow-600 hover:via-orange-600 hover:to-rose-600 transition shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <span>👑</span> Відкрити Панель Власника
              </button>
            </div>
          </div>
        )}

        {/* Admin Panel - For Admins */}
        {user.isAdmin && !user.isOwner && (
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-black text-lg">🛡️ Адмін-панель</h2>
              <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold">
                🛡️ АДМІНІСТРАТОР
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Всього користувачів', value: '2,847', icon: '👥' },
                { label: 'PRO підписників', value: '127', icon: '💎' },
                { label: 'Дохід цього місяця', value: '₴76,073', icon: '💰' },
                { label: 'Нових сьогодні', value: '23', icon: '📈' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-white font-black text-sm">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage('admin')}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>🎛️ Відкрити адмін-панель</span>
            </button>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setCurrentPage('chat')}
            className="bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-white font-semibold text-sm">ШІ-Репетитор</div>
            <div className="text-slate-500 text-xs">Продовжити навчання</div>
          </button>
          <button
            onClick={() => setCurrentPage('videos')}
            className="bg-slate-800 border border-slate-700 hover:border-red-500 rounded-xl p-4 text-center transition"
          >
            <div className="text-2xl mb-2">📹</div>
            <div className="text-white font-semibold text-sm">Відеоуроки</div>
            <div className="text-slate-500 text-xs">Переглянути всі</div>
          </button>
          <button
            onClick={() => setCurrentPage('leaderboard')}
            className="bg-slate-800 border border-slate-700 hover:border-yellow-500 rounded-xl p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-white font-semibold text-sm">Рейтинг</div>
            <div className="text-slate-500 text-xs">Побачити своє місце</div>
          </button>
        </div>

        <button
          onClick={logout}
          className="w-full bg-slate-800 border border-slate-700 hover:border-red-500 hover:text-red-400 text-slate-400 font-semibold py-3 rounded-xl transition"
        >
          🚪 Вийти з акаунту
        </button>
      </div>
    </div>
  );
}
