// import FadeAnimation from "../components/ui/FadeAnimation";

// const Booking = () => {
//   return (
//     <section id="page-booking">
//       <div className="page-header">
//         <span className="page-header__eyebrow">احجزي موعدك</span>
//         <h1 className="page-header__title">لنبدأ بتوثيق لحظتكم</h1>
//         <p className="page-header__text">
//           عبّئي النموذج التالي، وسنستقبل التفاصيل مباشرة عبر واتساب لتأكيد موعدكم في أقرب وقت.
//         </p>
//       </div>
//       {/* باددنج 20 */}
//       <section className="section section--tight" style={{ padding: "20px" }}>
//         <div className="container booking-wrap">
//           <FadeAnimation as="aside" className="booking-info">
//             <h3>كيف يتم الحجز؟</h3>
//             <p>بمجرد إرسال النموذج، سيُفتح واتساب تلقائياً برسالة جاهزة تحتوي كل تفاصيلكم — فقط اضغطوا إرسال.</p>
//             <ul className="booking-info__list">
//               <li>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                   <circle cx="12" cy="12" r="9" />
//                   <path d="M12 7v5l3 3" />
//                 </svg>
//                 <span>سنتواصل معكم لتأكيد الموعد خلال 24 ساعة</span>
//               </li>
//               <li>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                   <rect x="3" y="5" width="18" height="16" rx="2" />
//                   <path d="M8 3v4M16 3v4M3 10h18" />
//                 </svg>
//                 <span>يُفضّل الحجز قبل أسبوع على الأقل من موعد المناسبة</span>
//               </li>
//               <li>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                   <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
//                 </svg>
//                 <span>كل التفاصيل تصلنا مباشرة، ما في داعي تتصلوا فينا يدوياً</span>
//               </li>
//             </ul>
//             <a href="https://wa.me/972567574848" target="_blank" rel="noopener" className="btn btn--whatsapp btn--full">
//               <span>تواصل مباشر عبر واتساب</span>
//             </a>
//           </FadeAnimation>

//           <FadeAnimation as="form" className="booking-form " id="booking-form" noValidate>
//             <div className="form-row">
//               <label htmlFor="name">
//                 الاسم الكامل <span className="req">*</span>
//               </label>
//               <input type="text" id="name" name="name" placeholder="مثال: سارة أحمد" autoComplete="name" />
//               <p className="form-error">الرجاء إدخال الاسم</p>
//             </div>

//             <div className="form-row">
//               <label htmlFor="phone">
//                 رقم الهاتف <span className="req">*</span>
//               </label>
//               <input type="tel" id="phone" name="phone" placeholder="05xxxxxxxx" autoComplete="tel" />
//               <p className="form-error">الرجاء إدخال رقم هاتف صحيح</p>
//             </div>

//             <div className="form-row">
//               <label htmlFor="occasion">
//                 المناسبة <span className="req">*</span>
//               </label>
//               <select id="occasion" name="occasion">
//                 <option value="" selected disabled>
//                   اختر نوع المناسبة
//                 </option>
//                 <option value="engagement">خطوبة</option>
//                 <option value="wedding">زفاف</option>
//                 <option value="graduation">تخرج</option>
//                 <option value="birthday">عيد ميلاد</option>
//                 <option value="family">جلسة عائلية</option>
//                 <option value="portrait">جلسة شخصية / بورتريه</option>
//                 <option value="other">مناسبة أخرى</option>
//               </select>
//               <p className="form-error">الرجاء اختيار المناسبة</p>
//             </div>

//             <div className="form-row form-row--split">
//               <div className="form-row">
//                 <label htmlFor="date">
//                   تاريخ الموعد <span className="req">*</span>
//                 </label>
//                 <input type="date" id="date" name="date" />
//                 <p className="form-error">الرجاء اختيار التاريخ</p>
//               </div>

//               <div className="form-row">
//                 <label htmlFor="time">الوقت المفضّل</label>
//                 <input type="time" id="time" name="time" />
//               </div>
//             </div>

//             <div className="form-row">
//               <label htmlFor="notes">ملاحظات إضافية</label>
//               <textarea id="notes" name="notes" placeholder="أي تفاصيل حابين تشاركونا فيها عن الجلسة..."></textarea>
//             </div>

//             <button type="submit" className="btn btn--whatsapp btn--full">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.8-.11-.41-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.38c.26-.28.56-.35.75-.35h.53c.17 0 .4-.03.62.47.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
//               </svg>
//               <span>إرسال الحجز عبر واتساب</span>
//             </button>

//             <div className="form-status">
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M20 6L9 17l-5-5" />
//               </svg>
//               <span>تم تجهيز رسالتكم — أكملوا الإرسال من واتساب الذي فُتح الآن.</span>
//             </div>
//           </FadeAnimation>
//         </div>
//       </section>
//     </section>
//   );
// };
// export default Booking;
import { useState } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";

const WHATSAPP_NUMBER = "972567574848";

const OCCASIONS = [
  { value: "engagement", label: "خطوبة" },
  { value: "wedding", label: "زفاف" },
  { value: "graduation", label: "تخرج" },
  { value: "birthday", label: "عيد ميلاد" },
  { value: "family", label: "جلسة عائلية" },
  { value: "portrait", label: "جلسة شخصية / بورتريه" },
  { value: "other", label: "مناسبة أخرى" },
];

const todayStr = new Date().toISOString().split("T")[0];

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [showStatus, setShowStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowStatus(false);

    const newErrors = {};

    // الحقول الأساسية المطلوبة
    ["name", "phone", "occasion", "date"].forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
      }
    });

    // رقم الهاتف: لازم 9 أرقام على الأقل
    if (formData.phone.replace(/\D/g, "").length < 9) {
      newErrors.phone = true;
    }

    // التاريخ: مينفعش يكون في الماضي
    if (formData.date && formData.date < todayStr) {
      newErrors.date = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // تجهيز التاريخ بصيغة عربية
    const dateObj = formData.date ? new Date(formData.date + "T00:00:00") : null;
    const dateFormatted = dateObj
      ? dateObj.toLocaleDateString("ar-EG", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    const occasionLabel = OCCASIONS.find((o) => o.value === formData.occasion)?.label || formData.occasion;

    const lines = [
      "مرحباً KEO Studio 🫒",
      "أرغب بحجز موعد تصوير، وهذه تفاصيلي:",
      "",
      `👤 الاسم: ${formData.name.trim()}`,
      `📱 رقم الهاتف: ${formData.phone.trim()}`,
      `🎉 المناسبة: ${occasionLabel}`,
      `📅 الموعد المطلوب: ${dateFormatted}${formData.time ? " — الساعة " + formData.time : ""}`,
    ];
    if (formData.notes.trim()) {
      lines.push(`📝 ملاحظات: ${formData.notes.trim()}`);
    }

    const message = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setShowStatus(true);
    window.open(url, "_blank");
  };

  return (
    <section id="page-booking">
      <div className="page-header">
        <span className="page-header__eyebrow">احجزي موعدك</span>
        <h1 className="page-header__title">لنبدأ بتوثيق لحظتكم</h1>
        <p className="page-header__text">
          عبّئي النموذج التالي، وسنستقبل التفاصيل مباشرة عبر واتساب لتأكيد موعدكم في أقرب وقت.
        </p>
      </div>

      <section className="section section--tight" style={{ padding: "20px" }}>
        <div className="container booking-wrap">
          <FadeAnimation as="aside" className="booking-info">
            <h3>كيف يتم الحجز؟</h3>
            <p>بمجرد إرسال النموذج، سيُفتح واتساب تلقائياً برسالة جاهزة تحتوي كل تفاصيلكم — فقط اضغطوا إرسال.</p>
            <ul className="booking-info__list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>سنتواصل معكم لتأكيد الموعد خلال 24 ساعة</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
                <span>يُفضّل الحجز قبل أسبوع على الأقل من موعد المناسبة</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
                </svg>
                <span>كل التفاصيل تصلنا مباشرة، ما في داعي تتصلوا فينا يدوياً</span>
              </li>
            </ul>
            <a href="https://wa.me/972567574848" target="_blank" rel="noopener" className="btn btn--whatsapp btn--full">
              <span className="send-whats">تواصل مباشر عبر واتساب</span>
            </a>
          </FadeAnimation>

          <FadeAnimation as="form" className="booking-form" id="booking-form" noValidate onSubmit={handleSubmit}>
            <div className={`form-row ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="name">
                الاسم الكامل <span className="req">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="مثال: سارة أحمد"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
              <p className="form-error">الرجاء إدخال الاسم</p>
            </div>

            <div className={`form-row ${errors.phone ? "has-error" : ""}`}>
              <label htmlFor="phone">
                رقم الهاتف <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="05xxxxxxxx"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="form-error">الرجاء إدخال رقم هاتف صحيح</p>
            </div>

            <div className={`form-row ${errors.occasion ? "has-error" : ""}`}>
              <label htmlFor="occasion">
                المناسبة <span className="req">*</span>
              </label>
              <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                <option value="" disabled>
                  اختر نوع المناسبة
                </option>
                {OCCASIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p className="form-error">الرجاء اختيار المناسبة</p>
            </div>

            <div className="form-row form-row--split">
              <div className={`form-row ${errors.date ? "has-error" : ""}`}>
                <label htmlFor="date">
                  تاريخ الموعد <span className="req">*</span>
                </label>
                <input type="date" id="date" name="date" min={todayStr} value={formData.date} onChange={handleChange} />
                <p className="form-error">الرجاء اختيار التاريخ</p>
              </div>

              <div className="form-row">
                <label htmlFor="time">الوقت المفضّل</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="notes">ملاحظات إضافية</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="أي تفاصيل حابين تشاركونا فيها عن الجلسة..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn--whatsapp btn--full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.8-.11-.41-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.38c.26-.28.56-.35.75-.35h.53c.17 0 .4-.03.62.47.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
              </svg>
              <span className="send-whats">إرسال الحجز عبر واتساب</span>
            </button>

            <div className={`form-status ${showStatus ? "is-visible" : ""}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>تم تجهيز رسالتكم — أكملوا الإرسال من واتساب الذي فُتح الآن.</span>
            </div>
          </FadeAnimation>
        </div>
      </section>
    </section>
  );
};
export default Booking;
