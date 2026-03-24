import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Message } from '../types';

// AI behavior: Elite NMT tutor using Socratic method, GPT-4 level responses

const QUICK_PROMPTS = [
  { label: '📅 Дати ХХ століття', text: 'Протестуй мене по ключових датах ХХ століття в Україні для НМТ' },
  { label: '⚔️ Причини Руїни', text: 'Поясни причини Руїни простими словами для підготовки до НМТ' },
  { label: '🅰️ Наголоси в укр. мові', text: 'Як швидко запам\'ятати правила наголосів в українській мові для НМТ?' },
  { label: '📐 Тригонометрія', text: 'Поясни основні формули тригонометрії для НМТ з математики' },
  { label: '🗺️ Козацька держава', text: 'Розкажи про структуру Козацької держави — Гетьманщини для НМТ' },
  { label: '✍️ Пунктуація', text: 'Які основні правила пунктуації найчастіше зустрічаються на НМТ?' },
];

// Smart AI responses based on keywords
function generateAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('переяслав') || msg.includes('переяславськ')) {
    return `**Переяславська рада** — одна з найважливіших подій для НМТ! 🎯

📌 **Дата:** 8 січня **1654** року
📌 **Місце:** Переяслав (Переяслав-Хмельницький)
📌 **Суть:** Союз між Гетьманщиною та Московським царством

🤔 **Питання для тебе:** Як ти думаєш — чому козацька старшина мала різні думки щодо цього союзу?

⚠️ **НМТ-підказка:** Дати 1648, 1649, 1654 — **обов'язкові** для встановлення відповідності. Вивчи їх напам'ять!`;
  }

  if (msg.includes('руїн') || msg.includes('руїна')) {
    return `**Руїна (1657–1687)** — período громадянської війни в Гетьманщині. 

**Головні причини:**
• ⚔️ Боротьба козацької старшини за владу після смерті Хмельницького
• 🌍 Втручання зовнішніх сил: Польща, Москва, Туреччина, Крим
• 💰 Соціально-економічні суперечності між старшиною і простим козацтвом
• 📜 Недосконалість державних інституцій молодої Гетьманщини

🤔 **Твоє завдання:** Назви хоча б 3 гетьманів доби Руїни — і я перевірю!

⚠️ **НМТ-підказка:** Руїна = **роздробленість + іноземне втручання**. Це ключова формула для тестів!`;
  }

  if (msg.includes('наголос') || msg.includes('наголош')) {
    return `Відмінне питання! Наголоси — це **5-10 балів** на НМТ з укр. мови! 🎯

**Найскладніші слова (вчи напам'ять):**
• **зАвдання** (не завдАння!)
• **фенОмен** 
• **вИпадок**
• **рукОпис**
• **кілОметр**
• **партЕр**

**Лайфхак для запам'ятовування:** Склади кумедне речення зі словами, де наголос тебе плутає.

🤔 **Тест:** Як правильно — "кОлесо" чи "колЕсо"? Відповідай!

⚠️ **НМТ-підказка:** На тесті буде 5-7 завдань на наголоси. Виділи 30 хвилин на тиждень для тренування!`;
  }

  if (msg.includes('тригонометр') || msg.includes('sin') || msg.includes('cos')) {
    return `**Тригонометрія для НМТ** — ключова тема! 📐

**Основні формули, які ОБОВ'ЯЗКОВО знати:**
• sin²α + cos²α = **1**
• sin(α + β) = sin α · cos β + cos α · sin β
• cos(2α) = cos²α - sin²α = 1 - 2sin²α

**Таблиця значень (вчи напам'ять!):**
| Кут | 0° | 30° | 45° | 60° | 90° |
|-----|-----|-----|-----|-----|-----|
| sin | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 |

🤔 **Завдання:** Обчисли sin(30°) + cos(60°). Яка відповідь?

⚠️ **НМТ-підказка:** Тригонометрія займає ~15% завдань з математики!`;
  }

  if (msg.includes('козацьк') || msg.includes('гетьман') || msg.includes('запорізьк')) {
    return `**Козацька держава — Гетьманщина** ⚔️

**Структура (вчи ієрархію!):**
• 🏛️ **Гетьман** — верховний правитель
• 📜 **Генеральна рада** — вищий дорадчий орган
• ⚔️ **Полковник** — керує полком (адмін. одиниця)
• 🏘️ **Сотник** → **Отаман**

**Ключові дати:**
• **1648** — початок Національно-визвольної війни
• **1649** — Зборівський мир, визнання Гетьманщини
• **1654** — Переяславська рада

🤔 **Питання:** Яка битва 1648 року відкрила шлях до Києва? Відповідай!

⚠️ **НМТ-підказка:** Часто питають про **повноваження** різних органів влади — вчи структуру!`;
  }

  if (msg.includes('тест') || msg.includes('перевір') || msg.includes('дат')) {
    return `Чудово! Починаємо тестування по датах ХХ ст. 🎯

**Питання 1/5:**
У якому році відбулась **Українська революція** та було проголошено **УНР**?

Варіанти:
A) 1914
B) 1917
C) 1920
D) 1922

Напиши свою відповідь (A, B, C або D) — і я скажу чи правильно! 💪

*Підказка: Подумай про роки Першої світової війни та революційні події в Російській імперії...*`;
  }

  if (msg.includes('пунктуац') || msg.includes('кома') || msg.includes('розділ')) {
    return `**Пунктуація для НМТ** ✍️

**Топ-5 правил, що завжди є на тесті:**

1️⃣ **Однорідні члени речення** — ставимо кому між ними
2️⃣ **Складносурядне речення** — перед сполучниками і, та, але
3️⃣ **Вставні слова** (по-перше, однак, звичайно) — завжди відокремлюємо
4️⃣ **Пряма мова** — слова автора: "Пряма мова" або "Пряма мова", — слова автора
5️⃣ **Підрядне речення** — відокремлюємо від головного

🤔 **Завдання:** Постав розділові знаки: "Я думав що ти прийдеш"

⚠️ **НМТ-підказка:** Пунктуація = ~20% завдань з мови. Не нехтуй!`;
  }

  if (msg.includes('привіт') || msg.includes('hello') || msg.includes('hi') || msg.includes('вітаю')) {
    return `Привіт! 👋 Я твій ШІ-репетитор з підготовки до **НМТ 2025**!

Я можу допомогти тобі з:
• 📚 **Історія України** — події, дати, постаті
• ✍️ **Українська мова і література** — граматика, тексти
• 📐 **Математика** — алгебра, геометрія, тригонометрія
• 🌍 **Географія** — фізична та соціально-економічна

**Що хочеш вивчити сьогодні?** Задай конкретне питання або попроси мене **протестувати** тебе по якійсь темі! 💪

*Порада: Чим конкретніше питання — тим кориснішаповідь!*`;
  }

  if (msg.includes('хмельниц') || msg.includes('богдан')) {
    return `**Богдан Хмельницький** — ключова постать для НМТ! ⚔️

**Обов'язкові дати:**
• **1648** — початок Нац.-визвольної війни, битва під Жовтими Водами
• **1649** — Зборівський мир → визнання Гетьманщини (60 тис. козаків)
• **1651** — Берестецька битва (поразка через зраду Криму)
• **1654** — Переяславська рада
• **1657** — смерть Хмельницького

🤔 **Питання:** Які були умови **Зборівського миру** 1649 року? Спробуй відповісти!

⚠️ **НМТ-підказка:** Хмельниччина — **найчастіша тема** на НМТ з історії!`;
  }

  // Default response
  const responses = [
    `Цікаве питання! 🤔 Давай розберемося разом.

Перш ніж дати повну відповідь — **що ти вже знаєш** по цій темі? Напиши своє розуміння, і я підкажу де ти правий, а де варто доопрацювати.

💡 **Підказка:** Найкращий спосіб запам'ятати матеріал — спочатку спробувати відповісти самостійно, навіть якщо не впевнений.

⚠️ **НМТ-підказка:** Ця тема може зустрітися в завданнях на вибір однієї правильної відповіді або встановлення відповідності.`,

    `Гарне питання для підготовки до НМТ! 📚

**Ключові моменти по цій темі:**
• Для НМТ важливо знати не тільки "що", але і "чому" та "як"
• Звертай увагу на хронологію та причинно-наслідкові зв'язки

🤔 **Зустрічне питання:** Яким є твоє розуміння цієї теми зараз? Що тебе найбільше плутає?

Уточни своє питання і я дам максимально точну відповідь для НМТ! 💪`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

function formatMessage(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold text
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Headers
    if (line.startsWith('•') || line.startsWith('•')) {
      return <div key={i} className="ml-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
    }
    return <div key={i} dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
  });
}

export default function ChatPage() {
  const { user, isLoggedIn, chatHistory, addMessage, addPoints, setCurrentPage } = useApp();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const FREE_LIMIT = 5;
  const canSendMessage = isLoggedIn && (user?.isPro || messageCount < FREE_LIMIT);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  useEffect(() => {
    // Auto-focus on mobile
    if (window.innerWidth < 768) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Привіт${user ? `, ${user.name}` : ''}! 👋 Я твій ШІ-репетитор з НМТ. Задай будь-яке питання по **Історії України**, **Українській мові**, **Математиці** або скористайся кнопками нижче для швидкого старту! 🚀`,
        timestamp: new Date(),
      };
      addMessage(welcomeMsg);
    }
  }, []);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;
    if (!isLoggedIn) {
      setCurrentPage('login');
      return;
    }
    if (!canSendMessage) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInput('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    // Simulate AI thinking time
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    const aiResponse = generateAIResponse(messageText);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };
    addMessage(aiMsg);
    addPoints(2);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col px-4 py-4 sm:py-6">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-2xl p-5 mb-4 flex items-center justify-between flex-wrap gap-4 backdrop-blur shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-purple-500/30 animate-pulse">
              🤖
            </div>
            <div>
              <h1 className="text-white font-black text-xl sm:text-2xl bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                ШІ-Репетитор НМТ
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-green-400 text-sm font-bold">Онлайн • GPT-4 рівень</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {user && !user.isPro && (
              <div className="bg-slate-800/70 rounded-full px-3 py-1.5">
                <div className="text-slate-400 text-xs flex items-center gap-2">
                  <span>💬</span>
                  <span className="font-bold">{messageCount}/{FREE_LIMIT}</span>
                </div>
              </div>
            )}
            {user?.isPro && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-xs font-extrabold px-4 py-2 rounded-full shadow-lg shadow-yellow-500/30">
                ∞ PRO
              </span>
            )}
          </div>
        </div>

        {/* Quick prompts with better mobile scroll */}
        <div className="mb-4">
          <p className="text-slate-400 text-xs mb-3 px-1">Швидкі питання:</p>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
            {QUICK_PROMPTS.map((qp, i) => (
              <button
                key={i}
                onClick={() => sendMessage(qp.text)}
                disabled={isLoading || !canSendMessage}
                className="flex-shrink-0 bg-slate-800/80 backdrop-blur border border-slate-600 hover:border-purple-500 text-slate-300 hover:text-white text-xs sm:text-sm px-4 py-3 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages with gradient background */}
        <div className="flex-1 bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-2xl p-4 overflow-y-auto mb-4 min-h-[50vh] max-h-[60vh] space-y-4 shadow-inner">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0 shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900 font-extrabold shadow-yellow-500/30'
                  : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30'
              }`}>
                {msg.role === 'user' ? (user?.name?.charAt(0) || '?') : '🤖'}
              </div>
              <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base leading-relaxed shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                  : 'bg-slate-700/90 text-slate-100 rounded-bl-sm'
              }`}>
                <div className="space-y-2">
                  {formatMessage(msg.content)}
                </div>
                <div className={`text-xs mt-3 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString('uk', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-base shadow-lg">
                🤖
              </div>
              <div className="bg-slate-700/90 rounded-2xl rounded-bl-sm px-5 py-4">
                <div className="flex gap-1.5 items-center h-6">
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Upgrade banner for free users */}
        {isLoggedIn && !user?.isPro && messageCount >= FREE_LIMIT && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl p-5 mb-5 text-center backdrop-blur shadow-xl">
            <div className="text-4xl mb-3 animate-bounce">🔒</div>
            <p className="text-yellow-400 font-extrabold text-lg mb-2">Вичерпано безкоштовні повідомлення</p>
            <p className="text-slate-400 text-sm mb-4">Перейди на PRO — необмежений доступ за 99 грн/місяць</p>
            <button
              onClick={() => setCurrentPage('pricing')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-extrabold px-6 py-3 rounded-2xl text-sm active:scale-95 transition"
            >
              💎 Отримати PRO зараз
            </button>
          </div>
        )}

        {/* Input with better mobile touch targets */}
        <div className="flex gap-3 sm:gap-4">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder={
              !isLoggedIn
                ? 'Увійди для початку діалогу...'
                : !canSendMessage
                ? 'Оформи підписку PRO...'
                : 'Задай питання з НМТ...'
            }
            disabled={!canSendMessage || isLoading}
            className="flex-1 bg-slate-800/80 backdrop-blur border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl px-5 py-4 text-white placeholder-slate-400 text-sm sm:text-base outline-none transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading || !canSendMessage}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-2xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed font-extrabold text-lg active:scale-95 min-w-[60px] shadow-lg shadow-purple-500/30"
          >
            {isLoading ? '⏳' : '→'}
          </button>
        </div>

        {!isLoggedIn && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentPage('login')}
              className="text-yellow-400 text-sm font-bold hover:underline inline-flex items-center gap-2"
            >
              Увійди для доступу до ШІ-репетитора <span className="text-lg animate-pulse">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
