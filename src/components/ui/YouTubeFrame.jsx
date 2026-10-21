import { useState } from "react";
import PlayIcon from "./PlayIcon";

// فيديو يوتيوب بنظام "الغلاف أولاً": صورة + زر تشغيل، والـ iframe ما بيتحمّل إلا بعد الضغط
// controls=0 → نخفي أزرار يوتيوب، و reel → إطار عمودي 9:16
const YouTubeFrame = ({ id, title, reel = false, startPlaying = false, ratio }) => {
  const [playing, setPlaying] = useState(startPlaying);
  return (
    <div className={`yt-frame ${reel ? "yt-frame--reel" : ""}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&controls=0&modestbranding=1&playsinline=1&disablekb=1`}
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
            <PlayIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default YouTubeFrame;
