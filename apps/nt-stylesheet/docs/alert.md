# Alert Component

![alt text](image.png)

The Alert component in NT Stylesheet is used to display contextual feedback messages for user actions, with optional icons and dismiss buttons.

## Features

-   Four alert types: info, danger, warning, success
-   Optional icons with the nt-alert-has-icon modifier
-   Dismiss button with accessible aria-label
-   Fully responsive and styled using Tailwind utility classes

## Installation

-   Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

### Alert Types

Use the following modifier classes for different alert contexts:

-   `nt-alert-info`
-   `nt-alert-danger`
-   `nt-alert-warning`
-   `nt-alert-success`

### Example

```html
<div class="nt-alert nt-alert-success" role="alert">
    <span class="nt-alert-message"
        >Action completed successfully</span
    >
    <button class="nt-alert-close" aria-label="Close">✕</button>
</div>
```

### Alerts with Icons

To include an icon, add the `nt-alert-has-icon` class:

```html
<div class="nt-alert nt-alert-info nt-alert-has-icon" role="alert">
    <span class="nt-alert-message"
        >This is an info alert with icon</span
    >
    <button class="nt-alert-close" aria-label="Close">✕</button>
</div>
```

### Dismiss Button

All alerts include a close button:

-   Use `nt-alert-close` for styling.
-   Add aria-label="Close" for accessibility.

Note: Dismissing functionality should be implemented with JavaScript if needed.

---

[Back to docs index](README.md)
