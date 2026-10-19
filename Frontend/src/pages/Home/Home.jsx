import React, { useEffect, useState } from "react";
import axios from "axios";

// DIGICAM Store Components
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Accesseries from "../../components/Accesseries/Accesseries";
import Gear from "../../components/Gear/Gear";
import AccessoriesShowcase from "../../components/AccessoriesShowcase/AccessoriesShowcase";
import Deals from "../../components/Deals/Deals";
import EveryFrame from "../../components/EveryFrame/EveryFrame";
import Brands from "../../components/Brands/Brands";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import ProjectModal from "../../components/Modals/ProjectModal";
import ContactModal from "../../components/Modals/ContactModal";

import { getApiUrl } from "../../config/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInitialType, setContactInitialType] = useState("Rig Consultation");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Persistent Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("digicam_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Wishlist state
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem("digicam_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("digicam_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("digicam_wishlist", JSON.stringify(wishlistItems));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [wishlistItems]);

  useEffect(() => {
    // Attempt fetching products from backend
    axios
      .get(getApiUrl("/listProduct"))
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Backend offline or empty, using curated gear catalog:", err);
      });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Add to Cart / Kit handler
  const addToCart = (item) => {
    const itemId = item._id || item.ProductName;
    setCartItems((prev) => {
      const exists = prev.find(
        (i) => (i._id || i.ProductName) === itemId
      );
      if (exists) {
        return prev.map((i) =>
          (i._id || i.ProductName) === itemId
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.ProductName}" to your Cinema Kit.`);
  };

  const handleUpdateQuantity = (item, newQty) => {
    const itemId = item._id || item.ProductName;
    setCartItems((prev) =>
      prev.map((i) =>
        (i._id || i.ProductName) === itemId ? { ...i, quantity: newQty } : i
      )
    );
  };

  const handleRemoveItem = (item) => {
    const itemId = item._id || item.ProductName;
    setCartItems((prev) =>
      prev.filter((i) => (i._id || i.ProductName) !== itemId)
    );
    showToast(`Removed from kit.`);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist handler
  const addToWishlist = (item) => {
    const itemId = item._id || item.ProductName;
    setWishlistItems((prev) => {
      const exists = prev.find(
        (i) => (i._id || i.ProductName) === itemId
      );
      if (exists) {
        showToast(`Removed "${item.ProductName}" from Wishlist.`);
        return prev.filter((i) => (i._id || i.ProductName) !== itemId);
      }
      showToast(`Saved "${item.ProductName}" to Wishlist.`);
      return [...prev, item];
    });
  };

  const handleCategorySelect = (categoryId) => {
    // Scroll smoothly to cameras catalog
    const el = document.getElementById("cameras");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenTradeIn = () => {
    setContactInitialType("Trade-In Appraisal");
    setIsContactOpen(true);
  };

  return (
    <div className="videolab-app">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="digicam-toast">
          <span className="toast-dot"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Frosted Glass Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          if (wishlistItems.length === 0) {
            showToast("Your wishlist is currently empty. Click the heart on any camera to save.");
          } else {
            showToast(`You have ${wishlistItems.length} items saved in your gear wishlist.`);
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <Hero />
        <Accesseries
          onSelectCategory={handleCategorySelect}
        />

        <Gear
          products={products}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
          searchQuery={searchQuery}
        />

        <AccessoriesShowcase
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        <Deals
          addToCart={addToCart}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenTradeIn={handleOpenTradeIn}
        />

        <EveryFrame />



       

        {/* 12. Authorized Brand Partners Marquee */}
        <Brands />

        {/* 13. Call to Action / Rig Consultation */}
        <CTA
          onOpenContact={() => {
            setContactInitialType("Rig Consultation");
            setIsContactOpen(true);
          }}
        />
      </main>

      {/* 14. Massive Illuminated Wordmark Footer */}
      <Footer />

      {/* 15. Cart / Cinema Kit Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 16. Technical Specs & Quick View Modal */}
      {selectedProduct && (
        <ProjectModal
          project={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* 17. Gear Consultation & Trade-In Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialType={contactInitialType}
      />
    </div>
  );
}

export default Home;