import React from 'react';

/**
 * PlaceholderImage Component
 * Displays a SVG placeholder when product image fails to load
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @param {string} className - Additional CSS classes
 */
const PlaceholderImage = ({ width = 200, height = 200, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="placeholderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#DCC5E6', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#FFD7E0', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={width} height={height} fill="url(#placeholderGradient)" />

      {/* Image icon */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {/* Picture frame */}
        <rect x={-35} y={-30} width={70} height={60} fill="none" stroke="#B8A5D0" strokeWidth="2" />

        {/* Circle (representing image) */}
        <circle cx={-15} cy={-10} r={12} fill="#DCC5E6" opacity="0.6" />

        {/* Mountains (representing landscape) */}
        <path d="M -30 15 L -15 0 L 0 10 L 15 -5 L 30 15" fill="none" stroke="#FFB3C6" strokeWidth="2" />

        {/* Text */}
        <text y={35} textAnchor="middle" fontSize="12" fill="#9A9A9A" fontFamily="Arial, sans-serif">
          No Image
        </text>
      </g>
    </svg>
  );
};

export default PlaceholderImage;
