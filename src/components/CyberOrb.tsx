import React from 'react';

interface CyberOrbProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  pulsing?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CyberOrb: React.FC<CyberOrbProps> = ({
  size = 'md',
  pulsing = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const ringSizes = {
    xs: 'scale-90',
    sm: 'scale-95',
    md: 'scale-100',
    lg: 'scale-110',
    xl: 'scale-125',
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-md" />
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-teal-400/30 blur-lg animate-pulse" />

      {/* SVG Multi-Ring Gyroscope / Orb */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full relative z-10 ${ringSizes[size]}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="ringCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#ringCyan)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="opacity-70 animate-spin-slow origin-center"
        />

        {/* Outer Golden Accented Orbit */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="22"
          stroke="url(#ringGold)"
          strokeWidth="1.8"
          transform="rotate(-25 50 50)"
          className="opacity-80 animate-spin-reverse origin-center"
        />

        {/* Inner Counter-Rotating Cyan Gyro Ellipse */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="18"
          stroke="url(#ringCyan)"
          strokeWidth="1.8"
          transform="rotate(45 50 50)"
          className="opacity-90 animate-spin-slow origin-center"
        />

        {/* Vertical Stabilizer Axis Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="18"
          ry="40"
          stroke="#67e8f9"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          className="opacity-60"
        />

        {/* Core Electric Energy Sphere */}
        <circle
          cx="50"
          cy="50"
          r="16"
          fill="url(#coreGlow)"
          className={pulsing ? 'animate-pulse' : ''}
        />

        {/* High Energy Sparkle Points */}
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" className="animate-ping" style={{ animationDuration: '2.5s' }} />
        <circle cx="50" cy="50" r="3" fill="#ffffff" />

        {/* Crosshair Cardinal Ticks */}
        <line x1="50" y1="2" x2="50" y2="8" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="50" y1="92" x2="50" y2="98" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="2" y1="50" x2="8" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="92" y1="50" x2="98" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
