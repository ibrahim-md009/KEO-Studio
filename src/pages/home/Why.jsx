import FadeAnimation from "../../components/ui/FadeAnimation";

const Why = () => {
  return (
    <FadeAnimation as="section" className="section">
      <div className="container">
        <div className="section__head ">
          <span className="section__eyebrow">
            <span>ليه</span> KEO
          </span>
          <h2 className="section__title">تجربة تصوير هادئة، بنتيجة تبقى</h2>
          <p className="section__text">نتعامل مع كل جلسة كقصة قائمة بذاتها، بإضاءة وتفاصيل تُحاكي طابعكم الخاص.</p>
        </div>

        <div className="grid-3">
          <FadeAnimation className="icard ">
            <div className="icard__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M8 7l1.5-3h5L16 7" />
                <circle cx="12" cy="14" r="4" />
              </svg>
            </div>
            <h3 className="icard__title">عين احترافية</h3>
            <p className="icard__text">فريق مصورين مدرّب على التقاط اللحظة الحقيقية، بعيداً عن الوضعيات المصطنعة.</p>
          </FadeAnimation>
          <FadeAnimation className="icard ">
            <div className="icard__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
              </svg>
            </div>
            <h3 className="icard__title">إضاءة مدروسة</h3>
            <p className="icard__text">استديو مجهّز بإضاءة احترافية قابلة للتعديل حسب طبيعة كل جلسة ومزاجها.</p>
          </FadeAnimation>
          <FadeAnimation className="icard ">
            <div className="icard__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
              </svg>
            </div>
            <h3 className="icard__title">اهتمام بالتفاصيل</h3>
            <p className="icard__text">من التنسيق قبل الجلسة إلى التسليم، نتابع كل خطوة بعناية شخصية.</p>
          </FadeAnimation>
        </div>
      </div>
    </FadeAnimation>
  );
};
export default Why;
