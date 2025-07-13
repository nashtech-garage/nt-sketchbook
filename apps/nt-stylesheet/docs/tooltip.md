# Tooltip Component

The **Tooltip** component in NT Stylesheet provides customizable tooltip component

## Features

-   Custom tooltip component with passing position, content, flexible classes
-   Easy to customize colors via CSS classes
-   Accessibility-friendly
-   Reuseable component

## Installation

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

Wrap your content inside Tooltip component inside `<div class="nt-tooltip nt-tooltip-top">` to get the styles

<div class="nt-tooltip nt-tooltip-top">
    <div class="nt-tooltip-trigger">
        <button
            class="nt-button-outline nt-button-secondary"
        >
            Top
        </button>
    </div>
    <span class="nt-tooltip-content" data-side="top"
        >Here is the content inside</span
    >
</div>

## Layouts

-   Use `.nt-tooltip` for tooltip style only

## Example Markup

```html
<main>
    <div class="nt-tooltip nt-tooltip-left mb-8">
        <div class="nt-tooltip-trigger">
            <button class="nt-button-outline nt-button-secondary">
                Left
            </button>
        </div>
         
        <span class="nt-tooltip-content"
            >Here is the content inside</span
        >
    </div>

    <div class="nt-tooltip nt-tooltip-right mb-8">
        <div class="nt-tooltip-trigger">
            <button class="nt-button-outline nt-button-secondary">
                Right
            </button>
        </div>
        <span class="nt-tooltip-content"
            >Here is the content inside</span
        >
    </div>
</main>
```
