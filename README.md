# ClarityAssist - Accessibility Enhancer Tools UI

ClarityAssist is a user interface prototype for a suite of accessibility enhancement tools. This project currently features a Next.js web application that demonstrates the UI and simulates the effects of various accessibility settings. It also includes a foundational structure for a Chrome extension.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Why ClarityAssist?](#why-clarityassist)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
  - [Next.js Web Application (UI Prototype)](#nextjs-web-application-ui-prototype)
  - [Chrome Extension (Basic Structure)](#chrome-extension-basic-structure)
- [Using the Application](#using-the-application)
- [Contributing](#contributing)
- [Developer](#developer)

## Project Overview

ClarityAssist aims to provide a user-friendly interface for individuals to customize their web browsing experience according to their specific accessibility needs. The current Next.js application serves as a high-fidelity prototype that allows users to interact with various settings and see their simulated effects on the UI itself.

The `public` directory contains the initial scaffolding for a Chrome extension, which is the intended final platform for this tool.

## Features

**Current Features (Next.js Prototype):**

- **Accessibility Profiles:** Pre-defined profiles for common needs (e.g., Motor Impaired, Blind, Color Blind, Low Vision, Seizure & Learning, Elderly).
- **Customization Controls:**
  - Font Sizing
  - Letter Spacing
  - Word Spacing
  - Line Spacing
  - Color Saturation
  - Contrast Adjustment
  - Simulated Color Inversion
  - Simulated Website Dark Mode
- **Extension UI Theme Toggle:** Switch the ClarityAssist UI between light and dark modes.
- **Reset Functionality:** Revert all settings to their default values.
- **Developer Information:** Popover with developer details and links.
- **Responsive Design:** The UI is designed to adapt to different screen sizes.

**Chrome Extension (Scaffolding):**

- Basic `manifest.json` setup.
- Placeholders for `popup.html`, `popup.js`, `content.js`, and `background.js`.
- This part requires further development to become a functional extension (see [Chrome Extension Setup](#chrome-extension-basic-structure)).

## Why ClarityAssist?

The web should be accessible to everyone. ClarityAssist strives to empower users by giving them granular control over how web content is presented, making it easier to read, navigate, and understand. This tool can be particularly helpful for individuals with visual impairments, motor difficulties, learning disabilities, and other accessibility challenges.

## Tech Stack

- **Frontend Framework:** Next.js (with App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Icons:** Lucide React
- **AI (Planned/Integrated):** Genkit (for future intelligent features, currently setup in `package.json` and `src/ai/`)

## Local Setup

To get ClarityAssist running on your local machine, follow these steps:

### Next.js Web Application (UI Prototype)

This will run the user interface prototype where you can interact with all the controls and see their simulated effects.

**Prerequisites:**

- Node.js (v18.x or later recommended)
- npm or yarn

**Steps:**

1.  **Clone the repository (or copy the files):**
    If you have the project files, navigate to the root directory of the project.

    ```bash
    git clone https://your-repository-url.git # If you have a git repo
    cd clarity-assist-project-directory
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:9002` (or the port specified in your console) in your web browser.

### Chrome Extension (Basic Structure)

The `public` directory contains the initial files for the Chrome extension. This is **not** a fully functional extension yet and requires additional development steps.

**To load the basic structure as an unpacked extension:**

1.  **Build the Popup UI (Manual Step Required):**

    - The React components from `src/components/clarity-assist/` and `src/components/ui/` need to be bundled into `public/popup.js`. You'll need to set up a build tool like Webpack, Parcel, or Vite for this.
    - The state management and event handling logic currently in `src/app/page.tsx` will need to be adapted for `public/popup.js` to manage settings and communicate with content scripts.

2.  **Implement Content Script Logic (Manual Step Required):**

    - The core functionality of applying styles to web pages needs tobe implemented in `public/content.js`. This script will use `chrome.storage` to get settings and JavaScript to manipulate the DOM/CSS of active web pages.

3.  **Create Icons (Manual Step Required):**

    - Create icon files (e.g., `icon16.png`, `icon48.png`, `icon128.png`) and place them in a `public/icons/` directory. These are referenced in `public/manifest.json`.

4.  **Load Unpacked Extension in Browser (Chrome/Edge):**

    - Open your Chrome or Edge browser.
    - Navigate to `chrome://extensions` (for Chrome) or `edge://extensions` (for Edge).
    - Enable "Developer mode" (usually a toggle in the top right corner).
    - Click on the "Load unpacked" button.
    - Select the `public` directory from your project.

    Once loaded, you should see the ClarityAssist icon in your browser's extension toolbar. Clicking it will show the `popup.html` (which will be blank or basic until you complete step 1 above).

## Using the Application

- **Accessibility Profiles Tab:** Toggle profiles on/off. Their simulated activation will be noted at the bottom.
- **Customize Tab:** Use sliders and switches to adjust various visual parameters. Changes will be reflected live on the UI prototype itself.
- **Header Controls:**
  - Use the Sun/Moon icon to toggle the ClarityAssist UI's theme.
  - Use the Reset icon (circular arrow) to revert all settings to default.
  - Use the Info icon to view developer details.

## Contributing

Contributions are welcome and highly appreciated! Here's how you can contribute:

1.  **Fork the Repository** (if applicable).
2.  **Create a New Branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make Your Changes:** Implement new features, fix bugs, or improve documentation.
4.  **Commit Your Changes:**
    ```bash
    git commit -m "feat: Add concise description of your feature"
    ```
5.  **Push to Your Branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Open a Pull Request:** Submit a PR against the main branch of the original repository.

**Areas for Contribution:**

- **Complete Chrome Extension Functionality:**
  - Implement the build process for the React popup UI.
  - Develop the `content.js` to apply styles and accessibility enhancements to web pages.
  - Set up communication between the popup and content scripts using `chrome.storage` and `chrome.runtime.messaging`.
- **Add More Accessibility Features:** Research and implement additional profiles or customization options.
- **Improve UI/UX:** Enhance the user interface and experience.
- **Write Tests:** Add unit or integration tests.
- **Documentation:** Improve existing documentation or add new guides.
- **AI-Powered Features:** Explore and implement features using Genkit (e.g., smart suggestions based on content).

## Developer

ClarityAssist is being developed by **Raviraj Mhalsekar**.

- **LinkedIn:** [linkedin.com/in/ravirajmhalsekar](https://www.linkedin.com/in/ravirajmhalsekar)
- **GitHub:** [github.com/RavirajMhalsekar](https://github.com/RavirajMhalsekar)

---

Thank you for your interest in ClarityAssist!

# ClarityAssist Chrome Extension

ClarityAssist is a Chrome extension that provides advanced accessibility and UI/UX enhancements for any website. It enables users to apply accessibility profiles and customizations to improve web clarity, usability, and comfort for a wide range of needs.

## Features

- **Accessibility Profiles**: Instantly apply accessibility settings for:

  - **Blind**: Adds ARIA landmarks, skip links, ensures alt text, and provides ARIA live regions for screen readers.
  - **Motor-impaired**: Enables keyboard navigation, sticky on-screen keyboard, and single-key shortcuts for easier interaction.
  - **Color-blind**: Applies color-blind safe palettes, patterns/textures, and tooltips for color-only indicators.
  - **Seizure-safe**: Detects and pauses/removes flashing/animated elements, and warns users if unsafe content is detected.
  - **Vision-impaired**: Adds text-to-speech buttons, high-contrast mode, and thick borders for better visibility.
  - **Elderly**: Simplifies UI, increases font/line height, adds tooltips, and provides voice command support.
  - **Low-vision**: Zoom/scale the page, increase contrast, and enable dark mode.

- **Dark Mode**: Applies a true dark theme with color overrides for backgrounds, text, inputs, buttons, scrollbars, and selection.
- **Zoom/Scale**: Zooms and scales content for low-vision and elderly users using CSS zoom and -moz-transform.
- **Text Adjustments**: Adjust font size, line spacing, and more independently and globally.
- **Customizable Controls**: Fine-tune accessibility settings with sliders and toggles.
- **Compact, Modern UI**: Minimal, professional popup with Inter font, compact controls, and increased visible content.
- **Robust Messaging**: Reliable Chrome messaging between popup and content script with error handling.

## Accessibility Profile Details

### Blind

- Adds ARIA landmarks and skip links for screen reader navigation.
- Ensures alt text for images and ARIA live regions for dynamic content.

### Motor-impaired

- Enables keyboard navigation and focus outlines.
- Provides a sticky on-screen keyboard and single-key shortcuts.

### Color-blind

- Uses color-blind safe palettes and overlays patterns/textures.
- Adds tooltips for color-only indicators.

### Seizure-safe

- Detects and pauses/removes flashing or animated elements.
- Displays a warning banner if unsafe content is detected.

### Vision-impaired

- Adds text-to-speech buttons to read content aloud.
- Enables high-contrast mode and thick borders for clarity.

### Elderly

- Simplifies UI, increases font size and line height.
- Adds tooltips and a voice command button for easier use.

### Low-vision

- Zooms/scales the page and increases contrast.
- Enables dark mode for reduced glare.

## How It Works

1. Click the ClarityAssist icon in your browser.
2. Select an accessibility profile or customize settings.
3. The extension applies real, meaningful effects to the current web page.

## Development

- **UI/UX**: Built with React, Tailwind CSS, and Inter font for a modern, compact popup.
- **Content Script**: Injects CSS/JS to apply accessibility features and profile effects.
- **Dark Mode**: Uses CSS variables and overrides for a true dark theme.
- **Zoom/Scale**: Uses CSS zoom and -moz-transform for scaling.
- **Accessibility Enhancements**: Implements ARIA, keyboard navigation, color-blind safe styles, seizure-safe filters, and more.

## File Structure

- `public/styles.css`: Popup UI/UX, accessibility profile classes, dark mode, zoom/scale styles.
- `public/content.js`: Core accessibility logic, CSS/JS injection, profile effects.
- `public/manifest.json`: Extension permissions, content script, icons.
- `src/components/clarity-assist/`: Popup UI components.
- `src/popup.tsx`: Popup logic and Chrome messaging.
- `public/content_styles.css`: Base content styles.

## Changelog

- Improved accessibility profile effects: all profiles now have real, meaningful impact on web pages.
- Added ARIA, skip links, keyboard navigation, color-blind safe palettes, seizure-safe, high-contrast, and more.
- Improved dark mode and zoom/scale for low-vision/elderly.
- Refined popup UI for clarity and compactness.

## License

MIT
