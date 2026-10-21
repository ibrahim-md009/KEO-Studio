import { Link } from "react-router-dom";
import FadeAnimation from "../../components/ui/FadeAnimation";
import VideoItem from "../../components/ui/VideoItem";
import useCached from "../../hooks/useChached";
import { QUERIES } from "../../services/queries";
import { optimizeImg } from "../../utils/optimizeImg";
import { isValidVideo } from "../../utils/video";
import useImageRatio from "../../hooks/useImageRatio";

const { key, fetcher } = QUERIES.featured;

// الفيديو بيشتغل مباشرة بمكانه (بدون مودال)، بإطار بنفس أبعاد صورة العمل عشان الكرت ما يتغيّر حجمه
const FeaturedVideo = ({ video, item }) => {
  const src = optimizeImg(item.img, 900);
  const ratio = useImageRatio(src);
  return <VideoItem video={video} title={item.title} ratio={ratio} />;
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
