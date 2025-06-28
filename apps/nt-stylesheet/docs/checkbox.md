# Checkbox Component

The **Checkbox** component in NT Stylesheet provides customizable checkbox component

## Features

-   Custom checkbox component with passing props for label, htmlFor in form controller
-   Easy to customize colors via CSS classes
-   Accessibility-friendly
-   Support for both controlled or uncontrolled component.
-   Reuseable component

## Installation

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

Wrap your checkbox component inside `<label class="nt-checkbox">` to get the horizontal style with label and info.

    <label class="nt-checkbox">
        <input type="checkbox" />
        Default
    </label>

## Layouts

-   Use `.nt-checkbox` for checkbox style only

## Example Markup

```html
<main>
    <label class="nt-checkbox">
        <input type="checkbox" checked />
        Checked
    </label>

    <label class="nt-checkbox">
        <input type="checkbox" id="indeterminate" />
        Indeterminate
    </label>
</main>
```

---

[Back to docs index](README.md)
