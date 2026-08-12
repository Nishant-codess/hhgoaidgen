import React from 'react';
import './landing.css';

interface LandingPageProps {
  onNavigateToGenerator: () => void;
  onOpenVibeCheck: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToGenerator,
  onOpenVibeCheck,
}) => {
  return (
    <div className="landing-container">
      {/* Background & Ambient Orbs */}
      <div className="landing-bg-layer">
        <img
          src="/assets/decorations/beach_bg.png"
          alt=""
          className="hero-bg-img-fallback"
          aria-hidden="true"
        />
        <div className="hero-gradient-overlay" />
        <div className="ambient-orb orb-top-left" />
        <div className="ambient-orb orb-bottom-right" />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-inner">
          {/* Eyebrow Pill */}
          <div className="hero-eyebrow-badge">
            <span className="eyebrow-dot" />
            LIVE NOW · OCT 2026 · #FrameInGoa
          </div>

          {/* Glowing Graphic Title */}
          <div className="hero-title-box">
            <img
              src="/assets/logos/Hacker house.png"
              alt="HACKER HOUSE GOA"
              className="hero-logo-img"
            />
            <div className="hero-goa-stamp-wrap">
              <img
                src="/assets/logos/goa_hindi.svg"
                alt="गोवा"
                className="hero-goa-stamp-img"
              />
            </div>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Drop your photo. Personalize your pass. Post on X with{' '}
            <strong>#FrameInGoa</strong> and claim your spot in paradise.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onNavigateToGenerator}
            >
              CREATE YOUR PASS ✦
            </button>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onOpenVibeCheck}
            >
              BUILDER VIBE CHECK 🎯
            </button>
          </div>

          {/* Event Details Subbar Pill */}
          <div className="hero-subbar-pill">
            <span>GOA, INDIA • 28 - 31 OCT 2026</span>
            <span>247 BUILDERS • 1 PARADISE</span>
          </div>
        </div>
      </section>
    </div>
  );
};
