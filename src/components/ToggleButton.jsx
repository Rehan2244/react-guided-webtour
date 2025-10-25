import React, { useEffect, useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ onClick, isCompleted, position = 'bottom-right', show = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);
  const positionClasses = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
  };

  if (!show) return null;

  return (
    <div
      className={`guided-tour-toggle fixed z-[1000] ${positionClasses[position]} ${
        isVisible ? 'guided-tour-toggle-visible' : 'guided-tour-toggle-hidden'
      }`}
    >
      {!isCompleted && (
        <span className="guided-tour-badge absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          New!
        </span>
      )}
      <div className={`guided-tour-toggle-wrapper ${!isCompleted ? 'guided-tour-toggle-pulse' : ''}`}>
        <button
          onClick={onClick}
          className="guided-tour-toggle-button w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Start guided tour"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="guided-tour-icon"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM11 6H13V14H11V6Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;