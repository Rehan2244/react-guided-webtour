# Package Testing Guide

After building the package, you can test it locally before publishing:

## Local Installation Test

### Option 1: Using npm link

```bash
# In the package directory
npm link

# In your test project
npm link react-guided-webtour
```

### Option 2: Using npm pack

```bash
# In the package directory
npm pack

# This creates a .tgz file, e.g., react-guided-webtour-1.0.2.tgz
# In your test project
npm install /path/to/react-guided-webtour-1.0.2.tgz
```

### Option 3: Direct Path Installation

```bash
# In your test project
npm install /path/to/react-guided-tour
```

## Test Project Setup

Create a minimal test app:

```bash
npx create-react-app test-tour-app
cd test-tour-app
npm install /path/to/react-guided-tour
```

## Test Code

### App.js

```jsx
import React from 'react';
import { GuidedTour } from 'react-guided-webtour';
import 'react-guided-webtour/style.css';
import './App.css';

function App() {
  const steps = [
    {
      selector: '#header',
      title: 'Welcome!',
      content: 'This is a test of the react-guided-webtour package.',
    },
    {
      selector: '#content',
      title: 'Main Content',
      content: 'This is where your main content goes.',
    },
    {
      selector: '#footer',
      title: 'Footer',
      content: 'Thank you for testing!',
    },
  ];

  return (
    <GuidedTour steps={steps} autoStart={true}>
      <div className="App">
        <header id="header" className="App-header">
          <h1>Test App</h1>
        </header>
        <main id="content" style={{ padding: '50px', minHeight: '300px' }}>
          <p>Main content area</p>
        </main>
        <footer id="footer" style={{ padding: '20px', background: '#f0f0f0' }}>
          <p>Footer content</p>
        </footer>
      </div>
    </GuidedTour>
  );
}

export default App;
```

### TypeScript Test (App.tsx)

```tsx
import React from 'react';
import { GuidedTour, Step, TourOptions } from 'react-guided-webtour';
import 'react-guided-webtour/style.css';

function App() {
  const steps: Step[] = [
    {
      selector: '#header',
      title: 'Welcome!',
      content: 'TypeScript definitions are working!',
    },
  ];

  const options: TourOptions = {
    storageKey: 'test-tour',
    overlayPadding: 10,
    onComplete: () => console.log('Tour completed!'),
  };

  return (
    <GuidedTour steps={steps} options={options} theme="dark">
      <div className="App">
        <header id="header">
          <h1>TypeScript Test</h1>
        </header>
      </div>
    </GuidedTour>
  );
}

export default App;
```

## Verification Checklist

- [ ] Package installs without errors
- [ ] CSS imports correctly
- [ ] Components render without errors
- [ ] Tour starts and navigates correctly
- [ ] TypeScript definitions work (if using TS)
- [ ] Keyboard navigation works (Arrow keys, Escape)
- [ ] Custom tooltips work
- [ ] All hooks are accessible
- [ ] Build size is reasonable
- [ ] No console errors or warnings

## Publishing to npm

Once all tests pass:

```bash
# Login to npm (if not already logged in)
npm login

# Publish the package
npm publish

# For scoped packages
npm publish --access public
```

## Version Updates

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```
