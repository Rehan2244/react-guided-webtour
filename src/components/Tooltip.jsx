import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

const Tooltip = ({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
  theme = 'light',
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState('bottom');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const tooltipRef = useRef(null);

  // Handle animations
  useEffect(() => {
    if (step) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [step, currentStep]);

  useEffect(() => {
    if (!targetRect || !step) return;

    const calculatePosition = () => {
      const tooltipWidth = 360;
      const tooltipHeight = 200;
      const padding = 20;
      const viewportPadding = 10;

      let top = 0;
      let left = 0;
      let bestPlacement = 'bottom';

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Try bottom placement
      if (targetRect.bottom + tooltipHeight + padding < viewportHeight) {
        top = targetRect.bottom + padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        bestPlacement = 'bottom';
      }
      // Try top placement
      else if (targetRect.top - tooltipHeight - padding > 0) {
        top = targetRect.top - tooltipHeight - padding;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        bestPlacement = 'top';
      }
      // Try right placement
      else if (targetRect.right + tooltipWidth + padding < viewportWidth) {
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.right + padding;
        bestPlacement = 'right';
      }
      // Try left placement
      else if (targetRect.left - tooltipWidth - padding > 0) {
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.left - tooltipWidth - padding;
        bestPlacement = 'left';
      }
      // Default to center of viewport
      else {
        top = viewportHeight / 2 - tooltipHeight / 2;
        left = viewportWidth / 2 - tooltipWidth / 2;
        bestPlacement = 'center';
      }

      // Ensure tooltip stays within viewport
      left = Math.max(viewportPadding, Math.min(left, viewportWidth - tooltipWidth - viewportPadding));
      top = Math.max(viewportPadding, Math.min(top, viewportHeight - tooltipHeight - viewportPadding));

      setPosition({ top, left });
      setPlacement(bestPlacement);
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [targetRect, step]);

  if (!step) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      ref={tooltipRef}
      key={currentStep}
      className={clsx(
        'guided-tour-tooltip fixed z-[9999] transition-all duration-300',
        isVisible ? 'guided-tour-tooltip-visible' : 'guided-tour-tooltip-hidden',
        `guided-tour-tooltip-${placement}`,
        theme === 'dark' ? 'guided-tour-tooltip-dark' : 'guided-tour-tooltip-light'
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '360px',
      }}
    >
      <div className={clsx(
        'guided-tour-card rounded-xl shadow-2xl overflow-hidden',
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      )}>
        {/* Header */}
        <div className="guided-tour-card-header flex justify-between items-center p-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <span className={clsx(
            'guided-tour-chip inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
            theme === 'dark' 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
          )}>
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        
        {/* Body */}
        <div className="guided-tour-card-body p-4 py-3">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            {step.content}
          </p>
          {step.media && (
            <div className="mt-3">
              {step.media.type === 'image' && (
                <img
                  src={step.media.url}
                  alt={step.media.alt || 'Tour media'}
                  className="rounded-lg w-full"
                />
              )}
              {step.media.type === 'video' && (
                <video
                  src={step.media.url}
                  controls
                  className="rounded-lg w-full"
                />
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="guided-tour-card-footer flex flex-col gap-3 p-4 pt-2">
          {/* Progress Bar */}
          <div className="guided-tour-progress w-full">
            <div className={clsx(
              'guided-tour-progress-track h-2 rounded-full overflow-hidden',
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            )}>
              <div 
                className="guided-tour-progress-bar h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <button
              onClick={onSkip}
              className={clsx(
                'guided-tour-button guided-tour-button-skip px-3 py-2 text-sm rounded-lg transition-all duration-200',
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              )}
            >
              Skip tour
            </button>
            
            <div className="flex gap-2">
              {!isFirstStep && (
                <button
                  onClick={onPrev}
                  className={clsx(
                    'guided-tour-button guided-tour-button-prev px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  )}
                >
                  Previous
                </button>
              )}
              <button
                onClick={onNext}
                className={clsx(
                  'guided-tour-button guided-tour-button-next px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
                )}
              >
                {isLastStep ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arrow pointer */}
      <div
        className={clsx(
          'guided-tour-arrow absolute w-0 h-0',
          theme === 'dark' ? 'arrow-dark' : 'arrow-light',
          {
            'arrow-top': placement === 'top',
            'arrow-bottom': placement === 'bottom',
            'arrow-right': placement === 'right',
            'arrow-left': placement === 'left',
          }
        )}
      />
    </div>
  );
};

export default Tooltip;