import React from 'react';

interface TeladuLogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  size?: number;
}

/**
 * Official Teladu Brand Logo
 * Features the signature electric blue rounded icon with the white smiling waving hand
 * and the lowercase rounded 'teladu' wordmark.
 */
export const TeladuIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => {
  const reactId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const blueGradId = `teladu-blue-${reactId}`;
  const sheenGradId = `teladu-sheen-${reactId}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 56, 255, 0.4))' }}
    >
      <defs>
        {/* Rich Electric Blue Gradient with glassy top highlight */}
        <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e5aff" />
          <stop offset="50%" stopColor="#0038ff" />
          <stop offset="100%" stopColor="#0025c8" />
        </linearGradient>
        <linearGradient id={sheenGradId} x1="0%" y1="0%" x2="70%" y2="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base Solid Electric Blue Tile (Guarantees blue color under all browser conditions) */}
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="46"
        fill="#0038ff"
      />

      {/* Rounded Blue Tile with Gradient */}
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="46"
        fill={`url(#${blueGradId})`}
      />

      {/* Glass Top Highlight Arc */}
      <path
        d="M 10 56 Q 10 10 56 10 L 144 10 Q 170 10 178 28 C 130 38 70 80 50 140 Q 10 120 10 56 Z"
        fill={`url(#${sheenGradId})`}
      />

      {/* White Smiling Waving Hand */}
      <g fill="#ffffff">
        {/* Thumb */}
        <path d="M 64 96 C 56 94 48 102 52 112 C 58 126 68 138 80 146 C 88 152 102 152 114 148 C 126 142 134 130 138 116 C 142 104 136 94 126 94 C 118 94 116 102 114 108 C 112 114 108 122 100 124 C 92 126 86 122 82 116 C 78 110 76 100 64 96 Z" />

        {/* Index Finger */}
        <rect x="74" y="54" width="16" height="54" rx="8" />

        {/* Middle Finger (tallest) */}
        <rect x="94" y="44" width="16" height="66" rx="8" />

        {/* Ring Finger */}
        <rect x="114" y="52" width="16" height="58" rx="8" />

        {/* Pinky Finger */}
        <rect x="134" y="66" width="15" height="44" rx="7.5" />

        {/* Thumb left protrusion */}
        <path d="M 60 90 C 50 90 42 102 50 114 C 56 124 66 130 76 130 C 80 122 80 110 76 100 C 72 92 66 90 60 90 Z" />

        {/* The Smile on the palm */}
        <path
          d="M 86 122 C 92 130 106 130 114 122"
          stroke="#0038ff"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Wireless / Wave Signals next to pinky */}
        <path
          d="M 148 54 C 158 58 164 68 166 78"
          stroke="#ffffff"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 154 42 C 168 48 178 60 180 74"
          stroke="#ffffff"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

export const TeladuLogo: React.FC<TeladuLogoProps> = ({
  className = '',
  showText = true,
  textColor = 'text-white',
  size = 32,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <TeladuIcon size={size} />
      {showText && (
        <span
          className={`font-sans font-extrabold tracking-tight ${textColor}`}
          style={{
            fontSize: `${size * 0.85}px`,
            letterSpacing: '-0.03em',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
        >
          teladu
        </span>
      )}
    </div>
  );
};

export default TeladuLogo;
