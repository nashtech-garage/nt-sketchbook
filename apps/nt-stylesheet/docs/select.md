# Select

The **Select** component in NT Stylesheet provides a custom-styled dropdown for selecting a single option from a list.

## Usage

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

Add the HTML for the select component:

```html
<button
    data-nt-toggle="select"
    class="nt-select nt-select-default nt-select-medium"
    aria-expanded="false"
>
    <div class="nt-select-placeholder nt-select-medium-placeholder">
        Select an option
    </div>
    <ul
        class="nt-select-options"
        role="listbox"
        aria-labelledby="selected"
    >
        <li
            class="nt-select-options-item"
            role="option"
            tabindex="-1"
            aria-selected="false"
        >
            Option 1
        </li>
        <li
            class="nt-select-options-item"
            role="option"
            tabindex="-1"
            aria-selected="false"
        >
            Option 2
        </li>
        <li
            class="nt-select-options-item"
            role="option"
            tabindex="-1"
            aria-selected="false"
        >
            Option 3
        </li>
    </ul>
</button>
```

## Interactivity

To enable open/close and selection behavior, initialize the script:

```typescript
import { NtSelect } from '@nashtech/nt-stylesheet'

NtSelect.init()
```

## Variants

-   `nt-select-default`
-   `nt-select-danger`
-   `nt-select-success`
-   `nt-select-warning`
-   `nt-select-bare`

Change the class to use a different variant.

## Sizes

-   `nt-select-small`
-   `nt-select-medium`
-   `nt-select-large`

Change the class to use a different size.

## Customization

-   Override styles using custom classes or utility classes as needed.
-   Adjust the placeholder or options text by changing the inner HTML of the respective elements.

---

[Back to docs index](README.md)
