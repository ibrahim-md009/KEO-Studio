import YouTubeFrame from "./YouTubeFrame";
import CloudVideo from "./CloudVideo";
import VideoThumb from "./VideoThumb";

// يختار المشغّل المناسب: مرفوع من الداشبورد (url) أو يوتيوب (id)
// reel: إطار عمودي 9:16 زي ريلز انستجرام (الفيديو التعريفي)
// modal: غلاف بأبعاد صور العمل (ratioSrc) والفيديو بيفتح بمودال ريلز (فيديوهات الأعمال)
const VideoItem = ({ video, title, autoPlay = false, reel = false, modal = false, ratioSrc }) => {
  if (modal) return <VideoThumb video={video} title={title} ratioSrc={ratioSrc} />;
  if (video?.url) return <CloudVideo url={video.url} title={title} autoPlay={autoPlay} reel={reel} />;
  if (video?.id) return <YouTubeFrame id={video.id} title={title} reel={reel} />;
  return null;
};

export default VideoItem;
