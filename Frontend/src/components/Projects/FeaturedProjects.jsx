import React, { useState } from "react";
import "./FeaturedProjects.css";

const PROJECTS_DATA = [
  {
    id: "night-shift",
    title: "Night Shift",
    client: "Auriga Motors",
    category: "Commercial Film",
    year: "2026",
    duration: "02:14",
    video: "https://framerusercontent.com/assets/9gNwmqnLF1D0ucWUdIF6D9USm0.mp4",
    poster: "https://framerusercontent.com/images/r2sIkyJmYp1lg2LUDUR7ykhHlfU.webp",
    logoText: "AURIGA MOTORS",
    summary: "A high-octane midnight chase through neon-lit industrial corridors showcasing the quiet electrical power of Auriga's next-gen hypercar."
  },
  {
    id: "the-climb",
    title: "The Climb",
    client: "Vertex",
    category: "Documentary",
    year: "2026",
    duration: "04:30",
    video: "https://framerusercontent.com/assets/ffpTxFiSyMY4c9dTqhU8RnNAd20.mp4",
    poster: "https://framerusercontent.com/images/mdbyatdRB8vnSBtUl9Y7JEI.webp",
    logoText: "VERTEX OUTDOORS",
    summary: "Following solo mountaineers navigating untouched glacial faces in the northern Arctic circle. Shot on custom cinema rigs under -30°C."
  },
  {
    id: "step-into-it",
    title: "Step Into It",
    client: "Noir",
    category: "Brand Campaign",
    year: "2026",
    duration: "01:45",
    video: "https://framerusercontent.com/assets/llBvw6I5IPBSDnqRLlfOkbThPao.mp4",
    poster: "https://framerusercontent.com/images/TfNrO6VLYd2MNYbxK89dTYoNVVs.webp",
    logoText: "NOIR COUTURE",
    summary: "High-contrast editorial choreography exploring subterranean architecture, liquid light reflection, and avant-garde street silhouettes."
  },
  {
    id: "open-road",
    title: "Open Road",
    client: "Northbound",
    category: "Commercial Film",
    year: "2026",
    duration: "03:10",
    video: "https://framerusercontent.com/assets/RkE45CsEYJC5J7jDUkGITJXDNhg.mp4",
    poster: "https://framerusercontent.com/images/pOvp1xdKytqJCFRrOVwk9OHwoTU.webp",
    logoText: "NORTHBOUND",
    summary: "An expansive coastal journey capturing the spirit of unrestrained wanderlust with anamorphic lenses and golden hour sun flares."
  }
];

const FeaturedProjects = ({ onSelectProject }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="vl-projects-section" id="projects">
      <div className="site-container">
        {/* Section Head */}
        <div className="vl-projects-head">
          <p className="section-tag">Projects</p>
          <div className="vl-projects-row">
            <h2 className="section-headline">
              Projects we’re <br />
              <span className="muted">proud</span> of
            </h2>
            <p className="section-description vl-projects-desc">
              A selection of films built around ideas, crafted through details, and made to live beyond the frame.
            </p>
          </div>
        </div>

        {/* 2x2 Asymmetric Film Grid */}
        <div className="vl-projects-grid">
          {PROJECTS_DATA.map((project, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <div
                key={project.id}
                className={`vl-project-card viewfinder-card ${isWide ? "wide" : "normal"}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectProject && onSelectProject(project)}
              >
                {/* 4 Viewfinder Corner Brackets */}
                <span className="corner-bracket tl"></span>
                <span className="corner-bracket tr"></span>
                <span className="corner-bracket br"></span>
                <span className="corner-bracket bl"></span>

                {/* Looping video preview */}
                <div className="vl-card-media-wrap">
                  <video
                    src={project.video}
                    poster={project.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="vl-card-video"
                  />
                  <div className="vl-card-shade"></div>
                </div>

                {/* Camera HUD overlay */}
                <div className="hud-bar">
                  <div className="hud-top">
                    <div className="rec-badge">
                      <span className="rec-dot"></span>
                      <span>REC</span>
                    </div>
                    <div className="hud-chips">
                      <span className="hud-chip">HD</span>
                      <span className="hud-chip">4K</span>
                    </div>
                  </div>

                  <div className="hud-bottom">
                    <div className="hud-chips">
                      <span className="hud-chip">{project.category}</span>
                    </div>
                    <span className="hud-timecode">{project.duration}</span>
                  </div>
                </div>

                {/* Center Client Emblem & Reveal button */}
                <div className="vl-card-center">
                  <div className="vl-card-client-logo">
                    <span className="client-badge">{project.logoText}</span>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <div className="vl-view-project-btn">
                    <span>View Project</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
