import { useState, useCallback, useEffect } from 'react';
import { Language, Translations } from './useLanguage';

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

export const useMoodApp = (t: Translations, language: Language) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMood, setCurrentMood] = useState<MoodType>('default');
  const [currentGradient, setCurrentGradient] = useState(GRADIENTS.default[0]);
  const [currentPraise, setCurrentPraise] = useState('');
  const [showPraise, setShowPraise] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [usedPraises, setUsedPraises] = useState<Set<string>>(new Set());
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  
  // Сбрасываем использованные похвалы при смене языка
  useEffect(() => {
    console.log('Language changed to:', language);
    setUsedPraises(new Set());
  }, [language]);

  const getRandomGradient = useCallback((mood: MoodType) => {
    const gradients = GRADIENTS[mood];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, []);

  const getRandomUnusedPraise = useCallback(() => {
    // Получаем неиспользованные похвалы для текущего языка
    const currentPraises = t.praises;
    console.log('Current language:', language, 'Praises:', currentPraises.slice(0, 3));
    const availablePraises = currentPraises.filter(praise => !usedPraises.has(praise));
    
    // Если все использованы, сбрасываем счетчик для нового языка
    if (availablePraises.length === 0) {
      setUsedPraises(new Set());
      return currentPraises[Math.floor(Math.random() * currentPraises.length)];
    }
    
    return availablePraises[Math.floor(Math.random() * availablePraises.length)];
  }, [usedPraises, t.praises, language]);

  const handleMoodClick = useCallback((mood: 'sad' | 'happy') => {
    // Очищаем предыдущий таймер, если он существует
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    setCurrentMood(mood);
    
    // Выбираем случайный градиент для настроения
    setCurrentGradient(getRandomGradient(mood));
    
    // Генерируем похвалу
    let praise: string;
    if (newClickCount >= 30) {
      praise = t.finalMessage;
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

    // Автоматически скрываем похвалу через 2 секунды
    const timer = setTimeout(() => {
      setShowPraise(false);
      setTimeout(() => {
        setShowButtons(true);
      }, 500); // Увеличил время для плавности
      setAutoHideTimer(null);
    }, 2000);
    setAutoHideTimer(timer);
  }, [clickCount, getRandomGradient, getRandomUnusedPraise, t.finalMessage, autoHideTimer]);

  const handleSkipPraise = useCallback(() => {
    // Очищаем автоматический таймер
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }

    if (clickCount < 30) {
      setShowPraise(false);
      setTimeout(() => {
        setShowButtons(true);
      }, 500); // Увеличил время для плавности
    }
  }, [clickCount, autoHideTimer]);

  const onPraiseAnimationComplete = useCallback(() => {
    if (clickCount < 30) {
      setShowButtons(true);
    }
  }, [clickCount]);

  const resetApp = useCallback(() => {
    // Очищаем таймер при сбросе
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      setAutoHideTimer(null);
    }
    
    setClickCount(0);
    setCurrentMood('default');
    setCurrentGradient(GRADIENTS.default[0]);
    setCurrentPraise('');
    setShowPraise(false);
    setShowButtons(true);
    setUsedPraises(new Set());
  }, [autoHideTimer]);

  return {
    clickCount,
    currentMood,
    currentGradient,
    currentPraise,
    showPraise,
    showButtons,
    handleMoodClick,
    onPraiseAnimationComplete,
    handleSkipPraise,
    resetApp,
    isComplete: clickCount >= 30
  };
};