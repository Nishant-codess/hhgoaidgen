import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const PalmIllustration: React.FC<IconProps> = ({
  size = 48,
  color = 'currentColor',
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Trunk */}
    <path
      d="M30 60C30 60 33 46 31 32C29.5 21.5 33 16 33 16"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M33 60C33 60 36 46 34 32C33 27 34 20 34 20"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
    {/* Fronds */}
    {/* Top left */}
    <path
      d="M32 18C24 14 14 15 8 20C14 21 24 20 32 18Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M32 18C20 10 12 6 5 10C10 13 22 15 32 18Z"
      fill={color}
    />
    {/* Top Right */}
    <path
      d="M32 18C40 14 50 15 56 20C50 21 40 20 32 18Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M32 18C44 10 52 6 59 10C54 13 42 15 32 18Z"
      fill={color}
    />
    {/* Mid left */}
    <path
      d="M32 18C22 22 13 28 8 36C14 34 24 28 32 18Z"
      fill={color}
    />
    {/* Mid right */}
    <path
      d="M32 18C42 22 51 28 56 36C50 34 40 28 32 18Z"
      fill={color}
    />
    {/* Coconuts */}
    <circle cx="30" cy="20" r="2.5" fill={color} />
    <circle cx="34" cy="20" r="2.5" fill={color} />
    <circle cx="32" cy="22" r="2" fill={color} />
  </svg>
);
