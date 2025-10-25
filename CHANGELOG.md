# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
