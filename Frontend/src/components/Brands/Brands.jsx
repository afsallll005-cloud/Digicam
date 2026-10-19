import React from "react";
import "./Brands.css";

const CAMERA_BRANDS = [
  "SONY CINEMA LINE",
  "CANON EOS PRO",
  "RED DIGITAL CINEMA",
  "NIKON Z SYSTEM",
  "FUJIFILM GFX",
  "BLACKMAGIC DESIGN",
  "DJI PRO SYSTEMS",
  "LEICA CAMERA",
  "SIGMA CINE",
  "ZEISS OPTICS",
  "MANFROTTO",
  "RODE MICROPHONES",
  "TILTA RIGS",
  "SMALLRIG",
  "ATOMOS NINJA",
  "POLARPRO FILTERS",
  "PROGRADE DIGITAL",
  "PEAK DESIGN"
];

const Brands = () => {
  return (
    <section className="vl-brands-section" id="brands">
      <div className="site-container vl-brands-container">
        <p className="vl-brands-title">
          Authorized Brand Distributor & Certified Optical Partners
        </p>

        <div className="vl-marquee-wrap">
          <div className="vl-marquee-track">
            {/* Double the list for infinite seamless loop */}
            {[...CAMERA_BRANDS, ...CAMERA_BRANDS].map((brand, idx) => (
              <div key={idx} className="vl-marquee-item">
                <span className="brand-dot">✦</span>
                <span className="brand-name">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
