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
      // Original (20% - 6 phrases)
      "You're absolutely amazing!",
      "What a brilliant choice!",
      "You have incredible taste!",
      "That's pure genius!",
      "You're a true visionary!",
      "Outstanding decision!",
      // Funny (20% - 6 phrases)
      "You clicked like a champion!",
      "10/10 clicking skills!",
      "NASA wants to hire you!",
      "You broke the internet!",
      "That click was legendary!",
      "You're the click master!",
      // Unexpected (10% - 3 phrases)
      "Your grandmother would be proud!",
      "Even my calculator is impressed!",
      "Time itself stopped to applaud!",
      // Additional Original (5 more)
      "Absolutely phenomenal!",
      "You're simply extraordinary!",
      "Magnificent performance!",
      "You're incredibly talented!",
      "What an inspired choice!",
      // Additional Funny (5 more)
      "You've mastered the art of clicking!",
      "The button never saw it coming!",
      "You're officially click royalty!",
      "That was button perfection!",
      "You've achieved click enlightenment!",
      // Additional Unexpected (7 more)
      "Even Einstein would be jealous!",
      "Your coffee mug is applauding!",
      "The universe just high-fived you!",
      "Your keyboard is singing!",
      "Even gravity paused in amazement!",
      "Your shadow is doing a happy dance!",
      "The pixels are cheering for you!"
    ]
  },
  ru: {
    sad: "Грустно",
    happy: "Весело",
    reset: "Начать заново", 
    finalMessage: "Теперь ты меня хвали! 🎉",
    clickCounter: "/30",
    praises: [
      // Оригинальные (20% - 6 фраз)
      "Ты просто невероятен!",
      "Какой блестящий выбор!",
      "У тебя невероятный вкус!",
      "Это чистый гений!",
      "Ты настоящий провидец!",
      "Выдающееся решение!",
      // Смешные (20% - 6 фраз)
      "Ты кликнул как чемпион!",
      "10/10 навыков клика!",
      "НАСА хочет тебя нанять!",
      "Ты сломал интернет!",
      "Этот клик был легендарным!",
      "Ты мастер клика!",
      // Неожиданные (10% - 3 фразы)
      "Твоя бабушка была бы горда!",
      "Даже мой калькулятор впечатлён!",
      "Само время остановилось аплодировать!",
      // Дополнительные оригинальные (5 фраз)
      "Абсолютно феноменально!",
      "Ты просто экстраординарен!",
      "Великолепное исполнение!",
      "У тебя невероятный талант!",
      "Какой вдохновенный выбор!",
      // Дополнительные смешные (5 фраз)
      "Ты освоил искусство клика!",
      "Кнопка этого не ожидала!",
      "Ты официально королевская особа клика!",
      "Это было кнопочное совершенство!",
      "Ты достиг просветления клика!",
      // Дополнительные неожиданные (7 фраз)
      "Даже Эйнштейн бы позавидовал!",
      "Твоя кружка аплодирует!",
      "Вселенная тебя поприветствовала!",
      "Твоя клавиатура поёт!",
      "Даже гравитация остановилась в изумлении!",
      "Твоя тень танцует от радости!",
      "Пиксели тебя поддерживают!"
    ]
  },
  it: {
    sad: "Triste",
    happy: "Felice",
    reset: "Ricomincia",
    finalMessage: "Ora tu lodami! 🎉",
    clickCounter: "/30",
    praises: [
      // Originali (20% - 6 frasi)
      "Sei assolutamente fantastico!",
      "Che scelta brillante!",
      "Hai un gusto incredibile!",
      "È puro genio!",
      "Sei un vero visionario!",
      "Decisione eccezionale!",
      // Divertenti (20% - 6 frasi)
      "Hai cliccato come un campione!",
      "10/10 abilità di clic!",
      "La NASA vuole assumerti!",
      "Hai rotto internet!",
      "Quel clic era leggendario!",
      "Sei il maestro del clic!",
      // Inaspettate (10% - 3 frasi)
      "Tua nonna sarebbe orgogliosa!",
      "Anche la mia calcolatrice è impressionata!",
      "Il tempo stesso si è fermato ad applaudire!",
      // Originali aggiuntivi (5 frasi)
      "Assolutamente fenomenale!",
      "Sei semplicemente straordinario!",
      "Performance magnifica!",
      "Hai un talento incredibile!",
      "Che scelta ispirata!",
      // Divertenti aggiuntivi (5 frasi)
      "Hai padroneggiato l'arte del clic!",
      "Il pulsante non se l'aspettava!",
      "Sei ufficialmente la regalità del clic!",
      "È stata la perfezione del pulsante!",
      "Hai raggiunto l'illuminazione del clic!",
      // Inaspettate aggiuntive (7 frasi)
      "Anche Einstein sarebbe geloso!",
      "La tua tazza da caffè sta applaudendo!",
      "L'universo ti ha dato il cinque!",
      "La tua tastiera sta cantando!",
      "Anche la gravità si è fermata stupita!",
      "La tua ombra sta ballando di gioia!",
      "I pixel ti stanno tifando!"
    ]
  },
  es: {
    sad: "Triste",
    happy: "Feliz",
    reset: "Empezar de Nuevo",
    finalMessage: "¡Ahora tú me alabas! 🎉",
    clickCounter: "/30",
    praises: [
      // Originales (20% - 6 frases)
      "¡Eres absolutamente increíble!",
      "¡Qué elección brillante!",
      "¡Tienes un gusto increíble!",
      "¡Eso es puro genio!",
      "¡Eres un verdadero visionario!",
      "¡Decisión excepcional!",
      // Divertidas (20% - 6 frases)
      "¡Hiciste clic como un campeón!",
      "¡10/10 habilidades de clic!",
      "¡La NASA quiere contratarte!",
      "¡Rompiste el internet!",
      "¡Ese clic fue legendario!",
      "¡Eres el maestro del clic!",
      // Inesperadas (10% - 3 frases)
      "¡Tu abuela estaría orgullosa!",
      "¡Incluso mi calculadora está impresionada!",
      "¡El tiempo mismo se detuvo para aplaudir!",
      // Originales adicionales (5 frases)
      "¡Absolutamente fenomenal!",
      "¡Eres simplemente extraordinario!",
      "¡Actuación magnífica!",
      "¡Tienes un talento increíble!",
      "¡Qué elección inspirada!",
      // Divertidas adicionales (5 frases)
      "¡Has dominado el arte del clic!",
      "¡El botón nunca lo vio venir!",
      "¡Eres oficialmente la realeza del clic!",
      "¡Eso fue perfección de botón!",
      "¡Has alcanzado la iluminación del clic!",
      // Inesperadas adicionales (7 frases)
      "¡Incluso Einstein estaría celoso!",
      "¡Tu taza de café está aplaudiendo!",
      "¡El universo te chocó los cinco!",
      "¡Tu teclado está cantando!",
      "¡Incluso la gravedad pausó asombrada!",
      "¡Tu sombra está haciendo un baile feliz!",
      "¡Los píxeles te están animando!"
    ]
  },
  zh: {
    sad: "难过",
    happy: "开心",
    reset: "重新开始",
    finalMessage: "现在你夸夸我！🎉",
    clickCounter: "/30",
    praises: [
      // 原创 (20% - 6句)
      "你真是太棒了！",
      "多么明智的选择！",
      "你的品味太好了！",
      "这是纯粹的天才！",
      "你是真正的远见者！",
      "杰出的决定！",
      // 搞笑 (20% - 6句)
      "你点击得像个冠军！",
      "10/10的点击技巧！",
      "NASA想雇佣你！",
      "你让网络崩溃了！",
      "那个点击太传奇了！",
      "你是点击大师！",
      // 意外 (10% - 3句)
      "你奶奶会为你骄傲的！",
      "连我的计算器都被震撼了！",
      "时间都停下来为你鼓掌！",
      // 额外原创 (5句)
      "绝对了不起！",
      "你简直超凡脱俗！",
      "精彩的表现！",
      "你有着惊人的天赋！",
      "多么有灵感的选择！",
      // 额外搞笑 (5句)
      "你掌握了点击的艺术！",
      "按钮完全没想到！",
      "你正式成为点击皇室！",
      "那是按钮的完美！",
      "你达到了点击的启蒙！",
      // 额外意外 (7句)
      "连爱因斯坦都会嫉妒！",
      "你的咖啡杯在鼓掌！",
      "宇宙和你击掌！",
      "你的键盘在唱歌！",
      "连重力都惊讶地停顿了！",
      "你的影子在快乐地跳舞！",
      "像素们在为你加油！"
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