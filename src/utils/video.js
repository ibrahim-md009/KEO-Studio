// فيديوهات Cloudinary: بنطلب نسخة محسّنة (صيغة وجودة أوتوماتيك) وصورة غلاف من أول لقطة
// الأصل بيفضل زي ما هو، وأي رابط مش من Cloudinary بيرجع كما هو
const RE = /(res\.cloudinary\.com\/[^/]+\/video\/upload\/)(v\d+\/)/;

export const videoSrc = (url) => (url && RE.test(url) ? url.replace(RE, "$1f_auto,q_auto/$2") : url);

export const videoPoster = (url, w = 900) =>
  url && RE.test(url) ? url.replace(RE, `$1so_0,c_limit,w_${w},q_auto,f_jpg/$2`).replace(/\.[a-z0-9]+(\?.*)?$/i, ".jpg") : null;

// عنصر الفيديو بالـ Firestore: { type: "youtube", id } أو { type: "cloudinary", url }
export const isValidVideo = (v) => !!v && (!!v.id || !!v.url);
