# React Guided WebTour

An interactive guided tour component for React applications with beautiful animations and customizable tooltips. Built with **vanilla JavaScript and CSS** - zero external dependencies for animations!

## ✨ Features

- 🎯 **Easy Integration** - Simple setup with minimal configuration
- 🎨 **Customizable UI** - Support for custom tooltips and themes
- ⌨️ **Keyboard Navigation** - Arrow keys and ESC support
- 📱 **Responsive Design** - Works on all screen sizes
- 💾 **Persistence** - Remembers completed tours using localStorage
- 🎭 **Smooth Animations** - Pure CSS animations (no heavy dependencies!)
- 🔧 **Flexible Options** - Extensive configuration options
- 🎪 **Overlay Highlighting** - Highlights target elements
- 📍 **Smart Positioning** - Intelligent tooltip positioning
- 🎚️ **Multiple Themes** - Light and dark theme support
- ⚡ **Lightweight** - Only ~24KB UMD / ~37KB ES (gzipped: 9KB / 11.5KB)
- 🚫 **Zero Dependencies** - No framer-motion, no HeroUI, just React!

## 📦 Installation

```bash
npm install react-guided-webtour
```

```bash
yarn add react-guided-webtour
```

### Peer Dependencies

This package only requires React to be installed in your project:

```bash
npm install react react-dom
```

**Supported Versions:**
- React: 18.x or 19.x
- React DOM: 18.x or 19.x

**That's it!** No need for Framer Motion, HeroUI, or any other UI library.

### Import Styles

Don't forget to import the CSS file in your app:

```jsx
import 'react-guided-webtour/style.css';
```

Or in your main CSS/SCSS file:

```css
@import 'react-guided-webtour/style.css';
```

### TypeScript Support

This package includes TypeScript definitions out of the box. No additional `@types` package needed!

```typescript
import { GuidedTour, Step, TourOptions } from 'react-guided-webtour';
import 'react-guided-webtour/style.css';
```

```bash
pnpm add react-guided-webtour
```

> **Note:** Make sure you have `react` and `react-dom` (v18.0.0 or higher) installed as peer dependencies.

## 🚀 Quick Start

### Installation

First, install the package and its peer dependencies:

```bash
npm install react-guided-webtour @heroui/react framer-motion clsx
```

### Import Styles

Import the CSS in your main app file or component:

```jsx
import 'react-guided-webtour/dist/react-guided-tour.css';
```

### Basic Usage

```jsx
import React from 'react';
import { GuidedTour } from 'react-guided-webtour';

const App = () => {
  const steps = [
    {
      selector: '#welcome-section',
      title: 'Welcome!',
      content: 'This is your first step in the guided tour.',
    },
    {
      selector: '#features',
      title: 'Features',
      content: 'Here are all the amazing features of our app.',
    },
    {
      selector: '#get-started',
      title: 'Get Started',
      content: 'Click here to begin your journey!',
    },
  ];

  return (
    <GuidedTour steps={steps} autoStart={true}>
      <div>
        <div id="welcome-section">Welcome to our app!</div>
        <div id="features">Features section</div>
        <div id="get-started">Get Started button</div>
      </div>
    </GuidedTour>
  );
};

export default App;
```

### Advanced Usage with Options

```jsx
import React from 'react';
import { GuidedTour } from 'react-guided-webtour';

const App = () => {
  const steps = [
    {
      selector: '#step1',
      title: 'Step 1',
      content: 'This is the first step with advanced options.',
    },
    {
      selector: '#step2',
      title: 'Step 2',
      content: 'This step shows more advanced features.',
    },
  ];

  const options = {
    storageKey: 'myAppTour',
    overlayPadding: 10,
    overlayBorderRadius: 8,
    startDelay: 500,
    toggleButtonPosition: 'bottom-right',
    onComplete: () => console.log('Tour completed!'),
    onSkip: () => console.log('Tour skipped!'),
    onStepChange: (stepIndex) => console.log(`Step changed to: ${stepIndex}`),
  };

  return (
    <GuidedTour 
      steps={steps} 
      options={options}
      theme="dark"
      autoStart={false}
      showToggleButton={true}
    >
      <div>
        <div id="step1">First element</div>
        <div id="step2">Second element</div>
      </div>
    </GuidedTour>
  );
};
```

## 🔧 API Reference

### GuidedTour Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | **Required** | Array of tour steps |
| `options` | `TourOptions` | `{}` | Configuration options |
| `showToggleButton` | `boolean` | `true` | Show/hide the toggle button |
| `theme` | `'light' \| 'dark'` | `'light'` | UI theme |
| `autoStart` | `boolean` | `false` | Start tour automatically |
| `customTooltip` | `ReactElement` | `null` | Custom tooltip component |
| `children` | `ReactNode` | **Required** | Your app content |

### Step Object

```typescript
interface Step {
  selector: string;     // CSS selector for target element
  title: string;        // Step title
  content: string;      // Step description/content
}
```

### Tour Options

```typescript
interface TourOptions {
  storageKey?: string;           // localStorage key (default: 'guidedTour')
  overlayPadding?: number;       // Padding around highlighted element (default: 4)
  overlayBorderRadius?: number;  // Border radius for overlay (default: 4)
  startDelay?: number;           // Delay before tour starts (default: 300)
  toggleButtonPosition?: string; // Position of toggle button (default: 'bottom-right')
  forceStart?: boolean;          // Force start even if completed (default: false)
  onComplete?: () => void;       // Callback when tour completes
  onSkip?: () => void;           // Callback when tour is skipped
  onStepChange?: (stepIndex: number) => void; // Callback on step change
}
```

## 🎨 Custom Tooltip

Create your own tooltip component for complete UI control:

```jsx
import React from 'react';

const CustomTooltip = ({
  step,
  currentStep,
  totalSteps,
  targetRect,
  onNext,
  onPrev,
  onSkip,
  isFirstStep,
  isLastStep,
  theme,
  progress,
}) => {
  return (
    <div className="custom-tooltip" style={{
      position: 'fixed',
      top: targetRect.bottom + 10,
      left: targetRect.left,
      background: theme === 'dark' ? '#333' : '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '300px',
    }}>
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      
      <div className="progress-bar">
        <div style={{ width: `${progress}%`, height: '4px', background: '#007bff' }} />
      </div>
      
      <div className="tooltip-actions">
        {!isFirstStep && <button onClick={onPrev}>Previous</button>}
        {!isLastStep ? (
          <button onClick={onNext}>Next</button>
        ) : (
          <button onClick={onNext}>Finish</button>
        )}
        <button onClick={onSkip}>Skip Tour</button>
      </div>
      
      <div className="step-counter">
        {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
};

// Usage
<GuidedTour 
  steps={steps} 
  customTooltip={<CustomTooltip />}
>
  {/* Your content */}
</GuidedTour>
```

## 🎯 useGuidedTour Hook

For more control, use the hook directly:

```jsx
import React from 'react';
import { useGuidedTour } from 'react-guided-webtour';

const MyComponent = () => {
  const steps = [/* your steps */];
  
  const tour = useGuidedTour(steps, {
    storageKey: 'myTour',
    onComplete: () => console.log('Done!'),
  });

  return (
    <div>
      <button onClick={tour.startTour}>Start Tour</button>
      <button onClick={tour.resetTour}>Reset Tour</button>
      
      {tour.isActive && (
        <div>
          Current Step: {tour.currentStep + 1} of {tour.totalSteps}
          <button onClick={tour.nextStep} disabled={tour.isLastStep}>
            Next
          </button>
          <button onClick={tour.prevStep} disabled={tour.isFirstStep}>
            Previous
          </button>
          <button onClick={tour.skipTour}>Skip</button>
        </div>
      )}
    </div>
  );
};
```

### Hook Return Value

```typescript
interface GuidedTourHook {
  currentStep: number;           // Current step index (-1 if inactive)
  isActive: boolean;             // Whether tour is currently active
  targetElement: Element | null; // Current target DOM element
  targetRect: DOMRect | null;    // Target element's bounding box
  currentStepData: Step | null;  // Current step data
  totalSteps: number;            // Total number of steps
  isFirstStep: boolean;          // Whether on first step
  isLastStep: boolean;           // Whether on last step
  isCompleted: boolean;          // Whether tour has been completed
  
  // Methods
  startTour: () => void;         // Start the tour
  skipTour: () => void;          // Skip/end the tour
  nextStep: () => void;          // Go to next step
  prevStep: () => void;          // Go to previous step
  goToStep: (index: number) => void; // Go to specific step
  resetTour: () => void;         // Reset completion status
}
```

## ⌨️ Keyboard Navigation

The tour supports keyboard navigation out of the box:

- **Arrow Right** / **Arrow Left**: Navigate between steps
- **Escape**: Skip/close the tour

## 🎭 Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Overriding CSS classes**: Target the component classes with your own styles
2. **Using custom tooltips**: Create completely custom UI components
3. **Theme prop**: Switch between light and dark themes

### CSS Classes

```css
/* Main tour overlay */
.guided-tour-overlay { }

/* Default tooltip */
.guided-tour-tooltip { }

/* Toggle button */
.guided-tour-toggle { }

/* Progress indicator */
.guided-tour-progress { }
```

## 📱 Responsive Design

The component automatically adapts to different screen sizes and orientations. Tooltips reposition themselves to stay visible and accessible.

## 🔧 Utility Functions

### scrollToElement

Smooth scroll to any element with customizable options:

```jsx
import { scrollToElement } from 'react-guided-webtour/utils';

scrollToElement(document.querySelector('#target'), {
  offset: 100,        // Offset from top
  duration: 800,      // Animation duration
  easing: 'easeInOutCubic' // Easing function
});
```

## 📝 Examples

### Multi-Tour Application

```jsx
const WelcomeTour = () => {
  const welcomeSteps = [
    { selector: '#header', title: 'Header', content: 'This is the header' },
    { selector: '#nav', title: 'Navigation', content: 'Navigate here' },
  ];

  const featureSteps = [
    { selector: '#feature1', title: 'Feature 1', content: 'Amazing feature' },
    { selector: '#feature2', title: 'Feature 2', content: 'Another feature' },
  ];

  return (
    <div>
      <GuidedTour steps={welcomeSteps} storageKey="welcome-tour">
        <GuidedTour steps={featureSteps} storageKey="feature-tour">
          {/* Your app content */}
        </GuidedTour>
      </GuidedTour>
    </div>
  );
};
```

### Conditional Tours

```jsx
const ConditionalTour = ({ user }) => {
  const steps = user.isNewUser ? newUserSteps : returningUserSteps;
  
  return (
    <GuidedTour 
      steps={steps}
      autoStart={user.isNewUser}
      options={{
        storageKey: `tour-${user.id}`,
        onComplete: () => {
          // Mark user as toured
          updateUserProfile(user.id, { hasSeenTour: true });
        }
      }}
    >
      {/* Your content */}
    </GuidedTour>
  );
};
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/Rehan2244/react-guided-webtour.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- UI components from [HeroUI](https://heroui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔗 Links

- [GitHub Repository](https://github.com/Rehan2244/react-guided-webtour)
- [Issues](https://github.com/Rehan2244/react-guided-webtour/issues)
- [NPM Package](https://www.npmjs.com/package/react-guided-webtour)

---

Made with ❤️ by [Rehan2244](https://github.com/Rehan2244)