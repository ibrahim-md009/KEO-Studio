import FadeAnimation from "../ui/FadeAnimation";
import { Link } from "react-router-dom";

const Final = ({ title, text }) => {
  return (
    <section className="cta-final">
      <div className="container">
        <FadeAnimation as="h2" className="section__title ">
          {title}
        </FadeAnimation>

        <FadeAnimation as="p" opacity="0.75" className="section__text ">
          {text}
        </FadeAnimation>

        <FadeAnimation className="cta-final__row ">
          <Link to="/booking" className="btn btn--primary">
            احجزي موعدك الآن
          </Link>
        </FadeAnimation>
      </div>
    </section>
  );
};
export default Final;
