# Combobox Component

The **Combobox** component in NT Stylesheet provides customizable combobox component

## Features

-   Custom combobox component with passing props for trigger, popover, filter, select options in form controller
-   Easy to customize colors via CSS classes
-   Accessibility-friendly
-   Support for both controlled or uncontrolled component.
-   Reuseable component

## Installation

Import the stylesheet in your project:

```javascript
import '@nashtech-garage/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

Wrap your trigger component - in this case is <button> inside `<div class="nt-combobox">` to get popover content and combobox styling.

        <div class="nt-combobox" data-combobox data-options="About,Base,Blog,Contact">
            <button class="nt-combobox-trigger">Select an option</button>
        </div>

## Layouts

-   Use `.nt-combobox` for combobox style only

## Example Markup

```html
<main>
    <div class="wrapper" style="width: 235px">
        <div
            class="nt-combobox"
            data-combobox
            data-options="About,Base,Blog,Contact"
        >
            <button class="nt-combobox-trigger">
                Select an option
            </button>
        </div>
    </div>
</main>
```

---

[Back to docs index](README.md)
