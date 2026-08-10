import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const SurfboardIllustration: React.FC<IconProps> = ({
  size = 40,
  color = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Surfboard body */}
    <path
      d="M16 2C8 16 6 36 10 58C14 62 18 62 22 58C26 36 24 16 16 2Z"
      stroke={color}
      strokeWidth="2"
      fill={color}
      fillOpacity="0.1"
    />
    {/* Stripe */}
    <path
      d="M16 4V59"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    <path
      d="M9 30C13 32 19 32 23 30"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);
