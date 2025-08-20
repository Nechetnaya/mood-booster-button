import { useState, useCallback } from 'react';

export type Language = 'en' | 'ru' | 'it' | 'es' | 'zh';

export interface Translations {
  sad: string;
  happy: string;
  reset: string;
  finalMessage: string;
  clickCounter: string;
  praises: string[];
}

const translations: Record<Language, Translations> = {
  en: {
    sad: "Sad",
    happy: "Happy", 
    reset: "Start Over",
    finalMessage: "Now you praise me! 🎉",
    clickCounter: "/30",
    praises: [
      // Original (20%)
      "You're absolutely amazing!",
      "What a brilliant choice!",
      "You have incredible taste!",
      "That's pure genius!",
      "You're a true visionary!",
      "Outstanding decision!",
      // Funny (20%)
      "You clicked like a champion!",
      "10/10 clicking skills!",
      "NASA wants to hire you!",
      "You broke the internet!",
      "That click was legendary!",
      "You're the click master!",
      // Unexpected (10%)
      "Your grandmother would be proud!",
      "Even my calculator is impressed!",
      "Time itself stopped to applaud!"
    ]
  },
  ru: {
    sad: "Грустно",
    happy: "Весело",
    reset: "Начать заново", 
    finalMessage: "Теперь ты меня хвали! 🎉",
    clickCounter: "/30",
    praises: [
      // Оригинальные (20%)
      "Ты просто невероятен!",
      "Какой блестящий выбор!",
      "У тебя невероятный вкус!",
      "Это чистый гений!",
      "Ты настоящий провидец!",
      "Выдающееся решение!",
      // Смешные (20%)
      "Ты кликнул как чемпион!",
      "10/10 навыков клика!",
      "НАСА хочет тебя нанять!",
      "Ты сломал интернет!",
      "Этот клик был легендарным!",
      "Ты мастер клика!",
      // Неожиданные (10%)
      "Твоя бабушка была бы горда!",
      "Даже мой калькулятор впечатлён!",
      "Само время остановилось аплодировать!"
    ]
  },
  it: {
    sad: "Triste",
    happy: "Felice",
    reset: "Ricomincia",
    finalMessage: "Ora tu lodami! 🎉",
    clickCounter: "/30",
    praises: [
      // Originali (20%)
      "Sei assolutamente fantastico!",
      "Che scelta brillante!",
      "Hai un gusto incredibile!",
      "È puro genio!",
      "Sei un vero visionario!",
      "Decisione eccezionale!",
      // Divertenti (20%)
      "Hai cliccato come un campione!",
      "10/10 abilità di clic!",
      "La NASA vuole assumerti!",
      "Hai rotto internet!",
      "Quel clic era leggendario!",
      "Sei il maestro del clic!",
      // Inaspettate (10%)
      "Tua nonna sarebbe orgogliosa!",
      "Anche la mia calcolatrice è impressionata!",
      "Il tempo stesso si è fermato ad applaudire!"
    ]
  },
  es: {
    sad: "Triste",
    happy: "Feliz",
    reset: "Empezar de Nuevo",
    finalMessage: "¡Ahora tú me alabas! 🎉",
    clickCounter: "/30",
    praises: [
      // Originales (20%)
      "¡Eres absolutamente increíble!",
      "¡Qué elección brillante!",
      "¡Tienes un gusto increíble!",
      "¡Eso es puro genio!",
      "¡Eres un verdadero visionario!",
      "¡Decisión excepcional!",
      // Divertidas (20%)
      "¡Hiciste clic como un campeón!",
      "¡10/10 habilidades de clic!",
      "¡La NASA quiere contratarte!",
      "¡Rompiste el internet!",
      "¡Ese clic fue legendario!",
      "¡Eres el maestro del clic!",
      // Inesperadas (10%)
      "¡Tu abuela estaría orgullosa!",
      "¡Incluso mi calculadora está impresionada!",
      "¡El tiempo mismo se detuvo para aplaudir!"
    ]
  },
  zh: {
    sad: "难过",
    happy: "开心",
    reset: "重新开始",
    finalMessage: "现在你夸夸我！🎉",
    clickCounter: "/30",
    praises: [
      // 原创 (20%)
      "你真是太棒了！",
      "多么明智的选择！",
      "你的品味太好了！",
      "这是纯粹的天才！",
      "你是真正的远见者！",
      "杰出的决定！",
      // 搞笑 (20%)
      "你点击得像个冠军！",
      "10/10的点击技巧！",
      "NASA想雇佣你！",
      "你让网络崩溃了！",
      "那个点击太传奇了！",
      "你是点击大师！",
      // 意外 (10%)
      "你奶奶会为你骄傲的！",
      "连我的计算器都被震撼了！",
      "时间都停下来为你鼓掌！"
    ]
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
  }, []);

  return {
    language,
    changeLanguage,
    t
  };
};