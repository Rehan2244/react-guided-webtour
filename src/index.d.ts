import { ReactNode, ReactElement } from 'react';

// Step Configuration
export interface Step {
  selector: string;
  title: string;
  content: string;
}

// Tour Options
export interface TourOptions {
  storageKey?: string;
  overlayPadding?: number;
  overlayBorderRadius?: number;
  startDelay?: number;
  toggleButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  forceStart?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  onStepChange?: (stepIndex: number) => void;
}

// Target Rectangle
export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

// Custom Tooltip Props
export interface CustomTooltipProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  targetRect: TargetRect | null;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  goToStep: (stepIndex: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  theme: 'light' | 'dark';
  progress: number;
}

// GuidedTour Component Props
export interface GuidedTourProps {
  steps: Step[];
  options?: TourOptions;
  showToggleButton?: boolean;
  theme?: 'light' | 'dark';
  autoStart?: boolean;
  children: ReactNode;
  customTooltip?: ReactElement<CustomTooltipProps>;
}

// useGuidedTour Hook Return Type
export interface UseGuidedTourReturn {
  currentStep: number;
  isActive: boolean;
  targetElement: Element | null;
  targetRect: TargetRect | null;
  currentStepData: Step | null;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCompleted: boolean;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
  resetTour: () => void;
}

// Scroll Options
export interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 
           'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
}

// Component Exports
export const GuidedTour: React.FC<GuidedTourProps>;
export const Overlay: React.FC<{
  isActive: boolean;
  targetRect: TargetRect | null;
  padding?: number;
  borderRadius?: number;
}>;
export const Tooltip: React.FC<{
  step: Step;
  currentStep: number;
  totalSteps: number;
  targetRect: TargetRect | null;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  theme?: 'light' | 'dark';
}>;
export const ToggleButton: React.FC<{
  onClick: () => void;
  isCompleted: boolean;
  position?: string;
}>;

// Hook Exports
export function useGuidedTour(
  steps: Step[],
  options?: TourOptions
): UseGuidedTourReturn;

export function useScrollAnimation(options?: {
  threshold?: number;
  rootMargin?: string;
}): {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
};

// Utility Exports
export function scrollToElement(
  element: Element,
  options?: ScrollOptions
): void;

export function isElementInViewport(element: Element): boolean;

// Default Export
declare const _default: {
  GuidedTour: typeof GuidedTour;
  Overlay: typeof Overlay;
  Tooltip: typeof Tooltip;
  ToggleButton: typeof ToggleButton;
  useGuidedTour: typeof useGuidedTour;
  useScrollAnimation: typeof useScrollAnimation;
  scrollToElement: typeof scrollToElement;
  isElementInViewport: typeof isElementInViewport;
};

export default _default;
