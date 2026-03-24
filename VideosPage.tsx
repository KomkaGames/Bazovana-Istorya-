import { useState } from 'react';
import { useApp } from '../context/AppContext';

const subjects = ['Всі', 'Історія України'];

const videos = [
  {
    id: 'v1',
    youtubeId: '4mfBMOay9Fs',
    youtubeUrl: 'https://youtu.be/4mfBMOay9Fs',
    title: 'Важливі дати історії України для ЗНО. Як вивчити швидко?',
    channel: 'Базована Історія',
    subject: 'Історія України',
    duration: '9:48',
    views: '180K',
    points: 25,
    description: 'Як швидко вивчити всі дати для ЗНО/НМТ з історії України? Ефективні методи та лайфхаки.',
    level: 'Базовий',
    channelIcon: '🎬',
  },
  {
    id: 'v2',
    youtubeId: 'wTdn5ACg8I4',
    youtubeUrl: 'https://youtu.be/wTdn5ACg8I4',
    title: 'Історія України зі скетчів. Як це працює?',
    channel: 'Базована Історія',
    subject: 'Історія України',
    duration: '12:34',
    views: '245K',
    points: 30,
    description: 'Як скетчі допомагають запам\'ятати історію України? Пояснюємо на прикладах.',
    level: 'Середній',
    channelIcon: '🎬',
  },
  {
    id: 'v3',
    youtubeId: 'Qn3QJfPW7HA',
    youtubeUrl: 'https://youtu.be/Qn3QJfPW7HA',
    title: 'Голодомор 1932-33. Що треба знати для ЗНО?',
    channel: 'Базована Історія',
    subject: 'Історія України',
    duration: '15:21',
    views: '320K',
    points: 35,
    description: 'Все, що треба знати про Голодомор для ЗНО/НМТ: причини, наслідки, дати.',
    level: 'Середній',
    channelIcon: '🎬',
  },
  {
    id: 'v4',
    youtubeId: 'gT3XnihqIBw',
    youtubeUrl: 'https://youtu.be/gT3XnihqIBw',
    title: 'Козацька доба. Коротко і зрозуміло для ЗНО',
    channel: 'Базована Історія',
    subject: 'Історія України',
    duration: '11:15',
    views: '198K',
    points: 25,
    description: 'Козацька доба для ЗНО: головні події, постаті, дати в стислому форматі.',
    level: 'Базовий',
    channelIcon: '🎬',
  },
];

const levelColors: Record<string, string> = {
  'Базовий': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Середній': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Складний': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function VideosPage() {
  const { user, isLoggedIn, addPoints, setCurrentPage } = useApp();
  const [activeSubject, setActiveSubject] = useState('Всі');
  const [watched, setWatched] = useState<Set<string>>(new Set(user?.completedLessons || []));
  const [search, setSearch] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = videos.filter(v => {
    const matchesSubject = activeSubject === 'Всі' || v.subject === activeSubject;
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.channel.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleWatch = (youtubeUrl: string, videoId: string, points: number) => {
    if (!isLoggedIn) {
      setCurrentPage('login');
      return;
    }
    if (!watched.has(videoId)) {
      setWatched(prev => new Set([...prev, videoId]));
      addPoints(points);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    // Open YouTube in new tab
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-bounce">
          🎉 Бали отримано!
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with animated gradient */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-red-500/40 rounded-full px-4 py-2 mb-4 animate-pulse">
            <span className="text-red-400 text-sm font-semibold">▶️ YouTube відеоуроки</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
            Відеоуроки для підготовки до НМТ
          </h1>
          <p className="text-slate-400">
            Найкращі відео від <span className="text-red-400 font-semibold">"Базованої Історії"</span> та топ-каналів. Дивись і заробляй бали!
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Пошук відео..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-800/80 backdrop-blur border border-slate-600 rounded-2xl px-12 py-3 text-white placeholder-slate-400 text-sm outline-none focus:border-yellow-500 transition-all focus:ring-2 focus:ring-yellow-500/20"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4">
            {subjects.map(s => (
              <button
                key={s}
                onClick={() => setActiveSubject(s)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all active:scale-95 ${
                  activeSubject === s
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 shadow-lg shadow-yellow-500/30'
                    : 'bg-slate-800/80 backdrop-blur text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map(video => (
            <div
              key={video.id}
              className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-500 transition-all hover:-translate-y-2 active:scale-95 group shadow-xl relative"
            >
              {/* Thumbnail with gradient overlay */}
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 aspect-video flex items-center justify-center overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <button
                  onClick={() => handleWatch(video.youtubeUrl, video.id, video.points)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600/90 hover:bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-2xl shadow-red-600/30 animate-pulse">
                    <span className="text-2xl sm:text-3xl ml-1">▶</span>
                  </div>
                </button>
                
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full font-mono font-bold backdrop-blur">
                  {video.duration}
                </div>
                
                {watched.has(video.id) && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg shadow-green-500/30">
                    ✅ Переглянуто
                  </div>
                )}
              </div>

              {/* Info with better spacing */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border font-bold ${levelColors[video.level]}`}>
                    {video.level}
                  </span>
                  <span className="text-yellow-400 text-xs sm:text-sm font-extrabold bg-yellow-500/10 px-3 py-1.5 rounded-full">+{video.points} балів</span>
                </div>
                
                <h3 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-slate-400 text-xs sm:text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{video.description}</p>
                
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-700/30">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">{video.channelIcon}</span>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">{video.channel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <span>👁</span>
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleWatch(video.youtubeUrl, video.id, video.points)}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-red-600 hover:to-orange-600 text-slate-300 hover:text-white text-xs sm:text-sm font-extrabold py-3 sm:py-4 transition-all active:scale-95 rounded-b-2xl flex items-center justify-center gap-2"
              >
                <span>{watched.has(video.id) ? '🔄' : '▶'}</span>
                <span>{watched.has(video.id) ? 'Дивитись знову' : 'Дивитись урок'}</span>
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <div className="text-5xl mb-4">🔍</div>
            <p>Відео не знайдено. Спробуй інший запит.</p>
          </div>
        )}

        {/* Stats with animated progress */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-5 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 backdrop-blur shadow-xl">
          <div className="text-center lg:text-left w-full">
            <h3 className="text-white font-black text-xl sm:text-2xl mb-2 flex items-center gap-3 justify-center lg:justify-start">
              <span className="text-2xl sm:text-3xl animate-pulse">📊</span>
              Твій прогрес
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Переглянуто: <strong className="text-yellow-400 text-base sm:text-lg">{watched.size}</strong> з <strong className="text-white">{videos.length}</strong> уроків
            </p>
            <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-slate-500 text-xs sm:text-sm">Зароблено:</span>
              <span className="text-yellow-400 font-extrabold text-base sm:text-lg bg-yellow-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                {Array.from(watched).reduce((sum, id) => {
                  const video = videos.find(v => v.id === id);
                  return sum + (video?.points || 0);
                }, 0)} балів
              </span>
            </div>
          </div>
          
          <div className="flex-1 lg:max-w-lg w-full">
            <div className="bg-slate-700/50 rounded-full h-3 sm:h-5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700 ease-out relative"
                style={{ width: `${(watched.size / videos.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 sm:mt-3">
              <span className="text-slate-500 text-xs">Початок</span>
              <span className="text-white font-bold text-sm">
                {Math.round((watched.size / videos.length) * 100)}%
              </span>
              <span className="text-slate-500 text-xs">Експерт</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
