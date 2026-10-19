import React, { useState } from "react";
import "./AccessoriesShowcase.css";

const ACCESSORIES_DATA = [
  {
    id: "acc-lens",
    name: "Sony FE 24-70mm f/2.8 GM II Cine Lens",
    category: "Optics & Glass",
    price: "199,990",
    mrp: "235,000",
    image: "/images/lence.png",
    compatibility: "Sony E-Mount Full-Frame",
    feature: "Constant f/2.8, 4 XD Motors, De-clickable aperture",
    badge: "ESSENTIAL GLASS"
  },
  {
    id: "acc-gimbal",
    name: "DJI RS 4 Pro 3-Axis Gimbal Stabilizer",
    category: "Stabilization",
    price: "84,990",
    mrp: "99,000",
    image: "/images/stand.png",
    compatibility: "Up to 4.5kg payload / Cinema & Mirrorless",
    feature: "LiDAR Focus Pro, Carbon fiber arms, Auto-axis locks",
    badge: "BEST STABILIZER"
  },
  {
    id: "acc-power",
    name: "FXLION NANO TWO 98Wh V-Mount Battery",
    category: "Power Systems",
    price: "18,490",
    mrp: "24,000",
    image: "/images/battery.png",
    compatibility: "Standard V-Mount / D-Tap / USB-C PD 45W",
    feature: "Airline carry-on approved, LCD percentage display",
    badge: "ALL-DAY POWER"
  },
  
 
];

const AccessoriesShowcase = ({ addToCart, addToWishlist, onSelectProduct }) => {
  const [selectedAccessoryCategory, setSelectedAccessoryCategory] = useState("All");

  const categories = ["All", "Optics & Glass", "Stabilization", "Power Systems", "Filters & Optics", "Memory & Media", "Bags & Protection"];

  const filteredItems = selectedAccessoryCategory === "All"
    ? ACCESSORIES_DATA
    : ACCESSORIES_DATA.filter((item) => item.category === selectedAccessoryCategory);

  return (
    <section className="vl-accessories-section" id="accessories">
      <div className="site-container">
        {/* Head */}
        <div className="vl-acc-head">
          <div>
            <p className="section-tag">Essential Accessories</p>
            <h2 className="section-headline">
              Complete your rig & <br />
              <span className="muted">cinema</span> setup
            </h2>
          </div>
          <p className="section-description vl-acc-desc">
            A camera body is only as powerful as the accessories powering it. Discover certified cine lenses, carbon tripods, V-Mount battery rigs, and ND filters.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="vl-acc-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`acc-tab-btn ${selectedAccessoryCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedAccessoryCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accessories Grid */}
        <div className="vl-acc-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="vl-acc-card viewfinder-card"
              onClick={() => onSelectProduct && onSelectProduct({
                ProductName: item.name,
                Category: item.category,
                Price: item.price,
                MRPprice: item.mrp,
                image: item.image,
                badge: item.badge,
                sensor: item.compatibility,
                fps: item.feature
              })}
            >
              {/* 4 Viewfinder Corner Brackets */}
              <span className="corner-bracket tl"></span>
              <span className="corner-bracket tr"></span>
              <span className="corner-bracket br"></span>
              <span className="corner-bracket bl"></span>

              <div className="acc-card-top">
                <span className="acc-badge">{item.badge}</span>
                <span className="acc-cat-chip">{item.category}</span>
              </div>

              <div className="acc-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="acc-image"
                  onError={(e) => {
                    e.target.src = "/images/Cam01.png";
                  }}
                />
              </div>

              <div className="acc-card-info">
                <h3 className="acc-title">{item.name}</h3>
                <p className="acc-compat">
                  <strong>Compatibility:</strong> {item.compatibility}
                </p>
                <p className="acc-feature">
                  <strong>Key Spec:</strong> {item.feature}
                </p>

                <div className="acc-pricing">
                  <div className="acc-price-main">
                    <span className="currency">₹</span>
                    <span className="val">{item.price}</span>
                  </div>
                  <span className="acc-mrp">MRP ₹{item.mrp}</span>
                </div>

                <div
                  className="acc-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="acc-add-cart-btn"
                    onClick={() =>
                      addToCart &&
                      addToCart({
                        _id: item.id,
                        ProductName: item.name,
                        Category: item.category,
                        Price: item.price,
                        MRPprice: item.mrp,
                        image: item.image,
                        badge: item.badge
                      })
                    }
                  >
                    <span>Add to Kit</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </button>

                  <button
                    className="acc-wishlist-btn"
                    onClick={() =>
                      addToWishlist &&
                      addToWishlist({
                        _id: item.id,
                        ProductName: item.name,
                        Price: item.price
                      })
                    }
                    title="Save to Wishlist"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle & Save Interactive Banner */}
        <div className="bundle-saver-banner">
          <div className="bundle-left">
            <span className="bundle-badge">PRO RIG BUILDER</span>
            <h3 className="bundle-title">Bundle Any Camera + 2 Accessories & Save 10%</h3>
            <p className="bundle-desc">
              Outfit your camera with essential cinema glass, high-speed CFexpress media, and V-Mount battery packs in a single order to receive our studio package discount automatically at checkout.
            </p>
          </div>
          <div className="bundle-right">
            <div className="bundle-code-chip">
              <span>Use Code:</span>
              <strong>CINEMA10</strong>
            </div>
            <a href="#cameras" className="bundle-action-btn">
              <span>Build Your Kit</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessoriesShowcase;
