import { useState, useCallback } from 'react';

// Категории похвал по требованию пользователя
const ORIGINAL_PRAISES = [
  "Ты самый лучший!",
  "Ты сегодня молодец!",
  "Ты заслужил пирожное!",
  "Отдохни!",
  "Ты такой замечательный!",
  "Ты красавчик!",
  "Продолжай в том же духе!",
  "Ты справился!",
  "Ты молодец!",
  "Ты вдохновляешь!",
  "Ты умница!",
  "Ты потрясающий!",
  "Ты сияешь!",
  "Ты сделал шаг вперёд!",
  "Ты крут!",
  "Ты талантлив!",
  "Ты великолепен!",
  "Ты заслуживаешь награду!",
  "Ты невероятен!",
  "Ты сияешь как солнце!"
];

const FUNNY_PRAISES = [
  "Ты круче чем кот в сапогах!",
  "Даже пингвины завидуют твоей крутости!",
  "Ты как WiFi - без тебя жизнь не та!",
  "Твоя улыбка ярче, чем экран телефона!",
  "Ты настолько крут, что единороги просят автограф!",
  "Даже будильник не хочет тебя будить!",
  "Ты как пицца - всегда к месту!",
  "Твоя энергия заряжает телефоны!",
  "Ты круче, чем селфи с котиком!",
  "Даже радуга учится у тебя быть яркой!",
  "Ты как мем - поднимаешь настроение!",
  "Твоя крутость зашкаливает больше интернета!",
  "Ты как хороший Wi-Fi - всегда на связи!",
  "Даже смайлики берут с тебя пример!",
  "Ты круче чем тёплые носки зимой!",
  "Твоя позитивность заразительнее зевоты!",
  "Ты как любимая песня - всегда в тему!",
  "Даже грустные мемы от тебя улыбаются!",
  "Ты настолько классный, что хочется лайкнуть!",
  "Твоя аура круче, чем новый айфон!"
];

const UNEXPECTED_PRAISES = [
  "Квантовая физика тебе завидует!",
  "Твоя душа написана каллиграфией вселенной!",
  "Ты - секретный ингредиент счастья!",
  "Даже время замедляется, чтобы полюбоваться тобой!",
  "Ты говоришь на языке сердец!",
  "Твоя аура перезаписывает код матрицы!",
  "Ты - живое доказательство магии!",
  "Звёзды шепчут твоё имя!",
  "Ты алхимик хорошего настроения!",
  "Твоя энергия переписывает законы физики!",
  "Ты - секретное оружие против грусти!",
  "Даже гравитация тянется к твоей крутости!"
];

// Объединяем все похвалы с пометками категорий
const ALL_PRAISES = [
  ...ORIGINAL_PRAISES,
  ...FUNNY_PRAISES, 
  ...UNEXPECTED_PRAISES
];

// Градиенты для каждого настроения
const GRADIENTS = {
  default: [
    'var(--gradient-1)', 'var(--gradient-2)', 'var(--gradient-3)', 
    'var(--gradient-4)', 'var(--gradient-5)', 'var(--gradient-6)',
    'var(--gradient-7)', 'var(--gradient-8)', 'var(--gradient-9)', 'var(--gradient-10)'
  ],
  sad: [
    'var(--gradient-sad-1)', 'var(--gradient-sad-2)', 'var(--gradient-sad-3)'
  ],
  happy: [
    'var(--gradient-happy-1)', 'var(--gradient-happy-2)', 'var(--gradient-happy-3)'
  ]
};

type MoodType = 'default' | 'sad' | 'happy';

export const useMoodApp = () => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMood, setCurrentMood] = useState<MoodType>('default');
  const [currentGradient, setCurrentGradient] = useState(GRADIENTS.default[0]);
  const [currentPraise, setCurrentPraise] = useState('');
  const [showPraise, setShowPraise] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [usedPraises, setUsedPraises] = useState<Set<string>>(new Set());

  const getRandomGradient = useCallback((mood: MoodType) => {
    const gradients = GRADIENTS[mood];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, []);

  const getRandomUnusedPraise = useCallback(() => {
    // Получаем неиспользованные похвалы
    const availablePraises = ALL_PRAISES.filter(praise => !usedPraises.has(praise));
    
    // Если все использованы, сбрасываем
    if (availablePraises.length === 0) {
      setUsedPraises(new Set());
      return ALL_PRAISES[Math.floor(Math.random() * ALL_PRAISES.length)];
    }
    
    return availablePraises[Math.floor(Math.random() * availablePraises.length)];
  }, [usedPraises]);

  const handleMoodClick = useCallback((mood: 'sad' | 'happy') => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    setCurrentMood(mood);
    
    // Выбираем случайный градиент для настроения
    setCurrentGradient(getRandomGradient(mood));
    
    // Генерируем похвалу
    let praise: string;
    if (newClickCount >= 30) {
      praise = "Теперь ты меня хвали!";
    } else {
      praise = getRandomUnusedPraise();
      setUsedPraises(prev => new Set(prev).add(praise));
    }
    
    setCurrentPraise(praise);
    setShowButtons(false);
    setShowPraise(true);

    // Для финального сообщения (30-е нажатие) не показываем кнопки
    if (newClickCount >= 30) {
      return;
    }

    // Скрываем похвалу через 2 секунды и показываем кнопки
    setTimeout(() => {
      setShowPraise(false);
      setTimeout(() => {
        setShowButtons(true);
      }, 300);
    }, 2000);
  }, [clickCount, getRandomGradient, getRandomUnusedPraise]);

  const onPraiseAnimationComplete = useCallback(() => {
    if (clickCount < 30) {
      setShowButtons(true);
    }
  }, [clickCount]);

  const resetApp = useCallback(() => {
    setClickCount(0);
    setCurrentMood('default');
    setCurrentGradient(GRADIENTS.default[0]);
    setCurrentPraise('');
    setShowPraise(false);
    setShowButtons(true);
    setUsedPraises(new Set());
  }, []);

  return {
    clickCount,
    currentMood,
    currentGradient,
    currentPraise,
    showPraise,
    showButtons,
    handleMoodClick,
    onPraiseAnimationComplete,
    resetApp,
    isComplete: clickCount >= 30
  };
};