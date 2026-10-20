import { useState } from "react";
import { videoSrc, videoPoster } from "../../utils/video";

// فيديو مرفوع (Cloudinary) بنظام "الغلاف أولاً": صورة خفيفة + زر تشغيل،
// وعنصر <video> ما بيتركّب (ولا بيحمّل أي بايت من الفيديو) إلا بعد الضغط → ما بيأثر على سرعة الموقع
const CloudVideo = ({ url, title }) => {
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(() => videoSrc(url));
  const poster = videoPoster(url);

  return (
    <div className="yt-frame">
      {playing ? (
        <video
          src={src}
          poster={poster || undefined}
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload"
          // لو فشل التحويل التلقائي (ملف كبير) نرجع للأصل
          onError={() => src !== url && setSrc(url)}
        />
      ) : (
        <>
          {poster && <img src={poster} alt={title || "فيديو"} loading="lazy" decoding="async" />}
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

export default CloudVideo;
