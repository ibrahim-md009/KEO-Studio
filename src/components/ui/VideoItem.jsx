import YouTubeFrame from "./YouTubeFrame";
import CloudVideo from "./CloudVideo";

// يختار المشغّل المناسب: مرفوع من الداشبورد (url) أو يوتيوب (id)
const VideoItem = ({ video, title, autoPlay = false }) => {
  if (video?.url) return <CloudVideo url={video.url} title={title} autoPlay={autoPlay} />;
  if (video?.id) return <YouTubeFrame id={video.id} title={title} />;
  return null;
};

export default VideoItem;
