import React, { useEffect, useState } from 'react';
import './Overlay.css';

const Overlay = ({ isActive, targetRect, padding = 10, borderRadius = 8, pulseAnimation = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [isActive]);
  const getSvgPath = () => {
    if (!targetRect) {
      return `M0,0 L100,0 L100,100 L0,100 Z`;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const x = targetRect.left - padding;
    const y = targetRect.top - padding;
    const width = targetRect.width + padding * 2;
    const height = targetRect.height + padding * 2;
    const r = borderRadius;

    // Outer rectangle (viewport)
    const outer = `M0,0 L${windowWidth},0 L${windowWidth},${windowHeight} L0,${windowHeight} Z`;
    
    // Inner rounded rectangle (cutout)
    const inner = `
      M${x + r},${y}
      L${x + width - r},${y}
      Q${x + width},${y} ${x + width},${y + r}
      L${x + width},${y + height - r}
      Q${x + width},${y + height} ${x + width - r},${y + height}
      L${x + r},${y + height}
      Q${x},${y + height} ${x},${y + height - r}
      L${x},${y + r}
      Q${x},${y} ${x + r},${y}
      Z
    `;

    return `${outer} ${inner}`;
  };

  return (
    <>
      {isActive && (
        <div
          className={`guided-tour-overlay fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="overlay-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {targetRect && (
                  <rect
                    className="guided-tour-mask-cutout"
                    x={targetRect.left - padding}
                    y={targetRect.top - padding}
                    width={targetRect.width + padding * 2}
                    height={targetRect.height + padding * 2}
                    rx={borderRadius}
                    fill="black"
                  />
                )}
              </mask>
              {pulseAnimation && targetRect && (
                <filter id="pulse-glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              )}
            </defs>
            <path
              className="guided-tour-overlay-backdrop"
              d={getSvgPath()}
              fill="rgba(0, 0, 0, 0.7)"
              fillRule="evenodd"
              mask="url(#overlay-mask)"
            />
            {pulseAnimation && targetRect && (
              <rect
                className="guided-tour-pulse-ring"
                x={targetRect.left - padding}
                y={targetRect.top - padding}
                width={targetRect.width + padding * 2}
                height={targetRect.height + padding * 2}
                rx={borderRadius}
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="2"
                filter="url(#pulse-glow)"
              />
            )}
          </svg>
        </div>
      )}
    </>
  );
};

export default Overlay;