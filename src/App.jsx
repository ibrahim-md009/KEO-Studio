// import { Routes, Route } from "react-router-dom";
// import ScrollToTop from "./components/layout/ScrollToTop";
// import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
// import Home from "./pages/home";
// import Works from "./pages/Works";
// import Faq from "./pages/Faq";
// import News from "./pages/News";
// import Booking from "./pages/Booking";
// import MobNav from "./components/layout/MobNav";
// const App = () => {
//   return (
//     <>
//       <Header />
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/works" element={<Works />} />
//         <Route path="/faq" element={<Faq />} />
//         <Route path="/news" element={<News />} />
//         <Route path="/booking" element={<Booking />} />
//       </Routes>
//       <MobNav />
//       <Footer />
//     </>
//   );
// };

// export default App;

import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/home";
import MobNav from "./components/layout/MobNav";

// الصفحات الثانية تتحمل وقت الحاجة (كود Firebase و framer-motion ما يتحملوش مع الرئيسية)
const Works = lazy(() => import("./pages/Works"));
const Faq = lazy(() => import("./pages/Faq"));
const News = lazy(() => import("./pages/News"));
const Booking = lazy(() => import("./pages/Booking"));

const App = () => {
  // بعد ما الرئيسية تخلص وفي وقت فراغ المتصفح: جهّز البيانات وحمّل أكواد الصفحات
  // (dynamic import عشان Firebase ما يدخلش في الحزمة الأولى)
  useEffect(() => {
    const warmUp = () => {
      import("./services/queries").then((m) => m.prefetchAll());
      import("./pages/Works");
      import("./pages/News");
      import("./pages/Booking");
      import("./pages/Faq");
    };
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const id = idle(warmUp);
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/news" element={<News />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Suspense>
      <MobNav />
      <Footer />
    </>
  );
};

export default App;
