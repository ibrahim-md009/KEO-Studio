import YouTubeFrame from "./YouTubeFrame";
import CloudVideo from "./CloudVideo";

// يختار المشغّل المناسب: مرفوع من الداشبورد (url) أو يوتيوب (id)
const VideoItem = ({ video, title }) => {
  if (video?.url) return <CloudVideo url={video.url} title={title} />;
  if (video?.id) return <YouTubeFrame id={video.id} title={title} />;
  return null;
};

export default VideoItem;
