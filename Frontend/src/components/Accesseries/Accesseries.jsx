import React from "react";
import "./Accesseries.css";

const CATEGORIES = [
 
  {
    id: "lenses",
    name: "Camera Lenses",
    sub: "Primes, Zooms & Cine Glass",
    count: "42 Optics",
    img: "/images/lence.png"
  },
  
  {
    id: "power",
    name: "Batteries & Power",
    sub: "V-Mount & Dual D-Tap",
    count: "28 Packs",
    img: "/images/battery.png"
  },
  {
    id: "storage",
    name: "CFexpress & SD Media",
    sub: "Up to 1700MB/s V90",
    count: "22 Cards",
    img: "/images/sd.png"
  },
 
  {
    id: "filters",
    name: "Camera Filters",
    sub: "VND, Polarizer & Mist",
    count: "30 Filters",
    img: "/images/filter.png"
  },
 
];

function Accesseries({ selectedCategory, onSelectCategory }) {
  return (
    <section className="vl-categories-section" id="accessories-categories">
      <div className="site-container">
        {/* Head */}
        <div className="vl-cat-head">
          <div>
            <p className="section-tag">Gear Ecosystem</p>
            <h2 className="section-headline">
              Essential <br />
              <span className="muted">Equipment</span> & Gear
            </h2>
          </div>
          <p className="section-description vl-cat-desc">
            Complete your production package. Premium optical glass, uncompressed storage, heavy-payload support, and rugged flight cases engineered for demanding sets.
          </p>
        </div>

        {/* Carousel / Grid of Categories */}
        <div className="vl-cat-grid">
          {CATEGORIES.map((item) => {
            const isActive = selectedCategory === item.id;
            return (
              <div
                key={item.id}
                className={`vl-cat-card viewfinder-card ${isActive ? "active" : ""}`}
                onClick={() => onSelectCategory && onSelectCategory(item.id)}
              >
                {/* 4 Viewfinder Corner Brackets */}
                <span className="corner-bracket tl"></span>
                <span className="corner-bracket tr"></span>
                <span className="corner-bracket br"></span>
                <span className="corner-bracket bl"></span>

                <div className="vl-cat-card-header">
                  <span className="vl-cat-count">{item.count}</span>
                  <span className="vl-cat-chip">PRO</span>
                </div>

                <div className="vl-cat-image-wrap">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="vl-cat-img"
                    onError={(e) => {
                      e.target.src = "/images/Cam01.png";
                    }}
                  />
                </div>

                <div className="vl-cat-card-body">
                  <h3 className="vl-cat-title">{item.name}</h3>
                  <p className="vl-cat-sub">{item.sub}</p>
                </div>

                <div className="vl-cat-hover-indicator">
                  <span>Explore category</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Accesseries;