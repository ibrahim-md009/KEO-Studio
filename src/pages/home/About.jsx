import { useEffect, useState } from "react";
import FadeAnimation from "../../components/ui/FadeAnimation";
import Count from "../../components/Count";
import { cached, peek } from "../../services/cache";
import { QUERIES } from "../../services/queries";
import useCached from "../../hooks/useChached";
import { DEFAULT_ABOUT } from "../../config/siteContent";

const { key, fetcher } = QUERIES.statistics;
const { key: contentKey, fetcher: contentFetcher } = QUERIES.siteContent;

// تظهر لو الكاش فاضي (أول زيارة) أو حصل خطأ في الجلب
const FALLBACK_STATS = [
  { id: "sessions", value: 500, prefix: "+", suffix: "", label: "جلسة موثّقة" },
  { id: "experience", value: 8, prefix: "+", suffix: "", label: "سنوات خبرة" },
  { id: "satisfaction", value: 98, prefix: "", suffix: "٪", label: "رضا العملاء" },
];

// من شكل الداشبورد {title, value, suffix} لشكل الـ Count
const toStat = (s) => ({
  id: s.id,
  value: Number(s.value) || 0,
  prefix: s.suffix === "+" ? "+" : "",
  suffix: s.suffix === "%" ? "٪" : "",
  label: s.title,
});

const normalize = (data) => (data?.length ? data.map(toStat) : FALLBACK_STATS);

const About = () => {
  // لو فيه نسخة متخزنة (من زيارة سابقة) بتظهر فورًا، ولو مفيش
  // نعرض أرقام افتراضية بدل ما نسيب القسم فاضي لحد ما السيرفر يرد
  const [stats, setStats] = useState(() => {
    const c = peek(key);
    return c ? normalize(c) : FALLBACK_STATS;
  });

  useEffect(() => {
    let alive = true;
    cached(key, fetcher)
      .then((data) => alive && setStats(normalize(data)))
      .catch(() => alive && setStats(FALLBACK_STATS));
    return () => {
      alive = false;
    };
  }, []);

  // نصوص "هويتنا" جاية من الداشبورد (الإحصائيات لها قسم لوحدها)
  const { data: content } = useCached(contentKey, contentFetcher);
  const about = content?.about;
  const title = about?.title ?? DEFAULT_ABOUT.title;
  const text1 = about?.text1 ?? DEFAULT_ABOUT.text1;
  const text2 = about?.text2 ?? DEFAULT_ABOUT.text2;

  return (
    <section className="section section--cream2">
      <div className="container about">
        <FadeAnimation className=" about__content">
          {title && <h2 className="about__title">{title}</h2>}
          {text1 && (
            <p className="about__text">
              <span>{text1}</span>
            </p>
          )}

          {text2 && <p className="about__text">{text2}</p>}

          <div className="about__stats">
            {stats.map((stat) => (
              <div key={stat.id} className="about__stat">
                <Count target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeAnimation>
      </div>
    </section>
  );
};
export default About;
