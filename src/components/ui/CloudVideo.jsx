import { useState, useEffect, useRef } from "react";
import { videoSrc, videoPoster } from "../../utils/video";

// فيديو مرفوع (Cloudinary) بنظام "الغلاف أولاً": صورة خفيفة + زر تشغيل،
// وعنصر <video> ما بيتركّب (ولا بيحمّل أي بايت من الفيديو) إلا بعد الضغط → ما بيأثر على سرعة الموقع
const CloudVideo = ({ url, title, autoPlay }) => {
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(() => videoSrc(url));
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const poster = videoPoster(url);

  useEffect(() => {
    if (!autoPlay) return;
    const el = frameRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setPlaying(true); // لو متركّب بالفعل مفيش تأثير
          video?.play().catch(() => {});
        } else {
          video?.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay]); // مش معتمد على playing

  return (
    <div className="yt-frame" ref={frameRef}>
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          controls
          autoPlay
          muted={autoPlay} // لازم مكتم عشان المتصفح يسمح بالأوتوبلاي
          loop={autoPlay}
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
