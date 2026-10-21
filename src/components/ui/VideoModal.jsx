import { useEffect } from "react";
import { createPortal } from "react-dom";

// مودال يعرض الفيديو لوحده (بأبعاد ريلز) فوق أي شيء — بيتفتح من غلاف الفيديو
// Escape أو الضغط على الخلفية أو زر الإغلاق = إغلاق
const VideoModal = ({ onClose, children }) => {
  useEffect(() => {
    // قفل سكرول الصفحة (لو اللايت بوكس قافله أصلاً نخليه لصاحبه)
    const alreadyLocked = document.body.classList.contains("no-scroll");
    if (!alreadyLocked) document.body.classList.add("no-scroll");

    // capture + stopPropagation: Escape يقفل المودال بس، مش اللايت بوكس اللي تحته
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      if (!alreadyLocked) document.body.classList.remove("no-scroll");
    };
  }, [onClose]);

  return createPortal(
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="lightbox__close video-modal__close" onClick={onClose} aria-label="إغلاق">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="video-modal__body">{children}</div>
    </div>,
    document.body,
  );
};

export default VideoModal;
