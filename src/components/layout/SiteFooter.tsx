import React from 'react';
import './layout.css';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">HACKER HOUSE GOA 2026</div>

        <div className="footer-links">
          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-item"
          >
            hhgoa.com
          </a>
          <span className="footer-bullet">•</span>
          <span>Oct 28–31, 2026</span>
          <span className="footer-bullet">•</span>
          <span>Goa, India</span>
          <span className="footer-bullet">•</span>
          <span style={{ color: 'var(--brand-yellow)', fontWeight: 700 }}>
            #FrameInGoa
          </span>
        </div>

        <div className="footer-team-credit">
          Built with 🦈 by <strong>GOA SHARK DOO DOO</strong> for HH Goa 2026
        </div>
      </div>
    </footer>
  );
};
