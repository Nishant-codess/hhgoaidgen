import React from 'react';

export const PassportMarks: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = '',
  ...props
}) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 810 1200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    {...props}
  >
    {/* Top left corner registration marks */}
    <path d="M 20 40 L 40 40 M 30 30 L 30 50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    
    {/* Top right corner registration marks */}
    <path d="M 770 40 L 790 40 M 780 30 L 780 50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    
    {/* Bottom left corner registration marks */}
    <path d="M 20 1160 L 40 1160 M 30 1150 L 30 1170" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    
    {/* Bottom right corner registration marks */}
    <path d="M 770 1160 L 790 1160 M 780 1150 L 780 1170" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    
    {/* Vertical perforated lines along the left edge */}
    <line x1="15" y1="60" x2="15" y2="1140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" opacity="0.1" />
    
    {/* Tiny coordinates bottom center */}
    <text x="405" y="1185" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" opacity="0.3" textAnchor="middle" letterSpacing="2">
      15.2993° N, 74.1240° E
    </text>
    
    {/* Watermark stamp outline */}
    <circle cx="680" cy="900" r="40" stroke="currentColor" strokeWidth="1" opacity="0.05" strokeDasharray="2 4" />
    <text x="680" y="900" fontSize="8" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" opacity="0.05" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-15, 680, 900)">
      GOA • INDIA
    </text>
  </svg>
);
