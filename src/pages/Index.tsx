import { useEffect } from 'react';
import { useMoodApp } from '@/hooks/useMoodApp';
import { useLanguage } from '@/hooks/useLanguage';
import MoodButton from '@/components/MoodButton';
import PraiseMessage from '@/components/PraiseMessage';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { language, changeLanguage, t } = useLanguage();
  const {
    clickCount,
    currentMood,
    currentGradient,
    currentPraise,
    showPraise,
    showButtons,
    handleMoodClick,
    onPraiseAnimationComplete,
    resetApp,
    isComplete
  } = useMoodApp();

  // Update background gradient based on current gradient
  useEffect(() => {
    const body = document.body;
    body.style.background = currentGradient;
    
    body.style.minHeight = '100vh';
    body.style.transition = 'background 0.8s ease-in-out';
  }, [currentGradient]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Language Selector */}
      <div className="absolute top-8 left-8">
        <LanguageSelector language={language} onLanguageChange={changeLanguage} />
      </div>

      {/* Click Counter */}
      <div className="absolute top-8 right-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
          {clickCount}{t.clickCounter}
        </div>
      </div>

      {/* Reset Button (after completion) */}
      {isComplete && (
        <div className="absolute top-20 left-8">
          <button
            onClick={resetApp}
            className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold hover:bg-white/30 transition-all duration-300"
          >
            {t.reset}
          </button>
        </div>
      )}

      <div className="flex flex-col items-center space-y-12 max-w-4xl w-full">
        {/* Praise Message */}
        {showPraise && (
          <div className="min-h-[120px] flex items-center justify-center">
            <PraiseMessage
              message={currentPraise}
              isVisible={showPraise}
              onAnimationComplete={onPraiseAnimationComplete}
            />
          </div>
        )}

        {/* Mood Buttons */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-8 animate-bounce-in">
            <MoodButton
              mood="sad"
              onClick={() => handleMoodClick('sad')}
              disabled={isComplete}
              text={t.sad}
            />
            <MoodButton
              mood="happy"
              onClick={() => handleMoodClick('happy')}
              disabled={isComplete}
              text={t.happy}
            />
          </div>
        )}

        {/* Final Message - only show after 30 clicks and no praise is showing */}
        {isComplete && !showPraise && !showButtons && (
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-praise-text" style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}>
              {t.finalMessage}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;