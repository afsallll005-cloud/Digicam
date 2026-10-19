import React from "react";
import "./ProjectModal.css";
import { getImageUrl } from "../../config/api";

const ProjectModal = ({ project, onClose, onAddToCart }) => {
  if (!project) return null;

  const imgSrc = getImageUrl(project.Image || project.image, "/images/Cam01.png");

  const specs = project.specs || {
    mount: "Universal Pro Mount / Cine Standard",
    shutter: "Electronic & Mechanical High-Speed",
    codecs: "ProRes RAW / 10-bit 4:2:2 All-Intra",
    weight: "920g (Body only)",
    audio: "Dual XLR / 3.5mm Mic & Headphone Terminals"
  };

  return (
    <div className="vl-modal-backdrop" onClick={onClose}>
      <div
        className="vl-modal-box viewfinder-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 4 Viewfinder Corner Brackets */}
        <span className="corner-bracket tl"></span>
        <span className="corner-bracket tr"></span>
        <span className="corner-bracket br"></span>
        <span className="corner-bracket bl"></span>

        {/* Modal Close Button */}
        <button className="vl-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="vl-spec-modal-layout">
          {/* Left Media Column */}
          <div className="vl-spec-media-col">
            <div className="vl-spec-img-wrap">
              <img
                src={imgSrc}
                alt={project.ProductName || project.title}
                className="vl-spec-img"
                onError={(e) => {
                  e.target.src = "/images/Cam01.png";
                }}
              />
              <span className="vl-spec-badge">
                {project.badge || "OFFICIAL DEALER"}
              </span>
            </div>

            {/* In the box list */}
            <div className="vl-spec-box-list">
              <h4 className="box-list-title">What's in the Box:</h4>
              <ul>
                <li>✓ Camera / Optical Body Unit</li>
                <li>✓ Rechargeable High-Capacity Battery Pack</li>
                <li>✓ AC Fast Charger with Power Cord</li>
                <li>✓ Heavy-Duty Body Cap & Shoulder Strap</li>
                <li>✓ Shockproof Hard Shell Flight Case</li>
                <li>✓ 2-Year Official Brand Warranty Card</li>
              </ul>
            </div>
          </div>

          {/* Right Details & Specs Column */}
          <div className="vl-spec-info-col">
            <div className="vl-modal-header">
              <div>
                <span className="vl-modal-client">
                  {project.brand || "DIGICAM CERTIFIED"} // {project.Category || "CINEMA RIG"}
                </span>
                <h2 className="vl-modal-title">
                  {project.ProductName || project.title}
                </h2>
              </div>
            </div>

            {/* Price Row */}
            <div className="vl-spec-pricing">
              <div className="spec-price-main">
                <span className="currency">₹</span>
                <span className="val">{project.Price || "299,000"}</span>
              </div>
              {project.MRPprice && (
                <span className="spec-mrp">MRP ₹{project.MRPprice}</span>
              )}
              <span className="spec-stock-status">● IN STOCK - SHIPS TODAY</span>
            </div>

            <p className="vl-modal-summary">
              {project.Description ||
                project.summary ||
                "Authorized cinema optical system. Full dynamic range color science, ultra-low rolling shutter distortion, dual base ISO, and uncompressed RAW recording capability for commercial broadcast sets."}
            </p>

            {/* Technical Specs Grid */}
            <div className="vl-modal-specs">
              <div className="spec-item">
                <span className="spec-label">SENSOR / FORMAT</span>
                <span className="spec-val">
                  {project.sensor || "35mm Full-Frame 4K/8K"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">MAX FRAME RATES</span>
                <span className="spec-val">
                  {project.fps || "4K 120p / 8K 60p"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">LENS MOUNT</span>
                <span className="spec-val">{specs.mount}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">DYNAMIC RANGE</span>
                <span className="spec-val">
                  {project.dynamicRange || "15+ Stops"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">CODECS / RECORDING</span>
                <span className="spec-val">{specs.codecs}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">WEIGHT (BODY)</span>
                <span className="spec-val">{specs.weight}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">AUDIO I/O</span>
                <span className="spec-val">{specs.audio}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">SHUTTER / ND</span>
                <span className="spec-val">{specs.shutter}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="vl-spec-actions">
              <button
                className="spec-add-kit-btn"
                onClick={() => {
                  onAddToCart && onAddToCart(project);
                  onClose();
                }}
              >
                <span>Add to Cinema Kit</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>

              <button className="spec-close-secondary" onClick={onClose}>
                Back to Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
