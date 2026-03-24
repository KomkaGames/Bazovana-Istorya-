import { useApp } from '../context/AppContext';

const stats = [
  { value: '2,847', label: 'Учнів навчаються', icon: '👨‍🎓' },
  { value: '94%', label: 'Здали НМТ успішно', icon: '✅' },
  { value: '4', label: 'Відеоуроки', icon: '🎬' },
  { value: '24/7', label: 'ШІ-репетитор онлайн', icon: '🤖' },
];

const features = [
  {
    icon: '🤖',
    title: 'ШІ-Репетитор GPT-4 рівня',
    desc: 'Задавай будь-яке питання з НМТ — ШІ пояснить як живий вчитель, дасть підказки та перевірить твоє розуміння методом Сократа.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: '📹',
    title: 'Відеоуроки "Базована Історія"',
    desc: 'Найкращі відеоуроки з YouTube каналу "Базована Історія" та інших топ-каналів прямо на платформі. Вчись де зручно.',
    color: 'from-red-500 to-pink-600',
  },
  {
    icon: '🏆',
    title: 'Геймфікація та нагороди',
    desc: 'Заробляй бали за уроки, отримуй бейджи, змагайся з друзями в рейтингу. Навчання стає захопливим!',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: '📊',
    title: 'Відстеження прогресу',
    desc: 'Деталізована аналітика: де ти сильний, де слабкий, скільки балів наберете на реальному НМТ прямо зараз.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: '📝',
    title: 'Пробні тести НМТ',
    desc: 'Тисячі завдань у форматі реального НМТ. Тренуйся в умовах, максимально наближених до іспиту.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: '🔥',
    title: 'Streak-система',
    desc: 'Тримай серію навчання кожен день. Чим довша серія — тим більше бонусів та знижок на підписку.',
    color: 'from-orange-500 to-red-600',
  },
];

const testimonials = [
  {
    name: 'Аня Коваль',
    score: '196 балів',
    subject: 'Математика',
    text: 'Я займалась 3 місяці на цій платформі. ШІ пояснював кожне завдання так, що я нарешті зрозуміла тригонометрію!',
    avatar: '👩‍🎓',
  },
  {
    name: 'Дмитро Лис',
    score: '188 балів',
    subject: 'Українська мова',
    text: 'Відеоуроки з "Базованої Історії" + ШІ-репетитор = ідеальна комбо. Підготувався за 2 місяці.',
    avatar: '👨‍💻',
  },
  {
    name: 'Соня Марченко',
    score: '200 балів! 🎉',
    subject: 'Українська мова і літ.',
    text: 'ДВІСТІ БАЛІВ! Не вірила, що це можливо. Геймфікація та бейджи мотивували мене навчатись щодня.',
    avatar: '🌟',
  },
];

const quickActions = [
  { label: '📅 Протестуй мене по датах ХХ століття', page: 'chat', q: 'Протестуй мене по датах ХХ століття в Україні' },
  { label: '📜 Поясни причини Руїни простими словами', page: 'chat', q: 'Поясни причини Руїни простими словами' },
  { label: '🅰️ Як швидко запам\'ятати наголоси?', page: 'chat', q: 'Як швидко запам\'ятати наголоси в українській мові для НМТ?' },
];

export default function HomePage() {
  const { setCurrentPage, isLoggedIn } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        
        {/* Floating shapes with better mobile performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-5 sm:opacity-10 animate-pulse"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                background: `radial-gradient(circle, ${['#6366f1','#f59e0b','#10b981','#ef4444'][i%4]}, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Mobile-optimized hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-6 animate-pulse backdrop-blur">
            <span className="text-yellow-400 text-xs sm:text-sm font-semibold">🔥 НМТ 2025 — Почни підготовку прямо зараз</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            Здай НМТ на{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              200 балів
            </span>
            <br />з ШІ-репетитором
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Персональний ШІ-репетитор рівня GPT-4, відеоуроки від <strong className="text-red-400">"Базованої Історії"</strong>, геймфікація та тисячі завдань. 
            <strong className="text-white block mt-2">94% наших учнів здають НМТ успішно!</strong>
          </p>

          {/* Quick action buttons - mobile optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(action.page)}
                className="bg-slate-800/80 backdrop-blur border border-slate-600 hover:border-yellow-500 text-slate-300 hover:text-white text-xs sm:text-sm px-4 py-3 rounded-xl transition-all hover:bg-slate-700 active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage(isLoggedIn ? 'chat' : 'login')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black text-lg px-8 py-4 rounded-2xl hover:opacity-90 transition shadow-2xl shadow-yellow-500/30"
            >
              🚀 Почати безкоштовно
            </button>
            <button
              onClick={() => setCurrentPage('videos')}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition border border-slate-600"
            >
              📹 Дивитись відео
            </button>
          </div>

          <p className="text-slate-500 text-sm mt-4">✓ Безкоштовно 7 днів &nbsp;•&nbsp; ✓ Без кредитної картки &nbsp;•&nbsp; ✓ Скасуй будь-коли</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-8 h-12 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Mobile scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden">
          <p className="text-slate-500 text-xs">⌄ Прокрути вниз</p>
        </div>
      </section>

      {/* STATS WITH VISUALS */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-800/50 to-slate-900 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">📊 Наші досягнення</h3>
            <p className="text-slate-400 text-sm">НМТ Майстер допомагає учням здавати випробування з 2024 року</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 text-center hover:border-yellow-500/50 transition-all hover:scale-105 shadow-xl">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-4xl font-black text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            Чому{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              НМТ Майстер
            </span>
            ?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ми поєднали найкращі технології та педагогічні методики, щоб ти підготувався максимально ефективно
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO PREVIEW */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-red-400 text-sm font-semibold">▶️ Відеоуроки "Базована Історія"</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Найкращі відеоуроки для НМТ</h2>
            <p className="text-slate-400">Топові відеоуроки з YouTube прямо на нашій платформі</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {[
              { youtubeId: '4mfBMOay9Fs', title: 'Важливі дати історії України для НМТ', views: '180K', duration: '9:48' },
              { youtubeId: 'wTdn5ACg8I4', title: 'Історія України зі скетчів', views: '245K', duration: '12:34' },
              { youtubeId: 'Qn3QJfPW7HA', title: 'Голодомор 1932-33 — що треба знати', views: '320K', duration: '15:21' },
            ].map((v, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage('videos')}
                className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              >
                <div className="relative h-36 sm:h-44 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <span className="text-xl sm:text-2xl ml-0.5">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono">
                    {v.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                    🔴 РЕКОМЕНДУЄМО
                  </div>
                </div>
                <div className="p-4 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-400 text-xs font-bold">БАЗОВАНА ІСТОРІЯ</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{v.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xs">👁 {v.views}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-green-400 text-xs">🔥 Популярне</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentPage('videos')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition"
            >
              📹 Всі відеоуроки →
            </button>
          </div>
        </div>
      </section>

      {/* AI DEMO */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
              <span className="text-purple-400 text-sm">🤖 ШІ-Репетитор</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Твій особистий вчитель{' '}
              <span className="text-purple-400">24/7</span>
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Наш ШІ навчений на матеріалах НМТ і використовує метод Сократа — не просто дає відповідь, а змушує тебе думати і розуміти.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '✅ Пояснює кожен крок рішення',
                '✅ Задає навідні запитання',
                '✅ Не галюцинує — чесно каже коли не знає',
                '✅ Нагадує формат НМТ-завдань',
                '✅ Підтримує і мотивує',
              ].map((item, i) => (
                <li key={i} className="text-slate-300 text-sm">{item}</li>
              ))}
            </ul>
            <button
              onClick={() => setCurrentPage('chat')}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              🤖 Поговорити з ШІ →
            </button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">🤖</div>
              <div>
                <div className="text-white text-sm font-semibold">НМТ ШІ-Репетитор</div>
                <div className="text-green-400 text-xs">● Онлайн</div>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-xs">
                  Коли відбулась Переяславська рада?
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1">🤖</div>
                <div className="bg-slate-700 text-slate-200 text-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-sm">
                  Чудове питання! Але спочатку — що ти вже знаєш про цю подію? Спробуй назвати хоча б приблизний рік і я підкажу чи правильно 🎯
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-xs">
                  Здається 1654?
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1">🤖</div>
                <div className="bg-slate-700 text-slate-200 text-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-sm">
                  <strong>Точно!</strong> 8 січня 1654 року. 🔥 +5 балів!<br/><br/>
                  <span className="text-yellow-400">⚠️ НМТ підказка:</span> Ця дата — обов'язкова для тестів на встановлення відповідності. Запам'ятай: <strong>1654 = Переяслав</strong>.
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Задай питання з НМТ..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-400"
                readOnly
              />
              <button
                onClick={() => setCurrentPage('chat')}
                className="bg-purple-600 text-white px-3 py-2 rounded-xl text-sm hover:bg-purple-700 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Реальні результати учнів</h2>
            <p className="text-slate-400">Вони вже здали НМТ. Тепер твоя черга.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{t.avatar}</div>
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-yellow-400 font-black">{t.score}</div>
                    <div className="text-slate-500 text-xs">{t.subject}</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            Готовий до{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              200 балів
            </span>
            ?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Приєднуйся до тисяч учнів, які вже готуються з НМТ Майстер. Перші 7 днів — безкоштовно.
          </p>
          <button
            onClick={() => setCurrentPage(isLoggedIn ? 'pricing' : 'login')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black text-xl px-10 py-5 rounded-2xl hover:opacity-90 transition shadow-2xl shadow-yellow-500/30 inline-block"
          >
            🚀 Почати безкоштовно — 7 днів
          </button>
          <p className="text-slate-600 text-sm mt-4">Без кредитної картки • Скасуй будь-коли • Повний доступ</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-black text-lg text-white mb-3">
                <span>🎯</span>
                <span className="text-yellow-400">НМТ Майстер</span>
              </div>
              <p className="text-slate-500 text-xs">Найкраща платформа підготовки до НМТ в Україні</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Навчання</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><button onClick={() => setCurrentPage('chat')} className="hover:text-white transition">ШІ-Репетитор</button></li>
                <li><button onClick={() => setCurrentPage('videos')} className="hover:text-white transition">Відеоуроки</button></li>
                <li><button onClick={() => setCurrentPage('leaderboard')} className="hover:text-white transition">Рейтинг</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Підписка</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition">Тарифи</button></li>
                <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition">PRO план</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Контакти</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li>📧 hello@nmtmaster.ua</li>
                <li>💬 Telegram: @nmtmaster</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs">© 2025 НМТ Майстер. Всі права захищено.</p>
            <p className="text-slate-600 text-xs">🇺🇦 Зроблено в Україні з ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
