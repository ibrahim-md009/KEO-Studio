import { useState, useEffect, useRef } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";
import useCached from "../hooks/useChached";
import { QUERIES } from "../services/queries";
import { Link } from "react-router-dom";

const Works = () => {
  const { data, loading } = useCached(QUERIES.works.key, QUERIES.works.fetcher);
  const [galleryItems, categories] = data ?? [[], []];

  // التصنيف النشط: اللي اختاره المستخدم، أو أول تصنيف افتراضياً (بدون effect)
  const [selectedTab, setSelectedTab] = useState(null);
  const activeTab = selectedTab ?? categories[0]?.id ?? null;

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const filteredItems = galleryItems.filter((i) => i.category === activeTab);
  const itemRefs = useRef([]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const isOpen = lightboxIndex !== null;

  // قفل سكرول الصفحة + Escape، ثم النزول مباشرة للصورة اللي ضغط عليها المستخدم
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    itemRefs.current[lightboxIndex]?.scrollIntoView({ block: "start", behavior: "instant" });
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <section>
      <div className="page-header">
        <span className="page-header__eyebrow">معرض الأعمال</span>
        <h1 className="page-header__title">لحظات وثّقناها بعناية</h1>
        <p className="page-header__text">
          اضغطي على أي صورة لتصفّحي كل الصور بالتمرير للأسفل، أو اختاري تصنيفاً آخر بأي وقت.
        </p>
      </div>

      <section className="section section--tight">
        <div className="container">
          {loading ? (
            <p className="empty-msg">جاري تحميل الأعمال...</p>
          ) : (
            <>
              <FadeAnimation className="filter-bar" id="filter-bar">
                {categories.map((item) => (
                  <button
                    className={`filter-btn ${activeTab === item.id ? "is-active" : ""}`}
                    key={item.id}
                    onClick={() => setSelectedTab(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </FadeAnimation>
              <p className="filter-hint" id="filter-hint">
                اختاري تصنيفاً من فوق لعرض صوره
              </p>
              <FadeAnimation key={activeTab} once={false} className="gallery-grid" id="gallery-grid" aria-live="polite">
                {filteredItems.map((item, index) => (
                  <article
                    className="gallery-card"
                    key={item.id ?? index}
                    tabIndex={0}
                    role="button"
                    aria-label={`فتح ${item.title}`}
                    onClick={() => openLightbox(index)}
                  >
                    <img src={item.img} alt={item.title} loading="lazy" />
                    <span className="gallery-card__index">
                      {index + 1}/{filteredItems.length}
                    </span>
                    <div className="gallery-card__info">
                      <b>{item.title}</b>
                      <span>{item.sub}</span>
                    </div>
                  </article>
                ))}
              </FadeAnimation>
            </>
          )}
        </div>
      </section>

      {isOpen && (
        <div className="lightbox lightbox--scroll is-active" aria-hidden="false">
          <button className="lightbox__close" id="lightbox-close" onClick={closeLightbox} aria-label="إغلاق">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="lightbox__scroll-viewport">
            <div className="lightbox__scroll-list">
              {filteredItems.map((item, i) => (
                <figure
                  className="lightbox__scroll-item"
                  key={item.id ?? i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                >
                  <img src={item.img} alt={item.title} loading={i <= lightboxIndex ? "eager" : "lazy"} />
                  {item.title && <figcaption className="lightbox__caption">{item.title}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="cta-final">
        <div className="container">
          <FadeAnimation className="section__title ">أعجبتكم أعمالنا؟</FadeAnimation>
          <FadeAnimation className="section__text ">احجزوا جلستكم الآن ولنصنع سوياً لحظة تستحق التوثيق.</FadeAnimation>
          <FadeAnimation className="cta-final__row ">
            <Link to="/booking" data-page="booking" className="btn btn--primary">
              احجزي موعدك الآن
            </Link>
          </FadeAnimation>
        </div>
      </section>
    </section>
  );
};
export default Works;
