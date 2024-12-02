import React from "react";
import logoWhite from "../../public/logo-white.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content d-flex flex-row align-items-center justify-content-between">
        {/* Mualliflik huquqi */}
        <img
          style={{
            width: "200px",
            height: "65px",
            objectFit: "cover",
            marginTop: "-10px",
          }}
          src={logoWhite}
          alt="logo"
        />
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Markaziy Bank arxiv.
        </p>

        {/* Ijtimoiy tarmoq ikonkalari */}
        {/* <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div> */}
        {/* Foydali linklar */}
        <div className="footer-links">
          <a href="/">Axborot texnologiyalari departamenti</a>
          {/* <a href="/contact">Bog‘lanish</a>
          <a href="/privacy">Maxfiylik siyosati</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
