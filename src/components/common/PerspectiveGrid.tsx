import React from "react";

export const PerspectiveGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      <svg
        className="w-full h-[800px] min-w-[1200px] max-w-[1600px] opacity-45"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grid-vertical-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#89D4A6" stopOpacity="0" />
            <stop offset="10%" stopColor="#89D4A6" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#89D4A6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#89D4A6" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="grid-horizontal-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#89D4A6" stopOpacity="0.05" />
            <stop offset="20%" stopColor="#89D4A6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#89D4A6" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#89D4A6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#89D4A6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Converging perspective rays from center vanishing point (700, 140) */}
        {Array.from({ length: 33 }).map((_, i) => {
          const offset = i - 16; // -16 to +16 symmetric around 0
          const xTop = 700 + offset * 26;
          const xBottom = 700 + offset * 84;
          return (
            <line
              key={`ray-${i}`}
              x1={xTop}
              y1={130}
              x2={xBottom}
              y2={800}
              stroke="url(#grid-vertical-fade)"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Transverse horizontal lines with exponential perspective spacing */}
        {[
          145, 162, 184, 212, 248, 294, 352, 424, 514, 624, 760
        ].map((y, idx) => (
          <line
            key={`h-${idx}`}
            x1="0"
            y1={y}
            x2="1400"
            y2={y}
            stroke="url(#grid-horizontal-fade)"
            strokeWidth="1.2"
          />
        ))}
      </svg>
    </div>
  );
};
