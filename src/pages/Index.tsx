import { useEffect } from 'react';
import { useMoodApp } from '@/hooks/useMoodApp';
import MoodButton from '@/components/MoodButton';
import PraiseMessage from '@/components/PraiseMessage';

const Index = () => {
  const {
    clickCount,
    currentMood,
    currentPraise,
    showPraise,
    showButtons,
    handleMoodClick,
    onPraiseAnimationComplete,
    resetApp,
    isComplete
  } = useMoodApp();

  // Update background gradient based on mood
  useEffect(() => {
    const body = document.body;
    body.className = ''; // Clear existing classes
    
    switch (currentMood) {
      case 'sad':
        body.style.background = 'var(--gradient-sad)';
        break;
      case 'happy':
        body.style.background = 'var(--gradient-happy)';
        break;
      default:
        body.style.background = 'var(--gradient-default)';
    }
    
    body.style.minHeight = '100vh';
    body.style.transition = 'background 0.8s ease-in-out';
  }, [currentMood]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Click Counter */}
      <div className="absolute top-8 right-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
          {clickCount}/100
        </div>
      </div>

      {/* Reset Button (after completion) */}
      {isComplete && (
        <div className="absolute top-8 left-8">
          <button
            onClick={resetApp}
            className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold hover:bg-white/30 transition-all duration-300"
          >
            Начать заново
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
            />
            <MoodButton
              mood="happy"
              onClick={() => handleMoodClick('happy')}
              disabled={isComplete}
            />
          </div>
        )}

        {/* Completion Message */}
        {isComplete && !showPraise && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-praise-text mb-4" style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}>
              Поздравляем! 🎉
            </h2>
            <p className="text-xl text-white/90" style={{ textShadow: '0 1px 10px rgba(0, 0, 0, 0.3)' }}>
              Вы достигли 100 нажатий!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;