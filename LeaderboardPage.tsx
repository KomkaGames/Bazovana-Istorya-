import { useApp } from '../context/AppContext';
import { SubscriptionPlan } from '../types';

// Функція для відображення підписки
const getSubscriptionBadge = (subscription: SubscriptionPlan) => {
  switch (subscription) {
    case 'pro':
      return <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg">💎 PRO</span>;
    case 'basic':
      return <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg">⭐ BASIC</span>;
    default:
      return <span className="bg-slate-600 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">FREE</span>;
  }
};

const mockLeaders = [
  { rank: 1, name: 'Аня Коваль', points: 4820, streak: 45, badges: 8, avatar: '👩‍🎓', subscription: 'pro' as SubscriptionPlan },
  { rank: 2, name: 'Дмитро Лис', points: 4210, streak: 38, badges: 7, avatar: '👨‍💻', subscription: 'pro' as SubscriptionPlan },
  { rank: 3, name: 'Соня Марченко', points: 3890, streak: 30, badges: 6, avatar: '🌟', subscription: 'pro' as SubscriptionPlan },
  { rank: 4, name: 'Олег Ткач', points: 3450, streak: 22, badges: 5, avatar: '👦', subscription: 'basic' as SubscriptionPlan },
  { rank: 5, name: 'Марія Іванченко', points: 3120, streak: 19, badges: 5, avatar: '👧', subscription: 'free' as SubscriptionPlan },
  { rank: 6, name: 'Василь Кравчук', points: 2870, streak: 15, badges: 4, avatar: '🧑', subscription: 'pro' as SubscriptionPlan },
  { rank: 7, name: 'Катерина Мельник', points: 2540, streak: 12, badges: 3, avatar: '👩', subscription: 'free' as SubscriptionPlan },
  { rank: 8, name: 'Іван Шевченко', points: 2310, streak: 10, badges: 3, avatar: '🧒', subscription: 'basic' as SubscriptionPlan },
  { rank: 9, name: 'Оля Петренко', points: 1980, streak: 8, badges: 2, avatar: '👱‍♀️', subscription: 'pro' as SubscriptionPlan },
  { rank: 10, name: 'Тарас Бондар', points: 1750, streak: 7, badges: 2, avatar: '👱', subscription: 'free' as SubscriptionPlan },
];

const badges = [
  { icon: '🚀', name: 'Перший крок', desc: 'Реєстрація на платформі', points: 50 },
  { icon: '🔥', name: '7 днів поспіль', desc: '7 днів навчання підряд', points: 100 },
  { icon: '📹', name: 'Кіноман', desc: 'Переглянуто 10 відеоуроків', points: 150 },
  { icon: '🤖', name: 'Балакун', desc: 'Надіслано 50 повідомлень ШІ', points: 200 },
  { icon: '⭐', name: 'Відмінник', desc: 'Набрав 500 балів', points: 300 },
  { icon: '🏆', name: 'Чемпіон', desc: 'Топ-10 рейтингу', points: 500 },
  { icon: '💎', name: 'PRO Учень', desc: 'Оформив PRO підписку', points: 250 },
  { icon: '🎓', name: 'Майстер НМТ', desc: 'Пройшов 5 пробних тестів', points: 400 },
];

const rankColors: Record<number, string> = {
  1: 'from-yellow-400 to-amber-500',
  2: 'from-slate-300 to-slate-400',
  3: 'from-orange-500 to-amber-600',
};



export default function LeaderboardPage() {
  const { user, isLoggedIn, setCurrentPage } = useApp();

  const userRank = user ? Math.floor(Math.random() * 50) + 11 : null;

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Рейтинг учнів</h1>
          <p className="text-slate-400">Змагайся і потрапи до топ-10 найкращих!</p>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {[mockLeaders[1], mockLeaders[0], mockLeaders[2]].map((leader, i) => {
            const heights = ['h-32', 'h-40', 'h-28'];
            const positions = [2, 1, 3];
            const pos = positions[i];
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="text-4xl mb-2">{leader.avatar}</div>
                <div className="text-white font-bold text-sm mb-1 text-center">{leader.name.split(' ')[0]}</div>
                <div className="text-yellow-400 font-black text-sm mb-2">{leader.points.toLocaleString()} ⚡</div>
                <div
                  className={`${heights[i]} w-20 sm:w-28 rounded-t-xl bg-gradient-to-t ${rankColors[pos] || 'from-slate-600 to-slate-700'} flex items-start justify-center pt-3`}
                >
                  <span className="text-white font-black text-2xl">#{pos}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full leaderboard */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden mb-8">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-white font-bold">Загальний рейтинг</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {mockLeaders.map((leader) => (
              <div
                key={leader.rank}
                className={`flex items-center gap-4 p-4 transition hover:bg-slate-700/50 ${
                  leader.rank <= 3 ? `border-l-4 ${leader.rank === 1 ? 'border-yellow-500' : leader.rank === 2 ? 'border-slate-400' : 'border-orange-500'}` : ''
                }`}
              >
                <div className={`w-8 text-center font-black ${
                  leader.rank === 1 ? 'text-yellow-400 text-xl' :
                  leader.rank === 2 ? 'text-slate-300 text-lg' :
                  leader.rank === 3 ? 'text-orange-400 text-lg' :
                  'text-slate-500'
                }`}>
                  {leader.rank <= 3 ? ['🥇', '🥈', '🥉'][leader.rank - 1] : `#${leader.rank}`}
                </div>
                <div className="text-3xl">{leader.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold">{leader.name}</span>
                    {getSubscriptionBadge(leader.subscription)}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-slate-500 text-xs">🔥 {leader.streak} днів</span>
                    <span className="text-slate-500 text-xs">🏅 {leader.badges} нагород</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-black">{leader.points.toLocaleString()}</div>
                  <div className="text-slate-500 text-xs">балів</div>
                </div>
              </div>
            ))}
          </div>

          {/* Current user position */}
          {isLoggedIn && userRank && (
            <>
              <div className="p-3 text-center text-slate-600 text-sm">• • •</div>
              <div className="flex items-center gap-4 p-4 bg-indigo-500/10 border-t border-indigo-500/30">
                <div className="w-8 text-center text-slate-400 font-bold">#{userRank}</div>
                <div className="text-3xl">
                  {user?.name?.charAt(0).toUpperCase() ? '😊' : '👤'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-300 font-semibold">{user?.name} (Ти)</span>
                    {user?.subscription && getSubscriptionBadge(user.subscription)}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">🔥 {user?.streak} днів</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-black">{user?.points.toLocaleString()}</div>
                  <div className="text-slate-500 text-xs">балів</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Badges system */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-black text-xl mb-2">🏅 Система нагород</h2>
          <p className="text-slate-400 text-sm mb-6">Виконуй завдання і заробляй нагороди. Більше нагород — вищий рейтинг!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((badge, i) => {
              const earned = user?.badges?.some(b => b.earned && b.icon === badge.icon) || (isLoggedIn && i === 0);
              return (
                <div
                  key={i}
                  className={`rounded-xl p-3 text-center border transition ${
                    earned
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-slate-900/50 border-slate-700 opacity-60'
                  }`}
                >
                  <div className={`text-3xl mb-1 ${!earned ? 'grayscale' : ''}`}>{badge.icon}</div>
                  <div className={`text-xs font-bold mb-0.5 ${earned ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {badge.name}
                  </div>
                  <div className="text-slate-500 text-xs mb-1">{badge.desc}</div>
                  <div className="text-yellow-500 text-xs font-bold">+{badge.points} балів</div>
                  {earned && <div className="text-green-400 text-xs mt-1">✅ Отримано!</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* How to earn points */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-black text-xl mb-4">⚡ Як заробляти бали?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { action: 'Запитати ШІ-репетитора', points: '+2', icon: '🤖' },
              { action: 'Переглянути відеоурок', points: '+20-40', icon: '📹' },
              { action: 'Щоденний вхід (streak)', points: '+10', icon: '🔥' },
              { action: 'Пройти пробний тест', points: '+50', icon: '📝' },
              { action: 'Правильна відповідь у чаті', points: '+5', icon: '✅' },
              { action: 'Запросити друга', points: '+100', icon: '👥' },
              { action: 'Оформити PRO підписку', points: '+250', icon: '💎' },
              { action: 'Тиждень навчання підряд', points: '+100', icon: '🏆' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-slate-300 text-sm">{item.action}</span>
                </div>
                <span className="text-yellow-400 font-black text-sm">{item.points} балів</span>
              </div>
            ))}
          </div>
        </div>

        {!isLoggedIn && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black px-8 py-4 rounded-2xl hover:opacity-90 transition text-lg shadow-2xl"
            >
              🚀 Приєднатись і потрапити в рейтинг
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
