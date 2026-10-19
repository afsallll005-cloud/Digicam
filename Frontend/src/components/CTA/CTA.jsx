import React from "react";
import "./CTA.css";

const CTA = ({ onOpenContact }) => {
  return (
    <section className="vl-cta-section" id="contact">
      <div className="site-container">
        <div className="vl-cta-box viewfinder-card">
          {/* 4 Viewfinder Corner Brackets */}
          <span className="corner-bracket tl"></span>
          <span className="corner-bracket tr"></span>
          <span className="corner-bracket br"></span>
          <span className="corner-bracket bl"></span>

          {/* Video Backdrop */}
          <video
            src="https://framerusercontent.com/assets/KcHC4vOiUqiIIQeDrfDHir3qY.mp4"
            poster="https://framerusercontent.com/images/tMTA1vKtPMp9H2MVL1eQNaXYus.webp"
            autoPlay
            muted
            loop
            playsInline
            className="vl-cta-video"
          />

          <div className="vl-cta-shade"></div>

          {/* Content Over Video */}
          <div className="vl-cta-content">
            {/* Top Bar */}
            <div className="vl-cta-top">
              <div className="vl-cta-brand">
                <span className="cta-brand-name">DIGICAM STORE</span>
                <span className="cta-brand-dash"></span>
                <span className="cta-brand-subtitle">Studio Consultation & Rigging</span>
              </div>

              <div className="hud-chips">
                <span className="hud-chip">OFFICIAL DEALER</span>
                <span className="hud-chip">4K/8K/12K</span>
                <span className="hud-chip">2-YEAR WARRANTY</span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="vl-cta-bottom">
              <h2 className="vl-cta-headline">
                Equip your vision with <br />
                industry-grade precision.
              </h2>

              <div className="vl-cta-side">
                <p className="vl-cta-side-text">
                  Talk directly with our gear specialists. We configure, balance, and package your cameras, prime lenses, and accessories ready for your next production day.
                </p>

                <div className="cta-buttons-row">
                  <button
                    className="vl-cta-btn"
                    onClick={() => onOpenContact && onOpenContact()}
                  >
                    <span>Request Rig Consultation</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </button>

                  <a href="#cameras" className="vl-cta-browse-btn">
                    Explore Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
