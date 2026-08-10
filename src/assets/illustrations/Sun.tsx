import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const SunIllustration: React.FC<IconProps> = ({
  size = 40,
  color = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="24" r="6" fill={color} opacity="0.3" />
    
    {/* Sun Rays */}
    <path d="M24 6V2" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 46V42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M6 24H2" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M46 24H42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M11.3 11.3L8.5 8.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M39.5 39.5L36.7 36.7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M11.3 36.7L8.5 39.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M39.5 8.5L36.7 11.3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
