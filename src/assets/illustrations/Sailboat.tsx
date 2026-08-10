import React from 'react';

export const SailboatIllustration: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = '',
  ...props
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M16 4L26 22H16V4Z"
      fill="currentColor"
      opacity="0.8"
    />
    <path
      d="M14 8L6 22H14V8Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M4 24L16 28L28 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 28L16 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
