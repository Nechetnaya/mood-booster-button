import { useState, useCallback } from 'react';

const PRAISE_MESSAGES = [
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
  "Ты сияешь как солнце!",
  "Ты классный!",
  "Ты волшебный!",
  "Ты герой!",
  "Ты лучший друг!",
  "Ты чудо!",
  "Ты удивительный!",
  "Ты сияешь сегодня!",
  "Ты великолепен во всём!",
  "Ты супер!",
  "Ты звезда!",
  "Ты приносишь радость!",
  "Ты делаешь мир лучше!"
];

type MoodType = 'default' | 'sad' | 'happy';

export const useMoodApp = () => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMood, setCurrentMood] = useState<MoodType>('default');
  const [currentPraise, setCurrentPraise] = useState('');
  const [showPraise, setShowPraise] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const getRandomPraise = useCallback(() => {
    if (clickCount >= 99) {
      return "Теперь ты меня хвали";
    }
    return PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
  }, [clickCount]);

  const handleMoodClick = useCallback((mood: 'sad' | 'happy') => {
    setCurrentMood(mood);
    setCurrentPraise(getRandomPraise());
    setShowButtons(false);
    setShowPraise(true);
    setClickCount(prev => prev + 1);

    // Auto hide praise and show buttons again after 3 seconds
    setTimeout(() => {
      setShowPraise(false);
    }, 3000);
  }, [getRandomPraise]);

  const onPraiseAnimationComplete = useCallback(() => {
    setShowButtons(true);
  }, []);

  const resetApp = useCallback(() => {
    setClickCount(0);
    setCurrentMood('default');
    setCurrentPraise('');
    setShowPraise(false);
    setShowButtons(true);
  }, []);

  return {
    clickCount,
    currentMood,
    currentPraise,
    showPraise,
    showButtons,
    handleMoodClick,
    onPraiseAnimationComplete,
    resetApp,
    isComplete: clickCount >= 100
  };
};