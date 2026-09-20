import { useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CircleQuestionMark, Calendar, House, Camera, Newspaper } from "lucide-react";

const navItems = [
  {
    path: "/",
    label: "الرئيسية",
    icon: House,
  },
  {
    path: "/works",
    label: "أعمالنا",
    icon: Camera,
  },
  {
    path: "/news",
    label: "الأخبار",
    icon: Newspaper,
  },
  {
    path: "/faq",
    label: "الأسئلة",
    icon: CircleQuestionMark,
  },
  {
    path: "/booking",
    label: "الحجز",
    icon: Calendar,
  },
];

const BN_LIFT = 1.08; // مقدار تكبير الكبسولة عند اللمس
const DRAG_THRESHOLD = 6; // px قبل اعتبار الحركة سحباً
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const buzz = (ms) => {
  try {
    if (navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* بعض المتصفحات (iOS) لا تدعم الاهتزاز */
  }
};

// أي تبويب نشط حسب المسار الحالي (-1 إذا لم يطابق أي تبويب)
const getActiveIndex = (pathname) =>
  navItems.findIndex(({ path }) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/"),
  );

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeIndex = getActiveIndex(pathname);

  const navRef = useRef(null);
  const pillRef = useRef(null);
  const ghostBoxRef = useRef(null);
  const itemRefs = useRef([]);
  const ghostRefs = useRef([]);

  // أحدث قيم الراوتر متاحة داخل مستمعات الأحداث بدون إعادة ربطها
  const latest = useRef({});
  latest.current = {
    activeIndex,
    select: (i) => navigate(navItems[i].path),
  };

  // واجهة داخلية يستدعيها الـ effect الثاني عند تغيّر المسار
  const api = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    const ghostBox = ghostBoxRef.current;
    const items = itemRefs.current;
    const ghosts = ghostRefs.current;
    if (!nav || !pill || !ghostBox || !items.length || items.some((el) => !el)) return;

    const reduceMotion = !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bn = {
      x: 0, // موضع الكبسولة الحالي
      target: 0, // الموضع المطلوب
      v: 0, // سرعة النابض
      s: 1, // مقياس الرفع (1 = ساكنة)
      index: -1,
      lit: -1,
      raf: 0,
      last: 0,
      W: 0,
      H: 0,
      T: 0,
      ready: false,
      dragging: false,
      lifted: false,
    };

    /* ---------- أدوات القياس ---------- */
    const nearest = (center) => {
      let best = 0;
      let bestD = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - center);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    };

    // مقاومة مطاطية عند الوصول لطرفي الشريط
    const rubber = (v) => {
      const lefts = items.map((it) => it.offsetLeft);
      const min = Math.min(...lefts);
      const max = Math.max(...lefts);
      if (v >= min && v <= max) return v;
      const over = v < min ? min - v : v - max;
      const soft = 16 * (1 - Math.exp(-over / 36));
      return v < min ? min - soft : max + soft;
    };

    // قياسات الكبسولة ومواضع النسخ الذهبية (تُحدَّث عند تغيّر المقاس فقط)
    const layout = (i) => {
      const ref = items[i] || items[0];
      bn.W = ref.offsetWidth;
      bn.H = ref.offsetHeight;
      bn.T = ref.offsetTop;
      pill.style.width = bn.W + "px";
      pill.style.height = bn.H + "px";
      pill.style.top = bn.T + "px";
      items.forEach((it, k) => {
        const gh = ghosts[k];
        if (!gh) return;
        gh.style.left = it.offsetLeft + "px";
        gh.style.top = it.offsetTop + "px";
        gh.style.width = it.offsetWidth + "px";
        gh.style.height = it.offsetHeight + "px";
      });
    };

    const render = () => {
      const W = bn.W || 1;
      const H = bn.H || 1;
      const stretch = Math.min(Math.abs(bn.target - bn.x) / W, 0.7); // تمدد "جيلي" بحسب السرعة
      const a = stretch * 0.22;
      const b = stretch * 0.07;
      pill.style.transform = `translate3d(${bn.x.toFixed(2)}px,0,0) scale(${(bn.s * (1 + a)).toFixed(3)},${(bn.s * (1 - b)).toFixed(3)})`;
      // النسخ الذهبية تبقى ثابتة بالنسبة للشريط (تعاكس حركة الكبسولة) وتُكبَّر معها كعدسة
      const cx = W / 2;
      const cy = H / 2;
      ghostBox.style.transform = `translate(${cx}px,${cy}px) scale(${(1 / (1 + a)).toFixed(3)},${(1 / (1 - b)).toFixed(3)}) translate(${(-cx - bn.x).toFixed(2)}px,${-cy - bn.T}px)`;
    };

    // تتبّع التبويب الذي تقف عنده الكبسولة أثناء السحب لإعطاء نقرة اهتزاز عند كل عبور
    const track = () => {
      const idx = bn.dragging ? nearest(bn.x + bn.W / 2) : bn.index;
      if (idx === bn.lit) return;
      if (bn.lit !== -1 && bn.dragging) buzz(6);
      bn.lit = idx;
    };

    /* ---------- الحركة (نابض + تتبع الإصبع) ---------- */
    const tick = (now) => {
      const f = Math.min(Math.max((now - (bn.last || now)) / 16.667, 0.25), 3); // ثبات السرعة على 60/120Hz
      bn.last = now;
      const d = bn.target - bn.x;
      if (bn.dragging) {
        // أثناء السحب: تتبع سلس بدون ارتداد
        bn.v = 0;
        bn.x += d * (1 - Math.pow(0.62, f));
      } else {
        // بعد الرفع: نابض بارتداد خفيف
        bn.v = (bn.v + 0.2 * d * f) * Math.pow(0.62, f);
        bn.x += bn.v * f;
      }
      const sT = bn.lifted ? BN_LIFT : 1;
      bn.s += (sT - bn.s) * (1 - Math.pow(0.72, f));
      render();
      track();
      if (Math.abs(bn.target - bn.x) < 0.25 && Math.abs(bn.v) < 0.25 && Math.abs(sT - bn.s) < 0.003) {
        bn.x = bn.target;
        bn.s = sT;
        bn.v = 0;
        bn.raf = 0;
        bn.last = 0;
        render();
        return;
      }
      bn.raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!bn.raf) {
        bn.last = 0;
        bn.raf = requestAnimationFrame(tick);
      }
    };

    // انقل الكبسولة للتبويب i (instant = بدون حركة، مثل تغيير حجم الشاشة)
    const moveTo = (i, instant = false) => {
      bn.index = i;
      if (i < 0 || !items[i]) {
        // المسار الحالي ليس من تبويبات الشريط: أخفِ الكبسولة
        pill.style.opacity = "0";
        bn.ready = false;
        return;
      }
      const it = items[i];
      if (!it.offsetWidth) {
        // الشريط مخفي (شاشة كبيرة)
        bn.ready = false;
        return;
      }
      pill.style.opacity = "";
      layout(i);
      bn.target = it.offsetLeft;
      if (instant || !bn.ready || reduceMotion) {
        bn.x = bn.target;
        bn.v = 0;
        bn.ready = true;
        render();
      } else {
        kick();
      }
      track();
    };
    api.current = { moveTo };

    /* ---------- السحب بالإصبع (أو الماوس) على الشريط ---------- */
    let g = null; // الحركة الجارية
    let swallowClick = false; // لمنع "نقرة" وهمية بعد السحب
    let swallowTimer = 0;

    const fingerX = (clientX) => clientX - nav.getBoundingClientRect().left - nav.clientLeft;

    const onPointerDown = (e) => {
      if (g || (e.pointerType === "mouse" && e.button !== 0)) return;
      swallowClick = false;
      const item = e.target.closest ? e.target.closest(".bottom-nav__item") : null;
      const onPill = !!item && item === items[latest.current.activeIndex];
      g = {
        id: e.pointerId,
        startX: e.clientX,
        lastX: e.clientX,
        lastT: e.timeStamp,
        vx: 0,
        moved: false,
        grab: 0,
        onPill,
      };
      if (onPill) {
        // لمس الكبسولة نفسها: ترتفع فوراً
        bn.lifted = true;
        nav.classList.add("is-lifted");
        kick();
      }
    };

    const onPointerMove = (e) => {
      if (!g || e.pointerId !== g.id) return;
      const w = bn.W || 1;
      if (!g.moved) {
        if (Math.abs(e.clientX - g.startX) < DRAG_THRESHOLD) return;
        g.moved = true;
        bn.dragging = true;
        bn.lifted = true;
        nav.classList.add("is-lifted");
        try {
          nav.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        // إن بدأ السحب من الكبسولة نفسها نحافظ على مكان الإصبع عليها (بدون قفزة)
        if (g.onPill) g.grab = clamp(fingerX(g.startX) - (bn.x + w / 2), -w / 2, w / 2);
      }
      const dt = Math.max(1, e.timeStamp - g.lastT);
      g.vx = g.vx * 0.6 + ((e.clientX - g.lastX) / dt) * 0.4; // px/ms
      g.lastX = e.clientX;
      g.lastT = e.timeStamp;
      bn.target = rubber(fingerX(e.clientX) - w / 2 - g.grab);
      kick();
    };

    const finish = (e, cancelled) => {
      if (!g || e.pointerId !== g.id) return;
      const gest = g;
      g = null;
      bn.dragging = false;
      bn.lifted = false;
      nav.classList.remove("is-lifted");
      try {
        nav.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }

      if (!gest.moved) {
        // مجرد نقرة: NavLink يتولى الانتقال
        kick();
        return;
      }

      swallowClick = true;
      clearTimeout(swallowTimer);
      swallowTimer = setTimeout(() => {
        swallowClick = false;
      }, 400);

      const w = bn.W || 1;
      const current = latest.current.activeIndex;
      // الحركة السريعة (flick) تدفع الاختيار للتبويب التالي؛ أما إن توقف الإصبع قبل الرفع فلا سرعة
      const idle = e.timeStamp - gest.lastT;
      const vx = idle > 90 || Math.abs(gest.vx) < 0.35 ? 0 : gest.vx; // px/ms
      const push = clamp(vx * 110, -w, w);
      const idx = cancelled ? current : nearest(bn.x + w / 2 + push);

      if (idx >= 0 && idx !== current) {
        buzz(10);
        latest.current.select(idx); // تغيّر المسار => الـ effect الثاني يحرّك الكبسولة
      } else {
        moveTo(current); // نفس الصفحة: ارتداد للمكان
      }
    };
    const onPointerUp = (e) => finish(e, false);
    const onPointerCancel = (e) => finish(e, true);

    // لا تُفعّل رابط التبويب الذي انتهى عليه الإصبع بعد السحب
    const onClickCapture = (e) => {
      if (swallowClick) {
        e.preventDefault();
        e.stopPropagation();
        swallowClick = false;
      }
    };
    const stop = (e) => e.preventDefault();

    nav.addEventListener("pointerdown", onPointerDown);
    nav.addEventListener("pointermove", onPointerMove);
    nav.addEventListener("pointerup", onPointerUp);
    nav.addEventListener("pointercancel", onPointerCancel);
    nav.addEventListener("click", onClickCapture, true);
    nav.addEventListener("contextmenu", stop);
    nav.addEventListener("dragstart", stop);

    // أعد ضبط الكبسولة فوراً عند تغيّر حجم الشريط (تدوير الشاشة، الانتقال بين موبايل/ديسكتوب)
    const sync = () => {
      if (!bn.dragging) moveTo(latest.current.activeIndex, true);
    };
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(sync);
      ro.observe(nav);
    } else {
      window.addEventListener("resize", sync);
    }

    return () => {
      cancelAnimationFrame(bn.raf);
      clearTimeout(swallowTimer);
      nav.removeEventListener("pointerdown", onPointerDown);
      nav.removeEventListener("pointermove", onPointerMove);
      nav.removeEventListener("pointerup", onPointerUp);
      nav.removeEventListener("pointercancel", onPointerCancel);
      nav.removeEventListener("click", onClickCapture, true);
      nav.removeEventListener("contextmenu", stop);
      nav.removeEventListener("dragstart", stop);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", sync);
      api.current = null;
    };
  }, []);

  // عند أي تغيّر في المسار (نقر، سحب، زر الرجوع...) حرّك الكبسولة للتبويب الجديد
  useEffect(() => {
    if (api.current) api.current.moveTo(activeIndex);
  }, [activeIndex]);

  return (
    <nav ref={navRef} className="bottom-nav has-pill" id="bottom-nav" aria-label="التنقل الرئيسي">
      {navItems.map((item, i) => (
        <NavLink
          key={item.path}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          to={item.path}
          draggable={false}
          className={({ isActive }) => `bottom-nav__item ${isActive ? "is-active" : ""}`}
        >
          <item.icon />
          <span>{item.label}</span>
        </NavLink>
      ))}

      {/* الكبسولة الزيتية: تحمل نسخاً ذهبية من العناصر تظهر فقط داخلها */}
      <span ref={pillRef} className="bottom-nav__pill" aria-hidden="true">
        <span ref={ghostBoxRef} className="bottom-nav__ghosts">
          {navItems.map((item, i) => (
            <span
              key={item.path}
              ref={(el) => {
                ghostRefs.current[i] = el;
              }}
              className="bottom-nav__item bottom-nav__ghost"
            >
              <item.icon />
              <span>{item.label}</span>
            </span>
          ))}
        </span>
      </span>
    </nav>
  );
};

export default BottomNav;
