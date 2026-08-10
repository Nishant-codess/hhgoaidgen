import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const CocktailIllustration: React.FC<IconProps> = ({
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
    {/* Glass bowl */}
    <path
      d="M12 12L24 28L36 12H12Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.15"
    />
    {/* Stem & base */}
    <path d="M24 28V40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 40H32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Liquid line */}
    <path d="M15 16H33" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Umbrella / Straw */}
    <path d="M24 20L34 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M30 6L40 10L36 14" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.4" />
    {/* Lime slice circle */}
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
  </svg>
);
