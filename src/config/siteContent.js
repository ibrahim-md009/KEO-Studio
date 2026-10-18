import {
  Camera,
  Sun,
  Heart,
  Star,
  Sparkles,
  Aperture,
  Image,
  Clock,
  Award,
  Users,
  ShieldCheck,
  Palette,
  Smile,
  Gem,
  Zap,
  MapPin,
  Video,
  Lightbulb,
  ThumbsUp,
  CircleCheck,
} from "lucide-react";

// الأيقونات المتاحة لكروت "ليه كيو" — المفتاح هو اللي بيتخزن في Firestore
// ولازم نفس المفاتيح تكون في الداشبورد (js/siteContentUI.js → WHY_ICONS)
export const WHY_ICONS = {
  camera: Camera,
  sun: Sun,
  heart: Heart,
  star: Star,
  sparkles: Sparkles,
  aperture: Aperture,
  image: Image,
  clock: Clock,
  award: Award,
  users: Users,
  shield: ShieldCheck,
  palette: Palette,
  smile: Smile,
  gem: Gem,
  zap: Zap,
  pin: MapPin,
  video: Video,
  bulb: Lightbulb,
  thumbs: ThumbsUp,
  check: CircleCheck,
};

// النصوص الافتراضية: تظهر لو مفيش بيانات في Firestore أو حصل خطأ في الجلب
export const DEFAULT_WHY = {
  eyebrow: "ليه كيو",
  title: "تجربة تصوير هادئة، بنتيجة تبقى",
  text: "نتعامل مع كل جلسة كقصة قائمة بذاتها، بإضاءة وتفاصيل تُحاكي طابعكم الخاص.",
  cards: [
    {
      icon: "camera",
      title: "عين احترافية",
      text: "فريق مصورين مدرّب على التقاط اللحظة الحقيقية، بعيداً عن الوضعيات المصطنعة.",
    },
    {
      icon: "sun",
      title: "إضاءة مدروسة",
      text: "استديو مجهّز بإضاءة احترافية قابلة للتعديل حسب طبيعة كل جلسة ومزاجها.",
    },
    {
      icon: "heart",
      title: "اهتمام بالتفاصيل",
      text: "من التنسيق قبل الجلسة إلى التسليم، نتابع كل خطوة بعناية شخصية.",
    },
  ],
};

export const DEFAULT_ABOUT = {
  title: "هويتنا زيتية، وحرفتنا أصيلة",
  text1:
    "KEO Studio مساحة تصوير هادئة، اخترنا اللون الزيتي هوية لنا لأنه يشبه فلسفتنا: دافئ، أصيل، وثابت. كل جلسة نصممها بعناية من الإضاءة إلى أدق التفاصيل.",
  text2: "فريقنا يستمع لقصتكم أولاً، ثم يترجمها بصرياً بأسلوب هادئ بعيد عن المبالغة، ليبقى التركيز على اللحظة نفسها.",
};
