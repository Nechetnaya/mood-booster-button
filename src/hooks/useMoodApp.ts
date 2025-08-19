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


  const handleMoodClick = useCallback((mood: 'sad' | 'happy') => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    setCurrentMood(mood);
    
    // Generate praise based on new click count
    const praise = newClickCount >= 30 
      ? "Теперь ты меня хвали!" 
      : PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
    
    setCurrentPraise(praise);
    setShowButtons(false);
    setShowPraise(true);

    // For the final message (30th click), don't show buttons again
    if (newClickCount >= 30) {
      return;
    }

    // Hide praise after 1 second and show buttons
    setTimeout(() => {
      setShowPraise(false);
      setTimeout(() => {
        setShowButtons(true);
      }, 300); // Small delay for smooth transition
    }, 1000);
  }, [clickCount]);

  const onPraiseAnimationComplete = useCallback(() => {
    // Only show buttons again if it's not the final message
    if (clickCount < 30) {
      setShowButtons(true);
    }
  }, [clickCount]);

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
    isComplete: clickCount >= 30
  };
};