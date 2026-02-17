# Uponor Vario S Manifold - Interactive Installation Manual

An interactive, multilingual installation guide for the Uponor Vario S Manifold. This web application provides step-by-step visual instructions, checklists, and technical specifications to assist installers.

## Features

- **Interactive Steps**: Step-by-step guide covering Dimensions, Installation, Flushing, Pressure Test, and Operation.
- **Visual Aids**: High-quality GIFs and SVGs to demonstrate each step.
- **Multilingual Support**: Supports over 25 languages with automatic browser language detection and a manual language selector.
- **Checklists**: Interactive checklists for each step to ensure quality control.
- **Technical Specifications**: Detailed specs for tools and measurements.
- **Dark Mode**: Toggle between Light and Dark themes for better visibility in different environments.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Offline Capable**: Designed to work without a backend server (runs directly via `file://` protocol or local server).

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom styling with CSS Variables for theming.
- **JavaScript (Vanilla)**: Application logic, state management, and internationalization.
- **No External Dependencies**: No frameworks or libraries required.

## Getting Started

### Prerequisites

You only need a modern web browser (Chrome, Firefox, Safari, Edge) to run this application.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

### Running the Application

You can run the application in two ways:

1. **Directly in Browser**:
   - Open the `index.html` file in your web browser.

2. **Using a Local Server** (Recommended for better experience):
   - If you have Python installed:
     ```bash
     python3 -m http.server 8000
     ```
   - Then open `http://localhost:8000` in your browser.

## Usage

1. **Navigation**: Use the sidebar menu to jump to specific sections (Dimensions, Installation, etc.) or use the "Previous" and "Next" buttons to move sequentially.
2. **Language**: Click the language selector in the top-left sidebar to change the interface language.
3. **Theme**: Use the toggle switch in the top-left to switch between Light and Dark modes.
4. **Checklists**: Mark items in the checklist as you complete them. Your progress is saved locally.

## Project Structure

```
├── app.js              # Main application logic
├── i18n.js             # Internationalization handling
├── translations.js     # Translation strings
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── *.svg, *.gif, *.png # Visual assets
└── ...
```

## Customization

- **Adding Languages**: Add new language entries in `translations.js` and register them in `i18n.js`.
- **Modifying Steps**: Update the `stepsData` array in `app.js` to add or modify installation steps.

## License

[Insert License Information Here]
