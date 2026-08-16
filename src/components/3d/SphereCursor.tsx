import React from 'react';

interface SphereCursorProps {
  position: { x: number; y: number };
  isVisible: boolean;
  isHoveringText: boolean;
}

export const SphereCursor: React.FC<SphereCursorProps> = ({
  position,
  isVisible,
  isHoveringText,
}) => {
  if (!isVisible) return null;

  // Base size: 90px idle, expands to 220px when hovering over text
  const currentSize = isHoveringText ? 220 : 90;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${currentSize}px`,
        height: `${currentSize}px`,
      }}
    >
      {/* Outer Glowing Aura Ring */}
      <div
        className="absolute inset-0 rounded-full border border-teal/50 bg-teal/10 transition-transform duration-500"
        style={{
          boxShadow: isHoveringText
            ? '0 0 65px rgba(188, 211, 216, 0.7), inset 0 0 30px rgba(188, 211, 216, 0.3)'
            : '0 0 35px rgba(188, 211, 216, 0.4), inset 0 0 15px rgba(188, 211, 216, 0.2)',
        }}
      />

      {/* 3D Gradient Metallic Sphere Body (Screenshot 2 & 3) */}
      <div
        className="absolute rounded-full sphere-cursor-glow flex items-center justify-center transition-all duration-500"
        style={{
          inset: isHoveringText ? '12px' : '6px',
          opacity: isHoveringText ? 0.35 : 0.95, // Softens opacity when expanded over 3D bag reveal
        }}
      >
        {/* Center Target Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm" />
      </div>
    </div>
  );
};
