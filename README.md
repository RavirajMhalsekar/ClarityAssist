# ClarityAssist - Web Accessibility Enhancement Extension

ClarityAssist is a powerful Chrome extension that enhances web accessibility by providing customizable features and pre-defined profiles to improve web browsing for users with various accessibility needs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Accessibility Profiles](#accessibility-profiles)
- [Customization Options](#customization-options)
- [Development](#development)
- [Contributing](#contributing)
- [Privacy & Security](#privacy--security)
- [Developer](#developer)

## Features

### Core Capabilities
- **Pre-defined Accessibility Profiles**
- **Real-time Customization Controls**
- **Dark Mode Support**
- **Color Vision Deficiency Assistance**
- **Reading Aids**
- **Translation Support**
- **Keyboard Navigation Enhancements**

### Accessibility Profiles

Each profile is carefully designed for specific accessibility needs:

1. **Dyslexia-Friendly Mode**
   - Optimized text display and spacing
   - Custom font for better readability
   - Background color adjustments

2. **Reading Guide**
   - Interactive reading line helper
   - Follows cursor movement
   - Adjustable guide properties

3. **Low Vision**
   - Enhanced contrast settings
   - Larger text (175% zoom)
   - Optimized color settings

4. **Color Blind Support**
   - Three color deficiency modes:
     - Protanopia (red-blind)
     - Deuteranopia (green-blind)
     - Tritanopia (blue-blind)
   - Enhanced color contrasts
   - Pattern overlays for color-coding

5. **Elderly Mode**
   - Simplified interface
   - Increased font size (150% zoom)
   - Enhanced contrast (120%)
   - Improved line height

6. **Language Support**
   - Quick translation tools
   - Text-to-speech capability
   - Language detection

### Customization Options

- **Text Adjustments**
  - Font Size (50-200%)
  - Letter Spacing (-2px to 10px)
  - Word Spacing (-2px to 20px)
  - Line Spacing (80-200%)

- **Visual Adjustments**
  - Color Saturation (0-200%)
  - Contrast (50-200%)
  - Color Inversion
  - Website Dark Mode

- **Color Vision Settings**
  - Color Deficiency Type Selection
  - Color Enhancement Filters
  - Reset to Normal Vision

## Installation

1. **Chrome Web Store Installation**
   - Visit the Chrome Web Store
   - Search for "ClarityAssist"
   - Click "Add to Chrome"
   - Accept the permissions

2. **Manual Installation (Developer Mode)**
   - Download the latest release
   - Open Chrome Extensions (chrome://extensions/)
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder

## Usage

1. **Quick Start**
   - Click the ClarityAssist icon in your browser toolbar
   - Choose an accessibility profile or customize settings
   - Changes apply instantly to the current webpage

2. **Using Profiles**
   - Navigate to the "Accessibility Profiles" tab
   - Toggle profiles on/off as needed
   - Multiple profiles can be active simultaneously

3. **Custom Settings**
   - Navigate to the "Customize" tab
   - Adjust sliders for text and visual settings
   - Toggle color vision and dark mode options
   - Changes apply in real-time

4. **Additional Controls**
   - Reset Button: Revert all settings to default
   - Theme Toggle: Switch extension UI between light/dark mode
   - Color Vision Reset: Return to normal color vision

## Development

### Tech Stack
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Icons:** Lucide React

### Project Structure
- `/public`: Extension core files (manifest.json, content scripts)
- `/src/components`: React components
- `/src/contexts`: State management
- `/src/hooks`: Custom React hooks

### Local Setup
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Build the extension: \`npm run build:extension\`
4. Load the extension in Chrome Developer Mode

## Contributing

Contributions are welcome! Areas for improvement:

1. **New Features**
   - Additional accessibility profiles
   - Enhanced customization options
   - AI-powered suggestions

2. **Improvements**
   - Performance optimization
   - Browser compatibility
   - UI/UX enhancements

3. **Documentation**
   - User guides
   - API documentation
   - Translation

## Privacy & Security

- No user data collection
- Local storage only
- No external server communication
- Open source for transparency

## Developer

ClarityAssist is developed by **Raviraj Mhalsekar**

- **LinkedIn:** [linkedin.com/in/ravirajmhalsekar](https://www.linkedin.com/in/ravirajmhalsekar)
- **GitHub:** [github.com/RavirajMhalsekar](https://github.com/RavirajMhalsekar)

## License

MIT License
