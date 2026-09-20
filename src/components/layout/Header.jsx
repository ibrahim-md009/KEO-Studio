import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { name: "الرئيسية", url: "/" },
  { name: "أعمالنا", url: "/works" },
  { name: "الأخبار", url: "/news" },
  { name: "الأسئلة", url: "/faq" },
  { name: "الحجز", url: "/booking" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 40 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" data-page="home">
          <img className="brand-mark" src="/download.png" alt="" />
        </Link>

        <nav className="nav__links" id="nav-links">
          {navLinks.map((link, index) => {
            return (
              <NavLink key={index} to={link.url} className={({ isActive }) => (isActive ? "is-active" : "")}>
                {link.name}
              </NavLink>
            );
          })}

          <Link to="/booking" className="nav__cta">
            احجزي موعدك
          </Link>
        </nav>
        <a
          className="nav__whatsapp"
          href="https://wa.me/972567574848"
          target="_blank"
          rel="noopener"
          aria-label="تواصل عبر واتساب"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.8-.11-.41-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.38c.26-.28.56-.35.75-.35h.53c.17 0 .4-.03.62.47.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
