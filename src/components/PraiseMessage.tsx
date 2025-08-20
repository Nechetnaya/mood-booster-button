import { useEffect, useState } from "react";

interface PraiseMessageProps {
  message: string;
  isVisible: boolean;
  onAnimationComplete: () => void;
  onSkip?: () => void;
}

const PraiseMessage = ({ message, isVisible, onAnimationComplete, onSkip }: PraiseMessageProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAnimationComplete();
      }, 500); // Увеличил для плавности
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`
        text-4xl md:text-5xl font-bold text-praise-text text-center cursor-pointer
        transition-all duration-500 ease-out hover-scale
        ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}
      `}
      style={{
        textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
      }}
      onClick={onSkip}
      title="Нажмите, чтобы продолжить"
    >
      {message}
    </div>
  );
};

export default PraiseMessage;