import { useState, useEffect } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";
import useCached from "../hooks/useChached";
import { QUERIES } from "../services/queries";
import Final from "../components/layout/Final";
import { optimizeImg } from "../utils/optimizeImg";

// فيديو يوتيوب بنظام "الغلاف أولاً": صورة + زر تشغيل، والـ iframe ما بيتحمّل إلا بعد الضغط
const VideoItem = ({ id, title }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="yt-frame">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title || "فيديو"}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title || "فيديو"}
            loading="lazy"
            decoding="async"
          />
          <button type="button" className="yt-play" aria-label="تشغيل الفيديو" onClick={() => setPlaying(true)}>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

const Works = () => {
  const { data, loading } = useCached(QUERIES.works.key, QUERIES.works.fetcher);
  const [galleryItems, categories] = data ?? [[], []];

  // التصنيف النشط: اللي اختاره المستخدم، أو أول تصنيف افتراضياً (بدون effect)
  const [selectedTab, setSelectedTab] = useState(null);
  const activeTab = selectedTab ?? categories[0]?.id ?? null;

  const filteredItems = galleryItems.filter((i) => i.category === activeTab);

  // عارض الصور (تمرير عمودي): الصورة الرئيسية أولاً ثم الفرعية
  const [lightbox, setLightbox] = useState({ open: false, images: [], videos: [], title: "" });

  const getSubImages = (item) => item.subImages || [];
  const getAllImages = (item) => [item.img, ...getSubImages(item)].filter(Boolean);
  const getVideos = (item) => (item.videos || []).filter((v) => v && v.id);

  const openGallery = (item) =>
    setLightbox({ open: true, images: getAllImages(item), videos: getVideos(item), title: item.title || "" });
  const closeLightbox = () => setLightbox({ open: false, images: [], videos: [], title: "" });

  // قفل سكرول الصفحة + Escape (والتنظيف عند الإغلاق)
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
    <section>
      <div className="page-header">
        <span className="page-header__eyebrow">معرض الأعمال</span>
        <h1 className="page-header__title">لحظات وثّقناها بعناية</h1>
        <p className="page-header__text">
          اضغط على أي عمل لتصفّح كل صوره بالتمرير للأسفل، أو اختر تصنيفاً آخر بأي وقت.
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
                اختر تصنيفاً من فوق لعرض صوره
              </p>
              <FadeAnimation key={activeTab} once={false} className="gallery-grid" id="gallery-grid" aria-live="polite">
                {filteredItems.map((item, index) => {
                  const total = getAllImages(item).length + getVideos(item).length; // الرئيسية + الفرعية + الفيديوهات
                  return (
                    <article
                      className="gallery-card"
                      key={item.id ?? index}
                      tabIndex={0}
                      role="button"
                      aria-label={`فتح ${item.title}`}
                      onClick={() => openGallery(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openGallery(item);
                        }
                      }}
                    >
                      <img src={item.img} alt={item.title} loading="lazy" />
                      {/* 1 = الصورة الرئيسية، والرقم الثاني = إجمالي صور وفيديوهات العمل */}
                      <span className="gallery-card__index">1/{total}</span>
                      <div className="gallery-card__info">
                        <b>{item.title}</b>
                        <span>{item.sub}</span>
                      </div>
                    </article>
                  );
                })}
              </FadeAnimation>
            </>
          )}
        </div>
      </section>

      {lightbox.open && (
        <div className="lightbox lightbox--scroll is-active" aria-hidden="false">
          <button className="lightbox__close" id="lightbox-close" onClick={closeLightbox} aria-label="إغلاق">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="lightbox__scroll-viewport">
            <div className="lightbox__scroll-list">
              {lightbox.images.map((url, i) => (
                <figure className="lightbox__scroll-item" key={i}>
                  <img
                    src={optimizeImg(url, 1600)}
                    alt={lightbox.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {i === 0 && lightbox.title && <figcaption className="lightbox__caption">{lightbox.title}</figcaption>}
                </figure>
              ))}
              {lightbox.videos.map((v) => (
                <figure className="lightbox__scroll-item" key={v.id}>
                  <VideoItem id={v.id} title={lightbox.title} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <Final title="أعجبتكم أعمالنا؟" text="احجزوا جلستكم الآن ولنصنع سوياً لحظة تستحق التوثيق." />
    </section>
  );
};
export default Works;
