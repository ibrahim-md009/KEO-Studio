import { Link } from "react-router-dom";

const navLinks = [
  { path: "/", label: "الرئيسية" },
  { path: "/works", label: "أعمالنا" },
  { path: "/faq", label: "الأسئلة" },
  { path: "/booking", label: "الحجز" },
];

const socialLinks = [
  {
    name: "Instagram",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.3l-.5 3H11.5v7h-3v-7H6.5v-3h2V9.8c0-2.4 1.6-4.3 4-4.3H15v3z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 4v10.2a3.3 3.3 0 1 1-2.6-3.23" />
        <path d="M14 4c.4 2.4 2.1 4 4.6 4.2" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__logo">
              <img className="brand-mark" src="/white.png" alt="" />
              KEO
            </div>
            <p className="tempo">استديو تصوير فاخر، نوثّق مناسباتكم بلمسة أصيلة وهادئة.</p>
          </div>

          <div className="footer__col">
            <h4>تصفّح</h4>
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h4>تواصل معنا</h4>
            <div className="footer__contact-row">
              <a
                href="https://wa.me/972567574848"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="footer__whatsapp-link"
              >
                <span className="footer__whatsapp-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.8-.11-.41-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.38c.26-.28.56-.35.75-.35h.53c.17 0 .4-.03.62.47.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
                  </svg>
                </span>
              </a>

              <div className="footer__social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="footer__social-link"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">© KEO — جميع الحقوق محفوظة</div>
      </div>
    </footer>
  );
};

export default Footer;
