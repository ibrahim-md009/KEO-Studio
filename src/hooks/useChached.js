import { useEffect, useState } from "react";
import { cached, peek } from "../services/cache";

// stale-while-revalidate: لو فيه بيانات في الكاش تظهر فوراً (بدون "جاري التحميل")،
// ولو انتهت صلاحيتها بتتجدد بالخلفية وتتحدث الصفحة بهدوء
export default function useCached(key, fetcher, ttl) {
  const [data, setData] = useState(() => peek(key));
  const [loading, setLoading] = useState(() => peek(key) === undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    cached(key, fetcher, { ttl })
      .then((d) => alive && (setData(d), setLoading(false)))
      .catch((e) => {
        if (!alive) return;
        console.error(`فشل تحميل ${key}:`, e);
        setError(e);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading, error };
}
