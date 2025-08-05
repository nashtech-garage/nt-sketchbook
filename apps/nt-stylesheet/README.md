# NT Stylesheet Documentation
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
npm install @nashtech-garage/nt-stylesheet
```

### 2. Import in your JavaScript or TypeScript entry file

```javascript
import '@nashtech-garage/nt-stylesheet/dist/nt.css'
import '@nashtech-garage/nt-stylesheet/dist/nt.js'
```

### 3. Use the CSS classes and design tokens in your components

Example:

```html
<button class="nt-btn nt-btn-primary">Submit</button>
```

---

## Components

NT Stylesheet includes a growing list of reusable and composable UI components.

### Common Components

| Component     | Description                       | Example Class                        |
| ------------- | --------------------------------- | ------------------------------------ |
| Button        | Styled buttons with variants      | `nt-btn`, `nt-btn-primary`           |
| Card          | Container with header/body/footer | `nt-card`, `nt-card-body`            |
| Alert         | Status messages                   | `nt-alert-success`, `nt-alert-error` |
| Form Controls | Inputs, checkboxes, selects       | `nt-input`, `nt-label`               |
| Modal         | Dialog box with overlay           | `nt-modal`, `nt-modal-open`          |
| Tabs          | Navigational tabbed interface     | `nt-tabs`, `nt-tab-active`           |

_More components will be documented soon._

---

## Design Tokens

Tokens are available as CSS variables and Sass variables for design consistency.

### Example CSS Variables

```css
:root {
    --nt-color-primary: #0052cc;
    --nt-spacing-md: 16px;
    --nt-font-size-base: 16px;
}
```

### Utility Example

```html
<div class="bg-primary text-white p-md">
    Welcome to NT Sketchbook!
</div>
```

---

## Customization

You can customize NT Stylesheet in several ways:

-   Override CSS variables using `:root` or component scopes
-   Extend component styles using custom classes
-   Import SCSS files and modify tokens before compilation (Sass users)

For detailed component guides, visit the [documentation folder](docs/README.md).
