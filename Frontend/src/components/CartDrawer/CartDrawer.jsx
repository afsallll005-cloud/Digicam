import React, { useState } from "react";
import "./CartDrawer.css";
import { getImageUrl } from "../../config/api";

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    // Parse price string (e.g. "499,990" or "499990")
    const priceNum = Number(String(item.Price || 0).replace(/,/g, "")) || 0;
    return acc + priceNum * (item.quantity || 1);
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "CINEMA10" || code === "CREATOR10") {
      setDiscountPercent(10);
      setPromoMsg("Promo applied: 10% Cinema Creator Discount!");
    } else if (code === "DIGI5") {
      setDiscountPercent(5);
      setPromoMsg("Promo applied: 5% Welcome Discount!");
    } else {
      setDiscountPercent(0);
      setPromoMsg("Invalid promo code. Try 'CINEMA10'");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const randomOrder = "DC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrder);
    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    setCheckoutComplete(false);
    onClearCart && onClearCart();
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <span className="cart-icon">🛒</span>
            <h2>YOUR CINEMA KIT</h2>
            <span className="cart-badge">{cartItems.length}</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Checkout Modal Overlay if complete */}
        {checkoutComplete ? (
          <div className="checkout-success-view">
            <div className="success-badge">✓</div>
            <h3>KIT ORDER CONFIRMED!</h3>
            <p className="order-id-tag">ORDER #{orderId}</p>
            <p className="success-desc">
              Your equipment is being inspected, calibrated, and packed into shockproof flight cases. Our logistics courier will deliver via Insured Air Express.
            </p>
            <div className="order-summary-box">
              <div className="summary-row">
                <span>Items Ordered:</span>
                <span>{cartItems.length} items</span>
              </div>
              <div className="summary-row">
                <span>Total Paid:</span>
                <span className="summary-highlight">₹{total.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Transit Insurance:</span>
                <span className="badge-free">COMPLIMENTARY</span>
              </div>
            </div>
            <button className="cart-checkout-btn" onClick={handleFinishCheckout}>
              Continue Exploring Gear
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Alert Banner */}
            <div className="cart-shipping-bar">
              <div className="shipping-icon">🚀</div>
              <p>
                <strong>FREE AIR EXPRESS SHIPPING:</strong> Fully insured with anti-shock flight cases on all camera kits.
              </p>
            </div>

            {/* Items List */}
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="cart-empty-view">
                  <div className="empty-cam-icon">📷</div>
                  <p className="empty-title">Your Cinema Kit is empty</p>
                  <p className="empty-sub">
                    Explore our cinema systems, mirrorless cameras, prime lenses, and rigging accessories to start building your setup.
                  </p>
                  <button className="cart-shop-now-btn" onClick={onClose}>
                    Explore Equipment
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => {
                  const imgSrc = getImageUrl(item.Image || item.image, "/images/Cam01.png");

                  return (
                    <div key={item._id || idx} className="cart-item-card">
                      <div className="cart-item-img-wrap">
                        <img
                          src={imgSrc}
                          alt={item.ProductName}
                          onError={(e) => {
                            e.target.src = "/images/Cam01.png";
                          }}
                        />
                      </div>

                      <div className="cart-item-details">
                        <span className="cart-item-category">
                          {item.Category || item.badge || "PRO CINEMA"}
                        </span>
                        <h4 className="cart-item-name">{item.ProductName}</h4>
                        <p className="cart-item-price">₹{item.Price}</p>

                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item,
                                  Math.max(1, (item.quantity || 1) - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity || 1}</span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item, (item.quantity || 1) + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="remove-btn"
                            onClick={() => onRemoveItem(item)}
                            title="Remove from kit"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer & Checkout Area */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. CINEMA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
                {promoMsg && (
                  <p
                    className={`promo-message ${
                      discountPercent > 0 ? "success" : "error"
                    }`}
                  >
                    {promoMsg}
                  </p>
                )}

                {/* Pricing Summary */}
                <div className="cart-summary-totals">
                  <div className="summary-line">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-line discount">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="summary-line">
                    <span>Air Express Insured Delivery:</span>
                    <span className="badge-free">FREE</span>
                  </div>

                  <div className="summary-line total-line">
                    <span>Total Estimated:</span>
                    <span className="total-val">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  className="cart-checkout-btn"
                  onClick={handleCheckout}
                >
                  <span>Proceed to Insured Checkout</span>
                  <span className="btn-arrow">→</span>
                </button>

                <p className="cart-guarantee-note">
                  🔒 256-bit Encrypted Checkout · 2-Year Official Brand Warranty Included
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
