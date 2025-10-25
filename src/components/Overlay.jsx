import React, { useEffect, useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = ({ isActive, targetRect, padding = 10, borderRadius = 8, pulseAnimation = true }) => {
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
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="fixed inset-0 z-[9998] pointer-events-none"
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
                  <motion.rect
                    x={targetRect.left - padding}
                    y={targetRect.top - padding}
                    width={targetRect.width + padding * 2}
                    height={targetRect.height + padding * 2}
                    rx={borderRadius}
                    fill="black"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
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
            <motion.path
              d={getSvgPath()}
              fill="rgba(0, 0, 0, 0.7)"
              fillRule="evenodd"
              mask="url(#overlay-mask)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {pulseAnimation && targetRect && (
              <motion.rect
                x={targetRect.left - padding}
                y={targetRect.top - padding}
                width={targetRect.width + padding * 2}
                height={targetRect.height + padding * 2}
                rx={borderRadius}
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="2"
                filter="url(#pulse-glow)"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;