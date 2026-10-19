import React from "react";
import "./EveryFrame.css";

const EveryFrame = () => {
  return (
    <section className="vl-everyframe-section" id="lenses">
      <div className="site-container">
        <div className="vl-everyframe-box viewfinder-card">
          {/* 4 Corner Brackets */}
          <span className="corner-bracket tl"></span>
          <span className="corner-bracket tr"></span>
          <span className="corner-bracket br"></span>
          <span className="corner-bracket bl"></span>

          {/* Feature Video */}
          <video
            src="https://framerusercontent.com/assets/yaiOngyixD5Kxcg6GPryCEQ635w.mp4"
            poster="https://framerusercontent.com/images/a6Fk6OHxF9EMJXHZ7Qdi9colz6I.webp"
            autoPlay
            muted
            loop
            playsInline
            className="vl-everyframe-video"
          />

          <div className="vl-everyframe-shade"></div>

          {/* Camera HUD tags */}
          <div className="hud-bar">
            <div className="hud-top">
              <div className="rec-badge">
                <span className="rec-dot"></span>
                <span>MASTER OPTICS LAB</span>
              </div>
              <div className="hud-chips">
                <span className="hud-chip">T1.5 CINEMA GLASS</span>
                <span className="hud-chip">ANAMORPHIC 2.39:1</span>
                <span className="hud-chip">ZERO FOCUS BREATHING</span>
              </div>
            </div>
          </div>

          {/* Bottom Title & Description */}
          <div className="vl-everyframe-content">
            <h2 className="vl-everyframe-title">
              Every frame demands <br />flawless optics.
            </h2>
            <p className="vl-everyframe-desc">
              From ultra-wide anamorphic glass to clinical telephoto primes, our optical lenses deliver organic skin tones, silky bokeh, and uncompromised edge-to-edge sharpness.
            </p>
            <div className="vl-everyframe-actions">
              <a href="#accessories" className="everyframe-btn">
                <span>Explore Cine Lenses & Filters</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EveryFrame;
