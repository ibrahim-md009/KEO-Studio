import FadeAnimation from "../../components/ui/FadeAnimation";
import { Calendar, Clock, Heart } from "lucide-react";
import { WHATSAPP_LINK } from "../../config/constans";

const Info = () => {
  return (
    <FadeAnimation as="aside" className="booking-info">
      <h3>كيف يتم الحجز؟</h3>
      <p>بمجرد إرسال النموذج، سيُفتح واتساب تلقائياً برسالة جاهزة تحتوي كل تفاصيلكم — فقط اضغطوا إرسال.</p>
      <ul className="booking-info__list">
        <li>
          <Clock />
          <span>سنتواصل معكم لتأكيد الموعد خلال 24 ساعة</span>
        </li>
        <li>
          <Calendar />
          <span>يُفضّل الحجز قبل أسبوع على الأقل من موعد المناسبة</span>
        </li>
        <li>
          <Heart />
          <span>كل التفاصيل تصلنا مباشرة، ما في داعي تتصلوا فينا يدوياً</span>
        </li>
      </ul>
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn btn--whatsapp btn--full">
        <span className="send-whats">تواصل مباشر عبر واتساب</span>
      </a>
    </FadeAnimation>
  );
};
export default Info;
