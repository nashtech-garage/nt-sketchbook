# Breadcrumb

The **Breadcrumb** component in NT Stylesheet displays the user's navigation path and allows easy navigation back to previous pages.

## Usage

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Customization

-   Override styles using custom classes or utility classes as needed.
-   Example

```html
<nav class="nt-breadcrumb">
    <ol class="nt-breadcrumb-list">
        <li class="nt-breadcrumb-list-item">
            <a class="nt-breadcrumb-list-item-link" href="/dashboard"
                >Dashboard</a
            >
        </li>
        <li class="nt-breadcrumb-list-item">
            <a
                class="nt-breadcrumb-list-item-link"
                href="/electronics"
                >Products</a
            >
        </li>
        <li class="nt-breadcrumb-list-item">
            <span class="nt-breadcrumb-list-item-current"
                >Electronics</span
            >
        </li>
    </ol>
</nav>
```

---

[Back to docs index](README.md)
