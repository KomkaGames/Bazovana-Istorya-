import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login, setCurrentPage } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Введіть ваше ім\'я'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Введіть коректний email'); return; }
    login(name.trim(), email.trim(), secretCode.trim());
    setStep('success');
    setTimeout(() => setCurrentPage('chat'), 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-white font-black text-2xl mb-2">Вітаємо, {name}!</h2>
          <p className="text-slate-400">Перенаправляємо до ШІ-репетитора...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-2xl font-black text-white">Вхід до НМТ Майстер</h1>
          <p className="text-slate-400 mt-1">Почни підготовку до НМТ прямо зараз</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          {/* Benefits */}
          <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold text-sm mb-3">🎁 Що ти отримаєш безкоштовно:</h3>
            <ul className="space-y-1.5">
              {[
                '🤖 5 повідомлень ШІ-репетитора на день',
                '📹 3 відеоуроки безкоштовно',
                '⚡ 50 стартових балів',
                '🏅 Перший бейдж "Першопрохідець"',
                '📊 Доступ до рейтингу учнів',
              ].map((item, i) => (
                <li key={i} className="text-slate-300 text-xs">{item}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Ваше ім'я</label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder="Наприклад: Аня"
                className="w-full bg-slate-900 border border-slate-600 focus:border-yellow-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="your@email.com"
                className="w-full bg-slate-900 border border-slate-600 focus:border-yellow-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none transition"
              />
            </div>

            {/* Secret Code Field */}
            <div>
              <label className="text-slate-400 text-sm mb-1.5 block">🔑 Секретний код (для адмінів)</label>
              <input
                type="password"
                value={secretCode}
                onChange={e => { setSecretCode(e.target.value); setError(''); }}
                placeholder="Введи код якщо ти адмін"
                className="w-full bg-slate-900 border border-slate-600 focus:border-yellow-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none transition"
              />
              <p className="text-slate-600 text-xs mt-1">Введи секретний код для отримання адміністративних прав</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black py-3 rounded-xl hover:opacity-90 transition text-lg shadow-lg"
            >
              🚀 Почати безкоштовно
            </button>
          </form>

          <p className="text-slate-600 text-xs text-center mt-4">
            Реєструючись, ти погоджуєшся з нашими Умовами використання.<br />
            Не надсилаємо спам. Тільки корисне для НМТ.
          </p>
        </div>

        {/* Admin hint (hidden, subtle) */}
        <div className="mt-4 text-center">
          <p className="text-slate-700 text-xs">
            Вже маєш акаунт? Просто введи ті самі дані для входу.
          </p>
        </div>

        <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
          <h3 className="text-white font-semibold text-sm mb-3">🏆 Приєдналися сьогодні:</h3>
          <div className="space-y-2">
            {[
              { name: 'Аня з Києва', time: '2 хв тому', action: 'Почала вивчати Козацьку добу' },
              { name: 'Дмитро з Харкова', time: '15 хв тому', action: 'Набрав 150 балів за відео' },
              { name: 'Соня зі Львова', time: '32 хв тому', action: 'Активувала PRO підписку' },
            ].map((u, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-900 font-bold flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <span className="text-slate-300 font-medium">{u.name}</span>
                  <span className="text-slate-500"> · {u.time}</span>
                  <div className="text-slate-500">{u.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
