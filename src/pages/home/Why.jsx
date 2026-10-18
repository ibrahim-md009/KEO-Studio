import FadeAnimation from "../../components/ui/FadeAnimation";
import { Camera } from "lucide-react";
import useCached from "../../hooks/useChached";
import { QUERIES } from "../../services/queries";
import { WHY_ICONS, DEFAULT_WHY } from "../../config/siteContent";

const { key, fetcher } = QUERIES.siteContent;

const Why = () => {
  // المحتوى جاي من الداشبورد (Firestore)، ولو مش موجود نعرض الافتراضي
  const { data } = useCached(key, fetcher);
  const why = data?.why;

  const eyebrow = why?.eyebrow ?? DEFAULT_WHY.eyebrow;
  const title = why?.title ?? DEFAULT_WHY.title;
  const text = why?.text ?? DEFAULT_WHY.text;
  const cards = Array.isArray(why?.cards) ? why.cards : DEFAULT_WHY.cards;

  return (
    <FadeAnimation as="section" className="section">
      <div className="container">
        <div className="section__head ">
          {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}

          {title && <h2 className="section__title">{title}</h2>}
          {text && <p className="section__text">{text}</p>}
        </div>

        {cards.length > 0 && (
          <div className="grid-3">
            {cards.map((item, i) => {
              const Icon = WHY_ICONS[item.icon] || Camera;
              return (
                <FadeAnimation key={i} className="icard no-copy ">
                  <div className="icard__icon">
                    <Icon />
                  </div>
                  <h3 className="icard__title">{item.title}</h3>
                  <p className="icard__text">{item.text}</p>
                </FadeAnimation>
              );
            })}
          </div>
        )}
      </div>
    </FadeAnimation>
  );
};
export default Why;
