import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/hooks/useLanguage";

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: '🇺🇸 English', flag: '🇺🇸' },
  { code: 'ru' as Language, name: '🇷🇺 Русский', flag: '🇷🇺' },
  { code: 'it' as Language, name: '🇮🇹 Italiano', flag: '🇮🇹' },
  { code: 'es' as Language, name: '🇪🇸 Español', flag: '🇪🇸' },
  { code: 'zh' as Language, name: '🇨🇳 中文', flag: '🇨🇳' },
];

const LanguageSelector = ({ language, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <Select value={language} onValueChange={(value: Language) => onLanguageChange(value)}>
      <SelectTrigger className="w-[140px] bg-white/20 backdrop-blur-sm border-white/30 text-white">
        <SelectValue>
          {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name.split(' ')[1]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30">
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="text-gray-800 hover:bg-gray-100"
          >
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;