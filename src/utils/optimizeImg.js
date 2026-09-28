// بيطلب من Cloudinary نسخة مصغرة بصيغة وجودة أوتوماتيك (الأصل بيفضل زي ما هو)
export const optimizeImg = (url, w = 800) =>
  url?.includes("/upload/") ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`) : url;
