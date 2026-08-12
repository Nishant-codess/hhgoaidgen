import React from 'react';
import './layout.css';

interface SiteHeaderProps {
  currentView: 'landing' | 'generator';
  onNavigate: (view: 'landing' | 'generator') => void;
  onOpenVibeCheck: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentView,
  onNavigate,
  onOpenVibeCheck,
}) => {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <button
          type="button"
          className="brand-lockup"
          onClick={() => onNavigate('landing')}
          title="Hacker House Goa 2026 Home"
        >
          <img
            src="/assets/logos/Hacker house.png"
            alt="Hacker House Goa 2026"
            className="header-logo-img"
          />
          <div className="brand-titles">
            <span className="brand-main-title">HACKER HOUSE GOA</span>
            <span className="brand-sub-title">2026 · BUILDER PASS</span>
          </div>
        </button>

        {/* Header Navigation Actions */}
        <nav className="header-nav" aria-label="Main Navigation">
          {currentView === 'generator' && (
            <button
              type="button"
              className="nav-tab-btn"
              onClick={() => onNavigate('landing')}
            >
              ← HOME
            </button>
          )}

          <button
            type="button"
            className="nav-tab-btn"
            onClick={onOpenVibeCheck}
            title="Take the Builder Vibe Check"
          >
            🎯 VIBE CHECK
          </button>

          <button
            type="button"
            className="nav-create-btn"
            onClick={() => onNavigate('generator')}
          >
            {currentView === 'generator' ? '✦ PASS EDITOR' : 'CREATE PASS ✦'}
          </button>
        </nav>
      </div>
    </header>
  );
};
