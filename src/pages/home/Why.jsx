import FadeAnimation from "../../components/ui/FadeAnimation";
import { Camera, Sun, Heart } from "lucide-react";

const whyItems = [
  {
    Icon: Camera,
    h3: "عين احترافية",
    p: "فريق مصورين مدرّب على التقاط اللحظة الحقيقية، بعيداً عن الوضعيات المصطنعة.",
  },
  {
    Icon: Sun,
    h3: "إضاءة مدروسة",
    p: "استديو مجهّز بإضاءة احترافية قابلة للتعديل حسب طبيعة كل جلسة ومزاجها.",
  },
  {
    Icon: Heart,
    h3: "اهتمام بالتفاصيل",
    p: "من التنسيق قبل الجلسة إلى التسليم، نتابع كل خطوة بعناية شخصية.",
  },
];
const Why = () => {
  return (
    <FadeAnimation as="section" className="section">
      <div className="container">
        <div className="section__head ">
          <span className="section__eyebrow">
            <span>ليه</span> KEO
          </span>

          <h2 className="section__title">تجربة تصوير هادئة، بنتيجة تبقى</h2>
          <p className="section__text">نتعامل مع كل جلسة كقصة قائمة بذاتها، بإضاءة وتفاصيل تُحاكي طابعكم الخاص.</p>
        </div>

        <div className="grid-3">
          {whyItems.map((item, i) => {
            return (
              <FadeAnimation key={i} className="icard ">
                <div className="icard__icon">
                  <item.Icon />
                </div>
                <h3 className="icard__title">{item.h3}</h3>
                <p className="icard__text">{item.p}</p>
              </FadeAnimation>
            );
          })}
        </div>
      </div>
    </FadeAnimation>
  );
};
export default Why;
