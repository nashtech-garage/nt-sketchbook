# NT Stylesheet Documentation

This directory contains documentation for the **NT Stylesheet** package, which provides the core CSS framework and design tokens for the NT Sketchbook ecosystem. For repository setup instructions see the [root README](../../README.md).

## Installation

### 1. Install via npm

```bash
npm install @nashtech-garage/nt-stylesheet
```

### 2. Import in your JavaScript or TypeScript entry file

```javascript
import '@nashtech-garage/nt-stylesheet/scripts/nt.js'
```

### 3. Or include via CDN in your HTML

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@nashtech-garage/nt-stylesheet/dist/nt-stylesheet.css"
/>
<script
    src="https://cdn.jsdelivr.net/npm/@nashtech-garage/nt-stylesheet/dist/nt-stylesheet.js"
    defer
></script>
```

### 4. Use the CSS classes and design tokens in your components

Example:

```html
<button class="nt-btn nt-btn-primary">Submit</button>
```

## Components

NT Stylesheet includes a growing list of reusable and composable UI components.

### Component Guides

- [Alert](alert.md)
- [Avatar](avatar.md)
- [Breadcrumb](breadcrumb.md)
- [Button](button.md)
- [Checkbox](checkbox.md)
- [Input](input.md)
- [Label](label.md)
- [Modal](modal.md)
- [Radio Group](radio-group.md)
- [Switch](switch.md)
- [Tooltip](tooltip.md)
- [Table](table.md)
- [Popover](popover.md)
- [Progress](progress.md)

### Customization

You can customize NT Stylesheet in several ways:

- Override CSS variables using `:root` or component scopes
- Extend component styles using custom classes
- Import SCSS files and modify tokens before compilation (Sass users)

## Contributions

Refer to the [How-Tos](../../HOWTOS.md) document for steps on adding new components and updating this documentation.
