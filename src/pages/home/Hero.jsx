import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <span className="hero__eyebrow">
          <span className="name">KEO</span>
        </span>

        <h1 className="hero__title">
          نُوثّق لحظاتكم <em>بعين هادئة</em>
          <br />
          وحرفية لا تُخطئ
        </h1>

        <p className="hero__subtitle">
          من الخطوبة إلى التخرج، من الجلسات العائلية إلى المناسبات الخاصة — نصنع صوراً تبقى، بلمسة زيتية دافئة وأصيلة.
        </p>
      </div>

      <div className="hero__cta-row">
        <Link to="/booking" className="btn btn--primary">
          احجزي موعدك الآن
        </Link>

        <Link to="/works" className="btn btn--ghost">
          شاهدي أعمالنا
        </Link>
      </div>
    </div>
  );
};

export default Hero;
