import { useState } from "react";

// فيديو يوتيوب بنظام "الغلاف أولاً": صورة + زر تشغيل، والـ iframe ما بيتحمّل إلا بعد الضغط
const YouTubeFrame = ({ id, title }) => {
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

export default YouTubeFrame;
