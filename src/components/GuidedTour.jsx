import React, { useEffect } from 'react';
import { useGuidedTour } from '../hooks/useGuidedTour';
import Overlay from './Overlay';
import Tooltip from './Tooltip';
import ToggleButton from './ToggleButton';

const GuidedTour = ({
  steps,
  options = {},
  showToggleButton = true,
  theme = 'light',
  autoStart = false,
  children,
  customTooltip = null,
}) => {
  const tour = useGuidedTour(steps, options);

  useEffect(() => {
    if (autoStart && !tour.isCompleted) {
      tour.startTour();
    }
  }, [autoStart, tour.isCompleted, tour.startTour]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!tour.isActive) return;

      switch (e.key) {
        case 'Escape':
          tour.skipTour();
          break;
        case 'ArrowRight':
          if (!tour.isLastStep) {
            tour.nextStep();
          }
          break;
        case 'ArrowLeft':
          if (!tour.isFirstStep) {
            tour.prevStep();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tour]);

  return (
    <>
      {children}
      
      {showToggleButton && !tour.isActive && (
        <ToggleButton
          onClick={tour.startTour}
          isCompleted={tour.isCompleted}
          position={options.toggleButtonPosition}
        />
      )}

      <Overlay
        isActive={tour.isActive}
        targetRect={tour.targetRect}
        padding={options.overlayPadding}
        borderRadius={options.overlayBorderRadius}
      />

      {tour.isActive && tour.currentStepData && (
        customTooltip ? (
          React.cloneElement(customTooltip, {
            step: tour.currentStepData,
            currentStep: tour.currentStep,
            totalSteps: tour.totalSteps,
            targetRect: tour.targetRect,
            onNext: tour.nextStep,
            onPrev: tour.prevStep,
            onSkip: tour.skipTour,
            goToStep: tour.goToStep,
            isFirstStep: tour.isFirstStep,
            isLastStep: tour.isLastStep,
            theme: theme,
            progress: ((tour.currentStep + 1) / tour.totalSteps) * 100,
          })
        ) : (
          <Tooltip
            step={tour.currentStepData}
            currentStep={tour.currentStep}
            totalSteps={tour.totalSteps}
            targetRect={tour.targetRect}
            onNext={tour.nextStep}
            onPrev={tour.prevStep}
            onSkip={tour.skipTour}
            isFirstStep={tour.isFirstStep}
            isLastStep={tour.isLastStep}
            theme={theme}
          />
        )
      )}
    </>
  );
};

export default GuidedTour;