import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

const HERO_TABS = [
  {
    id: "cinema",
    num: "01",
    label: "Cinema Systems",
    chip: "8K VV // DUAL BASE ISO // PRO RES RAW",
    headline: "Flagship Cinema Cameras & 8K Rigs",
    description: "Sony FX6, RED V-Raptor. Hollywood-level dynamic range and modular production setups in stock.",
    video: "https://framerusercontent.com/assets/1oaLaYBI2alqZpQccofkp2e8M0.mp4",
    poster: "https://framerusercontent.com/images/OKaYOkTiRAHstHkYeA2OBWBs.webp"
  },
  {
    id: "mirrorless",
    num: "02",
    label: "Pro Mirrorless",
    chip: "45MP // 8K 60P // AI SUBJECT TRACKING",
    headline: "Next-Gen Full Frame Hybrids",
    description: "Sony A7S III, Canon EOS R5 II, and Nikon Z8. Real-time AI autofocus, active cooling, and uncompressed 4K 120p.",
    video: "https://framerusercontent.com/assets/9gNwmqnLF1D0ucWUdIF6D9USm0.mp4",
    poster: "https://framerusercontent.com/images/r2sIkyJmYp1lg2LUDUR7ykhHlfU.webp"
  },
  {
    id: "cineglass",
    num: "03",
    label: "Cine Lenses & Glass",
    chip: "T1.5 CINEMA GLASS // ANAMORPHIC",
    headline: "Master Cinema Glass & Prime Lenses",
    description: "Sony G Master II, Canon RF Cine, and Sigma High-Speed Primes. De-clicked apertures with zero focus breathing.",
    video: "https://framerusercontent.com/assets/llBvw6I5IPBSDnqRLlfOkbThPao.mp4",
    poster: "https://framerusercontent.com/images/TfNrO6VLYd2MNYbxK89dTYoNVVs.webp"
  },
  {
    id: "gimbals",
    num: "04",
    label: "Gimbals & Rigs",
    chip: "4.5KG PAYLOAD // LIDAR AUTO-FOCUS",
    headline: "Precision Gimbals & Armor Rigs",
    description: "DJI Ronin RS 4 Pro, Tilta wireless follow focus, and carbon fiber matte boxes built for heavy cinema payloads.",
    video: "https://framerusercontent.com/assets/RkE45CsEYJC5J7jDUkGITJXDNhg.mp4",
    poster: "https://framerusercontent.com/images/pOvp1xdKytqJCFRrOVwk9OHwoTU.webp"
  },
  {
    id: "audio",
    num: "05",
    label: "Audio & Lights",
    chip: "32-BIT FLOAT // 98+ CRI STUDIO ILLUMINATION",
    headline: "Studio Microphones & Lighting",
    description: "Rode Wireless PRO, Sennheiser MKE 600 shotguns, and Aputure studio illumination with 98+ CRI color fidelity.",
    video: "https://framerusercontent.com/assets/1Bqep4DdtwwAIhLAf8Qo4z9h2A0.mp4",
    poster: "https://framerusercontent.com/images/1EfC19LV8WVxVZdBXyKuL7iWRps.webp"
  },
  {
    id: "storage",
    num: "06",
    label: "Power & Storage",
    chip: "1700MB/S WRITE // D-TAP V-MOUNT PACKS",
    headline: "CFexpress Media & V-Mount Packs",
    description: "Sony Tough CFexpress Type A/B, uncompressed 1700MB/s sustained write speeds, and all-day 98Wh-190Wh power.",
    video: "https://framerusercontent.com/assets/ffpTxFiSyMY4c9dTqhU8RnNAd20.mp4",
    poster: "https://framerusercontent.com/images/mdbyatdRB8vnSBtUl9Y7JEI.webp"
  }
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Auto-progress timer
  useEffect(() => {
    const duration = 6500; // 6.5s per slide
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((cur) => (cur + 1) % HERO_TABS.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setProgress(0);
  };

  const current = HERO_TABS[activeTab];


  return (
    <section className="vl-hero" id="hero">
      {/* Background Video */}
      <div className="vl-hero-media">
        <video
          key={current.video}
          ref={videoRef}
          src={current.video}
          poster={current.poster}
          autoPlay
          muted
          loop
          playsInline
          className="vl-hero-video"
        />
        <div className="vl-hero-shade-left"></div>
        <div className="vl-hero-shade-bottom"></div>
        <div className="vl-hero-grain"></div>
      </div>

      {/* Hero Content Overlay */}
      <div className="vl-hero-content site-container">
        <div className="vl-hero-headline-wrap">
          

          <h1 className="vl-hero-headline">
            {current.headline.split(" ").map((word, idx) => (
              <span key={idx} className="word-wrap">
                {word}{" "}
              </span>
            ))}
          </h1>
        </div>

        <div className="vl-hero-bottom-row">
          <div className="vl-hero-action-block">
            <div className="vl-hero-desc">
              <p>{current.description}</p>
            </div>

            <div className="vl-hero-cta-buttons">
              <a href="#cameras" className="hero-btn-primary">
                <span>Shop Cameras</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a href="#accessories" className="hero-btn-secondary">
                <span>View Accessories</span>
              </a>

            
            </div>
          </div>

          {/* Interactive Progress Tabs */}
          <div className="vl-hero-tabs">
            {HERO_TABS.map((tab, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={tab.id}
                  className={`vl-hero-tab ${isActive ? "active" : ""}`}
                  onClick={() => handleTabClick(idx)}
                >
                  <span className="tab-label">
                    <span className="tab-num">{tab.num}</span> {tab.label}
                  </span>
                  <div className="tab-track">
                    <div
                      className="tab-progress"
                      style={{
                        width: isActive ? `${progress}%` : idx < activeTab ? "100%" : "0%"
                      }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;