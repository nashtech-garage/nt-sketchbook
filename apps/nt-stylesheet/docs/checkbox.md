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

Wrap your checkbox component inside `<div class=".nt-checkbox-wrapper">` to get the horizontal style with label and info.

    <div class="nt-checkbox-wrapper">
        <button
            type="button"
            role="checkbox"
            aria-checked="false"
            data-state="unchecked"
            value="on"
            class="nt-checkbox"
        ></button
        ><label class="checkbox-label" for="paragraph"
            >Paragraph label</label
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-info nt-checkbox-info"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
        </svg>
    </div>

## Layouts

-   Use `.nt-checkbox` for checkbox style only
-   Use `.nt-checkbox-wrapper` container for horizontal inline checkbox group with label and icon (row)

## Example Markup

```html
<main>
    <h2 class="text-3xl font-semibold mb-4">Checkbox component</h2>
</main>
```
