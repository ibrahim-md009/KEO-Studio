// كاش: في الذاكرة لأسرع قراءة + localStorage عشان يعيش بعد إغلاق التاب
// وبرضو بيمنع تكرار الطلبات لو أكتر من مكان طلب نفس الـ key في نفس اللحظة
const store = new Map(); // key -> { data, ts, promise }

const DEFAULT_TTL = 5 * 60 * 1000; // 5 دقايق: قبلها ما نعيد الطلب أصلاً

const storageKey = (key) => `cache:${key}`;

// بيدور على نسخة في الذاكرة الأول، ولو مش لاقي بيجرب localStorage
const load = (key) => {
  if (store.has(key)) return store.get(key);
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (raw) {
      const entry = JSON.parse(raw);
      store.set(key, entry);
      return entry;
    }
  } catch {
    // لو localStorage مش متاح (خصوصية/برايفت مود) كمّل عادي من غير كسر
  }
  return undefined;
};

// بيحفظ في الاتنين مع بعض
const save = (key, entry) => {
  store.set(key, entry);
  try {
    localStorage.setItem(storageKey(key), JSON.stringify({ data: entry.data, ts: entry.ts }));
  } catch {}
};

export const peek = (key) => load(key)?.data;

export const cached = (key, fetcher, { ttl = DEFAULT_TTL, force = false } = {}) => {
  const entry = load(key);

  // بيانات طازجة: رجّعها فوراً بدون أي طلب
  if (!force && entry?.data !== undefined && Date.now() - entry.ts < ttl) {
    return Promise.resolve(entry.data);
  }
  // طلب شغال حالياً: شاركه بدل ما تبدأ واحد جديد
  if (entry?.promise) return entry.promise;

  const promise = fetcher()
    .then((data) => {
      save(key, { data, ts: Date.now(), promise: null });
      return data;
    })
    .catch((err) => {
      // لو فشل الطلب وعندنا نسخة قديمة، كمّل بيها بدل ما تظهر خطأ
      if (entry?.data !== undefined) {
        save(key, { ...entry, promise: null });
        return entry.data;
      }
      store.delete(key);
      throw err;
    });

  store.set(key, { data: entry?.data, ts: entry?.ts ?? 0, promise });
  return promise;
};

export const invalidate = (key) => {
  if (key) {
    store.delete(key);
    try {
      localStorage.removeItem(storageKey(key));
    } catch {}
    return;
  }
  store.clear();
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("cache:"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
};
