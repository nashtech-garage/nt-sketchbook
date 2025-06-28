Here is your updated **NT Stylesheet Documentation** with improved structure, clearer formatting, and added placeholder links and examples:

---

# NT Stylesheet Documentation

This directory contains documentation for the **NT Stylesheet** package, which provides the core CSS framework and design tokens for the NT Sketchbook ecosystem.

---

## Overview

**NT Stylesheet** delivers a lightweight, customizable set of CSS utilities and components built for consistency across NT products. It includes:

-   **Design Tokens**: Standardized values for colors, spacing, typography, and more.
-   **Utility Classes**: Ready-to-use classes for layout, spacing, alignment, and responsiveness.
-   **UI Components**: Pre-styled, accessible, and responsive interface elements.
-   **JavaScript Enhancements**: Optional utilities for interactivity (modals, dropdowns, etc.).

---

## Installation

### 1. Install via npm

```bash
npm install @nashtech/nt-stylesheet
```

### 2. Import in your JavaScript or TypeScript entry file

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.js'
```

### 3. Or include via CDN in your HTML

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@nashtech/nt-stylesheet/dist/nt-stylesheet.css"
/>
<script
    src="https://cdn.jsdelivr.net/npm/@nashtech/nt-stylesheet/dist/nt-stylesheet.js"
    defer
></script>
```

### 4. Use the CSS classes and design tokens in your components

Example:

```html
<button class="nt-btn nt-btn-primary">Submit</button>
```

---

## Components

NT Stylesheet includes a growing list of reusable and composable UI components.

### Common Components

| Component | Description             | Example Class |
| --------- | ----------------------- | ------------- |
| Name      | component's description | examples      |

_To be updated._

---

## Customization

You can customize NT Stylesheet in several ways:

-   Override CSS variables using `:root` or component scopes
-   Extend component styles using custom classes
-   Import SCSS files and modify tokens before compilation (Sass users)

---

## Contributions

-   Following repository's bootstrap instruction
