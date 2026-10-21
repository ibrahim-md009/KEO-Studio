import { useState, useEffect, useRef } from "react";
import { videoSrc, videoPoster } from "../../utils/video";
import PlayIcon from "./PlayIcon";

// فيديو مرفوع (Cloudinary) بنظام "الغلاف أولاً": صورة خفيفة + زر تشغيل،
// وعنصر <video> ما بيتركّب (ولا بيحمّل أي بايت من الفيديو) إلا بعد الضغط → ما بيأثر على سرعة الموقع.
// الكنترولز الافتراضية مخفية: الضغط على الفيديو = إيقاف/تشغيل، وزر التشغيل المميز بيظهر وقت الإيقاف.
// reel: إطار عمودي 9:16 زي الريلز.
// autoPlay (الفيديو التعريفي): يشتغل تلقائياً لما يظهر بالشاشة، وبصوت.
// المتصفحات بتمنع الصوت التلقائي قبل أي تفاعل من الزائر، فلو انمنع بيشتغل صامت
// وبيتفعّل الصوت أول ما الزائر يلمس/يضغط بأي مكان (أو من زر الصوت).
// initialPlaying: يبدأ التشغيل مباشرة بدون غلاف (جوه المودال)
// ratio (اختياري): نسبة عرض/ارتفاع مخصصة للإطار (مثلاً نفس أبعاد صورة العمل) بدل 16:9
const CloudVideo = ({ url, title, autoPlay = false, reel = false, initialPlaying = false, ratio }) => {
  const [playing, setPlaying] = useState(initialPlaying);
  const [inView, setInView] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);
  const [paused, setPaused] = useState(false); // الزائر أوقف الفيديو (أو خلص) → نبين زر التشغيل
  const [ready, setReady] = useState(false); // أول إطار انعرض فعلاً → نشيل الغلاف بنعومة
  const [src, setSrc] = useState(() => videoSrc(url));
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const userPaused = useRef(false); // الزائر أوقفه بإيده → ما نشغّله تلقائياً مع الظهور
  const unmutedAt = useRef(0); // عشان أول ضغطة (تفعيل الصوت) ما توقف الفيديو
  const poster = videoPoster(url);

  // نراقب الفيديو بمراقبين: "قريب" (قبل ما نوصله بـ ~800px) نركّب العنصر ونبدأ التحميل بهدوء،
  // و"ظاهر" (40% من الإطار) نشغّله. هيك التحميل وفك الترميز بيخلصوا قبل ما الزائر يوصل
  // فما في تعليقة وقت الوصول، والغلاف بيضل ظاهر لحد ما أول إطار يجهز.
  useEffect(() => {
    if (!autoPlay) return;
    const el = frameRef.current;
    if (!el) return;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          near.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    const view = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    near.observe(el);
    view.observe(el);
    return () => {
      near.disconnect();
      view.disconnect();
    };
  }, [autoPlay]);

  // تشغيل/إيقاف حسب الظهور: نجرب بصوت أولاً، ولو انمنع نكمل صامت
  useEffect(() => {
    const video = videoRef.current;
    if (!autoPlay || !playing || !video) return;
    if (!inView) {
      video.pause();
      return;
    }
    if (userPaused.current) return; // الزائر أوقفه بنفسه → نحترم قراره
    video.muted = needsSound;
    video.play().catch(() => {
      video.muted = true;
      setNeedsSound(true);
      video.play().catch(() => {});
    });
  }, [autoPlay, playing, inView]); // eslint-disable-line react-hooks/exhaustive-deps

  // فيديو الأعمال (بدون autoPlay): لو المتصفح منع التشغيل التلقائي نبين زر التشغيل
  useEffect(() => {
    if (autoPlay || !playing) return;
    videoRef.current?.play().catch(() => setPaused(true));
  }, [autoPlay, playing]);

  // أول تفاعل من الزائر → نفعّل الصوت
  useEffect(() => {
    if (!needsSound) return;
    const unmute = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        video.volume = 1;
      }
      unmutedAt.current = Date.now();
      setNeedsSound(false);
    };
    const events = ["pointerdown", "touchend", "keydown", "click"];
    events.forEach((e) => window.addEventListener(e, unmute, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unmute));
  }, [needsSound]);

  // الضغط على الفيديو (أو على زر التشغيل) = إيقاف/تشغيل
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (Date.now() - unmutedAt.current < 500) return; // الضغطة دي كانت لتفعيل الصوت بس
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div
      className={`yt-frame ${reel ? "yt-frame--reel" : ""}`}
      ref={frameRef}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {playing ? (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster || undefined}
            autoPlay={!autoPlay}
            loop={autoPlay}
            onLoadedData={() => setReady(true)}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onClick={togglePlay}
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-label={title || "فيديو"}
            onVolumeChange={(e) => e.currentTarget.muted === false && setNeedsSound(false)}
            // لو فشل التحويل التلقائي (ملف كبير) نرجع للأصل
            onError={() => src !== url && setSrc(url)}
          />
          {autoPlay && poster && (
            <img
              className={`cloud-poster cloud-poster--cover ${ready ? "is-hidden" : ""}`}
              src={poster}
              alt=""
              aria-hidden="true"
            />
          )}
          {paused && ready && (
            <button type="button" className="yt-play yt-play--overlay" aria-label="تشغيل الفيديو" onClick={togglePlay}>
              <PlayIcon />
            </button>
          )}
          {needsSound && (
            <button
              type="button"
              className="yt-sound"
              aria-label="تشغيل الصوت"
              onClick={() => {
                const v = videoRef.current;
                if (v) v.muted = false;
                setNeedsSound(false);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
              </svg>
              <span>اضغط لتشغيل الصوت</span>
            </button>
          )}
        </>
      ) : (
        <>
          {poster && <img className="cloud-poster" src={poster} alt={title || "فيديو"} loading="lazy" decoding="async" />}
          <button type="button" className="yt-play" aria-label="تشغيل الفيديو" onClick={() => setPlaying(true)}>
            <PlayIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default CloudVideo;
