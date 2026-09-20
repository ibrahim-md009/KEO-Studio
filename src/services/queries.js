import { getNews, getWorks, getCategories } from "./firestore";
import { cached } from "./cache";

export const QUERIES = {
  news: { key: "news", fetcher: getNews },
  works: { key: "works-page", fetcher: () => Promise.all([getWorks(), getCategories()]) },
};

// استدعيها مرة واحدة عند تشغيل التطبيق: البيانات تبقى جاهزة قبل ما المستخدم يفتح الصفحة
export const prefetchAll = () => Object.values(QUERIES).forEach((q) => cached(q.key, q.fetcher).catch(() => {}));
