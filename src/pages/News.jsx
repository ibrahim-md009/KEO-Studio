import { useState, useEffect } from "react";
import FadeAnimation from "../components/ui/FadeAnimation";
import VideoItem from "../components/ui/VideoItem";
import useCached from "../hooks/useChached";
import { QUERIES } from "../services/queries";
import { ImageUpscaleIcon } from "lucide-react";
import Final from "../components/layout/Final";
import { optimizeImg } from "../utils/optimizeImg";
import { isValidVideo } from "../utils/video";

// nu-latn: أرقام لاتينية (2026) لأن خط Naveid التجريبي بيشوّه الأرقام الهندية (٢٠٢٦)
// formatter واحد بس بدل ما يتنشأ مع كل خبر (toLocaleDateString بينشئ واحد جديد في كل نداء)
const dateFmt = new Intl.DateTimeFormat("ar-EG-u-nu-latn", { year: "numeric", month: "long" });

const News = () => {
  // const { data, loading } = useCached(QUERIES.news.key, QUERIES.news.fetcher);
  const { data, loading } = useCached(QUERIES.news.key, QUERIES.news.fetcher, 5 * 1000);
  const newsData = data ?? [];

  // عارض الصور (وضع التمرير العمودي)
  const [lightbox, setLightbox] = useState({ open: false, images: [], videos: [], title: "" });

  const getMainImage = (item) => item.mainImage || item.imageUrl || null;
  const getSubImages = (item) => item.subImages || item.images || [];
  const getVideos = (item) => (item.videos || []).filter(isValidVideo);

  // createdAt بقى ISO string ثابت (اتحول في firestore.js) بدل Firestore Timestamp
  const formatNewsDate = (createdAt) => {
    if (!createdAt) return null;
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return null;
    return dateFmt.format(date);
  };

  const openGallery = (item) => {
    const images = [getMainImage(item), ...getSubImages(item)].filter(Boolean);
    setLightbox({ open: true, images, videos: getVideos(item), title: item.mainDesc || "" });
  };

  const closeLightbox = () => setLightbox({ open: false, images: [], videos: [], title: "" });

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
                const videos = getVideos(item);
                const date = formatNewsDate(item.createdAt);
                return (
                  <FadeAnimation key={item.id} className="news-item">
                    <div className="news-item__media">
                      {mainImage ? (
                        <img src={optimizeImg(mainImage, 800)} alt={item.mainDesc} loading="lazy" decoding="async" />
                      ) : (
                        videos[0] && <VideoItem video={videos[0]} title={item.mainDesc} modal />
                      )}
                      {date && <span className="news-item__date">{date}</span>}
                    </div>
                    <div>
                      <h3 className="news-item__title">{item.mainDesc || "(بدون عنوان)"}</h3>
                      <p className="news-item__text">{item.subDesc}</p>

                      {(subImages.length > 0 || videos.length > 0) && (
                        <button type="button" className="news-item__viewall" onClick={() => openGallery(item)}>
                          <ImageUpscaleIcon />
                          {videos.length > 0 ? "عرض كل الصور والفيديوهات" : "عرض كل الصور"}
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

      <Final title="حابين تكونوا جزءً من قصتنا؟" text="احجزوا جلستكم اليوم وتابعوا أخبارنا لأحدث الباقات والعروض." />

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
              {/* الفيديوهات: نفس عرض فيديوهات الأعمال (غلاف بأبعاد الصور + مودال ريلز) */}
              {lightbox.videos.map((v, i) => (
                <figure className="lightbox__scroll-item" key={v.url || v.id || i}>
                  <VideoItem
                    video={v}
                    title={lightbox.title}
                    modal
                    ratioSrc={lightbox.images[0] ? optimizeImg(lightbox.images[0], 1600) : undefined}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
