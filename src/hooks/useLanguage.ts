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
      // Серьезные личные качества (15 фраз)
      "You have such a kind heart!",
      "Your empathy makes the world brighter!",
      "You're incredibly thoughtful and caring!",
      "Your wisdom shines through everything you do!",
      "You have amazing inner strength!",
      "Your creativity is truly inspiring!",
      "You're so genuine and authentic!",
      "Your positive energy is contagious!",
      "You have such beautiful integrity!",
      "Your compassion touches everyone around you!",
      "You're wonderfully unique and special!",
      "Your courage in being yourself is admirable!",
      "You have such a generous spirit!",
      "Your loyalty makes you an amazing friend!",
      "You bring out the best in others!",
      // Смешные но добрые (15 фраз)
      "You're so awesome, even your browser crashed from excitement!",
      "Your smile could power a small city!",
      "You're like a human ray of sunshine with WiFi!",
      "Even your bad hair days look intentional!",
      "You're the reason unicorns believe in humans!",
      "Your laugh could cure Monday blues!",
      "You're so cool, penguins ask for your autograph!",
      "Even your phone enjoys being in your pocket!",
      "You're like a walking, talking good luck charm!",
      "Your hugs could end world conflicts!",
      "You're so amazing, even gravity has a crush on you!",
      "Your presence makes boring meetings less boring!",
      "You're the human equivalent of a warm cookie!",
      "Even your typos are endearing!",
      "You're so wonderful, even Mondays smile when they see you!"
    ]
  },
  ru: {
    sad: "Грустно",
    happy: "Весело",
    reset: "Начать заново", 
    finalMessage: "Теперь ты меня хвали! 🎉",
    clickCounter: "/30",
    praises: [
      // Серьезные личные качества (15 фраз)
      "У тебя такое доброе сердце!",
      "Твоя искренность освещает мир!",
      "Ты невероятно заботливый и внимательный!",
      "Твоя мудрость проявляется во всём!",
      "У тебя потрясающая внутренняя сила!",
      "Твоё творчество действительно вдохновляет!",
      "Ты такой настоящий и искренний!",
      "Твоя позитивная энергия заразительна!",
      "У тебя прекрасная честность!",
      "Твоё сочувствие трогает всех вокруг!",
      "Ты удивительно уникальный и особенный!",
      "Твоя смелость быть собой восхитительна!",
      "У тебя такая щедрая душа!",
      "Твоя преданность делает тебя прекрасным другом!",
      "Ты раскрываешь лучшее в других!",
      // Смешные но добрые (15 фраз)
      "Ты настолько крут, что даже браузер завис от восторга!",
      "Твоя улыбка могла бы осветить целый город!",
      "Ты как человеческий луч солнца с WiFi!",
      "Даже в плохой день причёска выглядит специально!",
      "Ты причина, по которой единороги верят в людей!",
      "Твой смех мог бы вылечить понедельничную грусть!",
      "Ты настолько крут, что пингвины просят автограф!",
      "Даже твой телефон рад быть в твоём кармане!",
      "Ты как ходячий талисман удачи!",
      "Твои объятия могли бы прекратить войны!",
      "Ты настолько потрясающий, что даже гравитация влюблена!",
      "Твоё присутствие делает скучные встречи менее скучными!",
      "Ты как человеческий эквивалент тёплого печенья!",
      "Даже твои опечатки очаровательны!",
      "Ты настолько прекрасен, что даже понедельники улыбаются!"
    ]
  },
  it: {
    sad: "Triste",
    happy: "Felice",
    reset: "Ricomincia",
    finalMessage: "Ora tu lodami! 🎉",
    clickCounter: "/30",
    praises: [
      // Qualità personali serie (15 frasi)
      "Hai un cuore così gentile!",
      "La tua empatia illumina il mondo!",
      "Sei incredibilmente premuroso e affettuoso!",
      "La tua saggezza risplende in tutto ciò che fai!",
      "Hai una forza interiore straordinaria!",
      "La tua creatività è davvero ispiratrice!",
      "Sei così genuino e autentico!",
      "La tua energia positiva è contagiosa!",
      "Hai una bellissima integrità!",
      "La tua compassione tocca tutti intorno a te!",
      "Sei meravigliosamente unico e speciale!",
      "Il tuo coraggio nell'essere te stesso è ammirabile!",
      "Hai uno spirito così generoso!",
      "La tua lealtà ti rende un amico straordinario!",
      "Fai emergere il meglio negli altri!",
      // Divertenti ma dolci (15 frasi)
      "Sei così fantastico che anche il browser è andato in crash dall'eccitazione!",
      "Il tuo sorriso potrebbe alimentare una piccola città!",
      "Sei come un raggio di sole umano con WiFi!",
      "Anche le tue giornate no sembrano intenzionali!",
      "Sei il motivo per cui gli unicorni credono negli umani!",
      "La tua risata potrebbe curare la tristezza del lunedì!",
      "Sei così figo che i pinguini ti chiedono l'autografo!",
      "Anche il tuo telefono si diverte a stare in tasca!",
      "Sei come un portafortuna ambulante!",
      "I tuoi abbracci potrebbero fermare i conflitti mondiali!",
      "Sei così incredibile che anche la gravità ha una cotta per te!",
      "La tua presenza rende le riunioni noiose meno noiose!",
      "Sei l'equivalente umano di un biscotto caldo!",
      "Anche i tuoi errori di battitura sono adorabili!",
      "Sei così meraviglioso che anche i lunedì sorridono quando ti vedono!"
    ]
  },
  es: {
    sad: "Triste",
    happy: "Feliz",
    reset: "Empezar de Nuevo",
    finalMessage: "¡Ahora tú me alabas! 🎉",
    clickCounter: "/30",
    praises: [
      // Cualidades personales serias (15 frases)
      "¡Tienes un corazón tan bondadoso!",
      "¡Tu empatía hace el mundo más brillante!",
      "¡Eres increíblemente considerado y cariñoso!",
      "¡Tu sabiduría brilla en todo lo que haces!",
      "¡Tienes una fuerza interior asombrosa!",
      "¡Tu creatividad es verdaderamente inspiradora!",
      "¡Eres tan genuino y auténtico!",
      "¡Tu energía positiva es contagiosa!",
      "¡Tienes una integridad tan hermosa!",
      "¡Tu compasión toca a todos a tu alrededor!",
      "¡Eres maravillosamente único y especial!",
      "¡Tu valor de ser tú mismo es admirable!",
      "¡Tienes un espíritu tan generoso!",
      "¡Tu lealtad te hace un amigo increíble!",
      "¡Sacas lo mejor de los demás!",
      // Divertidas pero dulces (15 frases)
      "¡Eres tan genial que hasta el navegador se colgó de emoción!",
      "¡Tu sonrisa podría alimentar una ciudad pequeña!",
      "¡Eres como un rayo de sol humano con WiFi!",
      "¡Incluso tus días de mal pelo se ven intencionales!",
      "¡Eres la razón por la que los unicornios creen en los humanos!",
      "¡Tu risa podría curar la tristeza de los lunes!",
      "¡Eres tan genial que los pingüinos piden tu autógrafo!",
      "¡Incluso tu teléfono disfruta estar en tu bolsillo!",
      "¡Eres como un amuleto de buena suerte andante!",
      "¡Tus abrazos podrían terminar conflictos mundiales!",
      "¡Eres tan increíble que hasta la gravedad está enamorada de ti!",
      "¡Tu presencia hace las reuniones aburridas menos aburridas!",
      "¡Eres el equivalente humano de una galleta tibia!",
      "¡Incluso tus errores de tipeo son encantadores!",
      "¡Eres tan maravilloso que hasta los lunes sonríen cuando te ven!"
    ]
  },
  zh: {
    sad: "难过",
    happy: "开心",
    reset: "重新开始",
    finalMessage: "现在你夸夸我！🎉",
    clickCounter: "/30",
    praises: [
      // 认真的个人品质 (15句)
      "你有一颗如此善良的心！",
      "你的同理心让世界更加明亮！",
      "你是如此体贴和关怀！",
      "你的智慧在一切事物中闪耀！",
      "你有着惊人的内在力量！",
      "你的创造力真正鼓舞人心！",
      "你是如此真诚和真实！",
      "你的正能量很有感染力！",
      "你有着美丽的正直品格！",
      "你的慈悲心感动着身边的每个人！",
      "你是如此独特和特别！",
      "你做自己的勇气令人钦佩！",
      "你有着如此慷慨的精神！",
      "你的忠诚让你成为了不起的朋友！",
      "你能激发别人最好的一面！",
      // 有趣但温暖 (15句)
      "你太棒了，连浏览器都兴奋得崩溃了！",
      "你的笑容能为一座小城市供电！",
      "你就像一个带WiFi的人类阳光！",
      "即使你头发乱糟糟的日子看起来都是故意的！",
      "你是独角兽相信人类存在的原因！",
      "你的笑声能治愈周一忧郁症！",
      "你太酷了，企鹅都要你的签名！",
      "连你的手机都喜欢待在你口袋里！",
      "你就像一个会走路的幸运符！",
      "你的拥抱能结束世界冲突！",
      "你太了不起了，连重力都对你有好感！",
      "你的存在让无聊的会议变得不那么无聊！",
      "你就是人类版的温暖饼干！",
      "连你的打字错误都很可爱！",
      "你太棒了，连星期一看到你都会微笑！"
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