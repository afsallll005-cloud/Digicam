import React, { useState } from "react";
import "./ContactModal.css";

const ContactModal = ({ isOpen, onClose, initialType = "Rig Consultation" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: initialType,
    gearModel: "",
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="vl-modal-backdrop" onClick={onClose}>
      <div className="vl-contact-modal-box viewfinder-card" onClick={(e) => e.stopPropagation()}>
        {/* 4 Viewfinder Corner Brackets */}
        <span className="corner-bracket tl"></span>
        <span className="corner-bracket tr"></span>
        <span className="corner-bracket br"></span>
        <span className="corner-bracket bl"></span>

        <button className="vl-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {submitted ? (
          <div className="vl-contact-success">
            <div className="success-icon">✦</div>
            <h3 className="success-title">CONSULTATION BRIEF RECEIVED</h3>
            <p className="success-text">
              Our camera technician will review your equipment specs, calculate trade-in value, and contact you within 2 business hours.
            </p>
          </div>
        ) : (
          <div className="vl-contact-inner">
            <div className="vl-contact-header">
              <span className="vl-contact-sub">GEAR CONCIERGE</span>
              <h2 className="vl-contact-title">Build the rig tailored to your set.</h2>
              <p className="vl-contact-desc">
                Talk directly with our technical camera specialists or email us at{" "}
                <a href="mailto:gear@digicam.store" className="contact-link">
                  gear@digicam.store
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="vl-contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label>YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="maus@cinema.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>PHONE NUMBER (FOR FAST TECH CALLBACK)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>INQUIRY TYPE</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  >
                    <option value="Rig Consultation">Custom Cinema Rig & Cage Assembly</option>
                    <option value="Trade-In Appraisal">Camera Trade-In & Upgrade Appraisal</option>
                    <option value="Lens Matching">Lens Matching & Optical Advice</option>
                    <option value="Studio Bulk Order">Studio & School Bulk Procurement</option>
                    <option value="Try Before Buy">48-Hour Field Trial Request</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>CAMERA BODY OR GEAR INTERESTED IN</label>
                <input
                  type="text"
                  placeholder="e.g. Sony FX6, RED V-Raptor, DJI RS 4 Pro, G Master primes..."
                  value={formData.gearModel}
                  onChange={(e) => setFormData({ ...formData, gearModel: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label>PROJECT REQUIREMENTS & TIMELINE</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your upcoming shoot, desired deliverables, mounting preferences, or older gear you want to trade in..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="vl-submit-btn">
                <span>Submit Gear Inquiry</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
