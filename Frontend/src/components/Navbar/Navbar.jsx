import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  searchQuery = "",
  onSearchChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`vl-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="vl-nav-container">
          <Link to="/" className="vl-logo" onClick={closeMenu}>
            <div className="vl-logo-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" stroke="#e5a93c" strokeWidth="2" />
                <circle cx="18" cy="9" r="0.8" fill="#e50914" stroke="#e50914" />
              </svg>
            </div>
            <div className="vl-brand-title-wrap">
              <span className="vl-logo-text">Digicam</span>
              <span className="vl-logo-sub">CINEMA & OPTICS</span>
            </div>
          </Link>

          <nav className="vl-desktop-nav">
            <a href="#cameras" className="vl-nav-link">Cameras</a>
            <a href="#lenses" className="vl-nav-link">Lenses</a>
            <a href="#accessories" className="vl-nav-link">Accessories</a>
            
          </nav>

         

          <div className="vl-nav-actions">
           

            <button
              className="vl-cart-btn"
              onClick={onOpenCart}
              title="Open Cinema Kit Cart"
              aria-label="Cart"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="cart-label">KIT</span>
              <span className="cart-count-badge">{cartCount}</span>
            </button>

            {/* Account Login Button */}
            <button 
              className="vl-login-btn"
              onClick={() => navigate("/Login")}
            >
              Account
            </button>

            {/* Mobile / Full Menu Toggle */}
            <button 
              className={`vl-menu-toggle ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle site menu"
            >
              <span className="vl-menu-text">{isMenuOpen ? "Close" : "Menu"}</span>
              <div className="vl-menu-bars">
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile / Slideout Overlay Menu */}
      <div className={`vl-menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="vl-menu-backdrop" onClick={closeMenu}></div>
        <div className="vl-menu-panel">
          <div className="vl-menu-header">
            <span className="vl-menu-section-label">DIGICAM STORE DIRECTORY</span>
            <button className="vl-menu-close" onClick={closeMenu}>✕</button>
          </div>

          <div className="vl-menu-links">
            <a href="#cameras" onClick={closeMenu} className="vl-menu-link">
              <span className="num">01</span>
              <span className="txt">Cinema & Mirrorless</span>
            </a>
            <a href="#lenses" onClick={closeMenu} className="vl-menu-link">
              <span className="num">02</span>
              <span className="txt">Lenses & Cine Glass</span>
            </a>
            <a href="#accessories" onClick={closeMenu} className="vl-menu-link">
              <span className="num">03</span>
              <span className="txt">Essential Accessories</span>
            </a>
            <a href="#deals" onClick={closeMenu} className="vl-menu-link">
              <span className="num">04</span>
              <span className="txt">Deals & Clearance</span>
            </a>
          
           
            
            
          </div>

          <div className="vl-menu-footer">
            <div className="vl-menu-contact">
              <p className="vl-menu-label">EXPERT GEAR HOTLINE</p>
              <a href="tel:18004453564" className="vl-menu-phone">+1</a>
              <a href="mailto:gear@digicam.store" className="vl-menu-email">@digicam.store</a>
              <p className="vl-menu-note">Available Mon-Sat 9AM-8PM EST</p>
            </div>
            <div className="vl-menu-actions">
              <Link to="/Signup" onClick={closeMenu} className="vl-btn-primary">
                Create Creator Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;