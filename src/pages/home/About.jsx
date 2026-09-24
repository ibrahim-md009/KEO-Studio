import FadeAnimation from "../../components/ui/FadeAnimation";
import Count from "../../components/Count";

const STATS_DATA = [
  { id: "sessions", value: 500, prefix: "+", suffix: "", label: "جلسة موثّقة" },
  { id: "experience", value: 8, prefix: "+", suffix: "", label: "سنوات خبرة" },
  { id: "satisfaction", value: 98, prefix: "", suffix: "٪", label: "رضا العملاء" },
];

const About = () => {
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
          <div className="about__stats">
            {STATS_DATA.map((stat) => {
              return (
                <div key={stat.id} className="about__stat">
                  <Count target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </FadeAnimation>
      </div>
    </section>
  );
};
export default About;
