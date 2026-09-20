// كاش بسيط في الذاكرة (يعيش طول ما التبويب مفتوح) + منع الطلبات المكررة
const store = new Map(); // key -> { data, ts, promise }

const DEFAULT_TTL = 5 * 60 * 1000; // 5 دقايق: قبلها ما نعيد الطلب أصلاً

export const peek = (key) => store.get(key)?.data;

export const cached = (key, fetcher, { ttl = DEFAULT_TTL, force = false } = {}) => {
  const entry = store.get(key);

  // بيانات طازجة: رجّعها فوراً بدون أي طلب
  if (!force && entry?.data !== undefined && Date.now() - entry.ts < ttl) {
    return Promise.resolve(entry.data);
  }
  // طلب شغال حالياً: شاركه بدل ما تبدأ واحد جديد
  if (entry?.promise) return entry.promise;

  const promise = fetcher()
    .then((data) => {
      store.set(key, { data, ts: Date.now(), promise: null });
      return data;
    })
    .catch((err) => {
      // لو فشل الطلب وعندنا نسخة قديمة، كمّل بيها بدل ما تظهر خطأ
      if (entry?.data !== undefined) {
        store.set(key, { ...entry, promise: null });
        return entry.data;
      }
      store.delete(key);
      throw err;
    });

  store.set(key, { data: entry?.data, ts: entry?.ts ?? 0, promise });
  return promise;
};

export const invalidate = (key) => (key ? store.delete(key) : store.clear());
