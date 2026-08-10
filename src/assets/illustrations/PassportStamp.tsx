import React from 'react';

interface StampProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  text?: string;
  subtext?: string;
  date?: string;
}

export const PassportStampIllustration: React.FC<StampProps> = ({
  size = 90,
  color = '#9E3540',
  text = 'BUILD IN GOA',
  subtext = 'ARRIVED OCT 2026',
  date = '28.10.2026',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Outer dotted stamp circle */}
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 3"
      opacity="0.85"
    />
    {/* Inner solid border */}
    <circle cx="50" cy="50" r="39" stroke={color} strokeWidth="1.5" />
    
    {/* Star icons */}
    <path
      d="M50 16L51.5 19.5L55 20L52.5 22.5L53 26L50 24L47 26L47.5 22.5L45 20L48.5 19.5L50 16Z"
      fill={color}
    />
    
    {/* Main Curved / Straight Text */}
    <text
      x="50"
      y="38"
      fill={color}
      fontSize="7.5"
      fontFamily="Space Mono, monospace"
      fontWeight="bold"
      textAnchor="middle"
      letterSpacing="1"
    >
      {text}
    </text>

    {/* Center Divider line */}
    <line x1="22" y1="44" x2="78" y2="44" stroke={color} strokeWidth="1" />

    {/* Date */}
    <text
      x="50"
      y="55"
      fill={color}
      fontSize="10"
      fontFamily="Space Mono, monospace"
      fontWeight="700"
      textAnchor="middle"
      letterSpacing="1.5"
    >
      {date}
    </text>

    <line x1="22" y1="60" x2="78" y2="60" stroke={color} strokeWidth="1" />

    {/* Subtext */}
    <text
      x="50"
      y="72"
      fill={color}
      fontSize="6.5"
      fontFamily="Space Mono, monospace"
      fontWeight="bold"
      textAnchor="middle"
      letterSpacing="0.8"
    >
      {subtext}
    </text>

    {/* Small palm tree icon in bottom */}
    <path
      d="M50 84C49 81 50 78 50 78M50 78C47 76 44 77 43 78M50 78C53 76 56 77 57 78M50 78C48 76 47 73 47 72M50 78C52 76 53 73 53 72"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
