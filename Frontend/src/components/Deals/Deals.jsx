import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl, getImageUrl } from "../../config/api";
import "./Deals.css";

const FALLBACK_DEALS = [
  {
    _id: "deal-sony-creator",
    ProductName: "Sony FX30 Cinema Line Starter Kit",
    Category: "Cinema Deal",
    MRPprice: "199,000",
    DealPrice: "164,990",
    discount: "-18% OFF",
    brand: "SONY",
    Image: "/images/SpecialPromo01.png",
    includes: "Body + XLR Handle Unit + 128GB V90 Card + Spare NP-FZ100",
    stock: "Only 4 Left"
  },
  {
    _id: "deal-canon-hybrid",
    ProductName: "Canon EOS R5 C 8K Hybrid Cinema Bundle",
    Category: "Hybrid Deal",
    MRPprice: "420,000",
    DealPrice: "349,000",
    discount: "-17% OFF",
    brand: "CANON",
    Image: "/images/SpecialPromo02.png",
    includes: "8K 60p RAW Body + RF 24-105mm f/4L IS + 512GB CFexpress B",
    stock: "Only 2 Left"
  },
  {
    _id: "deal-gopro-cine",
    ProductName: "GoPro Hero 13 Creator Edition 5.3K",
    Category: "Action & Rig",
    MRPprice: "68,000",
    DealPrice: "52,990",
    discount: "-22% OFF",
    brand: "GOPRO",
    Image: "/images/Gopro.png",
    includes: "Camera + Volta Battery Grip + Media Mod + Light Mod",
    stock: "In Stock"
  }
];

function Deals({ addToCart, onSelectProduct, onOpenTradeIn }) {
  const [deals, setDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 27,
    minutes: 44,
    seconds: 18
  });

  useEffect(() => {
    fetchDeals();

    // Live countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(getApiUrl("/getDealareas"));
      if (res.data && res.data.status && res.data.data && res.data.data.length > 0) {
        setDeals(res.data.data);
      } else {
        setDeals(FALLBACK_DEALS);
      }
    } catch (err) {
      console.log("Using curated fallback deals:", err);
      setDeals(FALLBACK_DEALS);
    }
  };

  const displayDeals = deals && deals.length > 0 ? deals : FALLBACK_DEALS;

  return (
    <section className="vl-deals-section" id="deals">
      <div className="site-container">
        {/* Header */}
        <div className="vl-deals-head">
          <div>
            <div className="deals-tag-wrap">
              <span className="rec-dot"></span>
              <p className="section-tag deals-tag">Weekly Camera Flash Drops</p>
            </div>
            <h2 className="section-headline">
              Limited time <br />
              <span className="muted">production</span> deals
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="deals-countdown-box">
            <span className="timer-label">DROP CLOSES IN:</span>
            <div className="timer-digits">
              <div className="digit-block">
                <span className="digit-val">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="digit-unit">HRS</span>
              </div>
              <span className="digit-sep">:</span>
              <div className="digit-block">
                <span className="digit-val">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="digit-unit">MIN</span>
              </div>
              <span className="digit-sep">:</span>
              <div className="digit-block">
                <span className="digit-val">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="digit-unit">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Grid */}
        <div className="vl-deals-grid">
          {displayDeals.map((item, idx) => {
            const imgSrc = getImageUrl(item.Image, "/images/SpecialPromo01.png");

            const dealPrice = item.DealPrice || item.MRPprice || "149,990";
            const originalMrp = item.MRPprice || "189,990";
            const discountTag = item.discount || "-15% OFF";

            return (
              <div
                className="vl-deal-card viewfinder-card"
                key={item._id || idx}
                onClick={() =>
                  onSelectProduct &&
                  onSelectProduct({
                    ProductName: item.ProductName,
                    Category: item.Category || "Cinema Deal",
                    Price: dealPrice,
                    MRPprice: originalMrp,
                    image: imgSrc,
                    badge: discountTag,
                    sensor: item.includes || "Complete Production Bundle"
                  })
                }
              >
                {/* 4 Corner Viewfinder Brackets */}
                <span className="corner-bracket tl"></span>
                <span className="corner-bracket tr"></span>
                <span className="corner-bracket br"></span>
                <span className="corner-bracket bl"></span>

                {/* Top Badges */}
                <div className="deal-card-hud">
                  <span className="deal-discount-badge">{discountTag}</span>
                  <span className="deal-stock-badge">{item.stock || "IN STOCK"}</span>
                </div>

                {/* Image */}
                <div className="deal-image-wrap">
                  <img
                    src={imgSrc}
                    alt={item.ProductName}
                    className="deal-image"
                    onError={(e) => {
                      e.target.src = "/images/SpecialPromo01.png";
                    }}
                  />
                  <div className="deal-gradient"></div>
                </div>

                {/* Details */}
                <div className="deal-info-panel">
                  <span className="deal-cat">{item.Category || "PRO KIT"}</span>
                  <h3 className="deal-product-title">{item.ProductName}</h3>

                  {item.includes && (
                    <p className="deal-bundle-includes">
                      <strong>Kit Includes:</strong> {item.includes}
                    </p>
                  )}

                  <div className="deal-pricing-row">
                    <div className="deal-price-box">
                      <span className="deal-price-val">₹{dealPrice}</span>
                      <span className="deal-mrp-val">MRP ₹{originalMrp}</span>
                    </div>

                    <button
                      className="deal-claim-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart &&
                          addToCart({
                            _id: item._id,
                            ProductName: item.ProductName,
                            Category: item.Category || "Deal",
                            Price: dealPrice,
                            MRPprice: originalMrp,
                            image: imgSrc,
                            badge: discountTag
                          });
                      }}
                    >
                      <span>Claim Deal</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trade-in Promo Bar */}
        <div className="trade-in-banner">
          <div className="trade-in-left">
            <span className="trade-in-chip">CAMERA TRADE-IN & UPGRADE</span>
            <h3 className="trade-in-title">
              Upgrade Your Older DSLR or Mirrorless Camera
            </h3>
            <p className="trade-in-desc">
              Get an instant valuation on your Sony, Canon, Nikon, or Fujifilm camera body with an extra ₹45,000 bonus toward any 8K or Cinema Line purchase.
            </p>
          </div>
          <button
            className="trade-in-action-btn"
            onClick={onOpenTradeIn}
          >
            <span>Calculate Trade-in Value</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Deals;