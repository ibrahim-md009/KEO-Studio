import { useEffect, useState } from "react";
import FadeAnimation from "../../components/ui/FadeAnimation";
import Count from "../../components/Count";
import { cached, peek } from "../../services/cache";
import { QUERIES } from "../../services/queries";

const { key, fetcher } = QUERIES.statistics;

// تظهر لو الداشبورد فاضية أو حصل خطأ في الجلب
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
  // لو الـ prefetch خلّص، الأرقام جاهزة من أول رسم
  const [stats, setStats] = useState(() => {
    const c = peek(key);
    return c ? normalize(c) : null;
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

  return (
    <section className="section section--cream2">
      <div className="container about">
        <FadeAnimation className=" about__content">
          <h2 className="about__title">هويتنا زيتية، وحرفتنا أصيلة</h2>
          <p className="about__text">
            <span>
              KEO Studio مساحة تصوير هادئة، اخترنا اللون الزيتي هوية لنا لأنه يشبه فلسفتنا: دافئ، أصيل، وثابت. كل جلسة
              نصممها بعناية من الإضاءة إلى أدق التفاصيل.
            </span>
          </p>

          <p className="about__text">
            فريقنا يستمع لقصتكم أولاً، ثم يترجمها بصرياً بأسلوب هادئ بعيد عن المبالغة، ليبقى التركيز على اللحظة نفسها.
          </p>

          {stats && (
            <div className="about__stats">
              {stats.map((stat) => (
                <div key={stat.id} className="about__stat">
                  <Count target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </FadeAnimation>
      </div>
    </section>
  );
};
export default About;
