import React, { useState, useMemo } from "react";
import { getImageUrl } from "../../config/api";
import "./Gear.css";

// Comprehensive catalog of real cinema cameras, mirrorless bodies, cine lenses, and accessories
const FALLBACK_GEAR = [
  {
    _id: "fx6",
    ProductName: "Sony FX6 Cinema Line Full-Frame Camera",
    Category: "Cinema Cameras",
    Price: "499,990",
    MRPprice: "599,000",
    brand: "SONY",
    sensor: "35mm Full-Frame 4K",
    fps: "4K 120p / FHD 240p",
    iso: "Dual Base ISO 800/12800",
    dynamicRange: "15+ Stops",
    badge: "TOP SELLER",
    image: "./images/cam1.jpg",
    specs: {
      mount: "Sony E-Mount",
      shutter: "Electronic Variable ND (1/4 to 1/128)",
      codecs: "XAVC-I 422 10-bit / RAW 16-bit output",
      weight: "890g (Body only)",
      audio: "Dual XLR Inputs with 4-ch 24-bit recording"
    }
  },
  {
    _id: "red-raptor",
    ProductName: "RED V-RAPTOR 8K VV Cinema System",
    Category: "Cinema Cameras",
    Price: "2,199,000",
    MRPprice: "2,450,000",
    brand: "RED DIGITAL",
    sensor: "Multi-Format 8K VV 35.4MP",
    fps: "8K 120fps / 2K 600fps",
    iso: "Dual ISO Native",
    dynamicRange: "17+ Stops REDCODE",
    badge: "HOLLYWOOD FLAGSHIP",
    image: "./images/cam4.jpg",
    specs: {
      mount: "RF Mount with Locking Ring",
      shutter: "Rolling Shutter ultra-low distortion",
      codecs: "REDCODE RAW HQ/MQ/LQ",
      weight: "1,820g",
      audio: "Integrated Dual Mic & 5-pin Audio input"
    }
  },
  {
    _id: "c70",
    ProductName: "Canon Cinema EOS C70 4K Camera",
    Category: "Cinema Cameras",
    Price: "389,000",
    MRPprice: "449,000",
    brand: "CANON",
    sensor: "Super 35mm DGO Dual Gain",
    fps: "4K 120p / 2K 180p",
    iso: "16+ Stops DGO Sensor",
    dynamicRange: "16+ Stops",
    badge: "WORKHORSE",
    image: "./images/cam3.jpg",
    specs: {
      mount: "Canon RF Mount",
      shutter: "Motorized Built-in ND (2, 4, 6, 8, 10 stops)",
      codecs: "XF-AVC 4:2:2 10-bit Intra / Long GOP",
      weight: "1,170g",
      audio: "2x Mini-XLR Terminals"
    }
  },
  {
    _id: "a7s3",
    ProductName: "Sony Alpha A7S III 4K 120p Mirrorless",
    Category: "Mirrorless",
    Price: "299,990",
    MRPprice: "349,990",
    brand: "SONY",
    sensor: "12.1MP Full-Frame Exmor R",
    fps: "4K 120p 10-bit 4:2:2",
    iso: "ISO 40 to 409,600",
    dynamicRange: "15+ Stops S-Log3",
    badge: "LOW-LIGHT KING",
    image: "./images/cam2.jpg",
    specs: {
      mount: "Sony E-Mount",
      shutter: "Mechanical / Silent Electronic",
      codecs: "XAVC S, S-I, HS 4:2:2 10-bit",
      weight: "614g",
      audio: "3.5mm Mic & Headphone / Digital Shoe"
    }
  },
  
];

const CATEGORIES = [
  "All Gear",
  "Cinema Cameras",
  "Mirrorless",
  "Cine Lenses",
  "Gimbals & Rigs",
  "Power & Audio"
];

const Gear = ({
  products = [],
  addToCart,
  addToWishlist,
  onSelectProduct,
  activeFilter,
  searchQuery = ""
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Gear");
  const [sortBy, setSortBy] = useState("featured");

  // Merge backend products with fallback data
  const allGear = useMemo(() => {
    if (products && products.length > 0) {
      // Format backend products to match
      const formattedBackend = products.map((p) => ({
        ...p,
        Category: p.Category || "Cinema Cameras",
        Price: p.Price || "299,000",
        sensor: p.sensor || "4K Super 35 Sensor",
        fps: p.fps || "4K 60fps",
        badge: p.badge || "IN STOCK"
      }));
      return [...formattedBackend, ...FALLBACK_GEAR];
    }
    return FALLBACK_GEAR;
  }, [products]);

  // Filter products by category & search query
  const filteredGear = useMemo(() => {
    return allGear.filter((item) => {
      // Category check
      const matchesCategory =
        selectedCategory === "All Gear" ||
        item.Category?.toLowerCase() === selectedCategory.toLowerCase();

      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.ProductName?.toLowerCase().includes(q) ||
        item.Category?.toLowerCase().includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.sensor?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const priceA = Number(String(a.Price || 0).replace(/,/g, "")) || 0;
      const priceB = Number(String(b.Price || 0).replace(/,/g, "")) || 0;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return 0; // featured default
    });
  }, [allGear, selectedCategory, searchQuery, sortBy]);

  return (
    <section className="vl-gear-section" id="cameras">
      <div className="site-container">
        {/* Head */}
        <div className="vl-gear-head">
          <p className="section-tag">Pro Gear Store</p>
          <div className="vl-gear-row">
            <div>
              <h2 className="section-headline">
                Cinema Systems & <br />
                <span className="muted">Pro Optical</span> Cameras
              </h2>
            </div>
            <p className="section-description vl-gear-desc">
              Every camera, prime lens, and cinema rig we offer is authorized, certified, and ready for commercial sets. Fully backed by official 2-year brand warranties.
            </p>
          </div>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="vl-gear-filter-bar">
          <div className="vl-gear-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gear-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="vl-gear-sort-box">
            <span className="sort-label">Sort:</span>
            <select
              className="gear-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured Equipment</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="vl-gear-results-count">
          <span>Showing {filteredGear.length} professional systems</span>
          {searchQuery && <span className="search-tag">matching "{searchQuery}"</span>}
        </div>

        {/* Gear Grid */}
        <div className="vl-gear-grid">
          {filteredGear.length > 0 ? (
            filteredGear.map((item, idx) => {
              const imgSrc = getImageUrl(item.Image || item.image, "/images/Cam01.png");

              // Price & Discount calculations
              const priceNum = Number(String(item.Price || 0).replace(/,/g, "")) || 0;
              const mrpNum = Number(String(item.MRPprice || 0).replace(/,/g, "")) || priceNum * 1.15;
              const savings = Math.max(0, mrpNum - priceNum);

              return (
                <div
                  key={item._id || idx}
                  className="vl-gear-card viewfinder-card"
                  onClick={() => onSelectProduct && onSelectProduct(item)}
                >
                  {/* 4 Viewfinder Corner Brackets */}
                  <span className="corner-bracket tl"></span>
                  <span className="corner-bracket tr"></span>
                  <span className="corner-bracket br"></span>
                  <span className="corner-bracket bl"></span>

                  {/* HUD Top Bar */}
                  <div className="hud-bar">
                    <div className="hud-top">
                      <span className="gear-badge">{item.badge || "PRO CINEMA"}</span>
                      <span className="hud-chip">{item.brand || "OFFICIAL"}</span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="vl-gear-image-wrap">
                    <img
                      src={imgSrc}
                      alt={item.ProductName}
                      className="vl-gear-image"
                      onError={(e) => {
                        e.target.src = "/images/Cam01.png";
                      }}
                    />
                    <div className="vl-gear-gradient"></div>

                    {/* Quick Specs Overlay on Hover */}
                    <button
                      className="quick-specs-hover-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct && onSelectProduct(item);
                      }}
                    >
                      <span>Quick Tech Specs</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="vl-gear-info">
                    <div className="vl-gear-meta">
                      <span className="gear-tag">{item.sensor || "Full-Frame"}</span>
                      <span className="gear-fps">{item.fps || "4K 120P"}</span>
                    </div>

                    <h3 className="vl-gear-name">{item.ProductName}</h3>

                    {/* Pricing */}
                    <div className="vl-price-wrap">
                      <div className="price-main">
                        <span className="currency">₹</span>
                        <span className="val">{item.Price}</span>
                      </div>
                      {item.MRPprice && (
                        <div className="mrp-strikethrough">
                          <span>MRP ₹{item.MRPprice}</span>
                          {savings > 0 && (
                            <span className="save-badge">SAVE ₹{savings.toLocaleString()}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div
                      className="vl-gear-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="vl-add-cart-btn"
                        onClick={() => addToCart && addToCart(item)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <span>Add to Kit</span>
                      </button>

                      <button
                        className="vl-wishlist-btn"
                        onClick={() => addToWishlist && addToWishlist(item)}
                        title="Save to Wishlist"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="vl-no-gear-found">
              <p>No gear matched your filter or search query.</p>
              <button
                className="reset-filter-btn"
                onClick={() => setSelectedCategory("All Gear")}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gear;
