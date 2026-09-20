import Hero from "./Hero";
import About from "./About";
import Why from "./Why";
import Final from "../../components/layout/Final";

const index = () => {
  return (
    <>
      <Hero />
      <Why />
      <About />
      <Final
        title="جاهزون نوثّق مناسبتكم القادمة؟"
        text="احجزوا موعدكم خلال دقيقة، ونرسل لكم التأكيد مباشرة على واتساب."
      />
    </>
  );
};

export default index;
