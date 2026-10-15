import React from 'react';

interface AudioWaveformProps {
  barCount?: number;
  heightClass?: string;
  className?: string;
  color?: string;
  active?: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  barCount = 6,
  heightClass = 'h-3.5',
  className = '',
  color = 'bg-cyan-400',
  active = true,
}) => {
  // Preset animation height multipliers
  const delays = [0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.2, 0.45];
  const minHeights = [30, 70, 45, 90, 60, 80, 40, 75];

  return (
    <div className={`flex items-center gap-[2px] ${heightClass} ${className}`}>
      {Array.from({ length: barCount }).map((_, idx) => (
        <span
          key={idx}
          className={`w-[2.5px] rounded-full ${color} transition-all duration-300 ${
            active ? 'animate-pulse' : 'opacity-40 h-[20%]'
          }`}
          style={
            active
              ? {
                  height: `${minHeights[idx % minHeights.length]}%`,
                  animationDuration: `${0.6 + (idx % 4) * 0.25}s`,
                  animationDelay: `${delays[idx % delays.length]}s`,
                }
              : { height: '3px' }
          }
        />
      ))}
    </div>
  );
};
