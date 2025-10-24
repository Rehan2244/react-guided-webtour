import { useState, useEffect, useCallback, useRef } from 'react';
import { scrollToElement, isElementInViewport } from '../utils/scrollToElement';

export const useGuidedTour = (steps, options = {}) => {
  const {
    storageKey = 'guidedTour',
    onComplete = () => {},
    onSkip = () => {},
    onStepChange = () => {},
    startDelay = 300,
  } = options;

  const [currentStep, setCurrentStep] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [targetRect, setTargetRect] = useState(null);
  const timeoutRef = useRef(null);
  const observerRef = useRef(null);

  const getStorageKey = useCallback((key) => {
    return `${storageKey}_${key}`;
  }, [storageKey]);

  const isCompleted = useCallback(() => {
    try {
      return localStorage.getItem(getStorageKey('completed')) === 'true';
    } catch {
      return false;
    }
  }, [getStorageKey]);

  const markAsCompleted = useCallback(() => {
    try {
      localStorage.setItem(getStorageKey('completed'), 'true');
    } catch {
      // Handle localStorage errors
    }
  }, [getStorageKey]);

  const updateTargetElement = useCallback(() => {
    if (currentStep >= 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      const element = document.querySelector(step.selector);
      
      if (element) {
        setTargetElement(element);
        const rect = element.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right,
        });
      } else {
        setTargetElement(null);
        setTargetRect(null);
      }
    }
  }, [currentStep, steps]);

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
      onStepChange(stepIndex);
      
      // Scroll to element after a short delay to ensure DOM updates
      setTimeout(() => {
        const step = steps[stepIndex];
        const element = document.querySelector(step.selector);
        if (element && !isElementInViewport(element)) {
          scrollToElement(element, {
            offset: 150,
            duration: 600,
            easing: 'easeInOutCubic'
          });
        }
      }, 100);
    }
  }, [steps, onStepChange]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    } else {
      completeTour();
    }
  }, [currentStep, steps.length, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const startTour = useCallback(() => {
    if (!isCompleted() || options.forceStart) {
      setIsActive(true);
      timeoutRef.current = setTimeout(() => {
        goToStep(0);
      }, startDelay);
    }
  }, [isCompleted, options.forceStart, goToStep, startDelay]);

  const skipTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(-1);
    markAsCompleted();
    onSkip();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [markAsCompleted, onSkip]);

  const completeTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(-1);
    markAsCompleted();
    onComplete();
  }, [markAsCompleted, onComplete]);

  const resetTour = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey('completed'));
    } catch {
      // Handle localStorage errors
    }
    setCurrentStep(-1);
    setIsActive(false);
  }, [getStorageKey]);

  // Update target element when step changes
  useEffect(() => {
    updateTargetElement();
  }, [currentStep, updateTargetElement]);

  // Set up resize observer
  useEffect(() => {
    if (targetElement) {
      observerRef.current = new ResizeObserver(() => {
        updateTargetElement();
      });
      observerRef.current.observe(targetElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetElement, updateTargetElement]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateTargetElement();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [updateTargetElement]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    currentStep,
    isActive,
    targetElement,
    targetRect,
    currentStepData: currentStep >= 0 ? steps[currentStep] : null,
    totalSteps: steps.length,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    goToStep,
    resetTour,
    isCompleted: isCompleted(),
  };
};