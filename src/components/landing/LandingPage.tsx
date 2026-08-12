import React from 'react';
import { Sun, Terminal, Rocket, Sparkles, Target } from 'lucide-react';
import { GoldenSunScene } from './GoldenSunScene';
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
      {/* Background & 3D Three.js Golden Sun Layer */}
      <div className="landing-bg-layer">
        <GoldenSunScene />
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
        {/* Top-Left Animated 2:47 PM Studio Badge */}
        <a
          href="https://hhgoa.com"
          target="_blank"
          rel="noopener noreferrer"
          className="studio-badge-link"
          title="2:47 PM Studio — Hackathon Organizers"
        >
          <img
            src="/assets/logos/2-47.svg"
            alt="2:47 PM Studio"
            className="studio-badge-img"
          />
        </a>

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
              CREATE YOUR PASS <Sparkles size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
            </button>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onOpenVibeCheck}
            >
              BUILDER VIBE CHECK <Target size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
            </button>
          </div>

          {/* Event Details Subbar Pill */}
          <div className="hero-subbar-pill">
            <span>GOA, INDIA • 28 - 31 OCT 2026</span>
            <span>247 BUILDERS • 1 PARADISE</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Cards Section */}
      <section className="features-section">
        <div className="features-inner">
          <div className="features-grid">
            <div
              className="feature-glass-card"
              onClick={onNavigateToGenerator}
              role="button"
              tabIndex={0}
            >
              <div className="feature-card-icon"><Sun size={32} color="var(--brand-yellow)" /></div>
              <span className="feature-card-tag">LIGHT BEACH PASSPORT</span>
              <h3 className="feature-card-title">Tropical Passport</h3>
              <p className="feature-card-desc">
                Warm palm visuals, vintage boarding stamps, custom serial numbers, and 2160×2700 4K PNG export.
              </p>
            </div>

            <div
              className="feature-glass-card"
              onClick={onNavigateToGenerator}
              role="button"
              tabIndex={0}
            >
              <div className="feature-card-icon"><Terminal size={32} color="var(--brand-pink)" /></div>
              <span className="feature-card-tag">NEON CYBERPUNK</span>
              <h3 className="feature-card-title">Hacker Terminal</h3>
              <p className="feature-card-desc">
                Dark cyberpunk aesthetic, matrix grid, neon green highlights, and instant PDF print ready layout.
              </p>
            </div>

            <div
              className="feature-glass-card"
              onClick={onNavigateToGenerator}
              role="button"
              tabIndex={0}
            >
              <div className="feature-card-icon"><Rocket size={32} color="var(--brand-yellow)" /></div>
              <span className="feature-card-tag">INSTANT SOCIAL SHARE</span>
              <h3 className="feature-card-title">Share #FrameInGoa</h3>
              <p className="feature-card-desc">
                One-tap sharing directly to X (Twitter) with pre-filled event tags and automatic high-res preview attachment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Strip */}

      <section className="about-strip">
        <div className="about-inner">
          <div className="about-grid">
            <div className="about-img-card">
              <img
                src="/assets/decorations/beach_hut.png"
                alt="Hacker House Beach Hut"
                className="about-img"
              />
            </div>
            <div className="about-text">
              <div className="about-label">OFFICIAL EVENT PASS ENGINE</div>
              <h2 className="about-heading">Your Ticket to Paradise</h2>
              <p className="about-desc">
                Hacker House Goa 2026 — <strong>247 builders</strong>. 4 days. Private
                beach resort in Goa, India. Oct 28–31, 2026. Less noise. More ships.
              </p>
              <p className="about-desc">
                Generate your custom pass, export in 4K, and post on X with{' '}
                <strong>#FrameInGoa</strong> to get tracked on the Radar.
              </p>
              <div className="about-stats-row">
                <div className="stat-item">
                  <span className="stat-num">247</span>
                  <span className="stat-lbl">Builders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">4</span>
                  <span className="stat-lbl">Days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">20K+</span>
                  <span className="stat-lbl">Applicants</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">1</span>
                  <span className="stat-lbl">Paradise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signpost CTA Section */}
      <section className="signpost-strip">
        <div className="signpost-inner">
          <img
            src="/assets/decorations/signpost.png"
            alt="Goa Beach Signpost"
            className="signpost-img"
          />
          <div className="signpost-cta-content">
            <h3 className="signpost-title">Ready to Board?</h3>
            <p className="signpost-desc">
              Upload your photo and generate your unique HH Goa 2026 pass in seconds.
            </p>
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onNavigateToGenerator}
            >
              GENERATE MY PASS →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

