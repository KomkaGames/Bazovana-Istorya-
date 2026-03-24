import { useState } from 'react';
import { useApp } from '../context/AppContext';

const plans = [
  {
    id: 'free',
    name: 'Безкоштовний',
    price: 0,
    period: 'назавжди',
    color: 'from-slate-600 to-slate-700',
    border: 'border-slate-600',
    badge: null,
    features: [
      { text: '5 повідомлень ШІ/день', included: true },
      { text: '3 відеоуроки безкоштовно', included: true },
      { text: 'Базова геймфікація', included: true },
      { text: 'Необмежений ШІ-репетитор', included: false },
      { text: 'Всі 180+ відеоуроків', included: false },
      { text: 'Пробні тести НМТ', included: false },
      { text: 'Деталізована аналітика', included: false },
      { text: 'Пріоритетна підтримка', included: false },
    ],
  },
  {
    id: 'pro_month',
    name: 'PRO Місяць',
    price: 599,
    period: 'місяць',
    color: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500',
    badge: '🔥 Найпопулярніший',
    features:[
      { text: '∞ Необмежений ШІ-репетитор', included: true },
      { text: 'Всі 180+ відеоуроків HD', included: true },
      { text: 'Пробні тести НМТ (1000+ завдань)', included: true },
      { text: 'Деталізована аналітика прогресу', included: true },
      { text: 'Щотижневі звіти на email', included: true },
      { text: 'Ексклюзивні матеріали для НМТ', included: true },
      { text: 'Пріоритетна підтримка', included: true },
      { text: 'Доступ до закритої спільноти', included: true },
    ],
  },
  {
    id: 'pro_3month',
    name: 'PRO 3 Місяці',
    price: 999,
    period: '3 місяці',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500',
    badge: '💎 Найвигідніший',
    originalPrice: 1797,
    features: [
      { text: '∞ Необмежений ШІ-репетитор', included: true },
      { text: 'Всі 180+ відеоуроків HD', included: true },
      { text: 'Пробні тести НМТ (1000+ завдань)', included: true },
      { text: 'Деталізована аналітика прогресу', included: true },
      { text: 'Щотижневі звіти на email', included: true },
      { text: 'Ексклюзивні матеріали для НМТ', included: true },
      { text: 'Пріоритетна підтримка 24/7', included: true },
      { text: 'Особиста консультація з ментором', included: true },
    ],
  },
];

const paymentData = {
  cardNumber: '5375 4141 0678 5956',
  recipient: 'НМТ Майстер',
  monoLink: 'https://send.monobank.ua/jar/nmtmaster',
  telegram: '@Bagdanch1k_A',
};

const valueItems = [
  { icon: '🤖', title: 'ШІ-репетитор 24/7', value: '~2,000 грн/міс', desc: 'Репетитор в середньому коштує 400-500 грн/год' },
  { icon: '📹', title: '180+ відеоуроків', value: '~3,000 грн', desc: 'Преміум відеокурси коштують 1000-3000 грн' },
  { icon: '📝', title: 'Пробні тести', value: '~500 грн', desc: 'Збірники тестів НМТ в магазині' },
  { icon: '📊', title: 'Аналітика прогресу', value: '~1,000 грн', desc: 'Персональний план підготовки' },
];

export default function PricingPage() {
  const { isLoggedIn, setCurrentPage, user, addPaymentNotification } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [userTelegram, setUserTelegram] = useState('');
  const [paymentStep, setPaymentStep] = useState(1);

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      if (!isLoggedIn) {
        setCurrentPage('login');
      }
      return;
    }
    if (!isLoggedIn) {
      setCurrentPage('login');
      return;
    }
    setSelectedPlan(planId);
    setShowPayment(true);
    setPaymentStep(1);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(paymentData.cardNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    if (!user || !selectedPlanData) return;
    
    // Додаємо сповіщення для адміна/власника
    addPaymentNotification({
      userName: user.name,
      userEmail: user.email,
      userTelegram: userTelegram || undefined,
      plan: selectedPlan === 'pro_month' ? 'pro' : selectedPlan === 'pro_3month' ? 'pro3' : 'basic',
      amount: selectedPlanData.price,
      message: `Користувач ${user.name} повідомив про оплату тарифу "${selectedPlanData.name}" на суму ${selectedPlanData.price} грн`,
    });
    
    setPaymentConfirmed(true);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
            <span className="text-yellow-400 text-sm font-semibold">💎 Преміум підписка</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Інвестуй в{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              своє майбутнє
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            PRO підписка коштує менше, ніж 1 година з репетитором. Але дає тобі підготовку на весь рік.
          </p>
        </div>

        {/* Value comparison */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-12">
          <h3 className="text-white font-bold text-lg mb-4 text-center">
            💡 Що ти отримуєш за 599 грн/місяць (реальна цінність):
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {valueItems.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div className="text-yellow-400 font-black">{item.value}</div>
                <div className="text-slate-500 text-xs mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm">Загальна вартість окремо:</p>
              <p className="text-slate-500 line-through text-lg">~6,500 грн/місяць</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">З НМТ Майстер PRO:</p>
              <p className="text-yellow-400 font-black text-4xl">599 грн/міс</p>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center">
              <p className="text-green-400 font-black text-xl">Економія</p>
              <p className="text-green-400 font-black text-3xl">~6,400 грн</p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-slate-800 border-2 ${plan.border} rounded-2xl p-6 flex flex-col ${
                plan.badge ? 'shadow-2xl scale-105' : ''
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r ${plan.color} text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap`}>
                  {plan.badge}
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                <span className="text-2xl">{plan.id === 'free' ? '🆓' : plan.id === 'pro_month' ? '⚡' : '💎'}</span>
              </div>

              <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>

              <div className="flex items-baseline gap-2 mb-4">
                {(plan as any).originalPrice && (
                  <span className="text-slate-500 line-through text-sm">{(plan as any).originalPrice} грн</span>
                )}
                <span className="text-3xl font-black text-white">{plan.price === 0 ? 'Безкоштовно' : `${plan.price} грн`}</span>
                {plan.price > 0 && <span className="text-slate-400 text-sm">/{plan.period}</span>}
              </div>

              {plan.id === 'pro_3month' && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-2 mb-4 text-center">
                  <p className="text-green-400 text-sm font-bold">Економія 48 грн (≈16%)</p>
                </div>
              )}

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`text-sm flex-shrink-0 mt-0.5 ${f.included ? 'text-green-400' : 'text-slate-600'}`}>
                      {f.included ? '✅' : '❌'}
                    </span>
                    <span className={`text-sm ${f.included ? 'text-slate-300' : 'text-slate-600'}`}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  plan.id === 'free'
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90 shadow-lg`
                }`}
              >
                {plan.id === 'free' ? 'Почати безкоштовно' : `Отримати ${plan.name} →`}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedPlanData && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowPayment(false)}>
            <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-black text-xl">💳 Оплата підписки</h3>
                <button onClick={() => setShowPayment(false)} className="text-slate-400 hover:text-white text-2xl">×</button>
              </div>

              {!paymentConfirmed ? (
                <>
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          paymentStep >= step 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-8 h-1 ${paymentStep > step ? 'bg-yellow-500' : 'bg-slate-700'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {paymentStep === 1 && (
                    <>
                      <div className="bg-slate-700 rounded-xl p-4 mb-4">
                        <p className="text-slate-400 text-sm mb-1">Тариф:</p>
                        <p className="text-white font-bold">{selectedPlanData.name}</p>
                        <p className="text-yellow-400 font-black text-2xl">{selectedPlanData.price} грн</p>
                      </div>

                      <div className="bg-slate-900 rounded-xl p-4 mb-4">
                        <p className="text-slate-400 text-sm mb-3">Переказ на картку Monobank:</p>
                        <div className="flex items-center justify-between bg-slate-800 rounded-lg p-3 mb-2">
                          <span className="text-white font-mono font-bold text-lg tracking-wider">
                            {paymentData.cardNumber}
                          </span>
                          <button
                            onClick={copyCard}
                            className="bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-400 transition ml-2 flex-shrink-0"
                          >
                            {copied ? '✅ Скопійовано!' : '📋 Копіювати'}
                          </button>
                        </div>
                        <p className="text-slate-400 text-xs">Отримувач: <strong className="text-white">{paymentData.recipient}</strong></p>
                      </div>

                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 mb-4">
                        <p className="text-blue-400 text-sm">
                          📱 <strong>Монобанк:</strong> Відкрий додаток → Переказ по номеру картки → Вставте номер
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setPaymentStep(2)}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black py-3 rounded-xl hover:opacity-90 transition"
                      >
                        Я переказав гроші →
                      </button>
                    </>
                  )}
                  
                  {paymentStep === 2 && (
                    <>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-4">
                        <p className="text-purple-400 font-bold text-base mb-3">
                          ✈️ Введіть ваш Telegram для зв'язку:
                        </p>
                        <input
                          type="text"
                          value={userTelegram}
                          onChange={(e) => setUserTelegram(e.target.value)}
                          placeholder="@ваш_нікнейм"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 mb-3"
                        />
                        <p className="text-purple-300 text-xs text-center">
                          Це потрібно, щоб ми могли швидко активувати вашу підписку
                        </p>
                      </div>
                      
                      <div className="bg-slate-900 rounded-xl p-4 mb-4">
                        <p className="text-slate-400 text-sm mb-2">Напишіть мені в Telegram:</p>
                        <a 
                          href={`https://t.me/${paymentData.telegram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                        >
                          <span className="text-2xl">✈️</span>
                          <span>{paymentData.telegram}</span>
                        </a>
                        <p className="text-slate-500 text-xs mt-2 text-center">
                          Напиши "Оплата НМТ Майстер PRO" і я активую підписку миттєво! ⚡
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPaymentStep(1)}
                          className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition"
                        >
                          ← Назад
                        </button>
                        <button
                          onClick={() => setPaymentStep(3)}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-black py-3 rounded-xl hover:opacity-90 transition"
                        >
                          Далі →
                        </button>
                      </div>
                    </>
                  )}
                  
                  {paymentStep === 3 && (
                    <>
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                        <p className="text-green-400 font-bold text-base mb-2">
                          ✅ Підтвердіть, що ви оплатили:
                        </p>
                        <div className="bg-slate-900 rounded-lg p-3 space-y-2">
                          <p className="text-slate-300 text-sm flex justify-between">
                            <span>Тариф:</span>
                            <span className="text-white font-bold">{selectedPlanData.name}</span>
                          </p>
                          <p className="text-slate-300 text-sm flex justify-between">
                            <span>Сума:</span>
                            <span className="text-yellow-400 font-bold">{selectedPlanData.price} грн</span>
                          </p>
                          {userTelegram && (
                            <p className="text-slate-300 text-sm flex justify-between">
                              <span>Telegram:</span>
                              <span className="text-blue-400 font-bold">{userTelegram}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 mb-4">
                        <p className="text-amber-400 text-sm">
                          ⚠️ <strong>Важливо:</strong> Після натискання кнопки, адміністратор отримає сповіщення про вашу оплату і перевірить її.
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPaymentStep(2)}
                          className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition"
                        >
                          ← Назад
                        </button>
                        <button
                          onClick={handlePaymentConfirm}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition animate-pulse"
                        >
                          ✅ Підтверджую оплату
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <h4 className="text-white font-black text-xl mb-2">Дякуємо за оплату!</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Ваш запит на активацію PRO прийнято. <strong className="text-yellow-400">Адміністратор отримав сповіщення</strong> і перевірить платіж протягом 1 години.
                  </p>
                  
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 mb-4">
                    <p className="text-blue-400 text-sm">
                      💬 Також напишіть в Telegram для швидкої активації:
                    </p>
                    <a 
                      href={`https://t.me/${paymentData.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 font-bold text-lg hover:underline"
                    >
                      {paymentData.telegram}
                    </a>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowPayment(false);
                      setPaymentConfirmed(false);
                      setPaymentStep(1);
                      setUserTelegram('');
                      setCurrentPage('chat');
                    }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl"
                  >
                    🤖 Перейти до ШІ-репетитора
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-black text-white mb-6 text-center">❓ Часті запитання</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { q: 'Як оплатити підписку?', a: 'Ми приймаємо оплату через переказ на картку Monobank. Після оплати ваш акаунт активується протягом 1 години.' },
              { q: 'Чи можна скасувати підписку?', a: 'Так, ви можете не продовжувати підписку після закінчення терміну. Повернення коштів розглядаємо в індивідуальному порядку.' },
              { q: 'Що таке ШІ-репетитор GPT-4 рівня?', a: 'Наш ШІ навчений спеціально для підготовки до НМТ і використовує найсучасніші технології для надання точних, корисних відповідей.' },
              { q: 'Чи є пробний період?', a: 'Так! Безкоштовний план включає 5 повідомлень ШІ на день та 3 відеоуроки. Цього достатньо щоб побачити цінність платформи.' },
              { q: 'Як швидко активується PRO?', a: 'Після підтвердження платежу — протягом 1 години в робочий час (9:00-22:00). Напишіть нам у Telegram @Bagdanch1k_A якщо є затримка.' },
            ].map((faq, i) => (
              <details key={i} className="bg-slate-800 border border-slate-700 rounded-xl group">
                <summary className="p-4 text-white font-semibold cursor-pointer flex justify-between items-center">
                  {faq.q}
                  <span className="text-yellow-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 text-slate-400 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-10 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/30 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-white font-bold text-xl mb-2">Гарантія задоволення</h3>
          <p className="text-slate-400 text-sm">
            Якщо протягом перших 7 днів ти не задоволений якістю — напиши нам і ми повернемо кошти. Без питань.
          </p>
        </div>
      </div>
    </div>
  );
}
