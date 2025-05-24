# Button Component

The **Button** component in NT Stylesheet provides a set of styles and utilities for creating accessible, consistent, and customizable buttons.

## Features

- Multiple sizes (small, medium, large)
- Variants: primary, secondary, danger, outline, ghost
- Disabled and loading states
- Full-width option
- Icon support

## Usage

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Button Variants

- nt-btn-primary
- nt-btn-secondary
- nt-btn-danger
- nt-btn-outline
- nt-btn-ghost

```html
<button class="nt-btn nt-btn-primary">Primary Button</button>
<button class="nt-btn nt-btn-secondary">Secondary Button</button>
<button class="nt-btn nt-btn-danger" disabled>Disabled Button</button>
<button class="nt-btn nt-btn-outline">Outline Button</button>
<button class="nt-btn nt-btn-ghost">Ghost Button</button>
<button class="nt-btn nt-btn-icon">
<span class="nt-icon nt-icon-add"></span>
</button>
```

## Sizes

- nt-btn-sm
- nt-btn-md
- nt-btn-lg

## States

- Disabled: disabled attribute
- Loading: add nt-btn-loading and a spinner/icon

## Accessibility

- Use semantic <button> elements
- Provide aria-label for icon-only buttons

## Customization

- Override styles using custom classes or utility classes as needed.
- Example

```html
<button class="nt-btn nt-btn-primary nt-btn-lg">
Large Primary Button
</button>
```
