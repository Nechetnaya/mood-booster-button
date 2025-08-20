import { cn } from "@/lib/utils";

interface MoodButtonProps {
  mood: 'sad' | 'happy';
  onClick: () => void;
  disabled?: boolean;
  text: string;
}

const MoodButton = ({ mood, onClick, disabled = false, text }: MoodButtonProps) => {
  const isSad = mood === 'sad';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-12 py-6 text-2xl font-bold rounded-2xl transition-all duration-300",
        "transform hover:scale-105 active:scale-95",
        "shadow-button hover:shadow-lg",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        isSad 
          ? "bg-button-sad text-button-sad-foreground hover:brightness-110" 
          : "bg-button-happy text-button-happy-foreground hover:brightness-110"
      )}
    >
      {text}
    </button>
  );
};

export default MoodButton;