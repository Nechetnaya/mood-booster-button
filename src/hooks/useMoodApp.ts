import { useState, useCallback } from 'react';
import { useLanguage } from './useLanguage';

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
  const { t, language } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const [currentMood, setCurrentMood] = useState<MoodType>('default');
  const [currentGradient, setCurrentGradient] = useState(GRADIENTS.default[0]);
  const [currentPraise, setCurrentPraise] = useState('');
  const [showPraise, setShowPraise] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [usedPraises, setUsedPraises] = useState<Set<string>>(new Set());

  // Сбрасываем использованные похвалы при смене языка
  const [currentLanguage, setCurrentLanguage] = useState(language);
  if (currentLanguage !== language) {
    setUsedPraises(new Set());
    setCurrentLanguage(language);
  }

  const getRandomGradient = useCallback((mood: MoodType) => {
    const gradients = GRADIENTS[mood];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, []);

  const getRandomUnusedPraise = useCallback(() => {
    // Получаем неиспользованные похвалы для текущего языка
    const currentPraises = t.praises;
    const availablePraises = currentPraises.filter(praise => !usedPraises.has(praise));
    
    // Если все использованы, сбрасываем счетчик для нового языка
    if (availablePraises.length === 0) {
      setUsedPraises(new Set());
      return currentPraises[Math.floor(Math.random() * currentPraises.length)];
    }
    
    return availablePraises[Math.floor(Math.random() * availablePraises.length)];
  }, [usedPraises, t.praises]);

  const handleMoodClick = useCallback((mood: 'sad' | 'happy') => {
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
    isComplete: clickCount >= 30,
    t
  };
};