// Import styles
import './styles.css';

// Main exports for the library
export { default as GuidedTour } from '../components/GuidedTour';
export { default as Overlay } from '../components/Overlay';
export { default as Tooltip } from '../components/Tooltip';
export { default as ToggleButton } from '../components/ToggleButton';

// Hooks exports
export { useGuidedTour } from '../hooks/useGuidedTour';
export { useScrollAnimation } from '../hooks/useScrollAnimation';

// Utils exports
export { scrollToElement, isElementInViewport } from '../utils/scrollToElement';
