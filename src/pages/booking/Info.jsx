import FadeAnimation from "../../components/ui/FadeAnimation";
import { Calendar, Clock, Heart } from "lucide-react";

const BOOKING_INFO_ITEMS = [
  {
    id: "time",
    icon: Clock,
    text: "سنتواصل معكم لتأكيد الموعد خلال 24 ساعة",
  },
  {
    id: "date",
    icon: Calendar,
    text: "يُفضّل الحجز قبل أسبوع على الأقل من موعد المناسبة",
  },
  {
    id: "details",
    icon: Heart,
    text: "كل التفاصيل تصلنا مباشرة، ما في داعي تتصلوا فينا يدوياً",
  },
];

const Info = () => {
  return (
    <FadeAnimation as="aside" className="booking-info">
      <h3>كيف يتم الحجز؟</h3>
      <p>بمجرد إرسال النموذج، سيُفتح واتساب تلقائياً برسالة جاهزة تحتوي كل تفاصيلكم — فقط اضغطوا إرسال.</p>

      <ul className="booking-info__list">
        {BOOKING_INFO_ITEMS.map(({ id, icon: Icon, text }) => (
          <li key={id}>
            <Icon />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      {/* <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn btn--whatsapp btn--full">
        <span className="send-whats-info">تواصل مباشر عبر واتساب</span>
      </a> */}
    </FadeAnimation>
  );
};

export default Info;
