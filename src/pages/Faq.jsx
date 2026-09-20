import { useState } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";

const faqData = [
  {
    question: "هل يمكن التصوير خارج الاستديو؟",
    answer: "نعم، نوفر جلسات خارجية وتغطية مناسبات حسب المكان والوقت المطلوب.",
  },
  {
    question: "كم يستغرق تسليم الصور؟",
    answer: "المدة تختلف حسب نوع الجلسة والباقـة، ونحددها لكم بوضوح عند تأكيد الحجز.",
  },
  {
    question: "هل يمكن تعديل الباقة؟",
    answer: "أكيد. الباقات الموجودة هي نقطة بداية، ونقدر نضيف ساعات أو صور أو خدمات إضافية حسب احتياجكم.",
  },
  {
    question: "كيف يتم تأكيد الموعد؟",
    answer: "بعد إرسال الطلب عبر واتساب، نتواصل معكم لتأكيد الموعد والتفاصيل النهائية.",
  },
  {
    question: "هل أحتاج خبرة بالتصوير أو الوقوف أمام الكاميرا؟",
    answer: "أبدًا. التوجيه جزء من التجربة، ونساعدكم على الحركة والوقفة بطريقة طبيعية.",
  },
  {
    question: "هل الصور الموجودة بالموقع هي صور KEO الحقيقية؟",
    answer:
      "النسخة الحالية تستخدم صورًا مرجعية من الإنترنت لعرض التصميم فقط. قبل الإطلاق يجب استبدالها بأعمالكم الحقيقية.",
  },
];

const Faq = () => {
  const [isActive, setIsActive] = useState(null);
  const toggleFaq = (index) => {
    setIsActive((prev) => (prev === index ? null : index));
  };

  return (
    <section id="page-faq">
      <div className="page-header">
        <span className="page-header__eyebrow">FAQ</span>
        <h1 className="page-header__title">الأسئلة الشائعة</h1>
        <p className="page-header__text">كل ما تحتاجون معرفته قبل الحجز.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqData.map((item, index) => (
              <FadeAnimation key={index} className={`faq-item ${isActive === index ? "is-open" : ""}`}>
                <button className="faq-q" type="button" onClick={() => toggleFaq(index)}>
                  <span>{item.question}</span>
                  <span>+</span>
                </button>
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              </FadeAnimation>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Faq;
