import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { user, isLoggedIn, logout, setCurrentPage, currentPage, isOwner, isAdmin, unreadNotificationsCount } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Головна', icon: '🏠' },
    { id: 'videos', label: 'Відео', icon: '📹' },
    { id: 'chat', label: 'ШІ-Репетитор', icon: '🤖' },
    { id: 'pricing', label: 'Підписка', icon: '💎' },
    { id: 'leaderboard', label: 'Рейтинг', icon: '🏆' },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <span className="text-3xl animate-bounce">🎓</span>
            <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              НМТ Майстер
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-sm font-medium ${
                  currentPage === item.id 
                    ? 'bg-white/20 text-yellow-400 shadow-lg' 
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2">
            {/* Кнопка Панель Власника */}
            {isLoggedIn && isOwner && (
              <button
                onClick={() => handleNavClick('owner')}
                className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-1.5 ${
                  currentPage === 'owner'
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-400 hover:from-yellow-500/30 hover:to-amber-600/30 border border-yellow-500/50'
                }`}
              >
                <span>👑</span>
                <span className="hidden sm:inline">Власник</span>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse font-bold">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}
            
            {/* Кнопка Панель Адміна (якщо не власник) */}
            {isLoggedIn && isAdmin && !isOwner && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-1.5 ${
                  currentPage === 'admin'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-400 hover:from-blue-500/30 hover:to-cyan-600/30 border border-blue-500/50'
                }`}
              >
                <span>🛡️</span>
                <span className="hidden sm:inline">Адмін</span>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse font-bold">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* User Badge */}
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                    currentPage === 'profile'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg shadow-lg">
                    {isOwner ? '👑' : isAdmin ? '🛡️' : '👤'}
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium leading-tight">{user?.name?.split(' ')[0]}</span>
                    <span className={`text-xs leading-tight ${
                      isOwner ? 'text-yellow-400' : isAdmin ? 'text-blue-400' : user?.subscription === 'pro' ? 'text-yellow-400' : 'text-white/60'
                    }`}>
                      {isOwner ? '👑 ВЛАСНИК' : isAdmin ? '🛡️ АДМІН' : user?.subscription === 'pro' ? '💎 PRO' : user?.subscription === 'basic' ? '⭐ BASIC' : '🆓 FREE'}
                    </span>
                  </div>
                </button>
                
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                  title="Вийти"
                >
                  🚪
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 hover:scale-105 text-sm"
              >
                Увійти
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  currentPage === item.id 
                    ? 'bg-white/20 text-yellow-400' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* Мобільні кнопки для Власника/Адміна */}
            {isLoggedIn && isOwner && (
              <button
                onClick={() => handleNavClick('owner')}
                className="px-4 py-3 rounded-lg transition-all flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-400 border border-yellow-500/30"
              >
                <span className="text-xl">👑</span>
                <span className="font-medium">Панель Власника</span>
                {unreadNotificationsCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                    {unreadNotificationsCount} нових
                  </span>
                )}
              </button>
            )}
            
            {isLoggedIn && isAdmin && !isOwner && (
              <button
                onClick={() => handleNavClick('admin')}
                className="px-4 py-3 rounded-lg transition-all flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 text-blue-400 border border-blue-500/30"
              >
                <span className="text-xl">🛡️</span>
                <span className="font-medium">Панель Адміна</span>
                {unreadNotificationsCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                    {unreadNotificationsCount} нових
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
