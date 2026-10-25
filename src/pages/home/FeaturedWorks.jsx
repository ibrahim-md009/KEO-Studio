import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeAnimation from "../../components/ui/FadeAnimation";
import VideoItem from "../../components/ui/VideoItem";
import useCached from "../../hooks/useChached";
import { QUERIES } from "../../services/queries";
import { optimizeImg } from "../../utils/optimizeImg";
import useImageRatio from "../../hooks/useImageRatio";
import { isValidVideo } from "../../utils/video";

const { key, fetcher } = QUERIES.featured;

const DESKTOP_QUERY = "(min-width: 861px)";
const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return desktop;
};

// الفيديو بيشتغل مباشرة بمكانه (بدون مودال).
// ديسكتوب: إطار ريلز 9:16 بنفس حجم الفيديو التعريفي. موبايل: بنفس أبعاد صورة العمل (زي الأصل).
const FeaturedVideo = ({ video, item }) => {
  const desktop = useIsDesktop();
  const src = optimizeImg(item.img, 900);
  const ratio = useImageRatio(src);
  return <VideoItem video={video} title={item.title} reel={desktop} ratio={desktop ? undefined : ratio} />;
};

// "أعمال مميزة": الأعمال اللي عليها نجمة بالداشبورد. بنعرض أول فيديو للعمل (إن وجد)،
// وإلا صورته الرئيسية. لو ما في أي عمل مميز القسم كله بيختفي.
const FeaturedWorks = () => {
  const { data } = useCached(key, fetcher);
  const items = (data ?? []).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <FadeAnimation as="section" className="section featured">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">أعمال مميزة</span>
          <h2 className="section__title">من أحب أعمالنا إلينا</h2>
          <p className="section__text">لقطات مختارة بعناية من مشاريعنا الأخيرة.</p>
        </div>

        <div className="featured__grid">
          {items.map((item) => {
            const video = (item.videos || []).find(isValidVideo);
            return (
              <article className="featured__card" key={item.id}>
                {video ? (
                  <FeaturedVideo video={video} item={item} />
                ) : (
                  <Link to="/works" className="featured__img" aria-label={item.title}>
                    <img src={optimizeImg(item.img, 900)} alt={item.title} loading="lazy" decoding="async" />
                  </Link>
                )}
                <div className="featured__info">
                  <b>{item.title}</b>
                  {item.sub && <span>{item.sub}</span>}
                </div>
              </article>
            );
          })}
        </div>

        <div className="featured__more">
          <Link to="/works" className="btn btn--ghost">
            شاهد كل الأعمال
          </Link>
        </div>
      </div>
    </FadeAnimation>
  );
};

export default FeaturedWorks;
