import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const WaveIllustration: React.FC<IconProps> = ({
  size = 64,
  color = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={typeof size === 'number' ? size / 2 : 'auto'}
    viewBox="0 0 120 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M0 12C15 12 20 4 35 4C50 4 55 12 70 12C85 12 90 4 105 4C115 4 120 8 120 8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M0 24C15 24 20 16 35 16C50 16 55 24 70 24C85 24 90 16 105 16C115 16 120 20 120 20"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);
