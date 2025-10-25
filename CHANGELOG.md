# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-25

### 🎉 Major Rewrite - Zero Dependencies!

### Breaking Changes
- **Removed Framer Motion dependency** - All animations now use pure CSS
- **Removed HeroUI dependency** - All UI components are now custom-built
- **Only dependency:** `clsx` for className management

### Added
- ✨ Pure CSS animations for all components
- ✨ Custom-built UI components (Card, Button, Progress, Chip replacements)
- ✨ Smooth spring-like animations using CSS keyframes
- ✨ Pulse effects for overlay and toggle button
- ✨ Better performance with hardware-accelerated CSS animations
- ✨ Smaller bundle size: ~24KB UMD / ~37KB ES (vs ~50KB+ previously)

### Changed
- 🔄 Tooltip component now uses vanilla CSS for all animations
- 🔄 Overlay component uses CSS animations instead of Framer Motion
- 🔄 ToggleButton uses pure CSS pulse and bounce effects
- 🔄 All component styles moved to dedicated CSS files
- 🔄 Improved animation timing and easing functions

### Fixed
- ✅ **React 19 Compatibility** - No dependency conflicts
- ✅ **React 18 Compatibility** - Fully backward compatible
- ✅ **Bundle Size** - Significantly reduced (50%+ smaller)
- ✅ **Performance** - Faster animations using CSS instead of JS

### Migration from 1.x
If upgrading from v1.x:
1. Remove `@heroui/react` and `framer-motion` from your dependencies (no longer needed!)
2. Update your imports (API remains the same)
3. CSS is now required: `import 'react-guided-webtour/style.css'`
4. All props and functionality remain unchanged

## [1.0.4] - 2025-10-25

### Fixed
- **React 19 Compatibility**: Updated peer dependencies to support both React 18 and React 19
- **Peer Dependencies**: Moved `@heroui/react` and `framer-motion` to peer dependencies to avoid version conflicts
- **Bundle Size**: Reduced package size by externalizing HeroUI and Framer Motion dependencies

### Changed
- Peer dependencies now include:
  - React: `^18.0.0 || ^19.0.0`
  - React DOM: `^18.0.0 || ^19.0.0`
  - HeroUI React: `>=2.0.0`
  - Framer Motion: `>=11.0.0`
- Only `clsx` remains as a direct dependency
- Updated README with peer dependency installation instructions

## [1.0.3] - 2025-10-25

### Added
- TypeScript definitions (`index.d.ts`) for full TypeScript support
- Automated type definitions copying in build process

### Fixed
- Package entry points now correctly point to `dist/` files
- CSS export path fixed to `./dist/style.css`

## [1.0.2] - 2025-10-25

### Added
- Proper npm package configuration
- Validation scripts
- Build optimization

## [1.0.1] - 2025-10-25

### Added
- Initial npm package release
- Core GuidedTour component with overlay and tooltip
- useGuidedTour hook for programmatic control
- useScrollAnimation hook for scroll-based animations
- Custom tooltip support
- Keyboard navigation (Arrow keys, ESC)
- Automatic tour persistence using localStorage
- Smart tooltip positioning
- Smooth scroll utilities
- Light and dark theme support
- TypeScript type definitions
- Comprehensive documentation

### Features
- 🎯 Easy integration with minimal setup
- 🎨 Customizable UI with theme support
- ⌨️ Full keyboard navigation
- 📱 Responsive design
- 💾 Tour completion persistence
- 🎭 Smooth animations with Framer Motion
- 🔧 Flexible configuration options
- 🎪 Intelligent overlay highlighting
- 📍 Smart tooltip positioning
- 🎚️ Multiple tours support

### Dependencies
- React 18+
- Framer Motion
- HeroUI React
- clsx

## [1.0.0] - 2025-10-24

### Added
- Initial project setup
- Basic component structure
