import FadeAnimation from "../../components/ui/FadeAnimation";
import VideoItem from "../../components/ui/VideoItem";
import useCached from "../../hooks/useChached";
import { QUERIES } from "../../services/queries";

const { key, fetcher } = QUERIES.siteContent;

// الفيديو التعريفي (من تبويب "فيديو تعريفي" بالداشبورد) — بيظهر تحت الهيرو
// لو ما في فيديو محفوظ القسم كله ما بيظهر
const IntroVideo = () => {
  const { data } = useCached(key, fetcher);
  const video = data?.video;
  if (!video?.videoUrl && !video?.videoId) return null;

  const { videoUrl, videoId, eyebrow, title, text } = video;
  const hasHead = eyebrow || title || text;

  return (
    <FadeAnimation as="section" className="section section--tight intro-video">
      <div className="container">
        {hasHead && (
          <div className="section__head intro-video__head">
            {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {text && <p className="section__text">{text}</p>}
          </div>
        )}
        <VideoItem video={videoUrl ? { url: videoUrl } : { id: videoId }} title={title || "الفيديو التعريفي"} />
      </div>
    </FadeAnimation>
  );
};

export default IntroVideo;
