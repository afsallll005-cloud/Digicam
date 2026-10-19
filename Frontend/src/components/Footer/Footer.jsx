import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="vl-footer">
      <div className="site-container vl-footer-container">
        {/* Giant Illuminated Wordmark */}
        <div className="vl-footer-wordmark-wrap" onClick={scrollToTop} title="Back to top">
          <div className="vl-wordmark-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 3L16.5 10.5" stroke="var(--accent-lime)" strokeWidth="1.6" />
              <path d="M16.5 10.5L10 18" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 18L4.5 12" stroke="var(--accent-lime)" strokeWidth="1.6" />
              <path d="M4.5 12L12 7.5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="3.2" fill="var(--accent-lime)" />
            </svg>
          </div>
          <h1 className="vl-footer-wordmark">
            {"DIGICAM".split("").map((letter, idx) => (
              <span key={idx} className="vl-letter">
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* 4 Footer Columns */}
        <div className="vl-footer-columns">
          {/* Column 1: Store & Concierge */}
          <div className="vl-footer-col">
            <p className="vl-col-title">Store & Concierge</p>
            <div className="vl-col-links">
              <a href="mailto:gear@digicam.store" className="vl-footer-link highlight">
                gear@digicam.store
              </a>
              <a href="tel:+18004453564" className="vl-footer-link">
                +1
              </a>
              <p className="vl-col-note">
                Studio Experience Center & Lab, <br />
                Optic Media Park, Suite 400
              </p>
              <span className="vl-col-note">Mon - Sat: 9:00 AM - 8:00 PM EST</span>
            </div>
          </div>

          {/* Column 2: Equipment Catalog */}
          <div className="vl-footer-col">
            <p className="vl-col-title">Equipment Catalog</p>
            <div className="vl-col-links">
              <a href="#cameras" className="vl-footer-link">Cinema Systems</a>
              <a href="#cameras" className="vl-footer-link">Pro Mirrorless</a>
              <a href="#lenses" className="vl-footer-link">Master Cine Lenses</a>
              <a href="#accessories" className="vl-footer-link">Gimbals & Carbon Rigs</a>
              <a href="#accessories" className="vl-footer-link">V-Mount Power Packs</a>
              <a href="#accessories" className="vl-footer-link">CFexpress & SD Media</a>
            </div>
          </div>

          {/* Column 3: Customer Support & Admin */}
          <div className="vl-footer-col">
            <p className="vl-col-title">Customer Support</p>
            <div className="vl-col-links">
              <a href="#deals" className="vl-footer-link">Weekly Flash Drops</a>
              <a href="#why-us" className="vl-footer-link">Why Choose DigiCam</a>
              <Link to="/Dealarea" className="vl-footer-link">Admin Deal Manager</Link>
              <Link to="/Dashboard" className="vl-footer-link">Staff Dashboard</Link>
              <Link to="/Login" className="vl-footer-link">Creator Sign In</Link>
              <Link to="/Signup" className="vl-footer-link">Create Account</Link>
            </div>
          </div>

          {/* Column 4: Certified Guarantees */}
          <div className="vl-footer-col">
            <p className="vl-col-title">Guarantees & Compliance</p>
            <div className="vl-col-links">
              <span className="vl-col-note">✓ 100% Authorized Brand Dealer</span>
              <span className="vl-col-note">✓ 2-Year Official Brand Warranty</span>
              <span className="vl-col-note">✓ 14-Day In-Field Testing Guarantee</span>
              <span className="vl-col-note">✓ Insured Flight Case Transit</span>
              <div className="vl-footer-status">
                <span className="status-dot"></span>
                <span>STORE ONLINE // ALL CHANNELS ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;