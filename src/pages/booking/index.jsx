import Form from "./Form";
import Info from "./Info";

const Booking = () => {
  return (
    <section id="page-booking">
      <div className="page-header">
        <span className="page-header__eyebrow">احجزي موعدك</span>
        <h1 className="page-header__title">لنبدأ بتوثيق لحظتكم</h1>
        <p className="page-header__text">
          عبّئي النموذج التالي، وسنستقبل التفاصيل مباشرة عبر واتساب لتأكيد موعدكم في أقرب وقت.
        </p>
      </div>

      <section className="section section--tight" style={{ paddingTop: "20px" }}>
        <div className="container booking-wrap">
          <Info />
          <Form />
        </div>
      </section>
    </section>
  );
};
export default Booking;
