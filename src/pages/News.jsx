import { useState, useEffect } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";
import { Link } from "react-router-dom";
import useCached from "../hooks/useChached";
import { QUERIES } from "../services/queries";
import { ImageUpscaleIcon } from "lucide-react";
const News = () => {
  const { data, loading } = useCached(QUERIES.news.key, QUERIES.news.fetcher);
  const newsData = data ?? [];

  // عارض الصور (وضع التمرير العمودي)
  const [lightbox, setLightbox] = useState({ open: false, images: [] });

  const getMainImage = (item) => item.mainImage || item.imageUrl || null;
  const getSubImages = (item) => item.subImages || item.images || [];

  const openGallery = (item) => {
    const images = [getMainImage(item), ...getSubImages(item)].filter(Boolean);
    setLightbox({ open: true, images });
  };

  const closeLightbox = () => setLightbox({ open: false, images: [] });

  // قفل سكرول الصفحة + إغلاق بـ Escape (والتنظيف عند مغادرة الصفحة)
  useEffect(() => {
    if (!lightbox.open) return;
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox.open]);

  return (
    <section id="page-news">
      <div className="page-header">
        <span className="page-header__eyebrow">آخر الأخبار</span>
        <h1 className="page-header__title">مستجدات الاستديو</h1>
        <p className="page-header__text">كل جديد عن باقاتنا ومعداتنا ومساحة الاستديو، بمكان واحد.</p>
      </div>

      <section className="section section--tight news-section-tight">
        <div className="container">
          <div className="news-list">
            {loading ? (
              <p className="empty-msg">جاري تحميل الأخبار...</p>
            ) : (
              newsData.map((item) => {
                const mainImage = getMainImage(item);
                const subImages = getSubImages(item);
                return (
                  <FadeAnimation key={item.id} className="news-item">
                    <div className="news-item__media">
                      {mainImage && <img src={mainImage} alt={item.mainDesc} loading="lazy" />}
                      {item.createdAt && (
                        <span className="news-item__date">
                          {item.createdAt.toDate().toLocaleDateString("ar-EG", { year: "numeric", month: "long" })}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="news-item__title">{item.mainDesc || "(بدون عنوان)"}</h3>
                      <p className="news-item__text">{item.subDesc}</p>

                      {subImages.length > 0 && (
                        <button type="button" className="news-item__viewall" onClick={() => openGallery(item)}>
                          {<ImageUpscaleIcon />}
                          عرض كل الصور
                        </button>
                      )}
                    </div>
                  </FadeAnimation>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <FadeAnimation>
            <h2 className="section__title">حابين تكونوا جزءً من قصتنا؟</h2>
          </FadeAnimation>

          <FadeAnimation>
            <p className="section__text section__text--muted">
              احجزوا جلستكم اليوم وتابعوا أخبارنا لأحدث الباقات والعروض.
            </p>
          </FadeAnimation>

          <FadeAnimation className="cta-final__row">
            <Link to="/booking" className="btn btn--primary">
              احجزي موعدك الآن
            </Link>
          </FadeAnimation>
        </div>
      </section>

      {/* ============ عارض الصور: تمرير عمودي، كل الصور تحت بعض ============ */}
      {lightbox.open && (
        <div className="lightbox lightbox--scroll is-active" aria-hidden="false">
          <button className="lightbox__close" aria-label="إغلاق" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="lightbox__scroll-viewport">
            <div className="lightbox__scroll-list">
              {lightbox.images.map((url, i) => (
                <div className="lightbox__scroll-item" key={i}>
                  <img src={url} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
