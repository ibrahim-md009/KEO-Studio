import { getWorks, getCategories, getStatistics, getSiteContent, getFeaturedWorks } from "./firestore";
import { cached } from "./cache";

export const QUERIES = {
  works: { key: "works-page", fetcher: () => Promise.all([getWorks(), getCategories()]) },
  featured: { key: "featured-works", fetcher: getFeaturedWorks },
  statistics: { key: "statistics", fetcher: getStatistics },
  siteContent: { key: "site-content", fetcher: getSiteContent },
};

// استدعيها مرة واحدة عند تشغيل التطبيق: البيانات تبقى جاهزة قبل ما المستخدم يفتح الصفحة
export const prefetchAll = () => Object.values(QUERIES).forEach((q) => cached(q.key, q.fetcher).catch(() => {}));
