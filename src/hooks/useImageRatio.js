import { useState, useEffect } from "react";

// نسبة عرض/ارتفاع صورة (بعد تحميلها) — عشان غلاف الفيديو ياخد نفس أبعاد صور العمل
export default function useImageRatio(src, fallback = 4 / 3) {
  const [ratio, setRatio] = useState(fallback);
  useEffect(() => {
    if (!src) return;
    let off = false;
    const img = new Image();
    img.onload = () => {
      if (!off && img.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = src;
    return () => {
      off = true;
    };
  }, [src]);
  return ratio;
}
