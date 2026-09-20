import FadeAnimation from "../../components/ui/FadeAnimation";

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
            <div className="about__stat">
              <b>+500</b>
              <span>جلسة موثّقة</span>
            </div>
            <div className="about__stat">
              <b>+8</b>
              <span>سنوات خبرة</span>
            </div>
            <div className="about__stat">
              <b>98٪</b>
              <span>رضا العملاء</span>
            </div>
          </div>
        </FadeAnimation>
      </div>
    </section>
  );
};
export default About;
