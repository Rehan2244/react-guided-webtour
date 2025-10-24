# Custom Tooltip Guide

The React Guided Tour component allows you to provide your own custom tooltip component for complete control over the tour UI.

## Basic Usage

```jsx
import { GuidedTour } from './components';
import MyCustomTooltip from './MyCustomTooltip';

function App() {
  return (
    <GuidedTour
      steps={tourSteps}
      customTooltip={<MyCustomTooltip />}
    >
      <YourContent />
    </GuidedTour>
  );
}
```

## Props Passed to Custom Tooltip

Your custom tooltip component will receive the following props:

```typescript
interface CustomTooltipProps {
  // Current step data
  step: {
    selector: string;
    title: string;
    content: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      alt?: string;
    };
  };
  
  // Tour state
  currentStep: number;
  totalSteps: number;
  progress: number; // 0-100
  isFirstStep: boolean;
  isLastStep: boolean;
  
  // Position data
  targetRect: {
    top: number;
    left: number;
    width: number;
    height: number;
    bottom: number;
    right: number;
  };
  
  // Navigation handlers
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  goToStep: (stepIndex: number) => void;
  
  // Theme
  theme: 'light' | 'dark';
}
```

## Creating a Custom Tooltip

Here's a minimal example:

```jsx
const MinimalCustomTooltip = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className="fixed z-[9999] bg-white p-4 rounded-lg shadow-xl" 
         style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      <div>
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div>
        <button onClick={onSkip}>Skip</button>
        {!isFirstStep && <button onClick={onPrev}>Previous</button>}
        <button onClick={onNext}>
          {isLastStep ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};
```

## Advanced Features

### 1. Smart Positioning

Use the `targetRect` prop to position your tooltip relative to the highlighted element:

```jsx
const getPosition = (targetRect) => {
  const tooltipWidth = 400;
  const tooltipHeight = 200;
  const padding = 20;
  
  // Position below the target by default
  let top = targetRect.bottom + padding;
  let left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
  
  // Adjust if tooltip would go off-screen
  const viewportHeight = window.innerHeight;
  if (top + tooltipHeight > viewportHeight) {
    top = targetRect.top - tooltipHeight - padding;
  }
  
  return { top, left };
};
```

### 2. Direct Step Navigation

Use the `goToStep` handler to create step indicators:

```jsx
<div className="flex gap-2">
  {Array.from({ length: totalSteps }).map((_, index) => (
    <button
      key={index}
      onClick={() => goToStep(index)}
      className={index === currentStep ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>
```

### 3. Custom Animations

Use Framer Motion or any animation library:

```jsx
import { motion } from 'framer-motion';

const AnimatedTooltip = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring" }}
    >
      {/* Your tooltip content */}
    </motion.div>
  );
};
```

### 4. Media Support

Handle media in steps:

```jsx
{step.media && (
  <div className="media-container">
    {step.media.type === 'image' ? (
      <img src={step.media.url} alt={step.media.alt} />
    ) : (
      <video src={step.media.url} controls />
    )}
  </div>
)}
```

## Best Practices

1. **Accessibility**: Include proper ARIA labels and keyboard navigation
2. **Responsive Design**: Ensure your tooltip works on all screen sizes
3. **Z-Index**: Use a high z-index (9999) to ensure tooltip appears above other content
4. **Error Handling**: Handle cases where `targetRect` might be null
5. **Theming**: Respect the `theme` prop for consistent appearance

## Example: Full-Featured Custom Tooltip

See `src/components/CustomTooltipExample.jsx` for a complete implementation with:
- Gradient background
- Step indicators with direct navigation
- Smooth animations
- Custom styling
- All navigation handlers implemented