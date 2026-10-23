import Hero from "./Hero";
import IntroVideo from "./IntroVideo";
import About from "./About";
import Why from "./Why";
import FeaturedWorks from "./FeaturedWorks";
import Final from "../../components/layout/Final";

const index = () => {
  return (
    <>
      {/* على الديسكتوب: النص يمين والفيديو التعريفي يسار داخل نفس الهيرو (CSS)، وعلى الموبايل زي ما كانوا تحت بعض */}
      <div className="home-top">
        <Hero />
        <IntroVideo />
      </div>
      <Why />
      <FeaturedWorks />
      <About />
      <Final
        title="جاهزون نوثّق مناسبتكم القادمة؟"
        text="احجزوا موعدكم خلال دقيقة، ونرسل لكم التأكيد مباشرة على واتساب."
      />
    </>
  );
};

export default index;
