import { useState } from "react";
import CloudVideo from "./CloudVideo";
import YouTubeFrame from "./YouTubeFrame";
import VideoModal from "./VideoModal";
import PlayIcon from "./PlayIcon";
import useImageRatio from "../../hooks/useImageRatio";
import { videoPoster } from "../../utils/video";

// فيديو الأعمال: غلاف بنفس أبعاد صور العمل + زر تشغيل،
// وبالضغط بيتفتح الفيديو لوحده بمودال بأبعاد ريلز (نفس فكرة فتح العمل بالـ lightbox)
const VideoThumb = ({ video, title, ratioSrc }) => {
  const [open, setOpen] = useState(false);
  const ratio = useImageRatio(ratioSrc);
  if (!video?.url && !video?.id) return null;

  const poster = video.url ? videoPoster(video.url) : `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <>
      <div className="yt-frame yt-frame--thumb" style={{ aspectRatio: ratio }}>
        {poster && <img className="cloud-poster" src={poster} alt={title || "فيديو"} loading="lazy" decoding="async" />}
        <button type="button" className="yt-play" aria-label="تشغيل الفيديو" onClick={() => setOpen(true)}>
          <PlayIcon />
        </button>
      </div>
      {open && (
        <VideoModal onClose={() => setOpen(false)}>
          {video.url ? (
            <CloudVideo url={video.url} title={title} reel initialPlaying />
          ) : (
            <YouTubeFrame id={video.id} title={title} reel startPlaying />
          )}
        </VideoModal>
      )}
    </>
  );
};

export default VideoThumb;
